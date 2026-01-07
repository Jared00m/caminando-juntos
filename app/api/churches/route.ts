import { NextRequest, NextResponse } from 'next/server'
import { getChurchesByCity, getChurchesByCountry } from '@/lib/supabase-server'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const country = searchParams.get('country')
    const cityIdParam = searchParams.get('cityId')

    if (!country) {
      return NextResponse.json({ error: 'Country parameter is required' }, { status: 400 })
    }

    if (cityIdParam) {
      const cityId = Number(cityIdParam)
      if (!Number.isFinite(cityId)) {
        return NextResponse.json({ error: 'cityId must be a number' }, { status: 400 })
      }

      const churches = await getChurchesByCity(cityId)
      return NextResponse.json(churches)
    }

    const churches = await getChurchesByCountry(country)
    return NextResponse.json(churches)
  } catch (error) {
    console.error('Error fetching churches:', error)
    return NextResponse.json({ error: 'Failed to fetch churches' }, { status: 500 })
  }
}
