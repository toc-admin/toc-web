import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getBlogBySlug, getAllBlogs, getAllBlogSlugs } from '@/lib/blog'
import { getServerLang } from '@/lib/i18n/server'
import { localizePath } from '@/lib/i18n'
import blogDetailsDict from '@/lib/i18n/translations/blogDetails'
import JsonLd from '@/components/seo/JsonLd'
import BlogDetailsClient from './BlogDetailsClient'

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.theofficecompany.eu'

interface BlogDetailsPageProps {
  params: Promise<{
    slug: string
  }>
}

// Revalidate every 60 seconds to pick up updates
export const revalidate = 60

export async function generateMetadata({ params }: BlogDetailsPageProps): Promise<Metadata> {
  const { slug } = await params
  const lang = await getServerLang()
  const t = blogDetailsDict[lang]
  const blog = await getBlogBySlug(slug, lang)

  if (!blog) {
    return {
      title: t.metaNotFoundTitle,
    }
  }

  return {
    title: `${blog.name} | ${t.metaTitleSuffix}`,
    description: blog.metaDescription || blog.shortDescription,
    keywords: blog.keywords?.join(', ') || blog.metaKeywords,
    openGraph: {
      title: `${blog.name} | ${t.metaTitleSuffix}`,
      description: blog.metaDescription || blog.shortDescription,
      images: [{ url: blog.image, alt: blog.heroImageAlt || blog.name }],
      type: 'article',
    },
    twitter: {
      card: 'summary_large_image',
      title: `${blog.name} | ${t.metaTitleSuffix}`,
      description: blog.metaDescription || blog.shortDescription,
      images: [blog.image],
    },
  }
}

export default async function BlogDetailsPage({ params }: BlogDetailsPageProps) {
  const { slug } = await params
  const lang = await getServerLang()
  const blog = await getBlogBySlug(slug, lang)

  if (!blog) {
    notFound()
  }

  // Get related articles (excluding current)
  const allBlogs = await getAllBlogs(lang)
  const relatedArticles = allBlogs.filter((b) => b.slug !== slug).slice(0, 3)

  const articleUrl = `${SITE_URL}${localizePath(`/blog/${blog.slug}`, lang)}`
  const articleImage = blog.image?.startsWith('http')
    ? blog.image
    : `${SITE_URL}${blog.image}`
  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: blog.name,
    description: blog.metaDescription || blog.shortDescription,
    image: [articleImage],
    url: articleUrl,
    mainEntityOfPage: { '@type': 'WebPage', '@id': articleUrl },
    ...(blog.publishedAt ? { datePublished: blog.publishedAt } : {}),
    inLanguage: lang,
    author: { '@type': 'Organization', name: 'The Office Company' },
    publisher: {
      '@type': 'Organization',
      name: 'The Office Company',
      logo: { '@type': 'ImageObject', url: `${SITE_URL}/og/toc-hero.jpeg` },
    },
  }

  return (
    <>
      <JsonLd data={articleSchema} />
      <BlogDetailsClient blog={blog} relatedArticles={relatedArticles} />
    </>
  )
}

// Generate static paths for all blog posts
export async function generateStaticParams() {
  const slugs = await getAllBlogSlugs()
  return slugs.map((slug) => ({ slug }))
}
