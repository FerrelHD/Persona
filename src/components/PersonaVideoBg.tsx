import React, { useRef, useEffect } from 'react'

interface PersonaVideoBgProps {
  videoSrc?: string
}

export const PersonaVideoBg: React.FC<PersonaVideoBgProps> = ({ 
  videoSrc = '/assets/p5r_videos/joker.mp4' 
}) => {
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    const video = videoRef.current
    if (video) {
      video.muted = true
      video.defaultMuted = true
      video.playbackRate = 1.0
      const playPromise = video.play()
      if (playPromise !== undefined) {
        playPromise.catch((err) => {
          console.warn('Video play deferred or blocked:', err)
        })
      }
    }
  }, [videoSrc])

  return (
    <div className="fixed inset-0 w-screen h-screen overflow-hidden z-0 bg-black pointer-events-none select-none">
      <video
        ref={videoRef}
        key={videoSrc}
        src={videoSrc}
        autoPlay
        muted
        defaultMuted
        loop
        playsInline
        preload="auto"
        className="w-full h-full object-cover object-center"
      />

      {/* Comic Halftone Overlay */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-15"
        style={{
          backgroundImage: 'radial-gradient(circle, #000000 1.2px, transparent 1.2px)',
          backgroundSize: '10px 10px'
        }}
      />
    </div>
  )
}
