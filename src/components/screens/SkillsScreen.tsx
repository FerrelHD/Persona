import React, { useState, useEffect, useCallback, useMemo } from 'react'
import { usePersonaSFX } from '@/hooks/usePersonaSFX'
import { PhantomDagger } from '@/components/common/PhantomDagger'
import { Zap, Sparkles, Shield, Flame, Sword, Crosshair, HeartPulse, RefreshCw, X, ChevronRight, Layers } from 'lucide-react'

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

const RADAR_STATS = [
  { key: 'ST', label: 'STRENGTH (FRONTEND)', value: 98, angle: -90 },
  { key: 'MA', label: 'MAGIC (AI & NLP)', value: 94, angle: -18 },
  { key: 'EN', label: 'ENDURANCE (BACKEND)', value: 89, angle: 54 },
  { key: 'AG', label: 'AGILITY (PERF & VITE)', value: 96, angle: 126 },
  { key: 'LU', label: 'LUCK (GAME & SHADERS)', value: 90, angle: 198 },
]

// ── BRAND CONTRAST HELPER FOR P5 RIBBON LABELS ──
const getRibbonTextColor = (hexColor: string) => {
  const lightColors = ['#00D4FF', '#FFD43B', '#FACC15', '#FFFFFF', '#38BDF8', '#00FF66', '#FFE500', '#FFD700', '#00E5A3', '#00A3FF']
  return lightColors.includes(hexColor.toUpperCase()) ? '#000000' : '#FFFFFF'
}

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
  left: number
  bottom: number
  widthPercent: number
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
    left: 16.3,
    bottom: 12.5,
    widthPercent: 12,
    zIndex: 24,
    shadowWidth: 72,
    shadowHeight: 12,
    brightness: 0.96,
    warmth: 0.08,
    camera: { scale: 1.95, originX: 21.8, originY: 42 },
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
    left: 28.5,
    bottom: 17.5,
    widthPercent: 9,
    zIndex: 22,
    shadowWidth: 76,
    shadowHeight: 10,
    brightness: 0.95,
    warmth: 0.08,
    camera: { scale: 2.05, originX: 33.0, originY: 44 },
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
    left: 42,
    bottom: 51,
    widthPercent: 4.5,
    zIndex: 25,
    shadowWidth: 68,
    shadowHeight: 6,
    brightness: 0.98,
    warmth: 0.1,
    camera: { scale: 2.45, originX: 44.2, originY: 46 },
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
    left: 48.5,
    bottom: 24,
    widthPercent: 8,
    zIndex: 20,
    shadowWidth: 75,
    shadowHeight: 10,
    brightness: 0.95,
    warmth: 0.08,
    camera: { scale: 2.05, originX: 52.5, originY: 46 },
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
    left: 70.5,
    bottom: 38.5,
    widthPercent: 5.5,
    zIndex: 18,
    shadowWidth: 70,
    shadowHeight: 8,
    brightness: 0.94,
    warmth: 0.08,
    camera: { scale: 2.15, originX: 73.2, originY: 42 },
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
    left: 74,
    bottom: 9.5,
    widthPercent: 16.5,
    zIndex: 26,
    shadowWidth: 75,
    shadowHeight: 14,
    brightness: 0.97,
    warmth: 0.08,
    camera: { scale: 1.9, originX: 82.0, originY: 40 },
  },
]

// ── PERSONA 5 FLOATING COMIC SPEECH BUBBLE POSITIONS (OPSI A) ──
interface BubblePosition {
  side: 'left' | 'right'
  desktopStyle: React.CSSProperties
  tailSide: 'left' | 'right'
  tailTop: string
}

const BUBBLE_POSITIONS: Record<string, BubblePosition> = {
  yusuke: {
    side: 'right',
    desktopStyle: { left: '34%', top: '16%' },
    tailSide: 'left',
    tailTop: '35%',
  },
  futaba: {
    side: 'right',
    desktopStyle: { left: '43%', top: '16%' },
    tailSide: 'left',
    tailTop: '35%',
  },
  morgana: {
    side: 'right',
    desktopStyle: { left: '50%', top: '15%' },
    tailSide: 'left',
    tailTop: '40%',
  },
  ryuji: {
    side: 'left',
    desktopStyle: { right: '55%', top: '16%' },
    tailSide: 'right',
    tailTop: '35%',
  },
  ann: {
    side: 'left',
    desktopStyle: { right: '32%', top: '16%' },
    tailSide: 'right',
    tailTop: '35%',
  },
  joker: {
    side: 'left',
    desktopStyle: { right: '31%', top: '16%' },
    tailSide: 'right',
    tailTop: '35%',
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

  // Tactical Modal Inspector
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false)
  const [modalTechIndex, setModalTechIndex] = useState<number>(0)

  // Active character object
  const activeChar = useMemo(() => {
    return PHANTOM_CHARACTERS.find(c => c.id === activeCharId) || null
  }, [activeCharId])

  // Active tech item
  const activeTech = useMemo(() => {
    if (isModalOpen) {
      return TECH_DECK[modalTechIndex] || TECH_DECK[0]
    }
    if (activeChar) {
      const found = TECH_DECK.find(t => t.id === activeChar.techId)
      if (found) return found
    }
    return TECH_DECK[0]
  }, [activeChar, isModalOpen, modalTechIndex])

  const activeIndex = useMemo(() => {
    const idx = TECH_DECK.findIndex(t => t.id === activeTech.id)
    return idx >= 0 ? idx : 0
  }, [activeTech])

  const handleSelectCharacter = useCallback((char: PhantomCharacter) => {
    playSlash()
    setShowSpeedlines(true)
    setTimeout(() => setShowSpeedlines(false), 400)
    setHoveredCharId(null)
    setLastFocusOrigin({ originX: char.camera.originX, originY: char.camera.originY })
    setActiveCharId(char.id)
    const techIdx = TECH_DECK.findIndex(t => t.id === char.techId)
    if (techIdx >= 0) setModalTechIndex(techIdx)
  }, [playSlash])

  const handleResetCamera = useCallback(() => {
    playBack()
    setHoveredCharId(null)
    setActiveCharId(null)
    // NOTE: lastFocusOrigin is deliberately preserved so that CSS transform-origin
    // stays pinned to the character's focus point while the camera smoothly scales back down to 1!
  }, [playBack])

  const openInspector = useCallback(() => {
    playSlash()
    setIsModalOpen(true)
  }, [playSlash])

  const closeInspector = useCallback(() => {
    playBack()
    setIsModalOpen(false)
  }, [playBack])

  const handleSelectIndex = useCallback((index: number) => {
    playSlash()
    setModalTechIndex(index)
    const targetTech = TECH_DECK[index]
    const matchingChar = PHANTOM_CHARACTERS.find(c => c.techId === targetTech.id)
    if (matchingChar) {
      setActiveCharId(matchingChar.id)
    }
  }, [playSlash])


  // Keyboard navigation: click-only for selecting characters, Escape for back/close, X/Enter for inspect
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault()
        if (isModalOpen) {
          closeInspector()
        } else if (activeCharId) {
          handleResetCamera()
        } else {
          playBack()
          onBack()
        }
      } else if (e.key === 'x' || e.key === 'X' || e.key === 'Enter') {
        if (!isModalOpen && activeCharId) {
          e.preventDefault()
          openInspector()
        }
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isModalOpen, activeCharId, onBack, playBack, openInspector, closeInspector, handleResetCamera])

  // Pentagon radar points calculation
  const cx = 75
  const cy = 75
  const maxR = 52

  const getPoints = (scale: number) => {
    return RADAR_STATS.map(s => {
      const rad = (s.angle * Math.PI) / 180
      const r = maxR * scale
      const x = cx + r * Math.cos(rad)
      const y = cy + r * Math.sin(rad)
      return `${x},${y}`
    }).join(' ')
  }

  const statPolygon = RADAR_STATS.map(s => {
    const rad = (s.angle * Math.PI) / 180
    const r = (s.value / 100) * maxR
    const x = cx + r * Math.cos(rad)
    const y = cy + r * Math.sin(rad)
    return `${x},${y}`
  }).join(' ')

  return (
    <div className="fixed inset-0 z-30 select-none overflow-hidden bg-black flex flex-col justify-between animate-in fade-in duration-300">
      
      {/* ── ANIME SPEED LINES FLASH IMPACT OVERLAY ── */}
      {showSpeedlines && (
        <div className="pointer-events-none fixed inset-0 z-50 overflow-hidden p5-speedlines-anim">
          <svg className="w-full h-full opacity-65" viewBox="0 0 1000 1000" preserveAspectRatio="none">
            {Array.from({ length: 40 }).map((_, idx) => {
              const angle = (idx * 9 * Math.PI) / 180
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
                  strokeWidth={idx % 4 === 0 ? '4' : '2'}
                  strokeDasharray="60 140"
                />
              )
            })}
          </svg>
        </div>
      )}

      {/* ── TOP-LEFT: PERSONA 5 RANSOM 'HIDEOUT' BANNER ── */}
      <div className="absolute top-4 left-4 sm:top-6 sm:left-6 z-40 flex flex-col items-start select-none pointer-events-none p5-tile-entrance">
        <div className="flex items-center gap-1 sm:gap-1.5 filter drop-shadow-[4px_4px_0px_#000000]">
          {['H', 'I', 'D', 'E', 'O', 'U', 'T'].map((char, i) => (
            <span
              key={i}
              className={`inline-flex items-center justify-center font-p5Heading text-2xl sm:text-3xl md:text-4xl min-w-[28px] sm:min-w-[34px] md:min-w-[42px] h-[34px] sm:h-[42px] md:h-[50px] px-1 border-[2.5px] border-black uppercase ${
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
        <div className="mt-1 flex items-center bg-black border-l-4 border-[#7C4A1E] px-2.5 sm:px-3 py-0.5 text-[10px] sm:text-xs font-p5Sub tracking-widest text-white -skew-x-6 shadow-[3px_3px_0px_#000000]">
          <span className="text-yellow-400 font-bold mr-1.5">CAFE LEBLANC ATTIC</span>
          <span className="text-zinc-500 mx-1">//</span>
          <span className="text-zinc-200">
            {activeChar ? `${activeChar.name} [${activeChar.codename}]` : 'SELECT PHANTOM THIEF'}
          </span>
        </div>
      </div>

      {/* ── 2.5D LEBLANC ATTIC VIRTUAL CAMERA STAGE ── */}
      <div className="relative w-full h-full flex items-center justify-center overflow-hidden">
        {/* Fixed 16:9 Screen Reference Canvas Container */}
        <div className="relative w-full h-full max-w-[1920px] max-h-[1080px] aspect-video select-none overflow-hidden">
          
          {/* Virtual 2.5D Camera Stage (Zooms and scales smoothly) */}
          <div
            className="absolute inset-0 w-full h-full select-none"
            style={{
              transform: activeChar
                ? `scale(${activeChar.camera.scale})`
                : 'scale(1)',
              transformOrigin: `${lastFocusOrigin.originX}% ${lastFocusOrigin.originY}%`,
              transition: 'transform 700ms cubic-bezier(0.16, 1, 0.3, 1)',
            }}
          >
            {/* Base 3D Room Render Background */}
            <img
              src="/assets/Background Joker Hideout.png"
              alt="Cafe Leblanc Attic"
              className="absolute inset-0 w-full h-full object-cover pointer-events-none select-none"
            />

            {/* Ambient Dark Dim Overlay (active when zoomed in, clickable to reset) */}
            <div
              onClick={handleResetCamera}
              className={`absolute inset-0 bg-black/60 transition-opacity duration-500 z-10 ${
                activeChar ? 'opacity-100 pointer-events-auto cursor-pointer' : 'opacity-0 pointer-events-none'
              }`}
            />

            {/* Giant Japanese Kanji Backdrop (visible when zoomed in) */}
            {activeChar && (
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden select-none z-15 p5-splash-text-anim">
                <span className="font-p5Heading text-[16vw] font-black text-white/12 uppercase tracking-widest -rotate-12 select-none filter blur-[0.5px]">
                  {activeChar.kanji}
                </span>
              </div>
            )}

            {/* 6 Character Cutout Sprites with Contact Shadows & Warm Lighting */}
            {PHANTOM_CHARACTERS.map((char) => {
              const isSelected = activeChar?.id === char.id
              const isDimmed = Boolean(activeChar && !isSelected)
              const isHovered = Boolean(!activeChar && hoveredCharId === char.id)

              return (
                <div
                  key={char.id}
                  onClick={(e) => {
                    e.stopPropagation()
                    setHoveredCharId(null)
                    handleSelectCharacter(char)
                  }}
                  onMouseEnter={() => {
                    if (!activeChar) {
                      playHover()
                      setHoveredCharId(char.id)
                    }
                  }}
                  onMouseLeave={() => {
                    setHoveredCharId(null)
                  }}
                  style={{
                    left: `${char.left}%`,
                    bottom: `${char.bottom}%`,
                    width: `${char.widthPercent}%`,
                    zIndex: isSelected ? 35 : isHovered ? 30 : char.zIndex,
                  }}
                  className={`
                    absolute select-none cursor-pointer transition-opacity duration-500
                    ${isDimmed
                      ? 'opacity-15 pointer-events-none filter blur-[0.4px]'
                      : 'opacity-100'
                    }
                  `}
                  title={`Select ${char.name} [${char.codename}]`}
                >
                  {/* Realistic Contact Shadow (Floor / Tabletop) */}
                  <div
                    className={`
                      absolute -bottom-1 left-1/2 -translate-x-1/2 pointer-events-none rounded-[50%] -skew-x-12 transition-opacity duration-300
                      ${char.id === 'morgana'
                        ? 'bg-black/80 blur-[1.5px]'
                        : 'bg-black/70 blur-[3px]'
                      }
                      ${isHovered ? 'opacity-95' : 'opacity-75'}
                    `}
                    style={{
                      width: `${char.shadowWidth}%`,
                      height: `${char.shadowHeight}px`,
                    }}
                  />

                  {/* Character Cutout Image - High-Definition Crisp Rendering & Solid Comic Outline */}
                  <img
                    src={char.src}
                    alt={char.name}
                    style={{
                      filter: isHovered
                        ? `sepia(${char.warmth}) brightness(${char.brightness * 1.08}) contrast(1.12) saturate(1.1) drop-shadow(4px 4px 0px #E60012) drop-shadow(-2px -2px 0px #E60012) drop-shadow(0 0 10px rgba(230,0,18,0.75))`
                        : `sepia(${char.warmth}) brightness(${char.brightness}) contrast(1.08) saturate(1.05) drop-shadow(3px 3px 0px rgba(0,0,0,0.9)) drop-shadow(-1px -1px 0px rgba(0,0,0,0.4))`,
                      transition: 'filter 180ms ease-out',
                    }}
                    className="w-full h-auto object-contain select-none"
                  />
                </div>
              )
            })}
          </div>

          {/* ── OPSI A: PERSONA 5 FLOATING COMIC SPEECH BUBBLE ── */}
          {activeChar && activeTech && (() => {
            const bubbleConfig = BUBBLE_POSITIONS[activeChar.id] || BUBBLE_POSITIONS.joker
            return (
              <div
                onClick={(e) => e.stopPropagation()}
                className="
                  absolute z-40 p5-bubble-pop-anim pointer-events-auto select-none
                  w-[92%] sm:w-[360px] md:w-[390px] lg:w-[420px] max-w-[430px]
                  bottom-3 left-1/2 -translate-x-1/2
                  sm:bottom-auto sm:left-auto sm:translate-x-0
                "
                style={bubbleConfig.desktopStyle}
              >
                <div className="relative bg-black/95 border-[3px] border-white p-3.5 sm:p-4 shadow-[6px_6px_0px_#E60012,10px_10px_0px_#000000] -skew-x-2">
                  
                  {/* Comic Speech Pointer Tail (SVG Beak) */}
                  {bubbleConfig.tailSide === 'left' && (
                    <div
                      className="hidden sm:block absolute -left-[19px] pointer-events-none filter drop-shadow-[-2px_2px_0px_#000000]"
                      style={{ top: bubbleConfig.tailTop }}
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

                  {bubbleConfig.tailSide === 'right' && (
                    <div
                      className="hidden sm:block absolute -right-[19px] pointer-events-none filter drop-shadow-[2px_2px_0px_#000000]"
                      style={{ top: bubbleConfig.tailTop }}
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

                  {/* Header Ribbon: Character Codename Tag + Kanji + Level */}
                  <div className="flex items-center justify-between border-b border-zinc-700 pb-2 mb-2 sm:mb-2.5">
                    <div className="flex items-center gap-2">
                      <span
                        className="px-2.5 py-0.5 font-p5Heading text-xs sm:text-sm font-black uppercase -skew-x-6 border border-black shadow-[2px_2px_0px_#000]"
                        style={{
                          backgroundColor: activeChar.thiefColor || '#E60012',
                          color: activeChar.thiefTextColor || '#FFFFFF',
                        }}
                      >
                        ★ {activeChar.codename}
                      </span>
                      <span className="font-p5Mono text-xs text-yellow-400 font-black">
                        {activeChar.kanji}
                      </span>
                    </div>

                    <div className="flex items-center gap-1.5">
                      <span className="font-p5Mono text-[10px] sm:text-xs font-black text-yellow-300 bg-zinc-900 px-2 py-0.5 border border-zinc-700">
                        LV.{activeTech.level}
                      </span>
                      <span className="font-p5Mono text-[10px] sm:text-xs font-bold text-white bg-zinc-800 px-1.5 py-0.5 border border-zinc-600">
                        [{activeTech.element}]
                      </span>
                    </div>
                  </div>

                  {/* Persona Comic Dialogue Quote */}
                  <div className="mb-2.5 flex items-start gap-2 bg-zinc-900/90 p-2 sm:p-2.5 border-l-4 border-[#E60012] -skew-x-1">
                    <span className="text-[#E60012] font-p5Heading font-black text-xl leading-none select-none">
                      “
                    </span>
                    <p className="font-p5Body text-xs sm:text-[13px] text-zinc-100 font-bold leading-snug flex-1">
                      {activeChar.quote}
                    </p>
                  </div>

                  {/* Character Role & Tech Arsenal Preview */}
                  <div className="flex items-center justify-between bg-zinc-950 px-2.5 py-2 border border-zinc-800 mb-2.5 sm:mb-3">
                    <div className="flex items-center gap-2 min-w-0">
                      <div className="size-6 sm:size-7 shrink-0">
                        {activeTech.renderIcon({ className: 'size-full', isSelected: true })}
                      </div>
                      <div className="min-w-0">
                        <div className="font-p5Heading text-xs sm:text-sm text-white uppercase truncate font-bold">
                          {activeTech.name}
                        </div>
                        <div className="font-p5Mono text-[10px] text-zinc-400 truncate">
                          {activeChar.role}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-1 shrink-0">
                      {activeTech.libraries.slice(0, 2).map((lib) => (
                        <span
                          key={lib}
                          className="bg-zinc-800 text-zinc-300 px-1.5 py-0.5 text-[9px] font-p5Mono border border-zinc-700"
                        >
                          {lib}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Action Buttons: Inspect Radar vs Close / Back */}
                  <div className="flex items-center justify-between pt-1.5 border-t border-zinc-800">
                    <button
                      onClick={handleResetCamera}
                      className="flex items-center gap-1.5 text-zinc-400 hover:text-white font-p5Heading text-xs uppercase cursor-pointer transition-colors group"
                      title="Return to room overview"
                    >
                      <span className="size-4 rounded-full border border-red-500 text-red-500 flex items-center justify-center text-[10px] font-bold group-hover:bg-red-500 group-hover:text-white transition-colors">
                        O
                      </span>
                      <span>BACK [ESC]</span>
                    </button>

                    <button
                      onClick={openInspector}
                      className="flex items-center gap-1.5 bg-yellow-400 hover:bg-white text-black font-p5Heading text-xs font-black px-3 py-1 -skew-x-6 border border-black shadow-[2px_2px_0px_#000] cursor-pointer transition-transform hover:scale-105"
                      title="Open full tactical radar & dossier"
                    >
                      <span className="size-3.5 rounded-full bg-black text-yellow-400 flex items-center justify-center text-[9px] font-bold">
                        X
                      </span>
                      <span>TACTICAL DOSSIER</span>
                    </button>
                  </div>
                </div>
              </div>
            )
          })()}

          {/* Subdued Bottom Guide Prompt When Zoomed */}
          {activeChar && (
            <div className="absolute bottom-3 left-4 sm:bottom-4 sm:left-6 z-40 hidden sm:flex items-center gap-2 pointer-events-none text-zinc-400 font-p5Mono text-[11px] -skew-x-6 bg-black/75 px-2.5 py-1 border border-zinc-800 shadow-[2px_2px_0px_#000]">
              <span className="text-yellow-400 font-bold">CLICK ROOM / ESC:</span>
              <span>ZOOM OUT</span>
              <span className="text-zinc-600">//</span>
              <span className="text-white font-bold">[X]:</span>
              <span>DOSSIER & RADAR</span>
            </div>
          )}
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

      {/* ── TACTICAL TECH ARSENAL INSPECTOR MODAL (ALTERNATIF B) ── */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-[3px] animate-in fade-in duration-200">
          <div className="absolute inset-0" onClick={closeInspector} />

          <div className="relative z-10 w-full max-w-5xl max-h-[92vh] overflow-y-auto no-scrollbar bg-black/95 border-3 border-white p-4 sm:p-6 shadow-[10px_10px_0px_#000000] -skew-x-1 p5-modal-slam-anim">
            
            {/* Modal Header */}
            <div className="flex items-center justify-between border-b-2 border-zinc-700 pb-3 mb-4">
              <div className="flex items-center gap-2.5">
                <span className="bg-[#7C4A1E] text-white px-2.5 py-0.5 font-p5Sub text-xs md:text-sm tracking-widest uppercase -skew-x-6 shadow-[2px_2px_0px_#000]">
                  TECH ARSENAL
                </span>
                <span className="font-p5Heading text-lg sm:text-2xl text-white tracking-wide uppercase">
                  {activeTech.name} // DOSSIER & STATS
                </span>
              </div>
              <button
                onClick={closeInspector}
                className="flex items-center gap-1.5 bg-zinc-900 hover:bg-white text-white hover:text-black px-3 py-1 border border-zinc-500 shadow-[2px_2px_0px_#000] -skew-x-6 cursor-pointer transition-colors"
              >
                <X className="size-4" />
                <span className="font-p5Heading text-xs uppercase">CLOSE [O]</span>
              </button>
            </div>

            {/* Quick 8-Tech Switcher Bar */}
            <div className="grid grid-cols-4 sm:grid-cols-8 gap-1.5 mb-4">
              {TECH_DECK.map((tech, i) => {
                const isSelected = i === activeIndex
                return (
                  <button
                    key={tech.id}
                    onClick={() => handleSelectIndex(i)}
                    className={`
                      relative p-1.5 flex flex-col items-center justify-center border transition-all cursor-pointer -skew-x-2
                      ${isSelected
                        ? 'bg-black border-2 border-white text-white shadow-[3px_3px_0px_#000000] scale-105 z-10'
                        : 'bg-zinc-900/90 border border-zinc-700 text-zinc-400 hover:border-zinc-400 hover:text-white'
                      }
                    `}
                    style={isSelected ? { borderBottomColor: tech.accentColor, borderBottomWidth: '3px' } : undefined}
                  >
                    {isSelected && (
                      <span
                        className="absolute -top-1.5 -right-1 text-[9px] font-black px-1 leading-tight -skew-x-6 border border-black shadow-[1px_1px_0px_#000]"
                        style={{
                          backgroundColor: tech.accentColor === '#FFFFFF' ? '#E60012' : tech.accentColor,
                          color: getRibbonTextColor(tech.accentColor === '#FFFFFF' ? '#E60012' : tech.accentColor),
                        }}
                      >
                        ★
                      </span>
                    )}
                    <div className="size-5 mb-0.5">
                      {tech.renderIcon({ className: 'size-full', isSelected })}
                    </div>
                    <span className={`font-p5Heading text-[10px] uppercase truncate max-w-full ${isSelected ? 'text-white font-black' : 'text-zinc-400'}`}>
                      {tech.shortLabel}
                    </span>
                  </button>
                )
              })}
            </div>

            {/* Modal Body: Tactical Radar + Detailed Tech Dossier */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
              {/* Left Column: Pentagon Radar & Stat Readouts */}
              <div className="md:col-span-5 flex flex-col gap-3 bg-zinc-950 border border-zinc-700 p-3 shadow-[4px_4px_0px_#000000] p5-hud-left-anim">
                <span className="font-p5Sub text-[10px] text-zinc-300 font-bold tracking-widest uppercase flex items-center gap-1.5">
                  <span className="size-2 bg-white animate-pulse" />
                  TACTICAL PENTAGON // LV. 99
                </span>

                <div className="flex justify-center items-center py-1">
                  <svg viewBox="0 0 150 150" className="w-[130px] h-[130px]">
                    <polygon points={getPoints(1.0)} fill="none" stroke="#555555" strokeWidth="1.2" />
                    <polygon points={getPoints(0.75)} fill="none" stroke="#333333" strokeWidth="1" />
                    <polygon points={getPoints(0.5)} fill="none" stroke="#222222" strokeWidth="1" />
                    <polygon points={getPoints(0.25)} fill="none" stroke="#1a1a1a" strokeWidth="1" />

                    {RADAR_STATS.map((s, idx) => {
                      const rad = (s.angle * Math.PI) / 180
                      return (
                        <line
                          key={idx}
                          x1={cx}
                          y1={cy}
                          x2={cx + maxR * Math.cos(rad)}
                          y2={cy + maxR * Math.sin(rad)}
                          stroke="#444444"
                          strokeWidth="1"
                        />
                      )
                    })}

                    <polygon
                      points={statPolygon}
                      fill="rgba(255, 255, 255, 0.22)"
                      stroke="#FFFFFF"
                      strokeWidth="2.5"
                      className="filter drop-shadow-[0_0_8px_rgba(255,255,255,0.7)]"
                    />

                    {RADAR_STATS.map((s, idx) => {
                      const rad = (s.angle * Math.PI) / 180
                      const r = (s.value / 100) * maxR
                      const px = cx + r * Math.cos(rad)
                      const py = cy + r * Math.sin(rad)
                      const lx = cx + (maxR + 12) * Math.cos(rad)
                      const ly = cy + (maxR + 12) * Math.sin(rad)
                      return (
                        <g key={idx}>
                          <circle cx={px} cy={py} r="2.5" fill="#FFFFFF" stroke="#000000" strokeWidth="1.5" />
                          <text
                            x={lx}
                            y={ly + 2.5}
                            fill="#FFFFFF"
                            fontSize="9"
                            fontWeight="900"
                            fontFamily="monospace"
                            textAnchor="middle"
                          >
                            {s.key}
                          </text>
                        </g>
                      )
                    })}
                  </svg>
                </div>

                <div className="flex flex-col gap-1 font-p5Mono">
                  {RADAR_STATS.map(stat => (
                    <div key={stat.key} className="flex items-center justify-between bg-zinc-900 px-2 py-0.5 border border-zinc-700 text-xs">
                      <div className="flex items-center gap-1.5">
                        <span className="font-black text-white text-xs">{stat.key}</span>
                        <span className="text-zinc-300 font-bold text-[10px]">{stat.label}</span>
                      </div>
                      <span className="font-black text-white bg-black px-1.5 py-0.2 border border-zinc-600 shadow-[1px_1px_0px_#000] text-xs">
                        {stat.value}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right Column: Active Tech Detailed Dossier */}
              <div className="md:col-span-7 flex flex-col justify-between bg-zinc-950 border-2 border-zinc-700 p-4 sm:p-5 shadow-[4px_4px_0px_#000000] p5-hud-right-anim">
                <div>
                  <div className="flex items-center justify-between border-b border-zinc-700 pb-3 mb-4">
                    <div className="flex items-center gap-3">
                      <div className="size-9">
                        {activeTech.renderIcon({ className: 'size-full', isSelected: true })}
                      </div>
                      <div>
                        <div className="font-p5Heading text-2xl sm:text-3xl font-black text-white uppercase">
                          {activeTech.name}
                        </div>
                        <div className="font-p5Mono text-[11px] text-cyan-300 font-bold">
                          {activeTech.category} // {activeTech.cost}
                        </div>
                      </div>
                    </div>
                    <span className="font-p5Mono text-xs text-yellow-300 font-black bg-black px-2.5 py-1 border border-zinc-600 shadow-[2px_2px_0px_#000]">
                      MASTERY LV. {activeTech.level}
                    </span>
                  </div>

                  {/* DEPLOYED IN MISSIONS / REAL PROJECTS (OPSI 2) */}
                  {activeTech.deployedIn && activeTech.deployedIn.length > 0 && (
                    <div className="mb-4">
                      <span className="font-p5Sub text-[10px] sm:text-xs text-zinc-300 font-bold tracking-wider flex items-center gap-1.5 mb-2">
                        <span className="text-yellow-400">🎯</span>
                        <span>DEPLOYED IN MISSIONS //</span>
                      </span>
                      <div className="flex items-center gap-2 flex-wrap">
                        {activeTech.deployedIn.map((missionName, idx) => (
                          <div
                            key={idx}
                            className="bg-black text-white font-p5Heading text-xs sm:text-sm px-3 py-1 border-2 border-white shadow-[3px_3px_0px_#000] -skew-x-6 flex items-center gap-1.5 hover:bg-white hover:text-black transition-colors"
                          >
                            <span className="text-yellow-400 font-bold">★</span>
                            <span className="tracking-wide uppercase">{missionName}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                <div>
                  <span className="font-p5Sub text-[10px] sm:text-xs text-zinc-300 font-bold tracking-wider block mb-2">
                    CORE MODULES & LIBRARIES:
                  </span>
                  <div className="flex items-center gap-2 flex-wrap">
                    {activeTech.libraries.map((lib, idx) => (
                      <span
                        key={idx}
                        className="font-p5Heading text-xs sm:text-sm font-black text-black bg-white border border-black px-3 py-1 shadow-[2px_2px_0px_#71717A] -skew-x-6 hover:scale-105 transition-transform"
                      >
                        {lib}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      )}

    </div>
  )
}
