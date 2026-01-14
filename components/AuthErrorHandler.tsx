'use client'

import { useEffect, useMemo } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'

export function AuthErrorHandler() {
  const searchParams = useSearchParams()
  const router = useRouter()

  const errorMessage = useMemo(() => {
    const errorCode = searchParams.get('error_code')
    const errorDescription = searchParams.get('error_description')

    if (!errorCode) return null

    switch (errorCode) {
      case 'otp_expired':
        return 'El enlace de confirmación ha expirado. Por favor, solicita un nuevo correo de confirmación.'
      case 'access_denied':
        return 'Acceso denegado. Por favor, verifica tu correo electrónico.'
      default:
        return errorDescription || 'Ocurrió un error durante la autenticación.'
    }
  }, [searchParams])

  useEffect(() => {
    if (!errorMessage) return

    const timeout = setTimeout(() => {
      router.replace('/')
    }, 100)

    return () => clearTimeout(timeout)
  }, [errorMessage, router])

  if (!errorMessage) return null

  return (
    <div className="fixed top-20 left-1/2 -translate-x-1/2 z-50 max-w-md w-full mx-4">
      <div className="bg-red-50 border-2 border-red-200 rounded-lg p-4 shadow-lg">
        <div className="flex items-start gap-3">
          <svg className="w-6 h-6 text-red-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <div className="flex-1">
            <h3 className="font-semibold text-red-900 mb-1">Error de autenticación</h3>
            <p className="text-sm text-red-700">{errorMessage}</p>
          </div>
          <button
            onClick={() => router.replace('/')}
            className="text-red-400 hover:text-red-600 flex-shrink-0"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  )
}
