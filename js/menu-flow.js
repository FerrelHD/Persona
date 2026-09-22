/**
 * Persona 5 Game Flow & Character Interactive Animation Controller (Powered by GSAP)
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
    this.initGSAPParallax();
    this.animateMenuEntrance();
  }

  bindEvents() {
    // 1. Splash Screen Dismiss with GSAP Cinematic Wipe
    if (this.splashScreen) {
      const dismissSplash = () => {
        window.p5Audio?.playCallingCardSting();

        if (window.gsap) {
          gsap.to(this.splashScreen, {
            yPercent: -100,
            skewY: -8,
            duration: 0.65,
            ease: "power4.inOut",
            onComplete: () => {
              this.splashScreen.classList.add('dismissed');
              this.animateMenuEntrance();
            }
          });
        } else {
          this.splashScreen.classList.add('dismissed');
          this.animateMenuEntrance();
        }
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

    // 2. Menu Navigation Choices with GSAP hover feedback
    this.menuChoices.forEach(choice => {
      choice.addEventListener('mouseenter', () => {
        window.p5Audio?.playHover();
        if (window.gsap) {
          gsap.to(choice, {
            x: 24,
            scale: 1.04,
            duration: 0.2,
            ease: "back.out(2)"
          });
          if (this.charCard) {
            gsap.to(this.charCard, {
              scale: 1.03,
              rotate: -2,
              duration: 0.25,
              ease: "power2.out"
            });
          }
        }
      });

      choice.addEventListener('mouseleave', () => {
        if (window.gsap) {
          gsap.to(choice, {
            x: 0,
            scale: 1,
            duration: 0.2,
            ease: "power2.out"
          });
          if (this.charCard) {
            gsap.to(this.charCard, {
              scale: 1,
              rotate: 0,
              duration: 0.25,
              ease: "power2.out"
            });
          }
        }
      });

      choice.addEventListener('click', () => {
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

  // GSAP Staggered Menu Infiltration Animation
  animateMenuEntrance() {
    if (!window.gsap) return;

    gsap.fromTo(".menu-options-column .ribbon-banner", 
      { x: -100, opacity: 0, skewX: 15 },
      { x: 0, opacity: 1, skewX: -7, duration: 0.45, ease: "power3.out" }
    );

    gsap.fromTo(this.menuChoices,
      { x: -160, opacity: 0, skewX: 12 },
      { 
        x: 0, 
        opacity: 1, 
        skewX: -7, 
        duration: 0.5, 
        stagger: 0.08, 
        ease: "back.out(1.8)" 
      }
    );

    if (this.charCard) {
      gsap.fromTo(this.charCard,
        { scale: 0.85, opacity: 0, x: 120, rotate: 6 },
        { scale: 1, opacity: 1, x: 0, rotate: 0, duration: 0.7, ease: "elastic.out(1, 0.75)" }
      );
    }
  }

  switchCharacter(key) {
    if (!this.characters[key] || this.currentChar === key) return;
    this.currentChar = key;
    const char = this.characters[key];

    this.charBtns.forEach(b => b.classList.remove('active'));
    const activeBtn = document.querySelector(`.char-switch-btn[data-char="${key}"]`);
    if (activeBtn) activeBtn.classList.add('active');

    // GSAP character slash flash animation
    if (window.gsap && this.charCard) {
      gsap.timeline()
        .to(this.charCard, { scale: 0.94, filter: "brightness(2) contrast(1.5)", duration: 0.12 })
        .call(() => {
          if (this.charImg) this.charImg.src = char.src;
          if (this.charTag) this.charTag.textContent = char.name;
        })
        .to(this.charCard, { scale: 1, filter: "brightness(1) contrast(1.08)", duration: 0.35, ease: "back.out(2)" });
    } else {
      if (this.charImg) this.charImg.src = char.src;
      if (this.charTag) this.charTag.textContent = char.name;
    }
  }

  // Smooth GSAP Parallax mouse movement
  initGSAPParallax() {
    if (!this.charCard || !window.gsap) return;

    const quickX = gsap.quickTo(this.charCard, "x", { duration: 0.4, ease: "power2.out" });
    const quickY = gsap.quickTo(this.charCard, "y", { duration: 0.4, ease: "power2.out" });

    window.addEventListener('mousemove', (e) => {
      if (this.currentScreen !== 'screen-main-menu') return;
      const xOffset = (e.clientX / window.innerWidth - 0.5) * 36;
      const yOffset = (e.clientY / window.innerHeight - 0.5) * 36;
      quickX(xOffset);
      quickY(yOffset);
    });
  }

  navigateTo(screenId) {
    const prevScreen = document.getElementById(this.currentScreen);
    const targetScreen = document.getElementById(screenId);
    if (!targetScreen) return;

    if (window.gsap && prevScreen) {
      gsap.to(prevScreen, {
        opacity: 0,
        y: -15,
        duration: 0.2,
        ease: "power2.in",
        onComplete: () => {
          this.screens.forEach(s => s.classList.remove('active'));
          targetScreen.classList.add('active');
          this.currentScreen = screenId;
          window.scrollTo({ top: 0, behavior: 'smooth' });

          gsap.fromTo(targetScreen, 
            { opacity: 0, y: 30, skewY: 2 },
            { opacity: 1, y: 0, skewY: 0, duration: 0.4, ease: "power3.out" }
          );

          if (screenId === 'screen-main-menu') {
            this.animateMenuEntrance();
          }
        }
      });
    } else {
      this.screens.forEach(s => s.classList.remove('active'));
      targetScreen.classList.add('active');
      this.currentScreen = screenId;
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }
}

// Global flow instance
window.p5Flow = null;
