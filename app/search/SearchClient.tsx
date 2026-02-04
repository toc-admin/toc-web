'use client'

import { useState, useRef, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import ProductCard from '@/components/ProductCard'
import gsap from 'gsap'

interface Product {
  id: string
  name: string
  slug: string
  short_description?: string | null
  subcategory: string | null
  is_new: boolean
  is_featured: boolean
  brand: { name: string; slug: string } | null
  category: { name: string; slug: string } | null
  product_images: Array<{
    image_url: string
    thumbnail_url: string | null
    medium_url: string | null
    is_primary: boolean
    display_order: number
  }>
  product_rooms?: Array<{
    room: { name: string; slug: string }
  }>
}

interface SearchClientProps {
  query: string
  products: Product[]
}

export default function SearchClient({ query, products }: SearchClientProps) {
  const router = useRouter()
  const [searchInput, setSearchInput] = useState(query)
  const heroRef = useRef<HTMLElement>(null)
  const resultsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (heroRef.current) {
      gsap.fromTo(
        heroRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' }
      )
    }
  }, [])

  useEffect(() => {
    if (resultsRef.current && products.length > 0) {
      const cards = resultsRef.current.querySelectorAll('.product-card')
      gsap.fromTo(
        cards,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.08,
          ease: 'power3.out',
        }
      )
    }
  }, [products])

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchInput.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchInput.trim())}`)
    }
  }

  return (
    <div className="w-full">
      {/* Hero Section */}
      <section
        ref={heroRef}
        className="relative py-32 md:py-40 px-4 sm:px-6 md:px-12 lg:px-24 xl:px-44 bg-gradient-to-br from-gray-900 via-red-950 to-black text-white"
      >
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `repeating-linear-gradient(
                45deg,
                transparent,
                transparent 35px,
                rgba(255,255,255,.1) 35px,
                rgba(255,255,255,.1) 70px
              )`,
            }}
          />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto text-center">
          {/* Breadcrumb */}
          <div className="flex items-center justify-center gap-2 text-sm text-white/60 mb-8">
            <Link href="/" className="hover:text-white transition-colors">
              Home
            </Link>
            <span>/</span>
            <Link href="/furniture" className="hover:text-white transition-colors">
              Furniture
            </Link>
            <span>/</span>
            <span className="text-white">Search</span>
          </div>

          <span className="inline-block text-sm font-bold uppercase tracking-widest text-red-400 mb-4">
            Search Results
          </span>

          <h1 className="text-4xl sm:text-5xl md:text-6xl font-black leading-tight mb-6">
            {query ? (
              <>
                Results for{' '}
                <span className="bg-gradient-to-r from-red-400 via-red-500 to-red-600 bg-clip-text text-transparent">
                  "{query}"
                </span>
              </>
            ) : (
              'Search Our Catalog'
            )}
          </h1>

          <div className="h-1 bg-gradient-to-r from-red-500 to-red-300 w-32 mx-auto mb-8" />

          {/* Search Bar */}
          <form onSubmit={handleSearch} className="max-w-2xl mx-auto relative">
            <input
              type="text"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              placeholder="Search for furniture..."
              className="w-full px-6 py-4 pr-32 rounded-full bg-white/10 backdrop-blur-md border-2 border-white/20 text-white placeholder-white/60 focus:outline-none focus:border-red-500 transition-all duration-300"
            />
            <button
              type="submit"
              className="absolute right-2 top-1/2 -translate-y-1/2 px-6 py-2 bg-gradient-to-r from-red-900 to-red-700 text-white font-semibold rounded-full hover:from-red-800 hover:to-red-600 transition-all duration-300"
            >
              Search
            </button>
          </form>

          {query && (
            <p className="mt-6 text-white/70">
              Found <span className="font-semibold text-white">{products.length}</span> product{products.length !== 1 ? 's' : ''}
            </p>
          )}
        </div>
      </section>

      {/* Results Section */}
      <section className="px-4 sm:px-6 md:px-12 lg:px-24 xl:px-44 py-16 bg-gray-50">
        {products.length > 0 ? (
          <div ref={resultsRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {products.map((product, index) => (
              <div key={product.id} className="product-card">
                <ProductCard product={product} index={index} isInView={true} />
              </div>
            ))}
          </div>
        ) : query ? (
          <div className="text-center py-16">
            <svg
              className="w-24 h-24 mx-auto text-gray-300 mb-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
            <h2 className="text-2xl font-bold text-gray-700 mb-4">No results found</h2>
            <p className="text-gray-500 mb-8 max-w-md mx-auto">
              We couldn't find any products matching "{query}". Try different keywords or browse our categories.
            </p>
            <Link
              href="/furniture"
              className="inline-block px-8 py-4 bg-gradient-to-r from-red-900 to-red-700 text-white font-semibold uppercase tracking-wider hover:from-red-800 hover:to-red-600 transition-all duration-300"
            >
              Browse All Products
            </Link>
          </div>
        ) : (
          <div className="text-center py-16">
            <svg
              className="w-24 h-24 mx-auto text-gray-300 mb-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
            <h2 className="text-2xl font-bold text-gray-700 mb-4">Start searching</h2>
            <p className="text-gray-500 mb-8 max-w-md mx-auto">
              Enter a search term above to find products in our catalog.
            </p>
          </div>
        )}
      </section>

      {/* CTA Section */}
      <section className="px-4 sm:px-6 md:px-12 lg:px-24 xl:px-44 py-16 bg-white border-t-2 border-gray-100">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">Can't find what you're looking for?</h2>
          <p className="text-gray-600 mb-8">
            Our team is here to help you find the perfect furniture for your space.
          </p>
          <Link
            href="/contact"
            className="inline-block px-8 py-4 bg-black text-white font-semibold uppercase tracking-wider hover:bg-gray-800 transition-all duration-300"
          >
            Contact Our Experts
          </Link>
        </div>
      </section>
    </div>
  )
}
