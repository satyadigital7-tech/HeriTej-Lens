/* ═══════════════════════════════════════════════════
   HERITEJ PULSE — ai-all-features.js
   Features: 1-Smart Search, 3-Mood Tags, 4-Heritage Trail,
             5-Voice Guide, 7-Image Captions
   ═══════════════════════════════════════════════════ */

document.addEventListener('DOMContentLoaded', () => {

/* ══════════════════════════════════════════════════
   FEATURE 1 — AI SMART SEARCH
══════════════════════════════════════════════════ */
const SEARCH_DB = [
  { icon:'🏛️', text:'Sacred Geometry of Khajuraho', cat:'Article', tag:'Heritage', href:'article.html?id=1' },
  { icon:'🎨', text:'Ajanta Cave Paintings Restored', cat:'Article', tag:'Art', href:'article.html?id=2' },
  { icon:'🗺️', text:'Hampi Drone Survey Reveals Lost City', cat:'Article', tag:'History', href:'article.html?id=3' },
  { icon:'🧵', text:'Banarasi Silk: Fabric of Indian Royalty', cat:'Article', tag:'Fashion', href:'article.html?id=4' },
  { icon:'🎮', text:'Heritage Master Quiz', cat:'Game', tag:'Quiz', href:'games.html' },
  { icon:'🎮', text:'History Trivia Blitz', cat:'Game', tag:'Trivia', href:'games.html' },
  { icon:'🎮', text:'Heritage Wordle', cat:'Game', tag:'Word', href:'games.html' },
  { icon:'🎮', text:'Landmark Map Explorer', cat:'Game', tag:'Map', href:'games.html' },
  { icon:'🕌', text:'Taj Mahal — Agra, Uttar Pradesh', cat:'Heritage Site', tag:'UNESCO', href:'news.html' },
  { icon:'🕌', text:'Khajuraho Group of Monuments', cat:'Heritage Site', tag:'UNESCO', href:'news.html' },
  { icon:'🕌', text:'Hampi — Vijayanagara Ruins', cat:'Heritage Site', tag:'UNESCO', href:'news.html' },
  { icon:'🕌', text:'Ajanta Caves — Maharashtra', cat:'Heritage Site', tag:'UNESCO', href:'news.html' },
  { icon:'🕌', text:'Brihadeeswarar Temple — Thanjavur', cat:'Heritage Site', tag:'Architecture', href:'news.html' },
  { icon:'🎭', text:'Kathakali — Classical Dance Form', cat:'Culture', tag:'Dance', href:'news.html' },
  { icon:'🪔', text:'Kumbh Mela — World\'s Largest Gathering', cat:'Culture', tag:'Festival', href:'news.html' },
  { icon:'📜', text:'Nalanda University — Ancient Learning', cat:'History', tag:'Education', href:'article.html?id=1' },
  { icon:'🧮', text:'Chaturanga — Origin of Chess in India', cat:'History', tag:'Ancient', href:'news.html' },
  { icon:'🔬', text:'Iron Pillar of Delhi — Rust-Resistant Metal', cat:'Science', tag:'Technology', href:'news.html' },
];

function fuzzyMatch(query, text) {
  const q = query.toLowerCase().trim();
  const t = text.toLowerCase();
  if (!q) return false;
  if (t.includes(q)) return true;
  // Check every word
  return q.split(' ').some(w => w.length > 2 && t.includes(w));
}

function buildSuggestions(query) {
  if (!query || query.length < 2) return [];
  return SEARCH_DB.filter(item =>
    fuzzyMatch(query, item.text) ||
    fuzzyMatch(query, item.cat) ||
    fuzzyMatch(query, item.tag)
  ).slice(0, 8);
}

function initSmartSearch() {
  const overlays = document.querySelectorAll('.search-overlay');
  overlays.forEach(overlay => {
    const input = overlay.querySelector('input[type="text"]');
    if (!input) return;

    // Create suggestion box
    const suggBox = document.createElement('div');
    suggBox.className = 'ai-search-suggestions';
    overlay.appendChild(suggBox);

    let debounceTimer;
    input.addEventListener('input', () => {
      clearTimeout(debounceTimer);
      debounceTimer = setTimeout(() => {
        const q = input.value.trim();
        const results = buildSuggestions(q);
        if (results.length === 0) { suggBox.classList.remove('open'); return; }

        // Group by category
        const groups = {};
        results.forEach(r => {
          if (!groups[r.cat]) groups[r.cat] = [];
          groups[r.cat].push(r);
        });

        suggBox.innerHTML = `
          <div class="ai-sugg-header">
            ✨ AI Smart Search
          </div>
          ${Object.entries(groups).map(([cat, items]) => `
            <div class="ai-sugg-group-label">${cat}</div>
            ${items.map(item => `
              <div class="ai-sugg-item" onclick="window.location.href='${item.href}'">
                <div class="ai-sugg-icon">${item.icon}</div>
                <span class="ai-sugg-text">${item.text.replace(new RegExp(q, 'gi'), m => `<strong>${m}</strong>`)}</span>
                <span class="ai-sugg-meta">${item.tag}</span>
              </div>
            `).join('')}
          `).join('')}
          <div class="ai-sugg-footer">✨ Powered by HeriTej AI · ${results.length} results</div>
        `;
        suggBox.classList.add('open');
      }, 180);
    });

    input.addEventListener('keydown', e => {
      if (e.key === 'Escape') suggBox.classList.remove('open');
    });

    document.addEventListener('click', e => {
      if (!overlay.contains(e.target)) suggBox.classList.remove('open');
    });
  });
}
initSmartSearch();


/* ══════════════════════════════════════════════════
   FEATURE 3 — AI MOOD TAGS & READ-TIME ESTIMATOR
══════════════════════════════════════════════════ */
const MOOD_RULES = [
  { keywords: ['drone','lidar','breaking','record','discover','latest','new','first'], mood: '🔥 Trending', cls: 'trending' },
  { keywords: ['deep','analysis','geometry','mathematics','structure','ancient','complex','philosophy'], mood: '📚 Deep Dive', cls: 'deep' },
  { keywords: ['quick','brief','short','recap','update','summary'], mood: '⚡ Quick Read', cls: 'quick' },
  { keywords: ['sacred','spiritual','culture','tradition','heritage','ritual','meditat'], mood: '🧘 Reflective', cls: 'reflective' },
  { keywords: ['cave','ruin','unearth','archaeolog','excavat','prehistoric','mystery','lost'], mood: '🔍 Discovery', cls: 'discovery' },
];

function detectMood(text) {
  const lower = text.toLowerCase();
  for (const rule of MOOD_RULES) {
    if (rule.keywords.some(k => lower.includes(k))) return rule;
  }
  return { mood: '📖 Read', cls: 'reflective' };
}

function estimateReadTime(wordCount) {
  const wpm = 220;
  const mins = Math.max(1, Math.round(wordCount / wpm));
  return `${mins} min read`;
}

function attachMoodTags() {
  // Story cards on home page
  document.querySelectorAll('.story-card').forEach(card => {
    const headline = card.querySelector('.story-headline')?.textContent || '';
    const excerpt  = card.querySelector('.story-excerpt')?.textContent || '';
    const footer   = card.querySelector('.story-footer');
    if (!footer || card.querySelector('.story-ai-row')) return;

    const wordCount = (headline + ' ' + excerpt).split(/\s+/).length * 8; // estimate full article
    const { mood, cls } = detectMood(headline + ' ' + excerpt);
    const readTime = estimateReadTime(wordCount);

    const aiRow = document.createElement('div');
    aiRow.className = 'story-ai-row';
    aiRow.innerHTML = `
      <span class="ai-mood-tag ${cls}">${mood}</span>
      <span class="ai-readtime-badge">
        <svg width="11" height="11" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
        ${readTime}
      </span>
    `;
    footer.before(aiRow);
  });

  // News cards
  document.querySelectorAll('.news-card, .nc-card').forEach(card => {
    const title = card.querySelector('h3, h4, .nc-title')?.textContent || '';
    if (!title || card.querySelector('.ai-mood-tag')) return;
    const { mood, cls } = detectMood(title);
    const tag = document.createElement('span');
    tag.className = `ai-mood-tag ${cls}`;
    tag.textContent = mood;
    const tagEl = card.querySelector('.nc-tag, .news-tag, .story-tag');
    if (tagEl) tagEl.after(tag);
  });
}
attachMoodTags();


/* ══════════════════════════════════════════════════
   FEATURE 4 — HERITAGE TRAIL GENERATOR
══════════════════════════════════════════════════ */
const TRAIL_SITES = {
  architecture: [
    { name:'Khajuraho Temples', loc:'Madhya Pradesh', desc:'Masterpieces of Nagara architecture with fractal geometry encoded in every tower proportion.', tag:'Architecture · 950–1050 CE' },
    { name:'Brihadeeswarar Temple', loc:'Thanjavur, Tamil Nadu', desc:'The crown jewel of Dravidian architecture — its 66-metre vimana was built without mortar.', tag:'Architecture · 1010 CE' },
    { name:'Kailash Temple, Ellora', loc:'Maharashtra', desc:'The world\'s largest rock-cut monument, carved downward from a single volcanic cliff face.', tag:'Architecture · 8th Century' },
    { name:'Rani Ki Vav', loc:'Patan, Gujarat', desc:'An inverted temple stepwell descending 7 levels with 500+ sculptural panels.', tag:'Architecture · 11th Century' },
  ],
  history: [
    { name:'Nalanda University', loc:'Bihar', desc:'Once the world\'s greatest centre of learning — 10,000 students from 30 nations.', tag:'History · 5th–12th Century' },
    { name:'Hampi Ruins', loc:'Karnataka', desc:'Capital of the Vijayanagara Empire at its 15th-century peak — home to 500,000 people.', tag:'History · 1336–1565 CE' },
    { name:'Lothal', loc:'Gujarat', desc:'A 4,500-year-old Indus Valley port city with the world\'s first known dockyard.', tag:'History · 2400 BCE' },
  ],
  culture: [
    { name:'Pattadakal', loc:'Karnataka', desc:'A fusion of northern and southern temple styles at a single UNESCO-listed complex.', tag:'Culture · 7th–8th Century' },
    { name:'Sanchi Stupa', loc:'Madhya Pradesh', desc:'India\'s oldest stone structure, commissioned by Emperor Ashoka to spread Buddhism.', tag:'Culture · 3rd Century BCE' },
    { name:'Konark Sun Temple', loc:'Odisha', desc:'A chariot-shaped temple with 24 stone wheels that served as a precise sundial.', tag:'Culture · 1250 CE' },
  ],
  south: [
    { name:'Madurai Meenakshi Temple', loc:'Tamil Nadu', desc:'A 14-tower Dravidian complex with 33,000 sculptures covering every surface.', tag:'South India · 17th Century' },
    { name:'Hampi Vittala Temple', loc:'Karnataka', desc:'Home to the iconic Stone Chariot and 56 musical pillars that emit musical tones.', tag:'South India · 15th Century' },
    { name:'Airavatesvara Temple', loc:'Darasuram, Tamil Nadu', desc:'A UNESCO-listed Chola marvel where the steps produce different musical notes.', tag:'South India · 12th Century' },
  ],
  mughal: [
    { name:'Taj Mahal', loc:'Agra, Uttar Pradesh', desc:'The pinnacle of Mughal architecture — 22,000 workers across 22 years, pure white marble.', tag:'Mughal · 1631–1653 CE' },
    { name:'Red Fort', loc:'Delhi', desc:'Shah Jahan\'s magnificent river-facing citadel that served as the Mughal capital.', tag:'Mughal · 1648 CE' },
    { name:'Fatehpur Sikri', loc:'Uttar Pradesh', desc:'Akbar\'s abandoned capital, perfectly preserved — an open-air museum of Mughal planning.', tag:'Mughal · 1571 CE' },
  ],
  nature: [
    { name:'Kaziranga National Park', loc:'Assam', desc:'UNESCO-listed home of the one-horned rhino — over 2,400 individuals roam here.', tag:'Nature Heritage · Est. 1905' },
    { name:'Sundarbans', loc:'West Bengal', desc:'The world\'s largest mangrove delta — habitat of the Royal Bengal Tiger.', tag:'Nature Heritage · UNESCO' },
  ],
};

const TRAIL_LABELS = {
  architecture: { icon:'🏛️', label:'Architecture' },
  history:      { icon:'📜', label:'Ancient History' },
  culture:      { icon:'🎭', label:'Culture & Arts' },
  south:        { icon:'🕌', label:'South India' },
  mughal:       { icon:'🕌', label:'Mughal Era' },
  nature:       { icon:'🌿', label:'Nature Heritage' },
};

function renderTrailSection() {
  const heroSection = document.querySelector('.hero-section') || document.querySelector('.hero-section-wrap');
  if (!heroSection) return; // Only inject on index.html

  const el = document.createElement('section');
  el.className = 'heritage-trail-section';
  el.id = 'heritage-trail';
  el.innerHTML = `
    <div class="trail-inner">
      <div class="trail-header">
        <div class="trail-ai-badge">
          <svg width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
          AI Heritage Trail Generator
        </div>
        <h2 class="trail-title">Build Your Personal Heritage Trail</h2>
        <p class="trail-subtitle">Pick your interests below and our AI will craft a curated itinerary through India's most extraordinary UNESCO heritage sites.</p>
      </div>

      <div class="trail-interests" id="trail-interests">
        ${Object.entries(TRAIL_LABELS).map(([key, val]) => `
          <button class="trail-interest-btn" data-key="${key}">
            ${val.icon} ${val.label}
          </button>
        `).join('')}
      </div>

      <button class="trail-generate-btn" id="trail-gen-btn" disabled>
        ✨ Generate My Trail
      </button>

      <div class="trail-result" id="trail-result">
        <p class="trail-result-title" id="trail-result-title"></p>
        <div class="trail-stops" id="trail-stops"></div>
      </div>
    </div>
  `;

  // Insert after the quote section or before the fashion section
  const quoteSection = document.getElementById('quote-section');
  if (quoteSection && quoteSection.parentNode) {
    quoteSection.parentNode.insertBefore(el, quoteSection.nextSibling);
  } else {
    document.body.appendChild(el);
  }

  // Wire up interactions
  let selected = [];
  const genBtn = document.getElementById('trail-gen-btn');

  document.getElementById('trail-interests').addEventListener('click', e => {
    const btn = e.target.closest('.trail-interest-btn');
    if (!btn) return;
    const key = btn.dataset.key;
    btn.classList.toggle('selected');
    if (btn.classList.contains('selected')) {
      selected.push(key);
    } else {
      selected = selected.filter(k => k !== key);
    }
    genBtn.disabled = selected.length === 0;
  });

  genBtn.addEventListener('click', () => {
    if (selected.length === 0) return;

    genBtn.textContent = '⏳ Generating trail…';
    genBtn.disabled = true;

    setTimeout(() => {
      // Gather 4–5 sites from selected interests
      let sites = [];
      selected.forEach(key => {
        const pool = TRAIL_SITES[key] || [];
        pool.forEach(s => { if (!sites.find(x => x.name === s.name)) sites.push(s); });
      });
      // Shuffle & take up to 5
      sites = sites.sort(() => Math.random() - 0.5).slice(0, Math.min(5, sites.length));

      const interestLabels = selected.map(k => TRAIL_LABELS[k].label).join(' + ');
      document.getElementById('trail-result-title').textContent = `Your Heritage Trail: ${interestLabels}`;

      document.getElementById('trail-stops').innerHTML = sites.map((site, i) => `
        <div class="trail-stop">
          <div class="trail-stop-num">${i + 1}</div>
          <div class="trail-stop-body">
            <div class="trail-stop-name">${site.name}</div>
            <div class="trail-stop-location">📍 ${site.loc}</div>
            <div class="trail-stop-desc">${site.desc}</div>
            <span class="trail-stop-tag">${site.tag}</span>
          </div>
        </div>
      `).join('');

      document.getElementById('trail-result').classList.add('visible');
      genBtn.textContent = '✨ Regenerate Trail';
      genBtn.disabled = false;
    }, 1400);
  });
}
renderTrailSection();


/* ══════════════════════════════════════════════════
   FEATURE 5 — AI VOICE TOUR GUIDE
══════════════════════════════════════════════════ */
function initVoiceGuide() {
  const articleBody = document.getElementById('article-body');
  const articleTitle = document.getElementById('article-title');
  const voiceBarSlot = document.getElementById('voice-guide-slot');
  if (!articleBody || !voiceBarSlot) return;

  const title = articleTitle?.textContent?.trim() || 'This Article';
  let utterance = null;
  let synth = window.speechSynthesis;
  let isPlaying = false;
  let paragraphs = [];
  let currentParaIdx = 0;

  // Build bar
  voiceBarSlot.innerHTML = `
    <div class="voice-guide-bar" id="voice-guide-bar">
      <div class="voice-guide-label">🎙️ AI Voice Guide</div>
      <div class="voice-guide-title">${title}</div>
      <button class="voice-btn voice-btn-play" id="voice-play-btn">
        <svg width="13" height="13" fill="currentColor" viewBox="0 0 24 24"><polygon points="5 3 19 12 5 21 5 3"/></svg>
        Listen
      </button>
      <button class="voice-btn voice-btn-stop" id="voice-stop-btn" style="display:none">
        <svg width="13" height="13" fill="currentColor" viewBox="0 0 24 24"><rect x="6" y="4" width="4" height="16"/><rect x="14" y="4" width="4" height="16"/></svg>
        Stop
      </button>
    </div>
  `;

  const playBtn = document.getElementById('voice-play-btn');
  const stopBtn = document.getElementById('voice-stop-btn');

  // Wrap each paragraph for highlighting
  paragraphs = Array.from(articleBody.querySelectorAll('p, h2, h3, blockquote'));

  function speak() {
    if (!synth) { alert('Your browser does not support Speech Synthesis.'); return; }
    const fullText = paragraphs.map(p => p.innerText).join('. ');
    utterance = new SpeechSynthesisUtterance(fullText);
    utterance.lang = 'en-IN';
    utterance.rate = 0.92;
    utterance.pitch = 1.0;

    let charIndex = 0;
    let paraCharLengths = paragraphs.map(p => p.innerText.length + 2);

    utterance.onboundary = e => {
      if (e.name !== 'word') return;
      // Highlight current paragraph
      let cum = 0;
      for (let i = 0; i < paraCharLengths.length; i++) {
        cum += paraCharLengths[i];
        if (e.charIndex < cum) {
          paragraphs.forEach((p, j) => {
            p.classList.toggle('voice-highlight', j === i);
          });
          break;
        }
      }
    };

    utterance.onend = () => {
      paragraphs.forEach(p => p.classList.remove('voice-highlight'));
      isPlaying = false;
      playBtn.innerHTML = `<svg width="13" height="13" fill="currentColor" viewBox="0 0 24 24"><polygon points="5 3 19 12 5 21 5 3"/></svg> Listen`;
      playBtn.classList.remove('playing');
      stopBtn.style.display = 'none';
      playBtn.style.display = '';
    };

    synth.speak(utterance);
    isPlaying = true;
    playBtn.innerHTML = `▐▐ Pause <div class="voice-wave"><span></span><span></span><span></span></div>`;
    playBtn.classList.add('playing');
    stopBtn.style.display = '';
  }

  playBtn.addEventListener('click', () => {
    if (!isPlaying) {
      if (synth.paused) { synth.resume(); isPlaying = true; return; }
      speak();
    } else {
      synth.pause();
      isPlaying = false;
      playBtn.innerHTML = `<svg width="13" height="13" fill="currentColor" viewBox="0 0 24 24"><polygon points="5 3 19 12 5 21 5 3"/></svg> Resume`;
      playBtn.classList.remove('playing');
    }
  });

  stopBtn.addEventListener('click', () => {
    synth.cancel();
    isPlaying = false;
    paragraphs.forEach(p => p.classList.remove('voice-highlight'));
    playBtn.innerHTML = `<svg width="13" height="13" fill="currentColor" viewBox="0 0 24 24"><polygon points="5 3 19 12 5 21 5 3"/></svg> Listen`;
    playBtn.classList.remove('playing');
    stopBtn.style.display = 'none';
  });
}
initVoiceGuide();


/* ══════════════════════════════════════════════════
   FEATURE 7 — AI IMAGE CAPTION PANELS
══════════════════════════════════════════════════ */
const IMAGE_CAPTIONS = {
  'news.avif': { loc:'Paris, France', fact:'Indian designer Manish Malhotra set to showcase at Paris Haute Couture Week 2026, marking a historic invitation for Indian fashion.' },
  'story1.png': { loc:'Khajuraho, Madhya Pradesh', fact:'Built by the Chandela dynasty between 950–1050 CE. Each tower encodes the golden ratio — a mathematical formula also found in nature.' },
  'story2.png': { loc:'Ajanta Caves, Maharashtra', fact:'2,000-year-old Buddhist murals painted using lapis lazuli imported from Afghanistan across ancient trade routes.' },
  'story3.png': { loc:'Hampi, Karnataka', fact:'At its 15th-century peak, the Vijayanagara Empire here housed ~500,000 residents — the 2nd largest city in the medieval world.' },
  'hero_banner.png': { loc:'Ancient India — Sacred Architecture', fact:'Indian temple geometry is based on the Vastu Purusha Mandala — a cosmic grid representing the universe in architectural form.' },
  'spotlight1.png': { loc:'Indian Street Food Heritage', fact:'India has one of the world\'s most diverse street food traditions, with recipes tracing back over 2,000 years through Ayurvedic cooking texts.' },
  'spotlight2.png': { loc:'Navratri Festival, Gujarat', fact:'Navratri involves 9 nights of continuous Garba and Dandiya Raas dances — a living 1,500-year-old ritual tradition.' },
  'fashion_main.png': { loc:'Indian Textiles on Global Runways', fact:'Zardozi embroidery — gold-thread work from Mughal courts — now appears on couture at Paris Fashion Week.' },
};

function getImageKey(src) {
  const parts = src.split('/');
  return parts[parts.length - 1];
}

function attachImageCaptions() {
  // Target story cards, spotlight cards, fashion cards
  const targets = document.querySelectorAll(
    '.story-img-wrap img, .spot-img-wrap img, .fashion-main-img img, .read-card img'
  );

  targets.forEach(img => {
    const wrap = img.parentElement;
    if (!wrap || wrap.querySelector('.ai-caption-panel')) return;

    const key = getImageKey(img.src);
    const data = IMAGE_CAPTIONS[key];
    if (!data) return;

    // Wrap in caption container
    wrap.classList.add('ai-caption-wrap');
    const panel = document.createElement('div');
    panel.className = 'ai-caption-panel';
    panel.innerHTML = `
      <div class="ai-cap-badge">
        <svg width="10" height="10" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
        ✨ AI Heritage Insight · 📍 ${data.loc}
      </div>
      <div class="ai-cap-text">${data.fact}</div>
    `;
    wrap.appendChild(panel);
  });
}
// Run after a tick to let any dynamic content render
setTimeout(attachImageCaptions, 200);

}); // end DOMContentLoaded
