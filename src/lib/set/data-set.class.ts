// Class.
import { Data } from '../data.class';
// Abstract.
import { DataCore } from '../data-core.abstract';
/**
 * @description
 * @export
 * @class DataSet
 * @template Key 
 * @template Type 
 */
export class DataSet<Type, DataType extends DataCore<Set<Type>>> {
  /**
   * @description Returns the `string` tag representation of the `DataSet` class when used in `Object.prototype.toString.call(instance)`.
   * @public
   * @readonly
   */
  public get [Symbol.toStringTag](): string {
    return DataSet.name;
  }

  /**
   * @description
   * @public
   * @readonly
   * @type {DataType}
   */
  public get data() {
    return this.#data;
  }

  /**
   * @description 
   * @public
   * @readonly
   * @type {number}
   */
  public get size() {
    return this.#data.value.size;
  }

  /**
   * @description
   * @type {DataType}
   */
  #data: DataType;

  /**
   * Creates an instance of `DataSet`.
   * @constructor
   * @param {?(Iterable<Type> | null | undefined)} [iterable] 
   * @param {new (value: Set<Type>) => DataType} [data=Data as any] 
   */
  constructor(
    iterable?: Iterable<Type> | null | undefined,
    data: new (value: Set<Type>) => DataType = Data as any
  ) {
    this.#data = new data(new Set(iterable));
  }

  /**
   * @description
   * @public
   * @param {Type} value 
   * @returns {this} 
   */
  public add(value: Type): this {
    this.#data.value.add(value);
    return this;
  }

  /**
   * @description Clears all entries.
   * @public
   * @returns {this} The `this` current instance for chaining.
   */
  public clear(): this {
    this.#data.value.clear();
    return this;
  }

  /**
   * @description Deletes a value of `Type`.
   * @public
   * @param {Type} value The value to delete.
   * @param {?(deleted: boolean) => void} [callbackFn] 
   * @returns {this} The `this` current instance for chaining.
   */
  public delete(value: Type, callbackFn?: (deleted: boolean) => void): this {
    const deleted = this.#data.value.delete(value);
    typeof callbackFn === 'function' && callbackFn(deleted);
    return this;
  }

  /**
   * @description
   * @public
   * @returns {SetIterator<[Key, Type]>}
   */
  public entries(): SetIterator<[Type, Type]> {
    return this.#data.value.entries();
  }

  /**
   * @description
   * @public
   * @param {(value: Type, value2: Type, set: Set<Type>) => void} callbackfn 
   * @param {?*} [thisArg] 
   * @returns {this} Returns the `this` current instance for chaining.
   */
  public forEach(callbackfn: (value: Type, value2: Type, set: Set<Type>) => void, thisArg?: any): this {
    this.#data.value.forEach(callbackfn, thisArg);
    return this;
  }

  /**
   * @description Checks if a value exists in the `Set`.
   * @public
   * @param {Type} value The value to check.
   * @returns {boolean} Returns `true` if the value exists, otherwise `false`.
   */
  public has(value: Type): boolean {
    return this.#data.value.has(value);
  }

  /**
   * @description
   * @public
   * @returns {SetIterator<Type>} 
   */
  public keys(): SetIterator<Type> {
    return this.#data.value.keys();
  }

  /**
   * @description
   * @public
   * @returns {SetIterator<Type>} 
   */
  public values(): SetIterator<Type> {
    return this.#data.value.values();
  }
}
