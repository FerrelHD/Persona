import { P5FooterActionStrip } from '@/components/common/P5FooterActionStrip'
﻿import React, { useEffect } from 'react'
import { usePersonaSFX } from '@/hooks/usePersonaSFX'

interface PageCutoutOverlayProps {
  title: string
  characterRole: string
  characterName: string
  onBack: () => void
  accentColor?: 'cyan' | 'red' | 'pink' | 'emerald'
  extraShortcuts?: React.ReactNode
  hideBottomLegend?: boolean
}

const ACCENT = {
  cyan:    { border: 'border-cyan-400',    shadow: 'shadow-[3px_3px_0px_#22d3ee]',  badge: 'bg-cyan-400 text-black', crimson: '#22d3ee' },
  red:     { border: 'border-p5-crimson',  shadow: 'shadow-[3px_3px_0px_#E60012]',  badge: 'bg-p5-crimson text-white', crimson: '#E60012' },
  pink:    { border: 'border-pink-500',    shadow: 'shadow-[3px_3px_0px_#ec4899]',  badge: 'bg-pink-500 text-white', crimson: '#ec4899' },
  emerald: { border: 'border-emerald-400', shadow: 'shadow-[3px_3px_0px_#34d399]',  badge: 'bg-emerald-400 text-black', crimson: '#34d399' },
}

// Map screen titles to crisp button labels matching Main Menu items
const TITLE_MAP: Record<string, string> = {
  'DEPLOYED MISSIONS': 'MISSIONS',
  'SKILL PARAMETERS':  'SKILLS',
  'ABOUT THE DEV':     'ABOUT ME',
  'CALLING CARD':      'COMMS',
  'COMMS':             'COMMS',
  'CONTACT':           'COMMS',
}

export const PageCutoutOverlay: React.FC<PageCutoutOverlayProps> = ({
  title,
  characterRole,
  characterName,
  onBack,
  accentColor = 'cyan',
  extraShortcuts,
  hideBottomLegend = false,
}) => {
  const { playBack, playHover } = usePersonaSFX()
  const ac = ACCENT[accentColor]

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault()
        playBack()
        onBack()
      }
    }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [onBack, playBack])

  // Get clean label
  const displayTitle = TITLE_MAP[title.toUpperCase()] || title.toUpperCase()
  const chars = displayTitle.split('')
  const isLong = chars.length >= 10

  return (
    <>
      {/* ── TOP-LEFT: Clean Persona 5 Main Menu Title Frame (No clutter, pure game aesthetic) ── */}
      <div className="fixed top-2 sm:top-3 md:top-4 left-3 sm:left-5 md:left-7 z-40 select-none flex flex-col items-start pointer-events-auto">
        <div
          onClick={() => {
            playBack()
            onBack()
          }}
          onMouseEnter={playHover}
          className="relative inline-flex items-center cursor-pointer group transition-all duration-150 -rotate-[13deg] hover:-rotate-[11deg] hover:scale-105 active:scale-95 origin-center"
          title="Return to Main Menu"
        >
          {/* Button Frame Graphic from Persona 5 Assets */}
          <img
            src="/button_main_menu.png"
            alt={displayTitle}
            className={`h-auto object-contain filter drop-shadow-[8px_8px_0px_#000000] pointer-events-none ${
              isLong
                ? 'w-[260px] sm:w-[310px] md:w-[360px] lg:w-[390px]'
                : 'w-[240px] sm:w-[280px] md:w-[320px] lg:w-[350px]'
            }`}
          />

          {/* Title Content nested precisely inside the white slanted body of the button */}
          <div
            className="absolute inset-0 flex items-center justify-center pointer-events-none"
            style={{
              transform: 'rotate(15.5deg) translate(-1%, 1%)',
            }}
          >
            <div className="flex items-center justify-center flex-nowrap whitespace-nowrap gap-0.5 sm:gap-1 max-w-[85%] overflow-visible">
              {chars.map((char, idx) => {
                if (char === ' ') return <span key={idx} className={isLong ? "w-1 sm:w-1.5" : "w-2 sm:w-2.5"} />
                const isAccent = idx === 0 || idx % 4 === 0
                return (
                  <span
                    key={idx}
                    className={`
                      inline-flex items-center justify-center shrink-0
                      ${isLong
                        ? 'min-w-[15px] sm:min-w-[19px] md:min-w-[23px] h-[24px] sm:h-[30px] md:h-[36px] px-0.5 font-p5Heading text-sm sm:text-lg md:text-xl'
                        : 'min-w-[22px] sm:min-w-[28px] md:min-w-[34px] h-[32px] sm:h-[40px] md:h-[48px] px-1 font-p5Heading text-xl sm:text-2xl md:text-4xl'
                      }
                      uppercase border-[1.5px] border-black shadow-[2px_2px_0px_#000000]
                      ${isAccent ? ac.badge : 'bg-black text-white'}
                      transition-transform duration-100 group-hover:scale-105
                    `}
                  >
                    {char}
                  </span>
                )
              })}
            </div>
          </div>
        </div>
      </div>

      {/* ── AUTHENTIC PERSONA 5 BOTTOM ACTION STRIP ── */}
      {!hideBottomLegend && (
        <P5FooterActionStrip onReturn={onBack} />
      )}

      {/* ── BOTTOM-RIGHT: Ribbon character badge ── */}
      <div className="pointer-events-none fixed bottom-6 sm:bottom-8 md:bottom-10 right-6 sm:right-8 md:right-10 z-40 select-none">
        <div
          className={`
            flex items-center bg-black border-l-4 ${ac.border}
            px-3 py-1
            font-p5Sub text-xs sm:text-sm tracking-widest text-white
            -skew-x-6 ${ac.shadow}
          `}
        >
          {characterRole} // {characterName}
        </div>
      </div>
    </>
  )
}
