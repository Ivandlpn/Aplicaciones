
import React, { useState } from 'react';
import type { CabinTrip } from '../types';

interface TripDetailsFormProps {
  initialData: Partial<CabinTrip>;
  onSubmit: (details: Partial<CabinTrip>) => void;
  onCancel: () => void;
}

// InputField component is now defined outside the main component to prevent re-mounting on every render.
const InputField: React.FC<{
  label: string;
  name: string;
  value: string | undefined;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder: string;
  type?: string;
}> = ({ label, name, value, onChange, placeholder, type = "text" }) => (
  <div>
    <label htmlFor={name} className="block text-sm font-medium text-[#333333] mb-1">{label}</label>
    <input
      type={type}
      id={name}
      name={name}
      value={value || ''}
      onChange={onChange}
      placeholder={placeholder}
      required
      className="w-full px-3 py-2 border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-[#1A4488] focus:border-[#1A4488]"
    />
  </div>
);


const TripDetailsForm: React.FC<TripDetailsFormProps> = ({ initialData, onSubmit, onCancel }) => {
  const [details, setDetails] = useState(initialData);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setDetails(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(details);
  };
  
  return (
    <form onSubmit={handleSubmit}>
      <h3 className="text-xl font-semibold mb-6 text-center text-[#1A4488]">Información del Viaje</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
        <InputField label="Línea" name="line" value={details.line} onChange={handleChange} placeholder="Ej: 040 MADRID-VALENCIA, AVE" />
        <InputField label="Vía" name="track" value={details.track} onChange={handleChange} placeholder="Ej: V1" />
        <InputField label="Fecha" name="date" value={details.date} onChange={handleChange} placeholder="" type="date" />
        <InputField label="Técnico" name="technician" value={details.technician} onChange={handleChange} placeholder="Nombre del técnico" />
        <InputField label="PK Inicio" name="pkStart" value={details.pkStart} onChange={handleChange} placeholder="Ej: 0.0" />
        <InputField label="PK Fin" name="pkEnd" value={details.pkEnd} onChange={handleChange} placeholder="Ej: 199.176" />
      </div>
      <div className="mt-8 flex justify-end space-x-4">
        <button type="button" onClick={onCancel} className="px-6 py-2 border border-gray-300 rounded-md text-[#333333] hover:bg-gray-100 transition">
          Cancelar
        </button>
        <button type="submit" className="px-6 py-2 bg-[#1A4488] text-white rounded-md hover:bg-blue-900 transition">
          Siguiente &rarr;
        </button>
      </div>
    </form>
  );
};

export default TripDetailsForm;
