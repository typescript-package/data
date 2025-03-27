// Class.
import { DataSet } from './data-set.class';
import { WeakData } from '../weak/weak-data.class';
/**
 * @description
 * @export
 * @class WeakDataSet
 * @template Type 
 * @extends {DataSet<Type, WeakData<Set<Type>>>}
 */
export class WeakDataSet<Type> extends DataSet<Type, WeakData<Set<Type>>> {
  /**
   * @description Returns the `string` tag representation of the `WeakDataSet` class when used in `Object.prototype.toString.call(instance)`.
   * @public
   * @readonly
   * @type {string}
   */
  public override get [Symbol.toStringTag](): string {
    return WeakDataSet.name;
  }

  /**
   * Creates an instance of `WeakDataSet`.
   * @constructor
   * @param {?(Iterable<Type> | null | undefined)} [iterable] 
   */
  constructor(iterable?: Iterable<Type> | null | undefined) {
    super(iterable, WeakData);
  }
}
