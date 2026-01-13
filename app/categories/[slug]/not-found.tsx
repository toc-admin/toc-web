import Link from 'next/link'

export default function CategoryNotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-gray-50">
      <div className="max-w-2xl w-full text-center">
        <div className="mb-8">
          <h1 className="text-6xl md:text-8xl font-black text-gray-300 mb-4">404</h1>
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
            Category Not Found
          </h2>
          <p className="text-lg text-gray-600 mb-8">
            Sorry, we couldn't find the category you're looking for. It may have been moved or removed.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/furniture"
            className="px-8 py-4 bg-gradient-to-r from-red-900 to-red-700 text-white font-semibold uppercase tracking-wider hover:from-red-800 hover:to-red-600 transition-all duration-300"
          >
            Browse All Categories
          </Link>
          <Link
            href="/"
            className="px-8 py-4 bg-white border-2 border-gray-300 text-gray-700 font-semibold uppercase tracking-wider hover:border-red-700 hover:text-red-700 transition-all duration-300"
          >
            Go Home
          </Link>
        </div>
      </div>
    </div>
  )
}
