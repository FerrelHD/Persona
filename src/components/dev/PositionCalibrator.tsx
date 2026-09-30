import React from 'react'
import { Move, Copy, Check, RotateCcw } from 'lucide-react'
import type { PhantomCharacter, BubbleConfig, KanjiConfig } from '@/components/screens/SkillsScreen'

interface PositionCalibratorProps {
  isOpen: boolean
  onClose: () => void
  characterList: PhantomCharacter[]
  calibratingCharId: string
  onSelectCharId: (id: string) => void
  calibratingChar: PhantomCharacter
  onUpdateChar: (updates: Partial<PhantomCharacter>) => void
  calibratorTab: 'char' | 'camera' | 'bubble' | 'kanji'
  onChangeTab: (tab: 'char' | 'camera' | 'bubble' | 'kanji') => void
  bubbleList: Record<string, BubbleConfig>
  defaultBubbles: Record<string, BubbleConfig>
  onUpdateBubble: (updates: Partial<BubbleConfig>) => void
  kanjiList: Record<string, KanjiConfig>
  defaultKanji: Record<string, KanjiConfig>
  onUpdateKanji: (updates: Partial<KanjiConfig>) => void
  activeCharId: string | null
  onTogglePreviewCamera: () => void
  onCopyConfig: () => void
  copiedSuccess: boolean
  onResetDefaults: () => void
}

export const PositionCalibrator: React.FC<PositionCalibratorProps> = ({
  isOpen,
  onClose,
  characterList,
  calibratingCharId,
  onSelectCharId,
  calibratingChar,
  onUpdateChar,
  calibratorTab,
  onChangeTab,
  bubbleList,
  defaultBubbles,
  onUpdateBubble,
  kanjiList,
  defaultKanji,
  onUpdateKanji,
  activeCharId,
  onTogglePreviewCamera,
  onCopyConfig,
  copiedSuccess,
  onResetDefaults,
}) => {
  if (!isOpen) return null

  const currentBubble = bubbleList[calibratingCharId] || defaultBubbles[calibratingCharId] || defaultBubbles.joker
  const currentKanji = kanjiList[calibratingChar.id] || defaultKanji[calibratingChar.id] || defaultKanji.joker

  return (
    <div className="fixed top-4 right-4 z-[70] flex flex-col items-end animate-in fade-in zoom-in-95 duration-200">
      <div className="w-[340px] sm:w-[380px] bg-black/95 border-2 border-yellow-400 text-white p-3.5 shadow-[6px_6px_0px_#000] max-h-[85vh] overflow-y-auto font-sans text-xs">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-zinc-800 pb-2 mb-3">
          <div className="flex items-center gap-1.5">
            <Move className="size-4 text-yellow-400" />
            <span className="font-p5Heading text-sm font-bold text-yellow-400">POSITION CALIBRATOR</span>
          </div>
          <button
            onClick={onClose}
            className="px-2 py-0.5 bg-zinc-800 hover:bg-[#E60012] text-zinc-300 hover:text-white font-mono text-[10px] rounded transition-colors cursor-pointer"
            title="Close (Shift+C or Esc)"
          >
            ✕ CLOSE [Shift+C]
          </button>
        </div>

        {/* Character Selector Tabs */}
        <div className="grid grid-cols-3 gap-1 mb-3">
          {characterList.map((c) => (
            <button
              key={c.id}
              onClick={() => onSelectCharId(c.id)}
              className={`px-2 py-1 text-center font-p5Heading text-xs uppercase -skew-x-3 border transition-colors ${
                calibratingCharId === c.id
                  ? 'bg-yellow-400 text-black border-black font-black'
                  : 'bg-zinc-900 text-zinc-300 border-zinc-700 hover:bg-zinc-800'
              }`}
            >
              {c.codename}
            </button>
          ))}
        </div>

        {/* Selected Character Info */}
        <div className="flex items-center justify-between bg-zinc-900 px-2.5 py-1.5 border border-zinc-800 mb-3 text-[11px] font-mono">
          <span className="text-white font-bold">{calibratingChar.name}</span>
          <span className="text-yellow-400">z-index: {calibratingChar.zIndex}</span>
        </div>

        {/* Live Camera & Bubble Preview Toggle */}
        <button
          onClick={onTogglePreviewCamera}
          className={`w-full py-1.5 px-3 mb-2.5 font-p5Heading text-xs uppercase -skew-x-3 border-2 border-black flex items-center justify-center gap-2 shadow-[2px_2px_0px_#000] cursor-pointer transition-colors ${
            activeCharId === calibratingChar.id
              ? 'bg-[#E60012] text-white hover:bg-red-700'
              : 'bg-yellow-400 text-black hover:bg-yellow-300 font-black'
          }`}
        >
          <span>{activeCharId === calibratingChar.id ? '✕ RETURN TO ROOM' : '👁️ PREVIEW ZOOM & BUBBLE'}</span>
        </button>

        {/* Calibrator Mode Sub-Tabs */}
        <div className="grid grid-cols-4 gap-1 mb-3 bg-zinc-900 p-1 border border-zinc-800">
          <button
            onClick={() => onChangeTab('char')}
            className={`py-1 text-center font-p5Heading text-[10px] sm:text-[11px] uppercase transition-colors ${
              calibratorTab === 'char' ? 'bg-[#E60012] text-white font-bold' : 'text-zinc-400 hover:text-white'
            }`}
          >
            1. CHAR
          </button>
          <button
            onClick={() => onChangeTab('camera')}
            className={`py-1 text-center font-p5Heading text-[10px] sm:text-[11px] uppercase transition-colors ${
              calibratorTab === 'camera' ? 'bg-[#E60012] text-white font-bold' : 'text-zinc-400 hover:text-white'
            }`}
          >
            2. CAM
          </button>
          <button
            onClick={() => onChangeTab('bubble')}
            className={`py-1 text-center font-p5Heading text-[10px] sm:text-[11px] uppercase transition-colors ${
              calibratorTab === 'bubble' ? 'bg-[#E60012] text-white font-bold' : 'text-zinc-400 hover:text-white'
            }`}
          >
            3. BUBBLE
          </button>
          <button
            onClick={() => onChangeTab('kanji')}
            className={`py-1 text-center font-p5Heading text-[10px] sm:text-[11px] uppercase transition-colors ${
              calibratorTab === 'kanji' ? 'bg-[#E60012] text-white font-bold' : 'text-zinc-400 hover:text-white'
            }`}
          >
            4. KANJI
          </button>
        </div>

        {/* Tab 1: Character Position & Size */}
        {calibratorTab === 'char' && (
          <div className="space-y-2.5 font-mono text-[11px]">
            {/* Horizontal (Offset X px) */}
            <div>
              <div className="flex justify-between text-zinc-300 mb-1">
                <span>Horizontal (Offset X):</span>
                <span className="text-yellow-400 font-bold">{calibratingChar.tx}px</span>
              </div>
              <input
                type="range"
                min="-960"
                max="960"
                step="2"
                value={calibratingChar.tx}
                onChange={(e) => onUpdateChar({ tx: parseInt(e.target.value, 10) })}
                className="w-full accent-yellow-400 cursor-pointer"
              />
            </div>

            {/* Vertical (Offset Y px) */}
            <div>
              <div className="flex justify-between text-zinc-300 mb-1">
                <span>Vertical (Offset Y):</span>
                <span className="text-yellow-400 font-bold">{calibratingChar.ty}px</span>
              </div>
              <input
                type="range"
                min="-540"
                max="540"
                step="2"
                value={calibratingChar.ty}
                onChange={(e) => onUpdateChar({ ty: parseInt(e.target.value, 10) })}
                className="w-full accent-yellow-400 cursor-pointer"
              />
            </div>

            {/* Width (px Size) */}
            <div>
              <div className="flex justify-between text-zinc-300 mb-1">
                <span>Size (Width):</span>
                <span className="text-yellow-400 font-bold">{calibratingChar.width}px</span>
              </div>
              <input
                type="range"
                min="40"
                max="600"
                step="2"
                value={calibratingChar.width}
                onChange={(e) => onUpdateChar({ width: parseInt(e.target.value, 10) })}
                className="w-full accent-yellow-400 cursor-pointer"
              />
            </div>

            {/* Z-Index */}
            <div className="flex items-center justify-between pt-1">
              <span className="text-zinc-300">Z-Index Layer:</span>
              <div className="flex items-center gap-1">
                <button
                  onClick={() => onUpdateChar({ zIndex: Math.max(1, calibratingChar.zIndex - 1) })}
                  className="px-2 py-0.5 bg-zinc-800 hover:bg-zinc-700 border border-zinc-600 rounded font-bold"
                >
                  -
                </button>
                <span className="w-8 text-center text-yellow-400 font-bold">{calibratingChar.zIndex}</span>
                <button
                  onClick={() => onUpdateChar({ zIndex: calibratingChar.zIndex + 1 })}
                  className="px-2 py-0.5 bg-zinc-800 hover:bg-zinc-700 border border-zinc-600 rounded font-bold"
                >
                  +
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: Camera Zoom & Framing */}
        {calibratorTab === 'camera' && (
          <div className="space-y-2.5 font-mono text-[11px]">
            {/* Camera Zoom Scale */}
            <div>
              <div className="flex justify-between text-zinc-300 mb-1">
                <span>Zoom Scale:</span>
                <span className="text-yellow-400 font-bold">{calibratingChar.camera.scale}x</span>
              </div>
              <input
                type="range"
                min="1.3"
                max="3.2"
                step="0.05"
                value={calibratingChar.camera.scale}
                onChange={(e) =>
                  onUpdateChar({
                    camera: { ...calibratingChar.camera, scale: parseFloat(e.target.value) },
                  })
                }
                className="w-full accent-yellow-400 cursor-pointer"
              />
            </div>

            {/* Camera Origin X */}
            <div>
              <div className="flex justify-between text-zinc-300 mb-1">
                <span>Camera Focus X (%):</span>
                <span className="text-yellow-400 font-bold">{calibratingChar.camera.originX}%</span>
              </div>
              <input
                type="range"
                min="0"
                max="100"
                step="0.5"
                value={calibratingChar.camera.originX}
                onChange={(e) =>
                  onUpdateChar({
                    camera: { ...calibratingChar.camera, originX: parseFloat(e.target.value) },
                  })
                }
                className="w-full accent-yellow-400 cursor-pointer"
              />
            </div>

            {/* Camera Origin Y */}
            <div>
              <div className="flex justify-between text-zinc-300 mb-1">
                <span>Camera Focus Y (%):</span>
                <span className="text-yellow-400 font-bold">{calibratingChar.camera.originY}%</span>
              </div>
              <input
                type="range"
                min="0"
                max="100"
                step="0.5"
                value={calibratingChar.camera.originY}
                onChange={(e) =>
                  onUpdateChar({
                    camera: { ...calibratingChar.camera, originY: parseFloat(e.target.value) },
                  })
                }
                className="w-full accent-yellow-400 cursor-pointer"
              />
            </div>
          </div>
        )}

        {/* Tab 3: Speech Bubble Position & Granular Text Controls */}
        {calibratorTab === 'bubble' && (
          <div className="space-y-3 font-mono text-[11px]">
            {/* Section A: Bubble Frame */}
            <div className="bg-zinc-900/90 p-2 border border-zinc-800 space-y-2.5">
              <span className="text-yellow-400 font-bold font-p5Heading tracking-wider block border-b border-zinc-800 pb-1">
                🎈 1. BUBBLE FRAME
              </span>

              {/* Bubble Placement Side */}
              <div className="flex items-center justify-between">
                <span className="text-zinc-300">Anchor Side:</span>
                <div className="flex items-center gap-1">
                  <button
                    onClick={() => onUpdateBubble({ side: 'left' })}
                    className={`px-2 py-0.5 font-p5Heading text-xs uppercase border ${
                      currentBubble.side === 'left'
                        ? 'bg-yellow-400 text-black border-black font-bold'
                        : 'bg-zinc-800 text-zinc-300 border-zinc-700'
                    }`}
                  >
                    LEFT
                  </button>
                  <button
                    onClick={() => onUpdateBubble({ side: 'right' })}
                    className={`px-2 py-0.5 font-p5Heading text-xs uppercase border ${
                      currentBubble.side === 'right'
                        ? 'bg-yellow-400 text-black border-black font-bold'
                        : 'bg-zinc-800 text-zinc-300 border-zinc-700'
                    }`}
                  >
                    RIGHT
                  </button>
                </div>
              </div>

              {/* Horizontal Position (posX %) */}
              <div>
                <div className="flex justify-between text-zinc-300 mb-1">
                  <span>Screen Horizontal ({currentBubble.side === 'right' ? 'Left' : 'Right'} %):</span>
                  <span className="text-yellow-400 font-bold">{currentBubble.posX}%</span>
                </div>
                <input
                  type="range"
                  min="5"
                  max="85"
                  step="1"
                  value={currentBubble.posX}
                  onChange={(e) => onUpdateBubble({ posX: parseInt(e.target.value, 10) })}
                  className="w-full accent-yellow-400 cursor-pointer"
                />
              </div>

              {/* Vertical Position (top %) */}
              <div>
                <div className="flex justify-between text-zinc-300 mb-1">
                  <span>Screen Vertical (Top %):</span>
                  <span className="text-yellow-400 font-bold">{currentBubble.top}%</span>
                </div>
                <input
                  type="range"
                  min="2"
                  max="75"
                  step="1"
                  value={currentBubble.top}
                  onChange={(e) => onUpdateBubble({ top: parseInt(e.target.value, 10) })}
                  className="w-full accent-yellow-400 cursor-pointer"
                />
              </div>

              {/* Bubble Width */}
              <div>
                <div className="flex justify-between text-zinc-300 mb-1">
                  <span>Bubble Width:</span>
                  <span className="text-yellow-400 font-bold">{currentBubble.width || 520}px</span>
                </div>
                <input
                  type="range"
                  min="360"
                  max="700"
                  step="5"
                  value={currentBubble.width || 520}
                  onChange={(e) => onUpdateBubble({ width: parseInt(e.target.value, 10) })}
                  className="w-full accent-yellow-400 cursor-pointer"
                />
              </div>

              {/* Bubble Overall Rotation */}
              <div>
                <div className="flex justify-between text-zinc-300 mb-1">
                  <span>Bubble Frame Rotation (°):</span>
                  <span className="text-yellow-400 font-bold">{currentBubble.bubbleRotate || 0}°</span>
                </div>
                <input
                  type="range"
                  min="-35"
                  max="35"
                  step="1"
                  value={currentBubble.bubbleRotate || 0}
                  onChange={(e) => onUpdateBubble({ bubbleRotate: parseInt(e.target.value, 10) })}
                  className="w-full accent-yellow-400 cursor-pointer"
                />
              </div>
            </div>

            {/* Section B: Codename Tag Controls */}
            <div className="bg-zinc-900/90 p-2 border border-zinc-800 space-y-2">
              <span className="text-yellow-400 font-bold font-p5Heading tracking-wider block border-b border-zinc-800 pb-1">
                🏷️ 2. CODENAME TAG
              </span>

              {/* Name Offset X */}
              <div>
                <div className="flex justify-between text-zinc-300 mb-1">
                  <span>Name Offset X (px):</span>
                  <span className="text-yellow-400 font-bold">{currentBubble.nameOffsetX || 0}px</span>
                </div>
                <input
                  type="range"
                  min="-150"
                  max="150"
                  step="1"
                  value={currentBubble.nameOffsetX || 0}
                  onChange={(e) => onUpdateBubble({ nameOffsetX: parseInt(e.target.value, 10) })}
                  className="w-full accent-yellow-400 cursor-pointer"
                />
              </div>

              {/* Name Offset Y */}
              <div>
                <div className="flex justify-between text-zinc-300 mb-1">
                  <span>Name Offset Y (px):</span>
                  <span className="text-yellow-400 font-bold">{currentBubble.nameOffsetY || 0}px</span>
                </div>
                <input
                  type="range"
                  min="-100"
                  max="100"
                  step="1"
                  value={currentBubble.nameOffsetY || 0}
                  onChange={(e) => onUpdateBubble({ nameOffsetY: parseInt(e.target.value, 10) })}
                  className="w-full accent-yellow-400 cursor-pointer"
                />
              </div>

              {/* Name Rotation */}
              <div>
                <div className="flex justify-between text-zinc-300 mb-1">
                  <span>Name Rotation (°):</span>
                  <span className="text-yellow-400 font-bold">
                    {currentBubble.nameRotate ?? (currentBubble.side === 'right' ? 12 : -12)}°
                  </span>
                </div>
                <input
                  type="range"
                  min="-45"
                  max="45"
                  step="1"
                  value={currentBubble.nameRotate ?? (currentBubble.side === 'right' ? 12 : -12)}
                  onChange={(e) => onUpdateBubble({ nameRotate: parseInt(e.target.value, 10) })}
                  className="w-full accent-yellow-400 cursor-pointer"
                />
              </div>

              {/* Name Scale */}
              <div>
                <div className="flex justify-between text-zinc-300 mb-1">
                  <span>Name Scale:</span>
                  <span className="text-yellow-400 font-bold">
                    {Math.round((currentBubble.nameScale ?? 1) * 100)}%
                  </span>
                </div>
                <input
                  type="range"
                  min="60"
                  max="150"
                  step="2"
                  value={Math.round((currentBubble.nameScale ?? 1) * 100)}
                  onChange={(e) => onUpdateBubble({ nameScale: parseInt(e.target.value, 10) / 100 })}
                  className="w-full accent-yellow-400 cursor-pointer"
                />
              </div>
            </div>

            {/* Section C: Dialogue Quote Controls */}
            <div className="bg-zinc-900/90 p-2 border border-zinc-800 space-y-2">
              <span className="text-yellow-400 font-bold font-p5Heading tracking-wider block border-b border-zinc-800 pb-1">
                💬 3. DIALOGUE QUOTE
              </span>

              {/* Quote Offset X */}
              <div>
                <div className="flex justify-between text-zinc-300 mb-1">
                  <span>Quote Offset X (px):</span>
                  <span className="text-yellow-400 font-bold">{currentBubble.quoteOffsetX || 0}px</span>
                </div>
                <input
                  type="range"
                  min="-150"
                  max="150"
                  step="1"
                  value={currentBubble.quoteOffsetX || 0}
                  onChange={(e) => onUpdateBubble({ quoteOffsetX: parseInt(e.target.value, 10) })}
                  className="w-full accent-yellow-400 cursor-pointer"
                />
              </div>

              {/* Quote Offset Y */}
              <div>
                <div className="flex justify-between text-zinc-300 mb-1">
                  <span>Quote Offset Y (px):</span>
                  <span className="text-yellow-400 font-bold">{currentBubble.quoteOffsetY || 0}px</span>
                </div>
                <input
                  type="range"
                  min="-100"
                  max="100"
                  step="1"
                  value={currentBubble.quoteOffsetY || 0}
                  onChange={(e) => onUpdateBubble({ quoteOffsetY: parseInt(e.target.value, 10) })}
                  className="w-full accent-yellow-400 cursor-pointer"
                />
              </div>

              {/* Quote Rotation */}
              <div>
                <div className="flex justify-between text-zinc-300 mb-1">
                  <span>Quote Rotation (°):</span>
                  <span className="text-yellow-400 font-bold">
                    {currentBubble.quoteRotate ?? (currentBubble.side === 'right' ? -2 : 2)}°
                  </span>
                </div>
                <input
                  type="range"
                  min="-35"
                  max="35"
                  step="1"
                  value={currentBubble.quoteRotate ?? (currentBubble.side === 'right' ? -2 : 2)}
                  onChange={(e) => onUpdateBubble({ quoteRotate: parseInt(e.target.value, 10) })}
                  className="w-full accent-yellow-400 cursor-pointer"
                />
              </div>

              {/* Quote Scale */}
              <div>
                <div className="flex justify-between text-zinc-300 mb-1">
                  <span>Quote Scale / Font:</span>
                  <span className="text-yellow-400 font-bold">
                    {Math.round((currentBubble.quoteScale ?? 1) * 100)}%
                  </span>
                </div>
                <input
                  type="range"
                  min="60"
                  max="150"
                  step="2"
                  value={Math.round((currentBubble.quoteScale ?? 1) * 100)}
                  onChange={(e) => onUpdateBubble({ quoteScale: parseInt(e.target.value, 10) / 100 })}
                  className="w-full accent-yellow-400 cursor-pointer"
                />
              </div>

              {/* Quote Max Width */}
              <div>
                <div className="flex justify-between text-zinc-300 mb-1">
                  <span>Quote Max Width:</span>
                  <span className="text-yellow-400 font-bold">{currentBubble.quoteMaxWidth ?? 95}%</span>
                </div>
                <input
                  type="range"
                  min="50"
                  max="100"
                  step="1"
                  value={currentBubble.quoteMaxWidth ?? 95}
                  onChange={(e) => onUpdateBubble({ quoteMaxWidth: parseInt(e.target.value, 10) })}
                  className="w-full accent-yellow-400 cursor-pointer"
                />
              </div>
            </div>

            {/* Reset Bubble for Selected Character */}
            <button
              onClick={() => {
                const def = defaultBubbles[calibratingCharId] || defaultBubbles.joker
                onUpdateBubble({ ...def })
              }}
              className="w-full mt-2 py-1.5 px-2 bg-zinc-800 hover:bg-zinc-700 text-zinc-200 border border-zinc-600 font-p5Heading text-xs flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
            >
              <RotateCcw className="size-3 text-yellow-400" />
              <span>RESET {calibratingChar.codename} BUBBLE</span>
            </button>
          </div>
        )}

        {/* Tab 4: Giant Kanji Watermark Position & Opacity */}
        {calibratorTab === 'kanji' && (
          <div className="space-y-2.5 font-mono text-[11px]">
            {/* Info Header */}
            <div className="bg-zinc-900/80 p-2 border border-zinc-800 text-[10px] text-zinc-400">
              <span className="text-yellow-400 font-bold block mb-0.5">KANJI: {calibratingChar.kanji}</span>
              <span>Tersinkronisasi otomatis dengan fokus zoom kamera.</span>
            </div>

            {/* Offset X Slider */}
            <div>
              <div className="flex justify-between text-zinc-300 mb-0.5">
                <span>OFFSET X (%):</span>
                <span className="text-yellow-400 font-bold">{currentKanji.x}%</span>
              </div>
              <input
                type="range"
                min="-40"
                max="40"
                step="1"
                value={currentKanji.x}
                onChange={(e) => onUpdateKanji({ x: parseInt(e.target.value, 10) })}
                className="w-full accent-yellow-400 cursor-pointer"
              />
            </div>

            {/* Offset Y Slider */}
            <div>
              <div className="flex justify-between text-zinc-300 mb-0.5">
                <span>OFFSET Y (%):</span>
                <span className="text-yellow-400 font-bold">{currentKanji.y}%</span>
              </div>
              <input
                type="range"
                min="-40"
                max="40"
                step="1"
                value={currentKanji.y}
                onChange={(e) => onUpdateKanji({ y: parseInt(e.target.value, 10) })}
                className="w-full accent-yellow-400 cursor-pointer"
              />
            </div>

            {/* Rotation Slider */}
            <div>
              <div className="flex justify-between text-zinc-300 mb-0.5">
                <span>ROTATION:</span>
                <span className="text-yellow-400 font-bold">{currentKanji.rotate}°</span>
              </div>
              <input
                type="range"
                min="-30"
                max="30"
                step="1"
                value={currentKanji.rotate}
                onChange={(e) => onUpdateKanji({ rotate: parseInt(e.target.value, 10) })}
                className="w-full accent-yellow-400 cursor-pointer"
              />
            </div>

            {/* Opacity Slider */}
            <div>
              <div className="flex justify-between text-zinc-300 mb-0.5">
                <span>OPACITY:</span>
                <span className="text-yellow-400 font-bold">{Math.round(currentKanji.opacity * 100)}%</span>
              </div>
              <input
                type="range"
                min="0.05"
                max="1.0"
                step="0.01"
                value={currentKanji.opacity}
                onChange={(e) => onUpdateKanji({ opacity: parseFloat(e.target.value) })}
                className="w-full accent-yellow-400 cursor-pointer"
              />
            </div>

            {/* Scale Multiplier */}
            <div>
              <div className="flex justify-between text-zinc-300 mb-0.5">
                <span>SCALE:</span>
                <span className="text-yellow-400 font-bold">{currentKanji.scale}x</span>
              </div>
              <input
                type="range"
                min="0.5"
                max="2.0"
                step="0.05"
                value={currentKanji.scale}
                onChange={(e) => onUpdateKanji({ scale: parseFloat(e.target.value) })}
                className="w-full accent-yellow-400 cursor-pointer"
              />
            </div>
          </div>
        )}

        {/* Bottom Actions */}
        <div className="flex items-center gap-2 pt-3 border-t border-zinc-800 mt-3">
          <button
            onClick={onCopyConfig}
            className="flex-1 flex items-center justify-center gap-1.5 bg-[#E60012] hover:bg-red-700 text-white font-p5Heading text-xs py-1.5 border border-black shadow-[2px_2px_0px_#000]"
          >
            {copiedSuccess ? <Check className="size-3.5 text-green-400" /> : <Copy className="size-3.5" />}
            <span>{copiedSuccess ? 'COPIED TO CLIPBOARD!' : 'COPY TS CODE'}</span>
          </button>

          <button
            onClick={onResetDefaults}
            className="px-2.5 py-1.5 bg-zinc-800 hover:bg-zinc-700 text-zinc-300 font-p5Heading text-xs border border-zinc-700"
            title="Reset to default positions"
          >
            <RotateCcw className="size-3.5" />
          </button>
        </div>
      </div>
    </div>
  )
}
