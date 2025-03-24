// Abstract.
import { DataCore } from './data-core.abstract';
/**
 * @description The `WeakData` class is a concrete class that stores data in a static `WeakMap`.
 * @export
 * @class WeakData
 * @template Type 
 * @extends {DataCore<Type>}
 */
export class WeakData<Type> extends DataCore<Type> {
  /**
   * @description Gets the data value from another instance.
   * @public
   * @static
   * @template Type 
   * @param {DataStore<Type>} instance Another instance from which to get the data.
   * @returns {Type} The value of the data stored in the given instance.
   */
  public static get<Type>(instance: WeakData<Type>): Type {
    return WeakData.#value.get(instance);
  }

  /**
   * @description Returns the `string` tag representation of the `WeakData` class when used in `Object.prototype.toString.call(instance)`.
   * @public
   * @readonly
   * @type {string}
   */
  public override get [Symbol.toStringTag](): string {
    return WeakData.name;
  }

  /**
   * @description A static, privately stored `WeakMap` used for associating each instance with its value.
   * @readonly
   * @type {WeakMap}
   */
  static readonly #value = new WeakMap<any, any>();

  /**
   * @description
   * @public
   * @readonly
   * @type {Type}
   */
  public get value(): Type {
    return WeakData.#value.get(this) as Type;
  }

  /**
   * Creates an instance of `WeakData` child class.
   * @constructor
   * @param {Type} value Initial data value of `Type`.
   */  
  constructor(value: Type) {
    super();
    WeakData.#value.set(this, value);
  }

  /**
   * @description Destroys the value in a static `WeakMap`.
   * @public
   * @returns {this} Returns current instance.
   */
  public destroy(): this {
    WeakData.#value.delete(this);
    return this;
  }

  /**
   * @description Sets the data value in a static `WeakMap`.
   * @public
   * @param {Type} value The data of `Type` to set.
   * @returns {this} Returns current instance.
   */ 
  public set(value: Type): this {
    super.validate();
    WeakData.#value.set(this, value);
    return this;
  }
}
