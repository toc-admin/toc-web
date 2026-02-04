'use client'

import { useRef, useEffect } from "react"
import Link from "next/link"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

// Register GSAP plugins
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

const highlights = [
  {
    title: "Expert Consultation",
    description: "Strategic workspace planning tailored to your business needs and growth objectives.",
    icon: (
      <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
  },
  {
    title: "Premium Quality",
    description: "World-class furniture and materials from leading global brands.",
    icon: (
      <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
      </svg>
    ),
  },
  {
    title: "Full-Service Support",
    description: "From concept to completion, we manage every aspect of your workspace transformation.",
    icon: (
      <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 11.5V14m0-2.5v-6a1.5 1.5 0 113 0m-3 6a1.5 1.5 0 00-3 0v2a7.5 7.5 0 0015 0v-5a1.5 1.5 0 00-3 0m-6-3V11m0-5.5v-1a1.5 1.5 0 013 0v1m0 0V11m0-5.5a1.5 1.5 0 013 0v3m0 0V11" />
      </svg>
    ),
  },
  {
    title: "Proven Results",
    description: "Delivering measurable improvements in productivity and employee satisfaction.",
    icon: (
      <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
      </svg>
    ),
  },
]

interface AboutSectionProps {
  id?: string
}

const AboutSection = ({ id }: AboutSectionProps) => {
  const sectionRef = useRef<HTMLDivElement>(null)
  const headerRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const highlightsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const section = sectionRef.current
    const header = headerRef.current
    const content = contentRef.current
    const highlightsContainer = highlightsRef.current

    if (!section || !header || !content || !highlightsContainer) return

    // Header animations
    const headerElements = header.querySelectorAll('.animate-header')
    gsap.set(headerElements, { opacity: 0, y: 20 })

    const dividerLine = header.querySelector('.divider-line')
    if (dividerLine) gsap.set(dividerLine, { scaleX: 0 })

    ScrollTrigger.create({
      trigger: header,
      start: 'top 80%',
      once: true,
      onEnter: () => {
        gsap.to(headerElements, {
          opacity: 1,
          y: 0,
          duration: 0.5,
          stagger: 0.1,
          ease: 'power3.out'
        })
        if (dividerLine) {
          gsap.to(dividerLine, {
            scaleX: 1,
            duration: 0.6,
            delay: 0.2,
            ease: 'power3.out'
          })
        }
      }
    })

    // Content section (image and text)
    const imageSection = content.querySelector('.image-section')
    const textSection = content.querySelector('.text-section')

    if (imageSection) gsap.set(imageSection, { opacity: 0, x: -50 })
    if (textSection) gsap.set(textSection, { opacity: 0, x: 50 })

    ScrollTrigger.create({
      trigger: content,
      start: 'top 70%',
      once: true,
      onEnter: () => {
        if (imageSection) {
          gsap.to(imageSection, { opacity: 1, x: 0, duration: 0.8, ease: 'power3.out' })
        }
        if (textSection) {
          gsap.to(textSection, { opacity: 1, x: 0, duration: 0.8, delay: 0.2, ease: 'power3.out' })
        }
      }
    })

    // Highlights grid
    const highlightCards = highlightsContainer.querySelectorAll('.highlight-card')
    gsap.set(highlightCards, { opacity: 0, y: 30 })

    ScrollTrigger.create({
      trigger: highlightsContainer,
      start: 'top 80%',
      once: true,
      onEnter: () => {
        gsap.to(highlightCards, {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.15,
          ease: 'power3.out'
        })
      }
    })

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill())
    }
  }, [])

  return (
    <div
      ref={sectionRef}
      className="py-24 md:py-32 flex flex-col items-center justify-center w-full px-4 sm:px-6 md:px-12 lg:px-24 xl:px-44 bg-white relative overflow-hidden"
      id={id}
    >
      {/* Background Accent */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-bl from-red-50/30 to-transparent pointer-events-none" />

      {/* Header Section */}
      <div ref={headerRef} className="relative z-10 flex flex-col gap-4 items-center text-center mb-16 max-w-3xl">
        <span className="animate-header text-sm font-bold uppercase tracking-widest text-red-800">
          About Us
        </span>

        <h2 className="animate-header text-4xl md:text-5xl lg:text-6xl font-black tracking-tight leading-tight">
          Who We Are
        </h2>

        <div className="divider-line h-1 bg-gradient-to-r from-red-900 to-red-700 w-32 origin-left" />

        <p className="animate-header text-base md:text-lg leading-relaxed text-gray-700 mt-4">
          With over 10 years of experience, we are Croatia&apos;s leading provider
          of comprehensive office solutions, combining expert consulting,
          coworking management services, interior design and office furniture.
        </p>
      </div>

      {/* Two-Column Content */}
      <div
        ref={contentRef}
        className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-16 w-full mb-20"
      >
        {/* Left Column - Image */}
        <div className="image-section relative h-[400px] md:h-[500px] overflow-hidden">
          <div
            style={{
              backgroundImage: `url(/images/tocAbout.webp)`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
            className="absolute inset-0 transition-transform duration-500 hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-red-900/20 to-transparent" />
        </div>

        {/* Right Column - Content */}
        <div className="text-section flex flex-col gap-6 justify-center">
          <h3 className="text-3xl md:text-4xl font-bold tracking-tight">
            Transforming Places Into Productive Environments
          </h3>

          <p className="text-base md:text-lg leading-relaxed text-gray-700">
            Founded with a vision to revolutionize how businesses approach their
            workspace, The Office Company has grown to become Croatia&apos;s most
            trusted partner in office solutions.
          </p>

          <p className="text-base md:text-lg leading-relaxed text-gray-700">
            We combine deep industry expertise with a passion for design,
            delivering spaces that not only look exceptional but drive real
            business results. Our team of specialists works closely with each
            client to understand their unique needs and craft solutions that
            exceed expectations.
          </p>

          <p className="text-base md:text-lg leading-relaxed text-gray-700">
            We create workspaces that inspire, motivate,
            and perform, regardless of the size of your organization.
          </p>

          <Link
            href="/about"
            className="group mt-4 px-8 py-4 bg-gradient-to-r from-red-900 to-red-700 text-white font-semibold uppercase tracking-wider hover:from-red-800 hover:to-red-600 transition-all duration-300 flex items-center gap-2 self-start"
          >
            Learn More About Us
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

      {/* Highlights Grid */}
      <div
        ref={highlightsRef}
        className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 w-full"
      >
        {highlights.map((highlight, index) => (
          <div
            key={index}
            className="highlight-card group bg-white border-2 border-red-100 p-8 hover:border-red-700 hover:shadow-xl transition-all duration-300"
          >
            <div className="text-red-700 mb-4 group-hover:scale-110 transition-transform duration-300">
              {highlight.icon}
            </div>
            <h4 className="text-xl md:text-2xl font-bold mb-3 group-hover:text-red-900 transition-colors duration-300">
              {highlight.title}
            </h4>
            <p className="text-base md:text-lg leading-relaxed text-gray-700">
              {highlight.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default AboutSection
