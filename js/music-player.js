/**
 * Persona 5 Acid Jazz Synthesizer & BGM Engine (Pure Web Audio API)
 * Plays an authentic looping Persona 5 groove ("When Mother Was There" / "Beneath the Mask" vibes)
 */
class P5MusicPlayer {
  constructor() {
    this.audioCtx = null;
    this.isPlaying = false;
    this.currentTrackIndex = 0;
    this.tracks = [
      { title: "When Mother Was There", album: "Persona 5 OST", bpm: 95 },
      { title: "Beneath the Mask", album: "Persona 5 OST", bpm: 82 },
      { title: "Life Will Change", album: "Persona 5 OST", bpm: 128 }
    ];

    this.timer = null;
    this.step = 0;

    this.titleEl = document.getElementById('music-track-title');
    this.playBtn = document.getElementById('music-play-btn');
    this.prevBtn = document.getElementById('music-prev-btn');
    this.nextBtn = document.getElementById('music-next-btn');
    this.discEl = document.getElementById('music-disc-spin');

    this.init();
  }

  init() {
    this.updateTrackDisplay();
    this.bindEvents();
  }

  bindEvents() {
    if (this.playBtn) {
      this.playBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        this.togglePlay();
      });
    }

    if (this.prevBtn) {
      this.prevBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        this.prevTrack();
      });
    }

    if (this.nextBtn) {
      this.nextBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        this.nextTrack();
      });
    }
  }

  initAudio() {
    if (!this.audioCtx) {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      this.audioCtx = new AudioContext();
    }
    if (this.audioCtx.state === 'suspended') {
      this.audioCtx.resume();
    }
  }

  togglePlay() {
    this.initAudio();
    this.isPlaying = !this.isPlaying;

                if (this.isPlaying) {
      if (this.playBtn) {
        this.playBtn.innerHTML = '<svg viewBox="0 0 24 24" width="22" height="22"><polygon points="6,4 10,4 10,20 6,20" fill="#000000"/><polygon points="14,4 18,4 18,20 14,20" fill="#000000"/></svg>';
      }
      if (this.discEl) this.discEl.classList.add('spinning');
      this.startSynthesizerLoop();
    } else {
      if (this.playBtn) {
        this.playBtn.innerHTML = '<svg viewBox="0 0 24 24" width="22" height="22"><polygon points="7,4 20,12 7,20" fill="#000000"/></svg>';
      }
      if (this.discEl) this.discEl.classList.remove('spinning');
      this.stopSynthesizerLoop();
    }
  }

  prevTrack() {
    this.currentTrackIndex = (this.currentTrackIndex - 1 + this.tracks.length) % this.tracks.length;
    this.updateTrackDisplay();
    if (this.isPlaying) {
      this.stopSynthesizerLoop();
      this.startSynthesizerLoop();
    }
  }

  nextTrack() {
    this.currentTrackIndex = (this.currentTrackIndex + 1) % this.tracks.length;
    this.updateTrackDisplay();
    if (this.isPlaying) {
      this.stopSynthesizerLoop();
      this.startSynthesizerLoop();
    }
  }

  updateTrackDisplay() {
    const track = this.tracks[this.currentTrackIndex];
    if (this.titleEl) {
      this.titleEl.textContent = track.title;
    }
  }

  // Melodic Persona 5 Electric Piano / Bass synthesizer loop
  startSynthesizerLoop() {
    if (!this.audioCtx) return;
    this.step = 0;

    // Chords progression for Persona 5 Acid Jazz vibe: Dm9 -> G13 -> Cmaj9 -> Fmaj7
    const chords = [
      [293.66, 349.23, 440.00, 523.25], // Dm9
      [196.00, 246.94, 329.63, 440.00], // G13
      [261.63, 329.63, 392.00, 493.88], // Cmaj9
      [174.61, 220.00, 261.63, 349.23]  // Fmaj7
    ];

    const bassNotes = [146.83, 98.00, 130.81, 87.31]; // D2, G1, C2, F1

    const intervalMs = (60 / this.tracks[this.currentTrackIndex].bpm) * 500;

    this.timer = setInterval(() => {
      if (!this.isPlaying) return;

      const chordIdx = Math.floor(this.step / 4) % chords.length;
      const beat = this.step % 4;

      // Play Rhodes chord stab on beats 0 and 2
      if (beat === 0 || beat === 2) {
        this.playChordStab(chords[chordIdx]);
      }

      // Play warm electric bass note on beats 0 and 3
      if (beat === 0 || beat === 3) {
        this.playBassNote(bassNotes[chordIdx]);
      }

      this.step++;
    }, intervalMs);
  }

  stopSynthesizerLoop() {
    if (this.timer) {
      clearInterval(this.timer);
      this.timer = null;
    }
  }

  playChordStab(freqs) {
    if (!this.audioCtx) return;
    const now = this.audioCtx.currentTime;

    freqs.forEach(freq => {
      const osc = this.audioCtx.createOscillator();
      const gain = this.audioCtx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(freq, now);

      gain.gain.setValueAtTime(0.025, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.6);

      osc.connect(gain);
      gain.connect(this.audioCtx.destination);

      osc.start(now);
      osc.stop(now + 0.6);
    });
  }

  playBassNote(freq) {
    if (!this.audioCtx) return;
    const now = this.audioCtx.currentTime;

    const osc = this.audioCtx.createOscillator();
    const gain = this.audioCtx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(freq, now);

    gain.gain.setValueAtTime(0.08, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.45);

    osc.connect(gain);
    gain.connect(this.audioCtx.destination);

    osc.start(now);
    osc.stop(now + 0.45);
  }
}

// Global music player instance
window.p5Music = null;
