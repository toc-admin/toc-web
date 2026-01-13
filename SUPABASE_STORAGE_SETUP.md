# Supabase Storage Setup Guide

## Current Storage Buckets

Based on your Supabase migrations, you have the following storage buckets configured:

### 1. **avatars**
- User profile avatars
- Policies: Users can only upload/update/delete their own avatars
- Public read access

### 2. **company-logos**
- Company logo images
- Policies: Authenticated users can upload/update/delete
- Public read access

### 3. **product-datasheets**
- PDF datasheets for products
- File types: PDF only
- Max size: 10MB
- Policies: Authenticated users can upload/update/delete
- Public read access

### 4. **product-images** (NEEDS SETUP)
- Product photos (main images, thumbnails, medium sizes)
- File types: JPEG, PNG, WebP, AVIF
- Max size: 10MB recommended
- Public read access

## Setup Product Images Bucket

### Step 1: Create the Bucket in Supabase Dashboard

1. Go to https://app.supabase.com/project/vlwjarfujykmkcvfvlep/storage/buckets
2. Click **"New bucket"**
3. Configure:
   - **Name**: `product-images`
   - **Public bucket**: ✅ Yes (checked)
   - **File size limit**: 10 MB
   - **Allowed MIME types**:
     - `image/jpeg`
     - `image/jpg`
     - `image/png`
     - `image/webp`
     - `image/avif`

### Step 2: Apply Storage Policies

Run the SQL migration file in your Supabase SQL Editor:

Location: `/lib/supabase/migrations/add_product_images_storage.sql`

Or copy and run this SQL:

```sql
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
```

### Step 3: Organize Your Images

Create folders in the bucket for better organization:

```
product-images/
├── chairs/
│   ├── haworth-zody-full.jpg
│   ├── haworth-zody-medium.jpg
│   └── haworth-zody-thumb.jpg
├── desks/
│   ├── standing-desk-full.jpg
│   ├── standing-desk-medium.jpg
│   └── standing-desk-thumb.jpg
├── storage/
├── acoustic/
├── lighting/
└── lounge/
```

### Step 4: Upload Images

#### Option A: Via Supabase Dashboard (Manual)

1. Go to Storage → product-images
2. Create folders (chairs, desks, etc.)
3. Upload images to appropriate folders
4. Copy the public URLs

#### Option B: Via Code (Programmatic)

```typescript
import { createClient } from '@/lib/supabase/client'

const supabase = createClient()

// Upload a product image
const uploadProductImage = async (file: File, productSlug: string, category: string) => {
  const fileName = `${category}/${productSlug}-${Date.now()}.jpg`

  const { data, error } = await supabase.storage
    .from('product-images')
    .upload(fileName, file, {
      cacheControl: '31536000',
      upsert: false
    })

  if (error) {
    console.error('Upload error:', error)
    return null
  }

  // Get public URL
  const { data: { publicUrl } } = supabase.storage
    .from('product-images')
    .getPublicUrl(fileName)

  return publicUrl
}
```

### Step 5: Insert Image URLs into Database

After uploading images, add them to the `product_images` table:

```sql
-- Insert a product image
INSERT INTO product_images (product_id, image_url, thumbnail_url, medium_url, is_primary, display_order)
VALUES (
  'your-product-uuid-here',
  'https://vlwjarfujykmkcvfvlep.supabase.co/storage/v1/object/public/product-images/chairs/product-1-full.jpg',
  'https://vlwjarfujykmkcvfvlep.supabase.co/storage/v1/object/public/product-images/chairs/product-1-thumb.jpg',
  'https://vlwjarfujykmkcvfvlep.supabase.co/storage/v1/object/public/product-images/chairs/product-1-medium.jpg',
  true, -- is_primary
  1     -- display_order
);
```

## Current Image URL Format

Your Supabase project URL: `https://vlwjarfujykmkcvfvlep.supabase.co`

Image URLs should follow this pattern:
```
https://vlwjarfujykmkcvfvlep.supabase.co/storage/v1/object/public/product-images/{category}/{filename}
```

Examples:
- **Full**: `https://vlwjarfujykmkcvfvlep.supabase.co/storage/v1/object/public/product-images/chairs/haworth-zody-full.jpg`
- **Thumb**: `https://vlwjarfujykmkcvfvlep.supabase.co/storage/v1/object/public/product-images/chairs/haworth-zody-thumb.jpg`
- **Medium**: `https://vlwjarfujykmkcvfvlep.supabase.co/storage/v1/object/public/product-images/chairs/haworth-zody-medium.jpg`

## Verify Setup

### 1. Check if bucket exists:

```sql
SELECT * FROM storage.buckets WHERE id = 'product-images';
```

### 2. Check bucket policies:

```sql
SELECT * FROM storage.policies WHERE bucket_id = 'product-images';
```

### 3. List uploaded images:

```sql
SELECT name, bucket_id, created_at
FROM storage.objects
WHERE bucket_id = 'product-images'
ORDER BY created_at DESC;
```

### 4. Check products with images:

```sql
SELECT
  p.name,
  p.slug,
  COUNT(pi.id) as image_count,
  json_agg(json_build_object(
    'url', pi.image_url,
    'is_primary', pi.is_primary
  )) as images
FROM products p
LEFT JOIN product_images pi ON p.id = pi.product_id
WHERE p.is_featured = true
GROUP BY p.id, p.name, p.slug;
```

## Quick Test with Sample Images

If you want to test the functionality immediately, you can use placeholder images:

```sql
-- Add placeholder images for testing
INSERT INTO product_images (product_id, image_url, is_primary, display_order)
SELECT
  id,
  'https://picsum.photos/seed/' || id || '/800/600' as image_url,
  true,
  1
FROM products
WHERE is_featured = true
  AND NOT EXISTS (
    SELECT 1 FROM product_images WHERE product_id = products.id
  );
```

## Next.js Configuration

The Next.js config is already set up to handle Supabase Storage images:

```javascript
// next.config.js (already configured)
images: {
  remotePatterns: [
    {
      protocol: 'https',
      hostname: '**.supabase.co',
      pathname: '/storage/v1/object/public/**',
    },
  ],
}
```

This allows Next.js Image component to optimize images from your Supabase Storage.

## Troubleshooting

### Images not displaying?

1. **Check bucket exists**: Go to Storage tab in Supabase Dashboard
2. **Check bucket is public**: Edit bucket settings → Public access should be ON
3. **Check policies exist**: Run the policies SQL above
4. **Check image URLs**: Copy a URL from `product_images` table and paste in browser
5. **Check browser console**: Look for CORS or 404 errors

### CORS errors?

Make sure the bucket is set to **public** in Supabase Dashboard.

### 404 Not Found?

- Verify the image URL is correct
- Check the file actually exists in the bucket
- Ensure the path matches exactly (case-sensitive)

## Image Optimization Tips

1. **Use WebP format** for better compression
2. **Generate thumbnails** (200x150) for list views
3. **Generate medium sizes** (400x300) for modals/quick view
4. **Use full size** (800x600+) for product detail pages
5. **Add alt text** from product name for SEO and accessibility
