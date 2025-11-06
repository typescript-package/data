// Abstract.
import { DataCore } from './data-core.abstract';
// Interface.
import { ValueConstructor, ValueShape } from '@typedly/data';
/**
 * @description The `Data` class is a concrete class that wraps a value and provides methods for setting, retrieving, and destroying the value.
 * @export
 * @class Data
 * @template T 
 * @template {ValueShape<T>} [I=ValueShape<T>] 
 * @template {unknown[]} [V=unknown[]] 
 * @template {unknown[]} [D=unknown[]] 
 * @extends {DataCore<T>}
 */
export abstract class DataBase<
  // Type of the data value.
  T,
  // Value instance type extending ValueShape<Type>.
  I extends ValueShape<T> = ValueShape<T>,
  // Arguments for the value constructor.
  V extends unknown[] = unknown[],
> extends DataCore<T> {
  /**
   * @description Returns the `string` tag representation of the `Data` class when used in `Object.prototype.toString.call(instance)`.
   * @public
   * @readonly
   * @type {string}
   */
  public override get [Symbol.toStringTag](): string {
    return DataBase.toStringTag;
  }

  /**
   * @description Returns the value of the data instance.
   * @public
   * @returns {I | undefined} The value of the data instance.
   */
  public get [DataCore.valueSymbol](): I | undefined {
    return this.#valueCtor ? this.#value as I : undefined;
  }

  /**
   * @description Returns the privately stored value of generic type variable `Type`.
   * @public
   * @readonly
   * @type {T}
   */
  public get value(): T {
    return this.#valueCtor
      ? (this.#value as I).value
      : this.#value as T;
  }

  /**
   * @description Privately stored value of class `ValueShape<Type>`.
   * @type {T | I}
   */
  #value: T | I;

  /**
   * @description Privately stored value to determine value constructor was used.
   * @type {boolean | undefined}
   */
  #valueCtor;

  /**
   * Creates an instance of `DataBase`.
   * @constructor
   * @param {T} value Initial data value of generic type variable `Type`.
   * @param {?[ValueConstructor<T, I>, ...V]} [valueCtor] 
   */
  constructor(
    value: T,
    valueCtor?: [ValueConstructor<T, I>, ...V],
  );

  /**
   * Creates an instance of `DataBase`.
   * @constructor
   * @param {T} value Initial data value of generic type variable `Type`.
   * @param {?ValueConstructor<T, I>} [valueCtor] The value constructor.
   */
  constructor(
    value: T,
    valueCtor?: ValueConstructor<T, I>,
  );

  /**
   * Creates an instance of `DataBase`.
   * @constructor
   * @param {T} value Initial data value of generic type variable `Type`.
   * @param {unknown[]} args The rest of the arguments.
   */
  constructor(value: T, ...args: unknown[]) {
    super();
    //  Assign value based on whether a value constructor is provided.
    const valueCtor = args[0] as
      | ValueConstructor<T, I>
      | [ValueConstructor<T, I>, ...V ]
      | undefined;
    // Set the private value and value constructor flag.
    this.#valueCtor = valueCtor ? true : undefined;
    // Initialize the value.
    this.#value = valueCtor ? (
      valueCtor instanceof Array
        ? new valueCtor[0](value, ...valueCtor.slice(1))
        : new valueCtor(value)
      ) : value;
  }

  /**
   * @description Clears the value to `null`.
   * @public
   * @returns {this} The `this` current instance.
   */
  public clear(): this {
    const oldValue = this.value;
    const newValue = null as unknown as T;
    return this.#valueCtor
      ? (this.#value as I).set(null as unknown as T)
      : this.#value = null as unknown as T,
      // Invokes the onChange callback if `newValue` and `this.value` has changed.
      (typeof this.onChangeCallback === 'function' && DataBase.hasChanged(oldValue, newValue)
        ? this.onChangeCallback(newValue, this.value) : newValue),
      this;
  }

  /**
   * @description Destroys the `Value` object by setting it to `null`.
   * @public
   * @returns {this} The `this` current instance.
   */
  public destroy(): this {
    return this.onDestroyCallback?.(),
      this.#value = null as unknown as T,
      this;
  }

  /**
   * @description Sets the data value.
   * @public
   * @param {T} value The data value of `Type` to set.
   * @returns {this} The `this` current instance.
   */
  public set(value: T): this {
    const oldValue = this.value;
    let newValue: T;
    return super.validate(),
      // Assigns the new value.
      (newValue = typeof super.onSetCallback === 'function' ? super.onSetCallback(value) : value),
      // Assigns the new value to the private value.
      (this.#valueCtor ? (this.#value as I).set(newValue) : this.#value = newValue),
      // Invokes the onChange callback if `newValue` and `this.value` has changed.
      (typeof this.onChangeCallback === 'function' && DataBase.hasChanged(oldValue, newValue)
        ? this.onChangeCallback(newValue, this.value) : newValue),
      // Returns this instance.
      this;
  }
}
