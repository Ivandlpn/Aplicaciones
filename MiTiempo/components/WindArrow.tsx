import React from 'react';

interface WindArrowProps {
  degrees: number;
}

const WindArrow: React.FC<WindArrowProps> = ({ degrees }) => {
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      className="h-6 w-6 text-sky-600 transform transition-transform duration-300" 
      fill="none" 
      viewBox="0 0 24 24" 
      stroke="currentColor"
      style={{ transform: `rotate(${degrees}deg)` }}
    >
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
    </svg>
  );
};

export default WindArrow;