/**
 * Persona 5 Submit Anonymous Target Controller
 */
class P5SubmitTargetController {
  constructor(phorumController) {
    this.phorum = phorumController;
    this.form = document.getElementById('submit-target-form');
    this.distortionSlider = document.getElementById('form-distortion-slider');
    this.distortionValDisplay = document.getElementById('distortion-val-display');
    this.statusMsg = document.getElementById('form-status-msg');

    this.init();
  }

  init() {
    if (this.distortionSlider && this.distortionValDisplay) {
      this.distortionSlider.addEventListener('input', (e) => {
        this.distortionValDisplay.textContent = `${e.target.value}%`;
      });
    }

    if (this.form) {
      this.form.addEventListener('submit', (e) => this.handleSubmit(e));
    }
  }

  handleSubmit(e) {
    e.preventDefault();

    const name = document.getElementById('form-target-name').value.trim();
    const location = document.getElementById('form-target-loc').value.trim() || 'Tokyo Met Area / Unknown Floor';
    const sin = document.getElementById('form-target-sin').value || 'Wrath';
    const description = document.getElementById('form-target-desc').value.trim();
    const distortion = parseInt(this.distortionSlider.value) || 75;

    if (!name || !description) {
      alert('Please state both the Target Name and their Distorted Crime!');
      return;
    }

    // Audio SFX
    window.p5Audio?.playStamp();

    // Create target object
    const newTarget = {
      id: `req-custom-${Date.now().toString().slice(-4)}`,
      title: `The Case of ${name}`,
      targetName: name,
      shadowName: `Shadow ${name.split(' ').pop()}`,
      location: location,
      sin: sin,
      distortionLevel: distortion,
      status: 'new',
      requestDate: 'TODAY',
      postsCount: 1,
      excerpt: description,
      fullDossier: `[ANONYMOUS REPORT TRANSMITTED VIA META-CHANNEL]: ${description}`,
      witnessQuotes: [
        { user: 'Anonymous_Whistleblower', text: `This target has gone unchecked for too long. Phantom Thieves, please verify their shadow.` }
      ]
    };

    // Save to LocalStorage
    const customList = JSON.parse(localStorage.getItem('p5_custom_targets') || '[]');
    customList.unshift(newTarget);
    localStorage.setItem('p5_custom_targets', JSON.stringify(customList));

    // Update phorum UI
    this.phorum.addTarget(newTarget);

    // Show stamp message
    if (this.statusMsg) {
      this.statusMsg.style.display = 'block';
      this.statusMsg.className = 'stamp-effect';
      this.statusMsg.innerHTML = `
        <div style="background: var(--p5-yellow); color: #000; border: 3px solid #000; padding: 12px 18px; font-family: var(--font-heading); font-size: 1.25rem; letter-spacing: 1.5px; box-shadow: 6px 6px 0px var(--p5-crimson);">
          ★ REQUEST RECEIVED! TARGET TRANSMITTED TO PHANTOM THIEVES COGNITION NETWORK ★
        </div>
      `;
      setTimeout(() => {
        if (this.statusMsg) this.statusMsg.style.display = 'none';
      }, 6000);
    }

    // Reset form
    this.form.reset();
    this.distortionSlider.value = 80;
    this.distortionValDisplay.textContent = '80%';

    // Smooth scroll to top of phorum
    const phorumSection = document.getElementById('phorum-section');
    if (phorumSection) {
      phorumSection.scrollIntoView({ behavior: 'smooth' });
    }
  }
}
