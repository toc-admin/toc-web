import type { Lang } from '@/lib/i18n'

// Shared dictionary for NavBar and MobileMenu
interface LayoutNavDict {
  home: string
  about: string
  aboutUs: string
  services: string
  furniture: string
  blog: string
  contact: string
  shopByCategory: string
  shopByRoom: string
  viewAllProducts: string
  view: string
  toggleMenu: string
  switchToCroatian: string
  switchToEnglish: string
}

const dict = {
  en: {
    home: 'Home',
    about: 'About',
    aboutUs: 'About Us',
    services: 'Services',
    furniture: 'Furniture',
    blog: 'Blog',
    contact: 'Contact',
    shopByCategory: 'Shop by Category',
    shopByRoom: 'Shop by Room',
    viewAllProducts: 'View All Products →',
    view: 'View',
    toggleMenu: 'Toggle menu',
    switchToCroatian: 'Switch to Croatian',
    switchToEnglish: 'Switch to English',
  },
  hr: {
    home: 'Početna',
    about: 'O nama',
    aboutUs: 'O nama',
    services: 'Usluge',
    furniture: 'Namještaj',
    blog: 'Blog',
    contact: 'Kontakt',
    shopByCategory: 'Kupujte po kategoriji',
    shopByRoom: 'Kupujte po prostoriji',
    viewAllProducts: 'Pogledajte sve proizvode →',
    view: 'Pogledajte',
    toggleMenu: 'Otvorite ili zatvorite izbornik',
    switchToCroatian: 'Prebacite na hrvatski',
    switchToEnglish: 'Prebacite na engleski',
  },
} satisfies Record<Lang, LayoutNavDict>

export default dict
