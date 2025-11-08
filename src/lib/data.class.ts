// Abstract.
import { DataBase } from './data-base.abstract';
/**
 * @description The `Data` class is a concrete class that wraps a value and provides methods for setting, retrieving, and destroying the value.
 * @export
 * @class Data
 * @template T 
 * @extends {DataCore<T>}
 */
export class Data<T> extends DataBase<T> {
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
