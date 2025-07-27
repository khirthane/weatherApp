import { IWeatherInfo } from '@/types';
import { beforeEach, describe, expect, it } from 'vitest';
import { useLocalLocations } from '../useLocalLocations';

const sampleLocation = {
  zip: '12345',
  location: { latitude: 50, longitude: 10 },
  weather: {
    temperature: 0,
    description: '',
    code: 0,
  },
} as unknown as IWeatherInfo;

beforeEach(() => {
  localStorage.clear();
});

describe('useLocalLocations', () => {
  it('adds a location', () => {
    const { locations, add } = useLocalLocations();
    add(sampleLocation);
    expect(locations.value).toHaveLength(1);
    expect(locations.value[0].zip).toBe('12345');
  });

  it('does not add duplicate zip', () => {
    const { locations, add } = useLocalLocations();
    add(sampleLocation);
    add(sampleLocation);
    expect(locations.value).toHaveLength(1);
  });

  it('removes a location by lat/lon', () => {
    const { locations, add, remove } = useLocalLocations();
    add(sampleLocation);
    remove({ lat: 50, lon: 10 });
    expect(locations.value).toHaveLength(0);
  });
  it('does not remove a location with different lat/lon', () => {
    const { locations, add, remove } = useLocalLocations();
    add(sampleLocation);
    remove({ lat: 51, lon: 11 });
    expect(locations.value).toHaveLength(1);
  });
  it('loads locations from localStorage', () => {
    localStorage.setItem('saved_locations', JSON.stringify([sampleLocation]));
    const { locations } = useLocalLocations();
    expect(locations.value).toHaveLength(1);
    expect(locations.value[0].zip).toBe('12345');
  });
});
