import React, { useState } from 'react'
import { PageCutoutOverlay } from '@/components/common/PageCutoutOverlay'
import { usePersonaSFX } from '@/hooks/usePersonaSFX'
import { Mail, CheckCircle2, Copy, Send, Radio } from 'lucide-react'
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
        particleCount: 100,
        spread: 80,
        origin: { x: 0.35, y: 0.6 },
        colors: ['#E60012', '#FFFFFF', '#000000', '#FFD700'],
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
    <div className="fixed inset-0 z-30 flex flex-col p-6 sm:p-8 md:p-10 select-none overflow-hidden bg-gradient-to-r from-black/95 from-0% via-black/80 via-35% to-transparent to-55% animate-in fade-in duration-200 pt-36 sm:pt-40 md:pt-44">
      {/* Page Title Cutout Overlay */}
      <PageCutoutOverlay
        title="CALLING CARD"
        characterRole="NAVIGATOR"
        characterName="FUUKA YAMAGISHI"
        accentColor="emerald"
        onBack={onBack}
      />

      {/* Main Content Area: Left side has the Clean Authentic Calling Card Postcard */}
      <div className="flex-1 flex flex-col justify-center items-start mt-6 sm:mt-10 overflow-hidden z-20 w-full max-w-2xl lg:max-w-[54%] pl-2 sm:pl-6 md:pl-10">
        
        {/* Authentic Physical Calling Card Postcard */}
        <div className="w-full bg-[#FAF8F5] text-black border-4 sm:border-[5px] border-black shadow-[10px_10px_0px_#000000] -rotate-1 sm:-rotate-2 transition-transform duration-300 p-5 sm:p-7 relative overflow-hidden">
          
          {/* Top Postcard Header: Notice of Intent & Phantom Stamp */}
          <div className="flex items-center justify-between pb-3 border-b-2 sm:border-b-4 border-black mb-4">
            <div className="flex items-center gap-2">
              <span className="bg-p5-crimson text-white font-p5Heading text-base sm:text-xl px-3 py-0.5 border-2 border-black shadow-[2px_2px_0px_#000] -rotate-1">
                NOTICE OF INTENT // 予告状
              </span>
            </div>

            {/* Persona Stamp Badge */}
            <div className="border-2 border-dashed border-p5-crimson text-p5-crimson px-2.5 py-0.5 rotate-3 font-p5Heading text-xs sm:text-sm tracking-wider uppercase flex items-center gap-1 shadow-[2px_2px_0px_#E60012]">
              <span>★</span> TAKE YOUR HEART
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSend} className="space-y-4">
            {/* Target Input */}
            <div className="flex items-center gap-2 font-p5Heading text-base sm:text-lg border-b-2 border-zinc-800 pb-1">
              <span className="text-black uppercase whitespace-nowrap">TO SIR / MADAM:</span>
              <input
                type="text"
                value={recipient}
                onChange={e => setRecipient(e.target.value)}
                placeholder="Enter Recipient Organization..."
                className="flex-1 bg-transparent font-p5Heading text-p5-crimson text-base sm:text-xl focus:outline-none uppercase placeholder:text-zinc-400"
              />
            </div>

            {/* Objective Pills */}
            <div>
              <span className="block font-p5Sub text-[10px] sm:text-xs text-zinc-600 uppercase tracking-wider mb-1.5">
                SELECT HEIST OBJECTIVE:
              </span>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5 sm:gap-2">
                {CONTRACT_PRESETS.map(preset => {
                  const isActive = selectedContract === preset.id
                  return (
                    <button
                      key={preset.id}
                      type="button"
                      onClick={() => handleSelectPreset(preset)}
                      onMouseEnter={playHover}
                      className={`
                        px-2 py-1.5 font-p5Heading text-xs sm:text-sm tracking-wider uppercase border-2 border-black transition-all
                        ${isActive
                          ? 'bg-p5-crimson text-white shadow-[3px_3px_0px_#000000] -rotate-1 scale-102 font-bold'
                          : 'bg-white text-black hover:bg-zinc-100'
                        }
                      `}
                    >
                      {preset.label}
                    </button>
                  )
                })}
              </div>
            </div>

            {/* Message Body */}
            <div>
              <span className="block font-p5Sub text-[10px] sm:text-xs text-zinc-600 uppercase tracking-wider mb-1">
                DECLARATION BODY:
              </span>
              <textarea
                rows={3}
                value={message}
                onChange={e => setMessage(e.target.value)}
                className="w-full bg-white border-2 border-black p-3 font-p5Body text-xs sm:text-sm text-zinc-800 focus:outline-none focus:border-p5-crimson resize-none leading-relaxed shadow-[inner_2px_2px_4px_rgba(0,0,0,0.1)]"
              />
            </div>

            {/* Card Footer: Signature & Dispatch Button */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-2 border-t-2 border-zinc-300">
              <div className="font-p5Heading text-xs sm:text-sm text-zinc-700">
                SIGNATURE: <span className="text-p5-crimson text-sm sm:text-base">FERREL // THE ARCHITECT</span>
              </div>

              <button
                type="submit"
                disabled={isSent}
                onMouseEnter={playHover}
                className={`
                  inline-flex items-center justify-center gap-2 px-5 py-2 font-p5Heading text-base sm:text-lg tracking-wider uppercase border-2 sm:border-[3px] border-black shadow-[4px_4px_0px_#000000] transition-all
                  ${isSent
                    ? 'bg-emerald-500 text-white cursor-default'
                    : 'bg-p5-crimson hover:bg-red-600 text-white -rotate-1 hover:rotate-0 hover:scale-105 active:scale-95'
                  }
                `}
              >
                {isSent ? (
                  <>
                    <CheckCircle2 className="size-4" />
                    CARD DISPATCHED!
                  </>
                ) : (
                  <>
                    <Send className="size-4" />
                    DISPATCH CALLING CARD
                  </>
                )}
              </button>
            </div>
          </form>

          {/* Direct Comms Bar docked at the bottom of the card */}
          <div className="mt-4 pt-3 border-t-2 border-dashed border-zinc-400 flex items-center justify-between flex-wrap gap-2 text-xs font-p5Mono">
            <button
              type="button"
              onClick={handleCopyEmail}
              className="inline-flex items-center gap-1.5 bg-black text-white px-2.5 py-1 hover:bg-p5-crimson transition-colors border border-black shadow-[2px_2px_0px_#000]"
            >
              <Mail className="size-3.5 text-yellow-300" />
              <span>ferrelhd.dev@gmail.com</span>
              <Copy className="size-3 text-zinc-400 ml-1" />
              {hasCopiedEmail && <span className="text-emerald-400 text-[10px] font-bold">COPIED!</span>}
            </button>

            <a
              href="https://github.com/FerrelHD"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 bg-zinc-900 text-white px-2.5 py-1 hover:bg-p5-crimson transition-colors border border-black shadow-[2px_2px_0px_#000]"
            >
              <GithubIcon />
              <span>@FerrelHD</span>
            </a>

            <div className="hidden sm:flex items-center gap-1 text-[11px] text-zinc-500">
              <Radio className="size-3 text-p5-crimson" />
              <span>FREQ 108.4 MHZ</span>
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}
