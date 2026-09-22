import React, { useState, useEffect } from 'react'
import { RansomTitle } from '@/components/RansomTitle'
import { usePersonaSFX } from '@/hooks/usePersonaSFX'

export type ActiveScreen = 'menu' | 'missions' | 'skills' | 'callingCard' | 'about'

interface MainMenuProps {
  onSelectScreen: (screen: ActiveScreen) => void
}

interface LetterTile {
  char: string
  bg: string
  rotate: string
}

interface MenuItemConfig {
  id: ActiveScreen
  label: string
  rotation: string
  offsetClass: string
  letters: LetterTile[]
}

const MENU_ITEMS: MenuItemConfig[] = [
  {
    id: 'missions',
    label: 'PROJECTS',
    rotation: '-rotate-3',
    offsetClass: 'ml-0',
    letters: [
      { char: 'P', bg: 'bg-white text-black', rotate: '-rotate-3' },
      { char: 'R', bg: 'bg-black text-white border border-white', rotate: 'rotate-2' },
      { char: 'O', bg: 'bg-white text-black', rotate: '-rotate-4' },
      { char: 'J', bg: 'bg-black text-white border border-white', rotate: 'rotate-3' },
      { char: 'E', bg: 'bg-white text-black', rotate: '-rotate-2' },
      { char: 'C', bg: 'bg-black text-white border border-white', rotate: 'rotate-2' },
      { char: 'T', bg: 'bg-p5-crimson text-white font-extrabold scale-110 shadow-lg', rotate: '-rotate-2' },
      { char: 'S', bg: 'bg-white text-black', rotate: 'rotate-3' },
    ]
  },
  {
    id: 'skills',
    label: 'SKILLS',
    rotation: '-rotate-2',
    offsetClass: 'ml-2 sm:ml-3 md:ml-4',
    letters: [
      { char: 'S', bg: 'bg-white text-black', rotate: '-rotate-4' },
      { char: 'K', bg: 'bg-white text-black', rotate: 'rotate-3' },
      { char: 'I', bg: 'bg-black text-white border border-white', rotate: '-rotate-1' },
      { char: 'L', bg: 'bg-white text-black', rotate: 'rotate-4' },
      { char: 'L', bg: 'bg-white text-black', rotate: '-rotate-3' },
      { char: 'S', bg: 'bg-p5-crimson text-white font-extrabold scale-110 shadow-lg', rotate: 'rotate-2' },
    ]
  },
  {
    id: 'about',
    label: 'ABOUT',
    rotation: 'rotate-1',
    offsetClass: 'ml-4 sm:ml-6 md:ml-8',
    letters: [
      { char: 'A', bg: 'bg-white text-black', rotate: '-rotate-3' },
      { char: 'B', bg: 'bg-black text-white border border-white', rotate: 'rotate-3' },
      { char: 'O', bg: 'bg-white text-black', rotate: '-rotate-2' },
      { char: 'U', bg: 'bg-black text-white border border-white', rotate: 'rotate-4' },
      { char: 'T', bg: 'bg-p5-crimson text-white font-extrabold scale-110 shadow-lg', rotate: '-rotate-2' },
    ]
  },
  {
    id: 'callingCard',
    label: 'CONTACT',
    rotation: 'rotate-3',
    offsetClass: 'ml-6 sm:ml-9 md:ml-12',
    letters: [
      { char: 'C', bg: 'bg-white text-black', rotate: '-rotate-3' },
      { char: 'O', bg: 'bg-black text-white border border-white', rotate: 'rotate-2' },
      { char: 'N', bg: 'bg-white text-black', rotate: '-rotate-2' },
      { char: 'T', bg: 'bg-black text-white border border-white', rotate: 'rotate-3' },
      { char: 'A', bg: 'bg-white text-black', rotate: '-rotate-4' },
      { char: 'C', bg: 'bg-white text-black', rotate: 'rotate-2' },
      { char: 'T', bg: 'bg-p5-crimson text-white font-extrabold scale-110 shadow-lg', rotate: 'rotate-3' },
    ]
  }
]

export const MainMenu: React.FC<MainMenuProps> = ({ onSelectScreen }) => {
  const { playHover, playSlash } = usePersonaSFX()
  const [selectedIndex, setSelectedIndex] = useState(1) // Default to SKILLS

  // Keyboard navigation support: Arrow Up/Down & Enter
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowDown') {
        e.preventDefault()
        playHover()
        setSelectedIndex(prev => (prev + 1) % MENU_ITEMS.length)
      } else if (e.key === 'ArrowUp') {
        e.preventDefault()
        playHover()
        setSelectedIndex(prev => (prev - 1 + MENU_ITEMS.length) % MENU_ITEMS.length)
      } else if (e.key === 'Enter') {
        e.preventDefault()
        playSlash()
        onSelectScreen(MENU_ITEMS[selectedIndex].id)
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [selectedIndex, onSelectScreen, playHover, playSlash])

  return (
    <div className="relative w-screen h-screen overflow-hidden select-none pointer-events-auto flex flex-col justify-between p-6 sm:p-10 md:p-14">
      {/* Cinematic Left Edge Vignette Shadow */}
      <div 
        className="pointer-events-none fixed inset-y-0 left-0 w-[48vw] sm:w-[42vw] md:w-[38vw] lg:w-[36vw] z-10 bg-gradient-to-r from-black/95 via-black/50 to-transparent" 
        aria-hidden="true"
      />

      {/* Top Left: FERREL Title */}
      <div className="z-20">
        <RansomTitle />
      </div>

      {/* 
        Container geser lebih ke kiri, dengan efek tangga (stagger / maju per-button)
      */}
      <div className="z-20 my-auto flex flex-col items-start gap-3 sm:gap-4 md:gap-5 w-fit ml-0">
        {MENU_ITEMS.map((item, index) => {
          const isFocused = selectedIndex === index

          return (
            <div
              key={item.id}
              className={`transition-all duration-200 ${item.rotation} ${item.offsetClass}`}
            >
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
                  /* =======================================================
                     ACTIVE / HOVER STATE: Persona 5 Jagged Ribbon + Ransom Cutout
                     ======================================================= */
                  <div className="relative flex items-center translate-x-3 sm:translate-x-5 md:translate-x-6 scale-105 transition-all duration-150">
                    {/* SVG Jagged Persona 5 Ribbon Frame */}
                    <svg
                      viewBox="0 0 540 100"
                      preserveAspectRatio="none"
                      className="absolute -inset-x-6 -inset-y-3 w-[calc(100%+48px)] h-[calc(100%+24px)] pointer-events-none filter drop-shadow-[8px_8px_0px_#000000]"
                    >
                      <polygon
                        points="20,52 6,40 38,10 135,6 148,0 162,10 475,20 535,42 485,60 528,78 455,86 115,96 55,84 15,88 6,74"
                        fill="#000000"
                        stroke="#FFFFFF"
                        strokeWidth="5"
                        strokeLinejoin="miter"
                        strokeMiterlimit="4"
                      />
                      <polygon
                        points="42,12 120,8 140,0 55,8"
                        fill="#FFFFFF"
                      />
                      <polygon
                        points="475,22 530,42 490,48"
                        fill="#FFFFFF"
                      />
                      <polygon
                        points="480,62 525,78 475,76"
                        fill="#FFFFFF"
                      />
                    </svg>

                    {/* Ransom Cutout Letters Stack */}
                    <div className="relative z-10 flex items-center gap-1 md:gap-1.5 px-4 md:px-6 py-2">
                      {item.letters.map((ltr, ltrIdx) => (
                        <span
                          key={ltrIdx}
                          className={`inline-flex items-center justify-center min-w-[34px] md:min-w-[44px] h-[52px] md:h-[64px] px-2 font-p5Heading text-3xl md:text-5xl uppercase shadow-[3px_3px_0px_#000000] border-2 border-black ${ltr.bg} ${ltr.rotate} transition-transform duration-100 hover:scale-125`}
                        >
                          {ltr.char}
                        </span>
                      ))}

                      {/* Right Play Arrow Triangle */}
                      <span className="text-white text-2xl md:text-3xl ml-3 md:ml-5 -skew-x-12 animate-pulse filter drop-shadow-[2px_2px_0px_#000000]">
                        ▶
                      </span>
                    </div>
                  </div>
                ) : (
                  /* =======================================================
                     DEFAULT / RESTING STATE: Clean, Bold White Text
                     ======================================================= */
                  <div className="px-4 py-2 hover:translate-x-2 transition-transform duration-150">
                    <span className="font-p5Heading text-5xl md:text-6xl lg:text-7xl text-white tracking-widest uppercase filter drop-shadow-[5px_5px_0px_#000000] hover:text-p5-yellow transition-colors">
                      {item.label}
                    </span>
                  </div>
                )}
              </button>
            </div>
          )
        })}
      </div>

      {/* Bottom Bar: Retro Console Key Hints only (NO footer text, NO music player) */}
      <div className="z-20 flex items-center gap-3 font-p5Mono text-xs text-zinc-300 bg-black/85 border border-zinc-800 px-4 py-2 self-end -skew-x-6 shadow-[3px_3px_0px_#000000]">
        <span className="text-p5-yellow">[▲/▼]</span> NAVIGATE
        <span className="text-zinc-600">|</span>
        <span className="text-p5-crimson">[ENTER]</span> SELECT
        <span className="text-zinc-600">|</span>
        <span className="text-white">[ESC]</span> RETURN
      </div>
    </div>
  )
}
