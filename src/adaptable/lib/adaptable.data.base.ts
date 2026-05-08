/* eslint-disable @typescript-eslint/no-explicit-any */
// Abstract.
import { AdaptableBehavior } from "./adaptable.behavior";
import { AdaptableDataCore } from "./adaptable.data.core";
// Type & Interface.
import { AsyncReturn, InferAsync } from "@typedly/data";
import { DataAdapterConstructor, DataAdapterShape } from "@typedly/data-adapter";
/**
 * @description The base abstraction `AdaptableData` class extends `AdaptableDataCore` adding functionality for managing data with adaptable behavior.
 * @export
 * @abstract
 * @class AdaptableData
 * @template {DataAdapterShape<T, S> | undefined} [A=undefined] 
 * @template [T=unknown] 
 * @template {boolean} [S=InferAsync<A>] 
 * @template {readonly any[]} [G=[]] 
 * @template {new (...args: any[]) => A} [AC=DataAdapterConstructor<A, T, S, G>] 
 * @extends {AdaptableDataCore<A, T, S, G, AC>}
 */
export abstract class AdaptableDataBase<
  A extends DataAdapterShape<T, S> | undefined = undefined,
  T = unknown,
  S extends boolean = InferAsync<A>,
  G extends readonly any[] = [],
  AC extends new (...args: any[]) => A = DataAdapterConstructor<A, T, S, G>
> extends AdaptableDataCore<A, T, S, G, AC> {
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
  constructor(value?: T, adapterCtor?: AC, ...args: G)
  constructor(value?: T, ...args: G)
  constructor(value?: T, ...adapterOrArgs: any[]) {
    super();
    const adapter = this.resolveAdapter(adapterOrArgs[0]);
    this.#adapter = this.isAdapter(adapter)
      ? this.instantiateAdapter(adapter, value, ...this.resolveArgs(adapterOrArgs))
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

  protected resolveAdapter(adapterOrFirstArg: any,): AC | undefined {
    return this.isAdapter(adapterOrFirstArg) ? adapterOrFirstArg as AC : (this.constructor as typeof AdaptableDataBase).adapter as AC ?? undefined;
  }
  protected resolveArgs(adapterOrArgs: any[]): G {
    return (this.isAdapter(adapterOrArgs[0]) ? adapterOrArgs.slice(1) : adapterOrArgs) as unknown as G;
  }
  protected isAdapter(adapter: any): adapter is AC {
    return (
      typeof adapter === 'function' &&
        ('_adapter' in adapter ||
        adapter.prototype?._adapter !== undefined)
    );
  }
  protected instantiateAdapter(adapter: AC, value?: T, ...args: G): A {
    return new adapter(value!, ...args) as A;
  }
}
