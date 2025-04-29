// Class.
import { Data } from '../../lib/data.class';
import { ImmutableSet } from './immutable-set.class';
// Abstract.
import { DataCore } from '../../lib/data-core.abstract';
// Interface.
import { DataConstructor, SetTypeConstructor } from '../../interface';
/**
 * @description The abstract core class for building customizable `Set` and `DataCore` related classes.
 * @export
 * @class CoreSet
 * @template Type 
 * @template {Set<Type>} [SetType=Set<Type>] 
 * @template {DataCore<SetType>} [DataType=Data<SetType>] 
 */
export abstract class CoreSet<
  Type,
  SetType extends Set<Type> = Set<Type>,
  DataType extends DataCore<SetType> = Data<SetType>
> {
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
   * @description
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
   * @param {?SetTypeConstructor<Type, SetType>} [set] 
   * @param {?DataConstructor<SetType, DataType>} [data] Optional data instance of generic type variable `DataType` to store the `Set`.
   */
  constructor(
    iterable?: Iterable<Type>,
    set?: SetTypeConstructor<Type, SetType>,
    data?: DataConstructor<SetType, DataType>,
  ) {
    this.#data = new (data || Data)(new (set || Set)(iterable) as SetType) as unknown as DataType;
  }

  /**
   * @inheritdoc
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
   * Deletes a value of `Type`.
   * @inheritdoc
   * @public
   * @param {Type} value The value to delete.
   */
  public delete(value: Type) {
    return this.onDelete(value, this.#data.value.delete(value), this.#data) ;
  }

  /**
   * @inheritdoc
   * @public
   * @returns {SetIterator<[Type, Type]>} 
   */
  public entries(): SetIterator<[Type, Type]> {
    return this.#data.value.entries();
  }

  /**
   * @inheritdoc
   * @public
   * @param {(value: Type, value2: Type, set: Set<Type>) => void} callbackfn 
   * @param {?*} [thisArg] 
   * @returns {this} 
   */
  public forEach(callbackfn: (value: Type, value2: Type, set: Set<Type>) => void, thisArg?: any): this {
    this.#data.value.forEach(callbackfn, thisArg);
    return this;
  }

  /**
   * Checks if a value exists in the `Set`.
   * @inheritdoc
   * @public
   * @param {Type} value The value to check.
   * @returns {boolean} 
   */
  public has(value: Type): boolean {
    return this.#data.value.has(value);
  }

  /**
   * @inheritdoc
   * @public
   * @returns {SetIterator<Type>} 
   */
  public keys(): SetIterator<Type> {
    return this.#data.value.keys();
  }

  /**
   * @inheritdoc
   * @public
   * @returns {SetIterator<Type>} 
   */
  public values(): SetIterator<Type> {
    return this.#data.value.values();
  }

  /**
   * @description Hook called when a value is added.
   * @protected
   * @param {Type} value The added value.
   * @param {DataType} data The data holder.
   */
  protected onAdd(value: Type, data: DataType): void {}

  /**
   * @description Hook called when the `Set` is cleared.
   * @protected
   * @param {DataType} data The data holder.
   */
  protected onClear(data: DataType): void {}

  /**
   * @description Hook called when a value is deleted.
   * @protected
   * @param {Type} value The deleted value.
   * @param {boolean} success Whether the deletion was successful.
   * @param {DataType} data The data holder.
   */
  protected onDelete(value: Type, success: boolean, data: DataType): void {}
}
