import type { RouteRecordRaw } from 'vue-router';
import { RouteName } from '@/router/enums';

export const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: RouteName.HOME,
    component: () => import('@/pages/HomePage.vue'),
  },
];
