# ★ PERSONA 5 ROYAL // FERREL — PORTFOLIO ★

> *"Take Your Time. The Phantom Developer has arrived to craft code that steals hearts."*

A cinematic, interactive game-console developer portfolio inspired by the iconic UI of **Persona 5 Royal (ATLUS / SEGA)**. Built with React 18, TypeScript, Tailwind CSS, and native Web Audio API.

---

## ⚡ Tech Stack

- **Framework**: [React 18](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/) + [Vite 6](https://vite.dev/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) + Custom CSS Keyframe Animations
- **Audio & SFX**: Procedural Web Audio API Engine + Background Music Player
- **Icons**: [Lucide React](https://lucide.dev/) + Handcrafted SVG Game Vectors
- **Deployment**: [Vercel](https://vercel.com/) (Optimized static asset bundling)

---

## 📁 Project Architecture & Structure

```text
src/
├── components/
│   ├── common/             # Reusable UI components & Persona visual elements
│   │   ├── PageCutoutOverlay.tsx  # Slanted manga comic panel borders
│   │   ├── PhantomDagger.tsx      # Interactive dagger cursor & selection marker
│   │   ├── TakeYourTime.tsx       # Animated P5 spinning teacup loading indicator
│   │   └── ...
│   ├── dev/                # Developer tools & calibrators
│   │   └── PositionCalibrator.tsx # Real-time stage, camera, bubble & kanji tuner
│   ├── screens/            # Core application screen views
│   │   ├── AboutScreen.tsx        # Phantom Thief profile & stats dossier
│   │   ├── CallingCardScreen.tsx  # Interactive Calling Card generator & studio
│   │   ├── MissionsScreen.tsx     # Project archives & repository mission logs
│   │   └── SkillsScreen.tsx       # Leblanc Attic hideout & tech capability stage
│   ├── PersonaMenu.tsx     # Slanted rotary main menu wheel with SFX
│   └── PersonaVideoBg.tsx  # Dynamic HTML5 character video background controller
├── data/
│   ├── hideoutData.tsx     # Tech stack capabilities, character configs & coordinates
│   └── personaData.ts      # Mission logs, portfolio showcase dossiers & stats
├── hooks/
│   ├── useAssetPreloader.ts # Multi-stage preloader (fonts, audio, images, videos)
│   ├── usePersonaSFX.ts     # Synthesized Web Audio API sound effects (hover, slash, select)
│   └── ...
├── lib/                     # Utility helpers and class concatenation (cn)
├── App.tsx                  # Root router & Persona Iris transition state machine
├── index.css                # Custom fonts, keyframes, CRT scanlines & speedlines
└── main.tsx                 # React DOM entrypoint
```

---

## 🎮 Key Architectural Highlights

1. **Persona 5 Iris-Hold Screen Transitions**:
   - Implements a 4-phase transition state machine (`idle` ➔ `expand` ➔ `covered` ➔ `collapse`).
   - The destination screen and video background pre-render and wait until video playback starts under the closed Iris veil before opening, eliminating black frames and asset flickering across all browsers.

2. **Leblanc Attic Hideout Stage (`SkillsScreen`)**:
   - Fully interactive attic stage with 6 Phantom Thieves (Joker, Futaba, Morgana, Ryuji, Ann, Yusuke).
   - Dynamic 2D camera focal tracking: clicking a character performs cinematic zoom-in focused on their exact coordinate, reveals dynamic manga comic speech bubbles with ransom cutout typography, and summons giant kanji watermarks.
   - Decoupled static character, coordinate, and tech stack configurations in [`src/data/hideoutData.tsx`](file:///src/data/hideoutData.tsx).

3. **Procedural Web Audio Engine (`usePersonaSFX`)**:
   - Realistic UI feedback generated via the native browser Web Audio API:
     - Menu navigation blip / hover.
     - Slanted blade slash sound.
     - Card draw / selection confirmation.
     - Metal slide & cancel sounds.

4. **Multi-Asset Preloader (`useAssetPreloader`)**:
   - Zero-lag mounting across Safari, Chrome, and Firefox.
   - Pre-caches critical web fonts via `document.fonts.load()`, decodes dialogue bubble textures using `img.decode()`, and buffers dynamic loop videos.

---

## 🛠️ Developer Tools & Shortcuts

### Real-Time Position Calibrator (`Shift + C`)
When viewing the **Skills / Hideout** screen:
- Press <kbd>Shift</kbd> + <kbd>C</kbd> to toggle the **Position Calibrator Modal**.
- Adjust in real time:
  - Character offsets ($X$, $Y$), width, shadow size, and z-index.
  - Camera scale multiplier and focal origins ($X$, $Y$).
  - Floating speech bubble position, rotation, name badge offset, and quote bounding box.
  - Giant kanji watermark offset, rotation, scale, and opacity.
- Click **"Copy Config JSON"** to paste updated values directly into [`src/data/hideoutData.tsx`](file:///src/data/hideoutData.tsx).

---

## 🚀 Getting Started

```bash
# 1. Clone the repository
git clone https://github.com/FerrelHD/Persona.git
cd Persona

# 2. Install dependencies
npm install

# 3. Start development server
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

### Production Build
```bash
npm run build
npm run preview
```

---

## 📄 License & Credits

- **Developer**: [FerrelHD (Ferrel Rashad)](https://github.com/FerrelHD)
- **Design & Theme Inspiration**: **Persona 5 Royal** © ATLUS / SEGA. This is a non-commercial tribute portfolio showcasing software engineering and kinetic frontend craft.
