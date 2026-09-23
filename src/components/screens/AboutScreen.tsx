import React from 'react'
import { PageCutoutOverlay } from '@/components/common/PageCutoutOverlay'
import { usePersonaSFX } from '@/hooks/usePersonaSFX'
import { BookOpen, Compass, Heart, Shield, Sparkles } from 'lucide-react'

interface AboutScreenProps {
  onBack: () => void
}

const SOCIAL_STATS = [
  { name: 'KNOWLEDGE', level: 'MAX', desc: 'Full-Stack Architecture & Modern Web Stack', icon: BookOpen, color: 'text-blue-400' },
  { name: 'GUTS', level: 'LV. 5', desc: 'Tackling Complex Graphics & Machine Learning', icon: Shield, color: 'text-red-400' },
  { name: 'PROFICIENCY', level: 'MAX', desc: 'Pixel-Perfect UI, Snappy Audio & Performance', icon: Compass, color: 'text-yellow-400' },
  { name: 'KINDNESS', level: 'LV. 5', desc: 'Empathy for UX, Open Source, Team Synergy', icon: Heart, color: 'text-pink-400' },
  { name: 'CHARM', level: 'MAX', desc: 'Audacious Persona Aesthetics & High-Energy Design', icon: Sparkles, color: 'text-purple-400' },
]

export const AboutScreen: React.FC<AboutScreenProps> = ({ onBack }) => {
  const { playHover } = usePersonaSFX()

  return (
    <div className="fixed inset-0 z-30 flex flex-col p-6 sm:p-8 md:p-10 select-none overflow-hidden bg-gradient-to-l from-black/90 via-black/60 to-transparent animate-in fade-in duration-200 pt-32 sm:pt-36 md:pt-40">
      {/* Page Cutout Overlay */}
      <PageCutoutOverlay
        title="ABOUT THE DEV"
        characterRole="ARCHER"
        characterName="YUKARI TAKEBA"
        accentColor="pink"
        onBack={onBack}
      />

            {/* Main Content: Left side is clear for Yukari, Right side contains the UI */}
      <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 gap-6 mt-10 sm:mt-12 md:mt-14 overflow-hidden z-20">
        {/* Left side (5 cols) intentionally transparent to display Yukari */}
        <div className="hidden lg:block lg:col-span-5 pointer-events-none" />

        {/* Right side (7 cols) contains the dossier cards */}
        <div className="lg:col-span-7 flex flex-col justify-between max-h-[calc(100vh-180px)] overflow-y-auto pl-2 pr-1 space-y-4">
          {/* Bio Dossier Card */}
          <div className="bg-black/75 backdrop-blur-md border border-pink-500/30 p-5 -skew-x-1 shadow-[0_0_20px_rgba(0,0,0,0.8)]">
            <div className="flex items-center justify-between border-b border-zinc-800 pb-2 mb-3">
              <span className="text-xs font-p5Mono text-pink-400 tracking-wider">
                CODE NAME: FERREL // SOFTWARE ENGINEER & CREATIVE DEV
              </span>
              <span className="text-xs font-p5Mono px-2 py-0.5 bg-pink-600 text-white font-bold">
                RANK MAX
              </span>
            </div>
            <p className="font-p5Body text-sm sm:text-base text-zinc-200 leading-relaxed">
              Software Engineer and Creative Web Developer passionate about building high-octane digital experiences.
              Blending cutting-edge web architecture (TypeScript, React, Next.js, Vue), Machine Learning (NLP, PyTorch, IndoBERT),
              and Interactive Game Dev (Unity 3D, HLSL shaders) into seamless, memorable software.
            </p>
          </div>

          {/* Social Stats Parameters */}
          <div className="bg-black/75 backdrop-blur-md border border-zinc-800 p-5 -skew-x-1">
            <span className="text-xs font-p5Mono text-zinc-400 uppercase tracking-widest block mb-3">
              // SOCIAL STATS & CORE ATTRIBUTES
            </span>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {SOCIAL_STATS.map((stat) => {
                const Icon = stat.icon
                return (
                  <div
                    key={stat.name}
                    onMouseEnter={() => playHover()}
                    className="p-2.5 bg-zinc-950/80 border border-zinc-800 hover:border-pink-500/50 transition-all flex items-start gap-2.5"
                  >
                    <Icon className={`size-4 mt-0.5 ${stat.color}`} />
                    <div className="flex-1">
                      <div className="flex items-center justify-between text-xs font-p5Mono">
                        <span className="text-white font-bold">{stat.name}</span>
                        <span className="text-pink-400 font-extrabold">{stat.level}</span>
                      </div>
                      <p className="text-[11px] text-zinc-400 mt-0.5 line-clamp-1">
                        {stat.desc}
                      </p>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Philosophy Card */}
          <div className="bg-pink-950/30 border border-pink-500/40 p-4 -skew-x-1">
            <div className="font-p5Heading text-sm text-pink-300 uppercase tracking-wider mb-1">
              "NEVER SETTLE FOR ORDINARY INTERFACES."
            </div>
            <p className="text-xs font-p5Mono text-zinc-300 leading-relaxed">
              Every application should possess personality, crisp responsiveness, and uncompromising visual polish.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

