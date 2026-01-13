# Image Display Troubleshooting Checklist

## ✅ What We've Confirmed

1. **Images exist in Supabase Storage** ✅
   - Bucket: `product-images` exists
   - Images are uploaded and accessible

2. **Database has image URLs** ✅
   - Server logs show images being fetched correctly
   - Example: Product "Zody" has 5 images
   - URLs are in correct format: `https://vlwjarfujykmkcvfvlep.supabase.co/storage/v1/object/public/product-images/...`

3. **Images are publicly accessible** ✅
   - Tested with curl - returns HTTP 200
   - Images can be accessed directly via URL

4. **Supabase query is working** ✅
   - Product data includes `product_images` array
   - Image URLs, thumbnails, and medium sizes all present

## 🔍 What to Check in Browser

### Step 1: Open Browser DevTools (F12)

Visit: `http://localhost:3000/furniture`

### Step 2: Check Console Tab

You should see logs like:
```
=== PRODUCT DATA DEBUG ===
Featured products count: X
ProductCard for Zody: { hasImage: true, imageUrl: "https://...", ... }
```

**If you see `hasImage: false`**, there's a data issue.
**If you see `hasImage: true`**, the issue is with image rendering.

### Step 3: Check Network Tab

1. Filter by "Img" or "Media"
2. Look for requests to `supabase.co`
3. Check if image requests:
   - Are being made ✅
   - Return 200 status ✅
   - Or return errors (4xx, 5xx) ❌

### Step 4: Check for Image Load Errors

Look in console for:
```
Image load error: https://...
```

This will tell us if Next.js Image component is failing.

### Step 5: Check Elements/Inspector

1. Right-click on where image should be
2. Inspect element
3. Look for `<img>` tag
4. Check if `src` attribute is present
5. Copy image URL and test in new tab

## 🔧 Common Issues & Solutions

### Issue 1: CORS Errors
**Symptom**: Console shows CORS policy errors
**Solution**: Bucket must be set to Public in Supabase Dashboard

### Issue 2: 404 Not Found
**Symptom**: Images return 404 in Network tab
**Solution**: Verify image URLs in database match actual files in bucket

### Issue 3: Next.js Image Optimization Failing
**Symptom**: Images time out or fail to load
**Solution**: We've updated next.config.js with specific hostname pattern

### Issue 4: CSP (Content Security Policy) Blocking
**Symptom**: Console shows CSP violation errors
**Solution**: May need to add img-src directive for Supabase

### Issue 5: Images Not Rendering (No Errors)
**Symptom**: No errors but images don't show
**Solution**: Check if ProductCard is receiving correct data

## 🛠️ Quick Tests

### Test 1: Direct Image Access
Copy this URL and paste in browser:
```
https://vlwjarfujykmkcvfvlep.supabase.co/storage/v1/object/public/product-images/f53088bc-476e-40d2-bd2b-e1e11a04066f/zody-1-thumbnail.jpg
```

Should show the image directly. ✅ This works!

### Test 2: Check if Images Array is Populated
Browser console should show:
```javascript
ProductCard for Zody: {
  hasImage: true,
  imageUrl: "https://vlwjarfujykmkcvfvlep.supabase.co/storage/...",
  imagesCount: 5
}
```

### Test 3: Bypass Next.js Image Optimization
Try adding `unoptimized` prop to see if issue is with optimization:
```tsx
<Image src={imageUrl} unoptimized ... />
```

## 📊 Debug Logs Location

Server logs (terminal where `npm run dev` runs):
- Shows data being fetched from Supabase
- Shows SQL queries and results

Browser console (F12 → Console):
- Shows client-side rendering issues
- Shows image load errors
- Shows ProductCard debug logs

Network tab (F12 → Network):
- Shows actual HTTP requests
- Shows response status codes
- Shows image load times

## 🎯 Next Steps

1. **Open browser to**: http://localhost:3000/furniture
2. **Open DevTools**: Press F12
3. **Check Console**: Look for debug logs
4. **Check Network**: Filter by "Img" to see image requests
5. **Report back**: What do you see in console and network tabs?

## 📝 What I Changed

1. **Updated next.config.js**:
   - Added specific hostname for your Supabase project
   - Added wildcard pattern as fallback
   - Added SVG support
   - Added content disposition type

2. **Enhanced ProductCard**:
   - Added detailed debug logging
   - Added error handler for image load failures
   - Added priority loading for first 2 images

3. **Server-side logging**:
   - Logs all product data
   - Logs image arrays for each product
   - Logs image counts and URLs

## ✅ Ready to Test!

The dev server has been restarted with the new configuration.
Now check your browser at http://localhost:3000/furniture and let me know what you see!
