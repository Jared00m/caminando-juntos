import fs from 'fs/promises'
import path from 'path'
import matter from 'gray-matter'
import { compile } from '@mdx-js/mdx'
import { Article, Video, StudyContent, ContentFrontmatter, StudyMetadata, LessonFrontmatter } from './types'

const CONTENT_DIR = path.join(process.cwd(), 'content')

function normalizeLocale(locale: string): 'es' | 'pt' {
  return locale === 'pt' ? 'pt' : 'es'
}

function validateStudyMetadata(meta: any): StudyMetadata {
  const safeString = (v: any, fallback = '') => (typeof v === 'string' ? v : fallback)
  const safeNumber = (v: any) => (typeof v === 'number' ? v : undefined)
  const safeStringArray = (v: any) => (Array.isArray(v) ? v.filter((x) => typeof x === 'string') : undefined)

  const validated: StudyMetadata = {
    title: safeString(meta?.title),
    slug: safeString(meta?.slug),
    description: safeString(meta?.description),
    level: safeString(meta?.level) || undefined,
    lessons: safeNumber(meta?.lessons),
    estimatedTime: safeString(meta?.estimatedTime) || undefined,
    tags: safeStringArray(meta?.tags),
    thumbnail: safeString(meta?.thumbnail) || undefined,
    order: safeNumber(meta?.order),
  }

  if (!validated.title || !validated.slug || !validated.description) {
    console.warn('Study metadata missing required fields:', { title: validated.title, slug: validated.slug, description: validated.description })
  }
  return validated
}

function validateLessonFrontmatter(data: any, lessonPath: string): LessonFrontmatter {
  const safeString = (v: any, fallback = '') => (typeof v === 'string' ? v : fallback)
  const safeNumber = (v: any) => (typeof v === 'number' ? v : undefined)
  const safeStringArray = (v: any) => (Array.isArray(v) ? v.filter((x) => typeof x === 'string') : undefined)

  const validated: LessonFrontmatter = {
    title: safeString(data?.title),
    date: safeString(data?.date),
    order: safeNumber(data?.order) || 0,
    description: safeString(data?.description),
    tags: safeStringArray(data?.tags),
    steps: safeNumber(data?.steps),
    episode: safeNumber(data?.episode),
    author: safeString(data?.author) || undefined,
    duration: safeString(data?.duration) || undefined,
    cover: safeString(data?.cover) || undefined,
  }

  // Validate required fields
  const missing = []
  if (!validated.title) missing.push('title')
  if (!validated.date) missing.push('date')
  if (validated.order === undefined || validated.order === null) missing.push('order')
  if (!validated.description) missing.push('description')

  if (missing.length > 0) {
    console.warn(`Lesson ${lessonPath} missing required frontmatter fields:`, missing)
  }

  return validated
}

/**
 * Get all articles from the content directory
 */
export async function getArticles(locale: string = 'es'): Promise<Article[]> {
  try {
    const articlesDir = path.join(CONTENT_DIR, 'articulos')
    const files = await fs.readdir(articlesDir)
    // Filter for default locale files to get the base list
    const mdxFiles = files.filter(file => file.endsWith('.mdx') && !file.includes('.pt.mdx'))
    
    const articles = await Promise.all(
      mdxFiles.map(async (file) => {
        const slug = file.replace('.mdx', '')
        // Try to find localized version
        let filename = file
        if (locale !== 'es') {
          const localizedFile = `${slug}.${locale}.mdx`
          try {
            await fs.access(path.join(articlesDir, localizedFile))
            filename = localizedFile
          } catch (e) {
            // Fallback to default
          }
        }

        const fullPath = path.join(articlesDir, filename)
        const fileContent = await fs.readFile(fullPath, 'utf8')
        const { data, content } = matter(fileContent)
        
        return {
          slug,
          content,
          ...data,
        } as Article
      })
    )
    
    // Sort by date (newest first)
    return articles.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
  } catch (error) {
    console.error('Error reading articles:', error)
    return []
  }
}

/**
 * Get a single article by slug
 */
export async function getArticle(slug: string, locale: string = 'es'): Promise<Article | null> {
  try {
    const articlesDir = path.join(CONTENT_DIR, 'articulos')
    let filename = `${slug}.mdx`
    
    if (locale !== 'es') {
      const localizedFile = `${slug}.${locale}.mdx`
      try {
        await fs.access(path.join(articlesDir, localizedFile))
        filename = localizedFile
      } catch (e) {
        // Fallback to default
      }
    }

    const filePath = path.join(articlesDir, filename)
    const fileContent = await fs.readFile(filePath, 'utf8')
    const { data, content } = matter(fileContent)
    
    return {
      slug,
      content,
      ...data,
    } as Article
  } catch (error) {
    console.error(`Error reading article ${slug}:`, error)
    return null
  }
}

/**
 * Get all videos from the content directory
 */
export async function getVideos(locale: string = 'es'): Promise<Video[]> {
  try {
    const videosDir = path.join(CONTENT_DIR, 'videos')
    const files = await fs.readdir(videosDir)
    // Filter for default locale files to get the base list
    const mdxFiles = files.filter(file => file.endsWith('.mdx') && !file.includes('.pt.mdx'))
    
    const videos = await Promise.all(
      mdxFiles.map(async (file) => {
        const slug = file.replace('.mdx', '')
        // Try to find localized version
        let filename = file
        if (locale !== 'es') {
          const localizedFile = `${slug}.${locale}.mdx`
          try {
            await fs.access(path.join(videosDir, localizedFile))
            filename = localizedFile
          } catch (e) {
            // Fallback to default
          }
        }

        const fullPath = path.join(videosDir, filename)
        const fileContent = await fs.readFile(fullPath, 'utf8')
        const { data, content } = matter(fileContent)
        
        return {
          slug,
          content,
          ...data,
        } as Video
      })
    )
    
    // Sort by date (newest first)
    return videos.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
  } catch (error) {
    console.error('Error reading videos:', error)
    return []
  }
}

/**
 * Get a single video by slug
 */
export async function getVideo(slug: string, locale: string = 'es'): Promise<Video | null> {
  try {
    const videosDir = path.join(CONTENT_DIR, 'videos')
    let filename = `${slug}.mdx`
    
    if (locale !== 'es') {
      const localizedFile = `${slug}.${locale}.mdx`
      try {
        await fs.access(path.join(videosDir, localizedFile))
        filename = localizedFile
      } catch (e) {
        // Fallback to default
      }
    }

    const filePath = path.join(videosDir, filename)
    const fileContent = await fs.readFile(filePath, 'utf8')
    const { data, content } = matter(fileContent)
    
    return {
      slug,
      content,
      ...data,
    } as Video
  } catch (error) {
    console.error(`Error reading video ${slug}:`, error)
    return null
  }
}

/**
 * Get all studies from the content directory
 */
export async function getStudies(): Promise<string[]> {
  try {
    const studiesDir = path.join(CONTENT_DIR, 'estudios')
    const dirs = await fs.readdir(studiesDir, { withFileTypes: true })
    return dirs
      .filter(dirent => dirent.isDirectory())
      .map(dirent => dirent.name)
  } catch (error) {
    console.error('Error reading studies:', error)
    return []
  }
}

/**
 * Get metadata for a specific study
 */
export async function getStudyMetadata(study: string, locale: string = 'es'): Promise<StudyMetadata | null> {
  try {
    const studyDir = path.join(CONTENT_DIR, 'estudios', study)
    let filename = 'index.json'
    const loc = normalizeLocale(locale)
    if (loc !== 'es') {
      const localizedFile = `index.${locale}.json`
      try {
        await fs.access(path.join(studyDir, localizedFile))
        filename = localizedFile
      } catch (e) {
        // Fallback
      }
    }

    const metadataPath = path.join(studyDir, filename)
    const metadataContent = await fs.readFile(metadataPath, 'utf8')
    const raw = JSON.parse(metadataContent)
    return validateStudyMetadata(raw)
  } catch (error) {
    console.error(`Error reading study metadata for ${study}:`, error)
    return null
  }
}

/**
 * Get metadata for all studies
 */
export async function getStudiesWithMetadata(locale: string = 'es'): Promise<StudyMetadata[]> {
  try {
    const studies = await getStudies()
    const metadata = await Promise.all(
      studies.map(async (study) => {
        const meta = await getStudyMetadata(study, locale)
        return meta || validateStudyMetadata({
          title: study.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' '),
          slug: study,
          description: 'Un estudio bíblico para profundizar en tu fe.',
        })
      })
    )
    // Sort by order if provided
    return metadata.sort((a, b) => (a.order || 999) - (b.order || 999))
  } catch (error) {
    console.error('Error reading studies with metadata:', error)
    return []
  }
}

/**
 * Get all lessons for a specific study
 */
export async function getStudyLessons(study: string, locale: string = 'es'): Promise<StudyContent[]> {
  try {
    const studyDir = path.join(CONTENT_DIR, 'estudios', study)
    const files = await fs.readdir(studyDir)
    // Filter for default locale files to get the base list
    const mdxFiles = files.filter(file => file.endsWith('.mdx') && !file.includes('.pt.mdx'))
    
    const lessons = await Promise.all(
      mdxFiles.map(async (file) => {
        const lessonSlug = file.replace('.mdx', '')
        
        // Try to find localized version
        let filename = file
        if (locale !== 'es') {
          const localizedFile = `${lessonSlug}.${locale}.mdx`
          try {
            await fs.access(path.join(studyDir, localizedFile))
            filename = localizedFile
          } catch (e) {
            // Fallback
          }
        }

        const fullPath = path.join(studyDir, filename)
        const fileContent = await fs.readFile(fullPath, 'utf8')
        const { data, content } = matter(fileContent)
        const validatedFrontmatter = validateLessonFrontmatter(data, `${study}/${lessonSlug}`)
        
        return {
          slug: lessonSlug,
          content,
          study,
          lesson: lessonSlug,
          ...validatedFrontmatter,
        } as StudyContent
      })
    )
    
    // Sort by order or lesson number
    return lessons.sort((a, b) => (a.order || 0) - (b.order || 0))
  } catch (error) {
    console.error(`Error reading lessons for study ${study}:`, error)
    return []
  }
}

/**
 * Get a single lesson
 */
export async function getStudyLesson(study: string, lesson: string, locale: string = 'es'): Promise<StudyContent | null> {
  try {
    const studyDir = path.join(CONTENT_DIR, 'estudios', study)
    let filename = `${lesson}.mdx`
    
    if (locale !== 'es') {
      const localizedFile = `${lesson}.${locale}.mdx`
      try {
        await fs.access(path.join(studyDir, localizedFile))
        filename = localizedFile
      } catch (e) {
        // Fallback
      }
    }

    const filePath = path.join(studyDir, filename)
    const fileContent = await fs.readFile(filePath, 'utf8')
    const { data, content } = matter(fileContent)
    const validatedFrontmatter = validateLessonFrontmatter(data, `${study}/${lesson}`)
    
    return {
      slug: lesson,
      content,
      study,
      lesson,
      ...validatedFrontmatter,
    } as StudyContent
  } catch (error) {
    console.error(`Error reading lesson ${lesson} in study ${study}:`, error)
    return null
  }
}



/**
 * Compile MDX content to HTML
 */
export async function compileMDX(content: string): Promise<string> {
  try {
    const compiled = await compile(content, {
      outputFormat: 'function-body',
      development: process.env.NODE_ENV === 'development',
    })
    
    return String(compiled)
  } catch (error) {
    console.error('Error compiling MDX:', error)
    return '<div>Error loading content</div>'
  }
}

/**
 * Initialize content directory if it doesn't exist
 */
export async function initializeContentDir(): Promise<void> {
  try {
    // Create main content directory
    await fs.mkdir(CONTENT_DIR, { recursive: true })
    
    // Create subdirectories
    await fs.mkdir(path.join(CONTENT_DIR, 'articulos'), { recursive: true })
    await fs.mkdir(path.join(CONTENT_DIR, 'videos'), { recursive: true })
    await fs.mkdir(path.join(CONTENT_DIR, 'estudios'), { recursive: true })
    
    // Create index file
    const indexPath = path.join(CONTENT_DIR, 'index.json')
    const indexExists = await fs.access(indexPath).then(() => true).catch(() => false)
    
    if (!indexExists) {
      const defaultIndex = {
        version: '1.0.0',
        lastUpdated: new Date().toISOString(),
        articles: [],
        videos: [],
        studies: [],
      }
      await fs.writeFile(indexPath, JSON.stringify(defaultIndex, null, 2))
    }
  } catch (error) {
    console.error('Error initializing content directory:', error)
  }
}