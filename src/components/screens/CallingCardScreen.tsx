import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import { usePersonaSFX } from '@/hooks/usePersonaSFX'
import { ArrowLeft, CheckCircle2, Flame, Send } from 'lucide-react'
import confetti from 'canvas-confetti'

interface CallingCardScreenProps {
  onBack: () => void
}

export const CallingCardScreen: React.FC<CallingCardScreenProps> = ({ onBack }) => {
  const { playHover, playSlash, playBack, playStamp } = usePersonaSFX()
  const [recipient, setRecipient] = useState('Innovative Engineering Team')
  const [role, setRole] = useState('Full-Stack Engineer')
  const [statement, setStatement] = useState('building high-performance web systems and unforgettable digital experiences that leave users in awe')
  const [senderName, setSenderName] = useState('')
  const [senderEmail, setSenderEmail] = useState('')
  const [isDispatched, setIsDispatched] = useState(false)

  const handleDispatch = (e: React.FormEvent) => {
    e.preventDefault()
    playStamp()
    setIsDispatched(true)

    try {
      confetti({
        particleCount: 100,
        spread: 80,
        origin: { y: 0.5 },
        colors: ['#E60012', '#000000', '#FFF100', '#FFFFFF']
      })
    } catch {
      // ignore
    }
  }

  return (
    <div className="fixed inset-0 z-30 flex flex-col p-6 md:p-10 bg-black/80 backdrop-blur-sm select-none overflow-hidden animate-in fade-in duration-200">
      {/* Top Header Bar */}
      <div className="flex items-center justify-between border-b-4 border-p5-crimson pb-4 mb-6">
        <div className="flex items-center gap-4">
          <Button
            variant="p5Action"
            onClick={() => { playBack(); onBack(); }}
            onMouseEnter={playHover}
            className="flex items-center gap-2"
          >
            <ArrowLeft className="size-5" /> [ESC] BACK TO MENU
          </Button>

          <div className="flex items-center gap-2">
            <span className="bg-p5-crimson text-white px-3 py-1 font-p5Heading text-2xl -skew-x-12 shadow-[3px_3px_0px_#000000]">
              CALLING CARD // TRANSMIT
            </span>
            <span className="hidden md:inline-block bg-white text-black font-p5Sub text-xs px-2 py-1 uppercase -skew-x-6">
              TAKE YOUR HEART
            </span>
          </div>
        </div>

        <div className="text-xs md:text-sm font-p5Mono text-p5-yellow bg-black/90 px-3 py-1.5 border border-p5-yellow -skew-x-6">
          RYUJI SAKAMOTO // TRANSMISSION READY
        </div>
      </div>

      {/* Main Grid: Form on Left, Live Calling Card on Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 flex-1 min-h-0">
        {/* Form Inputs (5 cols) */}
        <div className="lg:col-span-5 bg-zinc-950/90 border-3 border-black shadow-[6px_6px_0px_#000000] p-5 -skew-x-2 flex flex-col justify-between overflow-y-auto custom-scrollbar">
          <div>
            <div className="flex items-center gap-2 border-b-2 border-zinc-800 pb-2 mb-4">
              <Flame className="size-5 text-p5-crimson" />
              <h3 className="font-p5Heading text-2xl text-white">TRANSMIT BRIEF / HIRE ME</h3>
            </div>

            <form onSubmit={handleDispatch} className="space-y-3">
              <div>
                <label className="block text-xs font-p5Sub text-p5-yellow uppercase mb-1">
                  YOUR NAME / ORG *
                </label>
                <input
                  type="text"
                  required
                  value={senderName}
                  onChange={e => setSenderName(e.target.value)}
                  placeholder="e.g. Acme Labs, Lead Recruiter..."
                  className="w-full bg-zinc-900 border border-zinc-700 px-3 py-1.5 text-xs text-white focus:outline-none focus:border-p5-crimson -skew-x-2"
                />
              </div>

              <div>
                <label className="block text-xs font-p5Sub text-p5-yellow uppercase mb-1">
                  CONTACT EMAIL / LINKEDIN *
                </label>
                <input
                  type="text"
                  required
                  value={senderEmail}
                  onChange={e => setSenderEmail(e.target.value)}
                  placeholder="e.g. recruiter@domain.com"
                  className="w-full bg-zinc-900 border border-zinc-700 px-3 py-1.5 text-xs text-white focus:outline-none focus:border-p5-crimson -skew-x-2"
                />
              </div>

              <div>
                <label className="block text-xs font-p5Sub text-p5-yellow uppercase mb-1">
                  TARGET RECIPIENT
                </label>
                <input
                  type="text"
                  value={recipient}
                  onChange={e => setRecipient(e.target.value)}
                  className="w-full bg-zinc-900 border border-zinc-700 px-3 py-1.5 text-xs text-white focus:outline-none focus:border-p5-crimson -skew-x-2"
                />
              </div>

              <div>
                <label className="block text-xs font-p5Sub text-p5-yellow uppercase mb-1">
                  ROLE / POSITION
                </label>
                <select
                  value={role}
                  onChange={e => setRole(e.target.value)}
                  className="w-full bg-zinc-900 border border-zinc-700 px-3 py-1.5 text-xs text-white focus:outline-none focus:border-p5-crimson -skew-x-2"
                >
                  <option value="Full-Stack Software Engineer">Full-Stack Software Engineer</option>
                  <option value="Frontend Architect">Frontend Architect / Creative Dev</option>
                  <option value="Contract Project Heist">Contract Project / Web App Build</option>
                  <option value="Casual Coffee Chat">Casual Tech Chat / Networking</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-p5Sub text-p5-yellow uppercase mb-1">
                  MISSION STATEMENT
                </label>
                <textarea
                  rows={3}
                  value={statement}
                  onChange={e => setStatement(e.target.value)}
                  className="w-full bg-zinc-900 border border-zinc-700 px-3 py-1.5 text-xs text-white focus:outline-none focus:border-p5-crimson -skew-x-2"
                />
              </div>

              <button
                type="submit"
                onMouseEnter={playHover}
                className="w-full mt-4 bg-p5-crimson hover:bg-white hover:text-black text-white font-p5Heading text-xl py-3 border-2 border-black shadow-[4px_4px_0px_#000000] -skew-x-3 transition-all duration-150 flex items-center justify-center gap-2 cursor-pointer"
              >
                <Send className="size-5" /> DISPATCH PROPOSAL ?
              </button>
            </form>
          </div>

          {isDispatched && (
            <div className="mt-4 bg-green-950/90 border-2 border-green-500 p-3 -skew-x-2 flex items-center gap-2 text-green-300 font-p5Sub text-xs">
              <CheckCircle2 className="size-5 text-green-400 shrink-0" />
              TRANSMISSION RECEIVED! I will respond to your contact details promptly.
            </div>
          )}
        </div>

        {/* Live Calling Card Preview (7 cols) */}
        <div className="lg:col-span-7 flex flex-col justify-center">
          <div className="relative bg-p5-crimson border-4 border-black shadow-[12px_12px_0px_#000000] p-8 -skew-x-3 text-white overflow-hidden">
            {/* Top Cutout Badge */}
            <div className="inline-block bg-black text-white font-p5Heading text-2xl px-4 py-1 -skew-x-6 border-2 border-white mb-4 shadow-[4px_4px_0px_#000000]">
              ★ OFFICIAL CALLING CARD ★
            </div>

            {/* Salutation */}
            <h3 className="font-p5Heading text-3xl md:text-4xl text-black mb-4">
              SIR / MADAM: <span className="text-white underline decoration-black decoration-4">{recipient.toUpperCase()}</span>
            </h3>

            {/* Card Body */}
            <p className="font-p5Body text-lg md:text-xl text-zinc-950 font-bold leading-relaxed mb-6 bg-white/95 p-4 border-2 border-black -skew-x-2 shadow-[4px_4px_0px_#000000]">
              You are hereby notified that <strong className="text-p5-crimson">FERREL</strong> stands prepared to accept the assignment for <strong className="text-black">{role}</strong>, dedicated to {statement}. Prepare to have your expectations thoroughly shattered.
            </p>

            {/* Signature */}
            <div className="flex items-end justify-between border-t-2 border-black pt-4">
              <div>
                <div className="font-p5Sub text-xs text-black">ISSUED BY THE PHANTOM DEVELOPER</div>
                <div className="font-p5Heading text-4xl text-black">FERREL // 2026</div>
              </div>

              <div className="w-16 h-16 md:w-20 md:h-20 bg-black border-2 border-white rounded-full flex items-center justify-center font-p5Heading text-white text-xs text-center p-2 -rotate-12 shadow-[3px_3px_0px_#000000]">
                TAKE YOUR HEART
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
