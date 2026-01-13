import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { createServerClient } from '@/lib/supabase/server'
import RoomListingClient from './RoomListingClient'

interface RoomPageProps {
  params: Promise<{
    slug: string
  }>
  searchParams: Promise<{
    sort?: string
    categories?: string
    subcategory?: string
    brands?: string
    page?: string
  }>
}

async function getRoomData(slug: string) {
  const supabase = await createServerClient()

  // Fetch room
  const { data: room, error: roomError } = await supabase
    .from('rooms')
    .select(`
      id,
      name,
      slug,
      emoji,
      description,
      hero_image_url
    `)
    .eq('slug', slug)
    .single()

  if (roomError || !room) {
    console.error('Error fetching room:', roomError)
    return null
  }

  const roomId = (room as any).id

  // Fetch products linked to this room via product_rooms junction table
  const { data: products, count } = await supabase
    .from('products')
    .select(`
      id,
      name,
      slug,
      sku,
      short_description,
      subcategory,
      is_new,
      is_featured,
      brand:brands(id, name, slug, logo_url),
      category:categories(id, name, slug),
      product_images(id, image_url, thumbnail_url, is_primary, display_order),
      product_features(id, feature_name),
      product_colors(id, color_name, hex_code),
      product_rooms!inner(room_id)
    `, { count: 'exact' })
    .eq('product_rooms.room_id', roomId)
    .is('deleted_at', null)
    .order('created_at', { ascending: false })

  // Get all available categories from products in this room for filtering
  const productIds = products?.map((p: any) => p.id) || []
  const { data: productCategories } = await supabase
    .from('products')
    .select('category:categories(id, name, slug)')
    .in('id', productIds)
    .not('category_id', 'is', null)

  // Extract unique categories
  const categoriesMap = new Map()
  productCategories?.forEach((p: any) => {
    if (p.category) {
      categoriesMap.set(p.category.id, p.category)
    }
  })
  const availableCategories = Array.from(categoriesMap.values()).sort((a: any, b: any) =>
    a.name.localeCompare(b.name)
  )

  // Get unique subcategories from products in this room for filtering
  const uniqueSubcategories = [
    ...new Set(
      products
        ?.map((p: any) => p.subcategory)
        .filter((subcategory: any) => subcategory !== null && subcategory !== '')
    )
  ].sort()

  // Get unique brands from products in this room for filtering
  const uniqueBrands = products
    ?.map((p: any) => p.brand)
    .filter((brand: any) => brand !== null)
    .filter((brand: any, index: number, self: any[]) =>
      index === self.findIndex((b: any) => b?.id === brand?.id)
    )
    .sort((a: any, b: any) => a.name.localeCompare(b.name)) || []

  return {
    room,
    products: products || [],
    totalProducts: count || 0,
    availableCategories: availableCategories || [],
    availableSubcategories: uniqueSubcategories,
    availableBrands: uniqueBrands
  }
}

export async function generateMetadata({ params }: RoomPageProps): Promise<Metadata> {
  const { slug } = await params
  const data = await getRoomData(slug)

  if (!data?.room) {
    return {
      title: 'Room Not Found | The Office Company',
    }
  }

  const { room } = data as any

  return {
    title: `${room.name} Furniture | Premium Office Solutions | The Office Company`,
    description: room.description || `Browse our curated selection of furniture perfect for ${room.name.toLowerCase()}.`,
    openGraph: {
      title: `${room.name} | The Office Company`,
      description: room.description || '',
      images: room.hero_image_url ? [{
        url: room.hero_image_url,
        width: 1200,
        height: 630,
        alt: room.name
      }] : [],
      type: 'website',
    },
  }
}

export default async function RoomPage({ params, searchParams }: RoomPageProps) {
  const { slug } = await params
  const data = await getRoomData(slug)

  if (!data?.room) {
    notFound()
  }

  const search = await searchParams

  return (
    <RoomListingClient
      room={data.room}
      products={data.products}
      totalProducts={data.totalProducts}
      availableCategories={data.availableCategories}
      availableSubcategories={data.availableSubcategories}
      availableBrands={data.availableBrands}
      initialSearchParams={search}
    />
  )
}
