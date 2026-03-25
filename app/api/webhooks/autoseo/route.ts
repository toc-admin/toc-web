import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import crypto from 'crypto'

// Webhook secret token
const AUTOSEO_WEBHOOK_TOKEN = 'aseo_wh_abd9a6ce2cc2a5738142eeddd660b018'

// Site URL for constructing blog post URLs
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.theofficecompany.eu'

// Types for AutoSEO webhook payload
interface AutoSEOWebhookPayload {
  event: 'article.published' | 'test'
  id: number
  title: string
  slug: string
  metaDescription: string
  content_html: string
  content_markdown: string
  heroImageUrl: string | null
  heroImageAlt: string | null
  infographicImageUrl: string | null
  keywords: string[]
  metaKeywords: string | null
  faqSchema: Array<{ question: string; answer: string }> | null
  languageCode: string
  status: string
  publishedAt: string
  updatedAt: string
  createdAt: string
}

// Create Supabase client with service role key for write access
function getSupabaseAdmin() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY

  if (!supabaseUrl || !supabaseServiceKey) {
    throw new Error('Missing Supabase environment variables')
  }

  return createClient(supabaseUrl, supabaseServiceKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  })
}

// Verify Bearer token from Authorization header
function verifyBearerToken(request: NextRequest): boolean {
  const authHeader = request.headers.get('Authorization')
  if (!authHeader) return false

  const [type, token] = authHeader.split(' ')
  return type === 'Bearer' && token === AUTOSEO_WEBHOOK_TOKEN
}

// Verify HMAC-SHA256 signature (optional but recommended)
function verifySignature(rawBody: string, signatureHeader: string | null): boolean {
  if (!signatureHeader) return true // Signature is optional

  const expectedSignature = crypto
    .createHmac('sha256', AUTOSEO_WEBHOOK_TOKEN)
    .update(rawBody)
    .digest('hex')

  return crypto.timingSafeEqual(
    Buffer.from(signatureHeader),
    Buffer.from(expectedSignature)
  )
}

// Download image from URL and upload to Supabase Storage
async function downloadAndStoreImage(
  supabase: ReturnType<typeof getSupabaseAdmin>,
  imageUrl: string,
  folder: 'hero' | 'infographic',
  slug: string
): Promise<string | null> {
  try {
    // Fetch the image
    const response = await fetch(imageUrl, {
      headers: {
        'User-Agent': 'TheOfficeCompany-Webhook/1.0',
      },
    })

    if (!response.ok) {
      console.error(`Failed to download image: ${response.status} ${response.statusText}`)
      return null
    }

    // Get the content type and determine file extension
    const contentType = response.headers.get('content-type') || 'image/jpeg'
    const extension = contentType.includes('png')
      ? 'png'
      : contentType.includes('webp')
      ? 'webp'
      : contentType.includes('gif')
      ? 'gif'
      : contentType.includes('avif')
      ? 'avif'
      : 'jpg'

    // Convert response to buffer
    const arrayBuffer = await response.arrayBuffer()
    const buffer = Buffer.from(arrayBuffer)

    // Generate a unique filename
    const timestamp = Date.now()
    const filename = `${folder}/${slug}-${timestamp}.${extension}`

    // Upload to Supabase Storage
    const { error: uploadError } = await supabase.storage
      .from('blog-images')
      .upload(filename, buffer, {
        contentType,
        upsert: true,
      })

    if (uploadError) {
      console.error('Failed to upload image to Supabase:', uploadError)
      return null
    }

    // Get the public URL
    const { data: publicUrlData } = supabase.storage
      .from('blog-images')
      .getPublicUrl(filename)

    return publicUrlData.publicUrl
  } catch (error) {
    console.error('Error downloading/storing image:', error)
    return null
  }
}

// Create a short description from HTML content
function createShortDescription(html: string, metaDescription: string): string {
  if (metaDescription) return metaDescription

  // Strip HTML tags and get first ~200 characters
  const text = html.replace(/<[^>]*>/g, '').trim()
  if (text.length <= 200) return text
  return text.substring(0, 197) + '...'
}

// Format date for display (e.g., "25 February 2025")
function formatDisplayDate(isoDate: string): string {
  const date = new Date(isoDate)
  return date.toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })
}

export async function POST(request: NextRequest) {
  try {
    // Read raw body for signature verification
    const rawBody = await request.text()

    // Verify Bearer token
    if (!verifyBearerToken(request)) {
      return NextResponse.json(
        { error: 'Unauthorized: Invalid or missing Bearer token' },
        { status: 401 }
      )
    }

    // Verify HMAC signature (optional)
    const signature = request.headers.get('X-AutoSEO-Signature')
    if (signature && !verifySignature(rawBody, signature)) {
      return NextResponse.json(
        { error: 'Unauthorized: Invalid signature' },
        { status: 401 }
      )
    }

    // Parse the JSON body
    let payload: AutoSEOWebhookPayload
    try {
      payload = JSON.parse(rawBody)
    } catch {
      return NextResponse.json(
        { error: 'Bad Request: Invalid JSON' },
        { status: 400 }
      )
    }

    // Log webhook event for debugging
    const deliveryId = request.headers.get('X-AutoSEO-Delivery') || 'unknown'
    const eventType = request.headers.get('X-AutoSEO-Event') || payload.event
    console.log(`AutoSEO webhook received: event=${eventType}, delivery=${deliveryId}`)

    // Handle test event
    if (payload.event === 'test') {
      return NextResponse.json({ url: `${SITE_URL}/test` })
    }

    // Validate required fields
    if (!payload.title || !payload.slug || !payload.content_html) {
      return NextResponse.json(
        { error: 'Bad Request: Missing required fields (title, slug, content_html)' },
        { status: 400 }
      )
    }

    // Initialize Supabase admin client
    const supabase = getSupabaseAdmin()

    // Download and store images
    let heroImageUrl: string | null = null
    let infographicImageUrl: string | null = null

    if (payload.heroImageUrl) {
      heroImageUrl = await downloadAndStoreImage(
        supabase,
        payload.heroImageUrl,
        'hero',
        payload.slug
      )
    }

    if (payload.infographicImageUrl) {
      infographicImageUrl = await downloadAndStoreImage(
        supabase,
        payload.infographicImageUrl,
        'infographic',
        payload.slug
      )
    }

    // Prepare the blog post data
    const blogPostData = {
      autoseo_id: payload.id,
      title: payload.title,
      slug: payload.slug,
      short_description: createShortDescription(payload.content_html, payload.metaDescription),
      long_description: payload.content_html, // For compatibility with existing Blog interface
      content_html: payload.content_html,
      content_markdown: payload.content_markdown,
      meta_description: payload.metaDescription,
      meta_keywords: payload.metaKeywords,
      keywords: payload.keywords || [],
      hero_image_url: heroImageUrl,
      hero_image_alt: payload.heroImageAlt,
      infographic_image_url: infographicImageUrl,
      faq_schema: payload.faqSchema || [],
      language_code: payload.languageCode || 'en',
      status: payload.status || 'published',
      published_at: payload.publishedAt || new Date().toISOString(),
      updated_at: payload.updatedAt || new Date().toISOString(),
    }

    // Upsert the blog post (update if autoseo_id exists, otherwise insert)
    const { data: existingPost } = await supabase
      .from('blog_posts')
      .select('id')
      .eq('autoseo_id', payload.id)
      .single()

    let result
    if (existingPost) {
      // Update existing post
      result = await supabase
        .from('blog_posts')
        .update(blogPostData)
        .eq('autoseo_id', payload.id)
        .select()
        .single()
    } else {
      // Insert new post
      result = await supabase
        .from('blog_posts')
        .insert(blogPostData)
        .select()
        .single()
    }

    if (result.error) {
      console.error('Failed to save blog post:', result.error)
      return NextResponse.json(
        { error: 'Internal Server Error: Failed to save blog post' },
        { status: 500 }
      )
    }

    // Return the published URL
    const publishedUrl = `${SITE_URL}/blog/${payload.slug}`
    console.log(`Blog post ${existingPost ? 'updated' : 'created'}: ${publishedUrl}`)

    return NextResponse.json({ url: publishedUrl })
  } catch (error) {
    console.error('AutoSEO webhook error:', error)
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    )
  }
}

// Optionally support GET for health checks
export async function GET() {
  return NextResponse.json({
    status: 'ok',
    endpoint: 'AutoSEO Webhook',
    method: 'POST',
  })
}
