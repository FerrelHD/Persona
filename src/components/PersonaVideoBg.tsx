import React, { useRef, useEffect, useState } from 'react'

interface PersonaVideoBgProps {
  videoSrc: string
}

// Fallback map to guaranteed tracked P5R videos if specific P3R video is unavailable
const FALLBACK_MAP: Record<string, string> = {
  'Makoto animated wallpaper.mp4': '/assets/p5r_videos/makoto.mp4',
  'Akihiko animated wallpaper.mp4': '/assets/p5r_videos/ryuji.mp4',
  'Shinji animated wallpaper.mp4': '/assets/p5r_videos/futaba.mp4',
  'Fuuka animated wallpaper.mp4': '/assets/p5r_videos/yusuke.mp4',
}

export const PersonaVideoBg: React.FC<PersonaVideoBgProps> = ({ videoSrc }) => {
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

  const handleError = () => {
    // Determine fallback
    const matchedKey = Object.keys(FALLBACK_MAP).find(k => currentSrc.includes(k))
    if (matchedKey && currentSrc !== FALLBACK_MAP[matchedKey]) {
      console.warn(`[PersonaVideoBg] Video failed to load (${currentSrc}). Falling back to ${FALLBACK_MAP[matchedKey]}`)
      setCurrentSrc(FALLBACK_MAP[matchedKey])
    } else if (currentSrc !== '/assets/p5r_videos/joker.mp4') {
      console.warn(`[PersonaVideoBg] Falling back to default Joker video`)
      setCurrentSrc('/assets/p5r_videos/joker.mp4')
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
        onError={handleError}
        className="w-full h-full object-cover object-center select-none"
      />
    </div>
  )
}
