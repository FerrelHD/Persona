import React, { useEffect } from 'react'
import { usePersonaSFX } from '@/hooks/usePersonaSFX'
import { Flame } from 'lucide-react'

interface SplashScreenProps {
  onStart: () => void
}

export const SplashScreen: React.FC<SplashScreenProps> = ({ onStart }) => {
  const { playSlash } = usePersonaSFX()

  const handleStart = () => {
    playSlash()
    onStart()
  }

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Enter' || e.key === ' ') {
        handleStart()
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])

  return (
    <div
      onClick={handleStart}
      className="fixed inset-0 z-50 flex flex-col items-center justify-between p-10 bg-black/60 backdrop-blur-[2px] cursor-pointer select-none overflow-hidden"
    >
      {/* Dynamic Background Slash */}
      <div 
        className="absolute -inset-10 bg-p5-crimson -skew-y-12 transform origin-top-left -translate-y-48 shadow-[0_0_50px_rgba(230,0,18,0.8)] opacity-85"
      />

      {/* Top Banner */}
      <div className="relative z-10 flex items-center gap-2 self-start bg-black text-white px-4 py-1.5 font-p5Sub text-xs -skew-x-12 border-2 border-white shadow-[4px_4px_0px_#000000]">
        <Flame className="size-4 text-p5-crimson animate-bounce" />
        PERSONA 5 ROYAL // DEVELOPER HEIST ARCHIVE
      </div>

      {/* Center Title Logo */}
      <div className="relative z-10 flex flex-col items-center text-center my-auto">
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
      <div className="relative z-10 flex flex-col items-center gap-2">
        <div className="animate-bounce bg-white text-black font-p5Heading text-xl md:text-2xl px-8 py-3 border-4 border-black -skew-x-12 shadow-[6px_6px_0px_#000000]">
          [ PRESS ENTER OR CLICK TO START ]
        </div>
        <div className="text-[11px] font-p5Mono text-zinc-300 bg-black/80 px-3 py-1 border border-zinc-700">
          AUDIO & VISUAL PROTOCOLS READY // PURE CONSOLE GAMEPLAY
        </div>
      </div>
    </div>
  )
}
