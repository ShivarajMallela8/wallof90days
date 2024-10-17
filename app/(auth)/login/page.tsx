'use client'

import { useEffect } from 'react'
import { useAuth } from '@/hooks/useAuth'

import { Button } from '@/components/ui/Button'

import Loading from '@/app/dashboard/loading'
import DashboardPage from '@/app/dashboard/page'
import { useRouter } from 'next/navigation'

export default function LoginPage() {
  const { user, loading, signIn } = useAuth()
 const route=useRouter()
  useEffect(() => {
    if (user && !loading) {
      route.push('/dashboard')
    }
  }, [user, loading])

  if (loading) {
    return <Loading/>
  }

  if (!user) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-900">
        <div className="w-full max-w-md p-8 space-y-8 bg-gray-800 rounded-lg shadow-xl">
          <h2 className="text-3xl font-extrabold text-center text-white">
            Sign in to your account
          </h2>
          <Button
            onClick={signIn}
            className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-medium py-2 px-4 rounded transition duration-150 ease-in-out"
          >
           
            Sign in with Google
          </Button>
        </div>
      </div>
    )
  }

  return <DashboardPage/>
}