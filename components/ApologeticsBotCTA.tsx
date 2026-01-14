'use client'

import { useCallback } from 'react'
import { useRouter } from 'next/navigation'

export function ApologeticsBotCTA() {
  const router = useRouter()

  const openChat = useCallback(() => {
    if (typeof window !== 'undefined' && window.$chatwoot?.toggle) {
      window.$chatwoot.toggle()
      return
    }

    router.push('/comunidad/chat')
  }, [router])

  return (
    <section className="bg-[#f7f9fc] py-16 px-4">
      <div className="container mx-auto">
        <div className="relative isolate overflow-hidden max-w-5xl mx-auto rounded-3xl bg-gradient-to-r from-[#1E88E5] via-[#3A92F7] to-[#2F6FE3] px-8 py-14 shadow-2xl">
          <div className="absolute -top-10 -left-10 h-40 w-40 bg-white/15 blur-3xl" aria-hidden="true" />
          <div className="absolute -bottom-16 -right-20 h-48 w-48 bg-[#FBC02D]/35 blur-3xl" aria-hidden="true" />

          <div className="relative text-white text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">¿Tienes una pregunta difícil?</h2>
            <p className="text-lg md:text-xl mb-8 text-white/90 max-w-3xl mx-auto">
              Pregúntale a nuestro bot de apologética. Puedes escribir tu pregunta y te responderemos con respeto, claridad y referencias bíblicas cuando sea posible.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                type="button"
                onClick={openChat}
                className="bg-white text-[#1E88E5] hover:bg-gray-100 px-8 py-3 rounded-lg font-semibold transition-colors"
              >
                Preguntar ahora
              </button>
              <a
                href="/comunidad/chat"
                className="bg-transparent border-2 border-white text-white hover:bg-white/10 px-8 py-3 rounded-lg font-semibold transition-colors inline-block"
              >
                Ver opciones de chat
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
