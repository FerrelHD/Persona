import React, { useEffect, useRef, useState } from 'react'

interface Spark {
  id: number
  x: number
  y: number
  angle: number
  size: number
  color: string
}

export const PersonaCursor: React.FC = () => {
  const cursorRef = useRef<HTMLDivElement>(null)
  const [isHovering, setIsHovering] = useState(false)
  const [isClicking, setIsClicking] = useState(false)
  const [sparks, setSparks] = useState<Spark[]>([])
  const [isEnabled, setIsEnabled] = useState(true)

  useEffect(() => {
    // Detect if device supports fine hover (mouse)
    if (window.matchMedia('(hover: none) and (pointer: coarse)').matches) {
      setIsEnabled(false)
      return
    }

    let mouseX = -100
    let mouseY = -100

    const onMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX
      mouseY = e.clientY

      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0)`
      }

      // Check if target or parent is interactive
      const target = e.target as HTMLElement | null
      if (target) {
        const interactive = target.closest('button, a, input, select, textarea, [role="button"], .cursor-pointer, [data-interactive="true"]')
        setIsHovering(!!interactive)
      }
    }

    const onMouseDown = (e: MouseEvent) => {
      setIsClicking(true)

      // Spawn 5 Persona comic slash sparks
      const newSparks: Spark[] = Array.from({ length: 5 }, (_, i) => ({
        id: Date.now() + i,
        x: e.clientX,
        y: e.clientY,
        angle: (i * 72) + (Math.random() * 20 - 10),
        size: Math.random() * 8 + 10,
        color: i % 2 === 0 ? '#E60012' : '#FFFFFF'
      }))

      setSparks(prev => [...prev.slice(-10), ...newSparks])

      setTimeout(() => {
        setSparks(prev => prev.filter(s => !newSparks.some(ns => ns.id === s.id)))
      }, 350)
    }

    const onMouseUp = () => {
      setIsClicking(false)
    }

    window.addEventListener('mousemove', onMouseMove, { passive: true })
    window.addEventListener('mousedown', onMouseDown)
    window.addEventListener('mouseup', onMouseUp)

    return () => {
      window.removeEventListener('mousemove', onMouseMove)
      window.removeEventListener('mousedown', onMouseDown)
      window.removeEventListener('mouseup', onMouseUp)
    }
  }, [])

  if (!isEnabled) return null

  return (
    <div className="pointer-events-none fixed inset-0 z-[9999] overflow-hidden select-none">
      {/* Click Slash Sparks */}
      {sparks.map(spark => (
        <div
          key={spark.id}
          className="absolute -translate-x-1/2 -translate-y-1/2 transition-all duration-300 ease-out"
          style={{
            left: spark.x,
            top: spark.y,
            transform: `translate(-50%, -50%) rotate(${spark.angle}deg) translate(22px) scale(0)`,
            opacity: 0,
            animation: 'p5-spark 0.35s cubic-bezier(0.1, 0.9, 0.2, 1) forwards'
          }}
        >
          {/* Diamond / 4-point Star Spark */}
          <svg width={spark.size} height={spark.size} viewBox="0 0 24 24" className="filter drop-shadow-[1px_1px_0px_#000]">
            <polygon
              points="12,0 15,9 24,12 15,15 12,24 9,15 0,12 9,9"
              fill={spark.color}
              stroke="#000000"
              strokeWidth="2"
            />
          </svg>
        </div>
      ))}

      {/* Main Persona 5 Red Dagger Cursor */}
      <div
        ref={cursorRef}
        className="fixed top-0 left-0 will-change-transform"
        style={{ transform: 'translate3d(-100px, -100px, 0)' }}
      >
        <div
          className={`relative transition-transform duration-100 ease-out ${
            isClicking
              ? 'scale-90 rotate-6'
              : isHovering
              ? 'scale-125 -rotate-12'
              : 'scale-100 rotate-0'
          }`}
        >
          {/* Authentic Persona 5 Crimson Arrow Dagger */}
          <svg
            width="34"
            height="34"
            viewBox="0 0 34 34"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="filter drop-shadow-[2.5px_2.5px_0px_#000000]"
          >
            {/* Outer Dark Shadow Border */}
            <polygon
              points="2,2 2,27 9,21 17,29 22,25 14,17 24,14"
              fill="#E60012"
              stroke="#000000"
              strokeWidth="3.5"
              strokeLinejoin="miter"
            />

            {/* Inner White Contrast Slash Line */}
            <polygon
              points="4,5 4,23 8,19 12,19"
              fill="#FFFFFF"
              opacity="0.9"
            />

            {/* Accent Persona Mini 4-Point Star */}
            <polygon
              points="16,11 17.5,13.5 20,14 17.5,15 16,17.5 15,15 12.5,14 15,13.5"
              fill="#FFFFFF"
              stroke="#000000"
              strokeWidth="1"
            />
          </svg>

          {/* Hover Pulsing Star / Aura Accent */}
          {isHovering && (
            <div className="absolute -top-1 -right-1 bg-white text-p5-crimson font-p5Heading text-[9px] font-black size-4 rounded-full border border-black shadow-[1.5px_1.5px_0px_#000] flex items-center justify-center animate-ping pointer-events-none">
              ★
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
