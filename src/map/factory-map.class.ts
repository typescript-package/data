// Class.
import { Data } from '../lib/data.class';
// Abstract.
import { CoreMap } from './core-map.abstract';
import { DataCore } from '../lib/data-core.abstract';
// Type.
import { DataConstructor, MapTypeConstructor } from '../interface';
/**
 * @description
 * @export
 * @class FactoryMap
 * @template Key 
 * @template Value 
 * @template {Map<Key, Value>} [MapType=Map<Key, Value>] 
 * @template {DataCore<MapType>} [DataType=Data<MapType>] 
 * @extends {CoreMap<Key, Value, MapType, DataType>}
 */
export class FactoryMap<
  Key,
  Value,
  MapType extends Map<Key, Value> = Map<Key, Value>,
  DataType extends DataCore<MapType> = Data<MapType>,
> extends CoreMap<Key, Value, MapType, DataType> {
  /**
   * @description
   * @public
   * @static
   * @template {PropertyKey} Key 
   * @template Value 
   * @template {Map<Key, Value>} [MapType=Map<Key, Value>] 
   * @template {DataCore<MapType>} [DataType=Data<MapType>] 
   * @param {Record<Key, Value>} obj 
   * @param {?MapTypeConstructor<Key, Value, MapType>} [map] 
   * @param {?DataConstructor<MapType, DataType>} [data] 
   * @param {{
   *       defaultValue?: () => Value;
   *       cloner?: (value: Value) => Value;
   *     }} [param0={}] 
   * @param {() => Value} param0.defaultValue 
   * @param {(value: Value) => Value} param0.cloner 
   * @returns {FactoryMap<Key, Value, MapType, DataType>} 
   */
  public static fromObject<
    Key extends PropertyKey,
    Value,
    MapType extends Map<Key, Value> = Map<Key, Value>,
    DataType extends DataCore<MapType> = Data<MapType>
  >(
    obj: Record<Key, Value>,
    map?: MapTypeConstructor<Key, Value, MapType>,
    data?: DataConstructor<MapType, DataType>,
    { defaultValue, cloner }:
    {
      defaultValue?: () => Value;
      cloner?: (value: Value) => Value;
    } = {}
  ): FactoryMap<Key, Value, MapType, DataType> {
    return new FactoryMap(
      Object.entries(obj) as [Key, Value][],
      map,
      data,
      { cloner, defaultValue }
    );
  }

  /**
   * @description Returns the `string` tag representation of the `FactoryMap` class when used in `Object.prototype.toString.call(instance)`.
   * @public
   * @readonly
   */
  public override get [Symbol.toStringTag](): string {
    return FactoryMap.name;
  }

  /**
   * @description Returns the privately stored data class.
   * @public
   * @readonly
   * @type {DataType}
   */
  public override get data() {
    return super.data;
  }

  /**
   * @description Returns the default value.
   * @public
   * @readonly
   * @type {Value | undefined}
   */
  public get defaultValue() {
    return this.#defaultValue?.();
  }

  /**
   * @description Privately stored function to set the default value in missing keys.
   * @public
   * @readonly
   * @type {() => Value}
   */
  #defaultValue?: () => Value;

  /**
   * @description Privately stored cloner function to clone the returned value.
   * @public
   * @readonly
   * @type {(value: Value) => Value}
   */
  #cloner?: (value: Value) => Value;

  /**
   * Creates an instance of `FactoryMap`.
   * @constructor
   * @param {?[Key, Value][]} [entries] 
   * @param {?MapTypeConstructor<Key, Value, MapType>} [map] 
   * @param {?DataConstructor<MapType, DataType>} [data] 
   * @param {{
   *       cloner?: (value: Value) => Value,
   *       defaultValue?: () => Value,
   *     }} [param0={}] 
   * @param {(value: Value) => Value} param0.cloner 
   * @param {() => Value} param0.defaultValue 
   */
  constructor(
    entries?: [Key, Value][],
    map?: MapTypeConstructor<Key, Value, MapType>,
    data?: DataConstructor<MapType, DataType>,
    {cloner, defaultValue}: {
      cloner?: (value: Value) => Value,
      defaultValue?: () => Value,
    } = {}
  ) {
    super(
      entries,
      map,
      data
    );
    this.#defaultValue = defaultValue;
    this.#cloner = cloner;
  }

  /**
   * @inheritdoc
   * @public
   * @param {Key} key 
   * @returns {(Value | undefined)} 
   */
  public override get(key: Key): Value | undefined {
    (!super.has(key) && typeof this.#defaultValue === 'function') && super.data.value.set(key, this.#defaultValue());
    const value = super.get(key);
    return typeof this.#cloner === 'function' && value ? this.#cloner(value) : value;
  }


  /**
   * @description Gets the cloner function, to use for e.g. `structuredClone`.
   * @public
   * @returns {((value: Value) => Value) | undefined} 
   */
  public getCloner() {
    return this.#cloner;
  }

  /**
   * @description Returns the default value function.
   * @public
   * @returns {(() => Value) | undefined}
   */
  public getDefaultValue() {
    return this.#defaultValue;
  }

  /**
   * @description Sets the cloner function, to use for e.g. `structuredClone`.
   * @public
   * @param {(value: Value) => Value} clonerFn
   * @returns {this} The current instance of `FactoryMap`.
   * @example
   * ```ts
   * const map = new FactoryMap<string, number>();
   * map.setCloner((value) => structuredClone(value));
   * console.log(map.get('key')); // undefined
   * map.set('key', { a: 1 });
   * console.log(map.get('key')); // { a: 1 }
   * map.set('key', { a: 2 });
   * console.log(map.get('key')); // { a: 2 }
   * ```
   */
  public setCloner(clonerFn: (value: Value) => Value): this {
    this.#cloner = clonerFn;
    return this;
  }

  /**
   * @description Sets the default value function.
   * @public
   * @param {() => Value} valueFn
   * @returns {this} The current instance of `FactoryMap`.
   * @example
   * ```ts
   * const map = new FactoryMap<string, number>();
   * map.setDefaultValue(() => 0);
   * console.log(map.get('key')); // 0
   * map.set('key', 1);
   * console.log(map.get('key')); // 1
   * ```
   */
  public setDefaultValue(valueFn: () => Value): this {
    this.#defaultValue = valueFn;
    return this;
  }
}
