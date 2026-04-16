import { createServerClient } from '@/lib/supabase/server'
import { BlogPost, Database } from '@/types/database.types'
import hardcodedBlogs, { Blog as HardcodedBlog } from '@/config/blogData'

// Type for blog_posts table rows
type BlogPostRow = Database['public']['Tables']['blog_posts']['Row']

// Type for articles table rows
type ArticleRow = Database['public']['Tables']['articles']['Row']
type ArticleCategoryRow = Database['public']['Tables']['article_categories']['Row']
type TagRow = Database['public']['Tables']['tags']['Row']

// Type for article with relations from Supabase query
type ArticleWithRelations = ArticleRow & {
  category?: ArticleCategoryRow | null
  tags?: Array<{ tag: TagRow | null }> | null
}

// Unified Blog interface that works with database, articles, and hardcoded posts
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
  // Fields from articles table
  category?: ArticleCategoryRow | null
  tags?: TagRow[]
  coverImageThumbnail?: string
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

// Convert article to unified Blog interface
function articleToBlog(article: ArticleWithRelations): Blog {
  const tags = article.tags?.map((at) => at.tag).filter(Boolean) as TagRow[] || []

  return {
    id: article.id,
    date: formatDate(article.published_at || article.created_at),
    slug: article.slug,
    name: article.title,
    shortDescription: article.excerpt || '',
    longDescription: article.content || '',
    image: article.cover_image_url || '/images/future-of-office.webp',
    coverImageThumbnail: article.cover_image_thumbnail_url || article.cover_image_url || '/images/future-of-office.webp',
    metaDescription: article.meta_description || article.excerpt || undefined,
    heroImageAlt: article.title,
    category: article.category || null,
    tags,
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

// Fetch all blog posts (blog_posts + articles + hardcoded, deduplicated by slug)
export async function getAllBlogs(): Promise<Blog[]> {
  const blogs: Blog[] = []
  const slugsSeen = new Set<string>()

  try {
    const supabase = await createServerClient()

    // Fetch from blog_posts table first (these take priority)
    const { data: dbPosts, error: dbError } = await supabase
      .from('blog_posts')
      .select('*')
      .eq('status', 'published')
      .order('published_at', { ascending: false })

    if (!dbError && dbPosts && Array.isArray(dbPosts)) {
      for (const post of dbPosts as BlogPostRow[]) {
        blogs.push(dbPostToBlog(post))
        slugsSeen.add(post.slug)
      }
    }

    // Fetch from articles table (CRM articles)
    const { data: articles, error: articlesError } = await supabase
      .from('articles')
      .select(`
        *,
        category:article_categories(*),
        tags:article_tags(tag:tags(*))
      `)
      .eq('status', 'published')
      .is('deleted_at', null)
      .order('published_at', { ascending: false })

    if (!articlesError && articles && Array.isArray(articles)) {
      for (const article of articles as ArticleWithRelations[]) {
        if (!slugsSeen.has(article.slug)) {
          blogs.push(articleToBlog(article))
          slugsSeen.add(article.slug)
        }
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
    const supabase = await createServerClient()

    // Try blog_posts table first
    const { data: dbPost, error: dbError } = await supabase
      .from('blog_posts')
      .select('*')
      .eq('slug', slug)
      .eq('status', 'published')
      .single()

    if (!dbError && dbPost) {
      return dbPostToBlog(dbPost as BlogPostRow)
    }

    // Try articles table
    const { data: article, error: articleError } = await supabase
      .from('articles')
      .select(`
        *,
        category:article_categories(*),
        tags:article_tags(tag:tags(*))
      `)
      .eq('slug', slug)
      .eq('status', 'published')
      .is('deleted_at', null)
      .single()

    if (!articleError && article) {
      return articleToBlog(article as ArticleWithRelations)
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
    const supabase = await createServerClient()

    // Get slugs from blog_posts table
    const { data: dbPosts } = await supabase
      .from('blog_posts')
      .select('slug')
      .eq('status', 'published')

    if (dbPosts && Array.isArray(dbPosts)) {
      for (const post of dbPosts as Pick<BlogPostRow, 'slug'>[]) {
        slugs.add(post.slug)
      }
    }

    // Get slugs from articles table
    const { data: articles } = await supabase
      .from('articles')
      .select('slug')
      .eq('status', 'published')
      .is('deleted_at', null)

    if (articles && Array.isArray(articles)) {
      for (const article of articles as { slug: string }[]) {
        slugs.add(article.slug)
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

// Get all unique categories from articles
export async function getAllBlogCategories(): Promise<ArticleCategoryRow[]> {
  try {
    const supabase = await createServerClient()
    const { data: categories, error } = await supabase
      .from('article_categories')
      .select('*')
      .order('name')

    if (error || !categories) {
      return []
    }

    return categories as ArticleCategoryRow[]
  } catch (error) {
    console.error('Error fetching blog categories:', error)
    return []
  }
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
