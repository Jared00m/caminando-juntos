export interface Region {
  country_code: string
  country_name: string
}

export interface City {
  id: number
  country_code: string
  city_name: string
  created_at: string
}

export interface Event {
  id: number
  title: string
  description?: string
  starts_at: string
  ends_at?: string
  country_code?: string
  city_id?: number
  venue?: string
  url?: string
  published: boolean
  created_at: string
  updated_at: string
}

export interface Contact {
  id: number
  country_code?: string
  city_id?: number
  channel_type: 'email' | 'whatsapp' | 'phone' | 'chatwoot_team'
  value: string
  name?: string
  description?: string
  published: boolean
  created_at: string
}

export interface Church {
  id: number
  country_code?: string
  city_id?: number
  name: string
  contact_phone?: string
  contact_phone_type?: 'whatsapp' | 'phone'
  contact_email?: string
  website_url?: string
  address?: string
  published: boolean
  created_at: string
  updated_at: string
  city?: {
    id: number
    city_name: string
  } | null
}

export interface StudyProgress {
  id: number
  anon_id: string
  study_id: string
  lesson_id: string
  step: number
  completed_at: string
}

export interface GospelDecision {
  id: number
  name: string
  email: string
  locale?: string | null
  page_path?: string | null
  created_at: string
}

export interface FeatureFlag {
  key: string
  enabled: boolean
  country_code?: string
  notes?: string
  created_at: string
  updated_at: string
}

export interface ContentFrontmatter {
  title: string
  date: string
  cover?: string
  tags?: string[]
  description?: string
  author?: string
  duration?: string
  youtube_id?: string
  audio_url?: string
}

export interface Article extends ContentFrontmatter {
  slug: string
  content: string
}

export interface Video extends ContentFrontmatter {
  slug: string
  content: string
  youtube_id: string
}

export interface Testimony extends ContentFrontmatter {
  slug: string
  content: string
  youtube_id: string
}

export interface LessonFrontmatter {
  // Required
  title: string
  date: string
  order: number
  description: string
  // Recommended
  tags?: string[]
  steps?: number
  episode?: number
  // Optional metadata
  author?: string
  duration?: string
  cover?: string
}

export interface StudyContent extends LessonFrontmatter {
  slug: string
  content: string
  study: string
  lesson: string
}

export interface StudyMetadata {
  title: string
  slug: string
  description: string
  level?: string
  lessons?: number
  estimatedTime?: string
  tags?: string[]
  thumbnail?: string
  order?: number
}