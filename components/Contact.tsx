'use client'

import { useRef, useEffect } from "react"
import Link from "next/link"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

// Register GSAP plugins
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

const contactMethods = [
  {
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
    title: "Email Us",
    description: "Drop us a line anytime",
    value: "info@theofficecompany.eu",
    link: "mailto:info@theofficecompany.eu",
  },
  {
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
      </svg>
    ),
    title: "Call Us",
    description: "Mon-Fri from 9am to 6pm",
    value: "+385 91 3011 552",
    link: "tel:+385913011552",
  },
  {
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
    title: "Visit Us",
    description: "Come say hello",
    value: "Poljačka ul. 56, Zagreb",
    link: "https://maps.google.com/?q=Poljačka+ul.+56+Zagreb",
  },
]

interface ContactProps {
  id?: string
}

const Contact = ({ id }: ContactProps) => {
  const headerRef = useRef<HTMLDivElement>(null)
  const cardsRef = useRef<HTMLDivElement>(null)
  const formRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const header = headerRef.current
    const cards = cardsRef.current
    const form = formRef.current

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

    // Cards animation
    if (cards) {
      const cardTitle = cards.querySelector('.cards-title')
      const contactCards = cards.querySelectorAll('.contact-card')
      const socialSection = cards.querySelector('.social-section')

      if (cardTitle) gsap.set(cardTitle, { opacity: 0, x: -30 })
      gsap.set(contactCards, { opacity: 0, x: -30 })
      if (socialSection) gsap.set(socialSection, { opacity: 0, y: 20 })

      ScrollTrigger.create({
        trigger: cards,
        start: 'top 80%',
        once: true,
        onEnter: () => {
          if (cardTitle) {
            gsap.to(cardTitle, {
              opacity: 1,
              x: 0,
              duration: 0.7,
              ease: 'power3.out'
            })
          }
          gsap.to(contactCards, {
            opacity: 1,
            x: 0,
            duration: 0.7,
            stagger: 0.15,
            ease: 'power3.out'
          })
          if (socialSection) {
            gsap.to(socialSection, {
              opacity: 1,
              y: 0,
              duration: 0.7,
              delay: 0.6,
              ease: 'power3.out'
            })
          }
        }
      })
    }

    // Form animation
    if (form) {
      gsap.set(form, { opacity: 0, x: 30 })
      const benefitItems = form.querySelectorAll('.benefit-item')
      gsap.set(benefitItems, { opacity: 0, x: 20 })

      ScrollTrigger.create({
        trigger: form,
        start: 'top 80%',
        once: true,
        onEnter: () => {
          gsap.to(form, {
            opacity: 1,
            x: 0,
            duration: 0.8,
            ease: 'power3.out'
          })
          gsap.to(benefitItems, {
            opacity: 1,
            x: 0,
            duration: 0.6,
            stagger: 0.1,
            ease: 'power3.out',
            delay: 0.2
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
      className="relative overflow-hidden bg-gradient-to-br from-gray-900 via-red-950 to-black text-white"
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `repeating-linear-gradient(
            45deg,
            transparent,
            transparent 35px,
            rgba(255,255,255,.1) 35px,
            rgba(255,255,255,.1) 70px
          )`
        }} />
      </div>

      <div className="relative z-10 px-4 sm:px-6 md:px-12 lg:px-24 xl:px-44 py-24 md:py-32">

        {/* Header Section */}
        <div
          ref={headerRef}
          className="flex flex-col gap-6 max-w-4xl mb-20"
        >
          <span className="animate-header text-sm font-bold uppercase tracking-widest text-red-300">
            Get In Touch
          </span>

          <h2 className="animate-header text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black leading-[1.1] tracking-tight">
            Let&apos;s Create Your
            <br />
            <span className="bg-gradient-to-r from-red-400 via-red-500 to-red-600 bg-clip-text text-transparent">
              Perfect Workspace
            </span>
          </h2>

          <div className="divider-line h-1 bg-gradient-to-r from-red-500 to-red-300 w-32 origin-left" />

          <p className="animate-header text-base md:text-lg text-white/80 leading-relaxed max-w-3xl">
            Ready to transform your office space? Get in touch with our team
            and let&apos;s discuss how we can help you create an inspiring workplace.
          </p>
        </div>

        {/* Two Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">

          {/* Left Side - Contact Methods */}
          <div ref={cardsRef} className="flex flex-col gap-8">
            <h3 className="cards-title text-2xl md:text-3xl font-bold">
              Contact Information
            </h3>

            {/* Contact Cards */}
            <div className="flex flex-col gap-6">
              {contactMethods.map((method, index) => (
                <a
                  key={index}
                  href={method.link}
                  target={method.link.startsWith('http') ? '_blank' : '_self'}
                  rel={method.link.startsWith('http') ? 'noopener noreferrer' : ''}
                  className="contact-card group flex items-start gap-6 p-6 border border-red-800/30 hover:border-red-500 hover:bg-red-950/30 hover:translate-x-2 transition-all duration-300 cursor-pointer"
                >
                  <div className="text-red-400 group-hover:text-red-300 group-hover:scale-110 transition-all duration-300">
                    {method.icon}
                  </div>
                  <div className="flex flex-col gap-2">
                    <h4 className="text-lg font-bold">{method.title}</h4>
                    <p className="text-sm text-white/60">{method.description}</p>
                    <p className="text-base font-semibold text-white group-hover:text-red-300 transition-colors">
                      {method.value}
                    </p>
                  </div>
                  <svg
                    className="w-5 h-5 ml-auto text-red-800 group-hover:text-red-400 group-hover:translate-x-2 transition-all duration-300"
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
                </a>
              ))}
            </div>

            {/* Social Links */}
            <div className="social-section flex items-center gap-4 pt-6 border-t border-red-800/30">
              <span className="text-sm font-semibold uppercase tracking-wider text-white/60">
                Follow Us
              </span>
              <div className="flex items-center gap-3">
                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 flex items-center justify-center border border-red-800/30 hover:border-red-500 hover:bg-gradient-to-r hover:from-red-900 hover:to-red-700 transition-all duration-300"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                  </svg>
                </a>
                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 flex items-center justify-center border border-red-800/30 hover:border-red-500 hover:bg-gradient-to-r hover:from-red-900 hover:to-red-700 transition-all duration-300"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z" />
                  </svg>
                </a>
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 flex items-center justify-center border border-red-800/30 hover:border-red-500 hover:bg-gradient-to-r hover:from-red-900 hover:to-red-700 transition-all duration-300"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                  </svg>
                </a>
              </div>
            </div>
          </div>

          {/* Right Side - Quick CTA */}
          <div
            ref={formRef}
            className="flex flex-col gap-8 bg-gradient-to-br from-red-950/50 to-black/50 backdrop-blur-sm p-8 md:p-12 border border-red-800/30"
          >
            <div className="flex flex-col gap-4">
              <h3 className="text-3xl md:text-4xl font-bold">
                Start Your Project Today
              </h3>
              <p className="text-base text-white/70 leading-relaxed">
                Whether you&apos;re planning a new office, upgrading your current space,
                or exploring management solutions, we&apos;re here to help.
              </p>
            </div>

            {/* Benefits List */}
            <div className="flex flex-col gap-4">
              {[
                "Free consultation",
                "Custom design proposals",
                "Transparent pricing",
                "Expert project management"
              ].map((benefit, index) => (
                <div
                  key={index}
                  className="benefit-item flex items-center gap-3"
                >
                  <svg className="w-6 h-6 text-red-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-base">{benefit}</span>
                </div>
              ))}
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col gap-3 mt-4">
              <Link
                href="/contact"
                className="group w-full px-8 py-4 bg-gradient-to-r from-red-900 to-red-700 text-white font-semibold uppercase tracking-wider hover:from-red-800 hover:to-red-600 transition-all duration-300 flex items-center justify-center gap-2"
              >
                Schedule a Consultation
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
              <button className="w-full px-8 py-4 bg-transparent border-2 border-red-500 text-white font-semibold uppercase tracking-wider hover:bg-red-500 hover:border-red-500 transition-all duration-300">
                Download Portfolio
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Contact
