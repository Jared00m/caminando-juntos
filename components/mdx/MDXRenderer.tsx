'use client'

interface MDXRendererProps {
  content: string
  frontmatter?: any
}

export function MDXRenderer({ content, frontmatter }: MDXRendererProps) {
  // Simple markdown-like rendering for now
  // In production, you would use a proper MDX compiler
  
  const processContent = (text: string) => {
    // Basic markdown processing
    return text
      .replace(/^# (.*$)/gm, '<h1 class="text-3xl font-bold mb-4">$1</h1>')
      .replace(/^## (.*$)/gm, '<h2 class="text-2xl font-semibold mb-3 mt-6">$1</h2>')
      .replace(/^### (.*$)/gm, '<h3 class="text-xl font-semibold mb-2 mt-4">$1</h3>')
      .replace(/^> (.*$)/gm, '<blockquote class="border-l-4 border-primary pl-4 italic text-muted-foreground my-4 bg-muted/20 py-2">$1</blockquote>')
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/\*(.*?)\*/g, '<em>$1</em>')
      .replace(/`(.*?)`/g, '<code class="bg-muted px-1 py-0.5 rounded text-sm">$1</code>')
      .replace(/\[(.*?)\]\((.*?)\)/g, '<a href="$2" class="text-primary hover:text-primary/80 underline">$1</a>')
      .replace(/\n\n/g, '</p><p class="mb-4 leading-relaxed">')
      .replace(/\n/g, '<br>')
  }

  const processedContent = processContent(content)

  return (
    <div 
      className="prose prose-gray max-w-none"
      dangerouslySetInnerHTML={{ 
        __html: `<p class="mb-4 leading-relaxed">${processedContent}</p>` 
      }} 
    />
  )
}