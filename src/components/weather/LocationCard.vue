<template>
  <div class="card">
    <button
      class="remove-button absolute top-2 right-2"
      @click="
        $emit('remove', {
          lat: location.latitude,
          lon: location.longitude,
        })
      "
    >
      <img :src="Icons.removeIcon" width="30" />
    </button>
    <div class="flex justify-between items-stretch h-full">
      <!-- Left column -->
      <div class="flex flex-col justify-between">
        <div>
          <h2 class="text-2xl font-semibold">
            {{ location.name }}, {{ location.country }}
          </h2>
          <div class="flex gap-4 mt-1">
            <p class="text-sm text-gray-500 flex">
              <img :src="Icons.windIcon" width="15" />
              <span class="ml-1"
                >{{ weather?.current_weather?.windspeed }} {{ Units.KM }}</span
              >
            </p>

            <p class="text-sm text-gray-500 flex">
              <img :src="Icons.maxTempIcon" width="15" />
              <span
                >{{ Math.round(weather?.daily?.temperature_2m_max[0])
                }}{{ Units.CELCIUS }}</span
              >
            </p>
            <p class="text-sm text-gray-500 flex">
              <img :src="Icons.minTempIcon" width="15" />
              <span
                >{{ Math.round(weather?.daily.temperature_2m_min[0])
                }}{{ Units.CELCIUS }}</span
              >
            </p>
          </div>
        </div>
        <div class="text-sm text-gray-500">
          {{ location.postcodes?.[0] }}
        </div>
        <div class="mt-auto">
          <p class="text-5xl text-purple-900/50 font-light">
            {{ Math.round(weather?.current_weather?.temperature)
            }}{{ Units.CELCIUS }}
          </p>
          <p class="text-sm text-gray-500">
            {{ getWeatherDescription(weather?.current_weather?.weathercode) }}
          </p>
        </div>
      </div>

      <!-- Right: Weather icon and remove button  -->
      <div class="flex flex-col items-center justify-center w-32 h-full gap-2">
        <span class="text-8xl align-middle flex-grow">
          {{ getWeatherIcon(weather?.current_weather?.weathercode) }}
        </span>
        <span class="text-sm">
          <RouterLink
            :to="{
              path: `/forecast/${location.name}`,
              query: {
                lat: location.latitude,
                lon: location.longitude,
              },
            }"
            class="link mt-auto text-right"
          >
            {{ t('locationCard.weeklyForecast') }}
          </RouterLink>
        </span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Icons } from '@/assets/images/icons';
import { Units } from '@/constants/units';
import { IWeatherInfo } from '@/types';
import { getWeatherDescription, getWeatherIcon } from '@/utils/helpers';
import { defineProps } from 'vue';
import { useI18n } from 'vue-i18n';

const { t } = useI18n();
const props = defineProps<{
  data: IWeatherInfo;
}>();

const location = props.data?.location;
const weather = props.data?.weather;
const zip = props.data?.zip;
</script>
