
import React, { useState, useEffect } from 'react';
import { DEFECT_CATALOG } from '../constants';
import type { Anomaly, Defect } from '../types';

interface AnomalyFormProps {
  onSave: (anomaly: Omit<Anomaly, 'id'>) => void;
  onClose: () => void;
  initialLocation?: { lat: number; lng: number };
}

const AnomalyForm: React.FC<AnomalyFormProps> = ({ onSave, onClose, initialLocation }) => {
  const [selectedElement, setSelectedElement] = useState<string>(DEFECT_CATALOG[0]?.element || '');
  const [availableDefects, setAvailableDefects] = useState<Defect[]>([]);
  const [isGettingLocation, setIsGettingLocation] = useState(false);
  const [anomaly, setAnomaly] = useState<Omit<Anomaly, 'id'>>({
    element: selectedElement,
    defect: '',
    level: DEFECT_CATALOG[0]?.defects[0]?.level,
    pk: '',
    notes: '',
    photo: '',
    location: initialLocation,
  });

  useEffect(() => {
    const elementData = DEFECT_CATALOG.find(e => e.element === selectedElement);
    if (elementData) {
      setAvailableDefects(elementData.defects);
      const defaultDefect = elementData.defects[0];
      if (defaultDefect) {
          setAnomaly(prev => ({
            ...prev,
            element: selectedElement,
            defect: defaultDefect.name,
            level: defaultDefect.level,
          }));
      }
    }
  }, [selectedElement]);

  const handleElementChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedElement(e.target.value);
  };
  
  const handleDefectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const defectName = e.target.value;
    const defectData = availableDefects.find(d => d.name === defectName);
    if(defectData) {
        setAnomaly(prev => ({ ...prev, defect: defectData.name, level: defectData.level }));
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setAnomaly(prev => ({ ...prev, [name]: value }));
  };

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setAnomaly(prev => ({ ...prev, photo: reader.result as string }));
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const handleGetLocation = () => {
    setIsGettingLocation(true);
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        setAnomaly(prev => ({
          ...prev,
          location: {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          }
        }));
        setIsGettingLocation(false);
      }, (error: GeolocationPositionError) => {
        console.error("Error getting location:", error.message);
        alert(`No se pudo obtener la ubicación: ${error.message}. Por favor, compruebe los permisos de su navegador.`);
        setIsGettingLocation(false);
      });
    } else {
      alert("La geolocalización no es compatible con este navegador.");
      setIsGettingLocation(false);
    }
  };


  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if(anomaly.defect) {
        onSave(anomaly);
    } else {
        alert("Please select a defect.");
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg shadow-2xl p-8 w-full max-w-lg animate-fade-in-up">
        <h2 className="text-2xl font-bold text-[#1A4488] mb-6">Registrar Nueva Anomalía</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-[#333333]">Elemento</label>
            <select value={selectedElement} onChange={handleElementChange} className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-slate-300 focus:outline-none focus:ring-[#1A4488] focus:border-[#1A4488] sm:text-sm rounded-md">
              {DEFECT_CATALOG.map(el => <option key={el.element} value={el.element}>{el.element}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-[#333333]">Defecto</label>
            <select name="defect" value={anomaly.defect} onChange={handleDefectChange} className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-slate-300 focus:outline-none focus:ring-[#1A4488] focus:border-[#1A4488] sm:text-sm rounded-md">
              {availableDefects.map(d => <option key={d.name} value={d.name}>{d.name}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-[#333333]">PK (Punto Kilométrico)</label>
            <input type="text" name="pk" value={anomaly.pk} onChange={handleChange} required className="mt-1 w-full px-3 py-2 border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-[#1A4488] focus:border-[#1A4488]" />
          </div>
           <div>
            <div className="flex justify-between items-center mb-1">
                <label className="block text-sm font-medium text-[#333333]">Ubicación</label>
                <button type="button" onClick={handleGetLocation} disabled={isGettingLocation} className="text-sm text-[#1A4488] hover:underline disabled:text-gray-400 disabled:cursor-not-allowed">
                    {isGettingLocation ? 'Obteniendo...' : 'Actualizar Ubicación'}
                </button>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                  <input type="text" placeholder="Latitud" value={anomaly.location?.lat.toFixed(6) || ''} readOnly className="w-full px-3 py-2 border border-slate-300 rounded-md shadow-sm bg-gray-100 text-gray-500 cursor-default" />
              </div>
              <div>
                  <input type="text" placeholder="Longitud" value={anomaly.location?.lng.toFixed(6) || ''} readOnly className="w-full px-3 py-2 border border-slate-300 rounded-md shadow-sm bg-gray-100 text-gray-500 cursor-default" />
              </div>
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-[#333333]">Notas Adicionales</label>
            <textarea name="notes" value={anomaly.notes} onChange={handleChange} rows={3} className="mt-1 w-full px-3 py-2 border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-[#1A4488] focus:border-[#1A4488]"></textarea>
          </div>
          <div>
            <label className="block text-sm font-medium text-[#333333]">Fotografía (Opcional)</label>
            <input type="file" accept="image/*" onChange={handlePhotoChange} className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-[#1A4488] hover:file:bg-blue-100" />
          </div>
          <div className="pt-4 flex justify-end space-x-3">
            <button type="button" onClick={onClose} className="px-4 py-2 border border-gray-300 rounded-md text-[#333333] hover:bg-gray-100 transition">Cancelar</button>
            <button type="submit" className="px-4 py-2 bg-[#1A4488] text-white rounded-md hover:bg-blue-900 transition">Guardar Anomalía</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AnomalyForm;