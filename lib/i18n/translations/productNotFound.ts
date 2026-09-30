import type { Lang } from '@/lib/i18n'

interface ProductNotFoundDict {
  metaTitle: string
  title: string
  description: string
  browseAll: string
  goHome: string
}

const dict: Record<Lang, ProductNotFoundDict> = {
  en: {
    metaTitle: 'Product Not Found',
    title: 'Product Not Found',
    description: "Sorry, we couldn't find the product you're looking for. It may have been removed or the link might be incorrect.",
    browseAll: 'Browse All Products',
    goHome: 'Go Home',
  },
  hr: {
    metaTitle: 'Proizvod nije pronađen',
    title: 'Proizvod nije pronađen',
    description: 'Nažalost, ne možemo pronaći proizvod koji tražite. Možda je uklonjen ili je poveznica neispravna.',
    browseAll: 'Pregledajte sve proizvode',
    goHome: 'Natrag na početnu',
  },
}

export default dict
