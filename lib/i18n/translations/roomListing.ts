import type { Lang } from '@/lib/i18n'

interface RoomListingStrings {
  // Metadata
  metaNotFoundTitle: string
  metaTitle: (name: string) => string
  metaDescriptionFallback: (name: string) => string
  // Breadcrumb
  breadcrumbHome: string
  breadcrumbFurniture: string
  breadcrumbShopByRoom: string
  // Hero
  shopByRoom: string
  // Sidebar filters
  filtersHeading: string
  clearAll: string
  subcategoryHeading: string
  categoryHeading: string
  brandHeading: string
  needHelp: string
  // Toolbar
  furnitureFor: (name: string) => string
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
  // Other rooms CTA
  ctaHeading: string
  ctaText: string
  viewAllRooms: string
  browseAllProducts: string
}

const dict = {
  en: {
    metaNotFoundTitle: 'Room Not Found',
    metaTitle: (name: string) =>
      `${name} Furniture | Premium Office Solutions`,
    metaDescriptionFallback: (name: string) =>
      `Browse our curated selection of furniture perfect for ${name.toLowerCase()}.`,
    breadcrumbHome: 'Home',
    breadcrumbFurniture: 'Furniture',
    breadcrumbShopByRoom: 'Shop by Room',
    shopByRoom: 'Shop by Room',
    filtersHeading: 'Filters',
    clearAll: 'Clear All',
    subcategoryHeading: 'Subcategory',
    categoryHeading: 'Category',
    brandHeading: 'Brand',
    needHelp: 'Need Help?',
    furnitureFor: (name: string) => `Furniture for ${name}`,
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
    ctaHeading: 'Explore Other Room Types',
    ctaText:
      'Browse furniture curated for different workspace zones or view our complete catalog to find exactly what you need.',
    viewAllRooms: 'View All Rooms',
    browseAllProducts: 'Browse All Products',
  },
  hr: {
    metaNotFoundTitle: 'Prostorija nije pronađena',
    metaTitle: (name: string) =>
      `${name} – namještaj | Vrhunska uredska rješenja`,
    metaDescriptionFallback: (name: string) =>
      `Pregledajte naš pažljivo odabran namještaj savršen za prostor ${name}.`,
    breadcrumbHome: 'Početna',
    breadcrumbFurniture: 'Namještaj',
    breadcrumbShopByRoom: 'Kupujte po prostoriji',
    shopByRoom: 'Kupujte po prostoriji',
    filtersHeading: 'Filtri',
    clearAll: 'Očisti sve',
    subcategoryHeading: 'Potkategorija',
    categoryHeading: 'Kategorija',
    brandHeading: 'Brend',
    needHelp: 'Trebate pomoć?',
    furnitureFor: (name: string) => `Namještaj – ${name}`,
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
    ctaHeading: 'Istražite ostale vrste prostorija',
    ctaText:
      'Pregledajte namještaj odabran za različite zone radnog prostora ili pogledajte naš cjelokupni katalog i pronađite točno ono što trebate.',
    viewAllRooms: 'Pogledajte sve prostorije',
    browseAllProducts: 'Pregledajte sve proizvode',
  },
} satisfies Record<Lang, RoomListingStrings>

export default dict
