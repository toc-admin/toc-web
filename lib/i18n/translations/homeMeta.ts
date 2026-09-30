import type { Lang } from '@/lib/i18n'

interface HomeMetaDict {
  title: string
  description: string
  ogDescription: string
  twitterDescription: string
}

const dict: Record<Lang, HomeMetaDict> = {
  en: {
    title: 'The Office Company | Premium Office Solutions & Furniture in Croatia',
    description:
      'Leading provider of serviced office consulting, management, and premium office furniture in Croatia. Explore 500+ products from world-class brands like Haworth, BoConcept, and Boss Design.',
    ogDescription:
      'Leading provider of serviced office consulting, management, and premium office furniture in Croatia. Explore 500+ products from world-class brands.',
    twitterDescription:
      'Leading provider of serviced office consulting, management, and premium office furniture in Croatia.',
  },
  hr: {
    title: 'The Office Company | Premium uredska rješenja i namještaj u Hrvatskoj',
    description:
      'Vodeći pružatelj usluga savjetovanja i upravljanja servisiranim uredima te premium uredskog namještaja u Hrvatskoj. Istražite više od 500 proizvoda svjetskih brendova poput Haworth, BoConcept i Boss Design.',
    ogDescription:
      'Vodeći pružatelj usluga savjetovanja i upravljanja servisiranim uredima te premium uredskog namještaja u Hrvatskoj. Istražite više od 500 proizvoda svjetskih brendova.',
    twitterDescription:
      'Vodeći pružatelj usluga savjetovanja i upravljanja servisiranim uredima te premium uredskog namještaja u Hrvatskoj.',
  },
}

export default dict
