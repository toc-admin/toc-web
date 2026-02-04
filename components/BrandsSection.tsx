'use client'

import { useRef, useEffect } from "react"
import Link from "next/link"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

// Register GSAP plugins
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

interface Brand {
  logo: string
  bg: string
  alt: string
  featured?: boolean
  isLarge?: boolean
  link: string
}

const brands: Brand[] = [
  { logo: "/logos/Haworth_Logo_Black.png", bg: "/images/haworthback.jpeg", alt: "Haworth", featured: true, link: "https://www.haworth.com" },
  { logo: "/logos/boconcept_logo_white.png", bg: "/images/boConceptBg.webp", alt: "BoConcept", link: "https://www.boconcept.com" },
  { logo: "/logos/logo-boss-design-brand.png", bg: "/images/bossDesignBg.webp", alt: "Boss Design", link: "https://www.bossdesign.com" },
  { logo: "/logos/brunner_logo_transparent.png", bg: "/images/brunnerBg.webp", alt: "Brunner", link: "https://brunner-group.com" },
  { logo: "/logos/BuzziSpace.png", bg: "/images/buzziBg.webp", alt: "BuzziSpace", isLarge: true, link: "https://www.buzzi.space" },
  { logo: "/logos/Cappellini.png", bg: "/images/cappeliniBg.webp", alt: "Cappellini", link: "https://www.cappellini.com" },
  { logo: "/logos/GAN.png", bg: "/images/ganBg.webp", alt: "GAN", link: "https://www.gan-rugs.com/" },
  { logo: "/logos/hushoffice_logo_white.png", bg: "/images/hushofficeBg.webp", alt: "Hush Office", isLarge: true, link: "https://www.hushoffice.com" },
  { logo: "/logos/PabloDesigns.png", bg: "/images/pabloBg.webp", alt: "Pablo Designs", link: "https://www.pablodesign.com" },
  { logo: "/logos/cassina.svg", bg: "/images/cassinaBg.png", alt: "Cassina", link: "https://www.cassina.com/ww/en.html" },
  { logo: "/logos/vkLight.png", bg: "/images/vkLightBg.jpg", alt: "VK Light", isLarge: true, link: "https://vkled.gr/en/" },
  { logo: "/logos/infiniti.webp", bg: "/images/infinitiBg.jpg", alt: "Infiniti Design", isLarge: true, link: "https://www.infinitidesign.it/en/" },
]

interface BrandsSectionProps {
  id?: string
}

const BrandsSection = ({ id }: BrandsSectionProps) => {
  const headerRef = useRef<HTMLDivElement>(null)
  const ctaRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const header = headerRef.current
    const cta = ctaRef.current

    if (!header) return

    // Header animations
    const headerElements = header.querySelectorAll('.animate-header')
    gsap.set(headerElements, { opacity: 0, y: 30 })

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
          duration: 0.8,
          stagger: 0.1,
          ease: 'power3.out'
        })
        if (dividerLine) {
          gsap.to(dividerLine, {
            scaleX: 1,
            duration: 1,
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
            duration: 0.8,
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
      id={id}
      className="flex flex-col gap-12 items-start justify-start px-4 sm:px-6 md:px-12 lg:px-24 xl:px-44 py-24 md:py-32 bg-gray-50 relative overflow-hidden"
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

      {/* Header */}
      <div
        ref={headerRef}
        className="relative z-10 flex flex-col gap-4 max-w-4xl"
      >
        <span className="animate-header text-sm font-bold uppercase tracking-widest text-red-800">
          Our Partners
        </span>

        <h2 className="animate-header text-4xl sm:text-5xl md:text-6xl font-black leading-tight tracking-tight">
          Partnering with
          <br />
          <span className="bg-gradient-to-r from-red-900 via-red-700 to-red-600 bg-clip-text text-transparent">
            Industry Leaders
          </span>
        </h2>

        <div className="divider-line h-1 bg-gradient-to-r from-red-900 to-red-700 w-32 origin-left" />

        <p className="animate-header text-base md:text-lg text-gray-700 leading-relaxed mt-2">
          We collaborate with world-renowned furniture and design brands to deliver
          exceptional quality and innovation in every project.
        </p>
      </div>

      {/* Featured Brand - Full Width */}
      <div className="relative z-10 w-full">
        <BrandCard
          brand={brands[0]}
          featured={true}
          index={0}
        />
      </div>

      {/* Brands Grid - 2 Columns */}
      <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 w-full mt-8">
        {brands.slice(1).map((brand, index) => (
          <BrandCard
            key={index}
            brand={brand}
            index={index + 1}
          />
        ))}
      </div>

      {/* Bottom CTA */}
      <div
        ref={ctaRef}
        className="relative z-10 w-full flex flex-col md:flex-row items-center justify-between gap-6 pt-12 border-t-2 border-red-100 mt-8"
      >
        <div className="flex flex-col gap-2">
          <h3 className="text-2xl md:text-3xl font-bold">
            Interested in partnering with us?
          </h3>
          <p className="text-gray-600">
            Let&apos;s discuss how we can bring premium design to your project.
          </p>
        </div>
        <Link
          href="/contact"
          className="group px-8 py-4 bg-gradient-to-r from-red-900 to-red-700 text-white font-semibold uppercase tracking-wider hover:from-red-800 hover:to-red-600 transition-all duration-300 flex items-center gap-2 whitespace-nowrap"
        >
          Get In Touch
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

const BrandCard = ({ brand, featured = false, index }: { brand: Brand; featured?: boolean; index: number }) => {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const card = ref.current
    if (!card) return

    gsap.set(card, { opacity: 0, y: 50 })

    const logo = card.querySelector('.brand-logo')
    if (logo) gsap.set(logo, { opacity: 0, scale: 0.9 })

    const badge = card.querySelector('.featured-badge')
    if (badge) gsap.set(badge, { opacity: 0, x: 50 })

    ScrollTrigger.create({
      trigger: card,
      start: 'top 85%',
      once: true,
      onEnter: () => {
        gsap.to(card, {
          opacity: 1,
          y: 0,
          duration: 0.8,
          delay: index * 0.1,
          ease: 'power3.out'
        })
        if (logo) {
          gsap.to(logo, {
            opacity: 1,
            scale: 1,
            duration: 0.6,
            delay: index * 0.1 + 0.2,
            ease: 'power3.out'
          })
        }
        if (badge) {
          gsap.to(badge, {
            opacity: 1,
            x: 0,
            duration: 0.6,
            delay: 0.5,
            ease: 'power3.out'
          })
        }
      }
    })

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill())
    }
  }, [index])

  return (
    <Link href={brand.link} target="_blank" rel="noopener noreferrer">
      <div
        ref={ref}
        className={`group relative overflow-hidden cursor-pointer border-2 border-red-100 hover:border-red-700 transition-colors duration-300 ${
          featured ? 'h-[500px] md:h-[600px]' : 'h-[400px] md:h-[450px]'
        }`}
      >
        {/* Background Image */}
        <div
          style={{
            backgroundImage: `linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(124,45,58,0.3) 50%, rgba(0,0,0,0.2) 100%), url(${brand.bg})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
          className="absolute inset-0 transition-transform duration-500 group-hover:scale-105"
        />

        {/* Overlay gradient that intensifies on hover */}
        <div className="absolute inset-0 bg-gradient-to-br from-red-900/0 to-black/0 group-hover:from-red-900/10 group-hover:to-black/20 transition-all duration-500" />

        {/* Content */}
        <div className="relative z-10 h-full flex flex-col items-center justify-center p-8">
          {/* Logo */}
          <img
            alt={brand.alt}
            src={brand.logo}
            className={`brand-logo object-contain z-10 transition-all duration-300 group-hover:scale-105 group-hover:brightness-110 ${
              brand.isLarge
                ? 'h-32 md:h-40'
                : featured
                  ? 'w-72 md:w-96 h-24 md:h-32'
                  : 'w-56 md:w-72 h-20 md:h-24'
            }`}
          />

          {/* Hover Info */}
          <div className="absolute bottom-8 left-8 right-8 opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500">
            <div className="flex items-center justify-between">
              <span className="text-white font-semibold text-lg">
                {brand.alt}
              </span>
              <svg
                className="w-6 h-6 text-red-400 transform group-hover:translate-x-2 transition-transform duration-300"
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

        {/* Corner Badge for Featured */}
        {featured && (
          <div className="featured-badge absolute top-6 right-6 bg-gradient-to-r from-red-900 to-red-700 text-white px-4 py-2 text-sm font-bold uppercase tracking-wider z-20">
            Featured Partner
          </div>
        )}
      </div>
    </Link>
  )
}

export default BrandsSection
