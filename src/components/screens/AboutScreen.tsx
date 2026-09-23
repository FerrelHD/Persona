import React, { useState } from 'react'
import { PageCutoutOverlay } from '@/components/common/PageCutoutOverlay'
import { usePersonaSFX } from '@/hooks/usePersonaSFX'
import { Sparkles, Code2, Brain, Gamepad2 } from 'lucide-react'

interface AboutScreenProps {
  onBack: () => void
}

const PARAMETER_STATS = [
  { name: 'FRONTEND ARCHITECTURE', rank: 'RANK MAX', level: 98, percent: '98%', stack: 'TypeScript • React • Next.js • Vue 3' },
  { name: 'AI & DATA SCIENCE', rank: 'RANK MAX', level: 94, percent: '94%', stack: 'Python • IndoBERT • PyTorch • NLP' },
  { name: 'GAME & SHADER DEV', rank: 'RANK S', level: 90, percent: '90%', stack: 'Unity 3D • HLSL Shaders • C#' },
  { name: 'BACKEND & DEPLOYMENT', rank: 'RANK S', level: 89, percent: '89%', stack: 'Laravel • Node.js • REST APIs • Vercel' },
]

export const AboutScreen: React.FC<AboutScreenProps> = ({ onBack }) => {
  const { playHover, playSlash } = usePersonaSFX()
  const [selectedStat, setSelectedStat] = useState(PARAMETER_STATS[0])

  return (
    <div className="fixed inset-0 z-30 flex flex-col justify-between p-4 sm:p-6 md:p-8 select-none overflow-hidden bg-gradient-to-r from-black/95 from-0% via-black/80 via-35% to-transparent to-55% animate-in fade-in duration-200 pt-20 sm:pt-24 md:pt-26 pb-6">
      {/* Page Title Cutout Overlay */}
      <PageCutoutOverlay
        title="ABOUT THE DEV"
        characterRole="ENFORCER"
        characterName="SHINJIRO ARAGAKI"
        accentColor="red"
        onBack={onBack}
      />

      {/* Main Content Area: Centered vertically with comfortable margins */}
      <div className="flex-1 flex flex-col justify-center items-start my-auto z-20 w-full max-w-2xl lg:max-w-[50%] pl-2 sm:pl-6 md:pl-8">

        {/* Persona Confidant Status Card */}
        <div className="w-full bg-zinc-950/95 border-4 sm:border-[5px] border-black shadow-[8px_8px_0px_#E60012] -rotate-1 p-4 sm:p-5 space-y-3 relative">
          
          {/* Top Confidant Header Banner */}
          <div className="flex items-center justify-between pb-2.5 border-b-2 border-zinc-800">
            <div>
              <div className="flex items-center gap-2">
                <span className="font-p5Heading text-2xl sm:text-3xl text-white tracking-wider">
                  FERREL
                </span>
                <span className="bg-p5-crimson text-white font-p5Heading text-xs sm:text-sm px-2 py-0.5 border border-white shadow-[2px_2px_0px_#000] -rotate-2">
                  THE ARCHITECT
                </span>
              </div>
              <div className="font-p5Mono text-[11px] text-zinc-400 mt-0.5">
                JAKARTA, ID • CREATIVE FULLSTACK ENGINEER
              </div>
            </div>

            {/* Arcana Tarot Badge */}
            <div className="bg-zinc-900 border-2 border-yellow-400 text-yellow-400 px-2.5 py-0.5 font-p5Heading text-xs sm:text-sm tracking-widest uppercase flex items-center gap-1.5 shadow-[2px_2px_0px_#000] rotate-2">
              <Sparkles className="size-3 text-yellow-400" />
              <span>THE FOOL // RANK MAX</span>
            </div>
          </div>

          {/* 3 Core Highlight Ribbons */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-1.5 sm:gap-2 font-p5Mono">
            <div className="bg-black/80 border border-zinc-800 p-2 space-y-0.5">
              <div className="flex items-center gap-1 text-cyan-400 font-p5Heading text-xs">
                <Code2 className="size-3" />
                <span>CORE WEB</span>
              </div>
              <p className="text-[10px] text-zinc-300 leading-tight">
                Enterprise reactivity, animations & sub-second rendering.
              </p>
            </div>

            <div className="bg-black/80 border border-zinc-800 p-2 space-y-0.5">
              <div className="flex items-center gap-1 text-purple-400 font-p5Heading text-xs">
                <Brain className="size-3" />
                <span>AI & NLP</span>
              </div>
              <p className="text-[10px] text-zinc-300 leading-tight">
                Transformer fine-tuning (IndoBERT) & PyTorch.
              </p>
            </div>

            <div className="bg-black/80 border border-zinc-800 p-2 space-y-0.5">
              <div className="flex items-center gap-1 text-red-400 font-p5Heading text-xs">
                <Gamepad2 className="size-3" />
                <span>GRAPHICS</span>
              </div>
              <p className="text-[10px] text-zinc-300 leading-tight">
                Unity 3D engine, custom HLSL shaders & vehicle physics.
              </p>
            </div>
          </div>

          {/* Persona Parameter Stats Bars */}
          <div className="space-y-1.5 pt-1 border-t border-zinc-800">
            <div className="flex items-center justify-between font-p5Sub text-[9px] text-zinc-400 uppercase tracking-widest">
              <span>// PERSONA 5 ABILITY PARAMETERS</span>
              <span className="text-yellow-400 font-bold">ALL S-RANK</span>
            </div>

            <div className="space-y-1">
              {PARAMETER_STATS.map((stat, idx) => (
                <div
                  key={idx}
                  onClick={() => {
                    playSlash()
                    setSelectedStat(stat)
                  }}
                  onMouseEnter={playHover}
                  className="bg-black/60 hover:bg-black/90 p-1.5 px-2 border border-zinc-800 hover:border-p5-crimson transition-all cursor-pointer group"
                >
                  <div className="flex items-center justify-between text-xs font-p5Heading tracking-wider mb-0.5">
                    <span className="text-white text-[11px] group-hover:text-yellow-300 transition-colors">
                      {stat.name}
                    </span>
                    <span className="text-p5-crimson font-p5Mono text-[10px]">
                      {stat.rank} ({stat.percent})
                    </span>
                  </div>

                  {/* Progress bar */}
                  <div className="w-full h-1.5 bg-zinc-900 border border-zinc-700 overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-p5-crimson to-yellow-400 group-hover:brightness-110 transition-all duration-300"
                      style={{ width: stat.percent }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Core Philosophy Banner */}
          <div className="bg-black border-l-4 border-p5-crimson p-2 -skew-x-1 flex items-center justify-between">
            <span className="font-p5Heading text-xs text-zinc-200 tracking-wide">
              "NEVER SETTLE FOR ORDINARY INTERFACES. EVERY SCREEN DESERVES CHARACTER."
            </span>
            <span className="font-p5Mono text-[10px] text-p5-crimson font-bold ml-2 whitespace-nowrap">
              — FERREL
            </span>
          </div>

        </div>

      </div>
    </div>
  )
}
