// main.js  V2.2 展播功能已完成  
// 全局变量
window.nodes = [];
window.connections = [];
let childrenMap = {};
// 调色板（可自定义）
const colorPalette = [
    "#FFB6C1", "#ADD8E6", "#90EE90", "#FFFFE0", "#FFDEAD",
    "#E6E6FA", "#F5DEB3", "#F0E68C", "#FFA07A", "#DDA0DD"
];
// 记录画布平移与缩放状态（作用于 #mapWrap）
let currentTranslateX = 0, currentTranslateY = 0;
let currentScale = 0.8;  // 初始缩放倍数
let pinchOriginX = 0;  // two fingers' pinch center
let pinchOriginY = 0;
let activeNodeIndex = null;
/**
 * 应用平移 + 缩放到 #mapWrap
 */
function applyTransform() {
    const mapWrap = document.getElementById('mapWrap');
    // 设置 transformOrigin 为当前 pinchOrigin
    //mapWrap.style.transformOrigin = `${currentTranslateX}px ${currentTranslateY}px`;
    // 注意：CSS transform 的执行顺序是从右向左，
    // 此处先执行 scale，再执行 translate，
    // 如果你希望保证固定屏幕点，translate 已在 setScale 中计算好。
    mapWrap.style.transform = `translate(${currentTranslateX}px, ${currentTranslateY}px) scale(${currentScale})`;
  }

/**
 * 更新节点的尺寸与位置，根据最新的 DOM 渲染结果
 */
function updateNodePositions() {
  window.nodes.forEach((node) => {
    if (node.el) {
      const rect = node.el.getBoundingClientRect();
      node.width = rect.width;
      node.height = rect.height;
      // 根据逻辑中心坐标重新定位，使其保持居中
      node.el.style.left = (node.x - node.width / 2) + 'px';
      node.el.style.top  = (node.y - node.height / 2) + 'px';
    }
  });
}

/**
 * 初始化思维导图
 * @param {Object} data - 包含 data.nodes, data.connections
 */
function initMindmap(data) {
    window.nodes = data.nodes;
    window.connections = data.connections;
    // 构建 childrenMap 与 parent 属性
    childrenMap = {};
    connections.forEach(([p, c]) => {
        if (!childrenMap[p]) childrenMap[p] = [];
        childrenMap[p].push(c);
    });
    connections.forEach(([p, c]) => {
        nodes[c].parent = p;
    });
    nodes[0].parent = null;
    // 默认全部展开
    nodes.forEach(n => n.expanded = true);
    // 获取节点容器(#map) 和连线层(#connLayer)
    const mapEl = document.getElementById('map');
    let connLayer = document.getElementById('connLayer');
    const mapWrap = document.getElementById('mapWrap');
    if (!connLayer) {
        connLayer = document.createElementNS('http://www.w3.org/2000/svg','svg');
        connLayer.id = 'connLayer';
        if (mapWrap) mapWrap.insertBefore(connLayer, mapEl);
    }
    connLayer.style.position = 'absolute';
    connLayer.style.top = '0';
    connLayer.style.left = '0';
    connLayer.style.width = '100%';
    connLayer.style.height = '100%';
    connLayer.style.pointerEvents = 'none';
    // 在独立 SVG 层创建连线
    connections.forEach(([startIdx, endIdx]) => {
        const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
        line.setAttribute('stroke', '#999');
        line.setAttribute('stroke-width', '2');
        line.dataset.conn = `${startIdx}-${endIdx}`;
        connLayer.appendChild(line);
    });
    // 创建节点 DOM
    nodes.forEach((node, i) => {
        const div = document.createElement('div');
        div.className = 'node';
        // 根节点可做特殊样式
        if (i === 0) {
            div.style.fontSize = '1.2rem';
            div.style.border = '2px solid #000';
            div.style.padding = '12px';
        }
// 创建标题元素
const titleEl = document.createElement('div');
titleEl.style.fontWeight = 'bold';
titleEl.className = 'node-title';

const iconSpan = document.createElement('span');
iconSpan.className = 'toggle-icon';
iconSpan.textContent = '▶';

// 如果 node.link 存在，则使用 <a> 包裹文字，点击跳转
if (node.link) {
  const linkEl = document.createElement('a');
  linkEl.href = node.link;


  // 如果想在新窗口打开，可加上 linkEl.target = "_blank";
  linkEl.textContent = node.text || `Node ${i}`;
  // linkEl.style.textDecoration = 'none';  // 去掉默认下划线
  // linkEl.style.color = 'inherit';        // 保持文字颜色一致
  linkEl.classList.add('link-node');
  // 将 linkEl 放进 titleEl
  titleEl.appendChild(linkEl);
} else {
  const titleText = document.createElement('span');
  // 否则，直接用 textContent 显示标题
  titleText.textContent = node.text || `Node ${i}`;
  titleEl.appendChild(titleText);
}

// 插入箭头图标
titleEl.appendChild(iconSpan);


// 然后把 titleEl 放进节点 div
div.appendChild(titleEl);

    // 创建展开/折叠按钮
    const toggleBtn = document.createElement('button');
    toggleBtn.className = 'toggle-btn';
    toggleBtn.textContent = "−";
    toggleBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      node.expanded = !node.expanded;
      toggleBtn.textContent = node.expanded ? "−" : "+";
      updateVisibility();
    });

// 创建静态介绍区域，显示节点的主要介绍（不可编辑）
const staticDescEl = document.createElement('div');
staticDescEl.className = 'static-desc';
staticDescEl.innerHTML = node.description || "No description.";
staticDescEl.style.marginTop = "4px";
staticDescEl.style.fontStyle = "normal";
// 可以添加其他样式，例如颜色、字号等
staticDescEl.contentEditable = "false";  // 编辑节点的开关 ************
staticDescEl.classList.add("editable-html");

// 缓存原始内容以便取消编辑时恢复
let originalContent = staticDescEl.innerHTML;

// 创建“编辑”按钮
const editDescBtn = document.createElement('button');
editDescBtn.className = "editDescBtn";
editDescBtn.textContent = "✏️ Edit";
editDescBtn.style.marginRight = "8px";
editDescBtn.addEventListener('click', (e) => {
  e.stopPropagation();

  originalContent = staticDescEl.innerHTML; // 保存进入编辑前的内容
  staticDescEl.contentEditable = true;
  staticDescEl.focus();

  editDescBtn.style.display = 'none';
  saveDescBtn.style.display = 'inline-block';
  cancelDescBtn.style.display = 'inline-block'; // 显示取消按钮
});

// 创建“保存”按钮
const saveDescBtn = document.createElement('button');
saveDescBtn.className = "saveDescBtn";
saveDescBtn.textContent = "💾 Save";
saveDescBtn.style.display = 'none';
saveDescBtn.style.marginRight = "8px";
saveDescBtn.addEventListener('click', (e) => {
  e.stopPropagation();
  staticDescEl.contentEditable = false;
  node.description = staticDescEl.innerHTML;

  editDescBtn.style.display = 'inline-block';
  saveDescBtn.style.display = 'none';
  cancelDescBtn.style.display = 'none';
  scheduleUpdate(); // 如果你有这个函数，用于保存更改
});

// ✅ 创建“取消”按钮
const cancelDescBtn = document.createElement('button');
cancelDescBtn.className = "cancelDescBtn";
cancelDescBtn.textContent = "❌ Cancel";
cancelDescBtn.style.display = 'none';
cancelDescBtn.addEventListener('click', (e) => {
  e.stopPropagation();
  staticDescEl.innerHTML = originalContent; // 恢复原内容
  staticDescEl.contentEditable = false;

  editDescBtn.style.display = 'inline-block';
  saveDescBtn.style.display = 'none';
  cancelDescBtn.style.display = 'none';
});

// 添加到卡片视图中
div.appendChild(staticDescEl);
// 编辑节点的按钮，开关  ***********************************************
div.appendChild(editDescBtn);
div.appendChild(saveDescBtn);
div.appendChild(cancelDescBtn);


// 防止清除格式的粘贴行为
staticDescEl.addEventListener('paste', function(e) {
  e.preventDefault();
  const html = e.clipboardData.getData('text/html');
  const plain = e.clipboardData.getData('text/plain');
  document.execCommand('insertHTML', false, html || plain);
});

const editHtmlBtn = document.createElement('button');
editHtmlBtn.textContent = "🖊 Edit HTML";
editHtmlBtn.addEventListener('click', () => {
  const isEditing = staticDescEl.contentEditable === "true";
  if (isEditing) {
    staticDescEl.contentEditable = "false";
    editHtmlBtn.textContent = "🖊 Edit HTML";
  } else {
    staticDescEl.contentEditable = "true";
    editHtmlBtn.textContent = "✅ Done";
  }
});


// 点击切换描述展开/收起
titleEl.addEventListener('click', () => {
  const isExpanded = staticDescEl.classList.contains('expanded');
  staticDescEl.classList.toggle('expanded');
  iconSpan.textContent = isExpanded ? '▶' : '▼';
});

// 创建可编辑评论区域，供用户输入补充说明（初始为默认提示）
const editableCommentEl = document.createElement('div');
editableCommentEl.className = 'rich-text';
editableCommentEl.contentEditable = "false";
editableCommentEl.innerHTML = "在此输入说明和评论...";
editableCommentEl.style.marginTop = "4px";
editableCommentEl.style.border = "1px solid #ccc";
editableCommentEl.style.padding = "4px";


  // 创建编辑按钮，控制评论区域的编辑状态
  const editBtn = document.createElement('button');
  editBtn.className = 'edit-btn';
  editBtn.textContent = '编辑';
  editBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    if (editableCommentEl.contentEditable === "true") {
      editableCommentEl.contentEditable = "false";
      editBtn.textContent = "编辑";
      editableCommentEl.blur();
    } else {
      editableCommentEl.contentEditable = "true";
      editBtn.textContent = "确认";
      editableCommentEl.focus();
    }
  });



    // 组装节点内容
    div.appendChild(titleEl);

    // 显示所有非空 extra 信息字段
    const extraInfo = document.createElement('div');
    extraInfo.className = 'extra-info';

    if (node.classic) {
      const el = document.createElement('div');
      el.innerHTML = `<strong>Classic:</strong> ${node.classic}`;
      extraInfo.appendChild(el);
    }
    if (node.person) {
      const el = document.createElement('div');
      el.innerHTML = `<strong>Person:</strong> ${node.person}`;
      extraInfo.appendChild(el);
    }
    if (node.Nobel) {
      const el = document.createElement('div');
      el.innerHTML = `<strong>Nobel:</strong> ${node.Nobel}`;
      extraInfo.appendChild(el);
    }
    if (node.formula) {
      const el = document.createElement('div');
      el.innerHTML = `<strong>Formula:</strong> <code>${node.formula}</code>`;
      extraInfo.appendChild(el);
    }
    if (node.chart) {
      const el = document.createElement('div');
      el.innerHTML = `<strong>Chart:</strong> ${node.chart}`;
      extraInfo.appendChild(el);
    }
    if (node.application) {
      const el = document.createElement('div');
      el.innerHTML = `<strong>Application:</strong> ${node.application}`;
      extraInfo.appendChild(el);
    }
    if (node.image) {
      const img = document.createElement('img');
      img.src = node.image;
      img.alt = "image";
      img.style.maxWidth = "100%";
      img.style.marginTop = "6px";
      extraInfo.appendChild(img);
    }
    // 在创建节点的描述时加上这一段
if (node.categoryPath && Array.isArray(node.categoryPath)) {
  const categoryDiv = document.createElement('div');
  categoryDiv.className = "category-path";
  categoryDiv.innerHTML = `<em>📂 Major:</em> ${node.categoryPath.join(" → ")}`;
  div.appendChild(categoryDiv);
}

    div.appendChild(staticDescEl);
    div.appendChild(toggleBtn);
    /**
 *  这里是可编辑的评论区域   的开关，暂时关闭comment 功能 ****************************
 */
    // div.appendChild(editableCommentEl);
    // div.appendChild(editBtn);

    // 创建朗读按钮
const speakBtn = document.createElement('button');
speakBtn.className = 'speak-btn';
speakBtn.textContent = '🔊';
speakBtn.title = 'Read Aloud';

speakBtn.addEventListener('click', (e) => {
  e.stopPropagation(); // 防止触发其他点击事件
  const textToSpeak = `${node.text}. ${stripHTML(node.description || '')}`;
  speakText(textToSpeak, speakBtn);
});

div.appendChild(speakBtn);

        // 若节点包含视频
        if (node.videoUrl) {
            const iframe = document.createElement('iframe');
            iframe.src = node.videoUrl;
            iframe.width = "300";
            iframe.height = "169";
            iframe.frameBorder = "0";
            iframe.style.border = "none";
            iframe.allow = "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture";
            iframe.allowFullscreen = true;
            iframe.style.display = "block";
            iframe.style.marginTop = "8px";
            div.appendChild(iframe);
        }
        // // 重要节点信息
        // if (node.important) {
        //     const extraInfo = document.createElement('div');
        //     extraInfo.className = 'extra-info';
        //     extraInfo.innerHTML = `<div>${node.classic}</div><div>人物：${node.person}</div>`;
        //     if (node.image) {
        //         const img = document.createElement('img');
        //         img.src = node.image;
        //         extraInfo.appendChild(img);
        //     }
        //     div.appendChild(extraInfo);
        // }



    // 只有当有内容时再添加到节点中
    if (extraInfo.children.length > 0) {
      div.appendChild(extraInfo);
    }



        // 基本样式
        div.style.backgroundColor = colorPalette[i % colorPalette.length];
        div.dataset.index = i;
        // 先添加到 DOM，才能正确获取 offsetWidth/offsetHeight
            // 保存 DOM 引用，便于后续更新尺寸和位置
        node.el = div;
        // 添加到 DOM 后测量尺寸
        mapEl.appendChild(div);
        const rect = div.getBoundingClientRect();
        node.width = rect.width;
        node.height = rect.height;
        // 让 (node.x, node.y) 作为节点中心坐标
        if (node.x === undefined) node.x = 0;
        if (node.y === undefined) node.y = 0;
        div.style.left = (node.x) + 'px';
        div.style.top  = (node.y) + 'px';
    });
    /************************************************************
     * 3. 布局逻辑：让 (node.x, node.y) 表示“节点中心”
     ************************************************************/
    let layoutMode ='star';
    // 垂直布局
    let baseX = 50, nextY = 50;
    const xGap = 150, yGap = 150;
    function layoutVertical(index, level) {
        const node = nodes[index];
        node.x = baseX + level * xGap;
        const children = childrenMap[index];
        if (children && children.length > 0) {
            children.forEach(child => layoutVertical(child, level + 1));
            const firstChild = nodes[children[0]];
            const lastChild = nodes[children[children.length - 1]];
            node.y = (firstChild.y + firstChild.height / 2 + lastChild.y - lastChild.height / 2) / 2;
        } else {
            node.y = nextY;
            nextY += yGap;
        }
    }
    // 水平布局
    let baseY = 50, nextX = 50;
    const xGap2 = 150, yGap2 = 150;
    function layoutHorizontal(index, level) {
        const node = nodes[index];
        node.y = baseY + level * yGap2;
        const children = childrenMap[index];
        if (children && children.length > 0) {
            children.forEach(child => layoutHorizontal(child, level + 1));
            const firstChild = nodes[children[0]];
            const lastChild = nodes[children[children.length - 1]];
            node.x = (firstChild.x + firstChild.width / 2 + lastChild.x - lastChild.width / 2) / 2;
        } else {
            node.x = nextX;
            nextX += xGap2;
        }
    }
    // 星型布局
    const centerX = 600, centerY = 400;
    const radialGap = 250;
    function countNodes(index) {
        let count = 1;
        if (childrenMap[index]) {
            childrenMap[index].forEach(child => {
                count += countNodes(child);
            });
        }
        return count;
    }
    function layoutStar(index, level, angleStart, angleEnd) {
        const node = nodes[index];
        if (level === 0) {
            node.x = centerX;
            node.y = centerY;
        } else {
            const radius = level * radialGap;
            const angle = (angleStart + angleEnd) / 2;
            node.x = centerX + radius * Math.cos(angle);
            node.y = centerY + radius * Math.sin(angle);
        }
        if (childrenMap[index]) {
            let total = 0;
            childrenMap[index].forEach(child => { total += countNodes(child); });
            let currentAngle = angleStart;
            childrenMap[index].forEach(child => {
                const childCount = countNodes(child);
                const angleSpan = (angleEnd - angleStart) * (childCount / total);
                layoutStar(child, level + 1, currentAngle, currentAngle + angleSpan);
                currentAngle += angleSpan;
            });
        }
    }
    // 执行布局
    function layoutNodes() {
        if (layoutMode ==='vertical') {
            nextY = 50;
            layoutVertical(0, 0);
        } else if (layoutMode === 'horizontal') {
            nextX = 50;
            layoutHorizontal(0, 0);
        } else if (layoutMode ==='star') {
            layoutStar(0, 0, 0, Math.PI * 2);
        }
        scheduleUpdate();
    }
    /************************************************************
     * 4. 动态边界计算 & 坐标校正 (node.x, node.y = 中心)
     ************************************************************/
    function updateBoundingBox() {
        if (isDragging) return;
        let minX = Infinity, minY = Infinity;
        let maxX = -Infinity, maxY = -Infinity;
        nodes.forEach(n => {
            const left = n.x - n.width / 2;
            const right = n.x + n.width / 2;
            const top = n.y - n.height / 2;
            const bottom = n.y + n.height / 2;
            if (left < minX) minX = left;
            if (top < minY) minY = top;
            if (right > maxX) maxX = right;
            if (bottom > maxY) maxY = bottom;
        });
        let shiftX = 0, shiftY = 0;
        if (minX < 0) shiftX = -minX;
        if (minY < 0) shiftY = -minY;
        if (shiftX!== 0 || shiftY!== 0) {
            nodes.forEach(n => {
                n.x += shiftX;
                n.y += shiftY;
            });
            minX = 0; minY = 0;
            maxX += shiftX; maxY += shiftY;
        }
        const mapWidth = Math.max(800, maxX - minX);
        const mapHeight = Math.max(600, maxY - minY);
        mapEl.style.width = mapWidth + 'px';
        mapEl.style.height = mapHeight + 'px';
        // 更新每个节点 <div> 的 left/top
        document.querySelectorAll('.node').forEach(div => {
            const i = +div.dataset.index;
            const n = nodes[i];
            div.style.left = (n.x - n.width / 2) + 'px';
            div.style.top = (n.y - n.height / 2) + 'px';
        });
    }
    /************************************************************
     * 5. 连线更新：端点 = 节点中心
     ************************************************************/
    function updateConnections() {
        const connLayerEl = document.getElementById('connLayer');
        connections.forEach(([s, e]) => {
            const line = connLayerEl.querySelector(`line[data-conn="${s}-${e}"]`);
            const start = nodes[s], end = nodes[e];
            if (!start.visible ||!end.visible) {
                line.style.display = 'none';
            } else {
                line.style.display = 'block';
                line.setAttribute('x1', start.x);
                line.setAttribute('y1', start.y);
                line.setAttribute('x2', end.x);
                line.setAttribute('y2', end.y);
            }
        });
    }
    /************************************************************
     * 6. 性能优化：使用 requestAnimationFrame
     ************************************************************/
    let scheduled = false;
    function scheduleUpdate() {
        if (!scheduled) {
            scheduled = true;
            requestAnimationFrame(() => {
                scheduled = false;
                updateNodePositions();
                updateConnections();
                updateBoundingBox();
                updateVisibility();
            });
        }
    }
    /************************************************************
     * 7. 节点可见性
     ************************************************************/
    function computeVisibility(index, isVisible) {
        nodes[index].visible = isVisible;
        if (childrenMap[index]) {
            childrenMap[index].forEach(child => {
                computeVisibility(child, isVisible && nodes[index].expanded);
            });
        }
    }
    function updateVisibility() {
        computeVisibility(0, true);
        document.querySelectorAll('.node').forEach(div => {
            const i = +div.dataset.index;
            div.style.display = nodes[i].visible? 'block' : 'none';
        });
        updateConnections();
    }
    /************************************************************
     * 8. 节点拖拽
     ************************************************************/
    let selectedNode = null;
    let nodeStartX = 0, nodeStartY = 0;
    let nodeOrigX = 0, nodeOrigY = 0;
    let isDragging = false;
    document.querySelectorAll('.node').forEach(div => {
        div.addEventListener('pointerdown', (e) => {
            // 若点击到链接、编辑按钮、富文本等，不拖拽
            if (
                e.target.closest('a') ||
                e.target.closest('.edit-btn') ||
                e.target.closest('.toggle-btn') ||
                e.target.classList.contains('rich-text')||
                e.target.classList.contains('toggle-icon') ||
                e.target.closest('.speak-btn') ||
                e.target.closest('.editDescBtn') ||
                e.target.closest('.saveDescBtn') ||
                e.target.closest('.cancelDescBtn') 
            ) {
                return;
            }
            selectedNode = div;
            nodeStartX = e.clientX;
            nodeStartY = e.clientY;
            const i = +div.dataset.index;
            nodeOrigX = nodes[i].x;
            nodeOrigY = nodes[i].y;
            div.setPointerCapture(e.pointerId);
            e.preventDefault();
            isDragging = true;
        });
    });
    document.addEventListener('pointermove', (e) => {
        if (!selectedNode) return;
        const i = +selectedNode.dataset.index;
        const dx = (e.clientX - nodeStartX) / currentScale;
        const dy = (e.clientY - nodeStartY) / currentScale;
        nodes[i].x = nodeOrigX + dx;
        nodes[i].y = nodeOrigY + dy;
        // 更新 <div> 位置
        selectedNode.style.left = (nodes[i].x - nodes[i].width / 2) + 'px';
        selectedNode.style.top = (nodes[i].y - nodes[i].height / 2) + 'px';
        scheduleUpdate();
    });
    document.addEventListener('pointerup', (e) => {
        if (selectedNode) {
            selectedNode.releasePointerCapture(e.pointerId);
            selectedNode = null;
            isDragging = false;
            scheduleUpdate();
        }
    });
    document.addEventListener('pointercancel', (e) => {
        if (selectedNode) {
            try { selectedNode.releasePointerCapture(e.pointerId); } catch {}
            selectedNode = null;
            isDragging = false;
            scheduleUpdate();
        }
    });

  /********* 9. 布局按钮 **********/
  document.getElementById('btnVertical').addEventListener('click', () => {
    layoutMode = 'vertical';
    layoutNodes();
    setTimeout(() => focusOnNode(0), 100);
  });
  document.getElementById('btnHorizontal').addEventListener('click', () => {
    layoutMode = 'horizontal';
    layoutNodes();
    setTimeout(() => focusOnNode(0), 100);
  });
  document.getElementById('btnStar').addEventListener('click', () => {
    layoutMode = 'star';
    layoutNodes();
    setTimeout(() => focusOnNode(0), 100);
  });


    /************************************************************
     * 9. 缩放功能 (针对 #mapWrap)
     ************************************************************/
    function setScale(newScale, fixedScreenX, fixedScreenY) {
        // 计算旧缩放下，固定屏幕点对应的世界坐标
        let oldScale = currentScale;
        let worldX = (fixedScreenX - currentTranslateX) / oldScale;
        let worldY = (fixedScreenY - currentTranslateY) / oldScale;
        // 更新平移，使得固定屏幕点在放缩前后不变
        currentTranslateX = fixedScreenX - newScale * worldX;
        currentTranslateY = fixedScreenY - newScale * worldY;
        // 更新 transformOrigin 使用固定点
        pinchOriginX = fixedScreenX;
        pinchOriginY = fixedScreenY;
        // 更新缩放
        currentScale = newScale;
        applyTransform();
        scheduleUpdate();
        updateDebugInfo(); // 如有调试输出
      }

  document.getElementById('zoomIn').addEventListener('click', () => {
    const container = document.getElementById('container');
    const rect = container.getBoundingClientRect();
    // 计算 container 的中心（视觉中心）
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    setScale(Math.min(currentScale * 1.1, 2), centerX, centerY);
  });
  
  document.getElementById('zoomOut').addEventListener('click', () => {
    const container = document.getElementById('container');
    const rect = container.getBoundingClientRect();
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    setScale(Math.max(currentScale * 0.9, 0.3), centerX, centerY);
  });
  
  function handleWheel(e) {
    if (!(e.ctrlKey || e.metaKey)) return;
    e.preventDefault();
    const zoomFactor = e.deltaY > 0 ? 0.9 : 1.1;
    const container = document.getElementById('container');
    const rect = container.getBoundingClientRect();
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    setScale(Math.min(Math.max(currentScale * zoomFactor, 0.3), 3), centerX, centerY);
  }
//   document.addEventListener('keydown', (e) => {
//     if (e.ctrlKey || e.metaKey) {
//       document.addEventListener('wheel', handleWheel, { passive: false });
//     }
//   });
//   document.addEventListener('keyup', (e) => {
//     if (!e.ctrlKey && !e.metaKey) {
//       document.removeEventListener('wheel', handleWheel);
//     }
//   });
    document.addEventListener('wheel', handleWheel, { passive: false });
    /************************************************************
     * 10. 平移功能 (针对 #mapWrap)
     ************************************************************/
    let isPanning = false;
    let panStartX = 0, panStartY = 0;
    document.addEventListener('pointerdown', (e) => {
        if (e.target.closest('.node')) return;
        isPanning = true;
        panStartX = e.clientX;
        panStartY = e.clientY;
    });
    document.addEventListener('pointermove', (e) => {
        if (!isPanning) return;
        const dx = e.clientX - panStartX;
        const dy = e.clientY - panStartY;
        currentTranslateX += dx;
        currentTranslateY += dy;
        applyTransform();
        panStartX = e.clientX;
        panStartY = e.clientY;
    });
    document.addEventListener('pointerup', (e) => {
        if (isPanning) {
            isPanning = false;
        }
    });
    document.addEventListener('pointercancel', (e) => {
        if (isPanning) {
            isPanning = false;
        }
    });

      /********* 12. 聚焦函数 **********/
  // 使指定节点在容器中居中显示，并考虑放缩后的偏移
  let currentZIndex = 1000;  // 初始化 z-index，从 1000 开始，每次递增，我认为现在还没有1000个节点已经被创建
  window.focusOnNode = function(index) {
    const node = nodes[index];
    if (!node) return;
    const container = document.getElementById('container');
    const containerRect = container.getBoundingClientRect();
    // 使用逻辑中心坐标，并乘以当前缩放
    currentTranslateX = (containerRect.width / 2) - (node.x * currentScale);
    currentTranslateY = (containerRect.height / 2) - (node.y * currentScale);
    applyTransform();

    // 高亮目标节点
    document.querySelectorAll('.node').forEach(n => n.classList.remove("highlighted"));
    const el = document.querySelector(`.node[data-index="${index}"]`);
    el.classList.add("highlighted");
    el.style.zIndex = currentZIndex++;  // 每次聚焦，z-index 递增
    setTimeout(() => {
      el.classList.remove("highlighted");
    //   el.style.zIndex = '';
    }, 3000);
  };

  // 高亮显示点击或触摸的节点
function highlightNodeOnClick(e) {
    // 获取被点击的元素，排除不需要高亮的元素（如链接、按钮等）
    const node = e.target.closest('.node');
    if (!node) return;  // 如果点击的不是节点，直接返回

      // Only skip if the user clicked directly on the toggle icon (▶ / ▼)
  if (e.target.classList.contains('toggle-icon') || e.target.closest('.speak-btn') ||
      e.target.closest('.editDescBtn') ||
      e.target.closest('.saveDescBtn') ) return;
    
    const nodeIndex = Number(node.dataset.index);
    const nodeObj = nodes[nodeIndex];

    if (activeNodeIndex === nodeIndex) return;
    if (!nodeObj) return;  // 如果该节点不存在，直接返回
    activeNodeIndex = nodeIndex;
    
    // 添加高亮类，没有动画
    node.classList.add("selectedNode");
    node.style.zIndex = currentZIndex++;  // 每次聚焦，z-index 递增
    setTimeout(() => {
        node.classList.remove("selectedNode");
      //   el.style.zIndex = '';
      }, 1000);
}

// 鼠标点击和触摸事件监听器
document.addEventListener('click', highlightNodeOnClick);
document.addEventListener('touchstart', highlightNodeOnClick);

    /********* 13. pinch to zoom **********/
  // 使指定节点在容器中居中显示，并考虑放缩后的偏移
// 记录双指缩放相关变量
// 辅助函数：计算两指之间的距离
function getDistance(touch1, touch2) {
    const dx = touch1.clientX - touch2.clientX;
    const dy = touch1.clientY - touch2.clientY;
    return Math.sqrt(dx * dx + dy * dy);
  }
  
  let initialDistance = null;
  let initialScale = currentScale;
  
  // 记录两指初始状态
  document.addEventListener('touchstart', function(e) {
    if (e.touches.length === 2) {
      const rect = mapWrap.getBoundingClientRect();
      // 计算两指中点在 mapWrap 内的坐标
      pinchOriginX = ((e.touches[0].clientX + e.touches[1].clientX) / 2) - rect.left;
      pinchOriginY = ((e.touches[0].clientY + e.touches[1].clientY) / 2) - rect.top;
      initialDistance = getDistance(e.touches[0], e.touches[1]);
      initialScale = currentScale;
      e.preventDefault();
    }
  }, { passive: false });
  
  // 监听 touchmove 时，实时更新缩放和中心点
  document.addEventListener('touchmove', function(e) {
    if (e.touches.length === 2 && initialDistance !== null) {
      const rect = mapWrap.getBoundingClientRect();
      const currentDistance = getDistance(e.touches[0], e.touches[1]);
      let newScale = initialScale * (currentDistance / initialDistance);
      newScale = Math.min(Math.max(newScale, 0.3), 3);
  
      // 当前两指中点在 mapWrap 内的坐标
      const newOriginX = ((e.touches[0].clientX + e.touches[1].clientX) / 2) - rect.left;
      const newOriginY = ((e.touches[0].clientY + e.touches[1].clientY) / 2) - rect.top;
  
      // 调用 setScale 使用新的缩放倍数和中点
      setScale(newScale, newOriginX, newOriginY);
      e.preventDefault();
    }
  }, { passive: false });
  
  // 手指离开时重置初始距离
  document.addEventListener('touchend', function(e) {
    if (e.touches.length < 2) {
      initialDistance = null;
    }
  });
  
    /********* 14. debug  **********/
// 如果页面中不存在调试信息的容器，则创建一个
// if (!document.getElementById('debugInfo')) {
//     const debugDiv = document.createElement('div');
//     debugDiv.id = 'debugInfo';
//     debugDiv.style.position = 'fixed';
//     debugDiv.style.top = '0';
//     debugDiv.style.left = '0';
//     debugDiv.style.backgroundColor = 'rgba(0, 0, 0, 0.7)';
//     debugDiv.style.color = '#fff';
//     debugDiv.style.padding = '5px 10px';
//     debugDiv.style.zIndex = '9999';
//     debugDiv.style.fontSize = '12px';
//     document.body.appendChild(debugDiv);
//   }
  
  // 定义一个更新调试信息的函数
  function updateDebugInfo() {
    const debugDiv = document.getElementById('debugInfo');
    if (debugDiv) {
      debugDiv.textContent = `pinchOriginX: ${pinchOriginX.toFixed(2)}, pinchOriginY: ${pinchOriginY.toFixed(2)},currentScale: ${currentScale.toFixed(2)}, 
      currentTranslateX: ${currentTranslateX.toFixed(2)}, currentTranslateY: ${currentTranslateY.toFixed(2)}`;
    }
  }
    /********* 15. 朗读功能  **********/
    let currentUtterance = null;
    let currentSpeakBtn = null;
    
    function speakText(text, btn) {
      if (speechSynthesis.speaking || speechSynthesis.pending) {
        // 正在播放，点击则停止
        speechSynthesis.cancel();
        if (currentSpeakBtn) currentSpeakBtn.textContent = '🔊';
        return;
      }
    
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'en-US'; // 可改为 "zh-CN" 等
      currentUtterance = utterance;
      currentSpeakBtn = btn;
      btn.textContent = '⏹️';
    
      utterance.onend = () => {
        btn.textContent = '🔊';
        currentUtterance = null;
        currentSpeakBtn = null;
      };
    
      utterance.onerror = () => {
        btn.textContent = '🔊';
        currentUtterance = null;
        currentSpeakBtn = null;
      };
    
      speechSynthesis.speak(utterance);
    }
    
  
  // 可选：移除 HTML 标签
  function stripHTML(html) {
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = html;
    return tempDiv.textContent || tempDiv.innerText || '';
  }


    /********* 16. Flashcard 展播功能  **********/

const playCardBtn = document.createElement('button');
playCardBtn.textContent = "播放卡片";
playCardBtn.id = "btnPlayCard";
document.getElementById('controls').appendChild(playCardBtn);

// 卡片模态 DOM 创建
const cardOverlay = document.createElement('div');
cardOverlay.id = 'cardOverlay';
cardOverlay.style.cssText = `
  position: fixed;
  top: 0; left: 0;
  width: 100vw; height: 100vh;
  background: rgba(0, 0, 0, 0.5);
  display: none;
  justify-content: center;
  align-items: center;
  z-index: 9999;
`;

const cardBox = document.createElement('div');
cardBox.id = 'cardBox';
cardBox.style.cssText = `
  background: white;
  padding: 20px;
  max-width: 400px;
  max-height: 80vh;
  overflow-y: auto;
  border-radius: 8px;
  box-shadow: 0 10px 20px rgba(0,0,0,0.2);
`;

const closeBtn = document.createElement('button');

closeBtn.textContent = "✖";
closeBtn.style.cssText = `
  position: fixed;
  top: 20px;
  right: 20px;
  width: 36px;
  height: 36px;
  background-color: #e74c3c;
  color: white;
  border-radius: 50%;
  font-size: 20px;
  font-weight: bold;
  border: none;
  z-index: 10000;
  cursor: pointer;
`;


closeBtn.addEventListener('mouseenter', () => {
  closeBtn.style.backgroundColor = '#c0392b';
});
closeBtn.addEventListener('mouseleave', () => {
  closeBtn.style.backgroundColor = '#e74c3c';
});


closeBtn.addEventListener('click', () => {
  cardOverlay.style.display = 'none';
});

cardOverlay.appendChild(closeBtn);
cardOverlay.appendChild(cardBox);
document.body.appendChild(cardOverlay);

// 点击按钮播放当前节点
document.getElementById('btnPlayCard').addEventListener('click', () => {
  if (typeof activeNodeIndex === 'undefined') return;

  const node = nodes[activeNodeIndex];
  if (!node) return;

  let content = `<h2>${node.text}</h2>`;
  content += `<button id="speakNodeBtn" style="
  background-color: #4f46e5;
  color: white;
  border: none;
  padding: 6px 12px;
  border-radius: 6px;
  cursor: pointer;
  font-size: 14px;
  margin-bottom: 12px;">🔊</button>`;
  if (node.description) content += `<div>${node.description}</div>`;
  if (node.image) content += `<img src="${node.image}" style="margin-top: 12px; max-width: 100%;">`;
  if (node.classic) content += `<p><strong>🌟 Classic:</strong> ${node.classic}</p>`;
  if (node.person) content += `<p><strong>👤 Person:</strong> ${node.person}</p>`;
  if (node.videoUrl) content += `<iframe width="100%" height="200" src="${node.videoUrl}" frameborder="0" allowfullscreen></iframe>`;

  cardBox.innerHTML = content;
  cardOverlay.style.display = 'flex';

  document.getElementById('speakNodeBtn').addEventListener('click', () => {
    const text = `${node.text}. ${stripHTML(node.description || '')}`;
    speakText(text,speakNodeBtn);
  });
});

// 展播功能，逐个顺序播放幻灯片
let isAutoPlaying = false;
let autoPlayIndex = 0;
let currentSpeech = null;
let isSpeaking = false;
let userStoppedManually = false;


const autoPlayBtn = document.createElement('button');
autoPlayBtn.id = 'btnAutoPlayCard';
autoPlayBtn.textContent = '📽️ 连续播放';
document.getElementById('controls').appendChild(autoPlayBtn);

autoPlayBtn.addEventListener('click', () => {
  if (isAutoPlaying) {
    stopAutoPlay();
  } else {
    isAutoPlaying = true;
    autoPlayBtn.textContent = '⏹️ 停止播放';
    autoPlayIndex = activeNodeIndex ?? 0;
    playNextCard();
  }
});

function stopAutoPlay() {
  isAutoPlaying = false;
  autoPlayBtn.textContent = '📽️ 连续播放';
  cardOverlay.style.display = 'none';
  window.speechSynthesis.cancel();
}





function createSpeechForNode(node, onEnd) {
  if (!node || !node.text) return null;
  const utter = new SpeechSynthesisUtterance(`${node.text}. ${stripHTML(node.description || '')}`);
  utter.lang = 'en-US';
  utter.rate = 1;
  utter.pitch = 1;
  // 当语音自然播放结束时，如果自动播放模式开启且用户没有手动停止，则自动调用 onEnd 回调
  utter.onend = () => {
    isSpeaking = false;
    if (isAutoPlaying && !userStoppedManually && typeof onEnd === 'function') {
         onEnd();
    }
    // 重置手动停止状态
    userStoppedManually = false;
  };
  utter.onerror = () => {
    isSpeaking = false;
    userStoppedManually = false;
  };
  return utter;
}




function playNextCard() {
  if (!isAutoPlaying || autoPlayIndex >= nodes.length) {
    stopAutoPlay();
    return;
  }
  
  const node = nodes[autoPlayIndex];
  if (!node) {
    autoPlayIndex++;
    return playNextCard();
  }
  
  // 构建当前页的卡片内容
  let content = `<h2>${node.text}</h2>`;
  content += `
    <button id="speakNodeBtn" style="margin: 6px 6px 12px 0;">⏹️ Stop</button>
    <button id="prevNodeBtn" style="margin: 6px 6px 12px 0;">⏮️ Previous</button>
    <button id="nextNodeBtn" style="margin: 6px 6px 12px 0;">⏭️ Next</button>
  `;
  if (node.description) content += `<div>${node.description}</div>`;
  if (node.image) content += `<img src="${node.image}" style="margin-top: 12px; max-width: 100%;">`;
  if (node.classic) content += `<p><strong>🌟 Classic:</strong> ${node.classic}</p>`;
  if (node.person) content += `<p><strong>👤 Person:</strong> ${node.person}</p>`;
  if (node.videoUrl) content += `<iframe width="100%" height="200" src="${node.videoUrl}" frameborder="0" allowfullscreen></iframe>`;
  cardBox.innerHTML = content;
  cardOverlay.style.display = 'flex';

  // 取消之前的朗读
  window.speechSynthesis.cancel();

  // 获取按钮引用
  const speakBtn = document.getElementById('speakNodeBtn');
  const prevBtn = document.getElementById('prevNodeBtn');
  const nextBtn = document.getElementById('nextNodeBtn');

  // 如果用户之前手动停止了朗读，则新页面保持静音状态
  if (!userStoppedManually) {
    currentSpeech = createSpeechForNode(node, () => {
      autoPlayIndex++;
      setTimeout(playNextCard, 300);
    });
    window.speechSynthesis.speak(currentSpeech);
    isSpeaking = true;
    speakBtn.textContent = '⏹️ Stop';
  } else {
    currentSpeech = null;
    isSpeaking = false;
    speakBtn.textContent = '🔊 Resume';
  }

  // “朗读/恢复”按钮事件：点击时切换朗读状态
  speakBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    if (isSpeaking) {
      // 用户点击停止，则标记为手动停止，并保持静音
      userStoppedManually = true;
      window.speechSynthesis.cancel();
      isSpeaking = false;
      speakBtn.textContent = '🔊 Resume';
    } else {
      // 用户点击恢复，则清除手动停止标记，并启动朗读（自动朗读结束后自动跳转）
      userStoppedManually = false;
      currentSpeech = createSpeechForNode(node, () => {
         autoPlayIndex++;
         setTimeout(playNextCard, 300);
      });
      window.speechSynthesis.speak(currentSpeech);
      isSpeaking = true;
      speakBtn.textContent = '⏹️ Stop';
    }
  });

    // “上一页”按钮事件：点击时直接切换上一页，前页保持静音状态
  prevBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    // 停止当前朗读
    window.speechSynthesis.cancel();
    isSpeaking = false;
    currentSpeech = null;
  
    // 倒退一个节点
    autoPlayIndex = Math.max(0, autoPlayIndex - 1);
    userStoppedManually = true;
    setTimeout(playNextCard, 300);
  });

  // “下一页”按钮事件：点击时直接切换下一页，新页保持静音状态
  nextBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    // 设置为手动停止状态，这样新页不会自动朗读
    userStoppedManually = true;
    window.speechSynthesis.cancel();
    isSpeaking = false;
    currentSpeech = null;
    autoPlayIndex++;
    setTimeout(playNextCard, 300);
  });
}




closeBtn.addEventListener('click', () => {
  cardOverlay.style.display = 'none';
  stopAutoPlay();
});


    /********* 17. 节点html粘帖编辑功能，可以导出新的data.js  **********/

const exportBtn = document.createElement('button');
exportBtn.textContent = "💾 Export Data";
exportBtn.id = "btnExportData";
document.getElementById('controls').appendChild(exportBtn);
    

// ⏳ 获取原始 <script src="data/xxx.js"> 文件路径
const getOriginalDataFilename = () => {
  const scriptTags = document.querySelectorAll('script[src]');
  for (const tag of scriptTags) {
    const src = tag.getAttribute('src');
    if (src.includes('data/') && src.endsWith('.js')) {
      return src.split('/').pop(); // 提取如 business-school-data.js
    }
  }
  return 'data.js';
};

// ⌛ 时间戳备份名生成
const generateBackupName = (originalName) => {
  const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
  return `${originalName.replace('.js', '')}.backup.${timestamp}.js`;
};

// 📦 导出逻辑
exportBtn.addEventListener('click', () => {
  const filename = getOriginalDataFilename();
  const backupName = generateBackupName(filename);

  // 准备 JSON 内容
  const content = `window.mindmapData = ${JSON.stringify(window.mindmapData, null, 2)};`;

  // 备份文件
  const backupBlob = new Blob([content], { type: 'application/javascript' });
  const backupLink = document.createElement('a');
  backupLink.href = URL.createObjectURL(backupBlob);
  backupLink.download = backupName;
  backupLink.click();

  // 提示用户保存正式文件
  alert(`✅ Backup saved as: ${backupName}\n\nYou can now choose to export the final version.`);

  // 下载主文件（手动保存，需确认）
  const confirmExport = confirm(`Do you want to export the main file now?\n(${filename})`);
  if (confirmExport) {
    const blob = new Blob([content], { type: 'application/javascript' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = filename;
    link.click();
  }
});



    /********* 初始化布局**********/

      layoutNodes();
      
        // 调度一次初始更新
      //scheduleUpdate();


      updateNodePositions();
      updateBoundingBox();
      setTimeout(() => focusOnNode(0), 100);
      activeNodeIndex = 0;
}


// 将 initMindmap 挂载到全局
window.initMindmap = initMindmap;