import React, { useState, useEffect } from 'react'
import { RansomTitle } from '@/components/RansomTitle'
import { usePersonaSFX } from '@/hooks/usePersonaSFX'
import { ChevronRight } from 'lucide-react'

export type ActiveScreen = 'menu' | 'missions' | 'skills' | 'callingCard' | 'about'

interface MainMenuProps {
  onSelectScreen: (screen: ActiveScreen) => void
}

interface MenuItem {
  id: ActiveScreen
  num: string
  label: string
  sublabel: string
  rotation: string
  marginOffset: string
}

const MENU_ITEMS: MenuItem[] = [
  {
    id: 'missions',
    num: '01',
    label: 'MISSIONS',
    sublabel: 'PORTFOLIO // HEISTS',
    rotation: '-rotate-2',
    marginOffset: 'ml-0',
  },
  {
    id: 'skills',
    num: '02',
    label: 'SKILLS',
    sublabel: 'CONFIDANT // COMBAT STATS',
    rotation: '-rotate-1',
    marginOffset: 'ml-5 md:ml-8',
  },
  {
    id: 'callingCard',
    num: '03',
    label: 'CALLING CARD',
    sublabel: 'TRANSMIT // HIRE ME',
    rotation: 'rotate-0',
    marginOffset: 'ml-10 md:ml-16',
  },
  {
    id: 'about',
    num: '04',
    label: 'ABOUT',
    sublabel: 'THIEF DOSSIER // BIO',
    rotation: 'rotate-2',
    marginOffset: 'ml-14 md:ml-24',
  },
]

export const MainMenu: React.FC<MainMenuProps> = ({ onSelectScreen }) => {
  const { playHover, playSlash } = usePersonaSFX()
  const [selectedIndex, setSelectedIndex] = useState(0)

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
    <div className="relative w-screen h-screen overflow-hidden select-none pointer-events-auto flex flex-col justify-between p-8 md:p-12 lg:p-16">
      {/* Top Left: FERREL Ransom Title */}
      <div className="z-20">
        <RansomTitle />
      </div>

      {/* Left Center: Fanned Out Buttons Stack */}
      {/* Positioned comfortably below the comic text on the left, fanning towards Joker */}
      <div className="z-20 my-auto flex flex-col gap-4 md:gap-5 w-full max-w-xl">
        {MENU_ITEMS.map((item, index) => {
          const isFocused = selectedIndex === index

          return (
            <div
              key={item.id}
              className={`transition-transform duration-200 ${item.marginOffset} ${item.rotation}`}
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
                className={`group relative w-[320px] sm:w-[370px] md:w-[420px] min-h-[64px] md:min-h-[72px] px-6 md:px-8 py-3.5 -skew-x-8 transition-all duration-150 ease-out border-4 border-black cursor-pointer flex items-center justify-between text-left ${
                  isFocused
                    ? 'bg-p5-crimson text-white shadow-[12px_12px_0px_#000000] translate-x-7 scale-[1.05] z-10'
                    : 'bg-white text-black shadow-[6px_6px_0px_#000000] hover:bg-p5-crimson hover:text-white hover:shadow-[12px_12px_0px_#000000] hover:translate-x-7 hover:scale-[1.05]'
                }`}
              >
                {/* Left side: Number + Title */}
                <div className="flex items-center gap-3 md:gap-4">
                  <span className={`font-p5Heading text-xl md:text-2xl transition-colors ${
                    isFocused ? 'text-p5-yellow' : 'text-zinc-500 group-hover:text-p5-yellow'
                  }`}>
                    {item.num}
                  </span>
                  <div>
                    <div className="font-p5Heading text-2xl md:text-3xl tracking-widest leading-none">
                      {item.label}
                    </div>
                    <div className={`font-p5Sub text-[10px] md:text-xs tracking-wider transition-colors mt-0.5 ${
                      isFocused ? 'text-zinc-200' : 'text-zinc-600 group-hover:text-zinc-200'
                    }`}>
                      {item.sublabel}
                    </div>
                  </div>
                </div>

                {/* Right Arrow indicator */}
                <ChevronRight className={`size-6 md:size-7 transition-all duration-150 ${
                  isFocused
                    ? 'translate-x-1 opacity-100 text-white'
                    : 'opacity-0 group-hover:opacity-100 group-hover:translate-x-1 text-white'
                }`} />
              </button>
            </div>
          )
        })}
      </div>

      {/* Bottom Bar: Retro Console Key Hints only (NO footer text, NO music player) */}
      <div className="z-20 flex items-center gap-3 font-p5Mono text-xs text-zinc-300 bg-black/85 border border-zinc-800 px-4 py-2 self-start -skew-x-6 shadow-[3px_3px_0px_#000000]">
        <span className="text-p5-yellow">[▲/▼]</span> NAVIGATE
        <span className="text-zinc-600">|</span>
        <span className="text-p5-crimson">[ENTER]</span> SELECT
        <span className="text-zinc-600">|</span>
        <span className="text-white">[ESC]</span> RETURN
      </div>
    </div>
  )
}
