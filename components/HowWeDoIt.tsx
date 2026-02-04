'use client'

import { useRef, useEffect } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

// Register GSAP plugins
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

const steps = [
  {
    number: "01",
    title: "Planning & Strategy",
    description: "We start by understanding your business objectives, workspace requirements, and budget. Our experts conduct thorough analysis and develop a comprehensive strategy tailored to your needs.",
    image: "/images/tocPlanning.webp",
    highlights: [
      "Needs Assessment",
      "Space Analysis",
      "Budget Planning",
      "Timeline Development",
    ],
  },
  {
    number: "02",
    title: "Design & Execution",
    description: "Our design team brings your vision to life with detailed plans and 3D visualizations. We handle everything from furniture selection to installation, ensuring flawless execution.",
    image: "/images/tocExecution.webp",
    highlights: [
      "3D Visualization",
      "Furniture Selection",
      "Project Management",
      "Quality Installation",
    ],
  },
  {
    number: "03",
    title: "Support & Optimization",
    description: "We don't stop at installation. Our team provides ongoing support, maintenance, and optimization services to ensure your workspace continues to perform at its best.",
    image: "/images/tocSupport.webp",
    highlights: [
      "Ongoing Maintenance",
      "Performance Monitoring",
      "Optimization Services",
      "24/7 Support",
    ],
  },
]

interface HowWeDoItProps {
  id?: string
}

const HowWeDoIt = ({ id }: HowWeDoItProps) => {
  const headerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const header = headerRef.current
    if (!header) return

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

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill())
    }
  }, [])

  return (
    <div
      className="py-24 md:py-32 flex flex-col items-center justify-center w-full px-4 sm:px-6 md:px-12 lg:px-24 xl:px-44 bg-gradient-to-br from-gray-50 via-white to-red-50/30 relative overflow-hidden"
      id={id}
    >
      {/* Background Grid Pattern */}
      <div className="absolute inset-0 opacity-[0.02]">
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

      {/* Header Section */}
      <div ref={headerRef} className="relative z-10 flex flex-col gap-4 items-center text-center mb-20 max-w-3xl">
        <span className="animate-header text-sm font-bold uppercase tracking-widest text-red-800">
          Our Process
        </span>

        <h2 className="animate-header text-4xl md:text-5xl lg:text-6xl font-black tracking-tight leading-tight">
          How We Do It
        </h2>

        <div className="divider-line h-1 bg-gradient-to-r from-red-900 to-red-700 w-32 origin-left" />

        <p className="animate-header text-base md:text-lg leading-relaxed text-gray-700 mt-4">
          Our proven three-step approach ensures seamless delivery from concept
          to completion, with exceptional results every time.
        </p>
      </div>

      {/* Steps */}
      <div className="relative z-10 flex flex-col gap-0 w-full">
        {steps.map((step, index) => (
          <StepItem key={index} step={step} index={index} />
        ))}
      </div>
    </div>
  )
}

const StepItem = ({ step, index }: { step: typeof steps[0]; index: number }) => {
  const ref = useRef<HTMLDivElement>(null)
  const isEven = index % 2 === 0

  useEffect(() => {
    const item = ref.current
    if (!item) return

    gsap.set(item, { opacity: 0, y: 50 })

    const imageSection = item.querySelector('.image-section')
    const contentSection = item.querySelector('.content-section')
    const highlightItems = item.querySelectorAll('.highlight-item')
    const separatorLine = item.querySelector('.separator-line')

    if (imageSection) gsap.set(imageSection, { opacity: 0, x: isEven ? -50 : 50 })
    if (contentSection) gsap.set(contentSection, { opacity: 0, x: isEven ? 50 : -50 })
    gsap.set(highlightItems, { opacity: 0, y: 20 })
    if (separatorLine) gsap.set(separatorLine, { scaleX: 0 })

    ScrollTrigger.create({
      trigger: item,
      start: 'top 80%',
      once: true,
      onEnter: () => {
        gsap.to(item, {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power3.out',
          delay: 0.2
        })

        if (imageSection) {
          gsap.to(imageSection, {
            opacity: 1,
            x: 0,
            duration: 0.8,
            ease: 'power3.out',
            delay: 0.3
          })
        }

        if (contentSection) {
          gsap.to(contentSection, {
            opacity: 1,
            x: 0,
            duration: 0.8,
            ease: 'power3.out',
            delay: 0.4
          })
        }

        gsap.to(highlightItems, {
          opacity: 1,
          y: 0,
          duration: 0.5,
          stagger: 0.1,
          ease: 'power3.out',
          delay: 0.5
        })

        if (separatorLine) {
          gsap.to(separatorLine, {
            scaleX: 1,
            duration: 0.8,
            ease: 'power3.out',
            delay: 0.6
          })
        }
      }
    })

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill())
    }
  }, [index, isEven])

  return (
    <div
      ref={ref}
      className="w-full py-12 md:py-20"
    >
      <div className={`grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-center ${isEven ? "" : "lg:grid-flow-dense"}`}>
        {/* Image Side */}
        <div className={`image-section relative ${isEven ? "" : "lg:col-start-2"}`}>
          <div className="relative h-[400px] md:h-[500px] overflow-hidden group">
            {/* Number Badge */}
            <div className="absolute top-8 left-8 z-20 bg-gradient-to-br from-red-900 to-red-700 text-white w-20 h-20 md:w-24 md:h-24 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
              <span className="text-3xl md:text-4xl font-black">{step.number}</span>
            </div>

            {/* Image */}
            <div
              style={{
                backgroundImage: `url(${step.image})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
              className="absolute inset-0 transition-transform duration-700 group-hover:scale-105"
            />

            {/* Overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-red-900/30 to-transparent group-hover:from-red-900/20 transition-all duration-500" />
          </div>
        </div>

        {/* Content Side */}
        <div
          className={`content-section flex flex-col gap-6 ${isEven ? "" : "lg:col-start-1 lg:row-start-1"}`}
        >
          <h3 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight">
            {step.title}
          </h3>

          <p className="text-base md:text-lg leading-relaxed text-gray-700">
            {step.description}
          </p>

          {/* Highlights */}
          <div className="grid grid-cols-2 gap-3">
            {step.highlights.map((highlight, idx) => (
              <div
                key={idx}
                className="highlight-item flex items-center gap-2"
              >
                <div className="w-2 h-2 bg-red-700 rounded-full" />
                <span className="text-sm md:text-base font-medium text-gray-800">
                  {highlight}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Separator Line (not on last item) */}
      {index < steps.length - 1 && (
        <div
          className="separator-line w-full h-px bg-gradient-to-r from-transparent via-red-200 to-transparent mt-12 md:mt-20 origin-center"
        />
      )}
    </div>
  )
}

export default HowWeDoIt
