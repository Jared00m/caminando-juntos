import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase-server'
import { createClient as createSupabaseClient } from '@supabase/supabase-js'

async function requireAdmin(accessToken: string) {
  const url = process.env.SUPABASE_URL
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || process.env.SUPABASE_ANON_KEY

  if (!url || !anonKey) {
    throw new Error('Supabase environment variables not configured')
  }

  const supabase = createSupabaseClient(url, anonKey, {
    auth: { autoRefreshToken: false, persistSession: false },
  })

  const { data: userData, error: userError } = await supabase.auth.getUser(accessToken)
  if (userError || !userData?.user) {
    return { ok: false as const, reason: 'Unauthorized' }
  }

  // Prefer DB role check if available.
  const { data: profile, error: profileError } = await supabase
    .from('user_profiles')
    .select('role,email')
    .eq('id', userData.user.id)
    .maybeSingle()

  if (!profileError) {
    const role = (profile as { role?: string | null } | null)?.role
    if (role === 'admin') return { ok: true as const, userId: userData.user.id }
  }

  // Fallback: allow-list emails if role column/policy isn't present.
  const allowList = (process.env.ADMIN_EMAILS || '')
    .split(',')
    .map((e) => e.trim().toLowerCase())
    .filter(Boolean)

  const email = (userData.user.email || '').toLowerCase()
  if (email && allowList.includes(email)) {
    return { ok: true as const, userId: userData.user.id }
  }

  return { ok: false as const, reason: 'Forbidden' }
}

export async function GET(request: Request) {
  try {
    const authHeader = request.headers.get('authorization') || ''
    const match = authHeader.match(/^Bearer\s+(.+)$/i)
    const token = match?.[1]

    if (!token) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const admin = await requireAdmin(token)
    if (!admin.ok) {
      return NextResponse.json({ error: admin.reason }, { status: admin.reason === 'Unauthorized' ? 401 : 403 })
    }

    const { searchParams } = new URL(request.url)
    const limitRaw = searchParams.get('limit')
    const limit = Math.max(1, Math.min(500, Number(limitRaw || 100)))

    const supabase = await createClient()
    const { data, error } = await supabase
      .from('gospel_decisions')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(limit)

    if (error) {
      console.error('Error fetching gospel decisions:', error)
      return NextResponse.json({ error: 'Failed to fetch decisions' }, { status: 500 })
    }

    return NextResponse.json({ decisions: data || [] })
  } catch (error) {
    console.error('Error in admin decisions GET:', error)
    return NextResponse.json({ error: 'Failed to fetch decisions' }, { status: 500 })
  }
}
