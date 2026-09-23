import { P5FooterActionStrip } from '@/components/common/P5FooterActionStrip'
﻿import React, { useState, useEffect } from 'react'
import { PageCutoutOverlay } from '@/components/common/PageCutoutOverlay'
import { MISSIONS_DATA, Mission } from '@/data/personaData'
import { usePersonaSFX } from '@/hooks/usePersonaSFX'
import { ExternalLink, X } from 'lucide-react'

const GithubIcon: React.FC = () => (
  <svg className="size-4" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
  </svg>
)

// Decorative 5-point star SVG
const StarIcon: React.FC<{ className?: string; fill?: string }> = ({ className = 'size-4', fill = '#ffffff' }) => (
  <svg viewBox="0 0 24 24" className={className} fill={fill}>
    <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26" />
  </svg>
)

// Starburst Lens Flare radiating across the active card with zero clipping
const StarLensBurst: React.FC = () => (
  <div className="absolute -left-6 sm:-left-8 top-1/2 -translate-y-1/2 w-36 h-36 pointer-events-none z-20 flex items-center justify-center">
    {/* Horizontal ray beam */}
    <div className="absolute w-56 h-1 bg-gradient-to-r from-transparent via-white to-transparent opacity-90 rotate-12" />
    {/* Vertical ray beam */}
    <div className="absolute h-56 w-1 bg-gradient-to-b from-transparent via-white to-transparent opacity-90 -rotate-12" />
    {/* Core star diamond */}
    <div className="size-6 bg-white rotate-45 shadow-[0_0_16px_#ffffff]" />
  </div>
)

// COMPLETED Typography with stars inside O and D
const CompletedTitle: React.FC = () => (
  <div className="relative inline-flex items-center text-white font-p5Heading text-5xl sm:text-6xl md:text-7xl lg:text-8xl tracking-wider select-none drop-shadow-[5px_5px_0px_#000000]">
    <span>C</span>
    {/* O with Star cutout */}
    <span className="relative inline-flex items-center justify-center">
      <span>O</span>
      <span className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <StarIcon className="size-4 sm:size-6 text-black fill-black" />
      </span>
    </span>
    <span>MPLETE</span>
    {/* D with Star cutout */}
    <span className="relative inline-flex items-center justify-center">
      <span>D</span>
      <span className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <StarIcon className="size-3.5 sm:size-5 text-black fill-black" />
      </span>
    </span>
    <span className="text-3xl sm:text-4xl md:text-5xl ml-1 self-start">.</span>
  </div>
)

interface MissionsScreenProps {
  onBack: () => void
}

export const MissionsScreen: React.FC<MissionsScreenProps> = ({ onBack }) => {
  const { playHover, playSlash, playBack } = usePersonaSFX()
  const [selectedIndex, setSelectedIndex] = useState(0)
  const [showDossierModal, setShowDossierModal] = useState(false)

  const activeMission: Mission = MISSIONS_DATA[selectedIndex]

  // Keyboard navigation: Up / Down arrow to switch slots, Enter to open Demo, Esc to back
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (showDossierModal) {
        if (e.key === 'Escape') {
          e.preventDefault()
          playBack()
          setShowDossierModal(false)
        }
        return
      }

      if (e.key === 'ArrowDown') {
        e.preventDefault()
        playHover()
        setSelectedIndex(prev => (prev + 1) % MISSIONS_DATA.length)
      } else if (e.key === 'ArrowUp') {
        e.preventDefault()
        playHover()
        setSelectedIndex(prev => (prev - 1 + MISSIONS_DATA.length) % MISSIONS_DATA.length)
      } else if (e.key === 'Enter') {
        e.preventDefault()
        playSlash()
        if (activeMission.liveUrl) {
          window.open(activeMission.liveUrl, '_blank')
        } else {
          setShowDossierModal(true)
        }
      } else if (e.key === ' ' || e.key.toLowerCase() === 'd') {
        e.preventDefault()
        playSlash()
        setShowDossierModal(true)
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [playHover, playSlash, playBack, activeMission, showDossierModal])

  return (
    <div className="fixed inset-0 z-30 flex flex-col justify-between select-none overflow-hidden bg-gradient-to-r from-black/95 from-0% via-black/80 via-35% to-transparent to-55% animate-in fade-in duration-300">
      {/* Background Halftone - Left half only */}
      <div
        className="absolute inset-0 pointer-events-none opacity-20"
        style={{
          backgroundImage: 'radial-gradient(#E60012 1.5px, transparent 1.5px)',
          backgroundSize: '12px 12px',
          maskImage: 'linear-gradient(to right, black 35%, transparent 70%)',
          WebkitMaskImage: 'linear-gradient(to right, black 35%, transparent 70%)',
        }}
      />

      {/* Top Header Prompt & Menu Title */}
      <PageCutoutOverlay
        title="DEPLOYED MISSIONS"
        characterRole="PROTAGONIST"
        characterName="MAKOTO YUKI"
        accentColor="cyan" hideBottomLegend={true}
        onBack={onBack}
      />

      {/* Top Right Difficulty / Status Badge */}
      <div className="fixed top-4 right-6 z-40 hidden sm:flex items-center gap-2">
        <span className="font-p5Heading text-2xl lg:text-3xl text-white tracking-widest drop-shadow-[3px_3px_0px_#000]">
          Lv <span className="text-cyan-400">{activeMission.level}</span>
        </span>
        <span className="font-p5Sub text-xs text-zinc-400 tracking-wider bg-black/80 px-2.5 py-1 border border-zinc-700">
          HEIST ARCHIVE
        </span>
      </div>

      {/* ── MAIN SLANTED SAVE SLOTS DECK (No clipping, natural Persona slant) ── */}
      <div className="flex-1 flex flex-col justify-center items-start w-full max-w-4xl lg:max-w-[58%] pl-6 sm:pl-10 md:pl-14 lg:pl-16 z-20 py-12 sm:py-16 overflow-visible">
        <div className="w-full flex flex-col gap-3.5 sm:gap-4.5 justify-center overflow-visible">
          {MISSIONS_DATA.map((mission, idx) => {
            const isSelected = idx === selectedIndex
            const diff = idx - selectedIndex
            // Only show slots near selected index
            if (Math.abs(diff) > 2) return null

            return isSelected ? (
              /* ── ACTIVE SELECTED SLOT (Expanded Red Banner - Zero Clipping) ── */
              <div
                key={mission.id}
                onClick={() => playSlash()}
                className="relative w-full bg-p5-crimson border-4 sm:border-[5px] border-black shadow-[10px_10px_0px_#000000] -rotate-2 sm:-rotate-[3deg] -skew-x-6 sm:-skew-x-12 transition-all duration-300 cursor-pointer group"
              >
                {/* OPTION B: High Contrast Project Image Blend into Background (Isolated inside inner overflow-hidden) */}
                <div className="absolute inset-0 pointer-events-none overflow-hidden">
                  <img
                    src={mission.image}
                    alt=""
                    className="w-full h-full object-cover filter grayscale contrast-150 brightness-75 mix-blend-multiply opacity-40 scale-105 transition-transform duration-700 group-hover:scale-110"
                  />
                  {/* Persona Halftone Texture Overlay */}
                  <div
                    className="absolute inset-0 opacity-20"
                    style={{
                      backgroundImage: 'radial-gradient(#000000 2px, transparent 2px)',
                      backgroundSize: '8px 8px',
                    }}
                  />
                  {/* Red Gradient Mask */}
                  <div className="absolute inset-0 bg-gradient-to-r from-p5-crimson via-p5-crimson/80 to-p5-crimson/95" />
                </div>

                {/* Left Starburst Flare Lens */}
                <StarLensBurst />

                {/* Top Info Bar inside Red Slot */}
                <div className="relative z-10 flex items-center justify-between px-6 pt-3 sm:pt-4 text-white">
                  <div className="flex items-center gap-3">
                    {/* Number Badge (e.g. No. 1) */}
                    <div className="bg-black text-white font-p5Heading text-base sm:text-xl px-2.5 py-0.5 border border-white shadow-[2px_2px_0px_#000] -rotate-1">
                      {mission.slotNumber}
                    </div>

                    {/* Date / Day Badge (e.g. 2/3 Fr Evening) */}
                    <div className="bg-white text-p5-crimson font-p5Heading text-sm sm:text-lg px-2.5 py-0.5 border-2 border-black shadow-[2px_2px_0px_#000] flex items-center gap-1.5">
                      <span className="font-extrabold text-p5-crimson">{mission.calendarDate.split(' ')[0]}</span>
                      <span className="bg-p5-crimson text-white text-[10px] px-1.5 py-0.2 rounded font-sans font-bold uppercase">
                        {mission.calendarDate.split(' ')[1] || 'Fr'}
                      </span>
                      <span className="text-black text-[10px] font-p5Sub ml-0.5 uppercase">
                        {mission.calendarDate.split(' ').slice(2).join(' ') || 'Evening'}
                      </span>
                    </div>

                    {/* Category Pill */}
                    <span className="hidden md:inline-block font-p5Sub text-[9px] tracking-wider text-black bg-yellow-300 px-2 py-0.5 border border-black uppercase font-bold">
                      {mission.category.toUpperCase()}
                    </span>
                  </div>

                  {/* Level & Location Stamp */}
                  <div className="flex items-center gap-4 text-right">
                    <div className="hidden sm:block text-xs font-p5Sub text-zinc-100 uppercase tracking-widest">
                      {mission.location}
                    </div>
                    <div className="font-p5Heading text-2xl sm:text-3xl text-white tracking-widest drop-shadow-[2px_2px_0px_#000]">
                      Lv {mission.level}
                    </div>
                  </div>
                </div>

                {/* Center Content: Giant "COMPLETED" + Play Time */}
                <div className="relative z-10 px-6 sm:px-8 py-2 sm:py-3 flex flex-col md:flex-row md:items-end justify-between gap-3">
                  <div>
                    {/* The Giant Cutout COMPLETED Title */}
                    <CompletedTitle />

                    {/* Project Title Subtext */}
                    <div className="mt-1 flex items-center gap-2">
                      <span className="bg-black text-white font-p5Heading text-base sm:text-xl px-2.5 py-0.5 border-2 border-white shadow-[2px_2px_0px_#000] tracking-wider">
                        {mission.title}
                      </span>
                      <span className="hidden sm:inline-block font-p5Mono text-[11px] text-zinc-200 bg-black/60 px-2 py-0.5 border border-zinc-600">
                        {mission.role}
                      </span>
                    </div>
                  </div>

                  {/* Play Time & Action Buttons */}
                  <div className="flex flex-col items-start md:items-end gap-1.5 text-white">
                    <div className="flex items-center gap-2">
                      <span className="font-p5Heading text-xs sm:text-sm tracking-widest text-zinc-200">
                        PLaY TiME
                      </span>
                      <span className="font-p5Heading text-2xl sm:text-3xl text-yellow-300 drop-shadow-[2px_2px_0px_#000]">
                        {mission.playTime}
                      </span>
                    </div>

                    {/* Action buttons inside active card */}
                    <div className="flex items-center gap-2 mt-1">
                      {mission.liveUrl && (
                        <a
                          href={mission.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={e => e.stopPropagation()}
                          className="inline-flex items-center gap-1.5 px-3 py-1 bg-white hover:bg-yellow-300 text-black font-p5Heading text-xs sm:text-sm tracking-wider uppercase border-2 border-black shadow-[2px_2px_0px_#000000] transition-transform hover:scale-105 active:scale-95"
                        >
                          <ExternalLink className="size-3.5" />
                          LAUNCH DEMO
                        </a>
                      )}

                      <a
                        href={mission.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={e => e.stopPropagation()}
                        className="inline-flex items-center gap-1.5 px-3 py-1 bg-black hover:bg-zinc-900 text-white font-p5Heading text-xs sm:text-sm tracking-wider uppercase border-2 border-white shadow-[2px_2px_0px_#000000] transition-transform hover:scale-105 active:scale-95"
                      >
                        <GithubIcon />
                        GITHUB REPO
                      </a>

                      <button
                        onClick={e => {
                          e.stopPropagation()
                          playSlash()
                          setShowDossierModal(true)
                        }}
                        className="px-2.5 py-1 bg-black text-yellow-300 font-p5Heading text-xs sm:text-sm tracking-wider uppercase border-2 border-yellow-300 shadow-[2px_2px_0px_#000000] hover:bg-yellow-300 hover:text-black transition-all"
                      >
                        DOSSIER [D]
                      </button>
                    </div>
                  </div>
                </div>

                {/* Bottom Border Film Perforation Teeth */}
                <div className="w-full h-2.5 bg-black flex items-center justify-around px-4">
                  {Array.from({ length: 30 }).map((_, i) => (
                    <div key={i} className="w-2.5 h-1 bg-p5-crimson rounded-[0.5px]" />
                  ))}
                </div>
              </div>
            ) : (
              /* ── INACTIVE SLOT (White/Grey Ribbons - Zero Clipping) ── */
              <div
                key={mission.id}
                onClick={() => {
                  playHover()
                  setSelectedIndex(idx)
                }}
                className="relative w-full bg-zinc-100 hover:bg-white text-black border-2 sm:border-[3px] border-black shadow-[6px_6px_0px_#000000] -rotate-2 sm:-rotate-[3deg] -skew-x-6 sm:-skew-x-12 py-2 sm:py-2.5 px-5 sm:px-8 transition-all duration-200 cursor-pointer hover:translate-x-2 group flex items-center justify-between"
              >
                {/* Left Filmstrip Sprockets & Number */}
                <div className="flex items-center gap-3 z-10">
                  <div className="bg-black text-white font-p5Heading text-sm sm:text-lg px-2 py-0.5 border border-black shadow-[2px_2px_0px_#000] -rotate-1 group-hover:bg-p5-crimson transition-colors">
                    {mission.slotNumber}
                  </div>

                  {/* Phantom Thieves Star Icon */}
                  <StarIcon className="size-3.5 text-p5-crimson fill-p5-crimson" />

                  {/* Date Stamp */}
                  <div className="font-p5Heading text-xs sm:text-sm text-p5-crimson tracking-wider">
                    {mission.calendarDate}
                  </div>
                </div>

                {/* Watermark Project Name */}
                <div className="font-p5Heading text-lg sm:text-2xl md:text-3xl text-zinc-400 group-hover:text-black tracking-widest uppercase transition-colors truncate max-w-[50%]">
                  {mission.title.split('//')[0]}
                </div>

                {/* Level Tag Right */}
                <div className="z-10 font-p5Heading text-base sm:text-xl text-zinc-700 group-hover:text-p5-crimson transition-colors">
                  Lv {mission.level}
                </div>

                {/* Left Perforation Strip on Hover */}
                <div className="absolute left-0 top-0 bottom-0 w-2 bg-black group-hover:bg-p5-crimson transition-colors" />
              </div>
            )
          })}
        </div>
      </div>

      {/* ── BOTTOM CONTROLLER LEGEND ── */}
      <div className="fixed bottom-3 sm:bottom-4 left-4 sm:left-8 md:left-12 z-40 flex items-center gap-3 sm:gap-5 flex-wrap text-xs sm:text-sm text-zinc-300 pointer-events-auto">
        <button
          onClick={() => {
            playBack()
            onBack()
          }}
          className="flex items-center gap-1.5 hover:text-white group"
        >
          <span className="size-5 rounded-full border-2 border-red-500 text-red-500 font-bold flex items-center justify-center text-[11px] group-hover:bg-red-500 group-hover:text-white transition-colors">
            O
          </span>
          <span className="font-p5Heading text-sm tracking-wider uppercase">BACK</span>
        </button>

        {activeMission.liveUrl && (
          <a
            href={activeMission.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 hover:text-white group"
          >
            <span className="size-5 rounded-full border-2 border-cyan-400 text-cyan-400 font-bold flex items-center justify-center text-[11px] group-hover:bg-cyan-400 group-hover:text-black transition-colors">
              X
            </span>
            <span className="font-p5Heading text-sm tracking-wider uppercase">LAUNCH DEMO</span>
          </a>
        )}

        <a
          href={activeMission.githubUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1.5 hover:text-white group"
        >
          <span className="size-5 rounded-full border-2 border-emerald-400 text-emerald-400 font-bold flex items-center justify-center text-[11px] group-hover:bg-emerald-400 group-hover:text-black transition-colors">
            △
          </span>
          <span className="font-p5Heading text-sm tracking-wider uppercase">GITHUB</span>
        </a>

        <button
          onClick={() => {
            playSlash()
            setShowDossierModal(true)
          }}
          className="flex items-center gap-1.5 hover:text-white group"
        >
          <span className="size-5 rounded-full border-2 border-pink-400 text-pink-400 font-bold flex items-center justify-center text-[11px] group-hover:bg-pink-400 group-hover:text-black transition-colors">
            □
          </span>
          <span className="font-p5Heading text-sm tracking-wider uppercase">DOSSIER</span>
        </button>
      </div>

      {/* ── DOSSIER MODAL ── */}
      {showDossierModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-sm animate-in fade-in zoom-in-95 duration-200">
          <div className="relative w-full max-w-2xl bg-zinc-950 border-[5px] border-black shadow-[14px_14px_0px_#E60012] p-6 -rotate-1">
            <div className="flex items-center justify-between pb-3 border-b-2 border-zinc-800 mb-4">
              <div className="flex items-center gap-2">
                <span className="bg-p5-crimson text-white font-p5Heading text-lg px-2.5 py-0.5">
                  {activeMission.slotNumber}
                </span>
                <h3 className="font-p5Heading text-2xl sm:text-3xl text-white tracking-wide">
                  {activeMission.title}
                </h3>
              </div>
              <button
                onClick={() => {
                  playBack()
                  setShowDossierModal(false)
                }}
                className="size-8 bg-black hover:bg-p5-crimson border-2 border-white flex items-center justify-center text-white transition-colors"
              >
                <X className="size-5" />
              </button>
            </div>

            <div className="space-y-4">
              <p className="font-p5Body text-zinc-300 text-sm sm:text-base leading-relaxed">
                {activeMission.fullDossier}
              </p>

              <div>
                <span className="font-p5Sub text-xs text-zinc-400 uppercase tracking-wider block mb-1.5">
                  OPERATIONAL STACK:
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {activeMission.tech.map((t, i) => (
                    <span
                      key={i}
                      className="font-p5Mono text-xs text-white bg-zinc-900 border border-zinc-700 px-2.5 py-1"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-3 gap-2 pt-2 border-t border-zinc-800">
                {activeMission.stats.map((s, i) => (
                  <div key={i} className="bg-black/70 p-2 border border-zinc-800">
                    <span className="block font-p5Sub text-[9px] text-zinc-400 uppercase">{s.label}</span>
                    <span className="font-p5Heading text-base text-yellow-300">{s.value}</span>
                  </div>
                ))}
              </div>

              <div className="flex items-center gap-3 pt-3">
                {activeMission.liveUrl && (
                  <a
                    href={activeMission.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 py-2 bg-p5-crimson hover:bg-red-600 text-white font-p5Heading text-center text-lg tracking-wider border-2 border-black shadow-[4px_4px_0px_#000]"
                  >
                    LAUNCH APPLICATION
                  </a>
                )}
                <a
                  href={activeMission.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 py-2 bg-white hover:bg-yellow-300 text-black font-p5Heading text-center text-lg tracking-wider border-2 border-black shadow-[4px_4px_0px_#000]"
                >
                  VIEW SOURCE CODE
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
