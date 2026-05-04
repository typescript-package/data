// Abstract.
import { Immutability } from './immutability.abstract';
import {
  // Type.
  AsyncReturn,
  IterValue,
  // Interface.
  DataShape
} from '@typedly/data';
/**
 * @description The core abstraction with immutability for handling data-related classes.
 * @export
 * @abstract
 * @class DataCore
 * @template T Represents the type of data value.
 * @template S Indicates whether the operations are asynchronous.
 * @extends {Immutability}
 * @implements {DataShape<T, S>}
 */
export abstract class DataCore<T, S extends boolean = false>
  // For immutability features.
  extends Immutability
  // For data shape contract, to use instead of `DataCore`.
  implements DataShape<T, S> {
  /**
   * @description Symbol key for accessing the value of the data instance.
   * @public
   * @static 
   * @type {*}
   */
  static valueSymbol = Symbol.for('value');

  /**
   * @description The `string` tag representation of the `DataCore` class when used in `Object.prototype.toString.call(instance)`.
   * @public
   * @static
   * @type {string}
   */
  static toStringTag = 'DataCore';

  /**
   * @description Checks whether the provided value implements the iterable interface.
   * @param {unknown} value The value to inspect.
   * @returns {value is Iterable<unknown>} True when value exposes an iterator function.
   */
  static isIterable(value: unknown): value is Iterable<unknown> {
    return value != null && typeof (value as { [Symbol.iterator]?: unknown })[Symbol.iterator] === 'function';
  }

  /**
   * @description Returns the `string` tag representation of the `DataCore` class when used in `Object.prototype.toString.call(instance)`.
   * @public
   * @readonly
   * @type {string}
   */
  get [Symbol.toStringTag](): string {
    return DataCore.toStringTag;
  }

  /**
   * @description Indicates if the adapter operations are asynchronous.
   * @public
   * @abstract
   * @readonly
   * @type {S}
   */
  abstract readonly async: S;

  /**
   * @description Returns the string tag of the current instance defined by the `Symbol.toStringTag`.
   * @public
   * @returns {string} The extracted class name, such as `'DataCore'`, or an empty string if extraction fails.
   */
  get tag(): string {
    const tag = Object.prototype.toString.call(this).slice(8, -1);
    return tag !== 'Object' ? tag : '';
  }

  /**
   * @description Returns the value of generic type variable `T`.
   * @public
   * @abstract
   * @readonly
   * @type {T}
   */
  abstract readonly value: T;

  /**
   * @description Clears the value by setting to `undefined` or `null`.
   * @public
   * @abstract
   * @returns {this} Returns `this` current instance.
   */
  abstract clear(): AsyncReturn<S, this>;

  /**
   * @description Abstract method to clear or remove the stored data value.
   * @public
   * @abstract
   * @returns {this} Returns `this` current instance.
   */
  abstract destroy(): AsyncReturn<S, this>;

  /**
   * @description Gets the value either asynchronously or synchronously based on the `Async` generic type variable.
   * @public
   * @abstract
   * @returns {AsyncReturn<S, T>} 
   */
  abstract getValue(): AsyncReturn<S, T>;

  /**
   * @inheritdoc
   * @public
   * @returns {this} 
   */
  override lock(): this {
    return Immutability.deepFreeze(this.value),
      super.lock(),
      this;
  }

  /**
   * @description Sets the data value. Ensure `super.validate()` is called before invoking this method.
   * @public
   * @abstract
   * @param {T} value The data value of `T` to set.
   * @returns {AsyncReturn<S, this>} Returns `this` current instance.
   */
  abstract setValue(value: T): AsyncReturn<S, this>;

  /**
   * @description Returns an iterator for the data value.
   * @public
   * @returns {IterableIterator<IterValue<T>>} 
   */
  *[Symbol.iterator](): IterableIterator<IterValue<T>> {
    const value = this.value;
    DataCore.isIterable(value)
      ? yield* value as Iterable<IterValue<T>>
      : yield value as IterValue<T>;
  }

  /**
   * @description The helper method to return conditional `this` based on async type `R`, and returned `result` of adapter.
   * @param {AsyncReturn<S, A>} result The result of the adapter operation.
   * @returns {AsyncReturn<S, this>} The `this` current instance.
   */
  protected returnThis<A>(result: AsyncReturn<S, A>): AsyncReturn<S, this> {
    if (this.async) {
      return (result instanceof Promise
        ? result.then(() => this)
        : Promise.resolve(this)
      ) as AsyncReturn<S, this>;
    }
    return this as AsyncReturn<S, this>;
  }
}
