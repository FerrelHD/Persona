import React, { useEffect } from 'react'
import { usePersonaSFX } from '@/hooks/usePersonaSFX'

interface PageCutoutOverlayProps {
  title: string
  characterRole: string
  characterName: string
  onBack: () => void
  accentColor?: 'cyan' | 'red' | 'pink' | 'emerald' | 'gray'
  extraShortcuts?: React.ReactNode
  hideBottomLegend?: boolean
}

const ACCENT = {
  gray:    { border: 'border-zinc-400',    shadow: 'shadow-[3px_3px_0px_#a1a1aa]',  badge: 'bg-zinc-300 text-black', crimson: '#9ca3af', text: 'text-zinc-300', tileBg: 'bg-zinc-300 text-black' },
  cyan:    { border: 'border-cyan-400',    shadow: 'shadow-[3px_3px_0px_#22d3ee]',  badge: 'bg-cyan-400 text-black', crimson: '#22d3ee', text: 'text-cyan-400', tileBg: 'bg-cyan-400 text-black font-black' },
  red:     { border: 'border-p5-crimson',  shadow: 'shadow-[3px_3px_0px_#E60012]',  badge: 'bg-p5-crimson text-white', crimson: '#E60012', text: 'text-p5-crimson', tileBg: 'bg-p5-crimson text-white' },
  pink:    { border: 'border-pink-500',    shadow: 'shadow-[3px_3px_0px_#ec4899]',  badge: 'bg-pink-500 text-white', crimson: '#ec4899', text: 'text-pink-400', tileBg: 'bg-pink-500 text-white' },
  emerald: { border: 'border-emerald-400', shadow: 'shadow-[3px_3px_0px_#34d399]',  badge: 'bg-emerald-400 text-black', crimson: '#34d399', text: 'text-emerald-400', tileBg: 'bg-emerald-400 text-black font-black' },
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

// Map screen titles to clean ransom words and subtitles matching Persona 5
const SUBTITLE_MAP: Record<string, [string, string]> = {
  'MISSIONS': ['PHANTOM HEISTS', 'COMPLETED OPERATIONS'],
  'SKILLS':   ['PARAMETRIC ARSENAL', 'LV. 99 MASTERIES'],
  'ABOUT':    ['CONFIDANT DOSSIER', 'THE PHANTOM DEV'],
  'ABOUT ME': ['CONFIDANT DOSSIER', 'THE PHANTOM DEV'],
  'COMMS':    ['DIRECT DISPATCH', 'SEND CALLING CARD'],
}

const TILE_ROTATIONS = ['-rotate-6', 'rotate-3', '-rotate-3', 'rotate-4', '-rotate-2', 'rotate-6', '-rotate-4', 'rotate-2']

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
  const sub = SUBTITLE_MAP[displayTitle] || [characterRole.toUpperCase(), characterName.toUpperCase()]

  return (
    <>
      {/* ── TOP-LEFT: Universal Persona 5 Ransom Cutout Title ── */}
      <div className="fixed top-4 sm:top-6 md:top-8 left-4 sm:left-6 md:left-8 z-40 select-none flex flex-col items-start pointer-events-auto p5-tile-entrance">
        <div
          onClick={() => {
            playBack()
            onBack()
          }}
          onMouseEnter={playHover}
          className="cursor-pointer group flex flex-col items-start select-none transition-transform hover:scale-105 active:scale-95"
          title="Return to Main Menu"
        >
          {/* Ransom Letter Tiles */}
          <div className="flex items-center gap-1 sm:gap-1.5 filter drop-shadow-[5px_5px_0px_#000000]">
            {chars.map((char, i) => {
              if (char === ' ') return <span key={i} className="w-1.5 sm:w-2" />
              const rot = TILE_ROTATIONS[i % TILE_ROTATIONS.length]
              const isAccent = i === 2 || i === chars.length - 1
              const bg = isAccent
                ? ac.tileBg
                : i % 2 === 0
                ? 'bg-black text-white'
                : 'bg-white text-black'

              return (
                <span
                  key={i}
                  className={`inline-flex items-center justify-center font-p5Heading text-3xl sm:text-4xl md:text-5xl min-w-[34px] sm:min-w-[42px] md:min-w-[48px] h-[42px] sm:h-[52px] md:h-[60px] px-1.5 sm:px-2 py-0.5 border-[3px] border-black uppercase transition-transform group-hover:scale-110 ${rot} ${bg} shadow-[3px_3px_0px_#000000]`}
                >
                  {char}
                </span>
              )
            })}
          </div>

          {/* Subtitle Ribbon Banner with Character Themed Color */}
          <div className={`mt-1.5 flex items-center bg-black border-l-4 ${ac.border} px-2.5 sm:px-3 py-0.5 text-[10px] sm:text-xs font-p5Sub tracking-widest text-white -skew-x-6 shadow-[3px_3px_0px_#000000]`}>
            <span className={`${ac.text} font-bold mr-1.5`}>{sub[0]}</span>
            <span className="text-zinc-500 mx-1">//</span>
            <span className="text-zinc-200">{sub[1]}</span>
          </div>
        </div>
      </div>

      {/* Fixed Persona 5 Controller Legend - Locked to exact universal coordinates */}
      {!hideBottomLegend && (
        <div className="fixed bottom-5 sm:bottom-7 md:bottom-8 laptop-legend-bottom left-6 sm:left-10 md:left-14 z-40 flex items-center gap-3 sm:gap-5 flex-wrap text-xs sm:text-sm text-zinc-300 pointer-events-auto select-none">
          {/* (O) BACK button */}
          <button
            type="button"
            onClick={() => {
              playBack()
              onBack()
            }}
            className="flex items-center gap-1.5 hover:text-white group cursor-pointer transition-colors"
            title="Back to Main Menu"
          >
            <span className="size-5 rounded-full border-2 border-red-500 text-red-500 font-bold flex items-center justify-center text-[11px] group-hover:bg-red-500 group-hover:text-white transition-colors shadow-[0_0_6px_rgba(239,68,68,0.4)]">
              O
            </span>
            <span className="font-p5Heading text-sm tracking-wider uppercase text-white group-hover:text-red-400 transition-colors">
              BACK
            </span>
          </button>

          {/* (△) GITHUB */}
          <a
            href="https://github.com/FerrelHD"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 hover:text-white group cursor-pointer transition-colors"
            title="View GitHub"
          >
            <span className="size-5 rounded-full border-2 border-emerald-400 text-emerald-400 font-bold flex items-center justify-center text-[11px] group-hover:bg-emerald-400 group-hover:text-black transition-colors shadow-[0_0_6px_rgba(52,211,153,0.4)]">
              △
            </span>
            <span className="font-p5Heading text-sm tracking-wider uppercase">GITHUB</span>
          </a>

          {/* Contextual Extra Action Shortcuts */}
          {extraShortcuts}
        </div>
      )}

      {/* ── BOTTOM-RIGHT: Ribbon character badge ── */}
      <div className="pointer-events-none fixed bottom-6 sm:bottom-8 md:bottom-10 laptop-legend-bottom-right right-6 sm:right-8 md:right-10 z-40 select-none">
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
