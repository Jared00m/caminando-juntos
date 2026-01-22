import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase-server'
import { createClient as createSupabaseClient } from '@supabase/supabase-js'

async function getAuthenticatedUserId(request: NextRequest): Promise<string | null> {
  const authHeader = request.headers.get('authorization') || ''
  const match = authHeader.match(/^Bearer\s+(.+)$/i)
  const token = match?.[1]
  if (!token) return null

  const url = process.env.SUPABASE_URL
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || process.env.SUPABASE_ANON_KEY
  if (!url || !anonKey) return null

  const supabase = createSupabaseClient(url, anonKey, {
    auth: { autoRefreshToken: false, persistSession: false },
  })

  const { data, error } = await supabase.auth.getUser(token)
  if (error || !data?.user?.id) return null
  return data.user.id
}

function parseStep(stepRaw: string | null): number | null {
  if (!stepRaw) return null
  const num = Number(stepRaw)
  if (!Number.isFinite(num)) return null
  const step = Math.trunc(num)
  if (step < 0 || step > 10_000) return null
  return step
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const userId = searchParams.get('userId')
    const isAuthenticated = searchParams.get('isAuthenticated') === 'true'
    const studyId = searchParams.get('studyId')
    const lessonId = searchParams.get('lessonId')
    const stepRaw = searchParams.get('step')
    const step = parseStep(stepRaw)
    
    if (!studyId || !lessonId || step === null) {
      return NextResponse.json({ error: 'Missing required parameters' }, { status: 400 })
    }

    let effectiveUserId: string
    let userField: 'user_id' | 'anon_id'
    if (isAuthenticated) {
      const authedUserId = await getAuthenticatedUserId(request)
      if (!authedUserId) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
      }
      effectiveUserId = authedUserId
      userField = 'user_id'
    } else {
      if (!userId) {
        return NextResponse.json({ error: 'Missing required parameters' }, { status: 400 })
      }
      effectiveUserId = userId
      userField = 'anon_id'
    }

    const supabase = await createClient()
    
    let query = supabase
      .from('study_progress')
      .select('*')
      .eq('study_id', studyId)
      .eq('lesson_id', lessonId)
      .eq('step', step)

    query = query.eq(userField, effectiveUserId)
    
    const { data, error } = await query
    
    if (error) {
      console.error('Error fetching study progress:', error)
      return NextResponse.json({ error: 'Failed to fetch progress' }, { status: 500 })
    }
    
    return NextResponse.json({ completed: data && data.length > 0 })
  } catch (error) {
    console.error('Error fetching study progress:', error)
    return NextResponse.json({ error: 'Failed to fetch progress' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { userId, isAuthenticated, studyId, lessonId, step } = body
    
    if (!studyId || !lessonId || step === undefined) {
      return NextResponse.json({ error: 'Missing required parameters' }, { status: 400 })
    }

    const parsedStep = parseStep(String(step))
    if (parsedStep === null) {
      return NextResponse.json({ error: 'Invalid step' }, { status: 400 })
    }

    let effectiveUserId: string
    let userField: 'user_id' | 'anon_id'
    if (isAuthenticated) {
      const authedUserId = await getAuthenticatedUserId(request)
      if (!authedUserId) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
      }
      effectiveUserId = authedUserId
      userField = 'user_id'
    } else {
      if (!userId) {
        return NextResponse.json({ error: 'Missing required parameters' }, { status: 400 })
      }
      effectiveUserId = userId
      userField = 'anon_id'
    }

    const supabase = await createClient()
    
    const progressData: {
      study_id: string
      lesson_id: string
      step: number
      user_id?: string
      anon_id?: string
    } = {
      study_id: studyId,
      lesson_id: lessonId,
      step: parsedStep,
    }

    if (userField === 'user_id') progressData.user_id = effectiveUserId
    else progressData.anon_id = effectiveUserId
    
    const { error } = await supabase
      .from('study_progress')
      .upsert(progressData, {
        onConflict: userField === 'user_id' ? 'user_id,study_id,lesson_id,step' : 'anon_id,study_id,lesson_id,step'
      })
    
    if (error) {
      console.error('Error saving study progress:', error)
      return NextResponse.json({ error: 'Failed to save progress' }, { status: 500 })
    }
    
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error saving study progress:', error)
    return NextResponse.json({ error: 'Failed to save progress' }, { status: 500 })
  }
}