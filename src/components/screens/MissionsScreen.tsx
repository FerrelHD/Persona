import React, { useState, useEffect } from 'react'
import { MISSIONS_DATA, Mission } from '@/data/personaData'
import { Button } from '@/components/ui/button'
import { usePersonaSFX } from '@/hooks/usePersonaSFX'
import { ArrowLeft, ChevronLeft, ChevronRight, ExternalLink, Globe, Cpu, Flame, Database, Code, ShieldCheck, ShoppingCart, Leaf } from 'lucide-react'

const GithubIcon: React.FC = () => (
  <svg className="size-4" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
  </svg>
)

// Decorative 5-point star SVG
const StarIcon: React.FC<{ className?: string; fill?: string }> = ({ className = 'size-6', fill = '#E60012' }) => (
  <svg viewBox="0 0 24 24" className={className} fill={fill}>
    <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26" />
  </svg>
)

// Project icon helper
const getProjectIcon = (category: string) => {
  switch (category) {
    case 'web': return <Globe className="size-16 text-cyan-400" />
    case 'ai': return <Cpu className="size-16 text-purple-400" />
    case 'game': return <Flame className="size-16 text-red-500" />
    case 'ecommerce': return <ShoppingCart className="size-16 text-emerald-400" />
    default: return <Code className="size-16 text-white" />
  }
}

interface MissionsScreenProps {
  onBack: () => void
}

export const MissionsScreen: React.FC<MissionsScreenProps> = ({ onBack }) => {
  const { playHover, playSlash, playBack } = usePersonaSFX()
  const [currentIndex, setCurrentIndex] = useState(0)
  const currentMission: Mission = MISSIONS_DATA[currentIndex]

  // Keyboard navigation support: Left / Right arrows
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') {
        e.preventDefault()
        playHover()
        setCurrentIndex(prev => (prev + 1) % MISSIONS_DATA.length)
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault()
        playHover()
        setCurrentIndex(prev => (prev - 1 + MISSIONS_DATA.length) % MISSIONS_DATA.length)
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [playHover])

  // Extract a clean display name for the ransom note tiles
  const titleDisplay = currentMission.title.split('//')[0].trim().toUpperCase()
  const titleLetters = titleDisplay.split('').slice(0, 16) // Max 16 characters for neat fit

  return (
    <div className="fixed inset-0 z-30 flex flex-col justify-between p-6 sm:p-8 md:p-10 select-none overflow-hidden bg-gradient-to-r from-black/85 via-black/45 to-transparent animate-in fade-in duration-200">
      {/* Top Header Bar */}
      <div className="flex items-center justify-between z-20 pb-3 border-b border-cyan-500/30">
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
                TARTARUS MISSIONS & HEISTS
              </span>
            </div>
            <h1 className="font-p5Heading text-2xl sm:text-3xl text-white tracking-widest uppercase filter drop-shadow-[2px_2px_0px_#000000]">
              DEPLOYED MISSIONS
            </h1>
          </div>
        </div>

        <div className="hidden lg:flex items-center gap-2 bg-black/60 border border-cyan-500/30 px-3 py-1 font-p5Mono text-xs text-cyan-300">
          <span className="animate-pulse text-cyan-400">●</span> PROTAGONIST // MAKOTO YUKI
        </div>
      </div>

      {/* Main Content Area: Styled after the reference comic profile card */}
      <div className="flex-1 flex flex-col justify-center my-auto z-20 w-full max-w-4xl lg:max-w-[58%]">
        {/* 1. Ransom Note Project Title (Top Right aligned with card) */}
        <div className="flex items-center gap-1 sm:gap-1.5 flex-wrap ml-auto mb-3 pr-2">
          {titleLetters.map((char, idx) => {
            if (char === ' ') {
              return <span key={idx} className="w-2 sm:w-3" />
            }
            const isRed = idx === 0 || char === 'O' || char === 'I'
            const rotation = idx % 3 === 0 ? '-rotate-3' : idx % 3 === 1 ? 'rotate-2' : '-rotate-1'

            return (
              <span
                key={idx}
                className={`inline-flex items-center justify-center min-w-[28px] sm:min-w-[34px] md:min-w-[38px] h-[40px] sm:h-[48px] md:h-[54px] px-1.5 font-p5Heading text-2xl sm:text-3xl md:text-4xl uppercase border-2 sm:border-[3px] border-black shadow-[3px_3px_0px_#000000] ${
                  isRed
                    ? 'bg-p5-crimson text-white font-extrabold scale-105'
                    : 'bg-white text-black'
                } ${rotation} transition-transform hover:scale-125`}
              >
                {char}
              </span>
            )
          })}
        </div>

        {/* 2. Main Row: Left Polaroid Frame + Right White Card */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-5 items-start">
          {/* Left Column: Photo / Preview Polaroid Box */}
          <div className="md:col-span-4 flex flex-col items-center">
            {/* Angled Polaroid Box */}
            <div className="relative w-44 sm:w-52 md:w-full aspect-square bg-zinc-950 border-[5px] border-black shadow-[7px_7px_0px_#000000] -rotate-3 p-3 flex flex-col items-center justify-center overflow-hidden group">
              {/* Halftone / Grid Pattern Background */}
              <div 
                className="absolute inset-0 opacity-20 pointer-events-none"
                style={{
                  backgroundImage: 'radial-gradient(#FFFFFF 1.5px, transparent 1.5px)',
                  backgroundSize: '10px 10px'
                }}
              />

              {/* Large Icon / Graphic Preview */}
              <div className="relative z-10 p-4 rounded-lg bg-black/40 border border-zinc-800 transition-transform duration-300 group-hover:scale-110">
                {getProjectIcon(currentMission.category)}
              </div>

              {/* Category Ribbon */}
              <div className="relative z-10 mt-3 font-p5Mono text-[11px] uppercase tracking-widest px-2.5 py-0.5 bg-black text-cyan-400 border border-cyan-500/50">
                {currentMission.category.toUpperCase()} // HEIST
              </div>
            </div>

            {/* Comic Speech Bubble below photo */}
            <div className="relative mt-3 self-center -rotate-2">
              <div className="bg-white text-black border-2 border-black px-4 py-1 font-p5Heading text-xs sm:text-sm font-bold shadow-[3px_3px_0px_#000000] flex items-center gap-1.5">
                <span className="size-2 rounded-full bg-p5-crimson animate-ping" />
                <span>MISSION #{String(currentIndex + 1).padStart(2, '0')}</span>
              </div>
              {/* Speech bubble pointer triangle */}
              <div className="w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-t-[8px] border-t-black ml-4" />
            </div>
          </div>

          {/* Right Column: Angled White Card with Stars */}
          <div className="md:col-span-8 relative">
            {/* Persona Stars: Top-Left Edge */}
            <div className="absolute -left-4 -top-3 z-20 flex items-center -space-x-1 pointer-events-none">
              <StarIcon className="size-7 sm:size-8 -rotate-12 filter drop-shadow-[2px_2px_0px_#000000]" fill="#000000" />
              <StarIcon className="size-6 sm:size-7 rotate-12 filter drop-shadow-[2px_2px_0px_#000000]" fill="#E60012" />
            </div>

            {/* Main White Content Card */}
            <div className="relative bg-white text-black border-[5px] border-black shadow-[8px_8px_0px_#000000] p-6 sm:p-7 -skew-x-2 -rotate-1">
              {/* Client Tag */}
              <div className="font-p5Mono text-xs text-zinc-600 uppercase tracking-wider mb-1 flex items-center justify-between">
                <span>CLIENT: {currentMission.client}</span>
                <span className="text-[10px] font-bold px-2 py-0.5 bg-black text-white">
                  {currentMission.role}
                </span>
              </div>

              {/* Title / Heading */}
              <h3 className="font-p5Heading text-2xl sm:text-3xl text-black uppercase tracking-wide leading-tight mb-2">
                About this mission...
              </h3>

              {/* Project Description */}
              <p className="font-p5Body text-xs sm:text-sm text-zinc-800 leading-relaxed mb-4">
                {currentMission.fullDossier || currentMission.excerpt}
              </p>

              {/* Tech Stack Badges */}
              <div className="mb-5">
                <span className="font-p5Mono text-[10px] text-zinc-500 uppercase tracking-widest block mb-1.5">
                  EQUIPPED TECH & PERSONA:
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {currentMission.tech.map((t) => (
                    <span
                      key={t}
                      className="font-p5Mono text-xs bg-black text-white px-2.5 py-0.5 font-bold shadow-[2px_2px_0px_#888888]"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-3 pt-3 border-t-2 border-black">
                {currentMission.liveUrl && (
                  <a
                    href={currentMission.liveUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 px-5 py-2.5 bg-p5-crimson hover:bg-red-700 text-white font-p5Mono font-extrabold text-xs sm:text-sm tracking-wider uppercase transition-all duration-150 shadow-[3px_3px_0px_#000000] hover:translate-x-1"
                  >
                    <span>VISIT LIVE DEMO</span>
                    <ExternalLink className="size-4" />
                  </a>
                )}

                {currentMission.githubUrl && (
                  <a
                    href={currentMission.githubUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 px-5 py-2.5 bg-black hover:bg-zinc-800 text-white font-p5Mono font-extrabold text-xs sm:text-sm tracking-wider uppercase transition-all duration-150 shadow-[3px_3px_0px_#000000] hover:translate-x-1"
                  >
                    <GithubIcon />
                    <span>GITHUB REPO</span>
                  </a>
                )}
              </div>
            </div>

            {/* Persona Stars: Bottom-Right Edge */}
            <div className="absolute -right-4 -bottom-4 z-20 flex items-center -space-x-1 pointer-events-none">
              <StarIcon className="size-6 sm:size-7 -rotate-6 filter drop-shadow-[2px_2px_0px_#000000]" fill="#000000" />
              <StarIcon className="size-9 sm:size-10 rotate-12 filter drop-shadow-[3px_3px_0px_#000000]" fill="#E60012" />
            </div>
          </div>
        </div>

        {/* 3. Bottom Mission Navigation Bar */}
        <div className="flex items-center justify-between mt-4 px-2">
          {/* Previous Button */}
          <button
            type="button"
            onClick={() => {
              playHover()
              setCurrentIndex(prev => (prev - 1 + MISSIONS_DATA.length) % MISSIONS_DATA.length)
            }}
            className="flex items-center gap-1.5 font-p5Mono text-xs bg-black/80 hover:bg-p5-crimson text-white px-3 py-1.5 border border-zinc-700 transition-all duration-150 -skew-x-6 cursor-pointer shadow-[2px_2px_0px_#000000]"
          >
            <ChevronLeft className="size-4" />
            <span>PREV MISSION</span>
          </button>

          {/* Stepper Dots / Counter */}
          <div className="flex items-center gap-1.5 font-p5Mono text-xs text-zinc-300">
            {MISSIONS_DATA.map((_, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => {
                  playSlash()
                  setCurrentIndex(idx)
                }}
                className={`size-2.5 sm:size-3 transition-all duration-150 cursor-pointer ${
                  currentIndex === idx
                    ? 'bg-p5-crimson scale-125 shadow-[0_0_8px_#E60012]'
                    : 'bg-zinc-700 hover:bg-white'
                }`}
              />
            ))}
            <span className="ml-2 text-cyan-400 font-bold">
              {currentIndex + 1} / {MISSIONS_DATA.length}
            </span>
          </div>

          {/* Next Button */}
          <button
            type="button"
            onClick={() => {
              playHover()
              setCurrentIndex(prev => (prev + 1) % MISSIONS_DATA.length)
            }}
            className="flex items-center gap-1.5 font-p5Mono text-xs bg-black/80 hover:bg-p5-crimson text-white px-3 py-1.5 border border-zinc-700 transition-all duration-150 -skew-x-6 cursor-pointer shadow-[2px_2px_0px_#000000]"
          >
            <span>NEXT MISSION</span>
            <ChevronRight className="size-4" />
          </button>
        </div>
      </div>

      {/* Bottom Hint */}
      <div className="z-20 flex items-center gap-3 font-p5Mono text-xs text-zinc-400 bg-black/80 border border-zinc-800 px-4 py-1.5 self-start -skew-x-6">
        <span className="text-cyan-400">[◄/►]</span> SWITCH MISSIONS
        <span className="text-zinc-600">|</span>
        <span className="text-white">[ESC]</span> RETURN
      </div>
    </div>
  )
}
