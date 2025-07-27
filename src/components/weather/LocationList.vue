<template>
  <div
    class="grid sm:grid-cols-2 md:grid-cols-2 gap-6 mt-6"
    v-if="locations.length"
  >
    <LocationCard
      v-for="loc in locations"
      :key="`${loc.location.latitude}-${loc.location.longitude}`"
      :data="loc"
      @remove="$emit('remove', $event)"
    />
  </div>
</template>

<script setup lang="ts">
import { IWeatherInfo } from '@/types';
import { defineEmits, defineProps } from 'vue';
import LocationCard from './LocationCard.vue';

const { locations } = defineProps<{ locations: IWeatherInfo[] }>();

const emit = defineEmits(['remove']);
</script>
