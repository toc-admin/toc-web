'use client'

import { useRef, useEffect, useState, useCallback, RefObject } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

// Register GSAP plugins
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

/**
 * Hook to detect if an element is in view (replacement for Framer Motion's useInView)
 */
export function useGSAPInView(
  options: {
    threshold?: number
    once?: boolean
    margin?: string
  } = {}
): [RefObject<HTMLDivElement | null>, boolean] {
  const { threshold = 0.3, once = true, margin = '0px' } = options
  const ref = useRef<HTMLDivElement>(null)
  const [isInView, setIsInView] = useState(false)

  useEffect(() => {
    const element = ref.current
    if (!element) return

    // Parse margin string (e.g., "0px 0px -100px 0px")
    const marginParts = margin.split(' ')
    const topMargin = parseInt(marginParts[0]) || 0
    const bottomMargin = parseInt(marginParts[2]) || parseInt(marginParts[0]) || 0

    const trigger = ScrollTrigger.create({
      trigger: element,
      start: `top ${100 - threshold * 100}%`,
      end: `bottom ${threshold * 100}%`,
      onEnter: () => setIsInView(true),
      onLeave: once ? undefined : () => setIsInView(false),
      onEnterBack: once ? undefined : () => setIsInView(true),
      onLeaveBack: once ? undefined : () => setIsInView(false),
    })

    return () => {
      trigger.kill()
    }
  }, [threshold, once, margin])

  return [ref, isInView]
}

/**
 * Hook for scroll-based transforms (replacement for Framer Motion's useScroll + useTransform)
 */
export function useGSAPScroll(
  options: {
    start?: string
    end?: string
    scrub?: boolean | number
  } = {}
) {
  const { start = 'top top', end = 'bottom top', scrub = true } = options
  const ref = useRef<HTMLDivElement>(null)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const element = ref.current
    if (!element) return

    const trigger = ScrollTrigger.create({
      trigger: element,
      start,
      end,
      scrub: scrub === true ? 0.5 : scrub,
      onUpdate: (self) => {
        setProgress(self.progress)
      },
    })

    return () => {
      trigger.kill()
    }
  }, [start, end, scrub])

  return { ref, progress }
}

/**
 * Transform a progress value (0-1) to a range of values
 */
export function useTransformValue(
  progress: number,
  inputRange: [number, number],
  outputRange: [number | string, number | string]
): number | string {
  const [inStart, inEnd] = inputRange
  const [outStart, outEnd] = outputRange

  // Clamp progress to input range
  const clampedProgress = Math.max(inStart, Math.min(inEnd, progress))

  // Normalize to 0-1
  const normalizedProgress = (clampedProgress - inStart) / (inEnd - inStart)

  // If both outputs are numbers, interpolate
  if (typeof outStart === 'number' && typeof outEnd === 'number') {
    return outStart + (outEnd - outStart) * normalizedProgress
  }

  // If strings (like percentages), parse and interpolate
  if (typeof outStart === 'string' && typeof outEnd === 'string') {
    const startNum = parseFloat(outStart)
    const endNum = parseFloat(outEnd)
    const unit = outStart.replace(/[\d.-]/g, '')
    return `${startNum + (endNum - startNum) * normalizedProgress}${unit}`
  }

  return outStart
}

/**
 * Hook for entrance animations on mount
 */
export function useGSAPEntrance(
  options: {
    duration?: number
    delay?: number
    ease?: string
    from?: gsap.TweenVars
  } = {}
) {
  const {
    duration = 0.8,
    delay = 0,
    ease = 'power3.out',
    from = { opacity: 0, y: 30 },
  } = options
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const element = ref.current
    if (!element) return

    gsap.fromTo(
      element,
      from,
      {
        opacity: 1,
        y: 0,
        x: 0,
        scale: 1,
        duration,
        delay,
        ease,
      }
    )
  }, [duration, delay, ease, from])

  return ref
}

/**
 * Hook for scroll-triggered entrance animations
 */
export function useGSAPScrollEntrance(
  options: {
    duration?: number
    delay?: number
    ease?: string
    from?: gsap.TweenVars
    start?: string
    once?: boolean
  } = {}
) {
  const {
    duration = 0.8,
    delay = 0,
    ease = 'power3.out',
    from = { opacity: 0, y: 30 },
    start = 'top 80%',
    once = true,
  } = options
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const element = ref.current
    if (!element) return

    gsap.set(element, from)

    const trigger = ScrollTrigger.create({
      trigger: element,
      start,
      once,
      onEnter: () => {
        gsap.to(element, {
          opacity: 1,
          y: 0,
          x: 0,
          scale: 1,
          duration,
          delay,
          ease,
        })
      },
    })

    return () => {
      trigger.kill()
    }
  }, [duration, delay, ease, from, start, once])

  return ref
}

/**
 * Hook for staggered children animations
 */
export function useGSAPStagger(
  options: {
    selector?: string
    duration?: number
    stagger?: number
    delay?: number
    ease?: string
    from?: gsap.TweenVars
    start?: string
    once?: boolean
  } = {}
) {
  const {
    selector = '> *',
    duration = 0.6,
    stagger = 0.1,
    delay = 0,
    ease = 'power3.out',
    from = { opacity: 0, y: 30 },
    start = 'top 80%',
    once = true,
  } = options
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const container = ref.current
    if (!container) return

    const children = container.querySelectorAll(selector)
    gsap.set(children, from)

    const trigger = ScrollTrigger.create({
      trigger: container,
      start,
      once,
      onEnter: () => {
        gsap.to(children, {
          opacity: 1,
          y: 0,
          x: 0,
          scale: 1,
          duration,
          delay,
          stagger,
          ease,
        })
      },
    })

    return () => {
      trigger.kill()
    }
  }, [selector, duration, stagger, delay, ease, from, start, once])

  return ref
}

/**
 * Create a timeline animation programmatically
 */
export function createTimeline(
  options?: gsap.TimelineVars
): gsap.core.Timeline {
  return gsap.timeline(options)
}

/**
 * Cleanup function for all ScrollTriggers in a component
 */
export function cleanupScrollTriggers(triggers: ScrollTrigger[]) {
  triggers.forEach((trigger) => trigger.kill())
}

/**
 * Refresh all ScrollTriggers (useful after DOM changes)
 */
export function refreshScrollTriggers() {
  ScrollTrigger.refresh()
}
