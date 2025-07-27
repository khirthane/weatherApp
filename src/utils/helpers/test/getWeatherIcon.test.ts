import { describe, expect, it } from 'vitest';
import { getWeatherIcon } from '../getWeatherIcon';

describe('getWeatherIcon', () => {
  it('returns the correct icon for known codes', () => {
    expect(getWeatherIcon(0)).toBe('☀️'); // Clear sky
    expect(getWeatherIcon(1)).toBe('🌤️'); // Mainly clear
    expect(getWeatherIcon(2)).toBe('⛅'); // Partly cloudy
    expect(getWeatherIcon(3)).toBe('☁️'); // Overcast
    expect(getWeatherIcon(45)).toBe('🌫️'); // Fog
    expect(getWeatherIcon(48)).toBe('🌁'); // Depositing rime fog
    expect(getWeatherIcon(51)).toBe('🌦️'); // Light drizzle
    expect(getWeatherIcon(53)).toBe('🌧️'); // Moderate drizzle
    expect(getWeatherIcon(55)).toBe('🌧️'); // Dense drizzle
    expect(getWeatherIcon(61)).toBe('🌧️'); // Light rain
    expect(getWeatherIcon(63)).toBe('🌧️'); // Moderate rain
    expect(getWeatherIcon(65)).toBe('🌧️'); // Heavy rain
    expect(getWeatherIcon(80)).toBe('🌦️'); // Light showers
    expect(getWeatherIcon(95)).toBe('⛈️'); // Thunderstorm
    expect(getWeatherIcon(96)).toBe('🌩️'); // Thunderstorm with slight hail
  });

  it('returns "❓ Code X" for unknown codes', () => {
    expect(getWeatherIcon(999)).toBe('❓ Code 999');
  });

  it('returns an empty string for undefined input', () => {
    expect(getWeatherIcon(undefined)).toBe('');
  });
});
