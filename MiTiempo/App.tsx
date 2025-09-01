import React, { useState, useEffect } from 'react';
import { getMockForecast } from './services/weatherService';
import type { ForecastData } from './types';
import ForecastChart from './components/ForecastChart';
import ForecastTable from './components/ForecastTable';
import { SunIcon, MoonIcon } from './components/Icons';

const App: React.FC = () => {
  const [forecast, setForecast] = useState<ForecastData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [selectedDay, setSelectedDay] = useState<string>('');
  
  useEffect(() => {
    // Cargar datos de ejemplo para una experiencia inmediata
    try {
      const mockData = getMockForecast();
      setForecast(mockData);
      if (mockData && Object.keys(mockData.dailyForecasts).length > 0) {
        setSelectedDay(Object.keys(mockData.dailyForecasts)[0]);
      }
    } catch (err) {
      console.error("Error al cargar datos de ejemplo:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return { text: 'Buenos Días', icon: <SunIcon className="w-8 h-8 text-yellow-500" /> };
    if (hour < 18) return { text: 'Buenas Tardes', icon: <SunIcon className="w-8 h-8 text-orange-500" /> };
    return { text: 'Buenas Noches', icon: <MoonIcon className="w-8 h-8 text-indigo-500" /> };
  };

  const { text: greetingText, icon: greetingIcon } = getGreeting();
  
  const renderContent = () => {
    if (loading) {
      return (
        <div className="flex flex-col items-center justify-center h-64">
          <svg className="animate-spin -ml-1 mr-3 h-10 w-10 text-sky-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          <p className="mt-4 text-lg text-slate-600">Cargando pronóstico...</p>
        </div>
      );
    }

    if (!forecast || Object.keys(forecast.dailyForecasts).length === 0) {
      return <p className="text-center text-slate-500 text-lg p-8">No hay datos de pronóstico disponibles.</p>;
    }

    const dailyForecast = forecast.dailyForecasts[selectedDay];

    return (
      <>
        <div className="mb-6 md:px-4">
          <div className="border-b border-slate-300">
            <nav className="-mb-px flex space-x-2 sm:space-x-4 md:space-x-6 overflow-x-auto" aria-label="Tabs">
              {Object.keys(forecast.dailyForecasts).map(day => (
                <button
                  key={day}
                  onClick={() => setSelectedDay(day)}
                  className={`${
                    selectedDay === day
                      ? 'border-sky-500 text-sky-600'
                      : 'border-transparent text-slate-500 hover:text-sky-600 hover:border-sky-300'
                  } whitespace-nowrap py-4 px-3 border-b-2 font-medium text-sm transition-colors duration-200`}
                >
                  {new Date(day).toLocaleDateString('es-ES', { weekday: 'long', day: 'numeric', month: 'short' })}
                </button>
              ))}
            </nav>
          </div>
        </div>
        
        {dailyForecast && (
          <div className="space-y-8">
            <ForecastChart data={dailyForecast} />
            <ForecastTable data={dailyForecast} />
          </div>
        )}
      </>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-200 to-amber-100 text-slate-800">
      <main className="container mx-auto p-4 md:p-8">
        <header className="mb-8">
          <div className="flex items-center space-x-4 mb-2">
            {greetingIcon}
            <h1 className="text-3xl md:text-4xl font-bold text-slate-900">{greetingText}</h1>
          </div>
          <p className="text-lg text-slate-600">
            Condiciones para tu paseo en <span className="font-semibold text-sky-600">{forecast?.spotName || '...'}</span>
          </p>
          <p className="text-xs text-slate-500 mt-1">
            Fecha de generación: {forecast ? new Date(forecast.generatedAt).toLocaleString('es-ES') : '...'}
          </p>
        </header>
        
        {renderContent()}
      </main>
      <footer className="text-center p-4 text-xs text-slate-500">
        <p>La aplicación está en modo demostración con datos de ejemplo.</p>
      </footer>
    </div>
  );
};

export default App;