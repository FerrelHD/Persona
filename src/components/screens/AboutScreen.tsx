import React, { useState, useRef, useEffect } from 'react'
import { PageCutoutOverlay } from '@/components/common/PageCutoutOverlay'
import { usePersonaSFX } from '@/hooks/usePersonaSFX'
import { Sun, MessageSquare, ChevronDown } from 'lucide-react'

interface AboutScreenProps {
  onBack: () => void
}

interface ChatMessage {
  id: number
  sender: 'FUTABA' | 'MORGANA' | 'FERREL' | 'JOKER'
  role: string
  avatarBg: string
  badgeColor: string
  avatarText: string
  avatarSub: string
  text: string
  highlight?: string
  hasQuestionMark?: boolean
}

const CHAT_MESSAGES: ChatMessage[] = [
  {
    id: 1,
    sender: 'FUTABA',
    role: 'NAVI // INTEL',
    avatarBg: 'bg-gradient-to-br from-amber-500 to-orange-600',
    badgeColor: 'border-amber-400 text-amber-300',
    avatarText: 'FUTABA',
    avatarSub: 'NAVI',
    text: 'Target identified! Ferrel, a Creative Fullstack Architect from Jakarta!',
    highlight: 'Creative Fullstack Architect'
  },
  {
    id: 2,
    sender: 'MORGANA',
    role: 'MONA // GUIDE',
    avatarBg: 'bg-gradient-to-br from-cyan-500 to-blue-600',
    badgeColor: 'border-cyan-400 text-cyan-300',
    avatarText: 'MORGANA',
    avatarSub: 'MONA',
    text: 'Heh! Look at his parameters. Enterprise reactivity, sub-second renders, and custom HLSL shaders?!',
    highlight: 'Enterprise reactivity & custom HLSL'
  },
  {
    id: 3,
    sender: 'FUTABA',
    role: 'NAVI // INTEL',
    avatarBg: 'bg-gradient-to-br from-amber-500 to-orange-600',
    badgeColor: 'border-amber-400 text-amber-300',
    avatarText: 'FUTABA',
    avatarSub: 'NAVI',
    text: 'And his AI stack is certified! Transformer fine-tuning (IndoBERT) & PyTorch neural architectures on lock!',
    highlight: 'IndoBERT & PyTorch'
  },
  {
    id: 4,
    sender: 'FERREL',
    role: 'ARCHITECT // METAVERSE',
    avatarBg: 'bg-gradient-to-br from-red-600 to-black',
    badgeColor: 'border-p5-crimson text-white',
    avatarText: 'FERREL',
    avatarSub: 'ARCHITECT',
    text: '"Never settle for ordinary interfaces. Every screen deserves character, fluid physics, and soul."',
    highlight: 'Never settle for ordinary interfaces'
  },
  {
    id: 5,
    sender: 'JOKER',
    role: 'LEADER // PHANTOM',
    avatarBg: 'bg-gradient-to-br from-zinc-700 to-black',
    badgeColor: 'border-white text-white',
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
    badgeColor: 'border-amber-400 text-amber-300',
    avatarText: 'FUTABA',
    avatarSub: 'NAVI',
    text: 'Ready when you are! Check out his MISSIONS or send a direct dispatch in COMMS!',
    highlight: 'MISSIONS or COMMS'
  }
]

export const AboutScreen: React.FC<AboutScreenProps> = ({ onBack }) => {
  const { playHover, playSlash } = usePersonaSFX()
  const chatScrollRef = useRef<HTMLDivElement>(null)
  const [visibleCount, setVisibleCount] = useState<number>(CHAT_MESSAGES.length)

  // Scroll to bottom when new messages arrive
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
      // Loop or reset scroll to top
      if (chatScrollRef.current) {
        chatScrollRef.current.scrollTo({ top: 0, behavior: 'smooth' })
      }
    }
  }

  return (
    <div className="fixed inset-0 z-30 flex flex-col justify-between p-4 sm:p-6 md:p-8 select-none overflow-hidden bg-gradient-to-r from-black/95 from-0% via-black/75 via-45% to-transparent to-65% animate-in fade-in duration-200 pt-20 sm:pt-24 pb-6">
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

      {/* ── Main Content Area: Left-Aligned Persona 5 Smartphone IM View ── */}
      <div className="flex-1 flex flex-col justify-center items-start my-auto z-20 w-full max-w-xl lg:max-w-[46%] pl-2 sm:pl-6 md:pl-8">
        
        {/* Authentic Top-Left Calendar & Weather Widget (From Screenshot) */}
        <div className="flex items-center gap-3 mb-2 ml-3 sm:ml-6 -rotate-3 z-30 select-none pointer-events-none">
          {/* Calendar Badge: 9 / 23 WEDNESDAY */}
          <div className="flex items-center gap-1.5 bg-white text-black px-3 py-1 border-2 border-black shadow-[4px_4px_0px_#000000] -skew-x-12">
            <span className="font-p5Heading text-2xl sm:text-3xl font-black tracking-tighter">9/23</span>
            <div className="flex flex-col leading-none ml-1">
              <span className="font-p5Heading text-xs sm:text-sm text-p5-crimson font-black tracking-wider uppercase">WEDNESDAY</span>
              <span className="font-p5Sub text-[9px] text-zinc-800 uppercase tracking-widest font-bold">AFTER SCHOOL</span>
            </div>
          </div>

          {/* Daytime Weather Badge with Sun Icon */}
          <div className="flex items-center gap-1 bg-black text-white px-2.5 py-1 border-2 border-white shadow-[3px_3px_0px_#000000] -skew-x-6">
            <Sun className="size-4 text-p5-yellow animate-spin" style={{ animationDuration: '12s' }} />
            <span className="font-p5Heading text-xs text-p5-yellow tracking-wider">DAYTIME</span>
          </div>
        </div>

        {/* ── The Smartphone Device (Held by Joker's Gloved Hand) ── */}
        <div className="relative w-full max-w-[390px] sm:max-w-[430px] md:max-w-[460px] -rotate-2 transition-transform duration-200 hover:-rotate-1">
          
          {/* Joker Glove: Left Thumb Silhouette Gripping Phone */}
          <div className="absolute -left-6 sm:-left-8 top-28 sm:top-36 z-40 pointer-events-none filter drop-shadow-[5px_5px_0px_#000000]">
            <svg width="44" height="120" viewBox="0 0 44 120" fill="none">
              {/* White glove thumb with black comic outline */}
              <path
                d="M4 10 C4 4, 18 0, 30 6 C40 12, 44 26, 44 48 C44 75, 42 105, 30 114 C18 122, 4 115, 4 100 C4 82, 10 50, 4 10 Z"
                fill="#FFFFFF"
                stroke="#000000"
                strokeWidth="4"
                strokeLinejoin="round"
              />
              {/* Glove fold lines */}
              <path d="M12 34 C20 36, 32 38, 38 34" stroke="#000000" strokeWidth="2.5" strokeLinecap="round" />
              <path d="M14 62 C22 64, 30 64, 36 60" stroke="#000000" strokeWidth="2.5" strokeLinecap="round" />
            </svg>
          </div>

          {/* Joker Glove: Right Fingers Gripping Corner */}
          <div className="absolute -right-5 sm:-right-7 bottom-10 sm:bottom-14 z-40 pointer-events-none filter drop-shadow-[5px_5px_0px_#000000]">
            <svg width="46" height="110" viewBox="0 0 46 110" fill="none">
              <path
                d="M40 8 C40 2, 28 0, 16 6 C6 12, 0 24, 0 46 C0 72, 4 100, 16 106 C28 112, 40 106, 40 90 C40 70, 34 40, 40 8 Z"
                fill="#FFFFFF"
                stroke="#000000"
                strokeWidth="4"
                strokeLinejoin="round"
              />
              <path d="M30 32 C22 34, 12 34, 6 30" stroke="#000000" strokeWidth="2.5" strokeLinecap="round" />
              <path d="M28 58 C20 60, 14 60, 8 56" stroke="#000000" strokeWidth="2.5" strokeLinecap="round" />
            </svg>
          </div>

          {/* Phone Body with Thick Comic Border & Slanted Silhouette */}
          <div className="relative bg-black p-3 sm:p-4 rounded-xl border-4 sm:border-[5px] border-black shadow-[10px_10px_0px_#000000] overflow-hidden">
            
            {/* Phone Screen: Authentic Persona 5 Crimson Red (#D90011) */}
            <div className="relative bg-[#D90011] rounded-lg border-2 border-black p-3 sm:p-4 overflow-hidden h-[54vh] sm:h-[58vh] md:h-[60vh] flex flex-col justify-between">
              
              {/* Subtle Manga Comic Particle Specks in Screen Background */}
              <div 
                className="absolute inset-0 pointer-events-none opacity-20 bg-[radial-gradient(#FFFFFF_1.5px,transparent_1.5px)] [background-size:16px_16px]"
                aria-hidden="true"
              />

              {/* ── PHONE HEADER BAR: Authentic 'IM' Logo & Group Status ── */}
              <div className="relative z-10 flex items-center justify-between pb-2 border-b-2 border-black/40">
                {/* Slanted 'IM' Logo with Notification Count */}
                <div className="flex items-center gap-2">
                  <div className="relative flex items-center bg-black text-white px-2.5 py-0.5 -skew-x-12 border-2 border-white shadow-[2px_2px_0px_#000000]">
                    <span className="font-p5Heading text-lg sm:text-xl font-black tracking-tight text-white">
                      I<span className="text-p5-crimson">M</span>
                    </span>
                  </div>

                  {/* Red Notification Pill (From Screenshot) */}
                  <div className="bg-white text-p5-crimson font-p5Heading text-[10px] sm:text-xs font-black px-1.5 py-0.2 rounded-full border border-black shadow-[1px_1px_0px_#000000] -rotate-6 animate-bounce">
                    6
                  </div>

                  <span className="font-p5Heading text-xs text-white tracking-widest uppercase ml-1 drop-shadow-[1px_1px_0px_#000]">
                    PHANTOM_CHAT
                  </span>
                </div>

                {/* Speaker Grill / Camera Dot */}
                <div className="flex items-center gap-1.5 opacity-80">
                  <div className="w-8 h-1.5 bg-black rounded-full" />
                  <div className="size-2 bg-black rounded-full" />
                </div>
              </div>

              {/* ── SCROLLABLE CHAT MESSAGES THREAD (Option A: Phantom Thieves Group Chat) ── */}
              <div 
                ref={chatScrollRef}
                className="relative z-10 flex-1 overflow-y-auto space-y-3.5 my-2.5 pr-1.5 custom-scrollbar"
              >
                {CHAT_MESSAGES.slice(0, visibleCount).map((msg) => {
                  const isFerrel = msg.sender === 'FERREL'
                  return (
                    <div 
                      key={msg.id} 
                      className="flex items-start gap-2 sm:gap-2.5 animate-in fade-in slide-in-from-bottom-2 duration-200 group"
                      onMouseEnter={playHover}
                    >
                      {/* Character Avatar Box: Slanted with Portrait Icon */}
                      <div className="shrink-0 -rotate-3 group-hover:rotate-0 transition-transform">
                        <div className={`size-10 sm:size-12 ${msg.avatarBg} border-2 border-black shadow-[3px_3px_0px_#000000] flex flex-col items-center justify-center -skew-x-6 p-0.5`}>
                          <span className="font-p5Heading text-[9px] sm:text-[10px] text-white font-black tracking-wider leading-none text-center">
                            {msg.avatarText}
                          </span>
                          <span className="font-p5Mono text-[7px] text-yellow-300 font-bold tracking-tighter uppercase mt-0.5 leading-none">
                            {msg.avatarSub}
                          </span>
                        </div>
                      </div>

                      {/* Persona 5 Asymmetrical Speech Bubble */}
                      <div className="relative flex-1">
                        {/* Speech Bubble Comic Beak/Tail */}
                        <div 
                          className="absolute -left-2 top-3 w-0 h-0 border-y-8 border-y-transparent border-r-[10px] border-r-white z-10 filter drop-shadow-[-1px_0px_0px_#000]" 
                        />

                        {/* Speech Balloon Body */}
                        <div 
                          className={`
                            relative bg-white text-black p-2.5 sm:p-3 border-2 border-black shadow-[4px_4px_0px_#000000] -skew-x-3 transition-transform duration-100 group-hover:scale-[1.01]
                            ${isFerrel ? 'bg-amber-50 border-p5-crimson shadow-[4px_4px_0px_#E60012]' : ''}
                          `}
                        >
                          {/* Sender Micro Badge */}
                          <div className="flex items-center justify-between text-[9px] font-p5Mono text-zinc-500 mb-0.5">
                            <span className="font-bold text-black uppercase tracking-wider">
                              {msg.sender}
                            </span>
                            <span className="text-[8px] text-zinc-600">
                              {msg.role}
                            </span>
                          </div>

                          {/* Message Text */}
                          <p className="font-p5Body text-xs sm:text-[13px] font-semibold text-black leading-snug tracking-tight">
                            {msg.text}
                          </p>

                          {/* Optional Question Mark Badge (Like in Screenshot) */}
                          {msg.hasQuestionMark && (
                            <span className="absolute -top-3 -right-2 bg-p5-crimson text-white font-p5Heading text-sm font-black px-1.5 py-0.5 border border-black shadow-[2px_2px_0px_#000000] rotate-12 animate-pulse">
                              ?
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>

              {/* ── FOOTER TYPING PROMPT (Like Screenshot '...' indicator) ── */}
              <div className="relative z-10 pt-2 border-t-2 border-black/40 flex items-center justify-between">
                {/* Red Typing Bubble Indicator with '...' */}
                <div 
                  onClick={handleNextMessage}
                  className="flex items-center gap-1.5 bg-black text-white px-3 py-1 border border-white -skew-x-12 shadow-[2px_2px_0px_#000] cursor-pointer hover:bg-zinc-800 transition-colors"
                >
                  <MessageSquare className="size-3 text-p5-yellow" />
                  <span className="font-p5Heading text-xs tracking-wider text-p5-yellow animate-pulse">
                    {visibleCount < CHAT_MESSAGES.length ? 'NEW MESSAGE INCOMING...' : 'TAP (X) TO REPLAY CHAT'}
                  </span>
                </div>

                <div className="text-[10px] font-p5Mono text-white/90 drop-shadow-[1px_1px_0px_#000]">
                  {visibleCount}/{CHAT_MESSAGES.length} SENT
                </div>
              </div>

            </div>
          </div>
        </div>

      </div>
    </div>
  )
}
