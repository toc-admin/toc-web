import type { Metadata } from 'next'
import { getServerLang } from '@/lib/i18n/server'
import dict from '@/lib/i18n/translations/aboutPage'
import AboutPageContent from './AboutPageContent'

export async function generateMetadata(): Promise<Metadata> {
  const lang = await getServerLang()
  const t = dict[lang].metadata

  return {
    title: t.title,
    description: t.description,
    keywords: t.keywords,
    openGraph: {
      title: t.title,
      description: t.ogDescription,
      images: [{
        url: '/images/tocAbout.webp',
        width: 1200,
        height: 630,
        alt: t.ogImageAlt
      }],
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: t.title,
      description: t.ogDescription,
      images: ['/images/tocAbout.webp'],
    },
  }
}

export default function AboutPage() {
  return <AboutPageContent />
}
