/**
 * Persona 5 Public Approval Rating (Poll of the Week) Controller
 */
class P5PollController {
  constructor() {
    this.pollData = this.loadData();
    this.numberEl = document.getElementById('poll-number');
    this.barFillYes = document.getElementById('poll-bar-yes');
    this.yesCountEl = document.getElementById('poll-yes-count');
    this.noCountEl = document.getElementById('poll-no-count');
    this.votedMsgEl = document.getElementById('poll-voted-msg');
    this.btnYes = document.getElementById('vote-btn-yes');
    this.btnNo = document.getElementById('vote-btn-no');

    this.init();
  }

  loadData() {
    const saved = localStorage.getItem('p5_poll_data');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        // Fallback
      }
    }
    // Default starting approval rating matching P5 mid-game state (44% or customizable)
    return {
      yesVotes: 14218,
      noVotes: 18095,
      hasVoted: false,
      userChoice: null
    };
  }

  saveData() {
    localStorage.setItem('p5_poll_data', JSON.stringify(this.pollData));
  }

  getPercentage() {
    const total = this.pollData.yesVotes + this.pollData.noVotes;
    if (total === 0) return 50;
    return Math.round((this.pollData.yesVotes / total) * 100);
  }

  init() {
    this.render(false);
    this.bindEvents();
  }

  bindEvents() {
    if (this.btnYes) {
      this.btnYes.addEventListener('mouseenter', () => window.p5Audio?.playHover());
      this.btnYes.addEventListener('click', () => this.castVote('yes'));
    }
    if (this.btnNo) {
      this.btnNo.addEventListener('mouseenter', () => window.p5Audio?.playHover());
      this.btnNo.addEventListener('click', () => this.castVote('no'));
    }
  }

  castVote(choice) {
    window.p5Audio?.playStamp();

    // If user changed choice or voting first time
    if (!this.pollData.hasVoted) {
      if (choice === 'yes') this.pollData.yesVotes += 1;
      else this.pollData.noVotes += 1;
      this.pollData.hasVoted = true;
      this.pollData.userChoice = choice;
    } else {
      // Allow switching vote dynamically
      if (this.pollData.userChoice !== choice) {
        if (choice === 'yes') {
          this.pollData.yesVotes += 1;
          this.pollData.noVotes = Math.max(0, this.pollData.noVotes - 1);
        } else {
          this.pollData.noVotes += 1;
          this.pollData.yesVotes = Math.max(0, this.pollData.yesVotes - 1);
        }
        this.pollData.userChoice = choice;
      }
    }

    this.saveData();
    this.render(true);

    // Visual feedback ripple on body
    document.body.classList.add('slash-active');
    setTimeout(() => document.body.classList.remove('slash-active'), 400);
  }

  render(animate = true) {
    const pct = this.getPercentage();

    if (this.barFillYes) {
      this.barFillYes.style.width = `${pct}%`;
      this.barFillYes.textContent = `${pct}%`;
    }

    if (this.yesCountEl) {
      this.yesCountEl.textContent = this.pollData.yesVotes.toLocaleString();
    }
    if (this.noCountEl) {
      this.noCountEl.textContent = this.pollData.noVotes.toLocaleString();
    }

    if (this.numberEl) {
      if (animate) {
        this.animateCounter(parseInt(this.numberEl.textContent) || 0, pct);
      } else {
        this.numberEl.textContent = pct;
      }
    }

    if (this.votedMsgEl && this.pollData.hasVoted) {
      this.votedMsgEl.style.display = 'block';
      this.votedMsgEl.innerHTML = `YOUR VOTE: <span style="color: #fff; background: var(--p5-crimson); padding: 2px 6px;">${this.pollData.userChoice.toUpperCase()}</span> HAS BEEN LOGGED BY THE META-ROUTER`;
    }
  }

  animateCounter(start, end) {
    const duration = 600;
    const startTime = performance.now();
    const step = (currentTime) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const current = Math.floor(start + (end - start) * progress);
      if (this.numberEl) {
        this.numberEl.textContent = current;
      }
      if (progress < 1) {
        requestAnimationFrame(step);
      } else {
        if (this.numberEl) this.numberEl.textContent = end;
      }
    };
    requestAnimationFrame(step);
  }
}
