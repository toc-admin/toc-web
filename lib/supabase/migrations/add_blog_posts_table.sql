-- =====================================================
-- BLOG_POSTS TABLE SETUP
-- =====================================================
-- This creates the blog_posts table for storing articles
-- received from AutoSEO webhook and other sources.
--
-- IMPORTANT: Only CREATE new tables - never DROP existing ones.

-- =====================================================
-- CREATE BLOG_POSTS TABLE
-- =====================================================

CREATE TABLE IF NOT EXISTS blog_posts (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

    -- AutoSEO tracking (for idempotent webhook handling)
    autoseo_id INTEGER UNIQUE,

    -- Core content fields
    title TEXT NOT NULL,
    slug TEXT NOT NULL UNIQUE,
    short_description TEXT,
    long_description TEXT,
    content_html TEXT,
    content_markdown TEXT,

    -- SEO fields
    meta_description TEXT,
    meta_keywords TEXT,
    keywords JSONB DEFAULT '[]'::jsonb,

    -- Images (stored locally after download)
    hero_image_url TEXT,
    hero_image_alt TEXT,
    infographic_image_url TEXT,

    -- FAQ Schema for structured data
    faq_schema JSONB DEFAULT '[]'::jsonb,

    -- Metadata
    language_code TEXT DEFAULT 'en',
    status TEXT DEFAULT 'published',

    -- Timestamps
    published_at TIMESTAMPTZ DEFAULT NOW(),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create index for faster slug lookups
CREATE INDEX IF NOT EXISTS idx_blog_posts_slug ON blog_posts(slug);

-- Create index for status filtering
CREATE INDEX IF NOT EXISTS idx_blog_posts_status ON blog_posts(status);

-- Create index for AutoSEO ID lookups (for upsert operations)
CREATE INDEX IF NOT EXISTS idx_blog_posts_autoseo_id ON blog_posts(autoseo_id);

-- Create index for published date sorting
CREATE INDEX IF NOT EXISTS idx_blog_posts_published_at ON blog_posts(published_at DESC);

-- =====================================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- =====================================================

-- Enable RLS on the table
ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;

-- Policy: Anyone can read published blog posts (public read)
CREATE POLICY "Anyone can read published blog posts"
ON blog_posts
FOR SELECT
TO public
USING (status = 'published');

-- Policy: Service role can do everything (for webhook)
-- Note: Service role bypasses RLS by default, but this is explicit
CREATE POLICY "Service role has full access to blog posts"
ON blog_posts
FOR ALL
TO service_role
USING (true)
WITH CHECK (true);

-- =====================================================
-- BLOG-IMAGES BUCKET SETUP
-- =====================================================
-- You must create the 'blog-images' bucket in Supabase Dashboard:
-- 1. Go to Storage in Supabase Dashboard
-- 2. Click "New bucket"
-- 3. Name: blog-images
-- 4. Public bucket: Yes
-- 5. File size limit: 10MB
-- 6. Allowed MIME types: image/jpeg, image/jpg, image/png, image/webp, image/avif, image/gif

-- Then run these policies:

-- Policy: Service role can upload blog images
CREATE POLICY "Service role can upload blog images"
ON storage.objects
FOR INSERT
TO service_role
WITH CHECK (bucket_id = 'blog-images');

-- Policy: Anyone can view blog images (public read)
CREATE POLICY "Anyone can view blog images"
ON storage.objects
FOR SELECT
TO public
USING (bucket_id = 'blog-images');

-- Policy: Service role can update blog images
CREATE POLICY "Service role can update blog images"
ON storage.objects
FOR UPDATE
TO service_role
USING (bucket_id = 'blog-images');

-- Policy: Service role can delete blog images
CREATE POLICY "Service role can delete blog images"
ON storage.objects
FOR DELETE
TO service_role
USING (bucket_id = 'blog-images');

-- =====================================================
-- UPDATED_AT TRIGGER
-- =====================================================

-- Function to automatically update updated_at timestamp
CREATE OR REPLACE FUNCTION update_blog_posts_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger to call the function on update
DROP TRIGGER IF EXISTS trigger_blog_posts_updated_at ON blog_posts;
CREATE TRIGGER trigger_blog_posts_updated_at
    BEFORE UPDATE ON blog_posts
    FOR EACH ROW
    EXECUTE FUNCTION update_blog_posts_updated_at();

-- =====================================================
-- NOTES
-- =====================================================
--
-- Image URL format for blog-images bucket:
-- https://YOUR_PROJECT.supabase.co/storage/v1/object/public/blog-images/hero/article-slug.jpg
-- https://YOUR_PROJECT.supabase.co/storage/v1/object/public/blog-images/infographic/article-slug.jpg
--
-- Recommended folder structure:
-- blog-images/
--   hero/           -- Hero images
--   infographic/    -- Infographic images
--
-- The webhook uses SUPABASE_SERVICE_ROLE_KEY for write access.
-- Make sure to add this to your .env.local:
-- SUPABASE_SERVICE_ROLE_KEY=your_service_role_key_here
