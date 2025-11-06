// Abstract.
import { DataBase } from './data-base.abstract';
// Interface.
import { ValueShape } from '@typedly/data';
/**
 * @description The `Data` class is a concrete class that wraps a value and provides methods for setting, retrieving, and destroying the value.
 * @export
 * @class Data
 * @template T 
 * @template {ValueShape<T>} [I=ValueShape<T>] 
 * @template {unknown[]} [V=unknown[]] 
 * @extends {DataCore<T>}
 */
export class Data<
  // Type of the data value.
  T,
  // Value instance type extending ValueShape<Type>.
  I extends ValueShape<T> = ValueShape<T>,
  // Arguments for the value constructor.
  V extends unknown[] = unknown[],
> extends DataBase<T, I, V> {
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
