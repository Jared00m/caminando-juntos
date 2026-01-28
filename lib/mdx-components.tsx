import React from 'react'
import { usePathname } from 'next/navigation'
import { ProgressControls } from '@/components/study/ProgressControls'
import { Hero } from '@/components/Hero'

type PropsWithChildren = { children?: React.ReactNode }

/**
 * Custom MDX components that style markdown elements with Tailwind
 * These are passed to MDXRemote to override default HTML rendering
 */

// Custom study components
function Step({ number, title, children }: { number: number | string; title: string; children?: React.ReactNode }) {
  const pathname = usePathname()
  const pathParts = pathname?.split('/').filter(Boolean) || []
  const studyId = pathParts[1]
  const lessonId = pathParts[2]
  const stepNumber = typeof number === 'string' ? Number(number) : number

  return (
    <div className="my-12 group">
      <div className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100">
        <div className="bg-gradient-to-r from-blue-500 to-blue-600 px-8 py-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white text-xl font-bold shadow-lg">
              {number}
            </div>
            <h3 className="text-2xl font-bold text-white">{title}</h3>
          </div>
        </div>
        <div className="px-8 py-8 prose prose-lg max-w-none">
          {children}
        </div>
        <div className="px-8 pb-6">
          <ProgressControls step={Number.isFinite(stepNumber) ? stepNumber : 0} studyId={studyId} lessonId={lessonId} />
        </div>
      </div>
    </div>
  )
}

function DevotionalLesson({ children }: PropsWithChildren) {
  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <article className="prose prose-lg prose-gray max-w-none">
        {children}
      </article>
    </div>
  )
}

type SectionVariant = 'default' | 'story' | 'reflection' | 'scripture' | 'truth'

function Section({ children, variant = 'default' }: { children?: React.ReactNode; variant?: SectionVariant }) {
  const variants: Record<string, string> = {
    default: 'my-8',
    story: 'my-8 bg-amber-50 border-l-4 border-amber-400 p-8 rounded-r-xl',
    reflection: 'my-8 bg-blue-50 border-l-4 border-blue-500 p-8 rounded-r-xl',
    scripture: 'my-12 text-center',
    truth: 'my-8 bg-gradient-to-r from-green-50 to-emerald-50 p-8 rounded-xl border-2 border-green-200'
  }
  return <div className={variants[variant]}>{children}</div>
}

function ScriptureVerse({ children, reference }: { children?: React.ReactNode; reference: string }) {
  return (
    <div className="my-12 max-w-2xl mx-auto">
      <div className="relative">
        <div className="absolute -left-4 top-0 text-6xl text-blue-200 font-serif">&ldquo;</div>
        <blockquote className="text-xl md:text-2xl text-gray-700 italic leading-relaxed text-center px-8 py-6">
          {children}
        </blockquote>
        <div className="absolute -right-4 bottom-0 text-6xl text-blue-200 font-serif">&rdquo;</div>
      </div>
      <p className="text-center text-sm font-semibold text-gray-600 mt-4">— {reference}</p>
    </div>
  )
}

function Thought({ children }: PropsWithChildren) {
  return (
    <div className="my-8 bg-gradient-to-r from-purple-50 to-pink-50 p-6 rounded-xl border-l-4 border-purple-400">
      <div className="flex gap-3">
        <span className="text-2xl">💭</span>
        <div className="flex-1 text-gray-700 leading-relaxed">
          {children}
        </div>
      </div>
    </div>
  )
}

function TakeAway({ children }: PropsWithChildren) {
  return (
    <div className="my-12 bg-gradient-to-br from-blue-600 to-blue-700 text-white p-8 rounded-2xl shadow-xl">
      <h3 className="text-2xl font-bold mb-4 flex items-center gap-3">
        <span className="text-3xl text-white">💡</span>
        Para Recordar
      </h3>
      <div className="text-lg leading-relaxed text-white">
        {children}
      </div>
    </div>
  )
}

function Question({ children }: PropsWithChildren) {
  return (
    <div className="my-8 bg-yellow-50 border-2 border-yellow-300 p-6 rounded-xl">
      <div className="flex gap-3">
        <span className="text-2xl flex-shrink-0">🤔</span>
        <div className="flex-1">
          <p className="font-semibold text-gray-900 mb-2">Pausa para reflexionar:</p>
          <div className="text-gray-700 leading-relaxed">
            {children}
          </div>
        </div>
      </div>
    </div>
  )
}

function YouTube({ id, title, caption }: { id: string; title?: string; caption?: React.ReactNode }) {
  const embedUrl = `https://www.youtube.com/embed/${id}?modestbranding=1&rel=0`

  return (
    <div className="my-8">
      <div className="shadow-[0_22px_68px_-22px_rgba(15,23,42,0.55),0_10px_32px_-16px_rgba(15,23,42,0.35)] rounded-xl overflow-hidden">
        <div className="relative aspect-video bg-black">
          <iframe
            className="absolute inset-0 h-full w-full"
            src={embedUrl}
            title={title || 'Video de YouTube'}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
      </div>
      {caption && (
        <div className="mt-3 text-xs text-gray-600">
          {caption}
        </div>
      )}
    </div>
  )
}

export const mdxComponents = {
  // Custom study components (can be used in MDX as <Step>, <Section>, etc.)
  Hero,
  Step,
  DevotionalLesson,
  Section,
  ScriptureVerse,
  Thought,
  TakeAway,
  Question,
  YouTube,
  // Headings
  h1: ({ children, ...props }: React.ComponentPropsWithoutRef<'h1'>) => (
    <h1 className="text-4xl font-bold mb-6 mt-8" {...props}>{children}</h1>
  ),
  h2: ({ children, ...props }: React.ComponentPropsWithoutRef<'h2'>) => (
    <h2 className="text-3xl font-semibold mb-4 mt-8 border-b pb-2" {...props}>{children}</h2>
  ),
  h3: ({ children, ...props }: React.ComponentPropsWithoutRef<'h3'>) => (
    <h3 className="text-2xl font-semibold mb-3 mt-6" {...props}>{children}</h3>
  ),
  h4: ({ children, ...props }: React.ComponentPropsWithoutRef<'h4'>) => (
    <h4 className="text-xl font-semibold mb-2 mt-4" {...props}>{children}</h4>
  ),
  
  // Paragraphs and text
  p: ({ children, ...props }: React.ComponentPropsWithoutRef<'p'>) => (
    <p className="mb-4 leading-relaxed text-inherit" {...props}>{children}</p>
  ),
  
  // Lists
  ul: ({ children, ...props }: React.ComponentPropsWithoutRef<'ul'>) => (
    <ul className="list-disc list-inside mb-4 ml-2 space-y-2" {...props}>{children}</ul>
  ),
  ol: ({ children, ...props }: React.ComponentPropsWithoutRef<'ol'>) => (
    <ol className="list-decimal list-inside mb-4 ml-2 space-y-2" {...props}>{children}</ol>
  ),
  li: ({ children, ...props }: React.ComponentPropsWithoutRef<'li'>) => (
    <li className="text-gray-700" {...props}>{children}</li>
  ),
  
  // Links
  a: ({ children, className, ...props }: React.ComponentPropsWithoutRef<'a'>) => (
    <a className={`text-blue-600 hover:text-blue-800 underline ${className ?? ''}`} {...props}>
      {children}
    </a>
  ),
  
  // Code
  code: ({ children, className, ...props }: React.ComponentPropsWithoutRef<'code'>) => (
    <code className={`bg-gray-100 px-2 py-1 rounded text-sm font-mono text-red-600 ${className ?? ''}`} {...props}>
      {children}
    </code>
  ),
  
  // Code blocks (pre + code)
  pre: ({ children, className, ...props }: React.ComponentPropsWithoutRef<'pre'>) => (
    <pre className={`bg-gray-900 text-gray-100 p-4 rounded-lg mb-4 overflow-x-auto ${className ?? ''}`} {...props}>
      {children}
    </pre>
  ),
  
  // Blockquotes
  blockquote: ({ children, className, ...props }: React.ComponentPropsWithoutRef<'blockquote'>) => (
    <blockquote className={`border-l-4 border-blue-500 pl-4 italic text-gray-600 my-4 bg-blue-50 py-2 px-3 rounded ${className ?? ''}`} {...props}>
      {children}
    </blockquote>
  ),
  
  // Horizontal rule
  hr: () => (
    <hr className="my-6 border-gray-300" />
  ),
  
  // Tables
  table: ({ children, className, ...props }: React.ComponentPropsWithoutRef<'table'>) => (
    <table className={`w-full border-collapse mb-4 ${className ?? ''}`} {...props}>{children}</table>
  ),
  thead: ({ children, className, ...props }: React.ComponentPropsWithoutRef<'thead'>) => (
    <thead className={`bg-gray-200 ${className ?? ''}`} {...props}>{children}</thead>
  ),
  tbody: ({ children, ...props }: React.ComponentPropsWithoutRef<'tbody'>) => (
    <tbody {...props}>{children}</tbody>
  ),
  tr: ({ children, className, ...props }: React.ComponentPropsWithoutRef<'tr'>) => (
    <tr className={`border-b ${className ?? ''}`} {...props}>{children}</tr>
  ),
  th: ({ children, className, ...props }: React.ComponentPropsWithoutRef<'th'>) => (
    <th className={`border p-2 text-left font-bold ${className ?? ''}`} {...props}>{children}</th>
  ),
  td: ({ children, className, ...props }: React.ComponentPropsWithoutRef<'td'>) => (
    <td className={`border p-2 ${className ?? ''}`} {...props}>{children}</td>
  ),
  
  // Images
  img: ({ className, alt, ...props }: React.ImgHTMLAttributes<HTMLImageElement>) => (
    // MDX images often point to remote URLs not configured for next/image.
    // eslint-disable-next-line @next/next/no-img-element
    <img alt={alt ?? ''} className={`max-w-full h-auto rounded-lg my-4 ${className ?? ''}`} {...props} />
  ),
}
