
import { User,Task, TaskSquare, TasksToSquares, Tweet, UserSettings } from "."

export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json }
  | Json[]

export interface Database {
  public: {
    Tables: {
      users: {
        Row: User
        Insert: Omit<User, 'id' | 'created_at' | 'updated_at'>
        Update: Partial<Omit<User, 'id'>>
      }
      tasks: {
        Row: Task
        Insert: Omit<Task, 'id' | 'created_at' | 'updated_at'>
        Update: Partial<Omit<Task, 'id'>>
      }
      task_squares: {
        Row: TaskSquare
        Insert: Omit<TaskSquare, 'id' | 'created_at' | 'updated_at'>
        Update: Partial<Omit<TaskSquare, 'id'>>
      }
      tasks_to_squares: {
        Row: TasksToSquares
        Insert: Omit<TasksToSquares, 'id' | 'created_at'>
        Update: Partial<Omit<TasksToSquares, 'id'>>
      }
      tweets: {
        Row: Tweet
        Insert: Omit<Tweet, 'id' | 'created_at' | 'updated_at'>
        Update: Partial<Omit<Tweet, 'id'>>
      }
      user_settings: {
        Row: UserSettings
        Insert: Omit<UserSettings, 'id' | 'created_at' | 'updated_at'>
        Update: Partial<Omit<UserSettings, 'id'>>
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}