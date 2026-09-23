import React, { useState } from 'react'
import { PageCutoutOverlay } from '@/components/common/PageCutoutOverlay'
import { usePersonaSFX } from '@/hooks/usePersonaSFX'
import { Zap, Sparkles, Shield, Flame, Sword, Crosshair, HeartPulse, RefreshCw } from 'lucide-react'
import confetti from 'canvas-confetti'

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
  GUN:     { bg: 'bg-amber-600 text-white',  text: 'text-amber-400',  icon: <Crosshair className="size-3.5" /> },
  BLESS:   { bg: 'bg-cyan-300 text-black',   text: 'text-cyan-300',   icon: <Shield className="size-3.5" /> },
  CURSE:   { bg: 'bg-purple-600 text-white', text: 'text-purple-400', icon: <RefreshCw className="size-3.5" /> },
  SUPPORT: { bg: 'bg-emerald-500 text-black',text: 'text-emerald-400',icon: <HeartPulse className="size-3.5" /> },
}

const SKILL_DECK: SkillItem[] = [
  {
    id: 'elec-spa',
    name: 'HIGH-VOLTAGE SPA',
    element: 'ELEC',
    cost: '18 SP',
    category: 'FRONTEND ARCHITECTURE',
    level: 98,
    description: 'Deploys reactive interfaces with instant state hydration and zero layout shifts.',
    techs: ['TypeScript', 'React 19', 'Next.js', 'Vue 3', 'Tailwind CSS', 'Vite'],
  },
  {
    id: 'psy-ai',
    name: 'NEURAL SYNTHESIS',
    element: 'PSY',
    cost: '24 SP',
    category: 'AI & DATA SCIENCE',
    level: 94,
    description: 'Infiltrates text telemetry using transformer neural nets and sentiment analysis.',
    techs: ['PyTorch', 'IndoBERT', 'Hugging Face', 'NLP', 'Pandas', 'Scikit-learn'],
  },
  {
    id: 'fire-shader',
    name: 'SHADER INFERNO',
    element: 'FIRE',
    cost: '20 SP',
    category: 'GAME & SHADER DEV',
    level: 90,
    description: 'Conjures real-time lighting, custom HLSL surface shaders, and arcade vehicle physics.',
    techs: ['Unity 3D', 'C#', 'ShaderLab', 'HLSL Graphics', 'Vehicle Physics Engine'],
  },
  {
    id: 'phys-arch',
    name: 'FULL-STACK CLEAVE',
    element: 'PHYS',
    cost: '12% HP',
    category: 'SYSTEM INTEGRITY',
    level: 95,
    description: 'Heavy physical code refactoring delivering clean modular patterns and type safety.',
    techs: ['Clean Architecture', 'Design Patterns', 'Microfrontends', 'State Machines'],
  },
  {
    id: 'gun-cloud',
    name: 'CLOUD EXECUTION',
    element: 'GUN',
    cost: '15 SP',
    category: 'BACKEND & DEVOPS',
    level: 89,
    description: 'Pierces through high-concurrency requests with serverless functions and relational queries.',
    techs: ['Node.js', 'PHP Laravel', 'REST APIs', 'MySQL', 'Vercel Serverless', 'Git CI/CD'],
  },
  {
    id: 'bless-ui',
    name: 'PERSONA POLISH',
    element: 'BLESS',
    cost: '10 SP',
    category: 'CREATIVE DIRECTION',
    level: 97,
    description: 'Infuses bold Persona-grade aesthetics, responsive audio SFX, and tactile micro-animations.',
    techs: ['Figma to Code', 'Audio Synthesis', 'Keyframe VFX', 'Glassmorphism'],
  },
  {
    id: 'curse-trim',
    name: 'LAG PURGE',
    element: 'CURSE',
    cost: '14 SP',
    category: 'RUNTIME SPEED',
    level: 96,
    description: 'Banishes JavaScript bundle bloat and memory leaks to achieve 60fps rendering.',
    techs: ['Code Splitting', 'Web Workers', 'Bundle Analyzer', 'Lighthouse 100'],
  },
  {
    id: 'sup-lead',
    name: 'HEIST COMMAND',
    element: 'SUPPORT',
    cost: '16 SP',
    category: 'TEAM COLLABORATION',
    level: 92,
    description: 'Boosts team agility and morale through transparent code reviews and sprint planning.',
    techs: ['Agile / Scrum', 'Technical Writing', 'Mentorship', 'Open Source'],
  },
]

// 5 Core Stats for the Persona 5 Pentagon Radar
const RADAR_STATS = [
  { key: 'ST', label: 'STRENGTH (FRONTEND)', value: 98, angle: -90 },
  { key: 'MA', label: 'MAGIC (AI & NLP)', value: 94, angle: -18 },
  { key: 'EN', label: 'ENDURANCE (BACKEND)', value: 89, angle: 54 },
  { key: 'AG', label: 'AGILITY (VITE & PERF)', value: 96, angle: 126 },
  { key: 'LU', label: 'LUCK (GAME & SHADERS)', value: 90, angle: 198 },
]

export const SkillsScreen: React.FC<SkillsScreenProps> = ({ onBack }) => {
  const { playHover, playSlash, playStamp } = usePersonaSFX()
  const [activeSkill, setActiveSkill] = useState<SkillItem>(SKILL_DECK[0])
  const [endorsements, setEndorsements] = useState(148)
  const [hasEndorsed, setHasEndorsed] = useState(false)

  const handleEndorse = () => {
    if (hasEndorsed) return
    playStamp()
    setEndorsements(prev => prev + 1)
    setHasEndorsed(true)

    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { x: 0.35, y: 0.7 },
        colors: ['#E60012', '#FFFFFF', '#FFD700', '#000000'],
      })
    } catch {
      // Fallback
    }
  }

  // Calculate polygon points for 5-point radar (radius: 70)
  const cx = 90
  const cy = 90
  const maxR = 65

  const getPoints = (scale: number) => {
    return RADAR_STATS.map(s => {
      const rad = (s.angle * Math.PI) / 180
      const r = maxR * scale
      return `${cx + r * Math.cos(rad)},${cy + r * Math.sin(rad)}`
    }).join(' ')
  }

  const statPolygon = RADAR_STATS.map(s => {
    const rad = (s.angle * Math.PI) / 180
    const r = (s.value / 100) * maxR
    return `${cx + r * Math.cos(rad)},${cy + r * Math.sin(rad)}`
  }).join(' ')

  return (
    <div className="fixed inset-0 z-30 flex flex-col p-6 sm:p-8 md:p-10 select-none overflow-hidden bg-gradient-to-r from-black/95 via-black/75 to-transparent animate-in fade-in duration-200 pt-32 sm:pt-36 md:pt-40">
      {/* Page Title Cutout Overlay */}
      <PageCutoutOverlay
        title="SKILLS"
        characterRole="FIGHTER"
        characterName="AKIHIKO SANADA"
        accentColor="red"
        onBack={onBack}
      />

      {/* Main Content: Left side contains the Persona Battle Deck & Radar, Right side is Akihiko */}
      <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 gap-6 mt-2 overflow-hidden z-20 max-w-7xl">
        <div className="lg:col-span-8 flex flex-col justify-between max-h-[calc(100vh-175px)] overflow-y-auto pr-2 custom-scrollbar space-y-4">

          {/* Top Row: Tactical Pentagon Radar + Stat Summary Strip */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4 bg-black/85 border-2 border-zinc-800 p-4 -skew-x-2 shadow-[6px_6px_0px_#000000]">
            {/* SVG Pentagon Radar */}
            <div className="md:col-span-5 flex flex-col items-center justify-center relative">
              <span className="font-p5Sub text-[10px] text-zinc-400 tracking-widest uppercase self-start mb-1 flex items-center gap-1.5">
                <span className="size-2 bg-p5-crimson animate-pulse" />
                PARAMETER RADAR // LV. 99
              </span>
              <svg viewBox="0 0 180 180" className="w-[155px] h-[155px]">
                {/* Background Grid Pentagons */}
                <polygon points={getPoints(1.0)} fill="none" stroke="#333333" strokeWidth="1" />
                <polygon points={getPoints(0.75)} fill="none" stroke="#222222" strokeWidth="1" />
                <polygon points={getPoints(0.5)} fill="none" stroke="#222222" strokeWidth="1" />
                <polygon points={getPoints(0.25)} fill="none" stroke="#1a1a1a" strokeWidth="1" />

                {/* Grid Axes */}
                {RADAR_STATS.map((s, idx) => {
                  const rad = (s.angle * Math.PI) / 180
                  return (
                    <line
                      key={idx}
                      x1={cx}
                      y1={cy}
                      x2={cx + maxR * Math.cos(rad)}
                      y2={cy + maxR * Math.sin(rad)}
                      stroke="#2a2a2a"
                      strokeWidth="1"
                    />
                  )
                })}

                {/* Filled Stat Polygon */}
                <polygon
                  points={statPolygon}
                  fill="rgba(230, 0, 18, 0.45)"
                  stroke="#E60012"
                  strokeWidth="2.5"
                  className="filter drop-shadow-[0_0_8px_rgba(230,0,18,0.8)]"
                />

                {/* Vertex Points & Labels */}
                {RADAR_STATS.map((s, idx) => {
                  const rad = (s.angle * Math.PI) / 180
                  const r = (s.value / 100) * maxR
                  const px = cx + r * Math.cos(rad)
                  const py = cy + r * Math.sin(rad)
                  const lx = cx + (maxR + 14) * Math.cos(rad)
                  const ly = cy + (maxR + 14) * Math.sin(rad)
                  return (
                    <g key={idx}>
                      <circle cx={px} cy={py} r="3" fill="#FFFFFF" stroke="#E60012" strokeWidth="1.5" />
                      <text
                        x={lx}
                        y={ly + 3}
                        fill="#FFFFFF"
                        fontSize="9"
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

            {/* Radar Stat Readout Cards */}
            <div className="md:col-span-7 flex flex-col justify-center gap-1.5 font-p5Mono">
              {RADAR_STATS.map(stat => (
                <div key={stat.key} className="flex items-center justify-between bg-zinc-950/90 px-3 py-1 border border-zinc-800 text-xs">
                  <div className="flex items-center gap-2">
                    <span className="font-extrabold text-p5-crimson">{stat.key}</span>
                    <span className="text-zinc-300 text-[11px]">{stat.label}</span>
                  </div>
                  <span className="font-extrabold text-white bg-p5-crimson/30 px-1.5 py-0.5 border border-p5-crimson/50">
                    {stat.value}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Middle Section: 8-Slot Persona Battle Deck */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="font-p5Sub text-xs text-white tracking-widest uppercase flex items-center gap-2">
                <span className="px-1.5 py-0.5 bg-p5-crimson text-black font-extrabold text-[10px]">DECK</span>
                EQUIPPED PERSONA SKILLS (8/8 SLOTS)
              </span>
              <span className="font-p5Mono text-[10px] text-zinc-400">CLICK TO INSPECT</span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
              {SKILL_DECK.map(skill => {
                const isSelected = activeSkill.id === skill.id
                const badge = ELEMENT_BADGES[skill.element]

                return (
                  <button
                    key={skill.id}
                    type="button"
                    onClick={() => {
                      playSlash()
                      setActiveSkill(skill)
                    }}
                    onMouseEnter={playHover}
                    className={`
                      relative p-2.5 text-left border-2 transition-all duration-150 -skew-x-3
                      ${isSelected
                        ? 'bg-p5-crimson border-white text-white shadow-[4px_4px_0px_#FFFFFF] scale-105 z-10'
                        : 'bg-black/90 border-zinc-800 text-zinc-300 hover:border-zinc-500 hover:text-white'
                      }
                    `}
                  >
                    {/* Element badge & cost */}
                    <div className="flex items-center justify-between mb-1.5">
                      <span className={`flex items-center gap-1 font-p5Mono text-[9px] font-bold px-1.5 py-0.5 ${isSelected ? 'bg-black text-white' : badge.bg}`}>
                        {badge.icon}
                        {skill.element}
                      </span>
                      <span className={`font-p5Mono text-[10px] font-extrabold ${isSelected ? 'text-p5-yellow' : 'text-zinc-400'}`}>
                        {skill.cost}
                      </span>
                    </div>

                    {/* Skill Name */}
                    <div className="font-p5Heading text-sm sm:text-base leading-tight uppercase truncate">
                      {skill.name}
                    </div>

                    {/* Category preview */}
                    <div className={`font-p5Mono text-[9px] truncate ${isSelected ? 'text-zinc-200' : 'text-zinc-500'}`}>
                      {skill.category}
                    </div>
                  </button>
                )
              })}
            </div>
          </div>

          {/* Bottom Section: Active Skill Inspector Readout Panel */}
          <div className="bg-black/90 border-2 border-p5-crimson p-4 -skew-x-2 shadow-[6px_6px_0px_#000000]">
            <div className="flex items-center justify-between border-b border-zinc-800 pb-2 mb-2">
              <div className="flex items-center gap-2">
                <span className={`px-2 py-0.5 font-p5Mono text-xs font-black ${ELEMENT_BADGES[activeSkill.element].bg}`}>
                  {activeSkill.element} // {activeSkill.cost}
                </span>
                <span className="font-p5Heading text-xl text-white tracking-wide uppercase">
                  {activeSkill.name}
                </span>
              </div>
              <span className="font-p5Mono text-xs text-p5-crimson font-extrabold">
                LV. {activeSkill.level} // MAX
              </span>
            </div>

            <p className="font-p5Body text-sm text-zinc-200 leading-relaxed mb-3">
              {activeSkill.description}
            </p>

            <div className="flex flex-wrap items-center gap-1.5">
              <span className="font-p5Mono text-[10px] text-zinc-400 uppercase mr-1">TECH AFFINITY:</span>
              {activeSkill.techs.map((tech, i) => (
                <span
                  key={i}
                  className="bg-zinc-900 border border-zinc-700 text-zinc-200 font-p5Mono text-[11px] px-2 py-0.5 -skew-x-3"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Action Row: Endorse / All-Out Commend */}
          <div className="flex items-center justify-between pt-2">
            <div className="flex items-center gap-2 font-p5Mono text-xs text-zinc-400">
              <span className="text-p5-crimson font-black text-sm">{endorsements}</span> PHANTOM COMMENDATIONS
            </div>

            <button
              type="button"
              onClick={handleEndorse}
              onMouseEnter={playHover}
              disabled={hasEndorsed}
              className={`
                px-5 py-2.5 font-p5Heading text-sm sm:text-base uppercase tracking-wider -skew-x-6 border-2 transition-all
                ${hasEndorsed
                  ? 'bg-zinc-800 border-zinc-600 text-zinc-400 cursor-default'
                  : 'bg-p5-crimson hover:bg-white text-white hover:text-black border-black shadow-[4px_4px_0px_#000000] hover:scale-105 active:scale-95'
                }
              `}
            >
              {hasEndorsed ? '★ COMMENDED ALL-OUT!' : '+ ALL-OUT COMMENDATION'}
            </button>
          </div>

        </div>
      </div>
    </div>
  )
}
