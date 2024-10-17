'use client'

import React from 'react'
import Link from 'next/link'
import { useAuth } from '@/hooks/useAuth'
import { CheckCircle } from 'lucide-react'
import { Button } from "@/components/ui/Button"

export const Header: React.FC = () => {
  const { user } = useAuth()

  return (
    <header className="bg-gray-900 border-b border-gray-800">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <Link href="/" className="flex items-center space-x-2">
            <CheckCircle className="h-8 w-8 text-emerald-600" />
            <span className="text-2xl font-bold text-white">90DaysArc</span>
          </Link>
          <div className="flex space-x-4">
            {user ? (
              <Link href="/dashboard" passHref>
                <Button variant="primary">
                  Dashboard
                </Button>
              </Link>
            ) : (
              <>
                <Link href="/login" passHref>
                  <Button variant="secondary" >
                    Login
                  </Button>
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}