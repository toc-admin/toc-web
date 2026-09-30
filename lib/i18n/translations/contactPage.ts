import type { Lang } from '@/lib/i18n'

interface ContactCard {
  title: string
  details: string[]
}

interface ContactPageDict {
  metaTitle: string
  metaDescription: string
  ogImageAlt: string
  eyebrow: string
  heroTitleLine1: string
  heroTitleHighlight: string
  heroTitleLine3: string
  heroText: string
  cards: {
    visit: ContactCard
    call: ContactCard
    email: ContactCard
  }
  toastSuccess: string
  toastError: string
  toastNetwork: string
  formTitle: string
  nameLabel: string
  namePlaceholder: string
  emailLabel: string
  emailPlaceholder: string
  phoneLabel: string
  phonePlaceholder: string
  messageLabel: string
  messagePlaceholder: string
  sendButton: string
  sendingButton: string
  mapIframeTitle: string
  mapOfficeTitle: string
  mapAddressLine1: string
  mapAddressLine2: string
}

const dict: Record<Lang, ContactPageDict> = {
  en: {
    metaTitle: 'Contact Us | Get in Touch',
    metaDescription: 'Have questions? Contact The Office Company today. Our team is ready to assist you with office space solutions that fit your needs.',
    ogImageAlt: 'The Office Company Contact',
    eyebrow: 'Get In Touch',
    heroTitleLine1: "Let's Create",
    heroTitleHighlight: 'Your Perfect',
    heroTitleLine3: 'Workspace',
    heroText: "Have questions? Our team is ready to assist you with office space solutions that fit your needs. Reach out and let's start the conversation.",
    cards: {
      visit: {
        title: 'Visit Us',
        details: ['Poljačka ul. 56', '10000 Zagreb', 'Croatia'],
      },
      call: {
        title: 'Call Us',
        details: ['+385 91 3011 552', 'Mon-Fri: 9am - 6pm'],
      },
      email: {
        title: 'Email Us',
        details: ['info@theofficecompany.eu', "We'll reply within 24h"],
      },
    },
    toastSuccess: "Thank you! We'll get back to you soon.",
    toastError: 'Oops! Something went wrong. Please try again.',
    toastNetwork: 'Network error. Please check your connection.',
    formTitle: 'Send Us a Message',
    nameLabel: 'Your Name *',
    namePlaceholder: 'John Doe',
    emailLabel: 'Your Email *',
    emailPlaceholder: 'john@company.com',
    phoneLabel: 'Phone Number',
    phonePlaceholder: '+385 91 234 5678',
    messageLabel: 'Your Message *',
    messagePlaceholder: 'Tell us about your project...',
    sendButton: 'Send Message',
    sendingButton: 'Sending...',
    mapIframeTitle: 'The Office Company Location',
    mapOfficeTitle: 'Our Office',
    mapAddressLine1: 'Poljačka ul. 56',
    mapAddressLine2: '10000 Zagreb, Croatia',
  },
  hr: {
    metaTitle: 'Kontaktirajte nas',
    metaDescription: 'Imate pitanja? Kontaktirajte The Office Company već danas. Naš tim spreman je pomoći vam s rješenjima za uredske prostore koja odgovaraju vašim potrebama.',
    ogImageAlt: 'The Office Company – kontakt',
    eyebrow: 'Javite nam se',
    heroTitleLine1: 'Stvorimo',
    heroTitleHighlight: 'vaš savršeni',
    heroTitleLine3: 'radni prostor',
    heroText: 'Imate pitanja? Naš tim spreman je pomoći vam s rješenjima za uredske prostore koja odgovaraju vašim potrebama. Javite nam se i započnimo razgovor.',
    cards: {
      visit: {
        title: 'Posjetite nas',
        details: ['Poljačka ul. 56', '10000 Zagreb', 'Hrvatska'],
      },
      call: {
        title: 'Nazovite nas',
        details: ['+385 91 3011 552', 'Pon-pet: 9 - 18 h'],
      },
      email: {
        title: 'Pošaljite nam e-mail',
        details: ['info@theofficecompany.eu', 'Odgovaramo u roku od 24 sata'],
      },
    },
    toastSuccess: 'Hvala vam! Javit ćemo vam se uskoro.',
    toastError: 'Ups! Nešto je pošlo po krivu. Molimo pokušajte ponovno.',
    toastNetwork: 'Greška u mreži. Provjerite internetsku vezu.',
    formTitle: 'Pošaljite nam poruku',
    nameLabel: 'Vaše ime *',
    namePlaceholder: 'Ivan Horvat',
    emailLabel: 'Vaša e-mail adresa *',
    emailPlaceholder: 'ivan@tvrtka.hr',
    phoneLabel: 'Broj telefona',
    phonePlaceholder: '+385 91 234 5678',
    messageLabel: 'Vaša poruka *',
    messagePlaceholder: 'Recite nam nešto o svom projektu...',
    sendButton: 'Pošaljite poruku',
    sendingButton: 'Slanje...',
    mapIframeTitle: 'Lokacija The Office Company',
    mapOfficeTitle: 'Naš ured',
    mapAddressLine1: 'Poljačka ul. 56',
    mapAddressLine2: '10000 Zagreb, Hrvatska',
  },
}

export default dict
