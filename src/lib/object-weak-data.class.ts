// Class.
import { WeakData } from './weak-data.class';
/**
 * @description The `ObjectWeakData` class is a concrete class that stores data in a static `WeakMap`.
 * @export
 * @class ObjectWeakData
 * @template {object} [Type=object] 
 * @extends {WeakData<Type>}
 */
export class ObjectWeakData<Type extends object = object> extends WeakData<Type> {
  /**
   * @description Returns the `string` tag representation of the `ObjectWeakData` class when used in `Object.prototype.toString.call(instance)`.
   * @public
   * @readonly
   * @type {string}
   */
  public override get [Symbol.toStringTag](): string {
    return ObjectWeakData.name;
  }

  /**
   * @description Patches the value by merging it with a new value.
   * @public
   * @param {Partial<Type>} value The new value to patch.
   * @returns {this} The current instance for chaining.
   */
  public patch(value: Partial<Type>): this {
    this.set({...this.value, ...value});
    return this;
  }
}
