import { withAuth } from 'next-auth/middleware'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  const isAuthenticated = request.cookies.get('__Secure-next-auth.session-token') || 
                          request.cookies.get('next-auth.session-token')

  // If the user is not authenticated and trying to access a protected route
  if (!isAuthenticated && 
      (pathname.startsWith('/profile') || 
       pathname.startsWith('/dashboard') || 
       pathname.startsWith('/chat') || 
       pathname.startsWith('/assessment'))) {
    const url = new URL('/login', request.url)
    url.searchParams.set('callbackUrl', pathname)
    return NextResponse.redirect(url)
  }

  // If the user is authenticated and trying to access login page
  if (isAuthenticated && pathname === '/login') {
    return NextResponse.redirect(new URL('/profile', request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    '/dashboard/:path*',
    '/chat/:path*',
    '/assessment/:path*',
    '/profile/:path*',
    '/login'
  ]
} 