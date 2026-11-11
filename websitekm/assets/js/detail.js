/**
 * detail.js — Logic for detail.html
 */

document.addEventListener('DOMContentLoaded', async () => {
  await loadDetailPage();
});

async function loadDetailPage() {
  const articleId = getParam('id');
  const main = document.getElementById('detailMain');
  if (!main) return;

  if (!articleId) {
    renderNotFound(main, 'ID artikel tidak ditemukan dalam URL.');
    return;
  }

  main.innerHTML = renderLoadingState();

  try {
    const [categories, knowledge] = await Promise.all([loadCategories(), loadKnowledge()]);

    const catMap = {};
    categories.forEach(c => { catMap[c.id] = c; });

    const article = knowledge.find(k => k.id === articleId);

    if (!article) {
      renderNotFound(main, `Artikel dengan ID "${escapeHtml(articleId)}" tidak ditemukan.`);
      return;
    }

    const category = catMap[article.categoryId];

    // Update page title
    document.title = `${article.title} — Beasiswa Knowledge Base`;

    // Render breadcrumb in header
    renderBreadcrumb(article, category);

    // Render header info
    renderDetailHeader(article, category);

    // Render article body
    renderArticle(main, article, category);

    // Render sidebar
    renderSidebar(knowledge, catMap, article);

  } catch (err) {
    console.error('Detail page error:', err);
    renderNotFound(main, 'Gagal memuat artikel. Pastikan aplikasi dijalankan melalui server lokal.');
  }
}

/* ---- Breadcrumb ---- */
function renderBreadcrumb(article, category) {
  const el = document.getElementById('breadcrumb');
  if (!el) return;
  el.innerHTML = `
    <a href="index.html">Home</a>
    <span class="breadcrumb-sep">/</span>
    <a href="library.html">Knowledge Library</a>
    <span class="breadcrumb-sep">/</span>
    ${category ? `<a href="library.html?category=${encodeURIComponent(category.id)}">${escapeHtml(category.name)}</a><span class="breadcrumb-sep">/</span>` : ''}
    <span>${escapeHtml(article.title)}</span>
  `;
}

/* ---- Detail header ---- */
function renderDetailHeader(article, category) {
  const catEl    = document.getElementById('detailCategory');
  const titleEl  = document.getElementById('detailTitle');
  const descEl   = document.getElementById('detailDesc');
  const dateEl   = document.getElementById('detailDate');

  if (catEl && category) {
    catEl.innerHTML = `<span class="badge badge-${article.categoryId.toLowerCase()}">${escapeHtml(category.name)}</span>`;
  }
  if (titleEl) titleEl.textContent = article.title;
  if (descEl) descEl.textContent = article.description;
  if (dateEl) dateEl.innerHTML = `${icon('calendar')} ${formatDate(article.publishedAt)}`;
}

/* ---- Article body ---- */
function renderArticle(container, article, category) {
  const c = article.content || {};

  const sectionsHtml = (c.sections || [])
    .map(s => `
      <div class="article-section">
        <h3>${escapeHtml(s.heading)}</h3>
        <p>${escapeHtml(s.body)}</p>
      </div>
    `).join('');

  const tipsHtml = (c.tips && c.tips.length)
    ? `<div class="article-section">
        <h3>Tips &amp; Rekomendasi</h3>
        <ul class="tips-list">
          ${c.tips.map(t => `<li>${escapeHtml(t)}</li>`).join('')}
        </ul>
      </div>`
    : '';

  const notesHtml = c.notes
    ? `<div class="article-notes">
        <div>${icon('alert-circle', 20)}</div>
        <div>
          <div class="article-notes-label">Catatan Penting</div>
          <p>${escapeHtml(c.notes)}</p>
        </div>
      </div>`
    : '';

  const src = article.source || {};
  const sourceHtml = `
    <div class="source-box">
      <div>${icon('link', 18)}</div>
      <div>
        <div class="source-label">Sumber Informasi</div>
        <div class="source-name">${escapeHtml(src.name || 'Tidak tersedia')}</div>
        <div class="source-meta">Jenis: ${escapeHtml(src.type || '')}${src.dateVerified ? ' &nbsp;|&nbsp; Diverifikasi: ' + escapeHtml(src.dateVerified) : ''}</div>
        ${src.url ? `<a href="${escapeHtml(src.url)}" target="_blank" rel="noopener" class="source-link">${escapeHtml(src.url)}</a>` : ''}
      </div>
    </div>
  `;

  container.innerHTML = `
    <article class="article-body">
      <div class="article-meta-row" id="detailCategory"></div>
      <h1 class="article-title" id="detailTitle"></h1>
      <p id="detailDesc" style="color:var(--color-text-secondary);margin-bottom:1rem;font-size:.9375rem"></p>
      <div class="knowledge-card-date" id="detailDate" style="margin-bottom:1.5rem;font-size:.8125rem;color:var(--color-text-secondary)"></div>

      ${c.overview ? `<blockquote class="article-overview">${escapeHtml(c.overview)}</blockquote>` : ''}

      ${sectionsHtml}
      ${tipsHtml}
      ${notesHtml}
      ${sourceHtml}
    </article>
  `;

  // Now populate the meta fields rendered inside the article
  const catEl   = container.querySelector('#detailCategory');
  const titleEl = container.querySelector('#detailTitle');
  const descEl  = container.querySelector('#detailDesc');
  const dateEl  = container.querySelector('#detailDate');

  if (catEl && category) {
    catEl.innerHTML = `<span class="badge badge-${article.categoryId.toLowerCase()}">${escapeHtml(category.name)}</span>`;
  }
  if (titleEl) titleEl.textContent = article.title;
  if (descEl) descEl.textContent = article.description;
  if (dateEl) dateEl.innerHTML = `${icon('calendar')} ${formatDate(article.publishedAt)}`;
}

/* ---- Sidebar ---- */
function renderSidebar(knowledge, catMap, currentArticle) {
  const sidebar = document.getElementById('detailSidebar');
  if (!sidebar) return;

  // Related: same category, exclude current
  const related = knowledge
    .filter(k => k.categoryId === currentArticle.categoryId && k.id !== currentArticle.id)
    .slice(0, 5);

  // Category info
  const cat = catMap[currentArticle.categoryId];
  const bg  = { CAT001:'#17365D', CAT002:'#315B88', CAT003:'#1B6B3A', CAT004:'#7C3D12', CAT005:'#5B21B6' }[currentArticle.categoryId] || '#17365D';

  const categoryCard = cat ? `
    <div class="sidebar-card">
      <div class="sidebar-title">Kategori Ini</div>
      <div style="display:flex;gap:.75rem;align-items:center;margin-bottom:.75rem">
        <div class="category-icon" style="background:${bg};width:36px;height:36px">${icon(cat.icon, 18)}</div>
        <div>
          <div style="font-weight:700;font-size:.875rem;color:var(--color-primary)">${escapeHtml(cat.name)}</div>
          <div style="font-size:.75rem;color:var(--color-text-secondary)">${escapeHtml(cat.description)}</div>
        </div>
      </div>
      <a href="library.html?category=${encodeURIComponent(cat.id)}" class="btn btn-outline btn-sm" style="width:100%;justify-content:center">
        Lihat Semua ${icon('arrow-right', 14)}
      </a>
    </div>
  ` : '';

  const relatedHtml = related.length
    ? `<div class="sidebar-card">
        <div class="sidebar-title">Artikel Terkait</div>
        ${related.map((item, i) => `
          <a href="detail.html?id=${encodeURIComponent(item.id)}" class="related-item">
            <span class="related-item-num">${i + 1}</span>
            <span class="related-item-title">${escapeHtml(item.title)}</span>
          </a>
        `).join('')}
      </div>`
    : '';

  const backHtml = `
    <div class="sidebar-card">
      <a href="library.html" class="btn btn-primary btn-sm" style="width:100%;justify-content:center">
        ${icon('book-open', 14)} Ke Knowledge Library
      </a>
    </div>
  `;

  sidebar.innerHTML = categoryCard + relatedHtml + backHtml;
}

/* ---- Not Found ---- */
function renderNotFound(container, msg) {
  container.innerHTML = `
    <div class="not-found-box">
      ${icon('x-circle', 48)}
      <div class="not-found-title">Artikel Tidak Ditemukan</div>
      <p class="not-found-desc">${escapeHtml(msg)}</p>
      <a href="library.html" class="btn btn-primary">Kembali ke Knowledge Library</a>
    </div>
  `;
}

