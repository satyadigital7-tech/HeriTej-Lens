/* ═══════════════════════════════════════════════════
   HERITEJ PULSE — article-script.js
   ═══════════════════════════════════════════════════ */

/* ── Article Data Store ──────────────────────────── */
const ARTICLES = {
  '1': {
    id: '1',
    category: 'archaeology',
    categoryLabel: 'Archaeology',
    title: 'Secrets Beneath the Taj Mahal: New Archaeological Discoveries in Agra',
    subtitle: 'Ground-penetrating radar surveys have located sealed chambers and underground structures beneath the iconic Mughal monument.',
    author: 'Priya Raghavan',
    authorInitials: 'PR',
    authorColor: '#c0705a',
    authorBio: 'Priya covers archaeology and ancient history across North India. She has reported from ASI digs in Agra, Mathura, and Varanasi.',
    date: 'July 5, 2026',
    readTime: '6 min read',
    image: 'images/news_tajmahal.png',
    imageCaption: 'The Taj Mahal, Agra — new GPR surveys reveal hidden underground chambers. Photo: ASI',
    tags: ['Taj Mahal', 'Archaeology', 'Mughal', 'Agra'],
    bcCat: 'Archaeology',
    paragraphs: [
      "Recent archaeological excavations led by the Archaeological Survey of India (ASI) have unveiled a series of ancient underground chambers beneath the central platform of the Taj Mahal. Using advanced Ground-Penetrating Radar (GPR) technology, scientists mapped several sealed pathways and corridors that lay undisturbed for nearly four centuries.",
      "Historians speculate that these chambers were constructed as structural reinforcement layers to distribute the immense weight of the marble dome and its minarets. Others suggest they served as secret vaults for storing Mughal royal treasures and construction records during the monument's 22-year build period.",
      "The findings have ignited a fresh wave of excitement among the global scientific community. Preservation teams are now planning non-invasive studies to assess the structural integrity of these hidden brick vaults, ensuring that Agra's jewel remains protected for future generations."
    ]
  },
  '2': {
    id: '2',
    category: 'ancient',
    categoryLabel: 'Ancient Civilisations',
    title: 'The Sacred Geometry of Khajuraho: Mathematics Hidden in Stone',
    subtitle: 'New structural analyses of the Khajuraho temples reveal an extraordinarily precise application of Vastu Shastra principles.',
    author: 'Arjun Krishnaswamy',
    authorInitials: 'AK',
    authorColor: '#7a4a2e',
    authorBio: 'Arjun covers ancient Indian architecture, archaeology, and cultural heritage across South and Central India. He holds a PhD in Ancient History from JNU.',
    date: 'July 4, 2026',
    readTime: '8 min read',
    image: 'images/story1.png',
    imageCaption: 'The Khajuraho Group of Monuments, Madhya Pradesh — a UNESCO World Heritage Site since 1986. Photo: ASI',
    tags: ['Khajuraho', 'Architecture', 'Medieval India', 'Vastu Shastra'],
    bcCat: 'Ancient Civilisations',
    paragraphs: [
      "The medieval temples of Khajuraho, built by the Chandela dynasty between 950 and 1050 CE, are globally celebrated for their exquisite carvings. However, a new study reveals that a deeper architectural intelligence is encoded in their design. Researchers have demonstrated that every dimension of the temples adheres strictly to the Manasara Shilpa Shastra, an ancient Indian treatise on design.",
      "The main Shikhara towers precisely mimic the sacred Mount Meru, with each successive tier scaled by a fractal grid of squares. This geometry predates Western fractal mathematics by centuries, suggesting a highly developed system of calculations among early Indian guild builders.",
      "By analyzing the alignment of the inner sanctum, scientists also discovered that the structures were oriented precisely with astronomical cardinal points, capturing daylight in perfect symmetry during the equinoxes."
    ]
  },
  '3': {
    id: '3',
    category: 'arts',
    categoryLabel: 'Arts',
    title: "Restoring Ajanta's Hidden Pigments: The True Colors of Indian Cave Art",
    subtitle: 'AI-enhanced imaging technology reveals the original vivid palette of 2,000-year-old Ajanta murals, revolutionising how we see ancient Indian art.',
    author: 'Dr. Meera Nair',
    authorInitials: 'MN',
    authorColor: '#5ac08a',
    authorBio: 'Dr. Meera is an art historian and conservation specialist covering Indian classical and medieval visual arts.',
    date: 'July 4, 2026',
    readTime: '5 min read',
    image: 'images/story2.png',
    imageCaption: 'Ajanta Cave No. 1 murals — AI imaging reveals original colours. Photo: INTACH',
    tags: ['Ajanta', 'Cave Art', 'Conservation', 'Buddhist Art'],
    bcCat: 'Arts',
    paragraphs: [
      "Using multi-spectral and infrared digital photography, art conservationists have successfully revealed the original, vibrant palette of the Ajanta cave murals. Obscured for centuries by thick layers of soot, incense smoke, and modern varnish, the murals have now regained their ancient colors.",
      "The multi-wavelength scans let researchers peer through the pigment layers to reveal original sketch lines. These show how ancient painters refined their drawings directly on the wet plaster, providing a rare glimpse into the workshops of the Satavahana era.",
      "Furthermore, chemical analysis of the blue pigment confirmed it was made from Afghan lapis lazuli. This proves the existence of highly organized trade networks linking remote Deccan monasteries to the Silk Road."
    ]
  },
  '4': {
    id: '4',
    category: 'heritage',
    categoryLabel: 'World Heritage',
    title: 'Hampi From Above: Drone Views Reveal the Lost Grandeur of Vijayanagara',
    subtitle: 'LIDAR mapping uncovers a 3 km extension of Vijayanagara city walls, reshaping our understanding of the empire at its peak.',
    author: 'Ravi Kumar',
    authorInitials: 'RK',
    authorColor: '#c07a5a',
    authorBio: "Ravi is HeriTej Pulse's South India correspondent covering Karnataka and Tamil Nadu heritage sites.",
    date: 'July 3, 2026',
    readTime: '7 min read',
    image: 'images/story3.png',
    imageCaption: 'Virupaksha Temple complex, Hampi — a UNESCO World Heritage Site. Photo: Karnataka Tourism',
    tags: ['Hampi', 'Vijayanagara', 'UNESCO', 'Karnataka'],
    bcCat: 'World Heritage',
    paragraphs: [
      "LIDAR (light detection and ranging) surveys conducted over the ruins of Hampi have revealed a massive, previously unmapped 3 km extension of the outer defensive walls. This discovery drastically alters modern estimates of the Vijayanagara Empire's true geographic scale.",
      "The drone-assisted radar mapping also detected underground masonry ruins, domestic neighborhoods, and ancient agricultural fields. A complex water network of gravity-fed clay pipes was mapped, showing how water was transported from the Tungabhadra River.",
      "This indicates that the capital was not just a collection of temples, but a highly planned, self-sufficient medieval megacity. Local conservation groups are now using these maps to protect threatened portions of the site."
    ]
  },
  '5': {
    id: '5',
    category: 'ancient',
    categoryLabel: 'Ancient Civilisations',
    title: "Stepwells of Rajasthan: India's Vanishing Water Architecture",
    subtitle: 'These intricate, multi-storied water management systems once sustained entire desert cities — now conservationists race to save them.',
    author: 'Sneha Gupta',
    authorInitials: 'SG',
    authorColor: '#7a5ac0',
    authorBio: 'Sneha covers Rajasthan heritage, traditional crafts, and water conservation history for HeriTej Pulse.',
    date: 'July 3, 2026',
    readTime: '6 min read',
    image: 'images/news_stepwell.png',
    imageCaption: 'Chand Baori stepwell, Abhaneri, Rajasthan — one of the deepest stepwells in India. Photo: ASI',
    tags: ['Stepwells', 'Rajasthan', 'Water Architecture', 'Heritage'],
    bcCat: 'Ancient Civilisations',
    paragraphs: [
      "Stepwells, or vavs, are subterranean water structures unique to western India, designed to combat the dry desert climates. These deep, multi-tiered stone wells collected monsoon rainwater and served as cool social hubs for weary travelers.",
      "Beyond utility, stepwells were artistic marvels, featuring elaborate steps, columns, and religious carvings. As modern plumbing replaced traditional wells, many fell into disuse and decay, filled with silt and overgrown with local vegetation.",
      "Today, cultural groups and the Government of India are executing heritage preservation projects to restore these wells. By clearing debris and rebuilding retaining walls, they hope to revive ancient rainwater harvesting methods to fight modern water scarcity."
    ]
  },
  '6': {
    id: '6',
    category: 'archaeology',
    categoryLabel: 'Archaeology',
    title: 'Deciphering the Indus Script: 5,000 Years of Mystery May Soon Be Solved',
    subtitle: 'A Cambridge-IIT collaboration using AI pattern recognition has made the closest breakthrough yet toward reading the undeciphered Indus Valley writing system.',
    author: 'Dr. Amit Sen',
    authorInitials: 'AS',
    authorColor: '#7b5ac0',
    authorBio: 'Dr. Amit is a senior historical researcher and linguist specialising in Bronze Age scripts and ancient trade paths.',
    date: 'July 2, 2026',
    readTime: '7 min read',
    image: 'images/spotlight1.png',
    imageCaption: 'Indus Valley seal showing script characters and animal emblems. Photo: Harappa Archaeology Project',
    tags: ['Indus Valley', 'Harappa', 'Indus Script', 'Decipherment', 'AI'],
    bcCat: 'Archaeology',
    paragraphs: [
      "A joint team of linguists from Cambridge and computational scientists from IIT has made a major breakthrough in deciphering the Indus Script. By employing deep learning neural networks, the project analyzed recurring symbol patterns on over 5,000 Harappan seals.",
      "The algorithm identified structural syntax and word-order sequences that closely align with ancient Dravidian and early Indo-Aryan languages. While full decipherment remains an ongoing challenge, this pattern recognition provides the clearest roadmap yet.",
      "Linguists hope that decoding these symbols will finally answer key questions about the social structure, governance, and daily trade activities of one of the world's oldest urban civilizations."
    ]
  },
  '7': {
    id: '7',
    category: 'cultural-heritage',
    categoryLabel: 'Cultural Heritage',
    title: 'How Bollywood Is Redefining Global Perceptions of Indian Culture',
    subtitle: "From Mumbai film sets to international awards, Indian cinema has become the world's most powerful lens through which India is seen globally.",
    author: 'Karan Johar',
    authorInitials: 'KJ',
    authorColor: '#c0705a',
    authorBio: 'Karan writes about media, entertainment history, and the evolution of global Indian pop culture.',
    date: 'July 1, 2026',
    readTime: '5 min read',
    image: 'images/news_bollywood.png',
    imageCaption: 'Indian film representation on a global stage. Photo: Cine Heritage',
    tags: ['Bollywood', 'Cinema', 'Pop Culture', 'Global Influence'],
    bcCat: 'Cultural Heritage',
    paragraphs: [
      "Indian cinema has evolved from local theatrical roots into a massive cultural export. From vibrant musical sequences to award-winning historical epics, Bollywood serves as a powerful window to Indian heritage for millions of global viewers.",
      "Films focusing on mythological stories and classical folklore have sparked international interest in Indian clothing, local festivals, and traditional arts. This cultural soft power is visible in the growing global footprint of Indian media.",
      "With streaming platforms broadening distribution, international filmmakers are collaborating with Indian writers to co-produce projects, establishing a shared global cinematic language."
    ]
  },
  '8': {
    id: '8',
    category: 'food',
    categoryLabel: 'Food Fusion',
    title: "India's Street Food Meets Fine Dining: Michelin's New Indian Moment",
    subtitle: 'Chefs across Mumbai and Delhi are translating centuries-old street recipes into Michelin-worthy tasting menus, creating a new chapter in Indian culinary heritage.',
    author: 'Chef Vikas Khanna',
    authorInitials: 'VK',
    authorColor: '#5ac08a',
    authorBio: 'Chef Vikas Khanna writes on historical Indian food lineages, spice trails, and modern global culinary styling.',
    date: 'June 30, 2026',
    readTime: '6 min read',
    image: 'images/news_streetfood.png',
    imageCaption: 'Traditional chaat reimagined as a gourmet fine-dining starter. Photo: Michelin Guide India',
    tags: ['Culinary', 'Michelin Star', 'Street Food', 'Modern Indian'],
    bcCat: 'Food Fusion',
    paragraphs: [
      "Chefs in metropolitan hubs are elevating humble street food recipes into high-end fine dining menus. Traditional items like golgappa, tikki, and misal pav are being reimagined with modern culinary techniques while keeping their original flavors.",
      "By presenting these street heritage recipes with gourmet presentation and premium ingredients, chefs are capturing the attention of international culinary guides, marking a new milestone for Indian gastronomy.",
      "This trend not only popularizes traditional regional recipes globally but also ensures that the culinary techniques of street vendors are preserved and celebrated in elite spaces."
    ]
  },
  '9': {
    id: '9',
    category: 'arts',
    categoryLabel: 'Arts',
    title: 'Carnatic vs Hindustani: The Twin Rivers of Indian Classical Music',
    subtitle: 'An in-depth exploration of how two distinct traditions share the same ancient roots but evolved into entirely different worlds of sound and expression.',
    author: 'Sanjay Subramanian',
    authorInitials: 'SS',
    authorColor: '#7a4a2e',
    authorBio: 'Sanjay is a veteran classical vocalist and music historian researching musicological shifts since the medieval era.',
    date: 'June 29, 2026',
    readTime: '8 min read',
    image: 'images/spotlight2.png',
    imageCaption: 'Musicians tuning a Tanpura and Mridangam before a concert recital. Photo: Sangeet Academy',
    tags: ['Classical Music', 'Carnatic', 'Hindustani', 'Raga'],
    bcCat: 'Arts',
    paragraphs: [
      "Indian classical music flows through two major streams: Hindustani in the North and Carnatic in the South. While both share roots in ancient Vedic texts and the system of raga and tala, they evolved along distinct stylistic paths.",
      "Hindustani music was highly influenced by Persian traditions in medieval courts, emphasizing improvisation and slow melodic growth. Carnatic music, conversely, remained centered around temple worship and composition structures.",
      "Despite these stylistic differences, both systems explore the same spiritual depths, illustrating the cultural unity and stylistic diversity of India's musical heritage."
    ]
  },
  '10': {
    id: '10',
    category: 'culture',
    categoryLabel: 'Culture & Arts',
    title: 'Navratri 2026: The Festival That Stopped Time',
    subtitle: "This year's Navratri drew over 2 million dancers across Gujarat alone — making it the largest Garba gathering ever recorded in Indian history.",
    author: 'Bhavna Patel',
    authorInitials: 'BP',
    authorColor: '#c07a5a',
    authorBio: 'Bhavna specializes in community ethnography and ritual dance studies across Western India.',
    date: 'June 28, 2026',
    readTime: '5 min read',
    image: 'images/spotlight3.png',
    imageCaption: 'Dancers swirling in traditional attire during a Garba night. Photo: Gujarat Tourism',
    tags: ['Navratri', 'Garba', 'Gujarat', 'Festival', 'UNESCO'],
    bcCat: 'Culture & Arts',
    paragraphs: [
      "The Navratri festival celebrating the divine feminine drew record crowds this year, with millions of dancers gathered in circular Garba groups. The festival represents one of the largest synchronized community dances in the world.",
      "Recognized by UNESCO as intangible cultural heritage, Garba combines physical dance with deep devotion. Dancers wear traditional hand-embroidered clothing, creating a colorful visual display.",
      "As the festival gains global popularity, communities in London, New York, and Sydney host similar massive Garba events, connecting the diaspora with their cultural roots."
    ]
  },
  '11': {
    id: '11',
    category: 'culture',
    categoryLabel: 'Culture & Arts',
    title: 'Bharatanatyam Goes Global: A Traditional Dance That Wowed Paris',
    subtitle: 'The ancient Tamil temple dance form electrified audiences at the Paris Opera House in its most celebrated international debut.',
    author: 'Rukmini Devi',
    authorInitials: 'RD',
    authorColor: '#7a5ac0',
    authorBio: 'Rukmini is a dance critique and choreographic researcher with 15 years of experience in classical arts.',
    date: 'June 27, 2026',
    readTime: '6 min read',
    image: 'images/spotlight1.png',
    imageCaption: 'A dancer portraying a mudra (hand gesture) on stage in Paris. Photo: Paris Opera House',
    tags: ['Bharatanatyam', 'Classical Dance', 'Paris', 'Tamil Nadu', 'Performance'],
    bcCat: 'Culture & Arts',
    paragraphs: [
      "Bharatanatyam, the classical dance of Tamil Nadu, received a standing ovation during its debut performance at the Paris Opera House. The performance highlighted the complex footwork and expressive hand gestures characteristic of the dance.",
      "Originally performed in temples as a form of worship, the dance has transitioned into global theatrical spaces, showing that ancient storytelling mediums remain relevant to modern audiences.",
      "Collaborations between Indian choreographers and Western dancers are creating a dialogue, blending Bharatanatyam with contemporary ballet."
    ]
  },
  '12': {
    id: '12',
    category: 'spirituality',
    categoryLabel: 'Ancient Spirituality',
    title: 'Sacred Ghats: Morning Rituals That Bind Generations',
    subtitle: "At Varanasi's riverbank, a daily ritual practiced for over 3,000 years connects India's oldest living spiritual tradition to its youngest generation of devotees.",
    author: 'Swami Chinmaya',
    authorInitials: 'SC',
    authorColor: '#c0705a',
    authorBio: 'Swami Chinmaya writes on Vedic philosophy, temple geography, and the living heritage of ancient riverbanks.',
    date: 'June 26, 2026',
    readTime: '7 min read',
    image: 'images/news_ghat.png',
    imageCaption: 'Morning prayers on the steps of Assi Ghat in Varanasi. Photo: Ganges Heritage Project',
    tags: ['Varanasi', 'Ghats', 'Ganga', 'Rituals', 'Spirituality'],
    bcCat: 'Ancient Spirituality',
    paragraphs: [
      "The river ghats of Varanasi serve as the spiritual heart of the city, hosting daily rituals that have continued uninterrupted for thousands of years. The morning Ganga Aarti draws hundreds of pilgrims to the riverbanks.",
      "The rituals symbolize the cycle of life, death, and purification, linking ancient Vedic traditions with modern practitioners. Young priests are trained to execute the synchronized fire prayers.",
      "Conservation efforts are underway to address pollution in the Ganges, ensuring that these ancient spiritual spaces remain clean and accessible for future generations."
    ]
  },
  '13': {
    id: '13',
    category: 'fashion',
    categoryLabel: 'Fashion Fusion',
    title: "Ravi Shankar's Global Legacy: How the Sitar Changed Western Music",
    subtitle: "From the Beatles to Philip Glass — revisiting how one Indian maestro's instrument and vision permanently reshaped the course of Western popular music.",
    author: 'Anoushka Roy',
    authorInitials: 'AR',
    authorColor: '#5ac08a',
    authorBio: 'Anoushka is a music producer and writer investigating cross-cultural fusion and classical music lineage.',
    date: 'June 25, 2026',
    readTime: '7 min read',
    image: 'images/fashion_main.png',
    imageCaption: 'Pandit Ravi Shankar performing on the sitar. Photo: Ravi Shankar Foundation',
    tags: ['Sitar', 'Ravi Shankar', 'Classical Music', 'Beatles', 'Global Legacy'],
    bcCat: 'Fashion Fusion',
    paragraphs: [
      "Pandit Ravi Shankar's collaborations with Western musicians in the 1960s introduced the sitar to the global stage, forever changing the landscape of popular music. His partnership with the Beatles inspired a generation of sitar-infused rock tracks.",
      "He went beyond simple fusion to establish classical Indian music as a rigorous, respected art form in the West, performing at major festivals and writing classical concertos.",
      "His musical legacy continues to inspire modern instrumentalists, demonstrating how traditional instruments can transcend borders and build cultural connections."
    ]
  }
};

document.addEventListener('DOMContentLoaded', () => {

  /* ─── Date in Topbar ─────────────────────────── */
  const atbDate = document.getElementById('atb-date');
  if (atbDate) {
    atbDate.textContent = new Date().toLocaleDateString('en-IN', {
      weekday: 'short', day: 'numeric', month: 'short', year: 'numeric'
    });
  }

  /* ─── Load Article from URL Params ──────────────*/
  const params    = new URLSearchParams(window.location.search);
  const articleId = params.get('id') || '2'; // default to Khajuraho
  const article   = ARTICLES[articleId];

  if (article) {
    loadArticle(article);
  }

  function loadArticle(a) {
    // Page title & meta
    document.title = `${a.title} | HeriTej Pulse`;
    const metaDesc = document.getElementById('meta-desc');
    if (metaDesc) metaDesc.content = a.subtitle;

    // Topbar
    const atbTitle = document.getElementById('atb-title');
    if (atbTitle) atbTitle.textContent = a.title;

    // Breadcrumb
    const bcCat = document.getElementById('bc-cat');
    if (bcCat) bcCat.textContent = a.categoryLabel;

    // Category Badge
    const acBadge = document.getElementById('ac-badge');
    if (acBadge) {
      acBadge.textContent = a.categoryLabel;
      acBadge.className   = `ac-badge ${a.category}`;
    }

    // Title, subtitle
    const titleEl    = document.getElementById('article-title');
    const subtitleEl = document.getElementById('article-subtitle');
    if (titleEl)    titleEl.textContent    = a.title;
    if (subtitleEl) subtitleEl.textContent = a.subtitle;

    // Byline
    const avatarEl = document.getElementById('byline-avatar');
    const nameEl   = document.getElementById('byline-name');
    const dateEl   = document.getElementById('byline-date');
    const rtEl     = document.getElementById('byline-readtime');
    if (avatarEl) { avatarEl.textContent = a.authorInitials; avatarEl.style.background = a.authorColor; }
    if (nameEl)   nameEl.textContent = a.author;
    if (dateEl)   dateEl.textContent = a.date;
    if (rtEl)     rtEl.innerHTML = `<svg width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg> ${a.readTime}`;

    // Hero image
    const heroImg  = document.getElementById('hero-img');
    const heroCap  = document.getElementById('hero-caption');
    if (heroImg) { heroImg.src = a.image; heroImg.alt = a.title; }
    if (heroCap) heroCap.textContent = a.imageCaption;

    // Dynamic Article Body Paragraphs Injection
    const bodyEl = document.getElementById('article-body');
    if (bodyEl && a.paragraphs) {
      bodyEl.innerHTML = a.paragraphs.map(p => `<p>${p}</p>`).join('');
    }

    // Tags
    const tagsList = document.getElementById('tags-list') || document.querySelector('.tags-list');
    if (tagsList) {
      tagsList.innerHTML = a.tags.map((t, i) =>
        `<a href="#" class="tag-pill" id="tag-${i+1}">${t}</a>`
      ).join('');
    }

    // Author Bio
    const abcAvatar2 = document.querySelector('.abc-avatar');
    const abcName   = document.getElementById('abc-name');
    const abcBioEl  = document.querySelector('.abc-bio');
    if (abcAvatar2) { abcAvatar2.textContent = a.authorInitials; abcAvatar2.style.background = a.authorColor; }
    if (abcName)    abcName.textContent = a.author;
    if (abcBioEl)   abcBioEl.textContent = a.authorBio;

    // Prev / Next navigation
    const ids     = Object.keys(ARTICLES);
    const idx     = ids.indexOf(articleId);
    const prevId  = idx > 0 ? ids[idx - 1] : null;
    const nextId  = idx < ids.length - 1 ? ids[idx + 1] : null;

    const anavPrev = document.getElementById('anav-prev');
    const anavNext = document.getElementById('anav-next');
    if (anavPrev) {
      if (prevId) {
        anavPrev.style.display = '';
        anavPrev.href = `article.html?id=${prevId}`;
        anavPrev.querySelector('.anav-title').textContent = ARTICLES[prevId].title;
      } else {
        anavPrev.style.display = 'none';
      }
    }
    if (anavNext) {
      if (nextId) {
        anavNext.style.display = '';
        anavNext.href = `article.html?id=${nextId}`;
        anavNext.querySelector('.anav-title').textContent = ARTICLES[nextId].title;
      } else {
        anavNext.style.display = 'none';
      }
    }
  }

  /* ─── Navbar Scroll ──────────────────────────── */
  const navbar   = document.getElementById('navbar');
  const btt      = document.getElementById('back-to-top');
  const progress = document.getElementById('reading-progress');

  window.addEventListener('scroll', () => {
    const scrollY   = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;

    navbar?.classList.toggle('scrolled', scrollY > 60);
    btt?.classList.toggle('visible', scrollY > 400);

    if (progress && docHeight > 0) {
      progress.style.width = (scrollY / docHeight * 100) + '%';
    }
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
    searchOverlay?.classList.toggle('open');
    if (searchOverlay?.classList.contains('open')) searchInput?.focus();
  });
  searchClose?.addEventListener('click', () => searchOverlay?.classList.remove('open'));
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') searchOverlay?.classList.remove('open');
  });

  /* ─── Bookmark Article ───────────────────────── */
  const bookmarkBtn = document.getElementById('bookmark-btn');
  let isBookmarked  = false;
  bookmarkBtn?.addEventListener('click', function () {
    isBookmarked = !isBookmarked;
    this.style.color = isBookmarked ? 'var(--clr-primary)' : '';
    showToast(isBookmarked ? '✓ Article bookmarked!' : 'Bookmark removed');
  });

  /* ─── Sidebar Newsletter ─────────────────────── */
  window.handleSidebarNL = function (e) {
    e.preventDefault();
    const email  = document.getElementById('wn-email');
    const submit = document.getElementById('wn-submit');
    if (!email?.value) return;
    submit.textContent = 'Subscribing…';
    setTimeout(() => {
      submit.textContent = '✓ Subscribed!';
      submit.style.background = '#1a5c2e';
      email.value = '';
      setTimeout(() => {
        submit.textContent = 'Subscribe';
        submit.style.background = '';
      }, 4000);
    }, 1000);
  };

  /* ─── Share Article ──────────────────────────── */
  window.shareArticle = function (platform) {
    const url   = encodeURIComponent(window.location.href);
    const title = encodeURIComponent(document.title);
    const links = {
      facebook : `https://www.facebook.com/sharer/sharer.php?u=${url}`,
      x        : `https://twitter.com/intent/tweet?url=${url}&text=${title}`,
      linkedin : `https://www.linkedin.com/sharing/share-offsite/?url=${url}`,
    };
    if (links[platform]) window.open(links[platform], '_blank', 'width=600,height=400');
  };

  window.copyLink = function () {
    navigator.clipboard?.writeText(window.location.href).then(() => {
      showToast('🔗 Link copied to clipboard!');
    }).catch(() => {
      showToast('🔗 Copy the URL from your browser bar');
    });
  };

  /* ─── Toast ──────────────────────────────────── */
  function showToast(msg) {
    let t = document.getElementById('art-toast');
    if (!t) {
      t = document.createElement('div');
      t.id = 'art-toast';
      t.style.cssText = `
        position:fixed;bottom:28px;left:50%;transform:translateX(-50%) translateY(20px);
        background:var(--clr-dark);color:#fff;
        font-family:var(--ff-ui);font-size:0.85rem;font-weight:500;
        padding:12px 24px;border-radius:100px;
        box-shadow:var(--shadow-md);z-index:9998;
        opacity:0;transition:all 0.3s ease;pointer-events:none;white-space:nowrap;
      `;
      document.body.appendChild(t);
    }
    t.textContent = msg;
    t.style.opacity = '1';
    t.style.transform = 'translateX(-50%) translateY(0)';
    clearTimeout(t._t);
    t._t = setTimeout(() => {
      t.style.opacity = '0';
      t.style.transform = 'translateX(-50%) translateY(20px)';
    }, 2500);
  }

  /* ─── Smooth scroll ──────────────────────────── */
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      const el = document.querySelector(a.getAttribute('href'));
      if (el) { e.preventDefault(); el.scrollIntoView({ behavior: 'smooth' }); }
    });
  });

  /* ─── Custom Language Dropdown ───────────────── */
  const langSelectorBtn = document.getElementById('lang-selector-btn');
  const langContainer   = document.querySelector('.lang-selector-container');
  const langOptions     = document.querySelectorAll('.lang-option');
  const langCurrent     = document.querySelector('.lang-current');

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

  /* ─── Local File Origin Translation Engine ─── */
  const translationCache = {};

  async function translatePageClient(targetLang) {
    try {
      const textNodes = getTextNodes(document.body);
      
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

      const nodesToTranslate = textNodes.filter(node => {
        const txt = node._originalText.trim();
        return txt.length > 0 && isNaN(txt);
      });

      const batchSize = 20;
      for (let i = 0; i < nodesToTranslate.length; i += batchSize) {
        const batch = nodesToTranslate.slice(i, i + batchSize);
        
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

  console.log('%c📖 HeriTej Pulse — Article View', 'font-size:14px;font-weight:bold;color:#b5451b;');

}); // DOMContentLoaded
