import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getBlogBySlug, getAllBlogs, getAllBlogSlugs } from '@/lib/blog'
import BlogDetailsClient from './BlogDetailsClient'

interface BlogDetailsPageProps {
  params: Promise<{
    slug: string
  }>
}

// Revalidate every 60 seconds to pick up updates
export const revalidate = 60

export async function generateMetadata({ params }: BlogDetailsPageProps): Promise<Metadata> {
  const { slug } = await params
  const blog = await getBlogBySlug(slug)

  if (!blog) {
    return {
      title: 'Article Not Found | The Office Company Blog',
    }
  }

  return {
    title: `${blog.name} | The Office Company Blog`,
    description: blog.metaDescription || blog.shortDescription,
    keywords: blog.keywords?.join(', ') || blog.metaKeywords,
    openGraph: {
      title: `${blog.name} | The Office Company Blog`,
      description: blog.metaDescription || blog.shortDescription,
      images: [{ url: blog.image, alt: blog.heroImageAlt || blog.name }],
      type: 'article',
    },
    twitter: {
      card: 'summary_large_image',
      title: `${blog.name} | The Office Company Blog`,
      description: blog.metaDescription || blog.shortDescription,
      images: [blog.image],
    },
  }
}

export default async function BlogDetailsPage({ params }: BlogDetailsPageProps) {
  const { slug } = await params
  const blog = await getBlogBySlug(slug)

  if (!blog) {
    notFound()
  }

  // Get related articles (excluding current)
  const allBlogs = await getAllBlogs()
  const relatedArticles = allBlogs.filter((b) => b.slug !== slug).slice(0, 3)

  return <BlogDetailsClient blog={blog} relatedArticles={relatedArticles} />
}

// Generate static paths for all blog posts
export async function generateStaticParams() {
  const slugs = await getAllBlogSlugs()
  return slugs.map((slug) => ({ slug }))
}
