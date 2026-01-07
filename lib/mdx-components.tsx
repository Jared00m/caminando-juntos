import React from 'react'
import { usePathname } from 'next/navigation'
import { ProgressControls } from '@/components/study/ProgressControls'

/**
 * Custom MDX components that style markdown elements with Tailwind
 * These are passed to MDXRemote to override default HTML rendering
 */

// Custom study components
function Step({ number, title, children }: any) {
  const pathname = usePathname()
  const pathParts = pathname?.split('/').filter(Boolean) || []
  const studyId = pathParts[1]
  const lessonId = pathParts[2]

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
          <ProgressControls step={number} studyId={studyId} lessonId={lessonId} />
        </div>
      </div>
    </div>
  )
}

function DevotionalLesson({ children }: any) {
  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <article className="prose prose-lg prose-gray max-w-none">
        {children}
      </article>
    </div>
  )
}

function Section({ children, variant = 'default' }: any) {
  const variants: Record<string, string> = {
    default: 'my-8',
    story: 'my-8 bg-amber-50 border-l-4 border-amber-400 p-8 rounded-r-xl',
    reflection: 'my-8 bg-blue-50 border-l-4 border-blue-500 p-8 rounded-r-xl',
    scripture: 'my-12 text-center',
    truth: 'my-8 bg-gradient-to-r from-green-50 to-emerald-50 p-8 rounded-xl border-2 border-green-200'
  }
  return <div className={variants[variant as string]}>{children}</div>
}

function ScriptureVerse({ children, reference }: any) {
  return (
    <div className="my-12 max-w-2xl mx-auto">
      <div className="relative">
        <div className="absolute -left-4 top-0 text-6xl text-blue-200 font-serif">"</div>
        <blockquote className="text-xl md:text-2xl text-gray-700 italic leading-relaxed text-center px-8 py-6">
          {children}
        </blockquote>
        <div className="absolute -right-4 bottom-0 text-6xl text-blue-200 font-serif">"</div>
      </div>
      <p className="text-center text-sm font-semibold text-gray-600 mt-4">— {reference}</p>
    </div>
  )
}

function Thought({ children }: any) {
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

function TakeAway({ children }: any) {
  return (
    <div className="my-12 bg-gradient-to-br from-blue-600 to-blue-700 text-white p-8 rounded-2xl shadow-xl">
      <h3 className="text-2xl font-bold mb-4 flex items-center gap-3">
        <span className="text-3xl">💡</span>
        Para Recordar
      </h3>
      <div className="text-lg leading-relaxed text-blue-50">
        {children}
      </div>
    </div>
  )
}

function Question({ children }: any) {
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

function YouTube({ id }: any) {
  return (
    <div className="my-6 relative w-full" style={{ paddingBottom: '56.25%' }}>
      <iframe
        className="absolute top-0 left-0 w-full h-full rounded-lg"
        src={`https://www.youtube.com/embed/${id}`}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />
    </div>
  )
}

export const mdxComponents = {
  // Custom study components (can be used in MDX as <Step>, <Section>, etc.)
  Step,
  DevotionalLesson,
  Section,
  ScriptureVerse,
  Thought,
  TakeAway,
  Question,
  YouTube,
  // Headings
  h1: ({ children }: any) => (
    <h1 className="text-4xl font-bold mb-6 mt-8">{children}</h1>
  ),
  h2: ({ children }: any) => (
    <h2 className="text-3xl font-semibold mb-4 mt-8 border-b pb-2">{children}</h2>
  ),
  h3: ({ children }: any) => (
    <h3 className="text-2xl font-semibold mb-3 mt-6">{children}</h3>
  ),
  h4: ({ children }: any) => (
    <h4 className="text-xl font-semibold mb-2 mt-4">{children}</h4>
  ),
  
  // Paragraphs and text
  p: ({ children }: any) => (
    <p className="mb-4 leading-relaxed text-gray-700">{children}</p>
  ),
  
  // Lists
  ul: ({ children }: any) => (
    <ul className="list-disc list-inside mb-4 ml-2 space-y-2">{children}</ul>
  ),
  ol: ({ children }: any) => (
    <ol className="list-decimal list-inside mb-4 ml-2 space-y-2">{children}</ol>
  ),
  li: ({ children }: any) => (
    <li className="text-gray-700">{children}</li>
  ),
  
  // Links
  a: ({ href, children }: any) => (
    <a href={href} className="text-blue-600 hover:text-blue-800 underline">
      {children}
    </a>
  ),
  
  // Code
  code: ({ children }: any) => (
    <code className="bg-gray-100 px-2 py-1 rounded text-sm font-mono text-red-600">
      {children}
    </code>
  ),
  
  // Code blocks (pre + code)
  pre: ({ children }: any) => (
    <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg mb-4 overflow-x-auto">
      {children}
    </pre>
  ),
  
  // Blockquotes
  blockquote: ({ children }: any) => (
    <blockquote className="border-l-4 border-blue-500 pl-4 italic text-gray-600 my-4 bg-blue-50 py-2 px-3 rounded">
      {children}
    </blockquote>
  ),
  
  // Horizontal rule
  hr: () => (
    <hr className="my-6 border-gray-300" />
  ),
  
  // Tables
  table: ({ children }: any) => (
    <table className="w-full border-collapse mb-4">{children}</table>
  ),
  thead: ({ children }: any) => (
    <thead className="bg-gray-200">{children}</thead>
  ),
  tbody: ({ children }: any) => (
    <tbody>{children}</tbody>
  ),
  tr: ({ children }: any) => (
    <tr className="border-b">{children}</tr>
  ),
  th: ({ children }: any) => (
    <th className="border p-2 text-left font-bold">{children}</th>
  ),
  td: ({ children }: any) => (
    <td className="border p-2">{children}</td>
  ),
  
  // Images
  img: ({ src, alt }: any) => (
    <img src={src} alt={alt} className="max-w-full h-auto rounded-lg my-4" />
  ),
}
