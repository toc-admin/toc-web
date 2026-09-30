import type { Lang } from '@/lib/i18n'

interface ProductCardDict {
  noImage: string
  badgeNew: string
  badgeFeatured: string
  quickView: string
  viewMore: string
}

const dict: Record<Lang, ProductCardDict> = {
  en: {
    noImage: 'No Image Available',
    badgeNew: 'New',
    badgeFeatured: 'Featured',
    quickView: 'Quick View',
    viewMore: 'View More',
  },
  hr: {
    noImage: 'Slika nije dostupna',
    badgeNew: 'Novo',
    badgeFeatured: 'Izdvojeno',
    quickView: 'Brzi pregled',
    viewMore: 'Pogledajte više',
  },
}

export default dict
