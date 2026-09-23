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
        characterRole="STRIKER"
        characterName="AKIHIKO SANADA"
        accentColor="gray"
        onBack={onBack}
      />

      {/* Main Content Area: Left side (58% max width) so Futaba character on right remains visible */}
      <div className="flex-1 flex flex-col justify-center items-start my-auto z-20 w-full max-w-4xl lg:max-w-[58%] pl-2 sm:pl-6 md:pl-8">
        <div className="w-full space-y-2.5">

          {/* 1. Top Section: Tactical Pentagon Radar + High-Contrast Stat Summary */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-3 bg-black/95 border-2 border-white p-3 -skew-x-2 shadow-[6px_6px_0px_#000000]">
            {/* SVG Pentagon Radar */}
            <div className="md:col-span-5 flex flex-col items-center justify-center relative">
              <span className="font-p5Sub text-[10px] text-white font-bold tracking-widest uppercase self-start mb-0.5 flex items-center gap-1.5">
                <span className="size-2 bg-zinc-400 animate-pulse" />
                PARAMETER RADAR // LV. 99
              </span>
              <svg viewBox="0 0 150 150" className="w-[125px] h-[125px]">
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
                  fill="rgba(161, 161, 170, 0.45)"
                  stroke="#A1A1AA"
                  strokeWidth="2.5"
                  className="filter drop-shadow-[0_0_8px_rgba(161,161,170,0.8)]"
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
                      <circle cx={px} cy={py} r="2.5" fill="#FFFFFF" stroke="#A1A1AA" strokeWidth="1" />
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

            {/* Radar Stat Readout Cards (High Contrast) */}
            <div className="md:col-span-7 flex flex-col justify-center gap-1 font-p5Mono">
              {RADAR_STATS.map(stat => (
                <div key={stat.key} className="flex items-center justify-between bg-zinc-950 px-2.5 py-1 border border-zinc-700 text-xs">
                  <div className="flex items-center gap-2">
                    <span className="font-black text-zinc-300 text-xs">{stat.key}</span>
                    <span className="text-white font-bold text-[11px]">{stat.label}</span>
                  </div>
                  <span className="font-black text-white bg-zinc-700 px-1.5 py-0.2 border border-zinc-500 shadow-[1px_1px_0px_#000] text-xs">
                    {stat.value}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* 2. Middle Section: 8-Slot Persona Battle Deck (Restored Grid with High Contrast) */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <span className="font-p5Sub text-xs text-white font-bold tracking-widest uppercase flex items-center gap-1.5">
                <span className="px-1.5 py-0.2 bg-zinc-600 text-white font-black text-[10px] -skew-x-12">
                  DECK
                </span>
                EQUIPPED PERSONA SKILLS (8/8 SLOTS)
              </span>
              <span className="font-p5Mono text-[10px] text-yellow-300 font-bold tracking-tight">
                CLICK TO INSPECT
              </span>
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
                      relative p-2.5 text-left border-2 transition-all duration-150 -skew-x-2 cursor-pointer
                      ${isSelected
                        ? 'bg-zinc-600 border-white text-white shadow-[4px_4px_0px_#FFFFFF] scale-[1.02] z-10'
                        : 'bg-black/95 border-zinc-600 text-white hover:border-white hover:bg-zinc-900 shadow-[3px_3px_0px_#000000]'
                      }
                    `}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className={`flex items-center gap-1 font-p5Mono text-[9px] font-black px-1.5 py-0.2 border border-black ${isSelected ? 'bg-black text-white' : badge.bg}`}>
                        {badge.icon}
                        {skill.element}
                      </span>
                      <span className={`font-p5Mono text-xs font-black ${isSelected ? 'text-yellow-300' : 'text-yellow-400'}`}>
                        {skill.cost}
                      </span>
                    </div>

                    <div className="font-p5Heading text-xs sm:text-sm font-black leading-tight uppercase truncate text-white">
                      {skill.name}
                    </div>

                    <div className={`font-p5Mono text-[9px] font-bold mt-0.5 truncate ${isSelected ? 'text-zinc-100' : 'text-zinc-300'}`}>
                      {skill.category}
                    </div>
                  </button>
                )
              })}
            </div>
          </div>

          {/* 3. Bottom Section: Active Skill Inspector Readout Panel (High Contrast & Clear) */}
          <div className="bg-black/95 border-3 border-zinc-500 p-3 sm:p-4 -skew-x-2 shadow-[6px_6px_0px_#000000]">
            <div className="flex items-center justify-between border-b-2 border-zinc-700 pb-2 mb-2 flex-wrap gap-2">
              <div className="flex items-center gap-2">
                <span className={`px-2 py-0.5 font-p5Mono text-[11px] font-black border border-black shadow-[1px_1px_0px_#000] ${ELEMENT_BADGES[activeSkill.element].bg}`}>
                  {activeSkill.element} // {activeSkill.cost}
                </span>
                <span className="font-p5Heading text-base sm:text-xl font-black text-white tracking-wide uppercase">
                  {activeSkill.name}
                </span>
              </div>
              <span className="font-p5Mono text-xs text-yellow-300 font-black bg-black px-2 py-0.5 border border-p5-crimson">
                LV. {activeSkill.level} // MAX
              </span>
            </div>

            <p className="font-p5Body text-xs sm:text-[13px] font-semibold text-white leading-relaxed mb-2.5 p-2.5 bg-zinc-950 border-l-4 border-zinc-400">
              {activeSkill.description}
            </p>

            <div className="flex items-center gap-1.5 sm:gap-2 flex-wrap">
              <span className="font-p5Sub text-[10px] text-zinc-300 font-bold tracking-wider">
                TECH AFFINITY:
              </span>
              {activeSkill.techs.map((tech, i) => (
                <span
                  key={i}
                  className="font-p5Heading text-xs font-black text-black bg-white border-1.5 border-black px-2.5 py-0.5 shadow-[2px_2px_0px_#71717A] -skew-x-6 hover:scale-105 transition-transform"
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
