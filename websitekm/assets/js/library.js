/**
 * library.js — Logic for library.html
 */

let _allKnowledge   = [];
let _allCategories  = [];
let _activeCategory = '';
let _searchQuery    = '';

document.addEventListener('DOMContentLoaded', async () => {
  await initLibrary();
});

async function initLibrary() {
  const grid = document.getElementById('knowledgeGrid');
  if (!grid) return;

  grid.innerHTML = renderLoadingState();

  try {
    [_allCategories, _allKnowledge] = await Promise.all([loadCategories(), loadKnowledge()]);
  } catch (err) {
    console.error('Library load error:', err);
    grid.innerHTML = renderEmptyState(
      'Gagal memuat data',
      'Jalankan aplikasi melalui server lokal (mis. VS Code Live Server).',
      false
    );
    return;
  }

  // Read URL params
  _activeCategory = getParam('category');
  _searchQuery    = getParam('q');

  // Build filter buttons
  buildFilterBar();

  // Build search bar
  setupSearch();

  // Render
  renderLibrary();

  // Update total count
  updateTotalCount();
}

/* ---- Filter bar ---- */
function buildFilterBar() {
  const bar = document.getElementById('filterBar');
  if (!bar) return;

  const allBtn = `<button class="filter-btn ${!_activeCategory ? 'active' : ''}" data-cat="" onclick="setCategory('')">Semua Artikel</button>`;
  const catBtns = _allCategories.map(cat =>
    `<button class="filter-btn ${_activeCategory === cat.id ? 'active' : ''}" data-cat="${cat.id}" onclick="setCategory('${cat.id}')">${escapeHtml(cat.name)}</button>`
  ).join('');

  bar.innerHTML = allBtn + catBtns;
}

/* ---- Search ---- */
function setupSearch() {
  const input = document.getElementById('librarySearch');
  const clear = document.getElementById('librarySearchClear');
  if (!input) return;

  if (_searchQuery) {
    input.value = _searchQuery;
    clear.classList.add('visible');
  }

  input.addEventListener('input', () => {
    _searchQuery = input.value.trim();
    clear.classList.toggle('visible', _searchQuery.length > 0);
    renderLibrary();
    updateTotalCount();
  });

  clear.addEventListener('click', () => {
    _searchQuery = '';
    input.value = '';
    clear.classList.remove('visible');
    renderLibrary();
    updateTotalCount();
  });
}

/* ---- Public actions ---- */
function setCategory(catId) {
  _activeCategory = catId;

  // Update active button
  document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.cat === catId);
  });

  renderLibrary();
  updateTotalCount();
}

function clearFilters() {
  _searchQuery = '';
  _activeCategory = '';
  const input = document.getElementById('librarySearch');
  if (input) { input.value = ''; }
  const clear = document.getElementById('librarySearchClear');
  if (clear) clear.classList.remove('visible');
  document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.cat === '');
  });
  renderLibrary();
  updateTotalCount();
}

/* ---- Render ---- */
function renderLibrary() {
  const grid = document.getElementById('knowledgeGrid');
  if (!grid) return;

  const catMap = {};
  _allCategories.forEach(c => { catMap[c.id] = c; });

  let results = _allKnowledge;

  if (_activeCategory) {
    results = results.filter(k => k.categoryId === _activeCategory);
  }

  if (_searchQuery) {
    results = results.filter(k => matchesSearch(k, _searchQuery));
  }

  if (results.length === 0) {
    const hasFilter = _activeCategory || _searchQuery;
    grid.innerHTML = renderEmptyState(
      hasFilter ? 'Tidak ada artikel yang cocok' : 'Belum ada artikel',
      hasFilter ? 'Coba kata kunci lain atau hapus filter yang aktif.' : 'Artikel akan segera tersedia.',
      hasFilter
    );
    return;
  }

  grid.innerHTML = results.map(item => renderKnowledgeCard(item, catMap[item.categoryId])).join('');
}

function updateTotalCount() {
  const el = document.getElementById('totalCount');
  if (!el) return;

  let count = _allKnowledge.length;

  if (_activeCategory || _searchQuery) {
    let filtered = _allKnowledge;
    if (_activeCategory) filtered = filtered.filter(k => k.categoryId === _activeCategory);
    if (_searchQuery) filtered = filtered.filter(k => matchesSearch(k, _searchQuery));
    count = filtered.length;
  }

  el.textContent = count;
}

