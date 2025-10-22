import { NextRequest, NextResponse } from 'next/server'
import { getRegions } from '@/lib/supabase-server'

export async function GET() {
  try {
    const regions = await getRegions()
    return NextResponse.json(regions)
  } catch (error) {
    console.error('Error fetching regions:', error)
    return NextResponse.json({ error: 'Failed to fetch regions' }, { status: 500 })
  }
}