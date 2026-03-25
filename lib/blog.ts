import { createServerClient } from '@/lib/supabase/server'
import { BlogPost, Database } from '@/types/database.types'
import hardcodedBlogs, { Blog as HardcodedBlog } from '@/config/blogData'

// Type for blog_posts table rows
type BlogPostRow = Database['public']['Tables']['blog_posts']['Row']

// Unified Blog interface that works with both database and hardcoded posts
export interface Blog {
  id: number | string
  date: string
  slug: string
  name: string
  shortDescription: string
  longDescription: string
  image: string
  // Extended fields from database
  metaDescription?: string
  metaKeywords?: string
  keywords?: string[]
  heroImageAlt?: string
  infographicImageUrl?: string
  faqSchema?: Array<{ question: string; answer: string }> | null
  contentMarkdown?: string
}

// Convert database BlogPost to unified Blog interface
function dbPostToBlog(post: BlogPost): Blog {
  return {
    id: post.autoseo_id || post.id,
    date: formatDate(post.published_at),
    slug: post.slug,
    name: post.title,
    shortDescription: post.short_description || post.meta_description || '',
    longDescription: post.long_description || post.content_html || '',
    image: post.hero_image_url || '/images/future-of-office.webp',
    metaDescription: post.meta_description || undefined,
    metaKeywords: post.meta_keywords || undefined,
    keywords: post.keywords || undefined,
    heroImageAlt: post.hero_image_alt || undefined,
    infographicImageUrl: post.infographic_image_url || undefined,
    faqSchema: post.faq_schema || undefined,
    contentMarkdown: post.content_markdown || undefined,
  }
}

// Convert hardcoded blog to unified Blog interface
function hardcodedToBlog(blog: HardcodedBlog): Blog {
  return {
    id: blog.id,
    date: blog.date,
    slug: blog.slug,
    name: blog.name,
    shortDescription: blog.shortDescription,
    longDescription: blog.longDescription,
    image: blog.image,
  }
}

// Format date for display (e.g., "25 February 2025")
function formatDate(isoDate: string): string {
  const date = new Date(isoDate)
  return date.toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })
}

// Fetch all blog posts (database + hardcoded, deduplicated by slug)
export async function getAllBlogs(): Promise<Blog[]> {
  const blogs: Blog[] = []
  const slugsSeen = new Set<string>()

  try {
    // Fetch from database first (these take priority)
    const supabase = await createServerClient()
    const { data: dbPosts, error } = await supabase
      .from('blog_posts')
      .select('*')
      .eq('status', 'published')
      .order('published_at', { ascending: false })

    if (!error && dbPosts && Array.isArray(dbPosts)) {
      for (const post of dbPosts as BlogPostRow[]) {
        blogs.push(dbPostToBlog(post))
        slugsSeen.add(post.slug)
      }
    }
  } catch (error) {
    console.error('Error fetching blog posts from database:', error)
  }

  // Add hardcoded blogs that aren't in the database
  for (const blog of hardcodedBlogs) {
    if (!slugsSeen.has(blog.slug)) {
      blogs.push(hardcodedToBlog(blog))
      slugsSeen.add(blog.slug)
    }
  }

  // Sort by date (newest first)
  blogs.sort((a, b) => {
    const dateA = parseDisplayDate(a.date)
    const dateB = parseDisplayDate(b.date)
    return dateB.getTime() - dateA.getTime()
  })

  return blogs
}

// Fetch a single blog post by slug
export async function getBlogBySlug(slug: string): Promise<Blog | null> {
  try {
    // Try database first
    const supabase = await createServerClient()
    const { data: dbPost, error } = await supabase
      .from('blog_posts')
      .select('*')
      .eq('slug', slug)
      .eq('status', 'published')
      .single()

    if (!error && dbPost) {
      return dbPostToBlog(dbPost as BlogPostRow)
    }
  } catch (error) {
    console.error('Error fetching blog post from database:', error)
  }

  // Fallback to hardcoded blogs
  const hardcodedBlog = hardcodedBlogs.find((b) => b.slug === slug)
  if (hardcodedBlog) {
    return hardcodedToBlog(hardcodedBlog)
  }

  return null
}

// Get all blog slugs for static generation
export async function getAllBlogSlugs(): Promise<string[]> {
  const slugs = new Set<string>()

  try {
    // Get slugs from database
    const supabase = await createServerClient()
    const { data: dbPosts } = await supabase
      .from('blog_posts')
      .select('slug')
      .eq('status', 'published')

    if (dbPosts && Array.isArray(dbPosts)) {
      for (const post of dbPosts as Pick<BlogPostRow, 'slug'>[]) {
        slugs.add(post.slug)
      }
    }
  } catch (error) {
    console.error('Error fetching blog slugs from database:', error)
  }

  // Add hardcoded slugs
  for (const blog of hardcodedBlogs) {
    slugs.add(blog.slug)
  }

  return Array.from(slugs)
}

// Parse display date back to Date object
function parseDisplayDate(displayDate: string): Date {
  // Handle format like "25 February 2025"
  const months: Record<string, number> = {
    January: 0, February: 1, March: 2, April: 3,
    May: 4, June: 5, July: 6, August: 7,
    September: 8, October: 9, November: 10, December: 11,
  }

  const parts = displayDate.split(' ')
  if (parts.length === 3) {
    const day = parseInt(parts[0], 10)
    const month = months[parts[1]] ?? 0
    const year = parseInt(parts[2], 10)
    return new Date(year, month, day)
  }

  // Fallback to ISO date parsing
  return new Date(displayDate)
}
