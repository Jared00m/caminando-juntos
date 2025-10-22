import { LocalEvents } from '@/components/LocalEvents'
import { Only } from '@/components/Only'
import { isEnabled } from '@/lib/featureFlags'
import { cookies } from 'next/headers'

export default async function EventsPage() {
  const cookieStore = await cookies()
  const countryCode = cookieStore.get('cc')?.value || 'ES'
  const eventsEnabled = await isEnabled('events', countryCode)

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">Eventos Locales</h1>
      
      <Only when={eventsEnabled}>
        <div className="mb-8">
          <p className="text-xl text-muted-foreground mb-6">
            Encuentra eventos y actividades en tu región para conectar con otros que buscan conocer a Jesús.
          </p>
          
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-blue-400" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <h3 className="text-sm font-medium text-blue-800">
                  Eventos personalizados por región
                </h3>
                <div className="mt-2 text-sm text-blue-700">
                  <p>
                    Los eventos que ves aquí están filtrados según tu ubicación. 
                    Si no ves eventos en tu área, prueba cambiando tu país en el selector de región.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <LocalEvents />
      </Only>

      <Only when={!eventsEnabled}>
        <div className="text-center py-16">
          <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          <h3 className="mt-2 text-sm font-medium text-gray-900">Los eventos no están disponibles</h3>
          <p className="mt-1 text-sm text-gray-500">
            Esta función está temporalmente deshabilitada. Vuelve pronto para ver eventos en tu región.
          </p>
          <div className="mt-6">
            <a
              href="/encuentra-ayuda"
              className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-primary hover:bg-primary/90"
            >
              Encuentra ayuda local
            </a>
          </div>
        </div>
      </Only>
    </div>
  )
}