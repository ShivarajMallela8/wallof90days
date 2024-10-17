// types/index.ts

export interface User {
    id: string;
    email: string;
    full_name: string;
    created_at: string;
    updated_at: string;
  }
  
  export interface Task {
    id: string;
    user_id: string;
    title: string;
    description: string | null;
    day:number;
    is_completed: boolean;
    created_at: string;
    updated_at: string;
  }
  
  export interface TaskSquare {
    id: string;
    user_id: string;
    position: number;
    created_at: string;
    updated_at: string;
  }
  
  export interface TasksToSquares {
    id: string;
    task_id: string;
    square_id: string;
    created_at: string;
  }
  
  export interface Tweet {
    id: string;
    user_id: string;
    content: string;
    tone: string | null;
    is_posted: boolean;
    twitter_post_id: string | null;
    created_at: string;
    updated_at: string;
  }
  
  export interface UserSettings {
    id: string;
    user_id: string;
    twitter_api_key: string | null;
    twitter_api_secret: string | null;
    twitter_access_token: string | null;
    twitter_access_token_secret: string | null;
    created_at: string;
    updated_at: string;
  }