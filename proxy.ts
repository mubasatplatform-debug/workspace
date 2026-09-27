import { NextResponse, type NextRequest } from 'next/server'
import { ACCESS_COOKIE, isAccessGranted } from '@/lib/access'

export async function proxy(request: NextRequest) {
  const token = request.cookies.get(ACCESS_COOKIE)?.value
  if (await isAccessGranted(token)) {
    return NextResponse.next()
  }

  if (request.nextUrl.pathname.startsWith('/api/')) {
    return NextResponse.json({ error: 'Access code required' }, { status: 401 })
  }

  const url = request.nextUrl.clone()
  url.pathname = '/access'
  url.search = ''
  return NextResponse.redirect(url)
}

export const config = {
  matcher: [
    '/((?!access(?:/|$)|_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico)$).*)',
  ],
}
