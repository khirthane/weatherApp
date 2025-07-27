import { IWeatherInfo } from '@/types/weatherInfo';
import { ref, watch } from 'vue';

export const SAVED_LOCATIONS = 'saved_locations';

const locations = ref<IWeatherInfo[]>([]);

// Load from localStorage on startup
const saved = localStorage.getItem(SAVED_LOCATIONS);
if (saved) {
  try {
    locations.value = JSON.parse(saved);
  } catch (err) {
    console.error('Failed to parse localStorage:', err);
  }
}

// Auto-save to localStorage on changes
watch(
  locations,
  (newVal) => {
    localStorage.setItem(SAVED_LOCATIONS, JSON.stringify(newVal));
  },
  { deep: true }
);

export function useLocalLocations() {
  function add(location: IWeatherInfo) {
    const exists = locations.value.some((loc) => loc.zip === location.zip);
    if (!exists) locations.value.push(location);
  }

  function remove(location: { lat: number; lon: number }) {
    locations.value.forEach((loc, index) => {
      if (
        loc.location.latitude === location.lat &&
        loc.location.longitude === location.lon
      ) {
        locations.value.splice(index, 1);
      }
    });
  }

  return {
    locations,
    add,
    remove,
  };
}
