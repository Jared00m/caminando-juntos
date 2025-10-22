import { LocalEvents } from '@/components/LocalEvents'
import { Only } from '@/components/Only'
import { isEnabled } from '@/lib/featureFlags'
import { cookies } from 'next/headers'

export default async function EventsPage() {
  const cookieStore = await cookies()
  const countryCode = cookieStore.get('cc')?.value || 'ES'
  const eventsEnabled = await isEnabled('events', countryCode)

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto mb-12">
        <h1 className="text-5xl font-bold mb-6 text-deep-indigo">Eventos Locales</h1>
        <p className="text-xl text-muted-foreground leading-relaxed">
          Encuentra eventos y actividades en tu región para conectar con una comunidad de fe.
        </p>
      </div>
      
      <Only when={eventsEnabled}>
        <div className="mb-12">
          <div className="bg-gradient-to-br from-celestial-blue/10 to-emerald-green/10 border border-celestial-blue/20 rounded-2xl p-8 mb-12 shadow-md">
            <div className="flex">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 bg-celestial-blue rounded-xl flex items-center justify-center">
                  <svg className="h-6 w-6 text-white" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                  </svg>
                </div>
              </div>
              <div className="ml-6">
                <h3 className="text-lg font-semibold text-deep-indigo mb-2">
                  Eventos personalizados por región
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  Los eventos que ves aquí están filtrados según tu ubicación. 
                  Si no ves eventos en tu área, prueba cambiando tu país en el selector de región.
                </p>
              </div>
            </div>
          </div>
        </div>

        <LocalEvents />
      </Only>

      <Only when={!eventsEnabled}>
        <div className="text-center py-20 bg-gradient-to-br from-celestial-blue/5 to-sunrise-gold/5 rounded-3xl">
          <div className="w-20 h-20 bg-gradient-to-br from-celestial-blue/20 to-sunrise-gold/20 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <svg className="h-10 w-10 text-celestial-blue" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>
          <h3 className="text-xl font-semibold text-deep-indigo mb-2">Los eventos no están disponibles</h3>
          <p className="text-muted-foreground mb-6">
            Esta función está temporalmente deshabilitada. Vuelve pronto para ver eventos en tu región.
          </p>
          <div className="mt-8">
            <a
              href="/encuentra-ayuda"
              className="inline-flex items-center px-8 py-4 border-2 border-transparent shadow-lg text-base font-semibold rounded-lg text-white bg-celestial-blue hover:bg-celestial-blue/90 hover:scale-105 transition-all"
            >
              Encuentra ayuda local
            </a>
          </div>
        </div>
      </Only>
    </div>
  )
}