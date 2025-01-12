import { RouteName } from '@/router/enums';
import type { RouteRecordRaw } from 'vue-router';

export const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: RouteName.HOME,
    component: () => import('@/pages/HomePage.vue'),
  },
  {
    path: '/test-page',
    name: RouteName.TEST_PAGE,
    component: () => import('@/pages/TestPage.vue'),
  },
];
