/* ═══════════════════════════════════════════════════
   HERITEJ PULSE — ai-features.js
   ═══════════════════════════════════════════════════ */

document.addEventListener('DOMContentLoaded', () => {

  // Inject AI Summary Modal Structure into Body
  const modalHTML = `
    <div class="ai-modal-overlay" id="ai-modal-overlay" onclick="closeAiModal(event)">
      <div class="ai-modal-card">
        <div class="ai-modal-header">
          <div class="aim-title-wrap">
            <span class="aim-title-icon">✨</span>
            <h3>HeriTej AI Manuscript Summarizer</h3>
          </div>
          <button class="ai-modal-close" onclick="hideAiSummary()">✕</button>
        </div>
        <div class="ai-modal-body" id="ai-modal-body">
          <!-- Dynamically populated -->
        </div>
      </div>
    </div>
  `;
  const modalContainer = document.createElement('div');
  modalContainer.innerHTML = modalHTML;
  document.body.appendChild(modalContainer);

  window.hideAiSummary = function() {
    document.getElementById('ai-modal-overlay').classList.remove('open');
  };

  window.closeAiModal = function(e) {
    if (e.target === document.getElementById('ai-modal-overlay')) {
      hideAiSummary();
    }
  };

  // Mock summaries database
  const SUMMARIES_DB = {
    'story-1': {
      title: "Stone and Spirit: The Geometry and Design of India's Sacred Architecture",
      bullets: [
        { label: "Core Blueprint", text: "The architectural plans of Khajuraho temples utilize the *Vastu Purusha Mandala* — a highly sophisticated grid design composed of fractal squares." },
        { label: "Fractal Design", text: "New measurements show that the height-to-width ratios replicate geometric patterns recursively, mirroring natural systems centuries before Western mathematicians mapped fractals." },
        { label: "Cultural Link", text: "The layout proves that temple builders were skilled mathematicians who integrated complex astronomy and calculation into devotional stone works." }
      ],
      insight: "💡 **Historical Note**: Indian temple layouts represent a physical model of the cosmos, where the central inner sanctum (*Garbhagriha*) marks the point of infinite density from which creation expands outward."
    },
    'story-2': {
      title: "Ajanta Restored: Conserving 2,000-Year-Old Pigments",
      bullets: [
        { label: "Modern Imaging", text: "Using multi-spectral and infrared digital photography, conservationists can see through layers of soot and dirt to study the original pigments." },
        { label: "Draft Layers", text: "Imaging revealed early under-drawings showing how artists altered their drafts (e.g. changing hand positions) on the plaster around 150 BCE." },
        { label: "Pigment Chemistry", text: "Analysis confirmed the use of imported lapis lazuli from Afghanistan, indicating robust Trade Route links during the Satavahana dynasty." }
      ],
      insight: "💡 **Artisan Detail**: The plaster was made of local clay, cow dung, and rice husks. While still wet, mineral pigments were applied, allowing the painting to bind directly into the cave wall."
    },
    'story-3': {
      title: "The Footprints of Vijayanagara: Mapping Medieval Ruins",
      bullets: [
        { label: "LIDAR Survey", text: "Airborne LIDAR has successfully penetrated dense brushwood to scan the land contours, uncovering previously unseen masonry blocks." },
        { label: "Expanded Boundaries", text: "Archaeologists mapped a new 3-kilometer extension of Hampi's outer defensive walls, indicating a metropolis larger than previously estimated." },
        { label: "Water Network", text: "Scanning identified an array of interconnected gravity-fed clay pipelines linking stepwells directly to domestic living quarters." }
      ],
      insight: "💡 **Scale Note**: At its peak in the 15th century, Vijayanagara was home to an estimated 500,000 residents, making it the second-largest city in the medieval world after Beijing."
    }
  };

  // Trigger Article Summary
  window.summarizeArticle = function(storyId) {
    const data = SUMMARIES_DB[storyId];
    if (!data) return;

    const overlay = document.getElementById('ai-modal-overlay');
    const body = document.getElementById('ai-modal-body');

    // Show Modal
    overlay.classList.add('open');

    // Render loading state
    body.innerHTML = `
      <div class="ai-loading-wrap">
        <div class="ai-pulse-core">📜</div>
        <div class="ai-loading-text">Analyzing manuscript layout...</div>
        <div style="font-size:0.75rem; color:var(--clr-text-muted); margin-top:8px;">Running neural summarization model</div>
      </div>
    `;

    // Simulate analysis delay
    setTimeout(() => {
      body.innerHTML = `
        <h4 style="font-family:var(--ff-head); font-size:1.15rem; color:var(--clr-dark); margin-bottom:18px; line-height:1.45;">${data.title}</h4>
        <div class="ai-summary-bullets">
          ${data.bullets.map(b => `
            <div class="ai-bullet-item">
              <span class="aib-label">${b.label}</span>
              <div>${b.text}</div>
            </div>
          `).join('')}
        </div>
        <div class="ai-insights-box">
          ${data.insight}
        </div>
      `;
    }, 1500);
  };

  // Add "✨ Quick AI Summary" link to cards on current page
  function attachSummaryLinks() {
    const cards = [
      { id: 'story-card-1', key: 'story-1' },
      { id: 'story-card-2', key: 'story-2' },
      { id: 'story-card-3', key: 'story-3' }
    ];

    cards.forEach(c => {
      const el = document.getElementById(c.id);
      if (el) {
        // Check if already injected
        if (el.querySelector('.ai-card-action')) return;

        const body = el.querySelector('.story-body');
        if (body) {
          const actionDiv = document.createElement('div');
          actionDiv.className = 'ai-card-action';
          actionDiv.innerHTML = `
            <span class="ai-summary-link" onclick="event.stopPropagation(); summarizeArticle('${c.key}')">
              ✨ Summarize with AI
            </span>
            <span style="font-size: 0.65rem; color: var(--clr-text-muted); font-family: var(--ff-ui);">Model v1.8</span>
          `;
          body.appendChild(actionDiv);
        }
      }
    });
  }
  attachSummaryLinks();


  /* ═══════════════════════════════════════════════════
     AI TRIVIA ORACLE WIDGET
     ═══════════════════════════════════════════════════ */
  const TRIVIA_DATA = {
    architecture: [
      {
        q: "Which site contains musical stone pillars that hum different musical notes when tapped?",
        opts: ["Sun Temple, Konark", "Vittala Temple, Hampi", "Brihadeeswarar Temple, Thanjavur", "Kailash Temple, Ellora"],
        ans: 1,
        insight: "The Vittala Temple in Hampi has 56 musical pillars. British archaeologists were so intrigued they cut two of them open to check if they were hollow, but found solid stone!"
      },
      {
        q: "Rani Ki Vav (Queen's Stepwell) in Gujarat is built to represent which architectural layout?",
        opts: ["An inverted temple", "A spiral fortress", "A star-shaped palace", "A grand reservoir"],
        ans: 0,
        insight: "Built in the 11th century, Rani Ki Vav is designed as an inverted temple highlighting the sanctity of water, descending through seven levels of detailed carvings."
      }
    ],
    science: [
      {
        q: "The rust-resistant iron pillar of Delhi was erected during which empire's reign?",
        opts: ["Maurya Empire", "Gupta Empire", "Mughal Empire", "Chola Empire"],
        ans: 1,
        insight: "Erected during Chandra Gupta II's reign (~400 CE), the pillar's rust-resistance comes from a high-phosphorus protective film formed at the metal-slag interface."
      },
      {
        q: "Which ancient Indian mathematical text first laid down rules for using the number zero?",
        opts: ["Aryabhatiya", "Brahmasphutasiddhanta", "Lilavati", "Sulba Sutras"],
        ans: 1,
        insight: "Brahmagupta's Brahmasphutasiddhanta (628 CE) established zero as a number in its own right and defined arithmetic rules for positive and negative numbers."
      }
    ],
    textiles: [
      {
        q: "The intricate Double Ikat Patola saris, where warp and weft are tie-dyed, are traditionally woven in:",
        opts: ["Patan", "Bhuj", "Surat", "Jamnagar"],
        ans: 0,
        insight: "Patan Patola saris take up to six months for a single piece due to the absolute precision required to align warp and weft threads before weaving."
      },
      {
        q: "Which printing style uses wooden blocks carved with heritage designs to print indigo patterns in Rajasthan?",
        opts: ["Kalamkari", "Dabu / Bagru", "Bandhani", "Chanderi"],
        ans: 1,
        insight: "Dabu printing uses a mud-resist paste made of clay, gum, and lime. The fabric is hand-stamped, dyed in indigo, and washed to reveal stunning designs."
      }
    ]
  };

  function injectOracleWidget() {
    const sidebar = document.getElementById('today-history');
    if (!sidebar) return;

    // Check if already injected
    if (document.getElementById('ai-oracle-widget')) return;

    const widget = document.createElement('div');
    widget.className = 'ai-oracle-widget';
    widget.id = 'ai-oracle-widget';
    widget.innerHTML = `
      <div class="aio-header">
        <span class="aio-icon">✨</span>
        <h3>AI Trivia Oracle</h3>
      </div>
      <div class="aio-body" id="aio-body">
        <p class="aio-intro">Generate a custom heritage challenge from ancient mathematical, textile, or architectural archives.</p>
        <div class="aio-cats">
          <button class="aio-cat-btn active" data-topic="architecture" onclick="selectOracleTopic('architecture', this)">🏛️ Build</button>
          <button class="aio-cat-btn" data-topic="science" onclick="selectOracleTopic('science', this)">🔬 Math</button>
          <button class="aio-cat-btn" data-topic="textiles" onclick="selectOracleTopic('textiles', this)">🧵 Loom</button>
        </div>
        <button class="aio-gen-btn" id="aio-gen-btn" onclick="generateOracleChallenge()">Ask the Oracle</button>
      </div>
    `;
    sidebar.appendChild(widget);
  }
  injectOracleWidget();

  let activeTopic = 'architecture';

  window.selectOracleTopic = function(topic, btn) {
    activeTopic = topic;
    const btns = btn.parentNode.querySelectorAll('.aio-cat-btn');
    btns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
  };

  window.generateOracleChallenge = function() {
    const container = document.getElementById('aio-body');
    if (!container) return;

    // Show loading spinner
    container.innerHTML = `
      <div class="aio-loader">
        <div class="aio-spinner"></div>
        <div class="aio-loader-text">Querying ancient scrolls...</div>
      </div>
    `;

    setTimeout(() => {
      const list = TRIVIA_DATA[activeTopic];
      const qObj = list[Math.floor(Math.random() * list.length)];

      container.innerHTML = `
        <div class="aio-q-text">${qObj.q}</div>
        <div class="aio-opts-list">
          ${qObj.opts.map((opt, i) => `
            <button class="aio-opt-btn" onclick="checkOracleAnswer(${i}, ${qObj.ans}, '${qObj.insight.replace(/'/g, "\\'")}', this)">
              ${opt}
            </button>
          `).join('')}
        </div>
      `;
    }, 1200);
  };

  window.checkOracleAnswer = function(chosenIdx, correctIdx, insight, btn) {
    const parent = btn.parentNode;
    const btns = parent.querySelectorAll('.aio-opt-btn');

    btns.forEach((b, i) => {
      b.disabled = true;
      if (i === correctIdx) {
        b.classList.add('correct');
      } else if (i === chosenIdx) {
        b.classList.add('wrong');
      }
    });

    const body = document.getElementById('aio-body');
    const expl = document.createElement('div');
    expl.className = 'aio-explanation';
    expl.innerHTML = `<strong>Oracle Insight:</strong> ${insight}`;
    body.appendChild(expl);

    const resetBtn = document.createElement('button');
    resetBtn.className = 'aio-gen-btn';
    resetBtn.style.marginTop = '8px';
    resetBtn.textContent = "Generate Another";
    resetBtn.onclick = () => {
      body.innerHTML = `
        <p class="aio-intro">Generate a custom heritage challenge from ancient mathematical, textile, or architectural archives.</p>
        <div class="aio-cats">
          <button class="aio-cat-btn ${activeTopic === 'architecture' ? 'active' : ''}" data-topic="architecture" onclick="selectOracleTopic('architecture', this)">🏛️ Build</button>
          <button class="aio-cat-btn ${activeTopic === 'science' ? 'active' : ''}" data-topic="science" onclick="selectOracleTopic('science', this)">🔬 Math</button>
          <button class="aio-cat-btn ${activeTopic === 'textiles' ? 'active' : ''}" data-topic="textiles" onclick="selectOracleTopic('textiles', this)">🧵 Loom</button>
        </div>
        <button class="aio-gen-btn" id="aio-gen-btn" onclick="generateOracleChallenge()">Ask the Oracle</button>
      `;
    };
    body.appendChild(resetBtn);
  };
});
