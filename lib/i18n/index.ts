export type Lang = 'en' | 'hr'

export const DEFAULT_LANG: Lang = 'hr'
export const LANGS: Lang[] = ['hr', 'en']
export const LANG_COOKIE = 'NEXT_LOCALE'

export function isLang(value: unknown): value is Lang {
  return value === 'en' || value === 'hr'
}
