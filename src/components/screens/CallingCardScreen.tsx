import React, { useState } from 'react'
import { PageCutoutOverlay } from '@/components/common/PageCutoutOverlay'
import { usePersonaSFX } from '@/hooks/usePersonaSFX'
import { Mail, CheckCircle2, Copy, Send, Radio, Flame, MessageSquare, Terminal } from 'lucide-react'
import confetti from 'canvas-confetti'

interface CallingCardScreenProps {
  onBack: () => void
}

const GithubIcon: React.FC = () => (
  <svg className="size-4" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
  </svg>
)

const CONTRACT_PRESETS = [
  {
    id: 'HIRE',
    label: 'HIRE FULL-TIME',
    text: 'Sir/Madam, our team has identified you as a primary asset. We intend to enlist your full-stack engineering prowesses for an ambitious product.',
  },
  {
    id: 'FREELANCE',
    label: 'FREELANCE HEIST',
    text: 'We have an urgent digital heist requiring high-velocity execution, custom shaders, and cutting-edge reactive architecture.',
  },
  {
    id: 'COLLAB',
    label: 'ALL-OUT COLLAB',
    text: 'Let us join forces on an open-source or creative technology challenge that will captivate the entire industry.',
  },
  {
    id: 'COFFEE',
    label: 'CASUAL CHAT',
    text: 'Enjoyed exploring your Persona heist archives. Would love to connect, talk tech, and exchange architectural philosophies.',
  },
]

export const CallingCardScreen: React.FC<CallingCardScreenProps> = ({ onBack }) => {
  const { playHover, playSlash, playStamp } = usePersonaSFX()
  const [recipient, setRecipient] = useState('Innovative Engineering Team')
  const [selectedContract, setSelectedContract] = useState('HIRE')
  const [message, setMessage] = useState(CONTRACT_PRESETS[0].text)
  const [isSent, setIsSent] = useState(false)
  const [hasCopiedEmail, setHasCopiedEmail] = useState(false)

  const handleSelectPreset = (preset: typeof CONTRACT_PRESETS[0]) => {
    playSlash()
    setSelectedContract(preset.id)
    setMessage(preset.text)
  }

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault()
    playStamp()
    setIsSent(true)

    try {
      confetti({
        particleCount: 120,
        spread: 90,
        origin: { x: 0.35, y: 0.65 },
        colors: ['#10B981', '#E60012', '#FFFFFF', '#FFD700', '#000000'],
      })
    } catch {
      // Fallback
    }
  }

  const handleCopyEmail = () => {
    playSlash()
    navigator.clipboard?.writeText('ferrelhd.dev@gmail.com')
    setHasCopiedEmail(true)
    setTimeout(() => setHasCopiedEmail(false), 2500)
  }

  return (
    <div className="fixed inset-0 z-30 flex flex-col p-6 sm:p-8 md:p-10 select-none overflow-hidden bg-gradient-to-r from-black/95 via-black/80 to-transparent animate-in fade-in duration-200 pt-32 sm:pt-36 md:pt-40">
      {/* Page Title Cutout Overlay */}
      <PageCutoutOverlay
        title="CALLING CARD"
        characterRole="NAVIGATOR"
        characterName="FUUKA YAMAGISHI"
        accentColor="emerald"
        onBack={onBack}
      />

      {/* Main Content Area: Left side has the Yokoku-jo & SNS Comms, Right side is Fuuka */}
      <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 gap-6 mt-2 overflow-hidden z-20 max-w-7xl">
        <div className="lg:col-span-8 flex flex-col justify-between max-h-[calc(100vh-175px)] overflow-y-auto pr-2 custom-scrollbar space-y-4">

          {/* Top Bar: Phan-Site SNS Comms Frequency (Instant Contacts) */}
          <div className="bg-black/90 border-2 border-emerald-500/50 p-3 -skew-x-2 shadow-[6px_6px_0px_#000000] flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <Radio className="size-4 text-emerald-400 animate-pulse" />
              <span className="font-p5Mono text-xs text-emerald-400 uppercase tracking-widest">
                PHAN-SITE COMMS // FREQ 108.4 MHz
              </span>
            </div>

            {/* Quick Action Channels */}
            <div className="flex items-center gap-2 font-p5Mono text-xs">
              <button
                type="button"
                onClick={handleCopyEmail}
                onMouseEnter={playHover}
                className="flex items-center gap-1.5 px-3 py-1 bg-zinc-950 border border-zinc-700 hover:border-emerald-400 text-white transition-all -skew-x-3"
              >
                <Mail className="size-3.5 text-emerald-400" />
                <span className="text-[11px]">ferrelhd.dev@gmail.com</span>
                {hasCopiedEmail ? (
                  <span className="text-green-400 text-[10px] font-bold flex items-center gap-1">
                    <CheckCircle2 className="size-3" /> COPIED!
                  </span>
                ) : (
                  <Copy className="size-3 text-zinc-500" />
                )}
              </button>

              <a
                href="https://github.com/FerrelHD"
                target="_blank"
                rel="noreferrer"
                onMouseEnter={playHover}
                className="flex items-center gap-1.5 px-3 py-1 bg-zinc-950 border border-zinc-700 hover:border-emerald-400 text-white transition-all -skew-x-3"
              >
                <GithubIcon />
                <span className="text-[11px]">@FerrelHD</span>
                <span className="text-emerald-400 text-[10px]">↗</span>
              </a>
            </div>
          </div>

          {/* Center Stage: The Physical Phantom Thief Calling Card (Yokoku-jo) */}
          <div className="relative bg-zinc-100 text-black border-4 border-black p-5 sm:p-6 -skew-x-1 shadow-[10px_10px_0px_#000000] space-y-4">
            {/* Top Red Header Strip */}
            <div className="flex items-center justify-between border-b-4 border-black pb-3">
              <div className="flex items-center gap-2">
                <span className="bg-p5-crimson text-white font-p5Heading text-lg sm:text-2xl px-3 py-1 -skew-x-6 shadow-[3px_3px_0px_#000000]">
                  NOTICE OF INTENT
                </span>
                <span className="bg-black text-white font-p5Heading text-lg sm:text-2xl px-3 py-1 -skew-x-6">
                  予告状
                </span>
              </div>
              <div className="font-p5Mono text-[10px] sm:text-xs text-zinc-600 uppercase tracking-widest font-extrabold">
                PHANTOM THIEVES OF HEARTS
              </div>
            </div>

            {isSent ? (
              /* Sent State: Dramatic "TAKE YOUR HEART" Seal */
              <div className="p-8 text-center space-y-4 bg-black text-white border-4 border-emerald-500 shadow-[6px_6px_0px_#000000]">
                <Flame className="size-14 text-emerald-400 mx-auto animate-bounce" />
                <h3 className="font-p5Heading text-3xl sm:text-4xl text-emerald-400 uppercase tracking-wider">
                  CALLING CARD DISPATCHED!
                </h3>
                <p className="font-p5Body text-sm sm:text-base text-zinc-300 max-w-lg mx-auto leading-relaxed">
                  Your transmission has pierced through the Cognitive Metaverse and reached Navigator Fuuka's radar terminal.
                  Ferrel will initiate contact shortly.
                </p>
                <div className="pt-2">
                  <button
                    type="button"
                    onClick={() => {
                      playSlash()
                      setIsSent(false)
                    }}
                    className="font-p5Heading text-base bg-emerald-500 hover:bg-white text-black px-6 py-2.5 -skew-x-6 border-2 border-black shadow-[4px_4px_0px_#000000] transition-all hover:scale-105 active:scale-95"
                  >
                    DISPATCH ANOTHER NOTICE
                  </button>
                </div>
              </div>
            ) : (
              /* Interactive Form Formatted as the Calling Card Letter */
              <form onSubmit={handleSend} className="space-y-4">
                {/* Salutation & Recipient */}
                <div className="flex flex-wrap items-center gap-2 font-p5Heading text-lg sm:text-xl text-black">
                  <span>TO SIR / MADAM:</span>
                  <input
                    type="text"
                    value={recipient}
                    onChange={(e) => setRecipient(e.target.value)}
                    className="flex-1 min-w-[200px] bg-white border-b-2 border-black font-p5Heading text-lg sm:text-xl text-p5-crimson px-2 py-0.5 outline-none focus:bg-yellow-50"
                    placeholder="Recipient or Organization Name..."
                    required
                  />
                </div>

                {/* Preset Contract Objectives */}
                <div>
                  <div className="font-p5Mono text-[10px] text-zinc-600 font-extrabold uppercase mb-1.5">
                    SELECT MISSION OBJECTIVE:
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {CONTRACT_PRESETS.map((preset) => (
                      <button
                        key={preset.id}
                        type="button"
                        onClick={() => handleSelectPreset(preset)}
                        onMouseEnter={playHover}
                        className={`
                          font-p5Heading text-xs sm:text-sm px-3 py-1.5 -skew-x-6 border-2 transition-all
                          ${selectedContract === preset.id
                            ? 'bg-black text-white border-black shadow-[3px_3px_0px_#E60012] scale-105'
                            : 'bg-white text-black border-black hover:bg-zinc-200'
                          }
                        `}
                      >
                        {preset.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Declaration Body */}
                <div>
                  <div className="font-p5Mono text-[10px] text-zinc-600 font-extrabold uppercase mb-1.5">
                    DECLARATION BODY:
                  </div>
                  <textarea
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    rows={3}
                    className="w-full bg-white border-2 border-black font-p5Body text-sm text-zinc-900 p-3 outline-none focus:border-p5-crimson resize-none leading-relaxed shadow-inner"
                    placeholder="Declare your collaboration or challenge..."
                    required
                  />
                </div>

                {/* Signature & Dispatch Button */}
                <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t-2 border-zinc-300">
                  <div className="font-p5Sub text-xs text-zinc-700">
                    SIGNATURE: <span className="font-bold text-p5-crimson">FERREL // THE ARCHITECT</span>
                  </div>

                  <button
                    type="submit"
                    onMouseEnter={playHover}
                    className="flex items-center gap-2 bg-p5-crimson hover:bg-black text-white font-p5Heading text-base sm:text-lg px-6 py-2.5 -skew-x-6 border-2 border-black shadow-[4px_4px_0px_#000000] transition-all hover:scale-105 active:scale-95 cursor-pointer"
                  >
                    <Send className="size-4" />
                    DISPATCH CALLING CARD
                  </button>
                </div>
              </form>
            )}
          </div>

        </div>
      </div>
    </div>
  )
}
