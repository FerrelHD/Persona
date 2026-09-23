import React from 'react'

const LETTERS = [
  { char: 'F', bg: 'bg-black text-white border-white', rotate: '-rotate-6', scale: 'scale-105' },
  { char: 'E', bg: 'bg-white text-black border-black', rotate: 'rotate-3', scale: 'scale-100' },
  { char: 'R', bg: 'bg-p5-crimson text-white border-white', rotate: '-rotate-3', scale: 'scale-110' },
  { char: 'R', bg: 'bg-white text-black border-black', rotate: 'rotate-6', scale: 'scale-95' },
  { char: 'E', bg: 'bg-black text-white border-white', rotate: '-rotate-4', scale: 'scale-105' },
  { char: 'L', bg: 'bg-white text-black border-black', rotate: 'rotate-4', scale: 'scale-100' },
]

export const RansomTitle: React.FC = () => {
  return (
    <div className="flex flex-col items-start select-none">
      {/* Small top label */}
      <div className="flex items-center gap-2 mb-1">
        <span className="bg-p5-crimson text-white px-2 py-0.5 text-xs font-p5Sub tracking-widest uppercase -skew-x-12 shadow-[2px_2px_0px_#000000]">
          ★ MIDWNTRR ★
        </span>
        <span className="bg-black text-p5-yellow px-2 py-0.5 text-xs font-p5Sub tracking-widest uppercase border border-p5-yellow -skew-x-6">
          LV.99 DEVELOPER
        </span>
      </div>

      {/* Ransom Letter Tiles */}
      <div className="flex items-center gap-1.5 md:gap-2 my-1 filter drop-shadow-[5px_5px_0px_rgba(0,0,0,0.9)]">
        {LETTERS.map((item, idx) => (
          <div
            key={idx}
            className={`flex items-center justify-center w-12 h-16 md:w-16 md:h-20 laptop-ransom-tile border-[3.5px] font-p5Heading text-4xl md:text-5xl tracking-normal shadow-[4px_4px_0px_#000000] ${item.bg} ${item.rotate} ${item.scale} transition-transform duration-200 hover:scale-125 hover:z-20 cursor-default`}
          >
            {item.char}
          </div>
        ))}
      </div>

      {/* Sub-label banner */}
      <div className="mt-1 flex items-center bg-black border-l-4 border-p5-crimson px-3 py-1 text-xs md:text-sm font-p5Sub tracking-widest text-white -skew-x-6 shadow-[3px_3px_0px_#E60012]">
        PHANTOM HEISTS // FULLSTACK & CREATIVE DEV
      </div>
    </div>
  )
}
