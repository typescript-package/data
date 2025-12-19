// Abstract.
import {
  // Type.
  AsyncReturn,
  // Interface.
  DataAdapter
} from '@typedly/data';
import { AdapterData } from './adapter-data.abstract';
/**
 * @description The `BaseData` is an abstract class that extends core features, adding functionality for managing the data value directly or through the adapter.
 * @export
 * @abstract
 * @class BaseData
 * @template T Type of the data value.
 * @template {unknown[]} [G=unknown[]] The arguments parameter type. 
 * @template {boolean} [R=false] Indicates if the data operations are asynchronous.
 * @template {DataAdapter<T, R> | undefined} [A=undefined] Adapter type extending `DataAdapter` for handling the data value with it.
 * @extends {AdapterData<T, G, R, A>}
 */
export abstract class BaseData<
  T,
  G extends unknown[] = unknown[],
  R extends boolean = false,
  A extends DataAdapter<T, R> | undefined = undefined,
> extends AdapterData<T, G, R, A> {
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
   * @description Returns the privately stored value of generic type variable `T`.
   * @public
   * @readonly
   * @type {T}
   */
  public override get value(): T {
    return super.adapter ? super.adapter.value : this.#value!;
  }

  /**
   * @description Privately stored value of type `T`.
   * @type {T}
   */
  #value?: T;

  /**
   * Creates an instance of `BaseData`.
   * @constructor
   * @param {R} async Indicates if the data operations are asynchronous.
   * @param {T} value Initial data value of generic type variable `T`.
   * @param {?{new (value: T, ...args: G): A}} [adapter] Optional adapter class constructor for handling the data value.
   * @param {...G} args Arguments passed to the adapter class constructor, after the `value` parameter.
   */
  constructor(
    async: R,
    value: T,
    adapter?: {new (value: T, ...args: G): A},
    ...args: G
  ) {
    super(async, adapter as {new (...args: G): A} | undefined, ...[value, ...args] as G);
    !adapter && (this.#value = value);
  }

  /**
   * @description Clears the value to `undefined`.
   * @public
   * @returns {AsyncReturn<R, this>} The `this` current instance.
   */
  public override clear(): AsyncReturn<R, this> {
    return super.adapter
      ? super.adapter.clear()
      : (this.#value = undefined as unknown as T),
      this as AsyncReturn<R, this>;
  }

  /**
   * @description Destroys the value by setting it to `null`.
   * @public
   * @returns {AsyncReturn<R, this>} The `this` current instance.
   */
  public override destroy(): AsyncReturn<R, this> {
    return super.adapter
      ? super.adapter.destroy()
      : (this.#value = null as unknown as T),
      this as AsyncReturn<R, this>;
  }

  /**
   * @description Sets the data value.
   * @public
   * @param {T} value The data value of `T` to set.
   * @returns {AsyncReturn<R, this>} The `this` current instance.
   */
  public override set(value: T): AsyncReturn<R, this> {
    return super.validate(),
      super.adapter
        ? super.adapter.set(value)
        : (this.#value = value),
        this as AsyncReturn<R, this>;
  }
}
