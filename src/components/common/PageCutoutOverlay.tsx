import React, { useEffect } from 'react'
import { usePersonaSFX } from '@/hooks/usePersonaSFX'
import { P3RControllerButton } from '@/components/common/P3RControllerButton'

interface PageCutoutOverlayProps {
  title: string
  characterRole: string
  characterName: string
  onBack: () => void
  accentColor?: 'cyan' | 'red' | 'pink' | 'emerald' | 'gray' | 'brown'
  extraShortcuts?: React.ReactNode
  hideBottomLegend?: boolean
  hideBottomBadge?: boolean
  isVisible?: boolean
  disableEscapeKey?: boolean
}

const ACCENT = {
  cyan: {
    border: 'border-l-[#16cffb]',
    topBorder: 'border-t-[#16cffb]',
    glow: 'shadow-[0_0_14px_rgba(22,207,251,0.65)]',
    text: 'text-[#16cffb]',
    badgeBg: 'bg-[#015fcc]',
    badgeBorder: 'border-[#16cffb]/60',
    barGradient: 'from-[#16cffb] to-[#015fcc]',
    streak: 'via-[#16cffb]',
  },
  pink: {
    border: 'border-l-[#fd77d9]',
    topBorder: 'border-t-[#fd77d9]',
    glow: 'shadow-[0_0_14px_rgba(253,119,217,0.65)]',
    text: 'text-[#fd77d9]',
    badgeBg: 'bg-[#be185d]',
    badgeBorder: 'border-[#fd77d9]/60',
    barGradient: 'from-[#fd77d9] to-[#831843]',
    streak: 'via-[#fd77d9]',
  },
  red: {
    border: 'border-l-[#ff0033]',
    topBorder: 'border-t-[#ff0033]',
    glow: 'shadow-[0_0_14px_rgba(255,0,51,0.65)]',
    text: 'text-[#ff0033]',
    badgeBg: 'bg-[#990000]',
    badgeBorder: 'border-[#ff0033]/60',
    barGradient: 'from-[#ff0033] to-[#7f1d1d]',
    streak: 'via-[#ff0033]',
  },
  emerald: {
    border: 'border-l-[#4ade80]',
    topBorder: 'border-t-[#4ade80]',
    glow: 'shadow-[0_0_14px_rgba(74,222,128,0.65)]',
    text: 'text-[#4ade80]',
    badgeBg: 'bg-[#15803d]',
    badgeBorder: 'border-[#4ade80]/60',
    barGradient: 'from-[#4ade80] to-[#14532d]',
    streak: 'via-[#4ade80]',
  },
  brown: {
    border: 'border-l-[#c28442]',
    topBorder: 'border-t-[#c28442]',
    glow: 'shadow-[0_0_14px_rgba(194,132,66,0.65)]',
    text: 'text-[#d49755]',
    badgeBg: 'bg-[#6b3811]',
    badgeBorder: 'border-[#c28442]/60',
    barGradient: 'from-[#d49755] to-[#451e05]',
    streak: 'via-[#d49755]',
  },
  gray: {
    border: 'border-l-zinc-400',
    topBorder: 'border-t-zinc-400',
    glow: 'shadow-[0_0_14px_rgba(161,161,170,0.65)]',
    text: 'text-zinc-300',
    badgeBg: 'bg-zinc-700',
    badgeBorder: 'border-zinc-400/60',
    barGradient: 'from-zinc-400 to-zinc-700',
    streak: 'via-zinc-300',
  },
}

// Map screen titles to crisp button labels matching Main Menu items
const TITLE_MAP: Record<string, string> = {
  'DEPLOYED MISSIONS': 'MISSIONS',
  'MISSIONS':          'MISSIONS',
  'SKILL PARAMETERS':  'HIDEOUT',
  'SKILLS':            'HIDEOUT',
  'ABOUT THE DEV':     'ABOUT ME',
  'ABOUT':             'ABOUT ME',
  'ABOUT ME':          'ABOUT ME',
  'CALLING CARD':      'COMMS',
  'COMMS':             'COMMS',
  'CONTACT':           'COMMS',
  'HIDEOUT':           'HIDEOUT',
}

// Digital index number for each section (matches P3R Main Menu 01-04)
const INDEX_MAP: Record<string, string> = {
  'MISSIONS': '01',
  'HIDEOUT':  '02',
  'ABOUT ME': '03',
  'ABOUT':    '03',
  'COMMS':    '04',
}

// Map screen titles to authentic Persona 3 Reload tactical subtitles
const SUBTITLE_MAP: Record<string, [string, string]> = {
  'MISSIONS': ['TARTARUS EXPEDITION', 'COMPLETED OPERATIONS'],
  'HIDEOUT':  ['PAULOWNIA HIDEOUT', 'SEES OPERATIVES'],
  'ABOUT ME': ['PERSONNEL DOSSIER', 'THE ARCHITECT'],
  'ABOUT':    ['PERSONNEL DOSSIER', 'THE ARCHITECT'],
  'COMMS':    ['TRANSMISSION LINK', 'CALLING CARD'],
}

export const PageCutoutOverlay: React.FC<PageCutoutOverlayProps> = ({
  title,
  characterRole,
  characterName,
  onBack,
  accentColor = 'cyan',
  extraShortcuts,
  hideBottomLegend = false,
  hideBottomBadge = false,
  isVisible = true,
  disableEscapeKey = false,
}) => {
  const { playBack, playHover } = usePersonaSFX()
  const ac = ACCENT[accentColor] || ACCENT.cyan

  useEffect(() => {
    if (disableEscapeKey) return
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault()
        playBack()
        onBack()
      }
    }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [onBack, playBack, disableEscapeKey])

  // Get clean label, page index, and P3R subtitle
  const displayTitle = TITLE_MAP[title.toUpperCase()] || title.toUpperCase()
  const pageIndex = INDEX_MAP[displayTitle] || '00'
  const sub = SUBTITLE_MAP[displayTitle] || [characterRole.toUpperCase(), characterName.toUpperCase()]

  return (
    <>
      {/* ── TOP-LEFT: Authentic Persona 3 Reload Sleek Angular Plaque ── */}
      <div
        className={`fixed top-4 sm:top-6 md:top-8 left-4 sm:left-6 md:left-8 z-40 select-none flex flex-col items-start pointer-events-auto transition-all duration-500 ${
          isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-12 pointer-events-none'
        }`}
      >
        <div
          onClick={() => {
            playBack()
            onBack()
          }}
          onMouseEnter={playHover}
          className="cursor-pointer group flex flex-col items-start select-none transition-transform hover:scale-[1.02] active:scale-[0.98]"
          title="Return to Main Menu (Escape)"
        >
          {/* Main Angular Plaque (-skew-x-12) */}
          <div
            className={`
              relative -skew-x-12 flex items-center
              bg-gradient-to-r from-[#000d26] via-[#001740] to-[#000d26]
              border border-black border-t-2 ${ac.topBorder} ${ac.glow}
              shadow-[4px_6px_0px_#000000]
              overflow-hidden
              px-4 sm:px-6 py-2 sm:py-2.5
            `}
          >
            {/* Ambient Neon Glow Streak */}
            <div className={`absolute top-0 inset-x-0 h-[2px] bg-gradient-to-r from-transparent ${ac.streak} to-transparent opacity-80`} />

            {/* Interactive Laser Sheen Sweep on Hover */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-out pointer-events-none" />

            {/* Content Row */}
            <div className="flex items-center gap-2.5 sm:gap-3.5 relative z-10">
              {/* Digital Index Number // 01 */}
              <div className="flex items-center gap-1 font-rodin font-black italic">
                <span className={`${ac.text} text-[11px] sm:text-xs tracking-widest opacity-80`}>//</span>
                <span className={`${ac.text} text-sm sm:text-base md:text-lg tracking-wider drop-shadow-[0_0_8px_currentColor]`}>
                  {pageIndex}
                </span>
              </div>

              {/* Angled Separator Bar */}
              <div className="h-4 sm:h-5 w-[2px] bg-white/20 -skew-x-6 mx-0.5" />

              {/* Title Text in Authentic Rodin Pro Bold Italic */}
              <h1 className="font-rodin font-black italic text-2xl sm:text-3xl md:text-4xl text-white tracking-[-0.07em] drop-shadow-[2px_2px_0px_#000a18] group-hover:text-[#f6fcff] transition-colors leading-none uppercase">
                {displayTitle}
              </h1>

              {/* S.E.E.S. Tactical Squad Pill Badge */}
              <div className={`ml-1.5 sm:ml-2.5 hidden sm:flex items-center ${ac.badgeBg} border ${ac.badgeBorder} px-2 py-0.5 shadow-sm`}>
                <span className="text-[9px] font-rodin font-black tracking-widest text-white uppercase">
                  S.E.E.S.
                </span>
              </div>
            </div>

            {/* Right Slanted Accent Border */}
            <div className={`absolute right-0 top-0 bottom-0 w-2 sm:w-2.5 bg-gradient-to-b ${ac.barGradient}`} />
          </div>

          {/* Subtitle Ribbon Banner with P3R Theme */}
          <div className={`mt-1.5 flex items-center -skew-x-12 bg-black/95 border-l-4 ${ac.border} px-3 py-0.5 shadow-[3px_3px_0px_#000000]`}>
            <span className={`${ac.text} font-black text-[10px] sm:text-xs font-rodin tracking-widest mr-2 uppercase`}>
              {sub[0]}
            </span>
            <span className="text-zinc-500 mx-1 text-[10px]">//</span>
            <span className="text-zinc-200 text-[10px] sm:text-xs font-rodin tracking-wider uppercase">
              {sub[1]}
            </span>
          </div>
        </div>
      </div>

      {/* Fixed Persona Controller Legend */}
      {!hideBottomLegend && (
        <div className={`fixed bottom-5 sm:bottom-7 md:bottom-8 laptop-legend-bottom left-6 sm:left-10 md:left-14 z-40 flex items-center gap-3 sm:gap-5 flex-wrap text-xs sm:text-sm text-zinc-300 pointer-events-auto select-none transition-all duration-500 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'
        }`}>
          {/* (O) BACK button */}
          <P3RControllerButton
            symbol="circle"
            label="BACK"
            title="Back to Main Menu (Escape)"
            onClick={() => {
              playBack()
              onBack()
            }}
          />

          {/* (△) GITHUB */}
          <P3RControllerButton
            symbol="triangle"
            label="GITHUB"
            title="View GitHub"
            href="https://github.com/FerrelHD"
            target="_blank"
            rel="noopener noreferrer"
          />

          {/* Contextual Extra Action Shortcuts */}
          {extraShortcuts}
        </div>
      )}

      {/* ── BOTTOM-RIGHT: Ribbon character badge ── */}
      {!hideBottomBadge && (
        <div className={`pointer-events-none fixed bottom-6 sm:bottom-8 md:bottom-10 laptop-legend-bottom-right right-6 sm:right-8 md:right-10 z-40 select-none transition-all duration-500 ${
          isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-12 pointer-events-none'
        }`}>
          <div
            className={`
              flex items-center bg-[#001233]/90 border-l-4 ${ac.border}
              border border-black px-3 py-1 font-rodin text-xs sm:text-sm tracking-widest text-white
              -skew-x-12 shadow-[3px_3px_0px_#000000]
            `}
          >
            <span className={`${ac.text} font-black italic mr-2`}>SEES //</span>
            <span className="font-bold">{characterRole}</span>
            <span className="text-zinc-500 mx-1.5">//</span>
            <span className="text-zinc-200">{characterName}</span>
          </div>
        </div>
      )}
    </>
  )
}
