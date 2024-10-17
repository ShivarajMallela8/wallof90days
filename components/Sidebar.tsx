'use client'

import React from 'react'
import Link from 'next/link'
import { Home, LogOut, User, Menu } from 'lucide-react'
import { useAuth } from '@/hooks/useAuth'
import { Button } from "@/components/ui/Button"

interface SidebarProps {
  isExpanded: boolean;
  toggleSidebar: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ isExpanded, toggleSidebar }) => {
  const {  signOut } = useAuth()

  const iconContainerClass = "flex items-center justify-center w-12 h-12"
  const textClass = "ml-2 text-sm"

  return (
    <div className={`bg-gray-900 text-gray-100 min-h-screen transition-all duration-300 ${isExpanded ? 'w-30' : 'w-16'}`}>
      <div className="p-2">
        <Button variant="secondary" onClick={toggleSidebar} className="w-full flex justify-center p-0 m-0">
          <div className={iconContainerClass}>
            <Menu className="h-5 w-5" />
          </div>
        </Button>
      </div>
      
      <nav className="mt-4">
        <ul className="space-y-2">
          <li>
            <Link href="/dashboard" className="flex items-center w-full mr-7 rounded hover:bg-gray-800 transition-colors">
              <div className={iconContainerClass}>
                <Home className="h-5 w-5" />
              </div>
              {isExpanded && <span className={textClass}>Dashboard</span>}
            </Link>
          </li>
          <li>
            <Link href="/profile" className="flex items-center rounded hover:bg-gray-800 transition-colors">
              <div className={iconContainerClass}>
                <User className="h-5 w-5" />
              </div>
              {isExpanded && <span className={textClass}>Profile</span>}
            </Link>
          </li>
          <li>
            <Button
              onClick={signOut}
              variant="secondary"
              className="w-full flex items-center justify-start rounded p-0 m-0 hover:bg-gray-800 transition-colors"
            >
              <div className={iconContainerClass}>
                <LogOut className="h-5 w-5" />
              </div>
              {isExpanded && <span className={textClass}>Sign Out</span>}
            </Button>
          </li>
        </ul>
      </nav>
    </div>
  )
}