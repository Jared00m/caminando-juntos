import { getStudies } from '@/lib/content-git'
import Link from 'next/link'

export default async function StudiesPage() {
  const studies = await getStudies()

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">Estudios Bíblicos</h1>
      <p className="text-xl text-muted-foreground mb-12">
        Estudios paso a paso para conocer quién es Jesús y crecer en tu relación con Él.
      </p>

      {studies.length === 0 ? (
        <div className="text-center py-16">
          <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C20.832 18.477 19.246 18 17.5 18c-1.746 0-3.332.477-4.5 1.253" />
          </svg>
          <h3 className="mt-2 text-sm font-medium text-gray-900">No hay estudios disponibles</h3>
          <p className="mt-1 text-sm text-gray-500">
            Pronto tendremos estudios bíblicos disponibles para ti.
          </p>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {studies.map((study) => (
            <Link
              key={study}
              href={`/estudios/${study}`}
              className="group border rounded-lg p-6 hover:shadow-lg transition-shadow bg-white"
            >
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mr-4">
                  <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C20.832 18.477 19.246 18 17.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                </div>
                <h2 className="text-xl font-semibold group-hover:text-primary transition-colors capitalize">
                  {study.replace(/-/g, ' ')}
                </h2>
              </div>
              
              <p className="text-muted-foreground mb-4">
                Un estudio profundo que te ayudará a entender mejor las verdades fundamentales de la fe cristiana.
              </p>
              
              <div className="flex items-center justify-between text-sm">
                <span className="text-primary font-medium">Ver lecciones</span>
                <svg className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </Link>
          ))}
        </div>
      )}

      {/* Call to action */}
      <div className="mt-16 bg-primary/5 rounded-lg p-8 text-center">
        <h2 className="text-2xl font-semibold mb-4">¿Nuevo en los estudios bíblicos?</h2>
        <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
          Si es tu primera vez estudiando la Biblia, te recomendamos comenzar con "Conociendo a Jesús". 
          Este estudio te dará una base sólida para entender quién es Jesús y por qué es importante para tu vida.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/estudios/conociendo-a-jesus"
            className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-primary hover:bg-primary/90"
          >
            Comenzar con "Conociendo a Jesús"
          </Link>
          <Link
            href="/articulos"
            className="inline-flex items-center justify-center px-6 py-3 border border-input text-base font-medium rounded-md text-foreground bg-background hover:bg-accent"
          >
            Leer artículos primero
          </Link>
        </div>
      </div>
    </div>
  )
}