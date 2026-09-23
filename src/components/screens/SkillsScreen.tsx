import React, { useState } from 'react'
import { PageCutoutOverlay } from '@/components/common/PageCutoutOverlay'
import { usePersonaSFX } from '@/hooks/usePersonaSFX'
import { Zap, Sparkles, Shield, Flame, Sword, Crosshair, HeartPulse, RefreshCw } from 'lucide-react'

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
  PHYS:    { bg: 'bg-zinc-200 text-black',   text: 'text-zinc-200', icon: <Sword className="size-3" /> },
  ELEC:    { bg: 'bg-yellow-400 text-black', text: 'text-yellow-400', icon: <Zap className="size-3" /> },
  PSY:     { bg: 'bg-pink-500 text-white',   text: 'text-pink-400',   icon: <Sparkles className="size-3" /> },
  FIRE:    { bg: 'bg-p5-crimson text-white', text: 'text-p5-crimson', icon: <Flame className="size-3" /> },
  GUN:     { bg: 'bg-amber-600 text-white',  text: 'text-amber-400',  icon: <Crosshair className="size-3" /> },
  BLESS:   { bg: 'bg-cyan-300 text-black',   text: 'text-cyan-300',   icon: <Shield className="size-3" /> },
  CURSE:   { bg: 'bg-purple-600 text-white', text: 'text-purple-400', icon: <RefreshCw className="size-3" /> },
  SUPPORT: { bg: 'bg-emerald-500 text-black',text: 'text-emerald-400',icon: <HeartPulse className="size-3" /> },
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
  const { playHover, playSlash } = usePersonaSFX()
  const [activeSkill, setActiveSkill] = useState<SkillItem>(SKILL_DECK[0])

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
    <div className="fixed inset-0 z-30 flex flex-col justify-between p-4 sm:p-6 md:p-8 select-none overflow-hidden bg-gradient-to-r from-black/95 from-0% via-black/80 via-35% to-transparent to-55% animate-in fade-in duration-200 pt-16 sm:pt-20 md:pt-22 pb-4">
      {/* Page Title Cutout Overlay */}
      <PageCutoutOverlay
        title="SKILL PARAMETERS"
        characterRole="SUPPORT"
        characterName="FUTABA SAKURA"
        accentColor="emerald"
        onBack={onBack}
      />

      {/* Main Content Area: Left side (58% max width) so character is open */}
      <div className="flex-1 flex flex-col justify-center items-start my-auto z-20 w-full max-w-4xl lg:max-w-[58%] pl-2 sm:pl-6 md:pl-8">
        <div className="w-full space-y-2.5">

          {/* Top Row: Tactical Pentagon Radar + Stat Summary Strip */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-3 bg-black/85 border-2 border-zinc-800 p-3 -skew-x-2 shadow-[6px_6px_0px_#000000]">
            {/* SVG Pentagon Radar */}
            <div className="md:col-span-5 flex flex-col items-center justify-center relative">
              <span className="font-p5Sub text-[9px] text-zinc-400 tracking-widest uppercase self-start mb-0.5 flex items-center gap-1.5">
                <span className="size-1.5 bg-p5-crimson animate-pulse" />
                PARAMETER RADAR // LV. 99
              </span>
              <svg viewBox="0 0 150 150" className="w-[125px] h-[125px]">
                <polygon points={getPoints(1.0)} fill="none" stroke="#333333" strokeWidth="1" />
                <polygon points={getPoints(0.75)} fill="none" stroke="#222222" strokeWidth="1" />
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
                      stroke="#2a2a2a"
                      strokeWidth="1"
                    />
                  )
                })}

                <polygon
                  points={statPolygon}
                  fill="rgba(230, 0, 18, 0.45)"
                  stroke="#E60012"
                  strokeWidth="2"
                  className="filter drop-shadow-[0_0_6px_rgba(230,0,18,0.8)]"
                />

                {RADAR_STATS.map((s, idx) => {
                  const rad = (s.angle * Math.PI) / 180
                  const r = (s.value / 100) * maxR
                  const px = cx + r * Math.cos(rad)
                  const py = cy + r * Math.sin(rad)
                  const lx = cx + (maxR + 11) * Math.cos(rad)
                  const ly = cy + (maxR + 11) * Math.sin(rad)
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

            {/* Radar Stat Readout Cards */}
            <div className="md:col-span-7 flex flex-col justify-center gap-1 font-p5Mono">
              {RADAR_STATS.map(stat => (
                <div key={stat.key} className="flex items-center justify-between bg-zinc-950/90 px-2.5 py-0.5 border border-zinc-800 text-[11px]">
                  <div className="flex items-center gap-1.5">
                    <span className="font-extrabold text-p5-crimson">{stat.key}</span>
                    <span className="text-zinc-300 text-[10px]">{stat.label}</span>
                  </div>
                  <span className="font-extrabold text-white bg-p5-crimson/30 px-1 py-0.2 border border-p5-crimson/50 text-[10px]">
                    {stat.value}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Middle Section: 8-Slot Persona Battle Deck */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <span className="font-p5Sub text-[11px] text-white tracking-widest uppercase flex items-center gap-1.5">
                <span className="px-1.5 py-0.2 bg-p5-crimson text-black font-extrabold text-[9px]">DECK</span>
                EQUIPPED PERSONA SKILLS (8/8 SLOTS)
              </span>
              <span className="font-p5Mono text-[9px] text-zinc-400">CLICK TO INSPECT</span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
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
                      relative p-2 text-left border-2 transition-all duration-150 -skew-x-2
                      ${isSelected
                        ? 'bg-p5-crimson border-white text-white shadow-[3px_3px_0px_#FFFFFF] scale-102 z-10'
                        : 'bg-black/90 border-zinc-800 text-zinc-300 hover:border-zinc-500 hover:text-white'
                      }
                    `}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className={`flex items-center gap-1 font-p5Mono text-[8px] font-bold px-1 py-0.2 ${isSelected ? 'bg-black text-white' : badge.bg}`}>
                        {badge.icon}
                        {skill.element}
                      </span>
                      <span className={`font-p5Mono text-[9px] font-extrabold ${isSelected ? 'text-p5-yellow' : 'text-zinc-400'}`}>
                        {skill.cost}
                      </span>
                    </div>

                    <div className="font-p5Heading text-xs sm:text-sm leading-tight uppercase truncate">
                      {skill.name}
                    </div>

                    <div className={`font-p5Mono text-[8px] truncate ${isSelected ? 'text-zinc-200' : 'text-zinc-500'}`}>
                      {skill.category}
                    </div>
                  </button>
                )
              })}
            </div>
          </div>

          {/* Bottom Section: Active Skill Inspector Readout Panel */}
          <div className="bg-black/90 border-2 border-p5-crimson p-3 -skew-x-2 shadow-[6px_6px_0px_#000000]">
            <div className="flex items-center justify-between border-b border-zinc-800 pb-1.5 mb-1.5">
              <div className="flex items-center gap-2">
                <span className={`px-1.5 py-0.2 font-p5Mono text-[10px] font-black ${ELEMENT_BADGES[activeSkill.element].bg}`}>
                  {activeSkill.element} // {activeSkill.cost}
                </span>
                <span className="font-p5Heading text-base sm:text-lg text-white tracking-wide uppercase">
                  {activeSkill.name}
                </span>
              </div>
              <span className="font-p5Mono text-[11px] text-p5-crimson font-extrabold">
                LV. {activeSkill.level} // MAX
              </span>
            </div>

            <p className="font-p5Body text-xs text-zinc-200 leading-relaxed mb-2">
              {activeSkill.description}
            </p>

            <div className="flex items-center gap-1.5 flex-wrap">
              <span className="font-p5Sub text-[9px] text-zinc-400 tracking-wider">
                TECH AFFINITY:
              </span>
              {activeSkill.techs.map((tech, i) => (
                <span
                  key={i}
                  className="font-p5Mono text-[9px] text-white bg-zinc-900 border border-zinc-700 px-1.5 py-0.5"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}
