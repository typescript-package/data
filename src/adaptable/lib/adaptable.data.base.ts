/* eslint-disable @typescript-eslint/no-explicit-any */
// Type & Interface.
import { AsyncReturn, InferAsync } from "@typedly/data";
import { DataAdapterConstructor, DataAdapterShape } from "@typedly/data-adapter";
// Abstract.
import { AdaptableBehavior } from "./adaptable.behavior";
import { AdaptableDataCore } from "./adaptable.data.core";
/**
 * @description
 * @export
 * @abstract
 * @class AdaptableData
 * @typedef {AdaptableData}
 * @template {DataAdapterShape<T, S> | undefined} [A=undefined] 
 * @template [T=unknown] 
 * @template {boolean} [S=InferAsync<A>] 
 * @template {readonly any[]} [G=[]] 
 * @template {new (...args: any[]) => any} [AC=DataAdapterConstructor<A, T, S, G>] 
 * @extends {AdaptableDataCore<A, T, S>}
 */
export abstract class AdaptableDataBase<
  A extends DataAdapterShape<T, S> | undefined = undefined,
  T = unknown,
  S extends boolean = InferAsync<A>,
  G extends readonly any[] = [],
  AC extends new (...args: any[]) => any = DataAdapterConstructor<A, T, S, G>
> extends AdaptableDataCore<A, T, S> {
  static override toStringTag: string = 'AdaptableData';
  override get [Symbol.toStringTag](): string {
    return AdaptableDataBase.toStringTag;
  }
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
    value?: T,
    adapter?: AC,
    ...args: G
  ) {
    super();
    this.#adapter = adapter
      ? this.instantiateAdapter(adapter, value, ...args)
      : undefined as any;
  }

  override clear(): AsyncReturn<S, this> {
    return AdaptableBehavior.clear(this.#adapter, () => super.clear(), result => super.returnThis(result));
  }

  override destroy(): AsyncReturn<S, this> {
    return AdaptableBehavior.destroy(this.#adapter, () => super.destroy(), result => super.returnThis(result));
  }

  override getValue(): AsyncReturn<S, T> {
    return AdaptableBehavior.getValue(this.#adapter, () => super.getValue());
  }

  override setValue(value: T): AsyncReturn<S, this> {
    return AdaptableBehavior.setValue(this.#adapter, value, () => super.setValue(value), result => super.returnThis(result));
  }

  protected instantiateAdapter(adapter: AC, value?: T, ...args: G): A {
    return new adapter(value!, ...args) as A;
  }
}
