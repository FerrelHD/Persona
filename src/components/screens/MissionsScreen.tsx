import React, { useState } from 'react'
import { MISSIONS_DATA, Mission } from '@/data/personaData'
import { Button } from '@/components/ui/button'
import { usePersonaSFX } from '@/hooks/usePersonaSFX'
import { ArrowLeft, ExternalLink, ShieldCheck } from 'lucide-react'

const GithubIcon: React.FC = () => (
  <svg className="size-4" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
  </svg>
)

interface MissionsScreenProps {
  onBack: () => void
}

export const MissionsScreen: React.FC<MissionsScreenProps> = ({ onBack }) => {
  const { playHover, playSlash, playBack } = usePersonaSFX()
  const [selectedMission, setSelectedMission] = useState<Mission>(MISSIONS_DATA[0])

  return (
    <div className="fixed inset-0 z-30 flex flex-col p-6 sm:p-8 md:p-10 select-none overflow-hidden bg-gradient-to-r from-black/90 via-black/60 to-transparent animate-in fade-in duration-200">
      {/* Top Header Bar */}
      <div className="flex items-center justify-between z-20 pb-4 border-b border-cyan-500/30">
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            onClick={() => {
              playBack()
              onBack()
            }}
            className="flex items-center gap-2 bg-black/80 hover:bg-cyan-500/20 text-cyan-400 hover:text-white border border-cyan-500/50 px-4 py-2 text-sm font-p5Mono transition-all duration-150"
          >
            <ArrowLeft className="size-4" />
            <span>[ESC] RETURN</span>
          </Button>

          <div>
            <div className="flex items-center gap-2">
              <span className="bg-cyan-500 text-black text-xs font-p5Mono font-extrabold px-2 py-0.5 tracking-wider">
                S.E.E.S. ARCHIVE
              </span>
              <span className="text-cyan-400 text-xs font-p5Mono tracking-widest hidden sm:inline">
                TARTARUS MISSIONS & DEPLOYMENTS
              </span>
            </div>
            <h1 className="font-p5Heading text-3xl sm:text-4xl text-white tracking-widest uppercase filter drop-shadow-[2px_2px_0px_#000000]">
              DEPLOYED MISSIONS
            </h1>
          </div>
        </div>

        <div className="hidden lg:flex items-center gap-2 bg-black/60 border border-cyan-500/30 px-3 py-1 font-p5Mono text-xs text-cyan-300">
          <span className="animate-pulse text-cyan-400">●</span> PROTAGONIST // MAKOTO YUKI
        </div>
      </div>

      {/* Main Content: Left-Aligned UI, Leaving Right Side Open for Makoto */}
      <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 gap-6 mt-4 overflow-hidden z-20">
        {/* Left Column: Mission Directory List */}
        <div className="lg:col-span-5 flex flex-col gap-2 overflow-y-auto pr-2 max-h-[calc(100vh-180px)]">
          <span className="font-p5Mono text-xs text-cyan-400/80 uppercase tracking-widest mb-1">
            // SELECT TARGET ({MISSIONS_DATA.length})
          </span>

          {MISSIONS_DATA.map((mission, idx) => {
            const isSelected = selectedMission.id === mission.id

            return (
              <div
                key={mission.id}
                onMouseEnter={() => playHover()}
                onClick={() => {
                  playSlash()
                  setSelectedMission(mission)
                }}
                className={`group cursor-pointer p-3 transition-all duration-150 border-l-4 -skew-x-2 ${
                  isSelected
                    ? 'bg-cyan-950/70 border-cyan-400 text-white translate-x-2 shadow-[0_0_15px_rgba(0,212,255,0.3)]'
                    : 'bg-black/60 hover:bg-black/80 border-zinc-700 hover:border-cyan-500/60 text-zinc-300'
                }`}
              >
                <div className="flex items-center justify-between text-xs font-p5Mono mb-1">
                  <span className={isSelected ? 'text-cyan-400 font-bold' : 'text-zinc-500'}>
                    MISSION #{String(idx + 1).padStart(2, '0')}
                  </span>
                  <span className="text-[10px] px-1.5 py-0.5 bg-black/70 border border-zinc-700 text-zinc-300">
                    {mission.status}
                  </span>
                </div>
                <div className="font-p5Heading text-lg tracking-wide uppercase group-hover:text-cyan-300 transition-colors">
                  {mission.title}
                </div>
                <div className="text-xs text-zinc-400 line-clamp-1 mt-0.5">
                  {mission.client} // {mission.role}
                </div>
              </div>
            )
          })}
        </div>

        {/* Middle Column: Selected Mission Detail Card */}
        <div className="lg:col-span-6 flex flex-col justify-between bg-black/75 backdrop-blur-md border border-cyan-500/40 p-6 -skew-x-1 shadow-[0_0_20px_rgba(0,0,0,0.8)] max-h-[calc(100vh-180px)] overflow-y-auto">
          <div className="space-y-4">
            <div className="flex items-start justify-between gap-4 border-b border-cyan-500/20 pb-3">
              <div>
                <span className="text-xs font-p5Mono text-cyan-400 uppercase tracking-widest">
                  CLIENT: {selectedMission.client}
                </span>
                <h2 className="font-p5Heading text-2xl sm:text-3xl text-white tracking-wide uppercase mt-1">
                  {selectedMission.title}
                </h2>
              </div>
              <span className="flex items-center gap-1.5 px-3 py-1 bg-cyan-500/20 border border-cyan-400 text-cyan-300 font-p5Mono text-xs font-bold">
                <ShieldCheck className="size-4 text-cyan-400" />
                VERIFIED
              </span>
            </div>

            <p className="font-p5Body text-sm sm:text-base text-zinc-200 leading-relaxed">
              {selectedMission.fullDossier || selectedMission.excerpt}
            </p>

            {/* Tech Stack Badges */}
            <div>
              <span className="text-xs font-p5Mono text-zinc-400 uppercase block mb-2">
                EQUIPPED PERSONA & TECH
              </span>
              <div className="flex flex-wrap gap-1.5">
                {selectedMission.tech.map(t => (
                  <span
                    key={t}
                    className="text-xs font-p5Mono bg-zinc-900 border border-cyan-500/30 text-cyan-300 px-2.5 py-1"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Action Links */}
          <div className="pt-6 border-t border-zinc-800 flex flex-wrap gap-3 mt-4">
            {selectedMission.liveUrl && (
              <a
                href={selectedMission.liveUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-cyan-500 hover:bg-cyan-400 text-black font-p5Mono font-extrabold text-sm tracking-wider uppercase transition-all duration-150 hover:scale-105 shadow-[0_0_15px_rgba(0,212,255,0.4)]"
              >
                <span>VISIT LIVE DEMO</span>
                <ExternalLink className="size-4" />
              </a>
            )}

            {selectedMission.githubUrl && (
              <a
                href={selectedMission.githubUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-black/80 hover:bg-zinc-800 text-white border border-zinc-700 hover:border-cyan-400 font-p5Mono text-sm tracking-wider uppercase transition-all duration-150 hover:scale-105"
              >
                <GithubIcon />
                <span>GITHUB REPO</span>
              </a>
            )}
          </div>
        </div>

        {/* Right side (1 col) intentionally transparent for Makoto wallpaper */}
        <div className="hidden lg:block lg:col-span-1 pointer-events-none" />
      </div>
    </div>
  )
}
