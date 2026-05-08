/* eslint-disable @typescript-eslint/no-explicit-any */
import { AdaptableDataBase } from "./adaptable.data.base";
// Type & Interface.
import { DataAdapterConstructor, DataAdapterShape } from "@typedly/data-adapter";
import { InferAsync } from "@typedly/data";
/**
 * @description The concrete implementation of the `AdaptableData` class, providing a flexible data management solution that can adapt its behavior based on the presence of a data adapter.
 * @export
 * @class AdaptableData
 * @template {DataAdapterShape<T, S> | undefined} [A=undefined] 
 * @template [T=unknown] The type of the data value.
 * @template {boolean} [S=InferAsync<A>] Whether the data is asynchronous.
 * @template {readonly any[]} [G=[]] Additional arguments for the adapter.
 * @extends {AdaptableDataBase<A, T, S, G, DataAdapterConstructor<A, T, S, G>>}
 */
export class AdaptableData<
  A extends DataAdapterShape<T, S> | undefined = undefined,
  T = unknown,
  S extends boolean = InferAsync<A>,
  G extends readonly any[] = []
> extends AdaptableDataBase<A, T, S, G, DataAdapterConstructor<A, T, S, G>> {
  /**
   * Creates an instance of `AdaptableData`.
   * @constructor
   * @param {?T} [value] The initial value of the data.
   * @param {?DataAdapterConstructor<A, T, S, G>} [adapter] The adapter constructor to use for this data instance.
   * @param {...G} args The additional arguments for the adapter.
   */
  constructor(value?: T, adapter?: DataAdapterConstructor<A, T, S, G>, ...args: G)

  /**
   * Creates an instance of `AdaptableData`.
   * @constructor
   * @param {?T} [value] The initial value of the data.
   * @param {...G} args The additional arguments for the adapter, if the first argument is not an adapter constructor.
   */
  constructor(value?: T, ...args: G)

  /**
   * Creates an instance of `AdaptableData`.
   * @constructor
   * @param {?T} [value] The initial value of the data.
   * @param {?*} [adapterOrArg] The adapter constructor or the first additional argument.
   * @param {...G} args The additional arguments for the adapter.
   */
  constructor(value?: T, adapterOrArg?: any, ...args: G) {
    super(value, adapterOrArg, ...args);
  }
}
