import { NextResponse } from 'next/server'

export async function GET() {
  return NextResponse.json({
    hasSupabaseUrl: !!process.env.SUPABASE_URL,
    hasSupabaseAnonKey: !!process.env.SUPABASE_ANON_KEY,
    hasSupabaseServiceKey: !!process.env.SUPABASE_SERVICE_ROLE_KEY,
    hasGAId: !!process.env.GA_MEASUREMENT_ID,
    siteUrl: process.env.NEXT_PUBLIC_SITE_URL, // This one is safe to show
  })
}