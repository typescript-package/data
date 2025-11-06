// Abstract.
import { Immutability } from './immutability.abstract';
// Interface.
import { DataShape } from '@typedly/data';
/**
 * @description The base abstraction with immutability for handling data-related classes.
 * @export
 * @abstract
 * @class DataCore
 * @template T Represents the type of data value.
 * @extends {Immutability}
 * @implements {DataShape<T>}
 */
export abstract class DataCore<T>
  // For immutability features.
  extends Immutability
  // For data shape contract, to use instead of `DataCore`.
  implements DataShape<T> {
  /**
   * @description Symbol key for accessing the value of the data instance.
   * @public
   * @static 
   * @type {*}
   */
  public static valueSymbol = Symbol.for('value');

  /**
   * @description The `string` tag representation of the `DataCore` class when used in `Object.prototype.toString.call(instance)`.
   * @public
   * @static
   * @type {string}
   */
  public static toStringTag = 'DataCore';

  /**
   * @description Determine whether two values are different used in the `onChange` hook.
   * @param {T} a The first value to compare.
   * @param {T} b The second value to compare.
   * @returns {boolean} The comparison result of `boolean` type.
   */
  public static hasChanged: <T>(a: T, b: T) => boolean = <T>(a: T, b: T): boolean => !DataCore.isEqual(a, b);

  /**
   * @description Checks if two values are different.
   * @public
   * @static
   * @template T 
   * @param {T} a The first value to compare.
   * @param {T} b The second value to compare.
   * @returns {boolean} The comparison result of `boolean` type.
   */
  public static isEqual<T>(a: T, b: T): boolean {
    return JSON.stringify(a) === JSON.stringify(b);
  }

  /**
   * @description Returns the `string` tag representation of the `DataCore` class when used in `Object.prototype.toString.call(instance)`.
   * @public
   * @readonly
   * @type {string}
   */
  public get [Symbol.toStringTag](): string {
    return DataCore.toStringTag;
  }

  /**
   * @description Returns the string tag of the current instance defined by the `Symbol.toStringTag`.
   * @public
   * @returns {string | undefined} The extracted class name, such as `'DataCore'`, or `undefined` if extraction fails.
   */
  public get tag(): string | undefined {
    const tag = Object.prototype.toString.call(this).slice(8, -1);
    return tag !== 'Object' ? tag : undefined;
  }

  /**
   * @description Returns the value of generic type variable `T`.
   * @public
   * @abstract
   * @readonly
   * @type {T}
   */
  public abstract get value(): T;

  /**
   * @description Returns the onChange callback function.
   * @protected
   * @readonly
   * @type {((value: T, oldValue: T) => T) | undefined}
   */
  protected get onChangeCallback(): ((value: T, oldValue: T) => T) | undefined {
    return this.#onChangeCallback;
  }

  /**
   * @description Returns the onDestroy callback function.
   * @protected
   * @readonly
   * @type {(() => void) | undefined}
   */
  protected get onDestroyCallback(): (() => void) | undefined {
    return this.#onDestroyCallback;
  }

  /**
   * @description Returns the onSet callback function.
   * @protected
   * @readonly
   * @type {((value: T) => T) | undefined}
   */
  protected get onSetCallback(): ((value: T) => T) | undefined {
    return this.#onSetCallback;
  }

  /**
   * @description Privately stored onChange callback function, defaults `undefined`.
   * @type {?(value: T, oldValue: T) => T}
   */
  #onChangeCallback?: (value: T, oldValue: T) => T;

  /**
   * @description Privately stored onDestroy callback function, defaults `undefined`.
   * @type {?() => void}
   */
  #onDestroyCallback?: () => void;

  /**
   * @description Privately stored onSet callback function, defaults `undefined`.
   * @type {?(value: T) => T}
   */
  #onSetCallback?: (value: T) => T;

  /**
   * @description Clears the value by setting to `undefined` or `null`.
   * @public
   * @abstract
   * @returns {this} Returns `this` current instance.
   */
  public abstract clear(): this;

  /**
   * @description Abstract method to clear or remove the stored data value.
   * @public
   * @abstract
   * @returns {this} Returns `this` current instance.
   */
  public abstract destroy(): this;

  /**
   * @inheritdoc
   * @public
   * @returns {this} 
   */
  public override lock(): this {
    return Immutability.deepFreeze(this.value),
      super.lock(),
      this;
  }

  /**
   * @description Sets the callback function invoked when the data value changes.
   * @public
   * @abstract
   * @param {(value: T, oldValue: T) => T} callbackfn The callback function to invoke.
   * @returns {this} The `this` current instance.
   */
  public onChange(callbackfn: (value: T, oldValue: T) => T): this {
    return this.#onChangeCallback = callbackfn, this;
  }

  /**
   * @description Sets the callback function to be invoked when destroying the data instance.
   * @public
   * @param {() => void} callbackfn 
   * @returns {this} 
   */
  public onDestroy(callbackfn: () => void): this {
    return this.#onDestroyCallback = callbackfn, this;
  }

  /**
   * @description Sets the callback function to be invoked when setting the data value.
   * @public
   * @abstract
   * @param {(value: T) => T} callbackfn The callback function to invoke.
   * @returns {this} The `this` current instance.
   */
  public onSet(callbackfn: (value: T) => T): this {
    return this.#onSetCallback = callbackfn, this;
  }

  /**
   * @description Sets the data value. Ensure `super.validate()` is called before invoking this method.
   * @public
   * @abstract
   * @param {T} value The data value of `T` to set.
   * @returns {this} Returns `this` current instance.
   */  
  public abstract set(value: T): this;
}
