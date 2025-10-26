import { createClient as createSupabaseClient } from '@supabase/supabase-js'
import { Region, City, Event, Contact, StudyProgress, FeatureFlag } from './types'

const supabaseUrl = process.env.SUPABASE_URL
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY

if (!supabaseUrl || !supabaseKey) {
  console.warn('Supabase environment variables not configured. Some features may not work.')
}

export const supabase = supabaseUrl && supabaseKey ? createSupabaseClient(supabaseUrl, supabaseKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false,
  },
}) : null

// Create server-side Supabase client
export async function createClient() {
  if (!supabaseUrl || !supabaseKey) {
    throw new Error('Supabase environment variables not configured')
  }
  
  return createSupabaseClient(supabaseUrl, supabaseKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  })
}

// Client-side Supabase for public operations
export const createClientSupabase = () => {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || process.env.SUPABASE_ANON_KEY
  
  if (!url || !key) {
    console.warn('Supabase client environment variables not configured')
    return null
  }
  
  return createSupabaseClient(url, key)
}

// Region functions
export async function getRegions(): Promise<Region[]> {
  if (!supabase) {
    console.warn('Supabase not configured, returning empty regions')
    return []
  }

  try {
    const { data, error } = await supabase
      .from('regions')
      .select('*')
      .order('country_name')

    if (error) {
      console.error('Error fetching regions:', error)
      return []
    }

    return data || []
  } catch (error) {
    console.error('Error fetching regions:', error)
    return []
  }
}

export async function getCitiesByCountry(countryCode: string): Promise<City[]> {
  if (!supabase) {
    console.warn('Supabase not configured, returning empty cities')
    return []
  }

  try {
    const { data, error } = await supabase
      .from('cities')
      .select('*')
      .eq('country_code', countryCode)
      .order('city_name')

    if (error) {
      console.error('Error fetching cities:', error)
      return []
    }

    return data || []
  } catch (error) {
    console.error('Error fetching cities:', error)
    return []
  }
}

// Event functions
export async function getEventsByCountry(countryCode: string): Promise<Event[]> {
  if (!supabase) {
    console.warn('Supabase not configured, returning empty events')
    return []
  }

  try {
    const { data, error } = await supabase
      .from('events')
      .select('*')
      .eq('country_code', countryCode)
      .eq('published', true)
      .gte('starts_at', new Date().toISOString())
      .order('starts_at')

    if (error) {
      console.error('Error fetching events:', error)
      return []
    }

    return data || []
  } catch (error) {
    console.error('Error fetching events:', error)
    return []
  }
}

export async function getEventsByCity(cityId: number): Promise<Event[]> {
  if (!supabase) {
    console.warn('Supabase not configured, returning empty events')
    return []
  }

  try {
    const { data, error } = await supabase
      .from('events')
      .select('*')
      .eq('city_id', cityId)
      .eq('published', true)
      .gte('starts_at', new Date().toISOString())
      .order('starts_at')

    if (error) {
      console.error('Error fetching city events:', error)
      return []
    }

    return data || []
  } catch (error) {
    console.error('Error fetching city events:', error)
    return []
  }
}

// Contact functions
export async function getContactsByCountry(countryCode: string): Promise<Contact[]> {
  if (!supabase) {
    console.warn('Supabase not configured, returning empty contacts')
    return []
  }

  try {
    const { data, error } = await supabase
      .from('contacts')
      .select('*')
      .eq('country_code', countryCode)
      .eq('published', true)
      .order('channel_type', { ascending: true })

    if (error) {
      console.error('Error fetching contacts:', error)
      return []
    }

    return data || []
  } catch (error) {
    console.error('Error fetching contacts:', error)
    return []
  }
}

export async function getContactsByCity(cityId: number): Promise<Contact[]> {
  if (!supabase) {
    console.warn('Supabase not configured, returning empty contacts')
    return []
  }

  try {
    const { data, error } = await supabase
      .from('contacts')
      .select('*')
      .eq('city_id', cityId)
      .eq('published', true)
      .order('channel_type', { ascending: true })

    if (error) {
      console.error('Error fetching city contacts:', error)
      return []
    }

    return data || []
  } catch (error) {
    console.error('Error fetching city contacts:', error)
    return []
  }
}

// Study progress functions
export async function getStudyProgress(anonId: string, studyId: string, lessonId: string): Promise<StudyProgress[]> {
  if (!supabase) {
    console.warn('Supabase not configured, returning empty progress')
    return []
  }

  try {
    const { data, error } = await supabase
      .from('study_progress')
      .select('*')
      .eq('anon_id', anonId)
      .eq('study_id', studyId)
      .eq('lesson_id', lessonId)
      .order('step')

    if (error) {
      console.error('Error fetching study progress:', error)
      return []
    }

    return data || []
  } catch (error) {
    console.error('Error fetching study progress:', error)
    return []
  }
}

export async function saveStudyProgress(
  anonId: string,
  studyId: string,
  lessonId: string,
  step: number
): Promise<boolean> {
  if (!supabase) {
    console.warn('Supabase not configured, cannot save progress')
    return false
  }

  try {
    const { error } = await supabase
      .from('study_progress')
      .upsert({
        anon_id: anonId,
        study_id: studyId,
        lesson_id: lessonId,
        step,
        completed_at: new Date().toISOString(),
      })

    if (error) {
      console.error('Error saving study progress:', error)
      return false
    }

    return true
  } catch (error) {
    console.error('Error saving study progress:', error)
    return false
  }
}

// Feature flag functions
export async function getFeatureFlags(countryCode?: string): Promise<FeatureFlag[]> {
  if (!supabase) {
    console.warn('Supabase not configured, returning default feature flags')
    return getDefaultFeatureFlags()
  }

  try {
    let query = supabase
      .from('feature_flags')
      .select('*')

    if (countryCode) {
      query = query.or(`country_code.is.null,country_code.eq.${countryCode}`)
    } else {
      query = query.is('country_code', null)
    }

    const { data, error } = await query

    if (error) {
      console.error('Error fetching feature flags:', error)
      return getDefaultFeatureFlags()
    }

    return data || getDefaultFeatureFlags()
  } catch (error) {
    console.error('Error fetching feature flags:', error)
    return getDefaultFeatureFlags()
  }
}

function getDefaultFeatureFlags(): FeatureFlag[] {
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