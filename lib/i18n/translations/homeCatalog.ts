import type { Lang } from '@/lib/i18n'

interface HomeCatalogDict {
  label: string
  headingLine1: string
  headingLine2: string
  intro: string
  statProducts: string
  statBrands: string
  statCategories: string
  statQuality: string
  roomsHeading: string
  roomsText: string
  viewAllRooms: string
  browse: string
  exploreCategory: string
  ctaHeading: string
  ctaText: string
  browseAllProducts: string
  getExpertHelp: string
}

const dict: Record<Lang, HomeCatalogDict> = {
  en: {
    label: 'Premium Products',
    headingLine1: 'Explore Our',
    headingLine2: 'Furniture Catalog',
    intro:
      'Browse over 500 premium office furniture products from world-renowned brands. Filter by category, room type, or brand to find exactly what your workspace needs.',
    statProducts: 'Products',
    statBrands: 'Brands',
    statCategories: 'Categories',
    statQuality: 'Quality',
    roomsHeading: 'Shop by Room Type',
    roomsText: 'Find furniture perfectly suited for your specific workspace',
    viewAllRooms: 'View All Rooms',
    browse: 'Browse',
    exploreCategory: 'Explore Category',
    ctaHeading: "Can't find what you're looking for?",
    ctaText:
      'Our team is here to help. We can source specific products, provide expert recommendations, and create custom furniture solutions for your unique workspace needs.',
    browseAllProducts: 'Browse All Products',
    getExpertHelp: 'Get Expert Help',
  },
  hr: {
    label: 'Premium proizvodi',
    headingLine1: 'Istražite naš',
    headingLine2: 'katalog namještaja',
    intro:
      'Pregledajte više od 500 premium proizvoda uredskog namještaja svjetski poznatih brendova. Filtrirajte po kategoriji, tipu prostorije ili brendu i pronađite točno ono što vaš radni prostor treba.',
    statProducts: 'Proizvoda',
    statBrands: 'Brendova',
    statCategories: 'Kategorija',
    statQuality: 'Kvaliteta',
    roomsHeading: 'Kupujte po tipu prostorije',
    roomsText: 'Pronađite namještaj savršeno prilagođen vašem radnom prostoru',
    viewAllRooms: 'Sve prostorije',
    browse: 'Pregledaj',
    exploreCategory: 'Istražite kategoriju',
    ctaHeading: 'Ne možete pronaći ono što tražite?',
    ctaText:
      'Naš tim vam stoji na raspolaganju. Možemo nabaviti specifične proizvode, pružiti stručne preporuke i izraditi namještaj po mjeri za jedinstvene potrebe vašeg radnog prostora.',
    browseAllProducts: 'Pregledajte sve proizvode',
    getExpertHelp: 'Zatražite stručnu pomoć',
  },
}

export default dict
