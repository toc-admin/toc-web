# Product Images Setup Guide

## Issue
Featured products are not displaying images because the `product_images` table is likely empty or products don't have associated images.

## Steps to Fix

### 1. Check if Products Have Images

Run this query in your Supabase SQL Editor:

```sql
-- Check featured products and their images
SELECT
  p.id,
  p.name,
  p.is_featured,
  COUNT(pi.id) as image_count
FROM products p
LEFT JOIN product_images pi ON p.id = pi.product_id
WHERE p.is_featured = true AND p.deleted_at IS NULL
GROUP BY p.id, p.name, p.is_featured;
```

### 2. Upload Images to Supabase Storage

1. Go to Supabase Dashboard → Storage
2. Create a bucket called `product-images` (if not exists)
3. Set the bucket to **Public**
4. Upload your product images

### 3. Insert Image URLs into Database

After uploading images, insert them into the `product_images` table:

```sql
-- Example: Insert an image for a product
INSERT INTO product_images (product_id, image_url, thumbnail_url, is_primary)
VALUES (
  'your-product-uuid-here',
  'https://vlwjarfujykmkcvfvlep.supabase.co/storage/v1/object/public/product-images/product-1.jpg',
  'https://vlwjarfujykmkcvfvlep.supabase.co/storage/v1/object/public/product-images/product-1-thumb.jpg',
  true
);
```

### 4. Bulk Insert Example

If you have multiple products, use this pattern:

```sql
-- Assuming you have products and uploaded images
-- Get your product IDs first:
SELECT id, name, slug FROM products WHERE is_featured = true;

-- Then insert images for each product:
INSERT INTO product_images (product_id, image_url, is_primary, display_order) VALUES
  ('product-id-1', 'https://your-supabase-url/storage/v1/object/public/product-images/chair-1.jpg', true, 1),
  ('product-id-2', 'https://your-supabase-url/storage/v1/object/public/product-images/desk-1.jpg', true, 1),
  ('product-id-3', 'https://your-supabase-url/storage/v1/object/public/product-images/table-1.jpg', true, 1);
```

### 5. Quick Test with Sample Images

If you want to test with placeholder images:

```sql
-- Insert placeholder images for all featured products
INSERT INTO product_images (product_id, image_url, is_primary)
SELECT
  id,
  'https://picsum.photos/seed/' || id || '/800/600',
  true
FROM products
WHERE is_featured = true
  AND deleted_at IS NULL
  AND NOT EXISTS (
    SELECT 1 FROM product_images
    WHERE product_id = products.id
  );
```

### 6. Verify Images Are Loaded

After inserting images, run:

```sql
-- Check if images are now associated with products
SELECT
  p.name,
  p.slug,
  pi.image_url,
  pi.is_primary,
  pi.display_order
FROM products p
INNER JOIN product_images pi ON p.id = pi.product_id
WHERE p.is_featured = true AND p.deleted_at IS NULL
ORDER BY p.name, pi.display_order;
```

## Alternative: Update Existing Code to Use Category Images

If you want to show category images as fallback for products without images, the ProductCard already handles this with a nice placeholder:

- ✅ Shows product image if available from `product_images` table
- ✅ Shows a nice "No Image Available" placeholder with icon if no images exist
- ✅ Supports both Supabase Storage URLs and external URLs

## Storage URL Format

Your Supabase Storage URLs should follow this format:
```
https://vlwjarfujykmkcvfvlep.supabase.co/storage/v1/object/public/BUCKET_NAME/FILE_PATH
```

Example:
```
https://vlwjarfujykmkcvfvlep.supabase.co/storage/v1/object/public/product-images/chairs/haworth-zody.jpg
```

## Next Steps

1. Run the first query to check current state
2. Upload some test images to Supabase Storage
3. Insert image URLs into `product_images` table
4. Refresh your furniture page to see images!

## Debug Mode

The page now includes console.log debugging. Open your browser console (F12) and you'll see:
- Featured products count
- Sample product data structure
- Sample product images array

This will help identify if:
- Products are being fetched
- Products have the `product_images` array populated
- Image URLs are valid
