import React, { useState } from 'react'
import { MISSIONS_DATA, TESTIMONIALS_DATA, Mission } from '@/data/personaData'
import { Button } from '@/components/ui/button'
import { usePersonaSFX } from '@/hooks/usePersonaSFX'
import { ArrowLeft, ExternalLink, ShieldCheck, X } from 'lucide-react'

const GithubIcon: React.FC = () => (
  <svg className="size-4" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
  </svg>
)

interface MissionsScreenProps {
  onBack: () => void
}

export const MissionsScreen: React.FC<MissionsScreenProps> = ({ onBack }) => {
  const { playHover, playSlash, playBack } = usePersonaSFX()
  const [filter, setFilter] = useState<'all' | 'web' | 'ai' | 'game' | 'ecommerce'>('all')
  const [selectedMission, setSelectedMission] = useState<Mission | null>(null)
  const [testimonials, setTestimonials] = useState(TESTIMONIALS_DATA)
  const [newComment, setNewComment] = useState('')

  const filteredMissions = MISSIONS_DATA.filter(m => filter === 'all' || m.category === filter)

  const handlePostComment = (e: React.FormEvent) => {
    e.preventDefault()
    if (!newComment.trim()) return
    playSlash()
    setTestimonials(prev => [
      {
        id: 't-' + Date.now(),
        author: 'Tokyo_Visitor',
        role: 'Recruiter / Peer',
        text: newComment.trim(),
        time: 'Just now',
        avatarLetter: 'V'
      },
      ...prev
    ])
    setNewComment('')
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
              PROJECTS // GITHUB REPOSITORIES
            </span>
            <span className="hidden md:inline-block bg-white text-black font-p5Sub text-xs px-2 py-1 uppercase -skew-x-6">
              VERIFIED WORK @FerrelHD
            </span>
          </div>
        </div>

        <div className="text-xs md:text-sm font-p5Mono text-p5-yellow bg-black/90 px-3 py-1.5 border border-p5-yellow -skew-x-6">
          FUTABA NAVI // TARGETS ACQUIRED: {filteredMissions.length}
        </div>
      </div>

      {/* Main Split Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 flex-1 min-h-0">
        {/* Left Heist Cards (8 cols) */}
        <div className="lg:col-span-8 flex flex-col min-h-0">
          {/* Filter Tabs */}
          <div className="flex items-center gap-2 mb-4 overflow-x-auto pb-1">
            {([
              { key: 'all', label: 'ALL HEISTS' },
              { key: 'web', label: 'WEB & INTERACTIVE' },
              { key: 'ai', label: 'AI & DATA SCIENCE' },
              { key: 'game', label: 'GAME & SHADERS' },
              { key: 'ecommerce', label: 'ECOMMERCE' }
            ] as const).map(tab => (
              <button
                key={tab.key}
                onClick={() => { playSlash(); setFilter(tab.key); }}
                onMouseEnter={playHover}
                className={`px-4 py-1.5 font-p5Heading text-base uppercase -skew-x-12 transition-all cursor-pointer whitespace-nowrap ${
                  filter === tab.key
                    ? 'bg-p5-crimson text-white shadow-[4px_4px_0px_#000000]'
                    : 'bg-zinc-900 text-zinc-300 hover:bg-zinc-800 border border-zinc-700'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 overflow-y-auto pr-2 custom-scrollbar">
            {filteredMissions.map((mission) => (
              <div
                key={mission.id}
                onClick={() => { playSlash(); setSelectedMission(mission); }}
                onMouseEnter={playHover}
                className="group relative bg-zinc-950/90 border-4 border-zinc-700 hover:border-p5-crimson p-5 -skew-x-3 transition-all duration-200 hover:-translate-y-1 hover:shadow-[8px_8px_0px_#E60012] cursor-pointer flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <span className="bg-p5-crimson text-white text-xs font-p5Sub px-2 py-0.5 uppercase -skew-x-6">
                      {mission.role}
                    </span>
                    <span className="text-xs font-p5Mono text-zinc-400">{mission.date}</span>
                  </div>

                  <h3 className="font-p5Heading text-2xl text-white group-hover:text-p5-yellow transition-colors leading-tight mb-2">
                    {mission.title}
                  </h3>

                  <p className="font-p5Body text-zinc-300 text-sm line-clamp-3 mb-4">
                    {mission.excerpt}
                  </p>
                </div>

                <div>
                  {/* Tech stack pills */}
                  <div className="flex flex-wrap gap-1.5 mb-3">
                    {mission.tech.map((t, i) => (
                      <span key={i} className="bg-zinc-800 text-zinc-300 text-[11px] font-p5Mono px-2 py-0.5 border border-zinc-700">
                        {t}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center justify-between border-t border-zinc-800 pt-2 text-xs font-p5Sub">
                    <span className="text-p5-yellow">{mission.client}</span>
                    <span className="text-p5-crimson group-hover:underline flex items-center gap-1 font-p5Heading text-sm">
                      VIEW DOSSIER →
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Feedback & Chatter Feed (4 cols) */}
        <div className="lg:col-span-4 flex flex-col bg-zinc-950/90 border-4 border-black shadow-[6px_6px_0px_#000000] p-4 min-h-0 -skew-x-2">
          <div className="flex items-center justify-between border-b-2 border-zinc-800 pb-2 mb-3">
            <div className="flex items-center gap-2">
              <ShieldCheck className="size-5 text-p5-yellow" />
              <h4 className="font-p5Heading text-xl text-white">COMMUNITY VERIFICATION</h4>
            </div>
            <span className="bg-p5-crimson text-white text-[10px] font-p5Sub px-2 py-0.5 uppercase -skew-x-6">
              PHAN-CHAT
            </span>
          </div>

          {/* Testimonial Stream */}
          <div className="flex-1 overflow-y-auto space-y-3 pr-2 custom-scrollbar min-h-0">
            {testimonials.map(item => (
              <div key={item.id} className="bg-zinc-900/90 border-l-4 border-p5-crimson p-3 -skew-x-2 shadow-[2px_2px_0px_#000000]">
                <div className="flex items-center justify-between text-xs mb-1 font-p5Sub">
                  <span className="text-p5-yellow font-bold">{item.author}</span>
                  <span className="text-zinc-500 font-p5Mono text-[10px]">{item.time}</span>
                </div>
                <p className="text-zinc-200 text-xs font-p5Body leading-relaxed">
                  "{item.text}"
                </p>
                <div className="text-[10px] text-zinc-400 font-p5Mono mt-1">
                  // {item.role}
                </div>
              </div>
            ))}
          </div>

          {/* Comment Form */}
          <form onSubmit={handlePostComment} className="mt-3 pt-3 border-t border-zinc-800 flex gap-2">
            <input
              type="text"
              value={newComment}
              onChange={e => setNewComment(e.target.value)}
              placeholder="Drop a quick endorsement..."
              className="flex-1 bg-zinc-900 border border-zinc-700 px-3 py-1.5 text-xs text-white focus:outline-none focus:border-p5-crimson -skew-x-3"
            />
            <button
              type="submit"
              className="bg-p5-crimson hover:bg-red-700 text-white font-p5Heading px-3 py-1 text-sm uppercase -skew-x-6 shadow-[2px_2px_0px_#000000] cursor-pointer"
            >
              POST
            </button>
          </form>
        </div>
      </div>

      {/* Heist Detail Modal */}
      {selectedMission && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-150">
          <div className="relative w-full max-w-2xl bg-zinc-950 border-4 border-p5-crimson shadow-[12px_12px_0px_#000000] p-6 -skew-x-2">
            <button
              onClick={() => { playBack(); setSelectedMission(null); }}
              className="absolute top-4 right-4 bg-p5-crimson text-white p-1 hover:bg-white hover:text-black transition-colors -skew-x-6 cursor-pointer"
            >
              <X className="size-6" />
            </button>

            <div className="flex items-center gap-2 mb-2">
              <span className="bg-p5-crimson text-white font-p5Heading text-sm px-2.5 py-0.5 -skew-x-6 uppercase">
                {selectedMission.category} // HEIST
              </span>
              <span className="text-xs font-p5Mono text-zinc-400">DISTORTION LEVEL: {selectedMission.distortionLevel}%</span>
            </div>

            <h2 className="font-p5Heading text-3xl md:text-4xl text-white mb-2">
              {selectedMission.title}
            </h2>

            <div className="text-xs font-p5Sub text-p5-yellow mb-4">
              ROLE: {selectedMission.role} // DATE: {selectedMission.date}
            </div>

            <p className="font-p5Body text-zinc-200 text-base leading-relaxed mb-6">
              {selectedMission.fullDossier}
            </p>

            {/* Metric Stats */}
            <div className="grid grid-cols-3 gap-3 mb-6">
              {selectedMission.stats.map((st, i) => (
                <div key={i} className="bg-zinc-900 border-l-4 border-p5-yellow p-3 -skew-x-3">
                  <div className="text-[11px] font-p5Sub text-zinc-400">{st.label}</div>
                  <div className="text-xl font-p5Heading text-white">{st.value}</div>
                </div>
              ))}
            </div>

            {/* Tech stack */}
            <div className="flex flex-wrap gap-2 mb-6">
              {selectedMission.tech.map((t, i) => (
                <span key={i} className="bg-zinc-800 text-white text-xs font-p5Mono px-3 py-1 border border-zinc-600">
                  {t}
                </span>
              ))}
            </div>

            {/* Action Buttons: Live Demo & GitHub Link */}
            <div className="flex items-center justify-between border-t border-zinc-800 pt-4 flex-wrap gap-3">
              <div className="flex items-center gap-3">
                {selectedMission.liveUrl && (
                  <a
                    href={selectedMission.liveUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 bg-p5-crimson hover:bg-white hover:text-black text-white font-p5Heading text-lg px-4 py-2 border-2 border-black shadow-[3px_3px_0px_#000000] -skew-x-6 transition-all"
                  >
                    <ExternalLink className="size-4" /> VISIT LIVE DEMO ↗
                  </a>
                )}
                <a
                  href={selectedMission.githubUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 bg-zinc-800 hover:bg-p5-yellow hover:text-black text-white font-p5Heading text-lg px-4 py-2 border-2 border-black shadow-[3px_3px_0px_#000000] -skew-x-6 transition-all"
                >
                  <GithubIcon /> GITHUB REPO ↗
                </a>
              </div>

              <Button
                variant="p5"
                onClick={() => { playBack(); setSelectedMission(null); }}
                onMouseEnter={playHover}
              >
                CLOSE DOSSIER
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
