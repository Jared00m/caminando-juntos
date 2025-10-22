import { NextRequest, NextResponse } from 'next/server'
import { getEventsByCountry } from '@/lib/supabase-server'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const country = searchParams.get('country')
    
    if (!country) {
      return NextResponse.json({ error: 'Country parameter is required' }, { status: 400 })
    }

    const events = await getEventsByCountry(country)
    return NextResponse.json(events)
  } catch (error) {
    console.error('Error fetching events:', error)
    return NextResponse.json({ error: 'Failed to fetch events' }, { status: 500 })
  }
}