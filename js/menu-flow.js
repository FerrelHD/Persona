/**
 * Persona 5 Game Flow & Full-Body Character Background Parallax (Powered by GSAP)
 */
class P5FlowController {
  constructor() {
    this.splashScreen = document.getElementById('p5-splash-screen');
    this.screens = document.querySelectorAll('.p5-screen-view');
    this.menuChoices = document.querySelectorAll('.menu-choice-item');
    this.backBtns = document.querySelectorAll('.p5-back-btn');
    this.charWrapper = document.getElementById('character-silhouette-wrap');
    this.charImg = document.getElementById('character-standalone-img');

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

    // 2. Menu Navigation Choices with GSAP hover & character focus
    this.menuChoices.forEach(choice => {
      choice.addEventListener('mouseenter', () => {
        window.p5Audio?.playHover();
        if (window.gsap) {
          gsap.to(choice, {
            x: 28,
            scale: 1.04,
            duration: 0.2,
            ease: "back.out(2)"
          });
          if (this.charWrapper) {
            gsap.to(this.charWrapper, {
              scale: 1.05,
              x: -15,
              rotate: -1.5,
              duration: 0.3,
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
          if (this.charWrapper) {
            gsap.to(this.charWrapper, {
              scale: 1,
              x: 0,
              rotate: 0,
              duration: 0.3,
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

    if (this.charWrapper) {
      gsap.fromTo(this.charWrapper,
        { scale: 0.88, opacity: 0, x: 80, y: 50 },
        { scale: 1, opacity: 1, x: 0, y: 0, duration: 0.8, ease: "power3.out" }
      );
    }
  }

  // Fluid Full-Body Parallax mouse physics
  initGSAPParallax() {
    if (!this.charWrapper || !window.gsap) return;

    const quickX = gsap.quickTo(this.charWrapper, "x", { duration: 0.5, ease: "power2.out" });
    const quickY = gsap.quickTo(this.charWrapper, "y", { duration: 0.5, ease: "power2.out" });
    const quickRot = gsap.quickTo(this.charWrapper, "rotate", { duration: 0.6, ease: "power2.out" });

    window.addEventListener('mousemove', (e) => {
      if (this.currentScreen !== 'screen-main-menu') return;
      const xOffset = (e.clientX / window.innerWidth - 0.5) * 45;
      const yOffset = (e.clientY / window.innerHeight - 0.5) * 25;
      const rotOffset = (e.clientX / window.innerWidth - 0.5) * -3;
      quickX(xOffset);
      quickY(yOffset);
      quickRot(rotOffset);
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
