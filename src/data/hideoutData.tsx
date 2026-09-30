import React from 'react'

export interface TechItem {
  id: string
  name: string
  shortLabel: string
  category: string
  element: 'PHYS' | 'ELEC' | 'PSY' | 'FIRE' | 'GUN' | 'BLESS' | 'CURSE' | 'SUPPORT'
  cost: string
  level: number
  description: string
  libraries: string[]
  deployedIn?: string[]
  accentColor: string
  renderIcon: (props: { className?: string; isSelected?: boolean }) => React.ReactNode
}

// ── TECH ICONS (PRECISE SVG VECTOR GRAPHICS) ──
export const ReactIcon: React.FC<{ className?: string; isSelected?: boolean }> = ({ className = 'size-8', isSelected }) => (
  <svg viewBox="-11.5 -10.23174 23 20.46348" className={className} fill="none">
    <circle cx="0" cy="0" r="2.05" fill={isSelected ? '#00D4FF' : '#FFFFFF'} />
    <g stroke={isSelected ? '#00D4FF' : '#FFFFFF'} strokeWidth="1" fill="none">
      <ellipse rx="11" ry="4.2" />
      <ellipse rx="11" ry="4.2" transform="rotate(60)" />
      <ellipse rx="11" ry="4.2" transform="rotate(120)" />
    </g>
  </svg>
)

export const TsIcon: React.FC<{ className?: string; isSelected?: boolean }> = ({ className = 'size-8', isSelected }) => (
  <svg viewBox="0 0 32 32" className={className}>
    <rect width="32" height="32" rx="4" fill={isSelected ? '#3178C6' : '#1e1e1e'} stroke={isSelected ? '#FFFFFF' : '#3178C6'} strokeWidth="2" />
    <text x="10" y="23" fill="#FFFFFF" fontSize="13" fontWeight="900" fontFamily="sans-serif">T</text>
    <text x="18" y="23" fill="#FFFFFF" fontSize="13" fontWeight="900" fontFamily="sans-serif">S</text>
  </svg>
)

export const NextIcon: React.FC<{ className?: string; isSelected?: boolean }> = ({ className = 'size-8', isSelected }) => (
  <svg viewBox="0 0 180 180" className={className}>
    <circle cx="90" cy="90" r="85" fill="#000000" stroke={isSelected ? '#E60012' : '#FFFFFF'} strokeWidth="7" />
    <path d="M140 148 L68 56 L68 124" stroke="#FFFFFF" strokeWidth="12" strokeLinecap="round" strokeLinejoin="round" />
    <line x1="112" y1="56" x2="112" y2="100" stroke="#FFFFFF" strokeWidth="12" strokeLinecap="round" />
  </svg>
)

export const PythonIcon: React.FC<{ className?: string; isSelected?: boolean }> = ({ className = 'size-8', isSelected }) => (
  <svg viewBox="0 0 110 110" className={className}>
    <path
      d="M54.4 3C29.6 3 31.2 13.8 31.2 13.8L31.2 24.9L55 24.9L55 28.3L21.3 28.3C6.7 28.3 0 37.1 0 51.5C0 67.5 12.8 67 12.8 67L20.4 67L20.4 56.4C20.4 44.1 31.1 43.8 31.1 43.8L54.7 43.8C65.2 43.8 66.8 33.6 66.8 33.6L66.8 13.8C66.8 13.8 68.2 3 54.4 3ZM42.5 9.7C45.3 9.7 47.6 12 47.6 14.8C47.6 17.6 45.3 19.9 42.5 19.9C39.7 19.9 37.4 17.6 37.4 14.8C37.4 12 39.7 9.7 42.5 9.7Z"
      fill={isSelected ? '#3776AB' : '#FFFFFF'}
    />
    <path
      d="M55.6 107C80.4 107 78.8 96.2 78.8 96.2L78.8 85.1L55 85.1L55 81.7L88.7 81.7C103.3 81.7 110 72.9 110 58.5C110 42.5 97.2 43 97.2 43L89.6 43L89.6 53.6C89.6 65.9 78.9 66.2 78.9 66.2L55.3 66.2C44.8 66.2 43.2 76.4 43.2 76.4L43.2 96.2C43.2 96.2 41.8 107 55.6 107ZM67.5 100.3C64.7 100.3 62.4 98 62.4 95.2C62.4 92.4 64.7 90.1 67.5 90.1C70.3 90.1 72.6 92.4 72.6 95.2C72.6 98 70.3 100.3 67.5 100.3Z"
      fill={isSelected ? '#FFD43B' : '#E4E4E7'}
    />
  </svg>
)

export const NodeIcon: React.FC<{ className?: string; isSelected?: boolean }> = ({ className = 'size-8', isSelected }) => (
  <svg viewBox="0 0 32 32" className={className}>
    <polygon points="16,2 30,10 30,22 16,30 2,22 2,10" fill={isSelected ? '#339933' : '#141414'} stroke="#FFFFFF" strokeWidth="2.5" />
    <text x="9" y="20" fill="#FFFFFF" fontSize="10" fontWeight="900" fontFamily="monospace">JS</text>
  </svg>
)

export const UnityIcon: React.FC<{ className?: string; isSelected?: boolean }> = ({ className = 'size-8', isSelected }) => (
  <svg
    viewBox="0 0 21 24"
    className={`${className} transition-all ${isSelected ? 'filter drop-shadow-[0_0_8px_rgba(255,255,255,0.85)] scale-105' : 'opacity-85 hover:opacity-100'}`}
    fill={isSelected ? '#FFFFFF' : '#D4D4D8'}
  >
    <path d="M10.473 0l-5.71 3.298v3.297l3.806 2.197L6.666 9.94 2.86 7.742 0 9.395l5.71 3.297L0 15.989l2.86 1.653 3.806-2.198 1.903 1.099-3.806 2.197v3.297l5.71 3.298 5.711-3.298v-3.297l-3.807-2.197 1.903-1.099 3.807 2.198 2.86-1.653-5.71-3.297 5.71-3.297-2.86-1.653-3.807 2.198-1.903-1.099 3.807-2.197V3.298L10.473 0zm0 3.804l3.807 2.198-3.807 2.198-3.806-2.198 3.806-2.198zm-4.759 6.594l3.806 2.198-3.806 2.197-3.807-2.197 3.807-2.198zm9.518 0l3.807 2.198-3.807 2.197-3.807-2.198 3.807-2.198z" />
  </svg>
)

export const TailwindIcon: React.FC<{ className?: string; isSelected?: boolean }> = ({ className = 'size-8', isSelected }) => (
  <svg viewBox="0 0 24 24" className={className} fill={isSelected ? '#38BDF8' : '#FFFFFF'}>
    <path d="M12.001,4.8c-3.2,0-5.2,1.6-6,4.8c1.2-1.6,2.6-2.2,4.2-1.8c0.913,0.228,1.565,0.89,2.288,1.624 C13.666,10.618,15.027,12,18.001,12c3.2,0,5.2-1.6,6-4.8c-1.2,1.6-2.6,2.2-4.2,1.8c-0.913-0.228-1.565-0.89-2.288-1.624 C16.337,6.182,14.976,4.8,12.001,4.8z M6.001,12c-3.2,0-5.2,1.6-6,4.8c1.2-1.6,2.6-2.2,4.2-1.8c0.913,0.228,1.565,0.89,2.288,1.624 c1.177,1.194,2.538,2.576,5.512,2.576c3.2,0,5.2-1.6,6-4.8c-1.2,1.6-2.6,2.2-4.2,1.8c-0.913-0.228-1.565-0.89-2.288-1.624 C10.337,13.382,8.976,12,6.001,12z" />
  </svg>
)

export const LaravelIcon: React.FC<{ className?: string; isSelected?: boolean }> = ({ className = 'size-8', isSelected }) => (
  <svg viewBox="-7.4481 -12.7791 64.5502 76.6746" className={`${className} transition-all ${isSelected ? 'filter drop-shadow-[0_0_8px_rgba(255,45,32,0.8)]' : ''}`}>
    <path
      fillRule="evenodd"
      fill={isSelected ? '#FF2D20' : '#FFFFFF'}
      d="M49.626 11.5639a.809.809 0 01.028.209v10.972a.8.8 0 01-.402.694l-9.209 5.302v10.509c0 .286-.152.55-.4.694L20.42 51.0099c-.044.025-.092.041-.14.058-.018.006-.035.017-.054.022a.805.805 0 01-.41 0c-.022-.006-.042-.018-.063-.026-.044-.016-.09-.03-.132-.054L.402 39.9439a.801.801 0 01-.402-.694V6.3339c0-.072.01-.142.028-.21.006-.023.02-.044.028-.067.015-.042.029-.085.051-.124.015-.026.037-.047.055-.071.023-.032.044-.065.071-.093.023-.023.053-.04.079-.06.029-.024.055-.05.088-.069h.001l9.61-5.533a.802.802 0 01.8 0l9.61 5.533h.002c.032.02.059.045.088.068.026.02.055.038.078.06.028.029.048.062.072.094.017.024.04.045.054.071.023.04.036.082.052.124.008.023.022.044.028.068a.809.809 0 01.028.209v20.559l8.008-4.611v-10.51c0-.07.01-.141.028-.208.007-.024.02-.045.028-.068.016-.042.03-.085.052-.124.015-.026.037-.047.054-.071.024-.032.044-.065.072-.093.023-.023.052-.04.078-.06.03-.024.056-.05.088-.069h.001l9.611-5.533a.801.801 0 01.8 0l9.61 5.533c.034.02.06.045.09.068.025.02.054.038.077.06.028.029.048.062.072.094.018.024.04.045.054.071.023.039.036.082.052.124.009.023.022.044.028.068zm-1.574 10.718v-9.124l-3.363 1.936-4.646 2.675v9.124l8.01-4.611zm-9.61 16.505v-9.13l-4.57 2.61-13.05 7.448v9.216zM1.602 7.7189v31.068l17.618 10.143v-9.214l-9.204-5.209-.003-.002-.004-.002c-.031-.018-.057-.044-.086-.066-.025-.02-.054-.036-.076-.058l-.002-.003c-.026-.025-.044-.056-.066-.084-.02-.027-.044-.05-.06-.078l-.001-.003c-.018-.03-.029-.066-.042-.1-.013-.03-.03-.058-.038-.09v-.001c-.01-.038-.012-.078-.016-.117-.004-.03-.012-.06-.012-.09v-21.483l-4.645-2.676-3.363-1.934zm8.81-5.994l-8.007 4.609 8.005 4.609 8.006-4.61-8.006-4.608zm4.164 28.764l4.645-2.674V7.7189l-3.363 1.936-4.646 2.675v20.096zm24.667-23.325l-8.006 4.609 8.006 4.609 8.005-4.61zm-.801 10.605l-4.646-2.675-3.363-1.936v9.124l4.645 2.674 3.364 1.937zM20.02 38.3299l11.743-6.704 5.87-3.35-8-4.606-9.211 5.303-8.395 4.833z"
    />
  </svg>
)

// ── TECH STACK DECK (8 CORE CAPABILITIES) ──
export const TECH_DECK: TechItem[] = [
  {
    id: 'react',
    name: 'REACT 19',
    shortLabel: 'REACT',
    category: 'FRONTEND ARCHITECTURE',
    element: 'ELEC',
    cost: '18 SP',
    level: 98,
    description: 'Builds ultra-reactive single-page applications with instant hydration, modular component systems, fluid micro-interactions, and custom hooks.',
    libraries: ['React 19', 'Zustand', 'Context API', 'Vite', 'Component Systems'],
    deployedIn: ['GLOBAL SEISMIC TRACKER', 'PERSONA 5 PORTFOLIO'],
    accentColor: '#00D4FF',
    renderIcon: (props) => <ReactIcon {...props} />,
  },
  {
    id: 'typescript',
    name: 'TYPESCRIPT',
    shortLabel: 'TS',
    category: 'STRICT TYPE INTEGRITY',
    element: 'PHYS',
    cost: '12% HP',
    level: 96,
    description: 'Enforces robust type-safety, maintainable generics, OOP design patterns, and contract-driven interfaces across multi-tier applications.',
    libraries: ['TypeScript 5', 'Strict Generics', 'Zod Schema', 'Clean Architecture'],
    deployedIn: ['GLOBAL SEISMIC TRACKER', 'PERSONA 5 PORTFOLIO'],
    accentColor: '#3178C6',
    renderIcon: (props) => <TsIcon {...props} />,
  },
  {
    id: 'nextjs',
    name: 'NEXT.JS',
    shortLabel: 'NEXT',
    category: 'FULLSTACK SSR & SERVERLESS',
    element: 'BLESS',
    cost: '14 SP',
    level: 95,
    description: 'Architects enterprise-grade hybrid web systems utilizing Server-Side Rendering (SSR), Static Site Generation, Edge Middleware, and App Router.',
    libraries: ['App Router', 'Server Components', 'Edge Handlers', 'Vercel Deploy'],
    deployedIn: ['GLOBAL SEISMIC TRACKER'],
    accentColor: '#FFFFFF',
    renderIcon: (props) => <NextIcon {...props} />,
  },
  {
    id: 'python-ai',
    name: 'PYTHON / AI',
    shortLabel: 'PYTHON',
    category: 'AI & DATA SCIENCE',
    element: 'PSY',
    cost: '24 SP',
    level: 94,
    description: 'Infiltrates unstructured telemetry with transformer models, fine-tuned sentiment pipelines (IndoBERT), tokenizers, and PyTorch inference engines.',
    libraries: ['PyTorch', 'IndoBERT', 'Hugging Face', 'Pandas', 'Scikit-Learn'],
    deployedIn: ['ROBLOX SENTIMENT (INDOBERT)', 'STOCK PREDICTION SYSTEM'],
    accentColor: '#FFD43B',
    renderIcon: (props) => <PythonIcon {...props} />,
  },
  {
    id: 'nodejs',
    name: 'NODE.JS',
    shortLabel: 'NODE',
    category: 'BACKEND & CONCURRENCY',
    element: 'GUN',
    cost: '15 SP',
    level: 92,
    description: 'Deploys high-throughput serverless micro-backends, asynchronous event emitters, RESTful endpoints, and relational database bridges.',
    libraries: ['Node.js', 'Express', 'JWT Auth', 'REST APIs', 'MySQL / SQLite'],
    deployedIn: ['CONCURRENCY & BACKEND APIS'],
    accentColor: '#339933',
    renderIcon: (props) => <NodeIcon {...props} />,
  },
  {
    id: 'unity',
    name: 'UNITY 3D',
    shortLabel: 'UNITY',
    category: 'GAME & SHADER DEV',
    element: 'FIRE',
    cost: '20 SP',
    level: 90,
    description: 'Crafts real-time lighting passes, custom HLSL surface shaders, post-processing camera VFX, arcade vehicle physics, and responsive game loops.',
    libraries: ['Unity 3D', 'C# Scripting', 'HLSL Shaders', 'RigidBody Physics'],
    deployedIn: ['STREET RUSH (SHADERS & PHYSICS)'],
    accentColor: '#FFFFFF',
    renderIcon: (props) => <UnityIcon {...props} />,
  },
  {
    id: 'tailwind',
    name: 'TAILWIND CSS',
    shortLabel: 'TAILWIND',
    category: 'KINETIC UI / UX DESIGN',
    element: 'SUPPORT',
    cost: '10 SP',
    level: 97,
    description: 'Sculpts pixel-perfect anime game UIs, custom Persona keyframe animations, sleek glassmorphism, tailored design tokens, and fluid responsive decks.',
    libraries: ['Tailwind CSS', 'CSS Keyframes', 'Design Tokens', 'Responsive UI'],
    deployedIn: ['GLOBAL SEISMIC TRACKER', 'PERSONA 5 PORTFOLIO'],
    accentColor: '#38BDF8',
    renderIcon: (props) => <TailwindIcon {...props} />,
  },
  {
    id: 'laravel',
    name: 'LARAVEL / PHP',
    shortLabel: 'LARAVEL',
    category: 'ENTERPRISE MVC & DATABASE',
    element: 'CURSE',
    cost: '16 SP',
    level: 91,
    description: 'Orchestrates robust database migrations, Eloquent ORM relations, structured MVC architectures, and authenticated RESTful application APIs.',
    libraries: ['Laravel', 'PHP 8.2', 'Eloquent ORM', 'Blade', 'MySQL Database'],
    deployedIn: ['FULLSTACK ARCHITECTURE & CMS'],
    accentColor: '#FF2D20',
    renderIcon: (props) => <LaravelIcon {...props} />,
  },
]

// ── PHANTOM THIEVES CHARACTERS & LEBLANC ATTIC STAGE DATA ──
export interface PhantomCharacter {
  id: string
  name: string
  codename: string
  kanji: string
  role: string
  quote: string
  src: string
  techId: string
  thiefColor: string
  thiefTextColor: string
  tx: number
  ty: number
  width: number
  zIndex: number
  shadowWidth: number
  shadowHeight: number
  brightness: number
  warmth: number
  camera: {
    scale: number
    originX: number
    originY: number
  }
}

export const PHANTOM_CHARACTERS: PhantomCharacter[] = [
  {
    id: 'yusuke',
    name: 'YUSUKE KITAGAWA',
    codename: 'FOX',
    kanji: '喜多川 祐介',
    role: 'METICULOUS ARTISAN // BACKEND MVC',
    quote: 'An exquisite composition of robust Eloquent schemas, clean relations, and authenticated APIs.',
    src: '/assets/yusuke kitagawa.png',
    techId: 'laravel',
    thiefColor: '#00A3FF',
    thiefTextColor: '#000000',
    tx: -723,
    ty: -64,
    width: 296,
    zIndex: 24,
    shadowWidth: 72,
    shadowHeight: 12,
    brightness: 0.98,
    warmth: 0.14,
    camera: {
      scale: 2,
      originX: 16,
      originY: 69.5,
    },
  },
  {
    id: 'futaba',
    name: 'FUTABA SAKURA',
    codename: 'ORACLE',
    kanji: '佐倉 双葉',
    role: 'TACTICAL HACKER // DATA & AI',
    quote: 'Target locked! Transformer telemetry, IndoBERT sentiment pipelines, and PyTorch inference ready!',
    src: '/assets/Futaba_Sakura.webp',
    techId: 'python-ai',
    thiefColor: '#00FF66',
    thiefTextColor: '#000000',
    tx: -174,
    ty: -135,
    width: 132,
    zIndex: 22,
    shadowWidth: 76,
    shadowHeight: 10,
    brightness: 0.97,
    warmth: 0.12,
    camera: {
      scale: 2.2,
      originX: 43.5,
      originY: 50,
    },
  },
  {
    id: 'morgana',
    name: 'MORGANA',
    codename: 'MONA',
    kanji: 'モルガナ',
    role: 'VANGUARD GUIDE // KINETIC UI',
    quote: 'Looking cool, Joker! Fluid animations, custom keyframe passes, and tailored responsive tokens!',
    src: '/assets/Morgana.webp',
    techId: 'tailwind',
    thiefColor: '#FFD700',
    thiefTextColor: '#000000',
    tx: -45,
    ty: -56,
    width: 72,
    zIndex: 20,
    shadowWidth: 68,
    shadowHeight: 6,
    brightness: 0.99,
    warmth: 0.15,
    camera: {
      scale: 2.5,
      originX: 50,
      originY: 49,
    },
  },
  {
    id: 'ryuji',
    name: 'RYUJI SAKAMOTO',
    codename: 'SKULL',
    kanji: '坂本 竜司',
    role: 'HEAVY CHARGER // GAME & VFX',
    quote: 'For real?! High-throughput arcade vehicle physics and custom HLSL surface shaders kicking in!',
    src: '/assets/Ryuji_Sakamoto.webp',
    techId: 'unity',
    thiefColor: '#FFE500',
    thiefTextColor: '#000000',
    tx: 90,
    ty: -180,
    width: 102,
    zIndex: 20,
    shadowWidth: 75,
    shadowHeight: 10,
    brightness: 0.96,
    warmth: 0.14,
    camera: {
      scale: 2.3,
      originX: 58.5,
      originY: 40.5,
    },
  },
  {
    id: 'ann',
    name: 'ANN TAKAMAKI',
    codename: 'PANTHER',
    kanji: '高巻 杏',
    role: 'AGILE INFILTRATOR // SSR & EDGE',
    quote: 'Time for serious magic! Enterprise-grade hybrid SSR, App Router, and edge middleware deployed!',
    src: '/assets/An_takamaki.webp',
    techId: 'nextjs',
    thiefColor: '#E60012',
    thiefTextColor: '#FFFFFF',
    tx: 258,
    ty: -98,
    width: 198,
    zIndex: 18,
    shadowWidth: 70,
    shadowHeight: 8,
    brightness: 0.98,
    warmth: 0.12,
    camera: {
      scale: 1.9,
      originX: 70,
      originY: 54,
    },
  },
  {
    id: 'joker',
    name: 'REN AMAMIYA',
    codename: 'JOKER',
    kanji: '雨宮 蓮',
    role: 'PHANTOM LEADER // ARCHITECT',
    quote: 'Show me your true form! Ultra-reactive frontend architecture & TypeScript contracts unleashed.',
    src: '/assets/Joker.png',
    techId: 'react',
    thiefColor: '#E60012',
    thiefTextColor: '#FFFFFF',
    tx: 622,
    ty: -148,
    width: 228,
    zIndex: 26,
    shadowWidth: 75,
    shadowHeight: 14,
    brightness: 0.98,
    warmth: 0.12,
    camera: {
      scale: 3.05,
      originX: 100,
      originY: 42,
    },
  },
]

// ── PERSONA 5 FLOATING COMIC SPEECH BUBBLE CONFIGS ──
export interface BubbleConfig {
  side: 'left' | 'right'
  posX: number
  top: number
  width?: number
  bubbleRotate?: number

  // 1. Name Tag Controls
  nameOffsetX?: number
  nameOffsetY?: number
  nameRotate?: number
  nameScale?: number

  // 2. Dialogue Quote Controls
  quoteOffsetX?: number
  quoteOffsetY?: number
  quoteRotate?: number
  quoteScale?: number
  quoteMaxWidth?: number

  // Legacy fallback
  textOffsetX?: number
  textOffsetY?: number
  textScale?: number
  textRotate?: number
  tailTop?: number
}

// ── PERSONA 5 CUTOUT RANSOM TYPOGRAPHY ──
export interface RansomCharConfig {
  char: string
  kind: 'black' | 'thief' | 'plain'
  rotate: string
  scale: string
}

export const PRESET_RANSOM_NAMES: Record<string, RansomCharConfig[]> = {
  JOKER: [
    { char: 'J', kind: 'black', rotate: '-rotate-6', scale: 'scale-105' },
    { char: 'O', kind: 'plain', rotate: 'rotate-2', scale: 'scale-100' },
    { char: 'K', kind: 'thief', rotate: 'rotate-6', scale: 'scale-110' },
    { char: 'E', kind: 'plain', rotate: '-rotate-3', scale: 'scale-95' },
    { char: 'R', kind: 'black', rotate: 'rotate-3', scale: 'scale-105' },
  ],
  SKULL: [
    { char: 'S', kind: 'thief', rotate: 'rotate-4', scale: 'scale-110' },
    { char: 'K', kind: 'plain', rotate: '-rotate-3', scale: 'scale-100' },
    { char: 'U', kind: 'black', rotate: '-rotate-5', scale: 'scale-105' },
    { char: 'L', kind: 'plain', rotate: 'rotate-3', scale: 'scale-95' },
    { char: 'L', kind: 'thief', rotate: '-rotate-4', scale: 'scale-105' },
  ],
  PANTHER: [
    { char: 'P', kind: 'black', rotate: '-rotate-5', scale: 'scale-105' },
    { char: 'A', kind: 'plain', rotate: 'rotate-3', scale: 'scale-100' },
    { char: 'N', kind: 'thief', rotate: 'rotate-5', scale: 'scale-110' },
    { char: 'T', kind: 'plain', rotate: '-rotate-4', scale: 'scale-95' },
    { char: 'H', kind: 'black', rotate: '-rotate-3', scale: 'scale-105' },
    { char: 'E', kind: 'plain', rotate: 'rotate-4', scale: 'scale-100' },
    { char: 'R', kind: 'thief', rotate: 'rotate-2', scale: 'scale-110' },
  ],
  FOX: [
    { char: 'F', kind: 'thief', rotate: '-rotate-6', scale: 'scale-110' },
    { char: 'O', kind: 'plain', rotate: 'rotate-2', scale: 'scale-100' },
    { char: 'X', kind: 'black', rotate: 'rotate-5', scale: 'scale-105' },
  ],
  MONA: [
    { char: 'M', kind: 'black', rotate: '-rotate-4', scale: 'scale-105' },
    { char: 'O', kind: 'thief', rotate: 'rotate-4', scale: 'scale-110' },
    { char: 'N', kind: 'plain', rotate: '-rotate-3', scale: 'scale-100' },
    { char: 'A', kind: 'black', rotate: 'rotate-3', scale: 'scale-105' },
  ],
  ORACLE: [
    { char: 'O', kind: 'thief', rotate: 'rotate-4', scale: 'scale-110' },
    { char: 'R', kind: 'plain', rotate: '-rotate-3', scale: 'scale-95' },
    { char: 'A', kind: 'black', rotate: '-rotate-5', scale: 'scale-105' },
    { char: 'C', kind: 'plain', rotate: 'rotate-3', scale: 'scale-100' },
    { char: 'L', kind: 'thief', rotate: '-rotate-4', scale: 'scale-105' },
    { char: 'E', kind: 'plain', rotate: 'rotate-2', scale: 'scale-95' },
  ],
  NAVI: [
    { char: 'N', kind: 'thief', rotate: '-rotate-5', scale: 'scale-110' },
    { char: 'A', kind: 'plain', rotate: 'rotate-3', scale: 'scale-95' },
    { char: 'V', kind: 'black', rotate: 'rotate-4', scale: 'scale-105' },
    { char: 'I', kind: 'plain', rotate: '-rotate-2', scale: 'scale-105' },
  ],
}

export const getRansomConfig = (codename: string): RansomCharConfig[] => {
  const upper = codename.toUpperCase()
  if (PRESET_RANSOM_NAMES[upper]) return PRESET_RANSOM_NAMES[upper]

  const rotations = ['-rotate-6', 'rotate-3', '-rotate-3', 'rotate-5', '-rotate-4', 'rotate-4']
  const kinds: ('black' | 'thief' | 'plain')[] = ['black', 'plain', 'thief', 'plain']

  return upper.split('').map((char, i) => ({
    char,
    kind: kinds[i % kinds.length],
    rotate: rotations[i % rotations.length],
    scale: i % 2 === 0 ? 'scale-105' : 'scale-100',
  }))
}

export const P5CutoutName: React.FC<{
  codename: string
  thiefColor: string
  thiefTextColor: string
}> = ({ codename, thiefColor, thiefTextColor }) => {
  const letters = getRansomConfig(codename)

  return (
    <div className="flex items-center gap-0.5 sm:gap-1 select-none filter drop-shadow-[2px_2px_0px_rgba(0,0,0,0.8)]">
      {letters.map((item, idx) => {
        if (item.kind === 'black') {
          return (
            <span
              key={idx}
              className={`inline-flex items-center justify-center bg-black text-white font-p5Heading text-xs sm:text-sm md:text-base font-black px-1 sm:px-1.5 py-0.5 border border-white/40 shadow-[1.5px_1.5px_0px_#000] ${item.rotate} ${item.scale} transition-transform duration-150`}
            >
              {item.char}
            </span>
          )
        }
        if (item.kind === 'thief') {
          return (
            <span
              key={idx}
              className={`inline-flex items-center justify-center font-p5Heading text-xs sm:text-sm md:text-base font-black px-1 sm:px-1.5 py-0.5 border border-black/40 shadow-[1.5px_1.5px_0px_#000] ${item.rotate} ${item.scale} transition-transform duration-150`}
              style={{
                backgroundColor: thiefColor || '#E60012',
                color: thiefTextColor || '#FFFFFF',
              }}
            >
              {item.char}
            </span>
          )
        }
        // White Paper Cutout tile (crisp newspaper clipping with black border & shadow)
        return (
          <span
            key={idx}
            className={`inline-flex items-center justify-center bg-white text-black font-p5Heading text-xs sm:text-sm md:text-base font-black px-1 sm:px-1.5 py-0.5 border border-black shadow-[1.5px_1.5px_0px_#000] ${item.rotate} ${item.scale} transition-transform duration-150`}
          >
            {item.char}
          </span>
        )
      })}
    </div>
  )
}

export const DEFAULT_BUBBLES: Record<string, BubbleConfig> = {
  yusuke: {
    side: 'right',
    posX: 28,
    top: 15,
    width: 530,
    bubbleRotate: 0,
    nameOffsetX: 36,
    nameOffsetY: 15,
    nameRotate: -15,
    nameScale: 1,
    quoteOffsetX: -2,
    quoteOffsetY: -35,
    quoteRotate: 2,
    quoteScale: 0.86,
    quoteMaxWidth: 92,
  },
  futaba: {
    side: 'right',
    posX: 52,
    top: 15,
    width: 530,
    bubbleRotate: 3,
    nameOffsetX: 13,
    nameOffsetY: 24,
    nameRotate: -17,
    nameScale: 0.86,
    quoteOffsetX: 6,
    quoteOffsetY: -36,
    quoteRotate: 2,
    quoteScale: 0.9,
    quoteMaxWidth: 92,
  },
  morgana: {
    side: 'left',
    posX: 53,
    top: 26,
    width: 530,
    bubbleRotate: 0,
    nameOffsetX: -23,
    nameOffsetY: 8,
    nameRotate: 10,
    nameScale: 1,
    quoteOffsetX: 0,
    quoteOffsetY: -29,
    quoteRotate: -2,
    quoteScale: 1,
    quoteMaxWidth: 92,
  },
  ryuji: {
    side: 'left',
    posX: 50,
    top: 14,
    width: 530,
    bubbleRotate: 0,
    nameOffsetX: -18,
    nameOffsetY: 21,
    nameRotate: 12,
    nameScale: 0.88,
    quoteOffsetX: 0,
    quoteOffsetY: -30,
    quoteRotate: -2,
    quoteScale: 1,
    quoteMaxWidth: 92,
  },
  ann: {
    side: 'left',
    posX: 38,
    top: 22,
    width: 530,
    bubbleRotate: 0,
    nameOffsetX: -6,
    nameOffsetY: 20,
    nameRotate: 10,
    nameScale: 0.96,
    quoteOffsetX: 0,
    quoteOffsetY: -28,
    quoteRotate: -2,
    quoteScale: 1,
    quoteMaxWidth: 92,
  },
  joker: {
    side: 'left',
    posX: 49,
    top: 15,
    width: 530,
    bubbleRotate: 0,
    nameOffsetX: -10,
    nameOffsetY: 23,
    nameRotate: 17,
    nameScale: 1,
    quoteOffsetX: 0,
    quoteOffsetY: -29,
    quoteRotate: -2,
    quoteScale: 1,
    quoteMaxWidth: 92,
  },
}

// ── PERSONA 5 GIANT KANJI BACKDROP WATERMARK CONFIGS ──
export interface KanjiConfig {
  x: number // percentage offset relative to camera.originX
  y: number // percentage offset relative to camera.originY
  rotate: number // degrees
  scale: number // relative scale multiplier
  opacity: number // 0.05 to 1.0 (default 0.74)
}

export const DEFAULT_KANJI_CONFIGS: Record<string, KanjiConfig> = {
  joker: {
    x: -17,
    y: 7,
    rotate: -10,
    scale: 1.05,
    opacity: 0.74,
  },
  futaba: {
    x: -1,
    y: 0,
    rotate: -8,
    scale: 1,
    opacity: 0.74,
  },
  morgana: {
    x: 5,
    y: 5,
    rotate: -18,
    scale: 1,
    opacity: 0.74,
  },
  ryuji: {
    x: -1,
    y: 7,
    rotate: -8,
    scale: 1,
    opacity: 0.74,
  },
  ann: {
    x: -6,
    y: 7,
    rotate: -8,
    scale: 1,
    opacity: 0.74,
  },
  yusuke: {
    x: 17,
    y: -1,
    rotate: -8,
    scale: 1,
    opacity: 0.8,
  },
}
