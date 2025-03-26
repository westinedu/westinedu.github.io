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

function focusOnNode(index) {
  const el = document.querySelector(`.node[data-index="${index}"]`);
  if (!el) return;
  el.scrollIntoView({ behavior: "smooth", block: "center", inline: "center" });
  el.classList.add("highlighted");
  setTimeout(() => {
    el.classList.remove("highlighted");
  }, 3000);
}
window.focusOnNode = focusOnNode;
