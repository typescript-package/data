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
 * @template R Indicates whether the operations are asynchronous.
 * @extends {Immutability}
 * @implements {DataShape<T, R>}
 */
export abstract class DataCore<T, R extends boolean = false>
  // For immutability features.
  extends Immutability
  // For data shape contract, to use instead of `DataCore`.
  implements DataShape<T, R> {
  /**
   * @description Symbol key for accessing the value of the data instance.
   * @public
   * @static 
   * @type {*}
   */
  public static valueSymbol = Symbol.for('value');

  /**
   * @description The `string` tag representation of the `DataCore` class when used in `Object.prototype.toString.call(instance)`.
   * @public
   * @static
   * @type {string}
   */
  public static toStringTag = 'DataCore';

  /**
   * @description Checks whether the provided value implements the iterable interface.
   * @param {unknown} value The value to inspect.
   * @returns {value is Iterable<unknown>} True when value exposes an iterator function.
   */
  public static isIterable(value: unknown): value is Iterable<unknown> {
    return value != null && typeof (value as { [Symbol.iterator]?: unknown })[Symbol.iterator] === 'function';
  }

  /**
   * @description Returns the `string` tag representation of the `DataCore` class when used in `Object.prototype.toString.call(instance)`.
   * @public
   * @readonly
   * @type {string}
   */
  public get [Symbol.toStringTag](): string {
    return DataCore.toStringTag;
  }

  /**
   * @description Indicates if the adapter operations are asynchronous.
   * @public
   * @abstract
   * @readonly
   * @type {R}
   */
  public abstract get async(): R;

  /**
   * @description Returns the string tag of the current instance defined by the `Symbol.toStringTag`.
   * @public
   * @returns {string | undefined} The extracted class name, such as `'DataCore'`, or `undefined` if extraction fails.
   */
  public get tag(): string | undefined {
    const tag = Object.prototype.toString.call(this).slice(8, -1);
    return tag !== 'Object' ? tag : undefined;
  }

  /**
   * @description Returns the value of generic type variable `T`.
   * @public
   * @abstract
   * @readonly
   * @type {T}
   */
  public abstract get value(): T;

  /**
   * @description Clears the value by setting to `undefined` or `null`.
   * @public
   * @abstract
   * @returns {this} Returns `this` current instance.
   */
  public abstract clear(): AsyncReturn<R, this>;

  /**
   * @description Abstract method to clear or remove the stored data value.
   * @public
   * @abstract
   * @returns {this} Returns `this` current instance.
   */
  public abstract destroy(): AsyncReturn<R, this>;

  /**
   * @description Gets the value either asynchronously or synchronously based on the `Async` generic type variable.
   * @public
   * @abstract
   * @returns {AsyncReturn<R, T>} 
   */
  public abstract getValue(): AsyncReturn<R, T>;

  /**
   * @inheritdoc
   * @public
   * @returns {this} 
   */
  public override lock(): this {
    return Immutability.deepFreeze(this.value),
      super.lock(),
      this;
  }

  /**
   * @description Sets the value of `T` in arbitrary parameter array.
   * @public
   * @abstract
   * @template {unknown[]} V The type of the values array.
   * @param {...V} values The arbitrary values array of type `V`.
   * @returns {AsyncReturn<R, this>} 
   */
  public abstract setValue<V extends unknown[]>(...values: V): AsyncReturn<R, this>;

  /**
   * @description Sets the value of `T` in arbitrary parameter.
   * @public
   * @abstract
   * @param {...T[]} value Arbitrary number of values of type `T`.
   * @returns {AsyncReturn<R, this>} 
   */
  public abstract setValue(...value: T[]): AsyncReturn<R, this>;

  /**
   * @description Sets the data value. Ensure `super.validate()` is called before invoking this method.
   * @public
   * @abstract
   * @param {T} value The data value of `T` to set.
   * @returns {AsyncReturn<R, this>} Returns `this` current instance.
   */
  public abstract setValue(value: T): AsyncReturn<R, this>;

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
   * @param {AsyncReturn<R, A>} result The result of the adapter operation.
   * @returns {AsyncReturn<R, this>} The `this` current instance.
   */
  protected returnThis<A>(result: AsyncReturn<R, A>): AsyncReturn<R, this> {
    if (this.async) {
      return (result instanceof Promise
        ? result.then(() => this)
        : this
      ) as AsyncReturn<R, this>;
    }
    return this as AsyncReturn<R, this>;
  }
}
