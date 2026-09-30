'use client'

import { useRef, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { useLang } from "@/lib/i18n/LanguageContext"
import dict from "@/lib/i18n/translations/homeServices"

// Register GSAP plugins
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

const serviceImages = [
  "/images/tocConsulting.webp",
  "/images/tocManagement.jpeg",
  "/images/tocFurniture.webp",
]

type ServiceEntry = (typeof dict)['en']['services'][number] & { image: string }

interface ServicesProps {
  id?: string
}

const Services = ({ id }: ServicesProps) => {
  const { lang } = useLang()
  const t = dict[lang]
  const services: ServiceEntry[] = t.services.map((service, index) => ({
    ...service,
    image: serviceImages[index],
  }))
  const sectionRef = useRef<HTMLDivElement>(null)
  const headerRef = useRef<HTMLDivElement>(null)
  const ctaRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const section = sectionRef.current
    const header = headerRef.current
    const cta = ctaRef.current

    if (!section || !header) return

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

    // CTA animation
    if (cta) {
      gsap.set(cta, { opacity: 0, y: 20 })

      ScrollTrigger.create({
        trigger: cta,
        start: 'top 90%',
        once: true,
        onEnter: () => {
          gsap.to(cta, {
            opacity: 1,
            y: 0,
            duration: 0.5,
            ease: 'power3.out'
          })
        }
      })
    }

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill())
    }
  }, [])

  return (
    <div
      ref={sectionRef}
      className="py-24 md:py-32 flex flex-col items-start justify-center w-full px-4 sm:px-6 md:px-12 lg:px-24 xl:px-44 bg-gradient-to-br from-white via-red-50/20 to-white relative overflow-hidden"
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
      <div ref={headerRef} className="relative z-10 flex flex-col gap-4 items-start justify-start mb-20 max-w-3xl">
        <span className="animate-header text-sm font-bold uppercase tracking-widest text-red-800">
          {t.label}
        </span>

        <h2 className="animate-header text-4xl md:text-5xl lg:text-6xl font-black tracking-tight leading-tight">
          {t.heading}
        </h2>

        <div className="divider-line h-1 bg-gradient-to-r from-red-900 to-red-700 w-32 origin-left" />

        <p className="animate-header text-base md:text-lg leading-relaxed text-gray-700 mt-4">
          {t.intro}
        </p>
      </div>

      {/* Services List */}
      <div className="relative z-10 flex flex-col gap-0 w-full">
        {services.map((service, index) => (
          <ServiceItem key={index} service={service} index={index} />
        ))}
      </div>

      {/* CTA Section */}
      <div
        ref={ctaRef}
        className="relative z-10 w-full flex justify-center mt-16"
      >
        <Link
          href="/services"
          className="group px-8 py-4 bg-gradient-to-r from-red-900 to-red-700 text-white font-semibold uppercase tracking-wider hover:from-red-800 hover:to-red-600 transition-all duration-300 flex items-center gap-2"
        >
          {t.viewAll}
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
  )
}

const ServiceItem = ({ service, index }: { service: ServiceEntry; index: number }) => {
  const itemRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const item = itemRef.current
    if (!item) return

    gsap.set(item, { opacity: 0, y: 30 })

    ScrollTrigger.create({
      trigger: item,
      start: 'top 80%',
      once: true,
      onEnter: () => {
        gsap.to(item, {
          opacity: 1,
          y: 0,
          duration: 0.6,
          delay: index * 0.15,
          ease: 'power3.out'
        })
      }
    })

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill())
    }
  }, [index])

  return (
    <div
      ref={itemRef}
      className="group border-b border-red-100 last:border-b-0 hover:bg-white/50 transition-colors duration-300"
    >
      <div className="flex flex-col md:flex-row items-start md:items-center gap-8 md:gap-12 py-12 md:py-16">
        {/* Number & Image */}
        <div className="flex flex-col md:flex-row items-start gap-8 md:w-2/5">
          <span className="text-6xl md:text-7xl font-black text-red-100 group-hover:text-red-200 transition-colors duration-500">
            {String(index + 1).padStart(2, "0")}
          </span>

          {/* Image Preview */}
          <div className="relative w-64 h-64 md:w-40 md:h-40 overflow-hidden border-2 border-red-100 group-hover:border-red-700 transition-colors duration-300">
            <Image
              src={service.image}
              alt={service.title}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
              sizes="(max-width: 768px) 256px, 160px"
            />
            <div className="absolute inset-0 bg-gradient-to-br from-red-900/20 to-transparent group-hover:from-red-900/10 transition-all duration-500 z-10" />
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 flex flex-col gap-4">
          <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold tracking-tight group-hover:translate-x-2 group-hover:text-red-900 transition-all duration-300">
            {service.title}
          </h3>

          <p className="text-base md:text-lg leading-relaxed text-gray-700 max-w-2xl">
            {service.description}
          </p>

          {/* Features */}
          <div className="flex flex-wrap gap-3 mt-2">
            {service.features.map((feature, idx) => (
              <span
                key={idx}
                className="px-4 py-2 bg-red-50 border border-red-100 text-gray-700 text-sm font-medium group-hover:bg-red-100 group-hover:border-red-200 transition-colors duration-300"
              >
                {feature}
              </span>
            ))}
          </div>
        </div>

        {/* Arrow */}
        <div className="hidden md:block">
          <svg
            className="w-12 h-12 text-red-300 group-hover:text-red-700 group-hover:translate-x-2 transition-all duration-300"
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
        </div>
      </div>
    </div>
  )
}

export default Services
