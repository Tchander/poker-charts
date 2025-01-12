<template>
  <div>
    <NInput
      v-model:value="title"
      type="text"
    />
    <NButton
      :disabled="!title"
      @click="addLabel"
    >
      Add data
    </NButton>
    <NButton @click="getAll">
      Get all
    </NButton>
  </div>
</template>

<script lang="ts" setup>
import { NButton, NInput } from 'naive-ui';
import { ref } from 'vue';
import { cloneDeep } from 'lodash-es';
import { chartDefault } from '@/utils/pokerChart';
import type { ChartCategory } from '@/types/pokerChart';

const title = ref<string>('');
const dbName = 'pokerCharts';
const storeName = 'charts';

function openPokerChartsLabelsDb() {
  const request = indexedDB.open(dbName, 1);

  request.onupgradeneeded = (event) => {
    const db = (event.target as IDBOpenDBRequest).result;

    if (!db.objectStoreNames.contains(storeName)) {
      db.createObjectStore(storeName, { keyPath: 'id', autoIncrement: true });
    }
  };

  request.onsuccess = () => {
    console.log('База данных успешно открыта');
  };

  request.onerror = () => {
    console.error('Ошибка при открытии базы данных');
  };
}

function addLabel() {
  const request = indexedDB.open(dbName, 1);

  request.onsuccess = () => {
    const db = request.result;

    const transaction = db.transaction([storeName], 'readwrite');
    const chartsStore = transaction.objectStore(storeName);

    const newCategory: ChartCategory = {
      chart: cloneDeep(chartDefault),
      title: title.value,
    };

    chartsStore.add(newCategory);

    transaction.oncomplete = () => {
      console.log('Чарт добавлен');
    };

    transaction.onerror = () => {
      console.error('Ошибка при добавлении чарта');
    };
  };
}

function getAll() {
  const request = indexedDB.open(dbName, 1);

  request.onsuccess = () => {
    const db = request.result;

    const transaction = db.transaction([storeName], 'readonly');
    const chartsStore = transaction.objectStore(storeName);

    const getAllRequest: IDBRequest<ChartCategory[]> = chartsStore.getAll();

    getAllRequest.onsuccess = () => {
      console.log('Все чарты:', getAllRequest.result);
    };

    getAllRequest.onerror = () => {
      console.error('Ошибка при получении чартов');
    };
  };
}

openPokerChartsLabelsDb();
</script>
