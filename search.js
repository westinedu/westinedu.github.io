// search.js

window.setupSearchFeature = function(nodes) {
  const searchInput = document.getElementById('searchInput');
  const searchResults = document.getElementById('searchResults');

  searchInput.addEventListener('input', () => {
    const query = searchInput.value.trim().toLowerCase();
    searchResults.innerHTML = '';
    if (query === '') return;

    nodes.forEach((node, i) => {
      const titleMatch = node.text.toLowerCase().includes(query);
      const descMatch = node.description && node.description.toLowerCase().includes(query);
      if (titleMatch || descMatch) {
        const li = document.createElement('li');
        li.textContent = node.text;
        li.style.cursor = 'pointer';
        li.style.marginBottom = '4px';
        li.style.color = '#4f46e5';
        li.style.textDecoration = 'underline';

        li.addEventListener('click', () => {
          focusOnNode(i);
        });

        searchResults.appendChild(li);
      }
    });
  });
};

// function focusOnNode(index) {
//   const el = document.querySelector(`.node[data-index="${index}"]`);
//   if (!el) return;

//   // 移除其他节点的高亮
//   document.querySelectorAll('.node').forEach(node => {
//     node.classList.remove("highlighted");
//   });

//   // 添加新高亮并设置更明显的样式
//   el.classList.add("highlighted");
//   el.style.zIndex = 9999; // 确保在最上层

//   // 滚动到视图
//   el.scrollIntoView({ behavior: "smooth", block: "center", inline: "center" });

//   // 延长高亮持续时间
//   setTimeout(() => {
//     el.classList.remove("highlighted");
//     el.style.zIndex = ''; // 恢复层级
//   }, 5000); // 延长至5秒
// }
//window.focusOnNode = focusOnNode;
