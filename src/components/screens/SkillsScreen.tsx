import React, { useState } from 'react'
import { SKILLS_DATA } from '@/data/personaData'
import { Button } from '@/components/ui/button'
import { usePersonaSFX } from '@/hooks/usePersonaSFX'
import { ArrowLeft, CheckCircle2, Sparkles } from 'lucide-react'
import confetti from 'canvas-confetti'

interface SkillsScreenProps {
  onBack: () => void
}

export const SkillsScreen: React.FC<SkillsScreenProps> = ({ onBack }) => {
  const { playHover, playBack, playStamp } = usePersonaSFX()
  const [endorseCount, setEndorseCount] = useState(148)
  const [hasEndorsed, setHasEndorsed] = useState(false)

  const handleEndorse = () => {
    if (hasEndorsed) return
    playStamp()
    setEndorseCount(prev => prev + 1)
    setHasEndorsed(true)

    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#E60012', '#000000', '#FFF100', '#FFFFFF']
      })
    } catch {
      // ignore
    }
  }

  return (
    <div className="fixed inset-0 z-30 flex flex-col p-6 md:p-10 bg-black/75 backdrop-blur-sm select-none overflow-hidden animate-in fade-in duration-200">
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
              SKILLS & COMBAT STATS
            </span>
            <span className="hidden md:inline-block bg-white text-black font-p5Sub text-xs px-2 py-1 uppercase -skew-x-6">
              QUEEN'S TACTICAL AUDIT
            </span>
          </div>
        </div>

        <div className="text-xs md:text-sm font-p5Mono text-p5-yellow bg-black/90 px-3 py-1.5 border border-p5-yellow -skew-x-6">
          MAKOTO NIJIMA // ANALYSIS: S-RANK
        </div>
      </div>

      {/* Main Content Area */}
      <div className="max-w-4xl mx-auto w-full flex-1 flex flex-col justify-center min-h-0">
        {/* Big Endorsement Card */}
        <div className="bg-zinc-950/90 border-4 border-black shadow-[10px_10px_0px_#E60012] p-6 md:p-8 -skew-x-2">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-b-2 border-zinc-800 pb-4 mb-6">
            <div>
              <span className="bg-p5-yellow text-black font-p5Heading text-sm px-3 py-0.5 -skew-x-12 uppercase">
                PUBLIC CONFIDANT APPROVAL
              </span>
              <h2 className="font-p5Heading text-3xl md:text-4xl text-white mt-1">
                CLIENT & PEER SATISFACTION RATING
              </h2>
            </div>

            <div className="flex items-baseline gap-2">
              <span className="font-p5Heading text-6xl md:text-7xl text-p5-crimson">98.6</span>
              <span className="font-p5Heading text-3xl text-white">%</span>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="relative w-full h-8 bg-zinc-800 border-2 border-black overflow-hidden -skew-x-6 mb-6">
            <div
              className="h-full bg-p5-crimson transition-all duration-1000 flex items-center justify-end pr-3 font-p5Heading text-white text-sm"
              style={{ width: '98.6%' }}
            >
              ★ 98.6% VERIFIED EXCELLENCE
            </div>
          </div>

          {/* Skills Breakdown Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            {SKILLS_DATA.map((item, idx) => (
              <div key={idx} className="bg-zinc-900/90 border-l-4 border-p5-crimson p-4 -skew-x-2">
                <div className="flex items-center justify-between mb-1">
                  <span className="font-p5Heading text-lg text-white">{item.category}</span>
                  <span className="font-p5Heading text-xl text-p5-yellow">LV.{item.level}</span>
                </div>
                <div className="w-full h-2 bg-zinc-800 border border-black mb-2">
                  <div
                    className="h-full bg-p5-crimson"
                    style={{ width: item.level + '%' }}
                  />
                </div>
                <p className="text-xs font-p5Mono text-zinc-300">
                  {item.stack}
                </p>
              </div>
            ))}
          </div>

          {/* Endorsement Actions */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-zinc-800">
            <div className="text-xs font-p5Sub text-zinc-400">
              ENDORSEMENTS RECEIVED: <span className="text-p5-yellow font-bold text-base">{endorseCount}</span> RECRUITERS & ENGINEERS
            </div>

            <button
              onClick={handleEndorse}
              onMouseEnter={playHover}
              disabled={hasEndorsed}
              className={`px-8 py-3 font-p5Heading text-xl uppercase -skew-x-6 transition-all duration-150 flex items-center gap-2 cursor-pointer ${
                hasEndorsed
                  ? 'bg-zinc-800 text-zinc-400 cursor-not-allowed border border-zinc-700'
                  : 'bg-p5-crimson text-white hover:bg-white hover:text-black border-2 border-black shadow-[6px_6px_0px_#000000] hover:scale-105 active:scale-95'
              }`}
            >
              {hasEndorsed ? (
                <>
                  <CheckCircle2 className="size-5 text-green-400" /> ENDORSED & NOTED!
                </>
              ) : (
                <>
                  <Sparkles className="size-5" /> [A] ENDORSE FERREL'S CRAFT
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
