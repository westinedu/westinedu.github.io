// main.js

// 声明全局变量
window.nodes = [];
window.connections = [];
let childrenMap = {};

const colorPalette = [
  "#FFB6C1", "#ADD8E6", "#90EE90", "#FFFFE0", "#FFDEAD",
  "#E6E6FA", "#F5DEB3", "#F0E68C", "#FFA07A", "#DDA0DD"
];

// 全局变量：记录画布平移与缩放状态（统一作用于 #mapWrap）
let currentTranslateX = 0, currentTranslateY = 0;
let currentScale = 1;  // 初始缩放为1

// 更新 #mapWrap 的 transform（平移+缩放）
function applyTransform() {
  const mapWrap = document.getElementById('mapWrap');
  mapWrap.style.transform = `translate(${currentTranslateX}px, ${currentTranslateY}px) scale(${currentScale})`;
  mapWrap.style.transformOrigin = "0 0";
}

// 初始化函数：传入数据对象
function initMindmap(data) {
  window.nodes = data.nodes;
  window.connections = data.connections;

  // 构建 childrenMap 与设置 parent 属性
  childrenMap = {};
  connections.forEach(([p, c]) => {
    if (!childrenMap[p]) childrenMap[p] = [];
    childrenMap[p].push(c);
  });
  connections.forEach(([p, c]) => {
    nodes[c].parent = p;
  });
  nodes[0].parent = null;
  nodes.forEach(n => n.expanded = true);

  // 渲染导图
  const mapEl = document.getElementById('map');
  const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  mapEl.appendChild(svg);

  // 创建节点 DOM（包含标题、按钮、富文本编辑、视频嵌入、额外信息等）
  nodes.forEach((node, i) => {
    const div = document.createElement('div');
    div.className = 'node';
    // 若为根节点，可额外突出显示
    if (i === 0) {
      div.style.fontSize = '1.2rem';
      div.style.border = '2px solid #000';
      div.style.padding = '12px';
    }
    // 标题
    const titleEl = document.createElement('div');
    titleEl.textContent = node.text;
    titleEl.style.fontWeight = 'bold';
    // 展开/折叠按钮
    const toggleBtn = document.createElement('button');
    toggleBtn.className = 'toggle-btn';
    toggleBtn.textContent = "−";
    toggleBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      node.expanded = !node.expanded;
      toggleBtn.textContent = node.expanded ? "−" : "+";
      updateVisibility();
    });
    // 富文本编辑区域（默认不可编辑）
    const richTextEl = document.createElement('div');
    richTextEl.className = 'rich-text';
    richTextEl.contentEditable = "false";
    richTextEl.innerHTML = node.description || "在此输入说明和评论...";
    // 编辑按钮
    const editBtn = document.createElement('button');
    editBtn.className = 'edit-btn';
    editBtn.textContent = '编辑';
    editBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      if (richTextEl.contentEditable === "true") {
        richTextEl.contentEditable = "false";
        editBtn.textContent = "编辑";
        richTextEl.blur();
      } else {
        richTextEl.contentEditable = "true";
        editBtn.textContent = "确认";
        richTextEl.focus();
      }
    });
    // 组装节点内容
    div.appendChild(titleEl);
    div.appendChild(toggleBtn);
    div.appendChild(richTextEl);
    div.appendChild(editBtn);
    // 如果是视频节点且设置了 videoUrl，则创建 iframe 嵌入视频
    if (node.videoUrl) {
      const iframe = document.createElement('iframe');
      iframe.src = node.videoUrl;
      iframe.width = "300";
      iframe.height = "169";  // 16:9比例
      iframe.frameBorder = "0";
      iframe.style.border = "none";
      iframe.allow = "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture";
      iframe.allowFullscreen = true;
      iframe.style.display = "block";
      iframe.style.marginTop = "8px";
      div.appendChild(iframe);
    }
    // 若为重要节点，添加额外信息（图片等）
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
    // 设置初始位置
    div.style.left = (node.x || 0) + 'px';
    div.style.top  = (node.y || 0) + 'px';
    div.style.backgroundColor = colorPalette[i % colorPalette.length];
    div.dataset.index = i;
    mapEl.appendChild(div);
    // 记录节点尺寸
    const rect = div.getBoundingClientRect();
    node.width = rect.width;
    node.height = rect.height;
  });

  // 创建连线 DOM
  connections.forEach(([startIdx, endIdx]) => {
    const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
    line.setAttribute('stroke', '#999');
    line.setAttribute('stroke-width', '2');
    line.dataset.conn = `${startIdx}-${endIdx}`;
    svg.appendChild(line);
  });

  /********* 3. 布局逻辑 **********/
  // 可选布局模式：vertical, horizontal, star
  let layoutMode = 'star';

  // 垂直布局（不修改）
  let baseX = 50, nextY = 50;
  const xGap = 150, yGap = 150;
  function layoutVertical(index, level) {
    const node = nodes[index];
    node.x = baseX + level * xGap;
    const children = childrenMap[index];
    if (children && children.length > 0) {
      children.forEach(child => layoutVertical(child, level + 1));
      const firstChild = nodes[children[0]];
      const lastChild  = nodes[children[children.length - 1]];
      node.y = (firstChild.y + lastChild.y) / 2;
    } else {
      node.y = nextY;
      nextY += yGap;
    }
  }

  let baseY = 50, nextX = 50;
  const xGap2 = 150, yGap2 = 150;
  function layoutHorizontal(index, level) {
    const node = nodes[index];
    node.y = baseY + level * yGap2;
    const children = childrenMap[index];
    if (children && children.length > 0) {
      children.forEach(child => layoutHorizontal(child, level + 1));
      const firstChild = nodes[children[0]];
      const lastChild  = nodes[children[children.length - 1]];
      node.x = (firstChild.x + lastChild.x) / 2;
    } else {
      node.x = nextX;
      nextX += xGap2;
    }
  }

  // 星型布局（不修改）
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

  function layoutNodes() {
    if (layoutMode === 'vertical') {
      nextY = 50;
      layoutVertical(0, 0);
    } else if (layoutMode === 'horizontal') {
      nextX = 50;
      layoutHorizontal(0, 0);
    } else if (layoutMode === 'star') {
      layoutStar(0, 0, 0, Math.PI * 2);
    }
    scheduleUpdate();
  }

  /********* 4. 动态边界计算 & 坐标校正 **********/
  function updateBoundingBox() {
    let minX = Infinity, minY = Infinity;
    let maxX = -Infinity, maxY = -Infinity;
    nodes.forEach(n => {
      const left   = n.x;
      const right  = n.x + (n.width  || 0);
      const top    = n.y;
      const bottom = n.y + (n.height || 0);
      if (left < minX)  minX = left;
      if (top < minY)   minY = top;
      if (right > maxX) maxX = right;
      if (bottom > maxY) maxY = bottom;
    });
    let shiftX = 0, shiftY = 0;
    if (minX < 0) shiftX = -minX;
    if (minY < 0) shiftY = -minY;
    if (shiftX !== 0 || shiftY !== 0) {
      nodes.forEach(n => {
        n.x += shiftX;
        n.y += shiftY;
      });
      minX = 0; minY = 0;
      maxX += shiftX; maxY += shiftY;
    }
    const width  = maxX - minX;
    const height = maxY - minY;
    // 设置 margin（水平 margin 较大，垂直 margin较小，防止垂直方向浪费）
    const marginX = width * 0.2;
    const marginY = height * 0.01;
    minX -= marginX;
    minY -= marginY;
    maxX += marginX;
    maxY += marginY;
    if (minX < 0) minX = 0;
    if (minY < 0) minY = 0;
    const mapWidth  = Math.max(800, maxX - minX);
    const mapHeight = Math.max(600, maxY - minY);
    const mapEl = document.getElementById('map');
    mapEl.style.width  = mapWidth + 'px';
    mapEl.style.height = mapHeight + 'px';
    document.querySelectorAll('.node').forEach(div => {
      const i = +div.dataset.index;
      div.style.left = nodes[i].x + 'px';
      div.style.top  = nodes[i].y + 'px';
    });
    const svg = mapEl.querySelector('svg');
    svg.setAttribute('viewBox', `${minX} ${minY} ${mapWidth} ${mapHeight}`);
    svg.style.width  = mapWidth + 'px';
    svg.style.height = mapHeight + 'px';
  }

  /********* 5. 连线更新 **********/
  function updateConnections() {
    const mapEl = document.getElementById('map');
    const svg = mapEl.querySelector('svg');
    connections.forEach(([s, e]) => {
      const line = svg.querySelector(`line[data-conn="${s}-${e}"]`);
      const start = nodes[s], end = nodes[e];
      if (!start.visible || !end.visible) {
        line.style.display = 'none';
      } else {
        line.style.display = 'block';
        line.setAttribute('x1', start.x + start.width / 2);
        line.setAttribute('y1', start.y + start.height / 2);
        line.setAttribute('x2', end.x + end.width / 2);
        line.setAttribute('y2', end.y + end.height / 2);
      }
    });
  }

  /********* 6. 性能优化：使用 requestAnimationFrame **********/
  let scheduled = false;
  function scheduleUpdate() {
    if (!scheduled) {
      scheduled = true;
      requestAnimationFrame(() => {
        scheduled = false;
        updateConnections();
        updateBoundingBox();
        updateVisibility();
      });
    }
  }

  /********* 7. 节点可见性更新 **********/
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
      div.style.display = nodes[i].visible ? 'block' : 'none';
    });
    updateConnections();
  }

  /********* 8. 节点拖拽 **********/
  let selectedNode = null;
  let nodeStartX = 0, nodeStartY = 0;
  let nodeOrigX = 0, nodeOrigY = 0;

  // 全局对象用于记录活动中的 pointer 事件
  let activePointers = {};
  let pinchInitialDistance = null;
  let pinchInitialScale = 1;

  document.querySelectorAll('.node').forEach(div => {
    div.addEventListener('pointerdown', (e) => {
      // 如果点击的是编辑、折叠或富文本区域，则不启动节点拖拽
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

      activePointers[e.pointerId] = { x: e.clientX, y: e.clientY };
      // 当当前活动指针数量为2时，初始化捏合缩放
      if (Object.keys(activePointers).length === 2) {
        const pointers = Object.values(activePointers);
        pinchInitialDistance = Math.hypot(
          pointers[0].x - pointers[1].x,
          pointers[0].y - pointers[1].y
        );
        pinchInitialScale = currentScale;
      }
    });
  });
  document.addEventListener('pointermove', (e) => {
    if (!selectedNode) return;
    const i = +selectedNode.dataset.index;
    const dx = e.clientX - nodeStartX, dy = e.clientY - nodeStartY;
    nodes[i].x = nodeOrigX + dx;
    nodes[i].y = nodeOrigY + dy;
    selectedNode.style.left = nodes[i].x + 'px';
    selectedNode.style.top  = nodes[i].y + 'px';
    scheduleUpdate();
//two fingers to zoom in and out
if (activePointers[e.pointerId]) {
  activePointers[e.pointerId] = { x: e.clientX, y: e.clientY };
}
  // 如果有两个指针，则执行捏合缩放
  if (Object.keys(activePointers).length === 2) {
    const pointers = Object.values(activePointers);
    const currentDistance = Math.hypot(
      pointers[0].x - pointers[1].x,
      pointers[0].y - pointers[1].y
    );
    if (pinchInitialDistance) {
      let newScale = pinchInitialScale * (currentDistance / pinchInitialDistance);
      // 限制缩放范围，与原有缩放功能保持一致
      newScale = Math.min(Math.max(newScale, 0.3), 3);
      setScale(newScale);
    }
  }

  });
  document.addEventListener('pointerup', (e) => {
    if (selectedNode) {
      selectedNode.releasePointerCapture(e.pointerId);
      selectedNode = null;
    }

    // two fingers to zoom in and out
    delete activePointers[e.pointerId];
    if (Object.keys(activePointers).length < 2) {
      pinchInitialDistance = null;
    }
  });

  document.addEventListener('pointercancel', (e) => {
    delete activePointers[e.pointerId];
    if (Object.keys(activePointers).length < 2) {
      pinchInitialDistance = null;
    }
  });

  /********* 9. 缩放功能（应用于 #mapWrap） **********/
  function setScale(newScale) {
    currentScale = newScale;
    applyTransform();
    updateConnections();
    updateBoundingBox();
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

  /********* 10. 布局按钮绑定 **********/
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

  /********* 11. 初始化布局 **********/
  layoutNodes();

  /********* 12. 画布平移（应用于 #mapWrap） **********/
  let isPanning = false;
  let panStartX = 0, panStartY = 0;
  const mapWrap = document.getElementById('mapWrap');

  mapWrap.addEventListener('pointerdown', (e) => {
    // 如果点击在节点上，则不启动画布平移
    if (e.target.closest('.node')) return;
    isPanning = true;
    panStartX = e.clientX;
    panStartY = e.clientY;
    mapWrap.setPointerCapture(e.pointerId);
  });
  mapWrap.addEventListener('pointermove', (e) => {
    if (!isPanning) return;
    
    // 计算增量
    const dx = e.clientX - panStartX;
    const dy = e.clientY - panStartY;
    panStartX = e.clientX;
    panStartY = e.clientY;
    
    // 更新当前平移值，并可以限制平移范围
    currentTranslateX += dx;
    currentTranslateY += dy;
    applyTransform();
  });
  mapWrap.addEventListener('pointerup', (e) => {
    if (isPanning) {
      isPanning = false;
      mapWrap.releasePointerCapture(e.pointerId);
    }
  });
  mapWrap.addEventListener('pointercancel', (e) => {
    if (isPanning) {
      isPanning = false;
      mapWrap.releasePointerCapture(e.pointerId);
    }
  });

  /********* 13. 聚焦函数 **********/
  // 使指定节点在容器中居中显示，考虑当前缩放与平移
  window.focusOnNode = function(index) {
    const node = nodes[index];
    if (!node) return;
    const container = document.getElementById('container');
    const containerRect = container.getBoundingClientRect();
    // 计算节点中心（原始坐标）
    const nodeCenterX = node.x + node.width / 2;
    const nodeCenterY = node.y + node.height / 2;
    // 计算新的平移，使节点居中
    currentTranslateX = (containerRect.width / 2) - (nodeCenterX * currentScale);
    currentTranslateY = (containerRect.height / 2) - (nodeCenterY * currentScale);
    applyTransform();

    // 高亮目标节点
    document.querySelectorAll('.node').forEach(n => n.classList.remove("highlighted"));
    const el = document.querySelector(`.node[data-index="${index}"]`);
    el.classList.add("highlighted");
    el.style.zIndex = 9999;
    setTimeout(() => {
      el.classList.remove("highlighted");
      el.style.zIndex = '';
    }, 3000);
  };

  // 初始更新
  scheduleUpdate();
}

// 性能优化：使用 requestAnimationFrame
let scheduled = false;
function scheduleUpdate() {
  if (!scheduled) {
    scheduled = true;
    requestAnimationFrame(() => {
      scheduled = false;
      updateConnections();
      updateBoundingBox();
      updateVisibility();
    });
  }
}

/********* 7. 节点可见性更新 **********/
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
    div.style.display = nodes[i].visible ? 'block' : 'none';
  });
  updateConnections();
}

// 挂载初始化函数到全局
window.initMindmap = initMindmap;
