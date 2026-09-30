import { Metadata } from 'next'
import { createServerClient } from '@/lib/supabase/server'
import { getServerLang } from '@/lib/i18n/server'
import searchDict from '@/lib/i18n/translations/search'
import SearchClient from './SearchClient'

export async function generateMetadata(): Promise<Metadata> {
  const lang = await getServerLang()
  const t = searchDict[lang]

  return {
    title: t.metaTitle,
    description: t.metaDescription,
  }
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
      short_description_hr,
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
