import React, { useState, useEffect } from 'react'
import { PersonaVideoBg } from '@/components/PersonaVideoBg'
import { MainMenu, ActiveScreen } from '@/components/MainMenu'
import { SplashScreen } from '@/components/SplashScreen'
import { MissionsScreen } from '@/components/screens/MissionsScreen'
import { SkillsScreen } from '@/components/screens/SkillsScreen'
import { CallingCardScreen } from '@/components/screens/CallingCardScreen'
import { AboutScreen } from '@/components/screens/AboutScreen'
import { usePersonaSFX } from '@/hooks/usePersonaSFX'

const VIDEO_MAP: Record<ActiveScreen, string> = {
  menu: '/assets/p5r_videos/joker.mp4',
  missions: '/assets/p5r_videos/futaba.mp4',
  skills: '/assets/p5r_videos/makoto.mp4',
  callingCard: '/assets/p5r_videos/ryuji.mp4',
  about: '/assets/p5r_videos/yusuke.mp4',
}

export function App() {
  const [hasStarted, setHasStarted] = useState(false)
  const [currentScreen, setCurrentScreen] = useState<ActiveScreen>('menu')
  const { playSlash, playBack } = usePersonaSFX()

  // Global ESC key listener to return to menu from any sub-screen
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && currentScreen !== 'menu') {
        e.preventDefault()
        playBack()
        setCurrentScreen('menu')
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [currentScreen, playBack])

  const handleSelectScreen = (screen: ActiveScreen) => {
    playSlash()
    setCurrentScreen(screen)
  }

  const handleBackToMenu = () => {
    playBack()
    setCurrentScreen('menu')
  }

  return (
    <div className="relative w-screen h-screen overflow-hidden font-p5Body text-white select-none">
      {/* 1080p Pristine Video Background (No stretch, no crop distortion) */}
      <PersonaVideoBg videoSrc={VIDEO_MAP[currentScreen]} />

      {/* Splash Screen */}
      {!hasStarted ? (
        <SplashScreen onStart={() => setHasStarted(true)} />
      ) : (
        <div className="relative z-10 w-full h-full">
          {/* Main Menu View */}
          {currentScreen === 'menu' && (
            <MainMenu onSelectScreen={handleSelectScreen} />
          )}

          {/* Sub-screens */}
          {currentScreen === 'missions' && (
            <MissionsScreen onBack={handleBackToMenu} />
          )}
          {currentScreen === 'skills' && (
            <SkillsScreen onBack={handleBackToMenu} />
          )}
          {currentScreen === 'callingCard' && (
            <CallingCardScreen onBack={handleBackToMenu} />
          )}
          {currentScreen === 'about' && (
            <AboutScreen onBack={handleBackToMenu} />
          )}
        </div>
      )}
    </div>
  )
}

export default App
