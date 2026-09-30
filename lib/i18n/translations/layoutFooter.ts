import type { Lang } from '@/lib/i18n'

interface LayoutFooterDict {
  tagline: string
  companyHeading: string
  servicesHeading: string
  contactHeading: string
  home: string
  aboutUs: string
  services: string
  blog: string
  contact: string
  officeConsulting: string
  officeManagement: string
  designFurniture: string
  privacyPolicy: string
  cookiePolicy: string
  termsOfService: string
  addressLabel: string
  phoneLabel: string
  emailLabel: string
  cityCountry: string
  rightsReserved: string
  credit: string
}

const dict = {
  en: {
    tagline:
      'Creating inspiring workspaces that drive productivity, foster collaboration, and elevate business success across the region.',
    companyHeading: 'Company',
    servicesHeading: 'Services',
    contactHeading: 'Contact',
    home: 'Home',
    aboutUs: 'About Us',
    services: 'Services',
    blog: 'Blog',
    contact: 'Contact',
    officeConsulting: 'Office Consulting',
    officeManagement: 'Office Management',
    designFurniture: 'Design & Furniture',
    privacyPolicy: 'Privacy Policy',
    cookiePolicy: 'Cookie Policy',
    termsOfService: 'Terms of Service',
    addressLabel: 'Address',
    phoneLabel: 'Phone',
    emailLabel: 'Email',
    cityCountry: '10000 Zagreb, Croatia',
    rightsReserved: 'All rights reserved.',
    credit: 'Website by',
  },
  hr: {
    tagline:
      'Stvaramo inspirativne radne prostore koji potiču produktivnost, jačaju suradnju i pridonose poslovnom uspjehu diljem regije.',
    companyHeading: 'Tvrtka',
    servicesHeading: 'Usluge',
    contactHeading: 'Kontakt',
    home: 'Početna',
    aboutUs: 'O nama',
    services: 'Usluge',
    blog: 'Blog',
    contact: 'Kontakt',
    officeConsulting: 'Uredsko savjetovanje',
    officeManagement: 'Upravljanje uredom',
    designFurniture: 'Dizajn i namještaj',
    privacyPolicy: 'Politika privatnosti',
    cookiePolicy: 'Politika kolačića',
    termsOfService: 'Uvjeti korištenja',
    addressLabel: 'Adresa',
    phoneLabel: 'Telefon',
    emailLabel: 'E-mail',
    cityCountry: '10000 Zagreb, Hrvatska',
    rightsReserved: 'Sva prava pridržana.',
    credit: 'Izrada:',
  },
} satisfies Record<Lang, LayoutFooterDict>

export default dict
