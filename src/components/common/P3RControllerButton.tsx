import React from 'react'
import { usePersona3SFX } from '@/hooks/usePersona3SFX'

export type P3RButtonSymbol = 'cross' | 'circle' | 'triangle' | 'square'

interface P3RControllerButtonProps {
  symbol?: P3RButtonSymbol
  label: string
  onClick?: (e: React.MouseEvent) => void
  href?: string
  target?: string
  rel?: string
  title?: string
  customIcon?: React.ReactNode
  customColor?: string
  className?: string
}

const SYMBOL_CONFIG: Record<
  P3RButtonSymbol,
  {
    color: string
    shadow: string
    hoverText: string
    render: () => React.ReactNode
  }
> = {
  cross: {
    color: '#22d3ee',
    shadow: 'rgba(34, 211, 238, 0.6)',
    hoverText: 'group-hover:text-cyan-300',
    render: () => (
      <svg
        viewBox="0 0 16 16"
        className="size-3.5 text-[#22d3ee] group-hover:text-white transition-colors"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.6"
        strokeLinecap="round"
      >
        <line x1="4" y1="4" x2="12" y2="12" />
        <line x1="12" y1="4" x2="4" y2="12" />
      </svg>
    ),
  },
  circle: {
    color: '#ef4444',
    shadow: 'rgba(239, 68, 68, 0.6)',
    hoverText: 'group-hover:text-red-300',
    render: () => (
      <svg
        viewBox="0 0 16 16"
        className="size-3.5 text-[#ef4444] group-hover:text-white transition-colors"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.6"
      >
        <circle cx="8" cy="8" r="4.8" />
      </svg>
    ),
  },
  triangle: {
    color: '#34d399',
    shadow: 'rgba(52, 211, 153, 0.6)',
    hoverText: 'group-hover:text-emerald-300',
    render: () => (
      <svg
        viewBox="0 0 16 16"
        className="size-3.5 text-[#34d399] group-hover:text-white transition-colors"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.4"
        strokeLinejoin="round"
      >
        <polygon points="8,3.2 13.5,13 2.5,13" />
      </svg>
    ),
  },
  square: {
    color: '#f43f5e',
    shadow: 'rgba(244, 63, 94, 0.6)',
    hoverText: 'group-hover:text-rose-300',
    render: () => (
      <svg
        viewBox="0 0 16 16"
        className="size-3.5 text-[#f43f5e] group-hover:text-white transition-colors"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.4"
      >
        <rect x="3.4" y="3.4" width="9.2" height="9.2" rx="0.8" />
      </svg>
    ),
  },
}

export const P3RControllerButton: React.FC<P3RControllerButtonProps> = ({
  symbol = 'cross',
  label,
  onClick,
  href,
  target,
  rel,
  title,
  customIcon,
  customColor,
  className = '',
}) => {
  const { playNavSFX } = usePersona3SFX()
  const conf = SYMBOL_CONFIG[symbol]

  const borderColor = customColor || conf.color
  const shadowColor = customColor ? `${customColor}80` : conf.shadow
  const hoverTextClass = customColor ? 'group-hover:text-white' : conf.hoverText

  const innerContent = (
    <>
      <div
        className="size-6 shrink-0 rounded-full bg-[#001845]/90 border-2 flex items-center justify-center group-hover:border-white transition-all duration-150"
        style={{
          borderColor,
          boxShadow: `0 0 10px ${shadowColor}`,
        }}
      >
        {customIcon ? customIcon : conf.render()}
      </div>

      <span
        className={`text-xs sm:text-sm uppercase tracking-wider font-black italic text-white ${hoverTextClass} transition-colors select-none`}
        style={{
          fontFamily: 'var(--font-rodin)',
          textShadow: '0 2px 8px rgba(0,0,0,0.8)',
        }}
      >
        {label}
      </span>
    </>
  )

  const commonClasses = `flex gap-2 items-center group cursor-pointer hover:scale-105 active:scale-95 transition-transform outline-none bg-transparent border-none p-0 ${className}`

  if (href) {
    return (
      <a
        href={href}
        target={target}
        rel={rel}
        title={title}
        onMouseEnter={() => playNavSFX()}
        className={commonClasses}
      >
        {innerContent}
      </a>
    )
  }

  return (
    <button
      type="button"
      onClick={onClick}
      title={title}
      onMouseEnter={() => playNavSFX()}
      className={commonClasses}
    >
      {innerContent}
    </button>
  )
}

