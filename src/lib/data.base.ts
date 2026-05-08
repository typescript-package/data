// Abstract.
import { DataCore } from "./data.core";
// Type.
import { AsyncReturn } from "@typedly/data";
/**
 * @description
 * @export
 * @class DataBase
 * @template T 
 * @template {boolean} [S=false] 
 * @extends {DataCore<T, S>}
 */
export class DataBase<T, S extends boolean = false> extends DataCore<T, S> {
  public static override toStringTag: string = 'Data';
  public get async(): S {
    return false as S;
  }
  public get value(): T {
    return this.#value;
  }
  override get [Symbol.toStringTag](): string {
    return DataBase.toStringTag;
  }

  /**
   * @description The current value of the data.
   * @type {T}
   */
  #value: T;

  /**
   * Creates an instance of `DataBase`.
   * @constructor
   * @param {?T} [value] The initial value of the data.
   */
  constructor(value?: T) {
    super();
    this.#value = value as T;
  }
  clear(): AsyncReturn<S, this> {
    return this.#value = undefined as T, this as AsyncReturn<S, this>;
  }
  destroy(): AsyncReturn<S, this> {
    return this.#value = null as T, this as AsyncReturn<S, this>;
  }
  override lock(): this {
    return super.lock(), this;
  }
  getValue(): AsyncReturn<S, T> {
    return this.#value as AsyncReturn<S, T>;
  }
  setValue(value: T): AsyncReturn<S, this> {
    return this.#value = value, this as AsyncReturn<S, this>;
  }
}
