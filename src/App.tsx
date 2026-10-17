import React, { useState, useEffect, useLayoutEffect, useCallback, useRef } from 'react'
import { PersonaVideoBg } from '@/components/PersonaVideoBg'
import { MainMenu, ActiveScreen } from '@/components/MainMenu'
import { MissionsScreen } from '@/components/screens/MissionsScreen'
import { SkillsScreen } from '@/components/screens/SkillsScreen'
import { CallingCardScreen } from '@/components/screens/CallingCardScreen'
import { AboutScreen } from '@/components/screens/AboutScreen'
import { usePersonaSFX } from '@/hooks/usePersonaSFX'
import { usePersona3SFX } from '@/hooks/usePersona3SFX'
import { PersonaCursor } from '@/components/common/PersonaCursor'
import { SimpleLoadingScreen } from '@/components/common/SimpleLoadingScreen'
import { useRealAssetPreloader } from '@/hooks/useRealAssetPreloader'
import { MenuPositionCalibrator } from '@/components/dev/MenuPositionCalibrator'
import { DEFAULT_P3R_MENU_CONFIG, P3RMenuItemConfig } from '@/data/menuConfig'
import { animateSlashWipeReveal, animateWavyClose, generateWavyPolygon, Point } from '@/utils/wavyTransition'

const VIDEO_MAP: Record<ActiveScreen, string> = {
  menu:        '/assets/p3r-menu-bg.mp4',
  missions:    '/assets/videos/makoto.mp4',
  hideout:     '/assets/tokyobackground.png',
  about:       '/assets/videos/shinji.mp4',
  callingCard: '/assets/videos/fuuka.mp4',
}

export function App() {
  // Real 0% - 100% Asset Preloader (Video, CJK Fonts, Web Audio, Mall Atrium, 6 Characters)
  const { progress, isReady, isFadingOut: loadingFadingOut } = useRealAssetPreloader()

  const [currentScreen, setCurrentScreen] = useState<ActiveScreen>('menu')
  const [subScreen, setSubScreen] = useState<ActiveScreen | null>(null)
  const [isTransitioning, setIsTransitioning] = useState(false)
  const [lastVisitedScreen, setLastVisitedScreen] = useState<ActiveScreen | null>(null)
  const [isVideoLoading, setIsVideoLoading] = useState(false)

  // Calibrator state & configuration
  const [isCalibratorOpen, setIsCalibratorOpen] = useState(false)
  const [calibratorActiveIndex, setCalibratorActiveIndex] = useState<number>(0)
  const subScreenRef = useRef<HTMLDivElement>(null)
  const pendingRevealRef = useRef<Point | null>(null)
  const [menuConfig, setMenuConfig] = useState<P3RMenuItemConfig[]>(() => {
    try {
      const saved = localStorage.getItem('p3r_menu_config_v2')
      if (saved) {
        const parsed = JSON.parse(saved)
        if (Array.isArray(parsed) && parsed.length === DEFAULT_P3R_MENU_CONFIG.length) {
          return parsed
        }
      }
    } catch {}
    return DEFAULT_P3R_MENU_CONFIG
  })

  const { playSlash, playBack } = usePersonaSFX()
  const { playCloseSFX } = usePersona3SFX()

  // Save menu calibrator updates
  const handleUpdateMenuConfig = useCallback((updated: P3RMenuItemConfig[]) => {
    setMenuConfig(updated)
    try {
      localStorage.setItem('p3r_menu_config_v2', JSON.stringify(updated))
    } catch {}
  }, [])

  const handleResetMenuConfig = useCallback(() => {
    setMenuConfig(DEFAULT_P3R_MENU_CONFIG)
    try {
      localStorage.removeItem('p3r_menu_config_v2')
    } catch {}
  }, [])

  // Global hotkey: backtick (`) or tilde (~) to toggle Calibrator
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (['INPUT', 'TEXTAREA'].includes((e.target as HTMLElement)?.tagName)) return
      if (e.key === '`' || e.key === '~') {
        e.preventDefault()
        setIsCalibratorOpen(prev => !prev)
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])

  const handleVideoReady = useCallback(() => {
    setIsVideoLoading(false)
  }, [])

  // Persona 3 Reload: Diagonal Slash Wipe Reveal Animation on Sub-Screen
  useLayoutEffect(() => {
    if (subScreen && subScreenRef.current) {
      pendingRevealRef.current = null
      // Apply immediate initial clipPath before paint to prevent any 1-frame flash
      subScreenRef.current.style.clipPath = 'polygon(140% 0%, 100% 0%, 100% 100%, 110% 100%)'
      animateSlashWipeReveal(subScreenRef.current, {
        duration: 800,
        bladeColor: '#16cffb',
        onComplete: () => {
          setIsTransitioning(false)
        },
      })
    }
  }, [subScreen])

  // Screen Navigation: Open Sub-Screen with Wavy Reveal
  const handleSelectScreen = useCallback((screen: ActiveScreen, clickPoint?: Point) => {
    if (isTransitioning || currentScreen === screen) return
    setLastVisitedScreen(screen)
    setCurrentScreen(screen)
    setSubScreen(screen)
    setIsTransitioning(true)
    pendingRevealRef.current = clickPoint || {
      x: window.innerWidth * 0.58,
      y: window.innerHeight * 0.48,
    }
  }, [isTransitioning, currentScreen])

  // Screen Navigation: Close / Back to Menu with Wavy Shrink
  const handleBackToMenu = useCallback(() => {
    if (isTransitioning) return
    playCloseSFX()
    playBack()
    setIsTransitioning(true)

    const exitOrigin: Point = {
      x: window.innerWidth - 100,
      y: window.innerHeight - 60,
    }

    if (subScreenRef.current) {
      animateWavyClose(subScreenRef.current, {
        origin: exitOrigin,
        duration: 480,
        onComplete: () => {
          setSubScreen(null)
          setCurrentScreen('menu')
          setIsTransitioning(false)
        },
      })
    } else {
      setSubScreen(null)
      setCurrentScreen('menu')
      setIsTransitioning(false)
    }
  }, [isTransitioning, playCloseSFX, playBack])

  return (
    <div className="relative w-screen h-screen overflow-hidden font-rodin text-white select-none">
      {/* Persona Authentic Cursor */}
      <PersonaCursor />

      {/* Main Screens Container */}
      <div className="relative z-10 w-full h-full opacity-100">
        {isReady && (currentScreen === 'menu' || isTransitioning) && (
          <MainMenu
            onSelectScreen={handleSelectScreen}
            initialSelectedScreen={lastVisitedScreen}
            configOverride={menuConfig}
            highlightedIndex={isCalibratorOpen ? calibratorActiveIndex : undefined}
          />
        )}

        {/* Persona 3 Reload Sub-Screen Container with Direct Wavy Clip-Path Transition */}
        {subScreen && (
          <div
            ref={subScreenRef}
            className={`fixed inset-0 z-20 overflow-hidden ${
              isTransitioning ? 'pointer-events-none will-change-[clip-path]' : 'pointer-events-auto'
            }`}
          >
            {/* Video Background for Sub-screen */}
            <PersonaVideoBg
              videoSrc={VIDEO_MAP[subScreen]}
              onReady={handleVideoReady}
            />

            {subScreen === 'missions' && (
              <MissionsScreen onBack={handleBackToMenu} />
            )}
            {subScreen === 'hideout' && (
              <SkillsScreen onBack={handleBackToMenu} />
            )}
            {subScreen === 'about' && (
              <AboutScreen onBack={handleBackToMenu} />
            )}
            {subScreen === 'callingCard' && (
              <CallingCardScreen onBack={handleBackToMenu} />
            )}
          </div>
        )}
      </div>

      {/* Persona 3 Reload Menu Position Calibrator (Hotkey: ` or ~) */}
      <MenuPositionCalibrator
        isOpen={isCalibratorOpen}
        onClose={() => setIsCalibratorOpen(false)}
        config={menuConfig}
        onChange={handleUpdateMenuConfig}
        onReset={handleResetMenuConfig}
        activeTabIndex={calibratorActiveIndex}
        onTabChange={setCalibratorActiveIndex}
      />

      {/* Simple P3R Minimal Loading Screen with Real Progress */}
      {!isReady && (
        <SimpleLoadingScreen
          progress={progress}
          isFadingOut={loadingFadingOut}
        />
      )}
    </div>
  )
}

export default App
