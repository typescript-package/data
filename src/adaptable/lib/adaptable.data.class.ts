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
 * @template [T=unknown] 
 * @template {boolean} [S=InferAsync<A>] 
 * @template {readonly any[]} [G=[]] 
 * @extends {AdaptableDataBase<A, T, S, G>}
 */
export class AdaptableData<
  A extends DataAdapterShape<T, S> | undefined = undefined,
  T = unknown,
  S extends boolean = InferAsync<A>,
  G extends readonly any[] = []
> extends AdaptableDataBase<A, T, S, G> {
  constructor(
    value?: T,
    adapter?: DataAdapterConstructor<A, T, S, G>,
    ...args: G
  ) {
    super(value, adapter, ...args);
  }
}
