import type { Metadata } from 'next'
import './globals.css'
import ClientLayout from '@/components/layout/ClientLayout'
import JsonLd from '@/components/seo/JsonLd'
import { createServerClient } from '@/lib/supabase/server'
import { getServerLang, getServerPathname } from '@/lib/i18n/server'
import { localizePath } from '@/lib/i18n'
import { LanguageProvider } from '@/lib/i18n/LanguageContext'

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.theofficecompany.eu'

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
  const [lang, pathname] = await Promise.all([getServerLang(), getServerPathname()])
  const t = meta[lang]
  const googleVerification = process.env.GOOGLE_SITE_VERIFICATION

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
  alternates: {
    canonical: localizePath(pathname, lang),
    languages: {
      hr: localizePath(pathname, 'hr'),
      en: localizePath(pathname, 'en'),
      'x-default': localizePath(pathname, 'hr'),
    },
  },
  openGraph: {
    type: 'website',
    locale: t.ogLocale,
    url: localizePath(pathname, lang),
    siteName: 'The Office Company',
    title: t.title,
    description: t.description,
    images: [{ url: '/og/toc-hero.jpeg', width: 1200, height: 630, alt: 'The Office Company' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: t.title,
    description: t.description,
    images: ['/og/toc-hero.jpeg'],
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
  ...(googleVerification ? { verification: { google: googleVerification } } : {}),
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
        <JsonLd
          data={{
            '@context': 'https://schema.org',
            '@type': 'Organization',
            name: 'The Office Company',
            url: SITE_URL,
            logo: `${SITE_URL}/og/toc-hero.jpeg`,
          }}
        />
        <LanguageProvider initialLang={lang}>
          <ClientLayout categories={categories}>{children}</ClientLayout>
        </LanguageProvider>
      </body>
    </html>
  )
}
