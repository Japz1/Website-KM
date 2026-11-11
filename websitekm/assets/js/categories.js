/**
 * categories.js — Logic for categories.html
 */

document.addEventListener('DOMContentLoaded', async () => {
  await loadCategoriesPage();
});

async function loadCategoriesPage() {
  const grid = document.getElementById('categoriesGrid');
  if (!grid) return;

  grid.innerHTML = renderLoadingState();

  try {
    const [categories, knowledge] = await Promise.all([loadCategories(), loadKnowledge()]);

    const counts = {};
    knowledge.forEach(k => {
      counts[k.categoryId] = (counts[k.categoryId] || 0) + 1;
    });

    // Update total count in header
    const totalEl = document.getElementById('totalCategories');
    if (totalEl) totalEl.textContent = categories.length;

    grid.innerHTML = categories
      .map(cat => renderCategoryCardLarge(cat, counts[cat.id] || 0, knowledge))
      .join('');

  } catch (err) {
    console.error('Failed to load categories:', err);
    grid.innerHTML = renderEmptyState(
      'Gagal memuat kategori',
      'Pastikan aplikasi dijalankan melalui server lokal (mis. VS Code Live Server).',
      false
    );
  }
}

const categoryColors = {
  CAT001: '#17365D',
  CAT002: '#315B88',
  CAT003: '#1B6B3A',
  CAT004: '#7C3D12',
  CAT005: '#5B21B6',
};

function renderCategoryCardLarge(cat, count, knowledge) {
  const bg = categoryColors[cat.id] || '#17365D';

  // Sample article titles for this category (up to 3)
  const samples = knowledge
    .filter(k => k.categoryId === cat.id)
    .slice(0, 3)
    .map(k => `<li>${escapeHtml(k.title)}</li>`)
    .join('');

  return `
    <div class="cat-card-large">
      <div class="cat-card-icon-wrap" style="background:${bg}20; border-color:${bg}30">
        <div class="category-icon" style="background:${bg}">
          ${icon(cat.icon)}
        </div>
      </div>
      <div class="cat-card-body">
        <div class="cat-card-top">
          <h2 class="cat-card-name">${escapeHtml(cat.name)}</h2>
          <span class="category-count">${icon('book-open', 14)} ${count} artikel</span>
        </div>
        <p class="cat-card-desc">${escapeHtml(cat.description)}</p>
        ${samples ? `<ul class="cat-sample-list">${samples}</ul>` : ''}
        <a href="library.html?category=${encodeURIComponent(cat.id)}" class="btn btn-outline btn-sm cat-explore-btn" style="border-color:${bg}; color:${bg}">
          Jelajahi Kategori ${icon('arrow-right', 14)}
        </a>
      </div>
    </div>
  `;
}

