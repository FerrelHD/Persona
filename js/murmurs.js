/**
 * Persona 5 Citizen Murmurs / Tokyo Netizen Feed Controller with Authentic IM Chat UI
 */
class P5MurmursController {
  constructor() {
    this.listEl = document.getElementById('murmurs-list');
    this.inputEl = document.getElementById('murmur-user-input');
    this.submitBtn = document.getElementById('murmur-submit-btn');

    this.murmurs = [
      { id: 'm-1', type: 'received', author: 'Mishima', avatar: 'assets/joker.jpg', text: 'Target requests incoming! Everyone stay alert.' },
      { id: 'm-2', type: 'received', author: 'Ryuji', avatar: 'assets/morgana.jpg', text: 'FOR REAL?! Look at the approval rating climbing!' },
      { id: 'm-3', type: 'sent', author: 'You', text: 'We shall steal their heart without fail.' }
    ];

    this.pool = [
      { author: 'Student', avatar: 'assets/joker.jpg', text: 'Did Kamoshida really confess? Holy crap!' },
      { author: 'Mishima', avatar: 'assets/joker.jpg', text: 'The Thieves are reading our board right now!' },
      { author: 'Citizen', avatar: 'assets/morgana.jpg', text: 'Please investigate the corrupt CEO next!' }
    ];

    this.init();
  }

  init() {
    this.render();
    this.bindEvents();
    this.startAutoFeed();
  }

  bindEvents() {
    if (this.submitBtn && this.inputEl) {
      this.submitBtn.addEventListener('click', () => this.handleUserComment());
      this.inputEl.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') this.handleUserComment();
      });
    }
  }

  handleUserComment() {
    const text = this.inputEl.value.trim();
    if (!text) return;

    window.p5Audio?.playSlash();

    const newComment = {
      id: `m-usr-${Date.now()}`,
      type: 'sent',
      author: 'You',
      text: text
    };

    this.murmurs.push(newComment);
    this.inputEl.value = '';
    this.render();
    this.scrollToBottom();
  }

  startAutoFeed() {
    let poolIndex = 0;
    setInterval(() => {
      if (this.pool.length === 0) return;
      const nextComment = this.pool[poolIndex % this.pool.length];
      poolIndex++;

      this.murmurs.push({
        id: `m-auto-${Date.now()}`,
        type: 'received',
        author: nextComment.author,
        avatar: nextComment.avatar,
        text: nextComment.text
      });

      if (this.murmurs.length > 25) {
        this.murmurs.shift();
      }

      this.render();
      this.scrollToBottom();
    }, 12000);
  }

  scrollToBottom() {
    if (this.listEl) {
      this.listEl.scrollTop = this.listEl.scrollHeight;
    }
  }

  render() {
    if (!this.listEl) return;

    this.listEl.innerHTML = this.murmurs.map(m => {
      if (m.type === 'sent') {
        return `
          <div class="p5-sent-chat-row">
            <div class="sent-chat-container">
              <img class="sent-chat-bg-img" src="assets/Sent chat.png" alt="Sent Chat Bubble">
              <div class="sent-message-text">${m.text}</div>
            </div>
          </div>
        `;
      } else {
        return `
          <div class="p5-received-chat-row">
            <div class="received-chat-container">
              <img class="received-chat-bg-img" src="assets/Received chat 1.png" alt="Received Chat Bubble">
              <div class="received-avatar-box">
                <img class="received-avatar-img" src="${m.avatar || 'assets/joker.jpg'}" alt="${m.author}">
              </div>
              <div class="received-message-text">${m.text}</div>
            </div>
          </div>
        `;
      }
    }).join('');
  }
}
