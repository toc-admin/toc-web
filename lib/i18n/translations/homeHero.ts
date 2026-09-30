import type { Lang } from '@/lib/i18n'

interface HomeHeroDict {
  label: string
  headline1: string
  headline2Accent: string
  headline2Rest: string
  headline3: string
  subtext: string
  ctaServices: string
  ctaContact: string
  scrollDown: string
}

const dict: Record<Lang, HomeHeroDict> = {
  en: {
    label: 'Premium Workspace Solutions',
    headline1: 'We Create',
    headline2Accent: 'Places',
    headline2Rest: 'Where',
    headline3: 'People Love To Work',
    subtext:
      'Transforming workspaces into inspiring environments that drive productivity, foster collaboration, and elevate business success.',
    ctaServices: 'Explore Services',
    ctaContact: 'Contact Us',
    scrollDown: 'Scroll Down',
  },
  hr: {
    label: 'Premium rješenja za radne prostore',
    headline1: 'Stvaramo',
    headline2Accent: 'prostore',
    headline2Rest: 'u kojima',
    headline3: 'ljudi vole raditi',
    subtext:
      'Pretvaramo radne prostore u inspirativna okruženja koja potiču produktivnost, njeguju suradnju i podižu poslovni uspjeh.',
    ctaServices: 'Istražite usluge',
    ctaContact: 'Kontaktirajte nas',
    scrollDown: 'Pomaknite se dolje',
  },
}

export default dict
