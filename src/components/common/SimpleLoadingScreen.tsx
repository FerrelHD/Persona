import React from 'react'

interface SimpleLoadingScreenProps {
  progress: number
  isFadingOut: boolean
}

export const SimpleLoadingScreen: React.FC<SimpleLoadingScreenProps> = ({
  progress,
  isFadingOut,
}) => {
  return (
    <div
      className={`fixed inset-0 z-[10000] bg-[#001233] flex flex-col items-center justify-center select-none pointer-events-none transition-opacity duration-250 ${
        isFadingOut ? 'opacity-0' : 'opacity-100'
      }`}
    >
      {/* Center Minimal P3R Circular Loader & Percentage */}
      <div className="relative flex flex-col items-center justify-center">
        {/* Outer Rotating Ring */}
        <div className="relative size-24 sm:size-28 flex items-center justify-center">
          <svg className="size-full animate-spin [animation-duration:2.5s]" viewBox="0 0 100 100">
            <circle
              cx="50"
              cy="50"
              r="44"
              fill="none"
              stroke="rgba(22, 207, 251, 0.2)"
              strokeWidth="3"
            />
            <circle
              cx="50"
              cy="50"
              r="44"
              fill="none"
              stroke="#16cffb"
              strokeWidth="3.5"
              strokeDasharray="90 180"
              strokeLinecap="round"
            />
          </svg>

          {/* Inner Counter-Rotating Orbit */}
          <svg className="absolute size-16 animate-spin [animation-duration:1.6s] [animation-direction:reverse]" viewBox="0 0 60 60">
            <circle
              cx="30"
              cy="30"
              r="24"
              fill="none"
              stroke="rgba(255, 255, 255, 0.25)"
              strokeWidth="2"
              strokeDasharray="40 80"
              strokeLinecap="round"
            />
          </svg>

          {/* Central Percentage */}
          <div className="absolute inset-0 flex items-center justify-center">
            <span
              className="text-xl sm:text-2xl font-black italic text-white tracking-tighter"
              style={{
                fontFamily: 'var(--font-rodin)',
              }}
            >
              {progress}%
            </span>
          </div>
        </div>

        {/* Minimal Progress Line */}
        <div className="w-36 sm:w-44 h-1 bg-[#031f64] border border-[#16cffb]/30 rounded-full overflow-hidden mt-6">
          <div
            className="h-full bg-gradient-to-r from-[#0099ff] to-[#16cffb] transition-all duration-150 ease-out rounded-full"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* Status Text */}
        <div
          className="mt-3 text-[10px] sm:text-[11px] font-bold tracking-[0.25em] text-[#16cffb]/80 uppercase"
          style={{ fontFamily: 'var(--font-rodin)' }}
        >
          LOADING SYSTEM DATA...
        </div>
      </div>
    </div>
  )
}

