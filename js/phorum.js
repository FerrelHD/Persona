/**
 * Persona 5 Phorum / Target Board Controller
 */
class P5PhorumController {
  constructor() {
    this.container = document.getElementById('target-cards-container');
    this.filterTabs = document.querySelectorAll('.filter-tab-btn');
    this.searchInput = document.getElementById('phorum-search');
    this.currentFilter = 'all';
    this.searchQuery = '';
    this.targets = this.loadTargets();

    this.modal = document.getElementById('dossier-modal');
    this.modalCloseBtn = document.getElementById('dossier-modal-close');
    this.modalContent = document.getElementById('dossier-modal-body');

    this.init();
  }

  loadTargets() {
    const customTargets = JSON.parse(localStorage.getItem('p5_custom_targets') || '[]');
    // Combine custom user submitted targets first, then initial lore targets
    return [...customTargets, ...P5_INITIAL_TARGETS];
  }

  init() {
    this.render();
    this.bindEvents();
  }

  bindEvents() {
    // Filter tabs
    this.filterTabs.forEach(tab => {
      tab.addEventListener('mouseenter', () => window.p5Audio?.playHover());
      tab.addEventListener('click', (e) => {
        window.p5Audio?.playSlash();
        this.filterTabs.forEach(t => t.classList.remove('active'));
        e.currentTarget.classList.add('active');
        this.currentFilter = e.currentTarget.getAttribute('data-filter');
        this.render();
      });
    });

    // Search input
    if (this.searchInput) {
      this.searchInput.addEventListener('input', (e) => {
        this.searchQuery = e.target.value.toLowerCase().trim();
        this.render();
      });
    }

    // Modal close
    if (this.modalCloseBtn) {
      this.modalCloseBtn.addEventListener('mouseenter', () => window.p5Audio?.playHover());
      this.modalCloseBtn.addEventListener('click', () => this.closeModal());
    }

    if (this.modal) {
      this.modal.addEventListener('click', (e) => {
        if (e.target === this.modal) this.closeModal();
      });
    }

    // Escape key
    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && this.modal?.classList.contains('open')) {
        this.closeModal();
      }
    });
  }

  render() {
    if (!this.container) return;

    let filtered = this.targets.filter(target => {
      const matchesFilter = this.currentFilter === 'all' || target.status === this.currentFilter;
      const matchesSearch = !this.searchQuery ||
        target.title.toLowerCase().includes(this.searchQuery) ||
        target.targetName.toLowerCase().includes(this.searchQuery) ||
        target.excerpt.toLowerCase().includes(this.searchQuery) ||
        target.location.toLowerCase().includes(this.searchQuery);

      return matchesFilter && matchesSearch;
    });

    if (filtered.length === 0) {
      this.container.innerHTML = `
        <div style="background: #141414; border: 2px dashed #444; padding: 40px; text-align: center; color: var(--p5-yellow); font-family: var(--font-heading); font-size: 1.3rem;">
          [!] NO TARGETS FOUND MATCHING THIS FREQUENCY
        </div>
      `;
      return;
    }

    this.container.innerHTML = filtered.map(target => {
      let badgeClass = 'badge-new';
      let badgeLabel = 'NEW REQUEST';
      if (target.status === 'investigating') {
        badgeClass = 'badge-investigating';
        badgeLabel = 'UNDER INVESTIGATION';
      } else if (target.status === 'reformed') {
        badgeClass = 'badge-reformed';
        badgeLabel = 'HEART CHANGED';
      }

      return `
        <div class="target-card" data-id="${target.id}">
          <div class="target-card-header">
            <span class="target-status-badge ${badgeClass}">${badgeLabel}</span>
            <span class="target-date">${target.requestDate}</span>
          </div>
          <h3 class="target-title">${target.title}</h3>
          <div class="target-name-line">
            <span>TARGET</span> ${target.targetName} 
            <small style="color: #888; font-weight: normal; margin-left: auto;">${target.location}</small>
          </div>
          <p class="target-excerpt">${target.excerpt}</p>
          
          <div class="distortion-gauge-wrapper">
            <span class="distortion-label">DISTORTION</span>
            <div class="distortion-track">
              <div class="distortion-fill" style="width: ${target.distortionLevel}%"></div>
            </div>
            <span class="distortion-value">${target.distortionLevel}%</span>
          </div>

          <div class="target-card-footer">
            <div class="target-posts-count">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2z"/></svg>
              ${target.postsCount} Responses
            </div>
            <div style="color: var(--p5-yellow); font-family: var(--font-heading); letter-spacing: 1px;">
              CLICK TO VIEW DOSSIER ▶
            </div>
          </div>
        </div>
      `;
    }).join('');

    // Attach card click listeners
    const cards = this.container.querySelectorAll('.target-card');
    cards.forEach(card => {
      card.addEventListener('mouseenter', () => window.p5Audio?.playHover());
      card.addEventListener('click', () => {
        const id = card.getAttribute('data-id');
        this.openDossier(id);
      });
    });
  }

  openDossier(id) {
    const target = this.targets.find(t => t.id === id);
    if (!target) return;

    window.p5Audio?.playSlash();

    let badgeClass = target.status === 'reformed' ? 'badge-reformed' : (target.status === 'investigating' ? 'badge-investigating' : 'badge-new');
    let badgeLabel = target.status === 'reformed' ? 'HEART CHANGED' : (target.status === 'investigating' ? 'INVESTIGATION IN PROGRESS' : 'NEW TARGET POSTED');

    const testimoniesHtml = (target.witnessQuotes || []).map(q => `
      <div style="background: #1c1c1c; border-left: 4px solid var(--p5-crimson); padding: 10px 14px; margin-bottom: 8px;">
        <div style="font-family: var(--font-heading); color: var(--p5-yellow); font-size: 0.9rem; margin-bottom: 2px;">
          ${q.user}
        </div>
        <div style="font-size: 0.95rem; color: #eee;">
          "${q.text}"
        </div>
      </div>
    `).join('');

    this.modalContent.innerHTML = `
      <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 15px; border-bottom: 2px solid var(--p5-crimson); padding-bottom: 10px;">
        <span class="target-status-badge ${badgeClass}" style="font-size: 1.1rem; padding: 4px 14px;">${badgeLabel}</span>
        <span style="font-family: var(--font-accent); color: var(--p5-yellow);">ID: ${target.id.toUpperCase()}</span>
      </div>

      <h2 style="font-family: var(--font-display); font-size: 2.3rem; color: #fff; margin-bottom: 10px;">
        ${target.title}
      </h2>

      <div style="background: rgba(230,0,18,0.15); border: 2px solid var(--p5-crimson); padding: 14px 18px; margin-bottom: 20px;">
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 10px; font-size: 0.95rem;">
          <div><strong style="color: var(--p5-yellow); font-family: var(--font-heading);">REAL IDENTITY:</strong> ${target.targetName}</div>
          <div><strong style="color: var(--p5-yellow); font-family: var(--font-heading);">SHADOW ALIAS:</strong> ${target.shadowName || 'Unknown Shadow'}</div>
          <div><strong style="color: var(--p5-yellow); font-family: var(--font-heading);">COGNITIVE AREA:</strong> ${target.location}</div>
          <div><strong style="color: var(--p5-yellow); font-family: var(--font-heading);">SIN ROOT:</strong> ${target.sin || 'Distorted Desire'}</div>
        </div>
      </div>

      <div style="margin-bottom: 20px;">
        <h4 style="color: var(--p5-yellow); font-family: var(--font-heading); font-size: 1.2rem; margin-bottom: 6px;">
          INVESTIGATION SUMMARY
        </h4>
        <p style="font-size: 1.05rem; line-height: 1.6; color: #f0f0f0;">
          ${target.fullDossier || target.excerpt}
        </p>
      </div>

      <div style="margin-bottom: 25px;">
        <h4 style="color: var(--p5-yellow); font-family: var(--font-heading); font-size: 1.2rem; margin-bottom: 10px;">
          WITNESS STATEMENTS & PUBLIC CHATTER (${target.postsCount} POSTS)
        </h4>
        <div style="max-height: 180px; overflow-y: auto; padding-right: 6px;">
          ${testimoniesHtml || '<p style="color: #888;">No classified testimonies unlocked yet.</p>'}
        </div>
      </div>

      <div style="display: flex; gap: 12px; justify-content: flex-end;">
        <button class="p5-btn p5-btn-red" id="dossier-callcard-btn" style="font-size: 1rem; padding: 10px 20px;">
          ISSUE CALLING CARD FOR THIS TARGET ▶
        </button>
      </div>
    `;

    this.modal.classList.add('open');

    // Hook up calling card shortcut
    const callCardBtn = document.getElementById('dossier-callcard-btn');
    if (callCardBtn) {
      callCardBtn.addEventListener('click', () => {
        this.closeModal();
        if (window.p5CallingCard) {
          window.p5CallingCard.prefill(target.targetName, target.sin);
          window.p5CallingCard.openModal();
        }
      });
    }
  }

  closeModal() {
    window.p5Audio?.playSlash();
    this.modal?.classList.remove('open');
  }

  addTarget(newTarget) {
    this.targets.unshift(newTarget);
    this.render();
  }
}
