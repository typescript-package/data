// Class.
import { Data } from '../../lib/data.class';
// Abstract.
import { CoreSet } from './core-set.abstract';
import { DataCore } from '../../lib/data-core.abstract';
// Interface.
import { DataConstructorInput } from '../../type';
/**
 * @description The `DataSet` is a concrete class that extends `CoreSet` and encapsulates its data within a `DataCore` store, providing additional data management capabilities.
 * @export
 * @class DataSet
 * @template Type 
 * @template {DataCore<Set<Type>>} [DataType=Data<Set<Type>>] 
 * @extends {CoreSet<Type, Set<Type>, DataType>}
 */
export class DataSet<
  Type,
  DataType extends DataCore<Set<Type>> = Data<Set<Type>>
> extends CoreSet<Type, Set<Type>, DataType> {
  /**
   * @description Returns the `string` tag representation of the `DataSet` class when used in `Object.prototype.toString.call(instance)`.
   * @public
   * @readonly
   */
  public override get [Symbol.toStringTag](): string {
    return DataSet.name;
  }

  /**
   * Creates an instance of `DataSet`.
   * @constructor
   * @param {?Iterable<Type>} [iterable] Initial value for `Set`.
   * @param {?DataConstructorInput<Set<Type>, DataType>} [data] Optional data instance of generic type variable `DataType` to store the `Set`.
   */
  constructor(
    iterable?: Iterable<Type>,
    data?: DataConstructorInput<Set<Type>, DataType>
  ) {
    super(iterable, Set, data);
  }
}
