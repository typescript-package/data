// Abstract.
import { DataCore } from '../data-core.abstract';
/**
 * @description The `WeakData` class is a concrete class that stores data in a static `WeakMap`.
 * @export
 * @class WeakData
 * @template Type 
 * @extends {DataCore<Type>}
 */
export class WeakData<Type> extends DataCore<Type> {
  /**
   * @description 
   * @public
   * @static
   * @template Type 
   * @param {Type} value 
   * @returns {WeakData<Type>} 
   */
  public static create<Type>(value: Type): WeakData<Type> {
    return new WeakData(value);
  }

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
   * Creates an instance of `WeakData`.
   * @constructor
   * @param {Type} value Initial data value of `Type`.
   */  
  constructor(value: Type) {
    super();
    WeakData.#value.set(this, value);
  }

  /**
   * @description Clears the value to `null`.
   * @public
   * @returns {this} Returns `this` current instance.
   */
  public clear(): this {
    WeakData.#value.set(this, null as unknown as Type);
    return this;
  }

  /**
   * @description Removes the data value in a static `WeakMap`.
   * @public
   * @returns {this} Returns `this` current instance.
   */
  public delete(): this {
    WeakData.#value.delete(this);
    return this;
  }

  /**
   * @description Destroys the value in a static `WeakMap`.
   * @public
   * @returns {this} Returns `this` current instance.
   */
  public destroy(): this {
    this.clear().delete();
    return this;
  }

  /**
   * @description Checks whether the static `WeakMap` has the instance.
   * @public
   * @param {Type} key The instance of `Type`.
   * @returns {boolean} Returns the `boolean` indicating the.
   */
  public has(key: Type = this.value): boolean {
    return WeakData.#value.has(key);
  }

  /**
   * @description Sets the data value in a static `WeakMap`.
   * @public
   * @param {Type} value The data of `Type` to set.
   * @returns {this} Returns `this` current instance.
   */ 
  public set(value: Type): this {
    super.validate();
    WeakData.#value.set(this, value);
    return this;
  }

  /**
   * @description Applies the callback to the current value and updates it.
   * @public
   * @param {(value: Type) => Type} callbackFn The callback to apply to the value.
   * @returns {this} Returns `this` current instance.
   */
  public update(callbackFn: (value: Type) => Type): this {
    if (typeof callbackFn === 'function') {
      this.set(callbackFn(this.value));
    } else {
      throw new Error("`callbackFn` must a function type.");
    }
    return this;
  }

  /**
   * @description
   * @public
   * @param {Type} value 
   * @returns {WeakData<Type>} 
   */
  public with(value: Type): WeakData<Type> {
    return WeakData.create(value);
  }
}
