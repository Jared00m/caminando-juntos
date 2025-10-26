'use client'

import { useState } from 'react'
import { useAuth } from '@/lib/auth-context'

export function AuthButton() {
  const { user, isAuthenticated, isLoading, signOut } = useAuth()
  const [showModal, setShowModal] = useState(false)
  const [isSignUp, setIsSignUp] = useState(false)

  if (isLoading) {
    return <div className="h-9 w-20 bg-gray-200 animate-pulse rounded-lg" />
  }

  if (isAuthenticated && user) {
    return (
      <div className="flex items-center gap-3">
        <span className="text-sm text-muted-foreground hidden sm:inline">
          {user.email}
        </span>
        <button
          onClick={() => signOut()}
          className="px-4 py-2 text-sm font-medium text-celestial-blue hover:text-celestial-blue/80 transition-colors"
        >
          Cerrar sesión
        </button>
      </div>
    )
  }

  return (
    <>
      <button
        onClick={() => {
          setIsSignUp(false)
          setShowModal(true)
        }}
        className="px-4 py-2 text-sm font-medium text-celestial-blue hover:text-celestial-blue/80 transition-colors"
      >
        Iniciar sesión
      </button>

      {showModal && (
        <AuthModal
          isSignUp={isSignUp}
          onClose={() => setShowModal(false)}
          onToggleMode={() => setIsSignUp(!isSignUp)}
        />
      )}
    </>
  )
}

interface AuthModalProps {
  isSignUp: boolean
  onClose: () => void
  onToggleMode: () => void
}

function AuthModal({ isSignUp, onClose, onToggleMode }: AuthModalProps) {
  const { signIn, signUp } = useAuth()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [displayName, setDisplayName] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setSuccess('')
    setLoading(true)

    try {
      if (isSignUp) {
        await signUp(email, password, displayName)
        // Show success message for signup (email confirmation required)
        setSuccess('¡Cuenta creada! Por favor revisa tu correo electrónico para confirmar tu cuenta.')
        setLoading(false)
        // Don't close modal so user can see the message
        return
      } else {
        await signIn(email, password)
        // Wait a bit for auth state to propagate
        await new Promise(resolve => setTimeout(resolve, 500))
        onClose()
      }
    } catch (err: any) {
      // Translate common Supabase error messages to Spanish
      const errorMessage = err.message || 'Ocurrió un error'
      let translatedError = errorMessage
      
      if (errorMessage.includes('Email not confirmed')) {
        translatedError = 'Por favor confirma tu correo electrónico. Revisa tu bandeja de entrada.'
      } else if (errorMessage.includes('Invalid login credentials')) {
        translatedError = 'Correo o contraseña incorrectos.'
      } else if (errorMessage.includes('User already registered')) {
        translatedError = 'Este correo ya está registrado.'
      } else if (errorMessage.includes('Password should be at least')) {
        translatedError = 'La contraseña debe tener al menos 6 caracteres.'
      } else if (errorMessage.includes('Unable to validate email address')) {
        translatedError = 'Correo electrónico inválido.'
      } else if (errorMessage.includes('Email rate limit exceeded')) {
        translatedError = 'Demasiados intentos. Por favor espera unos minutos.'
      }
      
      setError(translatedError)
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className="fixed left-1/2 top-1/2 -translate-x-1/2  z-50 w-full max-w-md p-4">
        <div className="bg-white rounded-2xl shadow-2xl p-8 w-full relative max-h-[90vh] overflow-y-auto">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 z-10"
          >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <h2 className="text-3xl font-bold text-deep-indigo mb-6">
          {isSignUp ? 'Crear cuenta' : 'Iniciar sesión'}
        </h2>

        {success && (
          <div className="mb-4 p-3 bg-emerald-green/10 border border-emerald-green rounded-lg text-emerald-green text-sm">
            {success}
          </div>
        )}

        {error && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {isSignUp && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Nombre
              </label>
              <input
                type="text"
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-celestial-blue focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed"
                required={isSignUp}
                disabled={!!success}
              />
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Correo electrónico
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-celestial-blue focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed"
              required
              disabled={!!success}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Contraseña
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-celestial-blue focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed"
              required
              minLength={6}
              disabled={!!success}
            />
          </div>

          <button
            type="submit"
            disabled={loading || !!success}
            className="w-full px-4 py-3 bg-celestial-blue text-white font-semibold rounded-lg hover:bg-celestial-blue/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Cargando...' : isSignUp ? 'Crear cuenta' : 'Iniciar sesión'}
          </button>
        </form>

        <div className="mt-6 text-center">
          <button
            onClick={onToggleMode}
            className="text-sm text-celestial-blue hover:text-celestial-blue/80 transition-colors"
          >
            {isSignUp ? '¿Ya tienes cuenta? Inicia sesión' : '¿No tienes cuenta? Regístrate'}
          </button>
        </div>

        {!isSignUp && (
          <div className="mt-4 p-4 bg-emerald-green/5 rounded-lg border border-emerald-green/20">
            <p className="text-sm text-center text-muted-foreground">
              💡 <strong>Consejo:</strong> Puedes estudiar sin crear una cuenta. 
              Registrarte te permite guardar tu progreso y conectar con un misionero.
            </p>
          </div>
        )}
        </div>
      </div>
    </>
  )
}
