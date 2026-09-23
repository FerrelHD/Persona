import React, { useState } from 'react'
import { PageCutoutOverlay } from '@/components/common/PageCutoutOverlay'
import { usePersonaSFX } from '@/hooks/usePersonaSFX'
import { Mail, CheckCircle2, Copy, Send, Radio, ExternalLink, Flame, ShieldAlert } from 'lucide-react'
import confetti from 'canvas-confetti'

interface CallingCardScreenProps {
  onBack: () => void
}

const GithubIcon: React.FC = () => (
  <svg className="size-3.5" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
  </svg>
)

const CONTRACT_PRESETS = [
  {
    id: 'HIRE',
    rank: 'RANK S',
    label: 'HIRE FULL-TIME',
    subject: '[HEIST PROPOSAL] Full-Time Engineering Opportunity',
    text: 'Sir/Madam, our team has identified you as a primary asset. We intend to enlist your full-stack engineering prowesses for an ambitious product.',
  },
  {
    id: 'FREELANCE',
    rank: 'RANK A',
    label: 'FREELANCE HEIST',
    subject: '[HEIST PROPOSAL] Urgent Freelance / Contract Mission',
    text: 'We have an urgent digital heist requiring high-velocity execution, custom shaders, and cutting-edge reactive architecture.',
  },
  {
    id: 'COLLAB',
    rank: 'RANK EX',
    label: 'ALL-OUT COLLAB',
    subject: '[HEIST PROPOSAL] Creative Technology Collaboration',
    text: 'Let us join forces on an open-source or creative technology challenge that will captivate the entire industry.',
  },
  {
    id: 'COFFEE',
    rank: 'CASUAL',
    label: 'CASUAL CHAT',
    subject: '[HEIST PROPOSAL] Tech Talk & Coffee Connect',
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
  const [toastMessage, setToastMessage] = useState<string | null>(null)
  const [isShaking, setIsShaking] = useState(false)

  const USER_EMAIL = 'ferrelrashadakeyla2014@gmail.com'

  const handleSelectPreset = (preset: typeof CONTRACT_PRESETS[0]) => {
    playSlash()
    setSelectedContract(preset.id)
    setMessage(preset.text)
  }

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault()
    playStamp()
    setIsSent(true)
    setIsShaking(true)

    setTimeout(() => setIsShaking(false), 500)

    // Trigger Persona Red & Gold Confetti
    try {
      confetti({
        particleCount: 120,
        spread: 90,
        origin: { x: 0.35, y: 0.55 },
        colors: ['#10B981', '#34D399', '#FFFFFF', '#000000', '#FFD700'],
      })
    } catch {
      // Fallback
    }

    // Prepare mailto link
    const currentPreset = CONTRACT_PRESETS.find(p => p.id === selectedContract) || CONTRACT_PRESETS[0]
    const subject = encodeURIComponent(`${currentPreset.subject} // From ${recipient}`)
    const body = encodeURIComponent(
      `TO: Ferrel (The Architect)\n\nFROM: ${recipient}\nOBJECTIVE: ${currentPreset.label}\n\nDECLARATION:\n${message}\n\n---\nSent via Persona 5 Portfolio Calling Card Dispatch`
    )
    const mailtoUrl = `mailto:${USER_EMAIL}?subject=${subject}&body=${body}`

    // Copy to clipboard
    const fullText = `TO: Ferrel\nRECIPIENT: ${recipient}\nMISSION: ${currentPreset.label}\n\n${message}\n\nContact: ${USER_EMAIL}`
    navigator.clipboard?.writeText(fullText).catch(() => { })

    setToastMessage('DISPATCH COPIED & EMAIL CLIENT OPENED!')
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
    setToastMessage('EMAIL COPIED TO CLIPBOARD!')
    setTimeout(() => {
      setHasCopiedEmail(false)
      setToastMessage(null)
    }, 2500)
  }

  return (
    <div className="fixed inset-0 z-30 flex flex-col justify-between p-4 sm:p-6 md:p-8 select-none overflow-hidden bg-gradient-to-r from-black/95 from-0% via-black/80 via-35% to-transparent to-55% animate-in fade-in duration-200 pt-20 sm:pt-24 md:pt-26 laptop-skills-pad pb-6">
      {/* Page Title Cutout Overlay with COMMS label */}
      <PageCutoutOverlay
        title="COMMS"
        characterRole="NAVIGATOR"
        characterName="FUUKA YAMAGISHI"
        accentColor="emerald"
        onBack={onBack}
      />

      {/* Main Content Area: Centered vertically */}
      <div className="flex-1 flex flex-col justify-center items-start my-auto z-20 w-full max-w-2xl lg:max-w-[53%] pl-2 sm:pl-6 md:pl-8">

        {/* Authentic Physical Calling Card Postcard with Push Pin & Dog-Ear Corner */}
        <div
          className={`relative w-full bg-[#FAF8F5] text-black border-4 sm:border-[5px] border-black shadow-[10px_10px_0px_#000000] -rotate-1 transition-transform duration-300 p-4 sm:p-5 laptop-postcard-pad ${isShaking ? 'animate-bounce' : ''
            }`}
        >
          {/* 3D Bulletin Thumbtack Pin */}
          <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 z-30 flex items-center justify-center pointer-events-none">
            <div className="relative size-6 sm:size-7 rounded-full bg-gradient-to-br from-zinc-700 via-black to-zinc-900 border-2 border-white shadow-[0_4px_6px_rgba(0,0,0,0.7),2px_2px_0px_#000]">
              <div className="absolute inset-1 rounded-full bg-emerald-500 opacity-90" />
              <div className="absolute top-1 left-1.5 size-1.5 rounded-full bg-white opacity-80" />
            </div>
          </div>

          {/* Top Postcard Header: Notice of Intent & Phantom Emblem */}
          <div className="flex items-center justify-between pb-2 border-b-2 sm:border-b-4 border-black mb-3 gap-2">
            <div className="flex items-center gap-2">
              <span className="bg-emerald-600 text-white font-p5Heading text-sm sm:text-lg px-2.5 py-0.5 border-2 border-black shadow-[2px_2px_0px_#000] -rotate-1 tracking-tight">
                NOTICE OF INTENT // いこうひょうめいしょ
              </span>
              <span className="hidden sm:inline-block font-p5Mono text-[9px] text-zinc-500 uppercase tracking-widest font-bold">
                [DOC.P5-CALLING-CARD]
              </span>
            </div>

            {/* Phantom Thieves Wax Seal Badge */}
            <div className="border-2 border-dashed border-emerald-600 bg-emerald-50 text-emerald-700 px-2 py-0.5 rotate-2 font-p5Heading text-[10px] sm:text-xs tracking-wider uppercase flex items-center gap-1 shadow-[2px_2px_0px_#059669]">
              <Flame className="size-3 text-emerald-600 fill-emerald-600 animate-pulse" />
              <span>TAKE YOUR HEART</span>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSend} className="space-y-3 laptop-compact-deck">
            {/* Target Input with Ransom Cutout Styling */}
            <div className="flex items-center gap-2 font-p5Heading text-sm sm:text-base border-b-2 border-zinc-800 pb-1">
              <div className="flex items-center gap-0.5">
                <span className="bg-black text-white px-1.5 py-0.5 text-xs sm:text-sm font-black -skew-x-12">
                  TO
                </span>
                <span className="bg-emerald-600 text-white px-1.5 py-0.5 text-xs sm:text-sm font-black -skew-x-6">
                  TARGET:
                </span>
              </div>
              <input
                type="text"
                value={recipient}
                onChange={e => setRecipient(e.target.value)}
                placeholder="Enter Recipient Company / Team..."
                className="flex-1 bg-transparent font-p5Heading text-emerald-700 text-sm sm:text-lg focus:outline-none uppercase placeholder:text-zinc-400 font-black tracking-tight"
              />
            </div>

            {/* Objective Pills with P5 Ranks */}
            <div>
              <div className="flex items-center justify-between mb-1">
                <span className="font-p5Sub text-[9px] sm:text-[10px] text-zinc-600 uppercase tracking-wider font-bold">
                  SELECT HEIST OBJECTIVE:
                </span>
                <span className="font-p5Mono text-[8px] text-zinc-400">
                  CONFISCATION PROTOCOL
                </span>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5">
                {CONTRACT_PRESETS.map(preset => {
                  const isActive = selectedContract === preset.id
                  return (
                    <button
                      key={preset.id}
                      type="button"
                      onClick={() => handleSelectPreset(preset)}
                      onMouseEnter={playHover}
                      className={`
                        px-2 py-1 font-p5Heading text-[11px] sm:text-xs tracking-wider uppercase border-2 border-black transition-all flex flex-col items-center justify-center
                        ${isActive
                          ? 'bg-emerald-600 text-white shadow-[2.5px_2.5px_0px_#000000] -rotate-1 font-bold scale-[1.02]'
                          : 'bg-white text-black hover:bg-zinc-100'
                        }
                      `}
                    >
                      <span className="font-bold leading-tight">{preset.label}</span>
                      <span className={`text-[8px] font-p5Mono mt-0.5 ${isActive ? 'text-yellow-300' : 'text-zinc-400'}`}>
                        {preset.rank}
                      </span>
                    </button>
                  )
                })}
              </div>
            </div>

            {/* Message Body with Vintage Letter Border */}
            <div>
              <span className="block font-p5Sub text-[9px] sm:text-[10px] text-zinc-600 uppercase tracking-wider mb-0.5 font-bold">
                DECLARATION BODY:
              </span>
              <div className="relative">
                <div className="absolute left-0 top-0 bottom-0 w-1 bg-emerald-600" />
                <textarea
                  rows={2}
                  value={message}
                  onChange={e => setMessage(e.target.value)}
                  className="w-full bg-white border-2 border-black pl-3 pr-2.5 py-2 font-p5Body text-xs sm:text-[13px] text-zinc-900 focus:outline-none focus:border-emerald-600 resize-none leading-relaxed font-semibold"
                />
              </div>
            </div>

            {/* Card Footer: Signature & Dispatch Button */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pt-1.5 border-t-2 border-zinc-300">
              <div className="font-p5Heading text-[11px] sm:text-xs text-zinc-700">
                SIGNATURE: <span className="text-emerald-700 text-xs sm:text-sm font-black">FERREL // THE ARCHITECT</span>
              </div>

              <button
                type="submit"
                onMouseEnter={playHover}
                className={`
                  inline-flex items-center justify-center gap-1.5 px-4 py-1.5 font-p5Heading text-sm sm:text-base tracking-wider uppercase border-2 border-black shadow-[3px_3px_0px_#000000] transition-all cursor-pointer
                  ${isSent
                    ? 'bg-emerald-600 text-white hover:bg-emerald-700'
                    : 'bg-emerald-600 hover:bg-emerald-500 text-white -rotate-1 hover:rotate-0 hover:scale-105 active:scale-95'
                  }
                `}
              >
                {isSent ? (
                  <>
                    <CheckCircle2 className="size-4" />
                    RESEND CALLING CARD
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

          {/* SLAMMED RED STAMP: Renders with violent impact when sent! */}
          {isSent && (
            <div
              className="absolute inset-0 pointer-events-none flex items-center justify-center z-40 overflow-hidden"
              style={{ animation: 'stamp-slam 0.35s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards' }}
            >
              <div className="bg-emerald-600/95 text-white border-4 border-white px-6 py-3 -rotate-12 shadow-[6px_6px_0px_#000000] flex flex-col items-center justify-center">
                <span className="font-p5Heading text-2xl sm:text-3xl font-black tracking-tighter uppercase drop-shadow-[2px_2px_0px_#000]">
                  ★ TAKE YOUR HEART ★
                </span>
                <span className="font-p5Mono text-[10px] sm:text-xs text-yellow-300 font-black tracking-widest uppercase mt-0.5">
                  DISPATCH CONFIRMED // EMAIL OPENED
                </span>
              </div>
            </div>
          )}

          {/* Direct Comms Bar docked at the bottom of the card */}
          <div className="mt-3 pt-2.5 border-t-2 border-dashed border-zinc-400 flex items-center justify-between flex-wrap gap-2 text-[11px] font-p5Mono">
            {/* Email with copy */}
            <button
              type="button"
              onClick={handleCopyEmail}
              className="inline-flex items-center gap-1.5 bg-black text-white px-2.5 py-1 hover:bg-emerald-600 transition-colors border border-black shadow-[2px_2px_0px_#000] cursor-pointer"
              title="Click to Copy Email"
            >
              <Mail className="size-3 text-yellow-300" />
              <span>{USER_EMAIL}</span>
              <Copy className="size-2.5 text-zinc-400 ml-1" />
              {hasCopiedEmail && <span className="text-emerald-400 text-[9px] font-bold">COPIED!</span>}
            </button>

            {/* GitHub */}
            <a
              href="https://github.com/FerrelHD"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 bg-zinc-900 text-white px-2.5 py-1 hover:bg-emerald-600 transition-colors border border-black shadow-[2px_2px_0px_#000] cursor-pointer"
            >
              <GithubIcon />
              <span>@FerrelHD</span>
              <ExternalLink className="size-2.5 text-zinc-400" />
            </a>

            {/* Encrypted Radio Frequency */}
            <div className="hidden sm:flex items-center gap-1.5 text-[10px] text-zinc-600 font-bold">
              <Radio className="size-3 text-emerald-600 animate-pulse" />
              <span>FREQ 108.4 MHZ // FUUKA ENCRYPTION</span>
            </div>
          </div>
        </div>

        {/* Floating Toast Notification */}
        {toastMessage && (
          <div className="mt-3 bg-black text-yellow-300 font-p5Heading text-xs px-4 py-2 border-2 border-yellow-300 shadow-[3px_3px_0px_#059669] -rotate-1 animate-in fade-in slide-in-from-bottom-2 duration-150 flex items-center gap-2">
            <ShieldAlert className="size-3.5 text-emerald-500" />
            <span>{toastMessage}</span>
          </div>
        )}

      </div>
    </div>
  )
}
