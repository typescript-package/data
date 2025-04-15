// Class.
import { Data } from '../lib/data.class';
// Abstract.
import { DataCore } from '../lib/data-core.abstract';
/**
 * @description The `DataMap` is a concrete class that extends `Map` and encapsulates its data within a `DataCore` store, providing additional data management capabilities.
 * @export
 * @class DataMap
 * @template Key 
 * @template Value
 * @template {DataCore<Map<Key, Value>>} [DataType=Data<Map<Key, Value>>] 
 * @extends {Map<Key, Value>} 
 */
export class DataMap<
  Key,
  Value,
  DataType extends DataCore<Map<Key, Value>> = Data<Map<Key, Value>>
> {
  /**
   * @description Returns the `string` tag representation of the `DataMap` class when used in `Object.prototype.toString.call(instance)`.
   * @public
   * @readonly
   */
  public get [Symbol.toStringTag](): string {
    return DataMap.name;
  }

  /**
   * @description Returns the privately stored data class.
   * @public
   * @readonly
   * @type {DataType}
   */
  public get data() {
    return this.#data;
  }

  /**
   * @inheritdoc
   * @public
   * @readonly
   * @type {number}
   */
  public get size() {
    return this.#data.value.size;
  }

  /**
   * @description A privately stored data holder of generic type variable `DataType` for the `Map`.
   * @type {DataType}
   */
  #data: DataType;

  /**
   * Creates an instance of `DataMap`.
   * @constructor
   * @param {?[Key, Value][]} [entries] Initial value for `Map`.
   * @param {?DataType} [data] The data store of generic type variable `DataType` for `Map` value.
   */
  constructor(
    entries?: [Key, Value][],
    data?: DataType
  ) {
    if (data) {
      this.#data = data;
      (Array.isArray(entries) && this.#data.value.size === 0) && entries.forEach(([key, value]) => this.#data.value.set(key, value));
    } else {
      this.#data = new Data(new Map(entries)) as unknown as DataType;
    }
  }

  /**
   * Clears all entries.
   * @inheritdoc
   * @public
   * @returns {this} 
   */
  public clear(): this {
    this.onClear?.(this.#data);
    this.#data.value.clear();
    return this;
  }

  /**
   * Deletes a value from the `key`.
   * @inheritdoc
   * @public
   * @param {Key} key The key to delete.
   * @returns {boolean} 
   */
  public delete(key: Key): boolean {
    return this.#data.value.delete(key);
  }

  /**
   * @inheritdoc
   */
  public entries(): IterableIterator<[Key, Value]> {
    return this.#data.value.entries();
  }

  /**
   * @inheritdoc
   * @public
   * @param {(value: Value, key: Key, map: Map<Key, Value>) => void} callbackfn 
   * @param {?*} [thisArg] 
   * @returns {this} 
   */
  public forEach(callbackfn: (value: Value, key: Key, map: Map<Key, Value>) => void, thisArg?: any): this {
    this.#data.value.forEach(callbackfn, thisArg);
    return this;
  }

  /**
   * @inheritdoc
   * @public
   * @param {Key} key The key to get the value.
   */
  public get(key: Key): Value | undefined {
    return this.onGet?.(key, this.#data), this.#data.value.get(key);
  }

  /**
   * @inheritdoc
   * @public
   * @param {Key} key The key to check.
   * @returns {boolean} 
   */
  public has(key: Key): boolean {
    return this.onGet?.(key, this.#data), this.#data.value.has(key);
  }

  /**
   * @inheritdoc
   */
  public keys(): MapIterator<Key> {
    return this.#data.value.keys();
  }

  /**
   * @inheritdoc
   * @public
   * @param {Key} key The key under which the `value` set.
   * @param {Value} value The value of `Value` type.
   * @returns {this} The `this` current instance for chaining.
   */
  public set(key: Key, value: Value): this {
    this.onSet?.(key, value, this.get(key)!, this.#data);
    this.#data.value.set(key, value);
    return this;
  }
  
  /**
   * @inheritdoc
   */
  public values(): MapIterator<Value> {
    return this.#data.value.values();
  }

  /**
   * @description Hook called when the `Map` is cleared.
   * @protected
   * @param {DataType} data The data holder.
   */
  protected onClear(data: DataType): void {}

  /**
   * @description Hook called when a value is deleted.
   * @protected
   * @param {DataType} data The data holder.
   */
  protected onDelete(key: Key, data: DataType): void {}

  /**
   * @description Hook called before the `get` being invoked.
   * @protected
   * @param {Key} key The key to get the value.
   * @param {DataType} data The data holder.
   */
  protected onGet(key: Key, data: DataType): void {}

  /**
   * @description Hook called when a value is added.
   * @protected
   * @param {key} key The key under which set the `value`.
   * @param {Type} value The value to set.
   * @param {Type} previousValue The previous value.
   * @param {DataType} data The data holder.
   */
  protected onSet(key: Key, value: Value, previousValue: Value, data: DataType): void {}
}
