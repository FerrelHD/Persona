import React from 'react'

interface PhantomDaggerProps {
  className?: string
}

export const PhantomDagger: React.FC<PhantomDaggerProps> = ({ className = '' }) => {
  return (
    <div className={`relative select-none pointer-events-none filter drop-shadow-[5px_5px_0px_#000000] ${className}`}>
      <svg
        viewBox="0 0 140 180"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full overflow-visible"
      >
        {/* Drop Shadow Backing Silhouette */}
        <g transform="translate(4, 4)" opacity="0.3">
          <path
            d="M 68 0 C 60 0, 52 8, 55 24 L 52 75 C 44 72, 30 76, 26 84 C 22 92, 34 100, 48 98 L 62 100 L 72 175 L 82 100 L 96 98 C 110 100, 122 92, 118 84 C 114 76, 100 72, 92 75 L 89 24 C 92 8, 84 0, 76 0 Z"
            fill="#000000"
          />
        </g>

        {/* ── DAGGER BLADE ── */}
        {/* Left / Highlight Facet */}
        <polygon
          points="70,98 52,100 70,172"
          fill="#FFFFFF"
          stroke="#000000"
          strokeWidth="3.5"
          strokeLinejoin="round"
        />
        {/* Right / Shaded Facet */}
        <polygon
          points="70,98 88,100 70,172"
          fill="#A1A1AA"
          stroke="#000000"
          strokeWidth="3.5"
          strokeLinejoin="round"
        />
        {/* Blade Center Spine Line */}
        <line
          x1="70"
          y1="98"
          x2="70"
          y2="172"
          stroke="#000000"
          strokeWidth="3"
        />

        {/* ── CROSSGUARD ── */}
        {/* Ornate Curved Crossguard Body */}
        <path
          d="M 22 86 C 26 76, 44 76, 54 82 C 60 84, 65 84, 70 84 C 75 84, 80 84, 86 82 C 96 76, 114 76, 118 86 C 122 96, 106 102, 94 98 C 84 96, 78 96, 70 96 C 62 96, 56 96, 46 98 C 34 102, 18 96, 22 86 Z"
          fill="#FFFFFF"
          stroke="#000000"
          strokeWidth="4"
          strokeLinejoin="round"
        />
        {/* Crossguard Metallic Inner Ring */}
        <ellipse
          cx="70"
          cy="90"
          rx="12"
          ry="5"
          fill="#E60012"
          stroke="#000000"
          strokeWidth="2.5"
        />

        {/* ── GRIP / HANDLE ── */}
        {/* Curved Hilt Body */}
        <path
          d="M 58 22 C 55 40, 56 60, 58 84 L 82 84 C 84 60, 85 40, 82 22 Z"
          fill="#0B0B0B"
          stroke="#000000"
          strokeWidth="4"
          strokeLinejoin="round"
        />

        {/* Grip Wrapping Ridges (White Band Highlights) */}
        <path d="M 58 35 Q 70 40 82 35" stroke="#FFFFFF" strokeWidth="2.5" fill="none" />
        <path d="M 58 50 Q 70 55 82 50" stroke="#FFFFFF" strokeWidth="2.5" fill="none" />
        <path d="M 58 65 Q 70 70 82 65" stroke="#FFFFFF" strokeWidth="2.5" fill="none" />
        <path d="M 58 78 Q 70 82 82 78" stroke="#FFFFFF" strokeWidth="2.5" fill="none" />

        {/* ── PHANTOM THIEVES "P" EMBLEM ON GRIP ── */}
        <g transform="translate(62, 42)">
          {/* Flame background glow behind P */}
          <path
            d="M 8 -4 C 14 -2, 17 4, 15 10 C 13 16, 8 20, 2 18 C -3 16, -1 10, 2 6 C 3 4, 5 -1, 8 -4 Z"
            fill="#E60012"
          />
          {/* Stylized Persona "P" */}
          <text
            x="7"
            y="14"
            fill="#FFFFFF"
            fontSize="16"
            fontFamily="'Dela Gothic One', 'Bangers', Impact, sans-serif"
            fontWeight="900"
            textAnchor="middle"
            stroke="#000000"
            strokeWidth="2"
            paintOrder="stroke fill"
          >
            P
          </text>
        </g>

        {/* ── POMMEL ── */}
        {/* Top Ornate Skull / Crown Cap */}
        <path
          d="M 58 22 C 58 10, 64 2, 70 2 C 76 2, 82 10, 82 22 C 82 25, 78 27, 70 27 C 62 27, 58 25, 58 22 Z"
          fill="#FFFFFF"
          stroke="#000000"
          strokeWidth="3.5"
          strokeLinejoin="round"
        />
        <circle cx="70" cy="14" r="3.5" fill="#000000" />
      </svg>
    </div>
  )
}
