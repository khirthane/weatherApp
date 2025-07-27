<template>
  <form @submit.prevent="handleSubmit" class="w-full">
    <div class="zip-search">
      <div class="grid place-items-center h-full w-12 text-grey pl-2">
        <img src="../../assets/images/icons/search.svg" width="20" />
      </div>
      <input
        v-model="zip"
        type="text"
        id="zip"
        class="h-full outline-none text-md pr-2 flex-grow"
        :placeholder="t('zipSearch.placeholder')"
        maxlength="10"
        required
      />
      <button type="submit" class="search-button">
        {{ t('zipSearch.addLocation') }}
      </button>
    </div>
  </form>
  <p v-if="error" class="mt-1 text-red-600">{{ error }}</p>
</template>

<script setup lang="ts">
import { SAVED_LOCATIONS } from '@/composables/useLocalLocations';
import { getWeatherByZip } from '@/services';
import { IWeatherInfo } from '@/types/';
import { ref, watch } from 'vue';
import { useI18n } from 'vue-i18n';

const { t } = useI18n();
const zip = ref('');
const error = ref('');
const emit = defineEmits<{
  (e: 'add', weather: IWeatherInfo): void;
}>();

watch(zip, () => {
  error.value = ''; // Reset error when zip changes
});

async function handleSubmit() {
  error.value = '';
  const savedLocations = JSON.parse(localStorage.getItem(SAVED_LOCATIONS));
  if (
    savedLocations &&
    savedLocations.some((loc: IWeatherInfo) => loc.zip === zip.value)
  ) {
    error.value = t('zipSearch.duplicateError');
    return;
  }

  const result = await getWeatherByZip(zip.value);

  if (result) {
    emit('add', { ...result, zip: zip.value });
    zip.value = '';
  } else {
    error.value = t('zipSearch.error');
  }
}
</script>
