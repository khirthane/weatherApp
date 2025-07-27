import { describe, expect, it } from 'vitest';
import { getWeatherDescription } from '../getWeatherDescription';

describe('getWeatherDescription', () => {
  it('returns the correct description for known codes', () => {
    expect(getWeatherDescription(1)).toBe('Mainly clear');
    expect(getWeatherDescription(2)).toBe('Partly cloudy');
    expect(getWeatherDescription(3)).toBe('Overcast');
    expect(getWeatherDescription(45)).toBe('Fog');
    expect(getWeatherDescription(48)).toBe('Depositing rime fog');
    expect(getWeatherDescription(51)).toBe('Light drizzle');
    expect(getWeatherDescription(53)).toBe('Moderate drizzle');
    expect(getWeatherDescription(55)).toBe('Dense drizzle');
    expect(getWeatherDescription(61)).toBe('Light rain');
    expect(getWeatherDescription(63)).toBe('Moderate rain');
    expect(getWeatherDescription(65)).toBe('Heavy rain');
    expect(getWeatherDescription(80)).toBe('Light showers');
    expect(getWeatherDescription(95)).toBe('Thunderstorm');
    expect(getWeatherDescription(96)).toBe('Thunderstorm with slight hail');
  });

  it('returns "Code X" for unknown codes', () => {
    expect(getWeatherDescription(999)).toBe('Code 999');
  });

  it('returns an empty string for undefined input', () => {
    expect(getWeatherDescription(undefined)).toBe('');
  });
  it('returns an empty string for null input', () => {
    expect(getWeatherDescription(null)).toBe('');
  });
});
