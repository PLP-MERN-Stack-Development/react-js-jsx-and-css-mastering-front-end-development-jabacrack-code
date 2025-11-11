import { ReactNode } from 'react';

interface CardProps {
  children: ReactNode;
  className?: string;
  hover?: boolean;
}

export default function Card({ children, className = '', hover = false }: CardProps) {
  return (
    <div
      className={`bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 transition-all duration-300 ${
        hover ? 'hover:shadow-2xl hover:-translate-y-1 cursor-pointer' : ''
      } ${className}`}
    >
      {children}
    </div>
  );
}
