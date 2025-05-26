
import React from 'react';

interface IconButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  className?: string;
  'aria-label': string;
}

export const IconButton: React.FC<IconButtonProps> = ({ children, className, ...props }) => {
  return (
    <button
      {...props}
      className={`focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-opacity-50 ${className || ''}`}
    >
      {children}
    </button>
  );
};
