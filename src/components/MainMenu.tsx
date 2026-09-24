import React, { useState, useEffect } from 'react'
import { RansomTitle } from '@/components/RansomTitle'
import { usePersonaSFX } from '@/hooks/usePersonaSFX'

export type ActiveScreen = 'menu' | 'missions' | 'hideout' | 'callingCard' | 'about'

interface MainMenuProps {
  onSelectScreen: (screen: ActiveScreen) => void
  onBackToTitle?: () => void
  initialSelectedScreen?: ActiveScreen | null
}

interface MenuItem {
  id: ActiveScreen
  label: string
  rotation: string
  offsetClass: string
  arrowColor: string
  letters: { char: string; bg: string; rotate: string }[]
}

const MENU_ITEMS: MenuItem[] = [
  {
    id: 'missions',
    label: 'MISSIONS',
    rotation: '-rotate-3',
    offsetClass: 'ml-0',
    arrowColor: 'text-[#00D2FF]',
    letters: [
      { char: 'M', bg: 'bg-white text-black', rotate: '-rotate-3' },
      { char: 'I', bg: 'bg-[#00D2FF] text-black font-black scale-105 shadow-md', rotate: 'rotate-2' },
      { char: 'S', bg: 'bg-white text-black', rotate: '-rotate-2' },
      { char: 'S', bg: 'bg-black text-white border border-white', rotate: 'rotate-3' },
      { char: 'I', bg: 'bg-white text-black', rotate: '-rotate-1' },
      { char: 'O', bg: 'bg-black text-white border border-white', rotate: 'rotate-2' },
      { char: 'N', bg: 'bg-white text-black', rotate: '-rotate-2' },
      { char: 'S', bg: 'bg-[#00D2FF] text-black font-black scale-110 shadow-lg', rotate: 'rotate-3' },
    ]
  },
  {
    id: 'hideout',
    label: 'HIDEOUT',
    rotation: '-rotate-1',
    offsetClass: 'ml-2 sm:ml-3 md:ml-4',
    arrowColor: 'text-[#B45309]',
    letters: [
      { char: 'H', bg: 'bg-white text-black', rotate: '-rotate-2' },
      { char: 'I', bg: 'bg-[#7C4A1E] text-white font-black scale-105 shadow-md', rotate: 'rotate-1' },
      { char: 'D', bg: 'bg-white text-black', rotate: '-rotate-1' },
      { char: 'E', bg: 'bg-black text-white border border-white', rotate: 'rotate-2' },
      { char: 'O', bg: 'bg-[#7C4A1E] text-white font-black scale-110 shadow-lg', rotate: '-rotate-2' },
      { char: 'U', bg: 'bg-white text-black', rotate: 'rotate-3' },
      { char: 'T', bg: 'bg-[#7C4A1E] text-white font-black scale-110 shadow-lg', rotate: '-rotate-2' },
    ]
  },
  {
    id: 'about',
    label: 'ABOUT',
    rotation: 'rotate-1',
    offsetClass: 'ml-4 sm:ml-6 md:ml-8',
    arrowColor: 'text-[#EF4444]',
    letters: [
      { char: 'A', bg: 'bg-white text-black', rotate: '-rotate-3' },
      { char: 'B', bg: 'bg-[#B91C1C] text-white font-black scale-105 shadow-md', rotate: 'rotate-3' },
      { char: 'O', bg: 'bg-white text-black', rotate: '-rotate-2' },
      { char: 'U', bg: 'bg-black text-white border border-white', rotate: 'rotate-4' },
      { char: 'T', bg: 'bg-[#B91C1C] text-white font-black scale-110 shadow-lg', rotate: '-rotate-2' },
    ]
  },
  {
    id: 'callingCard',
    label: 'COMMS',
    rotation: 'rotate-3',
    offsetClass: 'ml-6 sm:ml-9 md:ml-12',
    arrowColor: 'text-[#10B981]',
    letters: [
      { char: 'C', bg: 'bg-white text-black', rotate: '-rotate-3' },
      { char: 'O', bg: 'bg-[#10B981] text-black font-black scale-105 shadow-md', rotate: 'rotate-2' },
      { char: 'M', bg: 'bg-white text-black', rotate: '-rotate-2' },
      { char: 'M', bg: 'bg-black text-white border border-white', rotate: 'rotate-3' },
      { char: 'S', bg: 'bg-[#10B981] text-black font-black scale-110 shadow-lg', rotate: '-rotate-2' },
    ]
  }
]

export const MainMenu: React.FC<MainMenuProps> = ({ onSelectScreen, onBackToTitle, initialSelectedScreen = null }) => {
  const { playHover, playSlash, playBack } = usePersonaSFX()
  
  // Calculate initial selected index from last visited screen, or null if fresh start
  const getInitialIndex = (): number | null => {
    if (!initialSelectedScreen) return null
    const idx = MENU_ITEMS.findIndex(item => item.id === initialSelectedScreen)
    return idx !== -1 ? idx : null
  }

  const [selectedIndex, setSelectedIndex] = useState<number | null>(getInitialIndex)

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowDown') {
        e.preventDefault()
        playHover()
        setSelectedIndex(prev => (prev === null ? 0 : (prev + 1) % MENU_ITEMS.length))
      } else if (e.key === 'ArrowUp') {
        e.preventDefault()
        playHover()
        setSelectedIndex(prev => (prev === null ? MENU_ITEMS.length - 1 : (prev - 1 + MENU_ITEMS.length) % MENU_ITEMS.length))
      } else if (e.key === 'Enter') {
        if (selectedIndex !== null) {
          e.preventDefault()
          playSlash()
          onSelectScreen(MENU_ITEMS[selectedIndex].id)
        }
      } else if (e.key === 'Escape') {
        if (onBackToTitle) {
          e.preventDefault()
          playBack()
          onBackToTitle()
        }
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [selectedIndex, onSelectScreen, playHover, playSlash])

  return (
    <div className="relative w-screen h-screen overflow-hidden select-none pointer-events-auto flex flex-col justify-between p-6 sm:p-10 md:p-14 laptop-main-pad">
      {/* Left Vignette Shadow */}
      <div
        className="pointer-events-none fixed inset-y-0 left-0 w-[48vw] sm:w-[42vw] md:w-[38vw] lg:w-[36vw] z-10 bg-gradient-to-r from-black/95 via-black/50 to-transparent"
        aria-hidden="true"
      />

      {/* Top Left Title */}
      <div className="z-20">
        <RansomTitle />
      </div>

      {/* Menu Container: Centered vertically between title and footer with pleasant balance */}
      <div className="z-20 my-auto translate-y-3 sm:translate-y-5 md:-translate-y-8 laptop-main-deck flex flex-col items-start gap-2.5 sm:gap-3.5 md:gap-4 laptop-compact-deck w-fit ml-0">
        {MENU_ITEMS.map((item, index) => {
          const isFocused = selectedIndex === index

          return (
            <div
              key={item.id}
              className="p5-menu-entrance"
              style={{ animationDelay: `${index * 70 + 60}ms` }}
            >
              <div className={`transition-all duration-200 ${item.rotation} ${item.offsetClass}`}>
                <button
                  type="button"
                  onClick={() => {
                    playSlash()
                    onSelectScreen(item.id)
                  }}
                  onMouseEnter={() => {
                    playHover()
                    setSelectedIndex(index)
                  }}
                  className="group relative inline-flex items-center text-left cursor-pointer outline-none transition-transform duration-150"
                >
                  {isFocused ? (
                    /* ACTIVE STATE: Jagged Ribbon Slam + Katana Slash Flash + Staggered Letter Pop (Opsi 1 + Opsi 2) */
                    <div className="relative flex items-center translate-x-2 sm:translate-x-4 md:translate-x-5 scale-100 sm:scale-105 transition-transform duration-150 p5-ribbon-slam-anim">
                      {/* Katana Red Slash Flash Streak (Opsi 2) */}
                      <div
                        key={`slash-${item.id}`}
                        className="absolute -inset-y-3 -inset-x-8 z-0 overflow-hidden pointer-events-none"
                      >
                        <div className="h-full w-[45%] bg-gradient-to-r from-transparent via-[#E60012] to-white/90 p5-slash-flash-anim filter drop-shadow-[0_0_12px_#E60012]" />
                      </div>

                      <svg
                        viewBox="0 0 540 100"
                        preserveAspectRatio="none"
                        className="absolute -inset-x-5 -inset-y-2.5 w-[calc(100%+40px)] h-[calc(100%+20px)] pointer-events-none filter drop-shadow-[7px_7px_0px_#000000]"
                      >
                        <polygon
                          points="20,52 6,40 38,10 135,6 148,0 162,10 475,20 535,42 485,60 528,78 455,86 115,96 55,84 15,88 6,74"
                          fill="#000000"
                          stroke="#FFFFFF"
                          strokeWidth="5"
                          strokeLinejoin="miter"
                          strokeMiterlimit="4"
                        />
                        <polygon points="42,12 120,8 140,0 55,8" fill="#FFFFFF" />
                        <polygon points="475,22 530,42 490,48" fill="#FFFFFF" />
                        <polygon points="480,62 525,78 475,76" fill="#FFFFFF" />
                      </svg>

                      <div className="relative z-10 flex items-center gap-1 md:gap-1.5 px-3 md:px-4 py-1.5 md:py-2">
                        {item.letters.map((ltr, ltrIdx) => (
                          <span
                            key={ltrIdx}
                            style={{ animationDelay: `${ltrIdx * 25 + 20}ms` }}
                            className={`inline-flex items-center justify-center min-w-[28px] md:min-w-[34px] h-[40px] md:h-[48px] laptop-main-letter px-1.5 md:px-2 font-p5Heading text-xl sm:text-2xl md:text-3xl laptop-main-letter-text uppercase shadow-[3px_3px_0px_#000000] border-2 border-black ${ltr.bg} ${ltr.rotate} p5-letter-pop-anim transition-transform duration-100 hover:scale-120`}
                          >
                            {ltr.char}
                          </span>
                        ))}

                        <span className={`${item.arrowColor} text-lg md:text-xl ml-2 md:ml-3 p5-arrow-dart-anim filter drop-shadow-[2px_2px_0px_#000000]`}>
                          ▶
                        </span>
                      </div>
                    </div>
                  ) : (
                    /* DEFAULT RESTING STATE */
                    <div className="px-3 py-1 hover:translate-x-2 transition-transform duration-150">
                      <span className="font-p5Heading text-3xl sm:text-4xl md:text-5xl laptop-main-text text-white tracking-widest uppercase filter drop-shadow-[4px_4px_0px_#000000] hover:text-p5-yellow transition-colors">
                        {item.label}
                      </span>
                    </div>
                  )}
                </button>
              </div>
            </div>
          )
        })}
      </div>

      {/* Bottom Bar: Action Legend */}
      <div className="z-20 flex items-center gap-3 sm:gap-5 flex-wrap text-xs sm:text-sm text-zinc-300 laptop-legend-bottom pointer-events-auto p5-footer-entrance">
        {onBackToTitle && (
          <button
            onClick={() => {
              playBack()
              onBackToTitle()
            }}
            className="flex items-center gap-1.5 hover:text-white group cursor-pointer transition-colors"
            title="Return to Title"
          >
            <span className="size-5 rounded-full border-2 border-red-500 text-red-500 font-bold flex items-center justify-center text-[11px] group-hover:bg-red-500 group-hover:text-white transition-colors shadow-[0_0_6px_rgba(239,68,68,0.4)]">
              O
            </span>
            <span className="font-p5Heading text-sm tracking-wider uppercase">BACK</span>
          </button>
        )}

        <button
          onClick={() => {
            playSlash()
            onSelectScreen(MENU_ITEMS[selectedIndex].id)
          }}
          className="flex items-center gap-1.5 hover:text-white group cursor-pointer transition-colors"
          title="Select Item"
        >
          <span className="size-5 rounded-full border-2 border-cyan-400 text-cyan-400 font-bold flex items-center justify-center text-[11px] group-hover:bg-cyan-400 group-hover:text-black transition-colors shadow-[0_0_6px_rgba(34,211,238,0.4)]">
            X
          </span>
          <span className="font-p5Heading text-sm tracking-wider uppercase">SELECT</span>
        </button>

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

        <button
          onClick={() => {
            playSlash()
            onSelectScreen('about')
          }}
          className="flex items-center gap-1.5 hover:text-white group cursor-pointer transition-colors"
          title="View Dossier / About"
        >
          <span className="size-5 rounded-full border-2 border-pink-400 text-pink-400 font-bold flex items-center justify-center text-[11px] group-hover:bg-pink-400 group-hover:text-black transition-colors shadow-[0_0_6px_rgba(244,114,182,0.4)]">
            □
          </span>
          <span className="font-p5Heading text-sm tracking-wider uppercase">DOSSIER</span>
        </button>
      </div>
    </div>
  )
}