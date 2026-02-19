// Abstract.
import { DataCore } from './data-core.abstract';
import {
  // Type.
  AsyncReturn,
  // Interface.
  DataAdapter
} from '@typedly/data';
/**
 * @description The abstract `AdapterData` class extends `DataCore` adding functionality for managing data value by adapter with arguments.
 * Designed to create data containers of `T` type managed by adapters that require constructor arguments.
 * @export
 * @abstract
 * @class AdapterData
 * @template T 
 * @template {unknown[]} [G=unknown[]] Arguments type for the adapter constructor.
 * @template {boolean} [R=false] Indicates if the adapter operations are asynchronous.
 * @template {DataAdapter<T, R> | undefined} [A=DataAdapter<T, R>] The adapter type.
 * @extends {DataCore<T, R>}
 */
export abstract class AdapterData<
  T,
  G extends unknown[] = unknown[],
  R extends boolean = false,
  A extends DataAdapter<T, R> | undefined = DataAdapter<T, R>,
> extends DataCore<T, R> {
  /**
   * @description Returns the `string` tag representation of the `BaseData` class when used in `Object.prototype.toString.call(instance)`.
   * @public
   * @readonly
   * @type {string}
   */
  public override get [Symbol.toStringTag](): string {
    return AdapterData.toStringTag;
  }

  /**
   * @description The underlying adapter to handle the data value.
   * @public
   * @readonly
   * @type {(A | undefined)}
   */
  public get adapter(): A | undefined {
    return this.#adapter;
  }

  /**
   * @description Indicates if the adapter operations are asynchronous.
   * @public
   * @readonly
   * @type {R}
   */
  public get async(): R {
    return this.#async;
  }

  /**
   * @description Returns the privately stored value of generic type variable `T`.
   * @public
   * @readonly
   * @type {T}
   */
  public get value(): T {
    return this.#adapter
      ? this.#adapter.value
      : undefined as T;
  }

  /**
   * @description Optional privately stored adapter of type `A`.
   * @type {?A}
   */
  #adapter?: A;

  /**
   * @description Indicates if the adapter operations are asynchronous.
   * @type {R}
   */
  #async: R;
  
  /**
   * Creates an instance of `AdapterData`.
   * @constructor
   * @param {R} async Async switch for the adapter operations.
   * @param {?{new (...args: G): A}} [adapter] The adapter constructor.
   * @param {...G} args The arguments passed to the adapter constructor.
   */
  constructor(
    async: R,
    adapter?: {new (...args: G): A},
    ...args: G
  ) {
    super();
    adapter && (this.#adapter = new adapter(...args));
    this.#async = async ?? false as R;
  }

  /**
   * @description Clears the value to `undefined`.
   * @public
   * @returns {AsyncReturn<R, this>} The `this` current instance.
   */
  public clear(): AsyncReturn<R, this> {
    return this.returnThis(
      this.#adapter
        ? this.#adapter.clear() as AsyncReturn<R, A>
        : this
    );
  }

  /**
   * @description Destroys the value by setting it to `null`.
   * @public
   * @returns {AsyncReturn<R, this>} The `this` current instance.
   */
  public destroy(): AsyncReturn<R, this> {
    return this.returnThis(this.#adapter
        ? this.#adapter.destroy() as AsyncReturn<R, A>
        : this
      );
  }

  /**
   * @description Gets the value either asynchronously or synchronously based on the `R` generic type variable.
   * @public
   * @returns {AsyncReturn<R, T>} 
   */
  public getValue(): AsyncReturn<R, T> {
    return this.#adapter
      ? this.#adapter.getValue()
      : (this.#async
        ? Promise.resolve(this.value)
        : this.value
      ) as AsyncReturn<R, T>;
  }

  /**
   * @description Sets the data value.
   * @public
   * @param {T} value The data value of `T` to set.
   * @returns {AsyncReturn<R, this>} The `this` current instance.
   */
  public setValue(value: T): AsyncReturn<R, this> {
    return super.validate(),
      this.returnThis(
        this.#adapter
          ? this.#adapter.setValue(value) as AsyncReturn<R, A>
          : this
      );
  }

  /**
   * @description The helper method to return conditional `this` based on async type `R`, and returned `result` of adapter.
   * @param {AsyncReturn<R, A> | this} result The result of the adapter operation if provided, or `this`.
   * @returns {AsyncReturn<R, this>} The `this` current instance.
   */
  protected returnThis(result: AsyncReturn<R, A> | this): AsyncReturn<R, this> {
    return (result instanceof Promise
        ? result.then(() => this)
        : this.#async ? Promise.resolve(this) : this
      ) as AsyncReturn<R, this>;
  }
}
