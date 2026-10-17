import { useState, useEffect, useRef } from 'react'

export interface PreloadState {
  progress: number
  isReady: boolean
  isFadingOut: boolean
}

const PRELOAD_IMAGES = [
  '/assets/Cinematic Mall Atrium with Central Fountain.png',
  '/assets/fountain water.png',
  '/assets/Makoto Yuki.png',
  '/assets/Yukari Takeba.png',
  '/assets/Junpei Iori.png',
  '/assets/Mitsuru Kirijo.png',
  '/assets/Fuuka Yamagishi.png',
  '/assets/Aigis.png',
  '/assets/BubbleChat Persona 3.png',
]

const PRELOAD_AUDIO = [
  '/sfx/navigation.wav',
  '/sfx/menu-utama.mp3',
  '/sfx/close-menu.mp3',
]

const KANJI_GLYPHS = '結城理岳羽ゆかり伊織順平桐条美鶴山岸風花アイギス'

export function useRealAssetPreloader(): PreloadState {
  const [progress, setProgress] = useState(0)
  const [isFadingOut, setIsFadingOut] = useState(false)
  const [isReady, setIsReady] = useState(false)
  const hasFinishedRef = useRef(false)

  useEffect(() => {
    let completed = 0
    let isCancelled = false

    // Total units of work to load and decode
    const totalItems = PRELOAD_IMAGES.length + PRELOAD_AUDIO.length + 3 + 1 // +3 fonts + 1 video

    const updateProgress = () => {
      if (isCancelled || hasFinishedRef.current) return
      completed++
      const pct = Math.min(100, Math.round((completed / totalItems) * 100))
      setProgress(pct)
    }

    // 1. Preload & Decode Images to GPU
    const imagePromises = PRELOAD_IMAGES.map((src) => {
      return new Promise<void>((resolve) => {
        const img = new Image()
        img.src = src
        const finish = () => {
          updateProgress()
          resolve()
        }
        img.onload = finish
        img.onerror = finish
        if (typeof img.decode === 'function') {
          img.decode().then(finish).catch(finish)
        }
      })
    })

    // 2. Preload Audio files into browser cache
    const audioPromises = PRELOAD_AUDIO.map((src) => {
      return fetch(src)
        .catch(() => {})
        .then(() => {
          updateProgress()
        })
    })

    // 3. Preload Fonts & CJK Kanji Glyphs
    const fontPromises: Promise<void>[] = []
    if (typeof document !== 'undefined' && 'fonts' in document) {
      fontPromises.push(
        document.fonts.load('900 16px "Rodin Pro"').catch(() => {}).then(updateProgress),
        document.fonts.load('900 16px "NewRodin Pro"').catch(() => {}).then(updateProgress),
        document.fonts.load('800 16px "Shippori Mincho"', KANJI_GLYPHS).catch(() => {}).then(updateProgress)
      )
    } else {
      updateProgress()
      updateProgress()
      updateProgress()
    }

    // 4. Preload Main Menu Video
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
      // Maximum 2.5s wait for video buffer
      setTimeout(done, 2500)
    })

    const onAllDone = () => {
      if (hasFinishedRef.current || isCancelled) return
      hasFinishedRef.current = true
      setProgress(100)

      // Snappy fade out (220ms), then unmount
      setTimeout(() => {
        if (isCancelled) return
        setIsFadingOut(true)
        setTimeout(() => {
          if (isCancelled) return
          setIsReady(true)
        }, 250)
      }, 100)
    }

    // Run all loading promises concurrently
    Promise.allSettled([...imagePromises, ...audioPromises, ...fontPromises, videoPromise]).then(onAllDone)

    // Safety timeout: Never hold user hostage for more than 7.5 seconds
    const safetyTimeout = setTimeout(onAllDone, 7500)

    return () => {
      isCancelled = true
      clearTimeout(safetyTimeout)
    }
  }, [])

  return { progress, isReady, isFadingOut }
}
