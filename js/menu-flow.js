/**
 * Persona 5 Game Flow & Character Interactive Animation Controller
 */
class P5FlowController {
  constructor() {
    this.splashScreen = document.getElementById('p5-splash-screen');
    this.screens = document.querySelectorAll('.p5-screen-view');
    this.menuChoices = document.querySelectorAll('.menu-choice-item');
    this.backBtns = document.querySelectorAll('.p5-back-btn');
    this.charImg = document.getElementById('menu-character-img');
    this.charTag = document.getElementById('menu-char-tag');
    this.charBtns = document.querySelectorAll('.char-switch-btn');
    this.charCard = document.getElementById('character-portrait-card');

    this.characters = {
      joker: {
        name: 'JOKER',
        src: 'assets/joker.jpg',
        quote: 'Show me your true form!'
      },
      morgana: {
        name: 'MONA',
        src: 'assets/morgana.jpg',
        quote: 'Looking cool, Joker!'
      }
    };

    this.currentChar = 'joker';
    this.currentScreen = 'screen-main-menu';

    this.init();
  }

  init() {
    this.bindEvents();
    this.initParallax();
  }

  bindEvents() {
    // 1. Splash Screen Dismiss
    if (this.splashScreen) {
      const dismissSplash = () => {
        window.p5Audio?.playCallingCardSting();
        this.splashScreen.classList.add('dismissed');
      };

      this.splashScreen.addEventListener('click', dismissSplash);
      window.addEventListener('keydown', (e) => {
        if (!this.splashScreen.classList.contains('dismissed')) {
          dismissSplash();
        } else if (e.key === 'Escape' && this.currentScreen !== 'screen-main-menu') {
          this.navigateTo('screen-main-menu');
        }
      });
    }

    // 2. Menu Navigation Choices
    this.menuChoices.forEach(choice => {
      choice.addEventListener('mouseenter', () => {
        window.p5Audio?.playHover();
        this.animateCharacterFocus();
      });

      choice.addEventListener('click', (e) => {
        const targetScreen = choice.getAttribute('data-target-screen');
        if (targetScreen) {
          window.p5Audio?.playSlash();
          this.navigateTo(targetScreen);
        }
      });
    });

    // 3. Back to Main Menu buttons
    this.backBtns.forEach(btn => {
      btn.addEventListener('mouseenter', () => window.p5Audio?.playHover());
      btn.addEventListener('click', () => {
        window.p5Audio?.playSlash();
        this.navigateTo('screen-main-menu');
      });
    });

    // 4. Character Switcher Buttons (Joker / Morgana)
    this.charBtns.forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        window.p5Audio?.playStamp();
        const charKey = btn.getAttribute('data-char');
        this.switchCharacter(charKey);
      });
    });
  }

  switchCharacter(key) {
    if (!this.characters[key] || this.currentChar === key) return;
    this.currentChar = key;
    const char = this.characters[key];

    this.charBtns.forEach(b => b.classList.remove('active'));
    const activeBtn = document.querySelector(`.char-switch-btn[data-char="${key}"]`);
    if (activeBtn) activeBtn.classList.add('active');

    // Slash flash effect
    if (this.charCard) {
      this.charCard.classList.add('slash-active');
      setTimeout(() => this.charCard.classList.remove('slash-active'), 400);
    }

    if (this.charImg) {
      this.charImg.src = char.src;
    }
    if (this.charTag) {
      this.charTag.textContent = char.name;
    }
  }

  animateCharacterFocus() {
    if (!this.charCard) return;
    this.charCard.style.transform = 'skew(var(--skew-medium)) scale(1.03) translate(-4px, -4px)';
    this.charCard.style.borderColor = 'var(--p5-yellow)';
    setTimeout(() => {
      if (this.charCard) {
        this.charCard.style.transform = 'skew(var(--skew-medium))';
        this.charCard.style.borderColor = 'var(--p5-white)';
      }
    }, 250);
  }

  initParallax() {
    if (!this.charCard) return;
    window.addEventListener('mousemove', (e) => {
      if (this.currentScreen !== 'screen-main-menu') return;
      const x = (e.clientX / window.innerWidth - 0.5) * 18;
      const y = (e.clientY / window.innerHeight - 0.5) * 18;
      this.charCard.style.transform = `skew(var(--skew-medium)) translate(${x}px, ${y}px)`;
    });
  }

  navigateTo(screenId) {
    this.screens.forEach(s => s.classList.remove('active'));
    const target = document.getElementById(screenId);
    if (target) {
      target.classList.add('active');
      this.currentScreen = screenId;
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }
}

// Global flow instance
window.p5Flow = null;
