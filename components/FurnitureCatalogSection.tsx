'use client'

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import Link from "next/link"
import Image from "next/image"

interface Category {
  id: string
  name: string
  slug: string
  description: string | null
  icon_name: string | null
  image_url: string | null
  product_count: number
}

interface FurnitureCatalogSectionProps {
  id?: string
  categories: Category[]
}

// Icon mapping for categories
const getCategoryIcon = (iconName: string | null) => {
  const iconMap: { [key: string]: JSX.Element } = {
    'chairs': (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
    'desks': (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M3 14h18m-9-4v8m-7 0h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
      </svg>
    ),
    'storage': (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
      </svg>
    ),
    'acoustic': (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />
      </svg>
    ),
    'lighting': (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
      </svg>
    ),
    'lounge': (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
      </svg>
    ),
  }

  return iconMap[iconName || ''] || iconMap['chairs']
}

const FurnitureCatalogSection = ({ id, categories }: FurnitureCatalogSectionProps) => {
  const headerRef = useRef(null)
  const cardsRef = useRef(null)
  const ctaRef = useRef(null)

  const isHeaderInView = useInView(headerRef, { once: true, amount: 0.5 })
  const isCardsInView = useInView(cardsRef, { once: true, amount: 0.2 })
  const isCtaInView = useInView(ctaRef, { once: true, amount: 0.5 })

  return (
    <div
      id={id}
      className="flex flex-col gap-16 items-start justify-start px-4 sm:px-6 md:px-12 lg:px-24 xl:px-44 py-24 md:py-32 bg-white relative overflow-hidden"
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
      <motion.div
        ref={headerRef}
        initial={{ opacity: 0, y: 30 }}
        animate={isHeaderInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="relative z-10 flex flex-col gap-4 max-w-4xl"
      >
        <motion.span
          initial={{ opacity: 0, y: 20 }}
          animate={isHeaderInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="text-sm font-bold uppercase tracking-widest text-red-800"
        >
          Premium Products
        </motion.span>

        <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black leading-[1.1] tracking-tight">
          Explore Our
          <br />
          <span className="bg-gradient-to-r from-red-900 via-red-700 to-red-600 bg-clip-text text-transparent">
            Furniture Catalog
          </span>
        </h2>

        <motion.div
          initial={{ scaleX: 0 }}
          animate={isHeaderInView ? { scaleX: 1 } : {}}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
          className="h-1 bg-gradient-to-r from-red-900 to-red-700 w-32 origin-left"
        />

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={isHeaderInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.3 }}
          className="text-base md:text-lg text-gray-700 leading-relaxed mt-2"
        >
          Browse over 500 premium office furniture products from world-renowned
          brands. Filter by category, room type, or brand to find exactly what
          your workspace needs.
        </motion.p>
      </motion.div>

      {/* Quick Stats Bar */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={isHeaderInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.4 }}
        className="relative z-10 grid grid-cols-2 md:grid-cols-4 gap-6 w-full"
      >
        {[
          { number: "500+", label: "Products" },
          { number: "15+", label: "Brands" },
          { number: "50+", label: "Categories" },
          { number: "100%", label: "Quality" },
        ].map((stat, index) => (
          <div
            key={index}
            className="flex flex-col items-center justify-center p-6 bg-gray-50 border border-red-100 hover:border-red-300 hover:shadow-lg transition-all duration-300"
          >
            <span className="text-3xl md:text-4xl font-black bg-gradient-to-r from-red-900 to-red-700 bg-clip-text text-transparent">
              {stat.number}
            </span>
            <span className="text-sm md:text-base text-gray-600 font-semibold uppercase tracking-wider mt-1">
              {stat.label}
            </span>
          </div>
        ))}
      </motion.div>

      {/* Category Cards Grid */}
      <div ref={cardsRef} className="relative z-10 w-full">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {categories.map((category, index) => (
            <CategoryCard
              key={category.id}
              category={category}
              index={index}
              isInView={isCardsInView}
            />
          ))}
        </div>
      </div>

      {/* Browse by Room Section */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={isCardsInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.6 }}
        className="relative z-10 w-full mt-8"
      >
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-8">
          <div>
            <h3 className="text-2xl md:text-3xl font-bold">
              Shop by Room Type
            </h3>
            <p className="text-gray-600 mt-2">
              Find furniture perfectly suited for your specific workspace
            </p>
          </div>
          <Link
            href="/furniture"
            className="text-red-700 font-semibold hover:text-red-900 transition-colors duration-300 flex items-center gap-2"
          >
            View All Rooms
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

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { name: "Private Office", slug: "private-office" },
            { name: "Meeting Room", slug: "meeting-room" },
            { name: "Open Office", slug: "open-office" },
            { name: "Reception", slug: "reception" },
          ].map((room, index) => (
            <Link key={index} href={`/rooms/${room.slug}`}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={isCardsInView ? { opacity: 1, y: 0 } : {}}
                transition={{
                  duration: 0.6,
                  ease: [0.22, 1, 0.36, 1],
                  delay: 0.7 + (index * 0.1)
                }}
                className="group p-6 bg-gradient-to-br from-gray-50 to-white border-2 border-red-100 hover:border-red-700 hover:shadow-xl transition-all duration-300 cursor-pointer"
              >
                <h4 className="font-bold text-base md:text-lg mb-2 group-hover:text-red-700 transition-colors duration-300">
                  {room.name}
                </h4>
                <div className="flex items-center gap-2 text-sm text-gray-600 group-hover:text-red-700 group-hover:gap-3 transition-all duration-300">
                  Browse
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
                </div>
              </motion.div>
            </Link>
          ))}
        </div>
      </motion.div>

      {/* CTA Section */}
      <motion.div
        ref={ctaRef}
        initial={{ opacity: 0, y: 30 }}
        animate={isCtaInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="relative z-10 w-full flex flex-col md:flex-row items-center justify-between gap-8 pt-12 border-t-2 border-red-100 mt-8"
      >
        <div className="flex flex-col gap-3 max-w-2xl">
          <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold">
            Can&apos;t find what you&apos;re looking for?
          </h3>
          <p className="text-base md:text-lg text-gray-600 leading-relaxed">
            Our team is here to help. We can source specific products, provide
            expert recommendations, and create custom furniture solutions for
            your unique workspace needs.
          </p>
        </div>
        <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
          <Link
            href="/furniture"
            className="group px-8 py-4 bg-gradient-to-r from-red-900 to-red-700 text-white font-semibold uppercase tracking-wider hover:from-red-800 hover:to-red-600 transition-all duration-300 flex items-center justify-center gap-2 whitespace-nowrap"
          >
            Browse All Products
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
          <Link
            href="/contact"
            className="px-8 py-4 bg-white border-2 border-red-700 text-red-700 font-semibold uppercase tracking-wider hover:bg-red-700 hover:text-white transition-all duration-300 flex items-center justify-center gap-2 whitespace-nowrap"
          >
            Get Expert Help
          </Link>
        </div>
      </motion.div>
    </div>
  )
}

// Category Card Component
const CategoryCard = ({ category, index, isInView }: { category: Category; index: number; isInView: boolean }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{
        duration: 0.8,
        ease: [0.22, 1, 0.36, 1],
        delay: index * 0.1
      }}
    >
      <Link href={`/categories/${category.slug}`}>
        <div className="group relative overflow-hidden rounded-xl border-2 border-red-100/50 hover:border-red-500 transition-all duration-300 h-[500px] cursor-pointer bg-black shadow-lg hover:shadow-2xl hover:shadow-[0_0_30px_rgba(220,38,38,0.3)]">
          {/* Background Image */}
          {category.image_url && (
            <>
              <div className="absolute inset-0">
                <Image
                  src={category.image_url}
                  alt={category.name}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110 group-hover:brightness-110"
                />
              </div>
              {/* Dark gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent group-hover:from-black/70 group-hover:via-black/30 transition-all duration-300" />
            </>
          )}

          {/* Content */}
          <div className="relative z-10 h-full flex flex-col p-8">
            {/* Top - Unified Glassmorphism Badge */}
            <div className="flex items-start mb-auto">
              <div className="flex items-center gap-3 px-4 py-3 bg-white/10 backdrop-blur-md backdrop-saturate-150 border border-white/20 rounded-lg shadow-xl hover:bg-white/20 hover:border-white/30 transition-all duration-300">
                <div className="text-white">
                  {getCategoryIcon(category.icon_name)}
                </div>
                <div className="border-l border-white/30 h-8"></div>
                <div className="text-white text-lg font-bold">
                  {category.product_count}+
                </div>
              </div>
            </div>

            {/* Bottom - Title, Description */}
            <div className="space-y-4">
              <h3 className="text-3xl font-bold text-white group-hover:text-white group-hover:drop-shadow-lg transition-all duration-300">
                {category.name}
              </h3>
              {category.description && (
                <p className="text-base text-gray-200 leading-relaxed line-clamp-2">
                  {category.description}
                </p>
              )}

              {/* Arrow */}
              <div className="flex items-center gap-2 text-white/80 font-semibold group-hover:text-white group-hover:gap-4 underline-offset-4 group-hover:underline transition-all duration-300 pt-2">
                <span>Explore Category</span>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  )
}

export default FurnitureCatalogSection
