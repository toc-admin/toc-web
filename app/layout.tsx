import type { Metadata } from 'next'
import './globals.css'
import ClientLayout from '@/components/layout/ClientLayout'
import { createServerClient } from '@/lib/supabase/server'
import { getServerLang } from '@/lib/i18n/server'
import { LanguageProvider } from '@/lib/i18n/LanguageContext'

const meta = {
  en: {
    title: 'The Office Company - Premium Office Furniture',
    description:
      'Discover our catalog of premium office furniture. Quality solutions for modern workspaces.',
    keywords: ['office furniture', 'workspace solutions', 'premium furniture', 'office design'],
    ogLocale: 'en_US',
  },
  hr: {
    title: 'The Office Company - Premium uredski namještaj',
    description:
      'Otkrijte naš katalog premium uredskog namještaja. Kvalitetna rješenja za moderne radne prostore.',
    keywords: ['uredski namještaj', 'rješenja za radne prostore', 'premium namještaj', 'dizajn ureda'],
    ogLocale: 'hr_HR',
  },
}

export async function generateMetadata(): Promise<Metadata> {
  const lang = await getServerLang()
  const t = meta[lang]

  return {
  title: {
    default: t.title,
    template: '%s | The Office Company',
  },
  description: t.description,
  keywords: t.keywords,
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
    locale: t.ogLocale,
    url: '/',
    siteName: 'The Office Company',
    title: t.title,
    description: t.description,
  },
  twitter: {
    card: 'summary_large_image',
    title: t.title,
    description: t.description,
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
  const [categories, lang] = await Promise.all([getNavCategories(), getServerLang()])

  return (
    <html lang={lang}>
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
        <LanguageProvider initialLang={lang}>
          <ClientLayout categories={categories}>{children}</ClientLayout>
        </LanguageProvider>
      </body>
    </html>
  )
}
