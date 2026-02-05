'use client'

import { ReactLenis, useLenis } from 'lenis/react'
import { ReactNode } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

interface SmoothScrollProps {
  children: ReactNode
}

// Sync Lenis scroll events to GSAP ScrollTrigger so triggers fire correctly
function LenisScrollTriggerSync() {
  useLenis(() => {
    ScrollTrigger.update()
  })
  return null
}

export default function SmoothScroll({ children }: SmoothScrollProps) {
  return (
    <ReactLenis
      root
      options={{
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        orientation: 'vertical',
        gestureOrientation: 'vertical',
        smoothWheel: true,
        wheelMultiplier: 1,
        touchMultiplier: 2,
        infinite: false,
      }}
    >
      <LenisScrollTriggerSync />
      {children}
    </ReactLenis>
  )
}
