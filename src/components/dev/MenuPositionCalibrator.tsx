import React, { useState, useEffect } from 'react'
import { P3RMenuItemConfig, DEFAULT_P3R_MENU_CONFIG } from '@/data/menuConfig'

export interface MenuPositionCalibratorProps {
  isOpen: boolean
  onClose: () => void
  config: P3RMenuItemConfig[]
  onChange: (updatedConfig: P3RMenuItemConfig[]) => void
  onReset?: () => void
  activeTabIndex?: number
  onTabChange?: (index: number) => void
}

export const MenuPositionCalibrator: React.FC<MenuPositionCalibratorProps> = ({
  isOpen,
  onClose,
  config,
  onChange,
  onReset,
  activeTabIndex,
  onTabChange,
}) => {
  const [activeTab, setActiveTab] = useState<number>(activeTabIndex ?? 0)
  const [copiedSuccess, setCopiedSuccess] = useState(false)

  useEffect(() => {
    if (activeTabIndex !== undefined && activeTabIndex >= 0 && activeTabIndex < config.length) {
      setActiveTab(activeTabIndex)
    }
  }, [activeTabIndex, config.length])

  // Parse font size into number (e.g., '4.85rem' -> 4.85)
  const parseFontSize = (val: string): number => {
    const num = parseFloat(val)
    return isNaN(num) ? 4.8 : num
  }

  const currentItem = config[activeTab] || config[0]

  const updateCurrentItem = (updates: Partial<P3RMenuItemConfig>) => {
    const next = config.map((item, idx) => (idx === activeTab ? { ...item, ...updates } : item))
    onChange(next)
  }

  const handleCopy = () => {
    const payload = `export const DEFAULT_P3R_MENU_CONFIG: P3RMenuItemConfig[] = ${JSON.stringify(config, null, 2)}`
    navigator.clipboard?.writeText(payload)
    setCopiedSuccess(true)
    setTimeout(() => setCopiedSuccess(false), 2000)
  }

  const handleSelectTab = (idx: number) => {
    setActiveTab(idx)
    onTabChange?.(idx)
  }

  if (!isOpen) return null

  return (
    <div className="fixed bottom-4 right-4 z-[9990] w-[360px] sm:w-[400px] bg-[#001233]/95 text-white border-2 border-[#16cffb]/60 shadow-[0_0_25px_rgba(22,207,251,0.4)] backdrop-blur-md p-4 font-mono text-xs select-none max-h-[90vh] overflow-y-auto no-scrollbar rounded-sm">
      {/* Header */}
      <div className="flex items-center justify-between pb-2 border-b border-[#16cffb]/30">
        <div className="flex items-center gap-2">
          <span className="size-2 rounded-full bg-[#16cffb] animate-ping" />
          <span className="font-black tracking-wider uppercase text-[11px] text-[#16cffb]">
            P3R MENU CALIBRATOR
          </span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-[10px] text-zinc-400 font-mono hidden sm:inline">[` or ~]</span>
          <button
            type="button"
            onClick={onClose}
            className="text-zinc-400 hover:text-white text-sm font-black cursor-pointer px-1 leading-none"
            title="Close Calibrator"
          >
            ✕
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="grid grid-cols-4 bg-[#031f64]/80 border border-[#16cffb]/20 p-0.5 mt-2.5 gap-0.5">
        {config.map((item, idx) => (
          <button
            key={item.id}
            type="button"
            onClick={() => handleSelectTab(idx)}
            className={`py-1 text-[10px] font-mono uppercase font-black transition-colors cursor-pointer text-center truncate px-1 ${
              activeTab === idx
                ? 'bg-[#16cffb] text-black shadow-sm'
                : 'text-zinc-300 hover:text-white hover:bg-white/10'
            }`}
          >
            {item.name}
          </button>
        ))}
      </div>

      {/* Sliders Container */}
      <div className="mt-3 space-y-2.5 text-[11px]">
        {/* Rotation */}
        <div className="bg-[#031f64]/60 p-2 border border-white/10 rounded-sm">
          <div className="flex justify-between items-center mb-1">
            <span className="text-zinc-300 font-bold uppercase">Rotation Angle</span>
            <span className="text-[#16cffb] font-black">{currentItem.rotation}°</span>
          </div>
          <input
            type="range"
            min={-35}
            max={35}
            step={1}
            value={currentItem.rotation}
            onChange={(e) => updateCurrentItem({ rotation: Number(e.target.value) })}
            className="w-full accent-[#16cffb] cursor-pointer h-1.5 bg-zinc-700"
          />
        </div>

        {/* Offset X & Y */}
        <div className="grid grid-cols-2 gap-2">
          <div className="bg-[#031f64]/60 p-2 border border-white/10 rounded-sm">
            <div className="flex justify-between items-center mb-1">
              <span className="text-zinc-300 font-bold uppercase">Offset X</span>
              <span className="text-[#16cffb] font-black">{currentItem.offsetX}px</span>
            </div>
            <input
              type="range"
              min={-300}
              max={300}
              step={1}
              value={currentItem.offsetX}
              onChange={(e) => updateCurrentItem({ offsetX: Number(e.target.value) })}
              className="w-full accent-[#16cffb] cursor-pointer h-1.5 bg-zinc-700"
            />
          </div>

          <div className="bg-[#031f64]/60 p-2 border border-white/10 rounded-sm">
            <div className="flex justify-between items-center mb-1">
              <span className="text-zinc-300 font-bold uppercase">Offset Y</span>
              <span className="text-[#16cffb] font-black">{currentItem.offsetY}px</span>
            </div>
            <input
              type="range"
              min={-300}
              max={300}
              step={1}
              value={currentItem.offsetY}
              onChange={(e) => updateCurrentItem({ offsetY: Number(e.target.value) })}
              className="w-full accent-[#16cffb] cursor-pointer h-1.5 bg-zinc-700"
            />
          </div>
        </div>

        {/* Font Size */}
        <div className="bg-[#031f64]/60 p-2 border border-white/10 rounded-sm">
          <div className="flex justify-between items-center mb-1">
            <span className="text-zinc-300 font-bold uppercase">Font Size</span>
            <span className="text-[#16cffb] font-black">{currentItem.fontSize}</span>
          </div>
          <input
            type="range"
            min={2.0}
            max={7.5}
            step={0.05}
            value={parseFontSize(currentItem.fontSize)}
            onChange={(e) => updateCurrentItem({ fontSize: `${Number(e.target.value).toFixed(2)}rem` })}
            className="w-full accent-[#16cffb] cursor-pointer h-1.5 bg-zinc-700"
          />
        </div>

        {/* Banner Scale X & Y */}
        <div className="grid grid-cols-2 gap-2">
          <div className="bg-[#031f64]/60 p-2 border border-white/10 rounded-sm">
            <div className="flex justify-between items-center mb-1">
              <span className="text-zinc-300 font-bold uppercase">Banner W</span>
              <span className="text-[#16cffb] font-black">{currentItem.bannerScaleX.toFixed(2)}x</span>
            </div>
            <input
              type="range"
              min={0.5}
              max={2.5}
              step={0.02}
              value={currentItem.bannerScaleX}
              onChange={(e) => updateCurrentItem({ bannerScaleX: Number(e.target.value) })}
              className="w-full accent-[#16cffb] cursor-pointer h-1.5 bg-zinc-700"
            />
          </div>

          <div className="bg-[#031f64]/60 p-2 border border-white/10 rounded-sm">
            <div className="flex justify-between items-center mb-1">
              <span className="text-zinc-300 font-bold uppercase">Banner H</span>
              <span className="text-[#16cffb] font-black">{currentItem.bannerScaleY.toFixed(2)}x</span>
            </div>
            <input
              type="range"
              min={1.0}
              max={5.0}
              step={0.05}
              value={currentItem.bannerScaleY}
              onChange={(e) => updateCurrentItem({ bannerScaleY: Number(e.target.value) })}
              className="w-full accent-[#16cffb] cursor-pointer h-1.5 bg-zinc-700"
            />
          </div>
        </div>

        {/* Banner Offset X & Y */}
        <div className="grid grid-cols-2 gap-2">
          <div className="bg-[#031f64]/60 p-2 border border-white/10 rounded-sm">
            <div className="flex justify-between items-center mb-1">
              <span className="text-zinc-300 font-bold uppercase">Banner Off X</span>
              <span className="text-[#16cffb] font-black">{currentItem.bannerOffsetX ?? -60}px</span>
            </div>
            <input
              type="range"
              min={-300}
              max={300}
              step={1}
              value={currentItem.bannerOffsetX ?? -60}
              onChange={(e) => updateCurrentItem({ bannerOffsetX: Number(e.target.value) })}
              className="w-full accent-[#16cffb] cursor-pointer h-1.5 bg-zinc-700"
            />
          </div>

          <div className="bg-[#031f64]/60 p-2 border border-white/10 rounded-sm">
            <div className="flex justify-between items-center mb-1">
              <span className="text-zinc-300 font-bold uppercase">Banner Off Y</span>
              <span className="text-[#16cffb] font-black">{currentItem.bannerOffsetY ?? -186}px</span>
            </div>
            <input
              type="range"
              min={-350}
              max={50}
              step={1}
              value={currentItem.bannerOffsetY ?? -186}
              onChange={(e) => updateCurrentItem({ bannerOffsetY: Number(e.target.value) })}
              className="w-full accent-[#16cffb] cursor-pointer h-1.5 bg-zinc-700"
            />
          </div>
        </div>

        {/* Banner Rotation */}
        <div className="bg-[#031f64]/60 p-2 border border-white/10 rounded-sm">
          <div className="flex justify-between items-center mb-1">
            <span className="text-zinc-300 font-bold uppercase">Banner Rotation</span>
            <span className="text-[#16cffb] font-black">{currentItem.bannerRotation ?? 8}°</span>
          </div>
          <input
            type="range"
            min={-30}
            max={30}
            step={1}
            value={currentItem.bannerRotation ?? 8}
            onChange={(e) => updateCurrentItem({ bannerRotation: Number(e.target.value) })}
            className="w-full accent-[#16cffb] cursor-pointer h-1.5 bg-zinc-700"
          />
        </div>
      </div>

      {/* Footer Controls */}
      <div className="mt-3 pt-2.5 border-t border-white/10 flex gap-2">
        <button
          type="button"
          onClick={() => {
            if (onReset) onReset()
            else onChange(DEFAULT_P3R_MENU_CONFIG)
          }}
          className="flex-1 py-1.5 bg-[#031f64] hover:bg-[#031f64]/80 border border-white/20 text-zinc-300 text-[10px] uppercase font-black cursor-pointer transition-colors"
        >
          Reset Default
        </button>
        <button
          type="button"
          onClick={handleCopy}
          className="flex-1 py-1.5 bg-[#16cffb] hover:bg-[#16cffb]/80 text-black text-[10px] font-black uppercase cursor-pointer transition-colors shadow-sm"
        >
          {copiedSuccess ? '✓ COPIED!' : '📋 COPY CONFIG'}
        </button>
      </div>
    </div>
  )
}

