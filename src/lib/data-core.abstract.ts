// Abstract.
import { Immutability } from './immutability.abstract';
/**
 * @description The base abstraction with immutability for handling data-related classes.
 * @export
 * @abstract
 * @class DataCore
 * @template Type Represents the type of data value.
 * @extends {Immutability}
 */
export abstract class DataCore<Type> extends Immutability {
  /**
   * @description Returns the `string` tag representation of the `DataCore` class when used in `Object.prototype.toString.call(instance)`.
   * @public
   * @readonly
   * @type {string}
   */
  public get [Symbol.toStringTag](): string {
    return DataCore.name;
  }

  /**
   * @description Returns the value of generic type variable `Type`.
   * @public
   * @abstract
   * @readonly
   * @type {Type}
   */
  public abstract get value(): Type;

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
    Immutability.deepFreeze(this.value);
    super.lock(); 
    return this;
  }

  /**
   * @description Sets the data value. Ensure `super.validate()` is called before invoking this method.
   * @public
   * @abstract
   * @param {Type} value The data value of `Type` to set.
   * @returns {this} Returns `this` current instance.
   */  
  public abstract set(value: Type): this;
}
