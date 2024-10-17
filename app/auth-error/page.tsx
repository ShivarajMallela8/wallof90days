'use client'

import { useEffect, useState, Suspense } from 'react'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { ErrorBoundary } from 'react-error-boundary'

function ErrorMessage({ message }: { message: string }) {
  return (
    <div className="bg-red-900 border border-red-800 text-red-300 px-4 py-3 rounded relative" role="alert">
      <span className="block sm:inline">{message}</span>
    </div>
  )
}

function AuthErrorContent() {
  const [errorMessage, setErrorMessage] = useState<string>('An authentication error occurred.')
  const searchParams = useSearchParams()

  useEffect(() => {
    const error = searchParams.get('error')
    if (error) {
      setErrorMessage(decodeURIComponent(error))
    }
  }, [searchParams])

  return (
    <div className="max-w-md w-full space-y-8">
      <div>
        <h2 className="mt-6 text-center text-3xl font-extrabold text-white">
          Authentication Error
        </h2>
        <p className="mt-2 text-center text-sm text-gray-400">
          {errorMessage}
        </p>
      </div>
      <ErrorMessage message="There was a problem with the authentication process. Please try again." />
      <div className="text-center">
        <Link 
          href="/login" 
          className="font-medium text-emerald-500 hover:text-emerald-400"
        >
          Return to Login
        </Link>
      </div>
    </div>
  )
}

function ErrorFallback({error, resetErrorBoundary}: {error: Error, resetErrorBoundary: () => void}) {
  return (
    <div className="text-white">
      <h2>Something went wrong:</h2>
      <p>{error.message}</p>
      <button onClick={resetErrorBoundary}>Try again</button>
    </div>
  )
}

export default function AuthError() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#1C1C1C] py-12 px-4 sm:px-6 lg:px-8">
      <ErrorBoundary FallbackComponent={ErrorFallback}>
        <Suspense fallback={<div className="text-white">Loading...</div>}>
          <AuthErrorContent />
        </Suspense>
      </ErrorBoundary>
    </div>
  )
}