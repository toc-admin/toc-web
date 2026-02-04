'use client'

import { useRef, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import type { Blog } from '@/config/blogData'

// Register GSAP plugins
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

interface BlogDetailsClientProps {
  blog: Blog
  relatedArticles: Blog[]
}

export default function BlogDetailsClient({ blog, relatedArticles }: BlogDetailsClientProps) {
  const heroRef = useRef<HTMLDivElement>(null)
  const imageRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const relatedRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const hero = heroRef.current
    const image = imageRef.current
    const content = contentRef.current
    const related = relatedRef.current

    // Hero animations
    if (hero) {
      const heroElements = hero.querySelectorAll('.animate-hero')
      gsap.set(heroElements, { opacity: 0, y: 20 })

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
            duration: 0.7,
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

    // Featured image animation
    if (image) {
      gsap.set(image, { opacity: 0, y: 50 })

      ScrollTrigger.create({
        trigger: image,
        start: 'top 80%',
        once: true,
        onEnter: () => {
          gsap.to(image, {
            opacity: 1,
            y: 0,
            duration: 0.8,
            delay: 0.5,
            ease: 'power3.out'
          })
        }
      })
    }

    // Content animation
    if (content) {
      const article = content.querySelector('.article-content')
      if (article) {
        gsap.set(article, { opacity: 0, y: 30 })

        ScrollTrigger.create({
          trigger: article,
          start: 'top 80%',
          once: true,
          onEnter: () => {
            gsap.to(article, {
              opacity: 1,
              y: 0,
              duration: 0.8,
              ease: 'power3.out'
            })
          }
        })
      }
    }

    // Related articles animations
    if (related) {
      const relatedHeader = related.querySelector('.related-header')
      if (relatedHeader) {
        gsap.set(relatedHeader, { opacity: 0, y: 20 })

        ScrollTrigger.create({
          trigger: relatedHeader,
          start: 'top 80%',
          once: true,
          onEnter: () => {
            gsap.to(relatedHeader, {
              opacity: 1,
              y: 0,
              duration: 0.7,
              ease: 'power3.out'
            })
          }
        })
      }

      const relatedCards = related.querySelectorAll('.related-card')
      relatedCards.forEach((card, index) => {
        gsap.set(card, { opacity: 0, y: 30 })

        ScrollTrigger.create({
          trigger: card,
          start: 'top 85%',
          once: true,
          onEnter: () => {
            gsap.to(card, {
              opacity: 1,
              y: 0,
              duration: 0.7,
              delay: index * 0.1,
              ease: 'power3.out'
            })
          }
        })
      })

      const viewAllBtn = related.querySelector('.view-all-btn')
      if (viewAllBtn) {
        gsap.set(viewAllBtn, { opacity: 0, y: 20 })

        ScrollTrigger.create({
          trigger: viewAllBtn,
          start: 'top 85%',
          once: true,
          onEnter: () => {
            gsap.to(viewAllBtn, {
              opacity: 1,
              y: 0,
              duration: 0.7,
              delay: 0.4,
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
      {/* Back Button - Floating */}
      <div className="fixed top-24 left-4 md:left-8 z-40">
        <Link
          href="/blog"
          className="group flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 hover:border-red-700 shadow-lg hover:shadow-xl transition-all duration-300"
        >
          <svg
            className="w-5 h-5 text-gray-600 group-hover:text-red-700 group-hover:-translate-x-1 transition-all duration-300"
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
          <span className="text-sm font-semibold text-gray-700 group-hover:text-red-700 transition-colors duration-300">
            Back
          </span>
        </Link>
      </div>

      {/* Hero Section */}
      <div
        ref={heroRef}
        className="relative px-4 sm:px-6 md:px-12 lg:px-24 xl:px-44 py-16 md:py-24"
      >
        <div className="max-w-4xl mx-auto">
          {/* Meta Info */}
          <div className="animate-hero flex items-center gap-4 mb-8">
            <span className="text-sm font-bold uppercase tracking-widest text-red-800">
              Article
            </span>
            <span className="text-gray-300">•</span>
            <span className="text-sm text-gray-600 font-medium">{blog.date}</span>
          </div>

          {/* Title */}
          <h1 className="animate-hero text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black leading-[1.1] tracking-tight mb-8">
            {blog.name}
          </h1>

          {/* Divider */}
          <div className="divider-line h-1 bg-gradient-to-r from-red-900 to-red-700 w-32 mb-8 origin-left" />

          {/* Short Description */}
          <p className="animate-hero text-xl md:text-2xl leading-relaxed text-gray-700 font-medium">
            {blog.shortDescription}
          </p>
        </div>
      </div>

      {/* Featured Image */}
      <div
        ref={imageRef}
        className="px-4 sm:px-6 md:px-12 lg:px-24 xl:px-44 mb-16 md:mb-24"
      >
        <div className="relative overflow-hidden max-w-6xl mx-auto h-[400px] md:h-[600px] lg:h-[700px]">
          <Image
            src={blog.image}
            alt={blog.name}
            fill
            className="object-cover"
            sizes="(max-width: 1536px) 100vw, 1536px"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
        </div>
      </div>

      {/* Article Content */}
      <div
        ref={contentRef}
        className="px-4 sm:px-6 md:px-12 lg:px-24 xl:px-44 pb-24 md:pb-32"
      >
        <article className="article-content max-w-3xl mx-auto">
          <div
            className="prose prose-lg md:prose-xl max-w-none
              prose-headings:font-bold prose-headings:tracking-tight
              prose-h2:text-3xl prose-h2:md:text-4xl prose-h2:mt-12 prose-h2:mb-6
              prose-h3:text-2xl prose-h3:md:text-3xl prose-h3:mt-10 prose-h3:mb-4
              prose-p:text-gray-700 prose-p:leading-relaxed prose-p:mb-6
              prose-a:text-red-700 prose-a:no-underline hover:prose-a:underline
              prose-strong:text-gray-900 prose-strong:font-bold
              prose-ul:my-6 prose-ul:list-disc prose-ul:pl-6
              prose-ol:my-6 prose-ol:list-decimal prose-ol:pl-6
              prose-li:text-gray-700 prose-li:mb-2
              prose-blockquote:border-l-4 prose-blockquote:border-red-700
              prose-blockquote:pl-6 prose-blockquote:italic prose-blockquote:text-gray-800
              prose-img:rounded-none prose-img:my-8"
            dangerouslySetInnerHTML={{ __html: blog.longDescription }}
          />
        </article>
      </div>

      {/* Related Articles */}
      {relatedArticles.length > 0 && (
        <div
          ref={relatedRef}
          className="px-4 sm:px-6 md:px-12 lg:px-24 xl:px-44 py-24 md:py-32 bg-gray-50"
        >
          <div className="max-w-6xl mx-auto">
            <div className="related-header mb-12">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
                Related Articles
              </h2>
              <div className="h-1 bg-gradient-to-r from-red-900 to-red-700 w-24" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {relatedArticles.map((article) => (
                <div key={article.id} className="related-card">
                  <Link
                    href={`/blog/${article.slug}`}
                    className="group block bg-white border border-gray-200 overflow-hidden hover:shadow-xl hover:border-red-200 transition-all duration-300"
                  >
                    <div className="relative h-[250px] overflow-hidden">
                      <Image
                        src={article.image}
                        alt={article.name}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                        sizes="(max-width: 768px) 100vw, 33vw"
                      />
                    </div>
                    <div className="p-6">
                      <h3 className="text-xl font-bold mb-3 group-hover:text-red-900 transition-colors duration-300 line-clamp-2">
                        {article.name}
                      </h3>
                      <p className="text-sm text-gray-600 line-clamp-3 mb-4">
                        {article.shortDescription}
                      </p>
                      <span className="inline-flex items-center gap-2 text-sm font-semibold text-red-700 group-hover:gap-3 transition-all duration-300">
                        Read More
                        <svg
                          className="w-4 h-4"
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
                      </span>
                    </div>
                  </Link>
                </div>
              ))}
            </div>

            {/* View All Button */}
            <div className="view-all-btn text-center mt-12">
              <Link
                href="/blog"
                className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-red-900 to-red-700 text-white font-semibold uppercase tracking-wider hover:from-red-800 hover:to-red-600 transition-all duration-300"
              >
                View All Articles
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
      )}
    </div>
  )
}
