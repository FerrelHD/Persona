/**
 * Persona 5 Phan-Site Main Application Bootstrap
 */
document.addEventListener('DOMContentLoaded', () => {
  // 1. Initialize Canvas Background Spiral
  initSpiralCanvas();

  // 2. Initialize Calendar
  initCalendar();

  // 3. Convert Auto-Ransom Headings
  initRansomTitles();

  // 4. Initialize Audio Control
  initAudioToggle();

  // 5. Instantiate Core Modules
  window.p5Poll = new P5PollController();
  window.p5Phorum = new P5PhorumController();
  window.p5SubmitTarget = new P5SubmitTargetController(window.p5Phorum);
  window.p5CallingCard = new P5CallingCardController();
  window.p5Murmurs = new P5MurmursController();

  // Global hover sound for buttons and interactive items
  document.querySelectorAll('.p5-btn, .nav-link-btn, .vote-btn').forEach(el => {
    el.addEventListener('mouseenter', () => window.p5Audio?.playHover());
  });
});

/**
 * Concentric Red & Black Target Spiral Canvas
 */
function initSpiralCanvas() {
  const canvas = document.getElementById('spiral-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  window.addEventListener('resize', resize);
  resize();

  let rotation = 0;
  const ringCount = 18;
  const ringWidth = 70;

  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    const cx = canvas.width * 0.28; // Bias towards the hero logo
    const cy = canvas.height * 0.28;

    ctx.save();
    ctx.translate(cx, cy);
    ctx.rotate(rotation);

    for (let i = ringCount; i >= 1; i--) {
      ctx.beginPath();
      ctx.arc(0, 0, i * ringWidth, 0, Math.PI * 2);
      ctx.fillStyle = i % 2 === 0 ? '#0A0A0A' : '#E60012';
      ctx.fill();
    }

    ctx.restore();

    // Dark vignette overlay so content on top remains readable
    const gradient = ctx.createRadialGradient(
      canvas.width * 0.5, canvas.height * 0.5, 200,
      canvas.width * 0.5, canvas.height * 0.5, canvas.width * 0.9
    );
    gradient.addColorStop(0, 'rgba(10, 10, 10, 0.45)');
    gradient.addColorStop(1, 'rgba(10, 10, 10, 0.95)');

    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    rotation += 0.0012; // slow hypnotic spin
    requestAnimationFrame(draw);
  }

  requestAnimationFrame(draw);
}

/**
 * Live Tokyo Calendar / P5 Day Period
 */
function initCalendar() {
  const dateEl = document.getElementById('calendar-date');
  const periodEl = document.getElementById('calendar-period');

  const now = new Date();
  const months = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];
  const days = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];

  const m = months[now.getMonth()];
  const d = String(now.getDate()).padStart(2, '0');
  const dayName = days[now.getDay()];

  if (dateEl) {
    dateEl.textContent = `${m} ${d} ${dayName}`;
  }

  // Persona 5 daily period: EARLY MORNING, MORNING, AFTERNOON, AFTER SCHOOL, EVENING
  const hours = now.getHours();
  let period = 'AFTER SCHOOL';
  if (hours >= 5 && hours < 8) period = 'EARLY MORNING';
  else if (hours >= 8 && hours < 12) period = 'MORNING CLASS';
  else if (hours >= 12 && hours < 16) period = 'AFTERNOON';
  else if (hours >= 16 && hours < 19) period = 'AFTER SCHOOL';
  else if (hours >= 19 && hours < 24) period = 'EVENING';
  else period = 'DARK HOUR / MIDNIGHT';

  if (periodEl) {
    periodEl.textContent = `[${period}]`;
  }
}

/**
 * Convert plain text into individual ransom cutout letters
 */
function initRansomTitles() {
  document.querySelectorAll('.auto-ransom').forEach(el => {
    const text = el.textContent.trim();
    el.innerHTML = '';
    el.classList.add('ransom-text');

    for (let char of text) {
      if (char === ' ') {
        const space = document.createElement('span');
        space.style.width = '10px';
        space.style.display = 'inline-block';
        el.appendChild(space);
      } else {
        const span = document.createElement('span');
        span.className = 'ransom-letter';
        span.textContent = char;
        el.appendChild(span);
      }
    }
  });
}

/**
 * SFX Mute/Unmute Toggle
 */
function initAudioToggle() {
  const btn = document.getElementById('sfx-toggle');
  if (!btn) return;

  function updateBtn() {
    const muted = window.p5Audio.isMuted;
    btn.innerHTML = muted ? `🔇 SFX: OFF` : `🔊 SFX: ON`;
    btn.style.borderColor = muted ? '#666' : 'var(--p5-yellow)';
  }

  updateBtn();

  btn.addEventListener('click', () => {
    window.p5Audio.toggleMute();
    updateBtn();
  });
}
