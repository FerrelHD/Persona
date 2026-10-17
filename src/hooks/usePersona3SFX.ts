import { useEffect, useRef, useCallback } from 'react'

// Shared AudioContext and AudioBuffer cache for zero-latency playback across components
let globalAudioCtx: AudioContext | null = null
const bufferCache: Record<string, AudioBuffer> = {}
let isUnlocked = false

function getAudioContext(): AudioContext | null {
  if (typeof window === 'undefined') return null
  if (!globalAudioCtx) {
    const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext
    if (AudioContextClass) {
      globalAudioCtx = new AudioContextClass()
    }
  }
  return globalAudioCtx
}

// Prefetch and decode sound into Web Audio buffer
async function loadSoundBuffer(url: string): Promise<AudioBuffer | null> {
  if (bufferCache[url]) return bufferCache[url]
  const ctx = getAudioContext()
  if (!ctx) return null

  try {
    const response = await fetch(url)
    const arrayBuffer = await response.arrayBuffer()
    const audioBuffer = await ctx.decodeAudioData(arrayBuffer)
    bufferCache[url] = audioBuffer
    return audioBuffer
  } catch {
    return null
  }
}

// Unlock Web Audio context on the first user interaction
function unlockAudio() {
  if (isUnlocked) return
  const ctx = getAudioContext()
  if (ctx && ctx.state !== 'running') {
    ctx.resume().then(() => {
      isUnlocked = true
    }).catch(() => {})
  } else if (ctx) {
    isUnlocked = true
  }

  // Preload standard P3R sound buffers
  loadSoundBuffer('/sfx/navigation.wav')
  loadSoundBuffer('/sfx/close-menu.mp3')
  loadSoundBuffer('/sfx/menu-utama.mp3')
}

if (typeof window !== 'undefined') {
  const events = ['pointerdown', 'mousedown', 'keydown', 'touchstart']
  const onFirstInteraction = () => {
    unlockAudio()
    events.forEach(evt => window.removeEventListener(evt, onFirstInteraction, true))
  }
  events.forEach(evt => window.addEventListener(evt, onFirstInteraction, { capture: true, passive: true }))
}

function playBuffer(url: string, volume: number = 0.8) {
  const ctx = getAudioContext()
  if (!ctx) {
    // Fallback to HTMLAudioElement
    try {
      const audio = new Audio(url)
      audio.volume = volume
      audio.play().catch(() => {})
    } catch {}
    return
  }

  if (ctx.state !== 'running') {
    ctx.resume().catch(() => {})
  }

  const cached = bufferCache[url]
  if (cached) {
    try {
      const source = ctx.createBufferSource()
      const gainNode = ctx.createGain()
      gainNode.gain.value = volume
      source.buffer = cached
      source.connect(gainNode)
      gainNode.connect(ctx.destination)
      source.start(0)
      return
    } catch {}
  }

  // If not yet decoded in bufferCache, load and play or fallback
  loadSoundBuffer(url).then(buf => {
    if (buf && ctx) {
      try {
        const source = ctx.createBufferSource()
        const gainNode = ctx.createGain()
        gainNode.gain.value = volume
        source.buffer = buf
        source.connect(gainNode)
        gainNode.connect(ctx.destination)
        source.start(0)
      } catch {}
    } else {
      const audio = new Audio(url)
      audio.volume = volume
      audio.play().catch(() => {})
    }
  }).catch(() => {
    const audio = new Audio(url)
    audio.volume = volume
    audio.play().catch(() => {})
  })
}

export function usePersona3SFX() {
  const hasPreloadedRef = useRef(false)

  useEffect(() => {
    if (!hasPreloadedRef.current) {
      hasPreloadedRef.current = true
      loadSoundBuffer('/sfx/navigation.wav')
      loadSoundBuffer('/sfx/close-menu.mp3')
      loadSoundBuffer('/sfx/menu-utama.mp3')
    }
  }, [])

  const playNavSFX = useCallback(() => {
    playBuffer('/sfx/navigation.wav', 0.65)
  }, [])

  const playCloseSFX = useCallback(() => {
    playBuffer('/sfx/close-menu.mp3', 0.85)
  }, [])

  const playMenuUtamaSFX = useCallback(() => {
    playBuffer('/sfx/menu-utama.mp3', 0.95)
  }, [])

  return {
    playNavSFX,
    playCloseSFX,
    playMenuUtamaSFX,
  }
}

