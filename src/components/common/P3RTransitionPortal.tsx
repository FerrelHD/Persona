import React, { useRef, useImperativeHandle, forwardRef, useState } from 'react'
import { animateWavyReveal, animateWavyClose, Point } from '@/utils/wavyTransition'

export interface P3RTransitionPortalHandle {
  reveal: (origin: Point, onComplete?: () => void) => void
  close: (origin: Point, onComplete?: () => void) => void
}

interface P3RTransitionPortalProps {
  color?: string
  className?: string
  children?: React.ReactNode
}

export const P3RTransitionPortal = forwardRef<P3RTransitionPortalHandle, P3RTransitionPortalProps>(
  ({ color = '#015fcc', className = '', children }, ref) => {
    const portalRef = useRef<HTMLDivElement>(null)
    const [isActive, setIsActive] = useState(false)

    useImperativeHandle(ref, () => ({
      reveal(origin: Point, onComplete?: () => void) {
        if (!portalRef.current) return
        setIsActive(true)
        animateWavyReveal(portalRef.current, {
          origin,
          onComplete: () => {
            onComplete?.()
          },
        })
      },
      close(origin: Point, onComplete?: () => void) {
        if (!portalRef.current) return
        animateWavyClose(portalRef.current, {
          origin,
          onComplete: () => {
            setIsActive(false)
            onComplete?.()
          },
        })
      },
    }))

    return (
      <div
        ref={portalRef}
        className={`fixed inset-0 z-[9990] pointer-events-none will-change-[clip-path] ${
          isActive ? 'opacity-100' : 'opacity-0'
        } ${className}`}
        style={{
          backgroundColor: color,
        }}
      >
        {children}
      </div>
    )
  }
)

P3RTransitionPortal.displayName = 'P3RTransitionPortal'

