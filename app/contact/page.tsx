import type { Metadata } from 'next'
import { getServerLang } from '@/lib/i18n/server'
import contactPageDict from '@/lib/i18n/translations/contactPage'
import ContactPageContent from './ContactPageContent'

export async function generateMetadata(): Promise<Metadata> {
  const lang = await getServerLang()
  const t = contactPageDict[lang]

  return {
    title: t.metaTitle,
    description: t.metaDescription,
    openGraph: {
      title: t.metaTitle,
      description: t.metaDescription,
      images: [{
        url: '/og/toc-hero.jpeg',
        width: 1200,
        height: 630,
        alt: t.ogImageAlt
      }],
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: t.metaTitle,
      description: t.metaDescription,
      images: ['/og/toc-hero.jpeg'],
    },
  }
}

export default function ContactPage() {
  return <ContactPageContent />
}
