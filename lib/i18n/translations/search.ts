import type { Lang } from '@/lib/i18n'

interface SearchDict {
  // Metadata
  metaTitle: string
  metaDescription: string
  // Breadcrumb
  breadcrumbHome: string
  breadcrumbFurniture: string
  breadcrumbSearch: string
  // Hero
  heroBadge: string
  resultsForPrefix: string
  searchOurCatalog: string
  searchPlaceholder: string
  searchButton: string
  foundPrefix: string
  // Empty states
  noResultsTitle: string
  noResultsText: (query: string) => string
  browseAllProducts: string
  startSearchingTitle: string
  startSearchingText: string
  // CTA
  ctaTitle: string
  ctaText: string
  ctaButton: string
}

const dict: Record<Lang, SearchDict> = {
  en: {
    metaTitle: 'Search Results',
    metaDescription: 'Search our catalog of premium office furniture.',
    breadcrumbHome: 'Home',
    breadcrumbFurniture: 'Furniture',
    breadcrumbSearch: 'Search',
    heroBadge: 'Search Results',
    resultsForPrefix: 'Results for',
    searchOurCatalog: 'Search Our Catalog',
    searchPlaceholder: 'Search for furniture...',
    searchButton: 'Search',
    foundPrefix: 'Found',
    noResultsTitle: 'No results found',
    noResultsText: (query) => `We couldn't find any products matching "${query}". Try different keywords or browse our categories.`,
    browseAllProducts: 'Browse All Products',
    startSearchingTitle: 'Start searching',
    startSearchingText: 'Enter a search term above to find products in our catalog.',
    ctaTitle: "Can't find what you're looking for?",
    ctaText: 'Our team is here to help you find the perfect furniture for your space.',
    ctaButton: 'Contact Our Experts',
  },
  hr: {
    metaTitle: 'Rezultati pretraživanja',
    metaDescription: 'Pretražite naš katalog premium uredskog namještaja.',
    breadcrumbHome: 'Početna',
    breadcrumbFurniture: 'Namještaj',
    breadcrumbSearch: 'Pretraživanje',
    heroBadge: 'Rezultati pretraživanja',
    resultsForPrefix: 'Rezultati za',
    searchOurCatalog: 'Pretražite naš katalog',
    searchPlaceholder: 'Pretražite namještaj...',
    searchButton: 'Traži',
    foundPrefix: 'Pronađeno:',
    noResultsTitle: 'Nema rezultata',
    noResultsText: (query) => `Nismo pronašli proizvode koji odgovaraju pojmu "${query}". Pokušajte s drugim ključnim riječima ili pregledajte naše kategorije.`,
    browseAllProducts: 'Pregledajte sve proizvode',
    startSearchingTitle: 'Započnite pretraživanje',
    startSearchingText: 'Unesite pojam za pretraživanje kako biste pronašli proizvode u našem katalogu.',
    ctaTitle: 'Ne možete pronaći ono što tražite?',
    ctaText: 'Naš tim tu je da vam pomogne pronaći savršen namještaj za vaš prostor.',
    ctaButton: 'Kontaktirajte naše stručnjake',
  },
}

// Croatian plural forms for "product": 1 proizvod, 2 proizvoda, 5 proizvoda,
// 21 proizvod, ... (numbers ending in 1, except those ending in 11)
export function productCountWord(lang: Lang, count: number): string {
  if (lang === 'hr') {
    return count % 10 === 1 && count % 100 !== 11 ? 'proizvod' : 'proizvoda'
  }
  return count === 1 ? 'product' : 'products'
}

export default dict
