import React, { useState } from 'react';


interface TaskFormProps {
  onSubmit: (title: string, description: string) => void;
  onClose: () => void;
}

export const TaskForm: React.FC<TaskFormProps> = ({ onSubmit, onClose }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (title.trim()) {
      onSubmit(title.trim(), description.trim());
      setTitle('');
      setDescription('');
      onClose();
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-gray-800 text-gray-100 p-6 rounded-lg shadow-lg space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Add New Task</h2>
       
      </div>
      <div>
        <label htmlFor="title" className="block text-sm font-medium text-gray-300">
          Task Title
        </label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter task title"
          required
          className="mt-3 block w-full rounded-md bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:border-emerald-500 focus:ring focus:ring-emerald-500 focus:ring-opacity-50"
        />
      </div>
      <div>
        <label htmlFor="description" className="block text-sm font-medium text-gray-300">
          Task Description
        </label>
        <textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Enter task description"
          rows={3}
          className="mt-3 block w-full rounded-md bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:border-emerald-500 focus:ring focus:ring-emerald-500 focus:ring-opacity-50"
        />
      </div>
      <div className="flex justify-end space-x-2">
       
        <button
          type="submit"
          className="py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-emerald-600 hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-emerald-500"
        >
          Add Task
        </button>
      </div>
    </form>
  );
};