import React, { useState, useEffect, useCallback, useRef } from 'react'
import { PersonaVideoBg } from '@/components/PersonaVideoBg'
import { MainMenu, ActiveScreen } from '@/components/MainMenu'
import { MissionsScreen } from '@/components/screens/MissionsScreen'
import { SkillsScreen } from '@/components/screens/SkillsScreen'
import { CallingCardScreen } from '@/components/screens/CallingCardScreen'
import { AboutScreen } from '@/components/screens/AboutScreen'
import { usePersonaSFX } from '@/hooks/usePersonaSFX'
import { PersonaCursor } from '@/components/common/PersonaCursor'
import { TakeYourTime } from '@/components/common/TakeYourTime'
import { useAssetPreloader } from '@/hooks/useAssetPreloader'

// Accent color per screen - used for the iris overlay tint
const SCREEN_COLOR: Record<ActiveScreen, string> = {
  menu:        '#E60012',
  missions:    '#00D4FF',
  skills:      '#9CA3AF', // Akihiko Sanada (P3R) Cool Steel Grey / Silver
  about:       '#B91C1C',
  callingCard: '#10B981',
}

const VIDEO_MAP: Record<ActiveScreen, string> = {
  menu:        '/assets/videos/joker.mp4',
  missions:    '/assets/videos/makoto.mp4',
  skills:      '/assets/videos/akihiko.mp4',
  about:       '/assets/videos/shinji.mp4',
  callingCard: '/assets/videos/fuuka.mp4',
}

type TransitionPhase = 'idle' | 'expand' | 'collapse'

export function App() {
  // Quietly prefetch all 5 compressed videos and key artwork in background
  useAssetPreloader()

  // Initial atmospheric loading screen
  const [initialLoading, setInitialLoading] = useState(true)
  const [loadingFadingOut, setLoadingFadingOut] = useState(false)
  const [menuReady, setMenuReady] = useState(false)

  const [currentScreen, setCurrentScreen] = useState<ActiveScreen>('menu')
  const [lastVisitedScreen, setLastVisitedScreen] = useState<ActiveScreen | null>(null)
  const [pendingScreen, setPendingScreen] = useState<ActiveScreen | null>(null)
  const [transPhase, setTransPhase] = useState<TransitionPhase>('idle')
  const [isVideoLoading, setIsVideoLoading] = useState(false)
  
  const videoReadyRef = useRef(false)
  const fallbackTimerRef = useRef<NodeJS.Timeout | null>(null)

  const { playSlash, playBack } = usePersonaSFX()

  // Called when loading screen fade-out finishes -> mount MainMenu so animation starts from frame 0 in plain sight
  const handleLoadingFadeEnd = useCallback(() => {
    setInitialLoading(false)
    setMenuReady(true)
  }, [])

  // Initial loading timer: waits for video or at least 1.1s for authentic Persona 5 vibe
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoadingFadingOut(true)
    }, 1100)

    return () => clearTimeout(timer)
  }, [])

  // Safety watchdog for loading fade-out
  useEffect(() => {
    if (loadingFadingOut && initialLoading) {
      const timer = setTimeout(() => {
        handleLoadingFadeEnd()
      }, 350)
      return () => clearTimeout(timer)
    }
  }, [loadingFadingOut, initialLoading, handleLoadingFadeEnd])

  // Color of the iris overlay
  const irisColor = pendingScreen ? SCREEN_COLOR[pendingScreen] : SCREEN_COLOR[currentScreen]

  const navigateTo = useCallback((next: ActiveScreen, sfx?: () => void) => {
    if (transPhase !== 'idle') return
    sfx?.()
    videoReadyRef.current = false
    setPendingScreen(next)
    setTransPhase('expand')
  }, [transPhase])

  const handleSelectScreen = useCallback((screen: ActiveScreen) => {
    setLastVisitedScreen(screen)
    navigateTo(screen, playSlash)
  }, [navigateTo, playSlash])

  const handleBackToMenu = useCallback(() => {
    navigateTo('menu', playBack)
  }, [navigateTo, playBack])

  const proceedToCollapse = useCallback(() => {
    if (fallbackTimerRef.current) {
      clearTimeout(fallbackTimerRef.current)
      fallbackTimerRef.current = null
    }
    setIsVideoLoading(false)
    requestAnimationFrame(() => {
      setTransPhase('collapse')
    })
  }, [])

  // Called when video starts playing or is ready
  const handleVideoReady = useCallback(() => {
    videoReadyRef.current = true
    if (isVideoLoading) {
      proceedToCollapse()
    }
  }, [isVideoLoading, proceedToCollapse])

  // Phase 1 ends: screen is 100% covered by the iris color -> swap content immediately without loading stall
  const handleExpandEnd = useCallback(() => {
    if (pendingScreen) {
      setCurrentScreen(pendingScreen)
      setPendingScreen(null)
    }

    proceedToCollapse()
  }, [pendingScreen, proceedToCollapse])

  // Phase 2 ends: iris has fully reopened -> back to idle
  const handleCollapseEnd = useCallback(() => {
    setTransPhase('idle')
    setIsVideoLoading(false)
  }, [])

  // Robust safety watchdog: guarantees transitions never get stuck on dropped animationend events
  React.useEffect(() => {
    if (transPhase === 'expand') {
      const timer = setTimeout(() => {
        handleExpandEnd()
      }, 350)
      return () => clearTimeout(timer)
    } else if (transPhase === 'collapse') {
      const timer = setTimeout(() => {
        handleCollapseEnd()
      }, 350)
      return () => clearTimeout(timer)
    }
  }, [transPhase, handleExpandEnd, handleCollapseEnd])

  return (
    <div className="relative w-screen h-screen overflow-hidden font-p5Body text-white select-none">
      {/* Persona 5 Authentic Dagger Cursor */}
      <PersonaCursor />

      {/* Video Background with onReady callback */}
      <PersonaVideoBg
        videoSrc={VIDEO_MAP[currentScreen]}
        onReady={handleVideoReady}
      />

      {/* Main Screens: Mounted ONLY when menuReady is true so entrance animation plays from frame 0 in plain sight */}
      <div className="relative z-10 w-full h-full opacity-100">
        {menuReady && currentScreen === 'menu' && (
          <MainMenu
            onSelectScreen={handleSelectScreen}
            initialSelectedScreen={lastVisitedScreen}
          />
        )}
        {currentScreen === 'missions' && (
          <MissionsScreen onBack={handleBackToMenu} />
        )}
        {currentScreen === 'skills' && (
          <SkillsScreen onBack={handleBackToMenu} />
        )}
        {currentScreen === 'about' && (
          <AboutScreen onBack={handleBackToMenu} />
        )}
        {currentScreen === 'callingCard' && (
          <CallingCardScreen onBack={handleBackToMenu} />
        )}
      </div>

      {/* Authentic Persona 5 Initial Loading Screen */}
      {initialLoading && (
        <div
          className={`fixed inset-0 z-[10000] bg-black pointer-events-none transition-opacity duration-300 ease-out ${
            loadingFadingOut ? 'opacity-0' : 'opacity-100'
          }`}
          onTransitionEnd={handleLoadingFadeEnd}
        >
          {/* Subtle Halftone Pattern */}
          <div className="absolute inset-0 bg-[radial-gradient(#262626_1px,transparent_1px)] [background-size:16px_16px] opacity-40 pointer-events-none" />

          {/* Take Your Time Indicator */}
          <TakeYourTime visible={true} />
        </div>
      )}

      {/* Take Your Time during route video loading (if any) */}
      {!initialLoading && isVideoLoading && (
        <TakeYourTime visible={true} />
      )}

      {/* Seamless Persona 5 Iris Circle Wipe Overlay */}
      {transPhase !== 'idle' && (
        <div
          key={transPhase}
          className="fixed inset-0 z-[9999] pointer-events-none will-change-[clip-path]"
          style={{
            backgroundColor: irisColor,
            transform: 'translateZ(0)',
            animation: transPhase === 'expand'
              ? 'iris-expand 0.24s cubic-bezier(0.2, 0, 0, 1) forwards'
              : 'iris-collapse 0.24s cubic-bezier(0.2, 0, 0, 1) forwards',
          }}
          onAnimationEnd={transPhase === 'expand' ? handleExpandEnd : handleCollapseEnd}
        />
      )}
    </div>
  )
}

export default App
