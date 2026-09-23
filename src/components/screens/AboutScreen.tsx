import React, { useState } from 'react'
import { PageCutoutOverlay } from '@/components/common/PageCutoutOverlay'
import { usePersonaSFX } from '@/hooks/usePersonaSFX'
import { 
  Sparkles, 
  Code2, 
  Brain, 
  Gamepad2, 
  Terminal, 
  ShieldCheck, 
  Flame, 
  Layers, 
  Cpu, 
  FolderLock, 
  Fingerprint,
  Zap
} from 'lucide-react'

interface AboutScreenProps {
  onBack: () => void
}

type TabId = 'dossier' | 'parameters' | 'arsenal'

interface TabOption {
  id: TabId
  number: string
  label: string
}

const TABS: TabOption[] = [
  { id: 'dossier',    number: '01', label: 'DOSSIER' },
  { id: 'parameters', number: '02', label: 'PARAMETERS' },
  { id: 'arsenal',    number: '03', label: 'ARSENAL' },
]

const PARAMETERS = [
  { 
    name: 'FRONTEND ARCHITECTURE', 
    category: 'PROFICIENCY', 
    rank: 'RANK MAX', 
    level: 98, 
    badgeColor: 'bg-p5-crimson text-white',
    desc: 'Ultra-responsive reactive architectures, fluid 60 FPS shader-level web animations & design systems.',
    skills: ['TypeScript', 'React 19', 'Next.js 15', 'Tailwind', 'Three.js']
  },
  { 
    name: 'AI & DATA SCIENCE', 
    category: 'KNOWLEDGE', 
    rank: 'RANK MAX', 
    level: 94, 
    badgeColor: 'bg-purple-600 text-white',
    desc: 'IndoBERT fine-tuning, natural language processing pipelines & PyTorch neural architectures.',
    skills: ['Python', 'IndoBERT', 'PyTorch', 'HuggingFace', 'NLP']
  },
  { 
    name: 'GAME & SHADER DEV', 
    category: 'GUTS', 
    rank: 'RANK S', 
    level: 90, 
    badgeColor: 'bg-yellow-400 text-black',
    desc: 'Interactive 3D simulation in Unity, custom HLSL surface shaders & vehicle physics systems.',
    skills: ['Unity 3D', 'HLSL Shaders', 'C#', 'Vector Math', 'GLSL']
  },
  { 
    name: 'BACKEND & DEPLOYMENT', 
    category: 'ENDURANCE', 
    rank: 'RANK S', 
    level: 89, 
    badgeColor: 'bg-emerald-500 text-black',
    desc: 'Scalable RESTful API infrastructure, serverless deployments, database tuning & CI/CD pipelines.',
    skills: ['PHP Laravel', 'Node.js', 'MySQL', 'Vercel', 'Git CI/CD']
  },
]

const ARSENAL_CARDS = [
  {
    type: 'PHYS',
    category: 'CORE WEB & UI',
    color: 'border-cyan-400 text-cyan-400',
    bgBadge: 'bg-cyan-400 text-black',
    items: ['TypeScript', 'React 19', 'Next.js 15', 'Tailwind CSS', 'Vite', 'Framer Motion'],
    note: 'Extreme reactivity, sub-second load times & tactile Persona-grade micro-interactions.'
  },
  {
    type: 'GUN',
    category: 'BACKEND & CLOUD',
    color: 'border-emerald-400 text-emerald-400',
    bgBadge: 'bg-emerald-400 text-black',
    items: ['PHP Laravel 11', 'Node.js', 'REST APIs', 'MySQL / PostgreSQL', 'Serverless', 'Vercel'],
    note: 'Robust transactional backends, auth pipelines & battle-tested production stability.'
  },
  {
    type: 'PSI',
    category: 'AI & INTELLIGENCE',
    color: 'border-purple-400 text-purple-400',
    bgBadge: 'bg-purple-400 text-white',
    items: ['Python 3', 'PyTorch', 'IndoBERT Model', 'Transformers', 'NLP Preprocessing', 'Scikit-Learn'],
    note: 'Fine-tuned Indonesian language transformers & custom predictive data pipelines.'
  },
  {
    type: 'NUKE',
    category: 'SIMULATION & 3D',
    color: 'border-p5-crimson text-p5-crimson',
    bgBadge: 'bg-p5-crimson text-white',
    items: ['Unity 3D', 'C# Scripting', 'HLSL / GLSL Shaders', 'Compute Shaders', 'Physics Engines'],
    note: 'Custom graphical rendering passes, real-time lighting & interactive game mechanics.'
  },
]

export const AboutScreen: React.FC<AboutScreenProps> = ({ onBack }) => {
  const { playHover, playSlash } = usePersonaSFX()
  const [activeTab, setActiveTab] = useState<TabId>('dossier')
  const [selectedParamIndex, setSelectedParamIndex] = useState(0)

  const handleTabChange = (tabId: TabId) => {
    playSlash()
    setActiveTab(tabId)
  }

  return (
    <div className="fixed inset-0 z-30 flex flex-col justify-between p-4 sm:p-6 md:p-8 select-none overflow-hidden bg-gradient-to-r from-black/95 from-0% via-black/80 via-40% to-transparent to-60% animate-in fade-in duration-200 pt-20 sm:pt-24 md:pt-26 pb-6">
      {/* Page Title Cutout Overlay with Unified Controller Legend */}
      <PageCutoutOverlay
        title="ABOUT THE DEV"
        characterRole="ENFORCER"
        characterName="SHINJIRO ARAGAKI"
        accentColor="red"
        onBack={onBack}
        extraShortcuts={
          <button
            onClick={() => {
              playSlash()
              const nextIdx = (TABS.findIndex(t => t.id === activeTab) + 1) % TABS.length
              setActiveTab(TABS[nextIdx].id)
            }}
            className="flex items-center gap-1.5 hover:text-white group cursor-pointer transition-colors"
            title="Cycle Dossier Tab"
          >
            <span className="size-5 rounded-full border-2 border-pink-400 text-pink-400 font-bold flex items-center justify-center text-[11px] group-hover:bg-pink-400 group-hover:text-black transition-colors shadow-[0_0_6px_rgba(244,114,182,0.4)]">
              □
            </span>
            <span className="font-p5Heading text-sm tracking-wider uppercase">SWITCH TAB</span>
          </button>
        }
      />

      {/* Main Content Area: Left-aligned, balanced against Shinjiro Aragaki on the right */}
      <div className="flex-1 flex flex-col justify-center items-start my-auto z-20 w-full max-w-2xl lg:max-w-[52%] pl-2 sm:pl-6 md:pl-8">

        {/* ── TOP ASYMMETRICAL TABS (Concept 3: Multi-Tab Confidant Switcher) ── */}
        <div className="flex items-center gap-1 sm:gap-2 mb-[-3px] z-30 ml-2 sm:ml-4">
          {TABS.map((tab) => {
            const isActive = activeTab === tab.id
            return (
              <button
                key={tab.id}
                onClick={() => handleTabChange(tab.id)}
                onMouseEnter={playHover}
                className={`
                  relative px-3 sm:px-4 py-1.5 sm:py-2 font-p5Heading text-xs sm:text-sm tracking-wider uppercase -skew-x-12 cursor-pointer transition-all duration-150 border-t-2 border-x-2 border-black
                  ${isActive 
                    ? 'bg-p5-crimson text-white shadow-[3px_-3px_0px_#000] -translate-y-1 scale-105 z-10' 
                    : 'bg-zinc-900/95 text-zinc-400 hover:text-white hover:bg-zinc-800'
                  }
                `}
              >
                <div className="flex items-center gap-1.5 skew-x-12">
                  <span className={`text-[10px] font-p5Mono px-1 ${isActive ? 'bg-black text-p5-yellow' : 'text-zinc-500'}`}>
                    {tab.number}
                  </span>
                  <span>{tab.label}</span>
                </div>
              </button>
            )
          })}
        </div>

        {/* ── MAIN DOSSIER CARD BODY (Concept 1: Phantom Thief Confidential File) ── */}
        <div className="w-full bg-zinc-950/95 border-4 sm:border-[5px] border-black shadow-[8px_8px_0px_#E60012] -rotate-1 p-4 sm:p-5 sm:pb-6 relative overflow-hidden">
          
          {/* Authentic Persona 5 Halftone Background Watermark */}
          <div 
            className="absolute inset-0 pointer-events-none opacity-[0.04] bg-[radial-gradient(#FFFFFF_1px,transparent_1px)] [background-size:12px_12px]" 
            aria-hidden="true" 
          />

          {/* Authentic Top-Right Slanted Red Stamp: [CONFIDENTIAL // S-RANK THIEF] */}
          <div className="absolute -top-1 -right-2 sm:right-3 pointer-events-none z-20 rotate-12 select-none">
            <div className="border-2 sm:border-[2.5px] border-p5-crimson/90 bg-black/60 px-3 py-1 font-p5Heading text-[10px] sm:text-xs text-p5-crimson tracking-widest uppercase shadow-[3px_3px_0px_rgba(230,0,18,0.4)]">
              CONFIDENTIAL // METAVERSE S-RANK
            </div>
          </div>

          {/* Card Header Strip: Code Name, Arcana & Serial Barcode */}
          <div className="flex items-start justify-between pb-3 mb-3 border-b-2 border-zinc-800 relative z-10">
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <span className="font-p5Heading text-2xl sm:text-3xl md:text-4xl text-white tracking-wider filter drop-shadow-[2px_2px_0px_#000]">
                  FERREL
                </span>
                <span className="bg-p5-crimson text-white font-p5Heading text-xs sm:text-sm px-2.5 py-0.5 border border-white shadow-[2px_2px_0px_#000] -rotate-2">
                  THE ARCHITECT
                </span>
              </div>
              <div className="font-p5Mono text-[10px] sm:text-[11px] text-zinc-400 mt-1 flex items-center gap-2">
                <span>JAKARTA, ID // CREATIVE FULLSTACK & AI ARCHITECT</span>
                <span className="text-zinc-600 hidden sm:inline">•</span>
                <span className="text-yellow-400/90 hidden sm:inline">SERIAL: 2026-FRL-P5</span>
              </div>
            </div>

            {/* Tarot Card Miniature Badge: THE FOOL // RANK MAX */}
            <div className="hidden sm:flex flex-col items-end shrink-0 pr-2">
              <div className="bg-zinc-900 border-2 border-yellow-400 text-yellow-400 px-2.5 py-1 font-p5Heading text-xs tracking-widest uppercase flex items-center gap-1.5 shadow-[2px_2px_0px_#000] rotate-1">
                <Sparkles className="size-3 text-yellow-400 animate-spin" />
                <span>THE FOOL // RANK MAX</span>
              </div>
              <span className="text-[9px] font-p5Mono text-zinc-500 mt-0.5 tracking-tighter">
                ARCANA 0 // CONFIDANT PROTOCOL
              </span>
            </div>
          </div>

          {/* ── TAB 1 CONTENT: [ 01 // DOSSIER ] ── */}
          {activeTab === 'dossier' && (
            <div className="space-y-3 animate-in fade-in slide-in-from-bottom-2 duration-150 relative z-10">
              {/* Specialization Triad */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 font-p5Mono">
                <div className="bg-black/90 border border-zinc-800 hover:border-cyan-400 p-2.5 space-y-1 transition-colors group">
                  <div className="flex items-center gap-1.5 text-cyan-400 font-p5Heading text-xs">
                    <Code2 className="size-3.5 group-hover:scale-110 transition-transform" />
                    <span>WEB ARCHITECTURE</span>
                  </div>
                  <p className="text-[10px] text-zinc-300 leading-tight">
                    Reactive web design, design systems, sub-second renders & Persona 5 game-grade frontends.
                  </p>
                </div>

                <div className="bg-black/90 border border-zinc-800 hover:border-purple-400 p-2.5 space-y-1 transition-colors group">
                  <div className="flex items-center gap-1.5 text-purple-400 font-p5Heading text-xs">
                    <Brain className="size-3.5 group-hover:scale-110 transition-transform" />
                    <span>AI & NLP PIPELINES</span>
                  </div>
                  <p className="text-[10px] text-zinc-300 leading-tight">
                    IndoBERT fine-tuning, contextual embeddings, sentiment engines & PyTorch model optimization.
                  </p>
                </div>

                <div className="bg-black/90 border border-zinc-800 hover:border-red-400 p-2.5 space-y-1 transition-colors group">
                  <div className="flex items-center gap-1.5 text-red-400 font-p5Heading text-xs">
                    <Gamepad2 className="size-3.5 group-hover:scale-110 transition-transform" />
                    <span>SIMULATION & 3D</span>
                  </div>
                  <p className="text-[10px] text-zinc-300 leading-tight">
                    Unity engine vehicle physics, procedural generation & custom mathematical HLSL shaders.
                  </p>
                </div>
              </div>

              {/* Bio Summary / Confidential Intelligence Brief */}
              <div className="bg-zinc-900/80 border border-zinc-800 p-3 space-y-1.5 font-p5Body text-xs leading-relaxed text-zinc-300">
                <div className="flex items-center justify-between text-[10px] font-p5Mono text-zinc-400 uppercase tracking-wider pb-1 border-b border-zinc-800">
                  <span className="flex items-center gap-1 text-p5-yellow">
                    <Fingerprint className="size-3" />
                    <span>METAVERSE OPERATIVE PROFILE</span>
                  </span>
                  <span>STATUS: ACTIVE // CODENAME CONFIRMED</span>
                </div>
                <p>
                  Fullstack architect and creative technologist who merges high-precision software engineering with authentic comic-book aesthetics. Driven by building web apps that feel tactile, responsive, and completely alive.
                </p>
              </div>

              {/* Philosophy Banner Quote */}
              <div className="bg-black border-l-4 border-p5-crimson p-2.5 -skew-x-1 flex items-center justify-between shadow-[2px_2px_0px_#000]">
                <span className="font-p5Heading text-xs sm:text-sm text-white tracking-wide">
                  "NEVER SETTLE FOR ORDINARY INTERFACES. EVERY SCREEN DESERVES CHARACTER."
                </span>
                <span className="font-p5Mono text-[10px] text-p5-crimson font-bold ml-2 shrink-0">
                  // FERREL
                </span>
              </div>
            </div>
          )}

          {/* ── TAB 2 CONTENT: [ 02 // PARAMETERS ] ── */}
          {activeTab === 'parameters' && (
            <div className="space-y-2.5 animate-in fade-in slide-in-from-bottom-2 duration-150 relative z-10">
              <div className="flex items-center justify-between font-p5Sub text-[9px] text-zinc-400 uppercase tracking-widest pb-1 border-b border-zinc-800">
                <span className="flex items-center gap-1.5 text-p5-yellow">
                  <Zap className="size-3" />
                  <span>PERSONA 5 ABILITY MATRIX</span>
                </span>
                <span className="text-p5-crimson font-bold">ALL S-RANK // APEX MASTER</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {PARAMETERS.map((param, idx) => {
                  const isSelected = selectedParamIndex === idx
                  return (
                    <div
                      key={idx}
                      onClick={() => {
                        playSlash()
                        setSelectedParamIndex(idx)
                      }}
                      onMouseEnter={playHover}
                      className={`
                        p-2.5 border transition-all cursor-pointer group relative
                        ${isSelected 
                          ? 'bg-black border-p5-crimson shadow-[4px_4px_0px_#000] scale-[1.02]' 
                          : 'bg-black/60 border-zinc-800 hover:border-zinc-600'
                        }
                      `}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <div className="flex items-center gap-1.5">
                          <span className="text-[9px] font-p5Mono px-1 bg-zinc-800 text-yellow-400 border border-zinc-700">
                            {param.category}
                          </span>
                          <span className="text-white font-p5Heading text-xs tracking-wider group-hover:text-yellow-300 transition-colors">
                            {param.name}
                          </span>
                        </div>
                        <span className={`text-[10px] font-p5Mono font-bold px-1.5 py-0.2 ${param.badgeColor}`}>
                          {param.rank}
                        </span>
                      </div>

                      {/* Stat Gauge Bar */}
                      <div className="w-full h-2 bg-zinc-900 border border-zinc-700 overflow-hidden my-1">
                        <div
                          className="h-full bg-gradient-to-r from-p5-crimson via-red-500 to-yellow-400 transition-all duration-500"
                          style={{ width: `${param.level}%` }}
                        />
                      </div>

                      <p className="text-[10px] text-zinc-300 font-p5Body leading-tight mt-1 line-clamp-1">
                        {param.desc}
                      </p>

                      <div className="flex items-center gap-1 mt-1.5 flex-wrap">
                        {param.skills.map((sk, sIdx) => (
                          <span key={sIdx} className="text-[8px] font-p5Mono bg-zinc-900 text-zinc-400 px-1 border border-zinc-800">
                            {sk}
                          </span>
                        ))}
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          )}

          {/* ── TAB 3 CONTENT: [ 03 // ARSENAL ] ── */}
          {activeTab === 'arsenal' && (
            <div className="space-y-2.5 animate-in fade-in slide-in-from-bottom-2 duration-150 relative z-10">
              <div className="flex items-center justify-between font-p5Sub text-[9px] text-zinc-400 uppercase tracking-widest pb-1 border-b border-zinc-800">
                <span className="flex items-center gap-1.5 text-cyan-400">
                  <Terminal className="size-3" />
                  <span>PHANTOM ARSENAL // SKILL CARDS</span>
                </span>
                <span className="text-p5-yellow font-bold">PRODUCTION VERIFIED</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {ARSENAL_CARDS.map((card, idx) => (
                  <div
                    key={idx}
                    onMouseEnter={playHover}
                    className={`p-2.5 bg-black/90 border-2 ${card.color} shadow-[3px_3px_0px_#000] space-y-1.5 group hover:scale-[1.01] transition-transform`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1.5">
                        <span className={`text-[9px] font-p5Heading font-bold px-1.5 py-0.5 ${card.bgBadge}`}>
                          [{card.type}]
                        </span>
                        <span className="font-p5Heading text-xs tracking-wider text-white">
                          {card.category}
                        </span>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-1 pt-0.5">
                      {card.items.map((tech, tIdx) => (
                        <span
                          key={tIdx}
                          className="bg-zinc-900 text-zinc-200 text-[10px] font-p5Mono px-1.5 py-0.5 border border-zinc-800 group-hover:border-zinc-600 transition-colors"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>

                    <p className="text-[9px] font-p5Body text-zinc-400 pt-0.5 leading-tight">
                      {card.note}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Bottom Barcode Footer of the Dossier */}
          <div className="mt-3 pt-2 border-t border-zinc-900 flex items-center justify-between text-[9px] font-p5Mono text-zinc-500">
            <span className="tracking-widest">PHANTOM HEIST PROTOCOL // ARCHIVE ID: 004-ARAGAKI</span>
            <span className="text-zinc-600 tracking-tighter">||| | ||||| || |||| ||| |||| |</span>
          </div>

        </div>

      </div>
    </div>
  )
}
