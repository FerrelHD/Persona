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
      isSelected ? 'opacity-100 scale-105' : 'opacity-85 hover:opacity-100'
    }`}
  />
)

const TailwindIcon: React.FC<{ className?: string; isSelected?: boolean }> = ({ className = 'size-8', isSelected }) => (
  <svg viewBox="0 0 24 24" className={className} fill={isSelected ? '#38BDF8' : '#FFFFFF'}>
    <path d="M12.001,4.8c-3.2,0-5.2,1.6-6,4.8c1.2-1.6,2.6-2.2,4.2-1.8c0.913,0.228,1.565,0.89,2.288,1.624 C13.666,10.618,15.027,12,18.001,12c3.2,0,5.2-1.6,6-4.8c-1.2,1.6-2.6,2.2-4.2,1.8c-0.913-0.228-1.565-0.89-2.288-1.624 C16.337,6.182,14.976,4.8,12.001,4.8z M6.001,12c-3.2,0-5.2,1.6-6,4.8c1.2-1.6,2.6-2.2,4.2-1.8c0.913,0.228,1.565,0.89,2.288,1.624 c1.177,1.194,2.538,2.576,5.512,2.576c3.2,0,5.2-1.6,6-4.8c-1.2,1.6-2.6,2.2-4.2,1.8c-0.913-0.228-1.565-0.89-2.288-1.624 C10.337,13.382,8.976,12,6.001,12z" />
  </svg>
)

const LaravelIcon: React.FC<{ className?: string; isSelected?: boolean }> = ({ className = 'size-8', isSelected }) => (
  <svg viewBox="-7.4481 -12.7791 64.5502 76.6746" className={`${className} transition-all ${isSelected ? 'filter drop-shadow-[0_0_8px_rgba(255,255,255,0.8)]' : ''}`}>
    <path
      fillRule="evenodd"
      fill="#FFFFFF"
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
    accentColor: '#E60012',
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

export const SkillsScreen: React.FC<SkillsScreenProps> = ({ onBack }) => {
  const { playHover, playSlash, playBack } = usePersonaSFX()

  // Active index of the selected Tech Item
  const [activeIndex, setActiveIndex] = useState<number>(0)
  // Tactical Modal Inspector (Alternatif B)
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false)

  const activeTech = TECH_DECK[activeIndex]

  const handleSelectIndex = useCallback((index: number) => {
    if (index !== activeIndex) {
      playSlash()
      setActiveIndex((index + TECH_DECK.length) % TECH_DECK.length)
    }
  }, [activeIndex, playSlash])

  const openInspector = useCallback(() => {
    playSlash()
    setIsModalOpen(true)
  }, [playSlash])

  const closeInspector = useCallback(() => {
    playBack()
    setIsModalOpen(false)
  }, [playBack])

  // 5 visible tech cards along the fisheye curvature: [-2, -1, 0, 1, 2]
  const visibleCards = useMemo(() => {
    return [-2, -1, 0, 1, 2].map(relOffset => {
      const targetIndex = (activeIndex + relOffset + TECH_DECK.length) % TECH_DECK.length
      const tech = TECH_DECK[targetIndex]
      const isActive = relOffset === 0

      return {
        targetIndex,
        relOffset,
        tech,
        isActive,
      }
    })
  }, [activeIndex])

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault()
        if (isModalOpen) {
          closeInspector()
        } else {
          playBack()
          onBack()
        }
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault()
        playHover()
        setActiveIndex(prev => (prev - 1 + TECH_DECK.length) % TECH_DECK.length)
      } else if (e.key === 'ArrowRight') {
        e.preventDefault()
        playHover()
        setActiveIndex(prev => (prev + 1) % TECH_DECK.length)
      } else if (e.key === 'x' || e.key === 'X' || e.key === 'Enter') {
        if (!isModalOpen) {
          e.preventDefault()
          openInspector()
        }
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isModalOpen, onBack, playBack, playHover, openInspector, closeInspector])

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
    <div className="fixed inset-0 z-30 select-none overflow-hidden flex flex-col justify-between p-4 sm:p-6 md:p-8 pt-5 sm:pt-7 md:pt-9 pb-3 sm:pb-4 animate-in fade-in duration-300">
      
      {/* ── CINEMATIC VFX: DUAL-LAYER TOKYO FOG, RED EMBERS & TOKYO TOWER BEACON ── */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden z-10">
        {/* ── CINEMATIC TOKYO FOG / MIST DRIFT (HIGH-CONTRAST PARALLAX) ── */}
        {/* Layer 1: Dark Manga Street Fog across Tokyo buildings */}
        <div
          className="absolute -inset-x-[20%] bottom-0 h-[58%] p5-fog-layer-1 pointer-events-none mix-blend-multiply"
          style={{
            background: 'radial-gradient(ellipse 85% 55% at 50% 80%, rgba(10, 10, 15, 0.70) 0%, rgba(30, 30, 42, 0.50) 45%, transparent 75%)',
            filter: 'blur(20px)',
          }}
          aria-hidden="true"
        />

        {/* Layer 2: Manga Street Smog Haze drifting between towers */}
        <div
          className="absolute -inset-x-[25%] bottom-[8%] h-[50%] p5-fog-layer-2 pointer-events-none"
          style={{
            background: 'radial-gradient(ellipse 70% 45% at 55% 65%, rgba(15, 23, 42, 0.65) 0%, rgba(30, 41, 59, 0.35) 40%, transparent 70%)',
            filter: 'blur(26px)',
          }}
          aria-hidden="true"
        />

        {/* Layer 3: Rolling Tokyo Alleyway Smog Bank */}
        <div
          className="absolute -inset-x-[15%] bottom-[2%] h-[42%] p5-fog-layer-3 pointer-events-none"
          style={{
            background: 'radial-gradient(ellipse 95% 40% at 42% 85%, rgba(15, 23, 42, 0.55) 0%, rgba(51, 65, 85, 0.25) 50%, transparent 72%)',
            filter: 'blur(22px)',
          }}
          aria-hidden="true"
        />

        {/* ── GAYA C: DEEP FOG ARC (CINEMATIC BOTTOM VIGNETTE CURVE) ── */}
        <div
          className="absolute -inset-x-[15%] -bottom-[8%] h-[38%] pointer-events-none z-10"
          style={{
            background: 'radial-gradient(ellipse 120% 70% at 50% 115%, rgba(0, 0, 0, 0.96) 0%, rgba(5, 5, 10, 0.88) 42%, rgba(15, 15, 25, 0.45) 72%, transparent 100%)',
          }}
          aria-hidden="true"
        />
        {/* Soft Metallic Slate Atmospheric Edge Curve */}
        <div
          className="absolute -inset-x-[20%] -bottom-[12%] h-[28%] pointer-events-none z-10 mix-blend-screen opacity-25"
          style={{
            background: 'radial-gradient(ellipse 110% 65% at 50% 118%, rgba(100, 116, 139, 0.5) 0%, transparent 70%)',
          }}
          aria-hidden="true"
        />

        {/* Tokyo Tower Aviation Warning Lights */}
        <div
          className="absolute top-[17%] right-[19.2%] size-2.5 rounded-full bg-red-600 p5-beacon-light shadow-[0_0_10px_#E60012]"
          aria-hidden="true"
        />
        <div
          className="absolute top-[28%] right-[22.5%] size-2 rounded-full bg-red-500 p5-beacon-light shadow-[0_0_8px_#E60012]"
          style={{ animationDelay: '0.8s' }}
          aria-hidden="true"
        />

        {/* Floating Silver Sparks */}
        {[
          { left: '10%', delay: '0s', dur: '10s', size: 3 },
          { left: '22%', delay: '3s', dur: '13s', size: 4 },
          { left: '36%', delay: '6s', dur: '9s', size: 2.5 },
          { left: '48%', delay: '1.5s', dur: '11s', size: 4 },
          { left: '64%', delay: '4.2s', dur: '12s', size: 3.5 },
          { left: '76%', delay: '7s', dur: '10.5s', size: 4 },
          { left: '88%', delay: '2.2s', dur: '14s', size: 2.5 },
        ].map((ember, idx) => (
          <span
            key={idx}
            className="p5-ember rounded-full bg-zinc-200 shadow-[0_0_6px_#FFFFFF] opacity-75"
            style={{
              left: ember.left,
              bottom: 0,
              width: `${ember.size}px`,
              height: `${ember.size}px`,
              animationDelay: ember.delay,
              animationDuration: ember.dur,
            }}
          />
        ))}
      </div>

      {/* ── TOP-LEFT: PERSONA 5 RANSOM 'SKILLS' TITLE ── */}
      <div className="z-20 flex flex-col items-start select-none p5-tile-entrance">
        <div className="flex items-center gap-1 sm:gap-1.5 filter drop-shadow-[5px_5px_0px_#000000]">
          {['S', 'K', 'I', 'L', 'L', 'S'].map((char, i) => (
            <span
              key={i}
              className={`inline-flex items-center justify-center font-p5Heading text-3xl sm:text-4xl md:text-5xl min-w-[36px] sm:min-w-[44px] md:min-w-[50px] h-[44px] sm:h-[54px] md:h-[62px] px-1.5 py-0.5 border-[3px] border-black uppercase transition-transform hover:scale-115 ${
                i === 0
                  ? 'bg-black text-white -rotate-6'
                  : i === 1
                  ? 'bg-white text-black rotate-3'
                  : i === 2
                  ? 'bg-[#64748B] text-white -rotate-3 font-black scale-105'
                  : i === 3
                  ? 'bg-white text-black rotate-4'
                  : i === 4
                  ? 'bg-black text-white -rotate-2'
                  : 'bg-[#64748B] text-white rotate-6 scale-110 shadow-[4px_4px_0px_#000000] font-black'
              }`}
            >
              {char}
            </span>
          ))}
        </div>
        <div className="mt-1.5 flex items-center bg-black border-l-4 border-[#64748B] px-2.5 sm:px-3 py-0.5 text-[10px] sm:text-xs font-p5Sub tracking-widest text-white -skew-x-6 shadow-[3px_3px_0px_#000000]">
          <span className="text-[#94A3B8] font-bold mr-1.5">TECH ARSENAL</span>
          <span className="text-zinc-500 mx-1">//</span>
          <span className="text-zinc-200">{activeTech.name}</span>
        </div>
      </div>

      {/* ── UPPER-CENTER: INTERACTIVE TECH STACK ARC WITH PHANTOM DAGGER ── */}
      <div className="z-20 my-auto flex flex-col items-center justify-center w-full p5-skills-entrance">
        {/* Arc of Tech Cards */}
        <div className="relative flex items-center justify-center gap-3 sm:gap-6 md:gap-10 w-full max-w-5xl px-2">
          {visibleCards.map((item) => {
            const { targetIndex, relOffset, tech, isActive } = item

            // Parabolic curve dropping on outer cards following the fisheye curvature
            const yDrop = Math.pow(Math.abs(relOffset), 1.8) * 16
            const rotation = relOffset * 5

            return (
              <div
                key={tech.id}
                onClick={() => {
                  if (isActive) {
                    openInspector()
                  } else {
                    handleSelectIndex(targetIndex)
                  }
                }}
                onMouseEnter={playHover}
                style={{
                  transform: `translateY(${yDrop}px) rotate(${rotation}deg)`,
                }}
                className={`relative flex flex-col items-center transition-all duration-200 cursor-pointer ${
                  isActive
                    ? 'scale-110 sm:scale-120 md:scale-130 z-30'
                    : 'scale-85 sm:scale-95 hover:scale-100 opacity-80 hover:opacity-100 z-10'
                }`}
              >
                {/* ── PHANTOM THIEVES DAGGER (STABBED DIAGONALLY INTO ACTIVE TECH) ── */}
                {isActive && (
                  <div
                    key={`dagger-${tech.id}`}
                    className="absolute -top-22 sm:-top-26 md:-top-32 right-1 sm:right-2 md:right-3 w-18 sm:w-22 md:w-26 h-24 sm:h-30 md:h-36 pointer-events-none z-40 p5-dagger-slam-anim"
                    style={{ transformOrigin: 'bottom center' }}
                  >
                    <PhantomDagger className="w-full h-full" />
                  </div>
                )}

                {/* Tech Card Body */}
                <div
                  className={`
                    relative flex flex-col items-center justify-center p-3 sm:p-4 rounded-sm border-[3px] transition-all
                    ${isActive
                      ? 'bg-black/95 border-white shadow-[8px_8px_0px_#000000] -skew-x-2'
                      : 'bg-zinc-950/90 border-zinc-600 hover:border-white shadow-[4px_4px_0px_#000000] -skew-x-1'
                    }
                    min-w-[90px] sm:min-w-[110px] md:min-w-[125px] h-[95px] sm:h-[115px] md:h-[130px]
                  `}
                >
                  {/* Subtle Corner Level Badge */}
                  <span className={`absolute top-1 left-1.5 font-p5Mono text-[9px] font-black ${isActive ? 'text-p5-yellow' : 'text-zinc-400'}`}>
                    LV.{tech.level}
                  </span>

                  {/* SVG Tech Icon */}
                  <div className="my-auto transition-transform hover:scale-110 filter drop-shadow-[2px_2px_0px_#000000]">
                    {tech.renderIcon({ className: isActive ? 'size-10 sm:size-12 md:size-14' : 'size-7 sm:size-8 md:size-10', isSelected: isActive })}
                  </div>

                  {/* Persona 5 Styled Sticker Label */}
                  <div
                    className={`
                      mt-auto px-2 py-0.5 -skew-x-12 border border-black font-p5Heading text-xs sm:text-sm font-black tracking-wider uppercase truncate max-w-full
                      ${isActive
                        ? 'bg-white text-black font-black shadow-[2px_2px_0px_#000000] rotate-1'
                        : 'bg-white text-black shadow-[1.5px_1.5px_0px_#000000] -rotate-1'
                      }
                    `}
                  >
                    {tech.shortLabel}
                  </div>
                </div>

                {/* 'ACTIVE TARGET' indicator pin */}
                {isActive && (
                  <span className="mt-2 bg-p5-yellow text-black text-[9px] sm:text-[10px] font-p5Mono font-extrabold px-2 py-0.5 -skew-x-6 border border-black shadow-[2px_2px_0px_#000]">
                    ★ SELECTED TECH
                  </span>
                )}
              </div>
            )
          })}
        </div>

        {/* ── CINEMATIC PROMPT UNDER ARC (ALTERNATIF B - CLEAN & SPACIOUS) ── */}
        <div className="mt-12 sm:mt-16 md:mt-20 flex items-center gap-3 font-p5Mono text-xs text-white/90 bg-black/85 px-4 py-1.5 border border-white/60 -skew-x-6 shadow-[4px_4px_0px_#000000]">
          <span className="text-yellow-400 font-bold">◀ / ▶</span>
          <span>SELECT TECH WEAPON</span>
          <span className="text-zinc-500">//</span>
          <button
            onClick={openInspector}
            className="text-white hover:text-yellow-300 font-bold underline cursor-pointer transition-colors"
          >
            INSPECT {activeTech.name}
          </button>
        </div>

        {/* Slot Pips Indicator */}
        <div className="flex items-center gap-1.5 mt-3">
          {TECH_DECK.map((tech, i) => (
            <button
              key={tech.id}
              onClick={() => handleSelectIndex(i)}
              className={`h-2 transition-all cursor-pointer ${
                i === activeIndex
                  ? 'w-7 bg-white shadow-[0_0_8px_#FFFFFF]'
                  : 'w-2 bg-zinc-600 hover:bg-white'
              }`}
              title={tech.name}
            />
          ))}
        </div>
      </div>

      {/* ── BOTTOM ACTION BAR (PERSONA 5 HUD LEGEND) ── */}
      <div className="z-20 flex items-center gap-4 sm:gap-6 flex-wrap text-xs sm:text-sm pointer-events-auto p5-footer-entrance">
        {/* Left: (O) BACK button - restored to red console standard */}
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
          <span className="font-p5Heading text-sm tracking-wider uppercase">BACK</span>
        </button>

        {/* Right: (X) INSPECT Action Button - unified side-by-side with BACK */}
        <button
          onClick={openInspector}
          className="flex items-center gap-1.5 text-zinc-300 hover:text-white group cursor-pointer transition-colors"
          title={`Inspect ${activeTech.name} & Radar`}
        >
          <span className="size-5 rounded-full border-2 border-cyan-400 text-cyan-400 font-bold flex items-center justify-center text-[11px] group-hover:bg-cyan-400 group-hover:text-black transition-colors shadow-[0_0_6px_rgba(34,211,238,0.4)]">
            X
          </span>
          <span className="font-p5Heading text-sm tracking-wider uppercase">INSPECT {activeTech.name} & RADAR</span>
        </button>
      </div>

      {/* ── TACTICAL TECH ARSENAL INSPECTOR MODAL (ALTERNATIF B) ── */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-[3px] animate-in fade-in duration-200">
          <div className="absolute inset-0" onClick={closeInspector} />

          <div className="relative z-10 w-full max-w-5xl max-h-[92vh] overflow-y-auto no-scrollbar bg-black/95 border-3 border-white p-4 sm:p-6 shadow-[10px_10px_0px_#000000] -skew-x-1">
            
            {/* Modal Header */}
            <div className="flex items-center justify-between border-b-2 border-zinc-700 pb-3 mb-4">
              <div className="flex items-center gap-2.5">
                <span className="bg-[#64748B] text-white px-2.5 py-0.5 font-p5Sub text-xs md:text-sm tracking-widest uppercase -skew-x-6 shadow-[2px_2px_0px_#000]">
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
                      p-1.5 flex flex-col items-center justify-center border transition-all cursor-pointer -skew-x-2
                      ${isSelected
                        ? 'bg-white border-white text-black shadow-[2px_2px_0px_#64748B]'
                        : 'bg-zinc-900 border-zinc-700 text-zinc-400 hover:border-white hover:text-white'
                      }
                    `}
                  >
                    <div className="size-5 mb-0.5">
                      {tech.renderIcon({ className: 'size-full', isSelected })}
                    </div>
                    <span className="font-p5Heading text-[10px] uppercase truncate max-w-full">
                      {tech.shortLabel}
                    </span>
                  </button>
                )
              })}
            </div>

            {/* Modal Body: Tactical Radar + Detailed Tech Dossier */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
              {/* Left Column: Pentagon Radar & Stat Readouts */}
              <div className="md:col-span-5 flex flex-col gap-3 bg-zinc-950 border border-zinc-700 p-3 shadow-[4px_4px_0px_#000000]">
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
              <div className="md:col-span-7 flex flex-col justify-between bg-zinc-950 border-2 border-zinc-700 p-4 sm:p-5 shadow-[4px_4px_0px_#000000]">
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
                        <div className="font-p5Mono text-[11px] text-zinc-400">
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
