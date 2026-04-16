import type { Metadata } from 'next'
import BlogPageContent from './BlogPageContent'
import { getAllBlogs, getAllBlogCategories } from '@/lib/blog'

export const metadata: Metadata = {
  title: 'Insights & Tips | The Office Company Blog',
  description: 'Stay informed with The Office Company\'s blog. Read expert insights on office trends, productivity tips, and the future of workspaces.',
  openGraph: {
    title: 'Insights & Tips | The Office Company Blog',
    description: 'Stay informed with The Office Company\'s blog. Read expert insights on office trends, productivity tips, and the future of workspaces.',
    images: [{
      url: '/og/toc-hero.jpeg',
      width: 1200,
      height: 630,
      alt: 'The Office Company Blog'
    }],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Insights & Tips | The Office Company Blog',
    description: 'Stay informed with The Office Company\'s blog. Read expert insights on office trends, productivity tips, and the future of workspaces.',
    images: ['/og/toc-hero.jpeg'],
  },
}

// Revalidate every 60 seconds to pick up new posts
export const revalidate = 60

export default async function BlogPage() {
  const [blogs, categories] = await Promise.all([
    getAllBlogs(),
    getAllBlogCategories(),
  ])
  return <BlogPageContent blogs={blogs} categories={categories} />
}
