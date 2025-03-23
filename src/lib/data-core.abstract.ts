// Abstract.
import { Immutability } from './immutability.abstract';
/**
 * @description The base abstraction for data-related classes.
 * @export
 * @abstract
 * @class DataCore
 * @template Type 
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
   * @description
   * @public
   * @abstract
   * @readonly
   * @type {Type}
   */
  public abstract get value(): Type;

  /**
   * @description
   * @public
   * @abstract
   * @returns {this} 
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
   * @description Sets the data value. Use the `validate()` before `set()`.
   * @public
   * @abstract
   * @param {Type} value The data of `Type` to set.
   * @returns {this}
   */  
  public abstract set(value: Type): this;
}
