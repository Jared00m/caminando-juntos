import fs from 'fs/promises'
import path from 'path'
import matter from 'gray-matter'
import { compile } from '@mdx-js/mdx'
import { Article, Video, StudyContent, ContentFrontmatter } from './types'

const CONTENT_DIR = path.join(process.cwd(), 'content')

/**
 * Get all articles from the content directory
 */
export async function getArticles(): Promise<Article[]> {
  try {
    const articlesDir = path.join(CONTENT_DIR, 'articulos')
    const files = await fs.readdir(articlesDir)
    const mdxFiles = files.filter(file => file.endsWith('.mdx'))
    
    const articles = await Promise.all(
      mdxFiles.map(async (file) => {
        const fullPath = path.join(articlesDir, file)
        const fileContent = await fs.readFile(fullPath, 'utf8')
        const { data, content } = matter(fileContent)
        const slug = file.replace('.mdx', '')
        
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
export async function getArticle(slug: string): Promise<Article | null> {
  try {
    const filePath = path.join(CONTENT_DIR, 'articulos', `${slug}.mdx`)
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
export async function getVideos(): Promise<Video[]> {
  try {
    const videosDir = path.join(CONTENT_DIR, 'videos')
    const files = await fs.readdir(videosDir)
    const mdxFiles = files.filter(file => file.endsWith('.mdx'))
    
    const videos = await Promise.all(
      mdxFiles.map(async (file) => {
        const fullPath = path.join(videosDir, file)
        const fileContent = await fs.readFile(fullPath, 'utf8')
        const { data, content } = matter(fileContent)
        const slug = file.replace('.mdx', '')
        
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
export async function getVideo(slug: string): Promise<Video | null> {
  try {
    const filePath = path.join(CONTENT_DIR, 'videos', `${slug}.mdx`)
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
 * Get all lessons for a specific study
 */
export async function getStudyLessons(study: string): Promise<StudyContent[]> {
  try {
    const studyDir = path.join(CONTENT_DIR, 'estudios', study)
    const files = await fs.readdir(studyDir)
    const mdxFiles = files.filter(file => file.endsWith('.mdx'))
    
    const lessons = await Promise.all(
      mdxFiles.map(async (file) => {
        const fullPath = path.join(studyDir, file)
        const fileContent = await fs.readFile(fullPath, 'utf8')
        const { data, content } = matter(fileContent)
        const lesson = file.replace('.mdx', '')
        
        return {
          slug: lesson,
          study,
          lesson,
          content,
          ...data,
        } as StudyContent
      })
    )
    
    // Sort by order if provided, otherwise by filename
    return lessons.sort((a, b) => {
      if (a.order && b.order) {
        return a.order - b.order
      }
      return a.lesson.localeCompare(b.lesson)
    })
  } catch (error) {
    console.error(`Error reading study lessons for ${study}:`, error)
    return []
  }
}

/**
 * Get a specific lesson from a study
 */
export async function getStudyLesson(study: string, lesson: string): Promise<StudyContent | null> {
  try {
    const filePath = path.join(CONTENT_DIR, 'estudios', study, `${lesson}.mdx`)
    const fileContent = await fs.readFile(filePath, 'utf8')
    const { data, content } = matter(fileContent)
    
    return {
      slug: lesson,
      study,
      lesson,
      content,
      ...data,
    } as StudyContent
  } catch (error) {
    console.error(`Error reading study lesson ${study}/${lesson}:`, error)
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