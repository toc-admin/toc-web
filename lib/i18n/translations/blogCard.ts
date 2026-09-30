import type { Lang } from '@/lib/i18n'

interface BlogCardDict {
  readMore: string
  continueReading: string
}

const dict: Record<Lang, BlogCardDict> = {
  en: {
    readMore: 'Read More',
    continueReading: 'Continue Reading',
  },
  hr: {
    readMore: 'Pročitajte više',
    continueReading: 'Nastavite čitati',
  },
}

export default dict
