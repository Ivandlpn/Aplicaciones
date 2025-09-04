
import React, { useState } from 'react';
import type { Anomaly, CabinTrip } from '../types';
import TripDetailsForm from './TripDetailsForm';
import AnomalyLogger from './AnomalyLogger';
import TripSummary from './TripSummary';

interface NewTripWizardProps {
  onSave: (newTrip: Omit<CabinTrip, 'id' | 'code'>) => void;
  onCancel: () => void;
}

const NewTripWizard: React.FC<NewTripWizardProps> = ({ onSave, onCancel }) => {
  const [step, setStep] = useState(1);
  const [tripData, setTripData] = useState<Omit<CabinTrip, 'id' | 'code'>>({
    line: '',
    track: '',
    date: new Date().toISOString().split('T')[0],
    technician: '',
    pkStart: '',
    pkEnd: '',
    anomalies: [],
  });

  const handleDetailsSubmit = (details: Partial<CabinTrip>) => {
    setTripData(prev => ({ ...prev, ...details }));
    setStep(2);
  };

  const handleAnomaliesUpdate = (anomalies: Anomaly[]) => {
    setTripData(prev => ({ ...prev, anomalies }));
  };
  
  const handleAISummaryUpdate = (summary: string) => {
    setTripData(prev => ({ ...prev, aiSummary: summary }));
  };

  const steps = [
    { number: 1, title: 'Detalles del Viaje' },
    { number: 2, title: 'Registro de Anomalías' },
    { number: 3, title: 'Resumen y Finalización' },
  ];

  return (
    <div className="bg-white p-8 rounded-xl shadow-lg animate-fade-in-up w-full max-w-4xl mx-auto border border-gray-100">
        <div className="mb-8">
            <div className="flex items-center justify-center">
                {steps.map((s, index) => (
                    <React.Fragment key={s.number}>
                        <div className="flex items-center">
                            <div className={`rounded-full h-10 w-10 flex items-center justify-center font-bold text-white ${step >= s.number ? 'bg-[#1A4488]' : 'bg-slate-300'}`}>
                                {s.number}
                            </div>
                            <div className={`ml-4 text-sm font-semibold ${step >= s.number ? 'text-[#1A4488]' : 'text-slate-500'}`}>{s.title}</div>
                        </div>
                        {index < steps.length - 1 && <div className={`flex-auto border-t-2 transition duration-500 ease-in-out mx-4 ${step > s.number ? 'border-[#1A4488]' : 'border-slate-300'}`}></div>}
                    </React.Fragment>
                ))}
            </div>
        </div>

      {step === 1 && <TripDetailsForm initialData={tripData} onSubmit={handleDetailsSubmit} onCancel={onCancel} />}
      {step === 2 && <AnomalyLogger initialAnomalies={tripData.anomalies} onUpdate={handleAnomaliesUpdate} onNext={() => setStep(3)} onBack={() => setStep(1)} />}
      {step === 3 && <TripSummary tripData={tripData} onSave={() => onSave(tripData)} onBack={() => setStep(2)} onAISummaryUpdate={handleAISummaryUpdate} />}
    </div>
  );
};

export default NewTripWizard;
