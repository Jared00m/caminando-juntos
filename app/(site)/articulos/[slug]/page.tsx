import { getArticle } from '@/lib/content-git'
import { MDXRenderer } from '@/components/mdx/MDXRenderer'
import { notFound } from 'next/navigation'

interface ArticlePageProps {
  params: Promise<{
    slug: string
  }>
}

export default async function ArticlePage({ params }: ArticlePageProps) {
  const { slug } = await params
  const article = await getArticle(slug)

  if (!article) {
    notFound()
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <article className="max-w-4xl mx-auto">
        {/* Header */}
        <header className="mb-8">
          {article.cover && (
            <div className="aspect-video mb-8 rounded-lg overflow-hidden">
              <img
                src={article.cover}
                alt={article.title}
                className="w-full h-full object-cover"
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
          <MDXRenderer content={article.content} frontmatter={article} />
        </div>

        {/* Footer */}
        <footer className="mt-12 pt-8 border-t">
          <div className="flex items-center justify-between">
            <a
              href="/articulos"
              className="inline-flex items-center text-primary hover:text-primary/80"
            >
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Volver a artículos
            </a>
            
            <div className="flex items-center space-x-4">
              <span className="text-sm text-muted-foreground">¿Te gustó este artículo?</span>
              <a
                href="/estudios"
                className="inline-flex items-center px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors"
              >
                Continúa con estudios
              </a>
            </div>
          </div>
        </footer>
      </article>
    </div>
  )
}