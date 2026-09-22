import React from 'react'
import { Button } from '@/components/ui/button'
import { usePersonaSFX } from '@/hooks/usePersonaSFX'
import { ArrowLeft, BookOpen, Compass, Palette } from 'lucide-react'

interface AboutScreenProps {
  onBack: () => void
}

export const AboutScreen: React.FC<AboutScreenProps> = ({ onBack }) => {
  const { playHover, playBack } = usePersonaSFX()

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
              ABOUT // DOSSIER
            </span>
            <span className="hidden md:inline-block bg-white text-black font-p5Sub text-xs px-2 py-1 uppercase -skew-x-6">
              THIEF ORIGINS
            </span>
          </div>
        </div>

        <div className="text-xs md:text-sm font-p5Mono text-p5-yellow bg-black/90 px-3 py-1.5 border border-p5-yellow -skew-x-6">
          YUSUKE KITAGAWA // AESTHETIC INTEGRITY
        </div>
      </div>

      {/* Main Content Area */}
      <div className="max-w-4xl mx-auto w-full flex-1 flex flex-col justify-center min-h-0">
        <div className="bg-zinc-950/90 border-4 border-black shadow-[10px_10px_0px_#E60012] p-6 md:p-8 -skew-x-2">
          <div className="mb-6">
            <span className="bg-p5-yellow text-black font-p5Heading text-sm px-3 py-0.5 -skew-x-12 uppercase">
              THE PHANTOM DEVELOPER
            </span>
            <h2 className="font-p5Heading text-3xl md:text-5xl text-white mt-1">
              CRAFTING SOFTWARE THAT STEALS HEARTS
            </h2>
            <p className="font-p5Body text-zinc-300 text-base md:text-lg mt-3 leading-relaxed">
              I am a software engineer and creative technologist devoted to turning complex backend logic and distributed systems into cinematic, intuitive, high-performance user experiences.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="bg-zinc-900/90 border-t-4 border-p5-crimson p-5 -skew-x-2 shadow-[4px_4px_0px_#000000]">
              <div className="flex items-center gap-2 mb-2">
                <Palette className="size-5 text-p5-crimson" />
                <h4 className="font-p5Heading text-xl text-white">DISCIPLINE</h4>
              </div>
              <h5 className="font-p5Sub text-sm text-p5-yellow mb-2">FULL-STACK CRAFT</h5>
              <p className="font-p5Body text-xs text-zinc-300 leading-relaxed">
                Harmonizing backend architecture with slick frontends, fluid 60 FPS animations, and razor-sharp type safety.
              </p>
            </div>

            <div className="bg-zinc-900/90 border-t-4 border-p5-yellow p-5 -skew-x-2 shadow-[4px_4px_0px_#000000]">
              <div className="flex items-center gap-2 mb-2">
                <Compass className="size-5 text-p5-yellow" />
                <h4 className="font-p5Heading text-xl text-white">PHILOSOPHY</h4>
              </div>
              <h5 className="font-p5Sub text-sm text-white mb-2">STEAL THE SHOW</h5>
              <p className="font-p5Body text-xs text-zinc-300 leading-relaxed">
                Every application should evoke wonder. Cookie-cutter templates are rejected in favor of bespoke craftsmanship.
              </p>
            </div>

            <div className="bg-zinc-900/90 border-t-4 border-white p-5 -skew-x-2 shadow-[4px_4px_0px_#000000]">
              <div className="flex items-center gap-2 mb-2">
                <BookOpen className="size-5 text-white" />
                <h4 className="font-p5Heading text-xl text-white">BACKGROUND</h4>
              </div>
              <h5 className="font-p5Sub text-sm text-p5-yellow mb-2">ACADEMIC PURSUITS</h5>
              <p className="font-p5Body text-xs text-zinc-300 leading-relaxed">
                Pursuing Computer Science & Software Engineering, continually engineering real-world projects and open source tooling.
              </p>
            </div>
          </div>

          <div className="flex items-center justify-between border-t border-zinc-800 pt-4">
            <div className="text-xs font-p5Mono text-zinc-400">
              CURRENT STATUS: <span className="text-green-400 font-bold">AVAILABLE FOR CONTRACT & HEISTS</span>
            </div>
            <div className="font-p5Sub text-xs text-p5-crimson">
              LOCATION: TOKYO / REMOTE WORLDWIDE
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
