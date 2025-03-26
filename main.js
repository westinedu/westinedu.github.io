// main.js

// 声明全局变量
window.nodes = [];
window.connections = [];
let childrenMap = {};

const colorPalette = [
    "#FFB6C1", "#ADD8E6", "#90EE90", "#FFFFE0", "#FFDEAD",
    "#E6E6FA", "#F5DEB3", "#F0E68C", "#FFA07A", "#DDA0DD"
  ];

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
    /************************************************************
     * 2. DOM 创建：插入节点元素和 SVG 连线
     ************************************************************/
    const container = document.getElementById('container');
    const mapEl = document.getElementById('map');
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    mapEl.appendChild(svg);

    // 创建节点 DOM（包含展开/折叠按钮、富文本编辑、编辑按钮）
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

      // 如果是视频节点且设置了 videoUrl，则创建 iframe 用于视频嵌入
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

    /************************************************************
     * 3. 布局逻辑：垂直 / 水平 / 星型
     ************************************************************/
    let layoutMode = 'star'; // 'vertical' | 'horizontal' | 'star'

    // ---------- 垂直布局 ----------
    let baseX = 50, nextY = 50;
    const xGap = 150, yGap = 150;
    function layoutVertical(index, level) {
      const node = nodes[index];
      node.x = baseX + level * xGap;
      const children = childrenMap[index];
      if (children && children.length > 0) {
        // 先布局子节点
        children.forEach(child => layoutVertical(child, level + 1));
        // 父节点 y = 第一个子节点 y 和最后一个子节点 y 的中间
        const firstChild = nodes[children[0]];
        const lastChild  = nodes[children[children.length - 1]];
        node.y = (firstChild.y + lastChild.y) / 2;
      } else {
        // 叶子节点 y 逐次增加
        node.y = nextY;
        nextY += yGap;
      }
    }

    // ---------- 水平布局 ----------
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

    // ---------- 星型布局 ----------
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
        // 根节点放在中心
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
        childrenMap[index].forEach(child => {
          total += countNodes(child);
        });
        let currentAngle = angleStart;
        childrenMap[index].forEach(child => {
          const childCount = countNodes(child);
          const angleSpan = (angleEnd - angleStart) * (childCount / total);
          layoutStar(child, level + 1, currentAngle, currentAngle + angleSpan);
          currentAngle += angleSpan;
        });
      }
    }

    // 统一布局函数
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

    /************************************************************
     * 4. 动态边界计算 & 坐标校正
     ************************************************************/
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
      const marginX = width * 0.2;
      const marginY = height * 0.2;
      minX -= marginX;
      minY -= marginY;
      maxX += marginX;
      maxY += marginY;
      if (minX < 0) minX = 0;
      if (minY < 0) minY = 0;
      const mapWidth  = Math.max(800, maxX - minX);
      const mapHeight = Math.max(600, maxY - minY);
      mapEl.style.width  = mapWidth + 'px';
      mapEl.style.height = mapHeight + 'px';
      document.querySelectorAll('.node').forEach(div => {
        const i = +div.dataset.index;
        div.style.left = nodes[i].x + 'px';
        div.style.top  = nodes[i].y + 'px';
      });
      svg.setAttribute('viewBox', `${minX} ${minY} ${mapWidth} ${mapHeight}`);
      svg.style.width  = mapWidth + 'px';
      svg.style.height = mapHeight + 'px';
    }

    /************************************************************
     * 5. 连线更新
     ************************************************************/
    function updateConnections() {
      connections.forEach(([s, e]) => {
        const line = svg.querySelector(`line[data-conn="${s}-${e}"]`);
        const start = nodes[s], end = nodes[e];
        // 若某节点不可见则隐藏连线
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

    /************************************************************
     * 6. 性能优化：使用 requestAnimationFrame
     ************************************************************/
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

    /************************************************************
     * 7. 节点可见性更新
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
        div.style.display = nodes[i].visible ? 'block' : 'none';
      });
      updateConnections();
    }

    /************************************************************
     * 8. 拖拽功能：节点移动后动态更新
     ************************************************************/
    let selectedNode = null;
    let startX = 0, startY = 0;
    let origX = 0, origY = 0;
    document.querySelectorAll('.node').forEach(div => {
      div.addEventListener('pointerdown', (e) => {
        // 如果点击的是编辑按钮、折叠按钮或富文本编辑区域，则不启动拖拽
        if (
          e.target.closest('a') ||  
          e.target.closest('.edit-btn') ||
          e.target.closest('.toggle-btn') ||
          e.target.classList.contains('rich-text')
        ) {
          return;
        }
        selectedNode = div;
        startX = e.clientX;
        startY = e.clientY;
        const i = +div.dataset.index;
        origX = nodes[i].x;
        origY = nodes[i].y;
        div.setPointerCapture(e.pointerId);
        e.preventDefault();
      });
    });

    document.addEventListener('pointermove', (e) => {
      if (!selectedNode) return;
      const i = +selectedNode.dataset.index;
      const dx = e.clientX - startX, dy = e.clientY - startY;
      nodes[i].x = origX + dx;
      nodes[i].y = origY + dy;
      selectedNode.style.left = nodes[i].x + 'px';
      selectedNode.style.top = nodes[i].y + 'px';
      scheduleUpdate();
    });
    document.addEventListener('pointerup', (e) => {
      if (selectedNode) {
        selectedNode.releasePointerCapture(e.pointerId);
        selectedNode = null;
      }
    });

    /************************************************************
     * 9. 缩放功能：与动态尺寸兼容
     ************************************************************/
    let scale = 1;
    function setScale(newScale) {
      scale = newScale;
      mapEl.style.transform = `scale(${scale})`;
      mapEl.style.transformOrigin = '0 0';
      updateConnections();
      updateBoundingBox();
    }
    document.getElementById('zoomIn').addEventListener('click', () => {
      setScale(Math.min(scale * 1.1, 3));
    });
    document.getElementById('zoomOut').addEventListener('click', () => {
      setScale(Math.max(scale * 0.9, 0.3));
    });
    function handleWheel(e) {
      e.preventDefault();
      const zoomFactor = e.deltaY > 0 ? 0.9 : 1.1;
      setScale(Math.min(Math.max(scale * zoomFactor, 0.3), 3));
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
     * 10. 分别绑定三个按钮切换布局
     ************************************************************/
    document.getElementById('btnVertical').addEventListener('click', () => {
      layoutMode = 'vertical';
      // 重置辅助变量
      nextY = 50; 
      layoutNodes();
    });
    document.getElementById('btnHorizontal').addEventListener('click', () => {
      layoutMode = 'horizontal';
      // 重置辅助变量
      nextX = 50; 
      layoutNodes();
    });
    document.getElementById('btnStar').addEventListener('click', () => {
      layoutMode = 'star';
      layoutNodes();
    });

    /************************************************************
     * 11. 初始化：默认垂直布局
     ************************************************************/
    layoutNodes();

}



// 挂载初始化函数到全局
window.initMindmap = initMindmap;
