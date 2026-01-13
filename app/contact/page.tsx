import type { Metadata } from 'next'
import ContactPageContent from './ContactPageContent'

export const metadata: Metadata = {
  title: 'Contact Us | Get in Touch with The Office Company',
  description: 'Have questions? Contact The Office Company today. Our team is ready to assist you with office space solutions that fit your needs.',
  openGraph: {
    title: 'Contact Us | Get in Touch with The Office Company',
    description: 'Have questions? Contact The Office Company today. Our team is ready to assist you with office space solutions that fit your needs.',
    images: [{
      url: '/og/toc-hero.jpeg',
      width: 1200,
      height: 630,
      alt: 'The Office Company Contact'
    }],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Contact Us | Get in Touch with The Office Company',
    description: 'Have questions? Contact The Office Company today. Our team is ready to assist you with office space solutions that fit your needs.',
    images: ['/og/toc-hero.jpeg'],
  },
}

export default function ContactPage() {
  return <ContactPageContent />
}
