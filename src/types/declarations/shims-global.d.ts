import type { Env } from '../builder';

declare global {
  declare const APP_MODE: Env['APP_MODE'];
  declare const BASE_URL: Env['BASE_URL'];
  declare const VUE_APP_TITLE: Env['VUE_APP_TITLE'];
  declare const VUE_APP_LANGUAGE: Env['VUE_APP_LANGUAGE'];

  interface ObjectConstructor {
    typedKeys<T>(obj: T): Array<keyof T>;
    typedEntries<T, K = keyof T>(o: T | ArrayLike<T>): [K, T[K]][];
  }
}
