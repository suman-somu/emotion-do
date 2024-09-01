import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';
import { Task } from './types';

async function fetchTasks(): Promise<Task[]> {
  const response = await fetch('http://127.0.0.1:8000/tasks/');
  return response.json();
}

export default async function HomePage() {
  const tasks = await fetchTasks();

  console.log("tasks", tasks);

  return (
    <div className="min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12">
      <div className="relative py-3 sm:max-w-xl sm:mx-auto">
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-light-blue-500 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"></div>
        <div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
          <h1 className="text-4xl font-bold text-center mb-8 text-gray-800">EmotionDo</h1>
          
          <div className="mb-8">
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