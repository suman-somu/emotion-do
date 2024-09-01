"use client";

import { Trash2 } from 'lucide-react';
import React from 'react';

interface TaskItemProps {
  id: number;
  description: string;
  sentiment: string;
  deleteTask: (id: number) => void;
}

const TaskItem: React.FC<TaskItemProps> = ({ id, description, sentiment, deleteTask }) => {
  let borderColorClass = '';
  switch (sentiment.toLowerCase()) {
    case 'positive':
      borderColorClass = 'border-green-400';
      break;
    case 'neutral':
      borderColorClass = 'border-yellow-400';
      break;
    case 'negative':
      borderColorClass = 'border-red-400';
      break;
    default:
      borderColorClass = 'border-gray-400';
  }

  return (
    <div className={`flex justify-between items-center gap-4 bg-white rounded-lg border-l-4 ${borderColorClass} px-6 py-4 w-full transition-transform duration-100 hover:scale-105`}>
      <p className="text-xl font-semibold text-gray-800">{description}</p>
      <button 
        className="text-red-400 hover:text-red-600 p-2 rounded transition duration-100 h-10 w-10 flex items-center justify-center"
        onClick={() => deleteTask(id)}
      >
        <Trash2 size={17} />
      </button>
    </div>
  );
};

export default TaskItem;