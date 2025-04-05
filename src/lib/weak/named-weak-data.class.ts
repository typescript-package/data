// Abstract.
import { DataCore } from '../';
/**
 * @deprecated In favor of `WeakStorage` in `typescript-package/storage`.
 * @description The `NamedWeakData` class is a concrete class that manages data in a static `Map` where data is associated with a specified name.
 * @export
 * @class NamedWeakData
 * @template [Type=any] 
 * @template {string} [Name='default'] 
 * @extends {DataCore<Type>}
 */
export class NamedWeakData<Type = any, Name extends string = 'default'> extends DataCore<Type> {
  /**
   * @description Gets the data from another instance.
   * @public
   * @static
   * @template {string} Name 
   * @template Type 
   * @param {NamedWeakData<Name, Type>} instance Another instance from which to get the data.
   * @param {Name} name The name from which get the data.
   * @returns {Type} The value of the data stored in the given instance.
   */
  public static getFrom<Name extends string, Type>(instance: NamedWeakData<Type, Name>, name: Name): Type {
    return NamedWeakData.#value.get(name)?.get(instance);
  }

  /**
   * @description Returns the `string` tag representation of the `NamedWeakData` class when used in `Object.prototype.toString.call(instance)`.
   * @public
   * @readonly
   * @type {string}
   */
  public override get [Symbol.toStringTag](): string {
    return NamedWeakData.name;
  }


  /**
   * @description A private static `Map` stores under specified `string` type name the data value instance in `WeakMap`.
   * @static
   * @readonly
   * @type {Map<string, WeakMap<any, any>>}
   */
  static readonly #value: Map<string, WeakMap<any, any>> = new Map();

  /**
   * @description
   * @public
   * @readonly
   * @type {Name}
   */
  public get name(): Name {
    return this.#name;
  }

  /**
   * @description Returns the privately stored data value from the specified name of static `Map`.
   * @public
   * @readonly
   * @type {Type}
   */
  public get value(): Type {
    return NamedWeakData.#value.get(this.name)?.get(this);
  }

  /**
   * @description
   * @type {Name}
   */
  #name: Name;

  /**
   * Creates an instance of `NamedWeakData` child class.
   * @constructor
   * @param {Type} value Initial data value of `Type`.
   * @param {string} [name='default'] The name under which the value is stored, defaults to `default`.
   */  
  constructor(value: Type, name: Name = 'default' as Name) {
    super();
    this.#name = name;
    NamedWeakData.#value.has(name) || NamedWeakData.#value.set(name, new WeakMap<any, any>());
    NamedWeakData.#value.get(name)?.set(this, value);
  }

  /**
   * @description Clears the value in the `WeakMap`.
   * @public
   * @returns {this} Returns `this` current instance.
   */
  public clear(): this {
    this.set(null as any);
    return this;
  }

  /**
   * @description 
   * @public
   * @returns {this} Returns `this` current instance.
   */
  public destroy(): this {
    NamedWeakData.#value.clear();
    return this;
  }

  /**
   * @description Sets the data value.
   * @public
   * @param {Type} value The data of `Type` to set.
   * @returns {this} Returns `this` current instance.
   */
  public set(value: Type): this {
    super.validate();
    NamedWeakData.#value.get(this.name)?.set(this, value);
    return this;
  }
}