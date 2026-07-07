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

  /* ─── Category & Calendar Date Filter ────────────────────────── */
  const filterBtns = Array.from(document.querySelectorAll('.cat-filter'));
  const cards      = Array.from(document.querySelectorAll('.news-card'));
  const noResults  = document.getElementById('no-results');
  const countNum   = document.getElementById('count-num');

  // Parse all dates from elements dynamically
  const articlesData = cards.map(card => {
    const dateText = card.querySelector('.nc-date')?.textContent?.trim();
    let parsedDate = null;
    if (dateText) {
      const d = new Date(dateText);
      if (!isNaN(d.getTime())) {
        parsedDate = d;
      }
    }
    return {
      element: card,
      date: parsedDate,
      dateText: dateText,
      cat: card.dataset.cat
    };
  });

  // Calendar State
  let calSelectedDate = null;
  let calDisplayMonth = 6; // July (0-indexed)
  let calDisplayYear = 2026;

  // Toggle Dropdown
  const dateBtn = document.getElementById('date-filter-btn');
  const dropdown = document.getElementById('calendar-dropdown');
  dateBtn?.addEventListener('click', (e) => {
    e.stopPropagation();
    dropdown?.classList.toggle('open');
    dateBtn.setAttribute('aria-expanded', dropdown?.classList.contains('open'));
  });

  document.addEventListener('click', (e) => {
    if (dropdown && !dropdown.contains(e.target) && e.target !== dateBtn) {
      dropdown.classList.remove('open');
      dateBtn?.setAttribute('aria-expanded', 'false');
    }
  });

  // Setup Month/Year selection handlers
  const monthSelect = document.getElementById('cal-month');
  const yearSelect = document.getElementById('cal-year');

  monthSelect?.addEventListener('change', function() {
    if (this.value !== '') {
      calDisplayMonth = parseInt(this.value, 10);
    }
    calSelectedDate = null; // Clear specific day selection since we filter by month
    renderCalendarGrid();
    updateNewsFilter();
  });

  yearSelect?.addEventListener('change', function() {
    if (this.value !== '') {
      calDisplayYear = parseInt(this.value, 10);
    }
    calSelectedDate = null; // Clear specific day selection
    renderCalendarGrid();
    updateNewsFilter();
  });

  document.getElementById('cal-clear-btn')?.addEventListener('click', () => {
    calSelectedDate = null;
    if (monthSelect) monthSelect.value = '';
    if (yearSelect) yearSelect.value = '';
    renderCalendarGrid();
    updateNewsFilter();
  });

  function renderCalendarGrid() {
    const grid = document.getElementById('cal-days-grid');
    if (!grid) return;
    grid.innerHTML = '';

    const firstDay = new Date(calDisplayYear, calDisplayMonth, 1).getDay();
    const totalDays = new Date(calDisplayYear, calDisplayMonth + 1, 0).getDate();

    // Empty spaces before first day of month
    for (let i = 0; i < firstDay; i++) {
      const cell = document.createElement('div');
      cell.className = 'cal-day-btn empty';
      grid.appendChild(cell);
    }

    // Days grid
    for (let day = 1; day <= totalDays; day++) {
      const btn = document.createElement('button');
      btn.className = 'cal-day-btn';
      btn.textContent = day;

      const currentBtnDate = new Date(calDisplayYear, calDisplayMonth, day);

      const hasNews = articlesData.some(art => {
        return art.date &&
               art.date.getDate() === day &&
               art.date.getMonth() === calDisplayMonth &&
               art.date.getFullYear() === calDisplayYear;
      });

      if (hasNews) {
        btn.classList.add('has-news');
      }

      const isSelected = calSelectedDate &&
                         calSelectedDate.getDate() === day &&
                         calSelectedDate.getMonth() === calDisplayMonth &&
                         calSelectedDate.getFullYear() === calDisplayYear;

      if (isSelected) {
        btn.classList.add('selected');
      }

      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        if (isSelected) {
          calSelectedDate = null;
        } else {
          calSelectedDate = currentBtnDate;
        }
        renderCalendarGrid();
        updateNewsFilter();
      });

      grid.appendChild(btn);
    }

    const label = document.getElementById('cal-selected-label');
    if (label) {
      if (calSelectedDate) {
        label.textContent = calSelectedDate.toLocaleDateString('en-IN', { day:'numeric', month:'short', year:'numeric' });
      } else {
        label.textContent = 'None selected';
      }
    }
  }

  function updateNewsFilter() {
    const activeCatBtn = document.querySelector('.cat-filter.active');
    const cat = activeCatBtn ? activeCatBtn.dataset.cat : 'all';

    const selectedMonthVal = monthSelect ? monthSelect.value : '';
    const selectedYearVal = yearSelect ? yearSelect.value : '';

    let visibleCount = 0;

    articlesData.forEach((art, i) => {
      let show = true;

      // 1. Category Filter
      if (cat !== 'all' && art.cat !== cat) {
        show = false;
      }

      // 2. Date Filter
      if (show && art.date) {
        if (calSelectedDate) {
          const matchesDay = art.date.getDate() === calSelectedDate.getDate() &&
                             art.date.getMonth() === calSelectedDate.getMonth() &&
                             art.date.getFullYear() === calSelectedDate.getFullYear();
          if (!matchesDay) show = false;
        } else {
          if (selectedMonthVal !== '') {
            const m = parseInt(selectedMonthVal, 10);
            if (art.date.getMonth() !== m) show = false;
          }
          if (selectedYearVal !== '') {
            const y = parseInt(selectedYearVal, 10);
            if (art.date.getFullYear() !== y) show = false;
          }
        }
      } else if (show && !art.date && (calSelectedDate || selectedMonthVal !== '' || selectedYearVal !== '')) {
        show = false;
      }

      if (show) {
        art.element.style.display = '';
        // Re-trigger animation with stagger
        art.element.style.animation = 'none';
        art.element.offsetHeight; // reflow
        art.element.style.animation = `cardAppear 0.4s ease ${visibleCount * 40}ms forwards`;
        art.element.style.opacity   = '0';
        visibleCount++;
      } else {
        art.element.style.display = 'none';
      }
    });

    if (countNum) countNum.textContent = visibleCount;
    if (noResults) {
      noResults.style.display = visibleCount === 0 ? 'block' : 'none';
    }

    if (dateBtn) {
      if (calSelectedDate || selectedMonthVal !== '' || selectedYearVal !== '') {
        dateBtn.classList.add('active');
        let filterLabel = '📅 Filter Active';
        if (calSelectedDate) {
          filterLabel = `📅 ${calSelectedDate.getDate()} ${calSelectedDate.toLocaleDateString('en-IN', {month:'short'})}`;
        } else if (selectedMonthVal !== '') {
          const monthName = monthSelect.options[monthSelect.selectedIndex].text;
          filterLabel = `📅 ${monthName}`;
        }
        dateBtn.textContent = filterLabel;
      } else {
        dateBtn.classList.remove('active');
        dateBtn.textContent = '📅 Filter by Date';
      }
    }
  }

  // Filter category button handlers
  filterBtns.forEach(btn => {
    btn.addEventListener('click', function () {
      filterBtns.forEach(b => b.classList.remove('active'));
      this.classList.add('active');
      updateNewsFilter();
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
    }
  }

  // Reset from no-results
  document.getElementById('btn-reset-filter')?.addEventListener('click', () => {
    filterBtns.forEach(b => b.classList.remove('active'));
    filterBtns[0]?.classList.add('active');
    calSelectedDate = null;
    if (monthSelect) monthSelect.value = '';
    if (yearSelect) yearSelect.value = '';
    renderCalendarGrid();
    updateNewsFilter();
  });

  // Initial Calendar Grid Load
  renderCalendarGrid();
  updateNewsFilter();

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
  document.querySelectorAll('.news-card').forEach((card) => {
    card.style.cursor = 'pointer';
    card.addEventListener('click', function (e) {
      // Don't navigate if clicking bookmark button
      if (e.target.closest('.nc-bookmark')) return;
      // Resolve article ID from dataset or ID attribute
      const articleId = this.dataset.articleId || this.id.replace('article-', '');
      window.location.href = `article.html?id=${articleId}`;
    });
  });

  console.log('%c📰 HeriTej Pulse — News Hub', 'font-size:16px;font-weight:bold;color:#b5451b;');

}); // DOMContentLoaded
