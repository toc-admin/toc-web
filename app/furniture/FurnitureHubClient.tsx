'use client'

import { useRef, useState } from "react"
import { motion, useInView } from "framer-motion"
import Link from "next/link"
import Image from "next/image"
import { Swiper, SwiperSlide } from "swiper/react"
import { Navigation, Pagination, A11y } from "swiper/modules"
import type { Swiper as SwiperType } from 'swiper'
import ProductCard from "@/components/ProductCard"
import "swiper/css"
import "swiper/css/navigation"
import "swiper/css/pagination"

interface Category {
  id: string
  name: string
  slug: string
  description: string | null
  icon_name: string | null
  image_url: string | null
  product_count: number
}

interface Room {
  id: string
  name: string
  slug: string
  emoji: string | null
  description: string | null
  hero_image_url: string | null
}

interface Product {
  id: string
  name: string
  slug: string
  short_description?: string | null
  subcategory: string | null
  is_new: boolean
  is_featured: boolean
  brand: { name: string } | null
  category: { name: string } | null
  product_images: Array<{
    image_url: string
    thumbnail_url: string | null
    medium_url: string | null
    is_primary: boolean
  }>
  product_features: Array<{
    feature_name: string
  }>
}

interface FurnitureHubClientProps {
  categories: Category[]
  rooms: Room[]
  featuredProducts: Product[]
  stats: {
    totalProducts: number
    totalBrands: number
    totalCategories: number
  }
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

// Icon mapping for rooms
const getRoomIcon = () => {
  return (
    <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
    </svg>
  )
}

export default function FurnitureHubClient({
  categories,
  rooms,
  featuredProducts,
  stats
}: FurnitureHubClientProps) {
  const [swiperRef, setSwiperRef] = useState<SwiperType | null>(null)
  const [activeIndex, setActiveIndex] = useState(0)

  const heroRef = useRef(null)
  const categoriesRef = useRef(null)
  const featuredRef = useRef(null)
  const roomsRef = useRef(null)
  const statsRef = useRef(null)

  const isHeroInView = useInView(heroRef, { once: true, amount: 0.3 })
  const isCategoriesInView = useInView(categoriesRef, { once: true, amount: 0.2 })
  const isFeaturedInView = useInView(featuredRef, { once: true, amount: 0.2 })
  const isRoomsInView = useInView(roomsRef, { once: true, amount: 0.3 })
  const isStatsInView = useInView(statsRef, { once: true, amount: 0.5 })

  return (
    <div className="w-full">
      {/* Hero Section */}
      <section
        ref={heroRef}
        className="relative min-h-[70vh] flex items-center justify-center px-4 sm:px-6 md:px-12 lg:px-24 xl:px-44 py-32 md:py-40 text-white overflow-hidden"
      >
        {/* Background Image */}
        <div className="absolute inset-0">
          <Image
            src="/typeImages/furniture-hub.webp"
            alt="Furniture Hub"
            fill
            className="object-cover"
            priority
          />
        </div>

        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-black/60" />

        <div className="relative z-10 max-w-5xl mx-auto text-center">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={isHeroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="inline-block text-sm font-bold uppercase tracking-widest text-red-400 mb-6"
          >
            Furniture Catalog
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={isHeroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black leading-[1.1] tracking-tight mb-6"
          >
            Premium Office
            <br />
            <span className="bg-gradient-to-r from-red-400 via-red-500 to-red-600 bg-clip-text text-transparent">
              Furniture Solutions
            </span>
          </motion.h1>

          <motion.div
            initial={{ scaleX: 0 }}
            animate={isHeroInView ? { scaleX: 1 } : {}}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.3 }}
            className="h-1 bg-gradient-to-r from-red-500 to-red-300 w-32 mx-auto mb-8"
          />

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isHeroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.4 }}
            className="text-lg md:text-xl text-white/80 leading-relaxed max-w-3xl mx-auto mb-12"
          >
            Discover over {stats.totalProducts}+ carefully curated products from world-renowned brands.
            Browse by category, room type, or let our experts guide you.
          </motion.p>

          {/* Search Bar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isHeroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.5 }}
            className="max-w-2xl mx-auto"
          >
            <div className="relative">
              <input
                type="text"
                placeholder="Search for furniture... (e.g., office chairs, standing desks)"
                className="w-full px-6 py-4 pr-32 rounded-full bg-white/10 backdrop-blur-md border-2 border-white/20 text-white placeholder-white/60 focus:outline-none focus:border-red-500 transition-all duration-300"
              />
              <button className="absolute right-2 top-1/2 -translate-y-1/2 px-6 py-2 bg-gradient-to-r from-red-900 to-red-700 text-white font-semibold rounded-full hover:from-red-800 hover:to-red-600 transition-all duration-300">
                Search
              </button>
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isHeroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.6 }}
            className="flex flex-wrap items-center justify-center gap-3 mt-8"
          >
            <span className="text-sm text-white/60">Quick links:</span>
            {["Office Chairs", "Standing Desks", "Phone Booths", "Lounge Seating"].map((term, index) => (
              <button
                key={index}
                className="px-4 py-2 text-sm bg-white/10 hover:bg-white/20 border border-white/20 hover:border-white/40 rounded-full transition-all duration-300"
              >
                {term}
              </button>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Stats Bar */}
      <section
        ref={statsRef}
        className="relative bg-white border-y-2 border-red-100 py-12"
      >
        <div className="px-4 sm:px-6 md:px-12 lg:px-24 xl:px-44">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { number: `${stats.totalProducts}+`, label: "Products" },
              { number: `${stats.totalCategories}`, label: "Categories" },
              { number: `${stats.totalBrands}+`, label: "Premium Brands" },
              { number: "100%", label: "Quality Guaranteed" },
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={isStatsInView ? { opacity: 1, y: 0 } : {}}
                transition={{
                  duration: 0.6,
                  ease: [0.22, 1, 0.36, 1],
                  delay: index * 0.1,
                }}
                className="text-center"
              >
                <div className="text-4xl md:text-5xl font-black bg-gradient-to-r from-red-900 to-red-700 bg-clip-text text-transparent mb-2">
                  {stat.number}
                </div>
                <div className="text-sm md:text-base text-gray-600 font-semibold uppercase tracking-wider">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Main Categories Section */}
      <section
        ref={categoriesRef}
        className="px-4 sm:px-6 md:px-12 lg:px-24 xl:px-44 py-24 md:py-32 bg-gradient-to-br from-white via-red-50/20 to-white relative overflow-hidden"
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

        <div className="relative z-10">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isCategoriesInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="mb-16 max-w-3xl"
          >
            <span className="text-sm font-bold uppercase tracking-widest text-red-800">
              Browse by Category
            </span>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-black mt-4 mb-6 leading-tight">
              Find Exactly What
              <br />
              <span className="bg-gradient-to-r from-red-900 via-red-700 to-red-600 bg-clip-text text-transparent">
                You Need
              </span>
            </h2>
            <div className="h-1 bg-gradient-to-r from-red-900 to-red-700 w-32 mb-6" />
            <p className="text-base md:text-lg text-gray-700 leading-relaxed">
              Explore our {stats.totalCategories} main furniture categories, each containing specialized
              subcategories to help you find the perfect pieces for your workspace.
            </p>
          </motion.div>

          {/* Category Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {categories.map((category, index) => (
              <CategoryCard
                key={category.id}
                category={category}
                index={index}
                isInView={isCategoriesInView}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products Section */}
      {featuredProducts.length > 0 && (
        <section
          ref={featuredRef}
          className="px-4 sm:px-6 md:px-12 lg:px-24 xl:px-44 py-24 md:py-32 bg-white relative overflow-hidden"
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

          <div className="relative z-10">
            {/* Header with Navigation */}
            <div className="flex flex-col lg:flex-row items-start lg:items-end justify-between gap-8 mb-16">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={isFeaturedInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                className="max-w-3xl"
              >
                <span className="text-sm font-bold uppercase tracking-widest text-red-800">
                  Curated Selection
                </span>
                <h2 className="text-4xl md:text-5xl lg:text-6xl font-black mt-4 mb-6 leading-tight">
                  Featured
                  <br />
                  <span className="bg-gradient-to-r from-red-900 via-red-700 to-red-600 bg-clip-text text-transparent">
                    Products
                  </span>
                </h2>
                <div className="h-1 bg-gradient-to-r from-red-900 to-red-700 w-32 mb-6" />
                <p className="text-base md:text-lg text-gray-700 leading-relaxed">
                  Discover our hand-picked selection of premium furniture pieces
                  from world-renowned brands, chosen for their exceptional quality
                  and design.
                </p>
              </motion.div>

              {/* Custom Navigation & Counter */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={isFeaturedInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
                className="flex items-center gap-4"
              >
                {/* Slide Counter */}
                <div className="flex items-center gap-3">
                  <span className="text-2xl font-black bg-gradient-to-r from-red-900 to-red-700 bg-clip-text text-transparent">
                    {String(activeIndex + 1).padStart(2, "0")}
                  </span>
                  <div className="h-px bg-gradient-to-r from-red-700 to-transparent w-12" />
                  <span className="text-lg text-gray-400">
                    {String(featuredProducts.length).padStart(2, "0")}
                  </span>
                </div>

                {/* Navigation Buttons */}
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
                    disabled={activeIndex >= featuredProducts.length - 3}
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
              </motion.div>
            </div>

            {/* Products Slider */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={isFeaturedInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.3 }}
            >
              <Swiper
                onSwiper={setSwiperRef}
                speed={700}
                modules={[Navigation, Pagination, A11y]}
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
                {featuredProducts.map((product, productIndex) => (
                  <SwiperSlide key={product.id}>
                    <ProductCard
                      product={product}
                      index={productIndex}
                      isInView={isFeaturedInView}
                    />
                  </SwiperSlide>
                ))}
              </Swiper>
            </motion.div>

            {/* Progress Bar */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={isFeaturedInView ? { opacity: 1 } : {}}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.5 }}
              className="w-full h-1 bg-red-100 rounded-full overflow-hidden mt-12"
            >
              <motion.div
                className="h-full bg-gradient-to-r from-red-900 to-red-700"
                initial={{ width: "0%" }}
                animate={{
                  width: `${((activeIndex + 1) / featuredProducts.length) * 100}%`,
                }}
                transition={{ duration: 0.3, ease: "easeOut" }}
              />
            </motion.div>
          </div>
        </section>
      )}

      {/* Shop by Room Section */}
      {rooms.length > 0 && (
        <section
          ref={roomsRef}
          className="px-4 sm:px-6 md:px-12 lg:px-24 xl:px-44 py-24 md:py-32 bg-gray-50"
        >
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isRoomsInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="mb-16 max-w-3xl"
          >
            <span className="text-sm font-bold uppercase tracking-widest text-red-800">
              Shop by Room Type
            </span>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-black mt-4 mb-6 leading-tight">
              Design Complete
              <br />
              <span className="bg-gradient-to-r from-red-900 via-red-700 to-red-600 bg-clip-text text-transparent">
                Room Solutions
              </span>
            </h2>
            <div className="h-1 bg-gradient-to-r from-red-900 to-red-700 w-32 mb-6" />
            <p className="text-base md:text-lg text-gray-700 leading-relaxed">
              Browse furniture curated specifically for different workspace zones.
              From welcoming reception areas to productive private offices.
            </p>
          </motion.div>

          {/* Room Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {rooms.map((room, index) => (
              <RoomCard
                key={room.id}
                room={room}
                index={index}
                isInView={isRoomsInView}
              />
            ))}
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className="px-4 sm:px-6 md:px-12 lg:px-24 xl:px-44 py-24 bg-gradient-to-br from-gray-900 via-red-950 to-black text-white">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-4xl mx-auto text-center"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
            Need Help Finding the Perfect Furniture?
          </h2>
          <p className="text-lg md:text-xl text-white/80 mb-8 leading-relaxed">
            Our expert team can help you select the right furniture for your space,
            provide custom quotes, and guide you through the entire process.
          </p>
          <div className="flex justify-center">
            <Link
              href="/contact"
              className="px-8 py-4 bg-white text-black font-semibold uppercase tracking-wider hover:bg-gray-100 transition-all duration-300"
            >
              Contact Our Experts
            </Link>
          </div>
        </motion.div>
      </section>
    </div>
  )
}

// Category Card Component
const CategoryCard = ({
  category,
  index,
  isInView
}: {
  category: Category
  index: number
  isInView: boolean
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{
        duration: 0.8,
        ease: [0.22, 1, 0.36, 1],
        delay: index * 0.1,
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
              <div className="flex items-center gap-3 px-4 py-3 m-6 bg-white/10 backdrop-blur-md backdrop-saturate-150 border border-white/20 rounded-lg shadow-xl hover:bg-white/20 hover:border-white/30 transition-all duration-300">
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

// Room Card Component
const RoomCard = ({
  room,
  index,
  isInView
}: {
  room: Room
  index: number
  isInView: boolean
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1],
        delay: index * 0.1,
      }}
    >
      <Link href={`/rooms/${room.slug}`}>
        <div className="group relative overflow-hidden border-2 border-red-100 hover:border-red-700 transition-all duration-300 h-[400px] cursor-pointer bg-black hover:shadow-2xl">
          {/* Background Image */}
          {room.hero_image_url && (
            <>
              <div className="absolute inset-0">
                <Image
                  src={room.hero_image_url}
                  alt={room.name}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
              </div>
              {/* Dark overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-black/30 group-hover:from-black/85 group-hover:via-black/45 transition-all duration-500" />
            </>
          )}

          {/* Content */}
          <div className="relative z-10 h-full flex flex-col justify-between p-8">
            {/* Top - Icon in Badge */}
            <div className="flex justify-start">
              <div className="text-red-700 bg-white/95 backdrop-blur-sm w-16 h-16 flex items-center justify-center group-hover:bg-white transition-all duration-300 shadow-lg">
                {getRoomIcon()}
              </div>
            </div>

            {/* Bottom - Title & Description */}
            <div className="space-y-3">
              <h3 className="text-2xl md:text-3xl font-bold text-white group-hover:text-red-300 transition-colors duration-300">
                {room.name}
              </h3>
              {room.description && (
                <p className="text-base text-gray-200 leading-relaxed">
                  {room.description}
                </p>
              )}

              {/* Explore Link */}
              <div className="flex items-center gap-2 text-red-400 font-semibold group-hover:text-white group-hover:gap-4 transition-all duration-300 pt-2">
                <span>Explore Room</span>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </div>
            </div>
          </div>

          {/* Hover Border Effect */}
          <div className="absolute inset-0 border-4 border-red-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
        </div>
      </Link>
    </motion.div>
  )
}
