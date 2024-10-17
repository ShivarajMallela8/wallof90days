"use client"
import React, { useEffect, useRef } from 'react'
import { UserPlus, ListTodo, TrendingUp, MessageSquare } from 'lucide-react'

const steps = [
  { title: 'Sign Up', description: 'Create your account and set up your profile', icon: UserPlus },
  { title: 'Add Tasks', description: 'Input your tasks for the next 90 days', icon: ListTodo },
  { title: 'Track Progress', description: 'Mark tasks as complete and watch your progress', icon: TrendingUp },
  { title: 'Generate Tweets', description: 'Use AI to create tweets about your accomplishments', icon: MessageSquare },

]

export const HowItWorksSection: React.FC = () => {
  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const scrollContainer = scrollRef.current
    if (scrollContainer) {
      const scrollWidth = scrollContainer.scrollWidth
      const clientWidth = scrollContainer.clientWidth

      let scrollPosition = 0
      const scroll = () => {
        scrollPosition += 1
        if (scrollPosition > scrollWidth - clientWidth) {
          scrollPosition = 0
        }
        scrollContainer.scrollTo(scrollPosition, 0)
      }

      const intervalId = setInterval(scroll, 25)

      return () => clearInterval(intervalId)
    }
  }, [])

  return (
    <div className="bg-gray-900 py-24 sm:py-32 overflow-hidden">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:text-center mb-16">
          <h2 className="text-base font-semibold leading-7 text-emerald-600">Get started easily</h2>
          <p className="mt-2 text-3xl font-bold tracking-tight text-white sm:text-4xl">
            How Task90 Works
          </p>
          <p className="mt-6 text-lg leading-8 text-gray-300">
            Follow these simple steps to start managing your tasks and sharing your accomplishments.
          </p>
        </div>
        <div 
          ref={scrollRef}
          className="flex overflow-x-hidden space-x-8 pb-8"
        >
          {steps.map((step) => (
            <div key={step.title} className="flex-shrink-0 w-64">
              <div className="flex flex-col items-center text-center">
                <div className="rounded-full bg-white/5 p-3 ring-1 ring-white/10">
                  <step.icon className="h-6 w-6 text-emerald-600" aria-hidden="true" />
                </div>
                <dt className="mt-4 font-semibold text-white">{step.title}</dt>
                <dd className="mt-2 text-sm leading-7 text-gray-300">{step.description}</dd>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}