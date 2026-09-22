import { useCallback, useRef } from 'react'

export function usePersonaSFX() {
  const audioCtxRef = useRef<AudioContext | null>(null)

  const init = useCallback(() => {
    if (!audioCtxRef.current) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext
      if (AudioCtx) {
        audioCtxRef.current = new AudioCtx()
      }
    }
    if (audioCtxRef.current && audioCtxRef.current.state === 'suspended') {
      audioCtxRef.current.resume()
    }
  }, [])

  const playHover = useCallback(() => {
    init()
    const ctx = audioCtxRef.current
    if (!ctx) return

    try {
      const osc = ctx.createOscillator()
      const gain = ctx.createGain()

      osc.type = 'triangle'
      osc.frequency.setValueAtTime(880, ctx.currentTime)
      osc.frequency.exponentialRampToValueAtTime(1320, ctx.currentTime + 0.04)

      gain.gain.setValueAtTime(0.05, ctx.currentTime)
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.04)

      osc.connect(gain)
      gain.connect(ctx.destination)

      osc.start()
      osc.stop(ctx.currentTime + 0.04)
    } catch {
      // ignore policy restriction
    }
  }, [init])

  const playSlash = useCallback(() => {
    init()
    const ctx = audioCtxRef.current
    if (!ctx) return

    try {
      const osc = ctx.createOscillator()
      const gain = ctx.createGain()

      osc.type = 'sawtooth'
      osc.frequency.setValueAtTime(650, ctx.currentTime)
      osc.frequency.exponentialRampToValueAtTime(180, ctx.currentTime + 0.12)

      gain.gain.setValueAtTime(0.09, ctx.currentTime)
      gain.gain.linearRampToValueAtTime(0.001, ctx.currentTime + 0.12)

      osc.connect(gain)
      gain.connect(ctx.destination)

      osc.start()
      osc.stop(ctx.currentTime + 0.12)
    } catch {
      // ignore
    }
  }, [init])

  const playBack = useCallback(() => {
    init()
    const ctx = audioCtxRef.current
    if (!ctx) return

    try {
      const osc = ctx.createOscillator()
      const gain = ctx.createGain()

      osc.type = 'sine'
      osc.frequency.setValueAtTime(320, ctx.currentTime)
      osc.frequency.exponentialRampToValueAtTime(110, ctx.currentTime + 0.1)

      gain.gain.setValueAtTime(0.08, ctx.currentTime)
      gain.gain.linearRampToValueAtTime(0.001, ctx.currentTime + 0.1)

      osc.connect(gain)
      gain.connect(ctx.destination)

      osc.start()
      osc.stop(ctx.currentTime + 0.1)
    } catch {
      // ignore
    }
  }, [init])

  const playStamp = useCallback(() => {
    init()
    const ctx = audioCtxRef.current
    if (!ctx) return

    try {
      const now = ctx.currentTime
      const osc = ctx.createOscillator()
      const gain = ctx.createGain()

      osc.type = 'sine'
      osc.frequency.setValueAtTime(160, now)
      osc.frequency.exponentialRampToValueAtTime(35, now + 0.25)

      gain.gain.setValueAtTime(0.2, now)
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.25)

      osc.connect(gain)
      gain.connect(ctx.destination)

      osc.start(now)
      osc.stop(now + 0.25)

      const clickOsc = ctx.createOscillator()
      const clickGain = ctx.createGain()
      clickOsc.type = 'square'
      clickOsc.frequency.setValueAtTime(1200, now)
      clickGain.gain.setValueAtTime(0.06, now)
      clickGain.gain.exponentialRampToValueAtTime(0.001, now + 0.05)
      clickOsc.connect(clickGain)
      clickGain.connect(ctx.destination)
      clickOsc.start(now)
      clickOsc.stop(now + 0.05)
    } catch {
      // ignore
    }
  }, [init])

  return { playHover, playSlash, playBack, playStamp, init }
}
