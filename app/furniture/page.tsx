import { Metadata } from 'next'
import { createServerClient } from '@/lib/supabase/server'
import FurnitureHubClient from './FurnitureHubClient'

export const metadata: Metadata = {
  title: 'Office Furniture Catalog | 500+ Premium Products | The Office Company',
  description: 'Browse our comprehensive catalog of premium office furniture. Chairs, desks, storage, acoustic solutions, and more from world-class brands. Find furniture by category or room type.',
  openGraph: {
    title: 'Office Furniture Catalog | The Office Company',
    description: 'Browse 500+ premium office furniture products from world-class brands.',
    images: [{
      url: '/og/furniture-catalog.jpg',
      width: 1200,
      height: 630,
      alt: 'The Office Company Furniture Catalog'
    }],
    type: 'website',
  },
}

interface Category {
  id: string
  name: string
  slug: string
  description: string | null
  icon_name: string | null
  image_url: string | null
  product_count: number
}

async function getFurnitureData() {
  const supabase = await createServerClient()

  // Fetch categories with product counts
  const { data: categoriesRaw, error: categoriesError } = await supabase
    .from('categories')
    .select('id, name, slug, description, icon_name, image_url, product_count')

  // Custom sort order for categories
  const categoryOrder = [
    'chairs',
    'desks-tables',
    'storage-solutions',
    'acoustic-solutions',
    'accessories-lighting',
    'lounge'
  ]

  const categories = ((categoriesRaw || []) as Category[]).sort((a, b) => {
    const indexA = categoryOrder.indexOf(a.slug)
    const indexB = categoryOrder.indexOf(b.slug)
    const orderA = indexA === -1 ? categoryOrder.length : indexA
    const orderB = indexB === -1 ? categoryOrder.length : indexB
    return orderA - orderB
  })

  // Fetch rooms
  const { data: rooms, error: roomsError } = await supabase
    .from('rooms')
    .select('id, name, slug, emoji, description, hero_image_url')
    .order('name')

  // Fetch featured products with related data
  const { data: featuredProducts, error: productsError } = await supabase
    .from('products')
    .select(`
      id,
      name,
      slug,
      short_description,
      subcategory,
      is_new,
      is_featured,
      brand:brands(name),
      category:categories(name),
      product_images(image_url, thumbnail_url, medium_url, is_primary, display_order),
      product_features(feature_name)
    `)
    .eq('is_featured', true)
    .is('deleted_at', null)
    .limit(8)

  // Debug: Log product data
  if (featuredProducts && featuredProducts.length > 0) {
    console.log('=== PRODUCT DATA DEBUG ===')
    console.log('Featured products count:', featuredProducts.length)
    console.log('Sample product:', JSON.stringify(featuredProducts[0], null, 2))

    // Check each product's images
    featuredProducts.forEach((product: any, idx) => {
      console.log(`Product ${idx + 1} (${product.name}):`)
      console.log('  - Images array:', product.product_images)
      console.log('  - Image count:', product.product_images?.length || 0)
      if (product.product_images && product.product_images.length > 0) {
        console.log('  - First image URL:', product.product_images[0].image_url)
        console.log('  - Thumbnail URL:', product.product_images[0].thumbnail_url)
      }
    })
    console.log('======================')
  } else {
    console.log('No featured products found or empty array')
  }

  // Get total product count
  const { count: totalProducts } = await supabase
    .from('products')
    .select('*', { count: 'exact', head: true })
    .is('deleted_at', null)

  // Get total brand count
  const { count: totalBrands } = await supabase
    .from('brands')
    .select('*', { count: 'exact', head: true })

  if (categoriesError) {
    console.error('Error fetching categories:', categoriesError)
  }
  if (roomsError) {
    console.error('Error fetching rooms:', roomsError)
  }
  if (productsError) {
    console.error('Error fetching products:', productsError)
  } else if (!featuredProducts || featuredProducts.length === 0) {
    console.log('No featured products found. Check if any products have is_featured=true in the database.')
  }

  return {
    categories: categories || [],
    rooms: rooms || [],
    featuredProducts: featuredProducts || [],
    stats: {
      totalProducts: totalProducts || 0,
      totalBrands: totalBrands || 0,
      totalCategories: categories?.length || 0,
    }
  }
}

export default async function FurnitureHubPage() {
  const data = await getFurnitureData()

  return <FurnitureHubClient {...data} />
}
