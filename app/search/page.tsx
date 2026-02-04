import { Metadata } from 'next'
import { createServerClient } from '@/lib/supabase/server'
import SearchClient from './SearchClient'

export const metadata: Metadata = {
  title: 'Search Results | The Office Company',
  description: 'Search our catalog of premium office furniture.',
}

interface SearchPageProps {
  searchParams: Promise<{ q?: string }>
}

async function searchProducts(query: string) {
  const supabase = await createServerClient()

  const searchTerm = `%${query}%`

  const { data: products, error } = await supabase
    .from('products')
    .select(`
      id,
      name,
      slug,
      short_description,
      subcategory,
      is_new,
      is_featured,
      brand:brands(name, slug),
      category:categories(name, slug),
      product_images(image_url, thumbnail_url, medium_url, is_primary, display_order),
      product_rooms(room:rooms(name, slug))
    `)
    .is('deleted_at', null)
    .or(`name.ilike.${searchTerm},short_description.ilike.${searchTerm},subcategory.ilike.${searchTerm}`)
    .order('is_featured', { ascending: false })
    .order('name')
    .limit(50)

  if (error) {
    console.error('Search error:', error)
    return []
  }

  return products || []
}

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const params = await searchParams
  const query = params.q || ''
  const products = query ? await searchProducts(query) : []

  return <SearchClient query={query} products={products} />
}
