<template>
  <section class="weather-dashboard">
    <SearchZipCode @add="addLocation" />
    <LocationList :locations="locations" @remove="removeLocation" />
  </section>
</template>

<script setup lang="ts">
import LocationList from '@/components/weather/LocationList.vue';
import SearchZipCode from '@/components/weather/SearchZipCode.vue';
import { useLocalLocations } from '@/composables/useLocalLocations';
import { IWeatherInfo } from '@/types/weatherInfo';

const { locations, add, remove } = useLocalLocations();

function addLocation(weatherInfo: IWeatherInfo) {
  add(weatherInfo);
}
function removeLocation(location: { lat: number; lon: number }) {
  remove(location);
}
</script>
