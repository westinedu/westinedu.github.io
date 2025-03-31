// main.js  V1.5 暂时不启用编辑文本框，因为还没有实现保存功能
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
let currentScale = 1;  // 初始缩放倍数

/**
 * 应用平移 + 缩放到 #mapWrap
 */
function applyTransform() {
    const mapWrap = document.getElementById('mapWrap');
    mapWrap.style.transform = `translate(${currentTranslateX}px, ${currentTranslateY}px) scale(${currentScale})`;
    mapWrap.style.transformOrigin = "0 0";
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
  // 否则，直接用 textContent 显示标题
  titleEl.textContent = node.text || `Node ${i}`;
}

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
staticDescEl.innerHTML = node.description || "无节点介绍";
staticDescEl.style.marginTop = "4px";
staticDescEl.style.fontStyle = "normal";
// 可以添加其他样式，例如颜色、字号等
div.appendChild(staticDescEl);

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
    div.appendChild(staticDescEl);
    div.appendChild(toggleBtn);
    // div.appendChild(editableCommentEl);
    // div.appendChild(editBtn);

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
        // 重要节点信息
        if (node.important) {
            const extraInfo = document.createElement('div');
            extraInfo.className = 'extra-info';
            extraInfo.innerHTML = `<div>${node.classic}</div><div>人物：${node.person}</div>`;
            if (node.image) {
                const img = document.createElement('img');
                img.src = node.image;
                extraInfo.appendChild(img);
            }
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
                e.target.classList.contains('rich-text')
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
  function setScale(newScale) {
    currentScale = newScale;
    applyTransform();
    scheduleUpdate();
  }
  document.getElementById('zoomIn').addEventListener('click', () => {
    setScale(Math.min(currentScale * 1.1, 3));
  });
  document.getElementById('zoomOut').addEventListener('click', () => {
    setScale(Math.max(currentScale * 0.9, 0.3));
  });
  function handleWheel(e) {
    e.preventDefault();
    const zoomFactor = e.deltaY > 0 ? 0.9 : 1.1;
    setScale(Math.min(Math.max(currentScale * zoomFactor, 0.3), 3));
  }
  document.addEventListener('keydown', (e) => {
    if (e.ctrlKey || e.metaKey) {
      document.addEventListener('wheel', handleWheel, { passive: false });
    }
  });
  document.addEventListener('keyup', (e) => {
    if (!e.ctrlKey && !e.metaKey) {
      document.removeEventListener('wheel', handleWheel);
    }
  });
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
function highlightNodeOnClick(event) {
    // 获取被点击的元素，排除不需要高亮的元素（如链接、按钮等）
    const node = event.target.closest('.node');
    if (!node) return;  // 如果点击的不是节点，直接返回
    
    const nodeIndex = node.dataset.index;
    const nodeObj = nodes[nodeIndex];

    if (!nodeObj) return;  // 如果该节点不存在，直接返回
    
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

      // 初始化布局
      layoutNodes();
      
        // 调度一次初始更新
      //scheduleUpdate();


      updateNodePositions();
      updateBoundingBox();
      setTimeout(() => focusOnNode(0), 100);
}


// 将 initMindmap 挂载到全局
window.initMindmap = initMindmap;