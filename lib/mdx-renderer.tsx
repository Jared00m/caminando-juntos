'use client'

import React from 'react'
import ReactMarkdown from 'react-markdown'
import rehypeRaw from 'rehype-raw'
import remarkGfm from 'remark-gfm'
import { Step } from '@/components/study/Step'

interface MDXRendererProps {
  content: string
}

// Parse Step components from MDX content
function parseStepComponents(content: string) {
  const stepRegex = /<Step\s+number={(\d+)}\s+title="([^"]+)">([\s\S]*?)<\/Step>/g
  const parts: Array<{ type: 'markdown' | 'step'; content: string; props?: any }> = []
  let lastIndex = 0
  let match

  while ((match = stepRegex.exec(content)) !== null) {
    // Add markdown before this Step
    if (match.index > lastIndex) {
      parts.push({
        type: 'markdown',
        content: content.slice(lastIndex, match.index),
      })
    }

    // Add the Step component
    parts.push({
      type: 'step',
      content: match[3],
      props: {
        number: parseInt(match[1]),
        title: match[2],
      },
    })

    lastIndex = match.index + match[0].length
  }

  // Add remaining markdown
  if (lastIndex < content.length) {
    parts.push({
      type: 'markdown',
      content: content.slice(lastIndex),
    })
  }

  return parts
}

export function MDXRenderer({ content }: MDXRendererProps) {
  const parts = parseStepComponents(content)

  const components = {
    h2: (props: any) => <h2 className="text-3xl font-bold text-deep-indigo mt-12 mb-6" {...props} />,
    h3: (props: any) => <h3 className="text-2xl font-semibold text-deep-indigo mt-8 mb-4" {...props} />,
    p: (props: any) => <p className="text-lg leading-relaxed mb-6 text-foreground" {...props} />,
    ul: (props: any) => <ul className="space-y-3 my-6 list-disc pl-6" {...props} />,
    ol: (props: any) => <ol className="space-y-3 my-6 list-decimal pl-6" {...props} />,
    li: (props: any) => <li className="text-lg leading-relaxed" {...props} />,
    blockquote: (props: any) => (
      <blockquote 
        className="border-l-4 border-emerald-green pl-6 py-4 my-8 bg-emerald-green/5 rounded-r-2xl font-serif italic text-xl text-deep-indigo" 
        {...props} 
      />
    ),
    strong: (props: any) => <strong className="font-semibold text-deep-indigo" {...props} />,
    em: (props: any) => <em className="italic text-celestial-blue" {...props} />,
  }

  return (
    <>
      {parts.map((part, index) => {
        if (part.type === 'step' && part.props) {
          return (
            <Step
              key={index}
              number={part.props.number}
              title={part.props.title}
            >
              <ReactMarkdown
                components={components}
                remarkPlugins={[remarkGfm]}
                rehypePlugins={[rehypeRaw]}
              >
                {part.content}
              </ReactMarkdown>
            </Step>
          )
        }
        return (
          <ReactMarkdown
            key={index}
            components={components}
            remarkPlugins={[remarkGfm]}
            rehypePlugins={[rehypeRaw]}
          >
            {part.content}
          </ReactMarkdown>
        )
      })}
    </>
  )
}
