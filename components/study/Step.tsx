'use client'

import { ReactNode } from 'react'
import { ProgressControls } from './ProgressControls'
import { usePathname } from 'next/navigation'

interface StepProps {
  number: number
  title: string
  children: ReactNode
}

export function Step({ number, title, children }: StepProps) {
  const pathname = usePathname()
  
  // Extract studyId and lessonId from pathname
  // Format: /estudios/[study]/[lesson]
  const pathParts = pathname?.split('/').filter(Boolean) || []
  const studyId = pathParts[1]
  const lessonId = pathParts[2]

  return (
    <div className="border-l-4 border-primary pl-6 py-4 my-6">
      <div className="flex items-center mb-3">
        <div className="w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-bold mr-3">
          {number}
        </div>
        <h3 className="text-lg font-semibold">{title}</h3>
      </div>
      <div className="text-muted-foreground">
        {children}
      </div>
      <ProgressControls step={number} studyId={studyId} lessonId={lessonId} />
    </div>
  )
}