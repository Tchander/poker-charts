<template>
  <div>
    <NInput
      v-model:value="title"
      type="text"
    />
    <NButton
      :disabled="!title"
      @click="addChart()"
    >
      Add data
    </NButton>
    <NButton @click="getChart()">
      Get chart
    </NButton>
    <NButton @click="getAllCharts()">
      Get all
    </NButton>
    <NButton @click="updateChart()">
      Update chart
    </NButton>
    <NButton @click="deleteChart()">
      Delete chart
    </NButton>
  </div>
</template>

<script lang="ts" setup>
import { NButton, NInput } from 'naive-ui';
import { ref } from 'vue';
import { useChartsStore } from '@/stores/charts';

const chartsStore = useChartsStore();

const title = ref<string>('');

async function addChart() {
  await chartsStore.addChart(title.value);
}

async function getChart() {
  const chart = await chartsStore.getChart(1);
  console.log(chart);
}

async function getAllCharts() {
  const charts = await chartsStore.getAllCharts();
  console.log(charts);
}

async function updateChart() {
  const updatedChart = await chartsStore.updateChart(1, { title: title.value });
  if (updatedChart) {
    console.log(`Чарт обновлён: ${JSON.stringify(updatedChart)}`);
  }
}

async function deleteChart() {
  await chartsStore.deleteChart(1);
}

chartsStore.openChartsDatabase();
</script>
