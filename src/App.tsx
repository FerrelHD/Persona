import React, { useState, useCallback } from 'react'
import { PersonaVideoBg } from '@/components/PersonaVideoBg'
import { MainMenu, ActiveScreen } from '@/components/MainMenu'
import { SplashScreen } from '@/components/SplashScreen'
import { MissionsScreen } from '@/components/screens/MissionsScreen'
import { SkillsScreen } from '@/components/screens/SkillsScreen'
import { CallingCardScreen } from '@/components/screens/CallingCardScreen'
import { AboutScreen } from '@/components/screens/AboutScreen'
import { usePersonaSFX } from '@/hooks/usePersonaSFX'

// Accent color per screen - used for the iris overlay tint between sub-screens
const SCREEN_COLOR: Record<ActiveScreen, string> = {
  menu:        '#E60012',
  missions:    '#00D4FF',
  skills:      '#E60012',
  about:       '#B91C1C',
  callingCard: '#10B981',
}

const VIDEO_MAP: Record<ActiveScreen, string> = {
  menu:        '/assets/p5r_videos/joker.mp4',
  missions:    '/assets/p3r_videos/Makoto animated wallpaper.mp4',
  skills:      '/assets/p3r_videos/Akihiko animated wallpaper.mp4',
  about:       '/assets/p3r_videos/Shinji animated wallpaper.mp4',
  callingCard: '/assets/p3r_videos/Fuuka animated wallpaper.mp4',
}

type TransitionPhase = 'idle' | 'expand' | 'collapse'

export function App() {
  const [hasStarted, setHasStarted] = useState(false)
  const [currentScreen, setCurrentScreen] = useState<ActiveScreen>('menu')
  const [pendingScreen, setPendingScreen] = useState<ActiveScreen | null>(null)
  const [transPhase, setTransPhase] = useState<TransitionPhase>('idle')
  const { playSlash, playBack } = usePersonaSFX()

  // Color of the iris overlay is the destination screen color
  const irisColor = pendingScreen ? SCREEN_COLOR[pendingScreen] : SCREEN_COLOR[currentScreen]

  // Option 1: Direct Slash Reveal - SplashScreen cleanly transitions into MainMenu
  const handleStartGame = useCallback(() => {
    setHasStarted(true)
  }, [])

  const navigateTo = useCallback((next: ActiveScreen, sfx?: () => void) => {
    if (transPhase !== 'idle') return
    sfx?.()
    setPendingScreen(next)
    setTransPhase('expand')
  }, [transPhase])

  const handleSelectScreen = useCallback((screen: ActiveScreen) => {
    navigateTo(screen, playSlash)
  }, [navigateTo, playSlash])

  const handleBackToMenu = useCallback(() => {
    navigateTo('menu', playBack)
  }, [navigateTo, playBack])

  // Phase 1 ends: screen is 100% covered by the iris color -> swap content, start collapse instantly
  const handleExpandEnd = useCallback(() => {
    if (pendingScreen) {
      setCurrentScreen(pendingScreen)
      setPendingScreen(null)
    }
    requestAnimationFrame(() => {
      setTransPhase('collapse')
    })
  }, [pendingScreen])

  // Phase 2 ends: iris has fully reopened -> back to idle
  const handleCollapseEnd = useCallback(() => {
    setTransPhase('idle')
  }, [])

  return (
    <div className="relative w-screen h-screen overflow-hidden font-p5Body text-white select-none">
      {/* Video Background */}
      <PersonaVideoBg videoSrc={VIDEO_MAP[currentScreen]} />

      {/* Splash Screen or Main App Screens - Strictly Conditional to prevent any background leak */}
      {!hasStarted ? (
        <SplashScreen onStart={handleStartGame} />
      ) : (
        <div className="relative z-10 w-full h-full">
          {currentScreen === 'menu' && (
            <MainMenu onSelectScreen={handleSelectScreen} />
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
      )}

      {/* ── Sub-screen Iris Circle Wipe Overlay ── */}
      {transPhase !== 'idle' && (
        <div
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
