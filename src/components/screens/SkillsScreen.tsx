import React, { useState, useEffect, useCallback, useMemo, useRef } from 'react'
import { usePersonaSFX } from '@/hooks/usePersonaSFX'
import { PositionCalibrator } from '@/components/dev/PositionCalibrator'
import { PageCutoutOverlay } from '@/components/common/PageCutoutOverlay'
import { P3RControllerButton } from '@/components/common/P3RControllerButton'
import {
  type TechItem,
  type PhantomCharacter,
  type BubbleConfig,
  type KanjiConfig,
  type FountainConfig,
  PHANTOM_CHARACTERS,
  DEFAULT_BUBBLES,
  DEFAULT_KANJI_CONFIGS,
  DEFAULT_FOUNTAIN_CONFIG,
  P3RKanjiBadge,
} from '@/data/hideoutData'

export type { PhantomCharacter, BubbleConfig, KanjiConfig, TechItem, FountainConfig }

interface SkillsScreenProps {
  onBack: () => void
}

export const SkillsScreen: React.FC<SkillsScreenProps> = ({ onBack }) => {
  const { playHover, playSlash, playBack } = usePersonaSFX()

  // Active character in Mall Atrium (null = Overview Mode)
  const [activeCharId, setActiveCharId] = useState<string | null>(null)
  const [hoveredCharId, setHoveredCharId] = useState<string | null>(null)

  // Track the focal camera origin so zoom-out scales back from the exact same point without jerking
  const [lastFocusOrigin, setLastFocusOrigin] = useState<{ originX: number; originY: number }>({
    originX: 50,
    originY: 50,
  })

  // Cinematic Entrance state
  const [isEntranceAnimating, setIsEntranceAnimating] = useState(true)

  useEffect(() => {
    // Eagerly trigger font loading for kanji glyphs in parallel
    if (typeof document !== 'undefined' && 'fonts' in document) {
      const KANJI_GLYPHS = '結城理山岸風花桐条美鶴アイギス岳羽ゆかり伊織順平'
      document.fonts.load('800 16px "Shippori Mincho"', KANJI_GLYPHS).catch(() => {})
      document.fonts.load('700 16px "Noto Serif JP"', KANJI_GLYPHS).catch(() => {})
    }

    const timer = setTimeout(() => {
      setIsEntranceAnimating(false)
    }, 400)
    return () => clearTimeout(timer)
  }, [])

  // Character list with dynamic positioning state
  const [characterList, setCharacterList] = useState<PhantomCharacter[]>(() => {
    localStorage.removeItem('p5_characters_bocchi_v5')
    localStorage.removeItem('p5_characters_bocchi_v6')
    localStorage.removeItem('p5_characters_bocchi_v7')
    localStorage.removeItem('p5_characters_bocchi_v8')
    localStorage.removeItem('p3r_characters_mall_v1')
    localStorage.removeItem('p3r_characters_mall_v2')
    const saved = localStorage.getItem('p3r_characters_mall_v3')
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

  // Fountain water occlusion layer config state
  const [fountainConfig, setFountainConfig] = useState<FountainConfig>(() => {
    localStorage.removeItem('p3r_fountain_mall_v1')
    localStorage.removeItem('p3r_fountain_mall_v2')
    localStorage.removeItem('p3r_fountain_mall_v3')
    const saved = localStorage.getItem('p3r_fountain_mall_v4')
    if (saved) {
      try {
        const parsed = JSON.parse(saved)
        if (typeof parsed === 'object') return parsed
      } catch { /* ignore */ }
    }
    return DEFAULT_FOUNTAIN_CONFIG
  })

  const updateFountainConfig = (updates: Partial<FountainConfig>) => {
    setFountainConfig(prev => {
      const next = { ...prev, ...updates }
      localStorage.setItem('p3r_fountain_mall_v4', JSON.stringify(next))
      return next
    })
  }

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
  const [calibratingCharId, setCalibratingCharId] = useState<string>('makoto')
  const [calibratorTab, setCalibratorTab] = useState<'char' | 'camera' | 'bubble' | 'kanji' | 'fountain'>('char')
  const [copiedSuccess, setCopiedSuccess] = useState(false)
  const stageRef = useRef<HTMLDivElement>(null)

  // Floating dialogue box configuration state (persisted in localStorage)
  const [bubbleList, setBubbleList] = useState<Record<string, BubbleConfig>>(() => {
    localStorage.removeItem('p5_bubbles_v10')
    localStorage.removeItem('p5_bubbles_v11')
    localStorage.removeItem('p5_bubbles_v12')
    localStorage.removeItem('p3r_bubbles_mall_v1')
    localStorage.removeItem('p3r_bubbles_mall_v2')
    const saved = localStorage.getItem('p3r_bubbles_mall_v3')
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
      const current = prev[calibratingCharId] || DEFAULT_BUBBLES[calibratingCharId] || DEFAULT_BUBBLES.makoto
      const next = { ...prev, [calibratingCharId]: { ...current, ...updates } }
      localStorage.setItem('p3r_bubbles_mall_v3', JSON.stringify(next))
      return next
    })
  }

  // Floating giant Japanese kanji configuration state (persisted in localStorage)
  const [kanjiList, setKanjiList] = useState<Record<string, KanjiConfig>>(() => {
    localStorage.removeItem('p5_kanji_v5')
    localStorage.removeItem('p5_kanji_v6')
    localStorage.removeItem('p5_kanji_v7')
    localStorage.removeItem('p3r_kanji_mall_v1')
    localStorage.removeItem('p3r_kanji_mall_v2')
    const saved = localStorage.getItem('p3r_kanji_mall_v3')
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
      const current = prev[calibratingCharId] || DEFAULT_KANJI_CONFIGS[calibratingCharId] || DEFAULT_KANJI_CONFIGS.makoto
      const next = { ...prev, [calibratingCharId]: { ...current, ...updates } }
      localStorage.setItem('p3r_kanji_mall_v3', JSON.stringify(next))
      return next
    })
  }

  // Active character object
  const activeChar = useMemo(() => {
    return characterList.find(c => c.id === activeCharId) || null
  }, [characterList, activeCharId])

  // Preserved character state so dialogue card can cleanly fade out in-place on ESC without jumping/flickering
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
      localStorage.setItem('p3r_characters_mall_v3', JSON.stringify(next))
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
    const fountainFormatted = JSON.stringify(fountainConfig, null, 2)
    const payload = `const PHANTOM_CHARACTERS: PhantomCharacter[] = ${charsFormatted}\n\nconst DEFAULT_BUBBLES: Record<string, BubbleConfig> = ${bubblesFormatted}\n\nconst DEFAULT_KANJI_CONFIGS: Record<string, KanjiConfig> = ${kanjiFormatted}\n\nconst DEFAULT_FOUNTAIN_CONFIG: FountainConfig = ${fountainFormatted}`
    navigator.clipboard.writeText(payload)
    setCopiedSuccess(true)
    setTimeout(() => setCopiedSuccess(false), 2000)
  }

  const resetToDefaultPositions = () => {
    localStorage.removeItem('p3r_characters_mall_v1')
    localStorage.removeItem('p3r_characters_mall_v2')
    localStorage.removeItem('p3r_characters_mall_v3')
    localStorage.removeItem('p3r_bubbles_mall_v1')
    localStorage.removeItem('p3r_bubbles_mall_v2')
    localStorage.removeItem('p3r_bubbles_mall_v3')
    localStorage.removeItem('p3r_kanji_mall_v1')
    localStorage.removeItem('p3r_kanji_mall_v2')
    localStorage.removeItem('p3r_kanji_mall_v3')
    localStorage.removeItem('p3r_fountain_mall_v1')
    localStorage.removeItem('p3r_fountain_mall_v2')
    localStorage.removeItem('p3r_fountain_mall_v3')
    localStorage.removeItem('p3r_fountain_mall_v4')
    setCharacterList(PHANTOM_CHARACTERS)
    setBubbleList(DEFAULT_BUBBLES)
    setKanjiList(DEFAULT_KANJI_CONFIGS)
    setFountainConfig(DEFAULT_FOUNTAIN_CONFIG)
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
        localStorage.setItem('p3r_characters_mall_v3', JSON.stringify(next))
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

  // Fountain Drag-and-Drop Handler for Mouse Calibration
  const handleStartDragFountain = (e: React.MouseEvent) => {
    if (!isCalibratorOpen || calibratorTab !== 'fountain') return
    e.stopPropagation()
    e.preventDefault()

    const startX = e.clientX
    const startY = e.clientY
    const initTx = fountainConfig.tx
    const initTy = fountainConfig.ty

    const onMouseMove = (ev: MouseEvent) => {
      const dx = (ev.clientX - startX) / scale
      const dy = (ev.clientY - startY) / scale
      const newTx = Math.round(initTx + dx)
      const newTy = Math.round(initTy + dy)
      updateFountainConfig({ tx: newTx, ty: newTy })
    }

    const onMouseUp = () => {
      window.removeEventListener('mousemove', onMouseMove)
      window.removeEventListener('mouseup', onMouseUp)
    }

    window.addEventListener('mousemove', onMouseMove)
    window.addEventListener('mouseup', onMouseUp)
  }

  const handleSelectCharacter = useCallback((char: PhantomCharacter) => {
    playSlash()
    setHoveredCharId(null)
    setLastFocusOrigin({ originX: char.camera.originX, originY: char.camera.originY })
    setActiveCharId(char.id)
  }, [playSlash])

  const handleResetCamera = useCallback(() => {
    playBack()
    setHoveredCharId(null)
    setActiveCharId(null)
    // Preserve lastFocusOrigin so camera zooms out smoothly from focal point
  }, [playBack])

  // Keyboard navigation: Shift+C for Calibrator, Escape for back/close, Arrow keys for precision fountain nudging
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
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
        return
      }

      // Precision Arrow Keys for Fountain Calibration
      if (isCalibratorOpen && calibratorTab === 'fountain') {
        const step = e.shiftKey ? 10 : 1
        if (e.key === 'ArrowLeft') {
          e.preventDefault()
          updateFountainConfig({ tx: fountainConfig.tx - step })
        } else if (e.key === 'ArrowRight') {
          e.preventDefault()
          updateFountainConfig({ tx: fountainConfig.tx + step })
        } else if (e.key === 'ArrowUp') {
          e.preventDefault()
          updateFountainConfig({ ty: fountainConfig.ty - step })
        } else if (e.key === 'ArrowDown') {
          e.preventDefault()
          updateFountainConfig({ ty: fountainConfig.ty + step })
        }
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [activeCharId, isCalibratorOpen, calibratorTab, fountainConfig, onBack, playBack, playSlash, handleResetCamera])

  return (
    <div className="fixed inset-0 z-30 select-none overflow-hidden bg-[#000a18] flex flex-col justify-between animate-in fade-in duration-300">

      {/* Hidden CJK Font Warm-up */}
      <div
        className="fixed -left-[9999px] -top-[9999px] opacity-0 pointer-events-none select-none font-p5Kanji font-extrabold"
        aria-hidden="true"
      >
        {characterList.map(c => c.kanji).join(' ')}
      </div>

      {/* ── CINEMATIC LETTERBOX BARS (FOREGROUND LAYER) ── */}
      <div
        className={`fixed top-0 inset-x-0 z-[60] bg-black/95 pointer-events-none transition-all duration-500 h-10 sm:h-12 md:h-14 lg:h-16 ${
          activeChar ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0'
        }`}
        style={{ transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)' }}
      />
      <div
        className={`fixed bottom-0 inset-x-0 z-[60] bg-black/95 pointer-events-none transition-all duration-500 h-10 sm:h-12 md:h-14 lg:h-16 ${
          activeChar ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0'
        }`}
        style={{ transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)' }}
      />

      {/* ── TOP-LEFT: Universal Persona Ransom Cutout Title (Matching All Other Pages) ── */}
      <PageCutoutOverlay
        title="HIDEOUT"
        characterRole="LEADER"
        characterName="MAKOTO YUKI"
        accentColor="brown"
        hideBottomLegend={true}
        hideBottomBadge={true}
        isVisible={!activeChar}
        disableEscapeKey={true}
        onBack={onBack}
      />

      {/* ── 2.5D PAULOWNIA MALL ATRIUM VIRTUAL CAMERA STAGE ── */}
      <div
        className={`relative w-full h-full flex items-center justify-center overflow-hidden transition-all duration-700 ease-out ${
          isEntranceAnimating ? 'scale-105 opacity-90' : 'scale-100 opacity-100'
        }`}
      >
        <div ref={stageRef} className="relative w-full h-full select-none overflow-hidden">

          {/* Virtual 2.5D Camera Stage */}
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
            {/* 1. Base Stage Background: Cinematic Mall Atrium with Central Fountain */}
            <img
              src="/assets/Cinematic Mall Atrium with Central Fountain.webp"
              alt="Paulownia Mall Atrium"
              style={{
                imageRendering: '-webkit-optimize-contrast',
                willChange: 'transform',
                filter: 'contrast(1.05) brightness(0.96) saturate(1.08)',
              }}
              className="absolute inset-0 w-full h-full object-cover pointer-events-none select-none"
            />

            {/* Ambient Dark Dim Overlay */}
            <div
              onClick={handleResetCamera}
              className={`absolute inset-0 bg-[#001233]/65 transition-opacity duration-500 z-10 ${
                activeChar ? 'opacity-100 pointer-events-auto cursor-pointer' : 'opacity-0 pointer-events-none'
              }`}
            />

            {/* 2. Giant Japanese Kanji Backdrop Watermark */}
            {(() => {
              const displayKanjiChar = activeChar || lastActiveChar
              if (!displayKanjiChar) return null

              const kConfig = kanjiList[displayKanjiChar.id] || DEFAULT_KANJI_CONFIGS[displayKanjiChar.id] || DEFAULT_KANJI_CONFIGS.makoto
              const posX = displayKanjiChar.camera.originX + (kConfig.x || 0)
              const posY = displayKanjiChar.camera.originY + (kConfig.y || 0)
              const fontVw = 11 / (displayKanjiChar.camera.scale * 0.72)

              // Kanji watermark sits behind character (z-12 for characters behind fountain, z-24 for characters in front)
              const kanjiZIndex = displayKanjiChar.zIndex < 20 ? 12 : 24

              return (
                <div
                  key={displayKanjiChar.id}
                  style={{
                    zIndex: kanjiZIndex,
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
                  <div
                    style={{
                      transform: `rotate(${kConfig.rotate ?? -6}deg) scale(${kConfig.scale ?? 1}) translateZ(0)`,
                      transformOrigin: 'center center',
                      opacity: kConfig.opacity ?? 0.75,
                    }}
                  >
                    <span
                      style={{
                        fontSize: `${fontVw}vw`,
                        letterSpacing: '0.14em',
                      }}
                      className="font-p5Kanji font-extrabold text-cyan-100 select-none tracking-widest drop-shadow-[0_0_24px_rgba(22,207,251,0.6)] inline-block"
                    >
                      {displayKanjiChar.kanji}
                    </span>
                  </div>
                </div>
              )
            })()}

            {/* 3. 6 SEES Character Cutout Sprites */}
            {characterList.map((char) => {
              const isSelected = activeChar?.id === char.id
              const isDimmed = Boolean(activeChar && !isSelected)
              const isHovered = Boolean(!activeChar && hoveredCharId === char.id)
              const isCalibrating = isCalibratorOpen && calibratingCharId === char.id

              // Pure 2.5D depth: characters ALWAYS stay in their natural physical depth layer
              // Makoto/Mitsuru stay at z-15/14 (behind fountain z-20)
              // Fuuka/Aigis stay at z-25/28 (in front of fountain z-20)
              const effectiveZIndex = char.zIndex

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
                    zIndex: effectiveZIndex,
                  }}
                  className={`
                    absolute top-1/2 left-1/2 select-none transition-opacity duration-300
                    ${isCalibratorOpen ? 'cursor-grab active:cursor-grabbing' : 'cursor-pointer'}
                    ${isCalibrating ? 'ring-2 ring-cyan-400 ring-offset-2 ring-offset-black rounded' : ''}
                    ${isDimmed ? 'opacity-25 pointer-events-none' : 'opacity-100'}
                  `}
                  title={isCalibratorOpen ? `Drag to position ${char.name}` : `Select ${char.name} [${char.codename}]`}
                >
                  {/* Floor Contact Shadow */}
                  <div
                    className={`
                      absolute -bottom-1 left-1/2 -translate-x-1/2 pointer-events-none rounded-[50%] -skew-x-12 transition-opacity duration-300
                      ${isHovered ? 'opacity-95' : 'opacity-85'}
                    `}
                    style={{
                      width: `${char.shadowWidth}%`,
                      height: `${char.shadowHeight}px`,
                      background: 'radial-gradient(ellipse at center, rgba(0, 10, 25, 0.95) 0%, rgba(0, 20, 45, 0.5) 55%, transparent 75%)',
                    }}
                  />

                  {/* Character Cutout Graphic */}
                  <img
                    src={char.src}
                    alt={char.name}
                    style={{
                      imageRendering: '-webkit-optimize-contrast',
                      willChange: 'transform',
                      filter: isHovered
                        ? 'brightness(1.12) drop-shadow(0 0 12px rgba(22,207,251,0.6))'
                        : `brightness(${char.brightness}) contrast(1.02)`,
                      transition: 'filter 180ms ease-out',
                    }}
                    className="w-full h-auto object-contain select-none pointer-events-auto"
                  />
                </div>
              )
            })}

            {/* 4. 2.5D Foreground Central Fountain Water Occlusion Layer (zIndex: 20) */}
            <div
              onMouseDown={handleStartDragFountain}
              className={`absolute inset-0 w-full h-full select-none ${
                isCalibratorOpen && calibratorTab === 'fountain'
                  ? 'pointer-events-auto cursor-grab active:cursor-grabbing ring-4 ring-cyan-400 ring-dashed'
                  : 'pointer-events-none'
              }`}
              style={{
                zIndex: 20,
                transform: `translate(${fountainConfig.tx * scale}px, ${fountainConfig.ty * scale}px) scale(${fountainConfig.scale * (fountainConfig.scaleX ?? 1)}, ${fountainConfig.scale * (fountainConfig.scaleY ?? 1)})`,
                opacity: fountainConfig.opacity,
              }}
              title={isCalibratorOpen && calibratorTab === 'fountain' ? 'Click & drag with mouse to align fountain water with background' : undefined}
            >
              <div className="relative w-full h-full">
                {/* 1. Normal Daytime Fountain Water Layer (Overview Mode) */}
                <img
                  src="/assets/fountain water.webp"
                  alt="Central Fountain Water Occlusion"
                  style={{
                    imageRendering: '-webkit-optimize-contrast',
                    willChange: 'transform, opacity',
                  }}
                  className={`w-full h-full object-cover pointer-events-none select-none transition-opacity duration-500 ${
                    activeChar ? 'opacity-0' : 'opacity-100'
                  }`}
                />
                {/* 2. Synced Pre-Baked Dimmed Fountain Layer (Focus Mode) - 100% Zero Highlight Leak */}
                <img
                  src="/assets/fountain water dimmed.webp"
                  alt="Central Fountain Water Occlusion Dimmed"
                  style={{
                    imageRendering: '-webkit-optimize-contrast',
                    willChange: 'transform, opacity',
                  }}
                  className={`absolute inset-0 w-full h-full object-cover pointer-events-none select-none transition-opacity duration-500 ${
                    activeChar ? 'opacity-100' : 'opacity-0'
                  }`}
                />
              </div>
            </div>

            {/* 5. Subtle Cool Blue Atrium Lighting Filter */}
            <div
              className="absolute inset-0 pointer-events-none select-none"
              style={{
                zIndex: 22,
                mixBlendMode: 'soft-light',
                background: 'radial-gradient(circle at 50% 40%, rgba(22, 207, 251, 0.15) 0%, rgba(0, 18, 51, 0.25) 100%)',
              }}
            />
          </div>

          {/* ── PERSONA 3 RELOAD AUTHENTIC DIALOGUE BUBBLE & SEPARATE TECH STATS CARD ── */}
          {(() => {
            const displayChar = activeChar || lastActiveChar
            if (!displayChar) return null

            const bubble = bubbleList[displayChar.id] || DEFAULT_BUBBLES[displayChar.id] || DEFAULT_BUBBLES.makoto
            const desktopStyle: React.CSSProperties = bubble.side === 'right'
              ? { left: `${bubble.posX}%`, top: `${bubble.top}%` }
              : { right: `${bubble.posX}%`, top: `${bubble.top}%` }
            const bubbleWidth = bubble.width || 580
            const bubbleRotate = bubble.bubbleRotate || 0

            return (
              <div
                onClick={(e) => e.stopPropagation()}
                className={`
                  absolute z-40 select-none
                  bottom-6 left-1/2 -translate-x-1/2
                  sm:bottom-auto sm:left-auto sm:translate-x-0
                  ${activeChar
                    ? 'opacity-100 scale-100 pointer-events-auto'
                    : 'opacity-0 scale-95 pointer-events-none'
                  }
                `}
                style={{
                  ...desktopStyle,
                  width: `min(94vw, ${bubbleWidth}px)`,
                  transform: `rotate(${bubbleRotate}deg)`,
                  transformOrigin: 'top left',
                  transition: activeChar
                    ? 'opacity 220ms ease-out, transform 220ms cubic-bezier(0.16, 1, 0.3, 1)'
                    : 'opacity 130ms ease-in, transform 130ms ease-in',
                  transitionDelay: activeChar ? '70ms' : '0ms',
                }}
              >
                {/* Authentic Persona 3 Reload Speech Bubble Graphic */}
                <div
                  className="relative w-full filter drop-shadow-[0_0_18px_rgba(22,207,251,0.5)]"
                  style={{ aspectRatio: '1525 / 355' }}
                >
                  {/* Background Graphic: BubbleChat Persona 3.webp */}
                  <img
                    src="/assets/BubbleChat Persona 3.webp"
                    alt="P3R Dialogue Box"
                    className="absolute inset-0 w-full h-full object-contain pointer-events-none select-none"
                    style={{ imageRendering: '-webkit-optimize-contrast' }}
                  />

                  {/* Character Kanji & Codename Tag (Inside the electric blue wedge at top-left) */}
                  <div
                    className="absolute flex items-center gap-1.5 sm:gap-2 pointer-events-none"
                    style={{
                      top: '9%',
                      left: '4%',
                      maxWidth: '32%',
                    }}
                  >
                    <span className="font-p5Kanji font-extrabold text-white text-xs sm:text-sm md:text-base tracking-widest drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)] whitespace-nowrap">
                      {displayChar.kanji}
                    </span>
                    <span className="font-rodin text-[9px] sm:text-[10px] text-cyan-200 font-black tracking-wider uppercase drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)] whitespace-nowrap hidden sm:inline">
                      [{displayChar.codename}]
                    </span>
                  </div>

                  {/* Character Dialogue Quote Text (Inside the main navy body area) */}
                  <div
                    className="absolute inset-0 flex items-center pointer-events-none"
                    style={{
                      paddingLeft: '14%',
                      paddingRight: '12%',
                      paddingTop: '6%',
                      paddingBottom: '4%',
                    }}
                  >
                    <p className="font-rodin text-xs sm:text-[13px] md:text-[14px] lg:text-[15px] text-white font-bold leading-relaxed tracking-wide drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)] line-clamp-3">
                      “{displayChar.quote}”
                    </p>
                  </div>

                  {/* Subtle breathing glow on the P3R Chevron Arrow at bottom-right */}
                  <div
                    className="absolute pointer-events-none animate-pulse"
                    style={{
                      bottom: '7%',
                      right: '2.5%',
                      width: '6%',
                      height: '24%',
                    }}
                  />
                </div>
              </div>
            )
          })()}

        </div>
      </div>

      {/* ── BOTTOM HUD: PLAYSTATION VECTOR BUTTONS ── */}
      <div className="absolute bottom-4 left-4 sm:bottom-6 sm:left-6 z-40 flex items-center gap-4 pointer-events-auto">
        {activeChar ? (
          <P3RControllerButton
            symbol="circle"
            label="CLOSE FOCUS"
            title="Close Character Focus (Escape)"
            onClick={handleResetCamera}
          />
        ) : (
          <P3RControllerButton
            symbol="circle"
            label="BACK TO MENU"
            title="Return to Main Menu (Escape)"
            onClick={() => {
              playBack()
              onBack()
            }}
          />
        )}
      </div>

      {/* ── MALL ATRIUM LIVE POSITION CALIBRATOR (SHIFT + C) ── */}
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
        fountainConfig={fountainConfig}
        defaultFountain={DEFAULT_FOUNTAIN_CONFIG}
        onUpdateFountain={updateFountainConfig}
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
