
import React from 'react';
import type { CabinTrip } from '../types';

interface TripCardProps {
  trip: CabinTrip;
}

const CalendarIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
);

const AlertTriangleIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
);


const TripCard: React.FC<TripCardProps> = ({ trip }) => {
  return (
    <div className="bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 p-6 flex flex-col justify-between border border-gray-100">
      <div>
        <div className="mb-4">
            <p className="text-xs text-gray-500">{trip.code}</p>
            <h3 className="text-xl font-bold text-[#1A4488]">{trip.line}</h3>
            <p className="text-sm text-[#333333]">Vía: {trip.track}</p>
        </div>
        <p className="text-sm text-gray-500 mb-2">Técnico: <span className="font-medium text-[#333333]">{trip.technician}</span></p>
        <div className="flex items-center text-sm text-[#333333] mb-2">
            <CalendarIcon />
            <span>{new Date(trip.date).toLocaleDateString()}</span>
        </div>
        <div className="flex items-center text-sm text-[#333333]">
            <AlertTriangleIcon />
            <span>{trip.anomalies.length} anomalías registradas</span>
        </div>
      </div>
      <div className="mt-6 text-right">
        <button className="text-[#1A4488] hover:text-blue-900 font-semibold text-sm">Ver Detalles &rarr;</button>
      </div>
    </div>
  );
};

export default TripCard;
