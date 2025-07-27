<template>
  <div class="weather-dashboard">
    <div class="flex items-center justify-between mb-4">
      <h1 class="text-xl font-semibold">
        {{ city }} - {{ t('weeklyForcast.weeklyForecastTitle') }}
      </h1>
      <RouterLink
        to="/"
        class="text-purple-600 hover:underline text-sm font-medium"
      >
        ← {{ t('weeklyForcast.backToMainPage') }}
      </RouterLink>
    </div>
    <div class="forcast-card">
      <div v-if="loading" class="flex items-center justify-center min-h-32">
        <img src="../assets/images/icons/spinner.svg" width="60" />
      </div>
      <div
        v-else-if="error"
        class="flex items-center justify-center min-h-32 text-center text-red-700"
      >
        {{ error }}
      </div>

      <div class="grid grid-cols-7 md:grid-cols-7">
        <div v-for="(date, i) in forecast?.daily.time" :key="date" class="p-2">
          <div class="text-sm md:text-base font-medium text-center">
            {{ getFormatDate(date) }}
          </div>
          <div
            class="text-3xl md:text-6xl text-center p-4 py-8 border-gray-800"
          >
            {{ getWeatherIcon(forecast.daily.weathercode[i]) }}
          </div>
          <div class="flex text-sm gap-2 justify-center w-full">
            <div class="flex text-gray-800">
              <img
                src="../assets/images/icons/max-temp.svg"
                width="15"
                class="hidden md:block"
              />
              {{ Math.round(forecast.daily.temperature_2m_max[i])
              }}{{ Units.CELCIUS }}
            </div>
            <div class="flex text-gray-400">
              <img
                src="../assets/images/icons/min-temp.svg"
                width="15"
                class="hidden md:block"
              />
              {{ Math.round(forecast.daily.temperature_2m_min[i])
              }}{{ Units.CELCIUS }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Units } from '@/constants/units';
import { getWeeklyForecast } from '@/services';
import { I5DayForecastResponse } from '@/types';
import { getFormatDate, getWeatherIcon } from '@/utils/helpers';
import { onMounted, ref } from 'vue';
import { useI18n } from 'vue-i18n';
import { useRoute } from 'vue-router';

const { t } = useI18n();
const route = useRoute();
const city = route.params.city as string;

const forecast = ref<I5DayForecastResponse | null>(null);
const loading = ref(true);
const error = ref('');

onMounted(async () => {
  try {
    const lat = Number(route.query.lat);
    const lon = Number(route.query.lon);

    if (!lat || !lon) {
      error.value = 'Missing latitude or longitude';
      return;
    }

    forecast.value = await getWeeklyForecast(lat, lon);
  } catch (err) {
    error.value = 'Failed to load forecast.';
    console.error(err);
  } finally {
    loading.value = false;
  }
});
</script>
