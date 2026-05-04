// Abstract.
import { DataCore } from './data.core';
// Type.
import { AsyncReturn } from '@typedly/data';
/**
 * @description The `Data` class is a concrete implementation of the `DataCore` abstract class, providing basic synchronous data handling functionality.
 * @export
 * @class Data
 * @template T The type of the data value.
 * @template {boolean} [S=false] Indicates whether the data operations are asynchronous.
 * @extends {DataCore<T, S>}
 */
export class Data<
  T,
  S extends boolean = false,
> extends DataCore<T, S> {
  public static override toStringTag: string = 'Data';

  public get async(): S {
    return false as S;
  }

  public get value(): T {
    return this.#value;
  }

  override get [Symbol.toStringTag](): string {
    return Data.toStringTag;
  }

  /**
   * @description The current value of the data.
   * @type {T}
   */
  #value: T;

  constructor(value?: T) {
    super();
    this.#value = value as T;
  }

  clear(): AsyncReturn<S, this> {
    this.#value = undefined as T;
    return this as AsyncReturn<S, this>;
  }

  destroy(): AsyncReturn<S, this> {
    this.#value = null as T;
    return this as AsyncReturn<S, this>;
  }

  override lock(): this {
    super.lock();
    return this;
  }

  getValue(): AsyncReturn<S, T> {
    return this.#value as AsyncReturn<S, T>;
  }

  setValue(value: T): AsyncReturn<S, this> {
    this.#value = value;
    return this as AsyncReturn<S, this>;
  }
}
