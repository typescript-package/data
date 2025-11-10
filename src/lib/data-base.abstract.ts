// Abstract.
import { DataCore } from './data-core.abstract';
/**
 * @description The `DataBase` class is a base abstraction class that extends core adding functionality for managing data value.
 * @export
 * @class DataBase
 * @template T Type of the data value.
 * @extends {DataCore<T>}
 */
export abstract class DataBase<T> extends DataCore<T> {
  /**
   * @description Returns the `string` tag representation of the `DataBase` class when used in `Object.prototype.toString.call(instance)`.
   * @public
   * @readonly
   * @type {string}
   */
  public override get [Symbol.toStringTag](): string {
    return DataBase.toStringTag;
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
   * @description Privately stored value of class `T`.
   * @type {T}
   */
  #value: T;

  /**
   * Creates an instance of `DataBase`.
   * @constructor
   * @param {T} value Initial data value of generic type variable `T`.
   */
  constructor(value: T) {
    super();
    this.#value = value;
  }

  /**
   * @description Clears the value to `null`.
   * @public
   * @returns {this} The `this` current instance.
   */
  public clear(): this {
    const oldValue = this.value;
    const newValue = null as unknown as T;
    this.#value = null as unknown as T;
    // Invokes the onChange callback if `newValue` and `this.value` has changed.
    if (typeof this.onChangeCallback === 'function' && DataBase.hasChanged(oldValue, newValue)) {
      this.onChangeCallback(newValue, oldValue);
    }
    return this;
  }

  /**
   * @description Destroys the value by setting it to `null`.
   * @public
   * @returns {this} The `this` current instance.
   */
  public destroy(): this {
    return this.#value = undefined as unknown as T,
      this.onDestroyCallback?.(),
      this.onChange(undefined),
      this.onDestroy(undefined),
      this.onSet(undefined),
      this;
  }

  /**
   * @description Sets the data value.
   * @public
   * @param {T} value The data value of `T` to set.
   * @returns {this} The `this` current instance.
   */
  public set(value: T): this {
    super.validate();
    const oldValue = this.value;
    // Invoke onSet callback before setting the value.
    if (typeof super.onSetCallback === 'function') {
      super.onSetCallback(value);
    }
    // Assign the new value to the private value.
    this.#value = value;
    // Invokes the onChange callback if the value has changed.
    if (typeof this.onChangeCallback === 'function' && DataBase.hasChanged(oldValue, value)) {
      this.onChangeCallback(value, oldValue);
    }
    // Returns this instance.
    return this;
  }
}
