import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import { usePersonaSFX } from '@/hooks/usePersonaSFX'
import { ArrowLeft, CheckCircle2, Copy, Flame, Mail, Send, Radio } from 'lucide-react'
import confetti from 'canvas-confetti'

interface CallingCardScreenProps {
  onBack: () => void
}

const GithubIcon: React.FC = () => (
  <svg className="size-4" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
  </svg>
)

export const CallingCardScreen: React.FC<CallingCardScreenProps> = ({ onBack }) => {
  const { playHover, playSlash, playBack, playStamp } = usePersonaSFX()
  const [recipient, setRecipient] = useState('Innovative Engineering Team')
  const [message, setMessage] = useState('Sir/Madam, you have stolen the spotlight with impressive challenges. We are prepared to take your tech stack to unprecedented heights.')
  const [isSent, setIsSent] = useState(false)
  const [hasCopiedEmail, setHasCopiedEmail] = useState(false)

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault()
    playStamp()
    setIsSent(true)

    try {
      confetti({
        particleCount: 100,
        spread: 80,
        origin: { y: 0.6 },
        colors: ['#00D4FF', '#10B981', '#FFFFFF', '#FFD700']
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
    <div className="fixed inset-0 z-30 flex flex-col p-6 sm:p-8 md:p-10 select-none overflow-hidden bg-gradient-to-r from-black/90 via-black/60 to-transparent animate-in fade-in duration-200">
      {/* Top Header Bar */}
      <div className="flex items-center justify-between z-20 pb-4 border-b border-emerald-500/30">
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            onClick={() => {
              playBack()
              onBack()
            }}
            className="flex items-center gap-2 bg-black/80 hover:bg-emerald-500/20 text-emerald-400 hover:text-white border border-emerald-500/50 px-4 py-2 text-sm font-p5Mono transition-all duration-150"
          >
            <ArrowLeft className="size-4" />
            <span>[ESC] RETURN</span>
          </Button>

          <div>
            <div className="flex items-center gap-2">
              <span className="bg-emerald-500 text-black text-xs font-p5Mono font-extrabold px-2 py-0.5 tracking-wider">
                SEES NAVIGATOR RADAR
              </span>
              <span className="text-emerald-400 text-xs font-p5Mono tracking-widest hidden sm:inline">
                DIRECT COMM CHANNEL
              </span>
            </div>
            <h1 className="font-p5Heading text-3xl sm:text-4xl text-white tracking-widest uppercase filter drop-shadow-[2px_2px_0px_#000000]">
              TRANSMIT CALLING CARD
            </h1>
          </div>
        </div>

        <div className="hidden lg:flex items-center gap-2 bg-black/60 border border-emerald-500/30 px-3 py-1 font-p5Mono text-xs text-emerald-300">
          <span className="animate-pulse text-emerald-400">●</span> NAVIGATOR // FUUKA YAMAGISHI
        </div>
      </div>

      {/* Main Content: Left side contains UI, Right side is clear for Fuuka */}
      <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 gap-6 mt-4 overflow-hidden z-20">
        <div className="lg:col-span-7 flex flex-col justify-between max-h-[calc(100vh-180px)] overflow-y-auto pr-2 space-y-4">
          {/* Quick Direct Communication Channels */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <button
              type="button"
              onClick={handleCopyEmail}
              onMouseEnter={() => playHover()}
              className="p-3.5 bg-black/80 hover:bg-emerald-950/40 border border-zinc-800 hover:border-emerald-500/60 transition-all text-left flex items-center justify-between -skew-x-2"
            >
              <div className="flex items-center gap-3">
                <Mail className="size-5 text-emerald-400" />
                <div>
                  <div className="font-p5Heading text-sm text-white uppercase">DIRECT EMAIL</div>
                  <div className="font-p5Mono text-xs text-zinc-400">ferrelhd.dev@gmail.com</div>
                </div>
              </div>
              {hasCopiedEmail ? (
                <span className="text-xs font-p5Mono text-green-400 flex items-center gap-1">
                  <CheckCircle2 className="size-3.5" /> COPIED!
                </span>
              ) : (
                <Copy className="size-4 text-zinc-500" />
              )}
            </button>

            <a
              href="https://github.com/FerrelHD"
              target="_blank"
              rel="noreferrer"
              onMouseEnter={() => playHover()}
              className="p-3.5 bg-black/80 hover:bg-emerald-950/40 border border-zinc-800 hover:border-emerald-500/60 transition-all text-left flex items-center justify-between -skew-x-2"
            >
              <div className="flex items-center gap-3">
                <GithubIcon />
                <div>
                  <div className="font-p5Heading text-sm text-white uppercase">GITHUB PROFILE</div>
                  <div className="font-p5Mono text-xs text-zinc-400">@FerrelHD</div>
                </div>
              </div>
              <span className="text-xs font-p5Mono text-emerald-400">OPEN ↗</span>
            </a>
          </div>

          {/* Calling Card Transmit Form Card */}
          <div className="bg-black/80 backdrop-blur-md border border-emerald-500/30 p-5 -skew-x-1 shadow-[0_0_20px_rgba(0,0,0,0.8)]">
            <div className="flex items-center justify-between border-b border-zinc-800 pb-2 mb-3">
              <div className="flex items-center gap-2">
                <Radio className="size-4 text-emerald-400 animate-pulse" />
                <span className="font-p5Mono text-xs text-emerald-400 uppercase tracking-widest">
                  SEES FREQUENCY 108.4 MHz // CALLING CARD TRANSMISSION
                </span>
              </div>
              <span className="text-xs font-p5Mono text-zinc-400">ENCRYPTED</span>
            </div>

            {isSent ? (
              <div className="p-6 bg-emerald-950/30 border border-emerald-500/50 text-center space-y-3">
                <Flame className="size-10 text-emerald-400 mx-auto animate-bounce" />
                <h3 className="font-p5Heading text-2xl text-white uppercase tracking-wide">
                  TRANSMISSION CONFIRMED!
                </h3>
                <p className="font-p5Body text-sm text-zinc-300">
                  Your message has reached Fuuka's radar console. Ferrel will contact your team shortly.
                </p>
                <Button
                  onClick={() => setIsSent(false)}
                  className="font-p5Mono text-xs bg-emerald-500 hover:bg-emerald-400 text-black font-extrabold uppercase px-4 py-2 mt-2"
                >
                  TRANSMIT ANOTHER CARD
                </Button>
              </div>
            ) : (
              <form onSubmit={handleSend} className="space-y-3">
                <div>
                  <label className="block text-xs font-p5Mono text-zinc-400 uppercase mb-1">
                    TARGET RECIPIENT
                  </label>
                  <input
                    type="text"
                    value={recipient}
                    onChange={(e) => setRecipient(e.target.value)}
                    className="w-full bg-zinc-950 border border-zinc-700 focus:border-emerald-400 text-white px-3 py-2 text-sm font-p5Mono outline-none"
                    placeholder="Company or Team Name..."
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-p5Mono text-zinc-400 uppercase mb-1">
                    DECLARATION OF INTENT
                  </label>
                  <textarea
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    rows={3}
                    className="w-full bg-zinc-950 border border-zinc-700 focus:border-emerald-400 text-white px-3 py-2 text-sm font-p5Body outline-none resize-none"
                    placeholder="State your proposition or collaboration request..."
                    required
                  />
                </div>

                <Button
                  type="submit"
                  className="w-full bg-emerald-500 hover:bg-emerald-400 text-black font-p5Mono font-extrabold text-sm uppercase py-3 tracking-wider transition-all duration-150 shadow-[0_0_15px_rgba(16,185,129,0.4)] hover:scale-[1.02]"
                >
                  <Send className="size-4 mr-2" />
                  DISPATCH CALLING CARD
                </Button>
              </form>
            )}
          </div>
        </div>

        {/* Right side (5 cols) intentionally transparent for Fuuka wallpaper */}
        <div className="hidden lg:block lg:col-span-5 pointer-events-none" />
      </div>
    </div>
  )
}
