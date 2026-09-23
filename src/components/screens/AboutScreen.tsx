import React, { useState } from 'react'
import { PageCutoutOverlay } from '@/components/common/PageCutoutOverlay'
import { usePersonaSFX } from '@/hooks/usePersonaSFX'
import { BookOpen, ShieldAlert, Wrench, Heart, Sparkles, FileText, Compass, Award } from 'lucide-react'

interface AboutScreenProps {
  onBack: () => void
}

interface SocialStat {
  key: string
  name: string
  rank: string
  level: number // 1 to 5
  description: string
  icon: React.ReactNode
  color: string
}

const SOCIAL_STATS: SocialStat[] = [
  {
    key: 'KNOWLEDGE',
    name: 'KNOWLEDGE',
    rank: 'RANK MAX (SCHOLAR)',
    level: 5,
    description: 'Deep mastery of full-stack engineering, TypeScript architecture, and scalable system design.',
    icon: <BookOpen className="size-4" />,
    color: '#38bdf8',
  },
  {
    key: 'GUTS',
    name: 'GUTS',
    rank: 'RANK 5 (LIONHEARTED)',
    level: 5,
    description: 'Fearlessly tackling complex HLSL surface shaders, machine learning models, and cutting-edge paradigms.',
    icon: <ShieldAlert className="size-4" />,
    color: '#f97316',
  },
  {
    key: 'PROFICIENCY',
    name: 'PROFICIENCY',
    rank: 'RANK MAX (TRANSCENDENT)',
    level: 5,
    description: 'Executing pixel-perfect UI, snappy audio feedback, 60fps micro-animations, and zero-latency rendering.',
    icon: <Wrench className="size-4" />,
    color: '#eab308',
  },
  {
    key: 'KINDNESS',
    name: 'KINDNESS',
    rank: 'RANK 5 (ANGELIC)',
    level: 5,
    description: 'Deep empathy for user experience, accessible design, collaborative team synergy, and open source.',
    icon: <Heart className="size-4" />,
    color: '#ec4899',
  },
  {
    key: 'CHARM',
    name: 'CHARM',
    rank: 'RANK MAX (DEBONAIR)',
    level: 5,
    description: 'Infusing audacious Persona-grade visual identity and high-energy personality into every software product.',
    icon: <Sparkles className="size-4" />,
    color: '#a855f7',
  },
]

const PALACE_MILESTONES = [
  {
    code: 'PALACE 01',
    target: 'THE MONOLITH SYSTEM',
    role: 'FULLSTACK ARCHITECT',
    result: 'TREASURE SECURED',
    details: 'Architected reactive Next.js & React ecosystem with modular state management and sub-second load times.',
  },
  {
    code: 'PALACE 02',
    target: 'COGNITIVE NEURAL MATRIX',
    role: 'AI / NLP RESEARCHER',
    result: 'SYNAPSE OVERHAULED',
    details: 'Fine-tuned IndoBERT and PyTorch transformer models for real-time sentiment analysis and classification.',
  },
  {
    code: 'PALACE 03',
    target: 'VIRTUAL DIMENSION ENGINE',
    role: 'CREATIVE TECHNOLOGIST',
    result: 'REALITY RENDERED',
    details: 'Forged custom HLSL surface shaders, realistic vehicle kinematics, and Unity 3D interactive graphics.',
  },
]

export const AboutScreen: React.FC<AboutScreenProps> = ({ onBack }) => {
  const { playHover, playSlash } = usePersonaSFX()
  const [activeTab, setActiveTab] = useState<'DOSSIER' | 'STATS' | 'HEISTS'>('DOSSIER')
  const [selectedStat, setSelectedStat] = useState<SocialStat>(SOCIAL_STATS[0])

  return (
    <div className="fixed inset-0 z-30 flex flex-col p-6 sm:p-8 md:p-10 select-none overflow-hidden bg-gradient-to-r from-black/95 via-black/80 to-transparent animate-in fade-in duration-200 pt-36 sm:pt-40 md:pt-44">
      {/* Page Cutout Overlay */}
      <PageCutoutOverlay
        title="ABOUT ME"
        characterRole="ENFORCER"
        characterName="SHINJIRO ARAGAKI"
        accentColor="red"
        onBack={onBack}
      />

      {/* Main Content: Left side contains UI, Right side is clear for Shinjiro */}
      <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 gap-6 mt-12 sm:mt-16 md:mt-20 overflow-hidden z-20 max-w-7xl">
        {/* Left side (7 cols) contains the dossier cards - NO huge gap, starts cleanly */}
        <div className="lg:col-span-7 flex flex-col justify-start max-h-[calc(100vh-175px)] overflow-y-auto pr-2 custom-scrollbar space-y-3">

          {/* Dossier Header & Navigation Tabs */}
          <div className="flex items-center justify-between border-b-2 border-red-600/50 pb-2">
            <div className="flex items-center gap-2">
              <span className="bg-p5-crimson text-white font-p5Heading text-xs sm:text-sm px-2.5 py-0.5 -skew-x-6 shadow-[2px_2px_0px_#000]">
                CONFIDENTIAL
              </span>
              <span className="font-p5Mono text-xs text-zinc-300 tracking-wider">
                THIEF DOSSIER // FERREL
              </span>
            </div>

            {/* Sub-navigation tabs */}
            <div className="flex items-center gap-1">
              {[
                { id: 'DOSSIER', label: 'PROFILE', icon: <FileText className="size-3" /> },
                { id: 'STATS', label: 'SOCIAL STATS', icon: <Award className="size-3" /> },
                { id: 'HEISTS', label: 'PALACE LOG', icon: <Compass className="size-3" /> },
              ].map(tab => (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => {
                    playSlash()
                    setActiveTab(tab.id as any)
                  }}
                  onMouseEnter={playHover}
                  className={`
                    flex items-center gap-1 font-p5Heading text-xs sm:text-sm px-2.5 sm:px-3 py-1 -skew-x-6 border transition-all
                    ${activeTab === tab.id
                      ? 'bg-p5-crimson text-white border-white shadow-[3px_3px_0px_#000000] scale-105'
                      : 'bg-black/80 text-zinc-400 border-zinc-800 hover:text-white hover:border-red-500/50'
                    }
                  `}
                >
                  {tab.icon}
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* TAB 1: CLASSIFIED DOSSIER FILE */}
          {activeTab === 'DOSSIER' && (
            <div className="relative bg-black/90 border-2 border-red-600/40 p-4 sm:p-5 -skew-x-1 shadow-[8px_8px_0px_#000000] space-y-3.5">
              {/* Red Rubber Stamp Effect */}
              <div className="absolute top-3 right-3 pointer-events-none border-4 border-p5-crimson text-p5-crimson font-p5Heading text-sm sm:text-base px-3 py-1 rotate-12 opacity-85 shadow-[0_0_10px_rgba(230,0,18,0.5)]">
                TOP SECRET // VERIFIED
              </div>

              {/* Persona Metadata Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-1 font-p5Mono">
                <div className="bg-zinc-950 p-2 border border-zinc-800">
                  <div className="text-[10px] text-zinc-500 uppercase">CODENAME</div>
                  <div className="text-white text-xs sm:text-sm font-bold">FERREL // ARCHITECT</div>
                </div>
                <div className="bg-zinc-950 p-2 border border-zinc-800">
                  <div className="text-[10px] text-zinc-500 uppercase">ARCANA</div>
                  <div className="text-p5-crimson text-xs sm:text-sm font-bold">THE FOOL (MAX)</div>
                </div>
                <div className="bg-zinc-950 p-2 border border-zinc-800">
                  <div className="text-[10px] text-zinc-500 uppercase">LOCATION</div>
                  <div className="text-white text-xs sm:text-sm font-bold">JAKARTA, ID</div>
                </div>
                <div className="bg-zinc-950 p-2 border border-zinc-800">
                  <div className="text-[10px] text-zinc-500 uppercase">SPECIALTY</div>
                  <div className="text-p5-yellow text-xs sm:text-sm font-bold">CREATIVE FULLSTACK</div>
                </div>
              </div>

              {/* Detective Narrative Report */}
              <div className="border-l-4 border-p5-crimson pl-3.5 py-1 space-y-1.5">
                <div className="font-p5Sub text-xs text-red-400 tracking-wider">
                  // INVESTIGATION SUMMARY & TRAITS
                </div>
                <p className="font-p5Body text-xs sm:text-sm text-zinc-200 leading-relaxed">
                  Subject is a Software Engineer and Creative Web Developer specialized in forging high-voltage,
                  cinematic digital interfaces. Bridges the boundary between enterprise-grade web engineering (TypeScript, React, Next.js, Vue),
                  applied machine learning (NLP, PyTorch, IndoBERT), and real-time interactive game development (Unity 3D, HLSL shaders).
                </p>
                <p className="font-p5Body text-xs sm:text-sm text-zinc-300 leading-relaxed">
                  Known for refusing ordinary web templates and insisting on tactile responsiveness, custom audio feedback,
                  and authentic game aesthetic immersion.
                </p>
              </div>

              {/* Core Philosophy Quote Banner */}
              <div className="bg-zinc-950/90 border border-zinc-800 p-2.5 -skew-x-2 flex items-center justify-between">
                <span className="font-p5Heading text-xs sm:text-sm text-zinc-300">
                  "NEVER SETTLE FOR ORDINARY INTERFACES. EVERY SCREEN DESERVES CHARACTER."
                </span>
                <span className="font-p5Mono text-[10px] text-red-400 font-bold ml-2 whitespace-nowrap">
                  — FERREL
                </span>
              </div>
            </div>
          )}

          {/* TAB 2: PERSONA 5 SOCIAL STATS WHEEL */}
          {activeTab === 'STATS' && (
            <div className="bg-black/90 border-2 border-red-600/40 p-4 sm:p-5 -skew-x-1 shadow-[8px_8px_0px_#000000] space-y-3">
              <div className="flex items-center justify-between">
                <span className="font-p5Sub text-xs text-zinc-300 tracking-wider">
                  // SOCIAL STATS ATTRIBUTES (ALL MAXED)
                </span>
                <span className="font-p5Mono text-[10px] text-red-400">CLICK STAT TO INSPECT</span>
              </div>

              {/* Interactive Stat Tiles */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {SOCIAL_STATS.map(stat => {
                  const isSelected = selectedStat.key === stat.key
                  return (
                    <button
                      key={stat.key}
                      type="button"
                      onClick={() => {
                        playSlash()
                        setSelectedStat(stat)
                      }}
                      onMouseEnter={playHover}
                      className={`
                        p-2.5 text-left border-2 transition-all -skew-x-2 flex items-center justify-between
                        ${isSelected
                          ? 'bg-red-950/50 border-p5-crimson shadow-[4px_4px_0px_#E60012] scale-102'
                          : 'bg-zinc-950/90 border-zinc-800 hover:border-zinc-600'
                        }
                      `}
                    >
                      <div className="flex items-center gap-2">
                        <div className="p-1 bg-black border border-zinc-700 text-p5-crimson">
                          {stat.icon}
                        </div>
                        <div>
                          <div className="font-p5Heading text-xs sm:text-sm text-white tracking-wider">
                            {stat.name}
                          </div>
                          <div className="font-p5Mono text-[9px] text-zinc-400">
                            {stat.rank}
                          </div>
                        </div>
                      </div>

                      {/* 5-Star Rating Indicators */}
                      <div className="flex items-center gap-0.5 text-p5-yellow text-xs">
                        {'★'.repeat(stat.level)}
                      </div>
                    </button>
                  )
                })}
              </div>

              {/* Inspector for Selected Social Stat */}
              <div className="bg-zinc-950 border border-red-600/50 p-3 -skew-x-1">
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-p5Heading text-xs sm:text-sm text-red-400">
                    {selectedStat.name} // {selectedStat.rank}
                  </span>
                </div>
                <p className="font-p5Body text-xs text-zinc-200 leading-relaxed">
                  {selectedStat.description}
                </p>
              </div>
            </div>
          )}

          {/* TAB 3: PALACE HEIST LOGBOOK */}
          {activeTab === 'HEISTS' && (
            <div className="bg-black/90 border-2 border-red-600/40 p-4 sm:p-5 -skew-x-1 shadow-[8px_8px_0px_#000000] space-y-2.5">
              <div className="font-p5Sub text-xs text-zinc-300 tracking-wider">
                // PHANTOM THIEF PALACE INFILTRATION LOG
              </div>

              <div className="space-y-2 font-p5Mono">
                {PALACE_MILESTONES.map((m, idx) => (
                  <div key={idx} className="bg-zinc-950 border border-zinc-800 p-2.5 -skew-x-2 space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="font-extrabold text-[11px] text-p5-crimson bg-p5-crimson/20 px-1.5 py-0.5 border border-p5-crimson/40">
                        {m.code}
                      </span>
                      <span className="text-[10px] text-emerald-400 font-bold">
                        {m.result}
                      </span>
                    </div>
                    <div className="font-p5Heading text-xs sm:text-sm text-white">
                      TARGET: {m.target}
                    </div>
                    <p className="font-p5Body text-xs text-zinc-300 leading-relaxed">
                      {m.details}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>

        {/* Right side (5 cols) intentionally transparent to display Shinjiro Aragaki */}
        <div className="hidden lg:block lg:col-span-5 pointer-events-none" />
      </div>
    </div>
  )
}
