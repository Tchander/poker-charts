import router from '@/router';
import registerStorePlugins from '@/stores/registerStorePlugins';
import store from '@/stores';
import type { App } from 'vue';

registerStorePlugins(store);

export async function registerPlugins(app: App) {
  app.use(router).use(store);

  await router.isReady();
}
