import type { Metadata } from 'next'
import { getServerLang } from '@/lib/i18n/server'
import dict from '@/lib/i18n/translations/downloadsPage'
import { getAllDownloads } from '@/lib/downloads'
import DownloadsPageContent from './DownloadsPageContent'

// Revalidate every 60 seconds to pick up CMS updates
export const revalidate = 60

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
      url: '/downloads',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: t.title,
      description: t.description,
      images: ['/og/toc-11.jpeg'],
    },
  }
}

export default async function DownloadsPage() {
  const downloads = await getAllDownloads()
  return <DownloadsPageContent downloads={downloads} />
}
