// Abstract.
import { Immutability } from './immutability.abstract';
// Class.
import { ReadonlyData } from './readonly-data.class';
/**
 * @description A class that stores and returns an immutable version of the provided value.
 * The value is frozen at runtime and marked as `readonly` at type level.
 * @export
 * @class ImmutableData
 * @template Type The original input type.
 * @extends {ReadonlyData<Type>}
 */
export class ImmutableData<Type> extends ReadonlyData<Type> {
  /**
   * @description Returns the `string` tag representation of the `ImmutableData` class when used in `Object.prototype.toString.call(instance)`.
   * @public
   * @readonly
   * @type {string}
   */
  public override get [Symbol.toStringTag](): string {
    return ImmutableData.name;
  }

  /**
   * Creates an instance of `ImmutableData`.
   * @constructor
   * @param {Type} value Initial value to store.
   */
  constructor(value: Type) {
    super(Immutability.deepFreeze(value));
  }

  /**
   * @description Sets the data value.
   * @public
   * @param {Type} value The data value of `Type` to set.
   * @returns {this} The `this` current instance.
   */
  public override set(value: Type): this {
    return super.set(Immutability.deepFreeze(value));
  }
}
