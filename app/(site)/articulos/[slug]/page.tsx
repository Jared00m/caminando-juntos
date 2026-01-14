import { getArticle } from '@/lib/content-git'
import { MDXRenderer } from '@/lib/mdx-renderer';
import { notFound } from 'next/navigation'
import { Metadata } from 'next'
import { ArticleStructuredData, BreadcrumbStructuredData } from '@/components/StructuredData'
import { cookies } from 'next/headers'
import Link from 'next/link'
import Image from 'next/image'

interface ArticlePageProps {
  params: Promise<{
    slug: string
  }>
}

export async function generateMetadata({ params }: ArticlePageProps): Promise<Metadata> {
  const { slug } = await params
  const cookieStore = await cookies()
  const locale = cookieStore.get('NEXT_LOCALE')?.value || 'es'
  const article = await getArticle(slug, locale)

  if (!article) {
    return {
      title: 'Artículo no encontrado',
    }
  }

  return {
    title: `${article.title} | Caminando Juntos`,
    description: article.description || `Lee ${article.title} en Caminando Juntos - artículos que inspiran fe.`,
    keywords: article.tags || ['artículo cristiano', 'fe', 'evangelio'],
    authors: article.author ? [{ name: article.author }] : [{ name: 'Caminando Juntos' }],
    openGraph: {
      type: 'article',
      locale: locale === 'pt' ? 'pt_BR' : 'es_ES',
      url: `https://cjuntos.org/articulos/${slug}`,
      title: article.title,
      description: article.description || '',
      siteName: 'Caminando Juntos',
      publishedTime: article.date,
      authors: article.author ? [article.author] : ['Caminando Juntos'],
      tags: article.tags,
      images: article.cover ? [{
        url: article.cover,
        width: 1200,
        height: 630,
        alt: article.title,
      }] : [],
    },
    twitter: {
      card: 'summary_large_image',
      title: article.title,
      description: article.description || '',
      images: article.cover ? [article.cover] : [],
    },
    alternates: {
      canonical: `https://cjuntos.org/articulos/${slug}`,
    },
  }
}

export default async function ArticlePage({ params }: ArticlePageProps) {
  const { slug } = await params
  const cookieStore = await cookies()
  const locale = cookieStore.get('NEXT_LOCALE')?.value || 'es'
  const article = await getArticle(slug, locale)

  if (!article) {
    notFound()
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <ArticleStructuredData
        title={article.title}
        description={article.description || ''}
        datePublished={article.date}
        author={article.author || 'Caminando Juntos'}
        image={article.cover}
        url={`https://cjuntos.org/articulos/${slug}`}
      />
      <BreadcrumbStructuredData
        items={[
          { name: 'Inicio', url: 'https://cjuntos.org' },
          { name: 'Artículos', url: 'https://cjuntos.org/articulos' },
          { name: article.title, url: `https://cjuntos.org/articulos/${slug}` },
        ]}
      />
      <article className="max-w-4xl mx-auto">
        {/* Header */}
        <header className="mb-8">
          {article.cover && (
            <div className="relative aspect-video mb-8 rounded-lg overflow-hidden">
              <Image
                src={article.cover}
                alt={article.title}
                fill
                sizes="(max-width: 768px) 100vw, 896px"
                className="object-cover"
              />
            </div>
          )}
          
          <h1 className="text-4xl md:text-5xl font-bold mb-4">{article.title}</h1>
          
          {article.description && (
            <p className="text-xl text-muted-foreground mb-6">{article.description}</p>
          )}
          
          <div className="flex items-center justify-between border-b pb-6">
            <div className="flex items-center space-x-4 text-sm text-muted-foreground">
              <span>{new Date(article.date).toLocaleDateString('es-ES', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}</span>
              {article.author && <span>por {article.author}</span>}
            </div>
            
            {article.tags && article.tags.length > 0 && (
              <div className="flex gap-2">
                {article.tags.map((tag) => (
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

        {/* Content */}
        <div className="prose prose-lg max-w-none">
          <MDXRenderer content={article.content} />
        </div>

        {/* Footer */}
        <footer className="mt-12 pt-8 border-t">
          <div className="flex items-center justify-between">
            <Link
              href="/articulos"
              className="inline-flex items-center text-primary hover:text-primary/80"
            >
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Volver a artículos
            </Link>
            
            <div className="flex items-center space-x-4">
              <span className="text-sm text-muted-foreground">¿Te gustó este artículo?</span>
              <Link
                href="/estudios"
                className="inline-flex items-center px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors"
              >
                Continúa con estudios
              </Link>
            </div>
          </div>
        </footer>
      </article>
    </div>
  )
}