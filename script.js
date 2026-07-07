/* ═══════════════════════════════════════════════════
   HERITEJ PULSE — script.js
   ═══════════════════════════════════════════════════ */

document.addEventListener('DOMContentLoaded', () => {

  /* ─── Date in Topbar ─────────────────────────── */
  const dateEl = document.getElementById('topbar-date');
  if (dateEl) {
    const now = new Date();
    dateEl.textContent = now.toLocaleDateString('en-IN', {
      weekday: 'short', day: 'numeric', month: 'short', year: 'numeric'
    });
  }

  /* ─── Navbar Scroll Behaviour ────────────────── */
  const navbar = document.getElementById('navbar');
  const backToTop = document.getElementById('back-to-top');

  window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;
    if (navbar) {
      navbar.classList.toggle('scrolled', scrollY > 60);
    }
    if (backToTop) {
      backToTop.classList.toggle('visible', scrollY > 400);
    }
  }, { passive: true });

  if (backToTop) {
    backToTop.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  /* ─── Hamburger Menu ─────────────────────────── */
  const hamburger = document.getElementById('hamburger');
  const navLinks  = document.getElementById('nav-links');

  if (hamburger && navLinks) {
    hamburger.addEventListener('click', () => {
      const open = navLinks.style.display === 'flex';
      navLinks.style.cssText = open
        ? ''
        : 'display:flex; flex-direction:column; position:absolute; top:100%; left:0; right:0; background:#fff; padding:16px 24px; border-bottom:1px solid var(--clr-border); gap:4px; box-shadow: var(--shadow-md); z-index:99;';
      hamburger.classList.toggle('active');
    });
  }

  /* ─── Search Overlay ─────────────────────────── */
  const searchBtn     = document.getElementById('search-btn');
  const searchClose   = document.getElementById('search-close');
  const searchOverlay = document.getElementById('search-overlay');
  const searchInput   = document.getElementById('search-input');

  if (searchBtn && searchOverlay) {
    searchBtn.addEventListener('click', () => {
      searchOverlay.classList.toggle('open');
      if (searchOverlay.classList.contains('open') && searchInput) {
        searchInput.focus();
      }
    });
  }
  if (searchClose && searchOverlay) {
    searchClose.addEventListener('click', () => searchOverlay.classList.remove('open'));
  }
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && searchOverlay) searchOverlay.classList.remove('open');
  });

  /* ─── Hero Slider ────────────────────────────── */
  const slides      = Array.from(document.querySelectorAll('.slide'));
  const sliderDotsContainer = document.getElementById('slider-dots');
  if (sliderDotsContainer && slides.length > 0) {
    sliderDotsContainer.innerHTML = '';
    slides.forEach((_, i) => {
      const dot = document.createElement('span');
      dot.className = i === 0 ? 'dot active' : 'dot';
      dot.setAttribute('data-slide', i);
      sliderDotsContainer.appendChild(dot);
    });
  }
  const dots        = Array.from(document.querySelectorAll('#slider-dots .dot'));
  const prevBtn     = document.getElementById('slider-prev');
  const nextBtn     = document.getElementById('slider-next');
  let currentSlide  = 0;
  let sliderTimer   = null;

  function goToSlide(idx) {
    slides[currentSlide].classList.remove('active');
    dots[currentSlide]?.classList.remove('active');
    currentSlide = (idx + slides.length) % slides.length;
    slides[currentSlide].classList.add('active');
    dots[currentSlide]?.classList.add('active');
  }

  function startAutoSlide() {
    sliderTimer = setInterval(() => goToSlide(currentSlide + 1), 6000);
  }
  function stopAutoSlide() {
    clearInterval(sliderTimer);
  }

  if (slides.length > 0) {
    prevBtn?.addEventListener('click', () => { stopAutoSlide(); goToSlide(currentSlide - 1); startAutoSlide(); });
    nextBtn?.addEventListener('click', () => { stopAutoSlide(); goToSlide(currentSlide + 1); startAutoSlide(); });
    dots.forEach((dot, i) => {
      dot.addEventListener('click', () => { stopAutoSlide(); goToSlide(i); startAutoSlide(); });
    });
    
    // Clicking anywhere on the slide navigates to the news-detail page
    slides.forEach(slide => {
      slide.style.cursor = 'pointer';
      slide.addEventListener('click', (e) => {
        if (e.target.closest('button')) return;
        const id = slide.getAttribute('data-article-id') || '2';
        window.location.href = `article.html?id=${id}`;
      });
    });

    startAutoSlide();

    // Swipe support
    let touchStartX = 0;
    const sliderEl = document.getElementById('hero-slider');
    sliderEl?.addEventListener('touchstart', e => { touchStartX = e.touches[0].clientX; }, { passive: true });
    sliderEl?.addEventListener('touchend', e => {
      const diff = touchStartX - e.changedTouches[0].clientX;
      if (Math.abs(diff) > 50) {
        stopAutoSlide();
        goToSlide(currentSlide + (diff > 0 ? 1 : -1));
        startAutoSlide();
      }
    });
  }

  /* ─── Spotlight Carousel ─────────────────────── */
  const spotTrack   = document.getElementById('spotlight-track');
  const spotPrev    = document.getElementById('spot-prev');
  const spotNext    = document.getElementById('spot-next');
  let spotOffset    = 0;

  function getSpotCardWidth() {
    const cards = spotTrack?.querySelectorAll('.spotlight-card');
    if (!cards || cards.length === 0) return 0;
    const card = cards[0];
    const gap  = 20;
    return card.offsetWidth + gap;
  }

  function getMaxSpotOffset() {
    if (!spotTrack) return 0;
    const cards      = spotTrack.querySelectorAll('.spotlight-card');
    const trackWrap  = document.querySelector('.spotlight-track-wrap');
    const visibleW   = trackWrap?.offsetWidth || 0;
    const totalW     = cards.length * getSpotCardWidth();
    return Math.max(0, totalW - visibleW);
  }

  spotNext?.addEventListener('click', () => {
    const cardW   = getSpotCardWidth();
    const maxOff  = getMaxSpotOffset();
    spotOffset    = Math.min(spotOffset + cardW, maxOff);
    spotTrack.style.transform = `translateX(-${spotOffset}px)`;
  });

  spotPrev?.addEventListener('click', () => {
    const cardW  = getSpotCardWidth();
    spotOffset   = Math.max(spotOffset - cardW, 0);
    spotTrack.style.transform = `translateX(-${spotOffset}px)`;
  });

  /* ─── Explore by Heritage Categories Slider ─── */
  const exploreCats = document.getElementById('heritage-cats');
  const explorePrev = document.getElementById('explore-prev');
  const exploreNext = document.getElementById('explore-next');

  if (exploreCats && explorePrev && exploreNext) {
    explorePrev.addEventListener('click', () => {
      exploreCats.scrollBy({ left: -240, behavior: 'smooth' });
    });
    exploreNext.addEventListener('click', () => {
      exploreCats.scrollBy({ left: 240, behavior: 'smooth' });
    });
  }

  /* ─── Quotes Rotator ─────────────────────────── */
  const quotes = [
    { text: '"The ancient Nalanda University had a library of 9 million manuscripts — it burned for three months after being attacked in 1193 CE."', cat: 'ANCIENT LEARNING' },
    { text: '"The Kumbh Mela is the world\'s largest human gathering — up to 120 million people converge across 55 days in one of the oldest pilgrimage traditions."', cat: 'LIVING TRADITIONS' },
    { text: '"India is home to 42 UNESCO World Heritage Sites — more than France, Spain, or Germany — and counting."', cat: 'WORLD HERITAGE' },
    { text: '"The game of Chess originated in India during the Gupta Empire (around 6th century AD) and was called \'Chaturanga\'."', cat: 'CULTURAL LEGACY' }
  ];
  let currentQuote = 0;
  const quoteText  = document.getElementById('quote-text');
  const quoteCat   = document.getElementById('quote-cat-tag');
  const qdots      = Array.from(document.querySelectorAll('.qdot'));
  const quotePrev  = document.getElementById('quote-prev');
  const quoteNext  = document.getElementById('quote-next');

  function showQuote(idx) {
    if (!quoteText) return;
    quoteText.style.opacity = '0';
    if (quoteCat) quoteCat.style.opacity = '0';
    setTimeout(() => {
      currentQuote = (idx + quotes.length) % quotes.length;
      quoteText.textContent = quotes[currentQuote].text;
      quoteText.style.opacity = '1';
      if (quoteCat) {
        quoteCat.textContent = quotes[currentQuote].cat;
        quoteCat.style.opacity = '1';
      }
      qdots.forEach((d, i) => d.classList.toggle('active', i === currentQuote));
    }, 400);
  }

  qdots.forEach((d, i) => d.addEventListener('click', () => { clearInterval(quoteTimer); showQuote(i); quoteTimer = setInterval(() => showQuote(currentQuote + 1), 7000); }));
  quotePrev?.addEventListener('click', () => { clearInterval(quoteTimer); showQuote(currentQuote - 1); quoteTimer = setInterval(() => showQuote(currentQuote + 1), 7000); });
  quoteNext?.addEventListener('click', () => { clearInterval(quoteTimer); showQuote(currentQuote + 1); quoteTimer = setInterval(() => showQuote(currentQuote + 1), 7000); });
  let quoteTimer = setInterval(() => showQuote(currentQuote + 1), 7000);

  /* ─── Social Counter Animation ───────────────── */
  function animateCounter(el, target) {
    const duration = 1800;
    const start    = performance.now();

    function step(timestamp) {
      const elapsed  = timestamp - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased    = 1 - Math.pow(1 - progress, 3);
      const current  = Math.floor(eased * target);

      if (target >= 1000) {
        el.textContent = current >= 1000
          ? (current / 1000).toFixed(1).replace(/\.0$/, '') + 'K'
          : current.toString();
      } else {
        el.textContent = current;
      }

      if (progress < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }

  /* ─── Intersection Observer — Animations ────── */
  const observerOptions = { threshold: 0.15, rootMargin: '0px 0px -50px 0px' };

  const fadeObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        fadeObserver.unobserve(entry.target);
      }
    });
  }, observerOptions);

  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const target = parseInt(entry.target.dataset.target, 10);
        if (!isNaN(target)) animateCounter(entry.target, target);
        counterObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  // Apply fade-in to major sections
  document.querySelectorAll('.story-card, .spotlight-card, .read-card, .fashion-side-card, .cat-pill, .tih-item, .social-card, .nl-stat').forEach(el => {
    el.classList.add('fade-in');
    fadeObserver.observe(el);
  });

  // Counter animations
  document.querySelectorAll('.social-count[data-target]').forEach(el => {
    counterObserver.observe(el);
  });

  /* ─── Newsletter Form ────────────────────────── */
  window.handleNewsletterSubmit = function(e) {
    e.preventDefault();
    const emailInput = document.getElementById('nl-email');
    const submitBtn  = document.getElementById('nl-submit');
    const email      = emailInput?.value?.trim();

    if (!email) return;

    submitBtn.textContent = 'Subscribing…';
    submitBtn.style.opacity = '0.7';

    setTimeout(() => {
      submitBtn.textContent = '✓ Subscribed!';
      submitBtn.style.opacity = '1';
      submitBtn.style.background = '#1a5c2e';
      emailInput.value = '';

      setTimeout(() => {
        submitBtn.textContent = 'Subscribe Free';
        submitBtn.style.background = '';
      }, 4000);
    }, 1200);
  };

  /* ─── Category Pills Interaction ────────────── */
  const catPillMapping = {
    'cat-ancient': 'ancient',
    'cat-classical': 'arts',
    'cat-fairs': 'cultural-heritage',
    'cat-monuments': 'heritage',
    'cat-tribal': 'culture',
    'cat-fashion': 'fashion'
  };

  document.querySelectorAll('.cat-pill').forEach(pill => {
    pill.addEventListener('click', function(e) {
      e.preventDefault();
      const cat = catPillMapping[this.id];
      if (cat) {
        window.location.href = `news.html?cat=${cat}`;
      }
    });
  });

  /* ─── Section More Links Navigation ─────────── */
  const sectionMoreLinks = {
    'top-stories-more': 'news.html',
    'explore-more': 'news.html',
    'fashion-more': 'news.html?cat=fashion',
    'top-reads-all': 'news.html'
  };
  Object.keys(sectionMoreLinks).forEach(linkId => {
    const linkEl = document.getElementById(linkId);
    if (linkEl) {
      linkEl.addEventListener('click', (e) => {
        e.preventDefault();
        window.location.href = sectionMoreLinks[linkId];
      });
    }
  });

  /* ─── Nav Active State ───────────────────────── */
  document.querySelectorAll('.nav-item').forEach(item => {
    item.addEventListener('click', function() {
      document.querySelectorAll('.nav-item').forEach(i => i.classList.remove('active'));
      this.classList.add('active');
    });
  });

  /* ─── Staggered Fade for Grids ───────────────── */
  document.querySelectorAll('.stories-grid > *, .reads-grid > *, .social-grid > *').forEach((el, i) => {
    el.style.transitionDelay = `${i * 80}ms`;
  });

  /* ─── Smooth scroll nav links ────────────────── */
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      const target = document.querySelector(a.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  /* ─── Ripple Effect on cards ─────────────────── */
  document.querySelectorAll('.story-card, .read-card, .spotlight-card').forEach(card => {
    card.addEventListener('click', function(e) {
      const rect   = this.getBoundingClientRect();
      const ripple = document.createElement('span');
      const size   = Math.max(rect.width, rect.height);
      ripple.style.cssText = `
        position:absolute; border-radius:50%; pointer-events:none;
        width:${size}px; height:${size}px;
        left:${e.clientX - rect.left - size/2}px;
        top:${e.clientY - rect.top - size/2}px;
        background:rgba(181,69,27,0.08);
        transform:scale(0); animation:ripple 0.6s linear;
      `;
      this.style.position = 'relative';
      this.style.overflow = 'hidden';
      this.appendChild(ripple);
      setTimeout(() => ripple.remove(), 600);
    });
  });

  // Ripple keyframes
  if (!document.getElementById('ripple-style')) {
    const style = document.createElement('style');
    style.id = 'ripple-style';
    style.textContent = '@keyframes ripple { to { transform:scale(2); opacity:0; } }';
    document.head.appendChild(style);
  }

  /* ─── Reading Progress Bar ───────────────────── */
  const progressBar = document.createElement('div');
  progressBar.id = 'reading-progress';
  progressBar.style.cssText = `
    position:fixed; top:0; left:0; height:3px; width:0%; z-index:9999;
    background:linear-gradient(90deg, var(--clr-primary), var(--clr-accent));
    transition:width 0.1s ease; pointer-events:none;
  `;
  document.body.appendChild(progressBar);

  window.addEventListener('scroll', () => {
    const scrollTop  = window.scrollY;
    const docHeight  = document.documentElement.scrollHeight - window.innerHeight;
    const progress   = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
    progressBar.style.width = progress + '%';
  }, { passive: true });

  /* ─── Custom Language Dropdown ───────────────── */
  const langSelectorBtn = document.getElementById('lang-selector-btn');
  const langContainer   = document.querySelector('.lang-selector-container');
  const langOptions     = document.querySelectorAll('.lang-option');
  const langCurrent     = document.querySelector('.lang-current');

  // Sync UI with active language from localStorage on load
  const savedLang = localStorage.getItem('selectedLanguage') || 'en';
  if (savedLang !== 'en') {
    const activeOption = document.querySelector(`.lang-option[data-lang="${savedLang}"]`);
    if (activeOption) {
      langOptions.forEach(o => {
        o.classList.remove('active');
        o.setAttribute('aria-selected', 'false');
      });
      activeOption.classList.add('active');
      activeOption.setAttribute('aria-selected', 'true');
      if (langCurrent) langCurrent.textContent = activeOption.textContent.trim();
    }

    setTimeout(() => {
      translatePageClient(savedLang);
    }, 300);
  }

  if (langSelectorBtn && langContainer) {
    langSelectorBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      langContainer.classList.toggle('open');
      const isOpen = langContainer.classList.contains('open');
      langSelectorBtn.setAttribute('aria-expanded', isOpen);
    });

    langOptions.forEach(opt => {
      opt.addEventListener('click', function(e) {
        e.stopPropagation();
        const targetLang = this.getAttribute('data-lang') || 'en';

        langOptions.forEach(o => {
          o.classList.remove('active');
          o.setAttribute('aria-selected', 'false');
        });
        this.classList.add('active');
        this.setAttribute('aria-selected', 'true');
        if (langCurrent) langCurrent.textContent = this.textContent.trim();
        langContainer.classList.remove('open');
        langSelectorBtn.setAttribute('aria-expanded', 'false');

        // Apply Language Translation
        setLanguageTranslation(targetLang, this.textContent.trim());
      });
    });

    document.addEventListener('click', (e) => {
      if (!langContainer.contains(e.target)) {
        langContainer.classList.remove('open');
        langSelectorBtn.setAttribute('aria-expanded', 'false');
      }
    });

    function setLanguageTranslation(langCode, langName) {
      localStorage.setItem('selectedLanguage', langCode);
      showLanguageToast(`Translating to ${langName}…`);
      translatePageClient(langCode);
    }

    function showLanguageToast(msg) {
      let toast = document.getElementById('lang-toast');
      if (!toast) {
        toast = document.createElement('div');
        toast.id = 'lang-toast';
        toast.style.cssText = `
          position:fixed; bottom:28px; left:50%; transform:translateX(-50%) translateY(20px);
          background:var(--clr-dark); color:#fff;
          font-family:var(--ff-ui); font-size:0.85rem; font-weight:500;
          padding:12px 24px; border-radius:100px;
          box-shadow:var(--shadow-md); z-index:9999;
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
  }

  // ─── Local File Origin Translation Engine ───
  const translationCache = {};

  async function translatePageClient(targetLang) {
    try {
      const textNodes = getTextNodes(document.body);
      
      // Store original content on first run
      textNodes.forEach(node => {
        if (node._originalText === undefined) {
          node._originalText = node.nodeValue;
        }
      });

      if (targetLang === 'en') {
        textNodes.forEach(node => {
          if (node._originalText !== undefined) {
            node.nodeValue = node._originalText;
          }
        });
        return;
      }

      // Filter nodes that need translation
      const nodesToTranslate = textNodes.filter(node => {
        const txt = node._originalText.trim();
        return txt.length > 0 && isNaN(txt);
      });

      // Batch translate nodes in groups of 20 to avoid URL length limit
      const batchSize = 20;
      for (let i = 0; i < nodesToTranslate.length; i += batchSize) {
        const batch = nodesToTranslate.slice(i, i + batchSize);
        
        // Check if all items in this batch are cached
        const allCached = batch.every(node => translationCache[`${targetLang}_${node._originalText}`] !== undefined);
        if (allCached) {
          batch.forEach(node => {
            node.nodeValue = translationCache[`${targetLang}_${node._originalText}`];
          });
          continue;
        }

        const combinedText = batch.map(node => node._originalText).join(' || ');
        const url = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=en&tl=${targetLang}&dt=t&q=${encodeURIComponent(combinedText)}`;
        
        const res = await fetch(url);
        if (!res.ok) continue;
        const data = await res.json();
        
        if (data && data[0]) {
          const translatedText = data[0].map(s => s[0]).join('');
          const translatedParts = translatedText.split('||');
          
          batch.forEach((node, idx) => {
            const trans = translatedParts[idx] ? translatedParts[idx].trim() : node._originalText;
            translationCache[`${targetLang}_${node._originalText}`] = trans;
            node.nodeValue = trans;
          });
        }
      }
    } catch (err) {
      console.error("Local Translation Error:", err);
    }
  }

  function getTextNodes(node) {
    const textNodes = [];
    if (node.nodeType === Node.TEXT_NODE) {
      const val = node.nodeValue.trim();
      if (val.length > 0 && isNaN(val) && !val.startsWith('//') && !val.startsWith('/*')) {
        textNodes.push(node);
      }
    } else {
      const ignoreTags = ['SCRIPT', 'STYLE', 'IFRAME', 'CODE', 'PRE', 'NOSCRIPT'];
      if (!ignoreTags.includes(node.nodeName)) {
        for (let child of node.childNodes) {
          textNodes.push(...getTextNodes(child));
        }
      }
    }
    return textNodes;
  }

  /* ─── Homepage Card Clicks → Article Details Page ─── */
  const homeCardMappings = {
    // Top Stories
    'story-card-1': '2',
    'story-card-2': '3',
    'story-card-3': '4',
    // Indian Heritage Spotlight
    'spot-card-1': '8',
    'spot-card-2': '10',
    'spot-card-3': '2',
    'spot-card-4': '4',
    'spot-card-5': '13',
    // Fashion Fusion
    'fashion-main-card': '13',
    'fashion-side-1': '5',
    'fashion-side-2': '11',
    'fashion-side-3': '3',
    // Top Reads This Week
    'read-1': '5',
    'read-2': '9',
    'read-3': '8',
    'read-4': '6',
    'read-5': '13',
    'read-6': '10'
  };

  Object.keys(homeCardMappings).forEach(cardId => {
    const cardEl = document.getElementById(cardId);
    if (cardEl) {
      cardEl.style.cursor = 'pointer';
      cardEl.addEventListener('click', (e) => {
        if (e.target.closest('.ai-summary-link') || e.target.closest('.ai-card-action')) return;
        if (e.target.closest('a') && e.target.closest('a') !== cardEl) return;
        const articleId = homeCardMappings[cardId];
        window.location.href = `article.html?id=${articleId}`;
      });
    }
  });

  /* ─── Homepage Welcome Popup Modal Injection & Logic ─── */
  const welcomePopupKey = 'heritej_has_seen_welcome_popup';
  const hasSeenPopup = localStorage.getItem(welcomePopupKey);

  if (!hasSeenPopup) {
    const welcomeHTML = `
      <div class="welcome-modal-backdrop" id="welcome-modal-backdrop">
        <div class="welcome-modal" id="welcome-modal">
          <button class="welcome-modal-close" id="welcome-modal-close" aria-label="Close dialog">✕</button>
          <div class="welcome-modal-content">
            <div class="welcome-modal-img">
              <img src="images/hero_banner.png" alt="Welcome to HeriTej Pulse" />
            </div>
            <div class="welcome-modal-body">
              <span class="welcome-modal-badge">✨ Exclusive Welcome</span>
              <h2>Explore India's Rich Heritage</h2>
              <p>Subscribe to the HeriTej Pulse newsletter to receive weekly stories, curated news, historical facts, and traditional art profiles delivered to your inbox.</p>
              <form class="welcome-modal-form" id="welcome-modal-form">
                <input type="email" placeholder="Enter your email address" required id="welcome-popup-email" />
                <button type="submit" id="welcome-popup-submit">Subscribe Free</button>
              </form>
              <span class="welcome-modal-privacy">No spam. Unsubscribe anytime.</span>
            </div>
          </div>
        </div>
      </div>
    `;

    // Append to body
    const welcomeContainer = document.createElement('div');
    welcomeContainer.innerHTML = welcomeHTML;
    document.body.appendChild(welcomeContainer);

    const backdrop = document.getElementById('welcome-modal-backdrop');
    const closeBtn = document.getElementById('welcome-modal-close');
    const form     = document.getElementById('welcome-modal-form');
    const submitBtn = document.getElementById('welcome-popup-submit');

    // Trigger open animation after 2.5s delay
    setTimeout(() => {
      if (backdrop) backdrop.classList.add('open');
    }, 2500);

    // Close function
    const closePopup = () => {
      if (backdrop) {
        backdrop.classList.remove('open');
        setTimeout(() => welcomeContainer.remove(), 500);
      }
      localStorage.setItem(welcomePopupKey, 'true');
    };

    // Close click listeners
    closeBtn?.addEventListener('click', closePopup);
    backdrop?.addEventListener('click', (e) => {
      if (e.target === backdrop) closePopup();
    });

    // Form submit listener
    form?.addEventListener('submit', (e) => {
      e.preventDefault();
      if (submitBtn) {
        submitBtn.textContent = '✓ Subscribed!';
        submitBtn.style.background = '#1a5c2e';
        submitBtn.style.color = '#fff';
      }
      setTimeout(closePopup, 1200);
    });
  }

  console.log('%c🏛️ HeriTej Pulse', 'font-size:20px; font-weight:bold; color:#b5451b;');
  console.log('%cIndia\'s Heritage News Platform — Loaded Successfully', 'color:#7a6a55;');

}); // DOMContentLoaded
