'use client'

import { ReactNode } from 'react'

interface OnlyProps {
  when: boolean
  children: ReactNode
  fallback?: ReactNode
}

/**
 * Conditional rendering component for feature flags and other conditions
 */
export function Only({ when, children, fallback = null }: OnlyProps) {
  return when ? <>{children}</> : <>{fallback}</>
}