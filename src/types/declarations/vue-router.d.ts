import 'vue-router';
import type { LayoutName } from '@/layouts';
import type { RouteName } from '@/router';

export {};

declare module 'vue-router' {
  interface RouteMeta {
    layout?: LayoutName;
  }
}
