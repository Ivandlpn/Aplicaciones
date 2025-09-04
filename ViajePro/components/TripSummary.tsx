
import React, { useState } from 'react';
import type { CabinTrip } from '../types';
import { generateTripSummary } from '../services/geminiService';

interface TripSummaryProps {
  tripData: Omit<CabinTrip, 'id' | 'code'>;
  onSave: () => void;
  onBack: () => void;
  onAISummaryUpdate: (summary: string) => void;
}

const Spinner: React.FC = () => (
  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
);

const TripSummary: React.FC<TripSummaryProps> = ({ tripData, onSave, onBack, onAISummaryUpdate }) => {
    const [isGenerating, setIsGenerating] = useState(false);
    const [aiSummary, setAiSummary] = useState(tripData.aiSummary || '');

    const handleGenerateSummary = async () => {
        setIsGenerating(true);
        const summary = await generateTripSummary(tripData.anomalies);
        setAiSummary(summary);
        onAISummaryUpdate(summary);
        setIsGenerating(false);
    };

    return (
        <div>
            <h3 className="text-2xl font-semibold mb-6 text-center text-[#1A4488]">Resumen del Viaje</h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6 bg-gray-50 rounded-lg mb-6 border border-gray-200">
                <div>
                    <h4 className="font-semibold text-gray-500">Línea:</h4>
                    <p className="text-[#333333]">{tripData.line}</p>
                </div>
                <div>
                    <h4 className="font-semibold text-gray-500">Vía:</h4>
                    <p className="text-[#333333]">{tripData.track}</p>
                </div>
                <div>
                    <h4 className="font-semibold text-gray-500">Fecha:</h4>
                    <p className="text-[#333333]">{new Date(tripData.date).toLocaleDateString()}</p>
                </div>
                <div>
                    <h4 className="font-semibold text-gray-500">Técnico:</h4>
                    <p className="text-[#333333]">{tripData.technician}</p>
                </div>
                 <div>
                    <h4 className="font-semibold text-gray-500">Tramo (PK):</h4>
                    <p className="text-[#333333]">{tripData.pkStart} - {tripData.pkEnd}</p>
                </div>
            </div>

            <h4 className="text-xl font-semibold mb-3 text-[#1A4488]">Anomalías Registradas ({tripData.anomalies.length})</h4>
            <div className="border rounded-lg p-4 max-h-48 overflow-y-auto mb-6 bg-gray-50">
                {tripData.anomalies.length > 0 ? (
                    <ul className="divide-y divide-slate-200">
                        {tripData.anomalies.map(a => (
                            <li key={a.id} className="py-2">
                                <p className="font-semibold">{a.defect} <span className="text-gray-500 font-normal">({a.level})</span></p>
                                <p className="text-sm text-gray-600">PK: {a.pk} - {a.notes}</p>
                                {a.location && (
                                    <p className="text-xs text-gray-500">Ubicación: {a.location.lat.toFixed(5)}, {a.location.lng.toFixed(5)}</p>
                                )}
                            </li>
                        ))}
                    </ul>
                ) : <p className="text-gray-500">No hay anomalías.</p>}
            </div>

             <div className="mb-6">
                <h4 className="text-xl font-semibold mb-3 text-[#1A4488]">Resumen con IA</h4>
                <div className="bg-blue-50 border border-blue-200 p-4 rounded-lg min-h-[100px]">
                    {aiSummary ? (
                       <p className="text-[#333333] whitespace-pre-wrap">{aiSummary}</p>
                    ) : (
                       <p className="text-gray-500">Haz clic en el botón para generar un resumen automático.</p>
                    )}
                </div>
                <button 
                    onClick={handleGenerateSummary} 
                    disabled={isGenerating}
                    className="mt-3 flex items-center justify-center bg-[#1A4488] text-white font-bold py-2 px-4 rounded-lg hover:bg-blue-900 transition duration-300 disabled:bg-blue-300">
                    {isGenerating ? <Spinner /> : 'Generar Resumen AI'}
                </button>
            </div>


            <div className="mt-10 flex justify-between">
                <button onClick={onBack} className="px-6 py-2 border border-gray-300 rounded-md text-[#333333] hover:bg-gray-100 transition">
                    &larr; Atrás
                </button>
                <button onClick={onSave} className="px-6 py-2 bg-[#CB1823] text-white font-bold rounded-md hover:bg-red-700 transition shadow-lg">
                    Finalizar y Guardar Viaje
                </button>
            </div>
        </div>
    );
};

export default TripSummary;