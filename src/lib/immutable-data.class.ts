// Abstract.
import { Immutability } from './immutability.abstract';
// Class.
import { ReadonlyData } from './readonly-data.class';
/**
 * @description A class that stores and returns an immutable version of the provided value.
 * The value is frozen at runtime and marked as `readonly` at type level.
 * @export
 * @class ImmutableData
 * @template T The original input type.
 * @extends {ReadonlyData<T>}
 */
export class ImmutableData<T> extends ReadonlyData<T> {
  /**
   * @inheritdoc
   * @public
   * @readonly
   * @type {string}
   */
  public static override toStringTag: string = 'ImmutableData';

  /**
   * @inheritdoc
   * @public
   * @readonly
   * @type {string}
   */
  public override get [Symbol.toStringTag](): string {
    return ImmutableData.toStringTag;
  }

  /**
   * Creates an instance of `ImmutableData`.
   * @constructor
   * @param {T} value Initial value to store.
   */
  constructor(value: T) {
    super(Immutability.deepFreeze(value));
  }

  /**
   * @description Sets the data value.
   * @public
   * @param {T} value The data value of `Type` to set.
   * @returns {this} The `this` current instance.
   */
  public override set(value: T): this {
    return super.set(Immutability.deepFreeze(value));
  }
}
