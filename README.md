# 🎩 PHAN-SITE // The Official Phantom Thieves Channel

> *"Do you suffer under the tyranny of corrupt adults? Post your cries to this meta-channel. We shall steal their heart without fail."*

An authentic, fully interactive desktop web portal inspired by the **Phan-Site (Phantom Thieves Channel)** from **Persona 5 (ATLUS)**. Built with high-contrast acid punk aesthetics, comic book jagged ribbons, Web Audio API sound synthesis, and real-time interactive mechanics.

---

## ⚡ Live Features

1. **🔴 Concentric Spiral Target & Comic Aesthetics**:
   * Dynamic HTML5 canvas rendering rotating red-and-black concentric rings.
   * Halftone Benday dots and CRT scanline overlay.
   * "Ransom-Note" cut-out newspaper letter styling with randomized tilted badges.

2. **📊 Poll of the Week (Public Approval Rating)**:
   * *"Do you believe in the Phantom Thieves of Hearts?"*
   * Giant kinetic counter with dynamic red/black striped approval gauge.
   * Real-time voting mechanics with instant counter animations and `localStorage` persistence.

3. **📜 Phorum / Mementos Target Request Board**:
   * Pre-loaded with authentic Persona 5 Mementos cases (*"The Bark and Bite of a Bully"*, *"Winners Don't Use Cheats!"*, *"Who's Muscling in Yongen-Jaya?"*, etc.).
   * Filterable by status: `ALL TARGETS`, `NEW REQUESTS`, `UNDER INVESTIGATION`, and `HEART CHANGED`.
   * Real-time search filter for targets, locations, and crimes.
   * Interactive **Investigation Dossier Modal** with target identities, shadow aliases, distortion levels, and citizen testimonials.

4. **📮 Transmit Anonymous Request (Submit Target)**:
   * Encrypted submission terminal allowing visitors to report real or fictional corrupt targets.
   * Select target name, cognitive location, cardinal sin, distortion meter, and evidence.
   * Submitting generates a new target card on the live board and plays a heavy stamp sound effect.

5. **💌 Calling Card Generator Studio**:
   * Official declaration of theft generator styled in crimson and black paper collage.
   * Customize the recipient name, cardinal sin, and heinous crimes.
   * Live preview with official Phantom Thieves emblem and seal.
   * Instant action to **Copy Proclamation Text** or **Print / Export Card**.

6. **💬 Tokyo Citizen Murmurs**:
   * Live scrolling feed of civilian chatter, rumors, and debate across Tokyo.
   * Interactive quick-input box allowing visitors to chime in anonymously.

7. **🔊 Synthesized Web Audio API SFX**:
   * Zero external audio files required, zero latency.
   * Menu hover blips, slash transitions, and heavy stamp impacts.
   * Includes sound toggle button (`SFX: ON` / `SFX: OFF`).

---

## 🛠️ Technology Stack

* **Core**: Pure Semantic HTML5 & Vanilla JavaScript (ES6+ Classes)
* **Styling**: Vanilla CSS3 (Custom Properties, Grid & Flexbox, `clip-path`, `transform: skew()`)
* **Audio**: Native Web Audio API
* **Graphics**: Pure SVG Vectors & HTML5 Canvas
* **Typography**: Google Fonts (*Bangers*, *Bebas Neue*, *Outfit*, *Rubik Glitch*)

---

## 🚀 How to Run Locally

You can open `index.html` directly in any modern desktop web browser:

```bash
# Option 1: Open index.html directly
start index.html

# Option 2: Run via local web server (npx serve, Python, or Live Server)
npx -y serve .
# or
python -m http.server 8080
```

---

## ⚖️ Disclaimer & Credits

This project is a fan-made interactive tribute to **Persona 5** developed by **ATLUS / SEGA**. All character names, lore, and visual themes belong to their respective copyright holders.
