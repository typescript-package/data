// Abstract.
import { CacheableData } from './cacheable.data.class';
// Interface & Type.
import type {
  // Type.
  AsyncReturn,
  // Interface.
  InferAsync
} from '@typedly/data';
import type { DataAdapterShape, DataAdapterConstructor } from '@typedly/data-adapter';
import type { CacheableDataSettings } from '../type';
/**
 * @description The abstract `AdaptableData` class extends `CacheableData` adding functionality for managing data value by adapter with arguments.
 * Designed to create data containers of `T` type managed by adapters that require constructor arguments.
 * @export
 * @abstract
 * @class AdaptableData
 * @template {CacheableDataSettings<T, R>} C The type of data settings.
 * @template T The type of data.
 * @template {unknown[]} [G=unknown[]] Arguments type for the adapter constructor.
 * @template {boolean} [R=false] Indicates if the adapter operations are asynchronous.
 * @template {DataAdapterShape<C, T, R> | undefined} [A=undefined] The adapter type.
 * @extends {CacheableData<C, T, R>}
 */
export abstract class AdaptableData<
  const C extends CacheableDataSettings<T, R>,
  T,
  G extends unknown[] = unknown[],
  R extends boolean = InferAsync<C>,
  A extends DataAdapterShape<C, T, R> | undefined = undefined,
> extends CacheableData<C, T, R> {
  /**
   * @description Returns the `string` tag representation of the `AdaptableData` class when used in `Object.prototype.toString.call(instance)`.
   * @public
   * @readonly
   * @type {string}
   */
  public override get [Symbol.toStringTag](): string {
    return this.configuration.tag ?? 'AdaptableData';
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
  public override get async(): R {
    return this.#adapter
      ? this.#adapter.async
      : super.async;
  }

  /**
   * @description Returns the privately stored value of generic type variable `T`.
   * @public
   * @readonly
   * @type {T}
   */
  public override get value(): T {
    return this.#adapter
      ? this.#adapter.value 
      : super.value;
  }

  /**
   * @description Optional privately stored adapter of type `A`.
   * @type {?A}
   */
  #adapter?: A;

  /**
   * Creates an instance of parent class.
   * @constructor
   * @param {C} settings Configurable data settings.
   * @param {?T} [value] Optional initial data value of generic type variable `T`.
   * @param {?DataAdapterConstructor<A, C, T, R, G>} [adapter] The adapter constructor.
   * @param {...G} args The arguments passed to the adapter constructor.
   */
  constructor(
    settings: C,
    value?: T,
    adapter?: DataAdapterConstructor<A, C, T, R, G>,
    ...args: G
  ) {
    super(settings, value);
    adapter && (this.#adapter = new adapter(settings, value, ...args))
  }

  /**
   * @description Clears the value to `undefined`.
   * @public
   * @returns {AsyncReturn<R, this>} The `this` current instance.
   */
  public override clear(): AsyncReturn<R, this> {
    return this.#adapter
      ? super.returnThis(this.#adapter.clear())
      : super.clear();
  }

  /**
   * @description Destroys the value by setting it to `null`.
   * @public
   * @returns {AsyncReturn<R, this>} The `this` current instance.
   */
  public override destroy(): AsyncReturn<R, this> {
    return this.#adapter
      ? super.returnThis(this.#adapter.destroy())
      : super.destroy();
  }

  /**
   * @description Gets the value either asynchronously or synchronously based on the `R` generic type variable.
   * @public
   * @returns {AsyncReturn<R, T>} 
   */
  public override getValue(): AsyncReturn<R, T> {
    return this.#adapter
      ? this.#adapter.getValue()
      : super.getValue();
  }

  /**
   * @description Sets the data value.
   * @public
   * @param {T} value The data value of `T` to set.
   * @returns {AsyncReturn<R, this>} The `this` current instance.
   */
  public override setValue(value: T): AsyncReturn<R, this> {
    return this.#adapter
      ? super.returnThis(this.#adapter.setValue(value))
      : super.setValue(value);
  }
}
