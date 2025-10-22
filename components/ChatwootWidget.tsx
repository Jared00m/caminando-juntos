'use client'

import { useEffect } from 'react'
import Script from 'next/script'
import Cookies from 'js-cookie'

declare global {
  interface Window {
    $chatwoot: {
      toggle: () => void
      hide: () => void
      show: () => void
      setUser: (user: any) => void
      setCustomAttributes: (attributes: any) => void
    }
    chatwootSDK: {
      run: (config: any) => void
    }
  }
}

export function ChatwootWidget() {
  const chatwootToken = process.env.NEXT_PUBLIC_CHATWOOT_TOKEN || process.env.CHATWOOT_TOKEN
  const chatwootBaseUrl = process.env.NEXT_PUBLIC_CHATWOOT_BASE_URL || process.env.CHATWOOT_BASE_URL

  useEffect(() => {
    if (!chatwootToken || !chatwootBaseUrl) return

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
  }, [])

  if (!chatwootToken || !chatwootBaseUrl) {
    return null
  }

  return (
    <>
      <Script
        id="chatwoot-widget"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            (function(d,t) {
              var BASE_URL="${chatwootBaseUrl}";
              var g=d.createElement(t),s=d.getElementsByTagName(t)[0];
              g.src=BASE_URL+"/packs/js/sdk.js";
              g.defer = true;
              g.async = true;
              s.parentNode.insertBefore(g,s);
              g.onload=function(){
                window.chatwootSDK.run({
                  websiteToken: '${chatwootToken}',
                  baseUrl: BASE_URL
                })
              }
            })(document,"script");
          `,
        }}
      />
    </>
  )
}