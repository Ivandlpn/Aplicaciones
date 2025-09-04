
import React, { useState } from 'react';
import type { Anomaly } from '../types';
import AnomalyForm from './AnomalyForm';

interface AnomalyLoggerProps {
  initialAnomalies: Anomaly[];
  onUpdate: (anomalies: Anomaly[]) => void;
  onNext: () => void;
  onBack: () => void;
}

const PlusIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
    </svg>
);

const TrashIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
);

const AnomalyLogger: React.FC<AnomalyLoggerProps> = ({ initialAnomalies, onUpdate, onNext, onBack }) => {
  const [anomalies, setAnomalies] = useState<Anomaly[]>(initialAnomalies);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newAnomalyLocation, setNewAnomalyLocation] = useState<{lat: number, lng: number} | undefined>(undefined);

  const handleOpenModal = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        setNewAnomalyLocation({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
        setIsModalOpen(true);
      }, (error: GeolocationPositionError) => {
        console.error("Error getting location:", error.message);
        alert(`No se pudo obtener la ubicación: ${error.message}. Por favor, compruebe los permisos de su navegador.`);
        setNewAnomalyLocation(undefined);
        setIsModalOpen(true);
      });
    } else {
      alert("La geolocalización no es compatible con este navegador.");
      setNewAnomalyLocation(undefined);
      setIsModalOpen(true);
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setNewAnomalyLocation(undefined); 
  };

  const handleAddAnomaly = (newAnomaly: Omit<Anomaly, 'id'>) => {
    const anomalyWithId = { ...newAnomaly, id: new Date().toISOString() };
    const updatedAnomalies = [...anomalies, anomalyWithId];
    setAnomalies(updatedAnomalies);
    onUpdate(updatedAnomalies);
    handleCloseModal();
  };

  const handleDeleteAnomaly = (id: string) => {
    const updatedAnomalies = anomalies.filter(a => a.id !== id);
    setAnomalies(updatedAnomalies);
    onUpdate(updatedAnomalies);
  };
  
  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-xl font-semibold text-[#1A4488]">Anomalías Detectadas</h3>
        <button onClick={handleOpenModal} className="flex items-center bg-[#1A4488] text-white font-bold py-2 px-4 rounded-lg hover:bg-blue-900 transition duration-300 shadow-md">
            <PlusIcon />
            Añadir Anomalía
        </button>
      </div>

      <div className="bg-gray-50 p-4 rounded-lg min-h-[200px] border border-gray-200">
        {anomalies.length === 0 ? (
          <p className="text-center text-gray-500 pt-16">No se han registrado anomalías.</p>
        ) : (
          <ul className="space-y-3">
            {anomalies.map(anomaly => (
              <li key={anomaly.id} className="bg-white p-3 rounded-md shadow-sm flex justify-between items-start border border-gray-100">
                <div className="flex-grow">
                  <p className="font-semibold text-[#333333]">{anomaly.defect} <span className="font-normal text-gray-500">({anomaly.element})</span></p>
                  <p className="text-sm text-gray-600">PK: {anomaly.pk} - Nivel: <span className="font-semibold">{anomaly.level}</span></p>
                   {anomaly.location && (
                    <p className="text-xs text-gray-500">Coords: {anomaly.location.lat.toFixed(5)}, {anomaly.location.lng.toFixed(5)}</p>
                  )}
                </div>
                <button onClick={() => handleDeleteAnomaly(anomaly.id)} className="text-red-600 hover:text-red-800 p-2 rounded-full hover:bg-red-50 transition flex-shrink-0">
                  <TrashIcon />
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>

      {isModalOpen && <AnomalyForm onSave={handleAddAnomaly} onClose={handleCloseModal} initialLocation={newAnomalyLocation} />}
      
      <div className="mt-8 flex justify-between">
        <button onClick={onBack} className="px-6 py-2 border border-gray-300 rounded-md text-[#333333] hover:bg-gray-100 transition">
          &larr; Atrás
        </button>
        <button onClick={onNext} className="px-6 py-2 bg-[#1A4488] text-white rounded-md hover:bg-blue-900 transition">
          Siguiente &rarr;
        </button>
      </div>
    </div>
  );
};

export default AnomalyLogger;