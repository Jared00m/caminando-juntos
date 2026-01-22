'use client'

import { useEffect, useMemo, useRef } from 'react'
import Script from 'next/script'
import Cookies from 'js-cookie'

declare global {
  interface Window {
    $chatwoot: {
      toggle: () => void
      hide: () => void
      show: () => void
      setUser: (user: Record<string, unknown>) => void
      setCustomAttributes: (attributes: Record<string, unknown>) => void
    }
    chatwootSDK: {
      run: (config: { websiteToken: string; baseUrl: string }) => void
    }
  }
}

export function ChatwootWidget() {
  const chatwootBaseUrl = process.env.NEXT_PUBLIC_CHATWOOT_BASE_URL

  // Backwards-compatible: if you only set NEXT_PUBLIC_CHATWOOT_TOKEN, treat it as the default.
  const defaultToken =
    process.env.NEXT_PUBLIC_CHATWOOT_TOKEN_DEFAULT ||
    process.env.NEXT_PUBLIC_CHATWOOT_TOKEN

  const tokenByCountryJson = process.env.NEXT_PUBLIC_CHATWOOT_TOKENS_BY_COUNTRY

  const tokenByCountry = useMemo(() => {
    if (!tokenByCountryJson) return {} as Record<string, string>
    try {
      const parsed = JSON.parse(tokenByCountryJson) as unknown
      if (!parsed || typeof parsed !== 'object') return {}

      const out: Record<string, string> = {}
      for (const [key, value] of Object.entries(parsed as Record<string, unknown>)) {
        if (typeof key !== 'string' || typeof value !== 'string') continue
        const cc = key.trim().toUpperCase()
        const token = value.trim()
        if (!cc || !token) continue
        out[cc] = token
      }
      return out
    } catch {
      return {} as Record<string, string>
    }
  }, [tokenByCountryJson])

  const resolvedToken = useMemo(() => {
    const ccRaw = Cookies.get('cc') || ''
    const cc = ccRaw.trim().toUpperCase()
    return tokenByCountry[cc] || defaultToken || null
  }, [defaultToken, tokenByCountry])

  const initializedRef = useRef(false)

  useEffect(() => {
    if (!resolvedToken || !chatwootBaseUrl) return

    // Set custom attributes when component mounts
    const setAttributes = () => {
      if (window.$chatwoot) {
        const countryCode = Cookies.get('cc') || 'ES'
        const city = Cookies.get('city') || ''

        window.$chatwoot.setCustomAttributes({
          country_code: countryCode,
          city: city,
          source: 'dios-habla',
          language: 'es',
        })
      }
    }

    // Set attributes immediately if Chatwoot is already loaded
    setAttributes()

    // Set attributes when Chatwoot loads
    const interval = setInterval(() => {
      if (window.$chatwoot) {
        setAttributes()
        clearInterval(interval)
      }
    }, 1000)

    return () => clearInterval(interval)
  }, [chatwootBaseUrl, resolvedToken])

  if (!resolvedToken || !chatwootBaseUrl) {
    return null
  }

  return (
    <>
      <Script
        id="chatwoot-sdk"
        strategy="afterInteractive"
        src={`${chatwootBaseUrl}/packs/js/sdk.js`}
        onLoad={() => {
          // chatwootSDK is attached by the loaded script.
          if (initializedRef.current) return
          initializedRef.current = true

          window.chatwootSDK?.run({
            websiteToken: resolvedToken,
            baseUrl: chatwootBaseUrl,
          })
        }}
      />
    </>
  )
}