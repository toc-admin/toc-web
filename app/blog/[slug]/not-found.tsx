import Link from 'next/link'
import { getServerLang } from '@/lib/i18n/server'
import blogDetailsDict from '@/lib/i18n/translations/blogDetails'

export default async function BlogNotFound() {
  const lang = await getServerLang()
  const t = blogDetailsDict[lang]

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-32">
      <div className="text-center max-w-md">
        <div className="w-24 h-24 bg-gradient-to-br from-red-900 to-red-700 rounded-full flex items-center justify-center mx-auto mb-6">
          <svg
            className="w-12 h-12 text-white"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </div>
        <h2 className="text-3xl font-bold mb-4">{t.notFoundTitle}</h2>
        <p className="text-gray-600 mb-8">
          {t.notFoundText}
        </p>
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-red-900 to-red-700 text-white font-semibold uppercase tracking-wider hover:from-red-800 hover:to-red-600 transition-all duration-300"
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
          {t.backToBlog}
        </Link>
      </div>
    </div>
  )
}
