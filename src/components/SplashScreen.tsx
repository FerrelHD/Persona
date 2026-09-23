import React, { useState, useEffect } from 'react'
import { usePersonaSFX } from '@/hooks/usePersonaSFX'
import { Flame } from 'lucide-react'

interface SplashScreenProps {
  onStart: () => void
}

export const SplashScreen: React.FC<SplashScreenProps> = ({ onStart }) => {
  const { playSlash } = usePersonaSFX()
  const [isExiting, setIsExiting] = useState(false)

  const handleStart = () => {
    if (isExiting) return
    setIsExiting(true)
    playSlash()

    // Seamless handoff: trigger the crimson Iris wipe right as the blade cuts across center
    setTimeout(() => {
      onStart()
    }, 140)
  }

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Enter' || e.key === ' ') {
        handleStart()
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isExiting])

  return (
    <div
      onClick={handleStart}
      className={`fixed inset-0 z-50 flex flex-col items-center justify-between p-6 sm:p-8 md:p-10 cursor-pointer select-none overflow-hidden transition-colors duration-200 ${
        isExiting ? 'bg-black/80' : 'bg-black/60 backdrop-blur-[2px]'
      }`}
    >
      {/* Dynamic Background Slash Polygon - Hardware accelerated */}
      <div
        className={`absolute -inset-10 bg-p5-crimson -skew-y-12 transform origin-top-left transition-all duration-300 ease-out will-change-transform ${
          isExiting
            ? 'scale-150 translate-x-24 rotate-3 opacity-100'
            : '-translate-y-48 opacity-85'
        }`}
      />

      {/* Top Banner */}
      <div
        className={`relative z-10 flex items-center gap-2 self-start bg-black text-white px-4 py-1.5 font-p5Sub text-xs -skew-x-12 border-2 border-white shadow-[4px_4px_0px_#000000] transition-all duration-200 ${
          isExiting ? '-translate-x-32 opacity-0' : 'translate-x-0 opacity-100'
        }`}
      >
        <Flame className="size-4 text-p5-crimson animate-bounce" />
        PERSONA 5 ROYAL // DEVELOPER HEIST ARCHIVE
      </div>

      {/* Center Title Logo - Hardware accelerated without filter blur to prevent GPU repaint drops */}
      <div
        className={`relative z-10 flex flex-col items-center text-center my-auto transition-all duration-200 ease-out will-change-[transform,opacity] ${
          isExiting
            ? 'scale-110 -translate-y-4 rotate-2 opacity-0'
            : 'scale-100 translate-x-0 opacity-100'
        }`}
      >
        <div className="flex items-center gap-2 mb-2">
          <span className="bg-white text-black font-p5Heading text-2xl md:text-3xl px-3 py-1 -skew-x-12 shadow-[4px_4px_0px_#000000]">
            THE
          </span>
          <span className="bg-p5-crimson text-white font-p5Heading text-2xl md:text-3xl px-3 py-1 -skew-x-12 shadow-[4px_4px_0px_#000000]">
            PHANTOM
          </span>
        </div>

        <h1 className="font-p5Heading text-7xl md:text-9xl text-white tracking-wider filter drop-shadow-[8px_8px_0px_#000000] -rotate-2">
          FERREL
        </h1>

        <div className="mt-2 bg-black text-p5-yellow font-p5Sub text-sm md:text-base px-6 py-1.5 -skew-x-6 border-2 border-p5-yellow shadow-[4px_4px_0px_#E60012]">
          FULLSTACK ARCHITECT & CREATIVE TECHNOLOGIST
        </div>
      </div>

      {/* Bottom Start Prompt */}
      <div
        className={`relative z-10 flex flex-col items-center gap-2 transition-all duration-200 will-change-[transform,opacity] ${
          isExiting ? 'translate-y-16 opacity-0' : 'translate-y-0 opacity-100'
        }`}
      >
        <div className="animate-bounce bg-white text-black font-p5Heading text-xl md:text-2xl px-8 py-3 border-4 border-black -skew-x-12 shadow-[6px_6px_0px_#000000]">
          [ PRESS ENTER OR CLICK TO START ]
        </div>
        <div className="text-[11px] font-p5Mono text-zinc-300 bg-black/80 px-3 py-1 border border-zinc-700">
          AUDIO & VISUAL PROTOCOLS READY // PURE CONSOLE GAMEPLAY
        </div>
      </div>

      {/* ── Cinematic Persona Slash Beam Overlay on Exit (GPU-promoted) ── */}
      {isExiting && (
        <>
          {/* High-speed white/yellow blade slash line */}
          <div
            className="absolute z-30 w-[200vw] h-4 bg-white pointer-events-none will-change-transform"
            style={{
              boxShadow: '0 0 20px #FFFFFF, 0 0 35px #FFD700',
              animation: 'slash-beam 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards',
              top: '50%',
              left: '-50%',
            }}
          />
          {/* Secondary Crimson Slash Afterimage */}
          <div
            className="absolute z-20 w-[200vw] h-12 bg-p5-crimson opacity-80 pointer-events-none will-change-transform"
            style={{
              boxShadow: '0 0 25px #E60012',
              animation: 'slash-beam 0.34s 0.03s cubic-bezier(0.16, 1, 0.3, 1) forwards',
              top: '48%',
              left: '-50%',
            }}
          />
        </>
      )}
    </div>
  )
}
