// search.js V1.1 基本完成准备上线

window.setupSearchFeature = function(nodes) {
  const searchInput = document.getElementById('searchInput');
  const searchResults = document.getElementById('searchResults');
  // ① 获取你在 HTML 中已添加的取消按钮
  const cancelButton = document.getElementById('cancelButton');

  // 监听输入事件
  searchInput.addEventListener('input', () => {
    const query = searchInput.value.trim().toLowerCase();
    // 清空之前的搜索结果
    searchResults.innerHTML = '';

    // 如果输入为空，则隐藏取消按钮并结束
    if (query === '') {
      cancelButton.style.display = 'none';
      return;
    } else {
      // 如果有内容，显示取消按钮
      cancelButton.style.display = 'inline'; 
    }

    // 保持原有的搜索逻辑
    nodes.forEach((node, i) => {
      const titleMatch = node.text.toLowerCase().includes(query);
      const descMatch = node.description && node.description.toLowerCase().includes(query);
      const person = node.person && node.person.toLowerCase().includes(query);
      if (titleMatch || descMatch || person) {
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

  // ② 点击取消按钮：清空搜索框和搜索结果，并隐藏按钮
  cancelButton.addEventListener('click', () => {
    searchInput.value = '';
    searchResults.innerHTML = '';
    cancelButton.style.display = 'none';
    // 重新聚焦搜索输入框，确保后续输入能触发事件
    //searchInput.focus();
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
