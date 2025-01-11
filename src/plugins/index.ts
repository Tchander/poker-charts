import router from '@/router';
import type { App } from 'vue';


export async function registerPlugins(app: App) {
  app.use(router)

  await router.isReady();
}
