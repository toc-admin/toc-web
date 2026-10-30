import type { Metadata } from 'next'
import { getServerLang } from '@/lib/i18n/server'
import LegalPage, { type LegalPageContent } from '@/components/legal/LegalPage'
import type { Lang } from '@/lib/i18n'

const meta = {
  en: {
    title: 'Privacy Policy',
    description:
      'How The Office Company d.o.o. collects, uses and protects your personal data.',
  },
  hr: {
    title: 'Pravila privatnosti',
    description:
      'Kako The Office Company d.o.o. prikuplja, koristi i štiti vaše osobne podatke.',
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
    title: 'Pravila privatnosti',
    updatedLabel: 'Zadnja izmjena:',
    updatedDate: '30. listopada 2026.',
    intro: [
      'Ova Pravila privatnosti objašnjavaju koje osobne podatke prikuplja The Office Company d.o.o., u koje svrhe, na kojoj pravnoj osnovi te koja su vaša prava. Podatke obrađujemo u skladu s Općom uredbom o zaštiti podataka (GDPR) i hrvatskim propisima o zaštiti osobnih podataka.',
    ],
    sections: [
      {
        heading: '1. Voditelj obrade',
        paragraphs: [
          'The Office Company d.o.o., Poljačka ul. 56, 10000 Zagreb, Hrvatska. Za sva pitanja o zaštiti podataka možete nas kontaktirati na info@theofficecompany.eu ili +385 91 3011 552.',
        ],
      },
      {
        heading: '2. Koje podatke prikupljamo i zašto',
        list: [
          'Kontaktni obrazac: ime, e-mail adresa, broj telefona (neobavezno) i sadržaj poruke — kako bismo odgovorili na vaš upit. Pravna osnova: radnje koje prethode sklapanju ugovora (čl. 6. st. 1. (b) GDPR-a), odnosno naš legitimni interes za odgovaranje na upite (čl. 6. st. 1. (f)).',
          'Tehnički podaci: prilikom posjeta stranici naš hosting pružatelj automatski bilježi IP adresu i osnovne podatke o pregledniku u poslužiteljskim zapisima, radi sigurnosti i ispravnog rada stranice. Pravna osnova: legitimni interes (čl. 6. st. 1. (f)).',
          'Kolačić jezika: pamti vaš odabir jezika (HR/EN). Funkcionalni je i ne koristi se za praćenje.',
        ],
      },
      {
        heading: '3. Izvršitelji obrade i primatelji',
        paragraphs: [
          'Za rad stranice koristimo pouzdane pružatelje usluga koji podatke obrađuju u naše ime:',
        ],
        list: [
          'Vercel Inc. — hosting web stranice (poslužiteljski zapisi).',
          'Supabase — baza podataka na kojoj se temelji sadržaj stranice (katalog, blog).',
          'Web3Forms — usluga dostave poruka s kontaktnog obrasca na našu e-mail adresu.',
          'Google LLC — Google Maps karta na kontakt stranici, koja se učitava isključivo nakon vašeg klika na "Učitaj kartu".',
        ],
        // Napomena: prijenos u treće zemlje opisujemo oprezno — bez tvrdnji o
        // konkretnim certifikatima pojedinih pružatelja
      },
      {
        heading: '4. Prijenos podataka izvan EU/EEA',
        paragraphs: [
          'Neki od navedenih pružatelja mogu obrađivati podatke na poslužiteljima izvan Europskog gospodarskog prostora (npr. u SAD-u). U tim se slučajevima prijenos temelji na odgovarajućim zaštitnim mjerama poput standardnih ugovornih klauzula Europske komisije ili EU-U.S. okvira za zaštitu privatnosti podataka.',
        ],
      },
      {
        heading: '5. Koliko dugo čuvamo podatke',
        paragraphs: [
          'Poruke zaprimljene putem kontaktnog obrasca čuvamo onoliko dugo koliko je potrebno za obradu vašeg upita i eventualnu daljnju poslovnu komunikaciju, a najdulje dvije godine od zadnjeg kontakta, osim ako propisi ne zahtijevaju dulje čuvanje. Poslužiteljski zapisi čuvaju se kratkotrajno u skladu s postavkama hosting pružatelja.',
        ],
      },
      {
        heading: '6. Vaša prava',
        paragraphs: ['U odnosu na svoje osobne podatke imate pravo na:'],
        list: [
          'pristup podacima koje o vama obrađujemo,',
          'ispravak netočnih podataka,',
          'brisanje podataka ("pravo na zaborav"),',
          'ograničenje obrade,',
          'prenosivost podataka,',
          'prigovor na obradu koja se temelji na legitimnom interesu.',
        ],
      },
      {
        heading: '7. Pritužba nadzornom tijelu',
        paragraphs: [
          'Ako smatrate da obradom vaših podataka kršimo propise, imate pravo podnijeti pritužbu Agenciji za zaštitu osobnih podataka (AZOP), Selska cesta 136, 10000 Zagreb, www.azop.hr.',
        ],
      },
      {
        heading: '8. Izmjene ovih pravila',
        paragraphs: [
          'Ova pravila možemo povremeno ažurirati. Važeća verzija uvijek je objavljena na ovoj stranici, s naznačenim datumom zadnje izmjene.',
        ],
      },
    ],
    relatedLabel: 'Povezano',
    relatedLinks: [{ label: 'Pravila o kolačićima', href: '/cookies' }],
  },
  en: {
    tag: 'Legal',
    title: 'Privacy Policy',
    updatedLabel: 'Last updated:',
    updatedDate: '30 October 2026',
    intro: [
      'This Privacy Policy explains what personal data The Office Company d.o.o. collects, for which purposes, on which legal basis, and what rights you have. We process data in accordance with the General Data Protection Regulation (GDPR) and applicable Croatian data protection law.',
    ],
    sections: [
      {
        heading: '1. Data controller',
        paragraphs: [
          'The Office Company d.o.o., Poljačka ul. 56, 10000 Zagreb, Croatia. For any data protection questions, contact us at info@theofficecompany.eu or +385 91 3011 552.',
        ],
      },
      {
        heading: '2. What data we collect and why',
        list: [
          'Contact form: name, e-mail address, phone number (optional) and your message — so we can respond to your enquiry. Legal basis: steps prior to entering into a contract (Art. 6(1)(b) GDPR) and our legitimate interest in answering enquiries (Art. 6(1)(f)).',
          'Technical data: when you visit the site, our hosting provider automatically records your IP address and basic browser information in server logs, for security and correct operation of the site. Legal basis: legitimate interest (Art. 6(1)(f)).',
          'Language cookie: remembers your language choice (HR/EN). It is functional and not used for tracking.',
        ],
      },
      {
        heading: '3. Processors and recipients',
        paragraphs: [
          'We use trusted service providers who process data on our behalf:',
        ],
        list: [
          'Vercel Inc. — website hosting (server logs).',
          'Supabase — the database powering the site content (catalog, blog).',
          'Web3Forms — delivery of contact form messages to our e-mail address.',
          'Google LLC — the Google Maps embed on the contact page, which loads only after you click "Load map".',
        ],
      },
      {
        heading: '4. Transfers outside the EU/EEA',
        paragraphs: [
          'Some of the listed providers may process data on servers outside the European Economic Area (e.g. in the USA). In such cases the transfer is based on appropriate safeguards such as the European Commission’s Standard Contractual Clauses or the EU-U.S. Data Privacy Framework.',
        ],
      },
      {
        heading: '5. How long we keep data',
        paragraphs: [
          'Messages received through the contact form are kept for as long as needed to handle your enquiry and any follow-up business communication, and no longer than two years after the last contact, unless the law requires longer retention. Server logs are retained short-term according to our hosting provider’s settings.',
        ],
      },
      {
        heading: '6. Your rights',
        paragraphs: ['Regarding your personal data, you have the right to:'],
        list: [
          'access the data we process about you,',
          'rectify inaccurate data,',
          'erasure ("right to be forgotten"),',
          'restriction of processing,',
          'data portability,',
          'object to processing based on legitimate interest.',
        ],
      },
      {
        heading: '7. Complaint to the supervisory authority',
        paragraphs: [
          'If you believe our processing of your data violates the law, you have the right to lodge a complaint with the Croatian Personal Data Protection Agency (AZOP), Selska cesta 136, 10000 Zagreb, www.azop.hr, or your local EU supervisory authority.',
        ],
      },
      {
        heading: '8. Changes to this policy',
        paragraphs: [
          'We may update this policy from time to time. The current version is always published on this page with the date of the last change.',
        ],
      },
    ],
    relatedLabel: 'Related',
    relatedLinks: [{ label: 'Cookie Policy', href: '/cookies' }],
  },
}

export default async function PrivacyPage() {
  const lang = await getServerLang()
  return <LegalPage content={content[lang]} />
}
