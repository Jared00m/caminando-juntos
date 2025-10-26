import { getStudyLessons, getStudyMetadata } from '@/lib/content-git'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { Metadata } from 'next'
import { CourseStructuredData, BreadcrumbStructuredData } from '@/components/StructuredData'

interface StudyPageProps {
  params: Promise<{
    study: string
  }>
}

export async function generateMetadata({ params }: StudyPageProps): Promise<Metadata> {
  const { study } = await params
  const metadata = await getStudyMetadata(study)

  if (!metadata) {
    return {
      title: 'Estudio no encontrado',
    }
  }

  return {
    title: `${metadata.title} | Dios Habla`,
    description: metadata.description,
    keywords: metadata.tags || ['estudio bíblico', metadata.title, 'curso bíblico'],
    openGraph: {
      type: 'website',
      locale: 'es_ES',
      url: `https://dioshabla.org/estudios/${study}`,
      title: metadata.title,
      description: metadata.description,
      siteName: 'Dios Habla',
      images: metadata.thumbnail ? [{
        url: metadata.thumbnail,
        width: 1200,
        height: 630,
        alt: metadata.title,
      }] : [],
    },
    twitter: {
      card: 'summary_large_image',
      title: metadata.title,
      description: metadata.description,
      images: metadata.thumbnail ? [metadata.thumbnail] : [],
    },
    alternates: {
      canonical: `https://dioshabla.org/estudios/${study}`,
    },
  }
}

export default async function StudyPage({ params }: StudyPageProps) {
  const { study } = await params
  const [lessons, metadata] = await Promise.all([
    getStudyLessons(study),
    getStudyMetadata(study)
  ])

  if (!lessons || lessons.length === 0) {
    notFound()
  }

  // Use metadata title if available, otherwise format slug
  const studyTitle = metadata?.title || study.split('-').map(word => 
    word.charAt(0).toUpperCase() + word.slice(1)
  ).join(' ')

  const studyDescription = metadata?.description || `Un estudio completo con ${lessons.length} lecciones para profundizar en tu fe.`

  return (
    <div className="container mx-auto px-4 py-12">
      {metadata && (
        <>
          <CourseStructuredData
            name={studyTitle}
            description={studyDescription}
            provider="Dios Habla"
            url={`https://dioshabla.org/estudios/${study}`}
            numberOfLessons={metadata.lessons || lessons.length}
            estimatedTime={metadata.estimatedTime}
          />
          <BreadcrumbStructuredData
            items={[
              { name: 'Inicio', url: 'https://dioshabla.org' },
              { name: 'Estudios', url: 'https://dioshabla.org/estudios' },
              { name: studyTitle, url: `https://dioshabla.org/estudios/${study}` },
            ]}
          />
        </>
      )}
      <div className="max-w-4xl mx-auto">
        {/* Study Header */}
        <div className="mb-12">
          <Link 
            href="/estudios"
            className="inline-flex items-center text-celestial-blue hover:text-celestial-blue/80 mb-6 transition-colors"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Volver a Estudios
          </Link>
          
          <h1 className="text-5xl font-bold mb-6 text-deep-indigo">{studyTitle}</h1>
          <p className="text-xl text-muted-foreground leading-relaxed">
            {studyDescription}
          </p>
          
          {/* Study metadata badges */}
          {metadata && (
            <div className="flex flex-wrap gap-2 mt-6">
              {metadata.level && (
                <span className="bg-celestial-blue/10 text-celestial-blue px-4 py-2 rounded-full text-sm font-medium">
                  📚 {metadata.level}
                </span>
              )}
              {metadata.lessons && (
                <span className="bg-emerald-green/10 text-emerald-green px-4 py-2 rounded-full text-sm font-medium">
                  📖 {metadata.lessons} lecciones
                </span>
              )}
              {metadata.estimatedTime && (
                <span className="bg-sunrise-gold/10 text-sunrise-gold px-4 py-2 rounded-full text-sm font-medium">
                  ⏱️ {metadata.estimatedTime}
                </span>
              )}
            </div>
          )}
        </div>

        {/* Lessons List */}
        <div className="space-y-4">
          {lessons.map((lesson, index) => (
            <Link
              key={lesson.lesson}
              href={`/estudios/${study}/${lesson.lesson}`}
              className="group block border border-border rounded-2xl p-6 hover:shadow-xl transition-all bg-white hover:scale-[1.02]"
            >
              <div className="flex items-start">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-gradient-to-br from-emerald-green to-celestial-blue rounded-xl flex items-center justify-center shadow-md group-hover:shadow-lg group-hover:scale-110 transition-all">
                    <span className="text-white font-bold text-lg">{index + 1}</span>
                  </div>
                </div>
                
                <div className="ml-6 flex-1">
                  <h2 className="text-2xl font-semibold mb-2 text-deep-indigo group-hover:text-celestial-blue transition-colors">
                    {lesson.title}
                  </h2>
                  
                  {lesson.description && (
                    <p className="text-muted-foreground mb-3 leading-relaxed">
                      {lesson.description}
                    </p>
                  )}
                  
                  <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                    {lesson.steps && (
                      <span className="flex items-center">
                        <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                        {lesson.steps} pasos
                      </span>
                    )}
                    {lesson.tags && lesson.tags.length > 0 && (
                      <div className="flex gap-2">
                        {lesson.tags.slice(0, 3).map((tag) => (
                          <span
                            key={tag}
                            className="bg-emerald-green/10 text-emerald-green px-3 py-1 rounded-full text-xs font-medium"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
                
                <div className="flex-shrink-0 ml-4">
                  <svg className="w-6 h-6 text-celestial-blue group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Call to Action */}
        <div className="mt-12 bg-gradient-to-br from-celestial-blue/10 via-emerald-green/5 to-sunrise-gold/10 rounded-3xl p-10 text-center shadow-lg">
          <h3 className="text-2xl font-semibold mb-4 text-deep-indigo">¿Listo para comenzar?</h3>
          <p className="text-muted-foreground mb-6 max-w-2xl mx-auto leading-relaxed">
            Cada lección está diseñada para ayudarte a crecer paso a paso. Tómate tu tiempo y reflexiona en cada paso.
          </p>
          <Link
            href={`/estudios/${study}/${lessons[0].lesson}`}
            className="inline-flex items-center justify-center px-8 py-4 border-2 border-transparent text-base font-semibold rounded-lg text-white bg-celestial-blue hover:bg-celestial-blue/90 shadow-lg hover:shadow-xl hover:scale-105 transition-all"
          >
            Comenzar con la Lección 1
            <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </div>
    </div>
  )
}
