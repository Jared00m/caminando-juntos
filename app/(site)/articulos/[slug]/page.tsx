import { getArticle } from '@/lib/content-git'
import { MDXRenderer } from '@/lib/mdx-renderer';
import { notFound } from 'next/navigation'
import { Metadata } from 'next'
import { ArticleStructuredData, BreadcrumbStructuredData } from '@/components/StructuredData'
import { cookies } from 'next/headers'
import Link from 'next/link'
import Image from 'next/image'
import { Hero } from '@/components/Hero'
import { YouTube } from '@/components/YouTube'
import { defaultLocale, getDictionary, type Locale } from '@/lib/i18n'

interface ArticlePageProps {
  params: Promise<{
    slug: string
  }>
}

export async function generateMetadata({ params }: ArticlePageProps): Promise<Metadata> {
  const { slug } = await params
  const cookieStore = await cookies()
  const locale = (cookieStore.get('NEXT_LOCALE')?.value as Locale) || defaultLocale
  const dictionary = getDictionary(locale)
  const article = await getArticle(slug, locale)

  if (!article) {
    return {
      title: dictionary.articlePage.notFoundTitle,
    }
  }

  const fallbackDescription = dictionary.articlePage.defaultDescription.replace('{title}', article.title)

  return {
    title: `${article.title} | Caminando Juntos`,
    description: article.description || fallbackDescription,
    keywords: article.tags || [...dictionary.articlePage.defaultKeywords],
    authors: article.author ? [{ name: article.author }] : [{ name: dictionary.articlePage.defaultAuthor }],
    openGraph: {
      type: 'article',
      locale: locale === 'pt' ? 'pt_BR' : 'es_ES',
      url: `https://cjuntos.org/articulos/${slug}`,
      title: article.title,
      description: article.description || '',
      siteName: 'Caminando Juntos',
      publishedTime: article.date,
      authors: article.author ? [article.author] : [dictionary.articlePage.defaultAuthor],
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
  const locale = (cookieStore.get('NEXT_LOCALE')?.value as Locale) || defaultLocale
  const dictionary = getDictionary(locale)
  const article = await getArticle(slug, locale)

  if (!article) {
    notFound()
  }

  return (
    <div className="w-full">
      <ArticleStructuredData
        title={article.title}
        description={article.description || ''}
        datePublished={article.date}
        author={article.author || dictionary.articlePage.defaultAuthor}
        image={article.cover}
        url={`https://cjuntos.org/articulos/${slug}`}
      />
      <BreadcrumbStructuredData
        items={[
          { name: dictionary.articlePage.breadcrumbs.home, url: 'https://cjuntos.org' },
          { name: dictionary.articlePage.breadcrumbs.articles, url: 'https://cjuntos.org/articulos' },
          { name: article.title, url: `https://cjuntos.org/articulos/${slug}` },
        ]}
      />
      <article className="w-full">
        <Hero
          title={article.title}
          subtitle={article.description}
          variant="default"
        />

        <div className="container mx-auto px-4 max-w-4xl">
          {article.youtube_id ? (
            <div className="my-8">
              <YouTube id={article.youtube_id} title={article.title} />
            </div>
          ) : article.cover ? (
            <div className="relative aspect-video my-8 rounded-lg overflow-hidden">
              <Image
                src={article.cover}
                alt={article.title}
                fill
                sizes="(max-width: 768px) 100vw, 896px"
                className="object-cover"
              />
            </div>
          ) : null}

          {article.audio_url && (
            <div className="mb-8 rounded-lg border border-gray-200 bg-white p-4 shadow-sm">
              <p className="text-sm font-semibold text-gray-900 mb-2">{dictionary.articlePage.audioLabel}</p>
              <audio controls className="w-full">
                <source src={article.audio_url} />
                {dictionary.articlePage.audioUnsupported}
              </audio>
            </div>
          )}

          {/* Content */}
          <div className="prose prose-lg max-w-none">
            <MDXRenderer content={article.content} />
          </div>

          {/* Footer */}
          <footer className="mt-12 py-8 border-t">
            <div className="flex items-center justify-between">
              <Link
                href="/articulos"
                className="inline-flex items-center text-primary hover:text-primary/80"
              >
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                {dictionary.articlePage.backToArticles}
              </Link>
              
            </div>
          </footer>
        </div>
      </article>
    </div>
  )
}