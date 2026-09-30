import type { Lang } from '@/lib/i18n'

interface AboutHighlightEntry {
  title: string
  description: string
}

interface HomeAboutDict {
  label: string
  heading: string
  intro: string
  contentHeading: string
  paragraph1: string
  paragraph2: string
  paragraph3: string
  learnMore: string
  highlights: AboutHighlightEntry[]
}

const dict: Record<Lang, HomeAboutDict> = {
  en: {
    label: 'About Us',
    heading: 'Who We Are',
    intro:
      "With over 10 years of experience, we are Croatia's leading provider of comprehensive office solutions, combining expert consulting, coworking management services, interior design and office furniture.",
    contentHeading: 'Transforming Places Into Productive Environments',
    paragraph1:
      "Founded with a vision to revolutionize how businesses approach their workspace, The Office Company has grown to become Croatia's most trusted partner in office solutions.",
    paragraph2:
      'We combine deep industry expertise with a passion for design, delivering spaces that not only look exceptional but drive real business results. Our team of specialists works closely with each client to understand their unique needs and craft solutions that exceed expectations.',
    paragraph3:
      'We create workspaces that inspire, motivate, and perform, regardless of the size of your organization.',
    learnMore: 'Learn More About Us',
    highlights: [
      {
        title: 'Expert Consultation',
        description:
          'Strategic workspace planning tailored to your business needs and growth objectives.',
      },
      {
        title: 'Premium Quality',
        description:
          'World-class furniture and materials from leading global brands.',
      },
      {
        title: 'Full-Service Support',
        description:
          'From concept to completion, we manage every aspect of your workspace transformation.',
      },
      {
        title: 'Proven Results',
        description:
          'Delivering measurable improvements in productivity and employee satisfaction.',
      },
    ],
  },
  hr: {
    label: 'O nama',
    heading: 'Tko smo mi',
    intro:
      'S više od 10 godina iskustva, vodeći smo hrvatski pružatelj cjelovitih uredskih rješenja koji objedinjuje stručno savjetovanje, upravljanje coworking prostorima, dizajn interijera i uredski namještaj.',
    contentHeading: 'Pretvaramo prostore u produktivna okruženja',
    paragraph1:
      'Osnovana s vizijom da promijeni način na koji tvrtke pristupaju svom radnom prostoru, The Office Company izrasla je u najpouzdanijeg hrvatskog partnera za uredska rješenja.',
    paragraph2:
      'Spajamo duboko poznavanje industrije sa strašću prema dizajnu, stvarajući prostore koji ne samo da izgledaju iznimno, već donose stvarne poslovne rezultate. Naš tim stručnjaka blisko surađuje sa svakim klijentom kako bi razumio njegove jedinstvene potrebe i osmislio rješenja koja nadmašuju očekivanja.',
    paragraph3:
      'Stvaramo radne prostore koji inspiriraju, motiviraju i postižu rezultate, bez obzira na veličinu vaše organizacije.',
    learnMore: 'Saznajte više o nama',
    highlights: [
      {
        title: 'Stručno savjetovanje',
        description:
          'Strateško planiranje radnog prostora prilagođeno potrebama vašeg poslovanja i ciljevima rasta.',
      },
      {
        title: 'Vrhunska kvaliteta',
        description:
          'Namještaj i materijali svjetske klase vodećih globalnih brendova.',
      },
      {
        title: 'Cjelovita podrška',
        description:
          'Od koncepta do realizacije, upravljamo svakim aspektom preobrazbe vašeg radnog prostora.',
      },
      {
        title: 'Dokazani rezultati',
        description:
          'Ostvarujemo mjerljiva poboljšanja produktivnosti i zadovoljstva zaposlenika.',
      },
    ],
  },
}

export default dict
