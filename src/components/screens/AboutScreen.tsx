import React, { useState, useRef, useEffect } from 'react'
import { PageCutoutOverlay } from '@/components/common/PageCutoutOverlay'
import { usePersonaSFX } from '@/hooks/usePersonaSFX'
import { MessageSquare } from 'lucide-react'

interface AboutScreenProps {
  onBack: () => void
}

interface ChatMessage {
  id: number
  sender: 'FUTABA' | 'MORGANA' | 'FERREL' | 'JOKER'
  role: string
  avatarImg: string
  avatarBg: string
  nameColor: string
  isSent?: boolean
  text: string
  hasQuestionMark?: boolean
}

const CHAT_MESSAGES: ChatMessage[] = [
  {
    id: 1,
    sender: 'FUTABA',
    role: 'NAVI // INTEL',
    avatarImg: '/assets/p5r_renders/futaba.png',
    avatarBg: 'bg-amber-500',
    nameColor: 'text-amber-400',
    text: 'Target identified! Ferrel, a Creative Fullstack Architect from Jakarta!',
  },
  {
    id: 2,
    sender: 'MORGANA',
    role: 'MONA // GUIDE',
    avatarImg: '/assets/morgana.jpg',
    avatarBg: 'bg-cyan-600',
    nameColor: 'text-cyan-400',
    text: 'Heh! Look at his track record. Enterprise reactivity, sub-second renders, and custom HLSL shaders?!',
  },
  {
    id: 3,
    sender: 'FUTABA',
    role: 'NAVI // INTEL',
    avatarImg: '/assets/p5r_renders/futaba.png',
    avatarBg: 'bg-amber-500',
    nameColor: 'text-amber-400',
    text: 'And his AI stack is certified! Transformer fine-tuning (IndoBERT) & PyTorch neural architectures on lock!',
  },
  {
    id: 4,
    sender: 'FERREL',
    role: 'ARCHITECT // DEV',
    avatarImg: '/assets/ferrel-portrait.jpg',
    avatarBg: 'bg-red-600',
    nameColor: 'text-p5-crimson',
    isSent: true,
    text: '"Never settle for ordinary interfaces. Every screen deserves character, fluid physics, and soul."',
  },
  {
    id: 5,
    sender: 'JOKER',
    role: 'LEADER // PHANTOM',
    avatarImg: '/assets/joker.jpg',
    avatarBg: 'bg-zinc-800',
    nameColor: 'text-zinc-300',
    text: 'Sounds like our kind of architect. Shall we steal some hearts together?',
    hasQuestionMark: true
  },
  {
    id: 6,
    sender: 'FUTABA',
    role: 'NAVI // INTEL',
    avatarImg: '/assets/p5r_renders/futaba.png',
    avatarBg: 'bg-amber-500',
    nameColor: 'text-amber-400',
    text: 'Ready when you are! Check out his MISSIONS or send a direct dispatch in COMMS!',
  }
]

export const AboutScreen: React.FC<AboutScreenProps> = ({ onBack }) => {
  const { playHover, playSlash } = usePersonaSFX()
  const chatScrollRef = useRef<HTMLDivElement>(null)

  // Real-time Persona 5 Calendar Date & Time Slot
  const [currentDate, setCurrentDate] = useState(() => new Date())

  useEffect(() => {
    const timer = setInterval(() => setCurrentDate(new Date()), 60000)
    return () => clearInterval(timer)
  }, [])

  const month = currentDate.getMonth() + 1
  const dateNum = currentDate.getDate()
  const days = ['SUNDAY', 'MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY', 'SATURDAY']
  const dayName = days[currentDate.getDay()]
  const hours = currentDate.getHours()

  let timeSlot = 'AFTER SCHOOL'
  if (hours >= 0 && hours < 6) {
    timeSlot = 'DARK HOUR'
  } else if (hours >= 6 && hours < 12) {
    timeSlot = 'MORNING'
  } else if (hours >= 12 && hours < 16) {
    timeSlot = 'AFTER SCHOOL'
  } else if (hours >= 16 && hours < 19) {
    timeSlot = 'AFTERNOON'
  } else if (hours >= 19 && hours < 23) {
    timeSlot = 'EVENING'
  } else {
    timeSlot = 'NIGHT'
  }

  // Ensure chat starts from the very top on initial mount
  useEffect(() => {
    if (chatScrollRef.current) {
      chatScrollRef.current.scrollTop = 0
    }
  }, [])

  const handleNextMessage = () => {
    playSlash()
    if (chatScrollRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = chatScrollRef.current
      const isNearBottom = scrollTop + clientHeight >= scrollHeight - 25
      if (isNearBottom) {
        chatScrollRef.current.scrollTo({ top: 0, behavior: 'smooth' })
      } else {
        chatScrollRef.current.scrollBy({ top: 110, behavior: 'smooth' })
      }
    }
  }

  // Keyboard navigation: X, Enter, Down Arrow to scroll down, Up Arrow to scroll up
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'x' || e.key === 'X' || e.key === 'Enter' || e.key === 'ArrowDown') {
        e.preventDefault()
        handleNextMessage()
      } else if (e.key === 'ArrowUp') {
        e.preventDefault()
        playHover()
        if (chatScrollRef.current) {
          chatScrollRef.current.scrollBy({ top: -110, behavior: 'smooth' })
        }
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [playHover, playSlash])

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

      {/* Main Viewport: Persona 5 Smartphone Held by Hands */}
      <div className="relative w-full h-full flex items-center justify-start overflow-hidden p5-phone-entrance">
        
        {/* The 16:9 Frame Holding the Phone (Shifted Down & Left as requested) */}
        <div 
          className="relative h-[84vh] sm:h-[88vh] md:h-[90vh] laptop-phone-wrapper aspect-[1673/940] max-w-none -translate-x-[18%] sm:-translate-x-[14%] md:-translate-x-[10%] translate-y-12 sm:translate-y-16 md:translate-y-18 pointer-events-auto"
        >
          {/* 1. Base Phone Artwork with Seamless Pre-filled Crimson Red Screen (Solusi 1) */}
          <img
            src="/assets/phone_hold_filled.png"
            alt="Persona 5 Smartphone in Hand"
            className="absolute inset-0 w-full h-full object-contain pointer-events-none select-none z-10 filter drop-shadow-[14px_14px_0px_rgba(0,0,0,0.85)]"
          />

          {/* Top-Right Calendar Widget anchored precisely to the top-right of the phone */}
          <div
            className="absolute z-30 select-none pointer-events-none filter drop-shadow-[5px_5px_0px_#000000] laptop-phone-calendar"
            style={{
              left: '56.5%',
              top: '5.5%',
              transform: 'rotate(5.5deg)',
            }}
          >
            <div className="flex items-center gap-1.5 bg-white text-black px-2.5 sm:px-3.5 py-0.5 sm:py-1 border-2 border-black -skew-x-12 shadow-[3px_3px_0px_#E60012]">
              <span className="font-p5Heading text-xl sm:text-2xl md:text-3xl font-black tracking-tighter">
                {month}/{dateNum}
              </span>
              <div className="flex flex-col leading-none ml-1">
                <span className="font-p5Heading text-[11px] sm:text-xs md:text-sm text-p5-crimson font-black tracking-wider uppercase">
                  {dayName}
                </span>
                <span className="font-p5Sub text-[8px] sm:text-[9px] text-zinc-800 uppercase tracking-widest font-bold">
                  {timeSlot}
                </span>
              </div>
            </div>
          </div>

          {/* 2. Tilted Chat Content Area (Mathematically Aligned at +5.8deg Clockwise) */}
          <div
            className="absolute z-20 flex flex-col justify-between overflow-hidden"
            style={{
              left: '48.2%',
              top: '47.5%',
              width: '17.4%',
              height: '76%',
              transform: 'translate(-50%, -50%) rotate(6.6deg)',
            }}
          >
            {/* Subtle Manga Comic Halftone Specks in Screen Background */}
            <div 
              className="absolute inset-0 pointer-events-none opacity-20 bg-[radial-gradient(#000000_1.5px,transparent_1.5px)] [background-size:10px_10px]"
              aria-hidden="true"
            />

            {/* PHONE HEADER BAR: Cleared safely below the camera notch */}
            <div className="relative z-10 flex items-center justify-between pb-1.5 pt-4 sm:pt-5 border-b-2 border-black/40 px-1 laptop-phone-header">
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

            {/* SCROLLABLE CHAT MESSAGES THREAD (Authentic P5 Royal IM Style) */}
            <div 
              ref={chatScrollRef}
              className="relative z-10 flex-1 overflow-y-auto space-y-2.5 my-1.5 px-0.5 pb-2 no-scrollbar [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden laptop-phone-chat"
            >
              {CHAT_MESSAGES.map((msg) => {
                const isSent = msg.isSent

                return (
                  <div 
                    key={msg.id} 
                    className="flex items-start gap-1.5 sm:gap-2 animate-in fade-in slide-in-from-bottom-2 duration-200 group laptop-phone-item"
                    onMouseEnter={playHover}
                  >
                    {/* Character Avatar Box (Real Character Portrait Render) */}
                    <div className="shrink-0 -rotate-2 group-hover:rotate-0 transition-transform">
                      <div className={`size-8 sm:size-9 md:size-10 ${msg.avatarBg} border-2 border-black shadow-[2px_2px_0px_#000000] overflow-hidden flex items-center justify-center p-0.5 laptop-phone-avatar`}>
                        <img 
                          src={msg.avatarImg} 
                          alt={msg.sender} 
                          className="w-full h-full object-cover object-top scale-110 select-none pointer-events-none"
                        />
                      </div>
                    </div>

                    {/* Persona 5 Authentic Speech Bubble */}
                    <div className="relative flex-1 min-w-0 group-hover:scale-[1.01] transition-transform">
                      {isSent ? (
                        /* Ferrel (Sent Message) Style: Bold White Card with Crimson Accent */
                        <>
                          {/* Speech Bubble Beak */}
                          <div 
                            className="absolute -left-1.5 top-2.5 w-0 h-0 border-y-[5px] border-y-transparent border-r-[7px] border-r-white z-20" 
                          />
                          <div 
                            className="absolute -left-[9px] top-2.5 w-0 h-0 border-y-[5px] border-y-transparent border-r-[7px] border-r-p5-crimson z-10" 
                          />

                          <div className="relative bg-white text-black p-2 sm:p-2.5 border-2 border-p5-crimson shadow-[3px_3px_0px_#E60012] mr-0.5 laptop-phone-bubble">
                            <div className="flex items-center justify-between text-[8px] sm:text-[9px] font-p5Mono mb-1 laptop-phone-meta">
                              <div className="flex items-center gap-1">
                                <span className="bg-p5-crimson text-white px-1 py-0.2 text-[7px] sm:text-[8px] font-black -skew-x-6">
                                  YOU
                                </span>
                                <span className="font-black text-black uppercase tracking-wider">
                                  {msg.sender}
                                </span>
                              </div>
                              <span className="text-[7px] sm:text-[8px] text-p5-crimson font-black tracking-tight">
                                {msg.role}
                              </span>
                            </div>

                            <p className="font-p5Body text-[11px] sm:text-[12px] font-extrabold text-black leading-snug tracking-tight laptop-phone-text">
                              {msg.text}
                            </p>
                          </div>
                        </>
                      ) : (
                        /* Teammates (Received Message) Style: Sleek Black P5 Cutout with White Border */
                        <>
                          {/* Speech Bubble Beak */}
                          <div 
                            className="absolute -left-1.5 top-2.5 w-0 h-0 border-y-[5px] border-y-transparent border-r-[7px] border-r-black z-20" 
                          />
                          <div 
                            className="absolute -left-[9px] top-2.5 w-0 h-0 border-y-[5px] border-y-transparent border-r-[7px] border-r-white z-10" 
                          />

                          <div className="relative bg-black text-white p-2 sm:p-2.5 border-2 border-white shadow-[3px_3px_0px_#000000] mr-0.5 laptop-phone-bubble">
                            <div className="flex items-center justify-between text-[8px] sm:text-[9px] font-p5Mono mb-1 laptop-phone-meta">
                              <span className={`font-black uppercase tracking-wider ${msg.nameColor}`}>
                                {msg.sender}
                              </span>
                              <span className="text-[7px] sm:text-[8px] text-zinc-400 font-semibold tracking-tight">
                                {msg.role}
                              </span>
                            </div>

                            <p className="font-p5Body text-[11px] sm:text-[12px] font-bold text-white leading-snug tracking-tight laptop-phone-text">
                              {msg.text}
                            </p>

                            {msg.hasQuestionMark && (
                              <span className="absolute -top-2.5 -right-1.5 bg-p5-crimson text-white font-p5Heading text-xs font-black px-1.5 py-0.2 border-2 border-white shadow-[2px_2px_0px_#000000] rotate-12 animate-pulse">
                                ?
                              </span>
                            )}
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                )
              })}
            </div>

            {/* FOOTER TYPING PROMPT: Positioned cleanly above home bar */}
            <div className="relative z-10 pb-2 sm:pb-3 pt-1 border-t-2 border-black/40 flex items-center justify-between px-1 laptop-phone-footer">
              <div 
                onClick={handleNextMessage}
                className="flex items-center gap-1 bg-black text-white px-2 py-0.5 border border-white -skew-x-12 shadow-[1.5px_1.5px_0px_#000] cursor-pointer hover:bg-zinc-800 transition-colors"
              >
                <MessageSquare className="size-2.5 text-p5-yellow" />
                <span className="font-p5Heading text-[9px] sm:text-[10px] tracking-wider text-p5-yellow animate-pulse">
                  TAP (X) SCROLL
                </span>
              </div>

              <div className="text-[8px] sm:text-[9px] font-p5Mono text-white/90 drop-shadow-[1px_1px_0px_#000]">
                {CHAT_MESSAGES.length} MSGS
              </div>
            </div>

          </div>
        </div>

      </div>
    </div>
  )
}
