"use client"
import React, { useState, useEffect } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { User } from 'lucide-react';
import LoginPage from '../(auth)/login/page';

export default function ProfilePage() {
  const { user,  } = useAuth();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
 
  const [error] = useState('');

  useEffect(() => {
    if (user) {
      setName(user.user_metadata.full_name || '');
      setEmail(user.email || '');
      
    }
  }, [user]);

  

  if (!user) return <LoginPage />;

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#1C1C1C] py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <div className="mx-auto h-12 w-12 text-emerald-500">
            <User size={48} />
          </div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-white">
            Your Profile
          </h2>
          <p className="mt-2 text-center text-sm text-gray-400">
            Update your personal information
          </p>
        </div>
        {error && (
          <div className="bg-red-900 border border-red-800 text-red-300 px-4 py-3 rounded relative" role="alert">
            <span className="block sm:inline">{error}</span>
          </div>
        )}
        <form  className="mt-8 space-y-6">
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="name" className="sr-only">Name</label>
              <input
                id="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="appearance-none rounded-t-md relative block w-full px-3 py-2 border border-gray-700 placeholder-gray-500 text-white bg-gray-800 focus:outline-none focus:ring-emerald-500 focus:border-emerald-500 focus:z-10 sm:text-sm"
                placeholder="Name"
              />
            </div>
            <div>
              <label htmlFor="email" className="sr-only">Email</label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="appearance-none rounded-b-md relative block w-full px-3 py-2 border border-gray-700 placeholder-gray-500 text-white bg-gray-800 focus:outline-none focus:ring-emerald-500 focus:border-emerald-500 focus:z-10 sm:text-sm"
                placeholder="Email address"
              />
            </div>
          </div>
          
        </form>
      </div>
    </div>
  );
}