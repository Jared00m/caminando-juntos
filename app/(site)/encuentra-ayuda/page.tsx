import { LocalHelp } from '@/components/LocalHelp'
import { Only } from '@/components/Only'
import { isEnabled } from '@/lib/featureFlags'
import { cookies } from 'next/headers'

export default async function HelpPage() {
  const cookieStore = await cookies()
  const countryCode = cookieStore.get('cc')?.value || 'ES'
  const helpEnabled = await isEnabled('help', countryCode)

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">Encuentra Ayuda</h1>
      
      <Only when={helpEnabled}>
        <div className="mb-8">
          <p className="text-xl text-muted-foreground mb-6">
            Conecta con personas que pueden ayudarte en tu caminar espiritual y responder tus preguntas sobre Jesús.
          </p>
          
          <div className="bg-green-50 border border-green-200 rounded-lg p-6 mb-8">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-green-400" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <h3 className="text-sm font-medium text-green-800">
                  Ayuda personalizada por región
                </h3>
                <div className="mt-2 text-sm text-green-700">
                  <p>
                    Los contactos que ves aquí están disponibles en tu región. 
                    Todos nuestros colaboradores están capacitados para ayudarte con respeto y confidencialidad.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-8">
            <div className="bg-white border rounded-lg p-6">
              <h3 className="text-lg font-semibold mb-3">¿Cómo podemos ayudarte?</h3>
              <ul className="space-y-2 text-muted-foreground">
                <li className="flex items-center">
                  <svg className="h-4 w-4 mr-2 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Preguntas sobre la fe y Jesús
                </li>
                <li className="flex items-center">
                  <svg className="h-4 w-4 mr-2 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Orientación espiritual personal
                </li>
                <li className="flex items-center">
                  <svg className="h-4 w-4 mr-2 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Apoyo en momentos difíciles
                </li>
                <li className="flex items-center">
                  <svg className="h-4 w-4 mr-2 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Conexión con comunidades locales
                </li>
              </ul>
            </div>

            <div className="bg-white border rounded-lg p-6">
              <h3 className="text-lg font-semibold mb-3">Confidencialidad garantizada</h3>
              <p className="text-muted-foreground mb-4">
                Entendemos que las preguntas sobre la fe pueden ser muy personales. 
                Todas nuestras conversaciones son completamente confidenciales.
              </p>
              <p className="text-sm text-muted-foreground">
                Nuestro objetivo es acompañarte en tu búsqueda espiritual con respeto, 
                comprensión y sin juicios.
              </p>
            </div>
          </div>
        </div>

        <LocalHelp />
      </Only>

      <Only when={!helpEnabled}>
        <div className="text-center py-16">
          <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
          </svg>
          <h3 className="mt-2 text-sm font-medium text-gray-900">La ayuda no está disponible</h3>
          <p className="mt-1 text-sm text-gray-500">
            Esta función está temporalmente deshabilitada. Vuelve pronto para encontrar ayuda en tu región.
          </p>
          <div className="mt-6">
            <a
              href="/estudios"
              className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-primary hover:bg-primary/90"
            >
              Continúa con estudios
            </a>
          </div>
        </div>
      </Only>
    </div>
  )
}