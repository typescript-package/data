// Type.
import { AsyncReturn } from "@typedly/data";
/**
 * @description 
 * @export
 * @interface DataBehaviorShape
 * @template T 
 * @template {boolean} [S=false] 
 */
export interface DataBehaviorShape<T, S extends boolean = false> {
  async: S;
  create(store: {value: T}): void;
  clear(store: {value: T}): AsyncReturn<S, void>;
  destroy(store: {value: T}): AsyncReturn<S, void>;
  getValue(store: {value: T}): AsyncReturn<S, T>;
  setValue(store: {value: T}, newValue: T): AsyncReturn<S, void>;
}