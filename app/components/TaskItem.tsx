"use client";

import { Trash2 } from 'lucide-react';
import React from 'react';
import styles from "@/styles/TaskItem.module.scss";

interface TaskItemProps {
  id: number;
  description: string;
  sentiment: string;
  deleteTask: (id: number) => void;
}

const TaskItem: React.FC<TaskItemProps> = ({ id, description, sentiment, deleteTask }) => {
  let sentimentClass = '';
  switch (sentiment.toLowerCase()) {
    case 'positive':
      sentimentClass = styles['taskItem--positive'];
      break;
    case 'neutral':
      sentimentClass = styles['taskItem--neutral'];
      break;
    case 'negative':
      sentimentClass = styles['taskItem--negative'];
      break;
    default:
      sentimentClass = styles['taskItem--default'];
  }

  return (
    <div className={`${styles.taskItem} ${sentimentClass}`}>
      <p className={styles.taskItem__description}>{description}</p>
      <button 
        className={styles.taskItem__button}
        onClick={() => deleteTask(id)}
      >
        <Trash2 size={17} />
      </button>
    </div>
  );
};

export default TaskItem;
