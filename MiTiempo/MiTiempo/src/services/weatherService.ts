import type { ForecastData, ForecastEntry, DailyForecast } from '../types';

const API_KEY = 'e84ff906e340479416a5dc273280afcc';
const LAT = 38.258; // Coordenadas para Arenales del Sol
const LON = -0.505; // Coordenadas para Arenales del Sol
const API_URL = `https://api.openweathermap.org/data/2.5/forecast?lat=${LAT}&lon=${LON}&appid=${API_KEY}&units=metric&lang=es`;

// Helper para convertir m/s a nudos
const msToKnots = (ms: number): number => Math.round(ms * 1.94384);

export const getForecast = async (): Promise<ForecastData> => {
  const response = await fetch(API_URL);
  if (!response.ok) {
    if (response.status === 401) {
      throw new Error('Error de autenticación (401): La clave de la API parece ser inválida.');
    }
    throw new Error(`Error de red: ${response.status} ${response.statusText}`);
  }

  const data = await response.json();

  if (!data.list || data.list.length === 0) {
    throw new Error('La respuesta de la API no contiene datos de pronóstico.');
  }

  const dailyForecasts: DailyForecast = {};

  data.list.forEach((item: any) => {
    const date = new Date(item.dt * 1000);
    const dayKey = date.toISOString().split('T')[0];

    if (!dailyForecasts[dayKey]) {
      dailyForecasts[dayKey] = [];
    }

    const forecastEntry: ForecastEntry = {
      time: date.toISOString(),
      temperature: Math.round(item.main.temp),
      feelsLike: Math.round(item.main.feels_like),
      cloudCover: item.clouds.all,
      windSpeed: msToKnots(item.wind.speed),
      windGust: item.wind.gust ? msToKnots(item.wind.gust) : msToKnots(item.wind.speed),
      windDirection: item.wind.deg,
      precipitation: item.rain ? item.rain['3h'] || 0 : 0,
    };
    
    dailyForecasts[dayKey].push(forecastEntry);
  });

  return {
    spotName: `${data.city.name}, ${data.city.country}`,
    generatedAt: new Date().toISOString(),
    dailyForecasts,
  };
};
