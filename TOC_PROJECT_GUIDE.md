# CLAUDE.md

The Office Company - Public Catalog & Storefront. Next.js 14 App Router + TypeScript + Supabase + Tailwind.

---

## 🎯 CRITICAL MISSION BRIEF

**PROJECT TYPE**: React → Next.js Conversion (NOT a new build!)

**YOUR JOB**: Convert existing React furniture catalog to Next.js while:
1. 🎨 **KEEPING THE ORIGINAL DESIGN** - Don't change colors, fonts, layouts, or UI
2. 🚀 **MAXIMIZING PERFORMANCE** - Target: Lighthouse 90+, < 2.5s LCP, < 100kb bundle
3. 🔍 **PERFECTING SEO** - Metadata, structured data, static generation, sitemap

**DON'T DO THIS**:
- ❌ Change or "improve" the design
- ❌ Copy styles from toc-crm admin project
- ❌ Use Client Components by default
- ❌ Skip image optimization
- ❌ Forget metadata on any page

**DO THIS**:
- ✅ Analyze existing React code first
- ✅ Preserve all styling exactly
- ✅ Use Server Components + SSG
- ✅ Optimize every image with next/image
- ✅ Add metadata to every page
- ✅ Test with Lighthouse continuously

---

## Project Overview

This is the **public-facing furniture catalog** for The Office Company. It pulls product data from the admin CRM (`toc-crm`) via a **shared Supabase database**.

**CRITICAL: The design is already complete in React.** Your job is to convert this to Next.js 14 App Router while preserving the existing design, colors, fonts, and UI exactly as they are. DO NOT change the design or copy styling from toc-crm - keep the original toc design.

### TOP PRIORITIES
🚀 **1. PERFORMANCE** - This must be blazing fast (optimize everything!)
🔍 **2. SEO** - Perfect SEO implementation (meta tags, structured data, static generation)
🎨 **3. Keep Original Design** - Preserve all existing styling, colors, fonts, and UI components

### Related Projects
- **toc-crm (Admin)**: `/Users/brunocukic/toc-crm` - Backend admin dashboard for managing products, categories, brands, rooms, quotes
- **toc (This project)**: Public storefront with SEO-optimized product pages, catalog browsing, quote requests

### Architecture
```
┌─────────────────────┐         ┌─────────────────────┐
│   toc-crm (Admin)   │         │   toc (Public Site) │
│   - Full CRUD       │         │   - Read-only       │
│   - Authenticated   │         │   - Public access   │
└──────────┬──────────┘         └──────────┬──────────┘
           │                               │
           │      Shared Supabase DB       │
           └───────────────┬───────────────┘
                           │
                    Products, Categories,
                    Brands, Rooms, etc.
```

## Commands
```bash
npm run dev        # localhost:3000
npm run build
npm run lint
```

## Tech Stack
- **Framework**: Next.js 14 App Router (for SEO & SSR/SSG)
- **Language**: TypeScript (strict mode)
- **Database**: Supabase (shared with toc-crm)
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Images**: Next.js Image component with Supabase Storage

## Initial Setup Steps

### 1. Convert to Next.js (if not done yet)
```bash
npx create-next-app@latest . --typescript --tailwind --app --src-dir=false
```

### 2. Install Dependencies
```bash
npm install @supabase/supabase-js @supabase/ssr
npm install lucide-react
npm install sharp  # For image optimization
```

### 3. Copy Supabase Config from toc-crm
Create `.env.local` with the **same credentials** as toc-crm:
```bash
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
```

### 4. Copy Supabase Client Utilities
Copy these files from toc-crm:
- `/lib/supabase/client.ts` (browser client)
- `/lib/supabase/server.ts` (server client)
- `/types/database.types.ts` (TypeScript types)

### 5. Copy Shared Utilities
Copy utilities you'll need:
- `/lib/utils.ts` (if it exists)
- Styling utilities, helpers, etc.

## Structure
```
/app
  /(public)/
    /page.tsx              # Homepage with featured products
    /products/
      /page.tsx            # Product catalog/grid
      /[slug]/page.tsx     # Individual product page
    /categories/
      /[slug]/page.tsx     # Category listing page
    /brands/
      /[slug]/page.tsx     # Brand listing page
    /rooms/
      /[slug]/page.tsx     # Room inspiration page
    /quote/page.tsx        # Quote request form
  /api/
    /quote/route.ts        # Quote submission endpoint
/components
  /products/               # ProductCard, ProductGrid, ProductDetails
  /layout/                 # Header, Footer, Navigation
  /ui/                     # Reusable UI components
/lib
  /supabase/              # Supabase clients (copied from toc-crm)
/types
  /database.types.ts       # Database types (copied from toc-crm)
```

## Database Access

### Key Tables (Read-Only)
- `products` - Filter soft-deleted: `.is('deleted_at', null)`
- `product_images` - Multiple images per product
- `product_features` - Bullet points
- `product_colors` - Available colors
- `product_specifications` - Detailed specs
- `categories` - Product categories
- `brands` - Product brands
- `rooms` - Room inspiration/collections
- `product_rooms` - Many-to-many products ↔ rooms

### Quote Requests (Write)
- `quote_requests` - Submit customer quote requests

### Storage Buckets (Public Read)
- `product-images` - Product photos (thumbnail, medium, original)
- `category-images` - Category hero images
- `brand-logos` - Brand logos
- `room-images` - Room inspiration photos

## Key Patterns

### Server Component (Data Fetching - SSR/SSG)
```typescript
import { createServerClient } from '@/lib/supabase/server'

export default async function ProductsPage() {
  const supabase = createServerClient()

  const { data: products } = await supabase
    .from('products')
    .select(`
      *,
      category:categories(*),
      brand:brands(*),
      images:product_images(*)
    `)
    .is('deleted_at', null)
    .order('created_at', { ascending: false })

  return <ProductGrid products={products} />
}
```

### Static Params Generation (SSG for SEO)
```typescript
export async function generateStaticParams() {
  const supabase = createServerClient()
  const { data: products } = await supabase
    .from('products')
    .select('slug')
    .is('deleted_at', null)

  return products?.map((p) => ({ slug: p.slug })) || []
}
```

### Client Component (Interactive Forms)
```typescript
'use client'
import { createClient } from '@/lib/supabase/client'

export function QuoteRequestForm() {
  const supabase = createClient()

  const handleSubmit = async (formData: FormData) => {
    await supabase.from('quote_requests').insert({
      customer_name: formData.get('name'),
      customer_email: formData.get('email'),
      // ...
    })
  }

  return <form action={handleSubmit}>...</form>
}
```

### Image URLs from Supabase Storage
```typescript
const imageUrl = supabase.storage
  .from('product-images')
  .getPublicUrl(image.url).data.publicUrl

<Image src={imageUrl} alt={product.name} width={800} height={800} />
```

## Styling (KEEP ORIGINAL TOC DESIGN)

**CRITICAL: DO NOT copy styling from toc-crm!** The toc project already has its own complete design system. Your job is to preserve it during the Next.js conversion.

### What to Do
- ✅ **Keep all existing CSS/Tailwind classes** from the React version
- ✅ **Preserve all colors, fonts, spacing, layouts** exactly as they are
- ✅ **Maintain all animations and transitions**
- ✅ **Keep the same component structure and styling patterns**
- ❌ **DO NOT** import or copy styles from toc-crm
- ❌ **DO NOT** change colors, fonts, or design elements

### Font Optimization (Performance)
```typescript
// app/layout.tsx - Load fonts efficiently
import { Inter } from 'next/font/google'
import localFont from 'next/font/local'

const inter = Inter({
  subsets: ['latin'],
  display: 'swap', // Prevent invisible text during load
  variable: '--font-inter'
})

const customFont = localFont({
  src: './fonts/YourFont.woff2',
  display: 'swap',
  variable: '--font-custom'
})
```

## Critical Rules

### Data Fetching
- ✅ **Always filter soft-deleted products**: `.is('deleted_at', null)`
- ✅ **Use Server Components** for data fetching (better SEO)
- ✅ **Generate static params** for product/category/brand pages (SSG)
- ✅ **Prefetch related data** using Supabase joins to minimize queries

## PERFORMANCE OPTIMIZATION (TOP PRIORITY)

This site MUST be blazing fast. Follow these rules religiously:

### 1. Static Generation (SSG) - Build Time
```typescript
// Generate ALL product pages at build time
export async function generateStaticParams() {
  const supabase = createServerClient()
  const { data } = await supabase
    .from('products')
    .select('slug')
    .is('deleted_at', null)

  return data?.map((p) => ({ slug: p.slug })) || []
}

// Use revalidate for ISR if products change frequently
export const revalidate = 3600 // Revalidate every hour
```

### 2. Image Optimization
```typescript
// ALWAYS use Next.js Image with proper sizing
import Image from 'next/image'

<Image
  src={imageUrl}
  alt={product.name}
  width={800}
  height={800}
  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
  priority={false} // Only true for above-fold images
  loading="lazy"   // Lazy load by default
  placeholder="blur" // Use blur placeholder if possible
/>
```

### 3. Database Query Optimization
```typescript
// ✅ GOOD - Single query with joins
const { data } = await supabase
  .from('products')
  .select('*, brand:brands(name, slug), images:product_images(url)')
  .is('deleted_at', null)

// ❌ BAD - Multiple queries (N+1 problem)
const { data: products } = await supabase.from('products').select('*')
for (const product of products) {
  const { data: brand } = await supabase.from('brands').eq('id', product.brand_id)
}
```

### 4. Caching Strategy
```typescript
// Cache Supabase queries aggressively
const { data } = await supabase
  .from('products')
  .select('*')
  .is('deleted_at', null)

// Add Next.js cache config
export const dynamic = 'force-static' // Force static generation
export const revalidate = 3600        // ISR: revalidate every hour
```

### 5. Code Splitting & Lazy Loading
```typescript
// Lazy load heavy components
import dynamic from 'next/dynamic'

const ProductViewer3D = dynamic(() => import('@/components/ProductViewer3D'), {
  loading: () => <p>Loading 3D viewer...</p>,
  ssr: false // Don't render on server
})
```

### 6. Bundle Size Optimization
- ✅ Use `next/dynamic` for large components
- ✅ Import only what you need from libraries: `import { Search } from 'lucide-react'`
- ✅ Avoid importing entire libraries: ❌ `import * as Icons from 'lucide-react'`
- ✅ Use Next.js built-in optimizations (automatic code splitting)

### 7. Prefetching & Preloading
```typescript
// Prefetch critical data
<Link href="/products/desk-chair" prefetch={true}>
  View Product
</Link>
```

## SEO OPTIMIZATION (TOP PRIORITY)

This site MUST rank well in search engines. Follow these rules religiously:

### 1. Metadata (Every Page)
```typescript
// app/products/[slug]/page.tsx
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const supabase = createServerClient()
  const { data: product } = await supabase
    .from('products')
    .select('name, description, images:product_images(url)')
    .eq('slug', params.slug)
    .is('deleted_at', null)
    .single()

  if (!product) return {}

  return {
    title: `${product.name} | The Office Company`,
    description: product.description?.slice(0, 160),
    openGraph: {
      title: product.name,
      description: product.description,
      images: [product.images?.[0]?.url],
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: product.name,
      description: product.description,
      images: [product.images?.[0]?.url],
    },
    robots: {
      index: true,
      follow: true,
    },
  }
}
```

### 2. Structured Data (JSON-LD)
```typescript
// Add to product pages for rich snippets
export default async function ProductPage({ params }: Props) {
  const product = await getProduct(params.slug)

  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    description: product.description,
    image: product.images?.map((img: any) => img.url),
    brand: {
      '@type': 'Brand',
      name: product.brand?.name,
    },
    offers: {
      '@type': 'Offer',
      availability: 'https://schema.org/InStock',
      priceCurrency: 'USD',
    },
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <ProductDetails product={product} />
    </>
  )
}
```

### 3. Semantic HTML
```typescript
// Use proper HTML5 elements
<article itemScope itemType="https://schema.org/Product">
  <header>
    <h1 itemProp="name">{product.name}</h1>
  </header>
  <section itemProp="description">
    {product.description}
  </section>
  <img itemProp="image" src={product.image} alt={product.name} />
</article>
```

### 4. Sitemap Generation
```typescript
// app/sitemap.ts
export default async function sitemap() {
  const supabase = createServerClient()

  const { data: products } = await supabase
    .from('products')
    .select('slug, updated_at')
    .is('deleted_at', null)

  const productUrls = products?.map((product) => ({
    url: `https://yoursite.com/products/${product.slug}`,
    lastModified: product.updated_at,
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  })) || []

  return [
    {
      url: 'https://yoursite.com',
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 1,
    },
    ...productUrls,
  ]
}
```

### 5. Robots.txt
```typescript
// app/robots.ts
export default function robots() {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/api/', '/admin/'],
    },
    sitemap: 'https://yoursite.com/sitemap.xml',
  }
}
```

### 6. Performance Metrics (Core Web Vitals)
- ✅ **LCP (Largest Contentful Paint)**: < 2.5s - Optimize hero images
- ✅ **FID (First Input Delay)**: < 100ms - Minimize JavaScript
- ✅ **CLS (Cumulative Layout Shift)**: < 0.1 - Set image dimensions
- ✅ Use `priority` attribute on above-fold images
- ✅ Preload critical fonts and images

### Security
- ✅ Never expose admin functionality
- ✅ Validate all form inputs before submitting to Supabase
- ✅ Use Row Level Security (RLS) policies in Supabase for public read access
- ✅ Sanitize user inputs in quote forms

## Implementation Phases (React → Next.js Conversion)

**Remember: This is a CONVERSION project, not a new build. The design and components already exist in React. Your job is to migrate them to Next.js while adding performance and SEO optimizations.**

### Phase 1: Foundation & Setup (START HERE)
- [ ] **Analyze existing React structure** (components, pages, routing, styles)
- [ ] Create Next.js 14 project structure (keep original file organization where possible)
- [ ] Copy Supabase config and clients from toc-crm to new Next.js structure
- [ ] **Migrate existing styles** (CSS modules, Tailwind, or whatever is currently used)
- [ ] **Set up Next.js font optimization** with existing fonts
- [ ] Test database connection and verify data fetching works
- [ ] **DO NOT change colors, design, or layouts - just migrate them**

### Phase 2: Core Pages Migration (SSG Focus)
- [ ] Convert homepage to Next.js App Router (add metadata, SSG)
- [ ] Migrate product listing page (add generateStaticParams, metadata)
- [ ] Convert individual product pages to dynamic routes with SSG
- [ ] **Add structured data (JSON-LD) to product pages**
- [ ] **Optimize all images** with Next.js Image component
- [ ] **Implement aggressive caching** for static pages
- [ ] Test performance with Lighthouse (target 90+ score)

### Phase 3: Navigation & Filtering (Client Components)
- [ ] Migrate navigation components (preserve interactions)
- [ ] Convert filter/search components to Client Components
- [ ] Implement category/brand filtering with URL params (good for SEO)
- [ ] **Ensure filters work without JavaScript** (progressive enhancement)
- [ ] Add loading states for better UX

### Phase 4: Supporting Pages (SSG)
- [ ] Category pages with generateStaticParams (add metadata)
- [ ] Brand pages with generateStaticParams (add metadata)
- [ ] Room inspiration pages with generateStaticParams (add metadata)
- [ ] About/Contact pages (static)
- [ ] **Add breadcrumbs** for better SEO
- [ ] **Generate sitemap.xml** automatically
- [ ] **Generate robots.txt**

### Phase 5: Quote System
- [ ] Migrate quote request form (Client Component)
- [ ] Add Server Actions for form submission (no API route needed)
- [ ] Form validation and error handling
- [ ] Success confirmation
- [ ] Optional: Email notifications via Supabase Edge Functions

### Phase 6: SEO Optimization (Critical!)
- [ ] **Verify metadata on ALL pages** (title, description, OG tags)
- [ ] **Add JSON-LD structured data** (products, organization, breadcrumbs)
- [ ] **Test with Google Rich Results Test**
- [ ] **Implement proper heading hierarchy** (h1, h2, h3)
- [ ] **Add alt text to all images**
- [ ] **Ensure mobile-first responsive design**
- [ ] **Test accessibility** (ARIA labels, keyboard navigation)

### Phase 7: Performance Optimization (Critical!)
- [ ] **Run Lighthouse audit** - target 90+ on all metrics
- [ ] **Optimize bundle size** - check with `npm run build` output
- [ ] **Implement lazy loading** for heavy components
- [ ] **Add loading skeletons** for better perceived performance
- [ ] **Preload critical resources** (fonts, hero images)
- [ ] **Test on slow 3G** to verify performance
- [ ] **Measure Core Web Vitals** (LCP, FID, CLS)
- [ ] **Set up ISR** if products change frequently (revalidate: 3600)

### Phase 8: Final Polish & Testing
- [ ] Error boundaries for graceful error handling
- [ ] Custom 404/500 pages
- [ ] Loading states for all async operations
- [ ] Cross-browser testing (Chrome, Safari, Firefox)
- [ ] Mobile device testing (iOS, Android)
- [ ] **Final Lighthouse audit** - must be 90+ on all metrics
- [ ] **Test with PageSpeed Insights**
- [ ] **Verify in Google Search Console** (submit sitemap)

## Reference toc-crm Project

When you need to reference the admin project:
- **Path**: `/Users/brunocukic/toc-crm`
- **Database schema**: Check `/Users/brunocukic/toc-crm/lib/supabase/migrations/`
- **Types**: Copy from `/Users/brunocukic/toc-crm/types/database.types.ts`
- **UI patterns**: Reference components in `/Users/brunocukic/toc-crm/components/`

## Example Pages to Build

### Homepage
```typescript
// app/page.tsx
import { createServerClient } from '@/lib/supabase/server'
import FeaturedProducts from '@/components/FeaturedProducts'
import HeroSection from '@/components/HeroSection'

export const metadata = {
  title: 'The Office Company - Premium Office Furniture',
  description: 'Discover our catalog of premium office furniture',
}

export default async function HomePage() {
  const supabase = createServerClient()

  const { data: featured } = await supabase
    .from('products')
    .select('*, brand:brands(*), images:product_images(*)')
    .is('deleted_at', null)
    .limit(8)

  return (
    <>
      <HeroSection />
      <FeaturedProducts products={featured} />
    </>
  )
}
```

### Product Detail Page
```typescript
// app/products/[slug]/page.tsx
import { createServerClient } from '@/lib/supabase/server'
import { notFound } from 'next/navigation'
import ProductDetails from '@/components/products/ProductDetails'

export async function generateStaticParams() {
  const supabase = createServerClient()
  const { data } = await supabase
    .from('products')
    .select('slug')
    .is('deleted_at', null)

  return data?.map((p) => ({ slug: p.slug })) || []
}

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const supabase = createServerClient()
  const { data: product } = await supabase
    .from('products')
    .select('name, description')
    .eq('slug', params.slug)
    .is('deleted_at', null)
    .single()

  if (!product) return {}

  return {
    title: `${product.name} - The Office Company`,
    description: product.description,
  }
}

export default async function ProductPage({ params }: { params: { slug: string } }) {
  const supabase = createServerClient()

  const { data: product } = await supabase
    .from('products')
    .select(`
      *,
      category:categories(*),
      brand:brands(*),
      images:product_images(*),
      colors:product_colors(*),
      features:product_features(*),
      specifications:product_specifications(*)
    `)
    .eq('slug', params.slug)
    .is('deleted_at', null)
    .single()

  if (!product) notFound()

  return <ProductDetails product={product} />
}
```

## Your First Actions When Starting

When you start working on this project, do this:

### 1. Analyze the Existing React Project
```bash
# Look at the current structure
ls -la
cat package.json

# Understand routing
ls src/pages/ # or wherever routes are
ls src/components/

# Check what styling system is used
cat tailwind.config.js # or check for CSS modules, styled-components, etc.
```

### 2. Ask Critical Questions
- "What pages/routes currently exist in the React app?"
- "What styling system is used? (Tailwind, CSS modules, styled-components?)"
- "What fonts and colors are used in the design?"
- "Are there any specific performance targets? (Lighthouse score, load time?)"
- "What domain will this be hosted on? (needed for sitemap/metadata)"
- "Should products be fully static (SSG) or use ISR with revalidation?"

### 3. Start Phase 1
Follow the implementation phases above, starting with:
- Analyze existing structure
- Set up Next.js 14 with App Router
- Migrate styles and fonts WITHOUT changing the design
- Copy Supabase utilities from toc-crm

### 4. Focus on Three Priorities (IN ORDER)
1. **Keep the design exactly the same** - Don't change anything visual
2. **Make it blazing fast** - SSG, image optimization, code splitting
3. **Perfect SEO** - Metadata, structured data, semantic HTML, sitemap

## Performance Targets (MUST ACHIEVE)

Test with: `npm run build && npm start`, then run Lighthouse audit

### Lighthouse Scores (Minimum)
- ✅ **Performance**: 90+ (preferably 95+)
- ✅ **Accessibility**: 95+
- ✅ **Best Practices**: 95+
- ✅ **SEO**: 100

### Core Web Vitals (Google PageSpeed Insights)
- ✅ **LCP** (Largest Contentful Paint): < 2.5s
- ✅ **FID** (First Input Delay): < 100ms
- ✅ **CLS** (Cumulative Layout Shift): < 0.1

### Build Output Targets
- ✅ First Load JS: < 100kb (ideal < 80kb)
- ✅ All product pages: Static (○ symbol in build output)
- ✅ No errors or warnings during build

## Common Pitfalls to Avoid

### ❌ DON'T DO THESE:
1. **Don't change the design** - Keep colors, fonts, layouts exactly as they are
2. **Don't copy styles from toc-crm** - The toc project has its own design
3. **Don't use Client Components everywhere** - Use Server Components by default
4. **Don't forget generateStaticParams** - Products must be static for SEO
5. **Don't skip image optimization** - Always use next/image with proper sizing
6. **Don't forget metadata** - Every page needs title, description, OG tags
7. **Don't make N+1 database queries** - Use Supabase joins
8. **Don't import entire libraries** - Import only what you need
9. **Don't skip the Lighthouse audit** - Test performance continuously
10. **Don't use regular <img> tags** - Always use Next.js <Image>

### ✅ DO THESE:
1. **Preserve the original design** completely
2. **Use Server Components** for all data fetching
3. **Generate static pages** with generateStaticParams
4. **Add metadata** to every single page
5. **Optimize images** with next/image (width, height, sizes)
6. **Use Supabase joins** to minimize queries
7. **Test with Lighthouse** after every major change
8. **Add structured data** (JSON-LD) for products
9. **Generate sitemap.xml** and robots.txt
10. **Monitor bundle size** with build output

---

**Remember**:
- This is a **CONVERSION** project (React → Next.js)
- **Keep the original design** - Don't change it!
- **Focus on PERFORMANCE** - Make it blazing fast
- **Focus on SEO** - Perfect implementation
- This is a **READ-ONLY** consumer of the database (all admin in toc-crm)
