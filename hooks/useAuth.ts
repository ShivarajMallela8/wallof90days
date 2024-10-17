import { useState, useEffect } from 'react'
import { createClient, Session, User } from '@supabase/supabase-js'
import { useRouter } from 'next/navigation'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

export function useAuth() {
  const [user, setUser] = useState<User | null>(null)
  const [session, setSession] = useState<Session | null>(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    let mounted = true

    async function getInitialSession() {
      const {
        data: { session },
        error,
      } = await supabase.auth.getSession()

      if (mounted) {
        if (error) {
          console.error(error)
        }
        if (session) {
          setSession(session)
          setUser(session.user)
          await storeUserDetails(session)
        }
        setLoading(false)
      }
    }

    getInitialSession()

    const { data: authListener } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (session) {
          setSession(session)
          setUser(session.user)
          await storeUserDetails(session)
        } else {
          setSession(null)
          setUser(null)
        }
        setLoading(false)
      }
    )

    // Check if there are tokens in the URL
    if (window.location.hash) {
      const url = new URL(window.location.href)
      const accessToken = url.hash.match(/access_token=([^&]*)/)?.[1]
      if (accessToken) {
        // Clear the URL by replacing it with a clean version
        router.replace('/')
      }
    }

    return () => {
      mounted = false
      authListener.subscription.unsubscribe()
    }
  }, [])

  async function storeUserDetails(session: Session) {
    if (session?.user) {
      const { id, email, user_metadata } = session.user
      const { full_name } = user_metadata

      const { error } = await supabase.from('users').upsert({
        id,
        email,
        encrypted_password: "",
        full_name,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      })

      if (error) {
        console.error('Error storing user details:', error)
      }
    }
  }

  async function signIn() {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
    })

    if (error) console.error('Error signing in:', error)
    router.push('/dashboard')
  }

  async function signOut() {
    const { error } = await supabase.auth.signOut()
    if (error) console.error('Error signing out:', error)
  }

  return { user, session, loading, signIn, signOut }
}
