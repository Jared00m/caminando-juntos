'use client'

import { useState } from 'react'
import { useAuth } from '@/lib/auth-context'

type AuthDictionary = {
  signIn: string
  signUp: string
  signOut: string
  modal?: {
    titleSignIn: string
    titleSignUp: string
    nameLabel: string
    emailLabel: string
    passwordLabel: string
    submitSignIn: string
    submitSignUp: string
    loading: string
    toggleToSignIn: string
    toggleToSignUp: string
    tipTitle: string
    tipBody: string
    successSignUp: string
    errors: {
      generic: string
      emailNotConfirmed: string
      invalidLogin: string
      alreadyRegistered: string
      passwordTooShort: string
      invalidEmail: string
      rateLimit: string
    }
  }
}

interface AuthButtonProps {
  dictionary?: AuthDictionary
}

export function AuthButton({ dictionary }: AuthButtonProps) {
  const { user, isAuthenticated, isLoading, signOut } = useAuth()
  const [showModal, setShowModal] = useState(false)
  const [isSignUp, setIsSignUp] = useState(false)

  const t: AuthDictionary = dictionary || {
    signIn: 'Iniciar sesión',
    signUp: 'Registrarse',
    signOut: 'Cerrar sesión',
    modal: {
      titleSignIn: 'Iniciar sesión',
      titleSignUp: 'Crear cuenta',
      nameLabel: 'Nombre',
      emailLabel: 'Correo electrónico',
      passwordLabel: 'Contraseña',
      submitSignIn: 'Iniciar sesión',
      submitSignUp: 'Crear cuenta',
      loading: 'Cargando...',
      toggleToSignIn: '¿Ya tienes cuenta? Inicia sesión',
      toggleToSignUp: '¿No tienes cuenta? Regístrate',
      tipTitle: 'Consejo:',
      tipBody:
        'Puedes estudiar sin crear una cuenta. Registrarte te permite guardar tu progreso y conectar con un misionero.',
      successSignUp: '¡Cuenta creada! Por favor revisa tu correo electrónico para confirmar tu cuenta.',
      errors: {
        generic: 'Ocurrió un error',
        emailNotConfirmed: 'Por favor confirma tu correo electrónico. Revisa tu bandeja de entrada.',
        invalidLogin: 'Correo o contraseña incorrectos.',
        alreadyRegistered: 'Este correo ya está registrado.',
        passwordTooShort: 'La contraseña debe tener al menos 6 caracteres.',
        invalidEmail: 'Correo electrónico inválido.',
        rateLimit: 'Demasiados intentos. Por favor espera unos minutos.',
      },
    },
  }

  if (isLoading) {
    return <div className="h-9 w-20 bg-gray-200 animate-pulse rounded-lg" />
  }

  if (isAuthenticated && user) {
    return (
      <button
        onClick={() => signOut()}
        className="px-4 py-2 text-sm font-medium text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 rounded-lg transition-all shadow-sm"
      >
        {t.signOut}
      </button>
    )
  }

  return (
    <>
      <button
        onClick={() => {
          setIsSignUp(false)
          setShowModal(true)
        }}
        className="px-4 py-2 text-sm font-medium text-blue-600 hover:text-blue-700 border border-blue-600 hover:border-blue-700 rounded-lg transition-all"
      >
        {t.signIn}
      </button>

      {showModal && (
        <AuthModal
          isSignUp={isSignUp}
          onClose={() => setShowModal(false)}
          onToggleMode={() => setIsSignUp(!isSignUp)}
          dictionary={t}
        />
      )}
    </>
  )
}

interface AuthModalProps {
  isSignUp: boolean
  onClose: () => void
  onToggleMode: () => void
  dictionary: AuthDictionary
}

function AuthModal({ isSignUp, onClose, onToggleMode, dictionary }: AuthModalProps) {
  const { signIn, signUp } = useAuth()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [displayName, setDisplayName] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  const m = dictionary.modal

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setSuccess('')
    setLoading(true)

    try {
      if (isSignUp) {
        await signUp(email, password, displayName)
        // Show success message for signup (email confirmation required)
        setSuccess(m?.successSignUp || '¡Cuenta creada! Por favor revisa tu correo electrónico para confirmar tu cuenta.')
        // Don't close modal so user can see the message
        return
      } else {
        await signIn(email, password)
        // Wait a bit for auth state to propagate
        await new Promise(resolve => setTimeout(resolve, 500))
        onClose()
      }
    } catch (err: unknown) {
      // Translate common Supabase error messages to Spanish
      const errorMessage =
        (typeof err === 'object' && err !== null && 'message' in err)
          ? String((err as { message: unknown }).message)
          : (m?.errors.generic || 'Ocurrió un error')
      let translatedError = errorMessage
      
      if (errorMessage.includes('Email not confirmed')) {
        translatedError = m?.errors.emailNotConfirmed || 'Por favor confirma tu correo electrónico. Revisa tu bandeja de entrada.'
      } else if (errorMessage.includes('Invalid login credentials')) {
        translatedError = m?.errors.invalidLogin || 'Correo o contraseña incorrectos.'
      } else if (errorMessage.includes('User already registered')) {
        translatedError = m?.errors.alreadyRegistered || 'Este correo ya está registrado.'
      } else if (errorMessage.includes('Password should be at least')) {
        translatedError = m?.errors.passwordTooShort || 'La contraseña debe tener al menos 6 caracteres.'
      } else if (errorMessage.includes('Unable to validate email address')) {
        translatedError = m?.errors.invalidEmail || 'Correo electrónico inválido.'
      } else if (errorMessage.includes('Email rate limit exceeded')) {
        translatedError = m?.errors.rateLimit || 'Demasiados intentos. Por favor espera unos minutos.'
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
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md relative max-h-[90vh] overflow-y-auto">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 z-10"
          >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <h2 className="text-3xl font-bold text-deep-indigo mb-6">
          {isSignUp ? (m?.titleSignUp || 'Crear cuenta') : (m?.titleSignIn || 'Iniciar sesión')}
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
                {m?.nameLabel || 'Nombre'}
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
              {m?.emailLabel || 'Correo electrónico'}
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
              {m?.passwordLabel || 'Contraseña'}
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
            {loading
              ? (m?.loading || 'Cargando...')
              : isSignUp
                ? (m?.submitSignUp || 'Crear cuenta')
                : (m?.submitSignIn || 'Iniciar sesión')}
          </button>
        </form>

        <div className="mt-6 text-center">
          <button
            onClick={onToggleMode}
            className="text-sm text-celestial-blue hover:text-celestial-blue/80 transition-colors"
          >
            {isSignUp
              ? (m?.toggleToSignIn || '¿Ya tienes cuenta? Inicia sesión')
              : (m?.toggleToSignUp || '¿No tienes cuenta? Regístrate')}
          </button>
        </div>

        {!isSignUp && (
          <div className="mt-4 p-4 bg-emerald-green/5 rounded-lg border border-emerald-green/20">
            <p className="text-sm text-center text-muted-foreground">
              💡 <strong>{m?.tipTitle || 'Consejo:'}</strong> {m?.tipBody || 'Puedes estudiar sin crear una cuenta. Registrarte te permite guardar tu progreso y conectar con un misionero.'}
            </p>
          </div>
        )}
        </div>
      </div>
    </>
  )
}
