import '@/plugins/extendJS';
import { createApp, h } from 'vue';
import App from './App.vue';
import VConfigProvider from '@ui/VConfigProvider';

async function setupProject() {
  const appRender = h(
    VConfigProvider,
    undefined,
    { default: () => h(App) },
  );

  const app = createApp(appRender);

  app.mount('#root');
}

setupProject();
