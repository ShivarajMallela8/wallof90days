import React from 'react';
import { Task } from '@/types';

interface TaskSquareProps {
  task: Task;
  onClick: () => void;
}

export function TaskSquare({ task, onClick }: TaskSquareProps) {
  return (
    <div
      onClick={onClick}
      className={`w-48 h-48 border border-gray-300 rounded flex flex-col items-center justify-center cursor-pointer ${
        task ? 'bg-blue-100' : 'bg-white'
      } p-2 overflow-hidden`}
    >
      {task ? (
        <>
          <h3 className="font-bold text-sm mb-2 text-center truncate w-full">{task.title}</h3>
          <p className="text-xs text-gray-600 text-center overflow-hidden overflow-ellipsis">{task.description}</p>
        </>
      ) : (
        <span className="text-4xl text-gray-400">+</span>
      )}
    </div>
  );
}