// Abstract.
import { DataCore } from './data-core.abstract';
// Class.
import { Value } from './value.class';
/**
 * @description The `Data` class is a concrete class that wraps a value and provides methods for setting, retrieving, and destroying the value.
 * @export
 * @class Data
 * @template Type 
 * @extends {DataCore<Type>}
 */
export class Data<Type> extends DataCore<Type> {
  /**
   * @description Returns the `string` tag representation of the `Data` class when used in `Object.prototype.toString.call(instance)`.
   * @public
   * @readonly
   * @type {string}
   */
  public override get [Symbol.toStringTag](): string {
    return Data.name;
  }
  
  /**
   * @description Returns the privately stored value of generic type variable `Type`.
   * @public
   * @readonly
   * @type {Type}
   */
  public get value(): Type {
    return this.#value.value;
  }

  /**
   * @description Privately stored value of class `Value`.
   * @type {Value<Type>}
   */
  #value;

  /**
   * Creates an instance of `Data`.
   * @constructor
   * @param {Type} value Initial data value of generic type variable `Type`.
   */
  constructor(value: Type) {
    super();
    this.#value = new Value(value);
  }

  /**
   * @description Clears the value to `null`.
   * @public
   * @returns {this} Returns `this` current instance.
   */
  public clear(): this {
    this.#value.set(null as unknown as Type);
    return this;
  }

  /**
   * @description Destroys the `Value` object by setting it to `null`.
   * @public
   * @returns {this} Returns `this` current instance.
   */
  public destroy(): this {
    this.#value = null as any;
    return this;
  }

  /**
   * @description Sets the data value.
   * @public
   * @param {Type} value The data of `Type` to set.
   * @returns {this} Returns `this` current instance.
   */
  public set(value: Type) {
    super.validate();
    this.#value!.set(value);
    return this;
  }
}
