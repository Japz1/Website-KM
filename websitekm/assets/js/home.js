/**
 * home.js — Logic for index.html
 */

document.addEventListener('DOMContentLoaded', async () => {
  setupHeroSearch();
  await loadHomeData();
});

/* ---- Hero search ---- */
function setupHeroSearch() {
  const input = document.getElementById('heroSearch');
  const clear = document.getElementById('heroSearchClear');
  if (!input) return;

  input.addEventListener('input', () => {
    clear.classList.toggle('visible', input.value.length > 0);
  });

  clear.addEventListener('click', () => {
    input.value = '';
    clear.classList.remove('visible');
    input.focus();
  });

  const form = document.getElementById('heroSearchForm');
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const q = input.value.trim();
    if (q) {
      window.location.href = `library.html?q=${encodeURIComponent(q)}`;
    } else {
      window.location.href = 'library.html';
    }
  });
}

/* ---- Main data loading ---- */
async function loadHomeData() {
  try {
    const [categories, knowledge] = await Promise.all([loadCategories(), loadKnowledge()]);

    renderFeaturedCategories(categories, knowledge);
    renderFeaturedKnowledge(knowledge, categories);
    renderLatestKnowledge(knowledge, categories);
    renderStats(categories, knowledge);
  } catch (err) {
    console.error('Failed to load home data:', err);
    showError('Gagal memuat data. Pastikan aplikasi dijalankan melalui server lokal (mis. Live Server).');
  }
}

/* ---- Stats ---- */
function renderStats(categories, knowledge) {
  const el = document.getElementById('statsStrip');
  if (!el) return;
  el.innerHTML = `
    <div class="stat-item">
      <div class="stat-number">${knowledge.length}</div>
      <div class="stat-label">Total Artikel</div>
    </div>
    <div class="stat-item">
      <div class="stat-number">${categories.length}</div>
      <div class="stat-label">Kategori</div>
    </div>
    <div class="stat-item">
      <div class="stat-number">100%</div>
      <div class="stat-label">Gratis & Terbuka</div>
    </div>
    <div class="stat-item">
      <div class="stat-number">ID</div>
      <div class="stat-label">Bahasa Indonesia</div>
    </div>
  `;
}

/* ---- Featured Categories ---- */
function renderFeaturedCategories(categories, knowledge) {
  const el = document.getElementById('featuredCategories');
  if (!el) return;

  const counts = {};
  knowledge.forEach(k => {
    counts[k.categoryId] = (counts[k.categoryId] || 0) + 1;
  });

  el.innerHTML = categories
    .map(cat => renderCategoryCard(cat, counts[cat.id] || 0))
    .join('');
}

/* ---- Featured Knowledge ---- */
function renderFeaturedKnowledge(knowledge, categories) {
  const el = document.getElementById('featuredKnowledge');
  if (!el) return;

  const catMap = {};
  categories.forEach(c => { catMap[c.id] = c; });

  const featured = knowledge.filter(k => k.featured).slice(0, 3);
  if (featured.length === 0) {
    el.innerHTML = renderEmptyState('Belum ada artikel unggulan', '', false);
    return;
  }

  el.innerHTML = featured.map(item => renderKnowledgeCard(item, catMap[item.categoryId])).join('');
}

/* ---- Latest Knowledge ---- */
function renderLatestKnowledge(knowledge, categories) {
  const el = document.getElementById('latestKnowledge');
  if (!el) return;

  const catMap = {};
  categories.forEach(c => { catMap[c.id] = c; });

  const latest = [...knowledge]
    .sort((a, b) => new Date(b.publishedAt) - new Date(a.publishedAt))
    .slice(0, 6);

  el.innerHTML = latest.map(item => renderKnowledgeCard(item, catMap[item.categoryId])).join('');
}

function showError(msg) {
  const containers = ['featuredCategories', 'featuredKnowledge', 'latestKnowledge'];
  containers.forEach(id => {
    const el = document.getElementById(id);
    if (el) el.innerHTML = `<div class="empty-state"><div class="empty-state-title">${msg}</div></div>`;
  });
}

