// Abstract.
import { BaseData } from './base-data.abstract';
// Interface.
import { DataAdapter } from '@typedly/data';
/**
 * @description The `Data` class is a concrete class that extends the `BaseData` abstract class.
 * @public
 * @export
 * @class Data
 * @template T Type of the data value.
 * @template {unknown[]} [G=unknown[]] Arguments passed to the adapter class constructor, after the `value` parameter.
 * @template {boolean} [R=false] Indicates whether the data operations are asynchronous.
 * @template {DataAdapter<T, R> | undefined} [A=DataAdapter<T, R>] Adapter type extending `DataAdapter` for handling the data value.
 * @extends {BaseData<T, G, R, A>}
 */
export class Data<
  T,
  G extends unknown[] = unknown[],
  R extends boolean = false,
  A extends DataAdapter<T, R> | undefined = DataAdapter<T, R>,
> extends BaseData<T, G, R, A> {
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
