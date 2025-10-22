import { getStudies } from '@/lib/content-git'
import Link from 'next/link'

export default async function StudiesPage() {
  const studies = await getStudies()

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto mb-12">
        <h1 className="text-5xl font-bold mb-6 text-deep-indigo">Estudios Bíblicos</h1>
        <p className="text-xl text-muted-foreground leading-relaxed">
          Descubre paso a paso las verdades de la Biblia con estudios diseñados para tu crecimiento espiritual.
        </p>
      </div>

      {studies.length === 0 ? (
        <div className="text-center py-20 bg-gradient-to-br from-emerald-green/5 to-celestial-blue/5 rounded-3xl">
          <div className="w-20 h-20 bg-gradient-to-br from-emerald-green/20 to-celestial-blue/20 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <svg className="h-10 w-10 text-emerald-green" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C20.832 18.477 19.246 18 17.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
          </div>
          <h3 className="text-xl font-semibold text-deep-indigo mb-2">Próximamente</h3>
          <p className="text-muted-foreground">
            Estamos preparando estudios bíblicos para ti.
          </p>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {studies.map((study) => (
            <Link
              key={study}
              href={`/estudios/${study}`}
              className="group border border-border rounded-2xl p-8 hover:shadow-xl transition-all bg-white hover:scale-105"
            >
              <div className="flex items-center mb-6">
                <div className="w-16 h-16 bg-gradient-to-br from-emerald-green to-celestial-blue rounded-2xl flex items-center justify-center mr-4 shadow-lg group-hover:shadow-xl group-hover:scale-110 transition-all">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C20.832 18.477 19.246 18 17.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                </div>
                <h2 className="text-2xl font-semibold text-deep-indigo group-hover:text-celestial-blue transition-colors capitalize">
                  {study.replace(/-/g, ' ')}
                </h2>
              </div>
              
              <p className="text-muted-foreground mb-6 leading-relaxed">
                Un estudio profundo que te ayudará a entender mejor las verdades fundamentales de la fe cristiana.
              </p>
              
              <div className="flex items-center justify-between text-sm">
                <span className="text-celestial-blue font-semibold">Ver lecciones</span>
                <svg className="w-5 h-5 text-celestial-blue group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </Link>
          ))}
        </div>
      )}

      {/* Call to action */}
      <div className="mt-20 bg-gradient-to-br from-celestial-blue/10 via-emerald-green/5 to-sunrise-gold/10 rounded-3xl p-10 text-center shadow-lg">
        <h2 className="text-3xl font-semibold mb-4 text-deep-indigo">¿Nuevo en los estudios bíblicos?</h2>
        <p className="text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed">
          Si es tu primera vez estudiando la Biblia, te recomendamos comenzar con "Conociendo a Jesús". 
          Este estudio te dará una base sólida para entender quién es Jesús y por qué es importante para tu vida.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/estudios/conociendo-a-jesus"
            className="inline-flex items-center justify-center px-8 py-4 border-2 border-transparent text-base font-semibold rounded-lg text-white bg-celestial-blue hover:bg-celestial-blue/90 shadow-lg hover:shadow-xl hover:scale-105 transition-all"
          >
            Comenzar con "Conociendo a Jesús"
          </Link>
          <Link
            href="/articulos"
            className="inline-flex items-center justify-center px-8 py-4 border-2 border-celestial-blue text-base font-semibold rounded-lg text-celestial-blue bg-white hover:bg-celestial-blue/5 shadow-md hover:shadow-lg transition-all"
          >
            Leer artículos primero
          </Link>
        </div>
      </div>
    </div>
  )
}