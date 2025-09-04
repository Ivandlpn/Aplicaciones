
import React from 'react';
import type { CabinTrip } from '../types';
import TripCard from './TripCard';

interface DashboardProps {
  trips: CabinTrip[];
  onStartNewTrip: () => void;
}

const PlusIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
    </svg>
);

const Dashboard: React.FC<DashboardProps> = ({ trips, onStartNewTrip }) => {
  return (
    <div className="animate-fade-in">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-3xl font-semibold text-[#1A4488]">Registro de Viajes</h2>
        <button
          onClick={onStartNewTrip}
          className="flex items-center bg-[#CB1823] text-white font-bold py-2 px-4 rounded-lg hover:bg-red-700 transition duration-300 shadow-lg transform hover:scale-105"
        >
          <PlusIcon />
          Iniciar Nuevo Viaje
        </button>
      </div>

      {trips.length === 0 ? (
        <div className="text-center py-20 bg-white rounded-lg shadow-md border border-gray-100">
          <h3 className="text-xl font-semibold text-[#333333]">No hay viajes registrados.</h3>
          <p className="text-gray-500 mt-2">Haga clic en "Iniciar Nuevo Viaje" para comenzar.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {trips.map(trip => (
            <TripCard key={trip.id} trip={trip} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Dashboard;
