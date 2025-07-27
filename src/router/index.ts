import Home from '@/views/Home.vue';
import WeeklyForecast from '@/views/WeeklyForecast.vue';
import { createRouter, createWebHistory } from 'vue-router';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/forecast/:city',
    name: 'Forecast',
    component: WeeklyForecast,
    props: true,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
