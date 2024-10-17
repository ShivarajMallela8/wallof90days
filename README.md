90-Day Challenge Dashboard
Overview
The 90-Day Challenge Dashboard is a web application designed to help users track their progress over a 90-day period. It allows users to set daily tasks, mark them as complete, and share their progress on social media. The application is built using React, Next.js, and Supabase, providing a modern, responsive, and real-time user experience.
Features

User authentication via Google OAuth
Interactive 90-day grid for task visualization
Daily task management (add, edit, delete, mark as complete)
Social media sharing functionality (tweet generation)
Responsive design for various screen sizes
Dark mode support

Technologies Used

React.js
Next.js
TypeScript
Supabase (for authentication and database)
Tailwind CSS (for styling)
Lucide React (for icons)

Prerequisites
Before you begin, ensure you have the following installed:

Node.js (v14 or later)
npm or yarn
A Supabase account and project

Installation

Clone the repository:
Copygit clone https://github.com/your-username/90-day-challenge-dashboard.git
cd 90-day-challenge-dashboard

Install dependencies:
Copynpm install
# or
yarn install

Set up environment variables:
Create a .env.local file in the root directory and add the following:
CopyNEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key

Set up Supabase:

Create a new project in Supabase
Set up a tasks table with the following schema:
sqlCopycreate table tasks (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references auth.users,
  day integer,
  title text,
  description text,
  is_completed boolean default false,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

Enable Row Level Security (RLS) and set up appropriate policies


Run the development server:
Copynpm run dev
# or
yarn dev

Open http://localhost:3000 with your browser to see the result.
