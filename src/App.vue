<template>
  <div class="app">
    <Component
      :is="layoutDynamicComponent"
      v-show="!isEmptyRoute"
    />
  </div>
</template>

<script lang="ts" setup>
import { computed } from 'vue';
import { useRoute } from 'vue-router';
import { layoutMatcher, LayoutName } from '@/layouts';

const route = useRoute();

const isEmptyRoute = computed(() => !route.name);

const firstRouteWithLayout = computed(() => route.matched.find((value) => value.meta.layout));

const layoutDynamicComponent = computed(() => {
  const layoutName = firstRouteWithLayout.value?.meta.layout ?? LayoutName.DEFAULT;

  return layoutMatcher[layoutName];
});
</script>

<style lang="scss">
@import '@/assets/scss/base';
</style>
