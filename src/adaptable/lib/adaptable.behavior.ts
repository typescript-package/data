/* eslint-disable @typescript-eslint/no-explicit-any */
// Type & Interface.
import { AsyncReturn } from "@typedly/data";
import { DataAdapterShape } from "@typedly/data-adapter";
/**
 * @description The `AdaptableBehavior` class provides static methods to manage adaptable behavior for data, allowing for flexible handling of data operations based on the presence of a data adapter.
 * @export
 * @class AdaptableBehavior
 */
export class AdaptableBehavior {
  static async<A extends DataAdapterShape<unknown, S> | undefined, S extends boolean>(
    adapter: A,
    fallback: S
  ): S {
    return adapter ? adapter.async : fallback;
  }

  static value<A extends DataAdapterShape<T, boolean> | undefined, T>(
    adapter: A,
    fallback: T
  ): T {
    return adapter ? adapter.value : fallback;
  }

  static clear<A extends DataAdapterShape<T, S> | undefined, T, S extends boolean, Return>(
    adapter: A,
    fallback: () => AsyncReturn<S, Return>,
    returnThis: (result: any) => AsyncReturn<S, Return>
  ): AsyncReturn<S, Return> {
    return adapter ? returnThis(adapter.clear()) : fallback();
  }

  static destroy<A extends DataAdapterShape<T, S> | undefined, T, S extends boolean, Return>(
    adapter: A,
    fallback: () => AsyncReturn<S, Return>,
    returnThis: (result: any) => AsyncReturn<S, Return>
  ): AsyncReturn<S, Return> {
    return adapter ? returnThis(adapter.destroy()) : fallback();
  }

  static getValue<A extends DataAdapterShape<T, S> | undefined, T, S extends boolean>(
    adapter: A,
    fallback: () => AsyncReturn<S, T>
  ): AsyncReturn<S, T> {
    return adapter ? adapter.getValue() : fallback();
  }

  static setValue<A extends DataAdapterShape<T, S> | undefined, T, S extends boolean, Return>(
    adapter: A,
    value: T,
    fallback: () => AsyncReturn<S, Return>,
    returnThis: (result: any) => AsyncReturn<S, Return>
  ): AsyncReturn<S, Return> {
    return adapter ? returnThis(adapter.setValue(value)) : fallback();
  }
}
