'use client'

import { createContext, useContext, useEffect, useState } from 'react'
import { User } from '@supabase/supabase-js'
import { createClient } from '@/lib/supabase-browser'
import { v4 as uuidv4 } from 'uuid'
import Cookies from 'js-cookie'

interface AuthContextType {
  user: User | null
  userId: string // Either auth.uid() or anon_id
  isAuthenticated: boolean
  isAdmin: boolean
  isLoading: boolean
  signIn: (email: string, password: string) => Promise<void>
  signUp: (email: string, password: string, displayName?: string) => Promise<void>
  signOut: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isAdmin, setIsAdmin] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const supabase = createClient()

  // Get or create anonymous ID
  const getOrCreateAnonId = (): string => {
    let anonId = Cookies.get('anon_id')
    if (!anonId) {
      anonId = uuidv4()
      Cookies.set('anon_id', anonId, { expires: 365 }) // 1 year
    }
    return anonId
  }

  const userId = user?.id || getOrCreateAnonId()
  const isAuthenticated = !!user

  const checkAdmin = async (currentUser: User | null) => {

    console.log('Checking admin status for user:', currentUser)
    if (!currentUser) {
      setIsAdmin(false)
      return
    }

    try {
      console.log('Fetching user role for user ID:', currentUser.id)
      const { data, error } = await supabase
        .from('user_profiles')
        .select('role')
        .eq('id', currentUser.id)
        .maybeSingle()

      console.log('User role data:', data, 'Error:', error)

      if (error) {
        console.error('Failed to fetch user role:', error)
        setIsAdmin(false)
        return
      }

      console.log(data?.role === 'admin');

      setIsAdmin(data?.role === 'admin')
    } catch (err) {
      console.error('Unexpected error fetching user role:', err)
      setIsAdmin(false)
    }
  }

  useEffect(() => {
    let isMounted = true

    const initSession = async () => {
      try {
        const {
          data: { session },
        } = await supabase.auth.getSession()

        if (!isMounted) return

        setUser(session?.user ?? null)
        await checkAdmin(session?.user ?? null)
      } catch (err) {
        console.error('Error initializing session:', err)
      } finally {
        if (isMounted) {
          setIsLoading(false)
        }
      }
    }

    initSession()

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      if (!isMounted) return

      setUser(session?.user ?? null)
      
      // Defer the admin check to avoid deadlock in the auth callback
      Promise.resolve().then(() => {
        checkAdmin(session?.user ?? null)
      })
    })

    return () => {
      isMounted = false
      subscription.unsubscribe()
    }
  }, [])

  const signIn = async (email: string, password: string) => {
    const { error } = await supabase.auth.signInWithPassword({ email, password })
    if (error) throw error
    
    // TODO: Migrate anonymous progress to authenticated user
  }

  const signUp = async (email: string, password: string, displayName?: string) => {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          display_name: displayName,
        },
      },
    })
    
    if (error) throw error
    
    // User profile will be created automatically by database trigger after email confirmation
    // TODO: Migrate anonymous progress to authenticated user (after confirmation)
  }

  const signOut = async () => {
    setIsLoading(true)
    try {
      const { error } = await supabase.auth.signOut()
      if (error) throw error

      setUser(null)
      setIsAdmin(false)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        userId,
        isAuthenticated,
        isAdmin,
        isLoading,
        signIn,
        signUp,
        signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
