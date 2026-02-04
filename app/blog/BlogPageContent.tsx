'use client'

import { useRef, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import BlogPost from '@/components/BlogPost'
import blogs from '@/config/blogData'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

// Register GSAP plugins
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

export default function BlogPageContent() {
  const heroRef = useRef<HTMLDivElement>(null)
  const gridRef = useRef<HTMLDivElement>(null)
  const newsletterRef = useRef<HTMLDivElement>(null)

  // Featured post (first blog)
  const featuredPost = blogs[0]

  useEffect(() => {
    const hero = heroRef.current
    const grid = gridRef.current
    const newsletter = newsletterRef.current

    // Hero animations
    if (hero) {
      const heroElements = hero.querySelectorAll('.animate-hero')
      gsap.set(heroElements, { opacity: 0, y: 30 })

      const dividerLine = hero.querySelector('.divider-line')
      if (dividerLine) gsap.set(dividerLine, { scaleX: 0 })

      const featuredSection = hero.querySelector('.featured-section')
      if (featuredSection) gsap.set(featuredSection, { opacity: 0, y: 50 })

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
          if (featuredSection) {
            gsap.to(featuredSection, {
              opacity: 1,
              y: 0,
              duration: 0.8,
              delay: 0.5,
              ease: 'power3.out'
            })
          }
        }
      })
    }

    // Grid animations
    if (grid) {
      const gridHeader = grid.querySelector('.grid-header')
      if (gridHeader) {
        gsap.set(gridHeader, { opacity: 0, y: 20 })

        ScrollTrigger.create({
          trigger: gridHeader,
          start: 'top 80%',
          once: true,
          onEnter: () => {
            gsap.to(gridHeader, {
              opacity: 1,
              y: 0,
              duration: 0.7,
              ease: 'power3.out'
            })
          }
        })
      }

      const blogItems = grid.querySelectorAll('.blog-item')
      blogItems.forEach((item, index) => {
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

    // Newsletter animations
    if (newsletter) {
      const newsletterContent = newsletter.querySelector('.newsletter-content')
      if (newsletterContent) {
        gsap.set(newsletterContent, { opacity: 0, y: 30 })

        ScrollTrigger.create({
          trigger: newsletterContent,
          start: 'top 80%',
          once: true,
          onEnter: () => {
            gsap.to(newsletterContent, {
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
          <div className="flex flex-col lg:flex-row items-start lg:items-end justify-between gap-8 mb-16">
            {/* Left - Title */}
            <div className="flex-1">
              <span className="animate-hero text-sm font-bold uppercase tracking-widest text-red-800">
                Our Blog
              </span>

              <h1 className="animate-hero text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black leading-[0.95] tracking-tight mt-6 mb-8">
                Insights &
                <br />
                <span className="bg-gradient-to-r from-red-900 via-red-700 to-red-600 bg-clip-text text-transparent">
                  Market News
                </span>
              </h1>

              <div className="divider-line h-2 bg-gradient-to-r from-red-900 to-red-700 w-32 origin-left" />
            </div>

            {/* Right - Description */}
            <p className="animate-hero text-base md:text-lg leading-relaxed text-gray-700 max-w-xl">
              Stay informed with expert insights on office trends, productivity
              tips, and the future of workspaces. Discover how we&apos;re shaping the
              industry.
            </p>
          </div>

          {/* Featured Post */}
          {featuredPost && (
            <div className="featured-section relative group">
              <div className="absolute -top-4 -left-4 bg-gradient-to-br from-red-900 to-red-700 text-white px-6 py-2 text-sm font-bold uppercase tracking-wider z-20">
                Featured
              </div>
              <div className="bg-white border border-red-100 overflow-hidden hover:shadow-2xl transition-shadow duration-500">
                <div className="grid grid-cols-1 lg:grid-cols-2">
                  {/* Image */}
                  <div className="relative h-[400px] lg:h-[500px] overflow-hidden">
                    <div className="w-full h-full relative group-hover:scale-105 transition-transform duration-600">
                      <Image
                        src={featuredPost.image}
                        alt={featuredPost.name}
                        fill
                        className="object-cover"
                        sizes="(max-width: 1024px) 100vw, 50vw"
                        priority
                      />
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                  </div>

                  {/* Content */}
                  <div className="p-8 md:p-12 flex flex-col justify-center">
                    <span className="text-sm font-bold uppercase tracking-widest text-red-800 mb-4">
                      Latest Article
                    </span>
                    <h2 className="text-3xl md:text-4xl font-bold leading-tight mb-6 group-hover:text-red-900 transition-colors duration-300">
                      {featuredPost.name}
                    </h2>
                    <p className="text-base md:text-lg leading-relaxed text-gray-700 mb-8">
                      {featuredPost.shortDescription}
                    </p>
                    <Link
                      href={`/blog/${featuredPost.slug}`}
                      className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-red-900 to-red-700 text-white font-semibold uppercase tracking-wider hover:from-red-800 hover:to-red-600 transition-all duration-300 group/btn w-fit"
                    >
                      Read Article
                      <svg
                        className="w-5 h-5 group-hover/btn:translate-x-1 transition-transform duration-300"
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
            </div>
          )}
        </div>
      </div>

      {/* All Articles Grid */}
      <div
        ref={gridRef}
        className="px-4 sm:px-6 md:px-12 lg:px-24 xl:px-44 py-24 md:py-32 bg-white"
      >
        {/* Section Header */}
        <div className="grid-header flex items-center justify-between mb-12">
          <div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
              All Articles
            </h2>
            <div className="h-1 bg-gradient-to-r from-red-900 to-red-700 w-24" />
          </div>
          <div className="text-right">
            <p className="text-lg font-semibold text-gray-900">
              {blogs.length} {blogs.length === 1 ? "Article" : "Articles"}
            </p>
            <p className="text-sm text-gray-600">Updated regularly</p>
          </div>
        </div>

        {/* Blog Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
          {blogs.map((blog) => (
            <div key={blog.id} className="blog-item">
              <BlogPost
                image={blog.image}
                name={blog.name}
                shortDescription={blog.shortDescription}
                slug={blog.slug}
              />
            </div>
          ))}
        </div>

        {/* Empty State (if no blogs) */}
        {blogs.length === 0 && (
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
                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>
              </div>
              <h3 className="text-2xl font-bold mb-4">No Articles Yet</h3>
              <p className="text-gray-600">
                Check back soon for insights and updates from The Office Company.
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Newsletter CTA */}
      <div
        ref={newsletterRef}
        className="px-4 sm:px-6 md:px-12 lg:px-24 xl:px-44 py-24 md:py-32 bg-gradient-to-br from-gray-900 via-red-950 to-black"
      >
        <div className="newsletter-content max-w-4xl mx-auto text-center text-white">
          <span className="text-sm font-bold uppercase tracking-widest text-red-300 mb-4 block">
            Stay Updated
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
            Subscribe to Our Newsletter
          </h2>
          <div className="h-1 bg-gradient-to-r from-red-500 to-red-300 w-24 mx-auto mb-8" />
          <p className="text-lg text-white/80 mb-10 max-w-2xl mx-auto">
            Get the latest insights, trends, and news delivered straight to your
            inbox. Join our community of workspace innovators.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 max-w-xl mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-6 py-4 bg-white/10 border border-white/20 text-white placeholder:text-white/60 focus:border-red-500 focus:ring-2 focus:ring-red-500/50 outline-none transition-all duration-300"
            />
            <button className="px-8 py-4 bg-gradient-to-r from-red-900 to-red-700 text-white font-semibold uppercase tracking-wider hover:from-red-800 hover:to-red-600 transition-all duration-300 whitespace-nowrap">
              Subscribe
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
