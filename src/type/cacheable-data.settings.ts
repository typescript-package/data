// Interface.
import type { CacheableSettings } from "../interface";
import type { DataSettings } from "@typedly/data";
/**
 * @description
 * @export
 * @template T 
 * @template {boolean} [R=false] 
 */
export type CacheableDataSettings<T, R extends boolean = false> =
  DataSettings<R> & (R extends true
    ? CacheableSettings<T> & Required<Pick<CacheableSettings<T>, 'fetcher' | 'updater'>>
    : CacheableSettings<T>);