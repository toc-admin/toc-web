import type { Lang } from '@/lib/i18n'

interface CategoryListingStrings {
  // Metadata
  metaNotFoundTitle: string
  metaTitle: (name: string) => string
  metaDescriptionFallback: (name: string) => string
  // Breadcrumb
  breadcrumbHome: string
  breadcrumbFurniture: string
  // Hero
  browseCategory: string
  // Subcategory pills
  filterLabel: string
  allOf: (name: string) => string
  // Sidebar filters
  filtersHeading: string
  clearAll: string
  subcategoryHeading: string
  roomTypeHeading: string
  brandHeading: string
  needHelp: string
  // Toolbar
  showing: string
  of: string
  products: (count: number) => string
  sortPopular: string
  sortNewest: string
  sortNameAsc: string
  sortNameDesc: string
  // Empty state
  emptyTitle: string
  emptyText: string
  clearAllFilters: string
  // Load more
  loadMore: string
  // Related categories CTA
  ctaHeading: string
  ctaText: string
  viewAllCategories: string
  contactExperts: string
  // Not found page
  notFoundTitle: string
  notFoundText: string
  notFoundBrowse: string
  notFoundHome: string
}

const dict = {
  en: {
    metaNotFoundTitle: 'Category Not Found',
    metaTitle: (name: string) => `${name} | Premium Office Furniture`,
    metaDescriptionFallback: (name: string) =>
      `Browse our selection of premium ${name.toLowerCase()} from world-class brands.`,
    breadcrumbHome: 'Home',
    breadcrumbFurniture: 'Furniture',
    browseCategory: 'Browse Category',
    filterLabel: 'Filter:',
    allOf: (name: string) => `All ${name}`,
    filtersHeading: 'Filters',
    clearAll: 'Clear All',
    subcategoryHeading: 'Subcategory',
    roomTypeHeading: 'Room Type',
    brandHeading: 'Brand',
    needHelp: 'Need Help?',
    showing: 'Showing',
    of: 'of',
    products: (count: number) => (count === 1 ? 'product' : 'products'),
    sortPopular: 'Most Popular',
    sortNewest: 'Newest First',
    sortNameAsc: 'Name: A-Z',
    sortNameDesc: 'Name: Z-A',
    emptyTitle: 'No products found',
    emptyText: "Try adjusting your filters to find what you're looking for.",
    clearAllFilters: 'Clear All Filters',
    loadMore: 'Load More Products',
    ctaHeading: 'Explore More Categories',
    ctaText:
      "Can't find what you're looking for? Browse our other furniture categories or contact our experts for personalized recommendations.",
    viewAllCategories: 'View All Categories',
    contactExperts: 'Contact Experts',
    notFoundTitle: 'Category Not Found',
    notFoundText:
      "Sorry, we couldn't find the category you're looking for. It may have been moved or removed.",
    notFoundBrowse: 'Browse All Categories',
    notFoundHome: 'Go Home',
  },
  hr: {
    metaNotFoundTitle: 'Kategorija nije pronađena',
    metaTitle: (name: string) => `${name} | Vrhunski uredski namještaj`,
    metaDescriptionFallback: (name: string) =>
      `Pregledajte našu ponudu vrhunskih proizvoda iz kategorije ${name} svjetski poznatih brendova.`,
    breadcrumbHome: 'Početna',
    breadcrumbFurniture: 'Namještaj',
    browseCategory: 'Pregledajte kategoriju',
    filterLabel: 'Filtar:',
    allOf: (name: string) => `Sve: ${name}`,
    filtersHeading: 'Filtri',
    clearAll: 'Očisti sve',
    subcategoryHeading: 'Potkategorija',
    roomTypeHeading: 'Vrsta prostorije',
    brandHeading: 'Brend',
    needHelp: 'Trebate pomoć?',
    showing: 'Prikazano',
    of: 'od',
    products: (count: number) => {
      const mod10 = count % 10
      const mod100 = count % 100
      if (mod10 === 1 && mod100 !== 11) return 'proizvod'
      return 'proizvoda'
    },
    sortPopular: 'Najpopularnije',
    sortNewest: 'Najnovije prvo',
    sortNameAsc: 'Naziv: A–Ž',
    sortNameDesc: 'Naziv: Ž–A',
    emptyTitle: 'Nema pronađenih proizvoda',
    emptyText: 'Pokušajte prilagoditi filtre kako biste pronašli ono što tražite.',
    clearAllFilters: 'Očisti sve filtre',
    loadMore: 'Učitaj još proizvoda',
    ctaHeading: 'Istražite više kategorija',
    ctaText:
      'Ne možete pronaći ono što tražite? Pregledajte naše ostale kategorije namještaja ili se obratite našim stručnjacima za personalizirane preporuke.',
    viewAllCategories: 'Pogledajte sve kategorije',
    contactExperts: 'Kontaktirajte stručnjake',
    notFoundTitle: 'Kategorija nije pronađena',
    notFoundText:
      'Nažalost, nismo pronašli kategoriju koju tražite. Možda je premještena ili uklonjena.',
    notFoundBrowse: 'Pregledajte sve kategorije',
    notFoundHome: 'Natrag na početnu',
  },
} satisfies Record<Lang, CategoryListingStrings>

export default dict
