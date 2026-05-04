/* eslint-disable @typescript-eslint/no-explicit-any */

import { DataAdapterShape } from "@typedly/data-adapter";

export abstract class AdaptableConfigurableDataBase<
  A extends DataAdapterShape<T, S> | undefined = undefined,
  C extends (DataSettings<S> & CacheableSettings<T> ) | undefined = undefined,
  T = unknown,
  S extends boolean = InferAsyncOf<[C, A]>,
  G extends readonly any[] = [],
  AC extends new (...args: any[]) => any = ConfigurableDataAdapterConstructor<A, C, T, S, G>
> extends ConfigurableData<C, T, S>
  implements AdaptableConfigurableDataShape<A, C, T, S> {

  override get async(): S {
    return AdaptableBehavior.async(this.#adapter, super.async);
  }
  get adapter(): A {
    return this.#adapter;
  }
  override get value(): T {
    return AdaptableBehavior.value(this.#adapter, super.value);
  }

  #adapter: A;

  constructor(
    settings?: C,
    value?: T,
    adapter?: AC,
    ...args: G
  ) {
    super(settings, value);
    this.#adapter = adapter
      ? this.instantiateAdapter(adapter, settings, value!, ...args)
      : undefined as any;
  }

  override clear(): AsyncReturn<S, this> {
    return AdaptableBehavior.clear(
      this.#adapter,
      () => super.clear(),    // falls back to CacheableData.clear (config-aware)
      r => super.returnThis(r)
    ) as AsyncReturn<S, this>;
  }

  override destroy(): AsyncReturn<S, this> {
    return AdaptableBehavior.destroy(
      this.#adapter,
      () => super.destroy(),  // falls back to CacheableData.destroy (config-aware)
      r => super.returnThis(r)
    ) as AsyncReturn<S, this>;
  }

  override getValue(): AsyncReturn<S, T> {
    return AdaptableBehavior.getValue(
      this.#adapter,
      () => super.getValue()  // falls back to CacheableData.getValue (config-aware)
    );
  }

  override setValue(value: T): AsyncReturn<S, this> {
    return AdaptableBehavior.setValue(
      this.#adapter,
      value,
      () => super.setValue(value), // falls back to CacheableData.setValue (config-aware)
      r => super.returnThis(r)
    ) as AsyncReturn<S, this>;
  }

  protected instantiateAdapter(adapter: AC, settings?: C, value?: T, ...args: G): A {
    return new adapter(settings, value!, ...args) as A;
  }
}
