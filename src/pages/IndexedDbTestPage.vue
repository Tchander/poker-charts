<template>
  <div>
    <NInput
      v-model:value="label"
      type="text"
    />
    <NButton
      :disabled="!label"
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

const label = ref<string | null>(null);
const dbName = 'pokerChartLabels';

function openPokerChartsLabelsDb() {
  const request = indexedDB.open(dbName, 1);

  request.onupgradeneeded = (event) => {
    const db = (event.target as IDBOpenDBRequest).result;

    if (!db.objectStoreNames.contains('labels')) {
      db.createObjectStore('labels', { keyPath: 'id', autoIncrement: true });
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

    const transaction = db.transaction(['labels'], 'readwrite');
    const labelsStore = transaction.objectStore('labels');

    labelsStore.add({ label: label.value });

    transaction.oncomplete = () => {
      console.log('Лейбел добавлен');
    };

    transaction.onerror = () => {
      console.error('Ошибка при добавлении лейбла');
    };
  };
}

function getAll() {
  const request = indexedDB.open(dbName, 1);

  request.onsuccess = () => {
    const db = request.result;

    const transaction = db.transaction(['labels'], 'readonly');
    const labelsStore = transaction.objectStore('labels');

    const getAllRequest = labelsStore.getAll();

    getAllRequest.onsuccess = () => {
      console.log('Все лейблы:', getAllRequest.result);
    };

    getAllRequest.onerror = () => {
      console.error('Ошибка при получении лейблов');
    };
  };
}

openPokerChartsLabelsDb();
</script>
