import React from 'react'
import { Move, Copy, Check, RotateCcw, Sliders, X } from 'lucide-react'

export interface TVTRONLayoutConfig {
  top: number
  left: number
  scale: number
  rotate: number
  maxWidth: number
}

interface TVTRONCalibratorProps {
  isOpen: boolean
  onClose: () => void
  config: TVTRONLayoutConfig
  defaultConfig: TVTRONLayoutConfig
  onChange: (updates: Partial<TVTRONLayoutConfig>) => void
  onReset: () => void
  onCopy: () => void
  copiedSuccess: boolean
}

export const TVTRONCalibrator: React.FC<TVTRONCalibratorProps> = ({
  isOpen,
  onClose,
  config,
  defaultConfig,
  onChange,
  onReset,
  onCopy,
  copiedSuccess,
}) => {
  if (!isOpen) return null

  return (
    <div className="fixed top-4 right-4 z-[70] flex flex-col items-end animate-in fade-in zoom-in-95 duration-200 select-none">
      <div className="w-[320px] sm:w-[350px] bg-black/95 border-2 border-emerald-400 text-white p-3.5 shadow-[6px_6px_0px_#000] max-h-[85vh] overflow-y-auto font-sans text-xs">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-zinc-800 pb-2 mb-3">
          <div className="flex items-center gap-1.5">
            <Sliders className="size-4 text-emerald-400" />
            <span className="font-p5Heading text-sm font-bold text-emerald-400 tracking-wider">
              TVTRON POSITION CALIBRATOR
            </span>
          </div>
          <button
            onClick={onClose}
            className="p-1 text-zinc-400 hover:text-white hover:bg-zinc-800 rounded transition-colors cursor-pointer"
            title="Close (Esc)"
          >
            <X className="size-4" />
          </button>
        </div>

        <p className="text-[11px] text-zinc-400 mb-3 leading-tight">
          Adjust the Shibuya TVTRON position, scale, and angle freely in real-time. Settings are auto-saved.
        </p>

        {/* Sliders & Controls */}
        <div className="space-y-3 font-mono text-[11px]">
          {/* Position Y (Top) */}
          <div className="bg-zinc-900/90 p-2 border border-zinc-800 space-y-1">
            <div className="flex justify-between items-center text-zinc-300">
              <span className="font-bold text-emerald-400">Position Y (Top):</span>
              <span className="text-white font-bold">{config.top}px</span>
            </div>
            <div className="flex items-center gap-1.5">
              <button
                type="button"
                onClick={() => onChange({ top: config.top - 5 })}
                className="px-1.5 py-0.5 bg-zinc-800 hover:bg-zinc-700 text-zinc-200 rounded text-[10px]"
              >
                -5
              </button>
              <button
                type="button"
                onClick={() => onChange({ top: config.top - 1 })}
                className="px-1.5 py-0.5 bg-zinc-800 hover:bg-zinc-700 text-zinc-200 rounded text-[10px]"
              >
                -1
              </button>
              <input
                type="range"
                min={0}
                max={350}
                step={1}
                value={config.top}
                onChange={(e) => onChange({ top: Number(e.target.value) })}
                className="flex-1 accent-emerald-400 h-1.5 bg-zinc-700 rounded-lg cursor-pointer"
              />
              <button
                type="button"
                onClick={() => onChange({ top: config.top + 1 })}
                className="px-1.5 py-0.5 bg-zinc-800 hover:bg-zinc-700 text-zinc-200 rounded text-[10px]"
              >
                +1
              </button>
              <button
                type="button"
                onClick={() => onChange({ top: config.top + 5 })}
                className="px-1.5 py-0.5 bg-zinc-800 hover:bg-zinc-700 text-zinc-200 rounded text-[10px]"
              >
                +5
              </button>
            </div>
          </div>

          {/* Position X (Left) */}
          <div className="bg-zinc-900/90 p-2 border border-zinc-800 space-y-1">
            <div className="flex justify-between items-center text-zinc-300">
              <span className="font-bold text-emerald-400">Position X (Left):</span>
              <span className="text-white font-bold">{config.left}px</span>
            </div>
            <div className="flex items-center gap-1.5">
              <button
                type="button"
                onClick={() => onChange({ left: Math.max(0, config.left - 5) })}
                className="px-1.5 py-0.5 bg-zinc-800 hover:bg-zinc-700 text-zinc-200 rounded text-[10px]"
              >
                -5
              </button>
              <button
                type="button"
                onClick={() => onChange({ left: Math.max(0, config.left - 1) })}
                className="px-1.5 py-0.5 bg-zinc-800 hover:bg-zinc-700 text-zinc-200 rounded text-[10px]"
              >
                -1
              </button>
              <input
                type="range"
                min={0}
                max={450}
                step={1}
                value={config.left}
                onChange={(e) => onChange({ left: Number(e.target.value) })}
                className="flex-1 accent-emerald-400 h-1.5 bg-zinc-700 rounded-lg cursor-pointer"
              />
              <button
                type="button"
                onClick={() => onChange({ left: config.left + 1 })}
                className="px-1.5 py-0.5 bg-zinc-800 hover:bg-zinc-700 text-zinc-200 rounded text-[10px]"
              >
                +1
              </button>
              <button
                type="button"
                onClick={() => onChange({ left: config.left + 5 })}
                className="px-1.5 py-0.5 bg-zinc-800 hover:bg-zinc-700 text-zinc-200 rounded text-[10px]"
              >
                +5
              </button>
            </div>
          </div>

          {/* Scale Multiplier */}
          <div className="bg-zinc-900/90 p-2 border border-zinc-800 space-y-1">
            <div className="flex justify-between items-center text-zinc-300">
              <span className="font-bold text-emerald-400">Scale:</span>
              <span className="text-white font-bold">{config.scale.toFixed(2)}x</span>
            </div>
            <div className="flex items-center gap-1.5">
              <button
                type="button"
                onClick={() => onChange({ scale: Math.max(0.4, Number((config.scale - 0.05).toFixed(2))) })}
                className="px-1.5 py-0.5 bg-zinc-800 hover:bg-zinc-700 text-zinc-200 rounded text-[10px]"
              >
                -0.05
              </button>
              <input
                type="range"
                min={0.5}
                max={1.5}
                step={0.01}
                value={config.scale}
                onChange={(e) => onChange({ scale: Number(e.target.value) })}
                className="flex-1 accent-emerald-400 h-1.5 bg-zinc-700 rounded-lg cursor-pointer"
              />
              <button
                type="button"
                onClick={() => onChange({ scale: Math.min(1.5, Number((config.scale + 0.05).toFixed(2))) })}
                className="px-1.5 py-0.5 bg-zinc-800 hover:bg-zinc-700 text-zinc-200 rounded text-[10px]"
              >
                +0.05
              </button>
            </div>
          </div>

          {/* Rotate Angle */}
          <div className="bg-zinc-900/90 p-2 border border-zinc-800 space-y-1">
            <div className="flex justify-between items-center text-zinc-300">
              <span className="font-bold text-emerald-400">Rotation Angle:</span>
              <span className="text-white font-bold">{config.rotate}°</span>
            </div>
            <div className="flex items-center gap-1.5">
              <button
                type="button"
                onClick={() => onChange({ rotate: config.rotate - 0.5 })}
                className="px-1.5 py-0.5 bg-zinc-800 hover:bg-zinc-700 text-zinc-200 rounded text-[10px]"
              >
                -0.5°
              </button>
              <input
                type="range"
                min={-10}
                max={10}
                step={0.5}
                value={config.rotate}
                onChange={(e) => onChange({ rotate: Number(e.target.value) })}
                className="flex-1 accent-emerald-400 h-1.5 bg-zinc-700 rounded-lg cursor-pointer"
              />
              <button
                type="button"
                onClick={() => onChange({ rotate: config.rotate + 0.5 })}
                className="px-1.5 py-0.5 bg-zinc-800 hover:bg-zinc-700 text-zinc-200 rounded text-[10px]"
              >
                +0.5°
              </button>
            </div>
          </div>

          {/* Max Width */}
          <div className="bg-zinc-900/90 p-2 border border-zinc-800 space-y-1">
            <div className="flex justify-between items-center text-zinc-300">
              <span className="font-bold text-emerald-400">Max Width:</span>
              <span className="text-white font-bold">{config.maxWidth}px</span>
            </div>
            <div className="flex items-center gap-1.5">
              <button
                type="button"
                onClick={() => onChange({ maxWidth: config.maxWidth - 10 })}
                className="px-1.5 py-0.5 bg-zinc-800 hover:bg-zinc-700 text-zinc-200 rounded text-[10px]"
              >
                -10
              </button>
              <input
                type="range"
                min={500}
                max={1300}
                step={10}
                value={config.maxWidth}
                onChange={(e) => onChange({ maxWidth: Number(e.target.value) })}
                className="flex-1 accent-emerald-400 h-1.5 bg-zinc-700 rounded-lg cursor-pointer"
              />
              <button
                type="button"
                onClick={() => onChange({ maxWidth: config.maxWidth + 10 })}
                className="px-1.5 py-0.5 bg-zinc-800 hover:bg-zinc-700 text-zinc-200 rounded text-[10px]"
              >
                +10
              </button>
            </div>
          </div>
        </div>

        {/* Action Buttons: Copy & Reset */}
        <div className="mt-4 pt-3 border-t border-zinc-800 flex items-center gap-2">
          <button
            type="button"
            onClick={onCopy}
            className={`flex-1 py-1.5 px-2 font-p5Heading text-xs uppercase -skew-x-3 border flex items-center justify-center gap-1.5 transition-all cursor-pointer font-bold ${
              copiedSuccess
                ? 'bg-emerald-500 text-black border-white shadow-[2px_2px_0px_#000]'
                : 'bg-emerald-600 hover:bg-emerald-500 text-black border-black shadow-[2px_2px_0px_#000]'
            }`}
          >
            {copiedSuccess ? (
              <>
                <Check className="size-3.5 stroke-[3]" />
                <span>COPIED!</span>
              </>
            ) : (
              <>
                <Copy className="size-3.5" />
                <span>COPY CONFIG</span>
              </>
            )}
          </button>

          <button
            type="button"
            onClick={onReset}
            className="py-1.5 px-2.5 bg-zinc-800 hover:bg-zinc-700 text-zinc-300 hover:text-white font-mono text-[10px] border border-zinc-700 rounded flex items-center gap-1 transition-colors cursor-pointer"
            title="Reset to Defaults"
          >
            <RotateCcw className="size-3" />
            <span>RESET</span>
          </button>
        </div>
      </div>
    </div>
  )
}
