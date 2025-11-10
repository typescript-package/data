// Abstract.
import { HooksBase } from './hooks-base.abstract';
// Interface.
import { DataShape } from '@typedly/data';
/**
 * @description The base abstraction with immutability for handling data-related classes.
 * @export
 * @abstract
 * @class DataCore
 * @template T Represents the type of data value.
 * @extends {HooksBase<T>}
 * @implements {DataShape<T>}
 */
export abstract class DataCore<T>
  // For immutability and hooks features.
  extends HooksBase<T>
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
    return HooksBase.deepFreeze(this.value),
      super.lock(),
      this;
  }

  /**
   * @description Sets the value of `T` in arbitrary parameter array.
   * @public
   * @abstract
   * @template {unknown[]} V The type of the values array.
   * @param {...V} values The arbitrary values array of type `V`.
   * @returns {this} 
   */
  public abstract set<V extends unknown[]>(...values: V): this;

  /**
   * @description Sets the value of `T` in arbitrary parameter.
   * @public
   * @abstract
   * @param {...T[]} value Arbitrary number of values of type `T`.
   * @returns {this} 
   */
  public abstract set(...value: T[]): this;

  /**
   * @description Sets the data value. Ensure `super.validate()` is called before invoking this method.
   * @public
   * @abstract
   * @param {T} value The data value of `T` to set.
   * @returns {this} Returns `this` current instance.
   */
  public abstract set(value: T): this;
}
