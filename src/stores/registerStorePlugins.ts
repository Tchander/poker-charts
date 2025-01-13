import { markRaw } from 'vue';
import router from '@/router';
import type { Pinia, PiniaPluginContext } from 'pinia';

const routerPlugin = ({ store }: PiniaPluginContext) => {
  store.$router = markRaw(router);
};

const registerStorePlugins = (store: Pinia) => {
  store.use(routerPlugin);
};

export default registerStorePlugins;
