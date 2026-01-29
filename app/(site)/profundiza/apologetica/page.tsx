import Link from 'next/link'
import Image from 'next/image'
import { cookies } from 'next/headers'
import { getArticlesByTag } from '@/lib/content-git'
import { Locale } from '@/lib/i18n'
import { ApologeticsBotCTA } from '@/components/ApologeticsBotCTA'

export default async function ApologeticsPage() {
  const cookieStore = await cookies()
  const locale = (cookieStore.get('NEXT_LOCALE')?.value || 'es') as Locale
  const articles = await getArticlesByTag('apologetica', locale)

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="mx-auto mb-10">
        <h1 className="text-5xl font-bold mb-4 text-deep-indigo">Apologética</h1>
        <p className="text-xl text-muted-foreground leading-relaxed">
          Respuestas claras a preguntas difíciles sobre la fe cristiana. Esta página muestra todos los artículos etiquetados con “apologética”.
        </p>
      </div>

      <div className="max-w-6xl mx-auto">
        {articles.length === 0 ? (
          <div className="text-center py-16 bg-gradient-to-br from-celestial-blue/5 to-sunrise-gold/5 rounded-3xl">
            <div className="w-20 h-20 bg-gradient-to-br from-celestial-blue/20 to-sunrise-gold/20 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <svg className="h-10 w-10 text-celestial-blue" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C20.832 18.477 19.246 18 17.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
            </div>
            <h2 className="text-2xl font-semibold text-deep-indigo mb-2">Próximamente</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Aún no hay artículos de apologética publicados. Cuando agregues artículos con el tag <span className="font-medium">apologetica</span> (en el frontmatter), aparecerán aquí automáticamente.
            </p>
            <p className="text-muted-foreground mt-4">
              Mientras tanto, puedes ver todos los <Link className="text-celestial-blue font-medium hover:underline" href="/articulos">artículos</Link>.
            </p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {articles.map((article) => (
              <Link
                key={article.slug}
                href={`/articulos/${article.slug}`}
                className="group border border-border rounded-2xl overflow-hidden hover:shadow-xl transition-all hover:scale-105 bg-white"
              >
                {article.cover && (
                  <div className="aspect-video overflow-hidden relative bg-gradient-to-br from-celestial-blue/10 to-sunrise-gold/10">
                    <Image
                      src={article.cover}
                      alt={article.title}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      className="object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                  </div>
                )}
                <div className="p-6">
                  <h2 className="text-xl font-semibold mb-3 text-deep-indigo group-hover:text-celestial-blue transition-colors">
                    {article.title}
                  </h2>
                  {article.description && (
                    <p className="text-muted-foreground mb-4 leading-relaxed">{article.description}</p>
                  )}
                  <div className="flex items-center justify-between text-sm text-muted-foreground">
                    <span>{new Date(article.date).toLocaleDateString(locale === 'pt' ? 'pt-BR' : 'es-ES')}</span>
                    {article.tags && article.tags.length > 0 && (
                      <div className="flex gap-2">
                        {article.tags.slice(0, 2).map((tag) => (
                          <span
                            key={tag}
                            className="bg-celestial-blue/10 text-celestial-blue px-3 py-1 rounded-full text-xs font-medium"
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

      <div className="mt-16">
        <ApologeticsBotCTA />
      </div>
    </div>
  )
}
