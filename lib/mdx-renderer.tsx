'use client'

import { MDXRemote } from 'next-mdx-remote/rsc'
import { mdxComponents } from '@/lib/mdx-components'

interface MDXRendererProps {
  content: string
}

/**
 * Simple MDX renderer that compiles and renders markdown content.
 * 
 * How it works:
 * 1. Takes raw MDX string (content)
 * 2. next-mdx-remote compiles it safely
 * 3. Renders markdown elements using custom components from mdxComponents
 * 4. Custom components like <Step>, <Section> work automatically
 * 
 * Example MDX:
 * # My Title
 * 
 * Some paragraph text.
 * 
 * <Step number={1} title="First Step">
 *   Content inside the step
 * </Step>
 */
export function MDXRenderer({ content }: MDXRendererProps) {
  return (
    <MDXRemote 
      source={content} 
      components={mdxComponents}
    />
  )
}