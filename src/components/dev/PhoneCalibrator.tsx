import React from 'react'
import { Move, Copy, Check, RotateCcw, Smartphone, X } from 'lucide-react'

export interface PhoneLayoutConfig {
  translateX: number // in %, e.g. -10
  translateY: number // in px, e.g. 72
  scale: number      // multiplier, e.g. 1.0
  rotate: number     // in degrees, e.g. 0
  heightVh: number   // in vh, e.g. 90
}

export const DEFAULT_PHONE_LAYOUT: PhoneLayoutConfig = {
  translateX: -10,
  translateY: 72,
  scale: 1.0,
  rotate: 0,
  heightVh: 90,
}

interface PhoneCalibratorProps {
  isOpen: boolean
  onClose: () => void
  config: PhoneLayoutConfig
  defaultConfig: PhoneLayoutConfig
  onChange: (updates: Partial<PhoneLayoutConfig>) => void
  onReset: () => void
  onCopy: () => void
  copiedSuccess: boolean
}

export const PhoneCalibrator: React.FC<PhoneCalibratorProps> = ({
  isOpen,
  onClose,
  config,
  defaultConfig: _defaultConfig,
  onChange,
  onReset,
  onCopy,
  copiedSuccess,
}) => {
  if (!isOpen) return null

  return (
    <div className="fixed top-4 right-4 z-[70] flex flex-col items-end animate-in fade-in zoom-in-95 duration-200 select-none">
      <div className="w-[320px] sm:w-[360px] bg-black/95 border-2 border-p5-crimson text-white p-3.5 shadow-[6px_6px_0px_#000] max-h-[85vh] overflow-y-auto font-sans text-xs">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-zinc-800 pb-2 mb-3">
          <div className="flex items-center gap-1.5">
            <Smartphone className="size-4 text-p5-crimson" />
            <span className="font-p5Heading text-sm font-bold text-p5-crimson tracking-wider">
              PHONE & HAND CALIBRATOR
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

        <p className="text-[11px] text-zinc-400 mb-3 leading-tight font-p5Body">
          Geser posisi tangan & smartphone Persona 5 secara real-time. Konfigurasi otomatis tersimpan di LocalStorage.
        </p>

        {/* Sliders & Controls */}
        <div className="space-y-3 font-mono text-[11px]">
          {/* Position X (TranslateX %) */}
          <div className="bg-zinc-900/90 p-2 border border-zinc-800 space-y-1">
            <div className="flex justify-between items-center text-zinc-300">
              <span className="font-bold text-p5-crimson flex items-center gap-1">
                <Move className="size-3" /> Position X (Horizontal):
              </span>
              <span className="text-white font-bold">{config.translateX}%</span>
            </div>
            <div className="flex items-center gap-1.5">
              <button
                type="button"
                onClick={() => onChange({ translateX: Number((config.translateX - 2).toFixed(1)) })}
                className="px-1.5 py-0.5 bg-zinc-800 hover:bg-zinc-700 text-zinc-200 rounded text-[10px]"
              >
                -2%
              </button>
              <button
                type="button"
                onClick={() => onChange({ translateX: Number((config.translateX - 0.5).toFixed(1)) })}
                className="px-1.5 py-0.5 bg-zinc-800 hover:bg-zinc-700 text-zinc-200 rounded text-[10px]"
              >
                -0.5%
              </button>
              <input
                type="range"
                min={-40}
                max={25}
                step={0.5}
                value={config.translateX}
                onChange={(e) => onChange({ translateX: Number(e.target.value) })}
                className="flex-1 accent-[#E60012] h-1.5 bg-zinc-700 rounded-lg cursor-pointer"
              />
              <button
                type="button"
                onClick={() => onChange({ translateX: Number((config.translateX + 0.5).toFixed(1)) })}
                className="px-1.5 py-0.5 bg-zinc-800 hover:bg-zinc-700 text-zinc-200 rounded text-[10px]"
              >
                +0.5%
              </button>
              <button
                type="button"
                onClick={() => onChange({ translateX: Number((config.translateX + 2).toFixed(1)) })}
                className="px-1.5 py-0.5 bg-zinc-800 hover:bg-zinc-700 text-zinc-200 rounded text-[10px]"
              >
                +2%
              </button>
            </div>
          </div>

          {/* Position Y (TranslateY px) */}
          <div className="bg-zinc-900/90 p-2 border border-zinc-800 space-y-1">
            <div className="flex justify-between items-center text-zinc-300">
              <span className="font-bold text-p5-crimson flex items-center gap-1">
                <Move className="size-3" /> Position Y (Vertical):
              </span>
              <span className="text-white font-bold">{config.translateY}px</span>
            </div>
            <div className="flex items-center gap-1.5">
              <button
                type="button"
                onClick={() => onChange({ translateY: config.translateY - 5 })}
                className="px-1.5 py-0.5 bg-zinc-800 hover:bg-zinc-700 text-zinc-200 rounded text-[10px]"
              >
                -5px
              </button>
              <button
                type="button"
                onClick={() => onChange({ translateY: config.translateY - 1 })}
                className="px-1.5 py-0.5 bg-zinc-800 hover:bg-zinc-700 text-zinc-200 rounded text-[10px]"
              >
                -1px
              </button>
              <input
                type="range"
                min={-60}
                max={220}
                step={1}
                value={config.translateY}
                onChange={(e) => onChange({ translateY: Number(e.target.value) })}
                className="flex-1 accent-[#E60012] h-1.5 bg-zinc-700 rounded-lg cursor-pointer"
              />
              <button
                type="button"
                onClick={() => onChange({ translateY: config.translateY + 1 })}
                className="px-1.5 py-0.5 bg-zinc-800 hover:bg-zinc-700 text-zinc-200 rounded text-[10px]"
              >
                +1px
              </button>
              <button
                type="button"
                onClick={() => onChange({ translateY: config.translateY + 5 })}
                className="px-1.5 py-0.5 bg-zinc-800 hover:bg-zinc-700 text-zinc-200 rounded text-[10px]"
              >
                +5px
              </button>
            </div>
          </div>

          {/* Scale Multiplier */}
          <div className="bg-zinc-900/90 p-2 border border-zinc-800 space-y-1">
            <div className="flex justify-between items-center text-zinc-300">
              <span className="font-bold text-p5-crimson">Scale:</span>
              <span className="text-white font-bold">{config.scale.toFixed(2)}x</span>
            </div>
            <div className="flex items-center gap-1.5">
              <button
                type="button"
                onClick={() => onChange({ scale: Math.max(0.5, Number((config.scale - 0.05).toFixed(2))) })}
                className="px-1.5 py-0.5 bg-zinc-800 hover:bg-zinc-700 text-zinc-200 rounded text-[10px]"
              >
                -0.05
              </button>
              <button
                type="button"
                onClick={() => onChange({ scale: Math.max(0.5, Number((config.scale - 0.01).toFixed(2))) })}
                className="px-1.5 py-0.5 bg-zinc-800 hover:bg-zinc-700 text-zinc-200 rounded text-[10px]"
              >
                -0.01
              </button>
              <input
                type="range"
                min={0.5}
                max={1.5}
                step={0.01}
                value={config.scale}
                onChange={(e) => onChange({ scale: Number(e.target.value) })}
                className="flex-1 accent-[#E60012] h-1.5 bg-zinc-700 rounded-lg cursor-pointer"
              />
              <button
                type="button"
                onClick={() => onChange({ scale: Math.min(1.6, Number((config.scale + 0.01).toFixed(2))) })}
                className="px-1.5 py-0.5 bg-zinc-800 hover:bg-zinc-700 text-zinc-200 rounded text-[10px]"
              >
                +0.01
              </button>
              <button
                type="button"
                onClick={() => onChange({ scale: Math.min(1.6, Number((config.scale + 0.05).toFixed(2))) })}
                className="px-1.5 py-0.5 bg-zinc-800 hover:bg-zinc-700 text-zinc-200 rounded text-[10px]"
              >
                +0.05
              </button>
            </div>
          </div>

          {/* Rotate Angle */}
          <div className="bg-zinc-900/90 p-2 border border-zinc-800 space-y-1">
            <div className="flex justify-between items-center text-zinc-300">
              <span className="font-bold text-p5-crimson">Rotation Angle:</span>
              <span className="text-white font-bold">{config.rotate}°</span>
            </div>
            <div className="flex items-center gap-1.5">
              <button
                type="button"
                onClick={() => onChange({ rotate: Number((config.rotate - 1).toFixed(1)) })}
                className="px-1.5 py-0.5 bg-zinc-800 hover:bg-zinc-700 text-zinc-200 rounded text-[10px]"
              >
                -1°
              </button>
              <button
                type="button"
                onClick={() => onChange({ rotate: Number((config.rotate - 0.2).toFixed(1)) })}
                className="px-1.5 py-0.5 bg-zinc-800 hover:bg-zinc-700 text-zinc-200 rounded text-[10px]"
              >
                -0.2°
              </button>
              <input
                type="range"
                min={-15}
                max={15}
                step={0.2}
                value={config.rotate}
                onChange={(e) => onChange({ rotate: Number(e.target.value) })}
                className="flex-1 accent-[#E60012] h-1.5 bg-zinc-700 rounded-lg cursor-pointer"
              />
              <button
                type="button"
                onClick={() => onChange({ rotate: Number((config.rotate + 0.2).toFixed(1)) })}
                className="px-1.5 py-0.5 bg-zinc-800 hover:bg-zinc-700 text-zinc-200 rounded text-[10px]"
              >
                +0.2°
              </button>
              <button
                type="button"
                onClick={() => onChange({ rotate: Number((config.rotate + 1).toFixed(1)) })}
                className="px-1.5 py-0.5 bg-zinc-800 hover:bg-zinc-700 text-zinc-200 rounded text-[10px]"
              >
                +1°
              </button>
            </div>
          </div>

          {/* Height (Viewport % / vh) */}
          <div className="bg-zinc-900/90 p-2 border border-zinc-800 space-y-1">
            <div className="flex justify-between items-center text-zinc-300">
              <span className="font-bold text-p5-crimson">Frame Height:</span>
              <span className="text-white font-bold">{config.heightVh}vh</span>
            </div>
            <div className="flex items-center gap-1.5">
              <button
                type="button"
                onClick={() => onChange({ heightVh: Math.max(60, config.heightVh - 2) })}
                className="px-1.5 py-0.5 bg-zinc-800 hover:bg-zinc-700 text-zinc-200 rounded text-[10px]"
              >
                -2vh
              </button>
              <input
                type="range"
                min={60}
                max={100}
                step={1}
                value={config.heightVh}
                onChange={(e) => onChange({ heightVh: Number(e.target.value) })}
                className="flex-1 accent-[#E60012] h-1.5 bg-zinc-700 rounded-lg cursor-pointer"
              />
              <button
                type="button"
                onClick={() => onChange({ heightVh: Math.min(105, config.heightVh + 2) })}
                className="px-1.5 py-0.5 bg-zinc-800 hover:bg-zinc-700 text-zinc-200 rounded text-[10px]"
              >
                +2vh
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
                : 'bg-p5-crimson hover:bg-red-500 text-white border-black shadow-[2px_2px_0px_#000]'
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
