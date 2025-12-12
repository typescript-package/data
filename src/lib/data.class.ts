// Abstract.
import { BaseData } from './base-data.abstract';
// Interface.
import { DataAdapter } from '@typedly/data';
/**
 * @description The `Data` class is a concrete class that extends base class with functionality for managing data value.
 * @export
 * @class Data
 * @template T Type of the data value.
 * @template {DataAdapter<T>} [A=DataAdapter<T>] Adapter type extending `DataAdapter` for handling the data value.
 * @extends {BaseData<T, false, A>} 
 */
export class Data<T, A extends DataAdapter<T> = DataAdapter<T>> extends BaseData<T, false, A> {
  /**
   * @inheritdoc
   * @public
   * @readonly
   * @type {string}
   */
  public static override toStringTag: string = 'Data';

  /**
   * @inheritdoc
   * @public
   * @readonly
   * @type {string}
   */
  public override get [Symbol.toStringTag](): string {
    return Data.toStringTag;
  }
}
