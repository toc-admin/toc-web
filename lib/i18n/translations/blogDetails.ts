import type { Lang } from '@/lib/i18n'

interface BlogDetailsDict {
  metaNotFoundTitle: string
  metaTitleSuffix: string
  back: string
  categoryFallback: string
  infographic: string
  infographicAlt: string
  faqTitle: string
  relatedArticles: string
  readMore: string
  viewAllArticles: string
  notFoundTitle: string
  notFoundText: string
  backToBlog: string
}

const dict: Record<Lang, BlogDetailsDict> = {
  en: {
    metaNotFoundTitle: 'Article Not Found | Blog',
    metaTitleSuffix: 'Blog',
    back: 'Back',
    categoryFallback: 'Article',
    infographic: 'Infographic',
    infographicAlt: '{name} infographic',
    faqTitle: 'Frequently Asked Questions',
    relatedArticles: 'Related Articles',
    readMore: 'Read More',
    viewAllArticles: 'View All Articles',
    notFoundTitle: 'Article Not Found',
    notFoundText: "Sorry, we couldn't find the article you're looking for.",
    backToBlog: 'Back to Blog',
  },
  hr: {
    metaNotFoundTitle: 'Članak nije pronađen | Blog',
    metaTitleSuffix: 'Blog',
    back: 'Natrag',
    categoryFallback: 'Članak',
    infographic: 'Infografika',
    infographicAlt: 'Infografika: {name}',
    faqTitle: 'Često postavljana pitanja',
    relatedArticles: 'Povezani članci',
    readMore: 'Pročitajte više',
    viewAllArticles: 'Pogledajte sve članke',
    notFoundTitle: 'Članak nije pronađen',
    notFoundText: 'Nažalost, nismo pronašli članak koji tražite.',
    backToBlog: 'Natrag na blog',
  },
}

export default dict
