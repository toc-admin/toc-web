export type Lang = 'en' | 'hr'

export const DEFAULT_LANG: Lang = 'hr'
export const LANGS: Lang[] = ['hr', 'en']
export const LANG_COOKIE = 'NEXT_LOCALE'

export function isLang(value: unknown): value is Lang {
  return value === 'en' || value === 'hr'
}

// Removes the /en prefix from a pathname ("/en/about" -> "/about", "/en" -> "/")
export function stripLangPrefix(pathname: string): string {
  return pathname.replace(/^\/en(?=\/|$)/, '') || '/'
}

// Builds the URL for a path in the given language. Croatian (default) lives
// on unprefixed URLs, English under /en.
export function localizePath(pathname: string, lang: Lang): string {
  const bare = stripLangPrefix(pathname)
  if (lang !== 'en') return bare
  return bare === '/' ? '/en' : `/en${bare}`
}
