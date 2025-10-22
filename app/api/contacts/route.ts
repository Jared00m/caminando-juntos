import { NextRequest, NextResponse } from 'next/server'
import { getContactsByCountry } from '@/lib/supabase-server'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const country = searchParams.get('country')
    
    if (!country) {
      return NextResponse.json({ error: 'Country parameter is required' }, { status: 400 })
    }

    const contacts = await getContactsByCountry(country)
    return NextResponse.json(contacts)
  } catch (error) {
    console.error('Error fetching contacts:', error)
    return NextResponse.json({ error: 'Failed to fetch contacts' }, { status: 500 })
  }
}