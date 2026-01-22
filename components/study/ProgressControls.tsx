'use client'

import { useCallback, useEffect, useState } from 'react'
import { useAuth } from '@/lib/auth-context'

interface ProgressControlsProps {
  step: number
  studyId?: string
  lessonId?: string
}

export function ProgressControls({ step, studyId, lessonId }: ProgressControlsProps) {
  const { userId, isAuthenticated, accessToken } = useAuth()
  const [isCompleted, setIsCompleted] = useState(false)
  const [loading, setLoading] = useState(false)

  const checkProgress = useCallback(async () => {
    if (!studyId || !lessonId) return

    try {
      const params = new URLSearchParams({
        userId,
        isAuthenticated: isAuthenticated.toString(),
        studyId,
        lessonId,
        step: step.toString(),
      })

      const response = await fetch(`/api/study-progress?${params}` , {
        headers: isAuthenticated && accessToken ? { authorization: `Bearer ${accessToken}` } : undefined,
      })
      const data = await response.json()
      setIsCompleted(data.completed)
    } catch (error) {
      console.error('Error checking progress:', error)
    }
  }, [accessToken, isAuthenticated, lessonId, step, studyId, userId])

  useEffect(() => {
    checkProgress()
  }, [checkProgress])

  const markCompleted = async () => {
    if (!studyId || !lessonId) return

    setLoading(true)
    try {
      const response = await fetch('/api/study-progress', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(isAuthenticated && accessToken ? { authorization: `Bearer ${accessToken}` } : {}),
        },
        body: JSON.stringify({
          userId,
          isAuthenticated,
          studyId,
          lessonId,
          step,
        }),
      })

      if (response.ok) {
        setIsCompleted(true)
      }
    } catch (error) {
      console.error('Error saving progress:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="mt-4">
      {isCompleted ? (
        <div className="flex items-center text-green-600">
          <svg className="h-5 w-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
          </svg>
          <span className="font-medium">¡Paso completado!</span>
        </div>
      ) : (
        <button
          onClick={markCompleted}
          disabled={loading}
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary disabled:opacity-50"
        >
          {loading ? (
            <>
              <svg className="animate-spin -ml-1 mr-3 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Guardando...
            </>
          ) : (
            'Marcar como completado'
          )}
        </button>
      )}
    </div>
  )
}