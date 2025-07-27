export interface IWeatherResponse {
  latitude: number;
  longitude: number;
  generationtime_ms: number;
  utc_offset_seconds: number;
  timezone: string;
  timezone_abbreviation: string;
  elevation: number;
  current_weather_units: ICurrentWeatherUnits;
  current_weather: ICurrentWeather;
  daily_units: IDailyUnits;
  daily: IDaily;
}

export interface I5DayForecastResponse {
  latitude: number;
  longitude: number;
  timezone: string;
  daily: IDaily;
  daily_units: IDailyUnits;
}

export interface ICurrentWeatherUnits {
  time: string;
  interval: string;
  temperature: string;
  windspeed: string;
  winddirection: string;
  is_day: string;
  weathercode: string;
}

export interface ICurrentWeather {
  time: string; // ISO8601 date-time string
  interval: number;
  temperature: number;
  windspeed: number;
  winddirection: number;
  is_day: number;
  weathercode: number;
}

export interface IDailyUnits {
  time: string;
  temperature_2m_max: string;
  temperature_2m_min: string;
}

export interface IDaily {
  time: string[]; // Array of dates (ISO8601 strings)
  temperature_2m_max: number[]; // max temps per day
  temperature_2m_min: number[]; // min temps per day
  weathercode: number[]; // weather codes for each day
}
