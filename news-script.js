/* ═══════════════════════════════════════════════════
   HERITEJ PULSE — news-script.js
   ═══════════════════════════════════════════════════ */

document.addEventListener('DOMContentLoaded', () => {

  /* ─── Date in Topbar ─────────────────────────── */
  const dateEl = document.getElementById('topbar-date');
  if (dateEl) {
    dateEl.textContent = new Date().toLocaleDateString('en-IN', {
      weekday: 'short', day: 'numeric', month: 'short', year: 'numeric'
    });
  }

  /* ─── Navbar Scroll ──────────────────────────── */
  const navbar   = document.getElementById('navbar');
  const btt      = document.getElementById('back-to-top');
  window.addEventListener('scroll', () => {
    navbar?.classList.toggle('scrolled', window.scrollY > 60);
    btt?.classList.toggle('visible', window.scrollY > 400);
  }, { passive: true });
  btt?.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

  /* ─── Hamburger ──────────────────────────────── */
  const hamburger = document.getElementById('hamburger');
  const navLinks  = document.getElementById('nav-links');
  hamburger?.addEventListener('click', () => {
    const open = navLinks.style.display === 'flex';
    navLinks.style.cssText = open ? '' :
      'display:flex;flex-direction:column;position:absolute;top:100%;left:0;right:0;background:#fff;padding:16px 24px;border-bottom:1px solid var(--clr-border);gap:4px;box-shadow:var(--shadow-md);z-index:99;';
  });

  /* ─── Search Overlay ─────────────────────────── */
  const searchBtn     = document.getElementById('search-btn');
  const searchOverlay = document.getElementById('search-overlay');
  const searchClose   = document.getElementById('search-close');
  const searchInput   = document.getElementById('search-input');
  searchBtn?.addEventListener('click', () => {
    searchOverlay.classList.toggle('open');
    if (searchOverlay.classList.contains('open')) searchInput?.focus();
  });
  searchClose?.addEventListener('click', () => searchOverlay?.classList.remove('open'));
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') searchOverlay?.classList.remove('open');
  });

  /* ─── Category Filter ────────────────────────── */
  const filterBtns = Array.from(document.querySelectorAll('.cat-filter'));
  const cards      = Array.from(document.querySelectorAll('.news-card'));
  const noResults  = document.getElementById('no-results');
  const countNum   = document.getElementById('count-num');

  function filterCards(cat) {
    let visible = 0;

    cards.forEach((card, i) => {
      const cardCat = card.dataset.cat;
      const show    = cat === 'all' || cardCat === cat;

      if (show) {
        card.style.display = '';
        // Re-trigger animation with stagger
        card.style.animation = 'none';
        card.offsetHeight; // reflow
        card.style.animation = `cardAppear 0.4s ease ${i * 40}ms forwards`;
        card.style.opacity   = '0';
        visible++;
      } else {
        card.style.display = 'none';
      }
    });

    if (countNum) countNum.textContent = visible;

    if (noResults) {
      noResults.style.display = visible === 0 ? 'block' : 'none';
    }
  }

  filterBtns.forEach(btn => {
    btn.addEventListener('click', function () {
      filterBtns.forEach(b => b.classList.remove('active'));
      this.classList.add('active');
      filterCards(this.dataset.cat);
    });
  });

  // Parse category parameter from URL on load
  const urlParams = new URLSearchParams(window.location.search);
  const catParam = urlParams.get('cat');
  if (catParam) {
    const targetBtn = document.querySelector(`.cat-filter[data-cat="${catParam}"]`);
    if (targetBtn) {
      filterBtns.forEach(b => b.classList.remove('active'));
      targetBtn.classList.add('active');
      filterCards(catParam);
    }
  }

  // Reset from no-results
  document.getElementById('btn-reset-filter')?.addEventListener('click', () => {
    filterBtns.forEach(b => b.classList.remove('active'));
    filterBtns[0]?.classList.add('active');
    filterCards('all');
  });

  /* ─── View Toggle (Grid / List) ──────────────── */
  const newsGrid    = document.getElementById('news-grid');
  const gridViewBtn = document.getElementById('grid-view-btn');
  const listViewBtn = document.getElementById('list-view-btn');

  gridViewBtn?.addEventListener('click', () => {
    newsGrid?.classList.remove('list-view');
    gridViewBtn.classList.add('active');
    listViewBtn?.classList.remove('active');
  });

  listViewBtn?.addEventListener('click', () => {
    newsGrid?.classList.add('list-view');
    listViewBtn.classList.add('active');
    gridViewBtn?.classList.remove('active');
  });

  /* ─── Bookmark Toggle ────────────────────────── */
  document.querySelectorAll('.nc-bookmark').forEach(btn => {
    btn.addEventListener('click', function (e) {
      e.stopPropagation();
      this.classList.toggle('saved');
      const icon = this.querySelector('svg path');
      if (this.classList.contains('saved')) {
        this.setAttribute('aria-label', 'Bookmarked');
        showToast('✓ Story bookmarked!');
      } else {
        this.setAttribute('aria-label', 'Bookmark');
        showToast('Bookmark removed');
      }
    });
  });

  /* ─── Toast Notification ─────────────────────── */
  function showToast(msg) {
    let toast = document.getElementById('news-toast');
    if (!toast) {
      toast = document.createElement('div');
      toast.id = 'news-toast';
      toast.style.cssText = `
        position:fixed; bottom:28px; left:50%; transform:translateX(-50%) translateY(20px);
        background:var(--clr-dark); color:#fff;
        font-family:var(--ff-ui); font-size:0.85rem; font-weight:500;
        padding:12px 24px; border-radius:100px;
        box-shadow:var(--shadow-md); z-index:999;
        opacity:0; transition:all 0.3s ease; pointer-events:none;
        white-space:nowrap;
      `;
      document.body.appendChild(toast);
    }
    toast.textContent = msg;
    toast.style.opacity = '1';
    toast.style.transform = 'translateX(-50%) translateY(0)';
    clearTimeout(toast._timer);
    toast._timer = setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateX(-50%) translateY(20px)';
    }, 2500);
  }

  /* ─── Load More Button ───────────────────────── */
  const loadMoreBtn = document.getElementById('btn-load-more');
  let loadMoreClicks = 0;

  loadMoreBtn?.addEventListener('click', function () {
    loadMoreClicks++;
    this.classList.add('loading');
    const lmText = this.querySelector('.lm-text');
    if (lmText) lmText.textContent = 'Loading';

    setTimeout(() => {
      this.classList.remove('loading');
      if (lmText) lmText.textContent = 'Load More Stories';

      if (loadMoreClicks >= 2) {
        this.textContent = 'You\'ve reached the end 🎉';
        this.disabled = true;
        this.style.opacity = '0.5';
        this.style.cursor  = 'default';
      } else {
        showToast('✓ More stories loaded!');
      }
    }, 1400);
  });

  /* ─── Sort (UI simulation) ───────────────────── */
  const sortSelect = document.getElementById('sort-select');
  sortSelect?.addEventListener('change', function () {
    showToast(`Sorted by: ${this.options[this.selectedIndex].text}`);
  });

  /* ─── Sticky Category Bar Indicator ─────────────*/
  const categoryBar = document.getElementById('category-bar');
  const heroSection = document.getElementById('news-page-hero');
  if (categoryBar && heroSection) {
    const observer = new IntersectionObserver(([entry]) => {
      categoryBar.style.boxShadow = entry.isIntersecting
        ? '0 2px 8px rgba(0,0,0,0.04)'
        : '0 4px 16px rgba(0,0,0,0.10)';
    }, { threshold: 0 });
    observer.observe(heroSection);
  }

  /* ─── Reading Progress Bar ───────────────────── */
  let progressBar = document.getElementById('reading-progress');
  if (!progressBar) {
    progressBar = document.createElement('div');
    progressBar.id = 'reading-progress';
    progressBar.style.cssText = `
      position:fixed;top:0;left:0;height:3px;width:0%;z-index:9999;
      background:linear-gradient(90deg,var(--clr-primary),var(--clr-accent));
      transition:width 0.1s ease;pointer-events:none;
    `;
    document.body.appendChild(progressBar);
  }
  window.addEventListener('scroll', () => {
    const h = document.documentElement.scrollHeight - window.innerHeight;
    progressBar.style.width = h > 0 ? (window.scrollY / h * 100) + '%' : '0%';
  }, { passive: true });

  /* ─── Search within News Grid ────────────────── */
  searchInput?.addEventListener('input', function () {
    const q = this.value.toLowerCase().trim();
    let count = 0;
    cards.forEach(card => {
      const title   = card.querySelector('.nc-title')?.textContent.toLowerCase() || '';
      const excerpt = card.querySelector('.nc-excerpt')?.textContent.toLowerCase() || '';
      const match   = !q || title.includes(q) || excerpt.includes(q);
      card.style.display = match ? '' : 'none';
      if (match) count++;
    });
    if (countNum) countNum.textContent = count;
    if (noResults) noResults.style.display = count === 0 ? 'block' : 'none';
    if (!q) {
      const activeCat = document.querySelector('.cat-filter.active')?.dataset.cat || 'all';
      filterCards(activeCat);
    }
  });

  /* ─── News Card Click → Article Page ───────── */
  document.querySelectorAll('.news-card').forEach((card, idx) => {
    card.style.cursor = 'pointer';
    card.addEventListener('click', function (e) {
      // Don't navigate if clicking bookmark button
      if (e.target.closest('.nc-bookmark')) return;
      // Map card index to article id (1-based, matching ARTICLES object)
      const articleId = (idx + 1).toString();
      window.location.href = `article.html?id=${articleId}`;
    });
  });

  console.log('%c📰 HeriTej Pulse — News Hub', 'font-size:16px;font-weight:bold;color:#b5451b;');

}); // DOMContentLoaded
