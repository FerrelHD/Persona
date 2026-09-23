import React from 'react'
import { TakeYourTime } from '@/components/common/TakeYourTime'

interface TransitLoadingScreenProps {
  isFadingOut: boolean
  onFadeEnd: () => void
}

export const TransitLoadingScreen: React.FC<TransitLoadingScreenProps> = ({
  isFadingOut,
  onFadeEnd,
}) => {
  return (
    <div
      className={`fixed inset-0 z-[10000] bg-[#0c0c0e] overflow-hidden select-none pointer-events-none transition-opacity duration-300 ease-out ${
        isFadingOut ? 'opacity-0' : 'opacity-100'
      }`}
      onTransitionEnd={onFadeEnd}
    >
      {/* ── BACKGROUND: Persona 5 Crimson Jagged Slash ── */}
      <div
        className="absolute inset-0 bg-[#E60012] pointer-events-none transform -skew-x-12 translate-x-12 sm:translate-x-24 scale-110 opacity-95 shadow-[0_0_80px_rgba(230,0,18,0.5)]"
        style={{
          clipPath: 'polygon(15% 0%, 100% 0%, 85% 100%, 0% 100%)',
        }}
      />

      {/* Halftone Comic Dots Pattern over the Crimson Wedge */}
      <div className="absolute inset-0 bg-[radial-gradient(#000000_2.2px,transparent_2.2px)] [background-size:16px_16px] opacity-25 pointer-events-none" />

      {/* Retro TV Scanlines */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0)_50%,rgba(0,0,0,0.35)_50%)] [background-size:100%_4px] pointer-events-none opacity-40" />

      {/* ── TOP BANNER: Shibuya Station / Metaverse Commute Ticker ── */}
      <div className="absolute top-6 sm:top-8 left-6 sm:left-10 z-20 flex flex-col items-start gap-1">
        {/* Slanted Danger Bar */}
        <div className="flex items-center gap-2">
          <div className="h-4 w-12 sm:w-16 bg-[repeating-linear-gradient(45deg,#000,#000_6px,#FEE000_6px,#FEE000_12px)] -skew-x-12 border border-black shadow-[2px_2px_0px_#000000]" />
          <span className="bg-black text-[#FEE000] px-2.5 py-0.5 text-[11px] sm:text-xs font-p5Sub font-bold tracking-widest uppercase -skew-x-12 border border-[#FEE000] shadow-[2px_2px_0px_#000000]">
            SHIBUYA TRANSIT LINE
          </span>
        </div>

        {/* Station Target Banner */}
        <div className="bg-black text-white px-3.5 sm:px-4 py-1 text-xs sm:text-sm font-p5Sub tracking-wider uppercase -skew-x-12 border-l-4 border-[#E60012] shadow-[3px_3px_0px_#E60012] mt-1">
          <span className="text-[#E60012] font-black mr-2">BOUND FOR:</span>
          <span>FERREL'S PALACE // YONGEN-JAYA</span>
        </div>
      </div>

      {/* ── CENTER: Subway Train Station Silhouette & Commuter Silhouettes ── */}
      <div className="absolute inset-x-0 bottom-16 sm:bottom-20 z-10 flex flex-col pointer-events-none">
        {/* Silhouette Platform Figures */}
        <div className="relative w-full h-36 sm:h-44 overflow-hidden flex items-end">
          {/* Commuter Silhouettes Moving Across Platform */}
          <div className="absolute bottom-2 left-0 right-0 flex items-end justify-between px-8 sm:px-16 opacity-85">
            {/* Silhouette 1: Business commuter walking left with briefcase */}
            <div
              className="flex flex-col items-center"
              style={{ animation: 'p5-walk-bob 1.1s ease-in-out infinite' }}
            >
              <svg viewBox="0 0 60 120" className="w-10 sm:w-12 h-20 sm:h-24 fill-black drop-shadow-[2px_2px_0px_rgba(230,0,18,0.4)]">
                {/* Head with fedora hat */}
                <circle cx="30" cy="18" r="9" />
                <path d="M18 18 Q30 10 42 18 Z" />
                {/* Torso & Trench Coat */}
                <path d="M22 28 L38 28 L42 78 L18 78 Z" />
                {/* Legs */}
                <rect x="22" y="78" width="6" height="34" />
                <rect x="32" y="78" width="6" height="32" />
                {/* Briefcase */}
                <rect x="42" y="55" width="12" height="18" rx="2" />
              </svg>
            </div>

            {/* Silhouette 2: Center - Joker with signature wild hair and flapping trench coat */}
            <div
              className="flex flex-col items-center translate-y-1 sm:translate-y-0"
              style={{ animation: 'p5-walk-bob 0.95s ease-in-out infinite 0.15s' }}
            >
              <svg viewBox="0 0 90 140" className="w-18 sm:w-22 h-28 sm:h-34 fill-black drop-shadow-[4px_4px_0px_#E60012]">
                {/* Wild Spiky Joker Hair & Mask Glint */}
                <path d="M45 10 Q32 14 36 26 Q24 24 28 36 Q38 42 45 42 Q52 42 62 36 Q66 24 54 26 Q58 14 45 10 Z" />
                {/* Joker Sleek High Collar & Flapping Coat Tail */}
                <path d="M30 40 L60 40 L68 95 Q78 115 88 128 L64 125 L50 95 L36 125 L12 128 Q22 115 32 95 Z" />
                {/* Legs walking forward */}
                <path d="M38 95 L34 135 L42 135 L46 95 Z" />
                <path d="M52 95 L56 132 L64 132 L58 95 Z" />
                {/* Eye Mask Slit White Highlight */}
                <ellipse cx="45" cy="27" rx="6" ry="2.5" fill="#FFFFFF" />
              </svg>
            </div>

            {/* Silhouette 3: Morgana in cat form trotting with curved tail */}
            <div
              className="flex flex-col items-center"
              style={{ animation: 'p5-walk-bob 0.8s ease-in-out infinite 0.3s' }}
            >
              <svg viewBox="0 0 60 60" className="w-10 sm:w-12 h-10 sm:h-12 fill-black drop-shadow-[2px_2px_0px_#FEE000]">
                {/* Cat Ears & Head */}
                <circle cx="28" cy="24" r="11" />
                <polygon points="20,16 23,8 26,16" />
                <polygon points="30,16 33,8 36,16" />
                {/* Body & Paws */}
                <ellipse cx="28" cy="38" rx="14" ry="10" />
                <rect x="18" y="44" width="4" height="12" rx="2" />
                <rect x="34" y="44" width="4" height="12" rx="2" />
                {/* High S-Curved Tail */}
                <path d="M40 36 Q54 28 50 14 Q46 8 42 12" stroke="black" strokeWidth="5" fill="none" strokeLinecap="round" />
                {/* Yellow Scarf/Collar */}
                <path d="M22 30 Q28 34 34 30" stroke="#FEE000" strokeWidth="3" fill="none" />
              </svg>
            </div>

            {/* Silhouette 4: Student with headphones / commuter */}
            <div
              className="hidden md:flex flex-col items-center"
              style={{ animation: 'p5-walk-bob 1.05s ease-in-out infinite 0.4s' }}
            >
              <svg viewBox="0 0 60 120" className="w-10 h-22 fill-black drop-shadow-[2px_2px_0px_rgba(230,0,18,0.4)]">
                {/* Head with headphones */}
                <circle cx="30" cy="18" r="8" />
                <path d="M20 18 Q30 8 40 18" stroke="#FFFFFF" strokeWidth="2.5" fill="none" />
                <rect x="18" y="14" width="3" height="8" rx="1" fill="#FFFFFF" />
                <rect x="39" y="14" width="3" height="8" rx="1" fill="#FFFFFF" />
                {/* School Uniform / Jacket */}
                <path d="M20 28 L40 28 L43 72 L17 72 Z" />
                <rect x="22" y="72" width="6" height="38" />
                <rect x="32" y="72" width="6" height="36" />
              </svg>
            </div>
          </div>
        </div>

        {/* Platform Floor Border: Authentic High-Contrast Subway Line */}
        <div className="w-full h-3 bg-black border-t-2 border-white flex items-center justify-between px-4">
          <div className="w-full h-1 bg-[repeating-linear-gradient(90deg,#E60012,#E60012_24px,#000_24px,#000_40px)]" />
        </div>
      </div>

      {/* ── BOTTOM LEFT: Cognition Syncing / Infiltration Status ── */}
      <div className="absolute bottom-6 sm:bottom-8 left-6 sm:left-10 z-20 flex items-center gap-2">
        <span className="w-2.5 h-2.5 bg-[#E60012] rotate-45 animate-ping" />
        <span className="font-p5Sub text-xs sm:text-sm text-white tracking-widest uppercase drop-shadow-[2px_2px_0px_#000000]">
          SYNCING COGNITION // PREPARING THE HEIST
        </span>
      </div>

      {/* ── BOTTOM RIGHT: Authentic Persona 5 "Take Your Time" Logo ── */}
      <TakeYourTime visible={true} />
    </div>
  )
}
