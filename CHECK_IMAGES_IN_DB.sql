-- Quick check to see what's in your database
-- Run this in Supabase SQL Editor

-- 1. Check featured products
SELECT
  p.id,
  p.name,
  p.slug,
  p.is_featured,
  b.name as brand_name,
  c.name as category_name
FROM products p
LEFT JOIN brands b ON p.brand_id = b.id
LEFT JOIN categories c ON p.category_id = c.id
WHERE p.is_featured = true
  AND (p.deleted_at IS NULL OR p.deleted_at IS NOT NULL)  -- Check both
ORDER BY p.name
LIMIT 10;

-- 2. Check product images
SELECT
  pi.id,
  pi.product_id,
  pi.image_url,
  pi.thumbnail_url,
  pi.medium_url,
  pi.is_primary,
  pi.display_order,
  p.name as product_name
FROM product_images pi
INNER JOIN products p ON pi.product_id = p.id
WHERE p.is_featured = true
ORDER BY p.name, pi.display_order
LIMIT 20;

-- 3. Check for products with images - detailed
SELECT
  p.id,
  p.name,
  p.is_featured,
  p.deleted_at,
  COUNT(pi.id) as image_count,
  json_agg(json_build_object(
    'image_url', pi.image_url,
    'thumbnail_url', pi.thumbnail_url,
    'is_primary', pi.is_primary
  ) ORDER BY pi.display_order) FILTER (WHERE pi.id IS NOT NULL) as images
FROM products p
LEFT JOIN product_images pi ON p.id = pi.product_id
WHERE p.is_featured = true
GROUP BY p.id, p.name, p.is_featured, p.deleted_at
ORDER BY p.name;

-- 4. Check if deleted_at is causing issues
SELECT
  COUNT(*) FILTER (WHERE deleted_at IS NULL) as not_deleted,
  COUNT(*) FILTER (WHERE deleted_at IS NOT NULL) as deleted,
  COUNT(*) as total
FROM products
WHERE is_featured = true;
