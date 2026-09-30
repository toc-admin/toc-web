'use client'

import { createContext, useCallback, useContext, useState } from 'react'
import { useRouter } from 'next/navigation'
import { DEFAULT_LANG, LANG_COOKIE, type Lang } from './index'

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
      document.cookie = `${LANG_COOKIE}=${next};path=/;max-age=31536000;samesite=lax`
      // Re-render server components (metadata, <html lang>) with the new cookie
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
