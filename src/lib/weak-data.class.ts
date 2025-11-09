// Abstract.
import { DataCore } from './data-core.abstract';
/**
 * @description The `WeakData` class is a concrete class that stores data in a static `WeakMap`.
 * @export
 * @class WeakData
 * @template T The type of the data value.
 * @extends {DataCore<T>}
 */
export class WeakData<T> extends DataCore<T> {
  /**
   * @inheritdoc
   * @public
   * @readonly
   * @type {string}
   */
  public static override toStringTag: string = 'WeakData';

  /**
   * @inheritdoc
   * @public
   * @readonly
   * @type {string}
   */
  public override get [Symbol.toStringTag](): string {
    return WeakData.toStringTag;
  }

  /**
   * @description Returns a new `WeakData` instance with a given value.
   * @public
   * @static
   * @template T 
   * @param {T} value The value of `T`.
   * @returns {WeakData<T>} Returns a new `WeakData` instance.
   */
  public static create<T>(value: T): WeakData<T> {
    return new WeakData(value);
  }

  /**
   * @description Gets the data value from another instance.
   * @public
   * @static
   * @template T 
   * @param {WeakData<T>} instance Another instance from which to get the data.
   * @returns {T | undefined} The value of the data stored in the given instance.
   */
  public static get<T>(instance: WeakData<T>): T  | undefined {
    return WeakData.#valueOf<T>().get(instance);
  }

  /**
   * @description Checks whether the instance exists in the data.
   * @public
   * @static
   * @template T The type of the data value.
   * @param {WeakData<T>} instance The instance to check.
   * @returns {boolean} "a boolean indicating whether an element with the specified key exists or not."
   */
  public static has<T>(instance: WeakData<T>): boolean {
    return WeakData.#valueOf<T>().has(instance);
  }

  /**
   * @description A static, privately stored `WeakMap` used for associating each instance with its value.
   * @static
   * @readonly
   * @type {WeakMap<object, unknown>}
   */
  static readonly #value: WeakMap<object, unknown> = new WeakMap<object, unknown>();

  /**
   * @description Returns the static `WeakMap` for storing values.
   * @private
   * @static
   * @template T The type of the data value.
   * @returns {WeakMap<WeakData<T>, T>} 
   */
  static #valueOf<T>(): WeakMap<WeakData<T>, T> {
    return WeakData.#value as WeakMap<WeakData<T>, T>;
  }

  /**
   * @description Returns the readonly value of `T` from static `WeakMap`.
   * @public
   * @readonly
   * @type {T} The value type.
   */
  public get value(): Readonly<T> {
    return WeakData.#valueOf<T>().get(this) as Readonly<T>;
  }

  /**
   * Creates an instance of `WeakData`.
   * @constructor
   * @param {T} value Initial data value of `T`.
   */  
  constructor(value: T) {
    super();
    WeakData.#valueOf<T>().set(this, value);
  }

  /**
   * @description
   * @public
   * @returns {T} 
   */
  public [DataCore.valueSymbol](): WeakMap<WeakData<T>, T> {
    return WeakData.#valueOf<T>();
  }

  /**
   * @description Clears the value to `null`.
   * @public
   * @returns {this} The `this` current instance.
   */
  public clear(): this {
    return WeakData.#valueOf<T>().set(this, null as unknown as T), this;
  }

  /**
   * @description Removes the data value in a static `WeakMap`.
   * @public
   * @returns {this} The `this` current instance.
   */
  public delete(): this {
    return WeakData.#valueOf<T>().delete(this), this;
  }

  /**
   * @description Destroys the value in a static `WeakMap`.
   * @public
   * @returns {this} The `this` current instance.
   */
  public destroy(): this {
    return this.clear().delete(), this;
  }

  /**
   * @description Sets the data value in a static `WeakMap`.
   * @public
   * @param {T} value The data of `T` to set.
   * @returns {this} The `this` current instance.
   */ 
  public set(value: T): this {
    let newValue: T;
    return super.validate(),
      (newValue = super.onSetCallback ? super.onSetCallback(value) : value),
      // Invokes the onChange callback if `newValue` and `this.value` has changed.
      (this.onChangeCallback && DataCore.hasChanged(this.value, newValue) ? this.onChangeCallback(newValue, this.value) : newValue),
      WeakData.#valueOf<T>().set(this, newValue),
      this;
  }

  /**
   * @description Applies the callback to the current value and updates it.
   * @public
   * @param {(value: T) => T} callbackFn The callback to apply to the value.
   * @returns {this} The `this` current instance.
   */
  public update(callbackFn: (value: T) => T): this {
    if (typeof callbackFn === 'function') {
      this.set(callbackFn(this.value));
    } else {
      throw new Error("`callbackFn` must a function type.");
    }
    return this;
  }

  /**
   * @description Creates a new instance with a new value of `T`.
   * @public
   * @param {T} value The value of `T`.
   * @returns {WeakData<T>} Returns a `WeakData` instance with value of `T`.
   */
  public with(value: T): WeakData<T> {
    return WeakData.create(value);
  }
}
