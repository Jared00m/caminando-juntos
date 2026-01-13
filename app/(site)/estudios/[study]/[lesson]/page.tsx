import { getStudyLesson, getStudyLessons, getStudyMetadata } from '@/lib/content-git'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { LessonNavigation } from '@/components/study/LessonNavigation'
import { MDXRenderer } from '@/lib/mdx-renderer'
import { Metadata } from 'next'
import { ArticleStructuredData, BreadcrumbStructuredData } from '@/components/StructuredData'
import { cookies } from 'next/headers'
import { Hero } from '@/components/Hero'
import { getDictionary, type Locale } from '@/lib/i18n'

interface LessonPageProps {
  params: Promise<{
    study: string
    lesson: string
  }>
}

export async function generateMetadata({ params }: LessonPageProps): Promise<Metadata> {
  const { study, lesson } = await params
  const cookieStore = await cookies()
  const cookieLocale = cookieStore.get('NEXT_LOCALE')?.value || 'es'
  const locale: Locale = cookieLocale === 'pt' ? 'pt' : 'es'
  
  const [lessonData, studyMetadata] = await Promise.all([
    getStudyLesson(study, lesson, locale),
    getStudyMetadata(study, locale)
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
    title: `${lessonData.title} - ${studyTitle} | Caminando Juntos`,
    description:
      lessonData.description ||
      (locale === 'pt'
        ? `Estude ${lessonData.title} no curso ${studyTitle}`
        : `Estudia ${lessonData.title} en el curso de ${studyTitle}`),
    keywords:
      lessonData.tags ||
      (locale === 'pt'
        ? ['estudo bíblico', 'lição', studyTitle]
        : ['estudio bíblico', 'lección', studyTitle]),
    openGraph: {
      type: 'article',
      locale: locale === 'pt' ? 'pt_BR' : 'es_ES',
      url: `https://cjuntos.org/estudios/${study}/${lesson}`,
      title: lessonData.title,
      description: lessonData.description || '',
      siteName: 'Caminando Juntos',
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
      canonical: `https://cjuntos.org/estudios/${study}/${lesson}`,
    },
  }
}

export default async function LessonPage({ params }: LessonPageProps) {
  const { study, lesson, } = await params
  const cookieStore = await cookies()
  const cookieLocale = cookieStore.get('NEXT_LOCALE')?.value || 'es'
  const locale: Locale = cookieLocale === 'pt' ? 'pt' : 'es'
  const d = getDictionary(locale)
  
  const lessonData = await getStudyLesson(study, lesson, locale)
  const allLessons = await getStudyLessons(study, locale)

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
        author="Caminando Juntos"
        url={`https://cjuntos.org/estudios/${study}/${lesson}`}
      />
      <BreadcrumbStructuredData
        items={[
          { name: d.common.home, url: 'https://cjuntos.org' },
          { name: d.common.studies, url: 'https://cjuntos.org/estudios' },
          { name: studyTitle, url: `https://cjuntos.org/estudios/${study}` },
          { name: lessonData.title, url: `https://cjuntos.org/estudios/${study}/${lesson}` },
        ]}
      />
      {/* Study Hero Section - Full Width */}
      <Hero title={lessonData.title} />

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Breadcrumb Navigation */}
          <nav className="flex items-center space-x-2 text-sm">
            <Link href="/estudios" className="text-celestial-blue hover:text-celestial-blue/80 transition-colors">
              {d.common.studies}
            </Link>
            <span className="text-muted-foreground">/</span>
            <Link href={`/estudios/${study}`} className="text-celestial-blue hover:text-celestial-blue/80 transition-colors">
              {studyTitle}
            </Link>
            <span className="text-muted-foreground">/</span>
            <span className="text-muted-foreground">{lessonData.title}</span>
          </nav>

          {/* Lesson Content */}
          <article>
            <MDXRenderer content={lessonData.content} />
          </article>

          {/* Navigation */}
          <div className="mb-12">
            <LessonNavigation
              studyId={study}
              locale={locale}
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
              {d.studies.viewLessons}
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
