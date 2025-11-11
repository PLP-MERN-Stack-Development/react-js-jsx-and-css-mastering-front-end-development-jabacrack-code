import { Link } from 'react-router-dom';
import { CheckCircle, Database, Zap, ArrowRight } from 'lucide-react';
import Card from '../components/Card';
import Button from '../components/Button';

export default function Home() {
  const features = [
    {
      icon: CheckCircle,
      title: 'Task Management',
      description: 'Create, organize, and track tasks with real-time statistics and intelligent filtering capabilities.',
      color: 'blue',
    },
    {
      icon: Database,
      title: 'API Integration',
      description: 'Seamlessly fetch and display data from external APIs with search, pagination, and filtering.',
      color: 'green',
    },
    {
      icon: Zap,
      title: 'Modern UI',
      description: 'Beautiful, responsive interface with dark mode support and smooth animations for enhanced UX.',
      color: 'purple',
    },
  ];

  return (
    <div className="space-y-12 md:space-y-20">
      <section className="text-center py-12 md:py-20 animate-fade-in">
        <h1 className="text-5xl md:text-7xl font-bold text-gray-900 dark:text-white mb-6 leading-tight">
          Welcome to <span className="bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent">TaskFlow</span>
        </h1>
        <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed">
          A modern React application demonstrating component architecture, state management with hooks, and seamless API integration.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4 mb-8">
          <Link to="/tasks">
            <Button variant="primary" size="lg" className="group flex items-center justify-center space-x-2 w-full sm:w-auto">
              <span>Get Started</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-200" />
            </Button>
          </Link>
          <Link to="/api">
            <Button variant="secondary" size="lg" className="w-full sm:w-auto">
              Explore API
            </Button>
          </Link>
        </div>
      </section>

      <section className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
        {features.map((feature, index) => (
          <Card
            key={index}
            hover
            className="animate-slide-up flex flex-col"
            style={{ animationDelay: `${index * 150}ms` }}
          >
            <div className={`p-3 bg-${feature.color}-100 dark:bg-${feature.color}-900 rounded-lg w-fit mb-4`}>
              <feature.icon className={`w-8 h-8 text-${feature.color}-600 dark:text-${feature.color}-400`} />
            </div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
              {feature.title}
            </h3>
            <p className="text-gray-600 dark:text-gray-300 flex-1">
              {feature.description}
            </p>
          </Card>
        ))}
      </section>

      <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <Card className="border-l-4 border-blue-600 dark:border-blue-400">
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            Key Features
          </h3>
          <ul className="space-y-3">
            {[
              'React Hooks (useState, useEffect, useContext)',
              'Custom useLocalStorage Hook',
              'React Router Navigation',
              'Context API for Theme Management',
              'Dark Mode Support',
              'Responsive Design',
              'API Data Fetching',
              'Search & Pagination',
            ].map((feature, i) => (
              <li key={i} className="flex items-center space-x-3 text-gray-700 dark:text-gray-300">
                <span className="flex-shrink-0 w-2 h-2 bg-blue-600 dark:bg-blue-400 rounded-full"></span>
                <span>{feature}</span>
              </li>
            ))}
          </ul>
        </Card>

        <Card className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900 dark:to-blue-800 border-l-4 border-blue-600">
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            Built With Modern Stack
          </h3>
          <div className="space-y-3">
            <div>
              <p className="text-sm font-semibold text-gray-600 dark:text-gray-400 mb-2">
                Frontend Framework
              </p>
              <p className="text-lg font-bold text-gray-900 dark:text-white">
                React 18 with TypeScript
              </p>
            </div>
            <div>
              <p className="text-sm font-semibold text-gray-600 dark:text-gray-400 mb-2">
                Styling & Design
              </p>
              <p className="text-lg font-bold text-gray-900 dark:text-white">
                Tailwind CSS + Lucide Icons
              </p>
            </div>
            <div>
              <p className="text-sm font-semibold text-gray-600 dark:text-gray-400 mb-2">
                Routing & State
              </p>
              <p className="text-lg font-bold text-gray-900 dark:text-white">
                React Router + Context API
              </p>
            </div>
          </div>
        </Card>
      </section>

      <section className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-2xl p-8 md:p-12 text-center text-white">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">
          Ready to Explore?
        </h2>
        <p className="text-lg mb-8 opacity-90">
          Dive into task management or browse real-world API data
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Link to="/tasks">
            <Button variant="secondary" size="lg" className="w-full sm:w-auto">
              Task Manager
            </Button>
          </Link>
          <Link to="/api">
            <Button variant="secondary" size="lg" className="w-full sm:w-auto">
              API Explorer
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
