/* eslint-disable @typescript-eslint/no-explicit-any */
import { AdaptableDataBase } from "./adaptable.data.base";
// Type & Interface.
import { DataAdapterConstructor, DataAdapterShape } from "@typedly/data-adapter";
import { InferAsync } from "@typedly/data";
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
