// Abstract.
import { DataCore } from './data.core';
/**
 * @description The abstract `SyncData` class extends `DataCore` adding functionality for managing data value by adapter with arguments.
 * @export
 * @abstract
 * @class SyncData
 * @template T The type of data.
 * @extends {DataCore<T, false>}
 */
export abstract class SyncData<T> extends DataCore<T, false> {
  /**
   * @description Returns the `string` tag representation of the `SyncData` class when used in `Object.prototype.toString.call(instance)`.
   * @public
   * @readonly
   * @type {string}
   */
  public override get [Symbol.toStringTag](): string {
    return 'SyncData';
  }

  /**
   * @description Returns the privately stored value of generic type variable `T`.
   * @public
   * @readonly
   * @type {T}
   */
  public get value(): T {
    return this.#value;
  }

  /**
   * @description Privately stored value of type `T`.
   * @type {T}
   */
  #value: T;

  /**
   * Creates an instance of `SyncData`.
   * @constructor
   * @param {?T} [value] Optional initial data value of generic type variable `T`.
   */
  constructor(value?: T) {
    super();
    this.#value = value as T;
  }

  /**
   * @description Clears the value to `undefined`.
   * @public
   * @returns {this} The `this` current instance.
   */
  public clear(): this {
    return this.#value = undefined as unknown as T,
      this;
  }

  /**
   * @description Destroys the value by setting it to `null`.
   * @public
   * @returns {this} The `this` current instance.
   */
  public destroy(): this {
    return this.#value = null as unknown as T,
      this;
  }

  /**
   * @description Gets the value either asynchronously or synchronously based on the `R` generic type variable.
   * @public
   * @returns {T} The value of type `T`.
   */
  public getValue(): T {
    return this.value;
  }

  /**
   * @description Sets the data value.
   * @public
   * @param {T} value The data value of `T` to set.
   * @returns {this} The `this` current instance.
   */
  public setValue(value: T): this {
    return super.validate(),
      this.#value = value,
      this;
  }
}
