-- =====================================================
-- QUICK PRODUCT IMAGES SETUP
-- =====================================================
-- Run these queries in your Supabase SQL Editor to check and setup product images

-- =====================================================
-- STEP 1: Check current state
-- =====================================================

-- Check if product-images bucket exists
SELECT id, name, public, created_at
FROM storage.buckets
WHERE id = 'product-images';
-- Expected: Should return 1 row if bucket exists

-- Check how many featured products exist
SELECT COUNT(*) as featured_product_count
FROM products
WHERE is_featured = true AND deleted_at IS NULL;
-- Note the count

-- Check how many featured products have images
SELECT
  COUNT(DISTINCT p.id) as products_with_images,
  COUNT(pi.id) as total_images
FROM products p
LEFT JOIN product_images pi ON p.id = pi.product_id
WHERE p.is_featured = true AND p.deleted_at IS NULL;
-- If products_with_images = 0, you need to add images!

-- =====================================================
-- STEP 2: View products that need images
-- =====================================================

-- List featured products without images
SELECT
  p.id,
  p.name,
  p.slug,
  b.name as brand_name,
  c.name as category_name
FROM products p
LEFT JOIN brands b ON p.brand_id = b.id
LEFT JOIN categories c ON p.category_id = c.id
LEFT JOIN product_images pi ON p.id = pi.product_id
WHERE p.is_featured = true
  AND p.deleted_at IS NULL
  AND pi.id IS NULL
ORDER BY p.name;

-- =====================================================
-- STEP 3: Add placeholder images for testing (OPTIONAL)
-- =====================================================
-- This will add placeholder images from picsum.photos
-- Remove this after you upload real images!

INSERT INTO product_images (product_id, image_url, is_primary, display_order)
SELECT
  id,
  'https://picsum.photos/seed/' || id || '/800/600' as image_url,
  true,
  1
FROM products
WHERE is_featured = true
  AND deleted_at IS NULL
  AND NOT EXISTS (
    SELECT 1 FROM product_images WHERE product_id = products.id
  );

-- Check results
SELECT COUNT(*) as images_added FROM product_images;

-- =====================================================
-- STEP 4: Add real images from Supabase Storage
-- =====================================================
-- After uploading images to Supabase Storage bucket 'product-images'
-- Replace the placeholder images with real ones

-- Example: Update a specific product with real image
-- First, get the product ID:
SELECT id, name, slug FROM products WHERE slug = 'your-product-slug-here';

-- Then insert the real image URL:
-- Replace 'PRODUCT-UUID-HERE' with actual product ID
-- Replace image URLs with your actual uploaded image URLs
INSERT INTO product_images (product_id, image_url, thumbnail_url, medium_url, is_primary, display_order)
VALUES (
  'PRODUCT-UUID-HERE',
  'https://vlwjarfujykmkcvfvlep.supabase.co/storage/v1/object/public/product-images/category/product-full.jpg',
  'https://vlwjarfujykmkcvfvlep.supabase.co/storage/v1/object/public/product-images/category/product-thumb.jpg',
  'https://vlwjarfujykmkcvfvlep.supabase.co/storage/v1/object/public/product-images/category/product-medium.jpg',
  true,
  1
);

-- =====================================================
-- STEP 5: Verify everything is working
-- =====================================================

-- View all featured products with their images
SELECT
  p.name,
  p.slug,
  p.is_featured,
  b.name as brand_name,
  c.name as category_name,
  pi.image_url,
  pi.thumbnail_url,
  pi.is_primary,
  pi.display_order
FROM products p
LEFT JOIN brands b ON p.brand_id = b.id
LEFT JOIN categories c ON p.category_id = c.id
LEFT JOIN product_images pi ON p.id = pi.product_id
WHERE p.is_featured = true
  AND p.deleted_at IS NULL
ORDER BY p.name, pi.display_order;

-- Count products with and without images
SELECT
  COUNT(DISTINCT CASE WHEN pi.id IS NOT NULL THEN p.id END) as with_images,
  COUNT(DISTINCT CASE WHEN pi.id IS NULL THEN p.id END) as without_images,
  COUNT(DISTINCT p.id) as total_featured
FROM products p
LEFT JOIN product_images pi ON p.id = pi.product_id
WHERE p.is_featured = true AND p.deleted_at IS NULL;

-- =====================================================
-- STEP 6: Clean up placeholder images (when ready)
-- =====================================================
-- After you've uploaded real images, remove placeholders:

-- DELETE FROM product_images
-- WHERE image_url LIKE '%picsum.photos%';

-- =====================================================
-- USEFUL QUERIES
-- =====================================================

-- Get image count per product
SELECT
  p.name,
  COUNT(pi.id) as image_count,
  bool_or(pi.is_primary) as has_primary_image
FROM products p
LEFT JOIN product_images pi ON p.id = pi.product_id
WHERE p.is_featured = true AND p.deleted_at IS NULL
GROUP BY p.id, p.name
ORDER BY image_count DESC;

-- Find products with multiple images
SELECT
  p.name,
  COUNT(pi.id) as image_count
FROM products p
INNER JOIN product_images pi ON p.id = pi.product_id
WHERE p.is_featured = true AND p.deleted_at IS NULL
GROUP BY p.id, p.name
HAVING COUNT(pi.id) > 1;

-- Find products without a primary image
SELECT
  p.name,
  p.slug
FROM products p
LEFT JOIN product_images pi ON p.id = pi.product_id AND pi.is_primary = true
WHERE p.is_featured = true
  AND p.deleted_at IS NULL
  AND pi.id IS NULL;
