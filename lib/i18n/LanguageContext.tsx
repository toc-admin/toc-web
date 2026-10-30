'use client'

import { createContext, useCallback, useContext, useState } from 'react'
import { useRouter } from 'next/navigation'
import { DEFAULT_LANG, LANG_COOKIE, localizePath, type Lang } from './index'

interface LanguageContextValue {
  lang: Lang
  setLang: (lang: Lang) => void
}

const LanguageContext = createContext<LanguageContextValue>({
  lang: DEFAULT_LANG,
  setLang: () => {},
})

export function LanguageProvider({
  initialLang,
  children,
}: {
  initialLang: Lang
  children: React.ReactNode
}) {
  const [lang, setLangState] = useState<Lang>(initialLang)
  const router = useRouter()

  const setLang = useCallback(
    (next: Lang) => {
      setLangState(next)
      // Set the cookie before navigating so the middleware doesn't bounce
      // the unprefixed URL back to /en
      document.cookie = `${LANG_COOKIE}=${next};path=/;max-age=31536000;samesite=lax`
      // Each language lives on its own URL (/en prefix for English), so
      // switching means navigating to the localized variant of this page
      const { pathname, search, hash } = window.location
      router.push(localizePath(pathname, next) + search + hash)
      router.refresh()
    },
    [router]
  )

  return (
    <LanguageContext.Provider value={{ lang, setLang }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLang() {
  return useContext(LanguageContext)
}
