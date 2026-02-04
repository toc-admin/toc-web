'use client'

import { useState, useRef, useMemo, useEffect } from "react"
import { flushSync } from "react-dom"
import Link from "next/link"
import Image from "next/image"
import { useRouter, useSearchParams, usePathname } from "next/navigation"
import ProductCard from "@/components/ProductCard"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

// Register GSAP plugins
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

interface RoomListingClientProps {
  room: any
  products: any[]
  totalProducts: number
  availableCategories: any[]
  availableSubcategories: string[]
  availableBrands: any[]
  initialSearchParams: {
    sort?: string
    categories?: string
    subcategory?: string
    brands?: string
  }
}

export default function RoomListingClient({
  room,
  products: initialProducts,
  totalProducts,
  availableCategories,
  availableSubcategories,
  availableBrands,
  initialSearchParams
}: RoomListingClientProps) {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const heroRef = useRef<HTMLDivElement>(null)
  const productsRef = useRef(null)

  // Filter states
  const [selectedCategories, setSelectedCategories] = useState<string[]>(
    initialSearchParams.categories?.split(',').filter(Boolean) || []
  )
  const [selectedSubcategoriesFilter, setSelectedSubcategoriesFilter] = useState<string[]>(
    initialSearchParams.subcategory?.split(',').filter(Boolean) || []
  )
  const [selectedBrands, setSelectedBrands] = useState<string[]>(
    initialSearchParams.brands?.split(',').filter(Boolean) || []
  )
  const [sortBy, setSortBy] = useState(initialSearchParams.sort || "popular")
  const [displayCount, setDisplayCount] = useState(12)

  const productsPerLoad = 12

  // Hero animations
  useEffect(() => {
    const hero = heroRef.current
    if (!hero) return

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

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill())
    }
  }, [])

  // Sync state from URL when searchParams change
  useEffect(() => {
    const urlCategories = searchParams.get('categories')?.split(',').filter(Boolean) || []
    const urlSubcategory = searchParams.get('subcategory')?.split(',').filter(Boolean) || []
    const urlBrands = searchParams.get('brands')?.split(',').filter(Boolean) || []
    const urlSort = searchParams.get('sort') || 'popular'

    // Only update if different to prevent unnecessary re-renders
    const categoriesChanged = JSON.stringify(urlCategories.sort()) !== JSON.stringify([...selectedCategories].sort())
    const subcategoryChanged = JSON.stringify(urlSubcategory.sort()) !== JSON.stringify([...selectedSubcategoriesFilter].sort())
    const brandsChanged = JSON.stringify(urlBrands.sort()) !== JSON.stringify([...selectedBrands].sort())
    const sortChanged = urlSort !== sortBy

    if (categoriesChanged) setSelectedCategories(urlCategories)
    if (subcategoryChanged) setSelectedSubcategoriesFilter(urlSubcategory)
    if (brandsChanged) setSelectedBrands(urlBrands)
    if (sortChanged) setSortBy(urlSort)
  }, [searchParams])

  // Helper function to update URL
  const updateURL = (updates: {
    categories?: string[]
    subcategory?: string[]
    brands?: string[]
    sort?: string
  }) => {
    const params = new URLSearchParams()

    const cats = updates.categories ?? selectedCategories
    const subs = updates.subcategory ?? selectedSubcategoriesFilter
    const brds = updates.brands ?? selectedBrands
    const srt = updates.sort ?? sortBy

    if (cats.length > 0) {
      params.set('categories', cats.join(','))
    }
    if (subs.length > 0) {
      params.set('subcategory', subs.join(','))
    }
    if (brds.length > 0) {
      params.set('brands', brds.join(','))
    }
    if (srt !== 'popular') {
      params.set('sort', srt)
    }

    const queryString = params.toString()
    const newUrl = queryString ? `${pathname}?${queryString}` : pathname
    router.push(newUrl, { scroll: false })
  }

  // Client-side filtering and sorting
  const filteredAndSortedProducts = useMemo(() => {
    let filtered = [...initialProducts]

    // Filter by categories
    if (selectedCategories.length > 0) {
      filtered = filtered.filter(product =>
        selectedCategories.includes(product.category?.slug)
      )
    }

    // Filter by subcategory
    if (selectedSubcategoriesFilter.length > 0) {
      filtered = filtered.filter(product =>
        product.subcategory && selectedSubcategoriesFilter.includes(product.subcategory)
      )
    }

    // Filter by brands
    if (selectedBrands.length > 0) {
      filtered = filtered.filter(product =>
        product.brand && selectedBrands.includes(product.brand.slug)
      )
    }

    // Sort products
    switch (sortBy) {
      case 'newest':
        filtered.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
        break
      case 'name-asc':
        filtered.sort((a, b) => a.name.localeCompare(b.name))
        break
      case 'name-desc':
        filtered.sort((a, b) => b.name.localeCompare(a.name))
        break
      case 'popular':
      default:
        // Featured items first, then new items
        filtered.sort((a, b) => {
          if (a.is_featured && !b.is_featured) return -1
          if (!a.is_featured && b.is_featured) return 1
          if (a.is_new && !b.is_new) return -1
          if (!a.is_new && b.is_new) return 1
          return 0
        })
    }

    return filtered
  }, [initialProducts, selectedCategories, selectedSubcategoriesFilter, selectedBrands, sortBy])

  // Load more logic
  const totalFilteredProducts = filteredAndSortedProducts.length
  const currentProducts = filteredAndSortedProducts.slice(0, displayCount)
  const hasMoreProducts = displayCount < totalFilteredProducts

  const loadMore = () => {
    setDisplayCount(prev => Math.min(prev + productsPerLoad, totalFilteredProducts))
  }

  // Handle filter changes
  const toggleCategory = (slug: string) => {
    const newCategories = selectedCategories.includes(slug)
      ? selectedCategories.filter((s) => s !== slug)
      : [...selectedCategories, slug]
    flushSync(() => {
      setSelectedCategories(newCategories)
      setDisplayCount(productsPerLoad)
    })
    updateURL({ categories: newCategories })
  }

  const toggleSubcategoryFilter = (subcategory: string) => {
    const newSubcategories = selectedSubcategoriesFilter.includes(subcategory)
      ? selectedSubcategoriesFilter.filter((s) => s !== subcategory)
      : [...selectedSubcategoriesFilter, subcategory]
    flushSync(() => {
      setSelectedSubcategoriesFilter(newSubcategories)
      setDisplayCount(productsPerLoad)
    })
    updateURL({ subcategory: newSubcategories })
  }

  const toggleBrand = (slug: string) => {
    const newBrands = selectedBrands.includes(slug)
      ? selectedBrands.filter((b) => b !== slug)
      : [...selectedBrands, slug]
    flushSync(() => {
      setSelectedBrands(newBrands)
      setDisplayCount(productsPerLoad)
    })
    updateURL({ brands: newBrands })
  }

  const clearAllFilters = () => {
    flushSync(() => {
      setSelectedCategories([])
      setSelectedSubcategoriesFilter([])
      setSelectedBrands([])
      setDisplayCount(productsPerLoad)
    })
    updateURL({ categories: [], subcategory: [], brands: [] })
  }

  const hasActiveFilters =
    selectedCategories.length > 0 ||
    selectedSubcategoriesFilter.length > 0 ||
    selectedBrands.length > 0

  return (
    <div className="w-full">
      {/* Hero Section */}
      <section
        ref={heroRef}
        className="relative h-[50vh] min-h-[400px] flex items-center justify-center px-4 sm:px-6 md:px-12 lg:px-24 xl:px-44 text-white overflow-hidden"
      >
        {/* Background Image */}
        {room.hero_image_url && (
          <Image
            src={room.hero_image_url}
            alt={room.name}
            fill
            className="object-cover"
            priority
          />
        )}

        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/60 to-black/50" />

        {/* Breadcrumb */}
        <div className="absolute top-24 left-4 sm:left-6 md:left-12 lg:left-24 xl:left-44 z-10">
          <div className="flex items-center gap-2 text-sm text-white/80">
            <Link href="/" className="hover:text-white transition-colors">
              Home
            </Link>
            <span>/</span>
            <Link href="/furniture" className="hover:text-white transition-colors">
              Furniture
            </Link>
            <span>/</span>
            <span className="text-white font-semibold">Shop by Room</span>
            <span>/</span>
            <span className="text-white font-semibold">{room.name}</span>
          </div>
        </div>

        {/* Content */}
        <div className="relative z-10 text-center max-w-4xl">
          {/* Room Emoji/Icon */}
          {room.emoji && (
            <div className="animate-hero text-6xl mb-4">
              {room.emoji}
            </div>
          )}

          <span className="animate-hero inline-block text-sm font-bold uppercase tracking-widest text-red-400 mb-4">
            Shop by Room
          </span>

          <h1 className="animate-hero text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black leading-tight mb-4">
            {room.name}
          </h1>

          <div className="divider-line h-1 bg-gradient-to-r from-red-500 to-red-300 w-32 mx-auto mb-6 origin-left" />

          <p className="animate-hero text-lg md:text-xl text-white/90 leading-relaxed">
            {room.description}
          </p>
        </div>
      </section>

      {/* Main Content: Filters + Products */}
      <section className="px-4 sm:px-6 md:px-12 lg:px-24 xl:px-44 py-12 bg-gray-50">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar Filters */}
          <aside className="lg:w-72 flex-shrink-0">
            <div className="bg-white border-2 border-gray-200 p-6 sticky top-24">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-bold uppercase tracking-wider">
                  Filters
                </h3>
                {hasActiveFilters && (
                  <button
                    onClick={clearAllFilters}
                    className="text-sm text-red-700 hover:text-red-900 font-semibold"
                  >
                    Clear All
                  </button>
                )}
              </div>

              {/* Subcategory Filter */}
              {availableSubcategories.length > 0 && (
                <>
                  <div className="mb-8">
                    <h4 className="text-sm font-bold uppercase tracking-wider text-gray-700 mb-3">
                      Subcategory
                    </h4>
                    <div className="space-y-2">
                      {availableSubcategories.map((subcategory) => (
                        <label
                          key={subcategory}
                          className="flex items-center gap-3 cursor-pointer group"
                        >
                          <input
                            type="checkbox"
                            checked={selectedSubcategoriesFilter.includes(subcategory)}
                            onChange={() => toggleSubcategoryFilter(subcategory)}
                            className="w-4 h-4 text-red-700 border-gray-300 rounded focus:ring-red-500"
                          />
                          <span className="text-sm text-gray-700 group-hover:text-red-700 transition-colors">
                            {subcategory}
                          </span>
                        </label>
                      ))}
                    </div>
                  </div>

                  <div className="h-px bg-gray-200 mb-8" />
                </>
              )}

              {/* Category Filter */}
              {availableCategories.length > 0 && (
                <>
                  <div className="mb-8">
                    <h4 className="text-sm font-bold uppercase tracking-wider text-gray-700 mb-3">
                      Category
                    </h4>
                    <div className="space-y-2">
                      {availableCategories.map((category) => (
                        <label
                          key={category.slug}
                          className="flex items-center gap-3 cursor-pointer group"
                        >
                          <input
                            type="checkbox"
                            checked={selectedCategories.includes(category.slug)}
                            onChange={() => toggleCategory(category.slug)}
                            className="w-4 h-4 text-red-700 border-gray-300 rounded focus:ring-red-500"
                          />
                          <span className="text-sm text-gray-700 group-hover:text-red-700 transition-colors">
                            {category.name}
                          </span>
                        </label>
                      ))}
                    </div>
                  </div>

                  <div className="h-px bg-gray-200 mb-8" />
                </>
              )}

              {/* Brand Filter */}
              {availableBrands.length > 0 && (
                <div className="mb-8">
                  <h4 className="text-sm font-bold uppercase tracking-wider text-gray-700 mb-3">
                    Brand
                  </h4>
                  <div className="space-y-2">
                    {availableBrands.map((brand) => (
                      <label
                        key={brand.slug}
                        className="flex items-center gap-3 cursor-pointer group"
                      >
                        <input
                          type="checkbox"
                          checked={selectedBrands.includes(brand.slug)}
                          onChange={() => toggleBrand(brand.slug)}
                          className="w-4 h-4 text-red-700 border-gray-300 rounded focus:ring-red-500"
                        />
                        <span className="text-sm text-gray-700 group-hover:text-red-700 transition-colors">
                          {brand.name}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>
              )}

              {/* CTA */}
              <div className="pt-6 border-t-2 border-gray-200">
                <Link
                  href="/contact"
                  className="w-full px-6 py-3 bg-black text-white text-sm font-semibold uppercase tracking-wider hover:bg-gray-800 transition-all duration-300 flex items-center justify-center gap-2"
                >
                  Need Help?
                </Link>
              </div>
            </div>
          </aside>

          {/* Products Grid */}
          <main ref={productsRef} className="flex-1">
            {/* Toolbar */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
              {/* Results Count */}
              <div>
                <h2 className="text-2xl font-bold mb-2">
                  Furniture for {room.name}
                </h2>
                <p className="text-sm text-gray-600">
                  Showing{" "}
                  <span className="font-semibold text-gray-900">
                    {currentProducts.length}
                  </span>{" "}
                  of <span className="font-semibold text-gray-900">{totalFilteredProducts}</span>{" "}
                  products
                </p>
              </div>

              {/* Sort & View */}
              <div className="flex items-center gap-4">
                {/* Sort Dropdown */}
                <select
                  value={sortBy}
                  onChange={(e) => {
                    const newSort = e.target.value
                    flushSync(() => {
                      setSortBy(newSort)
                    })
                    updateURL({ sort: newSort })
                  }}
                  className="px-4 py-2 border-2 border-gray-200 rounded text-sm font-semibold text-gray-700 focus:outline-none focus:border-red-700 transition-colors"
                >
                  <option value="popular">Most Popular</option>
                  <option value="newest">Newest First</option>
                  <option value="name-asc">Name: A-Z</option>
                  <option value="name-desc">Name: Z-A</option>
                </select>
              </div>
            </div>

            {/* Products Grid */}
            {currentProducts.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {currentProducts.map((product, index) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    index={index}
                    isInView={true}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-16">
                <svg
                  className="w-24 h-24 mx-auto text-gray-300 mb-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <h3 className="text-xl font-bold text-gray-700 mb-2">No products found</h3>
                <p className="text-gray-500 mb-6">
                  Try adjusting your filters to find what you're looking for.
                </p>
                <button
                  onClick={clearAllFilters}
                  className="px-6 py-3 bg-gradient-to-r from-red-900 to-red-700 text-white font-semibold uppercase tracking-wider hover:from-red-800 hover:to-red-600 transition-all duration-300"
                >
                  Clear All Filters
                </button>
              </div>
            )}

            {/* Load More Button */}
            {hasMoreProducts && (
              <div className="flex justify-center mt-12">
                <button
                  onClick={loadMore}
                  className="px-8 py-4 bg-gradient-to-r from-red-900 to-red-700 text-white font-semibold uppercase tracking-wider hover:from-red-800 hover:to-red-600 transition-all duration-300"
                >
                  Load More Products
                </button>
              </div>
            )}
          </main>
        </div>
      </section>

      {/* Other Rooms CTA */}
      <section className="px-4 sm:px-6 md:px-12 lg:px-24 xl:px-44 py-16 bg-gradient-to-br from-gray-900 via-red-950 to-black text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Explore Other Room Types
          </h2>
          <p className="text-lg text-white/80 mb-8">
            Browse furniture curated for different workspace zones or view our complete
            catalog to find exactly what you need.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/furniture"
              className="px-8 py-4 bg-white text-black font-semibold uppercase tracking-wider hover:bg-gray-100 transition-all duration-300"
            >
              View All Rooms
            </Link>
            <Link
              href="/furniture"
              className="px-8 py-4 bg-transparent border-2 border-white text-white font-semibold uppercase tracking-wider hover:bg-white hover:text-black transition-all duration-300"
            >
              Browse All Products
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
