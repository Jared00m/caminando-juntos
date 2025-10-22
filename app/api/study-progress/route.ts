import { NextRequest, NextResponse } from 'next/server'
import { getStudyProgress, saveStudyProgress } from '@/lib/supabase-server'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const anonId = searchParams.get('anonId')
    const studyId = searchParams.get('studyId')
    const lessonId = searchParams.get('lessonId')
    const step = searchParams.get('step')
    
    if (!anonId || !studyId || !lessonId || !step) {
      return NextResponse.json({ error: 'Missing required parameters' }, { status: 400 })
    }

    const progress = await getStudyProgress(anonId, studyId, lessonId)
    const stepProgress = progress.find(p => p.step === parseInt(step))
    
    return NextResponse.json({ completed: !!stepProgress })
  } catch (error) {
    console.error('Error fetching study progress:', error)
    return NextResponse.json({ error: 'Failed to fetch progress' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { anonId, studyId, lessonId, step } = body
    
    if (!anonId || !studyId || !lessonId || step === undefined) {
      return NextResponse.json({ error: 'Missing required parameters' }, { status: 400 })
    }

    const success = await saveStudyProgress(anonId, studyId, lessonId, parseInt(step))
    
    if (success) {
      return NextResponse.json({ success: true })
    } else {
      return NextResponse.json({ error: 'Failed to save progress' }, { status: 500 })
    }
  } catch (error) {
    console.error('Error saving study progress:', error)
    return NextResponse.json({ error: 'Failed to save progress' }, { status: 500 })
  }
}