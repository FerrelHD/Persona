import React, { useState } from 'react'
import { PageCutoutOverlay } from '@/components/common/PageCutoutOverlay'
import { usePersonaSFX } from '@/hooks/usePersonaSFX'
import { Sparkles, Code2, Brain, Gamepad2, Database, ShieldCheck } from 'lucide-react'

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
    <div className="fixed inset-0 z-30 flex flex-col p-6 sm:p-8 md:p-10 select-none overflow-hidden bg-gradient-to-r from-black/95 from-0% via-black/80 via-35% to-transparent to-55% animate-in fade-in duration-200 pt-36 sm:pt-40 md:pt-44">
      {/* Page Title Cutout Overlay */}
      <PageCutoutOverlay
        title="ABOUT THE DEV"
        characterRole="ENFORCER"
        characterName="SHINJIRO ARAGAKI"
        accentColor="red"
        onBack={onBack}
      />

      {/* Main Content Area: Focused on Left Side (Max 52% width) so Shinjiro is totally open */}
      <div className="flex-1 flex flex-col justify-center items-start mt-4 sm:mt-8 overflow-hidden z-20 w-full max-w-2xl lg:max-w-[52%] pl-2 sm:pl-6 md:pl-10">

        {/* Persona Confidant Status Card */}
        <div className="w-full bg-zinc-950/95 border-4 sm:border-[5px] border-black shadow-[10px_10px_0px_#E60012] -rotate-1 p-5 sm:p-6 space-y-4 relative">
          
          {/* Top Confidant Header Banner */}
          <div className="flex items-center justify-between pb-3 border-b-2 border-zinc-800">
            <div>
              <div className="flex items-center gap-2">
                <span className="font-p5Heading text-3xl sm:text-4xl text-white tracking-wider">
                  FERREL
                </span>
                <span className="bg-p5-crimson text-white font-p5Heading text-sm sm:text-base px-2 py-0.5 border border-white shadow-[2px_2px_0px_#000] -rotate-2">
                  THE ARCHITECT
                </span>
              </div>
              <div className="font-p5Mono text-xs text-zinc-400 mt-0.5">
                JAKARTA, ID • CREATIVE FULLSTACK ENGINEER
              </div>
            </div>

            {/* Arcana Tarot Badge */}
            <div className="bg-zinc-900 border-2 border-yellow-400 text-yellow-400 px-3 py-1 font-p5Heading text-xs sm:text-sm tracking-widest uppercase flex items-center gap-1.5 shadow-[3px_3px_0px_#000] rotate-2">
              <Sparkles className="size-3.5 text-yellow-400" />
              <span>THE FOOL // RANK MAX</span>
            </div>
          </div>

          {/* 3 Core Highlight Ribbons */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 font-p5Mono">
            <div className="bg-black/80 border border-zinc-800 p-2.5 space-y-1">
              <div className="flex items-center gap-1.5 text-cyan-400 font-p5Heading text-xs">
                <Code2 className="size-3.5" />
                <span>CORE WEB</span>
              </div>
              <p className="text-[11px] text-zinc-300 leading-tight">
                Enterprise reactivity, custom micro-animations & sub-second rendering.
              </p>
            </div>

            <div className="bg-black/80 border border-zinc-800 p-2.5 space-y-1">
              <div className="flex items-center gap-1.5 text-purple-400 font-p5Heading text-xs">
                <Brain className="size-3.5" />
                <span>AI & NLP</span>
              </div>
              <p className="text-[11px] text-zinc-300 leading-tight">
                Transformer fine-tuning (IndoBERT), sentiment systems & PyTorch.
              </p>
            </div>

            <div className="bg-black/80 border border-zinc-800 p-2.5 space-y-1">
              <div className="flex items-center gap-1.5 text-red-400 font-p5Heading text-xs">
                <Gamepad2 className="size-3.5" />
                <span>GRAPHICS</span>
              </div>
              <p className="text-[11px] text-zinc-300 leading-tight">
                Unity 3D engine, custom HLSL surface shaders & vehicle handling.
              </p>
            </div>
          </div>

          {/* Persona Parameter Stats Bars */}
          <div className="space-y-2 pt-1 border-t border-zinc-800">
            <div className="flex items-center justify-between font-p5Sub text-[10px] text-zinc-400 uppercase tracking-widest">
              <span>// PERSONA 5 ABILITY PARAMETERS</span>
              <span className="text-yellow-400 font-bold">ALL S-RANK</span>
            </div>

            <div className="space-y-1.5">
              {PARAMETER_STATS.map((stat, idx) => (
                <div
                  key={idx}
                  onClick={() => {
                    playSlash()
                    setSelectedStat(stat)
                  }}
                  onMouseEnter={playHover}
                  className="bg-black/60 hover:bg-black/90 p-2 border border-zinc-800 hover:border-p5-crimson transition-all cursor-pointer group"
                >
                  <div className="flex items-center justify-between text-xs font-p5Heading tracking-wider mb-1">
                    <span className="text-white group-hover:text-yellow-300 transition-colors">
                      {stat.name}
                    </span>
                    <span className="text-p5-crimson font-p5Mono text-[11px]">
                      {stat.rank} ({stat.percent})
                    </span>
                  </div>

                  {/* Progress bar */}
                  <div className="w-full h-2 bg-zinc-900 border border-zinc-700 overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-p5-crimson to-yellow-400 group-hover:brightness-110 transition-all duration-300"
                      style={{ width: stat.percent }}
                    />
                  </div>

                  <div className="text-[10px] font-p5Mono text-zinc-500 mt-1">
                    {stat.stack}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Core Philosophy Banner */}
          <div className="bg-black border-l-4 border-p5-crimson p-2.5 -skew-x-1 flex items-center justify-between">
            <span className="font-p5Heading text-xs sm:text-sm text-zinc-200 tracking-wide">
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
