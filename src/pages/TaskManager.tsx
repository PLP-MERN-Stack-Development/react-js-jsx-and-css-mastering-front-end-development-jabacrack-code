import { useState } from 'react';
import { Plus, Trash2, Check, Filter, Loader2 } from 'lucide-react';
import { useLocalStorage } from '../hooks/useLocalStorage';
import Card from '../components/Card';
import Button from '../components/Button';

interface Task {
  id: string;
  title: string;
  completed: boolean;
  createdAt: string;
}

type FilterType = 'all' | 'active' | 'completed';

export default function TaskManager() {
  const [tasks, setTasks, clearTasks] = useLocalStorage<Task[]>('tasks', []);
  const [newTask, setNewTask] = useState('');
  const [filter, setFilter] = useState<FilterType>('all');
  const [isAnimating, setIsAnimating] = useState(false);

  const addTask = () => {
    if (newTask.trim()) {
      setIsAnimating(true);
      const task: Task = {
        id: Date.now().toString(),
        title: newTask.trim(),
        completed: false,
        createdAt: new Date().toISOString(),
      };
      setTasks([...tasks, task]);
      setNewTask('');
      setTimeout(() => setIsAnimating(false), 300);
    }
  };

  const toggleTask = (id: string) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const deleteTask = (id: string) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const filteredTasks = tasks.filter((task) => {
    if (filter === 'active') return !task.completed;
    if (filter === 'completed') return task.completed;
    return true;
  });

  const stats = {
    total: tasks.length,
    active: tasks.filter((t) => !t.completed).length,
    completed: tasks.filter((t) => t.completed).length,
  };

  const completionPercentage =
    tasks.length === 0 ? 0 : Math.round((stats.completed / tasks.length) * 100);

  return (
    <div className="max-w-4xl mx-auto animate-fade-in">
      <div className="text-center mb-8">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-2">
          Task Manager
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-300">
          Stay organized and boost your productivity
        </p>
      </div>

      <div className="grid grid-cols-3 gap-3 md:gap-4 mb-8">
        <Card className="text-center">
          <p className="text-xs md:text-sm text-gray-600 dark:text-gray-400 mb-2">
            Total Tasks
          </p>
          <p className="text-2xl md:text-4xl font-bold text-gray-900 dark:text-white">
            {stats.total}
          </p>
        </Card>
        <Card className="text-center">
          <p className="text-xs md:text-sm text-gray-600 dark:text-gray-400 mb-2">
            Active
          </p>
          <p className="text-2xl md:text-4xl font-bold text-blue-600 dark:text-blue-400">
            {stats.active}
          </p>
        </Card>
        <Card className="text-center">
          <p className="text-xs md:text-sm text-gray-600 dark:text-gray-400 mb-2">
            Completed
          </p>
          <p className="text-2xl md:text-4xl font-bold text-green-600 dark:text-green-400">
            {stats.completed}
          </p>
        </Card>
      </div>

      {tasks.length > 0 && (
        <Card className="mb-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Progress
            </span>
            <span className="text-sm font-bold text-gray-900 dark:text-white">
              {completionPercentage}%
            </span>
          </div>
          <div className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-green-500 to-green-600 transition-all duration-500"
              style={{ width: `${completionPercentage}%` }}
            ></div>
          </div>
        </Card>
      )}

      <Card className="mb-6">
        <div className="flex gap-2">
          <input
            type="text"
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && addTask()}
            placeholder="Add a new task..."
            className="flex-1 px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 transition-colors duration-200"
          />
          <Button onClick={addTask} variant="primary">
            <Plus className="w-5 h-5" />
          </Button>
        </div>
      </Card>

      <div className="flex justify-center flex-wrap gap-2 mb-6">
        {['all', 'active', 'completed'].map((f) => (
          <Button
            key={f}
            variant={filter === f ? 'primary' : 'secondary'}
            onClick={() => setFilter(f as FilterType)}
            size="sm"
            className={filter === f ? 'ring-2 ring-offset-2 ring-blue-500' : ''}
          >
            {f.charAt(0).toUpperCase() + f.slice(1)}
          </Button>
        ))}
      </div>

      <div className="space-y-3">
        {filteredTasks.length === 0 ? (
          <Card className="text-center py-12">
            <Loader2 className="w-12 h-12 text-gray-300 dark:text-gray-600 mx-auto mb-4 opacity-50" />
            <p className="text-gray-500 dark:text-gray-400 text-lg">
              {filter === 'all'
                ? 'No tasks yet. Create one to get started!'
                : `No ${filter} tasks found.`}
            </p>
          </Card>
        ) : (
          filteredTasks.map((task, idx) => (
            <Card
              key={task.id}
              className="flex items-center justify-between transition-all duration-200 hover:scale-105 hover:shadow-xl animate-slide-up"
              style={{ animationDelay: `${idx * 50}ms` }}
            >
              <div className="flex items-center space-x-4 flex-1 min-w-0">
                <button
                  onClick={() => toggleTask(task.id)}
                  className={`flex-shrink-0 w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all duration-200 ${
                    task.completed
                      ? 'bg-green-500 border-green-500 shadow-lg'
                      : 'border-gray-300 dark:border-gray-600 hover:border-green-500'
                  }`}
                >
                  {task.completed && <Check className="w-4 h-4 text-white" />}
                </button>
                <span
                  className={`flex-1 truncate transition-all duration-200 ${
                    task.completed
                      ? 'line-through text-gray-400 dark:text-gray-600'
                      : 'text-gray-900 dark:text-white font-medium'
                  }`}
                >
                  {task.title}
                </span>
              </div>
              <Button
                variant="danger"
                onClick={() => deleteTask(task.id)}
                size="sm"
                className="ml-4 flex-shrink-0"
              >
                <Trash2 className="w-4 h-4" />
              </Button>
            </Card>
          ))
        )}
      </div>

      {tasks.length > 0 && (
        <Card className="mt-8 text-center bg-gray-100 dark:bg-gray-700">
          <Button
            variant="secondary"
            onClick={() => {
              if (confirm('Are you sure you want to delete all tasks?')) {
                clearTasks();
              }
            }}
            className="w-full"
          >
            Clear All Tasks
          </Button>
        </Card>
      )}
    </div>
  );
}
