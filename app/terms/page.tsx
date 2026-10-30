import type { Metadata } from 'next'
import { getServerLang } from '@/lib/i18n/server'
import LegalPage, { type LegalPageContent } from '@/components/legal/LegalPage'
import type { Lang } from '@/lib/i18n'

const meta = {
  en: {
    title: 'Terms of Service',
    description: 'Terms governing the use of the theofficecompany.eu website.',
  },
  hr: {
    title: 'Uvjeti korištenja',
    description: 'Uvjeti korištenja web stranice theofficecompany.eu.',
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
    title: 'Uvjeti korištenja',
    updatedLabel: 'Zadnja izmjena:',
    updatedDate: '30. listopada 2026.',
    intro: [
      'Ovi Uvjeti korištenja uređuju korištenje web stranice theofficecompany.eu kojom upravlja The Office Company d.o.o., Poljačka ul. 56, 10000 Zagreb, Hrvatska (dalje: "mi"). Pristupanjem stranici i njezinim korištenjem prihvaćate ove uvjete.',
    ],
    sections: [
      {
        heading: '1. Namjena stranice',
        paragraphs: [
          'Stranica služi za predstavljanje naših usluga i kataloga uredskog namještaja te za zaprimanje upita. Informacije o proizvodima, uključujući opise, fotografije i specifikacije, informativnog su karaktera i ne predstavljaju obvezujuću ponudu. Cijene i dostupnost proizvoda dogovaraju se na upit, a ugovori se sklapaju zasebnom pisanom ponudom i njezinim prihvatom.',
        ],
      },
      {
        heading: '2. Intelektualno vlasništvo',
        paragraphs: [
          'Sadržaj stranice — tekstovi, fotografije, grafike, logotip i dizajn — zaštićen je pravima intelektualnog vlasništva i ne smije se reproducirati ni koristiti u komercijalne svrhe bez našeg prethodnog pisanog odobrenja. Nazivi i logotipi brendova proizvođača koje zastupamo (npr. Haworth, Cassina, BuzziSpace i drugi) vlasništvo su njihovih nositelja i prikazani su isključivo radi predstavljanja asortimana.',
        ],
      },
      {
        heading: '3. Dopušteno korištenje',
        paragraphs: ['Prilikom korištenja stranice nije dopušteno:'],
        list: [
          'ometati rad stranice ili pokušavati neovlašteno pristupiti njezinim sustavima,',
          'koristiti sadržaj stranice za masovno preuzimanje ili preprodaju podataka,',
          'slati nezakonit, uvredljiv ili obmanjujući sadržaj putem kontaktnih obrazaca.',
        ],
      },
      {
        heading: '4. Isključenje odgovornosti',
        paragraphs: [
          'Sadržaj stranice objavljujemo s pažnjom, ali ne jamčimo njegovu potpunu točnost, potpunost ili neprekinutu dostupnost stranice. U najvećoj mjeri dopuštenoj propisima, ne odgovaramo za štetu nastalu korištenjem stranice ili oslanjanjem na objavljene informacije. Ništa u ovim uvjetima ne isključuje odgovornost koja se prema prisilnim propisima ne može isključiti.',
        ],
      },
      {
        heading: '5. Poveznice na stranice trećih strana',
        paragraphs: [
          'Stranica može sadržavati poveznice na web stranice trećih strana (npr. stranice proizvođača, društvene mreže). Za njihov sadržaj i pravila ne odgovaramo.',
        ],
      },
      {
        heading: '6. Zaštita osobnih podataka',
        paragraphs: [
          'Obradu osobnih podataka uređuju naša Pravila privatnosti i Pravila o kolačićima, dostupna putem poveznica u podnožju stranice.',
        ],
      },
      {
        heading: '7. Mjerodavno pravo i nadležnost',
        paragraphs: [
          'Na ove uvjete primjenjuje se hrvatsko pravo. Za sporove proizašle iz korištenja stranice nadležan je stvarno nadležni sud u Zagrebu, osim ako prisilni propisi ne određuju drugačije.',
        ],
      },
      {
        heading: '8. Izmjene uvjeta',
        paragraphs: [
          'Ove uvjete možemo povremeno izmijeniti. Važeća verzija uvijek je objavljena na ovoj stranici s naznačenim datumom zadnje izmjene.',
        ],
      },
    ],
    relatedLabel: 'Povezano',
    relatedLinks: [
      { label: 'Pravila privatnosti', href: '/privacy' },
      { label: 'Pravila o kolačićima', href: '/cookies' },
    ],
  },
  en: {
    tag: 'Legal',
    title: 'Terms of Service',
    updatedLabel: 'Last updated:',
    updatedDate: '30 October 2026',
    intro: [
      'These Terms of Service govern the use of the theofficecompany.eu website operated by The Office Company d.o.o., Poljačka ul. 56, 10000 Zagreb, Croatia ("we"). By accessing and using the site you accept these terms.',
    ],
    sections: [
      {
        heading: '1. Purpose of the site',
        paragraphs: [
          'The site presents our services and office furniture catalog and receives enquiries. Product information, including descriptions, photographs and specifications, is for information only and does not constitute a binding offer. Prices and availability are agreed on request, and contracts are concluded through a separate written quotation and its acceptance.',
        ],
      },
      {
        heading: '2. Intellectual property',
        paragraphs: [
          'The content of the site — texts, photographs, graphics, logo and design — is protected by intellectual property rights and may not be reproduced or used commercially without our prior written consent. Names and logos of the manufacturer brands we represent (e.g. Haworth, Cassina, BuzziSpace and others) belong to their respective owners and are displayed solely to present our range.',
        ],
      },
      {
        heading: '3. Acceptable use',
        paragraphs: ['When using the site you must not:'],
        list: [
          'disrupt the operation of the site or attempt unauthorised access to its systems,',
          'use the site content for bulk extraction or resale of data,',
          'submit unlawful, offensive or misleading content through the contact forms.',
        ],
      },
      {
        heading: '4. Disclaimer',
        paragraphs: [
          'We publish the site content with care, but we do not guarantee its complete accuracy or completeness, nor uninterrupted availability of the site. To the fullest extent permitted by law, we are not liable for damage arising from the use of the site or reliance on the published information. Nothing in these terms excludes liability that cannot be excluded under mandatory law.',
        ],
      },
      {
        heading: '5. Third-party links',
        paragraphs: [
          'The site may contain links to third-party websites (e.g. manufacturer sites, social networks). We are not responsible for their content or policies.',
        ],
      },
      {
        heading: '6. Personal data',
        paragraphs: [
          'The processing of personal data is governed by our Privacy Policy and Cookie Policy, available via the links in the site footer.',
        ],
      },
      {
        heading: '7. Governing law and jurisdiction',
        paragraphs: [
          'These terms are governed by Croatian law. Disputes arising from the use of the site fall under the jurisdiction of the competent court in Zagreb, unless mandatory law provides otherwise.',
        ],
      },
      {
        heading: '8. Changes to these terms',
        paragraphs: [
          'We may amend these terms from time to time. The current version is always published on this page with the date of the last change.',
        ],
      },
    ],
    relatedLabel: 'Related',
    relatedLinks: [
      { label: 'Privacy Policy', href: '/privacy' },
      { label: 'Cookie Policy', href: '/cookies' },
    ],
  },
}

export default async function TermsPage() {
  const lang = await getServerLang()
  return <LegalPage content={content[lang]} />
}
