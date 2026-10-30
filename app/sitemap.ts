import type { MetadataRoute } from 'next'
import { createAnonClient } from '@/lib/supabase/anon'
import hardcodedBlogs from '@/config/blogData'

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.theofficecompany.eu'

// Regenerate the sitemap at most once per hour
export const revalidate = 3600

interface SlugRow {
  slug: string
  updated_at?: string | null
}

// One sitemap entry per language variant (HR on the bare path, EN under
// /en), each carrying hreflang alternates pointing at both variants.
function localizedEntries(
  path: string,
  lastModified?: string | Date | null
): MetadataRoute.Sitemap {
  const suffix = path === '/' ? '' : path
  const hrUrl = `${SITE_URL}${suffix}`
  const enUrl = `${SITE_URL}/en${suffix}`
  const languages = { hr: hrUrl, en: enUrl }
  const lastMod = lastModified ? new Date(lastModified) : undefined

  return [
    { url: hrUrl, lastModified: lastMod, alternates: { languages } },
    { url: enUrl, lastModified: lastMod, alternates: { languages } },
  ]
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const supabase = createAnonClient()

  const [products, categories, rooms, blogPosts, articles] = await Promise.all([
    supabase
      .from('products')
      .select('slug, updated_at')
      .is('deleted_at', null),
    supabase.from('categories').select('slug, updated_at'),
    supabase.from('rooms').select('slug, updated_at'),
    supabase
      .from('blog_posts')
      .select('slug, updated_at')
      .eq('status', 'published'),
    supabase
      .from('articles')
      .select('slug, updated_at')
      .eq('status', 'published')
      .is('deleted_at', null),
  ])

  const staticPaths = [
    '/',
    '/about',
    '/services',
    '/contact',
    '/furniture',
    '/blog',
    '/downloads',
    '/privacy',
    '/cookies',
    '/terms',
  ]

  const entries: MetadataRoute.Sitemap = staticPaths.flatMap((path) =>
    localizedEntries(path)
  )

  for (const product of (products.data as SlugRow[] | null) || []) {
    entries.push(...localizedEntries(`/products/${product.slug}`, product.updated_at))
  }

  for (const category of (categories.data as SlugRow[] | null) || []) {
    entries.push(...localizedEntries(`/categories/${category.slug}`, category.updated_at))
  }

  for (const room of (rooms.data as SlugRow[] | null) || []) {
    entries.push(...localizedEntries(`/rooms/${room.slug}`, room.updated_at))
  }

  // Blog posts come from three sources (blog_posts, CRM articles, hardcoded
  // fallback content) — dedupe by slug, DB content wins, same as lib/blog.ts
  const blogSlugs = new Map<string, string | null | undefined>()
  for (const post of (blogPosts.data as SlugRow[] | null) || []) {
    blogSlugs.set(post.slug, post.updated_at)
  }
  for (const article of (articles.data as SlugRow[] | null) || []) {
    if (!blogSlugs.has(article.slug)) blogSlugs.set(article.slug, article.updated_at)
  }
  for (const blog of hardcodedBlogs) {
    if (!blogSlugs.has(blog.slug)) blogSlugs.set(blog.slug, null)
  }

  for (const [slug, updatedAt] of blogSlugs) {
    entries.push(...localizedEntries(`/blog/${slug}`, updatedAt))
  }

  return entries
}
