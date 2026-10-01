import React, { useState, useRef, useEffect } from 'react'
import { PageCutoutOverlay } from '@/components/common/PageCutoutOverlay'
import { usePersonaSFX } from '@/hooks/usePersonaSFX'
import { Mail, CheckCircle2, Copy, Send, Radio, ExternalLink, Flame, ShieldAlert, Zap, RadioTower, Sliders } from 'lucide-react'
import confetti from 'canvas-confetti'
import { TVTRONCalibrator, TVTRONLayoutConfig } from '@/components/dev/TVTRONCalibrator'

interface CallingCardScreenProps {
  onBack: () => void
}

const DEFAULT_TVTRON_LAYOUT: TVTRONLayoutConfig = {
  top: 180,
  left: 44,
  scale: 1.23,
  rotate: -1,
  maxWidth: 860,
}

const GithubIcon: React.FC = () => (
  <svg className="size-3.5" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
  </svg>
)

interface BroadcastChannel {
  id: string
  channel: string
  freq: string
  rank: string
  label: string
  subject: string
  text: string
}

const BROADCAST_CHANNELS: BroadcastChannel[] = [
  {
    id: 'HIRE',
    channel: 'CH.01',
    freq: '89.1 MHz',
    rank: 'RANK S',
    label: 'HIRE FULL-TIME',
    subject: '[HEIST PROPOSAL] Full-Time Engineering Opportunity',
    text: 'Sir/Madam, our team has identified you as a primary asset. We intend to enlist your full-stack engineering prowesses for an ambitious product.',
  },
  {
    id: 'FREELANCE',
    channel: 'CH.02',
    freq: '94.5 MHz',
    rank: 'RANK A',
    label: 'FREELANCE HEIST',
    subject: '[HEIST PROPOSAL] Urgent Freelance / Contract Mission',
    text: 'We have an urgent digital heist requiring high-velocity execution, custom shaders, and cutting-edge reactive architecture.',
  },
  {
    id: 'COLLAB',
    channel: 'CH.03',
    freq: '98.9 MHz',
    rank: 'RANK EX',
    label: 'ALL-OUT COLLAB',
    subject: '[HEIST PROPOSAL] Creative Technology Collaboration',
    text: 'Let us join forces on an open-source or creative technology challenge that will captivate the entire industry.',
  },
  {
    id: 'COFFEE',
    channel: 'CH.04',
    freq: '104.2 MHz',
    rank: 'CASUAL',
    label: 'CASUAL CHAT',
    subject: '[HEIST PROPOSAL] Tech Talk & Coffee Connect',
    text: 'Enjoyed exploring your Persona heist archives. Would love to connect, talk tech, and exchange architectural philosophies.',
  },
]

export const CallingCardScreen: React.FC<CallingCardScreenProps> = ({ onBack }) => {
  const { playHover, playSlash, playStamp } = usePersonaSFX()
  const [recipient, setRecipient] = useState('Innovative Engineering Team')
  const [selectedChannel, setSelectedChannel] = useState('HIRE')
  const [message, setMessage] = useState(BROADCAST_CHANNELS[0].text)
  const [isSent, setIsSent] = useState(false)
  const [showBroadcastOverlay, setShowBroadcastOverlay] = useState(false)
  const [hasCopiedEmail, setHasCopiedEmail] = useState(false)
  const [toastMessage, setToastMessage] = useState<string | null>(null)
  const [isGlitching, setIsGlitching] = useState(false)
  const [isShaking, setIsShaking] = useState(false)
  const overlayTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  // ── TVTRON DYNAMIC POSITION CALIBRATOR (State & Persistence) ──
  const [tvtronConfig, setTvtronConfig] = useState<TVTRONLayoutConfig>(() => {
    localStorage.removeItem('p5_tvtron_layout_v1')
    localStorage.removeItem('p5_tvtron_layout_v2')
    localStorage.removeItem('p5_tvtron_layout_v3')
    localStorage.removeItem('p5_tvtron_layout_v4')
    const saved = localStorage.getItem('p5_tvtron_layout_v5')
    if (saved) {
      try {
        const parsed = JSON.parse(saved)
        if (parsed && typeof parsed.top === 'number') {
          return { ...DEFAULT_TVTRON_LAYOUT, ...parsed }
        }
      } catch { /* ignore */ }
    }
    return DEFAULT_TVTRON_LAYOUT
  })
  const [isCalibratorOpen, setIsCalibratorOpen] = useState(false)
  const [copiedConfigSuccess, setCopiedConfigSuccess] = useState(false)

  const handleUpdateConfig = (updates: Partial<TVTRONLayoutConfig>) => {
    setTvtronConfig(prev => {
      const next = { ...prev, ...updates }
      localStorage.setItem('p5_tvtron_layout_v5', JSON.stringify(next))
      return next
    })
  }

  const handleResetConfig = () => {
    localStorage.removeItem('p5_tvtron_layout_v1')
    localStorage.removeItem('p5_tvtron_layout_v2')
    localStorage.removeItem('p5_tvtron_layout_v3')
    localStorage.removeItem('p5_tvtron_layout_v4')
    localStorage.removeItem('p5_tvtron_layout_v5')
    setTvtronConfig(DEFAULT_TVTRON_LAYOUT)
  }

  const handleCopyConfig = () => {
    const payload = JSON.stringify(tvtronConfig, null, 2)
    navigator.clipboard?.writeText(payload)
    setCopiedConfigSuccess(true)
    setTimeout(() => setCopiedConfigSuccess(false), 2000)
  }

  // Keyboard navigation: Shift+C to toggle Calibrator, Escape to close
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.shiftKey && (e.key === 'C' || e.key === 'c')) {
        e.preventDefault()
        playSlash()
        setIsCalibratorOpen(prev => !prev)
        return
      }
      if (e.key === 'Escape' && isCalibratorOpen) {
        e.preventDefault()
        setIsCalibratorOpen(false)
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isCalibratorOpen, playSlash])

  useEffect(() => {
    return () => {
      if (overlayTimeoutRef.current) {
        clearTimeout(overlayTimeoutRef.current)
      }
    }
  }, [])

  const USER_EMAIL = 'ferrelrashadakeyla2014@gmail.com'
  const activePreset = BROADCAST_CHANNELS.find(c => c.id === selectedChannel) || BROADCAST_CHANNELS[0]

  const handleSelectChannel = (channel: BroadcastChannel) => {
    playSlash()
    setSelectedChannel(channel.id)
    setMessage(channel.text)
  }

  const handleBroadcast = (e: React.FormEvent) => {
    e.preventDefault()
    playStamp()
    setIsSent(true)
    setIsGlitching(true)
    setIsShaking(true)
    setShowBroadcastOverlay(true)

    setTimeout(() => {
      setIsGlitching(false)
      setIsShaking(false)
    }, 450)

    // Auto-hide the broadcast takeover banner after 3.2 seconds
    if (overlayTimeoutRef.current) {
      clearTimeout(overlayTimeoutRef.current)
    }
    overlayTimeoutRef.current = setTimeout(() => {
      setShowBroadcastOverlay(false)
    }, 3200)

    // Trigger Persona Emerald, Gold, White & Black Confetti
    try {
      confetti({
        particleCount: 140,
        spread: 100,
        origin: { x: 0.35, y: 0.55 },
        colors: ['#10B981', '#34D399', '#059669', '#FFFFFF', '#000000', '#FFD700', '#FACC15'],
      })
    } catch {
      // Fallback
    }

    // Prepare mailto link
    const subject = encodeURIComponent(`${activePreset.subject} // From ${recipient}`)
    const body = encodeURIComponent(
      `TO: Ferrel (The Architect)\n\nFROM: ${recipient}\nFREQUENCY: ${activePreset.freq} // ${activePreset.label}\n\nDECLARATION:\n${message}\n\n---\nBroadcasted via Persona 5 Shibuya Outdoor Videotron Hijack`
    )
    const mailtoUrl = `mailto:${USER_EMAIL}?subject=${subject}&body=${body}`

    // Copy to clipboard
    const fullText = `TO: Ferrel\nTARGET RECIPIENT: ${recipient}\nCHANNEL: ${activePreset.channel} (${activePreset.label})\nFREQUENCY: ${activePreset.freq}\n\n${message}\n\nContact: ${USER_EMAIL}`
    navigator.clipboard?.writeText(fullText).catch(() => { })

    setToastMessage('TRANSMISSION COPIED & EMAIL CLIENT OPENED!')
    setTimeout(() => setToastMessage(null), 3500)

    // Open user's mail client
    setTimeout(() => {
      window.open(mailtoUrl, '_blank')
    }, 400)
  }

  const handleCopyEmail = () => {
    playSlash()
    navigator.clipboard?.writeText(USER_EMAIL)
    setHasCopiedEmail(true)
    setToastMessage('FREQUENCY (EMAIL) COPIED TO CLIPBOARD!')
    setTimeout(() => {
      setHasCopiedEmail(false)
      setToastMessage(null)
    }, 2500)
  }

  return (
    <div className="fixed inset-0 z-30 select-none overflow-hidden bg-gradient-to-r from-black/95 from-0% via-black/80 via-35% to-transparent to-55% animate-in fade-in duration-200">
      {/* Page Title Cutout Overlay with COMMS label and Calibrator Shortcut */}
      <PageCutoutOverlay
        title="COMMS"
        characterRole="NAVIGATOR"
        characterName="FUUKA YAMAGISHI"
        accentColor="emerald"
        onBack={onBack}
        extraShortcuts={
          <button
            onClick={() => {
              playSlash()
              setIsCalibratorOpen(prev => !prev)
            }}
            className="flex items-center gap-1.5 hover:text-white group cursor-pointer transition-colors"
            title="Adjust TVTRON Position (Shift + C)"
          >
            <span className="size-5 rounded-full border-2 border-emerald-400 text-emerald-400 font-bold flex items-center justify-center text-[10px] group-hover:bg-emerald-400 group-hover:text-black transition-colors shadow-[0_0_6px_rgba(16,185,129,0.4)]">
              C
            </span>
            <span className="font-p5Heading text-xs sm:text-sm tracking-wider uppercase">ADJUST TVTRON</span>
          </button>
        }
      />

      {/* Main Content Area: Absolute Anchor with Real-Time Position Adjuster */}
      <div
        style={{
          position: 'absolute',
          top: `${tvtronConfig.top}px`,
          left: `${tvtronConfig.left}px`,
          width: `calc(100% - ${tvtronConfig.left * 2}px)`,
          maxWidth: `${tvtronConfig.maxWidth}px`,
          transform: `scale(${tvtronConfig.scale}) rotate(${tvtronConfig.rotate}deg)`,
          transformOrigin: 'top left',
          zIndex: 20,
        }}
        className="transition-transform duration-75"
      >
        <div className="w-full p5-comms-entrance relative">
          
          {/* ══════════════════════════════════════════════════════════════════
              SHIBUYA VIDEOTRON / OUTDOOR BILLBOARD STRUCTURAL UNIT
             ══════════════════════════════════════════════════════════════════ */}
          <div
            className={`relative w-full bg-[#10B981] text-black border-4 border-black shadow-[12px_12px_0px_#000000] -rotate-1 transition-transform duration-300 ${
              isShaking ? 'animate-bounce' : ''
            }`}
          >
            {/* 1. TOP STEEL TRUSS & 5 BILLBOARD FLOODLIGHTS */}
            <div className="relative bg-gradient-to-r from-zinc-200 via-white to-zinc-200 border-b-4 border-black px-3 py-1.5 flex items-center justify-between z-30">
              {/* Left Steel Joint with Rivet */}
              <div className="flex items-center gap-1.5">
                <div className="size-2 rounded-full bg-zinc-400 border border-black shadow-[1px_1px_0px_#000]" />
                <div className="size-2 rounded-full bg-zinc-400 border border-black shadow-[1px_1px_0px_#000]" />
                <span className="hidden sm:inline-block font-p5Mono text-[9px] text-zinc-800 font-bold tracking-widest uppercase">
                  [SHIBUYA 109 Q-FRONT]
                </span>
              </div>

              {/* 5 Physical Outdoor Floodlight Lamps (with glowing bulbs & cones) */}
              <div className="flex items-center gap-4 sm:gap-10">
                {[1, 2, 3, 4, 5].map(lampId => (
                  <div key={lampId} className="relative flex flex-col items-center">
                    {/* Metal bracket & hood */}
                    <div className="w-2.5 h-1 bg-zinc-400 border border-black" />
                    <div className="w-5 h-2 bg-zinc-900 border border-black rounded-b flex items-center justify-center">
                      <div className="size-1.5 rounded-full bg-yellow-300 shadow-[0_0_8px_#FEF08A] animate-pulse" />
                    </div>
                  </div>
                ))}
              </div>

              {/* Right Steel Joint & Hijack Status */}
              <div className="flex items-center gap-1.5">
                <span className="bg-black text-emerald-400 font-p5Mono text-[9px] font-black px-1.5 py-0.5 border border-black shadow-[1px_1px_0px_#000]">
                  HIJACK SIGNAL: 100%
                </span>
                <div className="size-2 rounded-full bg-zinc-400 border border-black shadow-[1px_1px_0px_#000]" />
              </div>
            </div>

            {/* Left Hardware Hijack Hazard Cable running down the side */}
            <div className="absolute -left-3.5 top-8 bottom-8 w-2 hazard-stripe border border-black shadow-[2px_2px_0px_#000] z-30 pointer-events-none hidden sm:block" />

            {/* 2 & 3. WIDESCREEN 2-COLUMN GRID (SCREEN LEFT, CONTROL DECK RIGHT) */}
            <div className="grid grid-cols-1 md:grid-cols-12 divide-y-4 md:divide-y-0 md:divide-x-4 divide-black bg-black">
              
              {/* ── LEFT COLUMN (7 COLS): OUTDOOR VIDEOTRON LED DISPLAY ── */}
              <div className="md:col-span-7 relative p-2.5 sm:p-3 bg-emerald-500 flex flex-col justify-between overflow-hidden min-h-[290px]">
                {/* Spotlight Cones Overlay projecting onto screen from top */}
                <div className="absolute inset-x-0 top-0 h-16 billboard-spotlight-cone z-20 pointer-events-none opacity-30" />

                {/* Screen Bezel & LED Surface */}
                <div
                  className={`relative w-full h-full rounded-sm border-2 border-black bg-[#FFFDF9] p-3 sm:p-3.5 shadow-[inset_0_2px_8px_rgba(0,0,0,0.06)] flex flex-col justify-between overflow-hidden transition-all ${
                    isGlitching ? 'animate-signal-glitch' : ''
                  }`}
                >
                  {/* Subtle Matrix Pixel Grid (Placed in background z-0 with very soft opacity) */}
                  <div className="absolute inset-0 led-matrix-grid z-0 pointer-events-none opacity-5" />

                  {/* Live Broadcast Content (Elevated to z-20 for 100% crisp sharpness) */}
                  <div className="relative z-20 flex flex-col justify-between h-full space-y-2.5">
                    {/* Top LED Broadcast Bar */}
                    <div className="flex items-center justify-between border-b-2 border-black pb-1.5 gap-2">
                      {/* On-Air Record Indicator */}
                      <div className="flex items-center gap-1.5 bg-red-600 border border-black px-2 py-0.5 text-white text-[10px] font-p5Mono font-black tracking-widest uppercase shadow-[1.5px_1.5px_0px_#000]">
                        <span className="size-2 rounded-full bg-white animate-rec-blink" />
                        <span>LIVE BROADCAST</span>
                      </div>

                      {/* Central Emergency Header */}
                      <div className="flex items-center gap-1.5 text-black font-p5Heading text-xs sm:text-sm tracking-wider">
                        <Flame className="size-3.5 text-emerald-600 fill-emerald-600 animate-pulse" />
                        <span className="text-emerald-700 font-black">★ TAKE YOUR HEART ★</span>
                      </div>

                      {/* Frequency Locked Indicator */}
                      <div className="flex items-center gap-1.5 text-[10px] font-p5Mono text-black font-bold bg-yellow-300 px-2 py-0.5 border border-black shadow-[1.5px_1.5px_0px_#000]">
                        <span className="text-black font-black">{activePreset.freq}</span>
                        <div className="flex items-end gap-0.5 h-3">
                          <span className="w-0.5 bg-black animate-pulse h-1.5" />
                          <span className="w-0.5 bg-black animate-pulse h-3 delay-75" />
                          <span className="w-0.5 bg-black animate-pulse h-2 delay-150" />
                        </div>
                      </div>
                    </div>

                    {/* Target Callout in High-Voltage Bold */}
                    <div className="flex items-center gap-2 pt-0.5">
                      <span className="bg-black text-white px-1.5 py-0.5 text-[10px] font-black -skew-x-12 border border-black">
                        TARGET
                      </span>
                      <span className="font-p5Heading text-sm sm:text-base md:text-lg text-black font-black tracking-wide truncate">
                        {recipient.trim() ? recipient : 'UNDISCLOSED TARGET'}
                      </span>
                    </div>

                    {/* Live Manifesto Body with Blinking Block Terminal Cursor */}
                    <div className="font-p5Body text-xs sm:text-sm text-black leading-relaxed font-bold min-h-[4.5rem] flex-1 overflow-y-auto no-scrollbar p-2.5 bg-emerald-50/70 border-2 border-black rounded-sm shadow-[2px_2px_0px_#000000]">
                      <span>{message}</span>
                      <span className="inline-block w-2 h-3.5 ml-1 bg-emerald-600 animate-pulse align-middle" />
                    </div>

                    {/* Outdoor Billboard Marquee (Running Text Ticker) */}
                    <div className="relative mt-1 bg-emerald-600 border-t-2 border-black py-1 overflow-hidden shadow-[inset_0_1px_3px_rgba(0,0,0,0.3)]">
                      <div className="flex items-center gap-1 text-[10px] font-p5Mono text-white whitespace-nowrap overflow-hidden">
                        <div className="animate-marquee-scroll">
                          <span className="mr-8 font-black">
                            ▶ ▶ BREAKING: SHIBUYA SCRAMBLE CROSSING BILLBOARD FREQUENCIES HIJACKED BY THE PHANTOM THIEVES
                          </span>
                          <span className="mr-8 text-yellow-300 font-black">
                            ▶ TARGET: {recipient.trim() ? recipient.toUpperCase() : 'UNKNOWN'}
                          </span>
                          <span className="mr-8 text-white font-extrabold">
                            ▶ ALL DISTORTED DESIRES SHALL BE CONFISCATED
                          </span>
                          <span className="mr-8 font-black">
                            ▶ ▶ BREAKING: SHIBUYA SCRAMBLE CROSSING BILLBOARD FREQUENCIES HIJACKED BY THE PHANTOM THIEVES
                          </span>
                          <span className="mr-8 text-yellow-300 font-black">
                            ▶ TARGET: {recipient.trim() ? recipient.toUpperCase() : 'UNKNOWN'}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* ── RIGHT COLUMN (5 COLS): MAINTENANCE & OVERRIDE CONTROL DECK ── */}
              <div className="md:col-span-5 bg-[#FAF8F5] p-3 sm:p-3.5 flex flex-col justify-between space-y-2.5 text-black">
                {/* Tactical Transmission Channel Presets (2x2 Grid) */}
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-p5Sub text-[10px] sm:text-[11px] text-zinc-900 uppercase tracking-wider font-extrabold flex items-center gap-1">
                      <Radio className="size-3 text-emerald-600" />
                      FREQUENCY CHANNEL:
                    </span>
                    <span className="font-p5Mono text-[9px] text-emerald-600 font-black">
                      4 BANDS
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-1.5">
                    {BROADCAST_CHANNELS.map(preset => {
                      const isActive = selectedChannel === preset.id
                      return (
                        <button
                          key={preset.id}
                          type="button"
                          onClick={() => handleSelectChannel(preset)}
                          onMouseEnter={playHover}
                          className={`
                            relative px-2 py-1.5 font-p5Heading text-xs sm:text-[12px] tracking-wider uppercase border-2 transition-all flex flex-col items-start justify-center cursor-pointer text-left
                            ${
                              isActive
                                ? 'bg-emerald-500 text-black border-black shadow-[3px_3px_0px_#000000] -rotate-1 font-black scale-[1.02]'
                                : 'bg-white text-zinc-900 border-black hover:border-emerald-600 hover:bg-emerald-50 shadow-[1.5px_1.5px_0px_#000000]'
                            }
                          `}
                        >
                          {/* LED Indicator Light */}
                          <div className="flex items-center justify-between w-full mb-0.5">
                            <span className={`text-[9px] font-p5Mono font-bold ${isActive ? 'text-black' : 'text-zinc-600'}`}>
                              {preset.channel}
                            </span>
                            <span
                              className={`size-2 rounded-full border border-black ${
                                isActive
                                  ? 'bg-yellow-300 shadow-[0_0_8px_#FBBF24] animate-pulse'
                                  : 'bg-zinc-300'
                              }`}
                            />
                          </div>
                          <span className="font-bold leading-tight line-clamp-1">{preset.label}</span>
                          <span className={`text-[8.5px] font-p5Mono mt-0.5 ${isActive ? 'text-zinc-950 font-black' : 'text-emerald-700 font-bold'}`}>
                            {preset.rank}
                          </span>
                        </button>
                      )
                    })}
                  </div>
                </div>

                {/* Input Form: Target Override & Manifesto Payload */}
                <form onSubmit={handleBroadcast} className="space-y-2 flex-1 flex flex-col justify-between">
                  {/* Target Input */}
                  <div className="flex items-center gap-1.5 font-p5Heading text-xs sm:text-sm border-b-2 border-black pb-1">
                    <div className="flex items-center gap-0.5 shrink-0">
                      <span className="bg-black text-white px-1.5 py-0.5 text-[9px] sm:text-[10px] font-black -skew-x-12 border border-black">
                        TO
                      </span>
                      <span className="bg-emerald-500 text-black px-1.5 py-0.5 text-[9px] sm:text-[10px] font-black -skew-x-6 border border-black">
                        TARGET:
                      </span>
                    </div>
                    <input
                      type="text"
                      value={recipient}
                      onChange={e => setRecipient(e.target.value)}
                      placeholder="Enter Target Company / Team..."
                      className="flex-1 bg-white border-2 border-black focus:border-emerald-500 focus:bg-emerald-50/40 px-2 py-0.5 font-p5Body text-black font-bold text-xs focus:outline-none placeholder:text-zinc-400 tracking-wide rounded-sm shadow-[1.5px_1.5px_0px_#000]"
                    />
                  </div>

                  {/* Message Textarea */}
                  <div>
                    <span className="block font-p5Sub text-[9.5px] text-zinc-900 uppercase tracking-wider mb-0.5 font-extrabold">
                      MANIFESTO PAYLOAD:
                    </span>
                    <textarea
                      rows={2}
                      value={message}
                      onChange={e => setMessage(e.target.value)}
                      className="w-full bg-white border-2 border-black focus:border-emerald-500 focus:bg-emerald-50/40 p-2 font-p5Body text-xs text-black font-bold resize-none leading-snug h-[3.2rem] rounded-sm placeholder:text-zinc-400 shadow-[1.5px_1.5px_0px_#000]"
                    />
                  </div>

                  {/* Footer: Operator Signature & Broadcast Trigger Button */}
                  <div className="flex items-center justify-between gap-1.5 pt-1 border-t-2 border-black">
                    <div className="font-p5Heading text-[9px] sm:text-[10px] text-zinc-800 font-bold">
                      OPERATOR: <span className="text-emerald-600 font-black tracking-wide">FERREL</span>
                    </div>

                    <button
                      type="submit"
                      onMouseEnter={playHover}
                      className={`
                        inline-flex items-center justify-center gap-1 px-3 py-1 font-p5Heading text-xs sm:text-[13px] tracking-wider uppercase border-2 border-black shadow-[2.5px_2.5px_0px_#000000] transition-all cursor-pointer font-black
                        ${
                          isSent
                            ? 'bg-emerald-500 text-black hover:bg-emerald-400'
                            : 'bg-emerald-400 hover:bg-emerald-300 text-black -rotate-1 hover:rotate-0 hover:scale-105 active:scale-95 shadow-[3px_3px_0px_#000000]'
                        }
                      `}
                    >
                      {isSent ? (
                        <>
                          <CheckCircle2 className="size-3.5" />
                          RE-BROADCAST
                        </>
                      ) : (
                        <>
                          <Zap className="size-3.5 fill-black" />
                          EXECUTE BROADCAST
                        </>
                      )}
                    </button>
                  </div>
                </form>

                {/* Direct Frequency Dials docked at bottom */}
                <div className="pt-1 border-t border-dashed border-zinc-400 flex items-center justify-between gap-1.5 text-[9.5px] font-p5Mono">
                  {/* Email with copy */}
                  <button
                    type="button"
                    onClick={handleCopyEmail}
                    className="inline-flex items-center gap-1 bg-white text-black px-1.5 py-0.5 hover:bg-emerald-400 hover:text-black transition-colors border-2 border-black shadow-[1.5px_1.5px_0px_#000] cursor-pointer shrink-0 truncate max-w-[190px] font-bold"
                    title="Click to Copy Direct Frequency Email"
                  >
                    <Mail className="size-2.5 text-emerald-600 shrink-0" />
                    <span className="truncate">{USER_EMAIL}</span>
                    <Copy className="size-2 text-zinc-600 shrink-0 ml-0.5" />
                    {hasCopiedEmail && <span className="text-emerald-700 text-[8.5px] font-black shrink-0">COPIED!</span>}
                  </button>

                  {/* GitHub */}
                  <a
                    href="https://github.com/FerrelHD"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 bg-white text-black px-1.5 py-0.5 hover:bg-emerald-400 hover:text-black transition-colors border-2 border-black shadow-[1.5px_1.5px_0px_#000] cursor-pointer shrink-0 font-bold"
                  >
                    <GithubIcon />
                    <span>@FerrelHD</span>
                    <ExternalLink className="size-2 text-zinc-600 shrink-0" />
                  </a>
                </div>
              </div>
            </div>

            {/* 4. CINEMATIC BROADCAST TAKEOVER OVERLAY */}
            {showBroadcastOverlay && (
              <div
                onClick={() => setShowBroadcastOverlay(false)}
                className="absolute inset-0 cursor-pointer flex items-center justify-center z-50 overflow-hidden bg-black/80 backdrop-blur-[2px] animate-in fade-in duration-150 pointer-events-auto p-4"
                title="Click anywhere to dismiss"
              >
                <div
                  className="bg-emerald-500 text-black border-4 border-black px-5 sm:px-8 py-5 -rotate-3 shadow-[12px_12px_0px_#000000] flex flex-col items-center justify-center text-center max-w-full"
                  style={{ animation: 'stamp-slam 0.35s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards' }}
                >
                  <div className="flex items-center gap-2 mb-1">
                    <span className="size-2.5 rounded-full bg-yellow-300 animate-ping" />
                    <span className="font-p5Mono text-[10px] sm:text-xs font-black tracking-widest text-black bg-white px-2 py-0.5 border border-black shadow-[1.5px_1.5px_0px_#000]">
                      SHIBUYA SCRAMBLE CROSSING HIJACKED
                    </span>
                  </div>

                  <span className="font-p5Heading text-2xl sm:text-3xl md:text-4xl text-black font-black tracking-widest uppercase drop-shadow-[3px_3px_0px_rgba(255,255,255,0.7)]">
                    ★ TAKE YOUR HEART ★
                  </span>

                  <span className="font-p5Sub text-xs sm:text-sm text-yellow-300 font-extrabold tracking-wider uppercase mt-1 bg-black px-2.5 py-0.5 border border-yellow-300 shadow-[1.5px_1.5px_0px_#000]">
                    TRANSMISSION DISPATCHED // EMAIL CLIENT OPENED
                  </span>

                  <span className="font-p5Body text-[10px] text-zinc-900 tracking-wide mt-2 font-bold opacity-90">
                    (Click anywhere to dismiss)
                  </span>
                </div>
              </div>
            )}

          </div>
        </div>
      </div>

      {/* Floating Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 left-4 sm:left-6 md:left-8 z-50 bg-white text-black font-p5Heading text-xs px-4 py-2 border-2 border-black shadow-[3px_3px_0px_#10B981] -rotate-1 animate-in fade-in slide-in-from-bottom-2 duration-150 flex items-center gap-2 pointer-events-none">
          <ShieldAlert className="size-3.5 text-emerald-500" />
          <span className="font-black">{toastMessage}</span>
        </div>
      )}

      {/* ── REAL-TIME TVTRON POSITION CALIBRATOR (ACCESSIBLE VIA SHIFT + C OR BUTTON) ── */}
      <TVTRONCalibrator
        isOpen={isCalibratorOpen}
        onClose={() => setIsCalibratorOpen(false)}
        config={tvtronConfig}
        defaultConfig={DEFAULT_TVTRON_LAYOUT}
        onChange={handleUpdateConfig}
        onReset={handleResetConfig}
        onCopy={handleCopyConfig}
        copiedSuccess={copiedConfigSuccess}
      />
    </div>
  )
}
