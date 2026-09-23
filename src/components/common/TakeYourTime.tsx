import React from 'react'

interface TakeYourTimeProps {
  visible?: boolean
}

export const TakeYourTime: React.FC<TakeYourTimeProps> = ({ visible = true }) => {
  if (!visible) return null

  return (
    <div
      className="fixed bottom-6 right-6 sm:bottom-8 sm:right-8 z-[10001] pointer-events-none select-none flex items-end gap-3 animate-in fade-in zoom-in-95 duration-200"
    >
      {/* ── AUTHENTIC PERSONA 5 PHANTOM TOP HAT & EYE MASK SVG ── */}
      <div className="relative w-12 h-12 sm:w-14 sm:h-14 flex items-center justify-center">
        <svg
          viewBox="0 0 100 100"
          className="w-full h-full drop-shadow-[3px_3px_0px_#000000]"
          style={{ animation: 'p5-hat-tilt 1.4s ease-in-out infinite' }}
        >
          {/* Halftone / Comic Speed Aura Behind Hat */}
          <circle cx="50" cy="50" r="44" fill="#000000" opacity="0.2" />

          {/* Top Hat Crown */}
          <path
            d="M32 50 L36 18 Q50 14 64 18 L68 50 Z"
            fill="#0F0F0F"
            stroke="#FFFFFF"
            strokeWidth="3.5"
            strokeLinejoin="round"
          />

          {/* Crimson Hat Band */}
          <path
            d="M34 40 L35 48 Q50 50 65 48 L66 40 Q50 42 34 40 Z"
            fill="#E60012"
            stroke="#000000"
            strokeWidth="1.5"
          />

          {/* Top Hat Curved Brim */}
          <path
            d="M14 54 Q50 42 86 54 Q50 62 14 54 Z"
            fill="#1A1A1A"
            stroke="#FFFFFF"
            strokeWidth="3.5"
            strokeLinejoin="round"
          />

          {/* Phantom Thief Sleek Winged Eye Mask */}
          <g transform="translate(0, 4)">
            {/* Mask Body */}
            <path
              d="M26 62 Q36 56 50 60 Q64 56 74 62 Q66 76 50 72 Q34 76 26 62 Z"
              fill="#FFFFFF"
              stroke="#000000"
              strokeWidth="3"
            />
            {/* Left Eye Cutout */}
            <path
              d="M34 64 Q40 62 44 65 Q40 68 34 64 Z"
              fill="#000000"
            />
            {/* Right Eye Cutout */}
            <path
              d="M56 65 Q60 62 66 64 Q60 68 56 65 Z"
              fill="#000000"
            />
          </g>

          {/* Signature P5 4-Point Star Glint on Brim */}
          <path
            d="M74 44 Q76 49 79 50 Q76 51 74 56 Q73 51 70 50 Q73 49 74 44 Z"
            fill="#FFFFFF"
            stroke="#000000"
            strokeWidth="1"
          />
        </svg>
      </div>

      {/* ── AUTHENTIC PERSONA 5 RANSOM "TAKE YOUR TIME" TYPOGRAPHY ── */}
      <div className="flex flex-col items-start font-p5Heading leading-none drop-shadow-[2px_2px_0px_#000000]">
        <div className="flex items-center gap-1">
          {/* TAKE */}
          <span className="bg-white text-black px-1.5 py-0.5 text-xs sm:text-sm font-black -rotate-2 border-1.5 border-black shadow-[2px_2px_0px_#000000]">
            TAKE
          </span>
          {/* YOUR */}
          <span className="bg-p5-crimson text-white px-1.5 py-0.5 text-xs sm:text-sm font-black rotate-2 border-1.5 border-black shadow-[2px_2px_0px_#000000]">
            YOUR
          </span>
        </div>

        <div className="flex items-center gap-1 mt-1">
          {/* TIME */}
          <span className="bg-black text-yellow-300 px-2 py-0.5 text-sm sm:text-base font-black -rotate-1 border-1.5 border-white shadow-[2px_2px_0px_#000000] tracking-wider">
            TIME
          </span>
          {/* Sequential Animated Dots */}
          <span className="flex items-center gap-0.5 text-white font-black text-xs sm:text-sm ml-0.5">
            <span className="animate-pulse delay-0">.</span>
            <span className="animate-pulse delay-150">.</span>
            <span className="animate-pulse delay-300">.</span>
          </span>
        </div>
      </div>
    </div>
  )
}
