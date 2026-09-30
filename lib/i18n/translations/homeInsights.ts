import type { Lang } from '@/lib/i18n'

interface HomeInsightsDict {
  label: string
  headingLine1: string
  headingLine2: string
  intro: string
  viewAll: string
}

const dict: Record<Lang, HomeInsightsDict> = {
  en: {
    label: 'Latest News',
    headingLine1: 'Market',
    headingLine2: 'Insights',
    intro:
      'Stay ahead with our latest analysis, trends, and insights from the serviced office industry.',
    viewAll: 'View All',
  },
  hr: {
    label: 'Najnovije vijesti',
    headingLine1: 'Tržišni',
    headingLine2: 'uvidi',
    intro:
      'Budite korak ispred uz naše najnovije analize, trendove i uvide iz industrije servisiranih ureda.',
    viewAll: 'Pogledaj sve',
  },
}

export default dict
