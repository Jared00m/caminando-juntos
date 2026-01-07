import { getVideo } from '@/lib/content-git'
import { MDXRenderer } from '@/lib/mdx-renderer'
import { YouTube } from '@/components/YouTube'
import { notFound } from 'next/navigation'
import { cookies } from 'next/headers'

interface VideoPageProps {
  params: Promise<{
    slug: string
  }>
}

export default async function VideoPage({ params }: VideoPageProps) {
  const { slug } = await params
  const cookieStore = await cookies()
  const locale = cookieStore.get('NEXT_LOCALE')?.value || 'es'
  const video = await getVideo(slug, locale)

  if (!video) {
    notFound()
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <article className="max-w-4xl mx-auto">
        {/* Header */}
        <header className="mb-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">{video.title}</h1>
          
          {video.description && (
            <p className="text-xl text-muted-foreground mb-6">{video.description}</p>
          )}
          
          <div className="flex items-center justify-between border-b pb-6">
            <div className="flex items-center space-x-4 text-sm text-muted-foreground">
              <span>{new Date(video.date).toLocaleDateString(locale === 'pt' ? 'pt-BR' : 'es-ES', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}</span>
              {video.duration && <span>{video.duration}</span>}
            </div>
            
            {video.tags && video.tags.length > 0 && (
              <div className="flex gap-2">
                {video.tags.map((tag) => (
                  <span
                    key={tag}
                    className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </div>
        </header>

        {/* Video Player */}
        {video.youtube_id && (
          <div className="mb-8">
            <YouTube id={video.youtube_id} title={video.title} />
          </div>
        )}

        {/* Content */}
        <div className="prose prose-lg max-w-none">
          <MDXRenderer content={video.content} />
        </div>

        {/* Footer */}
        <footer className="mt-12 pt-8 border-t">
          <div className="flex items-center justify-between">
            <a
              href="/videos"
              className="inline-flex items-center text-primary hover:text-primary/80"
            >
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              {locale === 'pt' ? 'Voltar para vídeos' : 'Volver a videos'}
            </a>
            
            <div className="flex items-center space-x-4">
              <span className="text-sm text-muted-foreground">{locale === 'pt' ? 'Gostou deste vídeo?' : '¿Te gustó este video?'}</span>
              <a
                href="/estudios"
                className="inline-flex items-center px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors"
              >
                {locale === 'pt' ? 'Continue com estudos' : 'Continúa con estudios'}
              </a>
            </div>
          </div>
        </footer>
      </article>
    </div>
  )
}