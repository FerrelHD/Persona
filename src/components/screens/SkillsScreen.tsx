import React, { useState, useEffect, useCallback, useMemo, useRef } from 'react'
import { usePersonaSFX } from '@/hooks/usePersonaSFX'
import { PhantomDagger } from '@/components/common/PhantomDagger'
import { TakeYourTime } from '@/components/common/TakeYourTime'
import { Zap, Sparkles, Shield, Flame, Sword, Crosshair, HeartPulse, RefreshCw, X, ChevronRight, Layers, Sliders, Move, Copy, Check, RotateCcw } from 'lucide-react'

interface SkillsScreenProps {
  onBack: () => void
}

interface TechItem {
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
const ReactIcon: React.FC<{ className?: string; isSelected?: boolean }> = ({ className = 'size-8', isSelected }) => (
  <svg viewBox="-11.5 -10.23174 23 20.46348" className={className} fill="none">
    <circle cx="0" cy="0" r="2.05" fill={isSelected ? '#00D4FF' : '#FFFFFF'} />
    <g stroke={isSelected ? '#00D4FF' : '#FFFFFF'} strokeWidth="1" fill="none">
      <ellipse rx="11" ry="4.2" />
      <ellipse rx="11" ry="4.2" transform="rotate(60)" />
      <ellipse rx="11" ry="4.2" transform="rotate(120)" />
    </g>
  </svg>
)

const TsIcon: React.FC<{ className?: string; isSelected?: boolean }> = ({ className = 'size-8', isSelected }) => (
  <svg viewBox="0 0 32 32" className={className}>
    <rect width="32" height="32" rx="4" fill={isSelected ? '#3178C6' : '#1e1e1e'} stroke={isSelected ? '#FFFFFF' : '#3178C6'} strokeWidth="2" />
    <text x="10" y="23" fill="#FFFFFF" fontSize="13" fontWeight="900" fontFamily="sans-serif">T</text>
    <text x="18" y="23" fill="#FFFFFF" fontSize="13" fontWeight="900" fontFamily="sans-serif">S</text>
  </svg>
)

const NextIcon: React.FC<{ className?: string; isSelected?: boolean }> = ({ className = 'size-8', isSelected }) => (
  <svg viewBox="0 0 180 180" className={className}>
    <circle cx="90" cy="90" r="85" fill="#000000" stroke={isSelected ? '#E60012' : '#FFFFFF'} strokeWidth="7" />
    <path d="M140 148 L68 56 L68 124" stroke="#FFFFFF" strokeWidth="12" strokeLinecap="round" strokeLinejoin="round" />
    <line x1="112" y1="56" x2="112" y2="100" stroke="#FFFFFF" strokeWidth="12" strokeLinecap="round" />
  </svg>
)

const PythonIcon: React.FC<{ className?: string; isSelected?: boolean }> = ({ className = 'size-8', isSelected }) => (
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

const NodeIcon: React.FC<{ className?: string; isSelected?: boolean }> = ({ className = 'size-8', isSelected }) => (
  <svg viewBox="0 0 32 32" className={className}>
    <polygon points="16,2 30,10 30,22 16,30 2,22 2,10" fill={isSelected ? '#339933' : '#141414'} stroke="#FFFFFF" strokeWidth="2.5" />
    <text x="9" y="20" fill="#FFFFFF" fontSize="10" fontWeight="900" fontFamily="monospace">JS</text>
  </svg>
)

const UnityIcon: React.FC<{ className?: string; isSelected?: boolean }> = ({ className = 'size-8', isSelected }) => (
  <img
    src="/assets/unity_icon_svg-removebg-preview.png"
    alt="Unity"
    className={`${className} object-contain select-none transition-all brightness-0 invert ${
      isSelected ? 'opacity-100 scale-105 filter drop-shadow-[0_0_8px_rgba(255,255,255,0.85)]' : 'opacity-85 hover:opacity-100'
    }`}
  />
)

const TailwindIcon: React.FC<{ className?: string; isSelected?: boolean }> = ({ className = 'size-8', isSelected }) => (
  <svg viewBox="0 0 24 24" className={className} fill={isSelected ? '#38BDF8' : '#FFFFFF'}>
    <path d="M12.001,4.8c-3.2,0-5.2,1.6-6,4.8c1.2-1.6,2.6-2.2,4.2-1.8c0.913,0.228,1.565,0.89,2.288,1.624 C13.666,10.618,15.027,12,18.001,12c3.2,0,5.2-1.6,6-4.8c-1.2,1.6-2.6,2.2-4.2,1.8c-0.913-0.228-1.565-0.89-2.288-1.624 C16.337,6.182,14.976,4.8,12.001,4.8z M6.001,12c-3.2,0-5.2,1.6-6,4.8c1.2-1.6,2.6-2.2,4.2-1.8c0.913,0.228,1.565,0.89,2.288,1.624 c1.177,1.194,2.538,2.576,5.512,2.576c3.2,0,5.2-1.6,6-4.8c-1.2,1.6-2.6,2.2-4.2,1.8c-0.913-0.228-1.565-0.89-2.288-1.624 C10.337,13.382,8.976,12,6.001,12z" />
  </svg>
)

const LaravelIcon: React.FC<{ className?: string; isSelected?: boolean }> = ({ className = 'size-8', isSelected }) => (
  <svg viewBox="-7.4481 -12.7791 64.5502 76.6746" className={`${className} transition-all ${isSelected ? 'filter drop-shadow-[0_0_8px_rgba(255,45,32,0.8)]' : ''}`}>
    <path
      fillRule="evenodd"
      fill={isSelected ? '#FF2D20' : '#FFFFFF'}
      d="M49.626 11.5639a.809.809 0 01.028.209v10.972a.8.8 0 01-.402.694l-9.209 5.302v10.509c0 .286-.152.55-.4.694L20.42 51.0099c-.044.025-.092.041-.14.058-.018.006-.035.017-.054.022a.805.805 0 01-.41 0c-.022-.006-.042-.018-.063-.026-.044-.016-.09-.03-.132-.054L.402 39.9439a.801.801 0 01-.402-.694V6.3339c0-.072.01-.142.028-.21.006-.023.02-.044.028-.067.015-.042.029-.085.051-.124.015-.026.037-.047.055-.071.023-.032.044-.065.071-.093.023-.023.053-.04.079-.06.029-.024.055-.05.088-.069h.001l9.61-5.533a.802.802 0 01.8 0l9.61 5.533h.002c.032.02.059.045.088.068.026.02.055.038.078.06.028.029.048.062.072.094.017.024.04.045.054.071.023.04.036.082.052.124.008.023.022.044.028.068a.809.809 0 01.028.209v20.559l8.008-4.611v-10.51c0-.07.01-.141.028-.208.007-.024.02-.045.028-.068.016-.042.03-.085.052-.124.015-.026.037-.047.054-.071.024-.032.044-.065.072-.093.023-.023.052-.04.078-.06.03-.024.056-.05.088-.069h.001l9.611-5.533a.801.801 0 01.8 0l9.61 5.533c.034.02.06.045.09.068.025.02.054.038.077.06.028.029.048.062.072.094.018.024.04.045.054.071.023.039.036.082.052.124.009.023.022.044.028.068zm-1.574 10.718v-9.124l-3.363 1.936-4.646 2.675v9.124l8.01-4.611zm-9.61 16.505v-9.13l-4.57 2.61-13.05 7.448v9.216zM1.602 7.7189v31.068l17.618 10.143v-9.214l-9.204-5.209-.003-.002-.004-.002c-.031-.018-.057-.044-.086-.066-.025-.02-.054-.036-.076-.058l-.002-.003c-.026-.025-.044-.056-.066-.084-.02-.027-.044-.05-.06-.078l-.001-.003c-.018-.03-.029-.066-.042-.1-.013-.03-.03-.058-.038-.09v-.001c-.01-.038-.012-.078-.016-.117-.004-.03-.012-.06-.012-.09v-21.483l-4.645-2.676-3.363-1.934zm8.81-5.994l-8.007 4.609 8.005 4.609 8.006-4.61-8.006-4.608zm4.164 28.764l4.645-2.674V7.7189l-3.363 1.936-4.646 2.675v20.096zm24.667-23.325l-8.006 4.609 8.006 4.609 8.005-4.61zm-.801 10.605l-4.646-2.675-3.363-1.936v9.124l4.645 2.674 3.364 1.937zM20.02 38.3299l11.743-6.704 5.87-3.35-8-4.606-9.211 5.303-8.395 4.833z"
    />
  </svg>
)

// ── TECH STACK DECK (8 CORE CAPABILITIES) ──
const TECH_DECK: TechItem[] = [
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
interface PhantomCharacter {
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

const PHANTOM_CHARACTERS: PhantomCharacter[] = [
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
interface BubbleConfig {
  side: 'left' | 'right'
  posX: number
  top: number
  tailTop: number
}

const DEFAULT_BUBBLES: Record<string, BubbleConfig> = {
  yusuke: {
    side: 'right',
    posX: 33,
    top: 15,
    tailTop: 32,
  },
  futaba: {
    side: 'right',
    posX: 52,
    top: 15,
    tailTop: 35,
  },
  morgana: {
    side: 'left',
    posX: 58,
    top: 30,
    tailTop: 40,
  },
  ryuji: {
    side: 'left',
    posX: 50,
    top: 14,
    tailTop: 15,
  },
  ann: {
    side: 'left',
    posX: 42,
    top: 27,
    tailTop: 10,
  },
  joker: {
    side: 'left',
    posX: 56,
    top: 15,
    tailTop: 19,
  },
}

// ── PERSONA 5 GIANT KANJI BACKDROP WATERMARK CONFIGS ──
interface KanjiConfig {
  x: number // percentage offset relative to camera.originX
  y: number // percentage offset relative to camera.originY
  rotate: number // degrees
  scale: number // relative scale multiplier
  opacity: number // 0.05 to 1.0 (default 0.22)
}

const DEFAULT_KANJI_CONFIGS: Record<string, KanjiConfig> = {
  joker: {
    x: -16,
    y: 7,
    rotate: -10,
    scale: 1.05,
    opacity: 0.22,
  },
  futaba: {
    x: -1,
    y: 0,
    rotate: -8,
    scale: 1,
    opacity: 0.22,
  },
  morgana: {
    x: 5,
    y: 5,
    rotate: -18,
    scale: 1,
    opacity: 0.22,
  },
  ryuji: {
    x: -1,
    y: 7,
    rotate: -8,
    scale: 1,
    opacity: 0.22,
  },
  ann: {
    x: -9,
    y: 9,
    rotate: -8,
    scale: 1,
    opacity: 0.22,
  },
  yusuke: {
    x: 14,
    y: 3,
    rotate: -8,
    scale: 1,
    opacity: 0.22,
  },
}

export const SkillsScreen: React.FC<SkillsScreenProps> = ({ onBack }) => {
  const { playHover, playSlash, playBack } = usePersonaSFX()

  // Active character in Leblanc Attic (null = Overview Mode)
  const [activeCharId, setActiveCharId] = useState<string | null>(null)
  const [hoveredCharId, setHoveredCharId] = useState<string | null>(null)
  const [showSpeedlines, setShowSpeedlines] = useState<boolean>(false)

  // Track the focal camera origin so zoom-out scales back from the exact same point without jerking
  const [lastFocusOrigin, setLastFocusOrigin] = useState<{ originX: number; originY: number }>({
    originX: 50,
    originY: 50,
  })

  // Preloading & Cinematic Entrance state
  const [isAssetsLoading, setIsAssetsLoading] = useState(true)
  const [isEntranceAnimating, setIsEntranceAnimating] = useState(true)

  useEffect(() => {
    let isMounted = true
    const preloadList = [
      '/assets/background attic.jpe',
      '/assets/self.png',
      '/assets/handlestairs.png',
      '/assets/tablefront.png',
      '/assets/yusuke kitagawa.png',
      '/assets/Futaba_Sakura.webp',
      '/assets/Morgana.webp',
      '/assets/Ryuji_Sakamoto.webp',
      '/assets/An_takamaki.webp',
      '/assets/Joker.png',
    ]

    const minDelayPromise = new Promise(resolve => setTimeout(resolve, 450))

    const imagePromises = preloadList.map(src => {
      return new Promise<void>((resolve) => {
        const img = new Image()
        img.src = src
        img.onload = () => resolve()
        img.onerror = () => resolve()
      })
    })

    Promise.all([minDelayPromise, ...imagePromises]).then(() => {
      if (!isMounted) return
      playSlash()
      setIsAssetsLoading(false)
      setTimeout(() => {
        if (isMounted) setIsEntranceAnimating(false)
      }, 700)
    })

    return () => {
      isMounted = false
    }
  }, [playSlash])

  // Character list with dynamic positioning state
  const [characterList, setCharacterList] = useState<PhantomCharacter[]>(() => {
    const saved = localStorage.getItem('p5_characters_bocchi_v4')
    if (saved) {
      try {
        const parsed = JSON.parse(saved)
        if (Array.isArray(parsed) && parsed.length === PHANTOM_CHARACTERS.length) {
          return parsed
        }
      } catch { /* ignore */ }
    }
    return PHANTOM_CHARACTERS
  })

  // Dynamic stage scale based on reference 1920x1080 canvas
  const [scale, setScale] = useState<number>(1)

  useEffect(() => {
    const updateScale = () => {
      const s = Math.max(window.innerWidth / 1920, window.innerHeight / 1080)
      setScale(Math.max(0.4, Math.min(1.5, s)))
    }
    updateScale()
    window.addEventListener('resize', updateScale)
    return () => window.removeEventListener('resize', updateScale)
  }, [])

  // Calibrator Panel state
  const [isCalibratorOpen, setIsCalibratorOpen] = useState(false)
  const [calibratingCharId, setCalibratingCharId] = useState<string>('joker')
  const [calibratorTab, setCalibratorTab] = useState<'char' | 'camera' | 'bubble' | 'kanji'>('char')
  const [copiedSuccess, setCopiedSuccess] = useState(false)
  const stageRef = useRef<HTMLDivElement>(null)

  // Floating comic speech bubble configuration state (persisted in localStorage)
  const [bubbleList, setBubbleList] = useState<Record<string, BubbleConfig>>(() => {
    const saved = localStorage.getItem('p5_bubbles_v3')
    if (saved) {
      try {
        const parsed = JSON.parse(saved)
        if (typeof parsed === 'object') return parsed
      } catch { /* ignore */ }
    }
    return DEFAULT_BUBBLES
  })

  const updateCalibratingBubble = (updates: Partial<BubbleConfig>) => {
    setBubbleList(prev => {
      const current = prev[calibratingCharId] || DEFAULT_BUBBLES[calibratingCharId] || DEFAULT_BUBBLES.joker
      const next = { ...prev, [calibratingCharId]: { ...current, ...updates } }
      localStorage.setItem('p5_bubbles_v3', JSON.stringify(next))
      return next
    })
  }

  // Floating giant Japanese kanji configuration state (persisted in localStorage)
  const [kanjiList, setKanjiList] = useState<Record<string, KanjiConfig>>(() => {
    const saved = localStorage.getItem('p5_kanji_v3')
    if (saved) {
      try {
        const parsed = JSON.parse(saved)
        if (typeof parsed === 'object') return parsed
      } catch { /* ignore */ }
    }
    return DEFAULT_KANJI_CONFIGS
  })

  const updateCalibratingKanji = (updates: Partial<KanjiConfig>) => {
    setKanjiList(prev => {
      const current = prev[calibratingCharId] || DEFAULT_KANJI_CONFIGS[calibratingCharId] || DEFAULT_KANJI_CONFIGS.joker
      const next = { ...prev, [calibratingCharId]: { ...current, ...updates } }
      localStorage.setItem('p5_kanji_v3', JSON.stringify(next))
      return next
    })
  }

  // Active character object
  const activeChar = useMemo(() => {
    return characterList.find(c => c.id === activeCharId) || null
  }, [characterList, activeCharId])

  const calibratingChar = useMemo(() => {
    return characterList.find(c => c.id === calibratingCharId) || characterList[0]
  }, [characterList, calibratingCharId])

  const updateCalibratingChar = (updates: Partial<PhantomCharacter>) => {
    setCharacterList(prev => {
      const next = prev.map(c => c.id === calibratingCharId ? { ...c, ...updates } : c)
      localStorage.setItem('p5_characters_bocchi_v4', JSON.stringify(next))
      return next
    })
    if (updates.camera) {
      setLastFocusOrigin({
        originX: updates.camera.originX ?? calibratingChar.camera.originX,
        originY: updates.camera.originY ?? calibratingChar.camera.originY,
      })
    }
  }

  const copyConfigToClipboard = () => {
    const charsFormatted = JSON.stringify(characterList, null, 2)
    const bubblesFormatted = JSON.stringify(bubbleList, null, 2)
    const kanjiFormatted = JSON.stringify(kanjiList, null, 2)
    const payload = `const PHANTOM_CHARACTERS: PhantomCharacter[] = ${charsFormatted}\n\nconst DEFAULT_BUBBLES: Record<string, BubbleConfig> = ${bubblesFormatted}\n\nconst DEFAULT_KANJI_CONFIGS: Record<string, KanjiConfig> = ${kanjiFormatted}`
    navigator.clipboard.writeText(payload)
    setCopiedSuccess(true)
    setTimeout(() => setCopiedSuccess(false), 2000)
  }

  const resetToDefaultPositions = () => {
    localStorage.removeItem('p5_characters_bocchi_v3')
    localStorage.removeItem('p5_characters_bocchi_v4')
    localStorage.removeItem('p5_bubbles_v2')
    localStorage.removeItem('p5_bubbles_v3')
    localStorage.removeItem('p5_kanji_v2')
    localStorage.removeItem('p5_kanji_v3')
    setCharacterList(PHANTOM_CHARACTERS)
    setBubbleList(DEFAULT_BUBBLES)
    setKanjiList(DEFAULT_KANJI_CONFIGS)
  }

  const handleStartDrag = (e: React.MouseEvent, charId: string) => {
    if (!isCalibratorOpen) return
    e.stopPropagation()
    e.preventDefault()
    setCalibratingCharId(charId)

    const startX = e.clientX
    const startY = e.clientY
    const target = characterList.find(c => c.id === charId)
    if (!target) return
    const initTx = target.tx
    const initTy = target.ty

    const onMouseMove = (ev: MouseEvent) => {
      const dx = (ev.clientX - startX) / scale
      const dy = (ev.clientY - startY) / scale
      const newTx = Math.round(initTx + dx)
      const newTy = Math.round(initTy + dy)

      setCharacterList(prev => {
        const next = prev.map(c => c.id === charId ? { ...c, tx: newTx, ty: newTy } : c)
        localStorage.setItem('p5_characters_bocchi_v3', JSON.stringify(next))
        return next
      })
    }

    const onMouseUp = () => {
      window.removeEventListener('mousemove', onMouseMove)
      window.removeEventListener('mouseup', onMouseUp)
    }

    window.addEventListener('mousemove', onMouseMove)
    window.addEventListener('mouseup', onMouseUp)
  }

  // Active tech item
  const activeTech = useMemo(() => {
    if (activeChar) {
      const found = TECH_DECK.find(t => t.id === activeChar.techId)
      if (found) return found
    }
    return TECH_DECK[0]
  }, [activeChar])

  const speedlinesTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    return () => {
      if (speedlinesTimerRef.current) {
        clearTimeout(speedlinesTimerRef.current)
      }
    }
  }, [])

  const handleSelectCharacter = useCallback((char: PhantomCharacter) => {
    playSlash()
    if (speedlinesTimerRef.current) {
      clearTimeout(speedlinesTimerRef.current)
    }
    setShowSpeedlines(true)
    speedlinesTimerRef.current = setTimeout(() => {
      setShowSpeedlines(false)
      speedlinesTimerRef.current = null
    }, 400)
    setHoveredCharId(null)
    setLastFocusOrigin({ originX: char.camera.originX, originY: char.camera.originY })
    setActiveCharId(char.id)
  }, [playSlash])

  const handleResetCamera = useCallback(() => {
    playBack()
    setHoveredCharId(null)
    setActiveCharId(null)
    // NOTE: lastFocusOrigin is deliberately preserved so that CSS transform-origin
    // stays pinned to the character's focus point while the camera smoothly scales back down to 1!
  }, [playBack])

  // Keyboard navigation: Shift+C for Calibrator, Escape for back/close
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Shift + C: Toggle Calibrator drawer
      if (e.shiftKey && (e.key === 'C' || e.key === 'c')) {
        e.preventDefault()
        playSlash()
        setIsCalibratorOpen(prev => !prev)
        return
      }

      if (e.key === 'Escape') {
        e.preventDefault()
        if (isCalibratorOpen) {
          setIsCalibratorOpen(false)
        } else if (activeCharId) {
          handleResetCamera()
        } else {
          playBack()
          onBack()
        }
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [activeCharId, isCalibratorOpen, onBack, playBack, playSlash, handleResetCamera])

  return (
    <div className="fixed inset-0 z-30 select-none overflow-hidden bg-black flex flex-col justify-between animate-in fade-in duration-300">
      
      {/* Hidden CJK Font Warm-up to prevent FOUT / squished font glitch on click */}
      <div className="sr-only font-p5Kanji" aria-hidden="true">
        {characterList.map(c => c.kanji).join(' ')}
      </div>

      {/* ── PERSONA 5 'TAKE YOUR TIME' INFILTRATION LOADING SCREEN ── */}
      {isAssetsLoading && (
        <div className="fixed inset-0 z-[100] bg-black flex flex-col justify-between p-6 sm:p-10 select-none animate-in fade-in duration-200">
          {/* Subtle Persona 5 Speedlines / Halftone Watermark */}
          <div className="absolute inset-0 pointer-events-none opacity-20 overflow-hidden">
            <div className="w-full h-full bg-[radial-gradient(circle_at_center,rgba(230,0,18,0.2)_0%,transparent_70%)]" />
          </div>

          {/* Top Left Title Stamp */}
          <div className="relative z-10 flex items-center gap-2">
            <span className="bg-[#E60012] text-white px-2 py-0.5 font-p5Heading text-xs font-black uppercase -skew-x-6 border border-black shadow-[2px_2px_0px_#000]">
              HIDEOUT
            </span>
            <span className="font-p5Sub text-xs text-zinc-400 tracking-widest uppercase">
              CAFE LEBLANC // ATTIC HEADQUARTERS
            </span>
          </div>

          {/* Center Subtle Infiltration Text */}
          <div className="relative z-10 self-center flex items-center gap-3">
            <span className="size-2 bg-red-600 animate-ping rounded-full" />
            <span className="font-p5Heading text-sm sm:text-base tracking-widest text-zinc-300 uppercase">
              INFILTRATING ATTIC...
            </span>
          </div>

          {/* Bottom Right: Iconic P5 Take Your Time Animated Mascot */}
          <TakeYourTime visible={true} />
        </div>
      )}

      {/* ── CINEMATIC LETTERBOX BLACK BARS (FOREGROUND LAYER - ZERO OUTLINE, ZERO TEXT) ── */}
      {/* Top Black Bar */}
      <div
        className={`fixed top-0 inset-x-0 z-[60] bg-black pointer-events-none transition-all duration-500 h-10 sm:h-12 md:h-14 lg:h-16 ${
          activeChar ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0'
        }`}
        style={{
          transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)',
        }}
      />

      {/* Bottom Black Bar */}
      <div
        className={`fixed bottom-0 inset-x-0 z-[60] bg-black pointer-events-none transition-all duration-500 h-10 sm:h-12 md:h-14 lg:h-16 ${
          activeChar ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0'
        }`}
        style={{
          transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)',
        }}
      />

      {/* ── ANIME SPEED LINES FLASH IMPACT OVERLAY ── */}
      {showSpeedlines && (
        <div className="pointer-events-none fixed inset-0 z-50 overflow-hidden p5-speedlines-anim">
          <svg className="w-full h-full opacity-60" viewBox="0 0 1000 1000" preserveAspectRatio="none">
            {Array.from({ length: 20 }).map((_, idx) => {
              const angle = (idx * 18 * Math.PI) / 180
              const x2 = 500 + Math.cos(angle) * 900
              const y2 = 500 + Math.sin(angle) * 900
              return (
                <line
                  key={idx}
                  x1="500"
                  y1="500"
                  x2={x2}
                  y2={y2}
                  stroke={idx % 2 === 0 ? '#E60012' : '#FFFFFF'}
                  strokeWidth={idx % 4 === 0 ? '3' : '1.5'}
                  strokeDasharray="80 160"
                />
              )
            })}
          </svg>
        </div>
      )}

      {/* ── TOP-LEFT: PERSONA 5 RANSOM 'HIDEOUT' BANNER (HIDES SWIFTLY WHEN CHARACTER IS SELECTED) ── */}
      <div
        className={`absolute top-4 left-4 sm:top-6 sm:left-6 z-40 flex flex-col items-start select-none pointer-events-none transition-all duration-500 ${
          activeChar
            ? '-translate-x-[120%] -translate-y-6 opacity-0'
            : 'translate-x-0 translate-y-0 opacity-100'
        }`}
        style={{
          transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)',
        }}
      >
        <div className="flex items-center gap-1 sm:gap-1.5 filter drop-shadow-[4px_4px_0px_#000000]">
          {['H', 'I', 'D', 'E', 'O', 'U', 'T'].map((char, i) => (
            <span
              key={i}
              style={{
                animationDelay: `${i * 50}ms`,
              }}
              className={`inline-flex items-center justify-center font-p5Heading text-2xl sm:text-3xl md:text-4xl min-w-[28px] sm:min-w-[34px] md:min-w-[42px] h-[34px] sm:h-[42px] md:h-[50px] px-1 border-[2.5px] border-black uppercase shadow-[3px_3px_0px_#000000] ${
                !isAssetsLoading ? 'p5-tile-entrance' : 'opacity-0'
              } ${
                i === 0
                  ? 'bg-black text-white -rotate-6'
                  : i === 1
                  ? 'bg-[#7C4A1E] text-white rotate-3 font-black scale-105'
                  : i === 2
                  ? 'bg-white text-black -rotate-3'
                  : i === 3
                  ? 'bg-black text-white rotate-4 border border-white'
                  : i === 4
                  ? 'bg-[#7C4A1E] text-white -rotate-2 font-black scale-110'
                  : i === 5
                  ? 'bg-white text-black rotate-3'
                  : 'bg-[#7C4A1E] text-white rotate-6 font-black scale-105'
              }`}
            >
              {char}
            </span>
          ))}
        </div>
        <div
          style={{ animationDelay: '360ms' }}
          className={`mt-1 flex items-center bg-black border-l-4 border-[#7C4A1E] px-2.5 sm:px-3 py-0.5 text-[10px] sm:text-xs font-p5Sub tracking-widest text-white -skew-x-6 shadow-[3px_3px_0px_#000000] ${
            !isAssetsLoading ? 'p5-sub-entrance' : 'opacity-0'
          }`}
        >
          <span className="text-yellow-400 font-bold mr-1.5">CAFE LEBLANC ATTIC</span>
          <span className="text-zinc-500 mx-1">//</span>
          <span className="text-zinc-200">
            {activeChar ? `${activeChar.name} [${activeChar.codename}]` : 'SELECT PHANTOM THIEF'}
          </span>
        </div>
      </div>

      {/* ── 2.5D LEBLANC ATTIC VIRTUAL CAMERA STAGE ── */}
      <div className={`relative w-full h-full flex items-center justify-center overflow-hidden transition-all duration-700 ease-out ${
        isEntranceAnimating ? 'scale-105 opacity-90' : 'scale-100 opacity-100'
      }`}>
        {/* Full-bleed Reference Stage Container */}
        <div ref={stageRef} className="relative w-full h-full select-none overflow-hidden">
          
          {/* Virtual 2.5D Camera Stage (Zooms and scales smoothly with hardware acceleration) */}
          <div
            className="absolute inset-0 w-full h-full select-none"
            style={{
              transform: activeChar
                ? `scale(${activeChar.camera.scale}) translate3d(0, 0, 0)`
                : 'scale(1) translate3d(0, 0, 0)',
              transformOrigin: `${lastFocusOrigin.originX}% ${lastFocusOrigin.originY}%`,
              transition: 'transform 600ms cubic-bezier(0.16, 1, 0.3, 1)',
              backfaceVisibility: 'hidden',
              WebkitBackfaceVisibility: 'hidden',
              willChange: 'transform',
              filter: 'contrast(1.12) brightness(0.93) saturate(1.18) sepia(0.12) hue-rotate(-5deg)',
            }}
          >
            {/* Base 3D Room Render Background */}
            <img
              src="/assets/background attic.jpe"
              alt="Cafe Leblanc Attic"
              onError={(e) => {
                (e.currentTarget as HTMLImageElement).src = '/assets/Background Joker Hideout.png'
              }}
              style={{
                imageRendering: '-webkit-optimize-contrast',
                willChange: 'transform',
              }}
              className="absolute inset-0 w-full h-full object-cover pointer-events-none select-none"
            />

            {/* Ambient Dark Dim Overlay (active when zoomed in, clickable to reset) */}
            <div
              onClick={handleResetCamera}
              className={`absolute inset-0 bg-black/60 transition-opacity duration-500 z-10 ${
                activeChar ? 'opacity-100 pointer-events-auto cursor-pointer' : 'opacity-0 pointer-events-none'
              }`}
            />

            {/* ── GIANT JAPANESE KANJI WATERMARK (AUTENTIK MANGA MINCHO, Z-INDEX 30 - DI ATAS MASKINGAN) ── */}
            {activeChar && (() => {
              const kConfig = kanjiList[activeChar.id] || DEFAULT_KANJI_CONFIGS[activeChar.id] || DEFAULT_KANJI_CONFIGS.joker
              const posX = activeChar.camera.originX + (kConfig.x || 0)
              const posY = activeChar.camera.originY + (kConfig.y || 0)
              // Counter-scale font so it stays sharp, elegant, and consistent across different camera zoom levels
              const fontVw = 11 / (activeChar.camera.scale * 0.72)

              return (
                <div
                  key={activeChar.id}
                  style={{
                    zIndex: 30, // Above all furniture masks (21, 25, 27) so it's NEVER covered by masks!
                    left: `${posX}%`,
                    top: `${posY}%`,
                    transform: 'translate(-50%, -50%)',
                    opacity: kConfig.opacity ?? 0.22,
                  }}
                  className="absolute pointer-events-none select-none whitespace-nowrap"
                >
                  <div className="p5-splash-text-anim origin-center">
                    <div
                      style={{
                        transform: `rotate(${kConfig.rotate ?? -8}deg) scale(${kConfig.scale ?? 1})`,
                        transformOrigin: 'center center',
                      }}
                    >
                      <span
                        style={{
                          fontSize: `${fontVw}vw`,
                          letterSpacing: '0.12em',
                        }}
                        className="font-p5Kanji font-black text-white select-none tracking-widest drop-shadow-[0_0_24px_rgba(0,0,0,0.8)] inline-block"
                      >
                        {activeChar.kanji}
                      </span>
                    </div>
                  </div>
                </div>
              )
            })()}

            {/* 6 Character Cutout Sprites with Contact Shadows & Warm Lighting */}
            {characterList.map((char) => {
              const isSelected = activeChar?.id === char.id
              const isDimmed = Boolean(activeChar && !isSelected)
              const isHovered = Boolean(!activeChar && hoveredCharId === char.id)
              const isCalibrating = isCalibratorOpen && calibratingCharId === char.id

              return (
                <div
                  key={char.id}
                  onMouseDown={(e) => {
                    if (isCalibratorOpen) {
                      handleStartDrag(e, char.id)
                    }
                  }}
                  onClick={(e) => {
                    e.stopPropagation()
                    if (isCalibratorOpen) {
                      setCalibratingCharId(char.id)
                      return
                    }
                    setHoveredCharId(null)
                    handleSelectCharacter(char)
                  }}
                  onMouseEnter={() => {
                    if (!activeChar && !isCalibratorOpen) {
                      playHover()
                      setHoveredCharId(char.id)
                    }
                  }}
                  onMouseLeave={() => {
                    setHoveredCharId(null)
                  }}
                  style={{
                    transform: `translate(${char.tx * scale}px, ${char.ty * scale}px) scale(${scale})`,
                    transformOrigin: 'top left',
                    width: `${char.width}px`,
                    zIndex: isSelected ? 35 : char.zIndex,
                  }}
                  className={`
                    absolute top-1/2 left-1/2 select-none transition-opacity duration-400
                    ${isCalibratorOpen ? 'cursor-grab active:cursor-grabbing' : 'cursor-pointer'}
                    ${isCalibrating ? 'ring-2 ring-yellow-400 ring-offset-2 ring-offset-black rounded' : ''}
                    ${isDimmed
                      ? 'opacity-20 pointer-events-none'
                      : 'opacity-100'
                    }
                  `}
                  title={isCalibratorOpen ? `Drag to position ${char.name}` : `Select ${char.name} [${char.codename}]`}
                >
                  {/* Realistic Contact Shadow (Floor / Tabletop) with zero-cost radial-gradient */}
                  <div
                    className={`
                      absolute -bottom-1 left-1/2 -translate-x-1/2 pointer-events-none rounded-[50%] -skew-x-12 transition-opacity duration-300
                      ${isHovered ? 'opacity-95' : 'opacity-85'}
                    `}
                    style={{
                      width: `${char.shadowWidth}%`,
                      height: `${char.shadowHeight}px`,
                      background: 'radial-gradient(ellipse at center, rgba(16, 9, 5, 0.92) 0%, rgba(25, 13, 7, 0.45) 55%, transparent 75%)',
                    }}
                  />

                  {/* Character Cutout Image - High-Definition Crisp Rendering */}
                  <img
                    src={char.src}
                    alt={char.name}
                    style={{
                      imageRendering: '-webkit-optimize-contrast',
                      willChange: 'transform',
                      filter: isHovered
                        ? `brightness(1.1) contrast(1.08)`
                        : `brightness(${char.brightness}) contrast(1.02)`,
                      transition: 'filter 180ms ease-out',
                    }}
                    className="w-full h-auto object-contain select-none pointer-events-auto"
                  />
                </div>
              )
            })}

            {/* ── OPTICAL ILLUSION FOREGROUND FURNITURE MASKS ── */}
            {/* 1. Tiang Rak Kanan (Layer 21) */}
            <img
              src="/assets/self.png"
              alt=""
              style={{
                zIndex: 21,
                imageRendering: '-webkit-optimize-contrast',
                willChange: 'transform',
              }}
              className="absolute inset-0 w-full h-full object-cover pointer-events-none select-none"
            />

            {/* 2. Pagar Tangga Kiri Bawah (Layer 25) */}
            <img
              src="/assets/handlestairs.png"
              alt=""
              style={{
                zIndex: 25,
                imageRendering: '-webkit-optimize-contrast',
                willChange: 'transform',
              }}
              className="absolute inset-0 w-full h-full object-cover pointer-events-none select-none"
            />

            {/* 3. Meja / Tatami Depan Kanan Bawah (Layer 27) */}
            <img
              src="/assets/tablefront.png"
              alt=""
              style={{
                zIndex: 27,
                imageRendering: '-webkit-optimize-contrast',
                willChange: 'transform',
              }}
              className="absolute inset-0 w-full h-full object-cover pointer-events-none select-none"
            />

            {/* 4. Cinematic Warm Atmospheric Light Wash Overlay (Recreates the video editing LUT) */}
            <div
              className="absolute inset-0 pointer-events-none select-none"
              style={{
                zIndex: 28,
                mixBlendMode: 'soft-light',
                background: 'radial-gradient(circle at 58% 32%, rgba(255, 175, 55, 0.35) 0%, rgba(210, 120, 25, 0.22) 50%, rgba(50, 25, 12, 0.32) 100%)',
              }}
            />
          </div>

          {/* ── PERSONA 5 MANGA DIALOGUE SPEECH BUBBLE ── */}
          {activeChar && activeTech && (() => {
            const bubble = bubbleList[activeChar.id] || DEFAULT_BUBBLES[activeChar.id] || DEFAULT_BUBBLES.joker
            const desktopStyle: React.CSSProperties = bubble.side === 'right'
              ? { left: `${bubble.posX}%`, top: `${bubble.top}%` }
              : { right: `${bubble.posX}%`, top: `${bubble.top}%` }
            const tailSide = bubble.side === 'right' ? 'left' : 'right'
            const tailTop = `${bubble.tailTop}%`
            return (
              <div
                onClick={(e) => e.stopPropagation()}
                className="
                  absolute z-40 p5-bubble-pop-anim pointer-events-auto select-none
                  w-[92%] sm:w-[380px] md:w-[420px] lg:w-[460px] max-w-[480px]
                  bottom-4 left-1/2 -translate-x-1/2
                  sm:bottom-auto sm:left-auto sm:translate-x-0
                "
                style={desktopStyle}
              >
                <div className="relative bg-black/95 border-[3px] border-white p-3.5 sm:p-4 shadow-[6px_6px_0px_#E60012,12px_12px_0px_#000000] -skew-x-2">
                  
                  {/* Comic Speech Pointer Tail (SVG Beak) */}
                  {tailSide === 'left' && (
                    <div
                      className="hidden sm:block absolute -left-[19px] pointer-events-none filter drop-shadow-[-2px_2px_0px_#000000]"
                      style={{ top: tailTop }}
                    >
                      <svg width="22" height="24" viewBox="0 0 22 24" fill="none">
                        <polygon
                          points="22,0 0,12 22,24"
                          fill="#09090b"
                          stroke="#FFFFFF"
                          strokeWidth="3"
                          strokeLinejoin="miter"
                        />
                      </svg>
                    </div>
                  )}

                  {tailSide === 'right' && (
                    <div
                      className="hidden sm:block absolute -right-[19px] pointer-events-none filter drop-shadow-[2px_2px_0px_#000000]"
                      style={{ top: tailTop }}
                    >
                      <svg width="22" height="24" viewBox="0 0 22 24" fill="none">
                        <polygon
                          points="0,0 22,12 0,24"
                          fill="#09090b"
                          stroke="#FFFFFF"
                          strokeWidth="3"
                          strokeLinejoin="miter"
                        />
                      </svg>
                    </div>
                  )}

                  {/* Header: Persona Ransom Tag + Kanji + Tech Element Badge */}
                  <div className="flex items-center justify-between border-b-2 border-zinc-800 pb-2 mb-2.5">
                    <div className="flex items-center gap-2">
                      <span
                        className="px-2.5 py-0.5 font-p5Heading text-xs sm:text-sm font-black uppercase -skew-x-6 border-2 border-black shadow-[2px_2px_0px_#000]"
                        style={{
                          backgroundColor: activeChar.thiefColor || '#E60012',
                          color: activeChar.thiefTextColor || '#FFFFFF',
                        }}
                      >
                        ★ {activeChar.codename}
                      </span>
                      <span className="font-p5Mono text-xs text-yellow-400 font-black tracking-wider">
                        {activeChar.kanji}
                      </span>
                    </div>

                    <div className="flex items-center gap-1.5">
                      <span className="font-p5Sub text-[10px] sm:text-xs font-black text-white bg-zinc-900 px-2 py-0.5 border border-zinc-700 tracking-wider">
                        {activeTech.name}
                      </span>
                    </div>
                  </div>

                  {/* Persona Comic Dialogue Quote */}
                  <div className="relative mb-3 bg-zinc-900/90 p-2.5 sm:p-3 border-l-4 border-[#E60012] -skew-x-1">
                    <span className="text-[#E60012] font-p5Heading font-black text-2xl leading-none select-none mr-1 inline-block align-top">
                      “
                    </span>
                    <span className="font-p5Body text-xs sm:text-[13px] text-zinc-100 font-bold leading-relaxed">
                      {activeChar.quote}
                    </span>
                    <span className="text-[#E60012] font-p5Heading font-black text-2xl leading-none select-none ml-1 inline-block align-bottom">
                      ”
                    </span>
                  </div>

                  {/* Clean Tech Arsenal & Libraries */}
                  <div className="space-y-1.5 mb-2.5 bg-zinc-950 p-2.5 border border-zinc-800">
                    <div className="text-[10px] font-p5Sub uppercase tracking-widest text-zinc-400 flex items-center justify-between">
                      <span className="text-yellow-400 font-bold flex items-center gap-1">
                        <Sparkles className="size-3 text-yellow-400" />
                        TECH ARSENAL
                      </span>
                      <span className="text-zinc-500 font-mono text-[9px]">{activeChar.role}</span>
                    </div>
                    <div className="flex flex-wrap gap-1.5 pt-0.5">
                      {activeTech.libraries.map((lib) => (
                        <span
                          key={lib}
                          className="bg-zinc-900 text-zinc-200 px-2 py-0.5 text-[10px] sm:text-[11px] font-p5Mono border border-zinc-700 shadow-[1px_1px_0px_#000]"
                        >
                          {lib}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Footer Hint: Press ESC or Click anywhere to return */}
                  <div className="flex items-center justify-between pt-2 border-t border-zinc-800 text-zinc-400 font-p5Sub text-[10px] uppercase">
                    <button
                      onClick={handleResetCamera}
                      className="flex items-center gap-1.5 text-zinc-400 hover:text-white transition-colors cursor-pointer group"
                    >
                      <span className="size-4 rounded-full border border-[#E60012] text-[#E60012] flex items-center justify-center text-[10px] font-bold group-hover:bg-[#E60012] group-hover:text-white transition-colors">
                        O
                      </span>
                      <span>BACK [ESC]</span>
                    </button>
                    <span className="text-zinc-500 text-[9px] font-mono">
                      CLICK ANYWHERE TO RETURN
                    </span>
                  </div>

                </div>
              </div>
            )
          })()}

        </div>
      </div>

      {/* ── BOTTOM HUD: OVERVIEW MODE (BACK TO MAIN MENU) ── */}
      {!activeChar && (
        <div className="absolute bottom-4 left-4 sm:bottom-6 sm:left-6 z-40 flex items-center gap-4 pointer-events-auto p5-footer-entrance">
          <button
            onClick={() => {
              playBack()
              onBack()
            }}
            className="flex items-center gap-1.5 text-zinc-300 hover:text-white group cursor-pointer transition-colors"
            title="Return to Main Menu"
          >
            <span className="size-5 rounded-full border-2 border-red-500 text-red-500 font-bold flex items-center justify-center text-[11px] group-hover:bg-red-500 group-hover:text-white transition-colors shadow-[0_0_6px_rgba(239,68,68,0.4)]">
              O
            </span>
            <span className="font-p5Heading text-sm tracking-wider uppercase">BACK TO MENU</span>
          </button>
        </div>
      )}


      {/* ── TACTICAL POSITION CALIBRATOR (ACCESSIBLE VIA SHIFT + C) ── */}
      {isCalibratorOpen && (
        <div className="fixed top-4 right-4 z-[70] flex flex-col items-end animate-in fade-in zoom-in-95 duration-200">
          <div className="w-[340px] sm:w-[380px] bg-black/95 border-2 border-yellow-400 text-white p-3.5 shadow-[6px_6px_0px_#000] max-h-[85vh] overflow-y-auto font-sans text-xs">
            {/* Header */}
            <div className="flex items-center justify-between border-b border-zinc-800 pb-2 mb-3">
              <div className="flex items-center gap-1.5">
                <Move className="size-4 text-yellow-400" />
                <span className="font-p5Heading text-sm font-bold text-yellow-400">POSITION CALIBRATOR</span>
              </div>
              <button
                onClick={() => setIsCalibratorOpen(false)}
                className="px-2 py-0.5 bg-zinc-800 hover:bg-[#E60012] text-zinc-300 hover:text-white font-mono text-[10px] rounded transition-colors cursor-pointer"
                title="Close (Shift+C or Esc)"
              >
                ✕ CLOSE [Shift+C]
              </button>
            </div>

            {/* Character Selector Tabs */}
            <div className="grid grid-cols-3 gap-1 mb-3">
              {characterList.map((c) => (
                <button
                  key={c.id}
                  onClick={() => setCalibratingCharId(c.id)}
                  className={`px-2 py-1 text-center font-p5Heading text-xs uppercase -skew-x-3 border transition-colors ${
                    calibratingCharId === c.id
                      ? 'bg-yellow-400 text-black border-black font-black'
                      : 'bg-zinc-900 text-zinc-300 border-zinc-700 hover:bg-zinc-800'
                  }`}
                >
                  {c.codename}
                </button>
              ))}
            </div>

            {/* Selected Character Info */}
            <div className="flex items-center justify-between bg-zinc-900 px-2.5 py-1.5 border border-zinc-800 mb-3 text-[11px] font-mono">
              <span className="text-white font-bold">{calibratingChar.name}</span>
              <span className="text-yellow-400">z-index: {calibratingChar.zIndex}</span>
            </div>

            {/* Live Camera & Bubble Preview Toggle */}
            <button
              onClick={() => {
                if (activeCharId === calibratingChar.id) {
                  handleResetCamera()
                } else {
                  setActiveCharId(calibratingChar.id)
                  setLastFocusOrigin({ originX: calibratingChar.camera.originX, originY: calibratingChar.camera.originY })
                }
              }}
              className={`w-full py-1.5 px-3 mb-2.5 font-p5Heading text-xs uppercase -skew-x-3 border-2 border-black flex items-center justify-center gap-2 shadow-[2px_2px_0px_#000] cursor-pointer transition-colors ${
                activeCharId === calibratingChar.id
                  ? 'bg-[#E60012] text-white hover:bg-red-700'
                  : 'bg-yellow-400 text-black hover:bg-yellow-300 font-black'
              }`}
            >
              <span>{activeCharId === calibratingChar.id ? '✕ RETURN TO ROOM' : '👁️ PREVIEW ZOOM & BUBBLE'}</span>
            </button>

            {/* Calibrator Mode Sub-Tabs */}
            <div className="grid grid-cols-4 gap-1 mb-3 bg-zinc-900 p-1 border border-zinc-800">
              <button
                onClick={() => setCalibratorTab('char')}
                className={`py-1 text-center font-p5Heading text-[10px] sm:text-[11px] uppercase transition-colors ${
                  calibratorTab === 'char' ? 'bg-[#E60012] text-white font-bold' : 'text-zinc-400 hover:text-white'
                }`}
              >
                1. CHAR
              </button>
              <button
                onClick={() => setCalibratorTab('camera')}
                className={`py-1 text-center font-p5Heading text-[10px] sm:text-[11px] uppercase transition-colors ${
                  calibratorTab === 'camera' ? 'bg-[#E60012] text-white font-bold' : 'text-zinc-400 hover:text-white'
                }`}
              >
                2. CAM
              </button>
              <button
                onClick={() => setCalibratorTab('bubble')}
                className={`py-1 text-center font-p5Heading text-[10px] sm:text-[11px] uppercase transition-colors ${
                  calibratorTab === 'bubble' ? 'bg-[#E60012] text-white font-bold' : 'text-zinc-400 hover:text-white'
                }`}
              >
                3. BUBBLE
              </button>
              <button
                onClick={() => setCalibratorTab('kanji')}
                className={`py-1 text-center font-p5Heading text-[10px] sm:text-[11px] uppercase transition-colors ${
                  calibratorTab === 'kanji' ? 'bg-[#E60012] text-white font-bold' : 'text-zinc-400 hover:text-white'
                }`}
              >
                4. KANJI
              </button>
            </div>

            {/* Tab 1: Character Position & Size */}
            {calibratorTab === 'char' && (
              <div className="space-y-2.5 font-mono text-[11px]">
                {/* Horizontal (Offset X px) */}
                <div>
                  <div className="flex justify-between text-zinc-300 mb-1">
                    <span>Horizontal (Offset X):</span>
                    <span className="text-yellow-400 font-bold">{calibratingChar.tx}px</span>
                  </div>
                  <input
                    type="range"
                    min="-960"
                    max="960"
                    step="2"
                    value={calibratingChar.tx}
                    onChange={(e) => updateCalibratingChar({ tx: parseInt(e.target.value, 10) })}
                    className="w-full accent-yellow-400 cursor-pointer"
                  />
                </div>

                {/* Vertical (Offset Y px) */}
                <div>
                  <div className="flex justify-between text-zinc-300 mb-1">
                    <span>Vertical (Offset Y):</span>
                    <span className="text-yellow-400 font-bold">{calibratingChar.ty}px</span>
                  </div>
                  <input
                    type="range"
                    min="-540"
                    max="540"
                    step="2"
                    value={calibratingChar.ty}
                    onChange={(e) => updateCalibratingChar({ ty: parseInt(e.target.value, 10) })}
                    className="w-full accent-yellow-400 cursor-pointer"
                  />
                </div>

                {/* Width (px Size) */}
                <div>
                  <div className="flex justify-between text-zinc-300 mb-1">
                    <span>Size (Width):</span>
                    <span className="text-yellow-400 font-bold">{calibratingChar.width}px</span>
                  </div>
                  <input
                    type="range"
                    min="40"
                    max="600"
                    step="2"
                    value={calibratingChar.width}
                    onChange={(e) => updateCalibratingChar({ width: parseInt(e.target.value, 10) })}
                    className="w-full accent-yellow-400 cursor-pointer"
                  />
                </div>

                {/* Z-Index */}
                <div className="flex items-center justify-between pt-1">
                  <span className="text-zinc-300">Z-Index Layer:</span>
                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => updateCalibratingChar({ zIndex: Math.max(1, calibratingChar.zIndex - 1) })}
                      className="px-2 py-0.5 bg-zinc-800 hover:bg-zinc-700 border border-zinc-600 rounded font-bold"
                    >
                      -
                    </button>
                    <span className="w-8 text-center text-yellow-400 font-bold">{calibratingChar.zIndex}</span>
                    <button
                      onClick={() => updateCalibratingChar({ zIndex: calibratingChar.zIndex + 1 })}
                      className="px-2 py-0.5 bg-zinc-800 hover:bg-zinc-700 border border-zinc-600 rounded font-bold"
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Tab 2: Camera Zoom & Framing */}
            {calibratorTab === 'camera' && (
              <div className="space-y-2.5 font-mono text-[11px]">
                {/* Camera Zoom Scale */}
                <div>
                  <div className="flex justify-between text-zinc-300 mb-1">
                    <span>Zoom Scale:</span>
                    <span className="text-yellow-400 font-bold">{calibratingChar.camera.scale}x</span>
                  </div>
                  <input
                    type="range"
                    min="1.3"
                    max="3.2"
                    step="0.05"
                    value={calibratingChar.camera.scale}
                    onChange={(e) => updateCalibratingChar({
                      camera: { ...calibratingChar.camera, scale: parseFloat(e.target.value) }
                    })}
                    className="w-full accent-yellow-400 cursor-pointer"
                  />
                </div>

                {/* Camera Origin X */}
                <div>
                  <div className="flex justify-between text-zinc-300 mb-1">
                    <span>Camera Focus X (%):</span>
                    <span className="text-yellow-400 font-bold">{calibratingChar.camera.originX}%</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    step="0.5"
                    value={calibratingChar.camera.originX}
                    onChange={(e) => updateCalibratingChar({
                      camera: { ...calibratingChar.camera, originX: parseFloat(e.target.value) }
                    })}
                    className="w-full accent-yellow-400 cursor-pointer"
                  />
                </div>

                {/* Camera Origin Y */}
                <div>
                  <div className="flex justify-between text-zinc-300 mb-1">
                    <span>Camera Focus Y (%):</span>
                    <span className="text-yellow-400 font-bold">{calibratingChar.camera.originY}%</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    step="0.5"
                    value={calibratingChar.camera.originY}
                    onChange={(e) => updateCalibratingChar({
                      camera: { ...calibratingChar.camera, originY: parseFloat(e.target.value) }
                    })}
                    className="w-full accent-yellow-400 cursor-pointer"
                  />
                </div>
              </div>
            )}

            {/* Tab 3: Speech Bubble Position Controls */}
            {calibratorTab === 'bubble' && (() => {
              const currentBubble = bubbleList[calibratingCharId] || DEFAULT_BUBBLES[calibratingCharId] || DEFAULT_BUBBLES.joker
              return (
                <div className="space-y-3 font-mono text-[11px]">
                  {/* Bubble Placement Side */}
                  <div className="flex items-center justify-between">
                    <span className="text-zinc-300">Anchor Side:</span>
                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => updateCalibratingBubble({ side: 'left' })}
                        className={`px-2 py-0.5 font-p5Heading text-xs uppercase border ${
                          currentBubble.side === 'left' ? 'bg-yellow-400 text-black border-black font-bold' : 'bg-zinc-800 text-zinc-300 border-zinc-700'
                        }`}
                      >
                        LEFT
                      </button>
                      <button
                        onClick={() => updateCalibratingBubble({ side: 'right' })}
                        className={`px-2 py-0.5 font-p5Heading text-xs uppercase border ${
                          currentBubble.side === 'right' ? 'bg-yellow-400 text-black border-black font-bold' : 'bg-zinc-800 text-zinc-300 border-zinc-700'
                        }`}
                      >
                        RIGHT
                      </button>
                    </div>
                  </div>

                  {/* Horizontal Position (posX %) */}
                  <div>
                    <div className="flex justify-between text-zinc-300 mb-1">
                      <span>Horizontal Offset ({currentBubble.side === 'right' ? 'Left' : 'Right'} %):</span>
                      <span className="text-yellow-400 font-bold">{currentBubble.posX}%</span>
                    </div>
                    <input
                      type="range"
                      min="5"
                      max="85"
                      step="1"
                      value={currentBubble.posX}
                      onChange={(e) => updateCalibratingBubble({ posX: parseInt(e.target.value, 10) })}
                      className="w-full accent-yellow-400 cursor-pointer"
                    />
                  </div>

                  {/* Vertical Position (top %) */}
                  <div>
                    <div className="flex justify-between text-zinc-300 mb-1">
                      <span>Vertical Offset (Top %):</span>
                      <span className="text-yellow-400 font-bold">{currentBubble.top}%</span>
                    </div>
                    <input
                      type="range"
                      min="2"
                      max="75"
                      step="1"
                      value={currentBubble.top}
                      onChange={(e) => updateCalibratingBubble({ top: parseInt(e.target.value, 10) })}
                      className="w-full accent-yellow-400 cursor-pointer"
                    />
                  </div>

                  {/* Tail Height (% from top of bubble) */}
                  <div>
                    <div className="flex justify-between text-zinc-300 mb-1">
                      <span>Tail Beak Height (Top %):</span>
                      <span className="text-yellow-400 font-bold">{currentBubble.tailTop}%</span>
                    </div>
                    <input
                      type="range"
                      min="10"
                      max="90"
                      step="1"
                      value={currentBubble.tailTop}
                      onChange={(e) => updateCalibratingBubble({ tailTop: parseInt(e.target.value, 10) })}
                      className="w-full accent-yellow-400 cursor-pointer"
                    />
                  </div>
                </div>
              )
            })()}

            {/* Tab 4: Giant Kanji Watermark Position & Opacity */}
            {calibratorTab === 'kanji' && (() => {
              const currentKanji = kanjiList[calibratingChar.id] || DEFAULT_KANJI_CONFIGS[calibratingChar.id] || DEFAULT_KANJI_CONFIGS.joker
              return (
                <div className="space-y-2.5 font-mono text-[11px]">
                  {/* Info Header */}
                  <div className="bg-zinc-900/80 p-2 border border-zinc-800 text-[10px] text-zinc-400">
                    <span className="text-yellow-400 font-bold block mb-0.5">KANJI: {calibratingChar.kanji}</span>
                    <span>Tersinkronisasi otomatis dengan fokus zoom kamera.</span>
                  </div>

                  {/* Offset X Slider */}
                  <div>
                    <div className="flex justify-between text-zinc-300 mb-0.5">
                      <span>OFFSET X (%):</span>
                      <span className="text-yellow-400 font-bold">{currentKanji.x}%</span>
                    </div>
                    <input
                      type="range"
                      min="-40"
                      max="40"
                      step="1"
                      value={currentKanji.x}
                      onChange={(e) => updateCalibratingKanji({ x: parseInt(e.target.value, 10) })}
                      className="w-full accent-yellow-400 cursor-pointer"
                    />
                  </div>

                  {/* Offset Y Slider */}
                  <div>
                    <div className="flex justify-between text-zinc-300 mb-0.5">
                      <span>OFFSET Y (%):</span>
                      <span className="text-yellow-400 font-bold">{currentKanji.y}%</span>
                    </div>
                    <input
                      type="range"
                      min="-40"
                      max="40"
                      step="1"
                      value={currentKanji.y}
                      onChange={(e) => updateCalibratingKanji({ y: parseInt(e.target.value, 10) })}
                      className="w-full accent-yellow-400 cursor-pointer"
                    />
                  </div>

                  {/* Rotation Slider */}
                  <div>
                    <div className="flex justify-between text-zinc-300 mb-0.5">
                      <span>ROTATION:</span>
                      <span className="text-yellow-400 font-bold">{currentKanji.rotate}°</span>
                    </div>
                    <input
                      type="range"
                      min="-30"
                      max="30"
                      step="1"
                      value={currentKanji.rotate}
                      onChange={(e) => updateCalibratingKanji({ rotate: parseInt(e.target.value, 10) })}
                      className="w-full accent-yellow-400 cursor-pointer"
                    />
                  </div>

                  {/* Opacity Slider */}
                  <div>
                    <div className="flex justify-between text-zinc-300 mb-0.5">
                      <span>OPACITY:</span>
                      <span className="text-yellow-400 font-bold">{Math.round(currentKanji.opacity * 100)}%</span>
                    </div>
                    <input
                      type="range"
                      min="0.05"
                      max="0.80"
                      step="0.01"
                      value={currentKanji.opacity}
                      onChange={(e) => updateCalibratingKanji({ opacity: parseFloat(e.target.value) })}
                      className="w-full accent-yellow-400 cursor-pointer"
                    />
                  </div>

                  {/* Scale Multiplier */}
                  <div>
                    <div className="flex justify-between text-zinc-300 mb-0.5">
                      <span>SCALE:</span>
                      <span className="text-yellow-400 font-bold">{currentKanji.scale}x</span>
                    </div>
                    <input
                      type="range"
                      min="0.5"
                      max="2.0"
                      step="0.05"
                      value={currentKanji.scale}
                      onChange={(e) => updateCalibratingKanji({ scale: parseFloat(e.target.value) })}
                      className="w-full accent-yellow-400 cursor-pointer"
                    />
                  </div>
                </div>
              )
            })()}

            {/* Bottom Actions */}
            <div className="flex items-center gap-2 pt-3 border-t border-zinc-800 mt-3">
              <button
                onClick={copyConfigToClipboard}
                className="flex-1 flex items-center justify-center gap-1.5 bg-[#E60012] hover:bg-red-700 text-white font-p5Heading text-xs py-1.5 border border-black shadow-[2px_2px_0px_#000]"
              >
                {copiedSuccess ? <Check className="size-3.5 text-green-400" /> : <Copy className="size-3.5" />}
                <span>{copiedSuccess ? 'COPIED TO CLIPBOARD!' : 'COPY TS CODE'}</span>
              </button>

              <button
                onClick={resetToDefaultPositions}
                className="px-2.5 py-1.5 bg-zinc-800 hover:bg-zinc-700 text-zinc-300 font-p5Heading text-xs border border-zinc-700"
                title="Reset to default positions"
              >
                <RotateCcw className="size-3.5" />
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  )
}
