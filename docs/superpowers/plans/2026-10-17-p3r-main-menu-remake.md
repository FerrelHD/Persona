# Persona 3 Reload Main Menu Remake Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Remake the Main Menu in the `Persona` React+Vite+TypeScript+Tailwind project into an authentic Persona 3 Reload Pause Menu with slanted SVG inversion mask buttons, Atlus typography, P3R SFX, Makoto background video, Wavy Ripple page transitions, and an interactive Menu Position Calibrator opened via backtick (`` ` ``).

**Architecture:** 
- Ingest fonts and SFX from `Persona 3` into `Persona/public/`.
- Build a dedicated Web Audio hook `usePersona3SFX` for zero-latency audio playback.
- Implement `wavyTransition.ts` helper with dual-frequency wave polygon math for WAAPI `clipPath` screen transitions.
- Rewrite `MainMenu.tsx` using SVG mask inversion with double-text layers, bounce animation, and background video.
- Build `MenuPositionCalibrator.tsx` with live sliders and JSON export bound to keyboard shortcut (`` ` `` / `~`).

**Tech Stack:** React 18, TypeScript, Tailwind CSS, Vite, Web Audio API, Web Animations API (WAAPI), SVG Filters/Masking.

**Spec:** User requirements from chat:
- Menu labels: `MISSIONS`, `HIDEOUT`, `ABOUT`, `COMMS`
- Profile Header: `FERREL RASHAD`
- Calibrator hotkey: Backtick (`` ` `` / `~`)
- P3R SFX and font styling
- P3R Wavy ripple screen transition

## Global Constraints

- Preserve existing sub-screens (`MissionsScreen`, `AboutScreen`, `CallingCardScreen`, `SkillsScreen`) so navigation remains fully functional.
- Zero TypeScript compiler errors (`tsc --noEmit`).
- No external heavy dependencies; use pure CSS/WAAPI/SVG.
- Ensure audio unlocks cleanly on user interaction without browser blocking errors.

## Review Focus

- Audio context blocked before first user gesture: ensure fallback or unlock listener on pointerdown/keydown.
- Font loading delay: define `@font-face` with `font-display: swap` in `index.css`.
- Missing backtick handler collision when typing in inputs: ensure hotkey only triggers if `e.target` is not an `<input>` or `<textarea>`.
- Video background decoding load: ensure video muted and plays inline without unhandled rejection.
- SVG mask ID uniqueness: make mask IDs distinct per item (`p3r-mask-missions`, etc.).

---

### Task 1: Asset Pipeline & Font Setup

**Files:**
- Copy: `E:\College Stuff\Career\Persona 3\fonts\*` -> `E:\College Stuff\Career\Persona\public\fonts\`
- Copy: `E:\College Stuff\Career\Persona 3\sfx\*` -> `E:\College Stuff\Career\Persona\public\sfx\`
- Copy: `E:\College Stuff\Career\Persona\public\assets\Persona 3 Reload-20260922T211042Z-1-001\Persona 3 Reload\YTDown.com_YouTube_Media_eZEjxuQ2qyQ_Persona-3-Reload-Makoto-Yuki-Wallpaper_001_1080p.mp4` -> `E:\College Stuff\Career\Persona\public\assets\p3r-menu-bg.mp4`
- Modify: `E:\College Stuff\Career\Persona\src\index.css`

- [x] **Step 1: Copy fonts and audio files into public directory**
Copy all OTF fonts and MP3/WAV files using PowerShell copy commands.

- [x] **Step 2: Copy and rename the downloaded Makoto background video**
Copy the 1080p video into `public/assets/p3r-menu-bg.mp4`.

- [x] **Step 3: Update `src/index.css` with `@font-face` and P3R CSS tokens**
Add `@font-face` for `Rodin Pro`, `NewRodin Pro`, `Skip Std B`, and CSS variables `--color-button-1`, `--color-button-2`, `--color-button-3`, `--color-pink`, `--color-red`, `--color-fg`, plus bounce and pulse keyframes.

- [x] **Step 4: Verify asset existence on disk**
Check that files exist in `public/fonts`, `public/sfx`, and `public/assets`.

---

### Task 2: Web Audio SFX Hook (`usePersona3SFX.ts`)

**Files:**
- Create: `E:\College Stuff\Career\Persona\src\hooks\usePersona3SFX.ts`

**Interfaces:**
- Produces:
  ```typescript
  export function usePersona3SFX(): {
    playNavSFX: () => void;
    playCloseSFX: () => void;
    playMenuUtamaSFX: () => void;
  }
  ```

- [x] **Step 1: Implement `usePersona3SFX.ts` using Web Audio API**
Create audio context with shared audio buffer caching for `sfx/navigation.wav`, `sfx/close-menu.mp3`, and `sfx/menu-utama.mp3`. Include `unlockAudioEngine` on first user interaction.

- [x] **Step 2: Verify TypeScript compilation**
Run `npx tsc --noEmit` in `E:\College Stuff\Career\Persona` to ensure no typing errors.

---

### Task 3: Wavy Ripple Math & Transition Engine

**Files:**
- Create: `E:\College Stuff\Career\Persona\src\utils\wavyTransition.ts`
- Create: `E:\College Stuff\Career\Persona\src\components\common\P3RTransitionPortal.tsx`

**Interfaces:**
- Produces:
  ```typescript
  export function generateWavyPolygon(
    cx: number, cy: number, r: number, numPoints?: number,
    waves1?: number, amp1?: number, waves2?: number, amp2?: number,
    phase?: number, scaleX?: number, scaleY?: number
  ): string;
  export function calculateTargetRadius(origin: { x: number; y: number }): number;
  ```

- [x] **Step 1: Implement `wavyTransition.ts`**
Port mathematical wave generator for `clipPath` polygons from the cloned repo.

- [x] **Step 2: Implement `P3RTransitionPortal.tsx`**
Component that renders an overlay portal and exposes transition methods (`revealScreen`, `closeScreen`) using WAAPI.

---

### Task 4: MainMenu P3R Component & Inversion Mask Engine

**Files:**
- Create: `E:\College Stuff\Career\Persona\src\data\menuConfig.ts`
- Modify: `E:\College Stuff\Career\Persona\src\components\MainMenu.tsx`

**Interfaces:**
- Consumes: `usePersona3SFX`, `menuConfig.ts`
- Produces: `MainMenu` React component replacing the P5 version with P3R pause menu visuals.

- [x] **Step 1: Create `menuConfig.ts`**
Define default item coordinates for `MISSIONS`, `HIDEOUT`, `ABOUT`, `COMMS` (rotation, offsetX, offsetY, bannerScaleX, bannerScaleY, fontSize).

- [x] **Step 2: Rebuild `MainMenu.tsx`**
Implement:
  - Video background `<video src="/assets/p3r-menu-bg.mp4" loop muted autoPlay playsInline />`
  - Subtle side vignette overlay.
  - Profile header: `FERREL RASHAD` with blue accent line.
  - Side number watermark indicator (01, 02, 03, 04).
  - SVG option list with `<mask id="...">`, `<g class="selector-group">`, and double text `<text class="base-text">` and `<g mask="..."> <text class="masked-text">`.
  - Bottom-right HUD: `[ENTER] Confirm`, `[ESC] Back`.
  - Keyboard navigation (`ArrowUp`, `ArrowDown`, `Enter`).

---

### Task 5: Live Menu Position Calibrator (`MenuPositionCalibrator.tsx`)

**Files:**
- Create: `E:\College Stuff\Career\Persona\src\components\dev\MenuPositionCalibrator.tsx`

**Interfaces:**
- Consumes: menu item config state & setter.
- Produces: Interactive dev HUD with real-time sliders and "Copy Config to Clipboard" button.

- [x] **Step 1: Implement `MenuPositionCalibrator.tsx`**
Render floating dark-slate/blue Atlus HUD panel with sliders for:
  - Rotation (-30 deg to 30 deg)
  - Offset X (-300px to 300px)
  - Offset Y (-300px to 300px)
  - Font Size (2rem to 8rem)
  - Banner Scale X (0.5 to 2.5)
  - Banner Scale Y (1.0 to 5.0)
Tabs to switch between `MISSIONS`, `HIDEOUT`, `ABOUT`, `COMMS`.
Include "Copy JSON Config" button that formats and copies to clipboard.

- [x] **Step 2: Bind global hotkey listener for backtick (`` ` `` / `~`)**
Toggle calibrator visibility when backtick is pressed, ignoring key events originating from text inputs.

---

### Task 6: Integration in `App.tsx` & Complete Local Testing

**Files:**
- Modify: `E:\College Stuff\Career\Persona\src\App.tsx`

- [x] **Step 1: Wire `MainMenu` and `MenuPositionCalibrator` into `App.tsx`**
Integrate state management between menu, active screens, and calibrator config.

- [x] **Step 2: Run build and type check**
Run `npm run build` in `E:\College Stuff\Career\Persona` and ensure exit code 0.

- [x] **Step 3: Launch local preview or dev server**
Run dev server on port 3001 or 5173, verify that main menu displays cleanly with video background, font styling, hover effect, SFX, and calibrator hotkey.

