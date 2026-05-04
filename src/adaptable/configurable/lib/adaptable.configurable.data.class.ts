/* eslint-disable @typescript-eslint/no-explicit-any */
import { AdaptableConfigurableDataBase } from "./adaptable.configurable.data.base";
// Type & Interface.
import { CacheableSettings, DataSettings, InferAsyncOf } from "@typedly/data";
import { ConfigurableDataAdapterConstructor, DataAdapterShape } from "@typedly/data-adapter";
/**
 * @description
 * @export
 * @class AdaptableConfigurableData
 * @template {DataAdapterShape<T, S> | undefined} [A=undefined] 
 * @template {(DataSettings<S> & CacheableSettings<T> ) | undefined} [C=undefined] 
 * @template [T=unknown] 
 * @template {boolean} [S=InferAsyncOf<[C, A]>] 
 * @template {readonly any[]} [G=[]] 
 * @extends {AdaptableConfigurableDataBase<A, C, T, S, G, ConfigurableDataAdapterConstructor<A, C, T, S, G>>}
 */
export class AdaptableConfigurableData<
  A extends DataAdapterShape<T, S> | undefined = undefined,
  C extends (DataSettings<S> & CacheableSettings<T> ) | undefined = undefined,
  T = unknown,
  S extends boolean = InferAsyncOf<[C, A]>,
  G extends readonly any[] = [],
> extends AdaptableConfigurableDataBase<A, C, T, S, G, ConfigurableDataAdapterConstructor<A, C, T, S, G>> {
  constructor(
    settings?: C,
    value?: T,
    adapter?: ConfigurableDataAdapterConstructor<A, C, T, S, G>,
    ...args: G
  ) {
    super(settings, value, adapter, ...args);
  }
}