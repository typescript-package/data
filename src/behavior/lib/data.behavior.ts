// Interface.
import { DataBehaviorShape } from "../interface/data.behavior.shape";
/**
 * @description
 * @export
 * @template T 
 * @param {?{value?: T}} [initialStore] 
 * @returns {DataBehaviorShape<T, false>} 
 */
export function DataBehavior<T>(initialStore?: {value?: T}): DataBehaviorShape<T, false> {
  return {
    async: false,
    create(store: {value?: T} = {value: initialStore?.value as T}) {
      store.value = initialStore?.value;
    },
    clear(store) {
      store.value = null as unknown as T;
      return undefined;
    },
    destroy(store) {
      store.value = null as unknown as T;
      return undefined;
    },
    getValue(store) {
      return store.value;
    },
    setValue(store, newValue) {
      store.value = newValue;
      return undefined;
    }
  };
}
