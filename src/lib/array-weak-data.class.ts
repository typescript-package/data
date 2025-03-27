// Class.
import { WeakData } from './weak-data.class';
/**
 * @description
 * @export
 * @class ArrayWeakData
 * @template {any[]} Type 
 * @extends {WeakData<Type>}
 */
export class ArrayWeakData<Type extends any[]> extends WeakData<Type> {
  /**
   * @description Returns the `string` tag representation of the `ArrayWeakData` class when used in `Object.prototype.toString.call(instance)`.
   * @public
   * @readonly
   */
  public override get [Symbol.toStringTag](): string {
    return ArrayWeakData.name;
  }

  /**
   * @description Removes values that match a condition.
   * @public
   * @param {(value: Type[number], index?: number) => boolean} callbackFn The filter function.
   * @returns {this} The `this` current instance for chaining.
   */
  public filter(callbackFn: (value: Type[number], index?: number) => boolean): this {
    this.set(this.value.filter(callbackFn) as Type);
    return this;
  }

  /**
   * @description Applies a transformation to each element.
   * @public
   * @param {(value: Type[number], index?: number) => Type[number]} callbackFn The mapping function.
   * @returns {this} The current instance for chaining.
   */
  public map(callbackFn: (value: Type[number], index?: number) => Type[number]): this {
    this.set(this.value.map(callbackFn) as Type);
    return this;
  }

  /**
   * @description Adds values to the array.
   * @public
   * @param {Type[number][]} values Elements to append.
   * @returns {this} The current instance for chaining.
   */
  public push(...values: Type[number][]): this {
    this.set([...this.value, ...values] as Type);
    return this;
  }
}
