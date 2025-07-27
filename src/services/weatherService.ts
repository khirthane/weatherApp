import { METEO_FORCAST_URL, METEO_ZIP_URL } from '@/constants/api';
import { I5DayForecastResponse, IWeatherInfo, IWeatherResponse } from '@/types';
import {
  IGeocodingResponse,
  IGeocodingResult,
} from '@/types/geoCodingResponse';

/**
 * Gets the coordinates of the location.
 */
export async function getCoordinatesByZip(
  zip: string
): Promise<IGeocodingResult | null> {
  try {
    const res = await fetch(
      `${METEO_ZIP_URL}search?name=${zip}&count=1&language=en`
    );
    if (!res.ok) throw new Error('Failed to fetch geolocation');
    const data: IGeocodingResponse = await res.json();

    const loc = data.results?.[0];
    if (!loc) return null;

    return loc;
  } catch (err) {
    console.error('getCoordinatesByZip error:', err);
    return null;
  }
}

/**
 * Gets the current weather and daily temperature data for a location.
 */
export const getWeatherByCoords = async (
  lat: number,
  lon: number
): Promise<IWeatherResponse | null> => {
  try {
    const url = new URL(METEO_FORCAST_URL);
    url.search = new URLSearchParams({
      latitude: lat.toString(),
      longitude: lon.toString(),
      daily: 'temperature_2m_max,temperature_2m_min',
      timezone: 'auto',
      current_weather: 'true',
    }).toString();

    const res = await fetch(url.toString());

    if (!res.ok) throw new Error('Failed to fetch weather');

    const data: IWeatherResponse = await res.json();
    return data;
  } catch (err) {
    console.error('getWeatherByCoords error:', err);
    return null;
  }
};

/**
 * Gets a weekly forecast (min/max temperature and weather code).
 */
export const getWeeklyForecast = async (
  lat: number,
  lon: number
): Promise<I5DayForecastResponse | null> => {
  try {
    const today = new Date();
    const start = today.toISOString().split('T')[0];

    const future = new Date(today);
    future.setDate(today.getDate() + 6); // 6 days ahead
    const end = future.toISOString().split('T')[0];

    const url = new URL(METEO_FORCAST_URL);
    url.search = new URLSearchParams({
      latitude: lat.toString(),
      longitude: lon.toString(),
      daily: 'temperature_2m_max,temperature_2m_min,weathercode',
      timezone: 'auto',
      start_date: start,
      end_date: end,
    }).toString();

    const res = await fetch(url);
    if (!res.ok) {
      throw new Error(`Forecast fetch failed: ${res.status} ${res.statusText}`);
    }

    const data: I5DayForecastResponse = await res.json();
    return data;
  } catch (err) {
    console.error('getWeeklyForecast error:', err);
    return null;
  }
};

export async function getWeatherByZip(
  zip: string
): Promise<IWeatherInfo | null> {
  const location = await getCoordinatesByZip(zip);
  if (!location) return null;

  const weather = await getWeatherByCoords(
    location.latitude,
    location.longitude
  );
  if (!weather) return null;

  return {
    location,
    weather,
  };
}
