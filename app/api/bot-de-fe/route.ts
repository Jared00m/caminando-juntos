import { NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'
export const runtime = 'nodejs'

type IncomingMessage = {
  role: 'system' | 'user' | 'assistant'
  content: string
}

function cleanMessages(value: unknown): IncomingMessage[] {
  if (!Array.isArray(value)) return []

  const out: IncomingMessage[] = []
  for (const item of value) {
    if (!item || typeof item !== 'object') continue
    const role = (item as { role?: unknown }).role
    const content = (item as { content?: unknown }).content

    if ((role !== 'user' && role !== 'assistant') || typeof content !== 'string') continue

    const trimmed = content.trim()
    if (!trimmed) continue

    out.push({ role, content: trimmed })
  }

  return out.slice(-12)
}

export async function POST(request: Request) {
  try {
    const apiKey = process.env.CHIPP_API_KEY
    if (!apiKey) {
      return NextResponse.json(
        { error: 'Server is missing CHIPP_API_KEY' },
        { status: 500 }
      )
    }

    const body = (await request.json().catch(() => null)) as
      | { messages?: unknown }
      | null

    const messages = cleanMessages(body?.messages)

    const last = messages[messages.length - 1]
    if (!last || last.role !== 'user') {
      return NextResponse.json(
        { error: 'A user message is required' },
        { status: 400 }
      )
    }

    if (last.content.length > 4000) {
      return NextResponse.json(
        { error: 'Message is too long' },
        { status: 400 }
      )
    }

    const systemPrompt: IncomingMessage = {
      role: 'system',
      content:
        'Eres un asistente cristiano de apologética llamado “Bot de Fe”. Responde en español, con un tono respetuoso y amable. Explica con claridad, evita atacar a otras religiones o a personas. Cuando sea útil, incluye referencias bíblicas (por ejemplo: Juan 3:16) y explica el contexto brevemente. Si no estás seguro de algo, dilo. No inventes citas ni fuentes. Si el usuario describe peligro inmediato, autolesión o abuso, anima a buscar ayuda local urgente y a contactar servicios de emergencia.'
    }

    const upstream = await fetch('https://app.chipp.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      signal: request.signal,
      body: JSON.stringify({
        model: 'botdefe-59281',
        messages: [systemPrompt, ...messages],
        stream: false,
      }),
    })

    if (!upstream.ok) {
      const text = await upstream.text().catch(() => '')
      console.error('Chipp upstream error:', upstream.status, text)
      return NextResponse.json(
        { error: 'Failed to get a response from the bot provider' },
        { status: 502 }
      )
    }

    const data = (await upstream.json().catch(() => null)) as
      | {
          choices?: Array<{ message?: { content?: string }; text?: string }>
          message?: { content?: string }
        }
      | null

    const reply: string | undefined =
      data?.choices?.[0]?.message?.content ??
      data?.choices?.[0]?.text ??
      data?.message?.content

    const cleaned = typeof reply === 'string' ? reply.trim() : ''

    if (!cleaned) {
      console.error('Chipp response missing content:', data)
      return NextResponse.json(
        { error: 'Bot returned an empty response' },
        { status: 502 }
      )
    }

    return NextResponse.json({ reply: cleaned })
  } catch (error) {
    console.error('Error in bot-de-fe POST:', error)
    return NextResponse.json(
      { error: 'Unexpected server error' },
      { status: 500 }
    )
  }
}
