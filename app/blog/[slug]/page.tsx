import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import blogs from '@/config/blogData'
import BlogDetailsClient from './BlogDetailsClient'

interface BlogDetailsPageProps {
  params: Promise<{
    slug: string
  }>
}

async function getBlog(slug: string) {
  const blog = blogs.find((b) => b.slug === slug)
  return blog || null
}

export async function generateMetadata({ params }: BlogDetailsPageProps): Promise<Metadata> {
  const { slug } = await params
  const blog = await getBlog(slug)

  if (!blog) {
    return {
      title: 'Article Not Found | The Office Company Blog',
    }
  }

  return {
    title: `${blog.name} | The Office Company Blog`,
    description: blog.shortDescription,
    openGraph: {
      title: `${blog.name} | The Office Company Blog`,
      description: blog.shortDescription,
      images: [{ url: blog.image }],
      type: 'article',
    },
    twitter: {
      card: 'summary_large_image',
      title: `${blog.name} | The Office Company Blog`,
      description: blog.shortDescription,
      images: [blog.image],
    },
  }
}

export default async function BlogDetailsPage({ params }: BlogDetailsPageProps) {
  const { slug } = await params
  const blog = await getBlog(slug)

  if (!blog) {
    notFound()
  }

  // Get related articles (excluding current)
  const relatedArticles = blogs.filter((b) => b.slug !== slug).slice(0, 3)

  return <BlogDetailsClient blog={blog} relatedArticles={relatedArticles} />
}

// Generate static paths for all blog posts
export async function generateStaticParams() {
  return blogs.map((blog) => ({
    slug: blog.slug,
  }))
}
