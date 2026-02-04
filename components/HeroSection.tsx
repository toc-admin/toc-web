'use client'

import { useRef, useEffect, useState } from "react"
import Link from "next/link"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

// Register GSAP plugins
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

interface HeroSectionProps {
  id?: string
}

const HeroSection = ({ id }: HeroSectionProps) => {
  const [isVisible, setIsVisible] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const backgroundRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const labelRef = useRef<HTMLSpanElement>(null)
  const headline1Ref = useRef<HTMLDivElement>(null)
  const headline2Ref = useRef<HTMLDivElement>(null)
  const headline3Ref = useRef<HTMLDivElement>(null)
  const dividerRef = useRef<HTMLDivElement>(null)
  const subtextRef = useRef<HTMLParagraphElement>(null)
  const ctaRef = useRef<HTMLDivElement>(null)
  const scrollIndicatorRef = useRef<HTMLDivElement>(null)
  const bottomLineRef = useRef<HTMLDivElement>(null)

  // Parallax scroll effect
  useEffect(() => {
    const container = containerRef.current
    const background = backgroundRef.current
    const content = contentRef.current

    if (!container || !background || !content) return

    // Parallax for background
    const bgTrigger = ScrollTrigger.create({
      trigger: container,
      start: 'top top',
      end: 'bottom top',
      scrub: 0.5,
      onUpdate: (self) => {
        const progress = self.progress
        gsap.set(background, {
          y: `${progress * 50}%`,
          scale: 1 + progress * 0.1,
        })
        gsap.set(content, {
          opacity: 1 - progress * 2,
        })
      },
    })

    return () => {
      bgTrigger.kill()
    }
  }, [])

  // Entrance animations
  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 50)
    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    if (!isVisible) return

    const ease = [0.22, 1, 0.36, 1]
    const easeString = 'power3.out'

    // Create master timeline
    const tl = gsap.timeline()

    // Label animation
    if (labelRef.current) {
      gsap.set(labelRef.current, { opacity: 0, y: 20 })
      tl.to(labelRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: easeString,
      }, 0.2)
    }

    // Headlines staggered
    const headlines = [headline1Ref.current, headline2Ref.current, headline3Ref.current]
    headlines.forEach((el, i) => {
      if (el) {
        gsap.set(el, { opacity: 0, y: 40 })
        tl.to(el, {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: easeString,
        }, 0.3 + i * 0.2)
      }
    })

    // Divider line
    if (dividerRef.current) {
      gsap.set(dividerRef.current, { scaleX: 0 })
      tl.to(dividerRef.current, {
        scaleX: 1,
        duration: 1.2,
        ease: easeString,
      }, 0.9)
    }

    // Subtext
    if (subtextRef.current) {
      gsap.set(subtextRef.current, { opacity: 0, y: 20 })
      tl.to(subtextRef.current, {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: easeString,
      }, 1.1)
    }

    // CTA buttons
    if (ctaRef.current) {
      gsap.set(ctaRef.current, { opacity: 0, y: 20 })
      tl.to(ctaRef.current, {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: easeString,
      }, 1.3)
    }

    // Scroll indicator
    if (scrollIndicatorRef.current) {
      gsap.set(scrollIndicatorRef.current, { opacity: 0 })
      tl.to(scrollIndicatorRef.current, {
        opacity: 1,
        duration: 1,
      }, 1.5)
    }

    // Bottom accent line
    if (bottomLineRef.current) {
      gsap.set(bottomLineRef.current, { scaleX: 0 })
      tl.to(bottomLineRef.current, {
        scaleX: 1,
        duration: 1.5,
        ease: easeString,
      }, 1.6)
    }

    return () => {
      tl.kill()
    }
  }, [isVisible])

  // Scroll indicator bounce animation
  useEffect(() => {
    const scrollDot = scrollIndicatorRef.current?.querySelector('.scroll-dot')
    if (!scrollDot) return

    const bounceAnim = gsap.to(scrollDot, {
      y: 12,
      duration: 1,
      repeat: -1,
      yoyo: true,
      ease: 'power1.inOut',
    })

    return () => {
      bounceAnim.kill()
    }
  }, [isVisible])

  return (
    <div
      ref={containerRef}
      id={id}
      className="relative h-screen w-full overflow-hidden"
    >
      {/* Parallax Background */}
      <div
        ref={backgroundRef}
        className="absolute inset-0 w-full h-[120%]"
      >
        <div
          style={{
            backgroundImage: `linear-gradient(to top, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.6) 40%, rgba(0,0,0,0.1) 100%), url(/images/toc-hero.jpeg)`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
          className="w-full h-full"
        />
      </div>

      {/* Grid Pattern Overlay */}
      <div className="absolute inset-0 opacity-[0.02] z-[1]">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `
              linear-gradient(to right, #7C2D3A 1px, transparent 1px),
              linear-gradient(to bottom, #7C2D3A 1px, transparent 1px)
            `,
            backgroundSize: "60px 60px",
          }}
        />
      </div>

      {/* Content Container */}
      <div
        ref={contentRef}
        className="relative z-10 h-full flex flex-col items-start justify-end px-4 sm:px-6 md:px-12 lg:px-24 xl:px-44 pb-24 md:pb-32"
      >
        {/* Top Label */}
        <span
          ref={labelRef}
          className="text-sm font-bold uppercase tracking-widest text-red-400 mb-6 opacity-0"
        >
          Premium Workspace Solutions
        </span>

        {/* Main Headline */}
        <div className="flex flex-col gap-3 max-w-5xl mb-6">
          <div
            ref={headline1Ref}
            className="overflow-hidden opacity-0"
          >
            <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-white leading-[1.1] tracking-tight">
              We Create
            </h1>
          </div>

          <div
            ref={headline2Ref}
            className="overflow-hidden opacity-0"
          >
            <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-black leading-[1.1] tracking-tight">
              <span className="bg-gradient-to-r from-red-400 via-red-500 to-red-600 bg-clip-text text-transparent">
                Places
              </span>{" "}
              <span className="text-white">Where</span>
            </h1>
          </div>

          <div
            ref={headline3Ref}
            className="overflow-hidden opacity-0"
          >
            <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-white leading-[1.1] tracking-tight">
              People Love To Work
            </h1>
          </div>
        </div>

        {/* Divider Line */}
        <div
          ref={dividerRef}
          className="h-1 bg-gradient-to-r from-red-900 via-red-700 to-transparent w-full max-w-md origin-left mb-6"
          style={{ transform: 'scaleX(0)' }}
        />

        {/* Subtext */}
        <p
          ref={subtextRef}
          className="text-base md:text-lg text-white/90 font-medium max-w-2xl leading-relaxed mb-8 opacity-0"
        >
          Transforming workspaces into inspiring environments that drive
          productivity, foster collaboration, and elevate business success.
        </p>

        {/* CTA Buttons */}
        <div
          ref={ctaRef}
          className="flex flex-wrap gap-4 opacity-0"
        >
          <Link
            href="/services"
            className="group px-8 py-4 bg-gradient-to-r from-red-900 to-red-700 text-white font-semibold uppercase tracking-wider hover:from-red-800 hover:to-red-600 transition-all duration-300 flex items-center gap-2"
          >
            Explore Services
            <svg
              className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 8l4 4m0 0l-4 4m4-4H3"
              />
            </svg>
          </Link>
          <Link
            href="/contact"
            className="group px-8 py-4 bg-transparent border-2 border-white text-white font-semibold uppercase tracking-wider hover:bg-white hover:text-black transition-all duration-300 flex items-center gap-2"
          >
            Contact Us
            <svg
              className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 8l4 4m0 0l-4 4m4-4H3"
              />
            </svg>
          </Link>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div
        ref={scrollIndicatorRef}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20 opacity-0"
      >
        <div className="flex flex-col items-center gap-2">
          <span className="text-white/70 text-xs font-bold uppercase tracking-widest">
            Scroll Down
          </span>
          <div className="w-6 h-10 border-2 border-white/30 rounded-full flex items-start justify-center p-2">
            <div className="scroll-dot w-1.5 h-1.5 bg-red-500 rounded-full" />
          </div>
        </div>
      </div>

      {/* Bottom Accent Line */}
      <div
        ref={bottomLineRef}
        className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-red-700 to-transparent origin-center z-20"
        style={{ transform: 'scaleX(0)' }}
      />
    </div>
  )
}

export default HeroSection
