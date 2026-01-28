import Link from 'next/link'
import { notFound } from 'next/navigation'
import { cookies } from 'next/headers'
import { YouTube } from '@/components/YouTube'
import { MDXRenderer } from '@/lib/mdx-renderer'
import { getTestimony } from '@/lib/content-git'
import { getDictionary, type Locale } from '@/lib/i18n'

interface TestimonyPageProps {
  params: Promise<{
    slug: string
  }>
}

export default async function TestimonyPage({ params }: TestimonyPageProps) {
  const { slug } = await params
  const cookieStore = await cookies()
  const locale = (cookieStore.get('NEXT_LOCALE')?.value || 'es') as Locale
  const dict = getDictionary(locale)
  const testimony = await getTestimony(slug, locale)

  if (!testimony) {
    notFound()
  }

  return (
    <div className="container mx-auto px-4 py-12 max-w-3xl">
      <Link href="/comienza-aqui/testimonios" className="text-sm text-gray-600 hover:text-gray-900">
        ← {dict.testimoniesPage.backToIndex}
      </Link>

      <h1 className="text-3xl font-bold mt-4 text-gray-900">{testimony.title}</h1>
      {testimony.tags && testimony.tags.length > 0 && (
        <div className="flex flex-wrap gap-2 mt-3">
          {testimony.tags.map((tag) => (
            <span key={tag} className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded-full">
              {tag}
            </span>
          ))}
        </div>
      )}

      {testimony.youtube_id && <YouTube id={testimony.youtube_id} title={testimony.title} />}

      <div className="prose prose-lg max-w-none">
        <MDXRenderer content={testimony.content} />
      </div>
    </div>
  )
}
