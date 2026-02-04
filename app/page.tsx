import type { Metadata } from 'next'
import { createServerClient } from '@/lib/supabase/server'
import HeroSection from '@/components/HeroSection'
import Services from '@/components/Services'
import AboutSection from '@/components/AboutSection'
import HowWeDoIt from '@/components/HowWeDoIt'
import FurnitureCatalogSection from '@/components/FurnitureCatalogSection'
import BrandsSection from '@/components/BrandsSection'
import MarketInsights from '@/components/MarketInsights'
import Contact from '@/components/Contact'

export const metadata: Metadata = {
  title: 'The Office Company | Premium Office Solutions & Furniture in Croatia',
  description: 'Leading provider of serviced office consulting, management, and premium office furniture in Croatia. Explore 500+ products from world-class brands like Haworth, BoConcept, and Boss Design.',
  openGraph: {
    title: 'The Office Company | Premium Office Solutions & Furniture in Croatia',
    description: 'Leading provider of serviced office consulting, management, and premium office furniture in Croatia. Explore 500+ products from world-class brands.',
    images: [{
      url: '/og/toc-hero.jpeg',
      width: 1200,
      height: 630,
      alt: 'The Office Company'
    }],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'The Office Company | Premium Office Solutions & Furniture in Croatia',
    description: 'Leading provider of serviced office consulting, management, and premium office furniture in Croatia.',
    images: ['/og/toc-hero.jpeg'],
  },
}

interface HomeCategory {
  id: string
  name: string
  slug: string
  description: string | null
  icon_name: string | null
  image_url: string | null
  product_count: number
}

async function getHomePageData() {
  const supabase = await createServerClient()

  // Fetch categories with product counts and images from Supabase
  const { data: categories, error: categoriesError } = await supabase
    .from('categories')
    .select('id, name, slug, description, icon_name, image_url, product_count')

  if (categoriesError) {
    console.error('Error fetching categories:', categoriesError)
  }

  // Fetch rooms from Supabase (limit to 4 for homepage)
  const { data: rooms, error: roomsError } = await supabase
    .from('rooms')
    .select('id, name, slug, emoji, description, hero_image_url')
    .order('name')
    .limit(4)

  if (roomsError) {
    console.error('Error fetching rooms:', roomsError)
  }

  // Custom sort order for homepage display
  const categoryOrder = [
    'chairs',
    'desks-tables',
    'storage-solutions',
    'acoustic-solutions',
    'accessories-lighting',
    'lounge'
  ]

  const sortedCategories = ((categories || []) as HomeCategory[])
    .sort((a, b) => {
      const indexA = categoryOrder.indexOf(a.slug)
      const indexB = categoryOrder.indexOf(b.slug)
      // If not in the order list, put at the end
      const orderA = indexA === -1 ? categoryOrder.length : indexA
      const orderB = indexB === -1 ? categoryOrder.length : indexB
      return orderA - orderB
    })
    .slice(0, 6)

  return {
    categories: sortedCategories,
    rooms: rooms || []
  }
}

export default async function HomePage() {
  const data = await getHomePageData()

  return (
    <div className="w-full">
      {/* Hero Section */}
      <HeroSection id="hero" />

      {/* Services Section */}
      <Services id="services" />

      {/* Furniture Catalog Section */}
      <FurnitureCatalogSection id="furniture" categories={data.categories} rooms={data.rooms} />

      {/* How We Do It Section */}
      <HowWeDoIt id="process" />

      {/* About Section */}
      <AboutSection id="about" />

      {/* Brands Section */}
      <BrandsSection id="brands" />

      {/* Market Insights / Blog Section */}
      <MarketInsights id="insights" />

      {/* Contact Section */}
      <Contact id="contact" />
    </div>
  )
}
