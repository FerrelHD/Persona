import { useEffect } from 'react'

const PRELOAD_VIDEOS = [
  '/assets/videos/joker.mp4',
  '/assets/videos/makoto.mp4',
  '/assets/videos/shinji.mp4',
  '/assets/videos/fuuka.mp4',
]

const PRELOAD_IMAGES = [
  '/assets/tokyobackground.png',
  '/assets/background attic.jpe',
  '/assets/Futaba_Sakura.webp',
  '/assets/yusuke kitagawa.png',
  '/assets/Ryuji_Sakamoto.webp',
  '/assets/Morgana.webp',
  '/assets/An_takamaki.webp',
  '/assets/Joker.png',
  '/assets/phone_hold_filled.png',
  '/assets/ferrel-portrait.jpg',
  '/assets/p5r_renders/futaba.png',
  '/assets/p5r_renders/joker.png',
  '/assets/p5r_renders/ryuji.png',
  '/assets/p5r_renders/yusuke.png',
  '/assets/p5r_renders/makoto.png',
  '/assets/Indonesian Crustal Observatory.png',
  '/assets/Charles-Leclerc.png',
  '/assets/spider-dev.png',
  '/assets/student-life.png',
  '/assets/stock-prediction.png',
  '/assets/street-rush.webp',
  '/assets/SpeechBubbleWithName.png',
  '/assets/speech-bubble-p5.png',
  '/assets/Eco-Bite.png',
  '/assets/fersya-shop.webp',
]

export function useAssetPreloader() {
  useEffect(() => {
    // Respect client Data Saver mode to conserve bandwidth
    const conn = (navigator as unknown as { connection?: { saveData?: boolean } }).connection
    if (conn?.saveData) return

    // Run preloading quietly when browser is idle
    const startPreload = () => {
      // 1. Eagerly warm up Japanese Kanji fonts so CJK glyph slices load into memory
      if (typeof document !== 'undefined' && 'fonts' in document) {
        const KANJI_GLYPHS = '喜多川祐介佐倉双葉モルガナ坂本竜司高巻杏雨宮蓮'
        document.fonts.load('800 16px "Shippori Mincho"', KANJI_GLYPHS).catch(() => {})
        document.fonts.load('700 16px "Noto Serif JP"', KANJI_GLYPHS).catch(() => {})
      }

      // 2. Preload key images into browser cache & decode GPU textures
      PRELOAD_IMAGES.forEach(src => {
        const img = new Image()
        img.src = src
        if ('decode' in img) {
          img.decode().catch(() => {})
        }
      })

      // 3. Preload videos using low-priority fetch so they sit in HTTP cache
      PRELOAD_VIDEOS.forEach(src => {
        try {
          fetch(src, { priority: 'low' } as RequestInit).catch(() => {
            // Fallback: silent ignore if offline or interrupted
          })
        } catch {
          // Ignore
        }
      })
    }

    if ('requestIdleCallback' in window) {
      const handle = (window as unknown as { requestIdleCallback: (cb: () => void) => number }).requestIdleCallback(startPreload)
      return () => {
        if ('cancelIdleCallback' in window) {
          (window as unknown as { cancelIdleCallback: (h: number) => void }).cancelIdleCallback(handle)
        }
      }
    } else {
      const timeout = setTimeout(startPreload, 1500)
      return () => clearTimeout(timeout)
    }
  }, [])
}
