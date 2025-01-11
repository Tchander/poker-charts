<template>
  <NConfigProvider
    :locale="ruRU"
    :date-locale="dateRuRU"
    :theme-overrides="lightGlobalTheme"
  >
    <NGlobalStyle />
    <NModalProvider>
      <NNotificationProvider :max="3">
        <NDialogProvider>
          <NMessageProvider :duration="5000">
            <NLoadingBarProvider>
              <NThemeEditor v-if="isDevelopment">
                <slot />
              </NThemeEditor>
              <slot v-else />
            </NLoadingBarProvider>
          </NMessageProvider>
        </NDialogProvider>
      </NNotificationProvider>
    </NModalProvider>
  </NConfigProvider>
</template>

<script lang="ts" setup>
import {
  dateRuRU,
  NConfigProvider,
  NGlobalStyle,
  NLoadingBarProvider,
  NMessageProvider,
  NDialogProvider,
  NNotificationProvider,
  NModalProvider,
} from 'naive-ui';
import { defineAsyncComponent } from 'vue';
import { ruRU } from './locale';
import { lightGlobalTheme } from '@/themes';

const NThemeEditor = defineAsyncComponent(() => import('naive-ui/es/theme-editor/src/ThemeEditor'));

const isDevelopment = APP_MODE === 'development';
</script>
