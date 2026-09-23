import React, { useRef, useEffect, useState } from 'react'

interface PersonaVideoBgProps {
  videoSrc: string
  onReady?: () => void
}

export const PersonaVideoBg: React.FC<PersonaVideoBgProps> = ({ videoSrc, onReady }) => {
  const videoRef = useRef<HTMLVideoElement>(null!)
  const [currentSrc, setCurrentSrc] = useState(videoSrc)

  useEffect(() => {
    setCurrentSrc(videoSrc)
  }, [videoSrc])

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.muted = true
      videoRef.current.defaultMuted = true
      videoRef.current.play().catch(() => {
        // Fallback or ignore if user interaction required
      })
    }
  }, [currentSrc])

  const handlePlaying = () => {
    onReady?.()
  }

  const handleError = () => {
    if (currentSrc !== '/assets/videos/joker.mp4') {
      console.warn(`[PersonaVideoBg] Video failed to load (${currentSrc}). Falling back to default Joker video`)
      setCurrentSrc('/assets/videos/joker.mp4')
    }
  }

  return (
    <div className="fixed inset-0 z-0 w-screen h-screen overflow-hidden pointer-events-none bg-black flex items-center justify-center">
      {/* 
        Video element:
        - object-cover ensures fullscreen immersion without letterboxing or squishing
        - preserves 16:9 cinematic aspect ratio seamlessly
      */}
      <video
        ref={videoRef}
        key={currentSrc}
        src={currentSrc}
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        onPlaying={handlePlaying}
        onCanPlay={handlePlaying}
        onError={handleError}
        className="w-full h-full object-cover object-center select-none"
      />
    </div>
  )
}
