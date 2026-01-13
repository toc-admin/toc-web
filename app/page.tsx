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

async function getHomePageData() {
  const supabase = await createServerClient()

  // Fetch categories with product counts and images from Supabase
  const { data: categories, error: categoriesError } = await supabase
    .from('categories')
    .select('id, name, slug, description, icon_name, image_url, product_count')
    .order('name')
    .limit(6)

  if (categoriesError) {
    console.error('Error fetching categories:', categoriesError)
  }

  return {
    categories: categories || []
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
      <FurnitureCatalogSection id="furniture" categories={data.categories} />

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
