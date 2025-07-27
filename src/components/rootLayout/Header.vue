<template>
  <header class="p-4 bg-white rounded shadow">
    <h1 class="text-lg">{{ t('header.title') }}</h1>
  </header>
</template>
<script setup>
import { useI18n } from 'vue-i18n';

const { t } = useI18n();
</script>
