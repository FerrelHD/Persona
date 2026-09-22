/**
 * Persona 5 Citizen Murmurs / Tokyo Netizen Feed Controller
 */
class P5MurmursController {
  constructor() {
    this.listEl = document.getElementById('murmurs-list');
    this.inputEl = document.getElementById('murmur-user-input');
    this.submitBtn = document.getElementById('murmur-submit-btn');
    this.murmurs = [...P5_INITIAL_MURMURS];
    this.pool = [...P5_MURMURS_POOL];

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
      author: 'You (Anonymous Citizen)',
      role: 'fan',
      text: text,
      time: 'Just now'
    };

    this.murmurs.unshift(newComment);
    this.inputEl.value = '';
    this.render();
  }

  startAutoFeed() {
    let poolIndex = 0;
    setInterval(() => {
      if (this.pool.length === 0) return;
      const nextComment = this.pool[poolIndex % this.pool.length];
      poolIndex++;

      this.murmurs.unshift({
        id: `m-auto-${Date.now()}`,
        author: nextComment.author,
        role: nextComment.role,
        text: nextComment.text,
        time: 'Just now'
      });

      // Keep length manageable
      if (this.murmurs.length > 20) {
        this.murmurs.pop();
      }

      this.render();
    }, 12000);
  }

  render() {
    if (!this.listEl) return;

    this.listEl.innerHTML = this.murmurs.map(m => {
      let roleClass = 'author-neutral';
      if (m.role === 'admin') roleClass = 'author-admin';
      else if (m.role === 'fan') roleClass = 'author-fan';
      else if (m.role === 'skeptic') roleClass = 'author-skeptic';

      return `
        <div class="chat-bubble">
          <div class="chat-bubble-author ${roleClass}">
            <span>▶</span> ${m.author}
          </div>
          <div class="chat-bubble-text">${m.text}</div>
          <div class="chat-bubble-time">${m.time}</div>
        </div>
      `;
    }).join('');
  }
}
