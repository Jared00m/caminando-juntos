import { NextRequest, NextResponse } from 'next/server'
import { getCountryFromHeaders, isValidCountryCode, getDefaultCountryCode } from './lib/region'
import { createServerClient } from '@supabase/ssr'

export async function proxy(request: NextRequest) {
  let response = NextResponse.next({
    request: {
      headers: request.headers,
    },
  })

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return request.cookies.get(name)?.value
        },
        set(name: string, value: string, options) {
          request.cookies.set({
            name,
            value,
            ...options,
          })
          response = NextResponse.next({
            request: {
              headers: request.headers,
            },
          })
          response.cookies.set({
            name,
            value,
            ...options,
          })
        },
        remove(name: string, options) {
          request.cookies.set({
            name,
            value: '',
            ...options,
          })
          response = NextResponse.next({
            request: {
              headers: request.headers,
            },
          })
          response.cookies.set({
            name,
            value: '',
            ...options,
          })
        },
      },
    }
  )

  await supabase.auth.getUser()

  const existingCountry = request.cookies.get('cc')?.value
  const headerCountry = getCountryFromHeaders(request.headers)

  if (!existingCountry) {
    let countryCode = headerCountry
    if (countryCode && !(await isValidCountryCode(countryCode))) {
      countryCode = null
    }
    if (!countryCode) {
      countryCode = getDefaultCountryCode()
    }
    console.log('[Proxy] Setting country from IP:', { headerCountry, resolved: countryCode })
    response.cookies.set('cc', countryCode, {
      maxAge: 60 * 60 * 24 * 30,
      httpOnly: false,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
    })
  }

  const country = existingCountry || headerCountry || getDefaultCountryCode()
  const locale = country === 'BR' ? 'pt' : 'es'
  console.log('[Proxy] Country/Locale:', { country, locale, fromCookie: !!existingCountry, fromIP: !!headerCountry })

  const currentLocale = request.cookies.get('NEXT_LOCALE')?.value
  if (currentLocale !== locale) {
    response.cookies.set('NEXT_LOCALE', locale, {
      maxAge: 60 * 60 * 24 * 365,
      httpOnly: false,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
    })
  }

  return response
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
}
