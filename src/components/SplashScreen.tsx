import React, { useState, useEffect } from 'react'
import { usePersonaSFX } from '@/hooks/usePersonaSFX'
import { Flame } from 'lucide-react'

interface SplashScreenProps {
  onStart: () => void
}

export const SplashScreen: React.FC<SplashScreenProps> = ({ onStart }) => {
  const { playSlash } = usePersonaSFX()
  const [isExiting, setIsExiting] = useState(false)
  const [showFlash, setShowFlash] = useState(false)

  const handleStart = () => {
    if (isExiting) return
    setIsExiting(true)
    setShowFlash(true)
    playSlash()

    // 60ms white impact flash
    setTimeout(() => {
      setShowFlash(false)
    }, 60)

    // Option 1: Direct Slash Reveal - MainMenu is directly sliced open
    setTimeout(() => {
      onStart()
    }, 320)
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
      className={`fixed inset-0 z-50 flex flex-col items-center justify-between p-6 sm:p-8 md:p-10 cursor-pointer select-none overflow-hidden transition-all duration-300 ${
        isExiting ? 'pointer-events-none' : 'bg-black/60 backdrop-blur-[2px]'
      }`}
    >
      {/* White Comic Impact Flash Frame on Cut */}
      {showFlash && (
        <div className="fixed inset-0 z-50 bg-white/90 pointer-events-none" />
      )}

      {/* Top-Right Half of Splash Screen: flies up-right along cut */}
      <div
        className={`absolute inset-0 flex flex-col items-center justify-between p-6 sm:p-8 md:p-10 transition-all duration-300 ease-out will-change-[transform,opacity] ${
          isExiting
            ? 'translate-x-24 -translate-y-28 rotate-3 opacity-0'
            : 'translate-x-0 translate-y-0 opacity-100'
        }`}
        style={{
          clipPath: 'polygon(-20% 0%, 120% 0%, 120% 85%, -20% 25%)',
        }}
      >
        {/* Dynamic Background Slash Polygon */}
        <div
          className={`absolute -inset-10 bg-p5-crimson -skew-y-12 transform origin-top-left transition-all duration-300 ease-out ${
            isExiting ? 'scale-125 opacity-0' : '-translate-y-48 opacity-85'
          }`}
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

        <div className="relative z-10 h-10" />
      </div>

      {/* Bottom-Left Half of Splash Screen: flies down-left along cut */}
      <div
        className={`absolute inset-0 flex flex-col items-center justify-end p-6 sm:p-8 md:p-10 transition-all duration-300 ease-out will-change-[transform,opacity] ${
          isExiting
            ? '-translate-x-24 translate-y-28 -rotate-3 opacity-0'
            : 'translate-x-0 translate-y-0 opacity-100'
        }`}
        style={{
          clipPath: 'polygon(-20% 25%, 120% 85%, 120% 120%, -20% 120%)',
        }}
      >
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

      {/* ── DRAMATIC THICK PERSONA 5 BLADE SLASH OVERLAY ── */}
      {isExiting && (
        <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
          {/* Broad Crimson Slash Wake (Wide Comic Polygon) */}
          <div
            className="absolute z-20 w-[300vw] h-28 bg-p5-crimson opacity-95 will-change-transform"
            style={{
              boxShadow: '0 0 50px #E60012, 0 0 90px #E60012',
              animation: 'dramatic-slash 0.32s cubic-bezier(0.12, 0.8, 0.3, 1) forwards',
              top: '46%',
              left: '-100%',
            }}
          />
          {/* Intense Bright White Blade Core with Gold Edge */}
          <div
            className="absolute z-30 w-[300vw] h-10 bg-white will-change-transform"
            style={{
              boxShadow: '0 0 25px #FFFFFF, 0 0 55px #FFE600',
              animation: 'dramatic-slash 0.3s cubic-bezier(0.12, 0.8, 0.3, 1) forwards',
              top: '50%',
              left: '-100%',
            }}
          />
        </div>
      )}
    </div>
  )
}
