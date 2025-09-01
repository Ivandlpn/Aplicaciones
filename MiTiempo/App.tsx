
import React, { useState, useEffect } from 'react';
import { getForecast } from './services/weatherService';
import type { ForecastData } from './types';
import ForecastChart from './components/ForecastChart';
import ForecastTable from './components/ForecastTable';
import { SunIcon, MoonIcon } from './components/Icons';

const App: React.FC = () => {
  const [forecast, setForecast] = useState<ForecastData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedDay, setSelectedDay] = useState<string>('');

  useEffect(() => {
    const fetchForecast = async () => {
      try {
        setLoading(true);
        const data = await getForecast();
        setForecast(data);
        if (data && Object.keys(data.dailyForecasts).length > 0) {
          setSelectedDay(Object.keys(data.dailyForecasts)[0]);
        }
      } catch (err) {
        setError('No se pudo cargar el pronóstico. Por favor, intente de nuevo más tarde.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchForecast();
  }, []);

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return { text: 'Buenos Días', icon: <SunIcon className="w-8 h-8 text-yellow-300" /> };
    if (hour < 18) return { text: 'Buenas Tardes', icon: <SunIcon className="w-8 h-8 text-orange-400" /> };
    return { text: 'Buenas Noches', icon: <MoonIcon className="w-8 h-8 text-blue-300" /> };
  };

  const { text: greetingText, icon: greetingIcon } = getGreeting();

  const renderContent = () => {
    if (loading) {
      return (
        <div className="flex flex-col items-center justify-center h-64">
          <svg className="animate-spin -ml-1 mr-3 h-10 w-10 text-cyan-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          <p className="mt-4 text-lg text-gray-300">Cargando pronóstico...</p>
        </div>
      );
    }

    if (error) {
      return <p className="text-center text-red-400 text-lg p-8">{error}</p>;
    }

    if (!forecast || Object.keys(forecast.dailyForecasts).length === 0) {
      return <p className="text-center text-gray-400 text-lg p-8">No hay datos de pronóstico disponibles.</p>;
    }

    const dailyForecast = forecast.dailyForecasts[selectedDay];

    return (
      <>
        <div className="mb-6 md:px-4">
          <div className="border-b border-gray-700">
            <nav className="-mb-px flex space-x-2 sm:space-x-4 md:space-x-6 overflow-x-auto" aria-label="Tabs">
              {Object.keys(forecast.dailyForecasts).map(day => (
                <button
                  key={day}
                  onClick={() => setSelectedDay(day)}
                  className={`${
                    selectedDay === day
                      ? 'border-cyan-400 text-cyan-400'
                      : 'border-transparent text-gray-400 hover:text-gray-200 hover:border-gray-500'
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
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-slate-800 text-gray-200">
      <main className="container mx-auto p-4 md:p-8">
        <header className="mb-8">
          <div className="flex items-center space-x-4 mb-2">
            {greetingIcon}
            <h1 className="text-3xl md:text-4xl font-bold text-white">{greetingText}</h1>
          </div>
          <p className="text-lg text-gray-400">
            Pronóstico para <span className="font-semibold text-cyan-400">{forecast?.spotName || '...'}</span>
          </p>
          <p className="text-xs text-gray-500 mt-1">
            Última actualización: {forecast ? new Date(forecast.generatedAt).toLocaleString('es-ES') : '...'}
          </p>
        </header>
        {renderContent()}
      </main>
      <footer className="text-center p-4 text-xs text-gray-600">
        <p>Creado con fines de demostración. Los datos son simulados.</p>
      </footer>
    </div>
  );
};

export default App;
