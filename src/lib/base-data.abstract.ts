// Abstract.
import { DataCore } from './data-core.abstract';
import {
  // Type.
  AsyncReturn,
  // Interface.
  DataAdapter
} from '@typedly/data';
/**
 * @description The `BaseData` class is an abstract class that extends core adding functionality for managing data value, also by adapter.
 * @export
 * @class BaseData
 * @template T Type of the data value.
 * @template R Indicates if the data operations are asynchronous.
 * @template A Adapter type extending `DataAdapter` for handling the data value with it.
 * @extends {DataCore<T>}
 */
export abstract class BaseData<
  T,
  R extends boolean = false,
  A extends DataAdapter<T, R> = DataAdapter<T, R>,
> extends DataCore<T, R> {
  /**
   * @description Returns the `string` tag representation of the `BaseData` class when used in `Object.prototype.toString.call(instance)`.
   * @public
   * @readonly
   * @type {string}
   */
  public override get [Symbol.toStringTag](): string {
    return BaseData.toStringTag;
  }

  /**
   * @description The underlying adapter to handle the data value.
   * @public
   * @readonly
   * @type {(A | undefined)}
   */
  public get adapter(): A | undefined {
    return this.#adapter;
  }

  /**
   * @description Returns the privately stored value of generic type variable `T`.
   * @public
   * @readonly
   * @type {T}
   */
  public get value(): T {
    return this.#adapter ? this.#adapter.value : this.#value!;
  }

  /**
   * @description Optional privately stored adapter of type `A`.
   * @type {?A}
   */
  #adapter?: A;

  /**
   * @description Privately stored value of type `T`.
   * @type {T}
   */
  #value?: T;

  /**
   * Creates an instance of `BaseData`.
   * @constructor
   * @param {T} value Initial data value of generic type variable `T`.
   * @param {?{new (value: T, ...args: unknown[]): A}} [adapter] Optional adapter class constructor for handling the data value.
   */
  constructor(
    value: T,
    adapter?: {new (value: T, ...args: unknown[]): A},
    ...args: unknown[]
  ) {
    super();
    adapter ? (this.#adapter = new adapter(value, ...args)) : (this.#value = value);
  }

  /**
   * @description Clears the value to `undefined`.
   * @public
   * @returns {AsyncReturn<R, this>} The `this` current instance.
   */
  public clear(): AsyncReturn<R, this> {
    return this.#adapter ? this.#adapter.clear() : (this.#value = undefined as unknown as T),
      this as AsyncReturn<R, this>;
  }

  /**
   * @description Destroys the value by setting it to `null`.
   * @public
   * @returns {AsyncReturn<R, this>} The `this` current instance.
   */
  public destroy(): AsyncReturn<R, this> {
    return this.#adapter ? this.#adapter.destroy() : (this.#value = null as unknown as T),
      this as AsyncReturn<R, this>;
  }

  /**
   * @description Sets the data value.
   * @public
   * @param {T} value The data value of `T` to set.
   * @returns {AsyncReturn<R, this>} The `this` current instance.
   */
  public set(value: T): AsyncReturn<R, this> {
    return super.validate(),
      this.#adapter ? this.#adapter.set(value) : (this.#value = value),
      this as AsyncReturn<R, this>;
  }
}
