
export interface ForecastEntry {
  time: string;
  windSpeed: number;
  windGust: number;
  windDirection: number;
  waveHeight: number;
  wavePeriod: number;
  temperature: number;
  cloudCover: number;
  precipitation: number;
}

export interface DailyForecast {
  [date: string]: ForecastEntry[];
}

export interface ForecastData {
  spotName: string;
  generatedAt: string;
  dailyForecasts: DailyForecast;
}
