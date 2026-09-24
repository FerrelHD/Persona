import React, { useState, useEffect } from 'react'
import { PageCutoutOverlay } from '@/components/common/PageCutoutOverlay'
import { MISSIONS_DATA, Mission } from '@/data/personaData'
import { usePersonaSFX } from '@/hooks/usePersonaSFX'
import { X } from 'lucide-react'

// Decorative 5-point star SVG
const StarIcon: React.FC<{ className?: string; fill?: string }> = ({ className = 'size-4', fill = '#ffffff' }) => (
  <svg viewBox="0 0 24 24" className={className} fill={fill}>
    <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26" />
  </svg>
)

// Starburst Lens Flare radiating neatly on the active slot badge
const StarLensBurst: React.FC = () => (
  <div className="absolute -top-2.5 -left-2.5 pointer-events-none z-30 flex items-center justify-center">
    {/* Horizontal ray beam */}
    <div className="absolute w-20 h-0.5 bg-gradient-to-r from-transparent via-white to-transparent opacity-95 rotate-12" />
    {/* Vertical ray beam */}
    <div className="absolute h-20 w-0.5 bg-gradient-to-b from-transparent via-white to-transparent opacity-95 -rotate-12" />
    {/* Core star diamond */}
    <div className="size-3 bg-white rotate-45 shadow-[0_0_10px_#ffffff]" />
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
      <div className="flex-1 flex flex-col justify-center items-start w-full max-w-4xl lg:max-w-[58%] pl-6 sm:pl-10 md:pl-14 lg:pl-16 z-20 py-12 sm:py-16 laptop-compact-deck overflow-visible p5-missions-entrance">
        <div className="w-full flex flex-col gap-3.5 sm:gap-4.5 laptop-compact-deck justify-center overflow-visible">
          {MISSIONS_DATA.map((mission, idx) => {
            const isSelected = idx === selectedIndex
            const diff = idx - selectedIndex
            // Only show slots near selected index
            if (Math.abs(diff) > 2) return null

            return isSelected ? (
              /* ── ACTIVE SELECTED SLOT (Expanded Red Banner - Zero Clipping) ── */
              <div
                key={mission.id}
                onClick={() => {
                  playSlash()
                  setShowDossierModal(true)
                }}
                className="relative w-full bg-[#002B5B] border-4 sm:border-[5px] border-black shadow-[10px_10px_0px_#000000] -rotate-2 sm:-rotate-[3deg] -skew-x-6 sm:-skew-x-12 transition-all duration-300 cursor-pointer group"
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
                  {/* Makoto Deep Midnight Cyan Gradient Mask (Opsi A) */}
                  <div className="absolute inset-0 bg-gradient-to-r from-[#001E3D] via-[#003873]/92 to-[#0066B3]/88" />
                </div>

                {/* Top Info Bar inside Slot */}
                <div className="relative z-10 flex items-center justify-between px-6 pt-3 sm:pt-3.5 text-white">
                  <div className="flex items-center gap-2.5">
                    {/* Number Badge with Persona Corner Sparkle */}
                    <div className="relative bg-black text-white font-p5Heading text-base sm:text-lg px-2.5 py-0.5 border border-white shadow-[2px_2px_0px_#000] -rotate-1">
                      <StarLensBurst />
                      {mission.slotNumber}
                    </div>

                    {/* Category Pill - Harmonized Electric Cyan */}
                    <span className="font-p5Sub text-[10px] sm:text-xs tracking-wider text-black bg-[#00D2FF] px-2.5 py-0.5 border border-black uppercase font-black shadow-[2px_2px_0px_#000] -skew-x-6">
                      {mission.category.toUpperCase()}
                    </span>

                    {/* Date Tag */}
                    <span className="hidden sm:inline-block font-p5Heading text-xs text-white bg-black px-2 py-0.5 border border-zinc-600 shadow-[2px_2px_0px_#000]">
                      {mission.calendarDate.split(' ')[0]}
                    </span>
                  </div>

                  {/* Right Header: Lv + Persona Clear/Completed Stamp */}
                  <div className="flex items-center gap-3">
                    <div className="font-p5Heading text-xl sm:text-2xl text-white tracking-widest drop-shadow-[2px_2px_0px_#000]">
                      Lv {mission.level}
                    </div>
                    <div className="inline-flex items-center gap-1 bg-white text-black font-p5Heading text-[11px] sm:text-xs px-2 py-0.5 border-2 border-black shadow-[2px_2px_0px_#000] -rotate-2 select-none">
                      <StarIcon className="size-3 text-p5-crimson fill-p5-crimson" />
                      <span className="tracking-wider">COMPLETED</span>
                    </div>
                  </div>
                </div>

                {/* Center Content: Clean, Impactful Project Display */}
                <div className="relative z-10 px-6 sm:px-8 pt-3 sm:pt-3.5 pb-4 sm:pb-5 flex flex-col justify-center">
                  {/* Project Title */}
                  <h2 className="font-p5Heading text-2xl sm:text-3xl md:text-4xl text-white tracking-wider uppercase filter drop-shadow-[3px_3px_0px_#000000]">
                    {mission.title}
                  </h2>

                  {/* Project Details Subtitle Bar with View Dossier Button */}
                  <div className="mt-2 flex items-center flex-wrap gap-2.5">
                    <span className="bg-black text-white font-p5Heading text-xs sm:text-sm px-2.5 py-1 border-2 border-white shadow-[2px_2px_0px_#000] tracking-wider uppercase -skew-x-6">
                      {mission.role}
                    </span>
                    <span className="text-xs font-p5Mono text-cyan-300 font-bold hidden sm:inline-block drop-shadow-[1px_1px_0px_#000]">
                      PLAY TIME // {mission.playTime}
                    </span>

                    {/* Dedicated VIEW DOSSIER Action Button (Opsi 1) */}
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation()
                        playSlash()
                        setShowDossierModal(true)
                      }}
                      className="ml-auto inline-flex items-center gap-1.5 bg-black hover:bg-[#00D2FF] text-white hover:text-black font-p5Heading text-xs sm:text-sm px-3.5 py-1 border-2 border-white shadow-[3px_3px_0px_#000] -skew-x-6 transition-all hover:scale-105 cursor-pointer group/btn"
                      title="Open Mission Dossier"
                    >
                      <span className="size-4 rounded-full border-2 border-cyan-400 text-cyan-400 font-bold flex items-center justify-center text-[9px] group-hover/btn:border-black group-hover/btn:text-black transition-colors">
                        □
                      </span>
                      <span className="tracking-wider uppercase">VIEW DOSSIER</span>
                    </button>
                  </div>
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
                  <div className="bg-black text-white font-p5Heading text-sm sm:text-lg px-2 py-0.5 border border-black shadow-[2px_2px_0px_#000] -rotate-1 group-hover:bg-[#003876] transition-colors">
                    {mission.slotNumber}
                  </div>

                  {/* Phantom Thieves Star Icon */}
                  <StarIcon className="size-3.5 text-[#004B87] fill-[#004B87]" />

                  {/* Date Stamp */}
                  <div className="font-p5Heading text-xs sm:text-sm text-[#004B87] tracking-wider">
                    {mission.calendarDate}
                  </div>
                </div>

                {/* Watermark Project Name */}
                <div className="font-p5Heading text-lg sm:text-2xl md:text-3xl text-zinc-400 group-hover:text-black tracking-widest uppercase transition-colors truncate max-w-[50%]">
                  {mission.title.split('//')[0]}
                </div>

                {/* Level Tag Right */}
                <div className="z-10 font-p5Heading text-base sm:text-xl text-zinc-700 group-hover:text-[#003876] transition-colors">
                  Lv {mission.level}
                </div>

                {/* Left Perforation Strip on Hover */}
                <div className="absolute left-0 top-0 bottom-0 w-2 bg-black group-hover:bg-[#003876] transition-colors" />
              </div>
            )
          })}
        </div>
      </div>

      {/* ── BOTTOM CONTROLLER LEGEND ── */}
      <div className="fixed bottom-5 sm:bottom-7 md:bottom-8 laptop-legend-bottom left-6 sm:left-10 md:left-14 z-40 flex items-center gap-3 sm:gap-5 flex-wrap text-xs sm:text-sm text-zinc-300 pointer-events-auto select-none">
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
          <div className="relative w-full max-w-2xl bg-zinc-950 border-[5px] border-black shadow-[14px_14px_0px_#003876] p-6 -rotate-1">
            <div className="flex items-center justify-between pb-3 border-b-2 border-zinc-800 mb-4">
              <div className="flex items-center gap-2">
                <span className="bg-[#003876] text-white font-p5Heading text-lg px-2.5 py-0.5">
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
                className="size-8 bg-black hover:bg-[#003876] border-2 border-white flex items-center justify-center text-white transition-colors"
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
