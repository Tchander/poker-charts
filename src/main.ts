import '@/plugins/extendJS';
import { createApp, h } from 'vue';
import App from './App.vue';
import { registerPlugins } from '@/plugins';
import VConfigProvider from '@ui/VConfigProvider';

async function setupProject() {
  const appRender = h(
    VConfigProvider,
    undefined,
    { default: () => h(App) },
  );

  const app = createApp(appRender);

  await registerPlugins(app);

  app.mount('#root');
}

setupProject();
