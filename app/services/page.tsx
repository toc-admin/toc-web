import type { Metadata } from 'next'
import { getServerLang } from '@/lib/i18n/server'
import dict from '@/lib/i18n/translations/servicesPage'
import ServicesPageContent from './ServicesPageContent'

export async function generateMetadata(): Promise<Metadata> {
  const lang = await getServerLang()
  const t = dict[lang].metadata

  return {
    title: t.title,
    description: t.description,
    keywords: t.keywords,
    openGraph: {
      title: t.title,
      description: t.description,
      images: [{
        url: '/og/toc-11.jpeg',
        width: 1200,
        height: 630,
        alt: t.ogImageAlt
      }],
      url: '/services',
      type: 'article',
    },
    twitter: {
      card: 'summary_large_image',
      title: t.title,
      description: t.description,
      images: ['/og/toc-11.jpeg'],
    },
  }
}

export default function ServicesPage() {
  return <ServicesPageContent />
}
