import type { Metadata } from 'next'
import './globals.css'
import ClientLayout from '@/components/layout/ClientLayout'

export const metadata: Metadata = {
  title: {
    default: 'The Office Company - Premium Office Furniture',
    template: '%s | The Office Company',
  },
  description: 'Discover our catalog of premium office furniture. Quality solutions for modern workspaces.',
  keywords: ['office furniture', 'workspace solutions', 'premium furniture', 'office design'],
  authors: [{ name: 'The Office Company' }],
  creator: 'The Office Company',
  publisher: 'The Office Company',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'),
  icons: {
    icon: '/favicon.svg',
    shortcut: '/favicon.svg',
    apple: '/favicon.svg',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: '/',
    siteName: 'The Office Company',
    title: 'The Office Company - Premium Office Furniture',
    description: 'Discover our catalog of premium office furniture. Quality solutions for modern workspaces.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'The Office Company - Premium Office Furniture',
    description: 'Discover our catalog of premium office furniture. Quality solutions for modern workspaces.',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    // Add your verification codes here when ready
    // google: 'your-google-verification-code',
    // yandex: 'your-yandex-verification-code',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        {/* Preload critical fonts for performance */}
        <link
          rel="preload"
          href="/fonts/ClashDisplay-Variable.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
        <link
          rel="preload"
          href="/fonts/PlusJakartaSans-Variable.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
      </head>
      <body className="bg-main-bg antialiased">
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  )
}
