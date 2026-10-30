import type { Metadata } from 'next'
import { getServerLang } from '@/lib/i18n/server'
import LegalPage, { type LegalPageContent } from '@/components/legal/LegalPage'
import type { Lang } from '@/lib/i18n'

const meta = {
  en: {
    title: 'Cookie Policy',
    description: 'Which cookies theofficecompany.eu uses and why.',
  },
  hr: {
    title: 'Pravila o kolačićima',
    description: 'Koje kolačiće koristi theofficecompany.eu i zašto.',
  },
}

export async function generateMetadata(): Promise<Metadata> {
  const lang = await getServerLang()
  return {
    title: meta[lang].title,
    description: meta[lang].description,
  }
}

const content: Record<Lang, LegalPageContent> = {
  hr: {
    tag: 'Pravno',
    title: 'Pravila o kolačićima',
    updatedLabel: 'Zadnja izmjena:',
    updatedDate: '30. listopada 2026.',
    intro: [
      'Kolačići (cookies) su male tekstualne datoteke koje web stranica sprema u vaš preglednik. Ova stranica koristi minimalan broj kolačića — ne koristimo analitičke, oglašivačke ni druge kolačiće za praćenje.',
    ],
    sections: [
      {
        heading: '1. Kolačići koje postavljamo',
        list: [
          'NEXT_LOCALE — funkcionalni kolačić koji pamti vaš odabir jezika (hrvatski ili engleski). Traje 12 mjeseci. Ne koristi se za praćenje i ne dijeli se s trećim stranama.',
        ],
        paragraphs: [
          'Budući da je riječ isključivo o funkcionalnom kolačiću nužnom za rad stranice, za njega prema propisima nije potrebna privola, pa stranica ne prikazuje cookie banner.',
        ],
      },
      {
        heading: '2. Kolačići trećih strana',
        paragraphs: [
          'Na kontakt stranici nalazi se Google Maps karta koja se učitava tek nakon što kliknete "Učitaj kartu". Tek tada Google može postaviti vlastite kolačiće u skladu sa svojim pravilima privatnosti (policies.google.com). Ako kartu ne učitate, Google kolačići se ne postavljaju.',
        ],
      },
      {
        heading: '3. Upravljanje kolačićima',
        paragraphs: [
          'Kolačiće možete izbrisati ili blokirati u postavkama svog preglednika. Ako izbrišete kolačić NEXT_LOCALE, stranica će se vratiti na zadani jezik.',
        ],
      },
    ],
    relatedLabel: 'Povezano',
    relatedLinks: [{ label: 'Pravila privatnosti', href: '/privacy' }],
  },
  en: {
    tag: 'Legal',
    title: 'Cookie Policy',
    updatedLabel: 'Last updated:',
    updatedDate: '30 October 2026',
    intro: [
      'Cookies are small text files a website stores in your browser. This site uses a minimal number of cookies — we use no analytics, advertising or other tracking cookies.',
    ],
    sections: [
      {
        heading: '1. Cookies we set',
        list: [
          'NEXT_LOCALE — a functional cookie that remembers your language choice (Croatian or English). It lasts 12 months, is not used for tracking and is not shared with third parties.',
        ],
        paragraphs: [
          'As this is solely a functional cookie necessary for the site to work, no consent is required for it under applicable rules, which is why the site shows no cookie banner.',
        ],
      },
      {
        heading: '2. Third-party cookies',
        paragraphs: [
          'The contact page contains a Google Maps embed that loads only after you click "Load map". Only then may Google set its own cookies under its privacy policy (policies.google.com). If you do not load the map, no Google cookies are set.',
        ],
      },
      {
        heading: '3. Managing cookies',
        paragraphs: [
          'You can delete or block cookies in your browser settings. If you delete the NEXT_LOCALE cookie, the site reverts to the default language.',
        ],
      },
    ],
    relatedLabel: 'Related',
    relatedLinks: [{ label: 'Privacy Policy', href: '/privacy' }],
  },
}

export default async function CookiesPage() {
  const lang = await getServerLang()
  return <LegalPage content={content[lang]} />
}
