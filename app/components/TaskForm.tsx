"use client";

import React, { useState } from 'react';
import styles from '@/styles/TaskForm.module.scss';

const TaskForm: React.FC = () => {
  const [description, setDescription] = useState<string>('');
  const [tasks, setTasks] = useState<any[]>([]);

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
    <div className={styles.taskForm}>
      <form onSubmit={handleSubmit} className={styles.taskForm__form}>
        <div className={styles.taskForm__formGroup}>
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Add a new task"
            required
            className={styles.taskForm__input}
          />
          <button
            type="submit"
            className={styles.taskForm__button}
          >
            Add Task
          </button>
        </div>
      </form>

      <ul className={styles.taskForm__taskList}>
        {tasks.map((task) => (
          <li key={task.id} className={styles.taskForm__taskItem}>
            <div className={styles.taskForm__taskItem}>
              <span className={styles.taskForm__taskItemDescription}>{task.description}</span>
              <span className={styles.taskForm__taskItemSentiment}>{task.sentiment}</span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TaskForm;
