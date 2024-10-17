import React from 'react'
import Link from 'next/link'
import { FaSquareXTwitter } from "react-icons/fa6";

export const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 border-t border-gray-800">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-between py-8 md:flex-row">
          <p className="text-center text-sm text-gray-400">
            &copy; {new Date().getFullYear()} Task90. All rights reserved.
          </p>
          <nav className="flex mt-4 space-x-4 md:mt-0">
            <Link href="/privacy" className="text-sm text-gray-400 hover:text-teal-400 transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="text-sm text-gray-400 hover:text-teal-400 transition-colors">
              Terms of Service
            </Link>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-teal-400 transition-colors">
              <FaSquareXTwitter className="h-5 w-5" />
              <span className="sr-only">Twitter</span>
            </a>
          </nav>
        </div>
      </div>
    </footer>
  )
}