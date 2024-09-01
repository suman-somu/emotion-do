"use client";

import React, { useState } from 'react';

const TaskForm: React.FC = () => {
  const [description, setDescription] = useState<string>('');
  const [tasks, setTasks] = useState<any[]>([]); // State to hold the list of tasks

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (description.trim()) {
      const response = await fetch('http://127.0.0.1:8000/tasks/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ description }),
      });

      if (response.ok) {
        const newTask = await response.json();
        console.log('New task:', newTask);
        setTasks((prevTasks) => [...prevTasks, newTask]);
        setDescription('');
      } else {
        // Handle error response
        const errorData = await response.json();
        console.error('Error creating task:', errorData);
      }
    }
  };

  return (
    <div className="space-y-6">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex items-center space-x-4">
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Add a new task"
            required
            className="flex-grow px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-400"
          />
          <button
            type="submit"
            className="px-4 py-2 bg-cyan-500 text-white rounded-lg hover:bg-cyan-600 transition duration-300"
          >
            Add Task
          </button>
        </div>
      </form>

      <ul className="space-y-2">
        {tasks.map((task) => (
          <li key={task.id} className="p-4 bg-white shadow-md rounded-lg">
            <div className="flex justify-between items-center">
              <span className="text-gray-800">{task.description}</span>
              <span className="text-sm text-gray-600">{task.sentiment}</span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TaskForm;