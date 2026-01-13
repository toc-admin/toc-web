import type { Metadata } from 'next'
import ServicesPageContent from './ServicesPageContent'

export const metadata: Metadata = {
  title: 'Our Services | Flexible Office Solutions for Every Business',
  description: 'Explore The Office Company\'s services, including coworking spaces, private offices, virtual offices, and meeting rooms designed to support your business growth.',
  keywords: ['serviced office consulting', 'office management', 'office design', 'office furniture', 'workspace solutions', 'coworking spaces Croatia'],
  openGraph: {
    title: 'Our Services | Flexible Office Solutions for Every Business',
    description: 'Explore The Office Company\'s services, including coworking spaces, private offices, virtual offices, and meeting rooms designed to support your business growth.',
    images: [{
      url: 'https://www.theofficecompany.eu/og/toc-11.jpeg',
      width: 1200,
      height: 630,
      alt: 'The Office Company Services'
    }],
    url: 'https://www.theofficecompany.eu/services',
    type: 'article',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Our Services | Flexible Office Solutions for Every Business',
    description: 'Explore The Office Company\'s services, including coworking spaces, private offices, virtual offices, and meeting rooms designed to support your business growth.',
    images: ['https://www.theofficecompany.eu/og/toc-toc-compress.webp'],
  },
}

export default function ServicesPage() {
  return <ServicesPageContent />
}
