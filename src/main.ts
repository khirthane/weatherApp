import { createApp } from 'vue';
import App from './App.vue';
import './assets/main.css';
import router from './router';
import { i18n } from './utils/i18n/i18n';

createApp(App).use(router).use(i18n).mount('#app');
