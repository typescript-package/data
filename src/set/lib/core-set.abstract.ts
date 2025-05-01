// Class.
import { Data } from '../../lib/data.class';
import { ImmutableSet } from './immutable-set.class';
// Abstract.
import { DataCore } from '../../lib/data-core.abstract';
import { SetOnHook } from './set-on-hook.abstract';
// Interface.
import { SetTypeConstructor } from '../../interface';
// Type.
import { DataConstructorInput } from '../../type';
/**
 * @description The abstract core class for building customizable `Set` and `DataCore` related classes.
 * @export
 * @abstract
 * @class CoreSet
 * @template Type 
 * @template {Set<Type>} [SetType=Set<Type>] 
 * @template {DataCore<SetType>} [DataType=Data<SetType>] 
 * @extends {SetOnHook<Type, DataType>}
 */
export abstract class CoreSet<
  Type,
  SetType extends Set<Type> = Set<Type>,
  DataType extends DataCore<SetType> = Data<SetType>
> extends SetOnHook<Type, DataType> {
  /**
   * @description Returns the `string` tag representation of the `CoreSet` class when used in `Object.prototype.toString.call(instance)`.
   * @public
   * @readonly
   */
  public get [Symbol.toStringTag](): string {
    return CoreSet.name;
  }

  /**
   * @description The data instance used to hold the `Set` value, but omit direct access to it.
   * @public
   * @readonly
   * @type {Omit<DataType, 'value'>}
   */
  public get data(): Omit<DataType, 'value'> {
    return this.#data;
  }

  /**
   * @description Returns the readonly `ImmutableSet` of `Type`.
   * @public
   * @readonly
   * @type {ReadonlySet<Type>}
   */
  public get value(): ReadonlySet<Type> {
    return new ImmutableSet(this.#data.value);
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
   * @description The `Set` data holder of `DataCore` type.
   * @type {DataType}
   */
  #data: DataType;

  /**
   * Creates an instance of `CoreSet` child class.
   * @constructor
   * @param {?Iterable<Type>} [iterable] Initial value for `Set`.
   * @param {?SetTypeConstructor<Type, SetType>} [set] Custom `Set`.
   * @param {?DataConstructorInput<SetType, DataType>} [data] Custom data holder of generic type variable `DataType` to store the `Set`.
   */
  constructor(
    iterable?: Iterable<Type>,
    set?: SetTypeConstructor<Type, SetType>,
    data?: DataConstructorInput<Set<Type>, DataType>
  ) {
    super();
    this.#data = new (Array.isArray(data) ? data[0] : data ?? Data)(new (set || Set)(iterable) as SetType) as unknown as DataType;
  }

  /**
   * @description Access to the readonly set by using a symbol.
   * @public
   * @returns {Readonly<SetType>} 
   */
  public [Symbol.for('value')](): Readonly<SetType> {
    return this.#data.value;
  }

  /**
   * @description "Appends a new element with a specified value to the end of the `Set`."
   * @public
   * @param {Type} value 
   * @returns {this} 
   */
  public add(value: Type): this {
    this.#data.value.add(value);
    this.onAdd(value, this.#data);
    return this;
  }
  
  /**
   * Clears all entries.
   * @inheritdoc
   * @public
   * @returns {this} 
   */
  public clear(): this {
    this.#data.value.clear();
    this.onClear(this.#data);
    return this;
  }

  /**
   * "Removes a specified value from the Set."
   * @public
   * @param {Type} value The value to delete.
   * @returns {boolean} "Returns true if an element in the Set existed and has been removed, or false if the element does not exist."
   */
  public delete(value: Type): boolean {
    const result = this.#data.value.delete(value);
    return this.onDelete(value, result, this.#data), result;
  }

  /**
   * @description "Returns an iterable of [v,v] pairs for every value v in the set."
   * @public
   * @returns {SetIterator<[Readonly<Type>, Readonly<Type>]>} 
   */
  public entries(): SetIterator<[Readonly<Type>, Readonly<Type>]> {
    return this.#data.value.entries();
  }

  /**
   * @description
   * @public
   * @param {(value: Readonly<Type>, value2: Readonly<Type>, set: Set<Readonly<Type>>) => void} callbackfn 
   * @param {?*} [thisArg] 
   * @returns {this} 
   */
  public forEach(callbackfn: (value: Readonly<Type>, value2: Readonly<Type>, set: Set<Readonly<Type>>) => void, thisArg?: any): this {
    this.#data.value.forEach(callbackfn, thisArg);
    return this;
  }

  /**
   * Checks if a value exists in the `Set`.
   * @inheritdoc
   * @public
   * @param {Type} value The value to check.
   * @returns {boolean} "a boolean indicating whether an element with the specified value exists in the Set or not."
   */
  public has(value: Type): boolean {
    return this.#data.value.has(value);
  }

  /**
   * "Despite its name, returns an iterable of the values in the set."
   * @inheritdoc
   * @public
   * @returns {SetIterator<Readonly<Type>>} 
   */
  public keys(): SetIterator<Readonly<Type>> {
    return this.#data.value.keys();
  }

  /**
   * "Returns an iterable of values in the set."
   * @inheritdoc
   * @public
   * @returns {SetIterator<Readonly<Type>>} 
   */
  public values(): SetIterator<Readonly<Type>> {
    return this.#data.value.values();
  }
}
