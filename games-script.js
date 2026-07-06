/* ═══════════════════════════════════════════════════
   HERITEJ PULSE — games-script.js  (v2 — multi-type)
   ═══════════════════════════════════════════════════ */

/* ── Inject animation CSS ────────────────────────── */
(function(){
  const s = document.createElement('style');
  s.textContent = `
    @keyframes shake{0%,100%{transform:translateX(0)}20%,60%{transform:translateX(-5px)}40%,80%{transform:translateX(5px)}}
    @keyframes popIn{0%{transform:scale(0.7);opacity:0}60%{transform:scale(1.1)}100%{transform:scale(1);opacity:1}}
    @keyframes pulseBorder{0%,100%{box-shadow:0 0 0 0 rgba(229,62,30,0.6)}50%{box-shadow:0 0 0 6px rgba(229,62,30,0)}}
    .tl-shake{animation:shake 0.4s ease;}
    .pop-in{animation:popIn 0.3s ease forwards;}
  `;
  document.head.appendChild(s);
})();

/* ══════════════════════════════════════════════════
   GAME DATA
══════════════════════════════════════════════════ */
const GAMES_DATA = {

  'heritage-master-quiz': {
    gameType: 'quiz',
    title: 'Heritage Master Quiz', badge: 'Heritage Quizzes', badgeColor: '#7a4a2e',
    difficulty: 'HOT', image: 'images/game_heritage_master_quiz.png',
    desc: '5,000 years of Indian civilisation. Mughal emperors, ancient temples, sacred texts.',
    players: '47,482', rating: '4.8 ★', time: '~15 min',
    questions_data: [
      { q: 'Which dynasty built the Khajuraho temples?', opts: ['Chandela', 'Chola', 'Pallava', 'Gupta'], ans: 0 },
      { q: 'Nalanda University was in which modern-day state?', opts: ['Uttar Pradesh', 'Bihar', 'Madhya Pradesh', 'Rajasthan'], ans: 1 },
      { q: 'Which ruler is associated with the Ashoka Pillar?', opts: ['Chandragupta', 'Ashoka Maurya', 'Akbar', 'Harsha'], ans: 1 },
      { q: 'The Ajanta Caves are primarily associated with?', opts: ['Hinduism', 'Jainism', 'Buddhism', 'Zoroastrianism'], ans: 2 },
      { q: "World's oldest scripture?", opts: ['Mahabharata', 'Ramayana', 'Rigveda', 'Upanishads'], ans: 2 },
    ]
  },

  'sacred-word-unscramble': {
    gameType: 'unscramble',
    title: 'Sacred Word Unscramble', badge: 'Word Games', badgeColor: '#4a5e8c',
    difficulty: 'EASY', image: 'images/game_sacred_word_unscramble.png',
    desc: 'Tap scrambled letters to spell out heritage words. Easy to start, fiendishly addictive!',
    players: '8,300', rating: '4.5 ★', time: '~8 min',
    questions_data: [
      { word: 'NALANDA', hint: 'Ancient Buddhist university in Bihar — centre of world learning' },
      { word: 'HAMPI',   hint: 'UNESCO World Heritage ruined city of the Vijayanagara Empire, Karnataka' },
      { word: 'LOTHAL',  hint: 'Ancient Indus Valley port city discovered in Gujarat' },
      { word: 'AJANTA',  hint: 'Famous rock-cut caves with Buddhist murals in Maharashtra' },
      { word: 'SANCHI',  hint: 'Site of the Great Stupa commissioned by Emperor Ashoka, MP' },
    ]
  },

  'history-trivia-blitz': {
    gameType: 'blitz',
    title: 'History Trivia Blitz', badge: 'History Trivia', badgeColor: '#5a3d82',
    difficulty: 'HOT', image: 'images/game_history_trivia_blitz.png',
    desc: '8 seconds per question! Build streaks, earn multipliers, smash your high score!',
    players: '74,100', rating: '4.9 ★', time: '~5 min',
    questions_data: [
      { q: 'Year of Indian independence?', opts: ['1945','1947','1950','1948'], ans: 1 },
      { q: 'First Prime Minister of India?', opts: ['Patel','Ambedkar','Nehru','Bose'], ans: 2 },
      { q: 'Who built the Red Fort?', opts: ['Akbar','Jahangir','Shah Jahan','Aurangzeb'], ans: 2 },
      { q: 'Indus Valley is also known as?', opts: ['Vedic','Dravidian','Harappan','Aryan'], ans: 2 },
      { q: 'Battle of Panipat 1526: Babur defeated?', opts: ['Akbar','Ibrahim Lodi','Sher Shah','Hemu'], ans: 1 },
      { q: "Ashoka's dynasty?", opts: ['Gupta','Maurya','Kushan','Nanda'], ans: 1 },
      { q: 'Taj Mahal is in?', opts: ['Delhi','Jaipur','Agra','Lucknow'], ans: 2 },
      { q: 'Chanakya was advisor to?', opts: ['Ashoka','Chandragupta Maurya','Harsha','Akbar'], ans: 1 },
    ]
  },

  'heritage-wordle': {
    gameType: 'wordle',
    title: 'Heritage Wordle', badge: 'Word Games', badgeColor: '#4a5e8c',
    difficulty: 'MEDIUM', image: 'images/game_heritage_wordle.png',
    desc: 'Guess the 5-letter heritage word in 6 attempts. Green = right spot, Yellow = wrong spot!',
    players: '19,993', rating: '4.7 ★', time: '~5 min',
    wordle_word: 'STUPA',
    wordle_hint: 'A dome-shaped Buddhist monument',
    wordle_fact: "A STUPA is a dome-shaped Buddhist shrine containing sacred relics. Emperor Ashoka built 84,000 stupas across Asia to spread the Buddha's teachings!",
  },

  'monument-memory-match': {
    gameType: 'memory',
    title: 'Monument Memory Match', badge: 'Puzzle Games', badgeColor: '#1e6e6e',
    difficulty: 'EASY', image: 'images/game_monument_memory_match.png',
    desc: 'Flip cards to find matching monument-location pairs. Test your visual memory!',
    players: '8,099', rating: '4.4 ★', time: '~10 min',
    memory_pairs: [
      ['Taj Mahal','Agra, Uttar Pradesh'],
      ['Qutub Minar','New Delhi'],
      ['Hampi Ruins','Karnataka'],
      ['Sun Temple','Konark, Odisha'],
      ['Ajanta Caves','Maharashtra'],
      ['Brihadeeswarar Temple','Thanjavur, Tamil Nadu'],
      ['Hawa Mahal','Jaipur, Rajasthan'],
      ['Sanchi Stupa','Madhya Pradesh'],
    ]
  },

  'timeline-challenge': {
    gameType: 'timeline',
    title: 'Timeline Challenge', badge: 'History Trivia', badgeColor: '#5a3d82',
    difficulty: 'HARD', image: 'images/game_timeline_challenge.png',
    desc: 'Click events in chronological order — earliest to latest. Master 5,000 years of Indian history!',
    players: '18,455', rating: '4.6 ★', time: '~20 min',
    questions_data: [
      { question: 'Click EARLIEST to LATEST:', events: [
        { label: 'Indus Valley Civilisation', year: -2600 },
        { label: 'Maurya Empire founded',     year: -322  },
        { label: 'Gupta Empire',              year:  320  },
        { label: 'Delhi Sultanate',           year:  1206 },
      ]},
      { question: 'Click EARLIEST to LATEST:', events: [
        { label: 'Vedic Age begins',        year: -1500 },
        { label: "Buddha's Enlightenment",  year: -528  },
        { label: 'Mughal Empire founded',   year:  1526 },
        { label: 'Indian Independence',     year:  1947 },
      ]},
      { question: 'Click EARLIEST to LATEST:', events: [
        { label: "Ashoka's rule",     year: -268 },
        { label: 'Chola Empire peak', year:  985 },
        { label: "Akbar's reign",     year: 1556 },
        { label: 'Battle of Plassey', year: 1757 },
      ]},
      { question: 'Click EARLIEST to LATEST:', events: [
        { label: 'Harappan Civilisation', year: -2600 },
        { label: 'Chandragupta Maurya',   year: -321  },
        { label: 'Vijayanagara Empire',   year:  1336 },
        { label: 'Taj Mahal built',       year:  1632 },
      ]},
      { question: 'Click EARLIEST to LATEST:', events: [
        { label: 'Ramayana composed',          year: -500 },
        { label: 'Nalanda University founded', year:  450 },
        { label: 'Qutub Minar built',          year: 1193 },
        { label: 'British Raj begins',         year: 1858 },
      ]},
    ]
  },

  'landmark-map-explorer': {
    gameType: 'quiz',
    title: 'Landmark Map Explorer', badge: 'Map Games', badgeColor: '#2e5c8a',
    difficulty: 'MEDIUM', image: 'images/game_landmark_map_explorer.png',
    desc: "Locate India's historic monuments and UNESCO World Heritage Sites on the map!",
    players: '14,600', rating: '4.5 ★', time: '~12 min',
    questions_data: [
      { q: 'In which state is Hampi located?', opts: ['Tamil Nadu','Andhra Pradesh','Karnataka','Telangana'], ans: 2 },
      { q: 'The Khajuraho temples are in which state?', opts: ['Rajasthan','Madhya Pradesh','Uttar Pradesh','Odisha'], ans: 1 },
      { q: 'Ajanta caves are nearest to which city?', opts: ['Pune','Nagpur','Aurangabad','Mumbai'], ans: 2 },
      { q: 'The Brihadeeswarar Temple is in which state?', opts: ['Kerala','Andhra Pradesh','Karnataka','Tamil Nadu'], ans: 3 },
      { q: 'Mohenjo-daro is now in which country?', opts: ['India','Pakistan','Bangladesh','Afghanistan'], ans: 1 },
    ]
  },

  'raga-rasa-matcher': {
    gameType: 'matcher',
    title: 'Raga and Rasa Matcher', badge: 'Heritage Quizzes', badgeColor: '#7a4a2e',
    difficulty: 'MEDIUM', image: 'images/game_raga_rasa_matcher.png',
    desc: "Match Ragas with their time, season, and mood. Discover India's classical music heritage!",
    players: '7,600', rating: '4.3 ★', time: '~10 min',
    questions_data: [
      { instruction: 'Match each Raga with its correct time or season:', pairs: [
        { left: 'Raga Bhairav',  right: 'Early Morning' },
        { left: 'Megh Malhar',   right: 'Monsoon Season' },
        { left: 'Raga Yaman',    right: 'Evening' },
        { left: 'Raga Bhairavi', right: 'Late Night' },
      ]},
      { instruction: 'Match each musician with their instrument:', pairs: [
        { left: 'Ravi Shankar',         right: 'Sitar' },
        { left: 'Zakir Hussain',         right: 'Tabla' },
        { left: 'Hariprasad Chaurasia',  right: 'Bansuri (Flute)' },
        { left: 'Bismillah Khan',         right: 'Shehnai' },
      ]},
      { instruction: 'Match each Raga with its emotional Rasa:', pairs: [
        { left: 'Raga Darbari', right: 'Shanta — Peace' },
        { left: 'Raga Kedar',   right: 'Shringara — Love' },
        { left: 'Raga Bhairav', right: 'Bhakti — Devotion' },
        { left: 'Raga Puriya',  right: 'Adbhut — Wonder' },
      ]},
    ]
  },

  'architectural-style-matcher': {
    gameType: 'matcher',
    title: 'Architectural Style Matcher', badge: 'Puzzle Games', badgeColor: '#1e6e6e',
    difficulty: 'MEDIUM', image: 'images/game_architectural_style_matcher.png',
    desc: 'Match monuments to architectural styles — Dravidian, Nagara, Vesara, or Indo-Islamic?',
    players: '11,700', rating: '4.6 ★', time: '~12 min',
    questions_data: [
      { instruction: 'Match each monument to its architectural style:', pairs: [
        { left: 'Brihadeeswarar Temple', right: 'Dravidian Style' },
        { left: 'Khajuraho Temples',     right: 'Nagara Style' },
        { left: 'Taj Mahal',             right: 'Indo-Islamic (Mughal)' },
        { left: 'Hoysala Temples',       right: 'Vesara (Hoysala) Style' },
      ]},
      { instruction: 'Match each monument to its location:', pairs: [
        { left: 'Meenakshi Temple',  right: 'Madurai, Tamil Nadu' },
        { left: 'Sun Temple',        right: 'Konark, Odisha' },
        { left: 'Elephanta Caves',   right: 'Mumbai, Maharashtra' },
        { left: 'Dilwara Temples',   right: 'Mount Abu, Rajasthan' },
      ]},
      { instruction: 'Match each monument to its builder:', pairs: [
        { left: 'Taj Mahal',             right: 'Shah Jahan' },
        { left: 'Qutub Minar',           right: 'Qutb ud-Din Aibak' },
        { left: 'Brihadeeswarar Temple', right: 'Raja Raja Chola I' },
        { left: 'Sanchi Stupa',          right: 'Emperor Ashoka' },
      ]},
    ]
  },

  'festival-dance-quiz': {
    gameType: 'quiz',
    title: 'Festival and Dance Quiz', badge: 'Heritage Quizzes', badgeColor: '#7a4a2e',
    difficulty: 'EASY', image: 'images/game_festival_dance_quiz.png',
    desc: "Match India's vibrant folk dances and festivals with their originating states!",
    players: '8,450', rating: '4.4 ★', time: '~8 min',
    questions_data: [
      { q: 'Garba is the traditional dance of which state?', opts: ['Rajasthan','Maharashtra','Gujarat','Punjab'], ans: 2 },
      { q: 'Bihu is celebrated in which state?', opts: ['Assam','Manipur','Meghalaya','Tripura'], ans: 0 },
      { q: 'Pongal is the harvest festival of:', opts: ['Kerala','Karnataka','Tamil Nadu','Andhra Pradesh'], ans: 2 },
      { q: 'Kathakali is a classical dance from:', opts: ['Tamil Nadu','Andhra Pradesh','Karnataka','Kerala'], ans: 3 },
      { q: 'The Pushkar Camel Fair is in which state?', opts: ['Gujarat','Rajasthan','Haryana','Madhya Pradesh'], ans: 1 },
    ]
  },

  'dynasty-era-connector': {
    gameType: 'matcher',
    title: 'Dynasty Era Connector', badge: 'History Trivia', badgeColor: '#5a3d82',
    difficulty: 'HARD', image: 'images/game_dynasty_era_connector.png',
    desc: 'Match emperors, dynasties, and eras of ancient and medieval India. For true history buffs!',
    players: '13,480', rating: '4.7 ★', time: '~18 min',
    questions_data: [
      { instruction: 'Match each emperor to their dynasty:', pairs: [
        { left: 'Emperor Ashoka',       right: 'Maurya Dynasty' },
        { left: 'Emperor Akbar',        right: 'Mughal Dynasty' },
        { left: 'Krishnadevaraya',      right: 'Vijayanagara Empire' },
        { left: 'Rajendra Chola',       right: 'Chola Dynasty' },
      ]},
      { instruction: 'Match each dynasty to its period:', pairs: [
        { left: 'Maurya Empire', right: '322 to 185 BCE' },
        { left: 'Gupta Empire',  right: '320 to 550 CE' },
        { left: 'Mughal Empire', right: '1526 to 1857 CE' },
        { left: 'Chola Empire',  right: '300 BCE to 1279 CE' },
      ]},
      { instruction: 'Match each emperor to their achievement:', pairs: [
        { left: 'Shah Jahan',          right: 'Built the Taj Mahal' },
        { left: 'Ashoka',              right: 'Spread Buddhism globally' },
        { left: 'Akbar',               right: 'Founded Din-i-Ilahi' },
        { left: 'Chandragupta Maurya', right: 'Founded Maurya Empire' },
      ]},
    ]
  },

  'temple-escape-room': {
    gameType: 'escape',
    title: 'Temple Escape Room', badge: 'Puzzle Games', badgeColor: '#1e6e6e',
    difficulty: 'MEDIUM', image: 'images/game_temple_escape_room.png',
    desc: "You are trapped inside an ancient Indian temple. Decipher clues and escape using heritage knowledge!",
    players: '18,900', rating: '4.8 ★', time: '~25 min',
    questions_data: [
      {
        narrative: "You wake in a dim stone chamber. Torches flicker. Above the entrance glows an inscription — the word AUM carved in an ancient script older than Devanagari.",
        clue: "Clue: This script was used in Emperor Ashoka's edicts across his empire around 250 BCE.",
        q: "What ancient script is the AUM inscription written in?",
        opts: ['Brahmi Script','Kharosthi Script','Grantha Script','Tamil-Brahmi Script'],
        ans: 0,
        reveal: "Brahmi — the ancestor of nearly all Indian scripts, used in Ashoka's famous rock edicts. The door grinds open...",
      },
      {
        narrative: "A towering stone pillar dominates the next chamber — topped by four majestic back-to-back lions. A skylight bathes them in golden light.",
        clue: "Clue: This symbol appears on every Indian banknote and official government document today.",
        q: "What is this four-lion capital, and who commissioned it?",
        opts: ['Ashoka Chakra — Gupta Dynasty','Lion Capital — Maurya Dynasty (Ashoka)','Triratna — Kushan Empire','Royal Emblem — Mughal Dynasty'],
        ans: 1,
        reveal: "The Lion Capital of Ashoka from Sarnath! Built around 250 BCE to mark where Buddha gave his first sermon. Now India's national emblem. Another passage opens...",
      },
      {
        narrative: "A garden courtyard. At its heart, a breathtaking stepped water structure descends symmetrically — dozens of stone steps reflecting torch-light in perfect stillness.",
        clue: "Clue: This architectural marvel was used for ritual bathing and water storage, found from Indus Valley sites to medieval Rajasthan.",
        q: "What is this stepped water structure called?",
        opts: ['Hammam Bathhouse','Vav or Stepwell Baoli','Kund Sacred Tank','Hauz Royal Reservoir'],
        ans: 1,
        reveal: "A Vav or Stepwell (Baoli)! The most ornate is Rani Ki Vav in Patan, Gujarat — a UNESCO World Heritage Site. The path ahead clears...",
      },
      {
        narrative: "A brass riddle-plate reads: I am India's Golden Age. Arts, science, and mathematics flourished. Zero was gifted to the world during my reign. Aryabhata and Kalidasa lived under my kings.",
        clue: "Clue: This empire ruled from approximately 320 CE to 550 CE.",
        q: "Which empire is called the Golden Age of India?",
        opts: ['Maurya Empire','Mughal Empire','Gupta Empire','Chola Empire'],
        ans: 2,
        reveal: "The Gupta Empire (320-550 CE)! India gave the world zero, the decimal system, chess, and Kalidasa's masterworks during this era. The final chamber awaits...",
      },
      {
        narrative: "The final chamber! A massive golden wheel with 24 spokes guards the exit. Its inscription reads: I am the symbol of eternal righteous law. I spin on India's most sacred banner.",
        clue: "Clue: This symbol appears prominently on the Indian national flag.",
        q: "What does the 24-spoked wheel represent?",
        opts: ['The Solar Calendar','The Ashoka Chakra Wheel of Dharma','A Buddhist Mandala','The Kalachakra Wheel of Time'],
        ans: 1,
        reveal: "The Ashoka Chakra — Dharmachakra! It represents eternal righteous law and appears on India's national flag. YOU HAVE ESCAPED THE ANCIENT TEMPLE!",
      },
    ]
  },
};

/* ══════════════════════════════════════════════════
   STATE
══════════════════════════════════════════════════ */
let currentGame   = null;
let currentQ      = 0;
let score         = 0;
let answered      = false;
let timerInterval = null;
let timeLeft      = 15;
let blitzStreak   = 0;
let blitzMulti    = 1;
let memCards      = [];
let memFlipped    = [];
let memMatchCount = 0;
let memAttempts   = 0;
let memLocked     = false;
let unscTarget    = '';
let unscLetters   = [];
let unscAnswer    = [];
let wdTarget      = '';
let wdGuesses     = [];
let wdCurrent     = '';
let wdOver        = false;
let wdKeyColors   = {};
let tlClicked     = [];
let tlDisplayOrder= [];
let matchLeftPick = null;
let matchMatched  = new Set();
let matchLeftOrd  = [];
let matchRightOrd = [];

function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function resetState() {
  currentQ = 0; score = 0; answered = false;
  blitzStreak = 0; blitzMulti = 1;
  memCards = []; memFlipped = []; memMatchCount = 0; memAttempts = 0; memLocked = false;
  unscTarget = ''; unscLetters = []; unscAnswer = [];
  wdGuesses = []; wdCurrent = ''; wdOver = false; wdKeyColors = {};
  tlClicked = []; tlDisplayOrder = [];
  matchLeftPick = null; matchMatched = new Set(); matchLeftOrd = []; matchRightOrd = [];
}

/* ══════════════════════════════════════════════════
   OPEN / INTRO
══════════════════════════════════════════════════ */
window.openGame = function (gameId) {
  const game = GAMES_DATA[gameId];
  if (!game) return;
  currentGame = game;
  resetState();
  const overlay = document.getElementById('game-modal-overlay');
  const inner   = document.getElementById('modal-inner');
  inner.innerHTML = buildIntro(game);
  overlay.classList.add('open');
  document.body.style.overflow = 'hidden';
};

function buildIntro(game) {
  const typeLabels = {
    quiz:'Multiple Choice Quiz', blitz:'Speed Blitz Quiz', unscramble:'Word Unscramble',
    wordle:'Wordle Grid', memory:'Memory Match', timeline:'Timeline Ordering',
    matcher:'Pair Matching', escape:'Escape Room'
  };
  return `
    <img class="modal-hero-img" src="${game.image}" alt="${game.title}" />
    <div class="modal-body">
      <span class="modal-badge" style="background:${game.badgeColor}">${game.badge}</span>
      <h2 class="modal-title">${game.title}</h2>
      <p class="modal-desc">${game.desc}</p>
      <div style="display:inline-flex;align-items:center;gap:6px;background:var(--clr-bg-alt);border:1.5px solid var(--clr-border);border-radius:100px;padding:6px 14px;margin-bottom:16px;font-family:var(--ff-ui);font-size:0.75rem;color:var(--clr-text-muted);">
        🎮 ${typeLabels[game.gameType] || 'Game'} &nbsp;·&nbsp; ${game.difficulty}
      </div>
      <div class="modal-stats">
        <div class="mstat"><span class="mstat-val">${game.players}</span><span class="mstat-label">Players</span></div>
        <div class="mstat"><span class="mstat-val">${game.rating}</span><span class="mstat-label">Rating</span></div>
        <div class="mstat"><span class="mstat-val">${game.time}</span><span class="mstat-label">Duration</span></div>
      </div>
      <div class="modal-actions">
        <button class="modal-play-btn" onclick="startGame()">
          <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24"><polygon points="5 3 19 12 5 21 5 3"/></svg>
          Start Playing
        </button>
        <button class="modal-share-btn" onclick="shareGame()">📤 Share</button>
      </div>
    </div>`;
}

window.startGame = window.startQuiz = function () {
  resetState();
  if (currentGame && currentGame.wordle_word) wdTarget = currentGame.wordle_word;
  renderQuestion();
};

function renderQuestion() {
  if (!currentGame) return;
  const t = currentGame.gameType;
  if      (t === 'quiz')       renderQuizQ();
  else if (t === 'blitz')      renderBlitzQ();
  else if (t === 'unscramble') renderUnscrambleQ();
  else if (t === 'wordle')     renderWordleGame();
  else if (t === 'memory')     renderMemoryGame();
  else if (t === 'timeline')   renderTimelineQ();
  else if (t === 'matcher')    renderMatcherQ();
  else if (t === 'escape')     renderEscapeQ();
  else                         renderQuizQ();
}

/* ── 1 QUIZ ──────────────────────────────────────── */
function renderQuizQ() {
  const qData = currentGame.questions_data;
  if (currentQ >= qData.length) { showQuizResult(); return; }
  const q = qData[currentQ];
  answered = false; timeLeft = 15;
  document.getElementById('modal-inner').innerHTML = `
    <div style="padding:20px 24px 0;display:flex;align-items:center;gap:12px;">
      <div style="flex:1;background:var(--clr-border);border-radius:100px;height:6px;overflow:hidden;">
        <div style="height:100%;background:var(--clr-primary);border-radius:100px;width:${(currentQ/qData.length)*100}%;transition:width 0.4s;"></div>
      </div>
      <span style="font-family:var(--ff-ui);font-size:0.78rem;color:var(--clr-text-muted);white-space:nowrap;">${currentQ+1}/${qData.length}</span>
      <div id="quiz-timer" style="width:38px;height:38px;border-radius:50%;border:3px solid var(--clr-primary);display:flex;align-items:center;justify-content:center;font-family:var(--ff-ui);font-size:0.85rem;font-weight:700;color:var(--clr-primary);flex-shrink:0;">${timeLeft}</div>
    </div>
    <div class="modal-body" style="padding-top:16px;">
      <div style="font-family:var(--ff-ui);font-size:0.72rem;font-weight:700;letter-spacing:1px;text-transform:uppercase;color:var(--clr-primary);margin-bottom:8px;">Score: ${score} pts</div>
      <h3 class="modal-title" style="font-size:1.1rem;margin-bottom:20px;">${q.q}</h3>
      <div style="display:flex;flex-direction:column;gap:10px;">
        ${q.opts.map((opt, i) => `
          <button class="quiz-opt" id="qopt-${i}" onclick="answerQuiz(${i})"
            style="text-align:left;padding:14px 18px;background:var(--clr-bg-alt);border:2px solid var(--clr-border);border-radius:var(--radius-sm);font-family:var(--ff-body);font-size:0.9rem;color:var(--clr-text);cursor:pointer;transition:all 0.2s;display:flex;align-items:center;gap:10px;"
            onmouseover="if(!this.dataset.a)this.style.cssText+=';border-color:var(--clr-primary);background:rgba(181,69,27,0.05)'"
            onmouseout="if(!this.dataset.a)this.style.cssText+=';border-color:var(--clr-border);background:var(--clr-bg-alt)'">
            <span style="width:26px;height:26px;border-radius:50%;border:2px solid var(--clr-border);display:flex;align-items:center;justify-content:center;font-size:0.72rem;font-weight:700;flex-shrink:0;color:var(--clr-text-muted);">${String.fromCharCode(65+i)}</span>${opt}
          </button>`).join('')}
      </div>
    </div>`;
  clearInterval(timerInterval);
  timerInterval = setInterval(() => {
    timeLeft--;
    const el = document.getElementById('quiz-timer');
    if (el) { el.textContent = timeLeft; if (timeLeft<=5){el.style.borderColor='#e53e1e';el.style.color='#e53e1e';} }
    if (timeLeft<=0) { clearInterval(timerInterval); if (!answered) answerQuiz(-1); }
  }, 1000);
}

window.answerQuiz = window.answerQuestion = function (idx) {
  if (answered) return;
  answered = true; clearInterval(timerInterval);
  const q = currentGame.questions_data[currentQ];
  document.querySelectorAll('.quiz-opt').forEach((btn, i) => {
    btn.dataset.a = '1'; btn.style.cursor = 'default';
    if (i===q.ans)                   { btn.style.background='rgba(46,139,87,0.12)'; btn.style.borderColor='#2e8b57'; btn.style.color='#1a5c2e'; }
    else if (i===idx&&idx!==q.ans)   { btn.style.background='rgba(229,62,30,0.1)';  btn.style.borderColor='#e53e1e'; btn.style.color='#e53e1e'; }
  });
  if (idx === q.ans) score += (timeLeft > 0 ? 10 + timeLeft : 5);
  setTimeout(() => { currentQ++; renderQuestion(); }, 1400);
};

function showQuizResult() {
  const total = currentGame.questions_data.length;
  const pct   = Math.round((score / (total * 25)) * 100);
  const grade = pct>=80?'Heritage Master!':pct>=60?'Heritage Scholar':pct>=40?'Heritage Learner':'Heritage Beginner';
  document.getElementById('modal-inner').innerHTML = `
    <div style="padding:40px 32px;text-align:center;">
      <div style="font-size:4rem;margin-bottom:12px;">🎊</div>
      <h2 style="font-family:var(--ff-head);font-size:1.5rem;color:var(--clr-dark);margin-bottom:6px;">Quiz Complete!</h2>
      <p style="font-family:var(--ff-ui);font-size:1rem;color:var(--clr-primary);font-weight:700;margin-bottom:24px;">${grade}</p>
      <div style="display:flex;gap:16px;justify-content:center;margin-bottom:24px;flex-wrap:wrap;">
        ${statBox(score,'Score','var(--clr-primary)')}${statBox(pct+'%','Accuracy','#2e8b57')}${statBox(total,'Questions','var(--clr-accent)')}
      </div>
      <div style="display:flex;gap:12px;justify-content:center;flex-wrap:wrap;">
        <button onclick="startGame()" style="${btnStyle('var(--clr-primary)')}">Play Again</button>
        <button onclick="closeGameModal()" style="${btnStyleOutline()}">More Games</button>
      </div>
    </div>`;
}

/* ── 2 BLITZ ─────────────────────────────────────── */
function renderBlitzQ() {
  const qData = currentGame.questions_data;
  if (currentQ >= qData.length) { showBlitzResult(); return; }
  const q = qData[currentQ];
  answered = false; timeLeft = 8;
  const streakTxt = blitzStreak > 0
    ? `<span style="color:#f59e0b;font-weight:800;">🔥 ${blitzStreak} Streak</span>${blitzMulti>1?'<span style="background:#e53e1e;color:#fff;padding:1px 7px;border-radius:100px;font-size:0.7rem;font-weight:800;margin-left:6px;">'+blitzMulti+'x</span>':''}`
    : '';
  document.getElementById('modal-inner').innerHTML = `
    <div style="background:linear-gradient(135deg,#1a0a2e,#2d1857);padding:14px 20px 10px;display:flex;align-items:center;gap:12px;">
      <div style="flex:1;">
        <div style="background:rgba(255,255,255,0.12);border-radius:100px;height:5px;overflow:hidden;margin-bottom:4px;">
          <div style="height:100%;background:#f59e0b;border-radius:100px;width:${(currentQ/qData.length)*100}%;transition:width 0.4s;"></div>
        </div>
        <div style="font-family:var(--ff-ui);font-size:0.72rem;">${streakTxt}</div>
      </div>
      <div style="text-align:center;color:#f59e0b;font-family:var(--ff-head);font-size:1.1rem;font-weight:800;">${score}<br><span style="font-size:0.6rem;opacity:0.6;">PTS</span></div>
      <div id="blitz-timer" style="width:44px;height:44px;border-radius:50%;border:3px solid #f59e0b;display:flex;align-items:center;justify-content:center;font-family:var(--ff-ui);font-size:1rem;font-weight:800;color:#f59e0b;flex-shrink:0;">${timeLeft}</div>
    </div>
    <div style="background:linear-gradient(135deg,#1a0a2e,#2d1857);padding:8px 20px 20px;">
      <div style="font-family:var(--ff-ui);font-size:0.68rem;color:rgba(255,255,255,0.4);text-transform:uppercase;letter-spacing:1px;margin-bottom:8px;">${currentQ+1} of ${qData.length}</div>
      <h3 style="font-family:var(--ff-body);font-size:1rem;color:#fff;margin-bottom:14px;font-weight:600;">${q.q}</h3>
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;">
        ${q.opts.map((opt,i) => `
          <button id="bopt-${i}" onclick="answerBlitz(${i})"
            style="padding:12px;background:rgba(255,255,255,0.08);border:2px solid rgba(255,255,255,0.18);border-radius:10px;font-family:var(--ff-body);font-size:0.85rem;color:#fff;cursor:pointer;transition:all 0.2s;text-align:left;"
            onmouseover="if(!this.dataset.a)this.style.background='rgba(245,158,11,0.2)'"
            onmouseout="if(!this.dataset.a)this.style.background='rgba(255,255,255,0.08)'">
            <span style="opacity:0.45;margin-right:6px;">${String.fromCharCode(65+i)}</span>${opt}
          </button>`).join('')}
      </div>
    </div>`;
  clearInterval(timerInterval);
  timerInterval = setInterval(() => {
    timeLeft--;
    const el = document.getElementById('blitz-timer');
    if (el) { el.textContent = timeLeft; if (timeLeft<=3){el.style.borderColor='#e53e1e';el.style.color='#e53e1e';el.style.animation='pulseBorder 0.6s ease infinite';} }
    if (timeLeft<=0) { clearInterval(timerInterval); if (!answered) answerBlitz(-1); }
  }, 1000);
}

window.answerBlitz = function (idx) {
  if (answered) return;
  answered = true; clearInterval(timerInterval);
  const q = currentGame.questions_data[currentQ];
  const correct = idx === q.ans;
  if (correct) { blitzStreak++; blitzMulti = Math.min(4,1+Math.floor(blitzStreak/3)); score += (10+timeLeft)*blitzMulti; }
  else { blitzStreak = 0; blitzMulti = 1; }
  document.querySelectorAll('[id^="bopt-"]').forEach((btn,i) => {
    btn.dataset.a='1'; btn.style.cursor='default';
    if (i===q.ans)             { btn.style.background='rgba(46,139,87,0.45)'; btn.style.borderColor='#2e8b57'; }
    else if (i===idx&&!correct){ btn.style.background='rgba(229,62,30,0.35)'; btn.style.borderColor='#e53e1e'; }
  });
  setTimeout(() => { currentQ++; renderQuestion(); }, 900);
};

function showBlitzResult() {
  document.getElementById('modal-inner').innerHTML = `
    <div style="background:linear-gradient(135deg,#1a0a2e,#2d1857);padding:48px 32px;text-align:center;">
      <div style="font-size:3.5rem;margin-bottom:12px;">⚡</div>
      <h2 style="font-family:var(--ff-head);font-size:1.6rem;color:#f59e0b;margin-bottom:6px;">Blitz Complete!</h2>
      <div style="font-family:var(--ff-head);font-size:3.5rem;font-weight:800;color:#fff;margin:20px 0;">${score}</div>
      <div style="font-family:var(--ff-ui);font-size:0.72rem;color:rgba(255,255,255,0.4);text-transform:uppercase;letter-spacing:2px;margin-bottom:28px;">TOTAL SCORE</div>
      <div style="display:flex;gap:12px;justify-content:center;flex-wrap:wrap;">
        <button onclick="startGame()" style="background:#f59e0b;color:#1a0a2e;font-family:var(--ff-ui);font-size:0.9rem;font-weight:800;padding:14px 28px;border-radius:var(--radius-sm);cursor:pointer;border:none;">Play Again</button>
        <button onclick="closeGameModal()" style="background:rgba(255,255,255,0.1);color:#fff;font-family:var(--ff-ui);font-size:0.9rem;font-weight:600;padding:14px 24px;border-radius:var(--radius-sm);border:2px solid rgba(255,255,255,0.2);cursor:pointer;">More Games</button>
      </div>
    </div>`;
}

/* ── 3 UNSCRAMBLE ────────────────────────────────── */
function renderUnscrambleQ() {
  const qData = currentGame.questions_data;
  if (currentQ >= qData.length) { showQuizResult(); return; }
  const wordObj = qData[currentQ];
  unscTarget = wordObj.word;
  let letters = unscTarget.split(''), scrambled;
  do { letters = shuffle(letters); scrambled = letters.join(''); } while (scrambled === unscTarget && unscTarget.length > 1);
  unscLetters = scrambled.split('').map((c,i) => ({char:c, idx:i, used:false}));
  unscAnswer  = [];
  const col = '#4a5e8c';
  document.getElementById('modal-inner').innerHTML = `
    <div style="padding:20px 24px 0;display:flex;align-items:center;gap:12px;">
      <div style="flex:1;background:var(--clr-border);border-radius:100px;height:6px;overflow:hidden;">
        <div style="height:100%;background:${col};border-radius:100px;width:${(currentQ/qData.length)*100}%;transition:width 0.4s;"></div>
      </div>
      <span style="font-family:var(--ff-ui);font-size:0.78rem;color:var(--clr-text-muted);">${currentQ+1}/${qData.length}</span>
    </div>
    <div class="modal-body" style="padding-top:16px;">
      <div style="font-family:var(--ff-ui);font-size:0.7rem;font-weight:800;letter-spacing:1.5px;text-transform:uppercase;color:${col};margin-bottom:10px;">UNSCRAMBLE THE WORD</div>
      <div style="background:var(--clr-bg-alt);border-left:4px solid ${col};border-radius:0 8px 8px 0;padding:12px 16px;font-family:var(--ff-body);font-size:0.88rem;color:var(--clr-text-muted);margin-bottom:20px;">Hint: ${wordObj.hint}</div>
      <div id="unsc-slots" style="display:flex;gap:8px;justify-content:center;flex-wrap:wrap;margin-bottom:20px;">
        ${Array.from({length:unscTarget.length},(_,i) => `
          <div id="unsc-slot-${i}" onclick="removeUnscLetter(${i})"
            style="width:46px;height:54px;border:2.5px dashed var(--clr-border);border-radius:10px;display:flex;align-items:center;justify-content:center;font-family:var(--ff-ui);font-size:1.3rem;font-weight:800;cursor:pointer;transition:all 0.2s;color:${col};">
          </div>`).join('')}
      </div>
      <div id="unsc-tiles" style="display:flex;gap:8px;justify-content:center;flex-wrap:wrap;margin-bottom:20px;">
        ${unscLetters.map((l,i) => `
          <button id="unsc-tile-${i}" onclick="addUnscLetter(${i})"
            style="width:46px;height:54px;background:#fff;border:2.5px solid ${col};border-radius:10px;font-family:var(--ff-ui);font-size:1.3rem;font-weight:800;color:${col};cursor:pointer;transition:all 0.2s;box-shadow:0 3px 8px rgba(74,94,140,0.2);"
            onmouseover="this.style.background='rgba(74,94,140,0.08)'"
            onmouseout="this.style.background='#fff'">${l.char}</button>`).join('')}
      </div>
      <div style="display:flex;gap:10px;justify-content:center;">
        <button onclick="clearUnscramble()" style="padding:10px 20px;background:var(--clr-bg-alt);border:2px solid var(--clr-border);border-radius:var(--radius-sm);font-family:var(--ff-ui);font-size:0.8rem;color:var(--clr-text-muted);cursor:pointer;">Clear</button>
        <button onclick="checkUnscramble()" style="padding:10px 22px;background:${col};border:none;border-radius:var(--radius-sm);font-family:var(--ff-ui);font-size:0.8rem;font-weight:700;color:#fff;cursor:pointer;">Check Answer</button>
      </div>
    </div>`;
}

window.addUnscLetter = function (tileIdx) {
  const l = unscLetters[tileIdx];
  if (l.used || unscAnswer.length >= unscTarget.length) return;
  l.used = true; unscAnswer.push({ char: l.char, tileIdx });
  const tile = document.getElementById('unsc-tile-'+tileIdx);
  if (tile) { tile.style.opacity='0.3'; tile.style.pointerEvents='none'; }
  refreshSlots();
  if (unscAnswer.length === unscTarget.length) setTimeout(checkUnscramble, 350);
};
window.removeUnscLetter = function (slotIdx) {
  if (slotIdx >= unscAnswer.length) return;
  const removed = unscAnswer[slotIdx]; unscAnswer.splice(slotIdx, 1);
  unscLetters[removed.tileIdx].used = false;
  const tile = document.getElementById('unsc-tile-'+removed.tileIdx);
  if (tile) { tile.style.opacity='1'; tile.style.pointerEvents=''; }
  refreshSlots();
};
function refreshSlots() {
  for (let i = 0; i < unscTarget.length; i++) {
    const slot = document.getElementById('unsc-slot-'+i); if (!slot) continue;
    if (i < unscAnswer.length) { slot.textContent=unscAnswer[i].char; slot.style.borderStyle='solid'; slot.style.borderColor='#4a5e8c'; slot.style.background='rgba(74,94,140,0.07)'; }
    else { slot.textContent=''; slot.style.borderStyle='dashed'; slot.style.borderColor='var(--clr-border)'; slot.style.background=''; }
  }
}
window.clearUnscramble = function () {
  unscAnswer = [];
  unscLetters.forEach((l,i) => { l.used=false; const t=document.getElementById('unsc-tile-'+i); if(t){t.style.opacity='1';t.style.pointerEvents='';} });
  refreshSlots();
};
window.checkUnscramble = function () {
  const guess = unscAnswer.map(a => a.char).join('');
  if (guess.length < unscTarget.length) { showToast('Fill all letter slots first!'); return; }
  if (guess === unscTarget) {
    score += 20;
    for (let i=0;i<unscTarget.length;i++){ const s=document.getElementById('unsc-slot-'+i); if(s){s.style.borderColor='#2e8b57';s.style.background='rgba(46,139,87,0.12)';s.style.color='#1a5c2e';} }
    showToast('Correct! +20 pts');
    setTimeout(() => { currentQ++; renderQuestion(); }, 1300);
  } else {
    for (let i=0;i<unscTarget.length;i++){ const s=document.getElementById('unsc-slot-'+i); if(s){s.style.borderColor='#e53e1e';s.style.background='rgba(229,62,30,0.08)';s.style.color='#e53e1e';s.classList.add('tl-shake');} }
    showToast('Not quite — try again!');
    setTimeout(() => { clearUnscramble(); for(let i=0;i<unscTarget.length;i++){const s=document.getElementById('unsc-slot-'+i);if(s)s.classList.remove('tl-shake');} }, 800);
  }
};

/* ── 4 WORDLE ─────────────────────────────────────── */
function renderWordleGame() {
  wdTarget = currentGame.wordle_word || 'STUPA';
  wdGuesses = []; wdCurrent = ''; wdOver = false; wdKeyColors = {};
  document.getElementById('modal-inner').innerHTML = wordleHTML();
  document._wdKeyHandler = (e) => {
    if (wdOver) return;
    if (e.key==='Enter') wdSubmit();
    else if (e.key==='Backspace') wdDelete();
    else if (/^[a-zA-Z]$/.test(e.key)) wdAdd(e.key.toUpperCase());
  };
  document.addEventListener('keydown', document._wdKeyHandler);
}
function wordleHTML() {
  const rows = [['Q','W','E','R','T','Y','U','I','O','P'],['A','S','D','F','G','H','J','K','L'],['ENTER','Z','X','C','V','B','N','M','DEL']];
  return `
    <div style="padding:14px 20px 0;text-align:center;">
      <div style="font-family:var(--ff-ui);font-size:0.7rem;font-weight:800;text-transform:uppercase;letter-spacing:1.5px;color:#4a5e8c;">Heritage Wordle</div>
      <div style="font-family:var(--ff-body);font-size:0.82rem;color:var(--clr-text-muted);margin-top:4px;margin-bottom:10px;">${currentGame.wordle_hint}</div>
      <div style="display:flex;gap:8px;font-family:var(--ff-ui);font-size:0.7rem;justify-content:center;margin-bottom:12px;">
        <span style="background:#2e8b57;color:#fff;padding:3px 10px;border-radius:4px;">Green = Correct spot</span>
        <span style="background:#d97706;color:#fff;padding:3px 10px;border-radius:4px;">Yellow = Wrong spot</span>
        <span style="background:#6b7280;color:#fff;padding:3px 10px;border-radius:4px;">Grey = Not in word</span>
      </div>
    </div>
    <div id="wordle-grid" style="display:flex;flex-direction:column;gap:5px;align-items:center;padding:0 20px 10px;">
      ${Array.from({length:6},(_,r) => `<div style="display:flex;gap:5px;">${Array.from({length:5},(_,c) => `<div id="wc-${r}-${c}" style="width:50px;height:50px;border:2.5px solid var(--clr-border);border-radius:8px;display:flex;align-items:center;justify-content:center;font-family:var(--ff-ui);font-size:1.25rem;font-weight:800;color:var(--clr-text);transition:all 0.15s;"></div>`).join('')}</div>`).join('')}
    </div>
    <div style="padding:0 10px 16px;">
      ${rows.map(row => `<div style="display:flex;gap:4px;justify-content:center;margin-bottom:5px;">${row.map(k => `<button id="wk-${k}" onclick="wdPress('${k}')" style="height:40px;min-width:${k.length>1?'52px':'34px'};padding:0 6px;background:var(--clr-bg-alt);border:1.5px solid var(--clr-border);border-radius:6px;font-family:var(--ff-ui);font-size:${k.length>1?'0.62rem':'0.82rem'};font-weight:700;color:var(--clr-text);cursor:pointer;transition:all 0.15s;" onmouseover="if(!this.dataset.s)this.style.background='rgba(74,94,140,0.12)'" onmouseout="if(!this.dataset.s)this.style.background='var(--clr-bg-alt)'">${k}</button>`).join('')}</div>`).join('')}
    </div>`;
}
window.wdPress = function (k) { if (wdOver) return; if (k==='ENTER') wdSubmit(); else if (k==='DEL') wdDelete(); else wdAdd(k); };
function wdAdd(l) { if (wdCurrent.length<5&&!wdOver) { wdCurrent+=l; wdUpdateCurrent(); } }
function wdDelete() { if (wdCurrent.length>0) { wdCurrent=wdCurrent.slice(0,-1); wdUpdateCurrent(); } }
function wdUpdateCurrent() {
  const row = wdGuesses.length;
  for (let c=0;c<5;c++){ const cell=document.getElementById('wc-'+row+'-'+c); if(cell){cell.textContent=wdCurrent[c]||'';cell.style.borderColor=wdCurrent[c]?'#4a5e8c':'var(--clr-border)';cell.style.transform=wdCurrent[c]?'scale(1.06)':'scale(1)';} }
}
function wdSubmit() {
  if (wdCurrent.length!==5) { showToast('Type 5 letters first!'); return; }
  const guess=wdCurrent, result=wdEval(guess,wdTarget), row=wdGuesses.length;
  wdGuesses.push(guess); wdCurrent='';
  result.forEach((status,c) => {
    setTimeout(() => {
      const cell=document.getElementById('wc-'+row+'-'+c); if(!cell)return;
      const C={correct:{bg:'#2e8b57',c:'#fff',b:'#2e8b57'},present:{bg:'#d97706',c:'#fff',b:'#d97706'},absent:{bg:'#6b7280',c:'#fff',b:'#6b7280'}}[status];
      cell.style.background=C.bg; cell.style.color=C.c; cell.style.borderColor=C.b;
      cell.style.transform='rotateX(180deg)'; setTimeout(()=>cell.style.transform='rotateX(0)',200);
      wdColorKey(guess[c],status);
    },c*120);
  });
  const won=guess===wdTarget, lost=wdGuesses.length>=6&&!won;
  if (won||lost) { wdOver=true; document.removeEventListener('keydown',document._wdKeyHandler); setTimeout(()=>showWordleResult(won),result.length*120+650); }
}
function wdEval(guess,target) {
  const res=Array(5).fill('absent'),t=target.split(''),g=guess.split('');
  for(let i=0;i<5;i++) if(g[i]===t[i]){res[i]='correct';t[i]=null;g[i]=null;}
  for(let i=0;i<5;i++) if(g[i]!==null){const j=t.indexOf(g[i]);if(j!==-1){res[i]='present';t[j]=null;}}
  return res;
}
function wdColorKey(l,status) {
  const p={correct:3,present:2,absent:1},cur=wdKeyColors[l];
  if (!cur||p[status]>p[cur]) {
    wdKeyColors[l]=status;
    const btn=document.getElementById('wk-'+l);
    if(btn){const C={correct:'#2e8b57',present:'#d97706',absent:'#6b7280'}[status];btn.style.background=C;btn.style.color='#fff';btn.style.borderColor=C;btn.dataset.s=status;}
  }
}
function showWordleResult(won) {
  document.getElementById('modal-inner').innerHTML = `
    <div style="padding:32px;text-align:center;">
      <div style="font-size:3.5rem;margin-bottom:12px;">${won?'🎉':'😔'}</div>
      <h2 style="font-family:var(--ff-head);font-size:1.4rem;color:var(--clr-dark);margin-bottom:6px;">${won?'Brilliant!':'So close!'}</h2>
      <div style="font-family:var(--ff-ui);font-size:1.4rem;font-weight:800;color:#4a5e8c;letter-spacing:4px;margin:14px 0;">${wdTarget}</div>
      <p style="font-family:var(--ff-body);font-size:0.82rem;color:var(--clr-text-muted);margin-bottom:6px;">${won?'Solved in '+wdGuesses.length+' '+(wdGuesses.length===1?'guess':'guesses')+'!':''}</p>
      ${currentGame.wordle_fact?`<div style="text-align:left;padding:12px 16px;background:var(--clr-bg-alt);border-radius:var(--radius-sm);border-left:3px solid #4a5e8c;font-family:var(--ff-body);font-size:0.82rem;color:var(--clr-text-muted);margin-bottom:20px;line-height:1.5;">${currentGame.wordle_fact}</div>`:''}
      <div style="display:flex;gap:12px;justify-content:center;flex-wrap:wrap;">
        <button onclick="startGame()" style="${btnStyle('#4a5e8c')}">Play Again</button>
        <button onclick="closeGameModal()" style="${btnStyleOutline()}">More Games</button>
      </div>
    </div>`;
}

/* ── 5 MEMORY ─────────────────────────────────────── */
function renderMemoryGame() {
  const pairs = currentGame.memory_pairs;
  const cards = [];
  pairs.forEach((pair,pairId) => { cards.push({id:cards.length,text:pair[0],pairId}); cards.push({id:cards.length,text:pair[1],pairId}); });
  memCards = shuffle(cards); memFlipped=[]; memMatchCount=0; memAttempts=0; memLocked=false;
  document.getElementById('modal-inner').innerHTML = `
    <div style="padding:14px 20px 0;display:flex;justify-content:space-between;align-items:center;">
      <div style="font-family:var(--ff-ui);font-size:0.78rem;font-weight:700;text-transform:uppercase;letter-spacing:1px;color:#1e6e6e;">Memory Match</div>
      <div style="font-family:var(--ff-ui);font-size:0.78rem;color:var(--clr-text-muted);">Pairs: <span id="mem-matched" style="color:#2e8b57;font-weight:700;">0</span>/${pairs.length} · Tries: <span id="mem-attempts">0</span></div>
    </div>
    <div style="padding:10px 14px 16px;">
      <div id="mem-grid" style="display:grid;grid-template-columns:repeat(4,1fr);gap:7px;">
        ${memCards.map((_,i) => `<div id="mc-${i}" onclick="flipMemCard(${i})" style="height:68px;border-radius:10px;background:linear-gradient(135deg,#1e6e6e,#2ea8a8);display:flex;align-items:center;justify-content:center;cursor:pointer;transition:all 0.3s;font-size:1.5rem;user-select:none;border:2px solid transparent;" onmouseover="if(!this.dataset.r&&!this.dataset.m)this.style.transform='scale(1.05)'" onmouseout="this.style.transform='scale(1)'">🏛</div>`).join('')}
      </div>
      <div style="text-align:center;margin-top:10px;font-family:var(--ff-body);font-size:0.78rem;color:var(--clr-text-muted);">Flip cards to find matching monument-location pairs!</div>
    </div>`;
}

window.flipMemCard = function (idx) {
  if (memLocked||memFlipped.includes(idx)||memCards[idx].matched) return;
  const el=document.getElementById('mc-'+idx); if(!el||el.dataset.r||el.dataset.m)return;
  el.dataset.r='1'; el.style.background='var(--clr-bg-alt)'; el.style.borderColor='#1e6e6e';
  el.style.fontSize='0.62rem'; el.style.fontFamily='var(--ff-ui)'; el.style.color='var(--clr-text)';
  el.style.padding='5px'; el.style.lineHeight='1.2'; el.style.textAlign='center';
  el.textContent = memCards[idx].text;
  memFlipped.push(idx);
  if (memFlipped.length===2) {
    memLocked=true; memAttempts++;
    const att=document.getElementById('mem-attempts'); if(att)att.textContent=memAttempts;
    const [a,b]=memFlipped;
    if (memCards[a].pairId===memCards[b].pairId) {
      memMatchCount++; memCards[a].matched=true; memCards[b].matched=true;
      [a,b].forEach(i=>{ const c=document.getElementById('mc-'+i); if(!c)return; delete c.dataset.r; c.dataset.m='1'; c.style.background='rgba(46,139,87,0.12)'; c.style.borderColor='#2e8b57'; c.style.color='#1a5c2e'; c.style.cursor='default'; });
      const mt=document.getElementById('mem-matched'); if(mt)mt.textContent=memMatchCount;
      memFlipped=[]; memLocked=false;
      if (memMatchCount===currentGame.memory_pairs.length) setTimeout(showMemoryResult,600);
    } else {
      setTimeout(() => {
        [a,b].forEach(i=>{ const c=document.getElementById('mc-'+i); if(!c)return; delete c.dataset.r; c.style.background='linear-gradient(135deg,#1e6e6e,#2ea8a8)'; c.style.borderColor='transparent'; c.style.fontSize='1.5rem'; c.style.fontFamily=''; c.style.color=''; c.style.padding=''; c.style.lineHeight=''; c.style.textAlign=''; c.textContent='🏛'; });
        memFlipped=[]; memLocked=false;
      },900);
    }
  }
};

function showMemoryResult() {
  const pairs=currentGame.memory_pairs.length, eff=Math.round((pairs/Math.max(memAttempts,pairs))*100);
  document.getElementById('modal-inner').innerHTML=`
    <div style="padding:40px 32px;text-align:center;">
      <div style="font-size:3.5rem;margin-bottom:12px;">🧩</div>
      <h2 style="font-family:var(--ff-head);font-size:1.5rem;color:var(--clr-dark);margin-bottom:20px;">All Pairs Found!</h2>
      <div style="display:flex;gap:16px;justify-content:center;margin-bottom:24px;flex-wrap:wrap;">
        ${statBox(memAttempts,'Attempts','#1e6e6e')}${statBox(eff+'%','Efficiency','#2e8b57')}${statBox(pairs,'Pairs','#2e8b57')}
      </div>
      <div style="display:flex;gap:12px;justify-content:center;flex-wrap:wrap;">
        <button onclick="startGame()" style="${btnStyle('#1e6e6e')}">Play Again</button>
        <button onclick="closeGameModal()" style="${btnStyleOutline()}">More Games</button>
      </div>
    </div>`;
}

/* ── 6 TIMELINE ──────────────────────────────────── */
function renderTimelineQ() {
  const qData=currentGame.questions_data;
  if (currentQ>=qData.length){showTimelineResult();return;}
  const qObj=qData[currentQ];
  tlDisplayOrder=shuffle(qObj.events.map((_,i)=>i)); tlClicked=[];
  const col='#5a3d82';
  document.getElementById('modal-inner').innerHTML=`
    <div style="padding:20px 24px 0;display:flex;align-items:center;gap:12px;">
      <div style="flex:1;background:var(--clr-border);border-radius:100px;height:6px;overflow:hidden;">
        <div style="height:100%;background:${col};border-radius:100px;width:${(currentQ/qData.length)*100}%;transition:width 0.4s;"></div>
      </div>
      <span style="font-family:var(--ff-ui);font-size:0.78rem;color:var(--clr-text-muted);">${currentQ+1}/${qData.length}</span>
    </div>
    <div class="modal-body" style="padding-top:16px;">
      <div style="font-family:var(--ff-ui);font-size:0.7rem;font-weight:800;letter-spacing:1.5px;text-transform:uppercase;color:${col};margin-bottom:8px;">TIMELINE CHALLENGE</div>
      <p style="font-family:var(--ff-body);font-size:0.92rem;font-weight:600;color:var(--clr-text);margin-bottom:4px;">${qObj.question}</p>
      <p style="font-family:var(--ff-body);font-size:0.78rem;color:var(--clr-text-muted);margin-bottom:16px;">Click events: 1st (earliest) then 2nd, 3rd, 4th (latest)</p>
      <div style="display:flex;gap:8px;justify-content:center;margin-bottom:16px;">
        ${[1,2,3,4].map(n=>`<div id="tl-pos-${n}" style="width:48px;height:48px;border-radius:50%;border:2.5px dashed ${col};display:flex;align-items:center;justify-content:center;font-family:var(--ff-ui);font-size:0.78rem;font-weight:800;color:${col};flex-shrink:0;transition:all 0.3s;">${n}</div>`).join('')}
      </div>
      <div style="display:flex;flex-direction:column;gap:8px;">
        ${tlDisplayOrder.map((origIdx,di) => {
          const ev=qObj.events[origIdx];
          return `<button id="tl-btn-${di}" onclick="clickTlEvent(${di},${origIdx})" style="padding:12px 16px;background:var(--clr-bg-alt);border:2px solid ${col};border-radius:10px;font-family:var(--ff-body);font-size:0.88rem;color:var(--clr-text);cursor:pointer;transition:all 0.2s;text-align:left;" onmouseover="if(!this.dataset.c)this.style.background='rgba(90,61,130,0.08)'" onmouseout="if(!this.dataset.c)this.style.background='var(--clr-bg-alt)'">${ev.label}</button>`;
        }).join('')}
      </div>
    </div>`;
}

window.clickTlEvent = function (displayIdx, origIdx) {
  const btn=document.getElementById('tl-btn-'+displayIdx); if(!btn||btn.dataset.c)return;
  const n=tlClicked.length+1;
  btn.dataset.c='1'; btn.style.background='rgba(90,61,130,0.12)'; btn.style.cursor='default';
  btn.innerHTML='<span style="display:inline-flex;align-items:center;justify-content:center;width:22px;height:22px;border-radius:50%;background:#5a3d82;color:#fff;font-family:var(--ff-ui);font-size:0.72rem;font-weight:800;margin-right:10px;">'+n+'</span>'+currentGame.questions_data[currentQ].events[origIdx].label;
  const posEl=document.getElementById('tl-pos-'+n); if(posEl){posEl.style.background='#5a3d82';posEl.style.borderColor='#5a3d82';posEl.style.color='#fff';}
  tlClicked.push(origIdx);
  if (tlClicked.length===4) setTimeout(checkTimeline,400);
};

function checkTimeline() {
  const qObj=currentGame.questions_data[currentQ];
  const sorted=[...qObj.events.map((e,i)=>({...e,origIdx:i}))].sort((a,b)=>a.year-b.year);
  const correct=sorted.map(e=>e.origIdx);
  let pts=0;
  tlClicked.forEach((origIdx,i)=>{ if(origIdx===correct[i]) pts+=6; });
  score+=pts; const isPerf=pts===24;
  showToast(isPerf?'Perfect order! +24 pts':'Score: +'+pts+' pts');
  tlClicked.forEach((origIdx,i)=>{ const di=tlDisplayOrder.indexOf(origIdx); const btn=document.getElementById('tl-btn-'+di); if(btn){const ok=origIdx===correct[i];btn.style.background=ok?'rgba(46,139,87,0.12)':'rgba(229,62,30,0.08)';btn.style.borderColor=ok?'#2e8b57':'#e53e1e';} });
  if (!isPerf) {
    setTimeout(()=>{ const inner=document.getElementById('modal-inner'); const hint=document.createElement('div'); hint.style.cssText='margin:12px 20px 0;padding:10px 14px;background:rgba(90,61,130,0.06);border-left:3px solid #5a3d82;border-radius:0 8px 8px 0;font-family:var(--ff-body);font-size:0.78rem;color:var(--clr-text-muted);'; hint.textContent='Correct: '+correct.map(i=>qObj.events[i].label).join(' → '); inner.appendChild(hint); },100);
  }
  setTimeout(()=>{ currentQ++; tlClicked=[]; renderQuestion(); }, 2800);
}

function showTimelineResult() {
  const total=currentGame.questions_data.length, pct=Math.round((score/(total*24))*100);
  document.getElementById('modal-inner').innerHTML=`
    <div style="padding:40px 32px;text-align:center;">
      <div style="font-size:3.5rem;margin-bottom:12px;">⏳</div>
      <h2 style="font-family:var(--ff-head);font-size:1.5rem;color:var(--clr-dark);margin-bottom:20px;">Timeline Complete!</h2>
      <div style="display:flex;gap:16px;justify-content:center;margin-bottom:24px;flex-wrap:wrap;">
        ${statBox(score,'Score','#5a3d82')}${statBox(pct+'%','Accuracy','#2e8b57')}
      </div>
      <div style="display:flex;gap:12px;justify-content:center;flex-wrap:wrap;">
        <button onclick="startGame()" style="${btnStyle('#5a3d82')}">Play Again</button>
        <button onclick="closeGameModal()" style="${btnStyleOutline()}">More Games</button>
      </div>
    </div>`;
}

/* ── 7 MATCHER ────────────────────────────────────── */
function renderMatcherQ() {
  const qData=currentGame.questions_data;
  if (currentQ>=qData.length){showMatcherResult();return;}
  const qObj=qData[currentQ], pairs=qObj.pairs, col=currentGame.badgeColor;
  matchLeftOrd=shuffle(pairs.map((_,i)=>i)); matchRightOrd=shuffle(pairs.map((_,i)=>i));
  matchMatched=new Set(); matchLeftPick=null;
  document.getElementById('modal-inner').innerHTML=`
    <div style="padding:20px 24px 0;display:flex;align-items:center;gap:12px;">
      <div style="flex:1;background:var(--clr-border);border-radius:100px;height:6px;overflow:hidden;">
        <div style="height:100%;background:${col};border-radius:100px;width:${(currentQ/qData.length)*100}%;transition:width 0.4s;"></div>
      </div>
      <span style="font-family:var(--ff-ui);font-size:0.78rem;color:var(--clr-text-muted);">${currentQ+1}/${qData.length}</span>
    </div>
    <div class="modal-body" style="padding-top:14px;">
      <div style="font-family:var(--ff-ui);font-size:0.7rem;font-weight:800;letter-spacing:1.5px;text-transform:uppercase;color:${col};margin-bottom:8px;">MATCH THE PAIRS</div>
      <p style="font-family:var(--ff-body);font-size:0.86rem;color:var(--clr-text);margin-bottom:14px;">${qObj.instruction}</p>
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;">
        <div style="display:flex;flex-direction:column;gap:6px;">
          <div style="font-family:var(--ff-ui);font-size:0.65rem;font-weight:700;text-transform:uppercase;color:var(--clr-text-muted);text-align:center;padding-bottom:4px;">1. Select left</div>
          ${matchLeftOrd.map((pairIdx,di) => `<button id="ml-${di}" onclick="selectLeft(${di})" style="padding:10px 8px;background:var(--clr-bg-alt);border:2px solid var(--clr-border);border-radius:8px;font-family:var(--ff-body);font-size:0.76rem;color:var(--clr-text);cursor:pointer;transition:all 0.2s;text-align:left;min-height:50px;line-height:1.3;">${pairs[pairIdx].left}</button>`).join('')}
        </div>
        <div style="display:flex;flex-direction:column;gap:6px;">
          <div style="font-family:var(--ff-ui);font-size:0.65rem;font-weight:700;text-transform:uppercase;color:var(--clr-text-muted);text-align:center;padding-bottom:4px;">2. Click match</div>
          ${matchRightOrd.map((pairIdx,di) => `<button id="mr-${di}" onclick="selectRight(${di})" style="padding:10px 8px;background:var(--clr-bg-alt);border:2px solid var(--clr-border);border-radius:8px;font-family:var(--ff-body);font-size:0.76rem;color:var(--clr-text);cursor:pointer;transition:all 0.2s;text-align:left;min-height:50px;line-height:1.3;">${pairs[pairIdx].right}</button>`).join('')}
        </div>
      </div>
    </div>`;
}

window.selectLeft = function (di) {
  const btn=document.getElementById('ml-'+di); if(!btn||btn.dataset.m)return;
  const col=currentGame.badgeColor;
  if (matchLeftPick!==null) { const prev=document.getElementById('ml-'+matchLeftPick); if(prev&&!prev.dataset.m){prev.style.borderColor='var(--clr-border)';prev.style.background='var(--clr-bg-alt)';delete prev.dataset.sel;} }
  if (matchLeftPick===di){matchLeftPick=null;return;}
  matchLeftPick=di; btn.dataset.sel='1'; btn.style.borderColor=col; btn.style.background='rgba(0,0,0,0.04)';
};

window.selectRight = function (di) {
  if (matchLeftPick===null){showToast('Select a left item first!');return;}
  const rBtn=document.getElementById('mr-'+di); if(!rBtn||rBtn.dataset.m)return;
  const lBtn=document.getElementById('ml-'+matchLeftPick);
  const ok=matchLeftOrd[matchLeftPick]===matchRightOrd[di];
  if (ok) {
    score+=10;
    [lBtn,rBtn].forEach(b=>{if(!b)return;b.dataset.m='1';b.style.background='rgba(46,139,87,0.12)';b.style.borderColor='#2e8b57';b.style.color='#1a5c2e';b.style.cursor='default';delete b.dataset.sel;});
    matchMatched.add(matchLeftPick); matchLeftPick=null;
    if (matchMatched.size===currentGame.questions_data[currentQ].pairs.length) setTimeout(()=>{currentQ++;renderQuestion();},900);
  } else {
    [lBtn,rBtn].forEach(b=>{if(!b)return;b.style.borderColor='#e53e1e';b.style.background='rgba(229,62,30,0.07)';b.classList.add('tl-shake');});
    showToast('No match — try again!');
    setTimeout(()=>{[lBtn,rBtn].forEach(b=>{if(!b)return;b.style.borderColor='var(--clr-border)';b.style.background='var(--clr-bg-alt)';b.classList.remove('tl-shake');delete b.dataset.sel;});matchLeftPick=null;},700);
  }
};

function showMatcherResult() {
  document.getElementById('modal-inner').innerHTML=`
    <div style="padding:40px 32px;text-align:center;">
      <div style="font-size:3.5rem;margin-bottom:12px;">🔗</div>
      <h2 style="font-family:var(--ff-head);font-size:1.5rem;color:var(--clr-dark);margin-bottom:20px;">All Pairs Matched!</h2>
      <div style="font-family:var(--ff-head);font-size:3rem;font-weight:800;color:${currentGame.badgeColor};margin-bottom:24px;">${score} pts</div>
      <div style="display:flex;gap:12px;justify-content:center;flex-wrap:wrap;">
        <button onclick="startGame()" style="${btnStyle(currentGame.badgeColor)}">Play Again</button>
        <button onclick="closeGameModal()" style="${btnStyleOutline()}">More Games</button>
      </div>
    </div>`;
}

/* ── 8 ESCAPE ROOM ───────────────────────────────── */
function renderEscapeQ() {
  const qData=currentGame.questions_data;
  if (currentQ>=qData.length){showEscapeVictory();return;}
  const q=qData[currentQ]; answered=false;
  document.getElementById('modal-inner').innerHTML=`
    <div>
      <div style="background:linear-gradient(135deg,#060f06,#0e2010);padding:14px 20px;display:flex;justify-content:space-between;align-items:center;">
        <span style="font-family:var(--ff-ui);font-size:0.7rem;text-transform:uppercase;letter-spacing:1px;color:rgba(100,220,100,0.8);">Chamber ${currentQ+1} of ${qData.length}</span>
        <span style="font-family:var(--ff-ui);font-size:0.7rem;color:rgba(100,220,100,0.6);">Score: ${score}</span>
      </div>
      <div style="background:linear-gradient(135deg,#060f06,#0e2010);padding:14px 20px 16px;">
        <p style="font-family:var(--ff-body);font-size:0.87rem;color:rgba(200,255,200,0.9);line-height:1.65;margin-bottom:10px;">${q.narrative}</p>
        <div style="background:rgba(0,80,0,0.25);border:1px solid rgba(0,180,0,0.2);border-radius:8px;padding:9px 13px;font-family:var(--ff-body);font-size:0.78rem;color:rgba(150,255,150,0.85);line-height:1.4;">${q.clue}</div>
      </div>
      <div class="modal-body" style="padding-top:14px;">
        <h3 style="font-family:var(--ff-body);font-size:0.98rem;font-weight:600;color:var(--clr-text);margin-bottom:14px;">${q.q}</h3>
        <div style="display:flex;flex-direction:column;gap:8px;">
          ${q.opts.map((opt,i) => `
            <button id="esc-opt-${i}" onclick="answerEscape(${i})"
              style="padding:12px 16px;background:var(--clr-bg-alt);border:2px solid var(--clr-border);border-radius:8px;font-family:var(--ff-body);font-size:0.85rem;color:var(--clr-text);cursor:pointer;transition:all 0.2s;text-align:left;display:flex;align-items:flex-start;gap:10px;"
              onmouseover="if(!this.dataset.a)this.style.borderColor='#1e6e6e'"
              onmouseout="if(!this.dataset.a)this.style.borderColor='var(--clr-border)'">
              <span style="width:22px;height:22px;border-radius:50%;border:2px solid var(--clr-border);display:flex;align-items:center;justify-content:center;font-size:0.68rem;font-weight:700;flex-shrink:0;margin-top:1px;">${String.fromCharCode(65+i)}</span>${opt}
            </button>`).join('')}
        </div>
      </div>
    </div>`;
}

window.answerEscape = function (idx) {
  if (answered) return; answered=true;
  const q=currentGame.questions_data[currentQ], correct=idx===q.ans;
  if (correct) score+=20;
  document.querySelectorAll('[id^="esc-opt-"]').forEach((btn,i)=>{ btn.dataset.a='1'; btn.style.cursor='default'; if(i===q.ans){btn.style.background='rgba(46,139,87,0.12)';btn.style.borderColor='#2e8b57';btn.style.color='#1a5c2e';}else if(i===idx&&!correct){btn.style.background='rgba(229,62,30,0.08)';btn.style.borderColor='#e53e1e';btn.style.color='#e53e1e';} });
  const body=document.querySelector('.modal-body');
  if (body) {
    const rv=document.createElement('div');
    rv.style.cssText='margin-top:14px;padding:11px 14px;background:'+(correct?'rgba(46,139,87,0.07)':'rgba(229,62,30,0.05)')+';border:1px solid '+(correct?'#2e8b57':'#e53e1e')+';border-radius:8px;font-family:var(--ff-body);font-size:0.82rem;color:var(--clr-text);line-height:1.55;';
    rv.textContent=q.reveal; body.appendChild(rv);
    const nb=document.createElement('button');
    nb.style.cssText='margin-top:12px;width:100%;padding:12px;background:#1e6e6e;color:#fff;font-family:var(--ff-ui);font-size:0.88rem;font-weight:700;border-radius:var(--radius-sm);cursor:pointer;border:none;';
    nb.textContent=currentQ+1<currentGame.questions_data.length?'Continue to Next Chamber':'Escape the Temple!';
    nb.onclick=()=>{currentQ++;renderQuestion();}; body.appendChild(nb);
  }
};

function showEscapeVictory() {
  document.getElementById('modal-inner').innerHTML=`
    <div style="background:linear-gradient(135deg,#060f06,#0e2010);padding:48px 32px;text-align:center;">
      <div style="font-size:4rem;margin-bottom:16px;">🏆</div>
      <h2 style="font-family:var(--ff-head);font-size:1.6rem;color:#4ade80;margin-bottom:6px;">Temple Escaped!</h2>
      <p style="font-family:var(--ff-body);font-size:0.9rem;color:rgba(150,255,150,0.7);margin-bottom:20px;">You solved all ${currentGame.questions_data.length} ancient mysteries!</p>
      <div style="font-family:var(--ff-head);font-size:3.5rem;font-weight:800;color:#fbbf24;margin-bottom:28px;">${score} pts</div>
      <div style="display:flex;gap:12px;justify-content:center;flex-wrap:wrap;">
        <button onclick="startGame()" style="background:#1e6e6e;color:#fff;font-family:var(--ff-ui);font-size:0.9rem;font-weight:700;padding:14px 24px;border-radius:var(--radius-sm);cursor:pointer;border:none;">Play Again</button>
        <button onclick="closeGameModal()" style="background:rgba(255,255,255,0.1);color:#fff;font-family:var(--ff-ui);font-size:0.9rem;font-weight:600;padding:14px 24px;border-radius:var(--radius-sm);border:2px solid rgba(255,255,255,0.2);cursor:pointer;">More Games</button>
      </div>
    </div>`;
}

/* ── Shared Helpers ──────────────────────────────── */
function statBox(val, label, color) { return `<div style="background:var(--clr-bg-alt);border:2px solid var(--clr-border);border-radius:var(--radius-md);padding:18px 24px;min-width:90px;"><div style="font-family:var(--ff-head);font-size:1.9rem;font-weight:700;color:${color};">${val}</div><div style="font-family:var(--ff-ui);font-size:0.68rem;color:var(--clr-text-muted);text-transform:uppercase;letter-spacing:0.8px;">${label}</div></div>`; }
function btnStyle(bg) { return `background:${bg};color:#fff;font-family:var(--ff-ui);font-size:0.9rem;font-weight:700;padding:14px 28px;border-radius:var(--radius-sm);cursor:pointer;border:none;box-shadow:0 4px 16px rgba(0,0,0,0.2);`; }
function btnStyleOutline() { return `background:var(--clr-bg-alt);color:var(--clr-text-muted);font-family:var(--ff-ui);font-size:0.9rem;font-weight:600;padding:14px 24px;border-radius:var(--radius-sm);border:2px solid var(--clr-border);cursor:pointer;`; }

/* ── Close Modal ─────────────────────────────────── */
window.closeGameModal = function () {
  clearInterval(timerInterval);
  if (document._wdKeyHandler) { document.removeEventListener('keydown', document._wdKeyHandler); document._wdKeyHandler = null; }
  document.getElementById('game-modal-overlay')?.classList.remove('open');
  document.body.style.overflow = '';
  currentGame = null;
};
window.closeModal = function (e) { if (e.target===document.getElementById('game-modal-overlay')) closeGameModal(); };
document.addEventListener('keydown', e => { if (e.key==='Escape') closeGameModal(); });

/* ── Share ───────────────────────────────────────── */
window.shareGame = function () {
  const title=currentGame?.title||'HeriTej Pulse Games';
  navigator.clipboard?.writeText(window.location.href+' — Play "'+title+'" and test your India heritage knowledge!');
  showToast('Link copied to clipboard!');
};

/* ── Filter ──────────────────────────────────────── */
const filterBtns = Array.from(document.querySelectorAll('.gf-btn'));
const gameCards  = Array.from(document.querySelectorAll('.game-card'));
const noResults  = document.getElementById('no-results');
filterBtns.forEach(btn => {
  btn.addEventListener('click', function () {
    filterBtns.forEach(b => b.classList.remove('active')); this.classList.add('active');
    const cat = this.dataset.cat; let count = 0;
    gameCards.forEach((card, i) => {
      const show = cat==='all'||card.dataset.cat===cat; card.style.display=show?'':'none';
      if (show) { card.style.animation='none'; card.offsetHeight; card.style.animation='gcAppear 0.4s '+(i*50)+'ms ease forwards'; card.style.opacity='0'; count++; }
    });
    if (noResults) noResults.style.display = count===0?'block':'none';
  });
});
document.getElementById('btn-reset-filter')?.addEventListener('click', () => {
  filterBtns.forEach(b=>b.classList.remove('active')); filterBtns[0]?.classList.add('active');
  gameCards.forEach(c=>{c.style.display='';});
  if(noResults) noResults.style.display='none';
});

/* ── Navbar ──────────────────────────────────────── */
const navbar = document.getElementById('navbar');
const btt    = document.getElementById('back-to-top');
window.addEventListener('scroll', () => { navbar?.classList.toggle('scrolled', window.scrollY>60); btt?.classList.toggle('visible', window.scrollY>400); }, { passive: true });
btt?.addEventListener('click', () => window.scrollTo({ top:0, behavior:'smooth' }));

/* ── Hamburger ───────────────────────────────────── */
const hamburger = document.getElementById('hamburger');
const navLinks  = document.getElementById('nav-links');
hamburger?.addEventListener('click', () => {
  const open = navLinks.style.display==='flex';
  navLinks.style.cssText = open ? '' : 'display:flex;flex-direction:column;position:absolute;top:100%;left:0;right:0;background:#fff;padding:16px 24px;border-bottom:1px solid var(--clr-border);gap:4px;box-shadow:var(--shadow-md);z-index:99;';
});

/* ── Search ──────────────────────────────────────── */
const searchBtn     = document.getElementById('search-btn');
const searchOverlay = document.getElementById('search-overlay');
const searchClose   = document.getElementById('search-close');
const searchInput   = document.getElementById('search-input');
searchBtn?.addEventListener('click', () => { searchOverlay?.classList.toggle('open'); if (searchOverlay?.classList.contains('open')) searchInput?.focus(); });
searchClose?.addEventListener('click', () => searchOverlay?.classList.remove('open'));
document.addEventListener('keydown', e => { if (e.key==='Escape') searchOverlay?.classList.remove('open'); });

/* ── Date ────────────────────────────────────────── */
const atbDate = document.getElementById('atb-date');
if (atbDate) atbDate.textContent = new Date().toLocaleDateString('en-IN', { weekday:'short', day:'numeric', month:'short', year:'numeric' });

/* ── Toast ───────────────────────────────────────── */
function showToast(msg) {
  let t = document.getElementById('game-toast');
  if (!t) { t=document.createElement('div'); t.id='game-toast'; t.style.cssText='position:fixed;bottom:28px;left:50%;transform:translateX(-50%) translateY(20px);background:var(--clr-dark);color:#fff;font-family:var(--ff-ui);font-size:0.85rem;font-weight:500;padding:12px 24px;border-radius:100px;box-shadow:var(--shadow-md);z-index:9998;opacity:0;transition:all 0.3s ease;pointer-events:none;white-space:nowrap;max-width:90vw;text-align:center;'; document.body.appendChild(t); }
  t.textContent=msg; t.style.opacity='1'; t.style.transform='translateX(-50%) translateY(0)';
  clearTimeout(t._t); t._t=setTimeout(()=>{t.style.opacity='0';t.style.transform='translateX(-50%) translateY(20px)';},2500);
}

document.getElementById('nav-games')?.addEventListener('click', e=>e.preventDefault());

/* ── Language Dropdown ───────────────────────────── */
const langSelectorBtn = document.getElementById('lang-selector-btn');
const langContainer   = document.querySelector('.lang-selector-container');
const langOptions     = document.querySelectorAll('.lang-option');
const langCurrent     = document.querySelector('.lang-current');
const savedLang = localStorage.getItem('selectedLanguage') || 'en';
if (savedLang !== 'en') {
  const activeOption = document.querySelector('.lang-option[data-lang="'+savedLang+'"]');
  if (activeOption) { langOptions.forEach(o=>{o.classList.remove('active');o.setAttribute('aria-selected','false');}); activeOption.classList.add('active'); activeOption.setAttribute('aria-selected','true'); if(langCurrent)langCurrent.textContent=activeOption.textContent.trim(); }
  setTimeout(() => translatePageClient(savedLang), 300);
}
if (langSelectorBtn && langContainer) {
  langSelectorBtn.addEventListener('click', (e)=>{ e.stopPropagation(); langContainer.classList.toggle('open'); langSelectorBtn.setAttribute('aria-expanded',langContainer.classList.contains('open')); });
  langOptions.forEach(opt=>{ opt.addEventListener('click', function(e){ e.stopPropagation(); const tl=this.getAttribute('data-lang')||'en'; langOptions.forEach(o=>{o.classList.remove('active');o.setAttribute('aria-selected','false');}); this.classList.add('active'); this.setAttribute('aria-selected','true'); if(langCurrent)langCurrent.textContent=this.textContent.trim(); langContainer.classList.remove('open'); langSelectorBtn.setAttribute('aria-expanded','false'); setLanguageTranslation(tl,this.textContent.trim()); }); });
  document.addEventListener('click',(e)=>{ if(!langContainer.contains(e.target)){langContainer.classList.remove('open');langSelectorBtn.setAttribute('aria-expanded','false');} });
  function setLanguageTranslation(langCode, langName) {
    localStorage.setItem('selectedLanguage',langCode);
    showToast('Translating to '+langName+'...');
    translatePageClient(langCode);
  }
}

/* ── Translation Engine ──────────────────────────── */
const translationCache = {};
async function translatePageClient(targetLang) {
  try {
    const textNodes=getTextNodes(document.body);
    textNodes.forEach(n=>{if(n._originalText===undefined)n._originalText=n.nodeValue;});
    if(targetLang==='en'){textNodes.forEach(n=>{if(n._originalText!==undefined)n.nodeValue=n._originalText;});return;}
    const ntt=textNodes.filter(n=>{const t=n._originalText.trim();return t.length>0&&isNaN(t);});
    const bs=20;
    for(let i=0;i<ntt.length;i+=bs){
      const batch=ntt.slice(i,i+bs);
      const ac=batch.every(n=>translationCache[targetLang+'_'+n._originalText]!==undefined);
      if(ac){batch.forEach(n=>{n.nodeValue=translationCache[targetLang+'_'+n._originalText];});continue;}
      const ct=batch.map(n=>n._originalText).join(' || ');
      const url='https://translate.googleapis.com/translate_a/single?client=gtx&sl=en&tl='+targetLang+'&dt=t&q='+encodeURIComponent(ct);
      const res=await fetch(url);if(!res.ok)continue;
      const data=await res.json();
      if(data&&data[0]){const tt=data[0].map(s=>s[0]).join('');const tp=tt.split('||');batch.forEach((n,idx)=>{const tr=tp[idx]?tp[idx].trim():n._originalText;translationCache[targetLang+'_'+n._originalText]=tr;n.nodeValue=tr;});}
    }
  }catch(err){console.error("Translation Error:",err);}
}
function getTextNodes(node) {
  const tn=[];
  if(node.nodeType===Node.TEXT_NODE){const v=node.nodeValue.trim();if(v.length>0&&isNaN(v)&&!v.startsWith('//')&&!v.startsWith('/*'))tn.push(node);}
  else{const ig=['SCRIPT','STYLE','IFRAME','CODE','PRE','NOSCRIPT'];if(!ig.includes(node.nodeName)){for(let c of node.childNodes)tn.push(...getTextNodes(c));}}
  return tn;
}

console.log('%c🎮 HeriTej Pulse — Games Arcade v2 (8 Game Types)', 'font-size:16px;font-weight:bold;color:#b5451b;');
