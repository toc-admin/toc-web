'use client'

import { useState, useRef, useEffect } from "react"
import { createPortal } from "react-dom"
import { motion, useInView } from "framer-motion"
import Link from "next/link"
import Image from "next/image"
import gsap from "gsap"
import { Swiper, SwiperSlide } from "swiper/react"
import { Navigation, Pagination, Thumbs, FreeMode } from "swiper/modules"
import type { Swiper as SwiperType } from 'swiper'
import ProductCard from "@/components/ProductCard"
import "swiper/css"
import "swiper/css/navigation"
import "swiper/css/pagination"
import "swiper/css/thumbs"
import "swiper/css/free-mode"

// Custom styles for Swiper to ensure proper height
const swiperStyles = `
  .product-gallery-swiper .swiper-slide {
    height: auto;
    aspect-ratio: 1 / 1;
  }
  .product-thumbs-swiper {
    height: auto !important;
  }
  .product-thumbs-swiper .swiper-slide {
    width: 100%;
    height: auto !important;
  }
  .product-thumbs-swiper .swiper-slide > div {
    position: relative;
    width: 100%;
    padding-bottom: 100%; /* Creates 1:1 aspect ratio */
  }
  .product-thumbs-swiper .swiper-slide > div > span {
    position: absolute !important;
    top: 0;
    left: 0;
    width: 100% !important;
    height: 100% !important;
  }
`

interface ProductDetailClientProps {
  product: any
  relatedProducts: any[]
}

export default function ProductDetailClient({ product, relatedProducts }: ProductDetailClientProps) {
  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperType | null>(null)
  const [activeTab, setActiveTab] = useState("overview")
  const [selectedColor, setSelectedColor] = useState(product.product_colors?.[0] || null)
  const [showQuoteForm, setShowQuoteForm] = useState(false)

  const galleryRef = useRef(null)
  const detailsRef = useRef(null)
  const relatedRef = useRef(null)

  const isGalleryInView = useInView(galleryRef, { once: true, amount: 0.3 })
  const isDetailsInView = useInView(detailsRef, { once: true, amount: 0.2 })
  const isRelatedInView = useInView(relatedRef, { once: true, amount: 0.2 })

  // Sort images by display_order
  const sortedImages = product.product_images?.sort((a: any, b: any) => a.display_order - b.display_order) || []

  // Debug logging
  if (process.env.NODE_ENV === 'development') {
    console.log('=== PRODUCT DETAIL DEBUG ===')
    console.log('Product name:', product.name)
    console.log('Images count:', sortedImages.length)
    console.log('Images data:', sortedImages)
    if (sortedImages.length > 0) {
      console.log('First image URL:', sortedImages[0].image_url)
      console.log('First image thumbnail:', sortedImages[0].thumbnail_url)
      console.log('First image medium:', sortedImages[0].medium_url)
    }
    console.log('========================')
  }

  // Group specifications by type (dimensions, materials, etc.)
  const groupedSpecs = product.product_specifications?.reduce((acc: any, spec: any) => {
    const category = spec.spec_key.split('_')[0] || 'general'
    if (!acc[category]) acc[category] = []
    acc[category].push(spec)
    return acc
  }, {}) || {}

  // Get rooms this product works in
  const productRooms = product.product_rooms?.map((pr: any) => pr.room) || []

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: swiperStyles }} />
      <div className="w-full bg-white pt-24">
        {/* Breadcrumb */}
      <div className="px-4 sm:px-6 md:px-12 lg:px-24 xl:px-44 py-6 border-b border-gray-200">
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <Link href="/" className="hover:text-red-700 transition-colors">
            Home
          </Link>
          <span>/</span>
          <Link href="/furniture" className="hover:text-red-700 transition-colors">
            Furniture
          </Link>
          <span>/</span>
          {product.category && (
            <>
              <Link
                href={`/categories/${product.category.slug}`}
                className="hover:text-red-700 transition-colors"
              >
                {product.category.name}
              </Link>
              <span>/</span>
            </>
          )}
          <span className="text-gray-900 font-semibold">{product.name}</span>
        </div>
      </div>

      {/* Main Product Section */}
      <section className="px-4 sm:px-6 md:px-12 lg:px-24 xl:px-44 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Left: Image Gallery */}
          <motion.div
            ref={galleryRef}
            initial={{ opacity: 0, x: -50 }}
            animate={isGalleryInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="space-y-4"
          >
            {/* Badges */}
            <div className="flex items-center gap-2 mb-4">
              {product.is_new && (
                <span className="px-3 py-1 bg-red-700 text-white text-xs font-bold uppercase tracking-wider">
                  New
                </span>
              )}
              {product.is_featured && (
                <span className="px-3 py-1 bg-black text-white text-xs font-bold uppercase tracking-wider">
                  Featured
                </span>
              )}
            </div>

            {/* Main Image Swiper */}
            {sortedImages.length > 0 ? (
              <>
                <Swiper
                  modules={[Navigation, Pagination, Thumbs]}
                  thumbs={{ swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null }}
                  navigation
                  pagination={{ clickable: true }}
                  className="w-full aspect-square bg-gray-100 border-2 border-gray-200 product-gallery-swiper"
                >
                  {sortedImages.map((image: any, index: number) => (
                    <SwiperSlide key={image.id}>
                      <div className="relative w-full h-full">
                        <Image
                          src={image.medium_url || image.image_url}
                          alt={`${product.name} - Image ${index + 1}`}
                          fill
                          className="object-cover"
                          sizes="(max-width: 1024px) 100vw, 50vw"
                          priority={index === 0}
                          onError={(e) => {
                            console.error('Image load error:', image.image_url)
                          }}
                        />
                      </div>
                    </SwiperSlide>
                  ))}
                </Swiper>

                {/* Thumbnails */}
                {sortedImages.length > 1 && (
                  <Swiper
                    onSwiper={setThumbsSwiper}
                    modules={[Thumbs, FreeMode]}
                    spaceBetween={12}
                    slidesPerView={4}
                    freeMode={true}
                    watchSlidesProgress={true}
                    className="w-full product-thumbs-swiper"
                  >
                    {sortedImages.map((image: any, index: number) => (
                      <SwiperSlide key={image.id}>
                        <div className="bg-gray-100 border-2 border-gray-200 hover:border-red-700 transition-all cursor-pointer overflow-hidden">
                          <Image
                            src={image.thumbnail_url || image.image_url}
                            alt={`Thumbnail ${index + 1}`}
                            fill
                            className="object-cover"
                            sizes="(max-width: 1024px) 25vw, 12.5vw"
                            onError={(e) => {
                              console.error('Thumbnail load error:', image.thumbnail_url || image.image_url)
                            }}
                          />
                        </div>
                      </SwiperSlide>
                    ))}
                  </Swiper>
                )}
              </>
            ) : (
              <div className="w-full aspect-square bg-gray-100 border-2 border-gray-200 flex items-center justify-center">
                <span className="text-gray-400">No images available</span>
              </div>
            )}
          </motion.div>

          {/* Right: Product Info */}
          <motion.div
            ref={detailsRef}
            initial={{ opacity: 0, x: 50 }}
            animate={isDetailsInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="space-y-6"
          >
            {/* Brand */}
            {product.brand && (
              <Link
                href={`/brands/${product.brand.slug}`}
                className="inline-block hover:opacity-70 transition-opacity"
              >
                {product.brand.logo_url ? (
                  <Image
                    src={product.brand.logo_url}
                    alt={product.brand.name}
                    width={120}
                    height={40}
                    className="h-10 w-auto object-contain"
                  />
                ) : (
                  <span className="text-lg font-bold text-gray-700">{product.brand.name}</span>
                )}
              </Link>
            )}

            {/* Product Name */}
            <div>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-black leading-tight mb-2">
                {product.name}
              </h1>
              {product.sku && (
                <p className="text-sm text-gray-500 uppercase tracking-wider">
                  SKU: {product.sku}
                </p>
              )}
            </div>

            {/* Category */}
            {product.category && (
              <div className="flex items-center gap-2">
                <Link
                  href={`/categories/${product.category.slug}`}
                  className="text-sm font-semibold text-red-700 hover:text-red-900 transition-colors"
                >
                  {product.category.name}
                </Link>
              </div>
            )}

            {/* Short Description */}
            {product.short_description && (
              <p className="text-base md:text-lg text-gray-700 leading-relaxed">
                {product.short_description}
              </p>
            )}

            {/* Divider */}
            <div className="h-px bg-gray-200" />

            {/* Color Selection */}
            {product.product_colors && product.product_colors.length > 0 && (
              <div>
                <h3 className="text-sm font-bold uppercase tracking-wider text-gray-700 mb-3">
                  Available Colors
                </h3>
                <div className="flex items-center gap-3 flex-wrap">
                  {product.product_colors.map((color: any) => (
                    <button
                      key={color.id}
                      onClick={() => setSelectedColor(color)}
                      className={`group relative w-12 h-12 rounded-full border-2 transition-all ${
                        selectedColor?.id === color.id
                          ? "border-red-700 scale-110"
                          : "border-gray-300 hover:border-gray-400"
                      }`}
                      title={color.color_name}
                    >
                      <div
                        className="w-full h-full rounded-full"
                        style={{ backgroundColor: color.hex_code || '#cccccc' }}
                      />
                      {selectedColor?.id === color.id && (
                        <div className="absolute inset-0 flex items-center justify-center">
                          <svg
                            className="w-6 h-6 text-white drop-shadow-lg"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path
                              fillRule="evenodd"
                              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </div>
                      )}
                    </button>
                  ))}
                </div>
                {selectedColor && (
                  <p className="text-sm text-gray-600 mt-2">
                    Selected: <span className="font-semibold">{selectedColor.color_name}</span>
                  </p>
                )}
              </div>
            )}

            {/* Features */}
            {product.product_features && product.product_features.length > 0 && (
              <div>
                <h3 className="text-sm font-bold uppercase tracking-wider text-gray-700 mb-3">
                  Key Features
                </h3>
                <div className="grid grid-cols-2 gap-3">
                  {product.product_features.map((feature: any) => (
                    <div
                      key={feature.id}
                      className="flex items-center gap-2 text-sm text-gray-700"
                    >
                      <svg
                        className="w-5 h-5 text-red-700 flex-shrink-0"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                      <span>{feature.feature_name}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Divider */}
            <div className="h-px bg-gray-200" />

            {/* CTAs */}
            <div className="space-y-3">
              <button
                onClick={() => setShowQuoteForm(true)}
                className="w-full px-8 py-4 bg-gradient-to-r from-red-900 to-red-700 text-white font-semibold uppercase tracking-wider hover:from-red-800 hover:to-red-600 transition-all duration-300 flex items-center justify-center gap-2"
              >
                Request a Quote
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
              </button>

              <div className="grid grid-cols-2 gap-3">
                {product.datasheet_url && (
                  <a
                    href={product.datasheet_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-6 py-3 bg-white border-2 border-gray-300 text-gray-700 font-semibold text-sm uppercase tracking-wider hover:border-red-700 hover:text-red-700 transition-all duration-300 flex items-center justify-center gap-2"
                  >
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
                        d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                      />
                    </svg>
                    Datasheet
                  </a>
                )}

                <Link
                  href="/contact"
                  className="px-6 py-3 bg-white border-2 border-gray-300 text-gray-700 font-semibold text-sm uppercase tracking-wider hover:border-red-700 hover:text-red-700 transition-all duration-300 flex items-center justify-center gap-2"
                >
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
                      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                  Contact
                </Link>
              </div>
            </div>

            {/* Suitable For Rooms */}
            {productRooms.length > 0 && (
              <div className="pt-6 border-t-2 border-gray-200">
                <h3 className="text-sm font-bold uppercase tracking-wider text-gray-700 mb-3">
                  Works Great In
                </h3>
                <div className="flex flex-wrap gap-2">
                  {productRooms.map((room: any) => (
                    <Link
                      key={room.id}
                      href={`/rooms/${room.slug}`}
                      className="px-4 py-2 bg-red-50 border border-red-200 text-red-700 text-sm font-medium hover:bg-red-100 transition-colors"
                    >
                      {room.name}
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </motion.div>
        </div>
      </section>

      {/* Tabs Section */}
      <section className="px-4 sm:px-6 md:px-12 lg:px-24 xl:px-44 py-12 bg-gray-50">
        {/* Tab Navigation */}
        <div className="border-b-2 border-gray-200 mb-8">
          <div className="flex gap-0 overflow-x-auto">
            {["overview", "specifications", "certifications"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-8 py-4 font-semibold uppercase tracking-wider transition-all ${
                  activeTab === tab
                    ? "border-b-4 border-red-700 text-red-700"
                    : "text-gray-600 hover:text-gray-900"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* Tab Content */}
        <div className="max-w-4xl">
          {activeTab === "overview" && product.long_description && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="prose prose-lg max-w-none"
            >
              <h2 className="text-2xl font-bold mb-4">Product Overview</h2>
              <div className="text-gray-700 leading-relaxed whitespace-pre-line">
                {product.long_description}
              </div>
            </motion.div>
          )}

          {activeTab === "specifications" && Object.keys(groupedSpecs).length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="space-y-8"
            >
              {Object.entries(groupedSpecs).map(([category, specs]: [string, any]) => (
                <div key={category}>
                  <h3 className="text-xl font-bold mb-4 capitalize">{category}</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {specs.map((spec: any) => (
                      <div
                        key={spec.id}
                        className="flex justify-between p-4 bg-white border border-gray-200"
                      >
                        <span className="font-semibold text-gray-700">
                          {spec.spec_key.split('_').slice(1).join(' ')}:
                        </span>
                        <span className="text-gray-600">{spec.spec_value}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </motion.div>
          )}

          {activeTab === "certifications" && product.product_certifications && product.product_certifications.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h3 className="text-2xl font-bold mb-6">Certifications & Standards</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {product.product_certifications.map((cert: any) => (
                  <div
                    key={cert.id}
                    className="flex items-center gap-3 p-4 bg-white border-2 border-gray-200"
                  >
                    <svg
                      className="w-8 h-8 text-green-600 flex-shrink-0"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    <span className="font-semibold text-gray-800">{cert.certification_name}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </div>
      </section>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <section
          ref={relatedRef}
          className="px-4 sm:px-6 md:px-12 lg:px-24 xl:px-44 py-16 bg-white"
        >
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isRelatedInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-black mb-2">
              You Might Also Like
            </h2>
            <div className="h-1 bg-gradient-to-r from-red-900 to-red-700 w-32" />
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {relatedProducts.map((relatedProduct, index) => (
              <ProductCard
                key={relatedProduct.id}
                product={relatedProduct}
                index={index}
                isInView={isRelatedInView}
              />
            ))}
          </div>
        </section>
      )}

      {/* Quote Form Modal */}
      {showQuoteForm && (
        <QuoteFormModal
          product={product}
          onClose={() => setShowQuoteForm(false)}
        />
      )}
    </div>
    </>
  )
}

// Quote Form Modal Component
interface QuoteFormModalProps {
  product: any
  onClose: () => void
}

function QuoteFormModal({ product, onClose }: QuoteFormModalProps) {
  const [mounted, setMounted] = useState(false)
  const modalRef = useRef<HTMLDivElement>(null)
  const backdropRef = useRef<HTMLDivElement>(null)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    quantity: "1",
    message: "",
  })

  useEffect(() => {
    setMounted(true)
    // Prevent body scroll when modal is open
    document.body.style.overflow = 'hidden'
    document.documentElement.style.overflow = 'hidden'

    // Stop Lenis smooth scroll when modal is open
    const lenis = (window as any).lenis
    if (lenis) {
      lenis.stop()
    }

    // GSAP animation on mount
    if (backdropRef.current && modalRef.current) {
      gsap.fromTo(backdropRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.3, ease: "power2.out" }
      )
      gsap.fromTo(modalRef.current,
        { opacity: 0, scale: 0.9, y: 20 },
        { opacity: 1, scale: 1, y: 0, duration: 0.4, ease: "power3.out" }
      )
    }

    return () => {
      document.body.style.overflow = ''
      document.documentElement.style.overflow = ''
      // Resume Lenis
      if (lenis) {
        lenis.start()
      }
    }
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    // TODO: Implement quote request submission to Supabase
    console.log("Quote request:", { ...formData, productId: product.id, productName: product.name })

    // For now, just show alert
    alert("Quote request sent! We'll contact you soon.")
    onClose()
  }

  const modalContent = (
    <div
      ref={backdropRef}
      className="fixed top-0 left-0 right-0 bottom-0 w-screen h-screen z-[99999] flex items-center justify-center p-4 bg-black/70"
      style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', zIndex: 99999 }}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose()
      }}
    >
      <div
        ref={modalRef}
        className="bg-white w-full max-w-2xl max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="sticky top-0 bg-gradient-to-r from-red-900 to-red-700 text-white p-6 flex items-center justify-between z-10">
          <h2 className="text-2xl font-bold">Request a Quote</h2>
          <button
            onClick={onClose}
            className="text-white hover:text-gray-200 transition-colors"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        {/* Product Info */}
        <div className="p-6 bg-gray-50 border-b-2 border-gray-200">
          <div className="flex items-center gap-4">
            {product.product_images?.[0] && (
              <div className="relative w-20 h-20 border-2 border-gray-200">
                <Image
                  src={product.product_images[0].thumbnail_url || product.product_images[0].image_url}
                  alt={product.name}
                  fill
                  className="object-cover"
                  sizes="80px"
                />
              </div>
            )}
            <div>
              <h3 className="font-bold text-lg">{product.name}</h3>
              <p className="text-sm text-gray-600">{product.brand?.name}</p>
              {product.sku && (
                <p className="text-xs text-gray-500">SKU: {product.sku}</p>
              )}
            </div>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Full Name *
              </label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-4 py-3 border-2 border-gray-200 focus:border-red-700 focus:outline-none transition-colors"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Email Address *
              </label>
              <input
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-4 py-3 border-2 border-gray-200 focus:border-red-700 focus:outline-none transition-colors"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Phone Number
              </label>
              <input
                type="tel"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="w-full px-4 py-3 border-2 border-gray-200 focus:border-red-700 focus:outline-none transition-colors"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Company Name
              </label>
              <input
                type="text"
                value={formData.company}
                onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                className="w-full px-4 py-3 border-2 border-gray-200 focus:border-red-700 focus:outline-none transition-colors"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Quantity *
            </label>
            <input
              type="number"
              required
              min="1"
              value={formData.quantity}
              onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
              className="w-full px-4 py-3 border-2 border-gray-200 focus:border-red-700 focus:outline-none transition-colors"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Additional Requirements
            </label>
            <textarea
              rows={4}
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              placeholder="Tell us about your project, preferred delivery date, or any special requirements..."
              className="w-full px-4 py-3 border-2 border-gray-200 focus:border-red-700 focus:outline-none transition-colors resize-none"
            />
          </div>

          <div className="flex gap-3 pt-4">
            <button
              type="submit"
              className="flex-1 px-8 py-4 bg-gradient-to-r from-red-900 to-red-700 text-white font-semibold uppercase tracking-wider hover:from-red-800 hover:to-red-600 transition-all duration-300"
            >
              Send Quote Request
            </button>
            <button
              type="button"
              onClick={onClose}
              className="px-8 py-4 bg-gray-200 text-gray-700 font-semibold uppercase tracking-wider hover:bg-gray-300 transition-all duration-300"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  )

  // Use portal to render modal outside Lenis scroll container
  if (!mounted) return null
  const portalRoot = document.getElementById('modal-root') || document.body
  return createPortal(modalContent, portalRoot)
}
