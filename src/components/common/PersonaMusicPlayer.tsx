import React, { useState, useRef, useEffect, useCallback } from 'react'
import {
  Play,
  Pause,
  SkipBack,
  SkipForward,
  Volume2,
  VolumeX,
  Minimize2,
  Maximize2,
  Sliders,
  Copy,
  Check,
  RotateCcw,
  X,
  Move,
} from 'lucide-react'
import { usePersonaSFX } from '@/hooks/usePersonaSFX'

export interface MusicTrack {
  id: string
  title: string
  artist: string
  src: string
  albumArt: string
}

export interface PlayerLayoutConfig {
  bottom: number
  right: number
  scale: number
  rotate: number
  albumX: number
  albumY: number
  albumW: number
  albumH: number
  albumRotate: number
  bannerX: number
  bannerY: number
  bannerW: number
  bannerH: number
  bannerRotate: number
}

const STORAGE_KEY = 'p5_music_player_universal'

const DEFAULT_LAYOUT: PlayerLayoutConfig = {
  bottom: 40,
  right: 0,
  scale: 0.8,
  rotate: -6,
  albumX: 7.2,
  albumY: 16.6,
  albumW: 23.5,
  albumH: 61,
  albumRotate: -5.8,
  bannerX: 34.5,
  bannerY: 31,
  bannerW: 56.5,
  bannerH: 40,
  bannerRotate: -1.2,
}

const DEFAULT_PLAYLIST: MusicTrack[] = [
  {
    id: 'life-will-change',
    title: 'LIFE WILL CHANGE',
    artist: 'Lyn // Atlus Sound Team',
    src: '/audio/life-will-change.mp3',
    albumArt: '/assets/album_cover.jpg',
  },
]

export const PersonaMusicPlayer: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTrackIdx, setCurrentTrackIdx] = useState(0)
  const [progress, setProgress] = useState(0)
  const [duration, setDuration] = useState(0)
  const [volume, setVolume] = useState(0.7)
  const [isMuted, setIsMuted] = useState(false)
  const [isExpanded, setIsExpanded] = useState(true)

  // Calibrator & Layout state
  const [isCalibratorOpen, setIsCalibratorOpen] = useState(false)
  const [calibratorTab, setCalibratorTab] = useState<'pos' | 'album' | 'banner'>('pos')
  const [calibratorPos, setCalibratorPos] = useState({ x: 24, y: 32 })
  const [copiedSuccess, setCopiedSuccess] = useState(false)
  const [layout, setLayout] = useState<PlayerLayoutConfig>(() => {
    // Clear old versions to ensure universal layout applies cleanly
    localStorage.removeItem('p5_music_player_v1')
    localStorage.removeItem('p5_music_player_v2')
    const saved = localStorage.getItem(STORAGE_KEY)
    if (saved) {
      try {
        const parsed = JSON.parse(saved)
        if (typeof parsed === 'object') return { ...DEFAULT_LAYOUT, ...parsed }
      } catch { /* ignore */ }
    }
    return DEFAULT_LAYOUT
  })

  const audioRef = useRef<HTMLAudioElement | null>(null)
  const rafRef = useRef<number | null>(null)
  const progressBarRef = useRef<HTMLDivElement | null>(null)

  const { playHover, playSlash } = usePersonaSFX()

  const currentTrack = DEFAULT_PLAYLIST[currentTrackIdx] || DEFAULT_PLAYLIST[0]

  const updateLayout = (updates: Partial<PlayerLayoutConfig>) => {
    setLayout((prev) => {
      const next = { ...prev, ...updates }
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next))
      return next
    })
  }

  const resetLayout = () => {
    localStorage.removeItem(STORAGE_KEY)
    setLayout(DEFAULT_LAYOUT)
  }

  const copyConfig = () => {
    const code = `const DEFAULT_LAYOUT: PlayerLayoutConfig = ${JSON.stringify(layout, null, 2)}`
    navigator.clipboard.writeText(code)
    setCopiedSuccess(true)
    setTimeout(() => setCopiedSuccess(false), 2000)
  }

  // Draggable Calibrator window support
  const handleStartCalibratorDrag = (e: React.MouseEvent) => {
    e.stopPropagation()
    e.preventDefault()
    const startMouseX = e.clientX
    const startMouseY = e.clientY
    const initX = calibratorPos.x
    const initY = calibratorPos.y

    const onMouseMove = (ev: MouseEvent) => {
      setCalibratorPos({
        x: Math.max(10, Math.min(window.innerWidth - 320, initX + (ev.clientX - startMouseX))),
        y: Math.max(10, Math.min(window.innerHeight - 300, initY + (ev.clientY - startMouseY))),
      })
    }

    const onMouseUp = () => {
      window.removeEventListener('mousemove', onMouseMove)
      window.removeEventListener('mouseup', onMouseUp)
    }

    window.addEventListener('mousemove', onMouseMove)
    window.addEventListener('mouseup', onMouseUp)
  }

  // Audio setup
  useEffect(() => {
    const audio = new Audio()
    audio.src = currentTrack.src
    audio.volume = volume
    audio.preload = 'metadata'
    audioRef.current = audio

    const onLoadedMetadata = () => {
      if (audio.duration && !isNaN(audio.duration)) {
        setDuration(audio.duration)
      }
    }

    const onEnded = () => {
      setCurrentTrackIdx((prev) => (prev + 1) % DEFAULT_PLAYLIST.length)
    }

    const onError = () => {
      if (audio.src.includes('/audio/life-will-change.mp3')) {
        audio.src = encodeURI('/assets/audio/Persona 5 - Life Will Change (中英歌詞).mp3')
        audio.load()
      }
    }

    audio.addEventListener('loadedmetadata', onLoadedMetadata)
    audio.addEventListener('ended', onEnded)
    audio.addEventListener('error', onError)

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
      audio.removeEventListener('loadedmetadata', onLoadedMetadata)
      audio.removeEventListener('ended', onEnded)
      audio.removeEventListener('error', onError)
      audio.pause()
      audioRef.current = null
    }
  }, [])

  // Sync track changes
  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return
    audio.pause()
    audio.src = currentTrack.src
    audio.load()
    setProgress(0)
    if (isPlaying) {
      audio.play().catch(() => setIsPlaying(false))
    }
  }, [currentTrackIdx])

  // Play / Pause handling with rAF
  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return

    if (isPlaying) {
      audio.play().catch(() => setIsPlaying(false))
      const tick = () => {
        if (audioRef.current) {
          setProgress(audioRef.current.currentTime)
          rafRef.current = requestAnimationFrame(tick)
        }
      }
      rafRef.current = requestAnimationFrame(tick)
    } else {
      audio.pause()
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current)
        rafRef.current = null
      }
    }

    return () => {
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current)
        rafRef.current = null
      }
    }
  }, [isPlaying])

  // Volume sync
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = isMuted ? 0 : volume
    }
  }, [volume, isMuted])

  const togglePlay = useCallback(() => {
    playSlash()
    setIsPlaying((prev) => !prev)
  }, [playSlash])

  const nextTrack = useCallback(() => {
    playHover()
    setCurrentTrackIdx((prev) => (prev + 1) % DEFAULT_PLAYLIST.length)
  }, [playHover])

  const prevTrack = useCallback(() => {
    playHover()
    setCurrentTrackIdx((prev) => (prev - 1 + DEFAULT_PLAYLIST.length) % DEFAULT_PLAYLIST.length)
  }, [playHover])

  const handleSeek = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const audio = audioRef.current
    if (!audio || !duration) return
    const rect = e.currentTarget.getBoundingClientRect()
    const clickX = e.clientX - rect.left
    const newRatio = Math.max(0, Math.min(1, clickX / rect.width))
    const newTime = newRatio * duration
    audio.currentTime = newTime
    setProgress(newTime)
  }, [duration])

  const formatTime = (sec: number) => {
    if (!sec || isNaN(sec)) return '00:00'
    const m = Math.floor(sec / 60)
    const s = Math.floor(sec % 60)
    return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`
  }

  const progressPercent = duration > 0 ? (progress / duration) * 100 : 0

  return (
    <>
      {/* ── MUSIC PLAYER (POSITIONED BOTTOM-RIGHT WITH DYNAMIC OFFSETS) ── */}
      <div
        style={{
          bottom: `${layout.bottom}px`,
          right: isExpanded ? `${layout.right}px` : `${Math.max(16, layout.right)}px`,
        }}
        className="fixed z-40 select-none"
      >
        {isExpanded ? (
          /* ── EXPANDED PERSONA 5 PLAYER DECK ── */
          <div
            style={{
              transform: `scale(${layout.scale}) rotate(${layout.rotate}deg)`,
              transformOrigin: 'bottom right',
            }}
            className="relative animate-in fade-in zoom-in-95 duration-200"
          >
            {/* Calibrator Indicator Tag if open */}
            {isCalibratorOpen && (
              <div className="absolute -top-7 right-0 bg-yellow-400 text-black font-p5Heading text-[10px] font-black px-2 py-0.5 shadow-md flex items-center gap-1 z-30">
                <Sliders className="size-3" /> CALIBRATING (CHECK LEFT PANEL)
              </div>
            )}

            {/* Container for Player Frame */}
            <div className="relative w-[420px] sm:w-[500px] md:w-[560px] lg:w-[600px] aspect-[670/267] filter drop-shadow-[4px_4px_0px_#E60012] drop-shadow-[8px_8px_0px_#000000]">
              
              {/* The Authentic Persona 5 Music Player PNG Frame */}
              <img
                src="/assets/Music Player.png"
                alt="Persona 5 Music Player Frame"
                className="absolute inset-0 w-full h-full object-contain pointer-events-none z-10"
              />

              {/* Album Cover inside the Left Tilted Cutout Box (Placed at z-12 ABOVE the white background of the PNG!) */}
              <div
                className="absolute overflow-hidden shadow-[2px_2px_4px_rgba(0,0,0,0.5)] bg-black border border-black"
                style={{
                  left: `${layout.albumX}%`,
                  top: `${layout.albumY}%`,
                  width: `${layout.albumW}%`,
                  height: `${layout.albumH}%`,
                  transform: `rotate(${layout.albumRotate}deg)`,
                  zIndex: 12, // Above PNG frame white fill so it is crystal clear!
                }}
              >
                <img
                  src={currentTrack.albumArt}
                  alt={currentTrack.title}
                  className={`w-full h-full object-cover transition-transform duration-700 ${
                    isPlaying ? 'scale-105' : 'scale-100 opacity-95'
                  }`}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
              </div>

              {/* Right Banner Content & Controls (Nested neatly in the white comic banner) */}
              <div
                className="absolute flex flex-col justify-between"
                style={{
                  left: `${layout.bannerX}%`,
                  top: `${layout.bannerY}%`,
                  width: `${layout.bannerW}%`,
                  height: `${layout.bannerH}%`,
                  transform: `rotate(${layout.bannerRotate}deg)`,
                  zIndex: 15,
                }}
              >
                {/* Header: Track Status Badge + Controls */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    <span className="bg-black text-white px-1.5 py-0.5 font-p5Heading text-[9px] sm:text-[10px] uppercase font-black -skew-x-6 border border-zinc-700 shadow-[1px_1px_0px_#E60012]">
                      ★ BGM
                    </span>
                    <span className="font-p5Mono text-[9px] text-zinc-300 font-bold uppercase tracking-wider hidden sm:inline">
                      P5 SOUNDTRACK
                    </span>
                  </div>

                  <div className="flex items-center gap-1.5">
                    {/* Calibrator toggle button */}
                    <button
                      onClick={() => {
                        playHover()
                        setIsCalibratorOpen(!isCalibratorOpen)
                      }}
                      title="Adjust Position (Calibrator)"
                      className={`p-1 rounded transition-colors ${
                        isCalibratorOpen ? 'text-yellow-400 bg-black/60 font-bold' : 'text-zinc-300 hover:text-yellow-400 hover:bg-black/40'
                      }`}
                    >
                      <Sliders className="w-3.5 h-3.5" />
                    </button>

                    {/* Mute button */}
                    <button
                      onClick={() => {
                        playHover()
                        setIsMuted(!isMuted)
                      }}
                      title={isMuted ? 'Unmute' : 'Mute'}
                      className="p-1 text-white hover:text-yellow-400 hover:bg-black/40 rounded transition-colors"
                    >
                      {isMuted ? <VolumeX className="w-3.5 h-3.5 text-red-400" /> : <Volume2 className="w-3.5 h-3.5" />}
                    </button>

                    {/* Minimize button */}
                    <button
                      onClick={() => {
                        playHover()
                        setIsExpanded(false)
                      }}
                      title="Minimize Player"
                      className="p-1 text-white hover:text-yellow-400 hover:bg-black/40 rounded transition-colors"
                    >
                      <Minimize2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                {/* Title & Artist */}
                <div className="my-0.5">
                  <h4 className="font-p5Heading font-black text-black text-xs sm:text-sm tracking-wider uppercase leading-none truncate drop-shadow-[0.5px_0.5px_0px_rgba(0,0,0,0.15)]">
                    {currentTrack.title}
                  </h4>
                  <p className="font-p5Sub text-[9px] sm:text-[10px] text-zinc-600 font-bold leading-tight truncate">
                    {currentTrack.artist}
                  </p>
                </div>

                {/* Seek Progress Bar */}
                <div className="flex items-center gap-2">
                  <span className="font-p5Mono text-[8px] sm:text-[9px] text-zinc-800 font-bold w-7 text-right">
                    {formatTime(progress)}
                  </span>
                  <div
                    ref={progressBarRef}
                    onClick={handleSeek}
                    className="relative flex-1 h-2 bg-zinc-200 border border-black cursor-pointer rounded-none overflow-hidden group shadow-[1px_1px_0px_#000]"
                  >
                    <div
                      className="h-full bg-[#E60012] transition-[width] duration-75 relative"
                      style={{ width: `${progressPercent}%` }}
                    >
                      <div className="absolute right-0 top-0 bottom-0 w-1 bg-yellow-400" />
                    </div>
                  </div>
                  <span className="font-p5Mono text-[8px] sm:text-[9px] text-zinc-800 font-bold w-7">
                    {formatTime(duration)}
                  </span>
                </div>

                {/* Playback Controls */}
                <div className="flex items-center justify-between mt-0.5 pt-0.5">
                  <div className="flex items-center gap-2">
                    {/* Prev */}
                    <button
                      onClick={prevTrack}
                      title="Previous"
                      className="size-5 sm:size-6 flex items-center justify-center bg-black text-white hover:bg-[#E60012] transition-colors border border-black shadow-[1px_1px_0px_#000]"
                    >
                      <SkipBack className="w-2.5 h-2.5 sm:w-3 sm:h-3 fill-current" />
                    </button>

                    {/* Play / Pause */}
                    <button
                      onClick={togglePlay}
                      title={isPlaying ? 'Pause' : 'Play'}
                      className="px-2.5 sm:px-3 py-0.5 bg-[#E60012] text-white hover:bg-black transition-colors flex items-center gap-1 font-p5Heading text-[10px] sm:text-xs font-black uppercase -skew-x-6 border border-black shadow-[2px_2px_0px_#000]"
                    >
                      {isPlaying ? (
                        <>
                          <Pause className="w-3 h-3 fill-current" /> PAUSE
                        </>
                      ) : (
                        <>
                          <Play className="w-3 h-3 fill-current" /> PLAY
                        </>
                      )}
                    </button>

                    {/* Next */}
                    <button
                      onClick={nextTrack}
                      title="Next"
                      className="size-5 sm:size-6 flex items-center justify-center bg-black text-white hover:bg-[#E60012] transition-colors border border-black shadow-[1px_1px_0px_#000]"
                    >
                      <SkipForward className="w-2.5 h-2.5 sm:w-3 sm:h-3 fill-current" />
                    </button>
                  </div>

                  {/* Soundwave Equalizer */}
                  <div className="flex items-end gap-0.5 h-3.5 pr-1">
                    {[40, 90, 60, 100, 75].map((h, i) => (
                      <div
                        key={i}
                        className={`w-1 bg-black transition-all duration-150 ${
                          isPlaying ? 'animate-pulse' : 'h-1 opacity-40'
                        }`}
                        style={{
                          height: isPlaying ? `${h}%` : '20%',
                          animationDelay: `${i * 120}ms`,
                        }}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          /* ── MINIMIZED FLOATING BADGE (POJOK KANAN BAWAH) ── */
          <div
            onClick={() => {
              playHover()
              setIsExpanded(true)
            }}
            className="group flex items-center gap-2.5 bg-black/95 border-2 border-white px-3 py-1.5 cursor-pointer -skew-x-6 shadow-[3px_3px_0px_#E60012,6px_6px_0px_#000000] hover:scale-105 active:scale-95 transition-all duration-150 animate-in fade-in"
          >
            {/* Mini Rotating Vinyl */}
            <div
              className={`size-6 rounded-full border border-black flex items-center justify-center shrink-0 ${
                isPlaying ? 'animate-spin' : ''
              }`}
              style={{
                background: 'conic-gradient(from 0deg, #1C1C1C, #E60012, #1C1C1C, #FFFFFF, #1C1C1C)',
                animationDuration: '2.5s',
              }}
            >
              <div className="size-1.5 rounded-full bg-white border border-black" />
            </div>

            {/* Track Name + Equalizer */}
            <div className="flex flex-col">
              <div className="flex items-center gap-1.5">
                <span className="font-p5Heading text-xs font-black uppercase text-yellow-400 tracking-wider">
                  ★ BGM
                </span>
                <span className="font-p5Body text-[11px] font-bold text-white tracking-wider truncate max-w-[130px] sm:max-w-[160px]">
                  {currentTrack.title}
                </span>
              </div>
              <span className="font-p5Sub text-[9px] text-zinc-400 -mt-0.5">
                {isPlaying ? 'PLAYING // CAFE LEBLANC' : 'PAUSED // CLICK TO EXPAND'}
              </span>
            </div>

            {/* Quick Play/Pause button */}
            <button
              onClick={(e) => {
                e.stopPropagation()
                togglePlay()
              }}
              title={isPlaying ? 'Pause' : 'Play'}
              className="size-6 ml-1 flex items-center justify-center bg-[#E60012] text-white hover:bg-white hover:text-black transition-colors rounded-none border border-black shadow-[1px_1px_0px_#000]"
            >
              {isPlaying ? (
                <Pause className="w-3 h-3 fill-current" />
              ) : (
                <Play className="w-3 h-3 fill-current ml-0.5" />
              )}
            </button>

            {/* Expand icon */}
            <Maximize2 className="w-3 h-3 text-zinc-400 group-hover:text-yellow-400 transition-colors ml-0.5" />
          </div>
        )}
      </div>

      {/* ── DRAGGABLE & COMPACT CALIBRATOR PANEL (DIPINDAH KE KIRI / BISA DIGESER BEBAS) ── */}
      {isCalibratorOpen && (
        <div
          style={{
            left: `${calibratorPos.x}px`,
            top: `${calibratorPos.y}px`,
          }}
          className="fixed z-50 w-80 bg-black/95 border-2 border-yellow-400 text-white p-3 shadow-[6px_6px_0px_#E60012,12px_12px_0px_#000] font-mono text-xs select-none"
        >
          {/* Header - DRAGGABLE HANDLE */}
          <div
            onMouseDown={handleStartCalibratorDrag}
            className="flex items-center justify-between border-b border-zinc-800 pb-2 mb-2 cursor-grab active:cursor-grabbing group bg-zinc-900/60 px-1 py-0.5 rounded"
            title="Klik dan tahan untuk memindahkan panel ini ke mana saja"
          >
            <div className="flex items-center gap-1.5">
              <Move className="size-3.5 text-yellow-400 group-hover:scale-110 transition-transform" />
              <span className="font-bold text-yellow-400 text-[11px]">CALIBRATOR</span>
              <span className="text-[9px] text-zinc-400 font-sans">(DRAG ME)</span>
            </div>
            <button
              onClick={() => setIsCalibratorOpen(false)}
              className="text-zinc-400 hover:text-white p-0.5"
            >
              <X className="size-4" />
            </button>
          </div>

          {/* Calibrator Mode Tabs (Compact & Non-overflowing) */}
          <div className="flex gap-1 mb-2.5">
            <button
              onClick={() => setCalibratorTab('pos')}
              className={`flex-1 py-1 text-center font-bold text-[10px] uppercase transition-colors ${
                calibratorTab === 'pos' ? 'bg-yellow-400 text-black' : 'bg-zinc-800 text-zinc-300 hover:text-white'
              }`}
            >
              POSITION
            </button>
            <button
              onClick={() => setCalibratorTab('album')}
              className={`flex-1 py-1 text-center font-bold text-[10px] uppercase transition-colors ${
                calibratorTab === 'album' ? 'bg-yellow-400 text-black' : 'bg-zinc-800 text-zinc-300 hover:text-white'
              }`}
            >
              ALBUM
            </button>
            <button
              onClick={() => setCalibratorTab('banner')}
              className={`flex-1 py-1 text-center font-bold text-[10px] uppercase transition-colors ${
                calibratorTab === 'banner' ? 'bg-yellow-400 text-black' : 'bg-zinc-800 text-zinc-300 hover:text-white'
              }`}
            >
              BANNER
            </button>
          </div>

          {/* TAB 1: GLOBAL PLAYER POSITION */}
          {calibratorTab === 'pos' && (
            <div className="space-y-2 bg-zinc-900/70 p-2.5 border border-zinc-800">
              <div>
                <div className="flex justify-between text-zinc-300 text-[10px]">
                  <span>BOTTOM OFFSET (px):</span>
                  <span className="text-yellow-400 font-bold">{layout.bottom}px</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="300"
                  value={layout.bottom}
                  onChange={(e) => updateLayout({ bottom: parseInt(e.target.value, 10) })}
                  className="w-full accent-yellow-400 cursor-pointer"
                />
              </div>

              <div>
                <div className="flex justify-between text-zinc-300 text-[10px]">
                  <span>RIGHT OFFSET (px):</span>
                  <span className="text-yellow-400 font-bold">{layout.right}px</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="400"
                  value={layout.right}
                  onChange={(e) => updateLayout({ right: parseInt(e.target.value, 10) })}
                  className="w-full accent-yellow-400 cursor-pointer"
                />
              </div>

              <div>
                <div className="flex justify-between text-zinc-300 text-[10px]">
                  <span>OVERALL SCALE:</span>
                  <span className="text-yellow-400 font-bold">{layout.scale}x</span>
                </div>
                <input
                  type="range"
                  min="0.6"
                  max="1.5"
                  step="0.05"
                  value={layout.scale}
                  onChange={(e) => updateLayout({ scale: parseFloat(e.target.value) })}
                  className="w-full accent-yellow-400 cursor-pointer"
                />
              </div>

              <div>
                <div className="flex justify-between text-zinc-300 text-[10px]">
                  <span>TILT ROTATION (°):</span>
                  <span className="text-yellow-400 font-bold">{layout.rotate}°</span>
                </div>
                <input
                  type="range"
                  min="-15"
                  max="15"
                  step="0.5"
                  value={layout.rotate}
                  onChange={(e) => updateLayout({ rotate: parseFloat(e.target.value) })}
                  className="w-full accent-yellow-400 cursor-pointer"
                />
              </div>
            </div>
          )}

          {/* TAB 2: ALBUM COVER FITTING */}
          {calibratorTab === 'album' && (
            <div className="space-y-2 bg-zinc-900/70 p-2.5 border border-zinc-800">
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <div className="flex justify-between text-[10px] text-zinc-300">
                    <span>X (%):</span>
                    <span className="text-yellow-400 font-bold">{layout.albumX}%</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="20"
                    step="0.2"
                    value={layout.albumX}
                    onChange={(e) => updateLayout({ albumX: parseFloat(e.target.value) })}
                    className="w-full accent-yellow-400 cursor-pointer"
                  />
                </div>
                <div>
                  <div className="flex justify-between text-[10px] text-zinc-300">
                    <span>Y (%):</span>
                    <span className="text-yellow-400 font-bold">{layout.albumY}%</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="25"
                    step="0.2"
                    value={layout.albumY}
                    onChange={(e) => updateLayout({ albumY: parseFloat(e.target.value) })}
                    className="w-full accent-yellow-400 cursor-pointer"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <div className="flex justify-between text-[10px] text-zinc-300">
                    <span>WIDTH (%):</span>
                    <span className="text-yellow-400 font-bold">{layout.albumW}%</span>
                  </div>
                  <input
                    type="range"
                    min="15"
                    max="35"
                    step="0.5"
                    value={layout.albumW}
                    onChange={(e) => updateLayout({ albumW: parseFloat(e.target.value) })}
                    className="w-full accent-yellow-400 cursor-pointer"
                  />
                </div>
                <div>
                  <div className="flex justify-between text-[10px] text-zinc-300">
                    <span>HEIGHT (%):</span>
                    <span className="text-yellow-400 font-bold">{layout.albumH}%</span>
                  </div>
                  <input
                    type="range"
                    min="45"
                    max="80"
                    step="0.5"
                    value={layout.albumH}
                    onChange={(e) => updateLayout({ albumH: parseFloat(e.target.value) })}
                    className="w-full accent-yellow-400 cursor-pointer"
                  />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-[10px] text-zinc-300">
                  <span>ROTATION (°):</span>
                  <span className="text-yellow-400 font-bold">{layout.albumRotate}°</span>
                </div>
                <input
                  type="range"
                  min="-10"
                  max="10"
                  step="0.2"
                  value={layout.albumRotate}
                  onChange={(e) => updateLayout({ albumRotate: parseFloat(e.target.value) })}
                  className="w-full accent-yellow-400 cursor-pointer"
                />
              </div>
            </div>
          )}

          {/* TAB 3: BANNER CONTENT FITTING */}
          {calibratorTab === 'banner' && (
            <div className="space-y-2 bg-zinc-900/70 p-2.5 border border-zinc-800">
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <div className="flex justify-between text-[10px] text-zinc-300">
                    <span>X (%):</span>
                    <span className="text-yellow-400 font-bold">{layout.bannerX}%</span>
                  </div>
                  <input
                    type="range"
                    min="25"
                    max="45"
                    step="0.5"
                    value={layout.bannerX}
                    onChange={(e) => updateLayout({ bannerX: parseFloat(e.target.value) })}
                    className="w-full accent-yellow-400 cursor-pointer"
                  />
                </div>
                <div>
                  <div className="flex justify-between text-[10px] text-zinc-300">
                    <span>Y (%):</span>
                    <span className="text-yellow-400 font-bold">{layout.bannerY}%</span>
                  </div>
                  <input
                    type="range"
                    min="15"
                    max="40"
                    step="0.5"
                    value={layout.bannerY}
                    onChange={(e) => updateLayout({ bannerY: parseFloat(e.target.value) })}
                    className="w-full accent-yellow-400 cursor-pointer"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <div className="flex justify-between text-[10px] text-zinc-300">
                    <span>WIDTH (%):</span>
                    <span className="text-yellow-400 font-bold">{layout.bannerW}%</span>
                  </div>
                  <input
                    type="range"
                    min="45"
                    max="70"
                    step="0.5"
                    value={layout.bannerW}
                    onChange={(e) => updateLayout({ bannerW: parseFloat(e.target.value) })}
                    className="w-full accent-yellow-400 cursor-pointer"
                  />
                </div>
                <div>
                  <div className="flex justify-between text-[10px] text-zinc-300">
                    <span>HEIGHT (%):</span>
                    <span className="text-yellow-400 font-bold">{layout.bannerH}%</span>
                  </div>
                  <input
                    type="range"
                    min="40"
                    max="70"
                    step="0.5"
                    value={layout.bannerH}
                    onChange={(e) => updateLayout({ bannerH: parseFloat(e.target.value) })}
                    className="w-full accent-yellow-400 cursor-pointer"
                  />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-[10px] text-zinc-300">
                  <span>ROTATION (°):</span>
                  <span className="text-yellow-400 font-bold">{layout.bannerRotate}°</span>
                </div>
                <input
                  type="range"
                  min="-10"
                  max="10"
                  step="0.2"
                  value={layout.bannerRotate}
                  onChange={(e) => updateLayout({ bannerRotate: parseFloat(e.target.value) })}
                  className="w-full accent-yellow-400 cursor-pointer"
                />
              </div>
            </div>
          )}

          {/* Action buttons */}
          <div className="pt-2.5 flex items-center gap-2">
            <button
              onClick={copyConfig}
              className="flex-1 py-1.5 bg-yellow-400 text-black font-bold uppercase flex items-center justify-center gap-1 hover:bg-yellow-300 transition-colors text-[10px]"
            >
              {copiedSuccess ? <Check className="size-3.5" /> : <Copy className="size-3.5" />}
              {copiedSuccess ? 'COPIED TO CLIPBOARD!' : 'COPY CODE'}
            </button>

            <button
              onClick={resetLayout}
              title="Reset to Default"
              className="p-1.5 bg-zinc-800 text-zinc-300 hover:text-white hover:bg-zinc-700 transition-colors"
            >
              <RotateCcw className="size-3.5" />
            </button>
          </div>
        </div>
      )}
    </>
  )
}
