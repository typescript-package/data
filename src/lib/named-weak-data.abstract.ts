// Abstract.
import { DataCore } from './data-core.abstract';
/**
 * @description
 * @export
 * @abstract
 * @class NamedWeakData
 * @template [Type=any] 
 * @template {string} [Name='default'] 
 * @extends {DataCore<Type>}
 */
export abstract class NamedWeakData<Type = any, Name extends string = 'default'> extends DataCore<Type> {
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
   * @description
   * @static
   * @readonly
   * @type {Map<string, WeakMap<any, any>>}
   */
  static readonly #value: Map<string, WeakMap<any, any>> = new Map();

  /**
   * @description
   * @public
   * @readonly
   * @type {Type}
   */
  public get value(): Type {
    return NamedWeakData.#value.get(this.name)?.get(this);
  }

  /**
   * Creates an instance of `NamedWeakData` child class.
   * @constructor
   * @param {Type} value Initial data value of `Type`.
   * @param {string} [name='default'] The name under which the value is stored, defaults to `default`.
   */  
  constructor(value: Type, private name: Name = 'default' as Name) {
    super();
    NamedWeakData.#value.get(name) === undefined && NamedWeakData.#value.set(name, new WeakMap<any, any>());
    NamedWeakData.#value.get(name)!.set(this, value);
  }

  /**
   * @description
   * @public
   * @returns {this} 
   */
  public clear(): this {
    NamedWeakData.#value.clear();    
    return this;
  }

  /**
   * @description
   * @public
   * @returns {this} 
   */
  public destroy(): this {
    NamedWeakData.#value.get(this.name)?.delete(this);
    this.clear();
    return this;
  }

  /**
   * @description Sets the data value.
   * @public
   * @param {Type} value The data of `Type` to set.
   * @returns {this}
   */
  public set(value: Type): this {
    super.validate();
    NamedWeakData.#value.get(this.name)?.set(this, value);
    return this;
  }
}
