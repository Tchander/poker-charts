import { cloneDeep } from 'lodash-es';
import { defineStore } from 'pinia';
import { StoreId } from '../enums';
import { chartDefault } from '@/utils/pokerChart';
import type { ChartCategory } from './types';

export const useChartsStore = defineStore(StoreId.CHARTS, () => {
  const dbName = 'pokerCharts';
  const storeName = 'charts';
  const dbVersion = 1;

  async function addChart(title: string) {
    try {
      const db = await openChartsDatabase();
      const transaction = db.transaction([storeName], 'readwrite');
      const chartsStore = transaction.objectStore(storeName);

      const newCategory: ChartCategory = {
        chart: cloneDeep(chartDefault),
        title,
      };

      return await requestToPromise(chartsStore.add(newCategory));
    } catch (error) {
      console.error('Ошибка добавления чарта:', error);
    }
  }

  async function getChart(id: number): Promise<ChartCategory | null> {
    try {
      const db = await openChartsDatabase();
      const transaction = db.transaction([storeName], 'readonly');
      const chartsStore = transaction.objectStore(storeName);

      return await requestToPromise(chartsStore.get(id));
    } catch (error) {
      console.error('Ошибка получения чарта:', error);
      return null;
    }
  }

  async function getAllCharts(): Promise<ChartCategory[] | null> {
    try {
      const db = await openChartsDatabase();
      const transaction = db.transaction([storeName], 'readwrite');
      const chartsStore = transaction.objectStore(storeName);

      return await requestToPromise(chartsStore.getAll());
    } catch (error) {
      console.error('Ошибка получения чартов:', error);
      return null;
    }
  }

  async function updateChart(id: number, updatedData: Partial<ChartCategory>): Promise<ChartCategory | null> {
    try {
      const db = await openChartsDatabase();
      const transaction = db.transaction([storeName], 'readwrite');
      const chartsStore = transaction.objectStore(storeName);

      const chart: ChartCategory | undefined = await requestToPromise(chartsStore.get(id));

      if (!chart) {
        console.warn(`Чарт с ID ${id} не найден`);
        return null;
      }

      const updatedChart = { ...chart, ...updatedData };
      await requestToPromise(chartsStore.put(updatedChart));

      console.log(`Чарт с ID ${id} обновлен`);
      return updatedChart;
    } catch (error) {
      console.error('Ошибка обновления чарта:', error);
      return null;
    }
  }

  async function deleteChart(id: number) {
    try {
      const db = await openChartsDatabase();
      const transaction = db.transaction([storeName], 'readwrite');
      const chartsStore = transaction.objectStore(storeName);

      await requestToPromise(chartsStore.delete(id));

      console.log(`Чарт с id ${id} удалён`);
    } catch (error) {
      console.error('Ошибка при удалении чарта');
    }
  }

  async function openChartsDatabase(): Promise<IDBDatabase> {
    return new Promise((resolve, reject) => {
      const request = indexedDB.open(dbName, dbVersion);

      request.onsuccess = () => resolve(request.result);

      // eslint-disable-next-line prefer-promise-reject-errors
      request.onerror = () => reject('Ошибка открытия базы данных');

      request.onupgradeneeded = () => {
        const db = request.result;

        if (!db.objectStoreNames.contains(storeName)) {
          db.createObjectStore(storeName, { keyPath: 'id', autoIncrement: true });
        }
      };
    });
  }

  function requestToPromise<T>(request: IDBRequest<T>): Promise<T> {
    return new Promise((resolve, reject) => {
      request.onsuccess = () => resolve(request.result);
      // eslint-disable-next-line prefer-promise-reject-errors
      request.onerror = () => reject('Ошибка запроса');
    });
  }

  return {
    openChartsDatabase,
    addChart,
    getChart,
    getAllCharts,
    updateChart,
    deleteChart,
  };
});

export * from './types';
