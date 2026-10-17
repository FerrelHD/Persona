import React from 'react'
import { Move, Copy, Check, RotateCcw } from 'lucide-react'
import type { PhantomCharacter, BubbleConfig, KanjiConfig, FountainConfig } from '@/components/screens/SkillsScreen'

interface PositionCalibratorProps {
  isOpen: boolean
  onClose: () => void
  characterList: PhantomCharacter[]
  calibratingCharId: string
  onSelectCharId: (id: string) => void
  calibratingChar: PhantomCharacter
  onUpdateChar: (updates: Partial<PhantomCharacter>) => void
  calibratorTab: 'char' | 'camera' | 'bubble' | 'kanji' | 'fountain'
  onChangeTab: (tab: 'char' | 'camera' | 'bubble' | 'kanji' | 'fountain') => void
  bubbleList: Record<string, BubbleConfig>
  defaultBubbles: Record<string, BubbleConfig>
  onUpdateBubble: (updates: Partial<BubbleConfig>) => void
  kanjiList: Record<string, KanjiConfig>
  defaultKanji: Record<string, KanjiConfig>
  onUpdateKanji: (updates: Partial<KanjiConfig>) => void
  fountainConfig: FountainConfig
  defaultFountain: FountainConfig
  onUpdateFountain: (updates: Partial<FountainConfig>) => void
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
  fountainConfig,
  onUpdateFountain,
  activeCharId,
  onTogglePreviewCamera,
  onCopyConfig,
  copiedSuccess,
  onResetDefaults,
}) => {
  if (!isOpen) return null

  const currentBubble =
    bubbleList[calibratingCharId] ||
    defaultBubbles[calibratingCharId] ||
    defaultBubbles.makoto ||
    defaultBubbles[Object.keys(defaultBubbles)[0]]

  const currentKanji =
    kanjiList[calibratingChar.id] ||
    defaultKanji[calibratingChar.id] ||
    defaultKanji.makoto ||
    defaultKanji[Object.keys(defaultKanji)[0]]

  return (
    <div className="fixed top-4 right-4 z-[70] flex flex-col items-end animate-in fade-in zoom-in-95 duration-200 select-none">
      <div className="w-[340px] sm:w-[390px] bg-[#000d1a]/95 border-2 border-cyan-400 text-white p-3.5 shadow-[0_0_20px_rgba(22,207,251,0.4)] max-h-[85vh] overflow-y-auto font-sans text-xs backdrop-blur-md">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-cyan-900/60 pb-2 mb-3">
          <div className="flex items-center gap-1.5">
            <Move className="size-4 text-cyan-400" />
            <span className="font-rodin text-sm font-black text-cyan-300 tracking-wider">
              MALL ATRIUM CALIBRATOR
            </span>
          </div>
          <button
            onClick={onClose}
            className="px-2 py-0.5 bg-zinc-800 hover:bg-red-600 text-zinc-300 hover:text-white font-mono text-[10px] rounded transition-colors cursor-pointer"
            title="Close"
          >
            ✕ CLOSE
          </button>
        </div>

        {/* Character Selector Tabs */}
        <div className="grid grid-cols-3 gap-1 mb-2.5">
          {characterList.map((c) => (
            <button
              key={c.id}
              onClick={() => onSelectCharId(c.id)}
              className={`px-2 py-1 text-center font-rodin text-xs uppercase border transition-colors ${
                calibratingCharId === c.id
                  ? 'bg-cyan-400 text-black border-cyan-200 font-black shadow-[0_0_8px_rgba(22,207,251,0.6)]'
                  : 'bg-zinc-900/80 text-zinc-300 border-zinc-700 hover:bg-zinc-800'
              }`}
            >
              {c.codename}
            </button>
          ))}
        </div>

        {/* Selected Character Info with Water Occlusion Badge */}
        <div className="flex items-center justify-between bg-[#001830] px-2.5 py-1.5 border border-cyan-500/30 mb-3 text-[11px] font-mono">
          <span className="text-white font-bold">{calibratingChar.name}</span>
          <div className="flex items-center gap-1.5">
            <span className="text-cyan-400 font-bold">z: {calibratingChar.zIndex}</span>
            <span
              className={`text-[9px] px-1.5 py-0.5 font-bold uppercase rounded ${
                calibratingChar.zIndex < 20
                  ? 'bg-blue-900/90 text-cyan-300 border border-cyan-500/50'
                  : 'bg-emerald-900/90 text-emerald-300 border border-emerald-500/50'
              }`}
            >
              {calibratingChar.zIndex < 20 ? 'Behind Water' : 'Front Plaza'}
            </span>
          </div>
        </div>

        {/* Live Camera & Bubble Preview Toggle */}
        <button
          onClick={onTogglePreviewCamera}
          className={`w-full py-1.5 px-3 mb-2.5 font-rodin text-xs uppercase border-2 flex items-center justify-center gap-2 cursor-pointer transition-colors ${
            activeCharId === calibratingChar.id
              ? 'bg-red-600 text-white border-red-400 hover:bg-red-700 font-bold shadow-[0_0_10px_rgba(239,68,68,0.5)]'
              : 'bg-cyan-500 text-black border-cyan-300 hover:bg-cyan-400 font-black shadow-[0_0_10px_rgba(22,207,251,0.4)]'
          }`}
        >
          <span>{activeCharId === calibratingChar.id ? '✕ RETURN TO ROOM' : '👁️ PREVIEW ZOOM & CARD'}</span>
        </button>

        {/* Calibrator Mode Sub-Tabs */}
        <div className="grid grid-cols-5 gap-1 mb-3 bg-zinc-950 p-1 border border-zinc-800">
          <button
            onClick={() => onChangeTab('char')}
            className={`py-1 text-center font-rodin text-[9px] sm:text-[10px] uppercase transition-colors ${
              calibratorTab === 'char' ? 'bg-cyan-400 text-black font-black' : 'text-zinc-400 hover:text-white'
            }`}
          >
            1.CHAR
          </button>
          <button
            onClick={() => onChangeTab('camera')}
            className={`py-1 text-center font-rodin text-[9px] sm:text-[10px] uppercase transition-colors ${
              calibratorTab === 'camera' ? 'bg-cyan-400 text-black font-black' : 'text-zinc-400 hover:text-white'
            }`}
          >
            2.CAM
          </button>
          <button
            onClick={() => onChangeTab('bubble')}
            className={`py-1 text-center font-rodin text-[9px] sm:text-[10px] uppercase transition-colors ${
              calibratorTab === 'bubble' ? 'bg-cyan-400 text-black font-black' : 'text-zinc-400 hover:text-white'
            }`}
          >
            3.CARD
          </button>
          <button
            onClick={() => onChangeTab('kanji')}
            className={`py-1 text-center font-rodin text-[9px] sm:text-[10px] uppercase transition-colors ${
              calibratorTab === 'kanji' ? 'bg-cyan-400 text-black font-black' : 'text-zinc-400 hover:text-white'
            }`}
          >
            4.KANJI
          </button>
          <button
            onClick={() => onChangeTab('fountain')}
            className={`py-1 text-center font-rodin text-[9px] sm:text-[10px] uppercase transition-colors ${
              calibratorTab === 'fountain' ? 'bg-cyan-400 text-black font-black' : 'text-zinc-400 hover:text-white'
            }`}
          >
            5.WATER
          </button>
        </div>

        {/* Tab 1: Character Position & Size */}
        {calibratorTab === 'char' && (
          <div className="space-y-2.5 font-mono text-[11px]">
            {/* Horizontal (Offset X px) */}
            <div>
              <div className="flex justify-between text-zinc-300 mb-1">
                <span>Horizontal (Offset X):</span>
                <span className="text-cyan-400 font-bold">{calibratingChar.tx}px</span>
              </div>
              <input
                type="range"
                min="-960"
                max="960"
                step="2"
                value={calibratingChar.tx}
                onChange={(e) => onUpdateChar({ tx: parseInt(e.target.value, 10) })}
                className="w-full accent-cyan-400 cursor-pointer"
              />
            </div>

            {/* Vertical (Offset Y px) */}
            <div>
              <div className="flex justify-between text-zinc-300 mb-1">
                <span>Vertical (Offset Y):</span>
                <span className="text-cyan-400 font-bold">{calibratingChar.ty}px</span>
              </div>
              <input
                type="range"
                min="-540"
                max="540"
                step="2"
                value={calibratingChar.ty}
                onChange={(e) => onUpdateChar({ ty: parseInt(e.target.value, 10) })}
                className="w-full accent-cyan-400 cursor-pointer"
              />
            </div>

            {/* Width (px Size) */}
            <div>
              <div className="flex justify-between text-zinc-300 mb-1">
                <span>Size (Width):</span>
                <span className="text-cyan-400 font-bold">{calibratingChar.width}px</span>
              </div>
              <input
                type="range"
                min="60"
                max="600"
                step="2"
                value={calibratingChar.width}
                onChange={(e) => onUpdateChar({ width: parseInt(e.target.value, 10) })}
                className="w-full accent-cyan-400 cursor-pointer"
              />
            </div>

            {/* Z-Index with Water Occlusion rule */}
            <div className="flex items-center justify-between pt-1">
              <span className="text-zinc-300">Z-Index (Water is 20):</span>
              <div className="flex items-center gap-1">
                <button
                  onClick={() => onUpdateChar({ zIndex: Math.max(1, calibratingChar.zIndex - 1) })}
                  className="px-2 py-0.5 bg-zinc-800 hover:bg-zinc-700 border border-zinc-600 rounded font-bold"
                >
                  -
                </button>
                <span className="w-8 text-center text-cyan-400 font-bold">{calibratingChar.zIndex}</span>
                <button
                  onClick={() => onUpdateChar({ zIndex: calibratingChar.zIndex + 1 })}
                  className="px-2 py-0.5 bg-zinc-800 hover:bg-zinc-700 border border-zinc-600 rounded font-bold"
                >
                  +
                </button>
              </div>
            </div>

            {/* Shadow Controls */}
            <div className="grid grid-cols-2 gap-2 pt-1 border-t border-zinc-800">
              <div>
                <span className="text-zinc-400 text-[10px]">Shadow W: {calibratingChar.shadowWidth}%</span>
                <input
                  type="range"
                  min="30"
                  max="120"
                  value={calibratingChar.shadowWidth}
                  onChange={(e) => onUpdateChar({ shadowWidth: parseInt(e.target.value, 10) })}
                  className="w-full accent-cyan-400 cursor-pointer"
                />
              </div>
              <div>
                <span className="text-zinc-400 text-[10px]">Shadow H: {calibratingChar.shadowHeight}px</span>
                <input
                  type="range"
                  min="4"
                  max="30"
                  value={calibratingChar.shadowHeight}
                  onChange={(e) => onUpdateChar({ shadowHeight: parseInt(e.target.value, 10) })}
                  className="w-full accent-cyan-400 cursor-pointer"
                />
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: Camera Zoom & Framing */}
        {calibratorTab === 'camera' && (
          <div className="space-y-2.5 font-mono text-[11px]">
            <div>
              <div className="flex justify-between text-zinc-300 mb-1">
                <span>Zoom Scale:</span>
                <span className="text-cyan-400 font-bold">{calibratingChar.camera.scale}x</span>
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
                className="w-full accent-cyan-400 cursor-pointer"
              />
            </div>

            <div>
              <div className="flex justify-between text-zinc-300 mb-1">
                <span>Camera Focus X (%):</span>
                <span className="text-cyan-400 font-bold">{calibratingChar.camera.originX}%</span>
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
                className="w-full accent-cyan-400 cursor-pointer"
              />
            </div>

            <div>
              <div className="flex justify-between text-zinc-300 mb-1">
                <span>Camera Focus Y (%):</span>
                <span className="text-cyan-400 font-bold">{calibratingChar.camera.originY}%</span>
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
                className="w-full accent-cyan-400 cursor-pointer"
              />
            </div>
          </div>
        )}

        {/* Tab 3: P3R Dialogue Card Frame & Position */}
        {calibratorTab === 'bubble' && (
          <div className="space-y-3 font-mono text-[11px]">
            <div className="bg-[#001830] p-2.5 border border-cyan-500/30 space-y-2">
              <span className="text-cyan-400 font-bold block border-b border-cyan-800 pb-1">
                💬 DIALOGUE CARD POSITION
              </span>

              {/* Anchor Side */}
              <div className="flex items-center justify-between">
                <span className="text-zinc-300">Anchor Side:</span>
                <div className="flex items-center gap-1">
                  <button
                    onClick={() => onUpdateBubble({ side: 'left' })}
                    className={`px-2 py-0.5 text-xs uppercase border ${
                      currentBubble.side === 'left'
                        ? 'bg-cyan-400 text-black border-cyan-200 font-bold'
                        : 'bg-zinc-800 text-zinc-300 border-zinc-700'
                    }`}
                  >
                    LEFT
                  </button>
                  <button
                    onClick={() => onUpdateBubble({ side: 'right' })}
                    className={`px-2 py-0.5 text-xs uppercase border ${
                      currentBubble.side === 'right'
                        ? 'bg-cyan-400 text-black border-cyan-200 font-bold'
                        : 'bg-zinc-800 text-zinc-300 border-zinc-700'
                    }`}
                  >
                    RIGHT
                  </button>
                </div>
              </div>

              {/* Horizontal Position */}
              <div>
                <div className="flex justify-between text-zinc-300 mb-1">
                  <span>Horizontal ({currentBubble.side === 'right' ? 'Left' : 'Right'} %):</span>
                  <span className="text-cyan-400 font-bold">{currentBubble.posX}%</span>
                </div>
                <input
                  type="range"
                  min="5"
                  max="85"
                  step="1"
                  value={currentBubble.posX}
                  onChange={(e) => onUpdateBubble({ posX: parseInt(e.target.value, 10) })}
                  className="w-full accent-cyan-400 cursor-pointer"
                />
              </div>

              {/* Vertical Position */}
              <div>
                <div className="flex justify-between text-zinc-300 mb-1">
                  <span>Vertical (Top %):</span>
                  <span className="text-cyan-400 font-bold">{currentBubble.top}%</span>
                </div>
                <input
                  type="range"
                  min="2"
                  max="75"
                  step="1"
                  value={currentBubble.top}
                  onChange={(e) => onUpdateBubble({ top: parseInt(e.target.value, 10) })}
                  className="w-full accent-cyan-400 cursor-pointer"
                />
              </div>

              {/* Card Width */}
              <div>
                <div className="flex justify-between text-zinc-300 mb-1">
                  <span>Card Width:</span>
                  <span className="text-cyan-400 font-bold">{currentBubble.width || 520}px</span>
                </div>
                <input
                  type="range"
                  min="360"
                  max="680"
                  step="5"
                  value={currentBubble.width || 520}
                  onChange={(e) => onUpdateBubble({ width: parseInt(e.target.value, 10) })}
                  className="w-full accent-cyan-400 cursor-pointer"
                />
              </div>

              {/* Card Rotation */}
              <div>
                <div className="flex justify-between text-zinc-300 mb-1">
                  <span>Rotation (°):</span>
                  <span className="text-cyan-400 font-bold">{currentBubble.bubbleRotate || 0}°</span>
                </div>
                <input
                  type="range"
                  min="-20"
                  max="20"
                  step="1"
                  value={currentBubble.bubbleRotate || 0}
                  onChange={(e) => onUpdateBubble({ bubbleRotate: parseInt(e.target.value, 10) })}
                  className="w-full accent-cyan-400 cursor-pointer"
                />
              </div>
            </div>
          </div>
        )}

        {/* Tab 4: Giant Kanji Watermark */}
        {calibratorTab === 'kanji' && (
          <div className="space-y-3 font-mono text-[11px]">
            <div>
              <div className="flex justify-between text-zinc-300 mb-0.5">
                <span>OFFSET X (%):</span>
                <span className="text-cyan-400 font-bold">{currentKanji.x}%</span>
              </div>
              <input
                type="range"
                min="-40"
                max="40"
                step="1"
                value={currentKanji.x}
                onChange={(e) => onUpdateKanji({ x: parseInt(e.target.value, 10) })}
                className="w-full accent-cyan-400 cursor-pointer"
              />
            </div>

            <div>
              <div className="flex justify-between text-zinc-300 mb-0.5">
                <span>OFFSET Y (%):</span>
                <span className="text-cyan-400 font-bold">{currentKanji.y}%</span>
              </div>
              <input
                type="range"
                min="-40"
                max="40"
                step="1"
                value={currentKanji.y}
                onChange={(e) => onUpdateKanji({ y: parseInt(e.target.value, 10) })}
                className="w-full accent-cyan-400 cursor-pointer"
              />
            </div>

            <div>
              <div className="flex justify-between text-zinc-300 mb-0.5">
                <span>ROTATION:</span>
                <span className="text-cyan-400 font-bold">{currentKanji.rotate}°</span>
              </div>
              <input
                type="range"
                min="-30"
                max="30"
                step="1"
                value={currentKanji.rotate}
                onChange={(e) => onUpdateKanji({ rotate: parseInt(e.target.value, 10) })}
                className="w-full accent-cyan-400 cursor-pointer"
              />
            </div>

            <div>
              <div className="flex justify-between text-zinc-300 mb-0.5">
                <span>OPACITY:</span>
                <span className="text-cyan-400 font-bold">{Math.round(currentKanji.opacity * 100)}%</span>
              </div>
              <input
                type="range"
                min="0.05"
                max="1.0"
                step="0.01"
                value={currentKanji.opacity}
                onChange={(e) => onUpdateKanji({ opacity: parseFloat(e.target.value) })}
                className="w-full accent-cyan-400 cursor-pointer"
              />
            </div>

            <div>
              <div className="flex justify-between text-zinc-300 mb-0.5">
                <span>SCALE:</span>
                <span className="text-cyan-400 font-bold">{currentKanji.scale}x</span>
              </div>
              <input
                type="range"
                min="0.5"
                max="2.0"
                step="0.05"
                value={currentKanji.scale}
                onChange={(e) => onUpdateKanji({ scale: parseFloat(e.target.value) })}
                className="w-full accent-cyan-400 cursor-pointer"
              />
            </div>
          </div>
        )}

        {/* Tab 5: Fountain Occlusion Layer Controls */}
        {calibratorTab === 'fountain' && (
          <div className="space-y-3 font-mono text-[11px]">
            <div className="bg-[#001830] p-2.5 border border-cyan-500/40 space-y-3">
              <div className="flex items-center justify-between border-b border-cyan-800 pb-1">
                <span className="text-cyan-400 font-bold block text-xs">
                  🌊 FOUNTAIN WATER CALIBRATION
                </span>
                <button
                  type="button"
                  onClick={() => onUpdateFountain({ tx: 0, ty: 0, scale: 1, scaleX: 1, scaleY: 1, opacity: 1 })}
                  className="px-2 py-0.5 bg-zinc-800 hover:bg-zinc-700 text-zinc-300 font-mono text-[9px] border border-zinc-600 rounded cursor-pointer"
                  title="Reset fountain to 0,0"
                >
                  ↺ Reset 0,0
                </button>
              </div>

              {/* Helpful Hint */}
              <div className="p-2 bg-cyan-950/60 border border-cyan-400/40 text-[10px] text-cyan-200 space-y-1">
                <div className="font-bold text-cyan-300 flex items-center gap-1">
                  <span>🖱️ DRAG & DROP ENABLED</span>
                </div>
                <p>Klik & drag air mancur langsung di layar dengan mouse! Atau gunakan <strong>Arrow Keys</strong> di keyboard (Shift + Arrow untuk lompat 10px).</p>
              </div>

              {/* Fountain Offset X */}
              <div>
                <div className="flex justify-between items-center text-zinc-300 mb-1">
                  <span>OFFSET X (Horizontal):</span>
                  <span className="text-cyan-400 font-bold font-mono text-xs">{fountainConfig.tx}px</span>
                </div>
                <input
                  type="range"
                  min="-600"
                  max="600"
                  step="1"
                  value={fountainConfig.tx}
                  onChange={(e) => onUpdateFountain({ tx: parseInt(e.target.value, 10) })}
                  className="w-full accent-cyan-400 cursor-pointer mb-1"
                />
                <div className="grid grid-cols-4 gap-1">
                  <button
                    type="button"
                    onClick={() => onUpdateFountain({ tx: fountainConfig.tx - 10 })}
                    className="py-0.5 bg-zinc-800 hover:bg-cyan-900 text-zinc-200 text-[10px] font-mono border border-zinc-700 rounded"
                  >
                    -10px
                  </button>
                  <button
                    type="button"
                    onClick={() => onUpdateFountain({ tx: fountainConfig.tx - 1 })}
                    className="py-0.5 bg-zinc-800 hover:bg-cyan-900 text-zinc-200 text-[10px] font-mono border border-zinc-700 rounded"
                  >
                    -1px
                  </button>
                  <button
                    type="button"
                    onClick={() => onUpdateFountain({ tx: fountainConfig.tx + 1 })}
                    className="py-0.5 bg-zinc-800 hover:bg-cyan-900 text-zinc-200 text-[10px] font-mono border border-zinc-700 rounded"
                  >
                    +1px
                  </button>
                  <button
                    type="button"
                    onClick={() => onUpdateFountain({ tx: fountainConfig.tx + 10 })}
                    className="py-0.5 bg-zinc-800 hover:bg-cyan-900 text-zinc-200 text-[10px] font-mono border border-zinc-700 rounded"
                  >
                    +10px
                  </button>
                </div>
              </div>

              {/* Fountain Offset Y */}
              <div>
                <div className="flex justify-between items-center text-zinc-300 mb-1">
                  <span>OFFSET Y (Vertical):</span>
                  <span className="text-cyan-400 font-bold font-mono text-xs">{fountainConfig.ty}px</span>
                </div>
                <input
                  type="range"
                  min="-400"
                  max="400"
                  step="1"
                  value={fountainConfig.ty}
                  onChange={(e) => onUpdateFountain({ ty: parseInt(e.target.value, 10) })}
                  className="w-full accent-cyan-400 cursor-pointer mb-1"
                />
                <div className="grid grid-cols-4 gap-1">
                  <button
                    type="button"
                    onClick={() => onUpdateFountain({ ty: fountainConfig.ty - 10 })}
                    className="py-0.5 bg-zinc-800 hover:bg-cyan-900 text-zinc-200 text-[10px] font-mono border border-zinc-700 rounded"
                  >
                    -10px
                  </button>
                  <button
                    type="button"
                    onClick={() => onUpdateFountain({ ty: fountainConfig.ty - 1 })}
                    className="py-0.5 bg-zinc-800 hover:bg-cyan-900 text-zinc-200 text-[10px] font-mono border border-zinc-700 rounded"
                  >
                    -1px
                  </button>
                  <button
                    type="button"
                    onClick={() => onUpdateFountain({ ty: fountainConfig.ty + 1 })}
                    className="py-0.5 bg-zinc-800 hover:bg-cyan-900 text-zinc-200 text-[10px] font-mono border border-zinc-700 rounded"
                  >
                    +1px
                  </button>
                  <button
                    type="button"
                    onClick={() => onUpdateFountain({ ty: fountainConfig.ty + 10 })}
                    className="py-0.5 bg-zinc-800 hover:bg-cyan-900 text-zinc-200 text-[10px] font-mono border border-zinc-700 rounded"
                  >
                    +10px
                  </button>
                </div>
              </div>

              {/* Fountain Universal Scale */}
              <div>
                <div className="flex justify-between items-center text-zinc-300 mb-1">
                  <span>SCALE:</span>
                  <span className="text-cyan-400 font-bold font-mono text-xs">{fountainConfig.scale}x</span>
                </div>
                <input
                  type="range"
                  min="0.5"
                  max="2.0"
                  step="0.005"
                  value={fountainConfig.scale}
                  onChange={(e) => onUpdateFountain({ scale: parseFloat(e.target.value) })}
                  className="w-full accent-cyan-400 cursor-pointer mb-1"
                />
                <div className="grid grid-cols-4 gap-1">
                  <button
                    type="button"
                    onClick={() => onUpdateFountain({ scale: Math.max(0.5, +(fountainConfig.scale - 0.05).toFixed(3)) })}
                    className="py-0.5 bg-zinc-800 hover:bg-cyan-900 text-zinc-200 text-[10px] font-mono border border-zinc-700 rounded"
                  >
                    -0.05
                  </button>
                  <button
                    type="button"
                    onClick={() => onUpdateFountain({ scale: Math.max(0.5, +(fountainConfig.scale - 0.01).toFixed(3)) })}
                    className="py-0.5 bg-zinc-800 hover:bg-cyan-900 text-zinc-200 text-[10px] font-mono border border-zinc-700 rounded"
                  >
                    -0.01
                  </button>
                  <button
                    type="button"
                    onClick={() => onUpdateFountain({ scale: Math.min(2.0, +(fountainConfig.scale + 0.01).toFixed(3)) })}
                    className="py-0.5 bg-zinc-800 hover:bg-cyan-900 text-zinc-200 text-[10px] font-mono border border-zinc-700 rounded"
                  >
                    +0.01
                  </button>
                  <button
                    type="button"
                    onClick={() => onUpdateFountain({ scale: Math.min(2.0, +(fountainConfig.scale + 0.05).toFixed(3)) })}
                    className="py-0.5 bg-zinc-800 hover:bg-cyan-900 text-zinc-200 text-[10px] font-mono border border-zinc-700 rounded"
                  >
                    +0.05
                  </button>
                </div>
              </div>

              {/* Stretch Controls: Scale X and Scale Y */}
              <div className="grid grid-cols-2 gap-2 pt-1 border-t border-cyan-900/40">
                <div>
                  <div className="flex justify-between text-zinc-400 text-[10px] mb-0.5">
                    <span>WIDTH (ScaleX):</span>
                    <span className="text-cyan-300 font-mono">{(fountainConfig.scaleX ?? 1).toFixed(2)}x</span>
                  </div>
                  <input
                    type="range"
                    min="0.7"
                    max="1.3"
                    step="0.005"
                    value={fountainConfig.scaleX ?? 1}
                    onChange={(e) => onUpdateFountain({ scaleX: parseFloat(e.target.value) })}
                    className="w-full accent-cyan-400 cursor-pointer"
                  />
                </div>
                <div>
                  <div className="flex justify-between text-zinc-400 text-[10px] mb-0.5">
                    <span>HEIGHT (ScaleY):</span>
                    <span className="text-cyan-300 font-mono">{(fountainConfig.scaleY ?? 1).toFixed(2)}x</span>
                  </div>
                  <input
                    type="range"
                    min="0.7"
                    max="1.3"
                    step="0.005"
                    value={fountainConfig.scaleY ?? 1}
                    onChange={(e) => onUpdateFountain({ scaleY: parseFloat(e.target.value) })}
                    className="w-full accent-cyan-400 cursor-pointer"
                  />
                </div>
              </div>

              {/* Fountain Opacity */}
              <div>
                <div className="flex justify-between items-center text-zinc-300 mb-1">
                  <span>OPACITY (Transparansi untuk Penyetelan):</span>
                  <span className="text-cyan-400 font-bold font-mono text-xs">{Math.round(fountainConfig.opacity * 100)}%</span>
                </div>
                <input
                  type="range"
                  min="0.1"
                  max="1.0"
                  step="0.05"
                  value={fountainConfig.opacity}
                  onChange={(e) => onUpdateFountain({ opacity: parseFloat(e.target.value) })}
                  className="w-full accent-cyan-400 cursor-pointer mb-1"
                />
                <div className="grid grid-cols-4 gap-1">
                  <button
                    type="button"
                    onClick={() => onUpdateFountain({ opacity: 0.3 })}
                    className="py-0.5 bg-zinc-800 hover:bg-cyan-900 text-zinc-300 text-[9px] border border-zinc-700 rounded"
                  >
                    30% (Ghost)
                  </button>
                  <button
                    type="button"
                    onClick={() => onUpdateFountain({ opacity: 0.5 })}
                    className="py-0.5 bg-zinc-800 hover:bg-cyan-900 text-zinc-300 text-[9px] border border-zinc-700 rounded"
                  >
                    50% (Blend)
                  </button>
                  <button
                    type="button"
                    onClick={() => onUpdateFountain({ opacity: 0.75 })}
                    className="py-0.5 bg-zinc-800 hover:bg-cyan-900 text-zinc-300 text-[9px] border border-zinc-700 rounded"
                  >
                    75%
                  </button>
                  <button
                    type="button"
                    onClick={() => onUpdateFountain({ opacity: 1.0 })}
                    className="py-0.5 bg-zinc-800 hover:bg-cyan-900 text-cyan-300 font-bold text-[9px] border border-cyan-700 rounded"
                  >
                    100% (Solid)
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Bottom Actions */}
        <div className="flex items-center gap-2 pt-3 border-t border-cyan-900/60 mt-3">
          <button
            onClick={onCopyConfig}
            className="flex-1 flex items-center justify-center gap-1.5 bg-cyan-500 hover:bg-cyan-400 text-black font-rodin font-black text-xs py-1.5 border border-cyan-300 shadow-[0_0_10px_rgba(22,207,251,0.5)] transition-colors"
          >
            {copiedSuccess ? <Check className="size-3.5 text-black" /> : <Copy className="size-3.5" />}
            <span>{copiedSuccess ? 'COPIED TO CLIPBOARD!' : 'COPY TS CODE'}</span>
          </button>

          <button
            onClick={onResetDefaults}
            className="px-2.5 py-1.5 bg-zinc-800 hover:bg-zinc-700 text-zinc-300 font-rodin text-xs border border-zinc-700 transition-colors"
            title="Reset to default positions"
          >
            <RotateCcw className="size-3.5" />
          </button>
        </div>
      </div>
    </div>
  )
}
