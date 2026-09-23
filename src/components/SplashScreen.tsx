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

    // Smooth timing: allow blade slash and shutter wipe to complete before mounting menu
    setTimeout(() => {
      onStart()
    }, 450)
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
      className={`fixed inset-0 z-50 flex flex-col items-center justify-between p-6 sm:p-8 md:p-10 cursor-pointer select-none overflow-hidden transition-colors duration-300 ${
        isExiting ? 'bg-black' : 'bg-black/60 backdrop-blur-[2px]'
      }`}
    >
      {/* Dynamic Background Slash Polygon */}
      <div
        className={`absolute -inset-10 bg-p5-crimson -skew-y-12 transform origin-top-left shadow-[0_0_50px_rgba(230,0,18,0.8)] transition-all duration-400 ease-out ${
          isExiting
            ? 'scale-150 translate-x-32 rotate-6 opacity-100'
            : '-translate-y-48 opacity-85'
        }`}
      />

      {/* Top Banner */}
      <div
        className={`relative z-10 flex items-center gap-2 self-start bg-black text-white px-4 py-1.5 font-p5Sub text-xs -skew-x-12 border-2 border-white shadow-[4px_4px_0px_#000000] transition-all duration-300 ${
          isExiting ? '-translate-x-48 opacity-0' : 'translate-x-0 opacity-100'
        }`}
      >
        <Flame className="size-4 text-p5-crimson animate-bounce" />
        PERSONA 5 ROYAL // DEVELOPER HEIST ARCHIVE
      </div>

      {/* Center Title Logo */}
      <div
        className={`relative z-10 flex flex-col items-center text-center my-auto transition-all duration-400 ease-out ${
          isExiting
            ? 'scale-125 translate-x-24 -rotate-6 opacity-0 filter blur-[2px]'
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
        className={`relative z-10 flex flex-col items-center gap-2 transition-all duration-300 ${
          isExiting ? 'translate-y-24 opacity-0' : 'translate-y-0 opacity-100'
        }`}
      >
        <div className="animate-bounce bg-white text-black font-p5Heading text-xl md:text-2xl px-8 py-3 border-4 border-black -skew-x-12 shadow-[6px_6px_0px_#000000]">
          [ PRESS ENTER OR CLICK TO START ]
        </div>
        <div className="text-[11px] font-p5Mono text-zinc-300 bg-black/80 px-3 py-1 border border-zinc-700">
          AUDIO & VISUAL PROTOCOLS READY // PURE CONSOLE GAMEPLAY
        </div>
      </div>

      {/* ── Cinematic Persona Slash Beam Overlay on Exit ── */}
      {isExiting && (
        <>
          {/* High-speed white/yellow blade slash line */}
          <div
            className="absolute z-30 w-[200vw] h-4 bg-white shadow-[0_0_30px_#FFFFFF,0_0_60px_#FFD700] pointer-events-none"
            style={{
              animation: 'slash-beam 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards',
              top: '50%',
              left: '-50%',
            }}
          />
          {/* Secondary Crimson Slash Afterimage */}
          <div
            className="absolute z-20 w-[200vw] h-12 bg-p5-crimson shadow-[0_0_40px_#E60012] opacity-80 pointer-events-none"
            style={{
              animation: 'slash-beam 0.45s 0.05s cubic-bezier(0.16, 1, 0.3, 1) forwards',
              top: '48%',
              left: '-50%',
            }}
          />
        </>
      )}
    </div>
  )
}
