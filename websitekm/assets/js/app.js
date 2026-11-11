/**
 * app.js — Shared utilities for the Scholarship Knowledge Base
 */

/* ============================================================
   DATA LOADING
   ============================================================ */
let _categoriesCache = null;
let _knowledgeCache  = null;

async function loadCategories() {
  if (_categoriesCache) return _categoriesCache;
  const res = await fetch('assets/data/categories.json');
  if (!res.ok) throw new Error('Failed to load categories.json');
  _categoriesCache = await res.json();
  return _categoriesCache;
}

async function loadKnowledge() {
  if (_knowledgeCache) return _knowledgeCache;
  const res = await fetch('assets/data/knowledge.json');
  if (!res.ok) throw new Error('Failed to load knowledge.json');
  _knowledgeCache = await res.json();
  return _knowledgeCache;
}

/* ============================================================
   ICONS (inline SVG helpers — Lucide-compatible paths)
   ============================================================ */
const Icons = {
  'graduation-cap': `<svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c3 3 9 3 12 0v-5"/></svg>`,
  'file-text': `<svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></svg>`,
  'clipboard-check': `<svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 5H7a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-2"/><rect x="9" y="3" width="6" height="4" rx="1"/><path d="m9 12 2 2 4-4"/></svg>`,
  'target': `<svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/></svg>`,
  'users': `<svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>`,
  'search': `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>`,
  'arrow-right': `<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>`,
  'book-open': `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/></svg>`,
  'calendar': `<svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>`,
  'link': `<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg>`,
  'alert-circle': `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>`,
  'x-circle': `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/></svg>`,
  'info': `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>`,
  'menu': `<svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></svg>`,
};

function icon(name, size) {
  const svg = Icons[name] || '';
  if (size) return svg.replace(/width="\d+"/, `width="${size}"`).replace(/height="\d+"/, `height="${size}"`);
  return svg;
}

/* ============================================================
   NAV & FOOTER INJECTION
   ============================================================ */
function getCurrentPage() {
  const path = window.location.pathname;
  if (path.endsWith('index.html') || path === '/' || path.endsWith('/')) return 'home';
  if (path.includes('categories')) return 'categories';
  if (path.includes('library')) return 'library';
  if (path.includes('detail')) return 'detail';
  return '';
}

function injectNavbar() {
  const page = getCurrentPage();

  const nav = document.getElementById('navbar');
  if (!nav) return;

  nav.innerHTML = `
    <div class="container">
      <div class="navbar-inner">
        <a href="index.html" class="navbar-logo">
          ${icon('graduation-cap', 28)}
          <div>
            <span>Beasiswa KB</span>
            <span class="navbar-logo-sub">Knowledge Base</span>
          </div>
        </a>

        <nav class="navbar-nav" id="navMenu" role="navigation" aria-label="Main navigation">
          <a href="index.html"      class="${page === 'home'       ? 'active' : ''}">Home</a>
          <a href="categories.html" class="${page === 'categories' ? 'active' : ''}">Categories</a>
          <a href="library.html"    class="${page === 'library' || page === 'detail' ? 'active' : ''}">Knowledge Library</a>
          <a href="about.html"      class="">About</a>
        </nav>

        <button class="navbar-toggle" id="navToggle" aria-label="Toggle navigation" aria-expanded="false">
          <span></span><span></span><span></span>
        </button>
      </div>
    </div>
  `;

  document.getElementById('navToggle').addEventListener('click', function () {
    const menu = document.getElementById('navMenu');
    const open = menu.classList.toggle('open');
    this.setAttribute('aria-expanded', open);
  });
}

function injectFooter() {
  const footer = document.getElementById('footer');
  if (!footer) return;

  footer.innerHTML = `
    <div class="container">
      <div class="footer-top">
        <div>
          <div class="footer-brand-name">Beasiswa Knowledge Base</div>
          <p class="footer-brand-desc">Platform pengetahuan terpusat untuk membantu mahasiswa memahami proses pencarian dan pengajuan beasiswa di Indonesia.</p>
        </div>
        <div>
          <div class="footer-heading">Navigasi</div>
          <ul class="footer-links">
            <li><a href="index.html">Home</a></li>
            <li><a href="categories.html">Categories</a></li>
            <li><a href="library.html">Knowledge Library</a></li>
            <li><a href="about.html">About</a></li>
          </ul>
        </div>
        <div>
          <div class="footer-heading">Kategori</div>
          <ul class="footer-links">
            <li><a href="library.html?category=CAT001">Scholarship Information</a></li>
            <li><a href="library.html?category=CAT002">Application Guide</a></li>
            <li><a href="library.html?category=CAT003">Eligibility &amp; Requirements</a></li>
            <li><a href="library.html?category=CAT004">Selection Preparation</a></li>
            <li><a href="library.html?category=CAT005">Scholarship Experience</a></li>
          </ul>
        </div>
      </div>
      <div class="footer-bottom">
        <span>Konten ini merupakan materi edukasi berbasis referensi umum dan sumber resmi. Verifikasi selalu melalui penyedia beasiswa resmi.</span>
        <span>&copy; 2026 Beasiswa KB — Tugas Kelompok Knowledge Management</span>
      </div>
    </div>
  `;
}

/* ============================================================
   RENDERING HELPERS
   ============================================================ */
const categoryColors = {
  CAT001: '#17365D',
  CAT002: '#315B88',
  CAT003: '#1B6B3A',
  CAT004: '#7C3D12',
  CAT005: '#5B21B6',
};

function categoryBadgeClass(catId) {
  return `badge badge-${catId.toLowerCase()}`;
}

function formatDate(dateStr) {
  if (!dateStr) return '';
  const d = new Date(dateStr);
  return d.toLocaleDateString('id-ID', { year: 'numeric', month: 'long', day: 'numeric' });
}

function renderKnowledgeCard(item, category) {
  const catName = category ? category.name : item.categoryId;
  const catId   = item.categoryId.toLowerCase();
  return `
    <article class="knowledge-card">
      <div class="knowledge-card-header">
        <span class="badge badge-${catId}">${catName}</span>
      </div>
      <h3 class="knowledge-card-title">${escapeHtml(item.title)}</h3>
      <p class="knowledge-card-desc">${escapeHtml(item.description)}</p>
      <div class="knowledge-card-footer">
        <span class="knowledge-card-date">${icon('calendar')} ${formatDate(item.publishedAt)}</span>
        <a href="detail.html?id=${encodeURIComponent(item.id)}" class="btn-read" aria-label="Baca artikel ${escapeHtml(item.title)}">
          Baca ${icon('arrow-right')}
        </a>
      </div>
    </article>
  `;
}

function renderCategoryCard(cat, count) {
  const bg = categoryColors[cat.id] || '#17365D';
  return `
    <a href="library.html?category=${encodeURIComponent(cat.id)}" class="category-card" aria-label="Jelajahi kategori ${escapeHtml(cat.name)}">
      <div class="category-icon" style="background:${bg}">
        ${icon(cat.icon)}
      </div>
      <div class="category-name">${escapeHtml(cat.name)}</div>
      <p class="category-desc">${escapeHtml(cat.description)}</p>
      <span class="category-count">${icon('book-open', 14)} ${count} artikel</span>
    </a>
  `;
}

function renderLoadingState() {
  return `<div class="loading-state"><div class="spinner"></div> Memuat data...</div>`;
}

function renderEmptyState(msg, desc, showClear) {
  return `
    <div class="empty-state">
      ${icon('x-circle')}
      <div class="empty-state-title">${msg}</div>
      <p class="empty-state-desc">${desc}</p>
      ${showClear ? `<button class="btn btn-outline btn-sm" onclick="clearFilters()">Hapus Filter</button>` : ''}
    </div>
  `;
}

function escapeHtml(str) {
  if (typeof str !== 'string') return '';
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

/* ============================================================
   URL PARAM HELPERS
   ============================================================ */
function getParam(name) {
  return new URLSearchParams(window.location.search).get(name) || '';
}

/* ============================================================
   SEARCH HELPERS
   ============================================================ */
function matchesSearch(item, query) {
  if (!query) return true;
  const q = query.toLowerCase();
  const haystack = [
    item.title,
    item.description,
    item.categoryId,
    ...(item.keywords || []),
    item.content?.overview || '',
    ...(item.content?.sections || []).map(s => s.heading + ' ' + s.body),
    ...(item.content?.tips || []),
    item.content?.notes || '',
  ].join(' ').toLowerCase();
  return haystack.includes(q);
}

/* ============================================================
   INIT
   ============================================================ */
document.addEventListener('DOMContentLoaded', () => {
  injectNavbar();
  injectFooter();
});

