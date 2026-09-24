import React, { useState, useEffect, useCallback, useMemo } from 'react'
import { usePersonaSFX } from '@/hooks/usePersonaSFX'
import { PhantomDagger } from '@/components/common/PhantomDagger'
import { Zap, Sparkles, Shield, Flame, Sword, Crosshair, HeartPulse, RefreshCw, X, BarChart3 } from 'lucide-react'

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

const RADAR_STATS = [
  { key: 'ST', label: 'STRENGTH (FRONTEND)', value: 98, angle: -90 },
  { key: 'MA', label: 'MAGIC (AI & NLP)', value: 94, angle: -18 },
  { key: 'EN', label: 'ENDURANCE (BACKEND)', value: 89, angle: 54 },
  { key: 'AG', label: 'AGILITY (PERF & VITE)', value: 96, angle: 126 },
  { key: 'LU', label: 'LUCK (GAME & SHADERS)', value: 90, angle: 198 },
]

export const SkillsScreen: React.FC<SkillsScreenProps> = ({ onBack }) => {
  const { playHover, playSlash, playBack } = usePersonaSFX()

  // Real-time anchor date (Today)
  const [today] = useState(() => new Date())
  // Active skill index in SKILL_DECK
  const [activeIndex, setActiveIndex] = useState<number>(0)
  // Optional Radar Overlay modal
  const [isRadarOpen, setIsRadarOpen] = useState<boolean>(false)

  const activeSkill = SKILL_DECK[activeIndex]

  // Select a skill index
  const handleSelectIndex = useCallback((index: number) => {
    if (index !== activeIndex) {
      playSlash()
      setActiveIndex((index + SKILL_DECK.length) % SKILL_DECK.length)
    }
  }, [activeIndex, playSlash])

  // Real-time calendar arc items: 5 visible days surrounding activeIndex
  // offsets: [-2, -1, 0, 1, 2]
  const visibleArcDays = useMemo(() => {
    return [-2, -1, 0, 1, 2].map(relOffset => {
      const targetIndex = (activeIndex + relOffset + SKILL_DECK.length) % SKILL_DECK.length
      const skill = SKILL_DECK[targetIndex]

      // Real-time date calculated relative to today and targetIndex
      const d = new Date(today)
      d.setDate(today.getDate() + targetIndex)

      const dayNum = d.getDate()
      const dayOfWeek = d.toLocaleDateString('en-US', { weekday: 'long' }).toUpperCase()
      const isToday = targetIndex === 0
      const isActive = relOffset === 0
      const isSaturday = d.getDay() === 6
      const isSunday = d.getDay() === 0

      return {
        targetIndex,
        relOffset,
        skill,
        dayNum,
        dayOfWeek,
        isToday,
        isActive,
        isSaturday,
        isSunday,
      }
    })
  }, [today, activeIndex])

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault()
        if (isRadarOpen) {
          playBack()
          setIsRadarOpen(false)
        } else {
          playBack()
          onBack()
        }
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault()
        playHover()
        setActiveIndex(prev => (prev - 1 + SKILL_DECK.length) % SKILL_DECK.length)
      } else if (e.key === 'ArrowRight') {
        e.preventDefault()
        playHover()
        setActiveIndex(prev => (prev + 1) % SKILL_DECK.length)
      } else if (e.key === 'x' || e.key === 'X' || e.key === 'Enter') {
        if (!isRadarOpen) {
          e.preventDefault()
          playSlash()
          setIsRadarOpen(true)
        }
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isRadarOpen, onBack, playBack, playHover, playSlash])

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

  const badge = ELEMENT_BADGES[activeSkill.element]

  return (
    <div className="fixed inset-0 z-30 select-none overflow-hidden flex flex-col justify-between p-4 sm:p-6 md:p-8 pt-5 sm:pt-7 md:pt-9 pb-3 sm:pb-4 animate-in fade-in duration-300">
      
      {/* ── CINEMATIC VFX: FLOATING RED EMBERS & TOKYO TOWER BEACON ── */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden z-10">
        {/* Tokyo Tower Aviation Warning Light */}
        <div
          className="absolute top-[17%] right-[19.2%] size-2.5 rounded-full bg-red-600 p5-beacon-light shadow-[0_0_10px_#E60012]"
          aria-hidden="true"
        />
        <div
          className="absolute top-[28%] right-[22.5%] size-2 rounded-full bg-red-500 p5-beacon-light shadow-[0_0_8px_#E60012]"
          style={{ animationDelay: '0.8s' }}
          aria-hidden="true"
        />

        {/* Floating Red Embers */}
        {[
          { left: '10%', delay: '0s', dur: '10s', size: 4 },
          { left: '22%', delay: '3s', dur: '13s', size: 5 },
          { left: '36%', delay: '6s', dur: '9s', size: 3 },
          { left: '48%', delay: '1.5s', dur: '11s', size: 5 },
          { left: '64%', delay: '4.2s', dur: '12s', size: 4 },
          { left: '76%', delay: '7s', dur: '10.5s', size: 5 },
          { left: '88%', delay: '2.2s', dur: '14s', size: 3 },
        ].map((ember, idx) => (
          <span
            key={idx}
            className="p5-ember rounded-full bg-p5-crimson shadow-[0_0_6px_#E60012]"
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
                  ? 'bg-p5-crimson text-white -rotate-3 font-black scale-105'
                  : i === 3
                  ? 'bg-white text-black rotate-4'
                  : i === 4
                  ? 'bg-black text-white -rotate-2'
                  : 'bg-p5-crimson text-white rotate-6 scale-110 shadow-[4px_4px_0px_#000000]'
              }`}
            >
              {char}
            </span>
          ))}
        </div>
        <div className="mt-1.5 flex items-center bg-black border-l-4 border-p5-crimson px-2.5 sm:px-3 py-0.5 text-[10px] sm:text-xs font-p5Sub tracking-widest text-white -skew-x-6 shadow-[3px_3px_0px_#000000]">
          <span className="text-p5-crimson font-bold mr-1.5">ARSENAL</span>
          <span className="text-zinc-500 mx-1">//</span>
          <span className="text-zinc-200">SLOT {activeIndex + 1} OF {SKILL_DECK.length}</span>
        </div>
      </div>

      {/* ── UPPER-CENTER: INTERACTIVE CALENDAR ARC WITH PHANTOM DAGGER ── */}
      <div className="z-20 my-auto flex flex-col items-center justify-center w-full">
        {/* Arc of Days */}
        <div className="relative flex items-center justify-center gap-3 sm:gap-6 md:gap-8 w-full max-w-5xl px-2">
          {visibleArcDays.map((item) => {
            const { targetIndex, relOffset, dayNum, dayOfWeek, isActive, isSaturday, isSunday, isToday } = item

            // Parabolic curve dropping on outer dates following the fisheye curvature
            const yDrop = Math.pow(Math.abs(relOffset), 1.8) * 14
            const rotation = relOffset * 4

            return (
              <div
                key={targetIndex}
                onClick={() => handleSelectIndex(targetIndex)}
                onMouseEnter={playHover}
                style={{
                  transform: `translateY(${yDrop}px) rotate(${rotation}deg)`,
                }}
                className={`relative flex flex-col items-center transition-all duration-200 cursor-pointer ${
                  isActive
                    ? 'scale-110 sm:scale-120 md:scale-125 z-30'
                    : 'scale-85 sm:scale-90 hover:scale-95 opacity-80 hover:opacity-100 z-10'
                }`}
              >
                {/* ── PHANTOM THIEVES DAGGER (STABBED INTO ACTIVE DATE) ── */}
                {isActive && (
                  <div
                    key={`dagger-${targetIndex}`}
                    className="absolute -top-16 sm:-top-20 md:-top-24 right-0 sm:right-1 md:right-2 w-18 sm:w-22 md:w-26 h-24 sm:h-30 md:h-36 pointer-events-none z-40 p5-dagger-slam-anim"
                    style={{ transformOrigin: 'bottom center' }}
                  >
                    <PhantomDagger className="w-full h-full" />
                  </div>
                )}

                {/* Date Number Plate */}
                <div
                  className={`relative flex items-center justify-center font-p5Heading tracking-tighter leading-none select-none transition-transform duration-150 ${
                    isActive
                      ? 'text-6xl sm:text-7xl md:text-8xl text-p5-crimson'
                      : isSaturday
                      ? 'text-4xl sm:text-5xl md:text-6xl text-cyan-400'
                      : isSunday
                      ? 'text-4xl sm:text-5xl md:text-6xl text-p5-crimson'
                      : 'text-4xl sm:text-5xl md:text-6xl text-white'
                  }`}
                  style={{
                    filter: isActive
                      ? 'drop-shadow(6px 6px 0px #000000)'
                      : 'drop-shadow(4px 4px 0px #000000)',
                    WebkitTextStroke: isActive ? '3.5px #FFFFFF' : '2.5px #000000',
                    paintOrder: 'stroke fill',
                  }}
                >
                  {dayNum}
                </div>

                {/* Day of Week Ribbon / Sticker */}
                <div
                  className={`mt-1 px-2.5 sm:px-3 py-0.5 -skew-x-12 border-2 border-black font-p5Sub text-[10px] sm:text-xs font-black tracking-wider uppercase transition-all ${
                    isActive
                      ? 'bg-white text-black shadow-[3px_3px_0px_#000000] rotate-2 scale-105'
                      : isSaturday
                      ? 'bg-cyan-400 text-black shadow-[2px_2px_0px_#000000] -rotate-2'
                      : isSunday
                      ? 'bg-p5-crimson text-white shadow-[2px_2px_0px_#000000] rotate-2'
                      : 'bg-black text-white shadow-[2px_2px_0px_#000000] -rotate-1'
                  }`}
                >
                  {dayOfWeek}
                </div>

                {/* 'TODAY' indicator pin */}
                {isToday && (
                  <span className="mt-1 bg-p5-yellow text-black text-[8px] sm:text-[9px] font-p5Mono font-extrabold px-1.5 py-0.2 -skew-x-6 border border-black shadow-[1px_1px_0px_#000]">
                    ★ TODAY
                  </span>
                )}
              </div>
            )
          })}
        </div>

        {/* ── LOWER-CENTER: ALTERNATIF A - COMIC CUTOUT SKILL HUD ── */}
        <div className="w-full max-w-4xl px-3 sm:px-4 mt-6 sm:mt-8 md:mt-10">
          <div className="relative bg-black/95 border-2 sm:border-3 border-white p-3.5 sm:p-5 shadow-[8px_8px_0px_#000000] -skew-x-2 transition-all">
            
            {/* Top Bar: Element Badge + Skill Title + Category + Level */}
            <div className="flex items-center justify-between border-b-2 border-zinc-700 pb-2.5 mb-2.5 flex-wrap gap-2">
              <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
                <span className={`flex items-center gap-1.5 px-2.5 py-1 font-p5Mono text-xs font-black border border-black shadow-[2px_2px_0px_#000] -skew-x-6 ${badge.bg}`}>
                  {badge.icon}
                  {activeSkill.element} // {activeSkill.cost}
                </span>

                <span className="font-p5Heading text-lg sm:text-2xl md:text-3xl font-black text-white tracking-wide uppercase filter drop-shadow-[2px_2px_0px_#000000]">
                  {activeSkill.name}
                </span>

                <span className="font-p5Mono text-xs text-zinc-300 font-bold hidden sm:inline">
                  [{activeSkill.category}]
                </span>
              </div>

              <div className="flex items-center gap-2">
                <span className="font-p5Mono text-xs text-yellow-300 font-black bg-zinc-900 px-2.5 py-1 border border-p5-crimson shadow-[2px_2px_0px_#000] -skew-x-6">
                  LV. {activeSkill.level} // MAX
                </span>
              </div>
            </div>

            {/* Description */}
            <p className="font-p5Body text-xs sm:text-sm font-semibold text-white leading-relaxed mb-3 p-2.5 bg-zinc-950 border-l-4 border-p5-crimson shadow-inner">
              {activeSkill.description}
            </p>

            {/* Bottom Row: Tech Affinity Chips */}
            <div className="flex items-center justify-between flex-wrap gap-2">
              <div className="flex items-center gap-1.5 sm:gap-2 flex-wrap">
                <span className="font-p5Sub text-[10px] sm:text-xs text-zinc-300 font-bold tracking-wider">
                  TECH AFFINITY:
                </span>
                {activeSkill.techs.map((tech, i) => (
                  <span
                    key={i}
                    className="font-p5Heading text-[11px] sm:text-xs font-black text-black bg-white border border-black px-2 sm:px-2.5 py-0.5 shadow-[2px_2px_0px_#71717A] -skew-x-6 hover:scale-105 transition-transform"
                  >
                    {tech}
                  </span>
                ))}
              </div>

              {/* Slot Indicator Pips */}
              <div className="flex items-center gap-1">
                {SKILL_DECK.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => handleSelectIndex(i)}
                    className={`h-2 transition-all cursor-pointer ${
                      i === activeIndex
                        ? 'w-6 bg-p5-crimson shadow-[0_0_6px_#E60012]'
                        : 'w-2 bg-zinc-600 hover:bg-white'
                    }`}
                    title={`Slot ${i + 1}`}
                  />
                ))}
              </div>
            </div>

          </div>
        </div>

      </div>

      {/* ── BOTTOM ACTION BAR (PERSONA 5 HUD LEGEND) ── */}
      <div className="z-20 flex items-center justify-between flex-wrap gap-3 text-xs sm:text-sm pointer-events-auto p5-footer-entrance">
        {/* Left: Back button */}
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

        {/* Center: Browse hint */}
        <div className="flex items-center gap-3 font-p5Mono text-xs text-white/90 bg-black/80 px-3.5 py-1 border border-white/40 -skew-x-6 shadow-[3px_3px_0px_#000]">
          <span className="text-yellow-400 font-bold">◀ / ▶</span>
          <span>BROWSE SKILLS</span>
          <span className="text-zinc-500">//</span>
          <button
            onClick={() => handleSelectIndex(0)}
            className="text-p5-crimson hover:text-white font-bold underline cursor-pointer"
          >
            SLOT 1
          </button>
        </div>

        {/* Right: Tactical Radar Toggle */}
        <button
          onClick={() => {
            playSlash()
            setIsRadarOpen(true)
          }}
          className="flex items-center gap-2 bg-zinc-900 hover:bg-p5-crimson text-white font-p5Heading text-xs sm:text-sm px-3.5 py-1.5 border border-zinc-400 hover:border-white shadow-[3px_3px_0px_#000000] -skew-x-6 transition-all hover:scale-105 cursor-pointer"
        >
          <BarChart3 className="size-4 text-p5-yellow" />
          <span className="tracking-wider uppercase">TACTICAL RADAR [X]</span>
        </button>
      </div>

      {/* ── TACTICAL RADAR POPUP MODAL (OPTIONAL EXTRA VIA [X]) ── */}
      {isRadarOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-[3px] animate-in fade-in duration-200">
          <div className="absolute inset-0" onClick={() => setIsRadarOpen(false)} />

          <div className="relative z-10 w-full max-w-xl bg-black/95 border-3 border-white p-4 sm:p-6 shadow-[10px_10px_0px_#E60012] -skew-x-1">
            <div className="flex items-center justify-between border-b-2 border-zinc-700 pb-2.5 mb-4">
              <div className="flex items-center gap-2">
                <span className="bg-p5-crimson text-white px-2 py-0.5 font-p5Sub text-xs tracking-widest uppercase -skew-x-6">
                  PARAMETER RADAR
                </span>
                <span className="font-p5Heading text-lg sm:text-xl text-white tracking-wide uppercase">
                  CONFIDANT STAT OVERVIEW
                </span>
              </div>
              <button
                onClick={() => setIsRadarOpen(false)}
                className="flex items-center gap-1 bg-zinc-900 hover:bg-p5-crimson text-white px-2.5 py-1 border border-zinc-500 shadow-[2px_2px_0px_#000] -skew-x-6 cursor-pointer transition-colors"
              >
                <X className="size-3.5" />
                <span className="font-p5Heading text-xs uppercase">CLOSE [O]</span>
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 items-center">
              {/* SVG Pentagon Radar */}
              <div className="sm:col-span-6 flex flex-col items-center justify-center">
                <svg viewBox="0 0 150 150" className="w-[140px] h-[140px]">
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
                    fill="rgba(230, 0, 18, 0.45)"
                    stroke="#E60012"
                    strokeWidth="2.5"
                    className="filter drop-shadow-[0_0_8px_rgba(230,0,18,0.8)]"
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
                        <circle cx={px} cy={py} r="2.5" fill="#FFFFFF" stroke="#E60012" strokeWidth="1" />
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

              {/* Stats List */}
              <div className="sm:col-span-6 flex flex-col gap-1 font-p5Mono">
                {RADAR_STATS.map(stat => (
                  <div key={stat.key} className="flex items-center justify-between bg-zinc-900 px-2 py-1 border border-zinc-700 text-xs">
                    <div className="flex items-center gap-1.5">
                      <span className="font-black text-p5-crimson text-xs">{stat.key}</span>
                      <span className="text-white font-bold text-[10px]">{stat.label}</span>
                    </div>
                    <span className="font-black text-white bg-black px-1.5 py-0.2 border border-p5-crimson shadow-[1px_1px_0px_#000] text-xs">
                      {stat.value}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  )
}
