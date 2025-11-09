// Class.
import { Data } from './data.class';
/**
 * @description The `ReadonlyData` class is a concrete class that wraps a read-only value and provides methods for retrieving the value.
 * @export
 * @class ReadonlyData
 * @template T The value type.
 * @extends {Data<Readonly<T>>}
 */
export class ReadonlyData<T> extends Data<Readonly<T>> {
  /**
   * @inheritdoc
   * @public
   * @readonly
   * @type {string}
   */
  public static override toStringTag: string = 'ReadonlyData';

  /**
   * @inheritdoc
   * @public
   * @readonly
   * @type {string}
   */
  public override get [Symbol.toStringTag](): string {
    return ReadonlyData.toStringTag;
  }
}
