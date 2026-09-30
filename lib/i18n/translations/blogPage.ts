import type { Lang } from '@/lib/i18n'

interface BlogPageDict {
  metaTitle: string
  metaDescription: string
  ogImageAlt: string
  heroTag: string
  heroTitleLine1: string
  heroTitleLine2: string
  heroDescription: string
  featuredBadge: string
  latestArticle: string
  readArticle: string
  allArticles: string
  filterAll: string
  countOne: string
  countFew: string
  countOther: string
  emptyTitle: string
  emptyCategory: string
  emptyDefault: string
  viewAllArticles: string
  newsletterTag: string
  newsletterTitle: string
  newsletterDescription: string
  emailPlaceholder: string
  subscribe: string
}

const dict: Record<Lang, BlogPageDict> = {
  en: {
    metaTitle: 'Blog | Insights & Tips',
    metaDescription:
      "Stay informed with The Office Company's blog. Read expert insights on office trends, productivity tips, and the future of workspaces.",
    ogImageAlt: 'The Office Company Blog',
    heroTag: 'Our Blog',
    heroTitleLine1: 'Insights &',
    heroTitleLine2: 'Market News',
    heroDescription:
      "Stay informed with expert insights on office trends, productivity tips, and the future of workspaces. Discover how we're shaping the industry.",
    featuredBadge: 'Featured',
    latestArticle: 'Latest Article',
    readArticle: 'Read Article',
    allArticles: 'All Articles',
    filterAll: 'All',
    countOne: 'Article',
    countFew: 'Articles',
    countOther: 'Articles',
    emptyTitle: 'No Articles Found',
    emptyCategory: 'No articles in this category yet. Try selecting a different category.',
    emptyDefault: 'Check back soon for insights and updates from The Office Company.',
    viewAllArticles: 'View All Articles',
    newsletterTag: 'Stay Updated',
    newsletterTitle: 'Subscribe to Our Newsletter',
    newsletterDescription:
      'Get the latest insights, trends, and news delivered straight to your inbox. Join our community of workspace innovators.',
    emailPlaceholder: 'Enter your email',
    subscribe: 'Subscribe',
  },
  hr: {
    metaTitle: 'Blog | Uvidi i savjeti',
    metaDescription:
      'Budite informirani uz blog tvrtke The Office Company. Pročitajte stručne uvide o uredskim trendovima, savjete za produktivnost i budućnost radnih prostora.',
    ogImageAlt: 'The Office Company Blog',
    heroTag: 'Naš blog',
    heroTitleLine1: 'Uvidi i',
    heroTitleLine2: 'novosti s tržišta',
    heroDescription:
      'Budite informirani uz stručne uvide o uredskim trendovima, savjete za produktivnost i budućnost radnih prostora. Otkrijte kako oblikujemo industriju.',
    featuredBadge: 'Izdvojeno',
    latestArticle: 'Najnoviji članak',
    readArticle: 'Pročitajte članak',
    allArticles: 'Svi članci',
    filterAll: 'Sve',
    countOne: 'članak',
    countFew: 'članka',
    countOther: 'članaka',
    emptyTitle: 'Nema pronađenih članaka',
    emptyCategory: 'U ovoj kategoriji još nema članaka. Pokušajte odabrati drugu kategoriju.',
    emptyDefault: 'Navratite uskoro po nove uvide i novosti tvrtke The Office Company.',
    viewAllArticles: 'Pogledajte sve članke',
    newsletterTag: 'Ostanite informirani',
    newsletterTitle: 'Pretplatite se na naš newsletter',
    newsletterDescription:
      'Primajte najnovije uvide, trendove i novosti izravno u svoj sandučić. Pridružite se našoj zajednici inovatora radnih prostora.',
    emailPlaceholder: 'Unesite svoju e-mail adresu',
    subscribe: 'Pretplatite se',
  },
}

export default dict
