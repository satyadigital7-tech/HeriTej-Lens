/* ==========================================================================
   HERITEJ PULSE — CHATBOT WIDGET LOGIC
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  // Inject Chatbot Widget into Page Body
  const botHTML = `
    <!-- Chatbot FAB -->
    <button class="chatbot-fab" id="chatbot-fab" aria-label="Open chat assistant">
      <img src="images/Bela%20lancha%20dress%20(dark%20blueish%20green)-Photoroom.png" alt="Chat Assistant" class="chatbot-fab-img" />
    </button>

    <!-- Chatbot Window -->
    <div class="chatbot-window" id="chatbot-window">
      <div class="chatbot-header">
        <div class="chatbot-profile">
          <div class="chatbot-avatar">
            <img src="images/Bela%20lancha%20dress%20(dark%20blueish%20green)-Photoroom.png" alt="Assistant" />
          </div>
          <div class="chatbot-info">
            <h3>HeriTej Assistant</h3>
            <div class="chatbot-status">Online</div>
          </div>
        </div>
        <button class="chatbot-close" id="chatbot-close" aria-label="Close chat">✕</button>
      </div>
      
      <div class="chatbot-messages" id="chatbot-messages">
        <div class="chat-msg bot">
          🙏 Namaste! Welcome to HeriTej Pulse Chat Assistant. I can tell you about Indian history, architecture, local monuments, news, or site navigation. How can I help you today?
        </div>
      </div>

      <div class="chatbot-suggestions">
        <button class="chat-suggest-btn" data-query="Tell me about Taj Mahal">🏛️ Taj Mahal</button>
        <button class="chat-suggest-btn" data-query="Explain Hampi's architecture">🎨 Hampi</button>
        <button class="chat-suggest-btn" data-query="How do I play games?">🎮 Games</button>
        <button class="chat-suggest-btn" data-query="What is the latest news?">📰 News</button>
      </div>

      <div class="chatbot-footer">
        <input type="text" class="chatbot-input" id="chatbot-input" placeholder="Type your message here..." autocomplete="off" />
        <button class="chatbot-send-btn" id="chatbot-send" aria-label="Send message">
          <svg viewBox="0 0 24 24">
            <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/>
          </svg>
        </button>
      </div>
    </div>
  `;

  // Create a container div for the chatbot and append it to the body
  const botContainer = document.createElement('div');
  botContainer.innerHTML = botHTML;
  document.body.appendChild(botContainer);

  // Selector Hooks
  const fab = document.getElementById('chatbot-fab');
  const windowEl = document.getElementById('chatbot-window');
  const closeBtn = document.getElementById('chatbot-close');
  const inputEl = document.getElementById('chatbot-input');
  const sendBtn = document.getElementById('chatbot-send');
  const messagesEl = document.getElementById('chatbot-messages');
  const suggestBtns = document.querySelectorAll('.chat-suggest-btn');

  // Toggle Chat Window
  fab.addEventListener('click', () => {
    windowEl.classList.toggle('open');
    fab.classList.toggle('open');
    if (windowEl.classList.contains('open')) {
      inputEl.focus();
    }
  });

  closeBtn.addEventListener('click', () => {
    windowEl.classList.remove('open');
    fab.classList.remove('open');
  });

  // Handle Suggested Button Clicks
  suggestBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const query = btn.getAttribute('data-query');
      handleUserMsg(query);
    });
  });

  // Handle Input Messaging
  sendBtn.addEventListener('click', () => sendUserMsg());
  inputEl.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      sendUserMsg();
    }
  });

  function sendUserMsg() {
    const text = inputEl.value.trim();
    if (!text) return;
    inputEl.value = '';
    handleUserMsg(text);
  }

  function handleUserMsg(text) {
    // Append User Message to Window
    appendMsg(text, 'user');
    
    // Show Typing Indicator
    const typingIndicator = showTyping();
    
    // Fetch Bot Response after simulation delay
    setTimeout(() => {
      typingIndicator.remove();
      const botResponse = getBotResponse(text);
      appendMsg(botResponse, 'bot');
    }, 1000);
  }

  function appendMsg(text, type) {
    const msg = document.createElement('div');
    msg.className = `chat-msg ${type}`;
    msg.textContent = text;
    messagesEl.appendChild(msg);
    messagesEl.scrollTop = messagesEl.scrollHeight;
  }

  function showTyping() {
    const msg = document.createElement('div');
    msg.className = 'chat-msg bot typing';
    msg.innerHTML = '<span></span><span></span><span></span>';
    messagesEl.appendChild(msg);
    messagesEl.scrollTop = messagesEl.scrollHeight;
    return msg;
  }

  // Simulated AI Knowledge Base Responses
  function getBotResponse(input) {
    const val = input.toLowerCase();

    if (val.includes('taj') || val.includes('mahal')) {
      return "🏛️ The Taj Mahal in Agra is a UNESCO World Heritage site and an architectural masterpiece built by Emperor Shah Jahan in memory of Mumtaz Mahal. Its pure white marble domes change colors depending on the time of day — reflecting pink tones at sunrise, sparkling white at midday, and golden under the moonlight!";
    }
    if (val.includes('hampi') || val.includes('architecture') || val.includes('ruins')) {
      return "🎨 Hampi in Karnataka was the capital of the Vijayanagara Empire in the 14th century. Its sprawling ruins contain breathtaking structures like the Stone Chariot at Vittala Temple, which has musical pillars that hum different musical notes when tapped!";
    }
    if (val.includes('khajuraho') || val.includes('temple')) {
      return "🏯 The Khajuraho Group of Monuments in Madhya Pradesh consists of stunning Nagara-style temples built by the Chandela dynasty. They are globally renowned for their majestic towers, delicate stone carvings, and celebrate life, spirituality, and art.";
    }
    if (val.includes('game') || val.includes('quiz') || val.includes('puzzle')) {
      return "🎮 We have a dedicated Games page where you can play Heritage Quizzes, Word Puzzles, and Trivia Blitz to test your knowledge of India's ancient civilizations! You can access it by clicking 'Games' in the navbar.";
    }
    if (val.includes('news') || val.includes('latest') || val.includes('discovery')) {
      return "📰 The HeriTej Pulse News Hub covers recent archaeological discoveries, conservation initiatives, and heritage preservation stories from India. Click 'News' in the navigation bar to read the full stories!";
    }
    if (val.includes('about') || val.includes('us') || val.includes('mission')) {
      return "🌿 HeriTej Pulse is dedicated to preserving the pulse of humanity by making cultural journalism and heritage stories accessible, educational, and visually captivating. Read more on our 'About' page!";
    }
    if (val.includes('hello') || val.includes('hi') || val.includes('namaste')) {
      return "🙏 Namaste! How can I assist you in exploring India's rich culture and heritage today?";
    }

    return "✨ That's a wonderful topic! India's diverse heritage spans thousands of years. I can tell you more about famous monuments (like Taj Mahal, Hampi, or Khajuraho), explain how to play our quizzes, or summarize recent archaeology news. What would you like to discover?";
  }
});
