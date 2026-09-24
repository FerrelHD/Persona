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
import { TransitLoadingScreen } from '@/components/common/TransitLoadingScreen'
import { useAssetPreloader } from '@/hooks/useAssetPreloader'

// Accent color per screen - used for the iris overlay tint
const SCREEN_COLOR: Record<ActiveScreen, string> = {
  menu:        '#E60012',
  missions:    '#00D4FF',
  skills:      '#64748B', // Steel Slate Gray / Tech Arsenal
  about:       '#B91C1C',
  callingCard: '#10B981',
}

const VIDEO_MAP: Record<ActiveScreen, string> = {
  menu:        '/assets/videos/joker.mp4',
  missions:    '/assets/videos/makoto.mp4',
  skills:      '/assets/tokyobackground.png',
  about:       '/assets/videos/shinji.mp4',
  callingCard: '/assets/videos/fuuka.mp4',
}

type TransitionPhase = 'idle' | 'expand' | 'collapse'

export function App() {
  // Quietly prefetch all 5 compressed videos and key artwork in background
  useAssetPreloader()

  // Initial atmospheric transit loading screen
  const [initialLoading, setInitialLoading] = useState(true)
  const [loadingFadingOut, setLoadingFadingOut] = useState(false)
  const [menuReady, setMenuReady] = useState(false)

  const [currentScreen, setCurrentScreen] = useState<ActiveScreen>('menu')
  const [lastVisitedScreen, setLastVisitedScreen] = useState<ActiveScreen | null>(null)
  const [pendingScreen, setPendingScreen] = useState<ActiveScreen | null>(null)
  const [transPhase, setTransPhase] = useState<TransitionPhase>('idle')
  const [isVideoLoading, setIsVideoLoading] = useState(false)
  
  const videoReadyRef = useRef(false)
  const minTimerPassedRef = useRef(false)
  const hasTriggeredFadeRef = useRef(false)
  const fallbackTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const { playSlash, playBack } = usePersonaSFX()

  // Called when loading screen fade-out finishes -> mount MainMenu so animation starts from frame 0 in plain sight
  const handleLoadingFadeEnd = useCallback(() => {
    setInitialLoading(false)
    setMenuReady(true)
  }, [])

  // Check if both minimum display time has passed and the background video is playing
  const checkLoadingComplete = useCallback(() => {
    if (hasTriggeredFadeRef.current) return
    if (minTimerPassedRef.current && videoReadyRef.current) {
      hasTriggeredFadeRef.current = true
      playSlash()
      setLoadingFadingOut(true)
    }
  }, [playSlash])

  // Initial loading timer: at least 900ms to appreciate transit animation, and max 2.8s safety fallback
  useEffect(() => {
    const minTimer = setTimeout(() => {
      minTimerPassedRef.current = true
      checkLoadingComplete()
    }, 900)

    const maxTimer = setTimeout(() => {
      if (!hasTriggeredFadeRef.current) {
        hasTriggeredFadeRef.current = true
        playSlash()
        setLoadingFadingOut(true)
      }
    }, 2800)

    return () => {
      clearTimeout(minTimer)
      clearTimeout(maxTimer)
    }
  }, [checkLoadingComplete, playSlash])

  // Safety watchdog for train rush exit animation (380ms animation duration)
  useEffect(() => {
    if (loadingFadingOut && initialLoading) {
      const timer = setTimeout(() => {
        handleLoadingFadeEnd()
      }, 420)
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
    checkLoadingComplete()
  }, [isVideoLoading, proceedToCollapse, checkLoadingComplete])

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
      }, 220)
      return () => clearTimeout(timer)
    } else if (transPhase === 'collapse') {
      const timer = setTimeout(() => {
        handleCollapseEnd()
      }, 220)
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

      {/* Authentic Persona 5 Shibuya Transit Loading Screen */}
      {initialLoading && (
        <TransitLoadingScreen
          isFadingOut={loadingFadingOut}
          onFadeEnd={handleLoadingFadeEnd}
        />
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
              ? 'iris-expand 0.16s cubic-bezier(0.2, 0, 0, 1) forwards'
              : 'iris-collapse 0.16s cubic-bezier(0.2, 0, 0, 1) forwards',
          }}
          onAnimationEnd={transPhase === 'expand' ? handleExpandEnd : handleCollapseEnd}
        />
      )}
    </div>
  )
}

export default App
