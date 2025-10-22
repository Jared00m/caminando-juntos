import { NextRequest, NextResponse } from 'next/server'
import { getCountryFromHeaders, isValidCountryCode, getDefaultCountryCode } from './lib/region'

export async function middleware(request: NextRequest) {
  // Get the country code from cookie or headers
  const existingCountry = request.cookies.get('cc')?.value
  const headerCountry = getCountryFromHeaders(request.headers)
  
  // If no country cookie exists, try to set it from headers or default
  if (!existingCountry) {
    let countryCode = headerCountry
    
    // Validate the country code
    if (countryCode && !(await isValidCountryCode(countryCode))) {
      countryCode = null
    }
    
    // Use default if no valid country found
    if (!countryCode) {
      countryCode = getDefaultCountryCode()
    }
    
    const response = NextResponse.next()
    response.cookies.set('cc', countryCode, {
      maxAge: 60 * 60 * 24 * 30, // 30 days
      httpOnly: false, // Allow client-side access
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
    })
    return response
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
}