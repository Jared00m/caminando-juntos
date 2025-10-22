import { LocalHelp } from '@/components/LocalHelp'
import { Only } from '@/components/Only'
import { isEnabled } from '@/lib/featureFlags'
import { cookies } from 'next/headers'

export default async function HelpPage() {
  const cookieStore = await cookies()
  const countryCode = cookieStore.get('cc')?.value || 'ES'
  const helpEnabled = await isEnabled('help', countryCode)

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto mb-12">
        <h1 className="text-5xl font-bold mb-6 text-deep-indigo">Encuentra Ayuda</h1>
        <p className="text-xl text-muted-foreground leading-relaxed">
          Conecta con personas que pueden acompañarte en tu caminar espiritual y responder tus preguntas sobre la fe.
        </p>
      </div>
      
      <Only when={helpEnabled}>
        <div className="mb-12">
          <div className="bg-gradient-to-br from-emerald-green/10 to-celestial-blue/10 border border-emerald-green/20 rounded-2xl p-8 mb-12 shadow-md">
            <div className="flex">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 bg-emerald-green rounded-xl flex items-center justify-center">
                  <svg className="h-6 w-6 text-white" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                  </svg>
                </div>
              </div>
              <div className="ml-6">
                <h3 className="text-lg font-semibold text-deep-indigo mb-2">
                  Ayuda personalizada por región
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  Los contactos que ves aquí están disponibles en tu región. 
                  Todos nuestros colaboradores están capacitados para ayudarte con respeto y confidencialidad.
                </p>
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <div className="bg-white border border-border rounded-2xl p-8 shadow-md">
              <h3 className="text-xl font-semibold mb-4 text-deep-indigo">¿Cómo podemos ayudarte?</h3>
              <ul className="space-y-3 text-muted-foreground">
                <li className="flex items-center">
                  <div className="w-6 h-6 bg-emerald-green/20 rounded-lg flex items-center justify-center mr-3">
                    <svg className="h-4 w-4 text-emerald-green" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  Preguntas sobre la fe y Jesús
                </li>
                <li className="flex items-center">
                  <div className="w-6 h-6 bg-emerald-green/20 rounded-lg flex items-center justify-center mr-3">
                    <svg className="h-4 w-4 text-emerald-green" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  Orientación espiritual personal
                </li>
                <li className="flex items-center">
                  <div className="w-6 h-6 bg-emerald-green/20 rounded-lg flex items-center justify-center mr-3">
                    <svg className="h-4 w-4 text-emerald-green" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  Apoyo en momentos difíciles
                </li>
                <li className="flex items-center">
                  <div className="w-6 h-6 bg-emerald-green/20 rounded-lg flex items-center justify-center mr-3">
                    <svg className="h-4 w-4 text-emerald-green" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  Conexión con comunidades locales
                </li>
              </ul>
            </div>

            <div className="bg-white border border-border rounded-2xl p-8 shadow-md">
              <h3 className="text-xl font-semibold mb-4 text-deep-indigo">Confidencialidad garantizada</h3>
              <p className="text-muted-foreground mb-4 leading-relaxed">
                Entendemos que las preguntas sobre la fe pueden ser muy personales. 
                Todas nuestras conversaciones son completamente confidenciales.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Nuestro objetivo es acompañarte en tu búsqueda espiritual con respeto, 
                comprensión y sin juicios.
              </p>
            </div>
          </div>
        </div>

        <LocalHelp />
      </Only>

      <Only when={!helpEnabled}>
        <div className="text-center py-20 bg-gradient-to-br from-emerald-green/5 to-celestial-blue/5 rounded-3xl">
          <div className="w-20 h-20 bg-gradient-to-br from-emerald-green/20 to-celestial-blue/20 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <svg className="h-10 w-10 text-emerald-green" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
          </div>
          <h3 className="text-xl font-semibold text-deep-indigo mb-2">La ayuda no está disponible</h3>
          <p className="text-muted-foreground mb-6">
            Esta función está temporalmente deshabilitada. Vuelve pronto para encontrar ayuda en tu región.
          </p>
          <div className="mt-8">
            <a
              href="/estudios"
              className="inline-flex items-center px-8 py-4 border-2 border-transparent shadow-lg text-base font-semibold rounded-lg text-white bg-celestial-blue hover:bg-celestial-blue/90 hover:scale-105 transition-all"
            >
              Continúa con estudios
            </a>
          </div>
        </div>
      </Only>
    </div>
  )
}