import { getRegions } from '@/lib/supabase-server'

export function getCountryFromHeaders(headers: Headers): string | null {
  // Try various headers that Vercel and other platforms use for geo data
  const possibleHeaders = [
    'x-vercel-ip-country',
    'cf-ipcountry',
    'x-country-code',
    'x-forwarded-country',
  ]

  for (const header of possibleHeaders) {
    const country = headers.get(header)
    if (country && country !== 'unknown') {
      return country.toUpperCase()
    }
  }

  return null
}

export async function isValidCountryCode(code: string): Promise<boolean> {
  if (!code || code.length !== 2) return false
  
  try {
    const regions = await getRegions()
    return regions.some(region => region.country_code === code.toUpperCase())
  } catch {
    // Fallback to common country codes if database is unavailable
    const commonCodes = ['ES', 'MX', 'AR', 'CO', 'PE', 'CL', 'VE', 'EC', 'BO', 'PY', 'UY', 'CR', 'PA', 'GT', 'HN', 'SV', 'NI', 'DO', 'CU', 'PR', 'US']
    return commonCodes.includes(code.toUpperCase())
  }
}

export function getDefaultCountryCode(): string {
  return 'ES' // Default to Spain
}