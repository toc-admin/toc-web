'use client'

import { useEffect, useRef } from "react"
import Link from "next/link"
import Image from "next/image"
import gsap from "gsap"

interface ProductCardProps {
  product: {
    id: string
    name: string
    slug: string
    short_description?: string | null
    brand?: {
      name: string
    } | null
    category?: {
      name: string
    } | null
    subcategory?: string | null
    is_new: boolean
    is_featured: boolean
    product_images?: Array<{
      image_url: string
      thumbnail_url?: string | null
      is_primary: boolean
    }>
    product_features?: Array<{
      feature_name: string
    }>
  }
  index?: number
  isInView?: boolean
}

const ProductCard = ({ product, index = 0, isInView = true }: ProductCardProps) => {
  const cardRef = useRef<HTMLDivElement>(null)
  const hasAnimated = useRef(false)

  // Get the primary image or first image
  const primaryImage = product.product_images?.find(img => img.is_primary) || product.product_images?.[0]
  const imageUrl = primaryImage?.thumbnail_url || primaryImage?.image_url

  // Use a placeholder if no image is available
  const hasImage = imageUrl && imageUrl.trim() !== ''

  // GSAP animation with Intersection Observer
  useEffect(() => {
    const card = cardRef.current
    if (!card) return

    // If parent says we're already in view, skip the animation setup
    // This prevents conflicts when parent components handle their own animations
    if (isInView) {
      gsap.set(card, {
        opacity: 1,
        y: 0,
        scale: 1
      })
      return
    }

    // Set initial state
    gsap.set(card, {
      opacity: 0,
      y: 40,
      scale: 0.95
    })

    // Create intersection observer with low threshold
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasAnimated.current) {
            hasAnimated.current = true

            // Animate in when in view
            gsap.to(card, {
              opacity: 1,
              y: 0,
              scale: 1,
              duration: 0.8,
              delay: (index % 12) * 0.08, // Stagger effect per batch of 12
              ease: "power3.out"
            })
          }
        })
      },
      {
        threshold: 0.1, // Trigger when 10% of the element is visible
        rootMargin: "50px" // Start animating 50px before element enters viewport
      }
    )

    observer.observe(card)

    return () => {
      observer.disconnect()
    }
  }, [index, isInView])

  return (
    <div
      ref={cardRef}
      className="h-full"
    >
      <Link href={`/products/${product.slug}`}>
        <div className="group h-full flex flex-col bg-white border-2 border-gray-100 hover:border-red-700 transition-all duration-300 overflow-hidden hover:shadow-2xl cursor-pointer">
          {/* Product Image */}
          <div className="relative w-full h-72 bg-gray-100 overflow-hidden">
            {hasImage ? (
              <Image
                src={imageUrl}
                alt={product.name}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                onError={(e) => {
                  console.error('Image load error:', imageUrl, e)
                }}
                priority={index < 2}
              />
            ) : (
              <div className="absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200">
                <svg className="w-20 h-20 text-gray-400 mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <span className="text-sm text-gray-500 font-medium">No Image Available</span>
              </div>
            )}

            {/* Overlay on hover */}
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-all duration-500" />

            {/* Badges */}
            <div className="absolute top-4 left-4 flex flex-col gap-2">
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

            {/* Quick View Button - appears on hover */}
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
              <button className="px-6 py-3 bg-white text-black font-semibold uppercase tracking-wider hover:bg-red-700 hover:text-white transition-all duration-300 shadow-lg">
                Quick View
              </button>
            </div>
          </div>

          {/* Product Info */}
          <div className="flex-1 flex flex-col p-6 space-y-3">
            {/* Brand */}
            {product.brand && (
              <span className="text-xs font-semibold uppercase tracking-wider text-red-700">
                {product.brand.name}
              </span>
            )}

            {/* Product Name */}
            <h3 className="text-lg font-bold text-gray-900 leading-tight group-hover:text-red-700 transition-colors duration-300 line-clamp-2">
              {product.name}
            </h3>

            {/* Category */}
            {product.category && (
              <p className="text-sm text-gray-500">
                {product.category.name}
              </p>
            )}

            {/* Short Description */}
            {product.short_description && (
              <p className="text-sm text-gray-600 leading-relaxed line-clamp-3">
                {product.short_description}
              </p>
            )}

            {/* Spacer */}
            <div className="flex-1" />

            {/* CTA Button */}
            <button className="w-full px-6 py-3 bg-gradient-to-r from-red-900 to-red-700 text-white font-semibold uppercase tracking-wider hover:from-red-800 hover:to-red-600 transition-all duration-300 flex items-center justify-center gap-2 group-hover:gap-3">
              View More
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
            </button>
          </div>
        </div>
      </Link>
    </div>
  )
}

export default ProductCard
