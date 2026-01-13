# TOC React → Next.js 14 Conversion Checklist

## Prerequisites

- [ ] Read TOC_PROJECT_GUIDE.md completely
- [ ] Understand: This is a CONVERSION project (not a new build)
- [ ] Core principle: KEEP THE ORIGINAL DESIGN - Don't change colors, fonts, or layouts
- [ ] Access to toc-crm project at `/Users/brunocukic/toc-crm`
- [ ] Supabase credentials from toc-crm

---

## Phase 0: Initialization & Setup

### Run Initialization Script
- [ ] Make init.sh executable: `chmod +x init.sh`
- [ ] Run initialization: `./init.sh`
- [ ] Review all prompts and follow instructions

### Manual Setup (if not using script)

#### 1. Backup Existing Project
- [ ] Create backup: `cp -r . ../toc-react-backup-$(date +%Y%m%d)`
- [ ] Verify backup exists

#### 2. Install Dependencies
```bash
npm install next@latest react@latest react-dom@latest
npm install @supabase/supabase-js @supabase/ssr
npm install lucide-react
npm install sharp
npm install -D @types/node
```
- [ ] All dependencies installed successfully
- [ ] No dependency conflicts

#### 3. Environment Variables
- [ ] Copy `.env.local.example` to `.env.local`
- [ ] Copy Supabase credentials from toc-crm/.env.local
- [ ] Verify `NEXT_PUBLIC_SUPABASE_URL` is set
- [ ] Verify `NEXT_PUBLIC_SUPABASE_ANON_KEY` is set
- [ ] Test connection to Supabase

#### 4. Directory Structure
Create Next.js App Router structure:
```
/app
  /products/[slug]/
  /categories/[slug]/
  /brands/[slug]/
  /rooms/[slug]/
  /quote/
  /api/quote/
/components
  /products/
  /layout/
  /ui/
/lib
  /supabase/
/types
/public
```
- [ ] Created `/app` directory
- [ ] Created `/app/products/[slug]` directory
- [ ] Created `/app/categories/[slug]` directory
- [ ] Created `/app/brands/[slug]` directory
- [ ] Created `/app/rooms/[slug]` directory
- [ ] Created `/app/quote` directory
- [ ] Created `/app/api/quote` directory
- [ ] Created `/components/products` directory
- [ ] Created `/components/layout` directory
- [ ] Created `/components/ui` directory
- [ ] Created `/lib/supabase` directory
- [ ] Created `/types` directory

#### 5. Copy Supabase Files from toc-crm
- [ ] Copy `/lib/supabase/client.ts` from toc-crm
- [ ] Copy `/lib/supabase/server.ts` from toc-crm
- [ ] Copy `/types/database.types.ts` from toc-crm
- [ ] Verify imports work correctly

#### 6. Update package.json
Replace scripts section:
```json
"scripts": {
  "dev": "next dev",
  "build": "next build",
  "start": "next start",
  "lint": "next lint"
}
```
- [ ] Updated dev script
- [ ] Updated build script
- [ ] Updated start script
- [ ] Updated lint script
- [ ] Kept old scripts as backup (commented)

#### 7. Configuration Files
- [ ] Created `next.config.js` (or verify it exists)
- [ ] Configured Supabase image domains
- [ ] Enabled image optimization
- [ ] Configured security headers
- [ ] Review `tailwind.config.js` compatibility

---

## Phase 1: Foundation & Analysis

### 1. Analyze Existing React Structure
- [ ] Document all pages in `src/pages/`
- [ ] List all components in `src/components/`
- [ ] Note routing structure (React Router)
- [ ] Identify shared layouts
- [ ] Document styling approach (Tailwind, CSS modules, etc.)

### 2. Design Analysis (CRITICAL)
- [ ] Document all colors used in the design
- [ ] Document all fonts (family, weights, sizes)
- [ ] Screenshot existing pages for reference
- [ ] Note all animations and transitions
- [ ] Identify spacing/padding patterns

### 3. Create Root Layout
Create `app/layout.tsx`:
- [ ] Created file
- [ ] Imported fonts (preserve existing fonts)
- [ ] Added metadata (title, description)
- [ ] Included Tailwind CSS
- [ ] Migrated global styles from `src/index.css`
- [ ] Added analytics (if any)
- [ ] Tested: `npm run dev` works

### 4. Create Homepage
Create `app/page.tsx`:
- [ ] Created file
- [ ] Set as async Server Component
- [ ] Added metadata for SEO
- [ ] Migrated hero section
- [ ] Preserved exact styling
- [ ] Tested database connection
- [ ] Fetched featured products (if any)
- [ ] Verified design matches React version

---

## Phase 2: Core Pages Migration (SSG Focus)

### Product Listing Page
Create `app/products/page.tsx`:
- [ ] Created as Server Component
- [ ] Added generateMetadata function
- [ ] Fetched products with Supabase joins
- [ ] Filtered soft-deleted products (`.is('deleted_at', null)`)
- [ ] Migrated ProductGrid component
- [ ] Preserved exact styling
- [ ] Added structured data (JSON-LD)
- [ ] Tested with real data

### Individual Product Pages
Create `app/products/[slug]/page.tsx`:
- [ ] Created dynamic route
- [ ] Added generateStaticParams (for SSG)
- [ ] Added generateMetadata with product data
- [ ] Fetched product with all relations:
  - [ ] Categories
  - [ ] Brands
  - [ ] Images
  - [ ] Features
  - [ ] Colors
  - [ ] Specifications
- [ ] Handled 404 with notFound()
- [ ] Added structured data (Product schema)
- [ ] Migrated ProductDetails component
- [ ] Optimized all images with next/image
- [ ] Preserved exact styling
- [ ] Tested: `npm run build` generates static pages

### Image Optimization
For ALL product images:
- [ ] Replaced `<img>` with `<Image>` from 'next/image'
- [ ] Set proper width/height
- [ ] Added sizes attribute for responsive images
- [ ] Set priority={true} for above-fold images
- [ ] Set loading="lazy" for below-fold images
- [ ] Tested: Images load correctly
- [ ] Verified: Lighthouse score improved

---

## Phase 3: Navigation & Filtering

### Header/Navigation
Create `components/layout/Header.tsx`:
- [ ] Migrated from React version
- [ ] Preserved exact styling
- [ ] Converted to Server Component (if possible)
- [ ] Or marked 'use client' if interactive
- [ ] Replaced `<Link>` from react-router with next/link
- [ ] Added prefetch={true} for important links
- [ ] Tested navigation works

### Footer
Create `components/layout/Footer.tsx`:
- [ ] Migrated from React version
- [ ] Preserved exact styling
- [ ] Updated links to Next.js format
- [ ] Tested all footer links

### Search/Filter Components
Create `components/products/ProductFilter.tsx`:
- [ ] Marked 'use client' (interactive)
- [ ] Migrated filtering logic
- [ ] Used URL search params for SEO
- [ ] Preserved exact styling
- [ ] Tested: Filters work correctly

---

## Phase 4: Supporting Pages (SSG)

### Category Pages
Create `app/categories/[slug]/page.tsx`:
- [ ] Created dynamic route
- [ ] Added generateStaticParams
- [ ] Added generateMetadata
- [ ] Fetched category with products
- [ ] Added breadcrumbs for SEO
- [ ] Added structured data
- [ ] Preserved styling
- [ ] Tested with real data

### Brand Pages
Create `app/brands/[slug]/page.tsx`:
- [ ] Created dynamic route
- [ ] Added generateStaticParams
- [ ] Added generateMetadata
- [ ] Fetched brand with products
- [ ] Added breadcrumbs
- [ ] Preserved styling
- [ ] Tested with real data

### Room Inspiration Pages
Create `app/rooms/[slug]/page.tsx`:
- [ ] Created dynamic route
- [ ] Added generateStaticParams
- [ ] Added generateMetadata
- [ ] Fetched room with products
- [ ] Added structured data
- [ ] Preserved styling
- [ ] Tested with real data

### Static Pages (About, Contact, etc.)
- [ ] Created `app/about/page.tsx` (if exists)
- [ ] Created `app/contact/page.tsx` (if exists)
- [ ] Migrated content
- [ ] Added metadata
- [ ] Preserved styling

---

## Phase 5: Quote System

### Quote Request Form
Create `app/quote/page.tsx`:
- [ ] Created page with metadata
- [ ] Created QuoteForm component ('use client')
- [ ] Added form validation
- [ ] Added error handling
- [ ] Added success message
- [ ] Preserved styling

Create `app/api/quote/route.ts`:
- [ ] Created API route
- [ ] Validated form data
- [ ] Inserted to Supabase quote_requests table
- [ ] Added error handling
- [ ] Tested: Form submission works

---

## Phase 6: SEO Optimization (CRITICAL)

### Metadata
- [ ] Every page has unique title
- [ ] Every page has meta description (< 160 chars)
- [ ] All pages have Open Graph tags
- [ ] All pages have Twitter Card tags
- [ ] Added favicon.ico in /app
- [ ] Added apple-touch-icon

### Structured Data (JSON-LD)
- [ ] Product pages have Product schema
- [ ] Organization schema in layout
- [ ] Breadcrumb schema on relevant pages
- [ ] Tested with Google Rich Results Test

### Sitemap
Create `app/sitemap.ts`:
- [ ] Created dynamic sitemap
- [ ] Included all products
- [ ] Included all categories
- [ ] Included all brands
- [ ] Included all rooms
- [ ] Included static pages
- [ ] Set proper priorities
- [ ] Set changeFrequency
- [ ] Tested: Access /sitemap.xml

### Robots.txt
Create `app/robots.ts`:
- [ ] Created robots.txt
- [ ] Allowed all pages
- [ ] Disallowed /api/
- [ ] Linked to sitemap
- [ ] Tested: Access /robots.txt

### Semantic HTML
- [ ] Used proper heading hierarchy (h1, h2, h3)
- [ ] Only one h1 per page
- [ ] Used semantic elements (article, section, nav, etc.)
- [ ] Added alt text to ALL images
- [ ] Added ARIA labels where needed

---

## Phase 7: Performance Optimization (CRITICAL)

### Static Generation (SSG)
- [ ] All product pages are static
- [ ] All category pages are static
- [ ] All brand pages are static
- [ ] All room pages are static
- [ ] Run `npm run build` and verify (○ symbol)
- [ ] Consider ISR with revalidate if data changes frequently

### Database Optimization
- [ ] Using Supabase joins (not N+1 queries)
- [ ] Fetching only needed columns
- [ ] Filtering soft-deleted at query level
- [ ] Tested: Queries are fast

### Image Optimization
- [ ] ALL images use next/image
- [ ] Set proper width/height (no CLS)
- [ ] Used sizes for responsive images
- [ ] Priority on above-fold images
- [ ] Lazy loading below-fold images
- [ ] Tested: Images optimized in build

### Code Splitting
- [ ] Heavy components lazy loaded with next/dynamic
- [ ] Client Components marked 'use client'
- [ ] Server Components by default
- [ ] Tested: Bundle size is reasonable

### Caching Strategy
- [ ] Added revalidate to pages if using ISR
- [ ] Configured cache headers in next.config.js
- [ ] Tested: Pages cache correctly

### Font Optimization
- [ ] Using next/font for Google Fonts
- [ ] Or using next/font/local for custom fonts
- [ ] Set display: 'swap'
- [ ] Preloaded critical fonts
- [ ] Tested: No FOIT (Flash of Invisible Text)

### Lighthouse Audit
Run Lighthouse (incognito mode):
- [ ] Performance Score: 90+ (preferably 95+)
- [ ] Accessibility Score: 95+
- [ ] Best Practices Score: 95+
- [ ] SEO Score: 100
- [ ] Fix any issues identified

### Core Web Vitals
Test with PageSpeed Insights:
- [ ] LCP (Largest Contentful Paint): < 2.5s
- [ ] FID (First Input Delay): < 100ms
- [ ] CLS (Cumulative Layout Shift): < 0.1
- [ ] Fix any issues

### Bundle Size
- [ ] First Load JS: < 100kb (ideal < 80kb)
- [ ] Reviewed build output
- [ ] Optimized large dependencies
- [ ] Used tree shaking

---

## Phase 8: Final Polish & Testing

### Error Handling
- [ ] Created `app/error.tsx` (error boundary)
- [ ] Created `app/not-found.tsx` (custom 404)
- [ ] Created `app/global-error.tsx` (if needed)
- [ ] Added loading.tsx for pages that need it
- [ ] Tested: Errors handled gracefully

### Loading States
- [ ] Added `loading.tsx` for slow pages
- [ ] Created loading skeletons
- [ ] Preserved styling
- [ ] Tested: Good UX while loading

### Cross-Browser Testing
- [ ] Chrome (latest)
- [ ] Safari (latest)
- [ ] Firefox (latest)
- [ ] Edge (latest)
- [ ] Mobile Safari (iOS)
- [ ] Mobile Chrome (Android)

### Responsive Testing
- [ ] Mobile (375px - iPhone SE)
- [ ] Mobile (390px - iPhone 12/13)
- [ ] Tablet (768px - iPad)
- [ ] Desktop (1024px)
- [ ] Large Desktop (1440px+)

### Accessibility
- [ ] Keyboard navigation works
- [ ] Focus indicators visible
- [ ] Screen reader tested (VoiceOver/NVDA)
- [ ] Color contrast meets WCAG AA
- [ ] All interactive elements accessible

### Final Build Test
```bash
npm run build
npm start
```
- [ ] Build completes without errors
- [ ] Build completes without warnings
- [ ] All pages render correctly
- [ ] All images load correctly
- [ ] All links work
- [ ] Forms work correctly

### Google Search Console
- [ ] Submitted sitemap.xml
- [ ] Verified ownership
- [ ] Requested indexing for key pages
- [ ] Monitored for errors

---

## Performance Checklist Summary

Must achieve ALL of these:
- [ ] Lighthouse Performance: 90+
- [ ] Lighthouse SEO: 100
- [ ] LCP: < 2.5s
- [ ] FID: < 100ms
- [ ] CLS: < 0.1
- [ ] First Load JS: < 100kb
- [ ] All product pages static (SSG)
- [ ] All images optimized with next/image
- [ ] No console errors in production
- [ ] Design matches React version exactly

---

## Cleanup

### Remove Old Files (After Testing)
- [ ] Remove `src/` directory (after verifying migration)
- [ ] Remove Vite config files
- [ ] Remove old React Router files
- [ ] Update .gitignore for Next.js
- [ ] Remove unused dependencies
- [ ] Clean up package.json

### Documentation
- [ ] Update README.md
- [ ] Document any custom configurations
- [ ] Document deployment process
- [ ] Add performance test results

---

## Deployment

### Pre-Deployment
- [ ] Run final `npm run build`
- [ ] Test production build locally
- [ ] Final Lighthouse audit
- [ ] Verify all environment variables
- [ ] Create deployment checklist

### Deploy
- [ ] Choose hosting (Vercel recommended for Next.js)
- [ ] Configure environment variables
- [ ] Deploy to production
- [ ] Verify production site works
- [ ] Submit sitemap to Google

---

## Critical Reminders

**DO NOT:**
- ❌ Change colors, fonts, or design
- ❌ Copy styles from toc-crm
- ❌ Use Client Components by default
- ❌ Skip image optimization
- ❌ Forget metadata on any page
- ❌ Skip generateStaticParams
- ❌ Use regular <img> tags

**DO:**
- ✅ Keep original design exactly
- ✅ Use Server Components by default
- ✅ Optimize every image
- ✅ Add metadata to every page
- ✅ Generate static params for SSG
- ✅ Test with Lighthouse continuously
- ✅ Filter soft-deleted products
- ✅ Use Supabase joins

---

**Current Status:** Not started
**Last Updated:** 2025-12-22

Use this checklist to track your progress. Check off items as you complete them.
