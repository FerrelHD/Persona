import { useState, useEffect, useRef } from 'react'

export interface PreloadState {
  progress: number
  isReady: boolean
  isFadingOut: boolean
}

// ── STAGE 1: IMMEDIATE MAIN MENU ASSETS (CRITICAL PATH: ~2.5 MB TOTAL) ──
const MAIN_MENU_AUDIO = [
  '/sfx/navigation.wav',
  '/sfx/menu-utama.mp3',
  '/sfx/close-menu.mp3',
]

// ── STAGE 2: PASSIVE BACKGROUND PRELOAD (DOWNLOADED IN IDLE AFTER MAIN MENU MOUNTS) ──
const BACKGROUND_SUB_SCREEN_IMAGES = [
  '/assets/Cinematic Mall Atrium with Central Fountain.webp',
  '/assets/fountain water.webp',
  '/assets/fountain water dimmed.webp',
  '/assets/Makoto Yuki.webp',
  '/assets/Yukari Takeba.webp',
  '/assets/Junpei Iori.webp',
  '/assets/Mitsuru Kirijo.webp',
  '/assets/Fuuka Yamagishi.webp',
  '/assets/Aigis.webp',
  '/assets/BubbleChat Persona 3.webp',
]

const KANJI_GLYPHS = '結城理岳羽ゆかり伊織順平桐条美鶴山岸風花アイギス'

export function useRealAssetPreloader(): PreloadState {
  const [progress, setProgress] = useState(0)
  const [isFadingOut, setIsFadingOut] = useState(false)
  const [isReady, setIsReady] = useState(false)
  const hasFinishedRef = useRef(false)

  // ── STAGE 1: Fast Initial Preloader (Main Menu Only) ──
  useEffect(() => {
    let completed = 0
    let isCancelled = false

    // Total units of work for Stage 1: 1 Video + 3 Audio + 1 Font = 5 items
    const totalItems = 1 + MAIN_MENU_AUDIO.length + 1

    const updateProgress = () => {
      if (isCancelled || hasFinishedRef.current) return
      completed++
      const pct = Math.min(100, Math.round((completed / totalItems) * 100))
      setProgress(pct)
    }

    // 1. Audio preloading
    const audioPromises = MAIN_MENU_AUDIO.map((src) => {
      return fetch(src)
        .catch(() => {})
        .then(() => {
          updateProgress()
        })
    })

    // 2. Primary Menu Font preloading (Rodin Pro Bold)
    const fontPromise = (async () => {
      if (typeof document !== 'undefined' && 'fonts' in document) {
        try {
          await document.fonts.load('900 16px "Rodin Pro"')
        } catch {}
      }
      updateProgress()
    })()

    // 3. Main Menu Video Preload
    const videoPromise = new Promise<void>((resolve) => {
      const v = document.createElement('video')
      v.src = '/assets/p3r-menu-bg.mp4'
      v.preload = 'auto'
      v.muted = true
      let resolved = false
      const done = () => {
        if (!resolved) {
          resolved = true
          updateProgress()
          resolve()
        }
      }
      v.addEventListener('canplay', done, { once: true })
      v.addEventListener('error', done, { once: true })
      // Maximum 1.8s wait for video buffer so users aren't delayed
      setTimeout(done, 1800)
    })

    const onAllDone = () => {
      if (hasFinishedRef.current || isCancelled) return
      hasFinishedRef.current = true
      setProgress(100)

      // Snappy fade out (200ms), then reveal Main Menu
      setTimeout(() => {
        if (isCancelled) return
        setIsFadingOut(true)
        setTimeout(() => {
          if (isCancelled) return
          setIsReady(true)
        }, 220)
      }, 80)
    }

    Promise.allSettled([...audioPromises, fontPromise, videoPromise]).then(onAllDone)

    // Safety timeout: Maximum 3.5 seconds
    const safetyTimeout = setTimeout(onAllDone, 3500)

    return () => {
      isCancelled = true
      clearTimeout(safetyTimeout)
    }
  }, [])

  // ── STAGE 2: Passive Background Cache (Runs quietly after Main Menu is mounted) ──
  useEffect(() => {
    if (!isReady) return

    const loadIdleAssets = () => {
      // 1. Decode sub-screen WebP images into GPU texture memory
      BACKGROUND_SUB_SCREEN_IMAGES.forEach((src) => {
        const img = new Image()
        img.src = src
        if (typeof img.decode === 'function') {
          img.decode().catch(() => {})
        }
      })

      // 2. Asynchronously preload kanji fonts in background
      if (typeof document !== 'undefined' && 'fonts' in document) {
        document.fonts.load('800 16px "Shippori Mincho"', KANJI_GLYPHS).catch(() => {})
        document.fonts.load('900 16px "NewRodin Pro"').catch(() => {})
      }
    }

    if (typeof window !== 'undefined' && 'requestIdleCallback' in window) {
      const id = (window as any).requestIdleCallback(loadIdleAssets, { timeout: 2000 })
      return () => (window as any).cancelIdleCallback(id)
    } else {
      const timer = setTimeout(loadIdleAssets, 600)
      return () => clearTimeout(timer)
    }
  }, [isReady])

  return { progress, isReady, isFadingOut }
}
