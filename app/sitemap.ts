import { MetadataRoute } from 'next'
import { getArticles, getStudiesWithMetadata, getStudyLessons } from '@/lib/content-git'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://cjuntos.org'
  
  // Static pages
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: `${baseUrl}/articulos`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/videos`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/estudios`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/eventos`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/encuentra-ayuda`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.6,
    },
  ]

  // Dynamic article pages
  const articles = await getArticles()
  const articlePages: MetadataRoute.Sitemap = articles.map((article) => ({
    url: `${baseUrl}/articulos/${article.slug}`,
    lastModified: new Date(article.date),
    changeFrequency: 'monthly',
    priority: 0.7,
  }))

  // Dynamic study pages
  const studies = await getStudiesWithMetadata()
  const studyPages: MetadataRoute.Sitemap = []
  
  for (const study of studies) {
    // Add study overview page
    studyPages.push({
      url: `${baseUrl}/estudios/${study.slug}`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    })

    // Add lesson pages
    const lessons = await getStudyLessons(study.slug)
    for (const lesson of lessons) {
      studyPages.push({
        url: `${baseUrl}/estudios/${study.slug}/${lesson.lesson}`,
        lastModified: new Date(),
        changeFrequency: 'monthly',
        priority: 0.7,
      })
    }
  }

  return [...staticPages, ...articlePages, ...studyPages]
}
