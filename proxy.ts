import { NextResponse, type NextRequest } from 'next/server'
import { LANG_COOKIE } from '@/lib/i18n'

const LANG_COOKIE_MAX_AGE = 60 * 60 * 24 * 365

// Croatian (default) is served on unprefixed URLs, English under /en.
// /en/* is rewritten to the unprefixed route with an x-lang header so the
// app renders the same page tree in English. Search engines therefore see
// two separate, stable URL sets that are linked via hreflang alternates.
export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl

  if (pathname === '/en' || pathname.startsWith('/en/')) {
    const bare = pathname.slice('/en'.length) || '/'
    const url = request.nextUrl.clone()
    url.pathname = bare

    const headers = new Headers(request.headers)
    headers.set('x-lang', 'en')
    headers.set('x-pathname', bare)

    const response = NextResponse.rewrite(url, { request: { headers } })
    response.cookies.set(LANG_COOKIE, 'en', {
      path: '/',
      maxAge: LANG_COOKIE_MAX_AGE,
      sameSite: 'lax',
    })
    return response
  }

  // Visitors who previously chose English keep getting /en URLs even when
  // they follow unprefixed links. Crawlers carry no cookie, so they always
  // see Croatian on unprefixed URLs — content stays stable per URL.
  if (request.cookies.get(LANG_COOKIE)?.value === 'en') {
    const url = request.nextUrl.clone()
    url.pathname = pathname === '/' ? '/en' : `/en${pathname}`
    return NextResponse.redirect(url)
  }

  const headers = new Headers(request.headers)
  headers.set('x-lang', 'hr')
  headers.set('x-pathname', pathname)
  return NextResponse.next({ request: { headers } })
}

export const config = {
  // Skip API routes, Next internals and any file with an extension
  // (images, fonts, sitemap.xml, robots.txt, ...)
  matcher: ['/((?!api|_next|.*\\..*).*)'],
}
