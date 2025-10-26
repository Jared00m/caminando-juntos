import { getStudyLesson, getStudyLessons, getStudyMetadata } from '@/lib/content-git'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { LessonNavigation } from '@/components/study/LessonNavigation'
import { MDXRenderer } from '@/lib/mdx-renderer'
import { Metadata } from 'next'
import { ArticleStructuredData, BreadcrumbStructuredData } from '@/components/StructuredData'

interface LessonPageProps {
  params: Promise<{
    study: string
    lesson: string
  }>
}

export async function generateMetadata({ params }: LessonPageProps): Promise<Metadata> {
  const { study, lesson } = await params
  const [lessonData, studyMetadata] = await Promise.all([
    getStudyLesson(study, lesson),
    getStudyMetadata(study)
  ])

  if (!lessonData) {
    return {
      title: 'Lección no encontrada',
    }
  }

  const studyTitle = studyMetadata?.title || study.split('-').map(word => 
    word.charAt(0).toUpperCase() + word.slice(1)
  ).join(' ')

  return {
    title: `${lessonData.title} - ${studyTitle} | Dios Habla`,
    description: lessonData.description || `Estudia ${lessonData.title} en el curso de ${studyTitle}`,
    keywords: lessonData.tags || ['estudio bíblico', 'lección', studyTitle],
    openGraph: {
      type: 'article',
      locale: 'es_ES',
      url: `https://dioshabla.org/estudios/${study}/${lesson}`,
      title: lessonData.title,
      description: lessonData.description || '',
      siteName: 'Dios Habla',
      images: studyMetadata?.thumbnail ? [{
        url: studyMetadata.thumbnail,
        width: 1200,
        height: 630,
        alt: studyTitle,
      }] : [],
    },
    twitter: {
      card: 'summary_large_image',
      title: lessonData.title,
      description: lessonData.description || '',
      images: studyMetadata?.thumbnail ? [studyMetadata.thumbnail] : [],
    },
    alternates: {
      canonical: `https://dioshabla.org/estudios/${study}/${lesson}`,
    },
  }
}

export default async function LessonPage({ params }: LessonPageProps) {
  const { study, lesson } = await params
  
  const lessonData = await getStudyLesson(study, lesson)
  const allLessons = await getStudyLessons(study)

  if (!lessonData || !allLessons) {
    notFound()
  }

  // Find current lesson index
  const currentIndex = allLessons.findIndex(l => l.lesson === lesson)
  const previousLesson = currentIndex > 0 ? allLessons[currentIndex - 1] : null
  const nextLesson = currentIndex < allLessons.length - 1 ? allLessons[currentIndex + 1] : null

  // Format study title
  const studyTitle = study.split('-').map(word => 
    word.charAt(0).toUpperCase() + word.slice(1)
  ).join(' ')

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-celestial-blue/5">
      <ArticleStructuredData
        title={lessonData.title}
        description={lessonData.description || ''}
        datePublished={lessonData.date}
        author="Dios Habla"
        url={`https://dioshabla.org/estudios/${study}/${lesson}`}
      />
      <BreadcrumbStructuredData
        items={[
          { name: 'Inicio', url: 'https://dioshabla.org' },
          { name: 'Estudios', url: 'https://dioshabla.org/estudios' },
          { name: studyTitle, url: `https://dioshabla.org/estudios/${study}` },
          { name: lessonData.title, url: `https://dioshabla.org/estudios/${study}/${lesson}` },
        ]}
      />
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          {/* Breadcrumb Navigation */}
          <nav className="flex items-center space-x-2 text-sm mb-8">
            <Link href="/estudios" className="text-celestial-blue hover:text-celestial-blue/80 transition-colors">
              Estudios
            </Link>
            <span className="text-muted-foreground">/</span>
            <Link href={`/estudios/${study}`} className="text-celestial-blue hover:text-celestial-blue/80 transition-colors">
              {studyTitle}
            </Link>
            <span className="text-muted-foreground">/</span>
            <span className="text-muted-foreground">Lección {currentIndex + 1}</span>
          </nav>

          {/* Lesson Header */}
          <div className="mb-12 bg-white rounded-3xl p-10 shadow-xl border border-border">
            <div className="flex items-center mb-4">
              <span className="inline-flex items-center justify-center w-14 h-14 bg-gradient-to-br from-emerald-green to-celestial-blue rounded-2xl text-white font-bold text-xl shadow-lg">
                {currentIndex + 1}
              </span>
              <div className="ml-6">
                <h1 className="text-4xl md:text-5xl font-bold text-deep-indigo">
                  {lessonData.title}
                </h1>
              </div>
            </div>

            {lessonData.description && (
              <p className="text-xl text-muted-foreground leading-relaxed mt-6">
                {lessonData.description}
              </p>
            )}

            {lessonData.tags && lessonData.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-6">
                {lessonData.tags.map((tag) => (
                  <span
                    key={tag}
                    className="bg-emerald-green/10 text-emerald-green px-4 py-2 rounded-full text-sm font-medium"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* Lesson Content */}
          <article className="prose prose-lg max-w-none mb-12">
            <div className="bg-white rounded-3xl p-10 shadow-xl border border-border">
              <MDXRenderer content={lessonData.content} />
            </div>
          </article>

          {/* Navigation */}
          <div className="mb-12">
            <LessonNavigation
              studyId={study}
              previousLesson={previousLesson ? {
                lesson: previousLesson.lesson,
                title: previousLesson.title
              } : undefined}
              nextLesson={nextLesson ? {
                lesson: nextLesson.lesson,
                title: nextLesson.title
              } : undefined}
            />
          </div>

          {/* Back to Study Link */}
          <div className="text-center">
            <Link
              href={`/estudios/${study}`}
              className="inline-flex items-center text-celestial-blue hover:text-celestial-blue/80 transition-colors font-medium"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Ver todas las lecciones
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
