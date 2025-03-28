// Class.
import { DataArray } from './data-array.class';
import { WeakData } from '../weak/weak-data.class';

export class WeakDataArray<Type> extends DataArray<Type, WeakData<Array<Type>>> {
  /**
   * @description Returns the `string` tag representation of the `WeakDataArray` class when used in `Object.prototype.toString.call(instance)`.
   * @public
   * @readonly
   * @type {string}
   */
  public override get [Symbol.toStringTag](): string {
    return WeakDataArray.name;
  }

  /**
   * Creates an instance of `WeakDataArray`.
   * @constructor
   * @param {?Type[]} [entries] 
   */
  constructor(entries?: Type[]) {
    super(entries, WeakData);
  }
}
