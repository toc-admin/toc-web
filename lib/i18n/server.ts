import { cookies } from 'next/headers'
import { DEFAULT_LANG, LANG_COOKIE, isLang, type Lang } from './index'

// Reads the language cookie on the server. Falls back to the default
// language when called outside a request scope (e.g. static generation).
export async function getServerLang(): Promise<Lang> {
  try {
    const cookieStore = await cookies()
    const value = cookieStore.get(LANG_COOKIE)?.value
    return isLang(value) ? value : DEFAULT_LANG
  } catch {
    return DEFAULT_LANG
  }
}
