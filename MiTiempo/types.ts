export interface ForecastEntry {
  time: string;
  windSpeed: number;
  windGust: number;
  windDirection: number;
  temperature: number;
  feelsLike: number;
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