import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';
import { Task } from './types';
import styles from '@/styles/HomePage.module.scss';

async function fetchTasks(): Promise<Task[]> {
  const response = await fetch('http://127.0.0.1:8000/tasks/');
  return response.json();
}

export default async function HomePage() {
  const tasks = await fetchTasks();

  console.log("tasks", tasks);

  return (
    <div className={styles.homePage}>
      <div className={styles.homePage__container}>
        <div className={styles.homePage__background}></div>
        <div className={styles.homePage__content}>
          <h1 className={styles.homePage__title}>EmotionDo</h1>
          
          <div className={styles.homePage__formWrapper}>
            <TaskForm />
          </div>

          <div>
            <TaskList />
          </div>
        </div>
      </div>
    </div>
  );
}
