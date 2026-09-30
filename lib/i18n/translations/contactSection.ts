import type { Lang } from '@/lib/i18n'

interface ContactMethod {
  title: string
  description: string
}

interface ContactSectionDict {
  eyebrow: string
  headingLine1: string
  headingHighlight: string
  intro: string
  methods: {
    email: ContactMethod
    call: ContactMethod
    visit: ContactMethod
  }
  contactInfoTitle: string
  followUs: string
  ctaTitle: string
  ctaText: string
  benefits: string[]
  scheduleConsultation: string
  downloadPortfolio: string
}

const dict: Record<Lang, ContactSectionDict> = {
  en: {
    eyebrow: 'Get In Touch',
    headingLine1: "Let's Create Your",
    headingHighlight: 'Perfect Workspace',
    intro: "Ready to transform your office space? Get in touch with our team and let's discuss how we can help you create an inspiring workplace.",
    methods: {
      email: {
        title: 'Email Us',
        description: 'Drop us a line anytime',
      },
      call: {
        title: 'Call Us',
        description: 'Mon-Fri from 9am to 6pm',
      },
      visit: {
        title: 'Visit Us',
        description: 'Come say hello',
      },
    },
    contactInfoTitle: 'Contact Information',
    followUs: 'Follow Us',
    ctaTitle: 'Start Your Project Today',
    ctaText: "Whether you're planning a new office, upgrading your current space, or exploring management solutions, we're here to help.",
    benefits: [
      'Free consultation',
      'Custom design proposals',
      'Transparent pricing',
      'Expert project management',
    ],
    scheduleConsultation: 'Schedule a Consultation',
    downloadPortfolio: 'Download Portfolio',
  },
  hr: {
    eyebrow: 'Javite nam se',
    headingLine1: 'Stvorimo vaš',
    headingHighlight: 'savršeni radni prostor',
    intro: 'Spremni ste preobraziti svoj uredski prostor? Javite se našem timu i razgovarajmo o tome kako vam možemo pomoći stvoriti nadahnjujuće radno okruženje.',
    methods: {
      email: {
        title: 'Pošaljite nam e-mail',
        description: 'Pišite nam u bilo kojem trenutku',
      },
      call: {
        title: 'Nazovite nas',
        description: 'Pon-pet od 9 do 18 h',
      },
      visit: {
        title: 'Posjetite nas',
        description: 'Svratite i pozdravite nas',
      },
    },
    contactInfoTitle: 'Kontakt podaci',
    followUs: 'Pratite nas',
    ctaTitle: 'Započnite svoj projekt danas',
    ctaText: 'Bilo da planirate novi ured, unapređujete postojeći prostor ili razmatrate rješenja za upravljanje, tu smo da vam pomognemo.',
    benefits: [
      'Besplatna konzultacija',
      'Prilagođeni dizajnerski prijedlozi',
      'Transparentne cijene',
      'Stručno vođenje projekta',
    ],
    scheduleConsultation: 'Dogovorite konzultaciju',
    downloadPortfolio: 'Preuzmite portfolio',
  },
}

export default dict
