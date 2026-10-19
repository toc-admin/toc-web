'use client'

import { useRef, useEffect } from 'react'
import Link from 'next/link'
import type { DownloadEntry } from '@/lib/downloads'
import { useLang } from '@/lib/i18n/LanguageContext'
import downloadsDict from '@/lib/i18n/translations/downloadsPage'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

// Register GSAP plugins
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

interface DownloadsPageContentProps {
  downloads: DownloadEntry[]
}

export default function DownloadsPageContent({ downloads }: DownloadsPageContentProps) {
  const heroRef = useRef<HTMLDivElement>(null)
  const listRef = useRef<HTMLDivElement>(null)
  const ctaRef = useRef<HTMLDivElement>(null)
  const { lang } = useLang()
  const t = downloadsDict[lang]

  useEffect(() => {
    const hero = heroRef.current
    const list = listRef.current
    const cta = ctaRef.current

    // Hero animations
    if (hero) {
      const heroElements = hero.querySelectorAll('.animate-hero')
      gsap.set(heroElements, { opacity: 0, y: 30 })

      const dividerLine = hero.querySelector('.divider-line')
      if (dividerLine) gsap.set(dividerLine, { scaleX: 0 })

      ScrollTrigger.create({
        trigger: hero,
        start: 'top 80%',
        once: true,
        onEnter: () => {
          gsap.to(heroElements, {
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
              delay: 0.3,
              ease: 'power3.out'
            })
          }
        }
      })
    }

    // Download items animations
    if (list) {
      const items = list.querySelectorAll('.download-item')
      items.forEach((item, index) => {
        gsap.set(item, { opacity: 0, y: 50 })

        ScrollTrigger.create({
          trigger: item,
          start: 'top 85%',
          once: true,
          onEnter: () => {
            gsap.to(item, {
              opacity: 1,
              y: 0,
              duration: 0.7,
              delay: index * 0.1,
              ease: 'power3.out'
            })
          }
        })
      })
    }

    // CTA animations
    if (cta) {
      const ctaContent = cta.querySelector('.cta-content')
      if (ctaContent) {
        gsap.set(ctaContent, { opacity: 0, y: 30 })

        ScrollTrigger.create({
          trigger: ctaContent,
          start: 'top 80%',
          once: true,
          onEnter: () => {
            gsap.to(ctaContent, {
              opacity: 1,
              y: 0,
              duration: 0.8,
              ease: 'power3.out'
            })
          }
        })
      }
    }

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill())
    }
  }, [])

  return (
    <div className="pt-32 md:pt-44">
      {/* Hero Section */}
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

        <div className="relative z-10">
          <div className="flex flex-col lg:flex-row items-start lg:items-end justify-between gap-8">
            {/* Left - Title */}
            <div className="flex-1">
              <span className="animate-hero text-sm font-bold uppercase tracking-widest text-red-800">
                {t.heroTag}
              </span>

              <h1 className="animate-hero text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black leading-[0.95] tracking-tight mt-6 mb-8">
                {t.heroTitleLine1}
                <br />
                <span className="bg-gradient-to-r from-red-900 via-red-700 to-red-600 bg-clip-text text-transparent">
                  {t.heroTitleLine2}
                </span>
              </h1>

              <div className="divider-line h-2 bg-gradient-to-r from-red-900 to-red-700 w-32 origin-left" />
            </div>

            {/* Right - Description */}
            <p className="animate-hero text-base md:text-lg leading-relaxed text-gray-700 max-w-xl">
              {t.heroDescription}
            </p>
          </div>
        </div>
      </div>

      {/* Downloads List */}
      <div
        ref={listRef}
        className="px-4 sm:px-6 md:px-12 lg:px-24 xl:px-44 py-24 md:py-32 bg-white"
      >
        {downloads.length > 0 ? (
          <div className="flex flex-col gap-8">
            {downloads.map((item) => (
              <div
                key={item.id}
                className="download-item group relative bg-white border border-red-100 hover:shadow-2xl transition-shadow duration-500"
              >
                <div className="absolute -top-3 -left-3 bg-gradient-to-br from-red-900 to-red-700 text-white px-4 py-1 text-xs font-bold uppercase tracking-wider z-10">
                  {t.freeBadge}
                </div>
                <div className="flex flex-col md:flex-row md:items-center gap-6 md:gap-10 p-8 md:p-10">
                  {/* File Icon */}
                  <div className="flex-shrink-0 w-20 h-20 bg-gradient-to-br from-red-900 to-red-700 flex items-center justify-center">
                    <svg
                      className="w-10 h-10 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                      />
                    </svg>
                  </div>

                  {/* Content */}
                  <div className="flex-1">
                    <h2 className="text-2xl md:text-3xl font-bold leading-tight mb-3 group-hover:text-red-900 transition-colors duration-300">
                      {lang === 'hr' ? item.titleHr : item.title}
                    </h2>
                    <p className="text-base leading-relaxed text-gray-700 mb-4">
                      {lang === 'hr' ? item.descriptionHr : item.description}
                    </p>
                    <div className="flex items-center gap-6 text-sm text-gray-600">
                      <span>
                        <span className="font-semibold uppercase tracking-wider text-red-800">{t.fileTypeLabel}:</span>{' '}
                        {item.fileType}
                      </span>
                      {item.fileSize && (
                        <span>
                          <span className="font-semibold uppercase tracking-wider text-red-800">{t.fileSizeLabel}:</span>{' '}
                          {item.fileSize}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Download Button */}
                  <div className="flex-shrink-0">
                    <a
                      href={item.file}
                      download
                      {...(item.file.startsWith('http')
                        ? { target: '_blank', rel: 'noopener noreferrer' }
                        : {})}
                      className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-red-900 to-red-700 text-white font-semibold uppercase tracking-wider hover:from-red-800 hover:to-red-600 transition-all duration-300 group/btn"
                    >
                      {t.downloadButton}
                      <svg
                        className="w-5 h-5 group-hover/btn:translate-y-1 transition-transform duration-300"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                        />
                      </svg>
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          /* Empty State */
          <div className="text-center py-24">
            <div className="max-w-md mx-auto">
              <div className="w-24 h-24 bg-gradient-to-br from-red-900 to-red-700 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg
                  className="w-12 h-12 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                  />
                </svg>
              </div>
              <h3 className="text-2xl font-bold mb-4">{t.emptyTitle}</h3>
              <p className="text-gray-600">{t.emptyDescription}</p>
            </div>
          </div>
        )}
      </div>

      {/* Contact CTA */}
      <div
        ref={ctaRef}
        className="px-4 sm:px-6 md:px-12 lg:px-24 xl:px-44 py-24 md:py-32 bg-gradient-to-br from-gray-900 via-red-950 to-black"
      >
        <div className="cta-content max-w-4xl mx-auto text-center text-white">
          <span className="text-sm font-bold uppercase tracking-widest text-red-300 mb-4 block">
            {t.ctaTag}
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
            {t.ctaTitle}
          </h2>
          <div className="h-1 bg-gradient-to-r from-red-500 to-red-300 w-24 mx-auto mb-8" />
          <p className="text-lg text-white/80 mb-10 max-w-2xl mx-auto">
            {t.ctaDescription}
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-red-900 to-red-700 text-white font-semibold uppercase tracking-wider hover:from-red-800 hover:to-red-600 transition-all duration-300"
          >
            {t.ctaButton}
            <svg
              className="w-5 h-5"
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
    </div>
  )
}
