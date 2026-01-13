import type { Metadata } from 'next'
import AboutPageContent from './AboutPageContent'

export const metadata: Metadata = {
  title: 'About Us | The Office Company',
  description: 'Learn about The Office Company - Croatia\'s leading provider of comprehensive office solutions since 2008. Discover our story, values, and commitment to creating exceptional workspaces.',
  keywords: ['office solutions Croatia', 'workspace consulting', 'office furniture provider', 'The Office Company history', 'office design team'],
  openGraph: {
    title: 'About Us | The Office Company',
    description: 'Crafting exceptional workspaces since 2008. Discover our story, values, and commitment to transforming Croatian offices.',
    images: [{
      url: '/images/tocAbout.webp',
      width: 1200,
      height: 630,
      alt: 'The Office Company Team'
    }],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'About Us | The Office Company',
    description: 'Crafting exceptional workspaces since 2008. Discover our story, values, and commitment to transforming Croatian offices.',
    images: ['/images/tocAbout.webp'],
  },
}

export default function AboutPage() {
  return <AboutPageContent />
}
