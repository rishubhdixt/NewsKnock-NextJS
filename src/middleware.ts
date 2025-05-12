import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname

  // Paths that don't require authentication (public pages)
  const isPublicPath =  path === '/' ||path === '/login' || path === '/signup' || path === '/verifyemail'

  // Check if a token exists (indicating that the user is logged in)
  const token = request.cookies.get('token')?.value || ''

  // If the user is already authenticated and tries to visit public paths (login/signup), redirect to profile page
  if (isPublicPath && token) {
    return NextResponse.redirect(new URL('/profile', request.nextUrl))
  }

  // If the user is not authenticated and tries to visit restricted paths (profile, reels, etc.), redirect to login
  if (!isPublicPath && !token) {
    return NextResponse.redirect(new URL('/login', request.nextUrl))
  }

  // Allow request to proceed if it's a valid path (either public or restricted with valid token)
  return NextResponse.next()
}

export const config = {
  matcher: [
    '/',           // Home page
    '/profile',     // Profile page (restricted)
    '/login',       // Login page (public)
    '/signup',      // Signup page (public)
    '/verifyemail', // Email verification (public)
    '/reels'        // Reels page (restricted)
  ]
}