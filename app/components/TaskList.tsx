"use client";

import React, { useEffect, useState } from 'react';
import TaskItem from './TaskItem';
import { Task } from '../types';
import { FadeLoader } from 'react-spinners';

const TaskList: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchTasks = async () => {
      const response = await fetch('http://127.0.0.1:8000/tasks/');
      const data = await response.json();

      // Sort tasks based on sentiment: positive > neutral > negative
      const sortedTasks = data.sort((a: Task, b: Task) => {
        const sentimentOrder: { [key: string]: number } = {
          positive: 1,
          neutral: 2,
          negative: 3,
        };
        return sentimentOrder[a.sentiment] - sentimentOrder[b.sentiment];
      });

      setTasks(sortedTasks);
      setLoading(false);
    };

    fetchTasks();
  }, []);

  const deleteTask = async (id: number) => {
    await fetch(`http://127.0.0.1:8000/tasks/${id}`, {
      method: 'DELETE',
    });
    setTasks(tasks.filter(task => task.id !== id));
  };

  return (
    <div className="space-y-4">
      {loading ? (
        <div className="flex justify-center items-center h-32">
          <FadeLoader color="#00BFFF" height={15} margin={2} radius={2} />
        </div>
      ) : (
        tasks.map((task) => (
          <TaskItem key={task.id} {...task} deleteTask={deleteTask} />
        ))
      )}
    </div>
  );
};

export default TaskList;