/* ═══════════════════════════════════════════════════
   HERITEJ PULSE — about-script.js
   ═══════════════════════════════════════════════════ */

document.addEventListener('DOMContentLoaded', () => {

  /* ─── Date in Topbar ─────────────────────────── */
  const dateEl = document.getElementById('atb-date');
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

  /* ─── Link Copier for Contact Emails ─────────── */
  const contactLabels = document.querySelectorAll('.contact-label');
  contactLabels.forEach(label => {
    label.addEventListener('click', () => {
      const email = label.textContent.trim();
      navigator.clipboard?.writeText(email).then(() => {
        showToast(`📬 Email copied: ${email}`);
      }).catch(() => {
        showToast('🔗 Failed to copy. Please copy manually.');
      });
    });
  });

  /* ─── Toast Notification Utility ──────────────── */
  function showToast(msg) {
    let toast = document.getElementById('about-toast');
    if (!toast) {
      toast = document.createElement('div');
      toast.id = 'about-toast';
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
      showToast(`Translating to ${langName}…`);
      translatePageClient(langCode);
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

  console.log('%c🏛️ HeriTej Pulse — About Page Loaded', 'font-size:16px; font-weight:bold; color:#b5451b;');
});
