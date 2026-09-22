/**
 * Persona 5 Public Approval Rating (Poll of the Week) Controller (Powered by GSAP)
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
      } catch (e) {}
    }
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

    if (!this.pollData.hasVoted) {
      if (choice === 'yes') this.pollData.yesVotes += 1;
      else this.pollData.noVotes += 1;
      this.pollData.hasVoted = true;
      this.pollData.userChoice = choice;
    } else {
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

    // GSAP Screen Impact Shake
    if (window.gsap) {
      gsap.fromTo("#poll-section",
        { x: -10, rotate: -1 },
        { x: 0, rotate: 0, duration: 0.35, ease: "elastic.out(1.5, 0.3)" }
      );
    }
  }

  render(animate = true) {
    const pct = this.getPercentage();

    if (this.barFillYes) {
      if (animate && window.gsap) {
        gsap.to(this.barFillYes, {
          width: `${pct}%`,
          duration: 0.8,
          ease: "elastic.out(1, 0.6)"
        });
      } else {
        this.barFillYes.style.width = `${pct}%`;
      }
      this.barFillYes.textContent = `${pct}%`;
    }

    if (this.yesCountEl) {
      this.yesCountEl.textContent = this.pollData.yesVotes.toLocaleString();
    }
    if (this.noCountEl) {
      this.noCountEl.textContent = this.pollData.noVotes.toLocaleString();
    }

    if (this.numberEl) {
      if (animate && window.gsap) {
        const obj = { val: parseInt(this.numberEl.textContent) || 0 };
        gsap.to(obj, {
          val: pct,
          duration: 0.7,
          ease: "power2.out",
          onUpdate: () => {
            this.numberEl.textContent = Math.round(obj.val);
          }
        });
        gsap.fromTo(this.numberEl, { scale: 1.35, color: "#fff" }, { scale: 1, color: "var(--p5-yellow)", duration: 0.45, ease: "back.out(2)" });
      } else {
        this.numberEl.textContent = pct;
      }
    }

    if (this.votedMsgEl && this.pollData.hasVoted) {
      this.votedMsgEl.style.display = 'block';
      this.votedMsgEl.innerHTML = `YOUR VOTE: <span style="color: #fff; background: var(--p5-crimson); padding: 2px 6px;">${this.pollData.userChoice.toUpperCase()}</span> HAS BEEN LOGGED BY THE META-ROUTER`;
      if (animate && window.gsap) {
        gsap.fromTo(this.votedMsgEl, { scale: 0.8, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.3, ease: "back.out(2)" });
      }
    }
  }
}
