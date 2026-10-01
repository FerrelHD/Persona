import React, { useState, useEffect, useCallback, useMemo, useRef } from 'react'
import { usePersonaSFX } from '@/hooks/usePersonaSFX'
import { PhantomDagger } from '@/components/common/PhantomDagger'
import { TakeYourTime } from '@/components/common/TakeYourTime'
import { PositionCalibrator } from '@/components/dev/PositionCalibrator'
import {
  type TechItem,
  type PhantomCharacter,
  type BubbleConfig,
  type KanjiConfig,
  TECH_DECK,
  PHANTOM_CHARACTERS,
  DEFAULT_BUBBLES,
  DEFAULT_KANJI_CONFIGS,
  P5CutoutName,
} from '@/data/hideoutData'

export type { PhantomCharacter, BubbleConfig, KanjiConfig, TechItem }

interface SkillsScreenProps {
  onBack: () => void
}


export const SkillsScreen: React.FC<SkillsScreenProps> = ({ onBack }) => {
  const { playHover, playSlash, playBack } = usePersonaSFX()

  // Active character in Leblanc Attic (null = Overview Mode)
  const [activeCharId, setActiveCharId] = useState<string | null>(null)
  const [hoveredCharId, setHoveredCharId] = useState<string | null>(null)
  const [showSpeedlines, setShowSpeedlines] = useState<boolean>(false)

  // Track the focal camera origin so zoom-out scales back from the exact same point without jerking
  const [lastFocusOrigin, setLastFocusOrigin] = useState<{ originX: number; originY: number }>({
    originX: 50,
    originY: 50,
  })

  // Preloading & Cinematic Entrance state
  const [isAssetsLoading, setIsAssetsLoading] = useState(true)
  const [isEntranceAnimating, setIsEntranceAnimating] = useState(true)

  useEffect(() => {
    let isMounted = true
    const preloadList = [
      '/assets/background attic.jpe',
      '/assets/self.png',
      '/assets/handlestairs.png',
      '/assets/tablefront.png',
      '/assets/yusuke kitagawa.png',
      '/assets/Futaba_Sakura.webp',
      '/assets/Morgana.webp',
      '/assets/Ryuji_Sakamoto.webp',
      '/assets/An_takamaki.webp',
      '/assets/Joker.png',
      '/assets/SpeechBubbleWithName.png',
    ]

    // Eagerly trigger font loading for kanji glyphs in parallel with images
    if (typeof document !== 'undefined' && 'fonts' in document) {
      const KANJI_GLYPHS = '喜多川祐介佐倉双葉モルガナ坂本竜司高巻杏雨宮蓮'
      document.fonts.load('800 16px "Shippori Mincho"', KANJI_GLYPHS).catch(() => {})
      document.fonts.load('700 16px "Noto Serif JP"', KANJI_GLYPHS).catch(() => {})
    }

    const imagePromises = preloadList.map(src => {
      return new Promise<void>((resolve) => {
        const img = new Image()
        img.src = src
        img.onload = () => {
          if ('decode' in img) {
            img.decode().then(() => resolve()).catch(() => resolve())
          } else {
            resolve()
          }
        }
        img.onerror = () => resolve()
      })
    })

    Promise.all(imagePromises).then(() => {
      if (!isMounted) return
      playSlash()
      setIsAssetsLoading(false)
      setTimeout(() => {
        if (isMounted) setIsEntranceAnimating(false)
      }, 500)
    })

    return () => {
      isMounted = false
    }
  }, [playSlash])

  // Character list with dynamic positioning state
  const [characterList, setCharacterList] = useState<PhantomCharacter[]>(() => {
    localStorage.removeItem('p5_characters_bocchi_v5')
    localStorage.removeItem('p5_characters_bocchi_v6')
    localStorage.removeItem('p5_characters_bocchi_v7')
    const saved = localStorage.getItem('p5_characters_bocchi_v8')
    if (saved) {
      try {
        const parsed = JSON.parse(saved)
        if (Array.isArray(parsed) && parsed.length === PHANTOM_CHARACTERS.length) {
          return parsed
        }
      } catch { /* ignore */ }
    }
    return PHANTOM_CHARACTERS
  })

  // Dynamic stage scale based on reference 1920x1080 canvas
  const [scale, setScale] = useState<number>(1)

  useEffect(() => {
    const updateScale = () => {
      const s = Math.max(window.innerWidth / 1920, window.innerHeight / 1080)
      setScale(Math.max(0.4, Math.min(1.5, s)))
    }
    updateScale()
    window.addEventListener('resize', updateScale)
    return () => window.removeEventListener('resize', updateScale)
  }, [])

  // Calibrator Panel state
  const [isCalibratorOpen, setIsCalibratorOpen] = useState(false)
  const [calibratingCharId, setCalibratingCharId] = useState<string>('joker')
  const [calibratorTab, setCalibratorTab] = useState<'char' | 'camera' | 'bubble' | 'kanji'>('char')
  const [copiedSuccess, setCopiedSuccess] = useState(false)
  const stageRef = useRef<HTMLDivElement>(null)

  // Floating comic speech bubble configuration state (persisted in localStorage)
  const [bubbleList, setBubbleList] = useState<Record<string, BubbleConfig>>(() => {
    localStorage.removeItem('p5_bubbles_v10')
    localStorage.removeItem('p5_bubbles_v11')
    const saved = localStorage.getItem('p5_bubbles_v12')
    if (saved) {
      try {
        const parsed = JSON.parse(saved)
        if (typeof parsed === 'object') return parsed
      } catch { /* ignore */ }
    }
    return DEFAULT_BUBBLES
  })

  const updateCalibratingBubble = (updates: Partial<BubbleConfig>) => {
    setBubbleList(prev => {
      const current = prev[calibratingCharId] || DEFAULT_BUBBLES[calibratingCharId] || DEFAULT_BUBBLES.joker
      const next = { ...prev, [calibratingCharId]: { ...current, ...updates } }
      localStorage.setItem('p5_bubbles_v12', JSON.stringify(next))
      return next
    })
  }

  // Floating giant Japanese kanji configuration state (persisted in localStorage)
  const [kanjiList, setKanjiList] = useState<Record<string, KanjiConfig>>(() => {
    localStorage.removeItem('p5_kanji_v5')
    localStorage.removeItem('p5_kanji_v6')
    const saved = localStorage.getItem('p5_kanji_v7')
    if (saved) {
      try {
        const parsed = JSON.parse(saved)
        if (typeof parsed === 'object') return parsed
      } catch { /* ignore */ }
    }
    return DEFAULT_KANJI_CONFIGS
  })

  const updateCalibratingKanji = (updates: Partial<KanjiConfig>) => {
    setKanjiList(prev => {
      const current = prev[calibratingCharId] || DEFAULT_KANJI_CONFIGS[calibratingCharId] || DEFAULT_KANJI_CONFIGS.joker
      const next = { ...prev, [calibratingCharId]: { ...current, ...updates } }
      localStorage.setItem('p5_kanji_v7', JSON.stringify(next))
      return next
    })
  }

  // Active character object
  const activeChar = useMemo(() => {
    return characterList.find(c => c.id === activeCharId) || null
  }, [characterList, activeCharId])

  // Preserved character state so speech bubble can cleanly fade out in-place on ESC without jumping/flickering
  const [lastActiveChar, setLastActiveChar] = useState<PhantomCharacter | null>(null)

  useEffect(() => {
    if (activeChar) {
      setLastActiveChar(activeChar)
    }
  }, [activeChar])

  const calibratingChar = useMemo(() => {
    return characterList.find(c => c.id === calibratingCharId) || characterList[0]
  }, [characterList, calibratingCharId])

  const updateCalibratingChar = (updates: Partial<PhantomCharacter>) => {
    setCharacterList(prev => {
      const next = prev.map(c => c.id === calibratingCharId ? { ...c, ...updates } : c)
      localStorage.setItem('p5_characters_bocchi_v8', JSON.stringify(next))
      return next
    })
    if (updates.camera) {
      setLastFocusOrigin({
        originX: updates.camera.originX ?? calibratingChar.camera.originX,
        originY: updates.camera.originY ?? calibratingChar.camera.originY,
      })
    }
  }

  const copyConfigToClipboard = () => {
    const charsFormatted = JSON.stringify(characterList, null, 2)
    const bubblesFormatted = JSON.stringify(bubbleList, null, 2)
    const kanjiFormatted = JSON.stringify(kanjiList, null, 2)
    const payload = `const PHANTOM_CHARACTERS: PhantomCharacter[] = ${charsFormatted}\n\nconst DEFAULT_BUBBLES: Record<string, BubbleConfig> = ${bubblesFormatted}\n\nconst DEFAULT_KANJI_CONFIGS: Record<string, KanjiConfig> = ${kanjiFormatted}`
    navigator.clipboard.writeText(payload)
    setCopiedSuccess(true)
    setTimeout(() => setCopiedSuccess(false), 2000)
  }

  const resetToDefaultPositions = () => {
    localStorage.removeItem('p5_characters_bocchi_v5')
    localStorage.removeItem('p5_characters_bocchi_v6')
    localStorage.removeItem('p5_characters_bocchi_v7')
    localStorage.removeItem('p5_characters_bocchi_v8')
    localStorage.removeItem('p5_bubbles_v9')
    localStorage.removeItem('p5_bubbles_v10')
    localStorage.removeItem('p5_bubbles_v11')
    localStorage.removeItem('p5_bubbles_v12')
    localStorage.removeItem('p5_kanji_v5')
    localStorage.removeItem('p5_kanji_v6')
    localStorage.removeItem('p5_kanji_v7')
    setCharacterList(PHANTOM_CHARACTERS)
    setBubbleList(DEFAULT_BUBBLES)
    setKanjiList(DEFAULT_KANJI_CONFIGS)
  }

  const handleStartDrag = (e: React.MouseEvent, charId: string) => {
    if (!isCalibratorOpen) return
    e.stopPropagation()
    e.preventDefault()
    setCalibratingCharId(charId)

    const startX = e.clientX
    const startY = e.clientY
    const target = characterList.find(c => c.id === charId)
    if (!target) return
    const initTx = target.tx
    const initTy = target.ty

    const onMouseMove = (ev: MouseEvent) => {
      const dx = (ev.clientX - startX) / scale
      const dy = (ev.clientY - startY) / scale
      const newTx = Math.round(initTx + dx)
      const newTy = Math.round(initTy + dy)

      setCharacterList(prev => {
        const next = prev.map(c => c.id === charId ? { ...c, tx: newTx, ty: newTy } : c)
        localStorage.setItem('p5_characters_bocchi_v7', JSON.stringify(next))
        return next
      })
    }

    const onMouseUp = () => {
      window.removeEventListener('mousemove', onMouseMove)
      window.removeEventListener('mouseup', onMouseUp)
    }

    window.addEventListener('mousemove', onMouseMove)
    window.addEventListener('mouseup', onMouseUp)
  }

  // Active tech item
  const activeTech = useMemo(() => {
    if (activeChar) {
      const found = TECH_DECK.find(t => t.id === activeChar.techId)
      if (found) return found
    }
    return TECH_DECK[0]
  }, [activeChar])

  const speedlinesTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    return () => {
      if (speedlinesTimerRef.current) {
        clearTimeout(speedlinesTimerRef.current)
      }
    }
  }, [])

  const handleSelectCharacter = useCallback((char: PhantomCharacter) => {
    playSlash()
    if (speedlinesTimerRef.current) {
      clearTimeout(speedlinesTimerRef.current)
    }
    setShowSpeedlines(true)
    speedlinesTimerRef.current = setTimeout(() => {
      setShowSpeedlines(false)
      speedlinesTimerRef.current = null
    }, 400)
    setHoveredCharId(null)
    setLastFocusOrigin({ originX: char.camera.originX, originY: char.camera.originY })
    setActiveCharId(char.id)
  }, [playSlash])

  const handleResetCamera = useCallback(() => {
    playBack()
    setHoveredCharId(null)
    setActiveCharId(null)
    // NOTE: lastFocusOrigin is deliberately preserved so that CSS transform-origin
    // stays pinned to the character's focus point while the camera smoothly scales back down to 1!
  }, [playBack])

  // Keyboard navigation: Shift+C for Calibrator, Escape for back/close
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Shift + C: Toggle Calibrator drawer
      if (e.shiftKey && (e.key === 'C' || e.key === 'c')) {
        e.preventDefault()
        playSlash()
        setIsCalibratorOpen(prev => !prev)
        return
      }

      if (e.key === 'Escape') {
        e.preventDefault()
        if (isCalibratorOpen) {
          setIsCalibratorOpen(false)
        } else if (activeCharId) {
          handleResetCamera()
        } else {
          playBack()
          onBack()
        }
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [activeCharId, isCalibratorOpen, onBack, playBack, playSlash, handleResetCamera])

  return (
    <div className="fixed inset-0 z-30 select-none overflow-hidden bg-black flex flex-col justify-between animate-in fade-in duration-300">

      {/* Hidden CJK Font Warm-up - off-screen layout so WebKit Safari calculates & caches glyphs immediately */}
      <div
        className="fixed -left-[9999px] -top-[9999px] opacity-0 pointer-events-none select-none font-p5Kanji font-extrabold"
        aria-hidden="true"
      >
        {characterList.map(c => c.kanji).join(' ')}
      </div>

      {/* ── PERSONA 5 'TAKE YOUR TIME' INFILTRATION LOADING SCREEN ── */}
      {isAssetsLoading && (
        <div className="fixed inset-0 z-[100] bg-black flex flex-col justify-between p-6 sm:p-10 select-none animate-in fade-in duration-200">
          {/* Subtle Persona 5 Speedlines / Halftone Watermark */}
          <div className="absolute inset-0 pointer-events-none opacity-20 overflow-hidden">
            <div className="w-full h-full bg-[radial-gradient(circle_at_center,rgba(230,0,18,0.2)_0%,transparent_70%)]" />
          </div>

          {/* Top Left Title Stamp */}
          <div className="relative z-10 flex items-center gap-2">
            <span className="bg-[#E60012] text-white px-2 py-0.5 font-p5Heading text-xs font-black uppercase -skew-x-6 border border-black shadow-[2px_2px_0px_#000]">
              HIDEOUT
            </span>
            <span className="font-p5Sub text-xs text-zinc-400 tracking-widest uppercase">
              CAFE LEBLANC // ATTIC HEADQUARTERS
            </span>
          </div>

          {/* Center Subtle Infiltration Text */}
          <div className="relative z-10 self-center flex items-center gap-3">
            <span className="size-2 bg-red-600 animate-ping rounded-full" />
            <span className="font-p5Heading text-sm sm:text-base tracking-widest text-zinc-300 uppercase">
              INFILTRATING ATTIC...
            </span>
          </div>

          {/* Bottom Right: Iconic P5 Take Your Time Animated Mascot */}
          <TakeYourTime visible={true} />
        </div>
      )}

      {/* ── CINEMATIC LETTERBOX BLACK BARS (FOREGROUND LAYER - ZERO OUTLINE, ZERO TEXT) ── */}
      {/* Top Black Bar */}
      <div
        className={`fixed top-0 inset-x-0 z-[60] bg-black pointer-events-none transition-all duration-500 h-10 sm:h-12 md:h-14 lg:h-16 ${activeChar ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0'
          }`}
        style={{
          transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)',
        }}
      />

      {/* Bottom Black Bar */}
      <div
        className={`fixed bottom-0 inset-x-0 z-[60] bg-black pointer-events-none transition-all duration-500 h-10 sm:h-12 md:h-14 lg:h-16 ${activeChar ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0'
          }`}
        style={{
          transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)',
        }}
      />

      {/* ── ANIME SPEED LINES FLASH IMPACT OVERLAY ── */}
      {showSpeedlines && (
        <div className="pointer-events-none fixed inset-0 z-50 overflow-hidden p5-speedlines-anim">
          <svg className="w-full h-full opacity-60" viewBox="0 0 1000 1000" preserveAspectRatio="none">
            {Array.from({ length: 20 }).map((_, idx) => {
              const angle = (idx * 18 * Math.PI) / 180
              const x2 = 500 + Math.cos(angle) * 900
              const y2 = 500 + Math.sin(angle) * 900
              return (
                <line
                  key={idx}
                  x1="500"
                  y1="500"
                  x2={x2}
                  y2={y2}
                  stroke={idx % 2 === 0 ? '#E60012' : '#FFFFFF'}
                  strokeWidth={idx % 4 === 0 ? '3' : '1.5'}
                  strokeDasharray="80 160"
                />
              )
            })}
          </svg>
        </div>
      )}

      {/* ── TOP-LEFT: PERSONA 5 RANSOM 'HIDEOUT' BANNER (HIDES SWIFTLY WHEN CHARACTER IS SELECTED) ── */}
      <div
        className={`absolute top-4 left-4 sm:top-6 sm:left-6 z-40 flex flex-col items-start select-none pointer-events-none transition-all duration-500 ${activeChar
          ? '-translate-x-[120%] -translate-y-6 opacity-0'
          : 'translate-x-0 translate-y-0 opacity-100'
          }`}
        style={{
          transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)',
        }}
      >
        <div className="flex items-center gap-1 sm:gap-1.5 filter drop-shadow-[4px_4px_0px_#000000]">
          {['H', 'I', 'D', 'E', 'O', 'U', 'T'].map((char, i) => (
            <span
              key={i}
              style={{
                animationDelay: `${i * 50}ms`,
              }}
              className={`inline-flex items-center justify-center font-p5Heading text-2xl sm:text-3xl md:text-4xl min-w-[28px] sm:min-w-[34px] md:min-w-[42px] h-[34px] sm:h-[42px] md:h-[50px] px-1 border-[2.5px] border-black uppercase shadow-[3px_3px_0px_#000000] ${!isAssetsLoading ? 'p5-tile-entrance' : 'opacity-0'
                } ${i === 0
                  ? 'bg-black text-white -rotate-6'
                  : i === 1
                    ? 'bg-[#7C4A1E] text-white rotate-3 font-black scale-105'
                    : i === 2
                      ? 'bg-white text-black -rotate-3'
                      : i === 3
                        ? 'bg-black text-white rotate-4 border border-white'
                        : i === 4
                          ? 'bg-[#7C4A1E] text-white -rotate-2 font-black scale-110'
                          : i === 5
                            ? 'bg-white text-black rotate-3'
                            : 'bg-[#7C4A1E] text-white rotate-6 font-black scale-105'
                }`}
            >
              {char}
            </span>
          ))}
        </div>
        <div
          style={{ animationDelay: '360ms' }}
          className={`mt-1 flex items-center bg-black border-l-4 border-[#7C4A1E] px-2.5 sm:px-3 py-0.5 text-[10px] sm:text-xs font-p5Sub tracking-widest text-white -skew-x-6 shadow-[3px_3px_0px_#000000] ${!isAssetsLoading ? 'p5-sub-entrance' : 'opacity-0'
            }`}
        >
          <span className="text-yellow-400 font-bold mr-1.5">LEBLANC ATTIC</span>
          <span className="text-zinc-500 mx-1">//</span>
          <span className="text-zinc-200">
            {activeChar ? `${activeChar.name} [${activeChar.codename}]` : 'CHOOSE THIEF'}
          </span>
        </div>
      </div>

      {/* ── 2.5D LEBLANC ATTIC VIRTUAL CAMERA STAGE ── */}
      <div className={`relative w-full h-full flex items-center justify-center overflow-hidden transition-all duration-700 ease-out ${isEntranceAnimating ? 'scale-105 opacity-90' : 'scale-100 opacity-100'
        }`}>
        {/* Full-bleed Reference Stage Container */}
        <div ref={stageRef} className="relative w-full h-full select-none overflow-hidden">

          {/* Virtual 2.5D Camera Stage (Zooms and scales smoothly with hardware acceleration) */}
          <div
            className="absolute inset-0 w-full h-full select-none"
            style={{
              transform: activeChar
                ? `scale(${activeChar.camera.scale}) translate3d(0, 0, 0)`
                : 'scale(1) translate3d(0, 0, 0)',
              transformOrigin: `${lastFocusOrigin.originX}% ${lastFocusOrigin.originY}%`,
              transition: 'transform 600ms cubic-bezier(0.16, 1, 0.3, 1)',
              backfaceVisibility: 'hidden',
              WebkitBackfaceVisibility: 'hidden',
              willChange: 'transform',
            }}
          >
            {/* Base 3D Room Render Background */}
            <img
              src="/assets/background attic.jpe"
              alt="Cafe Leblanc Attic"
              onError={(e) => {
                (e.currentTarget as HTMLImageElement).src = '/assets/Background Joker Hideout.png'
              }}
              style={{
                imageRendering: '-webkit-optimize-contrast',
                willChange: 'transform',
                filter: 'contrast(1.12) brightness(0.93) saturate(1.18) sepia(0.12) hue-rotate(-5deg)',
              }}
              className="absolute inset-0 w-full h-full object-cover pointer-events-none select-none"
            />

            {/* Ambient Dark Dim Overlay (active when zoomed in, clickable to reset) */}
            <div
              onClick={handleResetCamera}
              className={`absolute inset-0 bg-black/60 transition-opacity duration-500 z-10 ${activeChar ? 'opacity-100 pointer-events-auto cursor-pointer' : 'opacity-0 pointer-events-none'
                }`}
            />

            {/* ── GIANT JAPANESE KANJI WATERMARK (AUTENTIK MANGA MINCHO, Z-INDEX 30 - DI ATAS MASKINGAN) ── */}
            {(() => {
              const displayKanjiChar = activeChar || lastActiveChar
              if (!displayKanjiChar) return null

              const kConfig = kanjiList[displayKanjiChar.id] || DEFAULT_KANJI_CONFIGS[displayKanjiChar.id] || DEFAULT_KANJI_CONFIGS.joker
              const posX = displayKanjiChar.camera.originX + (kConfig.x || 0)
              const posY = displayKanjiChar.camera.originY + (kConfig.y || 0)
              // Counter-scale font so it stays sharp, elegant, and consistent across different camera zoom levels
              const fontVw = 11 / (displayKanjiChar.camera.scale * 0.72)

              return (
                <div
                  key={displayKanjiChar.id}
                  style={{
                    zIndex: 30, // Above all furniture masks (21, 25, 27) so it's NEVER covered by masks!
                    left: `${posX}%`,
                    top: `${posY}%`,
                    transform: 'translate3d(-50%, -50%, 0)',
                    WebkitFontSmoothing: 'antialiased',
                    MozOsxFontSmoothing: 'grayscale',
                    textRendering: 'geometricPrecision',
                  }}
                  className={`absolute pointer-events-none select-none whitespace-nowrap will-change-[transform,opacity] transition-[opacity,transform] ${
                    activeChar
                      ? 'opacity-100 scale-100 duration-200 ease-out'
                      : 'opacity-0 scale-95 duration-160 ease-out'
                  }`}
                >
                  <div className={`${activeChar ? 'p5-splash-text-anim' : ''} origin-center`}>
                    <div
                      style={{
                        transform: `rotate(${kConfig.rotate ?? -8}deg) scale(${kConfig.scale ?? 1}) translateZ(0)`,
                        transformOrigin: 'center center',
                        opacity: kConfig.opacity ?? 0.74,
                      }}
                    >
                      <span
                        style={{
                          fontSize: `${fontVw}vw`,
                          letterSpacing: '0.12em',
                        }}
                        className="font-p5Kanji font-extrabold text-white select-none tracking-widest drop-shadow-[0_0_24px_rgba(0,0,0,0.8)] inline-block"
                      >
                        {displayKanjiChar.kanji}
                      </span>
                    </div>
                  </div>
                </div>
              )
            })()}

            {/* 6 Character Cutout Sprites with Contact Shadows & Warm Lighting */}
            {characterList.map((char) => {
              const isSelected = activeChar?.id === char.id
              const isDimmed = Boolean(activeChar && !isSelected)
              const isHovered = Boolean(!activeChar && hoveredCharId === char.id)
              const isCalibrating = isCalibratorOpen && calibratingCharId === char.id

              return (
                <div
                  key={char.id}
                  onMouseDown={(e) => {
                    if (isCalibratorOpen) {
                      handleStartDrag(e, char.id)
                    }
                  }}
                  onClick={(e) => {
                    e.stopPropagation()
                    if (isCalibratorOpen) {
                      setCalibratingCharId(char.id)
                      return
                    }
                    setHoveredCharId(null)
                    handleSelectCharacter(char)
                  }}
                  onMouseEnter={() => {
                    if (!activeChar && !isCalibratorOpen) {
                      playHover()
                      setHoveredCharId(char.id)
                    }
                  }}
                  onMouseLeave={() => {
                    setHoveredCharId(null)
                  }}
                  style={{
                    transform: `translate(${char.tx * scale}px, ${char.ty * scale}px) scale(${scale})`,
                    transformOrigin: 'top left',
                    width: `${char.width}px`,
                    zIndex: isSelected ? 35 : char.zIndex,
                  }}
                  className={`
                    absolute top-1/2 left-1/2 select-none transition-opacity duration-400
                    ${isCalibratorOpen ? 'cursor-grab active:cursor-grabbing' : 'cursor-pointer'}
                    ${isCalibrating ? 'ring-2 ring-yellow-400 ring-offset-2 ring-offset-black rounded' : ''}
                    ${isDimmed
                      ? 'opacity-20 pointer-events-none'
                      : 'opacity-100'
                    }
                  `}
                  title={isCalibratorOpen ? `Drag to position ${char.name}` : `Select ${char.name} [${char.codename}]`}
                >
                  {/* Realistic Contact Shadow (Floor / Tabletop) with zero-cost radial-gradient */}
                  <div
                    className={`
                      absolute -bottom-1 left-1/2 -translate-x-1/2 pointer-events-none rounded-[50%] -skew-x-12 transition-opacity duration-300
                      ${isHovered ? 'opacity-95' : 'opacity-85'}
                    `}
                    style={{
                      width: `${char.shadowWidth}%`,
                      height: `${char.shadowHeight}px`,
                      background: 'radial-gradient(ellipse at center, rgba(16, 9, 5, 0.92) 0%, rgba(25, 13, 7, 0.45) 55%, transparent 75%)',
                    }}
                  />

                  {/* Character Cutout Image - High-Definition Crisp Rendering */}
                  <img
                    src={char.src}
                    alt={char.name}
                    style={{
                      imageRendering: '-webkit-optimize-contrast',
                      willChange: 'transform',
                      filter: isHovered
                        ? `brightness(1.1) contrast(1.08)`
                        : `brightness(${char.brightness}) contrast(1.02)`,
                      transition: 'filter 180ms ease-out',
                    }}
                    className="w-full h-auto object-contain select-none pointer-events-auto"
                  />
                </div>
              )
            })}

            {/* ── OPTICAL ILLUSION FOREGROUND FURNITURE MASKS ── */}
            {/* 1. Tiang Rak Kanan (Layer 21) */}
            <img
              src="/assets/self.png"
              alt=""
              style={{
                zIndex: 21,
                imageRendering: '-webkit-optimize-contrast',
                willChange: 'transform',
              }}
              className="absolute inset-0 w-full h-full object-cover pointer-events-none select-none"
            />

            {/* 2. Pagar Tangga Kiri Bawah (Layer 25) */}
            <img
              src="/assets/handlestairs.png"
              alt=""
              style={{
                zIndex: 25,
                imageRendering: '-webkit-optimize-contrast',
                willChange: 'transform',
              }}
              className="absolute inset-0 w-full h-full object-cover pointer-events-none select-none"
            />

            {/* 3. Meja / Tatami Depan Kanan Bawah (Layer 27) */}
            <img
              src="/assets/tablefront.png"
              alt=""
              style={{
                zIndex: 27,
                imageRendering: '-webkit-optimize-contrast',
                willChange: 'transform',
              }}
              className="absolute inset-0 w-full h-full object-cover pointer-events-none select-none"
            />

            {/* 4. Cinematic Warm Atmospheric Light Wash Overlay (Recreates the video editing LUT) */}
            <div
              className="absolute inset-0 pointer-events-none select-none"
              style={{
                zIndex: 28,
                mixBlendMode: 'soft-light',
                background: 'radial-gradient(circle at 58% 32%, rgba(255, 175, 55, 0.35) 0%, rgba(210, 120, 25, 0.22) 50%, rgba(50, 25, 12, 0.32) 100%)',
              }}
            />
          </div>

          {/* ── PERSONA 5 MANGA DIALOGUE SPEECH BUBBLE (CLEAN EXIT WITHOUT JUMP GLITCH) ── */}
          {(() => {
            const displayChar = activeChar || lastActiveChar
            if (!displayChar) return null

            const bubble = bubbleList[displayChar.id] || DEFAULT_BUBBLES[displayChar.id] || DEFAULT_BUBBLES.joker
            const desktopStyle: React.CSSProperties = bubble.side === 'right'
              ? { left: `${bubble.posX}%`, top: `${bubble.top}%` }
              : { right: `${bubble.posX}%`, top: `${bubble.top}%` }
            const tailSide = bubble.side === 'right' ? 'left' : 'right'
            const bubbleWidth = bubble.width || 520
            const bubbleRotate = bubble.bubbleRotate || 0

            // 1. Name Tag Controls
            const nameOffsetX = bubble.nameOffsetX ?? (bubble.textOffsetX || 0)
            const nameOffsetY = bubble.nameOffsetY ?? (bubble.textOffsetY || 0)
            const nameRotate = bubble.nameRotate ?? (bubble.textRotate ?? (tailSide === 'right' ? 2 : -2))
            const nameScale = bubble.nameScale ?? (bubble.textScale ?? 1)

            // 2. Dialogue Quote Controls
            const quoteOffsetX = bubble.quoteOffsetX ?? (bubble.textOffsetX || 0)
            const quoteOffsetY = bubble.quoteOffsetY ?? (bubble.textOffsetY || 0)
            const quoteRotate = bubble.quoteRotate ?? (bubble.textRotate ?? (tailSide === 'right' ? 2 : -2))
            const quoteScale = bubble.quoteScale ?? (bubble.textScale ?? 1)
            const quoteMaxWidth = bubble.quoteMaxWidth ?? 95

            return (
              <div
                onClick={(e) => e.stopPropagation()}
                className={`
                  absolute z-40 select-none
                  bottom-4 left-1/2 -translate-x-1/2
                  sm:bottom-auto sm:left-auto sm:translate-x-0
                  transition-[opacity,transform]
                  ${activeChar
                    ? 'opacity-100 scale-100 pointer-events-auto duration-200 ease-out'
                    : 'opacity-0 scale-95 pointer-events-none duration-160 ease-out'
                  }
                `}
                style={{
                  ...desktopStyle,
                  width: `min(94vw, ${bubbleWidth}px)`,
                  aspectRatio: '1893 / 831',
                  transform: `rotate(${bubbleRotate}deg)`,
                  transformOrigin: 'center center',
                }}
              >
                {/* Inner popping animation wrapper - re-triggers animation instantly on character select */}
                <div
                  key={displayChar.id}
                  className={`relative w-full h-full will-change-[transform,opacity] ${activeChar ? 'p5-bubble-pop-anim' : ''}`}
                >
                  {/* Authentic Persona 5 Comic Speech Bubble Graphic with Name Tab */}
                  <img
                    src="/assets/SpeechBubbleWithName.png"
                    decoding="async"
                    onError={(e) => {
                      (e.currentTarget as HTMLImageElement).src = '/assets/speech-bubble-p5.png'
                    }}
                    alt="Speech Bubble"
                    className={`absolute inset-0 w-full h-full object-contain pointer-events-none filter drop-shadow-[5px_5px_0px_rgba(230,0,18,0.9)] sm:drop-shadow-[8px_8px_0px_#E60012] transition-transform duration-150 ${
                      tailSide === 'right' ? 'scale-x-[-1]' : 'scale-x-1'
                    }`}
                  />

                  {/* Persona Codename Tag directly on the White Name Tab */}
                  <div
                    className="absolute z-10 flex items-center pointer-events-none"
                    style={{
                      top: '11%',
                      left: tailSide === 'right' ? 'auto' : '15%',
                      right: tailSide === 'right' ? '15%' : 'auto',
                      transform: `translate(${nameOffsetX}px, ${nameOffsetY}px) rotate(${nameRotate}deg) scale(${nameScale})`,
                      transformOrigin: tailSide === 'right' ? 'right center' : 'left center',
                    }}
                  >
                    <P5CutoutName
                      codename={displayChar.codename}
                      thiefColor={displayChar.thiefColor}
                      thiefTextColor={displayChar.thiefTextColor}
                    />
                  </div>

                  {/* Persona Comic Dialogue Quote (Pure Text centered in the black bubble body) */}
                  <div
                    className="absolute inset-0 flex items-center justify-center pointer-events-none"
                    style={{
                      paddingLeft: tailSide === 'right' ? '6%' : '24%',
                      paddingRight: tailSide === 'right' ? '24%' : '6%',
                      paddingTop: '26%',
                      paddingBottom: '12%',
                    }}
                  >
                    <div
                      style={{
                        transform: `translate(${quoteOffsetX}px, ${quoteOffsetY}px) rotate(${quoteRotate}deg) scale(${quoteScale})`,
                        transformOrigin: 'center center',
                        maxWidth: `${quoteMaxWidth}%`,
                      }}
                    >
                      <p className="font-p5Body text-xs sm:text-[14px] md:text-[15px] text-white font-bold leading-relaxed tracking-wide drop-shadow-[1px_1px_0px_#000] line-clamp-4">
                        “{displayChar.quote}”
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )
          })()}

        </div>
      </div>

      {/* ── BOTTOM HUD: OVERVIEW MODE (BACK TO MAIN MENU) ── */}
      {!activeChar && (
        <div className="absolute bottom-4 left-4 sm:bottom-6 sm:left-6 z-40 flex items-center gap-4 pointer-events-auto p5-footer-entrance">
          <button
            onClick={() => {
              playBack()
              onBack()
            }}
            className="flex items-center gap-1.5 text-zinc-300 hover:text-white group cursor-pointer transition-colors"
            title="Return to Main Menu"
          >
            <span className="size-5 rounded-full border-2 border-red-500 text-red-500 font-bold flex items-center justify-center text-[11px] group-hover:bg-red-500 group-hover:text-white transition-colors shadow-[0_0_6px_rgba(239,68,68,0.4)]">
              O
            </span>
            <span className="font-p5Heading text-sm tracking-wider uppercase">BACK TO MENU</span>
          </button>
        </div>
      )}


      {/* ── TACTICAL POSITION CALIBRATOR (ACCESSIBLE VIA SHIFT + C) ── */}
      <PositionCalibrator
        isOpen={isCalibratorOpen}
        onClose={() => setIsCalibratorOpen(false)}
        characterList={characterList}
        calibratingCharId={calibratingCharId}
        onSelectCharId={setCalibratingCharId}
        calibratingChar={calibratingChar}
        onUpdateChar={updateCalibratingChar}
        calibratorTab={calibratorTab}
        onChangeTab={setCalibratorTab}
        bubbleList={bubbleList}
        defaultBubbles={DEFAULT_BUBBLES}
        onUpdateBubble={updateCalibratingBubble}
        kanjiList={kanjiList}
        defaultKanji={DEFAULT_KANJI_CONFIGS}
        onUpdateKanji={updateCalibratingKanji}
        activeCharId={activeCharId}
        onTogglePreviewCamera={() => {
          if (activeCharId === calibratingChar.id) {
            handleResetCamera()
          } else {
            setActiveCharId(calibratingChar.id)
            setLastFocusOrigin({ originX: calibratingChar.camera.originX, originY: calibratingChar.camera.originY })
          }
        }}
        onCopyConfig={copyConfigToClipboard}
        copiedSuccess={copiedSuccess}
        onResetDefaults={resetToDefaultPositions}
      />

    </div>
  )
}
