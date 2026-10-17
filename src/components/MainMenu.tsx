import React, { useState, useEffect, useCallback, useRef } from 'react'
import { usePersona3SFX } from '@/hooks/usePersona3SFX'
import {
  P3RMenuItemConfig,
  DEFAULT_P3R_MENU_CONFIG,
  P3R_SELECTOR_PATH,
  P3R_SELECTOR_BG_PATH,
} from '@/data/menuConfig'

export type ActiveScreen = 'menu' | 'missions' | 'hideout' | 'callingCard' | 'about'

export interface MainMenuProps {
  onSelectScreen: (screen: ActiveScreen, clickPoint?: { x: number; y: number }) => void
  onBackToTitle?: () => void
  initialSelectedScreen?: ActiveScreen | null
  configOverride?: P3RMenuItemConfig[]
  highlightedIndex?: number
}

export const MainMenu: React.FC<MainMenuProps> = ({
  onSelectScreen,
  onBackToTitle,
  initialSelectedScreen = null,
  configOverride,
  highlightedIndex,
}) => {
  const { playNavSFX, playCloseSFX, playMenuUtamaSFX } = usePersona3SFX()
  const menuConfig = configOverride || DEFAULT_P3R_MENU_CONFIG

  const getInitialIndex = (): number => {
    if (highlightedIndex !== undefined && highlightedIndex >= 0 && highlightedIndex < menuConfig.length) {
      return highlightedIndex
    }
    if (!initialSelectedScreen) return 0
    const idx = menuConfig.findIndex(item => item.id === initialSelectedScreen)
    return idx !== -1 ? idx : 0
  }

  const [selectedIndex, setSelectedIndex] = useState<number>(getInitialIndex)
  const [hasEntered, setHasEntered] = useState<boolean>(false)
  const containerRef = useRef<HTMLDivElement>(null)

  // Unified Proportional Scaler (1700x960 reference design resolution)
  // Perfectly fits on laptops (1280x800, 1366x768, 1440x900) and PC desktops (1080p, 1440p, 4K)
  const [uiScale, setUiScale] = useState<number>(1)

  useEffect(() => {
    const updateScale = () => {
      const w = window.innerWidth
      const h = window.innerHeight
      // Standard 1080p inner viewport: ~1680w x 940h (accounting for browser UI tabs and address bars)
      const scaleByH = h / 940
      const scaleByW = w / 1680
      const fitted = Math.min(scaleByW, scaleByH)
      // Clamped scale so text is never too tiny (< 0.62) or excessively bloated (> 1.1)
      setUiScale(Math.max(0.62, Math.min(1.10, fitted)))
    }
    updateScale()
    window.addEventListener('resize', updateScale)
    return () => window.removeEventListener('resize', updateScale)
  }, [])

  // Sync with calibrator highlighted index if provided
  useEffect(() => {
    if (highlightedIndex !== undefined && highlightedIndex >= 0 && highlightedIndex < menuConfig.length) {
      setSelectedIndex(highlightedIndex)
    }
  }, [highlightedIndex, menuConfig.length])

  // Trigger entrance stagger and play menu utama sound on mount
  useEffect(() => {
    playMenuUtamaSFX()
    const timer = setTimeout(() => {
      setHasEntered(true)
    }, 450)
    return () => clearTimeout(timer)
  }, [playMenuUtamaSFX])

  const handleSelectIndex = useCallback((index: number) => {
    if (index === selectedIndex) return
    setSelectedIndex(index)
    playNavSFX()
  }, [selectedIndex, playNavSFX])

  const handleConfirm = useCallback((index: number, e?: React.MouseEvent) => {
    const item = menuConfig[index]
    if (!item) return

    let clickPoint: { x: number; y: number } | undefined
    if (e && e.clientX && e.clientY) {
      clickPoint = { x: e.clientX, y: e.clientY }
    } else {
      // Approximate center of the item
      const itemEl = document.getElementById(`p3r-option-${index}`)
      if (itemEl) {
        const rect = itemEl.getBoundingClientRect()
        clickPoint = {
          x: rect.left + rect.width * 0.45,
          y: rect.top + rect.height * 0.5,
        }
      }
    }

    onSelectScreen(item.id, clickPoint)
  }, [menuConfig, onSelectScreen])

  // Keyboard Navigation: Up, Down, Enter, Escape
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Ignore if user is typing in an input
      if (['INPUT', 'TEXTAREA'].includes((e.target as HTMLElement)?.tagName)) return

      if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') {
        e.preventDefault()
        const prev = (selectedIndex - 1 + menuConfig.length) % menuConfig.length
        handleSelectIndex(prev)
      } else if (e.key === 'ArrowDown' || e.key === 'ArrowRight') {
        e.preventDefault()
        const next = (selectedIndex + 1) % menuConfig.length
        handleSelectIndex(next)
      } else if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault()
        handleConfirm(selectedIndex)
      } else if (e.key === 'Escape') {
        e.preventDefault()
        playCloseSFX()
        onBackToTitle?.()
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [selectedIndex, menuConfig, handleSelectIndex, handleConfirm, onBackToTitle, playCloseSFX])

  const currentWatermark = (selectedIndex + 1).toString().padStart(2, '0')

  return (
    <div
      ref={containerRef}
      className="relative w-screen h-screen overflow-hidden bg-[#001233] select-none text-white font-rodin"
    >
      {/* ── VIDEO BACKGROUND (Persona 3 Reload Makoto Yuki) ── */}
      <video
        src="/assets/p3r-menu-bg.mp4"
        autoPlay
        loop
        muted
        playsInline
        className="fixed inset-0 w-full h-full object-cover object-bottom pointer-events-none z-0"
      />

      {/* ── GIANT SIDE NUMBER WATERMARK (01, 02, etc.) (ADAPTIVE SCALED) ── */}
      <div
        className="absolute left-[-1.5rem] sm:left-[-2rem] md:left-[-2.5rem] top-[-3rem] sm:top-[-4rem] md:top-[-5rem] text-[22vh] sm:text-[26vh] md:text-[30vh] font-black italic tracking-[-0.2em] text-[#f6fcff] pointer-events-none select-none z-10 transition-all duration-300 origin-top-left opacity-90"
        style={{
          fontFamily: 'var(--font-rodin)',
          transform: `scale(${uiScale}) rotate(90deg)`,
        }}
      >
        <span>{currentWatermark}</span>
      </div>

      {/* ── MENU COLUMN: SVG OPTION LIST WITH MASK INVERSION (ADAPTIVE PROPORTIONAL SCALER) ── */}
      <div
        className="absolute top-[50%] flex flex-col items-start justify-center z-20 pointer-events-auto transition-all duration-200"
        style={{
          left: 'clamp(240px, 45vw, 820px)',
          transform: `translateY(-50%) scale(${uiScale})`,
          transformOrigin: 'left center',
        }}
      >
        <div className="flex flex-col items-start pointer-events-auto">
          {menuConfig.map((opt, index) => {
            const isSelected = selectedIndex === index
            const cleanName = opt.name.replace(/ /g, '')
            const bannerScaleFactorX = opt.bannerScaleX || 1.0
            const bannerScaleY = opt.bannerScaleY || 3.2
            const bannerOffsetX = opt.bannerOffsetX ?? -60
            const bannerOffsetY = opt.bannerOffsetY ?? -186
            const bannerRotation = opt.bannerRotation ?? 8
            const scaleX = (cleanName.length * 0.52 + 1.6) * bannerScaleFactorX
            const selectorTransform = `translate(${bannerOffsetX}, ${bannerOffsetY}) rotate(${bannerRotation}, 0, 100) scale(${scaleX}, ${bannerScaleY})`
            const maskId = `p3r-selector-mask-${opt.id}`

            return (
              <div
                key={opt.id}
                id={`p3r-option-${index}`}
                className={`p3r-option-item relative select-none cursor-pointer transition-all ${
                  index !== 0 ? 'mt-[-5.2rem] sm:mt-[-6.5rem] md:mt-[-7.5rem]' : 'mt-0'
                } ${isSelected ? 'selected z-15' : 'z-auto'} ${
                  hasEntered ? 'opacity-100 translate-x-0 skew-x-0' : 'opacity-0 translate-x-[110px] -skew-x-8'
                }`}
                style={{
                  zIndex: isSelected ? 15 : opt.zIndex,
                  transitionDelay: `${index * 75}ms`,
                  transitionDuration: '520ms',
                  transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)',
                }}
              >
                {/* Perfectly Angled Hitbox matching SVG rotation, position, and dimensions */}
                <button
                  type="button"
                  onClick={(e) => {
                    handleSelectIndex(index)
                    handleConfirm(index, e)
                  }}
                  onMouseEnter={() => handleSelectIndex(index)}
                  onMouseMove={() => {
                    if (selectedIndex !== index) handleSelectIndex(index)
                  }}
                  className="absolute outline-none cursor-pointer bg-transparent border-none z-10 pointer-events-auto"
                  style={{
                    left: '120px',
                    top: '40px',
                    width: `${cleanName.length * 68 + 120}px`,
                    height: '115px',
                    transform: `translate(${opt.offsetX}px, ${opt.offsetY}px) rotate(${opt.rotation}deg)`,
                    transformOrigin: '25% center',
                  }}
                  aria-label={opt.name}
                />

                {/* SVG Button Canvas with Mask Inversion */}
                <svg
                  width="950"
                  height="200"
                  xmlns="http://www.w3.org/2000/svg"
                  className="overflow-visible pointer-events-none transition-transform duration-150 origin-[25%_center]"
                  style={{
                    transform: `translate(${opt.offsetX}px, ${opt.offsetY}px) rotate(${opt.rotation}deg)`,
                  }}
                >
                  <defs>
                    <mask
                      id={maskId}
                      maskUnits="userSpaceOnUse"
                      maskContentUnits="userSpaceOnUse"
                      x="-200"
                      y="-400"
                      width="1500"
                      height="800"
                    >
                      <rect x="-200" y="-400" width="1500" height="800" fill="black" />
                      <g transform={selectorTransform} transformOrigin="left center">
                        <path fill="white" d={P3R_SELECTOR_PATH} />
                        <path
                          className="pulse-anim"
                          transformOrigin="52 100"
                          fill="white"
                          d={P3R_SELECTOR_BG_PATH}
                        />
                      </g>
                    </mask>
                  </defs>

                  {/* Selector banner when selected */}
                  <g className="selector-group" transform={selectorTransform} transformOrigin="left center">
                    <path
                      className="fill-pink pulse-anim"
                      transformOrigin="52 100"
                      d={P3R_SELECTOR_BG_PATH}
                    />
                    <path className="fill-fg" d={P3R_SELECTOR_PATH} />
                  </g>

                  {/* Base Text (Cyan Palette when idle, Solid Black when selected like P3R) */}
                  <text
                    x="150"
                    y="122"
                    className={`option-text base-text ${isSelected ? 'fill-black' : opt.colorClass}`}
                    style={{
                      fontSize: opt.fontSize || '4.8rem',
                      fontFamily: 'var(--font-rodin)',
                      fontStyle: 'italic',
                      fontWeight: 900,
                      letterSpacing: '-0.14em',
                    }}
                  >
                    {opt.name}
                  </text>

                  {/* Masked Red Text (Over the white selector) */}
                  <g className="masked-red-group" mask={`url(#${maskId})`}>
                    <text
                      x="150"
                      y="122"
                      className="option-text fill-red"
                      style={{
                        fontSize: opt.fontSize || '4.8rem',
                        fontFamily: 'var(--font-rodin)',
                        fontStyle: 'italic',
                        fontWeight: 900,
                        letterSpacing: '-0.14em',
                      }}
                    >
                      {opt.name}
                    </text>
                  </g>
                </svg>
              </div>
            )
          })}
        </div>
      </div>

      {/* ── BOTTOM-RIGHT HUD & CONTROLS: PREMIUM PLAYSTATION CONTROLLER BUTTONS ── */}
      <div className={`absolute bottom-6 right-8 z-25 pointer-events-auto flex items-center justify-end transition-all duration-500 delay-200 ${
        hasEntered ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
      }`}>
        <div className="flex gap-5 items-center justify-end">
          {/* PlayStation (✕) Cross Confirm Button */}
          <button
            type="button"
            onClick={(e) => handleConfirm(selectedIndex, e)}
            onMouseEnter={playNavSFX}
            className="flex gap-2 items-center group cursor-pointer hover:scale-105 active:scale-95 transition-transform outline-none bg-transparent border-none p-0"
            title="Confirm Selection (Enter / Space)"
          >
            <div className="size-6 rounded-full bg-[#001845]/90 border-2 border-[#22d3ee] shadow-[0_0_10px_rgba(34,211,238,0.6)] flex items-center justify-center group-hover:border-white group-hover:shadow-[0_0_14px_rgba(34,211,238,0.9)] transition-all">
              <svg viewBox="0 0 16 16" className="size-3.5 text-[#22d3ee] group-hover:text-white transition-colors" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round">
                <line x1="4" y1="4" x2="12" y2="12" />
                <line x1="12" y1="4" x2="4" y2="12" />
              </svg>
            </div>
            <span
              className="text-xs sm:text-sm uppercase tracking-wider font-black italic text-white group-hover:text-cyan-300 transition-colors"
              style={{
                fontFamily: 'var(--font-rodin)',
                textShadow: '0 2px 8px rgba(0,0,0,0.8)',
              }}
            >
              CONFIRM
            </span>
          </button>

          {/* PlayStation (○) Circle Close Button */}
          <button
            type="button"
            onClick={() => {
              playCloseSFX()
              onBackToTitle?.()
            }}
            onMouseEnter={playNavSFX}
            className="flex gap-2 items-center group cursor-pointer hover:scale-105 active:scale-95 transition-transform outline-none bg-transparent border-none p-0"
            title="Close / Back to Title (Escape)"
          >
            <div className="size-6 rounded-full bg-[#001845]/90 border-2 border-[#ef4444] shadow-[0_0_10px_rgba(239,68,68,0.6)] flex items-center justify-center group-hover:border-white group-hover:shadow-[0_0_14px_rgba(239,68,68,0.9)] transition-all">
              <svg viewBox="0 0 16 16" className="size-3.5 text-[#ef4444] group-hover:text-white transition-colors" fill="none" stroke="currentColor" strokeWidth="2.6">
                <circle cx="8" cy="8" r="4.8" />
              </svg>
            </div>
            <span
              className="text-xs sm:text-sm uppercase tracking-wider font-black italic text-white group-hover:text-red-300 transition-colors"
              style={{
                fontFamily: 'var(--font-rodin)',
                textShadow: '0 2px 8px rgba(0,0,0,0.8)',
              }}
            >
              CLOSE
            </span>
          </button>
        </div>
      </div>
    </div>
  )
}