import type { Lang } from '@/lib/i18n'

interface DownloadsPageDict {
  metadata: {
    title: string
    description: string
    keywords: string[]
    ogImageAlt: string
  }
  heroTag: string
  heroTitleLine1: string
  heroTitleLine2: string
  heroDescription: string
  downloadButton: string
  fileTypeLabel: string
  fileSizeLabel: string
  freeBadge: string
  emptyTitle: string
  emptyDescription: string
  ctaTag: string
  ctaTitle: string
  ctaDescription: string
  ctaButton: string
}

const dict = {
  en: {
    metadata: {
      title: 'Free Downloads | Guides & Resources | The Office Company',
      description:
        'Download free guides, brochures, and resources on office design, acoustics, furniture, and workspace solutions from The Office Company.',
      keywords: [
        'free office design guides',
        'workspace resources',
        'office acoustics guide',
        'office furniture brochures',
        'free downloads',
      ],
      ogImageAlt: 'The Office Company Free Downloads',
    },
    heroTag: 'Resources',
    heroTitleLine1: 'Free',
    heroTitleLine2: 'Downloads',
    heroDescription:
      'Guides, brochures, and resources on office design and workspace solutions — free to download, no sign-up required.',
    downloadButton: 'Download',
    fileTypeLabel: 'Format',
    fileSizeLabel: 'Size',
    freeBadge: 'Free',
    emptyTitle: 'No downloads yet',
    emptyDescription: 'New resources are coming soon. Check back shortly!',
    ctaTag: 'Need More?',
    ctaTitle: 'Looking for Personalized Advice?',
    ctaDescription:
      'Our experts are happy to help you plan your workspace — from acoustics to complete office design.',
    ctaButton: 'Contact Us',
  },
  hr: {
    metadata: {
      title: 'Besplatna preuzimanja | Vodiči i materijali | The Office Company',
      description:
        'Preuzmite besplatne vodiče, brošure i materijale o dizajnu ureda, akustici, namještaju i rješenjima radnih prostora The Office Companyja.',
      keywords: [
        'besplatni vodiči za dizajn ureda',
        'materijali za radne prostore',
        'vodič za akustiku ureda',
        'brošure uredskog namještaja',
        'besplatna preuzimanja',
      ],
      ogImageAlt: 'Besplatna preuzimanja The Office Companyja',
    },
    heroTag: 'Materijali',
    heroTitleLine1: 'Besplatna',
    heroTitleLine2: 'preuzimanja',
    heroDescription:
      'Vodiči, brošure i materijali o dizajnu ureda i rješenjima radnih prostora — besplatno za preuzimanje, bez registracije.',
    downloadButton: 'Preuzmite',
    fileTypeLabel: 'Format',
    fileSizeLabel: 'Veličina',
    freeBadge: 'Besplatno',
    emptyTitle: 'Još nema preuzimanja',
    emptyDescription: 'Novi materijali stižu uskoro. Navratite ponovno!',
    ctaTag: 'Trebate više?',
    ctaTitle: 'Tražite personalizirani savjet?',
    ctaDescription:
      'Naši stručnjaci rado će vam pomoći u planiranju radnog prostora — od akustike do cjelovitog dizajna ureda.',
    ctaButton: 'Kontaktirajte nas',
  },
} satisfies Record<Lang, DownloadsPageDict>

export default dict
