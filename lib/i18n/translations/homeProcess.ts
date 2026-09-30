import type { Lang } from '@/lib/i18n'

interface ProcessStepEntry {
  title: string
  description: string
  highlights: string[]
}

interface HomeProcessDict {
  label: string
  heading: string
  intro: string
  steps: ProcessStepEntry[]
}

const dict: Record<Lang, HomeProcessDict> = {
  en: {
    label: 'Our Process',
    heading: 'How We Do It',
    intro:
      'Our proven three-step approach ensures seamless delivery from concept to completion, with exceptional results every time.',
    steps: [
      {
        title: 'Planning & Strategy',
        description:
          'We start by understanding your business objectives, workspace requirements, and budget. Our experts conduct thorough analysis and develop a comprehensive strategy tailored to your needs.',
        highlights: [
          'Needs Assessment',
          'Space Analysis',
          'Budget Planning',
          'Timeline Development',
        ],
      },
      {
        title: 'Design & Execution',
        description:
          'Our design team brings your vision to life with detailed plans and 3D visualizations. We handle everything from furniture selection to installation, ensuring flawless execution.',
        highlights: [
          '3D Visualization',
          'Furniture Selection',
          'Project Management',
          'Quality Installation',
        ],
      },
      {
        title: 'Support & Optimization',
        description:
          "We don't stop at installation. Our team provides ongoing support, maintenance, and optimization services to ensure your workspace continues to perform at its best.",
        highlights: [
          'Ongoing Maintenance',
          'Performance Monitoring',
          'Optimization Services',
          '24/7 Support',
        ],
      },
    ],
  },
  hr: {
    label: 'Naš proces',
    heading: 'Kako radimo',
    intro:
      'Naš provjereni pristup u tri koraka osigurava besprijekornu realizaciju od koncepta do završetka, s iznimnim rezultatima svaki put.',
    steps: [
      {
        title: 'Planiranje i strategija',
        description:
          'Počinjemo razumijevanjem vaših poslovnih ciljeva, zahtjeva radnog prostora i budžeta. Naši stručnjaci provode temeljitu analizu i razvijaju sveobuhvatnu strategiju prilagođenu vašim potrebama.',
        highlights: [
          'Procjena potreba',
          'Analiza prostora',
          'Planiranje budžeta',
          'Izrada vremenskog plana',
        ],
      },
      {
        title: 'Dizajn i izvedba',
        description:
          'Naš dizajnerski tim oživljava vašu viziju detaljnim planovima i 3D vizualizacijama. Preuzimamo sve, od odabira namještaja do montaže, uz besprijekornu izvedbu.',
        highlights: [
          '3D vizualizacija',
          'Odabir namještaja',
          'Vođenje projekta',
          'Kvalitetna montaža',
        ],
      },
      {
        title: 'Podrška i optimizacija',
        description:
          'Ne zaustavljamo se na montaži. Naš tim pruža kontinuiranu podršku, održavanje i usluge optimizacije kako bi vaš radni prostor uvijek pružao najbolje.',
        highlights: [
          'Redovito održavanje',
          'Praćenje učinkovitosti',
          'Usluge optimizacije',
          'Podrška 24/7',
        ],
      },
    ],
  },
}

export default dict
