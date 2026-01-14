import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase-server'

type DecisionPayload = {
  name: string
  email: string
  locale?: 'es' | 'pt'
  pagePath?: string | null
}

function isValidEmail(email: string): boolean {
  // Lightweight validation; backend can enforce stricter rules if desired.
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}

async function sendMailgunNotification(payload: {
  name: string
  email: string
  locale: string
  pagePath: string | null
}) {
  const apiKey = process.env.MAILGUN_API_KEY
  const domain = process.env.MAILGUN_DOMAIN
  const to = process.env.MAILGUN_TO
  const from = process.env.MAILGUN_FROM

  if (!apiKey || !domain || !to || !from) {
    return { skipped: true as const }
  }

  const endpoint = `https://api.mailgun.net/v3/${domain}/messages`
  const auth = Buffer.from(`api:${apiKey}`).toString('base64')

  const textLines = [
    'New gospel decision submission',
    `Name: ${payload.name}`,
    `Email: ${payload.email}`,
    `Locale: ${payload.locale}`,
    `Page: ${payload.pagePath || ''}`,
    `Time: ${new Date().toISOString()}`,
  ]

  const form = new URLSearchParams({
    from,
    to,
    subject: 'New gospel decision submission',
    text: textLines.join('\n'),
  })

  const res = await fetch(endpoint, {
    method: 'POST',
    headers: {
      authorization: `Basic ${auth}`,
      'content-type': 'application/x-www-form-urlencoded',
    },
    body: form.toString(),
  })

  if (!res.ok) {
    const body = await res.text().catch(() => '')
    throw new Error(`Mailgun error: ${res.status} ${body}`)
  }

  return { skipped: false as const }
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as Partial<DecisionPayload>

    const name = typeof body.name === 'string' ? body.name.trim() : ''
    const email = typeof body.email === 'string' ? body.email.trim() : ''
    const locale = body.locale === 'pt' ? 'pt' : 'es'
    const pagePath = typeof body.pagePath === 'string' ? body.pagePath : null

    if (!name) {
      return NextResponse.json({ error: 'Name is required' }, { status: 400 })
    }

    if (!email || !isValidEmail(email)) {
      return NextResponse.json({ error: 'Valid email is required' }, { status: 400 })
    }

    const supabase = await createClient()

    const { error } = await supabase.from('gospel_decisions').insert({
      name,
      email,
      locale,
      page_path: pagePath,
    })

    if (error) {
      console.error('Error inserting gospel decision:', error)
      return NextResponse.json({ error: 'Failed to submit decision' }, { status: 500 })
    }

    try {
      await sendMailgunNotification({ name, email, locale, pagePath })
    } catch (mailError) {
      console.error('Error sending Mailgun notification:', mailError)
      // Intentionally non-fatal: decision is already saved.
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error in gospel decisions POST:', error)
    return NextResponse.json({ error: 'Failed to submit decision' }, { status: 500 })
  }
}
