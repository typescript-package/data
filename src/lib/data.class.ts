// Abstract.
import { DataBase } from './data.base';
/**
 * @description The `Data` class is a concrete implementation of the `DataBase` abstract class, providing basic synchronous data handling functionality.
 * @export
 * @class Data
 * @template T The type of the data value.
 * @template {boolean} [S=false] Indicates whether the data operations are asynchronous.
 * @extends {DataBase<T, S>}
 */
export class Data<T, S extends boolean = false>
  extends DataBase<T, S> {
  public static override toStringTag: string = 'Data';

  override get [Symbol.toStringTag](): string {
    return Data.toStringTag;
  }

  override lock(): this {
    super.lock();
    return this;
  }
}
