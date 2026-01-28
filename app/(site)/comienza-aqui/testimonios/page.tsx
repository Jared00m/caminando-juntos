import { cookies } from 'next/headers'
import { getTestimonies } from '@/lib/content-git'
import { TestimonyIndexClient } from '@/components/testimonies/TestimonyIndexClient'

export default async function TestimonyVideosPage() {
  const cookieStore = await cookies()
  const locale = cookieStore.get('NEXT_LOCALE')?.value || 'es'
  const testimonies = await getTestimonies(locale)

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-3xl mb-10">
        <h1 className="text-4xl font-bold mb-3 text-gray-900">Testimonios</h1>
        <p className="text-lg text-gray-600">
          Explora historias reales de transformación y esperanza. Filtra por tema para encontrar
          testimonios relacionados con lo que estás viviendo.
        </p>
      </div>

      <TestimonyIndexClient testimonies={testimonies} />
    </div>
  )
}
