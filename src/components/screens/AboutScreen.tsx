import React, { useState, useRef, useEffect } from 'react'
import { PageCutoutOverlay } from '@/components/common/PageCutoutOverlay'
import { usePersonaSFX } from '@/hooks/usePersonaSFX'
import { Sun, MessageSquare } from 'lucide-react'

interface AboutScreenProps {
  onBack: () => void
}

interface ChatMessage {
  id: number
  sender: 'FUTABA' | 'MORGANA' | 'FERREL' | 'JOKER'
  role: string
  avatarBg: string
  avatarText: string
  avatarSub: string
  text: string
  hasQuestionMark?: boolean
}

const CHAT_MESSAGES: ChatMessage[] = [
  {
    id: 1,
    sender: 'FUTABA',
    role: 'NAVI // INTEL',
    avatarBg: 'bg-gradient-to-br from-amber-500 to-orange-600',
    avatarText: 'FUTABA',
    avatarSub: 'NAVI',
    text: 'Target identified! Ferrel, a Creative Fullstack Architect from Jakarta!',
  },
  {
    id: 2,
    sender: 'MORGANA',
    role: 'MONA // GUIDE',
    avatarBg: 'bg-gradient-to-br from-cyan-500 to-blue-600',
    avatarText: 'MORGANA',
    avatarSub: 'MONA',
    text: 'Heh! Look at his track record. Enterprise reactivity, sub-second renders, and custom HLSL shaders?!',
  },
  {
    id: 3,
    sender: 'FUTABA',
    role: 'NAVI // INTEL',
    avatarBg: 'bg-gradient-to-br from-amber-500 to-orange-600',
    avatarText: 'FUTABA',
    avatarSub: 'NAVI',
    text: 'And his AI stack is certified! Transformer fine-tuning (IndoBERT) & PyTorch neural architectures on lock!',
  },
  {
    id: 4,
    sender: 'FERREL',
    role: 'ARCHITECT',
    avatarBg: 'bg-gradient-to-br from-red-600 to-black',
    avatarText: 'FERREL',
    avatarSub: 'DEV',
    text: '"Never settle for ordinary interfaces. Every screen deserves character, fluid physics, and soul."',
  },
  {
    id: 5,
    sender: 'JOKER',
    role: 'LEADER // PHANTOM',
    avatarBg: 'bg-gradient-to-br from-zinc-700 to-black',
    avatarText: 'JOKER',
    avatarSub: 'LEADER',
    text: 'Sounds like our kind of architect. Shall we steal some hearts together?',
    hasQuestionMark: true
  },
  {
    id: 6,
    sender: 'FUTABA',
    role: 'NAVI // INTEL',
    avatarBg: 'bg-gradient-to-br from-amber-500 to-orange-600',
    avatarText: 'FUTABA',
    avatarSub: 'NAVI',
    text: 'Ready when you are! Check out his MISSIONS or send a direct dispatch in COMMS!',
  }
]

export const AboutScreen: React.FC<AboutScreenProps> = ({ onBack }) => {
  const { playHover, playSlash } = usePersonaSFX()
  const chatScrollRef = useRef<HTMLDivElement>(null)
  const [visibleCount, setVisibleCount] = useState<number>(CHAT_MESSAGES.length)

  // Scroll to bottom when messages update
  useEffect(() => {
    if (chatScrollRef.current) {
      chatScrollRef.current.scrollTop = chatScrollRef.current.scrollHeight
    }
  }, [visibleCount])

  const handleNextMessage = () => {
    playSlash()
    if (visibleCount < CHAT_MESSAGES.length) {
      setVisibleCount(prev => prev + 1)
    } else {
      if (chatScrollRef.current) {
        chatScrollRef.current.scrollTo({ top: 0, behavior: 'smooth' })
      }
    }
  }

  return (
    <div className="fixed inset-0 z-30 flex flex-col justify-between select-none overflow-hidden bg-gradient-to-r from-black/95 from-0% via-black/70 via-45% to-transparent to-65% animate-in fade-in duration-200">
      {/* Page Title Cutout Overlay with Locked Universal Controller Legend */}
      <PageCutoutOverlay
        title="ABOUT THE DEV"
        characterRole="ENFORCER"
        characterName="SHINJIRO ARAGAKI"
        accentColor="red"
        onBack={onBack}
        extraShortcuts={
          <button
            onClick={handleNextMessage}
            className="flex items-center gap-1.5 hover:text-white group cursor-pointer transition-colors"
            title="Next Chat Message"
          >
            <span className="size-5 rounded-full border-2 border-cyan-400 text-cyan-400 font-bold flex items-center justify-center text-[11px] group-hover:bg-cyan-400 group-hover:text-black transition-colors shadow-[0_0_6px_rgba(34,211,238,0.4)]">
              X
            </span>
            <span className="font-p5Heading text-sm tracking-wider uppercase">NEXT / SCROLL</span>
          </button>
        }
      />

      {/* ── Main Viewport: Persona 5 Smartphone Held by Hands ── */}
      <div className="relative w-full h-full flex items-center justify-start overflow-hidden">
        
        {/* Top-Left Calendar Widget outside phone frame */}
        <div className="absolute top-18 sm:top-20 md:top-22 left-6 sm:left-12 md:left-16 z-30 flex items-center gap-3 -rotate-3 select-none pointer-events-none filter drop-shadow-[4px_4px_0px_#000]">
          <div className="flex items-center gap-1.5 bg-white text-black px-3 py-1 border-2 border-black -skew-x-12">
            <span className="font-p5Heading text-2xl sm:text-3xl font-black tracking-tighter">9/23</span>
            <div className="flex flex-col leading-none ml-1">
              <span className="font-p5Heading text-xs sm:text-sm text-p5-crimson font-black tracking-wider uppercase">WEDNESDAY</span>
              <span className="font-p5Sub text-[9px] text-zinc-800 uppercase tracking-widest font-bold">AFTER SCHOOL</span>
            </div>
          </div>

          <div className="flex items-center gap-1 bg-black text-white px-2.5 py-1 border-2 border-white -skew-x-6 shadow-[2px_2px_0px_#000]">
            <Sun className="size-4 text-p5-yellow animate-spin" style={{ animationDuration: '12s' }} />
            <span className="font-p5Heading text-xs text-p5-yellow tracking-wider">DAYTIME</span>
          </div>
        </div>

        {/* ── The 16:9 Frame Holding the Phone (Shifted Down & Left as requested) ── */}
        <div 
          className="relative h-[82vh] sm:h-[86vh] md:h-[88vh] aspect-[1673/940] max-w-none -translate-x-[18%] sm:-translate-x-[14%] md:-translate-x-[10%] translate-y-8 sm:translate-y-12 md:translate-y-14 pointer-events-auto"
        >
          {/* ── 1. MATHEMATICAL SCREEN CUTOUT: 100% Zero-Leak Polygon Mask ── */}
          <div
            className="absolute inset-0 z-10 overflow-hidden"
            style={{
              clipPath: 'polygon(41.4% 7.2%, 58.0% 10.8%, 55.2% 89.2%, 35.8% 91.8%)',
            }}
          >
            {/* Solid Crimson Red Screen (#D90011) */}
            <div className="w-full h-full bg-[#D90011] relative overflow-hidden">
              {/* Subtle Manga Comic Particle Specks in Screen Background */}
              <div 
                className="absolute inset-0 pointer-events-none opacity-20 bg-[radial-gradient(#FFFFFF_1.5px,transparent_1.5px)] [background-size:12px_12px]"
                aria-hidden="true"
              />

              {/* ── Tilted Chat Content Area (Precisely Aligned to Phone's -6.7° Tilt) ── */}
              <div
                className="absolute flex flex-col justify-between overflow-hidden"
                style={{
                  left: '47.5%',
                  top: '50%',
                  width: '17.2%',
                  height: '80%',
                  transform: 'translate(-50%, -50%) rotate(-6.7deg)',
                }}
              >
                {/* ── PHONE HEADER BAR: Authentic 'IM' Logo & Group Status ── */}
                <div className="relative z-10 flex items-center justify-between pb-1.5 pt-3 sm:pt-4 border-b-2 border-black/40 px-1">
                  <div className="flex items-center gap-1.5">
                    <div className="relative flex items-center bg-black text-white px-2 py-0.5 -skew-x-12 border-2 border-white shadow-[2px_2px_0px_#000000]">
                      <span className="font-p5Heading text-sm sm:text-base font-black tracking-tight text-white">
                        I<span className="text-p5-crimson">M</span>
                      </span>
                    </div>

                    {/* Red Notification Pill (6) */}
                    <div className="bg-white text-p5-crimson font-p5Heading text-[9px] font-black px-1.5 py-0.2 rounded-full border border-black shadow-[1px_1px_0px_#000000] -rotate-6 animate-bounce">
                      6
                    </div>

                    <span className="font-p5Heading text-[10px] sm:text-[11px] text-white tracking-widest uppercase ml-0.5 drop-shadow-[1px_1px_0px_#000]">
                      PHANTOM_CHAT
                    </span>
                  </div>
                </div>

                {/* ── SCROLLABLE CHAT MESSAGES THREAD ── */}
                <div 
                  ref={chatScrollRef}
                  className="relative z-10 flex-1 overflow-y-auto space-y-2.5 my-1.5 px-1 pr-1.5 custom-scrollbar"
                >
                  {CHAT_MESSAGES.slice(0, visibleCount).map((msg) => {
                    const isFerrel = msg.sender === 'FERREL'
                    return (
                      <div 
                        key={msg.id} 
                        className="flex items-start gap-1 sm:gap-1.5 animate-in fade-in slide-in-from-bottom-2 duration-200 group"
                        onMouseEnter={playHover}
                      >
                        {/* Character Avatar Box */}
                        <div className="shrink-0 -rotate-3 group-hover:rotate-0 transition-transform">
                          <div className={`size-7 sm:size-8 md:size-9 ${msg.avatarBg} border-1.5 border-black shadow-[2px_2px_0px_#000000] flex flex-col items-center justify-center -skew-x-6 p-0.5`}>
                            <span className="font-p5Heading text-[7px] sm:text-[8px] text-white font-black tracking-wider leading-none text-center">
                              {msg.avatarText}
                            </span>
                            <span className="font-p5Mono text-[5px] sm:text-[6px] text-yellow-300 font-bold tracking-tighter uppercase mt-0.5 leading-none">
                              {msg.avatarSub}
                            </span>
                          </div>
                        </div>

                        {/* Persona 5 Asymmetrical Speech Bubble */}
                        <div className="relative flex-1">
                          {/* Speech Bubble Beak */}
                          <div 
                            className="absolute -left-1 top-2 w-0 h-0 border-y-4 border-y-transparent border-r-[6px] border-r-white z-10 filter drop-shadow-[-1px_0px_0px_#000]" 
                          />

                          {/* Speech Balloon Body */}
                          <div 
                            className={`
                              relative bg-white text-black p-1.5 sm:p-2 border-1.5 border-black shadow-[2.5px_2.5px_0px_#000000] -skew-x-3 transition-transform duration-100 group-hover:scale-[1.01]
                              ${isFerrel ? 'bg-amber-50 border-p5-crimson shadow-[2.5px_2.5px_0px_#E60012]' : ''}
                            `}
                          >
                            <div className="flex items-center justify-between text-[7px] sm:text-[8px] font-p5Mono text-zinc-500 mb-0.5">
                              <span className="font-bold text-black uppercase tracking-wider">
                                {msg.sender}
                              </span>
                              <span className="text-[6px] text-zinc-600">
                                {msg.role}
                              </span>
                            </div>

                            <p className="font-p5Body text-[10px] sm:text-[11px] font-semibold text-black leading-tight tracking-tight">
                              {msg.text}
                            </p>

                            {msg.hasQuestionMark && (
                              <span className="absolute -top-2 -right-1 bg-p5-crimson text-white font-p5Heading text-[10px] font-black px-1 py-0.2 border border-black shadow-[1.5px_1.5px_0px_#000000] rotate-12 animate-pulse">
                                ?
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    )
                  })}
                </div>

                {/* ── FOOTER TYPING PROMPT ── */}
                <div className="relative z-10 pb-2 sm:pb-3 pt-1 border-t-2 border-black/40 flex items-center justify-between px-1">
                  <div 
                    onClick={handleNextMessage}
                    className="flex items-center gap-1 bg-black text-white px-2 py-0.5 border border-white -skew-x-12 shadow-[1.5px_1.5px_0px_#000] cursor-pointer hover:bg-zinc-800 transition-colors"
                  >
                    <MessageSquare className="size-2.5 text-p5-yellow" />
                    <span className="font-p5Heading text-[9px] sm:text-[10px] tracking-wider text-p5-yellow animate-pulse">
                      {visibleCount < CHAT_MESSAGES.length ? 'NEW MESSAGE...' : 'TAP (X) REPLAY'}
                    </span>
                  </div>

                  <div className="text-[8px] sm:text-[9px] font-p5Mono text-white/90 drop-shadow-[1px_1px_0px_#000]">
                    {visibleCount}/{CHAT_MESSAGES.length}
                  </div>
                </div>

              </div>
            </div>
          </div>

          {/* ── 2. OVERLAY: Authentic Phone & Hands PNG (phone hold.png) ── */}
          <img
            src="/assets/phone_hold.png"
            alt="Persona 5 Smartphone in Hand"
            className="absolute inset-0 w-full h-full object-contain pointer-events-none select-none z-20 filter drop-shadow-[12px_12px_0px_rgba(0,0,0,0.85)]"
          />

        </div>

      </div>
    </div>
  )
}
