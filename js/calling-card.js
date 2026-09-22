/**
 * Persona 5 Calling Card Generator Studio
 */
class P5CallingCardController {
  constructor() {
    this.modal = document.getElementById('calling-card-modal');
    this.closeBtn = document.getElementById('calling-card-modal-close');
    this.targetInput = document.getElementById('cc-target-input');
    this.sinSelect = document.getElementById('cc-sin-select');
    this.crimeInput = document.getElementById('cc-crime-input');
    
    // Preview elements
    this.previewSalutation = document.getElementById('cc-preview-salutation');
    this.previewBody = document.getElementById('cc-preview-body');

    // Action buttons
    this.copyBtn = document.getElementById('cc-copy-btn');
    this.printBtn = document.getElementById('cc-print-btn');
    this.triggerBtns = document.querySelectorAll('.open-calling-card-btn');

    this.init();
  }

  init() {
    this.bindEvents();
    this.updatePreview();
  }

  bindEvents() {
    this.triggerBtns.forEach(btn => {
      btn.addEventListener('mouseenter', () => window.p5Audio?.playHover());
      btn.addEventListener('click', () => {
        window.p5Audio?.playCallingCardSting();
        this.openModal();
      });
    });

    if (this.closeBtn) {
      this.closeBtn.addEventListener('click', () => this.closeModal());
    }

    if (this.modal) {
      this.modal.addEventListener('click', (e) => {
        if (e.target === this.modal) this.closeModal();
      });
    }

    [this.targetInput, this.sinSelect, this.crimeInput].forEach(el => {
      if (el) el.addEventListener('input', () => this.updatePreview());
    });

    if (this.copyBtn) {
      this.copyBtn.addEventListener('click', () => this.copyText());
    }

    if (this.printBtn) {
      this.printBtn.addEventListener('click', () => {
        window.p5Audio?.playStamp();
        window.print();
      });
    }
  }

  updatePreview() {
    const targetName = this.targetInput?.value.trim() || 'Suguru Kamoshida';
    const sin = this.sinSelect?.value || 'Lust & Pride';
    const crime = this.crimeInput?.value.trim() || 'abusing your authority and tormenting the helpless';

    if (this.previewSalutation) {
      this.previewSalutation.textContent = `Sir / Madam ${targetName},`;
    }

    if (this.previewBody) {
      this.previewBody.innerHTML = `
        The great sinner of <strong>${sin.toUpperCase()}</strong>.<br><br>
        You have indulged in your selfish desires by <em>${crime}</em>, turning a blind eye to the suffering you cause.<br><br>
        Therefore, we have decided to steal away those corrupt desires and make you confess all your sins with your own mouth.<br>
        We shall take your heart without fail tomorrow at the peak of night.
      `;
    }
  }

  prefill(targetName, sin) {
    if (this.targetInput) this.targetInput.value = targetName;
    if (this.sinSelect) {
      // Find matching sin or keep default
      const options = Array.from(this.sinSelect.options).map(o => o.value);
      const match = options.find(o => sin && sin.includes(o));
      if (match) this.sinSelect.value = match;
    }
    this.updatePreview();
  }

  openModal() {
    this.modal?.classList.add('open');
  }

  closeModal() {
    window.p5Audio?.playSlash();
    this.modal?.classList.remove('open');
  }

  copyText() {
    window.p5Audio?.playStamp();
    const targetName = this.targetInput?.value.trim() || 'Target';
    const textToCopy = `[PHANTOM THIEVES CALLING CARD]\n\nSir / Madam ${targetName},\nThe great sinner of ${this.sinSelect?.value}.\n\nYou have indulged in your selfish desires by ${this.crimeInput?.value.trim()}, turning a blind eye to the suffering you cause. Therefore, we have decided to steal away those corrupt desires and make you confess all your sins with your own mouth.\n\nFrom: The Phantom Thieves of Hearts`;

    navigator.clipboard.writeText(textToCopy).then(() => {
      const origText = this.copyBtn.textContent;
      this.copyBtn.textContent = 'COPIED TO CLIPBOARD! ★';
      this.copyBtn.style.background = 'var(--p5-yellow)';
      this.copyBtn.style.color = '#000';
      setTimeout(() => {
        this.copyBtn.textContent = origText;
        this.copyBtn.style.background = '';
        this.copyBtn.style.color = '';
      }, 2000);
    });
  }
}
