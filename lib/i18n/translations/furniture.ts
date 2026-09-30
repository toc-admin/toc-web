import type { Lang } from '@/lib/i18n'

interface FurnitureDict {
  // Metadata
  metaTitle: string
  metaDescription: string
  ogTitle: string
  ogDescription: string
  ogImageAlt: string
  // Hero
  heroBadge: string
  heroImageAlt: string
  heroTitleLine1: string
  heroTitleLine2: string
  heroText: (count: number) => string
  searchPlaceholder: string
  searchButton: string
  quickLinksLabel: string
  // Quick search terms: `term` is the English query sent to /search (matched
  // against English DB values) and must NOT be translated; `label` is display-only.
  quickTerms: Array<{ term: string; label: string }>
  // Stats
  statsProducts: string
  statsCategories: string
  statsBrands: string
  statsQuality: string
  // Categories section
  categoriesBadge: string
  categoriesTitleLine1: string
  categoriesTitleLine2: string
  categoriesText: (count: number) => string
  exploreCategory: string
  // Featured section
  featuredBadge: string
  featuredTitleLine1: string
  featuredTitleLine2: string
  featuredText: string
  // Rooms section
  roomsBadge: string
  roomsTitleLine1: string
  roomsTitleLine2: string
  roomsText: string
  exploreRoom: string
  // CTA
  ctaTitle: string
  ctaText: string
  ctaButton: string
}

const dict: Record<Lang, FurnitureDict> = {
  en: {
    metaTitle: 'Office Furniture Catalog | 500+ Premium Products',
    metaDescription: 'Browse our comprehensive catalog of premium office furniture. Chairs, desks, storage, acoustic solutions, and more from world-class brands. Find furniture by category or room type.',
    ogTitle: 'Office Furniture Catalog | The Office Company',
    ogDescription: 'Browse 500+ premium office furniture products from world-class brands.',
    ogImageAlt: 'The Office Company Furniture Catalog',
    heroBadge: 'Furniture Catalog',
    heroImageAlt: 'Furniture Hub',
    heroTitleLine1: 'Premium Office',
    heroTitleLine2: 'Furniture Solutions',
    heroText: (count) => `Discover over ${count}+ carefully curated products from world-renowned brands. Browse by category, room type, or let our experts guide you.`,
    searchPlaceholder: 'Search for furniture... (e.g., office chairs, standing desks)',
    searchButton: 'Search',
    quickLinksLabel: 'Quick links:',
    quickTerms: [
      { term: 'Office Chairs', label: 'Office Chairs' },
      { term: 'Standing Desks', label: 'Standing Desks' },
      { term: 'Phone Booths', label: 'Phone Booths' },
      { term: 'Lounge Seating', label: 'Lounge Seating' },
    ],
    statsProducts: 'Products',
    statsCategories: 'Categories',
    statsBrands: 'Premium Brands',
    statsQuality: 'Quality Guaranteed',
    categoriesBadge: 'Browse by Category',
    categoriesTitleLine1: 'Find Exactly What',
    categoriesTitleLine2: 'You Need',
    categoriesText: (count) => `Explore our ${count} main furniture categories, each containing specialized subcategories to help you find the perfect pieces for your workspace.`,
    exploreCategory: 'Explore Category',
    featuredBadge: 'Curated Selection',
    featuredTitleLine1: 'Featured',
    featuredTitleLine2: 'Products',
    featuredText: 'Discover our hand-picked selection of premium furniture pieces from world-renowned brands, chosen for their exceptional quality and design.',
    roomsBadge: 'Shop by Room Type',
    roomsTitleLine1: 'Design Complete',
    roomsTitleLine2: 'Room Solutions',
    roomsText: 'Browse furniture curated specifically for different workspace zones. From welcoming reception areas to productive private offices.',
    exploreRoom: 'Explore Room',
    ctaTitle: 'Need Help Finding the Perfect Furniture?',
    ctaText: 'Our expert team can help you select the right furniture for your space, provide custom quotes, and guide you through the entire process.',
    ctaButton: 'Contact Our Experts',
  },
  hr: {
    metaTitle: 'Katalog uredskog namještaja | 500+ premium proizvoda',
    metaDescription: 'Pregledajte naš sveobuhvatni katalog premium uredskog namještaja. Stolice, stolovi, pohrana, akustična rješenja i još mnogo toga od vrhunskih svjetskih brendova. Pronađite namještaj po kategoriji ili vrsti prostorije.',
    ogTitle: 'Katalog uredskog namještaja | The Office Company',
    ogDescription: 'Pregledajte 500+ premium proizvoda uredskog namještaja vrhunskih svjetskih brendova.',
    ogImageAlt: 'Katalog namještaja The Office Company',
    heroBadge: 'Katalog namještaja',
    heroImageAlt: 'Katalog namještaja',
    heroTitleLine1: 'Premium rješenja',
    heroTitleLine2: 'uredskog namještaja',
    heroText: (count) => `Otkrijte više od ${count} pažljivo odabranih proizvoda svjetski poznatih brendova. Pregledajte po kategoriji ili vrsti prostorije, ili prepustite našim stručnjacima da vas vode.`,
    searchPlaceholder: 'Pretražite namještaj... (npr. uredske stolice, podizni stolovi)',
    searchButton: 'Traži',
    quickLinksLabel: 'Brze poveznice:',
    quickTerms: [
      { term: 'Office Chairs', label: 'Uredske stolice' },
      { term: 'Standing Desks', label: 'Podizni stolovi' },
      { term: 'Phone Booths', label: 'Telefonske kabine' },
      { term: 'Lounge Seating', label: 'Lounge sjedenje' },
    ],
    statsProducts: 'Proizvoda',
    statsCategories: 'Kategorija',
    statsBrands: 'Premium brendova',
    statsQuality: 'Jamstvo kvalitete',
    categoriesBadge: 'Pregled po kategorijama',
    categoriesTitleLine1: 'Pronađite točno ono',
    categoriesTitleLine2: 'što vam treba',
    categoriesText: (count) => `Istražite naših ${count} glavnih kategorija namještaja, od kojih svaka sadrži specijalizirane potkategorije koje vam pomažu pronaći savršene komade za vaš radni prostor.`,
    exploreCategory: 'Istražite kategoriju',
    featuredBadge: 'Pažljivo odabrano',
    featuredTitleLine1: 'Izdvojeni',
    featuredTitleLine2: 'proizvodi',
    featuredText: 'Otkrijte naš ručno odabran izbor premium komada namještaja svjetski poznatih brendova, odabranih zbog iznimne kvalitete i dizajna.',
    roomsBadge: 'Pregled po vrsti prostorije',
    roomsTitleLine1: 'Osmislite cjelovita',
    roomsTitleLine2: 'rješenja prostora',
    roomsText: 'Pregledajte namještaj pažljivo odabran za različite zone radnog prostora. Od gostoljubivih recepcija do produktivnih privatnih ureda.',
    exploreRoom: 'Istražite prostoriju',
    ctaTitle: 'Trebate pomoć pri odabiru savršenog namještaja?',
    ctaText: 'Naš stručni tim može vam pomoći odabrati pravi namještaj za vaš prostor, izraditi prilagođene ponude i voditi vas kroz cijeli proces.',
    ctaButton: 'Kontaktirajte naše stručnjake',
  },
}

export default dict
