// Class.
import { WeakData } from "./weak-data.class";
/**
 * @description
 * @export
 * @class SetWeakData
 * @template Type 
 * @extends {WeakData<Set<Type>>}
 */
export class SetWeakData<Type> extends WeakData<Set<Type>> {
  /**
   * @description Returns the `string` tag representation of the `SetWeakData` class when used in `Object.prototype.toString.call(instance)`.
   * @public
   * @readonly
   */
  public override get [Symbol.toStringTag](): string {
    return SetWeakData.name;
  }

  /**
   * Creates an instance of `SetWeakData`.
   * @constructor
   * @param {Type} value 
   */
  constructor(value: Type) {
    super(new Set([value]));
  }
}
