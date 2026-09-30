import type { Lang } from '@/lib/i18n'

interface ServiceEntry {
  title: string
  description: string
  features: string[]
}

interface HomeServicesDict {
  label: string
  heading: string
  intro: string
  services: ServiceEntry[]
  viewAll: string
}

const dict: Record<Lang, HomeServicesDict> = {
  en: {
    label: 'Our Services',
    heading: 'What We Do',
    intro:
      'Our sole focus is on unlocking better growth for our clients, increasing their long-term sales, value, and profit. We achieve this by optimizing every lever of their commercial strategy.',
    services: [
      {
        title: 'Serviced Office Consulting',
        description:
          'Expert guidance to optimize your workspace strategy, from concept to completion. We analyze your needs and deliver tailored solutions.',
        features: ['Space Planning', 'ROI Analysis', 'Market Research'],
      },
      {
        title: 'Serviced Office Management',
        description:
          'Comprehensive management services that keep your office running smoothly. We handle operations so you can focus on growth.',
        features: ['Operations', 'Maintenance', 'Client Relations'],
      },
      {
        title: 'Office Design & Furniture',
        description:
          'Transform your space with innovative design and premium furniture solutions that inspire productivity and reflect your brand.',
        features: ['Interior Design', 'Custom Furniture', 'Brand Integration'],
      },
    ],
    viewAll: 'View All Services',
  },
  hr: {
    label: 'Naše usluge',
    heading: 'Čime se bavimo',
    intro:
      'Naš je fokus u potpunosti na rastu naših klijenata – povećanju njihove dugoročne prodaje, vrijednosti i profita. To postižemo optimizacijom svake poluge njihove komercijalne strategije.',
    services: [
      {
        title: 'Savjetovanje za servisirane urede',
        description:
          'Stručno vođenje u optimizaciji strategije vašeg radnog prostora, od koncepta do realizacije. Analiziramo vaše potrebe i isporučujemo rješenja po mjeri.',
        features: ['Planiranje prostora', 'ROI analiza', 'Istraživanje tržišta'],
      },
      {
        title: 'Upravljanje servisiranim uredima',
        description:
          'Sveobuhvatne usluge upravljanja koje osiguravaju besprijekoran rad vašeg ureda. Mi preuzimamo operativu kako biste se vi mogli posvetiti rastu.',
        features: ['Operativa', 'Održavanje', 'Odnosi s klijentima'],
      },
      {
        title: 'Dizajn ureda i namještaj',
        description:
          'Preobrazite svoj prostor inovativnim dizajnom i premium namještajem koji potiče produktivnost i odražava vaš brend.',
        features: ['Dizajn interijera', 'Namještaj po mjeri', 'Integracija brenda'],
      },
    ],
    viewAll: 'Pogledajte sve usluge',
  },
}

export default dict
