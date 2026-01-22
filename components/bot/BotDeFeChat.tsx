'use client'

import { useEffect, useMemo, useRef, useState } from 'react'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'

type ChatRole = 'user' | 'assistant'

type ChatMessage = {
  id: string
  role: ChatRole
  content: string
}

function newId() {
  if (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function') {
    return crypto.randomUUID()
  }
  return `${Date.now()}-${Math.random().toString(16).slice(2)}`
}

function normalizeMessages(messages: ChatMessage[]) {
  // Keep a small, relevant window to reduce token usage.
  const tail = messages.slice(-12)
  return tail.map(({ role, content }) => ({ role, content }))
}

function TypingIndicator() {
  return (
    <div className="flex items-center gap-1.5">
      <span
        className="inline-block h-2 w-2 rounded-full bg-gray-500 animate-bounce"
        style={{ animationDelay: '0ms' }}
      />
      <span
        className="inline-block h-2 w-2 rounded-full bg-gray-500 animate-bounce"
        style={{ animationDelay: '120ms' }}
      />
      <span
        className="inline-block h-2 w-2 rounded-full bg-gray-500 animate-bounce"
        style={{ animationDelay: '240ms' }}
      />
    </div>
  )
}

export function BotDeFeChat() {
  const [messages, setMessages] = useState<ChatMessage[]>(() => [
    {
      id: newId(),
      role: 'assistant',
      content:
        'Hola. Soy el Bot de Fe. Puedes hacerme preguntas sobre la fe cristiana, la Biblia, y apologética. ¿En qué estás pensando hoy?',
    },
  ])
  const [input, setInput] = useState('')
  const [isSending, setIsSending] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const scrollAreaRef = useRef<HTMLDivElement | null>(null)
  const inputRef = useRef<HTMLTextAreaElement | null>(null)

  useEffect(() => {
    const el = scrollAreaRef.current
    if (!el) return

    // Scroll only the chat area (prevents the whole page from jumping).
    // Use rAF to ensure layout is updated before measuring scrollHeight.
    requestAnimationFrame(() => {
      el.scrollTo({ top: el.scrollHeight, behavior: 'smooth' })
    })
  }, [messages.length, isSending])

  const canSend = useMemo(() => input.trim().length > 0 && !isSending, [input, isSending])

  async function sendMessage() {
    const trimmed = input.trim()
    if (!trimmed || isSending) return

    setError(null)
    setIsSending(true)

    const userMsg: ChatMessage = { id: newId(), role: 'user', content: trimmed }
    setMessages((prev) => [...prev, userMsg])
    setInput('')

    // Reset the textarea height back to a single line.
    if (inputRef.current) {
      inputRef.current.style.height = 'auto'
    }

    try {
      const res = await fetch('/api/bot-de-fe', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ messages: normalizeMessages([...messages, userMsg]) }),
      })

      if (!res.ok) {
        const body = (await res.json().catch(() => null)) as { error?: string } | null
        throw new Error(body?.error || `Request failed (${res.status})`)
      }

      const data = (await res.json()) as { reply?: string }
      const reply = typeof data.reply === 'string' ? data.reply.trim() : ''

      if (!reply) {
        throw new Error('Empty response from bot')
      }

      setMessages((prev) => [...prev, { id: newId(), role: 'assistant', content: reply }])
    } catch (e) {
      const message = e instanceof Error ? e.message : 'Unknown error'
      setError(message)
      setMessages((prev) => [
        ...prev,
        {
          id: newId(),
          role: 'assistant',
          content: 'Lo siento—hubo un problema al responder. Intenta de nuevo en unos segundos.',
        },
      ])
    } finally {
      setIsSending(false)
    }
  }

  return (
    <div className="mx-auto w-full max-w-4xl">
      <div className="rounded-2xl border border-gray-200 bg-white shadow-sm flex flex-col h-[70svh] sm:h-[72svh] md:h-[74vh]">
        <div className="border-b border-gray-100 px-6 py-4">
          <h2 className="text-xl font-semibold text-deep-indigo">Chat de apologética</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Haz tu pregunta. Intentaré responder con claridad y respeto; si aplica, incluiré referencias bíblicas.
          </p>
        </div>

        <div
          ref={scrollAreaRef}
          className="flex-1 overflow-y-auto px-6 py-5"
        >
          <div className="space-y-4">
            {messages.map((m) => (
              <div
                key={m.id}
                className={
                  m.role === 'user'
                    ? 'flex justify-end'
                    : 'flex justify-start'
                }
              >
                <div
                  className={
                    m.role === 'user'
                      ? 'max-w-[85%] rounded-2xl bg-[#1E88E5] px-4 py-3 text-white'
                      : 'max-w-[85%] rounded-2xl bg-gray-100 px-4 py-3 text-gray-900'
                  }
                >
                  {m.role === 'assistant' ? (
                    <div className="text-[15px] leading-relaxed">
                      <ReactMarkdown
                        remarkPlugins={[remarkGfm]}
                        components={{
                          p: ({ children }) => (
                            <p className="mb-3 last:mb-0 whitespace-pre-wrap">{children}</p>
                          ),
                          a: ({ children, href }) => (
                            <a
                              href={href}
                              target="_blank"
                              rel="noreferrer noopener"
                              className="text-[#1E88E5] underline underline-offset-2 hover:opacity-90"
                            >
                              {children}
                            </a>
                          ),
                          ul: ({ children }) => (
                            <ul className="mb-3 list-disc pl-5 space-y-1">{children}</ul>
                          ),
                          ol: ({ children }) => (
                            <ol className="mb-3 list-decimal pl-5 space-y-1">{children}</ol>
                          ),
                          li: ({ children }) => <li className="leading-relaxed">{children}</li>,
                          blockquote: ({ children }) => (
                            <blockquote className="mb-3 border-l-4 border-gray-300 pl-4 text-gray-800">
                              {children}
                            </blockquote>
                          ),
                          h1: ({ children }) => (
                            <h3 className="mb-2 text-lg font-semibold text-deep-indigo">{children}</h3>
                          ),
                          h2: ({ children }) => (
                            <h4 className="mb-2 text-base font-semibold text-deep-indigo">{children}</h4>
                          ),
                          h3: ({ children }) => (
                            <h5 className="mb-2 text-sm font-semibold text-deep-indigo">{children}</h5>
                          ),
                          code: ({ children, className }) => {
                            const isBlock = typeof className === 'string' && className.includes('language-')
                            if (isBlock) {
                              return <code className={className}>{children}</code>
                            }
                            return (
                              <code className="rounded bg-black/5 px-1.5 py-0.5 font-mono text-[0.9em]">
                                {children}
                              </code>
                            )
                          },
                          pre: ({ children }) => (
                            <pre className="mb-3 overflow-x-auto rounded-xl bg-black/90 p-3 text-[13px] text-white">
                              {children}
                            </pre>
                          ),
                        }}
                      >
                        {m.content}
                      </ReactMarkdown>
                    </div>
                  ) : (
                    <p className="text-[15px] whitespace-pre-wrap leading-relaxed">{m.content}</p>
                  )}
                </div>
              </div>
            ))}

            {isSending && (
              <div className="flex justify-start">
                <div className="max-w-[85%] rounded-2xl bg-gray-100 px-4 py-3 text-gray-700">
                  <TypingIndicator />
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="sticky bottom-0 border-t border-gray-100 bg-white/95 backdrop-blur px-6 py-4">
          {error && (
            <div className="mb-3 rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
              {error}
            </div>
          )}

          <form
            onSubmit={(e) => {
              e.preventDefault()
              void sendMessage()
            }}
            className="flex flex-col gap-3"
          >
            <textarea
              ref={inputRef}
              value={input}
              onChange={(e) => {
                setInput(e.target.value)
              }}
              onKeyDown={(e) => {
                // Enter submits; Shift+Enter adds a newline (ChatGPT-like).
                // Avoid interfering with IME composition.
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                const native = e.nativeEvent as any
                if (native?.isComposing) return

                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault()
                  void sendMessage()
                }
              }}
              onInput={(e) => {
                const el = e.currentTarget
                // Auto-grow (up to ~7 lines) while typing.
                el.style.height = 'auto'
                el.style.height = `${Math.min(el.scrollHeight, 180)}px`
              }}
              placeholder="Escribe tu pregunta… (por ejemplo: “¿Por qué creer en la resurrección?”)"
              rows={1}
              className="w-full resize-none rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-[15px] leading-relaxed text-gray-900 shadow-sm outline-none focus:border-[#1E88E5] focus:ring-2 focus:ring-[#1E88E5]/20"
            />

            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
              <p className="text-xs text-muted-foreground">
                Nota: esto no reemplaza consejería pastoral o profesional.
              </p>

              <button
                type="submit"
                disabled={!canSend}
                className={
                  canSend
                    ? 'inline-flex items-center justify-center rounded-lg bg-[#1E88E5] px-6 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#187bd1]'
                    : 'inline-flex items-center justify-center rounded-lg bg-gray-200 px-6 py-2.5 text-sm font-semibold text-gray-500'
                }
              >
                Enviar
              </button>
            </div>
          </form>
        </div>
      </div>

      <div className="mt-6 rounded-2xl bg-[#f7f9fc] px-6 py-5 text-sm text-muted-foreground">
        <h3 className="text-base font-semibold text-deep-indigo">Ideas para preguntar</h3>
        <ul className="mt-2 list-disc pl-5 space-y-1">
          <li>“¿Cómo sabemos que la Biblia es confiable?”</li>
          <li>“¿Por qué existe el mal si Dios es bueno?”</li>
          <li>“¿Qué hace única a la fe cristiana?”</li>
          <li>“¿Quién es Jesús según los evangelios?”</li>
        </ul>
      </div>
    </div>
  )
}
