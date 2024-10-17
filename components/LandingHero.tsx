import React from 'react'
import Link from 'next/link'
import { Button } from "@/components/ui/Button"

import Image from 'next/image'

export const LandingHero: React.FC = () => {
  return (
    <div className="bg-gray-900 text-white">
      <div className="container mx-auto px-6 py-24 sm:py-32 lg:flex lg:items-center lg:gap-x-10">
        <div className="mx-auto max-w-2xl lg:mx-0 lg:flex-auto">
          <div className="flex">
            <div className="relative flex items-center gap-x-4 rounded-full px-4 py-1 text-sm leading-6 text-gray-400 ring-1 ring-gray-900/10 hover:ring-gray-900/20">
              
              <span className="h-4 w-px bg-gray-900/10" aria-hidden="true" />
            
            </div>
          </div>
          <h1 className="mt-10 text-4xl font-bold tracking-tight text-white sm:text-6xl">
          Conquer your goals, one square at a time.
          </h1>
          <p className="mt-6 text-lg leading-8 text-gray-300">
          Our AI-powered app transforms your daily achievements into engaging tweets, keeping you motivated and your followers inspired.
          </p>
          <div className="mt-10 flex items-center  gap-x-6">
          <Link href="/login">
      <Button className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-emerald-600 hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500">
        Get started 
        
      </Button>
    </Link>
        
          </div>
        </div>
        <div className="mt-16 sm:mt-24 lg:mt-0 lg:flex-shrink-0 lg:flex-grow">
          <div className="relative mx-auto w-full max-w-lg">
            <div className="absolute top-0 -left-4 w-72 h-72 bg-teal-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
            <div className="absolute top-0 -right-4 w-72 h-72 bg-indigo-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
            <div className="absolute -bottom-8 left-20 w-72 h-72 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
            <div className="relative">
              <div className="relative rounded-lg shadow-lg bg-gray-800 p-2">
                <div className="flex items-center space-x-2 mb-2">
                  <div className="w-3 h-3 rounded-full bg-red-500"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                  <div className="w-3 h-3 rounded-full bg-green-500"></div>
                </div>
                <Image
                  className="rounded border border-gray-700"
                  src="/image1.jpg"
                  alt="Task90 Dashboard"
                  width={600}
                  height={400}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}