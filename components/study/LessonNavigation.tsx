'use client'

import Link from 'next/link'

interface LessonNavigationProps {
  studyId: string
  previousLesson?: {
    lesson: string
    title: string
  }
  nextLesson?: {
    lesson: string
    title: string
  }
}

export function LessonNavigation({ studyId, previousLesson, nextLesson }: LessonNavigationProps) {
  return (
    <div className="flex items-center justify-between gap-4 bg-white rounded-2xl p-6 shadow-lg border border-border">
      {previousLesson ? (
        <Link
          href={`/estudios/${studyId}/${previousLesson.lesson}`}
          className="group flex items-center space-x-3 px-6 py-3 rounded-xl border-2 border-border hover:border-celestial-blue hover:bg-celestial-blue/5 transition-all"
        >
          <svg className="w-5 h-5 text-celestial-blue group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          <div className="text-left">
            <div className="text-xs text-muted-foreground font-medium uppercase tracking-wide">Anterior</div>
            <div className="text-sm font-semibold text-deep-indigo group-hover:text-celestial-blue transition-colors">
              {previousLesson.title}
            </div>
          </div>
        </Link>
      ) : (
        <div className="flex-1" />
      )}

      {nextLesson ? (
        <Link
          href={`/estudios/${studyId}/${nextLesson.lesson}`}
          className="group flex items-center space-x-3 px-6 py-3 rounded-xl border-2 border-border hover:border-emerald-green hover:bg-emerald-green/5 transition-all"
        >
          <div className="text-right">
            <div className="text-xs text-muted-foreground font-medium uppercase tracking-wide">Siguiente</div>
            <div className="text-sm font-semibold text-deep-indigo group-hover:text-emerald-green transition-colors">
              {nextLesson.title}
            </div>
          </div>
          <svg className="w-5 h-5 text-emerald-green group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </Link>
      ) : (
        <div className="flex-1" />
      )}
    </div>
  )
}
