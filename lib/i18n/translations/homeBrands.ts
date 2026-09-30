import type { Lang } from '@/lib/i18n'

interface HomeBrandsDict {
  label: string
  headingLine1: string
  headingLine2: string
  intro: string
  ctaHeading: string
  ctaText: string
  ctaButton: string
  featuredBadge: string
}

const dict: Record<Lang, HomeBrandsDict> = {
  en: {
    label: 'Our Partners',
    headingLine1: 'Partnering with',
    headingLine2: 'Industry Leaders',
    intro:
      'We collaborate with world-renowned furniture and design brands to deliver exceptional quality and innovation in every project.',
    ctaHeading: 'Interested in partnering with us?',
    ctaText: "Let's discuss how we can bring premium design to your project.",
    ctaButton: 'Get In Touch',
    featuredBadge: 'Featured Partner',
  },
  hr: {
    label: 'Naši partneri',
    headingLine1: 'Surađujemo s',
    headingLine2: 'liderima industrije',
    intro:
      'Surađujemo sa svjetski priznatim brendovima namještaja i dizajna kako bismo u svakom projektu isporučili iznimnu kvalitetu i inovativnost.',
    ctaHeading: 'Želite li surađivati s nama?',
    ctaText: 'Razgovarajmo o tome kako premium dizajn možemo donijeti u vaš projekt.',
    ctaButton: 'Javite nam se',
    featuredBadge: 'Istaknuti partner',
  },
}

export default dict
