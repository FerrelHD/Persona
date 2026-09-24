import { useEffect } from 'react'

const PRELOAD_VIDEOS = [
  '/assets/videos/joker.mp4',
  '/assets/videos/makoto.mp4',
  '/assets/videos/TokyoVideo.mp4',
  '/assets/videos/akihiko.mp4',
  '/assets/videos/shinji.mp4',
  '/assets/videos/fuuka.mp4',
]

const PRELOAD_IMAGES = [
  '/assets/tokyobackground.png',
  '/assets/unity_icon_svg-removebg-preview.png',
  '/assets/phone_hold_filled.png',
  '/assets/ferrel-portrait.jpg',
  '/assets/p5r_renders/futaba.png',
  '/assets/p5r_renders/makoto.png',
  '/assets/p5r_renders/joker.png',
  '/assets/p5r_renders/ryuji.png',
  '/assets/p5r_renders/yusuke.png',
  '/assets/Indonesian Crustal Observatory.png',
  '/assets/Charles-Leclerc.png',
  '/assets/spider-dev.png',
  '/assets/student-life.png',
  '/assets/stock-prediction.png',
  '/assets/street-rush.webp',
  '/assets/Eco-Bite.png',
  '/assets/fersya-shop.webp',
]

export function useAssetPreloader() {
  useEffect(() => {
    // Run preloading quietly when browser is idle
    const startPreload = () => {
      // 1. Preload key images into browser cache
      PRELOAD_IMAGES.forEach(src => {
        const img = new Image()
        img.src = src
      })

      // 2. Preload videos using low-priority fetch so they sit in HTTP cache
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
