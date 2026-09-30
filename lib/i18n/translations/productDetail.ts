import type { Lang } from '@/lib/i18n'

interface ProductDetailDict {
  breadcrumbHome: string
  breadcrumbFurniture: string
  badgeNew: string
  badgeFeatured: string
  imageWord: string
  thumbnailWord: string
  noImages: string
  skuLabel: string
  availableColors: string
  selected: string
  keyFeatures: string
  requestQuote: string
  datasheet: string
  contact: string
  worksGreatIn: string
  tabs: {
    overview: string
    specifications: string
    certifications: string
  }
  productOverview: string
  certificationsHeading: string
  specGroups: {
    general: string
    dimensions: string
    materials: string
    weight: string
    seat: string
    warranty: string
  }
  relatedHeading: string
  modalTitle: string
  close: string
  fullName: string
  emailAddress: string
  phoneNumber: string
  companyName: string
  quantity: string
  additionalRequirements: string
  messagePlaceholder: string
  sendQuoteRequest: string
  cancel: string
  quoteSentAlert: string
}

const dict: Record<Lang, ProductDetailDict> = {
  en: {
    breadcrumbHome: 'Home',
    breadcrumbFurniture: 'Furniture',
    badgeNew: 'New',
    badgeFeatured: 'Featured',
    imageWord: 'Image',
    thumbnailWord: 'Thumbnail',
    noImages: 'No images available',
    skuLabel: 'SKU:',
    availableColors: 'Available Colors',
    selected: 'Selected:',
    keyFeatures: 'Key Features',
    requestQuote: 'Request a Quote',
    datasheet: 'Datasheet',
    contact: 'Contact',
    worksGreatIn: 'Works Great In',
    tabs: {
      overview: 'Overview',
      specifications: 'Specifications',
      certifications: 'Certifications',
    },
    productOverview: 'Product Overview',
    certificationsHeading: 'Certifications & Standards',
    specGroups: {
      general: 'General',
      dimensions: 'Dimensions',
      materials: 'Materials',
      weight: 'Weight',
      seat: 'Seat',
      warranty: 'Warranty',
    },
    relatedHeading: 'You Might Also Like',
    modalTitle: 'Request a Quote',
    close: 'Close',
    fullName: 'Full Name',
    emailAddress: 'Email Address',
    phoneNumber: 'Phone Number',
    companyName: 'Company Name',
    quantity: 'Quantity',
    additionalRequirements: 'Additional Requirements',
    messagePlaceholder: 'Tell us about your project, preferred delivery date, or any special requirements...',
    sendQuoteRequest: 'Send Quote Request',
    cancel: 'Cancel',
    quoteSentAlert: "Quote request sent! We'll contact you soon.",
  },
  hr: {
    breadcrumbHome: 'Početna',
    breadcrumbFurniture: 'Namještaj',
    badgeNew: 'Novo',
    badgeFeatured: 'Istaknuto',
    imageWord: 'Slika',
    thumbnailWord: 'Minijatura',
    noImages: 'Nema dostupnih slika',
    skuLabel: 'SKU:',
    availableColors: 'Dostupne boje',
    selected: 'Odabrano:',
    keyFeatures: 'Ključne značajke',
    requestQuote: 'Zatražite ponudu',
    datasheet: 'Tehnički list',
    contact: 'Kontakt',
    worksGreatIn: 'Idealno za',
    tabs: {
      overview: 'Pregled',
      specifications: 'Specifikacije',
      certifications: 'Certifikati',
    },
    productOverview: 'Pregled proizvoda',
    certificationsHeading: 'Certifikati i standardi',
    specGroups: {
      general: 'Općenito',
      dimensions: 'Dimenzije',
      materials: 'Materijali',
      weight: 'Težina',
      seat: 'Sjedalo',
      warranty: 'Jamstvo',
    },
    relatedHeading: 'Moglo bi vas zanimati',
    modalTitle: 'Zatražite ponudu',
    close: 'Zatvori',
    fullName: 'Ime i prezime',
    emailAddress: 'E-mail adresa',
    phoneNumber: 'Broj telefona',
    companyName: 'Naziv tvrtke',
    quantity: 'Količina',
    additionalRequirements: 'Dodatni zahtjevi',
    messagePlaceholder: 'Recite nam nešto o svom projektu, željenom roku isporuke ili posebnim zahtjevima...',
    sendQuoteRequest: 'Pošaljite upit za ponudu',
    cancel: 'Odustani',
    quoteSentAlert: 'Upit za ponudu je poslan! Uskoro ćemo vas kontaktirati.',
  },
}

export default dict
