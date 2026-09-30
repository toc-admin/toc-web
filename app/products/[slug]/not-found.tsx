import Link from 'next/link'
import { getServerLang } from '@/lib/i18n/server'
import productNotFoundDict from '@/lib/i18n/translations/productNotFound'

export default async function ProductNotFound() {
  const lang = await getServerLang()
  const t = productNotFoundDict[lang]

  return (
    <div className="min-h-screen bg-white pt-24 px-4 sm:px-6 md:px-12 lg:px-24 xl:px-44 py-32">
      <div className="max-w-2xl mx-auto text-center">
        <div className="mb-8">
          <svg
            className="w-24 h-24 mx-auto text-gray-300"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </div>

        <h1 className="text-4xl md:text-5xl font-black mb-4">{t.title}</h1>

        <p className="text-lg text-gray-600 mb-8">
          {t.description}
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/furniture"
            className="px-8 py-4 bg-gradient-to-r from-red-900 to-red-700 text-white font-semibold uppercase tracking-wider hover:from-red-800 hover:to-red-600 transition-all duration-300 inline-flex items-center justify-center gap-2"
          >
            {t.browseAll}
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 8l4 4m0 0l-4 4m4-4H3"
              />
            </svg>
          </Link>

          <Link
            href="/"
            className="px-8 py-4 bg-white border-2 border-gray-300 text-gray-700 font-semibold uppercase tracking-wider hover:border-red-700 hover:text-red-700 transition-all duration-300 inline-flex items-center justify-center"
          >
            {t.goHome}
          </Link>
        </div>
      </div>
    </div>
  )
}
