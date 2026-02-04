'use client'

import { useRef, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

// Register GSAP plugins
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

// Services data
const services = [
  {
    id: "consulting",
    number: "01",
    title: "Serviced Office Consulting",
    subtitle: "Strategic Workspace Solutions For Real Estate Owners",
    shortDescription: "Expert guidance to optimize your workspace performance, from concept to completion.",
    description:
      "Our mission at The Office Company is to revolutionise the office experience by providing innovative, flexible workspace solutions for end users and at the same time providing serviced office consulting services and setting up co-working spaces with premium furniture and office equipment, dedicated to offering service on any type of location, regardless of the type of the building.",
    image: "/images/tocConsulting.webp",
    features: [
      "Customizable office spaces",
      "Premium furniture selection",
      "Location-agnostic solutions",
      "End-to-end consulting",
    ],
    benefits: [
      "Reduce setup costs by 40%",
      "Launch-ready in 30 days",
      "Proven ROI models",
    ],
  },
  {
    id: "management",
    number: "02",
    title: "Serviced Office Management",
    subtitle: "Expert Operational Excellence",
    shortDescription: "Comprehensive management services that keep your office running smoothly.",
    description:
      "The leadership team at The Office Company is composed of industry veterans with diverse backgrounds in real estate management, serviced office management, interior design and office equipment supplies - ensuring a well-rounded approach to decision-making and strategy development. Our organisational structure promotes collaboration and innovation, with cross-functional teams that empower employees at all levels.",
    image: "/images/tocManagement.jpeg",
    features: [
      "Industry veteran leadership",
      "Open book approach",
      "Transparent communication",
      "Agile market response",
    ],
    benefits: [
      "24/7 operational support",
      "95%+ tenant satisfaction",
      "Streamlined processes",
    ],
  },
  {
    id: "design",
    number: "03",
    title: "Office Design & Furniture",
    subtitle: "Spaces That Inspire",
    shortDescription: "Transform your space with innovative design and premium furniture solutions.",
    description:
      "Well-being, both mental and physical, has become paramount, driving the design of environments that support holistic health and productivity. In the hybrid society, well-being is not separate from work but something to be maintained continuously. Together with world top office furniture brands we create places where people love to be!",
    image: "/images/tocFurniture.webp",
    features: [
      "Holistic well-being focus",
      "World-class furniture brands",
      "Flexible shared spaces",
      "Hybrid work optimization",
    ],
    benefits: [
      "Boost productivity 25%",
      "Premium brand partnerships",
      "Ergonomic excellence",
    ],
  },
]

// Why choose us benefits
const benefits = [
  {
    icon: (
      <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
    title: "Fast Implementation",
    description: "From concept to launch in weeks, not months. Our proven processes ensure rapid deployment.",
  },
  {
    icon: (
      <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
    title: "Industry Expertise",
    description: "Decades of combined experience in real estate, design, and office management.",
  },
  {
    icon: (
      <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z" />
      </svg>
    ),
    title: "Tailored Solutions",
    description: "No cookie-cutter approaches. Every solution is customized to your unique needs.",
  },
  {
    icon: (
      <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    title: "Cost Efficiency",
    description: "Maximize your investment with optimized space planning and resource allocation.",
  },
  {
    icon: (
      <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 11.5V14m0-2.5v-6a1.5 1.5 0 113 0m-3 6a1.5 1.5 0 00-3 0v2a7.5 7.5 0 0015 0v-5a1.5 1.5 0 00-3 0m-6-3V11m0-5.5v-1a1.5 1.5 0 013 0v1m0 0V11m0-5.5a1.5 1.5 0 013 0v3m0 0V11" />
      </svg>
    ),
    title: "Partnership Approach",
    description: "We're in it for the long haul, providing ongoing support and strategic guidance.",
  },
  {
    icon: (
      <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
      </svg>
    ),
    title: "Proven Track Record",
    description: "Hundreds of successful projects across diverse industries and building types.",
  },
]

// Process steps
const processSteps = [
  {
    number: "01",
    title: "Discovery & Analysis",
    description: "We start by understanding your business, culture, and workspace requirements through in-depth consultation.",
  },
  {
    number: "02",
    title: "Strategic Planning",
    description: "Our experts develop a comprehensive strategy, including space design, furniture selection, and operational framework.",
  },
  {
    number: "03",
    title: "Design & Procurement",
    description: "We bring your vision to life with detailed design plans and source premium furniture from world-leading brands.",
  },
  {
    number: "04",
    title: "Implementation",
    description: "Our team manages the entire setup process, ensuring everything is ready for your launch date.",
  },
  {
    number: "05",
    title: "Ongoing Support",
    description: "Post-launch, we provide continuous management and support to ensure optimal performance.",
  },
]

// Case studies
const caseStudies = [
  {
    company: "TechHub Zagreb",
    industry: "Technology",
    challenge: "Needed to scale from 50 to 200 workstations while maintaining company culture and flexibility.",
    solution: "Implemented a hybrid workspace model with hot-desking zones, private offices, and collaborative areas.",
    results: [
      "Scaled to 200+ workstations in 45 days",
      "30% reduction in per-desk costs",
      "95% employee satisfaction rating",
    ],
    image: "/images/tocConsulting.webp",
  },
  {
    company: "Adriatic Financial Group",
    industry: "Finance",
    challenge: "Required premium, secure office space that reflected their brand and met strict regulatory requirements.",
    solution: "Designed and managed a sophisticated office environment with state-of-the-art security and premium finishes.",
    results: [
      "Achieved all compliance certifications",
      "Enhanced brand perception",
      "Attracted top-tier talent",
    ],
    image: "/images/tocFurniture.webp",
  },
]

// Testimonials
const testimonials = [
  {
    quote: "The Office Company transformed our workspace vision into reality. Their expertise in both design and operations is unmatched. We've seen a 25% increase in team productivity since moving to our new office.",
    author: "Marko Horvat",
    position: "CEO",
    company: "InnovateCroatia",
  },
  {
    quote: "Working with The Office Company was a game-changer for our expansion. They handled everything from consultation to ongoing management, allowing us to focus on our core business.",
    author: "Ana Kovačević",
    position: "Operations Director",
    company: "Digital Solutions Ltd",
  },
  {
    quote: "The attention to detail and commitment to quality is exceptional. Our office isn't just functional—it's a space our team loves to work in. The ROI has been remarkable.",
    author: "Petar Novak",
    position: "Founder",
    company: "StartupHub Ventures",
  },
]

// Stats
const stats = [
  { number: "500+", label: "Projects Completed" },
  { number: "50,000+", label: "Workstations Designed" },
  { number: "98%", label: "Client Satisfaction" },
  { number: "15+", label: "Years of Excellence" },
]

export default function ServicesPageContent() {
  const heroRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const hero = heroRef.current
    if (!hero) return

    const heroElements = hero.querySelectorAll('.animate-hero')
    gsap.set(heroElements, { opacity: 0, y: 20 })

    ScrollTrigger.create({
      trigger: hero,
      start: 'top 80%',
      once: true,
      onEnter: () => {
        gsap.to(heroElements, {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.1,
          ease: 'power3.out'
        })
      }
    })

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill())
    }
  }, [])

  return (
    <div className="pt-32 md:pt-44">
      {/* Hero Section */}
      <HeroSection heroRef={heroRef} />

      {/* Services Overview */}
      <ServicesOverview />

      {/* Why Choose Us */}
      <WhyChooseUs />

      {/* Our Process */}
      <OurProcess />

      {/* Service Deep Dive */}
      <ServiceDeepDive />

      {/* Stats Section */}
      {/* <StatsSection /> */}

      {/* Case Studies */}
      {/* <CaseStudies /> */}

      {/* Testimonials */}
      {/* <Testimonials /> */}

      {/* Final CTA */}
      <FinalCTA />
    </div>
  )
}

// Hero Section Component
function HeroSection({ heroRef }: { heroRef: React.RefObject<HTMLDivElement | null> }) {
  return (
    <div
      ref={heroRef}
      className="relative px-4 sm:px-6 md:px-12 lg:px-24 xl:px-44 py-24 md:py-32 overflow-hidden bg-gradient-to-br from-white via-red-50/20 to-white"
    >
      {/* Background Grid Pattern */}
      <div className="absolute inset-0 opacity-[0.03]">
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

      <div className="relative z-10 max-w-5xl mx-auto text-center">
        <span className="animate-hero text-sm font-bold uppercase tracking-widest text-red-800 mb-6 block">
          Our Services
        </span>

        <h1 className="animate-hero text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black leading-[0.95] tracking-tight mb-8">
          Transform Your
          <br />
          <span className="bg-gradient-to-r from-red-900 via-red-700 to-red-600 bg-clip-text text-transparent">
            Workspace
          </span>
          <br />
          With Experts
        </h1>

        <p className="animate-hero text-lg md:text-xl text-gray-700 max-w-3xl mx-auto mb-10">
          From strategic consulting to complete office management, we deliver end-to-end solutions that elevate your workspace and empower your team.
        </p>

        <div className="animate-hero flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/contact"
            className="px-8 py-4 bg-gradient-to-r from-red-900 to-red-700 text-white font-semibold uppercase tracking-wider hover:from-red-800 hover:to-red-600 transition-all duration-300"
          >
            Get a Quote
          </Link>
          <a
            href="#services"
            className="px-8 py-4 border-2 border-red-900 text-red-900 font-semibold uppercase tracking-wider hover:bg-red-900 hover:text-white transition-all duration-300"
          >
            Explore Services
          </a>
        </div>
      </div>
    </div>
  )
}

// Services Overview Component
function ServicesOverview() {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const section = ref.current
    if (!section) return

    const header = section.querySelector('.section-header')
    if (header) {
      gsap.set(header, { opacity: 0, y: 30 })

      ScrollTrigger.create({
        trigger: header,
        start: 'top 80%',
        once: true,
        onEnter: () => {
          gsap.to(header, {
            opacity: 1,
            y: 0,
            duration: 0.6,
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
      id="services"
      ref={ref}
      className="px-4 sm:px-6 md:px-12 lg:px-24 xl:px-44 py-24 md:py-32 bg-white"
    >
      <div className="section-header text-center mb-16">
        <span className="text-sm font-bold uppercase tracking-widest text-red-800 mb-4 block">
          What We Do
        </span>
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-black mb-6">
          Three Core Services
        </h2>
        <p className="text-lg text-gray-700 max-w-3xl mx-auto">
          Everything you need to create, manage, and optimize your office space
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {services.map((service, index) => (
          <ServiceCard key={service.id} service={service} index={index} />
        ))}
      </div>
    </div>
  )
}

function ServiceCard({ service, index }: { service: typeof services[0]; index: number }) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const card = ref.current
    if (!card) return

    gsap.set(card, { opacity: 0, y: 50 })

    ScrollTrigger.create({
      trigger: card,
      start: 'top 85%',
      once: true,
      onEnter: () => {
        gsap.to(card, {
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
      ref={ref}
      className="group relative bg-white border border-red-100 overflow-hidden hover:shadow-2xl transition-shadow duration-300"
    >
      {/* Image */}
      <div className="relative h-64 overflow-hidden">
        <Image
          src={service.image}
          alt={service.title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-110"
          sizes="(max-width: 768px) 100vw, 33vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        <div className="absolute bottom-4 left-4">
          <span className="text-6xl font-black text-white/30">{service.number}</span>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        <p className="text-xs font-bold uppercase tracking-widest text-red-800 mb-2">
          {service.subtitle}
        </p>
        <h3 className="text-2xl font-bold mb-3 group-hover:text-red-900 transition-colors duration-300">
          {service.title}
        </h3>
        <p className="text-gray-700 mb-4 line-clamp-2">
          {service.shortDescription}
        </p>
        <ul className="space-y-2 mb-6">
          {service.benefits.map((benefit, idx) => (
            <li key={idx} className="flex items-center gap-2 text-sm text-gray-600">
              <svg className="w-4 h-4 text-red-700 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              {benefit}
            </li>
          ))}
        </ul>
        <a
          href={`#${service.id}`}
          className="text-red-900 font-semibold hover:underline inline-flex items-center gap-2"
        >
          Learn More
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </a>
      </div>
    </div>
  )
}

// Why Choose Us Component
function WhyChooseUs() {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const section = ref.current
    if (!section) return

    const header = section.querySelector('.section-header')
    if (header) {
      gsap.set(header, { opacity: 0, y: 30 })

      ScrollTrigger.create({
        trigger: header,
        start: 'top 80%',
        once: true,
        onEnter: () => {
          gsap.to(header, {
            opacity: 1,
            y: 0,
            duration: 0.6,
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
      ref={ref}
      className="px-4 sm:px-6 md:px-12 lg:px-24 xl:px-44 py-24 md:py-32 bg-gradient-to-br from-red-50/30 to-white"
    >
      <div className="section-header text-center mb-16">
        <span className="text-sm font-bold uppercase tracking-widest text-red-800 mb-4 block">
          Why Choose Us
        </span>
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-black mb-6">
          The TOC Advantage
        </h2>
        <p className="text-lg text-gray-700 max-w-3xl mx-auto">
          We bring more than just office solutions—we bring experience, innovation, and commitment to your success
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {benefits.map((benefit, index) => (
          <BenefitCard key={index} benefit={benefit} index={index} />
        ))}
      </div>
    </div>
  )
}

function BenefitCard({ benefit, index }: { benefit: typeof benefits[0]; index: number }) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const card = ref.current
    if (!card) return

    gsap.set(card, { opacity: 0, y: 30 })

    ScrollTrigger.create({
      trigger: card,
      start: 'top 85%',
      once: true,
      onEnter: () => {
        gsap.to(card, {
          opacity: 1,
          y: 0,
          duration: 0.5,
          delay: index * 0.1,
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
      ref={ref}
      className="bg-white border border-red-100 p-6 hover:shadow-lg transition-shadow duration-300"
    >
      <div className="text-red-700 mb-4">{benefit.icon}</div>
      <h3 className="text-xl font-bold mb-2">{benefit.title}</h3>
      <p className="text-gray-700">{benefit.description}</p>
    </div>
  )
}

// Our Process Component
function OurProcess() {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const section = ref.current
    if (!section) return

    const header = section.querySelector('.section-header')
    if (header) {
      gsap.set(header, { opacity: 0, y: 30 })

      ScrollTrigger.create({
        trigger: header,
        start: 'top 80%',
        once: true,
        onEnter: () => {
          gsap.to(header, {
            opacity: 1,
            y: 0,
            duration: 0.6,
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
      ref={ref}
      className="px-4 sm:px-6 md:px-12 lg:px-24 xl:px-44 py-24 md:py-32 bg-white"
    >
      <div className="section-header text-center mb-16">
        <span className="text-sm font-bold uppercase tracking-widest text-red-800 mb-4 block">
          How We Work
        </span>
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-black mb-6">
          Our Proven Process
        </h2>
        <p className="text-lg text-gray-700 max-w-3xl mx-auto">
          A systematic approach refined over hundreds of successful projects
        </p>
      </div>

      <div className="max-w-4xl mx-auto">
        {processSteps.map((step, index) => (
          <ProcessStep key={index} step={step} index={index} isLast={index === processSteps.length - 1} />
        ))}
      </div>
    </div>
  )
}

function ProcessStep({ step, index, isLast }: { step: typeof processSteps[0]; index: number; isLast: boolean }) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const element = ref.current
    if (!element) return

    gsap.set(element, { opacity: 0, x: -30 })

    ScrollTrigger.create({
      trigger: element,
      start: 'top 85%',
      once: true,
      onEnter: () => {
        gsap.to(element, {
          opacity: 1,
          x: 0,
          duration: 0.6,
          delay: index * 0.1,
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
      ref={ref}
      className="relative flex gap-8 pb-12"
    >
      {/* Timeline */}
      <div className="flex flex-col items-center">
        <div className="w-16 h-16 bg-gradient-to-br from-red-900 to-red-700 text-white font-black text-xl flex items-center justify-center">
          {step.number}
        </div>
        {!isLast && (
          <div className="w-0.5 flex-1 bg-gradient-to-b from-red-200 to-transparent mt-4" />
        )}
      </div>

      {/* Content */}
      <div className="flex-1 pt-3">
        <h3 className="text-2xl font-bold mb-2">{step.title}</h3>
        <p className="text-gray-700">{step.description}</p>
      </div>
    </div>
  )
}

// Service Deep Dive Component
function ServiceDeepDive() {
  return (
    <div className="bg-gradient-to-br from-white via-red-50/20 to-white">
      {services.map((service, index) => (
        <DeepDiveSection key={service.id} service={service} index={index} />
      ))}
    </div>
  )
}

function DeepDiveSection({ service, index }: { service: typeof services[0]; index: number }) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const section = ref.current
    if (!section) return

    const content = section.querySelector('.deep-dive-content')
    if (content) {
      gsap.set(content, { opacity: 0, y: 50 })

      ScrollTrigger.create({
        trigger: content,
        start: 'top 80%',
        once: true,
        onEnter: () => {
          gsap.to(content, {
            opacity: 1,
            y: 0,
            duration: 0.7,
            ease: 'power3.out'
          })
        }
      })
    }

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill())
    }
  }, [])

  // Third service (index 2) gets "Browse Our Products" button, others get "Request a Quote"
  const isDesignService = index === 2

  return (
    <div
      id={service.id}
      ref={ref}
      className="px-4 sm:px-6 md:px-12 lg:px-24 xl:px-44 py-24 md:py-32"
    >
      <div className="deep-dive-content grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        {/* Image - alternating sides */}
        <div className={`relative h-[400px] md:h-[500px] ${index % 2 === 1 ? 'lg:order-2' : ''}`}>
          <Image
            src={service.image}
            alt={service.title}
            fill
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 50vw"
          />
          <div className="absolute top-6 left-6">
            <div className="w-20 h-20 bg-gradient-to-br from-red-900 to-red-700 text-white text-3xl font-black flex items-center justify-center">
              {service.number}
            </div>
          </div>
        </div>

        {/* Content */}
        <div>
          <p className="text-sm font-bold uppercase tracking-widest text-red-800 mb-3">
            {service.subtitle}
          </p>
          <h2 className="text-4xl md:text-5xl font-black mb-6">{service.title}</h2>
          <p className="text-lg text-gray-700 mb-8 leading-relaxed">
            {service.description}
          </p>

          <div className="grid grid-cols-2 gap-4 mb-8">
            {service.features.map((feature, idx) => (
              <div key={idx} className="flex items-start gap-2">
                <svg className="w-5 h-5 text-red-700 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span className="text-sm font-medium text-gray-700">{feature}</span>
              </div>
            ))}
          </div>

          <Link
            href={isDesignService ? "/furniture" : "/contact"}
            className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-red-900 to-red-700 text-white font-semibold uppercase tracking-wider hover:from-red-800 hover:to-red-600 transition-all duration-300"
          >
            {isDesignService ? "Browse Our Products" : "Request a Quote"}
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>
      </div>
    </div>
  )
}

// Stats Section Component
function StatsSection() {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const section = ref.current
    if (!section) return

    const statItems = section.querySelectorAll('.stat-item')
    gsap.set(statItems, { opacity: 0, scale: 0.8 })

    ScrollTrigger.create({
      trigger: section,
      start: 'top 80%',
      once: true,
      onEnter: () => {
        gsap.to(statItems, {
          opacity: 1,
          scale: 1,
          duration: 0.5,
          stagger: 0.1,
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
      ref={ref}
      className="px-4 sm:px-6 md:px-12 lg:px-24 xl:px-44 py-24 bg-gradient-to-br from-red-900 to-red-700 text-white"
    >
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
        {stats.map((stat, index) => (
          <div key={index} className="stat-item text-center">
            <div className="text-5xl md:text-6xl font-black mb-2">{stat.number}</div>
            <div className="text-sm md:text-base font-medium opacity-90">{stat.label}</div>
          </div>
        ))}
      </div>
    </div>
  )
}

// Case Studies Component
function CaseStudies() {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const section = ref.current
    if (!section) return

    const header = section.querySelector('.section-header')
    if (header) {
      gsap.set(header, { opacity: 0, y: 30 })

      ScrollTrigger.create({
        trigger: header,
        start: 'top 80%',
        once: true,
        onEnter: () => {
          gsap.to(header, {
            opacity: 1,
            y: 0,
            duration: 0.6,
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
      ref={ref}
      className="px-4 sm:px-6 md:px-12 lg:px-24 xl:px-44 py-24 md:py-32 bg-white"
    >
      <div className="section-header text-center mb-16">
        <span className="text-sm font-bold uppercase tracking-widest text-red-800 mb-4 block">
          Success Stories
        </span>
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-black mb-6">
          Real Results, Real Impact
        </h2>
        <p className="text-lg text-gray-700 max-w-3xl mx-auto">
          See how we've helped businesses transform their workspaces and achieve their goals
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {caseStudies.map((study, index) => (
          <CaseStudyCard key={index} study={study} index={index} />
        ))}
      </div>
    </div>
  )
}

function CaseStudyCard({ study, index }: { study: typeof caseStudies[0]; index: number }) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const card = ref.current
    if (!card) return

    gsap.set(card, { opacity: 0, y: 50 })

    ScrollTrigger.create({
      trigger: card,
      start: 'top 85%',
      once: true,
      onEnter: () => {
        gsap.to(card, {
          opacity: 1,
          y: 0,
          duration: 0.6,
          delay: index * 0.2,
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
      ref={ref}
      className="bg-gradient-to-br from-white to-red-50/30 border border-red-100 overflow-hidden"
    >
      <div className="relative h-64">
        <Image
          src={study.image}
          alt={study.company}
          fill
          className="object-cover"
          sizes="(max-width: 1024px) 100vw, 50vw"
        />
      </div>
      <div className="p-8">
        <div className="flex items-center gap-3 mb-4">
          <h3 className="text-2xl font-bold">{study.company}</h3>
          <span className="px-3 py-1 bg-red-100 text-red-800 text-xs font-semibold uppercase tracking-wider">
            {study.industry}
          </span>
        </div>

        <div className="space-y-4">
          <div>
            <h4 className="font-bold text-red-900 mb-1">Challenge</h4>
            <p className="text-gray-700">{study.challenge}</p>
          </div>
          <div>
            <h4 className="font-bold text-red-900 mb-1">Solution</h4>
            <p className="text-gray-700">{study.solution}</p>
          </div>
          <div>
            <h4 className="font-bold text-red-900 mb-2">Results</h4>
            <ul className="space-y-2">
              {study.results.map((result, idx) => (
                <li key={idx} className="flex items-start gap-2 text-gray-700">
                  <svg className="w-5 h-5 text-red-700 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  {result}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

// Testimonials Component
function Testimonials() {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const section = ref.current
    if (!section) return

    const header = section.querySelector('.section-header')
    if (header) {
      gsap.set(header, { opacity: 0, y: 30 })

      ScrollTrigger.create({
        trigger: header,
        start: 'top 80%',
        once: true,
        onEnter: () => {
          gsap.to(header, {
            opacity: 1,
            y: 0,
            duration: 0.6,
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
      ref={ref}
      className="px-4 sm:px-6 md:px-12 lg:px-24 xl:px-44 py-24 md:py-32 bg-gradient-to-br from-red-50/30 to-white"
    >
      <div className="section-header text-center mb-16">
        <span className="text-sm font-bold uppercase tracking-widest text-red-800 mb-4 block">
          Client Testimonials
        </span>
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-black mb-6">
          What Our Clients Say
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {testimonials.map((testimonial, index) => (
          <TestimonialCard key={index} testimonial={testimonial} index={index} />
        ))}
      </div>
    </div>
  )
}

function TestimonialCard({ testimonial, index }: { testimonial: typeof testimonials[0]; index: number }) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const card = ref.current
    if (!card) return

    gsap.set(card, { opacity: 0, y: 30 })

    ScrollTrigger.create({
      trigger: card,
      start: 'top 85%',
      once: true,
      onEnter: () => {
        gsap.to(card, {
          opacity: 1,
          y: 0,
          duration: 0.5,
          delay: index * 0.1,
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
      ref={ref}
      className="bg-white border border-red-100 p-8 hover:shadow-lg transition-shadow duration-300"
    >
      <svg className="w-10 h-10 text-red-200 mb-4" fill="currentColor" viewBox="0 0 24 24">
        <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
      </svg>
      <p className="text-gray-700 mb-6 italic leading-relaxed">"{testimonial.quote}"</p>
      <div className="border-t border-red-100 pt-4">
        <p className="font-bold text-gray-900">{testimonial.author}</p>
        <p className="text-sm text-gray-600">{testimonial.position}</p>
        <p className="text-sm text-red-800 font-semibold">{testimonial.company}</p>
      </div>
    </div>
  )
}

// Final CTA Component
function FinalCTA() {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const section = ref.current
    if (!section) return

    const content = section.querySelector('.cta-content')
    if (content) {
      gsap.set(content, { opacity: 0, y: 30 })

      ScrollTrigger.create({
        trigger: content,
        start: 'top 80%',
        once: true,
        onEnter: () => {
          gsap.to(content, {
            opacity: 1,
            y: 0,
            duration: 0.6,
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
      ref={ref}
      className="relative px-4 sm:px-6 md:px-12 lg:px-24 xl:px-44 py-32 overflow-hidden bg-gradient-to-br from-red-900 via-red-800 to-red-700 text-white"
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `
              linear-gradient(to right, white 1px, transparent 1px),
              linear-gradient(to bottom, white 1px, transparent 1px)
            `,
            backgroundSize: "60px 60px",
          }}
        />
      </div>

      <div className="cta-content relative z-10 text-center max-w-4xl mx-auto">
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-black mb-6">
          Ready to Transform Your Workspace?
        </h2>
        <p className="text-xl mb-10 opacity-90">
          Let's discuss how we can help you create an office environment that drives productivity, innovation, and growth.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/quote"
            className="px-10 py-5 bg-white text-red-900 font-bold uppercase tracking-wider hover:bg-gray-100 transition-all duration-300 text-lg"
          >
            Get Your Free Quote
          </Link>
          <a
            href="tel:+385xxxxxxxx"
            className="px-10 py-5 border-2 border-white text-white font-bold uppercase tracking-wider hover:bg-white hover:text-red-900 transition-all duration-300 text-lg"
          >
            Call Us Today
          </a>
        </div>
      </div>
    </div>
  )
}
