import React from 'react';

interface IconProps {
    className?: string;
}

export const SunIcon: React.FC<IconProps> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
    </svg>
);

export const MoonIcon: React.FC<IconProps> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
    </svg>
);

const CloudIcon: React.FC<IconProps> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
    </svg>
);

const RainIcon: React.FC<IconProps> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15zm7-9l-2 4h4l-2 4" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 19v1m4-1v1m-2 1v1" />
    </svg>
);

const PartlyCloudyIcon: React.FC<IconProps> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15a4.5 4.5 0 004.5 4.5h8.25a4.5 4.5 0 004.5-4.5V15m-15 0l15 0m-15 0V9a4.5 4.5 0 014.5-4.5h2.25a4.5 4.5 0 014.5 4.5v1.5m-6.75 6.75v-6.75a4.5 4.5 0 014.5-4.5h2.25a4.5 4.5 0 014.5 4.5v6.75" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707" style={{ transform: 'scale(0.7) translate(-5px, -5px)', stroke: 'orange' }}/>
    </svg>
);


interface WeatherIconProps {
  cloudCover: number;
  precipitation: number;
  size?: 'normal' | 'large';
}

export const WeatherIcon: React.FC<WeatherIconProps> = ({ cloudCover, precipitation, size = 'normal' }) => {
  const sizeClass = size === 'large' ? 'w-8 h-8' : 'w-6 h-6';
  const className = `${sizeClass} text-slate-500`;

  if (precipitation > 0.1) {
    return <RainIcon className={`${sizeClass} text-blue-500`} />;
  }
  if (cloudCover > 75) {
    return <CloudIcon className={className} />;
  }
  if (cloudCover > 25) {
    return <PartlyCloudyIcon className={className} />;
  }
  return <SunIcon className={`${sizeClass} text-yellow-500`} />;
};