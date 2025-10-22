import { getArticles } from '@/lib/content-git'
import Link from 'next/link'

export default async function ArticlesPage() {
  const articles = await getArticles()

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">Artículos</h1>
      <p className="text-xl text-muted-foreground mb-12">
        Descubre artículos que te ayudarán a conocer más sobre Jesús y crecer en tu fe.
      </p>

      {articles.length === 0 ? (
        <div className="text-center py-16">
          <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C20.832 18.477 19.246 18 17.5 18c-1.746 0-3.332.477-4.5 1.253" />
          </svg>
          <h3 className="mt-2 text-sm font-medium text-gray-900">No hay artículos disponibles</h3>
          <p className="mt-1 text-sm text-gray-500">
            Pronto tendremos artículos disponibles para ti.
          </p>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {articles.map((article) => (
            <Link
              key={article.slug}
              href={`/articulos/${article.slug}`}
              className="group border rounded-lg overflow-hidden hover:shadow-lg transition-shadow"
            >
              {article.cover && (
                <div className="aspect-video overflow-hidden">
                  <img
                    src={article.cover}
                    alt={article.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                  />
                </div>
              )}
              <div className="p-6">
                <h2 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors">
                  {article.title}
                </h2>
                {article.description && (
                  <p className="text-muted-foreground mb-4">{article.description}</p>
                )}
                <div className="flex items-center justify-between text-sm text-muted-foreground">
                  <span>{new Date(article.date).toLocaleDateString('es-ES')}</span>
                  {article.tags && article.tags.length > 0 && (
                    <div className="flex gap-2">
                      {article.tags.slice(0, 2).map((tag) => (
                        <span
                          key={tag}
                          className="bg-primary/10 text-primary px-2 py-1 rounded-full text-xs"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}