import React from 'react'
import { CheckCircle, Grid } from 'lucide-react'
import { FaSquareXTwitter } from "react-icons/fa6";


const features = [
  { 
    title: '90-Day Task Management', 
    description: 'Visualize and manage your tasks for the next 90 days',
    icon: CheckCircle
  },
  { 
    title: 'AI-Powered Tweet Generation', 
    description: 'Generate engaging tweets based on your completed tasks',
    icon: FaSquareXTwitter
  },
  { 
    title: 'Interactive Task Grid (90 Squares)', 
    description: 'Click on any of the 90 squares to update and track tasks. Visual changes indicate completed tasks for better progress tracking.', 
    icon: Grid
  }
];


export const FeatureSection: React.FC = () => {
  return (
    <div className="bg-gray-900 py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:text-center">
          <h2 className="text-base font-semibold leading-7 text-emerald-600">Boost productivity</h2>
          <p className="mt-2 text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Everything you need to manage your tasks
          </p>
          <p className="mt-6 text-lg leading-8 text-gray-300">
            Task90 provides a comprehensive set of features to help you stay organized, motivated, and connected.
          </p>
        </div>
        <div className="mx-auto mt-16 max-w-2xl w-full sm:mt-20 lg:mt-24 lg:max-w-none">
          <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-3">
            {features.map((feature) => (
              <div key={feature.title} className="flex flex-col">
                <dt className="flex items-center gap-x-3 text-base font-semibold leading-7 text-white">
                  <feature.icon className="h-5 w-5 flex-none text-emerald-400" aria-hidden="true" />
                  {feature.title}
                </dt>
                <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-gray-300">
                  <p className="flex-auto">{feature.description}</p>
                  <p className="mt-6">
                    <a href="/login" className="text-sm font-semibold leading-6 text-emerald-600">
                      Learn more <span aria-hidden="true">→</span>
                    </a>
                  </p>
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </div>
  )
}