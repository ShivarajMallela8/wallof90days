'use client'

import React, { useState, useEffect, useCallback } from 'react'
import { useAuth } from '@/hooks/useAuth'
import { createClient } from '@/lib/supabase/client'
import { TaskGrid } from '@/components/TaskGrid'
import { Modal } from '@/components/ui/Modal'
import { TaskForm } from '@/components/TaskForm'
import { Sidebar } from '@/components/Sidebar'
import { Task, User } from '@/types'
import { TrashIcon, CheckIcon, MenuIcon } from 'lucide-react'
import LoginPage from '../(auth)/login/page'
import { Button } from "@/components/ui/Button"

import { useTweetGeneration } from '@/hooks/useTweets'

const supabase = createClient()

export default function DashboardPage() {
  const { user, session } = useAuth() as { user: User | null, session: unknown }
  const [tasks, setTasks] = useState<Task[]>([])
  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false)
  const [isTaskListModalOpen, setIsTaskListModalOpen] = useState(false)
  const [selectedDay, setSelectedDay] = useState<number | null>(null)
  const [selectedDayTasks, setSelectedDayTasks] = useState<Task[]>([])
  const [generatedTweet, setGeneratedTweet] = useState('')
  const [isTweetModalOpen, setIsTweetModalOpen] = useState(false)
  const [isSidebarExpanded, setIsSidebarExpanded] = useState(false)
  
  const { generateTweet, error: tweetError } = useTweetGeneration()

  const fetchTasks = useCallback(async () => {
    if (!user) return
    const { data, error } = await supabase
      .from('tasks')
      .select('*')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false })
    
    if (error) console.error('Error fetching tasks:', error)
    else setTasks(data || [])
  }, [user])

  useEffect(() => {
    if (user) {
      fetchTasks()
    } 
  }, [user, fetchTasks])

  const handleAddTask = (day: number) => {
    setSelectedDay(day)
    setIsTaskModalOpen(true)
  }

  const handleSquareClick = (day: number) => {
    setSelectedDay(day)
    const dayTasks = tasks.filter(task => task.day === day)
    setSelectedDayTasks(dayTasks)
    setIsTaskListModalOpen(true)
  }

  const handleAddOrUpdateTask = async (title: string, description: string) => {
    if (!user || selectedDay === null) return
    const { error } = await supabase
      .from('tasks')
      .insert({ 
        user_id: user.id, 
        day: selectedDay,
        title, 
        description,
        is_completed: false
      })

    if (error) console.error('Error adding task:', error)
    else {
      fetchTasks()
      setIsTaskModalOpen(false)
    }
  }

  const handleDeleteTask = async (taskId: string) => {
    const { error } = await supabase
      .from('tasks')
      .delete()
      .eq('id', taskId)

    if (error) console.error('Error deleting task:', error)
    else {
      fetchTasks()
      setSelectedDayTasks(prevTasks => prevTasks.filter(task => task.id !== taskId))
    }
  }

  const handleToggleComplete = async (taskId: string) => {
    const taskToUpdate = tasks.find(task => task.id === taskId)
    if (!taskToUpdate) return

    const { error } = await supabase
      .from('tasks')
      .update({ is_completed: !taskToUpdate.is_completed })
      .eq('id', taskId)

    if (error) console.error('Error updating task:', error)
    else {
      fetchTasks()
      setSelectedDayTasks(prevTasks => 
        prevTasks.map(task => 
          task.id === taskId ? {...task, is_completed: !task.is_completed} : task
        )
      )
    }
  }

  const handleGenerateTweet = async (day: number) => {
    if (!session) {
      console.error('User not authenticated')
      return
    }

    const completedTasks = tasks.filter(task => task.day === day && task.is_completed)
    const taskDescriptions = completedTasks.map(task => task.title).join(', ')
    const prompt = `I've completed the following tasks for Day ${day + 1}: ${taskDescriptions}. Generate a tweet to share my progress.`

    try {
      const tweet = await generateTweet(prompt)
      if (tweet) {
        setGeneratedTweet(tweet)
        setIsTweetModalOpen(true)
      }
    } catch (error) {
      console.error('Error generating tweet:', error)
    }
  }

  if (!user) return <LoginPage />

  return (
    <div className="flex min-h-screen bg-gray-900 text-white">
      <Sidebar isExpanded={isSidebarExpanded} toggleSidebar={() => setIsSidebarExpanded(!isSidebarExpanded)} />
      <div className={`flex-1 p-4 md:p-10 overflow-auto transition-all duration-300 ${isSidebarExpanded ? 'ml-28' : 'ml-10'}`}>
        <Button
          variant="secondary"
          className="md:hidden fixed top-4 left-4 z-50 p-2 bg-gray-800 rounded-md"
          onClick={() => setIsSidebarExpanded(!isSidebarExpanded)}
        >
          <MenuIcon className="w-6 h-6" />
        </Button>
        <h1 className="text-2xl md:text-4xl font-bold mb-4 md:mb-8 bg-gradient-to-r from-blue-400 to-green-400 text-transparent bg-clip-text">
          {user.full_name || "Your"}&apos;s 90-Days Wall
        </h1>
        
        <TaskGrid 
          tasks={tasks}
          onAddTask={handleAddTask}
          onSquareClick={handleSquareClick}
          onGenerateTweet={handleGenerateTweet}
        />

        <Modal
          isOpen={isTaskModalOpen}
          onClose={() => setIsTaskModalOpen(false)}
        >
          <TaskForm
            onSubmit={handleAddOrUpdateTask}
            onClose={() => setIsTaskModalOpen(false)}
          />
        </Modal>

        <Modal
          isOpen={isTaskListModalOpen}
          onClose={() => setIsTaskListModalOpen(false)}
        >
          <div className="mt-4 space-y-4">
            <h2 className="text-xl font-semibold text-black">
              {`Tasks for Day ${selectedDay !== null ? selectedDay + 1 : ''}`}
            </h2>
            {selectedDayTasks.map((task) => (
              <div key={task.id} className="flex items-center justify-between bg-gray-800 p-4 rounded-lg shadow-md">
                <div className="flex items-center space-x-4">
                  <Button
                    variant="primary"
                    onClick={() => handleToggleComplete(task.id)}
                    className={`w-6 h-6 rounded-full flex items-center justify-center ${task.is_completed ? 'bg-green-500' : 'border-2 border-gray-400'}`}
                  >
                    {task.is_completed && <CheckIcon size={16} className="text-white" />}
                  </Button>
                  <div>
                    <h3 className={`font-semibold ${task.is_completed ? 'line-through text-gray-400' : 'text-white'}`}>{task.title}</h3>
                    <p className="text-sm text-gray-400">{task.description}</p>
                  </div>
                </div>
                <Button variant="primary" onClick={() => handleDeleteTask(task.id)} className="text-red-400 hover:text-red-300">
                  <TrashIcon size={20} />
                </Button>
              </div>
            ))}
            {selectedDayTasks.length === 0 && (
              <p className="text-center text-gray-400">No tasks for this day. Click the &apos;+&apos; button to add a task.</p>
            )}
          </div>
        </Modal>

        <Modal
          isOpen={isTweetModalOpen}
          onClose={() => setIsTweetModalOpen(false)}
        >
          <div className="mt-4">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold text-black">Generated Tweet:</h2>
            </div>
            <textarea 
              className="w-full p-2 rounded bg-gray-800 text-white border border-gray-700 focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
              rows={4}
              value={generatedTweet}
              onChange={(e) => setGeneratedTweet(e.target.value)}
            />
            {tweetError && <p className="text-red-500 mt-2">{tweetError}</p>}
          </div>
        </Modal>
      </div>
    </div>
  )
}