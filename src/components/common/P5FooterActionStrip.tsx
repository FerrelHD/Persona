import React from 'react'

interface P5FooterActionStripProps {
  onReturn?: () => void
  returnLabel?: string
  selectLabel?: string
  navigateLabel?: string
  className?: string
}

export const P5FooterActionStrip: React.FC<P5FooterActionStripProps> = ({
  onReturn,
  returnLabel = 'RETURN',
  selectLabel = 'SELECT',
  navigateLabel = 'NAVIGATE',
  className = '',
}) => {
  return (
    <div className={`fixed bottom-3 sm:bottom-4 left-4 sm:left-8 md:left-12 z-40 select-none pointer-events-auto ${className}`}>
      {/* Persona 5 Iconic Black Action Ribbon */}
      <div className="flex items-center gap-4 sm:gap-6 bg-black/95 px-4 sm:px-6 py-1.5 sm:py-2 border border-white/20 -skew-x-12 shadow-[4px_4px_0px_#000000]">
        <div className="flex items-center gap-4 sm:gap-6 skew-x-12">
          
          {/* NAVIGATE (Yellow Rotating Controller Stick Ring) */}
          <div className="flex items-center gap-2">
            <div className="size-5 sm:size-6 flex items-center justify-center shrink-0">
              <svg viewBox="0 0 24 24" className="w-5 h-5 sm:w-6 sm:h-6" fill="none">
                <path
                  d="M12 3a9 9 0 0 1 8.5 6m0 0l-3-.5m3 .5l.5-3"
                  stroke="#FACC15"
                  strokeWidth="2.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M12 21a9 9 0 0 1-8.5-6m0 0l3 .5m-3-.5l-.5 3"
                  stroke="#FACC15"
                  strokeWidth="2.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <span className="font-p5Heading italic text-white text-xs sm:text-sm md:text-base tracking-wider drop-shadow-[2px_2px_0px_#000]">
              {navigateLabel}
            </span>
          </div>

          {/* SELECT (Cyan X Circle) */}
          <div className="flex items-center gap-2">
            <div className="size-5 sm:size-6 rounded-full border-2 border-cyan-400 bg-black flex items-center justify-center shrink-0 shadow-[0_0_8px_rgba(34,211,238,0.5)]">
              <span className="font-p5Heading italic font-black text-cyan-400 text-xs sm:text-sm leading-none select-none">
                X
              </span>
            </div>
            <span className="font-p5Heading italic text-white text-xs sm:text-sm md:text-base tracking-wider drop-shadow-[2px_2px_0px_#000]">
              {selectLabel}
            </span>
          </div>

          {/* RETURN (Red O Circle) */}
          {onReturn && (
            <button
              type="button"
              onClick={onReturn}
              className="flex items-center gap-2 cursor-pointer hover:scale-105 active:scale-95 transition-transform group"
              title="Return / Back"
            >
              <div className="size-5 sm:size-6 rounded-full border-2 border-p5-crimson bg-black flex items-center justify-center shrink-0 shadow-[0_0_8px_rgba(230,0,18,0.6)] group-hover:bg-p5-crimson transition-colors">
                <span className="font-p5Heading italic font-black text-p5-crimson group-hover:text-white text-xs sm:text-sm leading-none select-none transition-colors">
                  O
                </span>
              </div>
              <span className="font-p5Heading italic text-white group-hover:text-red-400 text-xs sm:text-sm md:text-base tracking-wider drop-shadow-[2px_2px_0px_#000] transition-colors">
                {returnLabel}
              </span>
            </button>
          )}

        </div>
      </div>
    </div>
  )
}
