import React, { useRef, useEffect } from 'react'

interface PersonaVideoBgProps {
  videoSrc: string
}

export const PersonaVideoBg: React.FC<PersonaVideoBgProps> = ({ videoSrc }) => {
  const videoRef = useRef<HTMLVideoElement>(null!)

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.muted = true
      videoRef.current.defaultMuted = true
      videoRef.current.play().catch(() => {
        // Fallback or ignore if user interaction required
      })
    }
  }, [videoSrc])

  return (
    <div className="fixed inset-0 z-0 w-screen h-screen overflow-hidden pointer-events-none bg-black flex items-center justify-center">
      {/* 
        Video element:
        - object-cover ensures fullscreen immersion without letterboxing or squishing
        - preserves 16:9 cinematic aspect ratio seamlessly
      */}
      <video
        ref={videoRef}
        key={videoSrc}
        src={videoSrc}
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        className="w-full h-full object-cover object-center select-none"
      />
    </div>
  )
}
