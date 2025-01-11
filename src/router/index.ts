import { createRouter, createWebHistory } from 'vue-router';
import { parse, stringify } from 'qs';
import { routes } from './routes';

const router = createRouter({
  history: createWebHistory(BASE_URL),
  routes,
  stringifyQuery: stringify,
  // @ts-expect-error в документации написано, что надо использовать именно так
  parseQuery: parse,
});

export default router;
export * from './enums';
