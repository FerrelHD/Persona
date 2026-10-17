# Persona 3 Reload: Master Implementation Plan — Mall Atrium Hideout, Real Asset Preloader, & PlayStation HUD

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Remake the Hideout screen (`SkillsScreen.tsx`) into the grand **Paulownia Mall Atrium** with 6 SEES Persona 3 characters, a 2.5D foreground occlusion layer using `fountain water.png`, P3R-styled dialog bubbles and Kanji badges, replace legacy P5 Transit Loading with a **100% Real Asset Preloader (0% – 100%)** to eliminate all glitches/pop-ins, and upgrade Main Menu bottom-right HUD to polished PlayStation controller vector icons (`✕` & `○`).

**Architecture:** 
- Build a genuine preloader engine (`useRealAssetPreloader.ts`) that tracks decoding of video (`p3r-menu-bg.mp4`), OTF/Kanji fonts, Web Audio SFX, Mall background, 6 character cutouts, and fountain water before releasing the app with zero visual pop-in.
- Replace legacy P5 subway loading screen with `SimpleLoadingScreen.tsx` featuring a deep blue `#001233` canvas, rotating cyan P3R ring, and authentic real-time percentage counter (`0% - 100%`).
- Ingest `Cinematic Mall Atrium with Central Fountain.png` as stage background and `fountain water.png` at `z-index: 20` to realistically occlude characters standing behind the fountain rim.
- Re-architect `src/data/hideoutData.tsx` with 6 SEES characters (Makoto, Fuuka, Mitsuru, Aigis, Yukari, Junpei) mapped to core engineering proficiencies with Japanese Kanji badges.
- Enhance Main Menu and screen footers with high-definition SVG PlayStation button glyphs (Cyan Cross `✕` for Confirm, Crimson Circle `○` for Close/Back).
- Upgrade the in-screen Position Calibrator to provide real-time sliders for characters, camera zoom, speech bubbles, and the fountain water layer with 1-click JSON export.

**Tech Stack:** React 18, TypeScript, Tailwind CSS, Vite, Web Audio API, HTML5 Canvas / Image.decode(), SVG Vector Graphics, CSS Transitions & Transforms.

---

## User Review Required

> [!IMPORTANT]
> - **Real Asset Preloader:** Loading screen BUKAN lagi timer tiruan, melainkan **preloader nyata** yang melacak download & GPU texture decode dari seluruh aset (video, font CJK, audio, mall atrium, 6 karakter, air mancur) hingga **100%**. Begitu 100%, layar langsung fade-out mulus dan menu utama muncul tanpa kedipan/glitch.
> - **Hapus Loading Screen Lama:** File `TransitLoadingScreen.tsx` (P5 Shibuya subway) dan dependensinya dihapus total.
> - **Foreground Cutout Kedalaman 3D:** `fountain water.png` diset pada `z-index: 20`. Karakter dengan `zIndex < 20` otomatis berdiri di balik air mancur, sementara `zIndex > 20` berdiri di plaza depan.
> - **HUD PlayStation:** Tombol kapsul `[ENTER]` dan `[ESC]` di pojok kanan bawah diganti dengan icon controller PlayStation premium (Cyan `✕` dan Crimson `○`).

---

## Proposed Changes

### Component 1: Real Asset Preloader Engine & Clean P3R Loader

#### [NEW] `src/hooks/useRealAssetPreloader.ts`
- Tracks real loading and decoding progress for:
  1. `p3r-menu-bg.mp4` (waits for `canplaythrough` / buffer ready).
  2. OTF & Japanese CJK Fonts via `document.fonts.load()`:
     - `Rodin Pro`, `NewRodin Pro`, `Skip Std B`
     - Kanji glyphs: `結城理岳羽ゆかり伊織順平桐条美鶴山岸風花アイギス` (`Shippori Mincho` & `Noto Serif JP`).
  3. Audio buffers via Web Audio API:
     - `sfx/navigation.wav`, `sfx/menu-utama.mp3`, `sfx/close-menu.mp3`.
  4. Core Mall Atrium & SEES Images via `img.decode()`:
     - `/assets/Cinematic Mall Atrium with Central Fountain.png`
     - `/assets/fountain water.png`
     - `/assets/Makoto Yuki.png`
     - `/assets/Yukari Takeba.png`
     - `/assets/Junpei Iori.png`
     - `/assets/Mitsuru Kirijo.png`
     - `/assets/Fuuka Yamagishi.png`
     - `/assets/Aigis.png`
- Emits real integer progress: `0` to `100`.
- Includes safety timeout fallback (10s) and `Promise.allSettled` to prevent network freezes.

#### [NEW] `src/components/common/SimpleLoadingScreen.tsx`
- Minimalist full-screen container with deep blue background (`#001233`).
- Center loader: delicate pulsing cyan ring (`#16cffb`), subtle Persona 3 clock/radial accent, and bold percentage counter: `XX%`.
- Subtle status caption: `LOADING SYSTEM DATA...` in Rodin font.
- Smooth 250ms fade-out once `progress === 100`.

#### [DELETE] `src/components/common/TransitLoadingScreen.tsx`
- Completely remove legacy P5 Shibuya subway loading screen and train rush speedlines.

#### [MODIFY] `src/App.tsx`
- Connect `useRealAssetPreloader` to `SimpleLoadingScreen`.
- Ensure Main Menu and all sub-screens mount only after 100% asset readiness.

---

### Component 2: Polished PlayStation Controller HUD (`src/components/MainMenu.tsx`)

#### [MODIFY] `src/components/MainMenu.tsx`
- Replace generic `[ENTER]` and `[ESC]` pill buttons with authentic vector PlayStation icons:
  - **Confirm Action:** Dual-ring Cyan (`#22d3ee`) circle with crisp SVG `✕` Cross icon, subtle cyan glow.
  - **Close Action:** Dual-ring Crimson (`#ef4444`) circle with crisp SVG `○` Circle icon, subtle crimson glow.
  - Typography: Rodin 900 italic uppercase (`CONFIRM` and `CLOSE`).
  - Full keyboard compatibility (`Enter`/`Space` triggers Confirm, `Escape` triggers Close).

---

### Component 3: SEES Characters & Mall Atrium Data (`src/data/hideoutData.tsx`)

#### [MODIFY] `src/data/hideoutData.tsx`
- Re-architect character definitions for the 6 SEES characters:
  1. **Makoto Yuki** (`結城 理`)
     - Role: `SEES FIELD LEADER // FULLSTACK ARCHITECTURE`
     - Tech: React 19 & TypeScript (`react`, `typescript`)
     - Arcana: `0 - THE FOOL`
     - Asset: `/assets/Makoto Yuki.png`
     - Initial placement: Behind fountain or center plaza (`zIndex: 15`, width: 220)
  2. **Fuuka Yamagishi** (`山岸 風花`)
     - Role: `TACTICAL NAVIGATOR // DATA & TELEMETRY`
     - Tech: Python & AI Machine Learning (`python-ai`)
     - Arcana: `II - THE PRIESTESS`
     - Asset: `/assets/Fuuka Yamagishi.png`
     - Initial placement: Plaza side (`zIndex: 25`, width: 170)
  3. **Mitsuru Kirijo** (`桐条 美鶴`)
     - Role: `COMMANDING EXECUTIONER // ENTERPRISE BACKEND`
     - Tech: Laravel & Clean Architecture (`laravel`)
     - Arcana: `III - THE EMPRESS`
     - Asset: `/assets/Mitsuru Kirijo.png`
     - Initial placement: Fountain balcony / stairs (`zIndex: 12`, width: 190)
  4. **Aigis** (`アイギス`)
     - Role: `ANTI-SHADOW WEAPON // EDGE & SSR PERFORMANCE`
     - Tech: Next.js & Hybrid Cloud (`nextjs`)
     - Arcana: `VII - THE CHARIOT`
     - Asset: `/assets/Aigis.png`
     - Initial placement: Center foreground (`zIndex: 28`, width: 180)
  5. **Yukari Takeba** (`岳羽 ゆかり`)
     - Role: `AGILE ARCHER // KINETIC RESPONSIVE UI`
     - Tech: Tailwind CSS & Design Systems (`tailwind`)
     - Arcana: `VI - THE LOVERS`
     - Asset: `/assets/Yukari Takeba.png`
     - Initial placement: Front-left walkway (`zIndex: 26`, width: 185)
  6. **Junpei Iori** (`伊織 順平`)
     - Role: `VANGUARD SLUGGER // INTERACTIVE 3D & GAME DEV`
     - Tech: Unity & C# (`unity`)
     - Arcana: `I - THE MAGICIAN`
     - Asset: `/assets/Junpei Iori.png`
     - Initial placement: Front-right plaza (`zIndex: 27`, width: 195)
- Remove legacy P5 background assets (`background attic.jpe`, `tablefront.png`, `handlestairs.png`, `SpeechBubbleWithName.png`).
- Define P3R-styled default speech bubble coordinates and Kanji badge offsets for each character.

---

### Component 4: Paulownia Mall Atrium Stage (`src/components/screens/SkillsScreen.tsx`)

#### [MODIFY] `src/components/screens/SkillsScreen.tsx`
- **Background Layer:** Set background image to `/assets/Cinematic Mall Atrium with Central Fountain.png`.
- **Fountain Occlusion Layer:**
  - Render `/assets/fountain water.png` at `z-index: 20`.
  - Positioned to match the fountain basin so characters with `zIndex < 20` are partially submerged / occluded behind the rim and water.
- **P3R Dialogue Bubble Engine:**
  - Replace P5 comic speech bubble with custom SVG / CSS P3R dialogue box:
    - Angular cut styling with deep navy `#001233` body and glowing cyan `#16cffb` accent border.
    - Kanji name badge (`結城 理`, `山岸 風花`, etc.) with authentic Japanese typography.
    - Quote text rendered in high-legibility Rodin font.
- **P3R Tech Deck Stats Card:**
  - When character is clicked (focus mode), slide in the tech capability card on the side with P3R blue/cyan styling, level meter, and project chips.
- **Smooth Camera Zoom:**
  - Dynamic `transform: translate(...) scale(...)` focusing smoothly on clicked character.

---

### Component 5: Mall Atrium Live Calibrator (`src/components/dev/PositionCalibrator.tsx`)

#### [MODIFY] `src/components/dev/PositionCalibrator.tsx`
- Update character tabs to the 6 SEES characters: `[MAKOTO] [FUUKA] [MITSURU] [AIGIS] [YUKARI] [JUNPEI]`.
- Provide live sliders for:
  - `Position X` & `Position Y` (`tx`, `ty`)
  - `Character Width` (`width`)
  - `Z-Index` (with visual indicator: `<20 Behind Water`, `>20 Front`)
  - `Shadow Dimensions` (`shadowWidth`, `shadowHeight`)
  - `Camera Scale & Focal Center` (`scale`, `originX`, `originY`)
  - `Bubble Offset & Rotation` (`bubbleOffsetX`, `bubbleOffsetY`, `bubbleRotation`)
  - `Kanji Badge Offset & Scale` (`kanjiOffsetX`, `kanjiOffsetY`, `kanjiScale`)
- Add **Fountain Water Layer Tab** to adjust fountain water `offsetX`, `offsetY`, and `scale`.
- "📋 COPY CONFIG" button generates clean TypeScript code ready to paste.

---

## Verification Plan

### Automated Verification
```bash
# Verify zero TypeScript compilation errors
npx tsc --noEmit

# Verify Vite production build
npm run build
```

### Manual Verification
1. **Real Preloader Check:**
   - Reload page: confirm `SimpleLoadingScreen` shows real percentage counter progressing from 0% to 100%.
   - Verify zero console 404s, zero font pop-ins, and video immediately plays without black flash.
2. **Main Menu PlayStation HUD:**
   - Verify bottom-right shows vector Cyan `✕` (Confirm) and Crimson `○` (Close).
3. **Hideout (Mall Atrium):**
   - Click "HIDEOUT": verify instant appearance with zero image download lag.
   - Verify `Cinematic Mall Atrium with Central Fountain.png` background.
   - Verify `fountain water.png` occludes lower body of characters standing behind it (`zIndex < 20`).
   - Click each character to verify smooth camera zoom, P3R dialogue bubble, Kanji name badge, and tech capability card.
   - Press `Escape` or click background to zoom back out to overview mode.
   - Open Position Calibrator (hotkey or button) to test live slider adjustment and copy config.
