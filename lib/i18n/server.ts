import { cookies, headers } from 'next/headers'
import { DEFAULT_LANG, LANG_COOKIE, isLang, type Lang } from './index'

// Resolves the request language on the server. The middleware derives it
// from the URL (/en prefix) and passes it via the x-lang header; the cookie
// remains as a fallback. Falls back to the default language when called
// outside a request scope (e.g. static generation).
export async function getServerLang(): Promise<Lang> {
  try {
    const headerStore = await headers()
    const headerLang = headerStore.get('x-lang')
    if (isLang(headerLang)) return headerLang

    const cookieStore = await cookies()
    const value = cookieStore.get(LANG_COOKIE)?.value
    return isLang(value) ? value : DEFAULT_LANG
  } catch {
    return DEFAULT_LANG
  }
}

// Returns the language-independent pathname of the current request
// (set by the middleware), e.g. "/about" for both /about and /en/about.
export async function getServerPathname(): Promise<string> {
  try {
    const headerStore = await headers()
    return headerStore.get('x-pathname') || '/'
  } catch {
    return '/'
  }
}
