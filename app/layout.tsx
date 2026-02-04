import type { Metadata } from 'next'
import './globals.css'
import ClientLayout from '@/components/layout/ClientLayout'
import { createServerClient } from '@/lib/supabase/server'

export const metadata: Metadata = {
  title: {
    default: 'The Office Company - Premium Office Furniture',
    template: '%s | The Office Company',
  },
  description: 'Discover our catalog of premium office furniture. Quality solutions for modern workspaces.',
  keywords: ['office furniture', 'workspace solutions', 'premium furniture', 'office design'],
  authors: [{ name: 'The Office Company' }],
  creator: 'The Office Company',
  publisher: 'The Office Company',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'),
  icons: {
    icon: '/favicon.svg',
    shortcut: '/favicon.svg',
    apple: '/favicon.svg',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: '/',
    siteName: 'The Office Company',
    title: 'The Office Company - Premium Office Furniture',
    description: 'Discover our catalog of premium office furniture. Quality solutions for modern workspaces.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'The Office Company - Premium Office Furniture',
    description: 'Discover our catalog of premium office furniture. Quality solutions for modern workspaces.',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    // Add your verification codes here when ready
    // google: 'your-google-verification-code',
    // yandex: 'your-yandex-verification-code',
  },
}

interface NavCategory {
  id: string
  name: string
  slug: string
  description: string | null
  image_url: string | null
}

async function getNavCategories() {
  const supabase = await createServerClient()

  const { data: categories } = await supabase
    .from('categories')
    .select('id, name, slug, description, image_url')

  // Custom sort order for navbar display (same as homepage)
  const categoryOrder = [
    'chairs',
    'desks-tables',
    'storage-solutions',
    'acoustic-solutions',
    'accessories-lighting',
    'lounge'
  ]

  const sortedCategories = ((categories || []) as NavCategory[])
    .sort((a, b) => {
      const indexA = categoryOrder.indexOf(a.slug)
      const indexB = categoryOrder.indexOf(b.slug)
      const orderA = indexA === -1 ? categoryOrder.length : indexA
      const orderB = indexB === -1 ? categoryOrder.length : indexB
      return orderA - orderB
    })
    .slice(0, 6)

  return sortedCategories
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const categories = await getNavCategories()

  return (
    <html lang="en">
      <head>
        {/* Preload critical fonts for performance */}
        <link
          rel="preload"
          href="/fonts/ClashDisplay-Variable.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
        <link
          rel="preload"
          href="/fonts/PlusJakartaSans-Variable.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
      </head>
      <body className="bg-main-bg antialiased">
        <ClientLayout categories={categories}>{children}</ClientLayout>
      </body>
    </html>
  )
}
