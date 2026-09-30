import type { Lang } from '@/lib/i18n'

interface LayoutBackToTopDict {
  backToTop: string
}

const dict = {
  en: {
    backToTop: 'Back to top',
  },
  hr: {
    backToTop: 'Povratak na vrh',
  },
} satisfies Record<Lang, LayoutBackToTopDict>

export default dict
