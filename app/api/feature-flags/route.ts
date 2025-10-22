import { NextRequest, NextResponse } from 'next/server'
import { getFlags } from '@/lib/featureFlags'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const country = searchParams.get('country') || undefined
    
    const flags = await getFlags(country)
    return NextResponse.json(flags)
  } catch (error) {
    console.error('Error fetching feature flags:', error)
    return NextResponse.json({ error: 'Failed to fetch feature flags' }, { status: 500 })
  }
}