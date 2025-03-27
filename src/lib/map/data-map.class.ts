// Class.
import { Data } from '../data.class';
// Abstract.
import { DataCore } from '../data-core.abstract';
/**
 * @description
 * @export
 * @class DataMap
 * @template Key 
 * @template Value 
 */
export class DataMap<Key, Value, DataType extends DataCore<Map<Key, Value>>> {
  /**
   * @description Returns the `string` tag representation of the `DataMap` class when used in `Object.prototype.toString.call(instance)`.
   * @public
   * @readonly
   */
  public get [Symbol.toStringTag](): string {
    return DataMap.name;
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
   * Creates an instance of `DataMap`.
   * @constructor
   * @param {?[Key, Value][]} [entries] 
   * @param {new (value: Map<Key, Value>) => DataType} [data=Data as any] 
   */
  constructor(
    entries?: [Key, Value][],
    data: new (value: Map<Key, Value>) => DataType = Data as any
  ) {
    this.#data = new data(new Map(entries));
  }

  /**
   * @description Clears all entries.
   * @public
   * @returns {this} The current instance for chaining.
   */
  public clear(): this {
    this.#data.value.clear();
    return this;
  }

  /**
   * @description Deletes a value from the `key`.
   * @public
   * @param {Key} key The key to delete.
   * @returns {this} The `this` current instance for chaining.
   */
  public delete(key: Key): this {
    this.#data.value.delete(key);
    return this;
  }

  /**
   * @description
   * @public
   * @returns {MapIterator<[Key, Value]>}
   */
  public entries(): MapIterator<[Key, Value]> {
    return this.#data.value.entries();
  }

  /**
   * @description
   * @public
   * @param {(value: Value, key: Key, map: Map<Key, Value>) => void} callbackfn 
   * @param {?*} [thisArg] 
   * @returns {this} Returns the `this` current instance for chaining.
   */
  public forEach(callbackfn: (value: Value, key: Key, map: Map<Key, Value>) => void, thisArg?: any): this {
    this.#data.value.forEach(callbackfn, thisArg);
    return this;
  }

  /**
   * @description Returns a specified value from the Map object.
   * @public
   * @param {Key} key The key to get the value.
   * @returns {Value | undefined} Returns `true` if the key exists, otherwise `false`.
   */
  public get(key: Key): Value | undefined {
    return this.#data.value.get(key);
  }

  /**
   * @description Checks if a key exists in the `Map`.
   * @public
   * @param {Key} key The key to check.
   * @returns {boolean} Returns `true` if the key exists, otherwise `false`.
   */
  public has(key: Key): boolean {
    return this.#data.value.has(key);
  }

  /**
   * @description
   * @public
   * @returns {MapIterator<Key>} 
   */
  public keys(): MapIterator<Key> {
    return this.#data.value.keys();
  }

  /**
   * @description Sets a key-value pair.
   * @public
   * @param {Key} key The key.
   * @param {Value} value The value of `Value` type.
   * @returns {this} The `this` current instance for chaining.
   */
  public set(key: Key, value: Value): this {
    this.#data.value.set(key, value);
    return this;
  }

  /**
   * @description
   * @public
   * @returns {MapIterator<Value>} 
   */
  public values(): MapIterator<Value> {
    return this.#data.value.values();
  }
}
