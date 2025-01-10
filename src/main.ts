import '@/plugins/extendJS';
import { createApp } from 'vue';
import App from './App.vue';

async function setupProject() {
  const app = createApp(App);

  app.mount('#root');
}

setupProject();
