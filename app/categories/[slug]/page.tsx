import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { createServerClient } from '@/lib/supabase/server'
import CategoryListingClient from './CategoryListingClient'

interface CategoryPageProps {
  params: Promise<{
    slug: string
  }>
  searchParams: Promise<{
    sort?: string
    subcategory?: string
    rooms?: string
    brands?: string
  }>
}

async function getCategoryData(slug: string) {
  const supabase = await createServerClient()

  // Fetch category
  const { data: category, error: categoryError } = await supabase
    .from('categories')
    .select(`
      id,
      name,
      slug,
      description,
      image_url
    `)
    .eq('slug', slug)
    .single()

  if (categoryError || !category) {
    console.error('Error fetching category:', categoryError)
    return null
  }

  const categoryId = (category as any).id

  // Note: Subcategories not supported in current schema (no parent_id column)
  const subcategories: any[] = []

  // Fetch products in this category
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
      product_rooms(room:rooms(id, name, slug))
    `, { count: 'exact' })
    .eq('category_id', categoryId)
    .is('deleted_at', null)
    .order('created_at', { ascending: false })

  // Get all available rooms for filtering
  const { data: availableRooms } = await supabase
    .from('rooms')
    .select('id, name, slug')
    .order('name')

  // Get unique subcategories from products in this category for filtering
  const uniqueSubcategories = [
    ...new Set(
      products
        ?.map((p: any) => p.subcategory)
        .filter((subcategory: any) => subcategory !== null && subcategory !== '')
    )
  ].sort()

  // Get unique brands from products in this category for filtering
  const uniqueBrands = products
    ?.map((p: any) => p.brand)
    .filter((brand: any) => brand !== null)
    .filter((brand: any, index: number, self: any[]) =>
      index === self.findIndex((b: any) => b?.id === brand?.id)
    )
    .sort((a: any, b: any) => a.name.localeCompare(b.name)) || []

  return {
    category,
    subcategories: subcategories || [],
    products: products || [],
    totalProducts: count || 0,
    availableRooms: availableRooms || [],
    availableSubcategories: uniqueSubcategories,
    availableBrands: uniqueBrands
  }
}

export async function generateMetadata({ params }: CategoryPageProps): Promise<Metadata> {
  const { slug } = await params
  const data = await getCategoryData(slug)

  if (!data?.category) {
    return {
      title: 'Category Not Found | The Office Company',
    }
  }

  const { category } = data as any

  return {
    title: `${category.name} | Premium Office Furniture | The Office Company`,
    description: category.description || `Browse our selection of premium ${category.name.toLowerCase()} from world-class brands.`,
    openGraph: {
      title: `${category.name} | The Office Company`,
      description: category.description || '',
      images: category.image_url ? [{
        url: category.image_url,
        width: 1200,
        height: 630,
        alt: category.name
      }] : [],
      type: 'website',
    },
  }
}

export default async function CategoryPage({ params, searchParams }: CategoryPageProps) {
  const { slug } = await params
  const data = await getCategoryData(slug)

  if (!data?.category) {
    notFound()
  }

  const search = await searchParams

  return (
    <CategoryListingClient
      category={data.category}
      subcategories={data.subcategories}
      products={data.products}
      totalProducts={data.totalProducts}
      availableRooms={data.availableRooms}
      availableSubcategories={data.availableSubcategories}
      availableBrands={data.availableBrands}
      initialSearchParams={search}
    />
  )
}
