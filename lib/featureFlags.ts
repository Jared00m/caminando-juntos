import { getFeatureFlags } from './supabase-server'
import { FeatureFlag } from './types'

// In-memory cache for feature flags
const flagsCache: Map<string, FeatureFlag[]> = new Map()
const lastFetchTime: Map<string, number> = new Map()

const CACHE_DURATION = parseInt(process.env.FEATURE_FLAGS_CACHE_SECONDS || '300') * 1000 // Convert to milliseconds

/**
 * Get feature flags for a specific country or global flags
 */
export async function getFlags(countryCode?: string): Promise<FeatureFlag[]> {
  const cacheKey = countryCode || 'global'
  const now = Date.now()
  const lastFetch = lastFetchTime.get(cacheKey) || 0
  
  // Check if cache is still valid
  if (now - lastFetch < CACHE_DURATION && flagsCache.has(cacheKey)) {
    return flagsCache.get(cacheKey)!
  }
  
  try {
    // Fetch fresh flags from database
    const flags = await getFeatureFlags(countryCode)
    
    // Update cache
    flagsCache.set(cacheKey, flags)
    lastFetchTime.set(cacheKey, now)
    
    return flags
  } catch (error) {
    console.error('Error fetching feature flags:', error)
    
    // Return cached flags if available, even if expired
    if (flagsCache.has(cacheKey)) {
      return flagsCache.get(cacheKey)!
    }
    
    // Return default flags if no cache available
    return getDefaultFlags()
  }
}

/**
 * Check if a specific feature flag is enabled
 */
export async function isEnabled(flagKey: string, countryCode?: string): Promise<boolean> {
  const flags = await getFlags(countryCode)
  
  // Look for country-specific flag first, then global flag
  const countryFlag = flags.find(flag => flag.key === flagKey && flag.country_code === countryCode)
  const globalFlag = flags.find(flag => flag.key === flagKey && !flag.country_code)
  
  // Country-specific flags take precedence
  if (countryFlag) {
    return countryFlag.enabled
  }
  
  // Fall back to global flag
  if (globalFlag) {
    return globalFlag.enabled
  }
  
  // Default to false if flag doesn't exist
  return false
}

/**
 * Clear the feature flags cache
 */
export function clearFlagsCache(countryCode?: string): void {
  if (countryCode) {
    flagsCache.delete(countryCode)
    lastFetchTime.delete(countryCode)
  } else {
    flagsCache.clear()
    lastFetchTime.clear()
  }
}

/**
 * Get default feature flags when database is unavailable
 */
function getDefaultFlags(): FeatureFlag[] {
  return [
    {
      key: 'reminders',
      enabled: false,
      country_code: undefined,
      notes: 'Study reminders feature',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    },
    {
      key: 'buddy',
      enabled: false,
      country_code: undefined,
      notes: 'Study buddy matching feature',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    },
    {
      key: 'events',
      enabled: true,
      country_code: undefined,
      notes: 'Local events display',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    },
    {
      key: 'help',
      enabled: true,
      country_code: undefined,
      notes: 'Local help contacts display',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    },
  ]
}

/**
 * Client-side hook for feature flags (to be used in components)
 */
export function useFeatureFlags() {
  // This would be implemented as a React hook in a real application
  // For now, we'll create a simple function that can be called in components
  
  return {
    isEnabled: async (flagKey: string, countryCode?: string) => {
      // In a client component, you would need to fetch this via an API route
      // since we can't directly access the server-side functions
      try {
        const response = await fetch(`/api/feature-flags?country=${countryCode || ''}`)
        const flags = await response.json()
        
        const flag = flags.find((f: FeatureFlag) => f.key === flagKey)
        return flag ? flag.enabled : false
      } catch {
        return false
      }
    }
  }
}