// Class.
import { Data } from './data.class';
/**
 * @description 
 * @export
 * @class ReadonlyData
 * @template Type 
 * @extends {Data<Readonly<Type>>}
 */
export class ReadonlyData<Type> extends Data<Readonly<Type>> {
  /**
   * @inheritdoc
   * @public
   * @readonly
   * @type {string}
   */
  public override get [Symbol.toStringTag](): string {
    return ReadonlyData.name;
  }
}
