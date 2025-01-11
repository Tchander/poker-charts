import { defineAsyncComponent } from 'vue';
import { LayoutName } from './enums';

export const LayoutDefault = defineAsyncComponent(() => import('./LayoutDefault.vue'));

export const layoutMatcher = {
  [LayoutName.DEFAULT]: LayoutDefault,
};

export * from './enums';
