import type { Metadata } from 'next'
import BlogPageContent from './BlogPageContent'
import { getAllBlogs, getAllBlogCategories } from '@/lib/blog'
import { getServerLang } from '@/lib/i18n/server'
import blogPageDict from '@/lib/i18n/translations/blogPage'

export async function generateMetadata(): Promise<Metadata> {
  const lang = await getServerLang()
  const t = blogPageDict[lang]

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

// Revalidate every 60 seconds to pick up new posts
export const revalidate = 60

export default async function BlogPage() {
  const lang = await getServerLang()
  const [blogs, categories] = await Promise.all([
    getAllBlogs(lang),
    getAllBlogCategories(),
  ])
  return <BlogPageContent blogs={blogs} categories={categories} />
}
