import type { Lang } from './index'

// Croatian translations for catalog entities whose names/descriptions live in
// the database (categories, rooms, subcategories). Keyed by slug or exact
// English value; falls back to the database value when no translation exists.

const categoryNames: Record<string, string> = {
  'chairs': 'Stolice',
  'desks-tables': 'Stolovi i radni stolovi',
  'storage-solutions': 'Rješenja za pohranu',
  'acoustic-solutions': 'Akustična rješenja',
  'accessories-lighting': 'Dodaci i rasvjeta',
  'lounge': 'Lounge',
}

const categoryDescriptions: Record<string, string> = {
  'chairs': 'Cjelovita rješenja za sjedenje za svaki radni prostor.',
  'desks-tables': 'Od direktorskih stolova do suradničkih radnih stanica',
  'storage-solutions': 'Organizirajte svoj radni prostor sa stilom i učinkovitošću',
  'acoustic-solutions': 'Stvorite privatnost i smanjite buku u otvorenim uredima.',
  'accessories-lighting': 'Upotpunite svoj prostor savršenom rasvjetom i detaljima.',
  'lounge': 'Udobni i stilski prostori za suradnju.',
}

const roomNames: Record<string, string> = {
  'reception-area': 'Recepcija',
  'meeting-room': 'Sala za sastanke',
  'outdoor': 'Vanjski prostor',
  'lounge-area': 'Lounge zona',
  'private-office': 'Privatni ured',
  'home-office': 'Kućni ured',
}

const roomDescriptions: Record<string, string> = {
  'reception-area': 'Ostavite snažan prvi dojam.',
  'meeting-room': 'Prostori za suradnju koji inspiriraju.',
  'outdoor': 'Proširite svoj radni prostor na otvoreno.',
  'lounge-area': 'Opuštene zone za neformalnu suradnju.',
  'private-office': 'Reprezentativni prostori za fokusiran rad.',
  'home-office': 'Radni prostor za produktivan rad od kuće.',
}

// Keyed by the exact subcategory value stored on products
const subcategoryNames: Record<string, string> = {
  'Lounge/Cafe': 'Lounge/kafić',
  'Meeting': 'Sastanci',
  'Lounge': 'Lounge',
  'Office desk': 'Uredski stolovi',
  'Cafe': 'Kafić',
  'Office chairs': 'Uredske stolice',
  'Phone booth': 'Telefonske kabine',
}

export function tCategoryName(lang: Lang, slug: string, fallback: string): string {
  return lang === 'hr' ? categoryNames[slug] ?? fallback : fallback
}

export function tCategoryDescription(lang: Lang, slug: string, fallback: string): string {
  return lang === 'hr' ? categoryDescriptions[slug] ?? fallback : fallback
}

export function tRoomName(lang: Lang, slug: string, fallback: string): string {
  return lang === 'hr' ? roomNames[slug] ?? fallback : fallback
}

export function tRoomDescription(lang: Lang, slug: string, fallback: string): string {
  return lang === 'hr' ? roomDescriptions[slug] ?? fallback : fallback
}

export function tSubcategory(lang: Lang, value: string): string {
  return lang === 'hr' ? subcategoryNames[value] ?? value : value
}
