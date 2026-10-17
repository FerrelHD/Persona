export interface Point {
  x: number
  y: number
}

/**
 * Generate a multi-frequency wavy circular polygon for WAAPI clip-path transitions.
 */
export function generateWavyPolygon(
  cx: number,
  cy: number,
  r: number,
  numPoints: number = 72,
  waves1: number = 7,
  amp1: number = 0.085,
  waves2: number = 14,
  amp2: number = 0.035,
  phase: number = 0.0,
  scaleX: number = 1.25,
  scaleY: number = 1.05
): string {
  if (r <= 0.5) {
    const pt = `${cx.toFixed(1)}px ${cy.toFixed(1)}px`
    return `polygon(${new Array(numPoints).fill(pt).join(', ')})`
  }
  const points: string[] = []
  const step = (2 * Math.PI) / numPoints
  for (let i = 0; i < numPoints; i++) {
    const theta = i * step
    const wave = 1.0 + amp1 * Math.sin(waves1 * theta + phase) + amp2 * Math.cos(waves2 * theta + phase * 1.6)
    const px = cx + r * wave * Math.cos(theta) * scaleX
    const py = cy + r * wave * Math.sin(theta) * scaleY
    points.push(`${px.toFixed(1)}px ${py.toFixed(1)}px`)
  }
  return `polygon(${points.join(', ')})`
}

/**
 * Calculate the target radius needed to guarantee full screen coverage from any origin point.
 */
export function calculateTargetRadius(origin: Point): number {
  if (typeof window === 'undefined') return 1500
  const maxDist = Math.hypot(
    Math.max(origin.x, window.innerWidth - origin.x),
    Math.max(origin.y, window.innerHeight - origin.y)
  )
  return Math.ceil(maxDist * 1.85)
}

export interface WavyTransitionOptions {
  origin: Point
  duration?: number
  easing?: string
  onStart?: () => void
  onComplete?: () => void
}

/**
 * Executes a wavy reveal animation on the target element using the Web Animations API.
 */
export function animateWavyReveal(
  element: HTMLElement,
  options: WavyTransitionOptions
): Animation {
  const {
    origin,
    duration = 520,
    easing = 'cubic-bezier(0.2, 1, 0.35, 1)',
    onStart,
    onComplete,
  } = options

  onStart?.()
  const targetRadius = calculateTargetRadius(origin)

  const keyframes = [
    {
      clipPath: generateWavyPolygon(origin.x, origin.y, 0, 72, 7, 0.085, 14, 0.035, 0.0, 1.25, 1.05),
    },
    {
      clipPath: generateWavyPolygon(origin.x + 22, origin.y - 12, targetRadius * 0.45, 72, 7, 0.09, 14, 0.035, 1.2, 1.25, 1.05),
      offset: 0.38,
    },
    {
      clipPath: generateWavyPolygon(origin.x + 10, origin.y - 5, targetRadius * 0.85, 72, 7, 0.075, 14, 0.025, 2.2, 1.20, 1.05),
      offset: 0.70,
    },
    {
      clipPath: generateWavyPolygon(origin.x, origin.y, targetRadius, 72, 7, 0.05, 14, 0.015, 3.4, 1.15, 1.02),
    },
  ]

  const anim = element.animate(keyframes, {
    duration,
    easing,
    fill: 'forwards',
  })

  anim.onfinish = () => {
    element.style.clipPath = ''
    try {
      anim.cancel()
    } catch {}
    onComplete?.()
  }

  return anim
}

/**
 * Executes a wavy collapse/close animation on the target element using the Web Animations API.
 */
export function animateWavyClose(
  element: HTMLElement,
  options: WavyTransitionOptions
): Animation {
  const {
    origin,
    duration = 480,
    easing = 'cubic-bezier(0.16, 1, 0.3, 1)',
    onStart,
    onComplete,
  } = options

  onStart?.()
  const targetRadius = calculateTargetRadius(origin)

  const keyframes = [
    {
      clipPath: generateWavyPolygon(origin.x, origin.y, targetRadius, 72, 7, 0.05, 14, 0.015, 0.0, 1.15, 1.02),
    },
    {
      clipPath: generateWavyPolygon(origin.x - 10, origin.y + 5, targetRadius * 0.65, 72, 7, 0.08, 14, 0.03, 1.4, 1.2, 1.05),
      offset: 0.35,
    },
    {
      clipPath: generateWavyPolygon(origin.x - 18, origin.y + 10, targetRadius * 0.25, 72, 7, 0.09, 14, 0.035, 2.6, 1.25, 1.05),
      offset: 0.70,
    },
    {
      clipPath: generateWavyPolygon(origin.x, origin.y, 0, 72, 7, 0.085, 14, 0.035, 3.8, 1.25, 1.05),
    },
  ]

  const anim = element.animate(keyframes, {
    duration,
    easing,
    fill: 'forwards',
  })

  anim.onfinish = () => {
    element.style.clipPath = 'polygon(0 0, 0 0, 0 0)'
    try {
      anim.cancel()
    } catch {}
    onComplete?.()
  }

  return anim
}

export interface SlashWipeOptions {
  duration?: number
  easing?: string
  bladeColor?: string
  onStart?: () => void
  onComplete?: () => void
}

/**
 * Executes an authentic Persona 3 Reload diagonal slash wipe entrance transition.
 * Slices the new sub-screen in from the menu buttons across the viewport
 * with a high-speed electric cyan laser blade leading edge.
 */
export function animateSlashWipeReveal(
  element: HTMLElement,
  options: SlashWipeOptions = {}
): Animation {
  const {
    duration = 700,
    easing = 'cubic-bezier(0.2, 0.88, 0.35, 1)',
    bladeColor = '#16cffb',
    onStart,
    onComplete,
  } = options

  onStart?.()

  // 1. Create temporary high-speed electric cyan blade streak across viewport
  const blade = document.createElement('div')
  blade.className = 'fixed pointer-events-none'
  blade.style.cssText = `
    position: fixed;
    top: -50vh;
    left: 0;
    width: 7px;
    height: 200vh;
    background: #ffffff;
    box-shadow: 0 0 12px #ffffff, 0 0 24px ${bladeColor}, 0 0 48px ${bladeColor}, 0 0 80px ${bladeColor};
    transform: rotate(-28deg);
    transform-origin: center center;
    z-index: 99999;
  `
  document.body.appendChild(blade)

  // Laser blade motion synchronized with the slanted wipe edge
  const bladeAnim = blade.animate(
    [
      { transform: 'rotate(-28deg) translate3d(145vw, 0, 0)', opacity: 1 },
      { transform: 'rotate(-28deg) translate3d(65vw, 0, 0)', opacity: 1, offset: 0.38 },
      { transform: 'rotate(-28deg) translate3d(-35vw, 0, 0)', opacity: 1, offset: 0.82 },
      { transform: 'rotate(-28deg) translate3d(-65vw, 0, 0)', opacity: 0 },
    ],
    {
      duration,
      easing,
      fill: 'forwards',
    }
  )

  // 2. Element clip-path diagonal polygon wipe keyframes (Right to Left angled slice)
  const keyframes = [
    { clipPath: 'polygon(140% 0%, 100% 0%, 100% 100%, 110% 100%)' },
    { clipPath: 'polygon(75% 0%, 100% 0%, 100% 100%, 45% 100%)', offset: 0.38 },
    { clipPath: 'polygon(20% 0%, 100% 0%, 100% 100%, -10% 100%)', offset: 0.76 },
    { clipPath: 'polygon(-25% 0%, 100% 0%, 100% 100%, -55% 100%)' },
  ]

  const anim = element.animate(keyframes, {
    duration,
    easing,
    fill: 'forwards',
  })

  anim.onfinish = () => {
    element.style.clipPath = ''
    try {
      anim.cancel()
    } catch {}
    try {
      blade.remove()
    } catch {}
    onComplete?.()
  }

  bladeAnim.onfinish = () => {
    try {
      blade.remove()
    } catch {}
  }

  return anim
}


