import React, { useState, useCallback, useRef } from 'react'
import { PersonaVideoBg } from '@/components/PersonaVideoBg'
import { MainMenu, ActiveScreen } from '@/components/MainMenu'
import { SplashScreen } from '@/components/SplashScreen'
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

  const [hasStarted, setHasStarted] = useState(false)
  const [isStartingUp, setIsStartingUp] = useState(false)
  const [currentScreen, setCurrentScreen] = useState<ActiveScreen>('menu')
  const [lastVisitedScreen, setLastVisitedScreen] = useState<ActiveScreen | null>(null)
  const [pendingScreen, setPendingScreen] = useState<ActiveScreen | null>(null)
  const [transPhase, setTransPhase] = useState<TransitionPhase>('idle')
  const [isVideoLoading, setIsVideoLoading] = useState(false)
  
  const videoReadyRef = useRef(false)
  const fallbackTimerRef = useRef<NodeJS.Timeout | null>(null)

  const { playSlash, playBack } = usePersonaSFX()

  // Color of the iris overlay: Crimson #E60012 for startup, or destination screen color
  const irisColor = isStartingUp ? '#E60012' : (pendingScreen ? SCREEN_COLOR[pendingScreen] : SCREEN_COLOR[currentScreen])

  // Triggered when clicking start on the splash screen
  const handleStartGame = useCallback(() => {
    setLastVisitedScreen(null)
    setIsStartingUp(true)
    setTransPhase('expand')
  }, [])

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

  const handleBackToTitle = useCallback(() => {
    playBack()
    setHasStarted(false)
  }, [playBack])

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
    // Only proceed to collapse if we were actively waiting for this video
    if (isVideoLoading) {
      proceedToCollapse()
    }
  }, [isVideoLoading, proceedToCollapse])

  // Phase 1 ends: screen is 100% covered by the iris color -> swap content
  const handleExpandEnd = useCallback(() => {
    if (isStartingUp) {
      setHasStarted(true)
      setIsStartingUp(false)
      proceedToCollapse()
      return
    }

    if (pendingScreen) {
      setCurrentScreen(pendingScreen)
      setPendingScreen(null)
    }

    // If video is already cached and ready to play, collapse immediately!
    if (videoReadyRef.current) {
      proceedToCollapse()
    } else {
      // If still buffering on first load, show authentic "TAKE YOUR TIME"
      setIsVideoLoading(true)
      // Safety timeout: never leave user waiting more than 500ms
      fallbackTimerRef.current = setTimeout(() => {
        proceedToCollapse()
      }, 500)
    }
  }, [isStartingUp, pendingScreen, proceedToCollapse])

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

      {/* Main Screens */}
      <div className={`relative z-10 w-full h-full transition-opacity duration-150 ${!hasStarted ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
        {hasStarted && currentScreen === 'menu' && (
          <MainMenu
            onSelectScreen={handleSelectScreen}
            onBackToTitle={handleBackToTitle}
            initialSelectedScreen={lastVisitedScreen}
            isRevealed={transPhase === 'idle'}
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

      {/* Splash Screen on top (z-50) */}
      {!hasStarted && (
        <SplashScreen onStart={handleStartGame} />
      )}

      {/* Authentic Persona 5 "TAKE YOUR TIME" Loading Indicator */}
      <TakeYourTime visible={isVideoLoading} />

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
