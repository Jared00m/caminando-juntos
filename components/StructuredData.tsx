interface ArticleStructuredDataProps {
  title: string
  description: string
  datePublished: string
  dateModified?: string
  author: string
  image?: string
  url: string
}

export function ArticleStructuredData({
  title,
  description,
  datePublished,
  dateModified,
  author,
  image,
  url,
}: ArticleStructuredDataProps) {
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: title,
    description: description,
    datePublished: datePublished,
    dateModified: dateModified || datePublished,
    author: {
      '@type': 'Organization',
      name: author,
      url: 'https://cjuntos.org',
    },
    publisher: {
      '@type': 'Organization',
      name: 'Caminando Juntos',
      url: 'https://cjuntos.org',
      logo: {
        '@type': 'ImageObject',
        url: 'https://cjuntos.org/logo.png',
      },
    },
    image: image || 'https://cjuntos.org/logo.png',
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': url,
    },
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  )
}

interface BreadcrumbStructuredDataProps {
  items: Array<{
    name: string
    url: string
  }>
}

export function BreadcrumbStructuredData({ items }: BreadcrumbStructuredDataProps) {
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  )
}

interface CourseStructuredDataProps {
  name: string
  description: string
  provider: string
  url: string
  numberOfLessons?: number
  estimatedTime?: string
}

export function CourseStructuredData({
  name,
  description,
  provider,
  url,
  numberOfLessons,
  estimatedTime,
}: CourseStructuredDataProps) {
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'Course',
    name: name,
    description: description,
    provider: {
      '@type': 'Organization',
      name: provider,
      url: 'https://cjuntos.org',
    },
    url: url,
    ...(numberOfLessons && { numberOfLessons }),
    ...(estimatedTime && { timeRequired: estimatedTime }),
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  )
}
