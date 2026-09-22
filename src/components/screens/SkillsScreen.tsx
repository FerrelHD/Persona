import React, { useState } from 'react'
import { PageCutoutOverlay } from '@/components/common/PageCutoutOverlay'
import { SKILLS_DATA } from '@/data/personaData'
import { Button } from '@/components/ui/button'
import { usePersonaSFX } from '@/hooks/usePersonaSFX'
import { CheckCircle2, Sparkles, Zap } from 'lucide-react'
import confetti from 'canvas-confetti'

interface SkillsScreenProps {
  onBack: () => void
}

export const SkillsScreen: React.FC<SkillsScreenProps> = ({ onBack }) => {
  const { playHover, playStamp } = usePersonaSFX()
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
        colors: ['#00D4FF', '#E60012', '#FFFFFF', '#FFD700']
      })
    } catch {
      // Fallback
    }
  }

  return (
    <div className="fixed inset-0 z-30 flex flex-col p-6 sm:p-8 md:p-10 select-none overflow-hidden bg-gradient-to-r from-black/90 via-black/60 to-transparent animate-in fade-in duration-200 pt-20 md:pt-24">
      {/* Page Cutout Overlay */}
      <PageCutoutOverlay
        title="SKILL PARAMETERS"
        characterRole="FIGHTER"
        characterName="AKIHIKO SANADA"
        accentColor="red"
        onBack={onBack}
      />

            {/* Main Content: Left Half has UI, Right Half is transparent for Akihiko */}
      <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 gap-6 mt-10 sm:mt-12 md:mt-14 overflow-hidden z-20">
        <div className="lg:col-span-7 flex flex-col justify-between max-h-[calc(100vh-180px)] overflow-y-auto pr-2">
          {/* Skill List */}
          <div className="space-y-4">
            {SKILLS_DATA.map((skill) => (
              <div
                key={skill.category}
                onMouseEnter={() => playHover()}
                className="bg-black/75 backdrop-blur-md border border-zinc-800 hover:border-red-500/60 p-4 -skew-x-2 transition-all duration-150 hover:translate-x-1"
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <Zap className="size-4 text-p5-crimson" />
                    <span className="font-p5Heading text-lg sm:text-xl text-white tracking-wide uppercase">
                      {skill.category}
                    </span>
                  </div>
                  <span className="font-p5Mono font-extrabold text-sm px-2.5 py-0.5 bg-p5-crimson text-white">
                    LV. {skill.level}
                  </span>
                </div>

                {/* Level Gauge Bar */}
                <div className="w-full bg-zinc-900 border border-zinc-700 h-3 mb-3 relative overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-red-700 via-p5-crimson to-yellow-400 transition-all duration-500"
                    style={{ width: `${skill.level}%` }}
                  />
                </div>

                {/* Sub-skills Pills */}
                <div className="flex flex-wrap gap-1.5">
                  {skill.stack.split(', ').map((item) => (
                    <span
                      key={item}
                      className="text-xs font-p5Mono bg-zinc-900/90 text-zinc-300 border border-zinc-700 px-2 py-0.5"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Endorse / Power Boost Bar */}
          <div className="mt-4 pt-4 border-t border-zinc-800 flex items-center justify-between bg-black/80 p-4 -skew-x-2 border border-zinc-800">
            <div>
              <div className="font-p5Heading text-base sm:text-lg text-white">
                BATTLE COMMENDATIONS
              </div>
              <div className="font-p5Mono text-xs text-zinc-400">
                TOTAL ENDORSEMENTS: <span className="text-yellow-400 font-bold">{endorseCount}</span>
              </div>
            </div>

            <Button
              onClick={handleEndorse}
              disabled={hasEndorsed}
              className={`font-p5Mono font-extrabold text-sm uppercase px-5 py-2.5 tracking-wider transition-all duration-150 ${
                hasEndorsed
                  ? 'bg-zinc-800 text-zinc-500 cursor-not-allowed border border-zinc-700'
                  : 'bg-p5-crimson hover:bg-red-600 text-white shadow-[0_0_15px_rgba(230,0,18,0.5)] hover:scale-105'
              }`}
            >
              {hasEndorsed ? (
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="size-4 text-green-400" />
                  CONFIRMED
                </span>
              ) : (
                <span className="flex items-center gap-1.5">
                  <Sparkles className="size-4" />
                  COMMEND SKILL
                </span>
              )}
            </Button>
          </div>
        </div>

        {/* Right side (5 cols) intentionally transparent for Akihiko wallpaper */}
        <div className="hidden lg:block lg:col-span-5 pointer-events-none" />
      </div>
    </div>
  )
}

