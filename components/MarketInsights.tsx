'use client'

import { useRef, useState, useEffect } from "react"
import Link from "next/link"
import blogs from "@/config/data"
import BlogPost from "./BlogPost"
import { Swiper, SwiperSlide } from "swiper/react"
import { Navigation, Pagination, Scrollbar, A11y } from "swiper/modules"
import type { Swiper as SwiperType } from "swiper"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import "swiper/css"
import "swiper/css/navigation"
import "swiper/css/pagination"
import "swiper/css/scrollbar"

// Register GSAP plugins
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

interface MarketInsightsProps {
  id?: string
}

const MarketInsights = ({ id }: MarketInsightsProps) => {
  const [swiperRef, setSwiperRef] = useState<SwiperType | null>(null)
  const [activeIndex, setActiveIndex] = useState(0)
  const sectionRef = useRef<HTMLDivElement>(null)
  const headerRef = useRef<HTMLDivElement>(null)
  const progressBarRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const section = sectionRef.current
    const header = headerRef.current

    if (!section || !header) return

    // Header animations
    const headerElements = header.querySelectorAll('.animate-header')
    gsap.set(headerElements, { opacity: 0, y: 30 })

    const dividerLine = header.querySelector('.divider-line')
    if (dividerLine) gsap.set(dividerLine, { scaleX: 0 })

    const navSection = section.querySelector('.nav-section')
    if (navSection) gsap.set(navSection, { opacity: 0, x: 30 })

    const counterSection = section.querySelector('.counter-section')
    if (counterSection) gsap.set(counterSection, { opacity: 0 })

    const swiperSection = section.querySelector('.swiper-section')
    if (swiperSection) gsap.set(swiperSection, { opacity: 0, y: 50 })

    const progressSection = section.querySelector('.progress-section')
    if (progressSection) gsap.set(progressSection, { opacity: 0 })

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
        if (navSection) {
          gsap.to(navSection, {
            opacity: 1,
            x: 0,
            duration: 0.8,
            delay: 0.4,
            ease: 'power3.out'
          })
        }
        if (counterSection) {
          gsap.to(counterSection, {
            opacity: 1,
            duration: 0.7,
            delay: 0.5,
            ease: 'power3.out'
          })
        }
        if (swiperSection) {
          gsap.to(swiperSection, {
            opacity: 1,
            y: 0,
            duration: 0.8,
            delay: 0.6,
            ease: 'power3.out'
          })
        }
        if (progressSection) {
          gsap.to(progressSection, {
            opacity: 1,
            duration: 0.7,
            delay: 0.7,
            ease: 'power3.out'
          })
        }
      }
    })

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill())
    }
  }, [])

  // Update progress bar width
  useEffect(() => {
    if (progressBarRef.current) {
      const width = ((activeIndex + 1) / blogs.length) * 100
      gsap.to(progressBarRef.current, {
        width: `${width}%`,
        duration: 0.3,
        ease: 'power2.out'
      })
    }
  }, [activeIndex])

  return (
    <div
      ref={sectionRef}
      id={id}
      className="flex flex-col gap-12 items-start justify-start px-4 sm:px-6 md:px-12 lg:px-24 xl:px-44 py-24 md:py-32 bg-white relative overflow-hidden"
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
      <div className="relative z-10 flex flex-col lg:flex-row items-start lg:items-end justify-between gap-8 w-full">
        {/* Left Side - Title & Description */}
        <div
          ref={headerRef}
          className="flex flex-col gap-4 max-w-2xl"
        >
          <span className="animate-header text-sm font-bold uppercase tracking-widest text-red-800">
            Latest News
          </span>

          <h2 className="animate-header text-4xl sm:text-5xl md:text-6xl font-black leading-tight tracking-tight">
            Market
            <br />
            <span className="bg-gradient-to-r from-red-900 via-red-700 to-red-600 bg-clip-text text-transparent">
              Insights
            </span>
          </h2>

          <div className="divider-line h-1 bg-gradient-to-r from-red-900 to-red-700 w-32 origin-left" />

          <p className="animate-header text-base md:text-lg text-gray-700 leading-relaxed mt-2">
            Stay ahead with our latest analysis, trends, and insights from the
            serviced office industry.
          </p>
        </div>

        {/* Right Side - Navigation & CTA */}
        <div className="nav-section flex items-center gap-4">
          {/* Custom Navigation Buttons */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => swiperRef?.slidePrev()}
              className="w-12 h-12 flex items-center justify-center bg-white border-2 border-red-100 hover:bg-gradient-to-r hover:from-red-900 hover:to-red-700 hover:text-white hover:border-red-700 transition-all duration-300 disabled:opacity-30 disabled:cursor-not-allowed"
              disabled={activeIndex === 0}
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </button>
            <button
              onClick={() => swiperRef?.slideNext()}
              className="w-12 h-12 flex items-center justify-center bg-white border-2 border-red-100 hover:bg-gradient-to-r hover:from-red-900 hover:to-red-700 hover:text-white hover:border-red-700 transition-all duration-300 disabled:opacity-30 disabled:cursor-not-allowed"
              disabled={activeIndex >= blogs.length - 3}
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>
          </div>

          {/* View All Button */}
          <Link
            href="/blog"
            className="group px-6 py-3 bg-gradient-to-r from-red-900 to-red-700 text-white font-semibold uppercase tracking-wider hover:from-red-800 hover:to-red-600 transition-all duration-300 flex items-center gap-2 text-sm"
          >
            View All
            <svg
              className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300"
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

      {/* Slider Counter */}
      <div className="counter-section relative z-10 flex items-center gap-3">
        <span className="text-2xl font-black bg-gradient-to-r from-red-900 to-red-700 bg-clip-text text-transparent">
          {String(activeIndex + 1).padStart(2, '0')}
        </span>
        <div className="h-px bg-gradient-to-r from-red-700 to-transparent w-12" />
        <span className="text-lg text-gray-400">
          {String(blogs.length).padStart(2, '0')}
        </span>
      </div>

      {/* Swiper Carousel */}
      <div className="swiper-section relative z-10 w-full">
        <Swiper
          onSwiper={setSwiperRef}
          speed={700}
          modules={[Navigation, Pagination, Scrollbar, A11y]}
          slidesPerView={1}
          spaceBetween={20}
          breakpoints={{
            380: {
              slidesPerView: 1.2,
              spaceBetween: 16,
            },
            640: {
              slidesPerView: 1.5,
              spaceBetween: 20,
            },
            768: {
              slidesPerView: 2,
              spaceBetween: 24,
            },
            1024: {
              slidesPerView: 2.5,
              spaceBetween: 28,
            },
            1280: {
              slidesPerView: 3,
              spaceBetween: 32,
            },
          }}
          onSlideChange={(swiper) => {
            setActiveIndex(swiper.realIndex)
          }}
          className="!overflow-visible"
        >
          {blogs.map((blog, blogIndex) => (
            <SwiperSlide key={blogIndex}>
              <BlogPost
                image={blog.image}
                name={blog.name}
                shortDescription={blog.shortDescription}
                slug={blog.slug}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* Progress Bar */}
      <div className="progress-section relative z-10 w-full h-1 bg-red-100 rounded-full overflow-hidden">
        <div
          ref={progressBarRef}
          className="h-full bg-gradient-to-r from-red-900 to-red-700"
          style={{ width: `${((activeIndex + 1) / blogs.length) * 100}%` }}
        />
      </div>
    </div>
  )
}

export default MarketInsights
