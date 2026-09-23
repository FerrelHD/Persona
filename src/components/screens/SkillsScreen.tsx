import React, { useState, useEffect } from 'react'
import { PageCutoutOverlay } from '@/components/common/PageCutoutOverlay'
import { usePersonaSFX } from '@/hooks/usePersonaSFX'
import { Zap, Sparkles, Shield, Flame, Sword, Crosshair, HeartPulse, RefreshCw, ChevronRight } from 'lucide-react'

interface SkillsScreenProps {
  onBack: () => void
}

interface SkillItem {
  id: string
  name: string
  element: 'PHYS' | 'ELEC' | 'PSY' | 'FIRE' | 'GUN' | 'BLESS' | 'CURSE' | 'SUPPORT'
  cost: string
  category: string
  level: number
  description: string
  techs: string[]
}

const ELEMENT_BADGES: Record<string, { bg: string; text: string; icon: React.ReactNode }> = {
  PHYS:    { bg: 'bg-zinc-200 text-black',   text: 'text-zinc-200', icon: <Sword className="size-3.5" /> },
  ELEC:    { bg: 'bg-yellow-400 text-black', text: 'text-yellow-400', icon: <Zap className="size-3.5" /> },
  PSY:     { bg: 'bg-pink-500 text-white',   text: 'text-pink-400',   icon: <Sparkles className="size-3.5" /> },
  FIRE:    { bg: 'bg-p5-crimson text-white', text: 'text-p5-crimson', icon: <Flame className="size-3.5" /> },
  GUN:     { bg: 'bg-amber-500 text-black',  text: 'text-amber-400',  icon: <Crosshair className="size-3.5" /> },
  BLESS:   { bg: 'bg-cyan-300 text-black',   text: 'text-cyan-300',   icon: <Shield className="size-3.5" /> },
  CURSE:   { bg: 'bg-purple-600 text-white', text: 'text-purple-400', icon: <RefreshCw className="size-3.5" /> },
  SUPPORT: { bg: 'bg-emerald-400 text-black',text: 'text-emerald-400',icon: <HeartPulse className="size-3.5" /> },
}

const SKILL_DECK: SkillItem[] = [
  {
    id: 'elec-spa',
    name: 'HIGH-VOLTAGE SPA',
    element: 'ELEC',
    cost: '18 SP',
    category: 'FRONTEND ARCHITECTURE',
    level: 98,
    description: 'Deploys ultra-reactive web applications with instant state hydration, zero layout shifts, and component design systems.',
    techs: ['TypeScript', 'React 19', 'Next.js', 'Tailwind CSS', 'Vite', 'Vue 3'],
  },
  {
    id: 'psy-ai',
    name: 'NEURAL SYNTHESIS',
    element: 'PSY',
    cost: '24 SP',
    category: 'AI & DATA SCIENCE',
    level: 94,
    description: 'Infiltrates unstructured telemetry using transformer neural nets, fine-tuned sentiment models, and NLP inference pipelines.',
    techs: ['PyTorch', 'IndoBERT', 'Hugging Face', 'NLP', 'Pandas', 'Scikit-learn'],
  },
  {
    id: 'fire-shader',
    name: 'SHADER INFERNO',
    element: 'FIRE',
    cost: '20 SP',
    category: 'GAME & SHADER DEV',
    level: 90,
    description: 'Conjures real-time lighting passes, custom HLSL surface shaders, post-processing VFX, and responsive vehicle arcade physics.',
    techs: ['Unity 3D', 'C#', 'ShaderLab', 'HLSL Graphics', 'Vehicle Physics Engine'],
  },
  {
    id: 'phys-arch',
    name: 'FULL-STACK CLEAVE',
    element: 'PHYS',
    cost: '12% HP',
    category: 'SYSTEM INTEGRITY',
    level: 95,
    description: 'Executes heavy codebase refactoring delivering clean modular patterns, strict type-safety, and maintainable micro-architectures.',
    techs: ['Clean Architecture', 'Design Patterns', 'Microfrontends', 'State Machines'],
  },
  {
    id: 'gun-cloud',
    name: 'CLOUD EXECUTION',
    element: 'GUN',
    cost: '15 SP',
    category: 'BACKEND & DEVOPS',
    level: 89,
    description: 'Pierces through high-concurrency requests with serverless micro-backends, relational query caching, and automated CI/CD deployments.',
    techs: ['Node.js', 'PHP Laravel', 'REST APIs', 'MySQL', 'Vercel Serverless', 'Git CI/CD'],
  },
  {
    id: 'bless-ui',
    name: 'PERSONA POLISH',
    element: 'BLESS',
    cost: '10 SP',
    category: 'CREATIVE DIRECTION',
    level: 97,
    description: 'Infuses bold Persona-grade aesthetics, synchronized audio SFX feedback, kinetic transitions, and tactile micro-animations.',
    techs: ['Figma to Code', 'Audio Synthesis', 'Keyframe VFX', 'Glassmorphism'],
  },
  {
    id: 'curse-trim',
    name: 'LAG PURGE',
    element: 'CURSE',
    cost: '14 SP',
    category: 'RUNTIME SPEED',
    level: 96,
    description: 'Banishes JavaScript bundle bloat, excessive DOM repaints, and memory leaks to achieve rock-solid 60fps console gameplay.',
    techs: ['Code Splitting', 'Web Workers', 'Bundle Analyzer', 'Lighthouse 100'],
  },
  {
    id: 'sup-lead',
    name: 'HEIST COMMAND',
    element: 'SUPPORT',
    cost: '16 SP',
    category: 'TEAM COLLABORATION',
    level: 92,
    description: 'Boosts team velocity and velocity morale through proactive code reviews, agile sprint roadmaps, and clear technical documentation.',
    techs: ['Agile / Scrum', 'Technical Writing', 'Mentorship', 'Open Source'],
  },
]

// 5 Core Stats for the Persona 5 Pentagon Radar
const RADAR_STATS = [
  { key: 'ST', label: 'STRENGTH (FRONTEND)', value: 98, angle: -90 },
  { key: 'MA', label: 'MAGIC (AI & NLP)', value: 94, angle: -18 },
  { key: 'EN', label: 'ENDURANCE (BACKEND)', value: 89, angle: 54 },
  { key: 'AG', label: 'AGILITY (PERF & VITE)', value: 96, angle: 126 },
  { key: 'LU', label: 'LUCK (GAME & SHADERS)', value: 90, angle: 198 },
]

export const SkillsScreen: React.FC<SkillsScreenProps> = ({ onBack }) => {
  const { playHover, playSlash } = usePersonaSFX()
  const [selectedIndex, setSelectedIndex] = useState<number>(0)
  const activeSkill = SKILL_DECK[selectedIndex]

  // Keyboard navigation for vertical list (Up/Down arrow keys)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowUp' || e.key === 'w' || e.key === 'W') {
        e.preventDefault()
        playHover()
        setSelectedIndex(prev => (prev > 0 ? prev - 1 : SKILL_DECK.length - 1))
      } else if (e.key === 'ArrowDown' || e.key === 's' || e.key === 'S') {
        e.preventDefault()
        playHover()
        setSelectedIndex(prev => (prev < SKILL_DECK.length - 1 ? prev + 1 : 0))
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [playHover])

  // Pentagon radar points calculation
  const cx = 60
  const cy = 60
  const maxR = 44

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
    <div className="fixed inset-0 z-30 flex flex-col justify-between p-4 sm:p-6 md:p-8 select-none overflow-hidden bg-gradient-to-r from-black/95 from-0% via-black/80 via-40% to-transparent to-60% animate-in fade-in duration-200 pt-20 sm:pt-24 md:pt-26 pb-8">
      {/* Page Title Cutout Overlay */}
      <PageCutoutOverlay
        title="SKILL PARAMETERS"
        characterRole="SUPPORT"
        characterName="FUTABA SAKURA"
        accentColor="emerald"
        onBack={onBack}
      />

      {/* Main Viewport: Persona 5 Battle Skill Layout (Left List + Right Detailed Card) */}
      <div className="flex-1 flex items-center justify-start my-auto z-20 w-full max-w-5xl lg:max-w-[62%] pl-2 sm:pl-6 md:pl-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 w-full h-[76vh] max-h-[680px]">

          {/* ── LEFT COLUMN: Persona 5 Battle Skill List (Vertical Stack) ── */}
          <div className="md:col-span-5 flex flex-col justify-between h-full space-y-1.5">
            {/* Header banner */}
            <div className="flex items-center justify-between pb-1 border-b-2 border-white/60 mb-1">
              <span className="font-p5Heading text-xs sm:text-sm text-white tracking-widest uppercase flex items-center gap-1.5">
                <span className="bg-p5-crimson text-white px-1.5 py-0.2 font-black -skew-x-12">
                  BATTLE DECK
                </span>
                EQUIPPED (8/8)
              </span>
              <span className="font-p5Mono text-[9px] text-yellow-300 font-bold tracking-tight">
                [▲/▼ NAVIGATE]
              </span>
            </div>

            {/* 8-Skill Vertical Stack */}
            <div className="flex-1 flex flex-col justify-between gap-1.5">
              {SKILL_DECK.map((skill, index) => {
                const isSelected = selectedIndex === index
                const badge = ELEMENT_BADGES[skill.element]

                return (
                  <button
                    key={skill.id}
                    type="button"
                    onClick={() => {
                      playSlash()
                      setSelectedIndex(index)
                    }}
                    onMouseEnter={() => {
                      if (!isSelected) playHover()
                    }}
                    className={`
                      relative w-full px-2.5 py-1.5 sm:py-2 text-left transition-all duration-150 -skew-x-6 flex items-center justify-between cursor-pointer border-2
                      ${isSelected
                        ? 'bg-p5-crimson text-white border-white shadow-[4px_4px_0px_#FFFFFF] scale-[1.02] z-10'
                        : 'bg-black/90 text-white border-zinc-700 hover:border-white hover:bg-zinc-900 shadow-[3px_3px_0px_#000000]'
                      }
                    `}
                  >
                    {/* Left: Element Icon & Skill Name */}
                    <div className="flex items-center gap-2">
                      <span className={`size-6 sm:size-7 shrink-0 flex items-center justify-center border border-black shadow-[1px_1px_0px_#000] ${badge.bg}`}>
                        {badge.icon}
                      </span>
                      <span className="font-p5Heading text-xs sm:text-sm md:text-[15px] font-black tracking-wide uppercase">
                        {skill.name}
                      </span>
                    </div>

                    {/* Right: Cost (SP/HP) */}
                    <div className="flex items-center gap-1">
                      <span className={`font-p5Mono text-xs sm:text-sm font-black ${isSelected ? 'text-p5-yellow' : 'text-zinc-300'}`}>
                        {skill.cost}
                      </span>
                      {isSelected && <ChevronRight className="size-4 text-white animate-pulse" />}
                    </div>
                  </button>
                )
              })}
            </div>
          </div>

          {/* ── RIGHT COLUMN: Detailed Persona Inspector Card (High Contrast) ── */}
          <div className="md:col-span-7 flex flex-col justify-between h-full bg-black/95 border-3 sm:border-4 border-white p-4 sm:p-5 shadow-[10px_10px_0px_#000000] -skew-x-2">
            
            {/* 1. Skill Header & Badges */}
            <div className="border-b-2 border-zinc-700 pb-2.5">
              <div className="flex items-center justify-between flex-wrap gap-2 mb-1.5">
                <div className="flex items-center gap-2">
                  <span className={`px-2 py-0.5 font-p5Heading text-xs font-black -skew-x-12 border border-black shadow-[2px_2px_0px_#000] ${ELEMENT_BADGES[activeSkill.element].bg}`}>
                    {activeSkill.element} // {activeSkill.cost}
                  </span>
                  <span className="bg-white text-black font-p5Heading text-[11px] font-black px-2 py-0.5 -skew-x-6">
                    {activeSkill.category}
                  </span>
                </div>
                <span className="bg-p5-crimson text-white font-p5Mono text-xs font-black px-2 py-0.5 -skew-x-6 shadow-[2px_2px_0px_#000]">
                  LV. {activeSkill.level} // MAX
                </span>
              </div>

              {/* Title */}
              <h2 className="font-p5Heading text-2xl sm:text-3xl text-white tracking-wider uppercase drop-shadow-[2px_2px_0px_#000]">
                {activeSkill.name}
              </h2>
            </div>

            {/* 2. Big Readable Description */}
            <div className="my-2 p-3 sm:p-3.5 bg-zinc-950/90 border-l-4 border-p5-crimson shadow-[inset_0_2px_4px_rgba(0,0,0,0.6)]">
              <span className="block font-p5Sub text-[9px] sm:text-[10px] text-zinc-400 uppercase tracking-widest mb-1 font-bold">
                TACTICAL EFFECT & BEHAVIOR:
              </span>
              <p className="font-p5Body text-sm sm:text-[15px] font-semibold text-white leading-relaxed tracking-tight">
                {activeSkill.description}
              </p>
            </div>

            {/* 3. Tech Stack Badges (Ultra-High Contrast White Cards) */}
            <div className="mb-2">
              <span className="block font-p5Sub text-[10px] text-zinc-400 uppercase tracking-widest mb-1.5 font-bold">
                EQUIPPED TECH ARSENAL:
              </span>
              <div className="flex items-center gap-1.5 sm:gap-2 flex-wrap">
                {activeSkill.techs.map((tech, i) => (
                  <span
                    key={i}
                    className="font-p5Heading text-xs font-black text-black bg-white px-2.5 py-1 border-1.5 border-black shadow-[2px_2px_0px_#E60012] -skew-x-6 hover:scale-105 transition-transform"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* 4. Persona Tactical Parameter Radar & Stats (LV. 99) */}
            <div className="pt-2 border-t-2 border-zinc-800 grid grid-cols-12 gap-3 items-center">
              {/* Radar Pentagon SVG */}
              <div className="col-span-5 flex items-center justify-center">
                <svg viewBox="0 0 120 120" className="w-[100px] h-[100px] sm:w-[110px] sm:h-[110px]">
                  <polygon points={getPoints(1.0)} fill="none" stroke="#444444" strokeWidth="1.2" />
                  <polygon points={getPoints(0.75)} fill="none" stroke="#2a2a2a" strokeWidth="1" />
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
                        stroke="#333333"
                        strokeWidth="1"
                      />
                    )
                  })}

                  <polygon
                    points={statPolygon}
                    fill="rgba(230, 0, 18, 0.45)"
                    stroke="#E60012"
                    strokeWidth="2.5"
                    className="filter drop-shadow-[0_0_8px_rgba(230,0,18,0.9)]"
                  />

                  {RADAR_STATS.map((s, idx) => {
                    const rad = (s.angle * Math.PI) / 180
                    const r = (s.value / 100) * maxR
                    const px = cx + r * Math.cos(rad)
                    const py = cy + r * Math.sin(rad)
                    const lx = cx + (maxR + 10) * Math.cos(rad)
                    const ly = cy + (maxR + 10) * Math.sin(rad)
                    return (
                      <g key={idx}>
                        <circle cx={px} cy={py} r="2.5" fill="#FFFFFF" stroke="#E60012" strokeWidth="1" />
                        <text
                          x={lx}
                          y={ly + 2.5}
                          fill="#FFFFFF"
                          fontSize="8"
                          fontWeight="bold"
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

              {/* 5 Radar Stat Bars with High Contrast */}
              <div className="col-span-7 flex flex-col justify-center gap-1 font-p5Mono">
                {RADAR_STATS.map(stat => (
                  <div key={stat.key} className="flex items-center justify-between bg-zinc-950 px-2 py-0.5 border border-zinc-800 text-[10px] sm:text-[11px]">
                    <div className="flex items-center gap-1.5">
                      <span className="font-extrabold text-p5-crimson">{stat.key}</span>
                      <span className="text-zinc-200 font-bold">{stat.label}</span>
                    </div>
                    <span className="font-black text-white bg-p5-crimson px-1.5 py-0.2 border border-black shadow-[1px_1px_0px_#000]">
                      {stat.value}
                    </span>
                  </div>
                ))}
              </div>
            </div>

          </div>

        </div>
      </div>
    </div>
  )
}
