-- =====================================================
-- PRODUCT-IMAGES BUCKET SETUP & POLICIES
-- =====================================================
-- This sets up storage for product images (main images, thumbnails, and medium sizes)

-- Note: You must create the 'product-images' bucket in Supabase Dashboard first:
-- 1. Go to Storage in Supabase Dashboard
-- 2. Click "New bucket"
-- 3. Name: product-images
-- 4. Public bucket: Yes
-- 5. File size limit: 10MB
-- 6. Allowed MIME types: image/jpeg, image/jpg, image/png, image/webp, image/avif

-- Then run this SQL to create the policies:

-- =====================================================
-- PRODUCT-IMAGES BUCKET POLICIES
-- =====================================================

-- Policy: Authenticated users can upload product images
CREATE POLICY "Authenticated users can upload product images"
ON storage.objects
FOR INSERT
TO authenticated
WITH CHECK (bucket_id = 'product-images');

-- Policy: Anyone can view product images (public read)
CREATE POLICY "Anyone can view product images"
ON storage.objects
FOR SELECT
TO public
USING (bucket_id = 'product-images');

-- Policy: Authenticated users can update product images
CREATE POLICY "Authenticated users can update product images"
ON storage.objects
FOR UPDATE
TO authenticated
USING (bucket_id = 'product-images');

-- Policy: Authenticated users can delete product images
CREATE POLICY "Authenticated users can delete product images"
ON storage.objects
FOR DELETE
TO authenticated
USING (bucket_id = 'product-images');

-- =====================================================
-- NOTES
-- =====================================================
-- Image URL format in product_images table:
-- image_url: Full size image (800x600 or larger)
--   Example: https://YOUR_PROJECT.supabase.co/storage/v1/object/public/product-images/chairs/product-1-full.jpg
--
-- thumbnail_url: Small thumbnail (200x150 or similar)
--   Example: https://YOUR_PROJECT.supabase.co/storage/v1/object/public/product-images/chairs/product-1-thumb.jpg
--
-- medium_url: Medium size (400x300 or similar)
--   Example: https://YOUR_PROJECT.supabase.co/storage/v1/object/public/product-images/chairs/product-1-medium.jpg
--
-- Recommended folder structure:
-- product-images/
--   chairs/
--   desks/
--   storage/
--   acoustic/
--   lighting/
--   lounge/
