/** @type {import('next').NextConfig} */
const nextConfig = {
  // Enable React strict mode for better debugging
  reactStrictMode: true,

  // Image optimization configuration
  images: {
    // Configure Supabase Storage as remote image source
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'vlwjarfujykmkcvfvlep.supabase.co',
        pathname: '/storage/v1/object/public/**',
      },
      {
        protocol: 'https',
        hostname: '**.supabase.co',
        pathname: '/storage/v1/object/public/**',
      },
    ],
    // Image formats to support (modern formats for better performance)
    formats: ['image/avif', 'image/webp'],
    // Minimum cache time for optimized images (1 year)
    minimumCacheTTL: 31536000,
    // Add more lenient error handling
    dangerouslyAllowSVG: true,
    contentDispositionType: 'attachment',
  },

  // Compiler options for better performance
  compiler: {
    // Remove console.logs in production
    removeConsole: process.env.NODE_ENV === 'production',
  },

  // Experimental features for better performance
  experimental: {
    // Optimize package imports
    optimizePackageImports: ['lucide-react'],
  },

  // Headers for security and performance
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          // Security headers
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on',
          },
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'Referrer-Policy',
            value: 'origin-when-cross-origin',
          },
          // Cache control for static assets
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
    ]
  },

  // Redirects (if needed)
  async redirects() {
    return [
      // Add any necessary redirects here
      // Example:
      // {
      //   source: '/old-path',
      //   destination: '/new-path',
      //   permanent: true,
      // },
    ]
  },

  // Turbopack configuration (Next.js 16 default)
  turbopack: {
    // Empty config to silence warning - using defaults
  },

  // Output configuration
  output: 'standalone', // Optimize for Docker/production deployment

  // Disable powered-by header for security
  poweredByHeader: false,

  // Compression
  compress: true,

  // Generate ETags for caching
  generateEtags: true,

  // Page extensions (add .mdx if using MDX)
  pageExtensions: ['js', 'jsx', 'ts', 'tsx'],
}

export default nextConfig
