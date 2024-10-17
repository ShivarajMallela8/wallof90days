import React from 'react';
import { Task } from '@/types';
import { PlusIcon } from 'lucide-react';
import { FaSquareXTwitter } from "react-icons/fa6";

interface TaskGridProps {
  tasks: Task[];
  onAddTask: (day: number) => void;
  onGenerateTweet: (day: number) => void;
  onSquareClick: (day: number) => void;
}

export const TaskGrid: React.FC<TaskGridProps> = ({ tasks, onAddTask, onGenerateTweet, onSquareClick }) => {
  const days = Array.from({ length: 90 }, (_, i) => i);
  return (
    <div className="grid grid-cols-7 gap-4">
      {days.map((day) => {
        const dayTasks = tasks.filter(task => task.day === day);
        const completedTasks = dayTasks.filter(task => task.is_completed);
        
        return (
          <div 
            key={day} 
            className="border border-gray-700 rounded-lg p-4 cursor-pointer hover:bg-gray-800 transition-colors"
            onClick={() => onSquareClick(day)}
          >
            <div className="text-sm font-semibold mb-2">Day {day + 1}</div>
            <div className="text-xs text-gray-400 mb-2">{completedTasks.length}/{dayTasks.length} completed</div>
            <div className="flex justify-between mt-2">
              <button 
                onClick={(e) => { e.stopPropagation(); onAddTask(day); }}
                className="text-blue-400 hover:text-blue-300"
              >
                <PlusIcon size={20} />
              </button>
              <button 
                onClick={(e) => { e.stopPropagation(); onGenerateTweet(day); }}
                className="text-green-400 hover:text-green-300"
              >
                <FaSquareXTwitter size={20} />
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
}