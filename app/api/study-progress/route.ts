import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase-server'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const userId = searchParams.get('userId')
    const isAuthenticated = searchParams.get('isAuthenticated') === 'true'
    const studyId = searchParams.get('studyId')
    const lessonId = searchParams.get('lessonId')
    const step = searchParams.get('step')
    
    if (!userId || !studyId || !lessonId || !step) {
      return NextResponse.json({ error: 'Missing required parameters' }, { status: 400 })
    }

    const supabase = await createClient()
    
    let query = supabase
      .from('study_progress')
      .select('*')
      .eq('study_id', studyId)
      .eq('lesson_id', lessonId)
      .eq('step', parseInt(step))
    
    if (isAuthenticated) {
      query = query.eq('user_id', userId)
    } else {
      query = query.eq('anon_id', userId)
    }
    
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
    
    if (!userId || !studyId || !lessonId || step === undefined) {
      return NextResponse.json({ error: 'Missing required parameters' }, { status: 400 })
    }

    const supabase = await createClient()
    
    const progressData: any = {
      study_id: studyId,
      lesson_id: lessonId,
      step: parseInt(step),
    }
    
    if (isAuthenticated) {
      progressData.user_id = userId
    } else {
      progressData.anon_id = userId
    }
    
    const { error } = await supabase
      .from('study_progress')
      .upsert(progressData, {
        onConflict: isAuthenticated ? 'user_id,study_id,lesson_id,step' : 'anon_id,study_id,lesson_id,step'
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