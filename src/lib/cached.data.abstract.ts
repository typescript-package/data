// Abstract.
import type {
  // Type.
  AsyncReturn,
  InferAsync,
  // Interface.
  DataSettings,
} from '@typedly/data';
import { ConfigurableData } from './configurable.data.abstract';
/**
 * @description The abstract `CacheableData` class extends `ConfigurableData` adding functionality for managing asynchronous data values.
 * Designed to create data containers of `T` type managed by caching mechanisms that may require constructor arguments.
 * @export
 * @abstract
 * @class CacheableData
 * @template {DataSettings<R>} C The type of data settings.
 * @template T The type of data.
 * @template {boolean} [R=InferAsync<C>] Indicates if the adapter operations are asynchronous.
 * @extends {ConfigurableData<C, T, R>}
 */
export abstract class CacheableData<
  const C extends DataSettings<R>,
  T,
  R extends boolean = InferAsync<C>,
> extends ConfigurableData<C, T, R> {
  /**
   * @description Returns the `string` tag representation of the `CacheableData` class when used in `Object.prototype.toString.call(instance)`.
   * @public
   * @readonly
   * @type {string}
   */
  public override get [Symbol.toStringTag](): string {
    return super.configuration.tag ?? 'CacheableData';
  }

  /**
   * @description Returns the privately stored value of generic type variable `T`.
   * @public
   * @readonly
   * @type {T}
   */
  public override get value(): T {
    return this.#value!;
  }

  /**
   * @description Privately stored value of type `T`.
   * @type {T}
   */
  #value?: T;

  /**
   * Creates an instance of `CacheableData`.
   * @constructor
   * @param {C} settings Configurable data settings.
   * @param {?T} [value] Optional initial data value of generic type variable `T`.
   */
  constructor(
    settings: C,
    value?: T,
  ) {
    super(settings);
    this.#value = value;
  }

  /**
   * @description Clears the value to `undefined`.
   * @public
   * @returns {AsyncReturn<R, this>} The `this` current instance.
   */
  public clear(): AsyncReturn<R, this> {
    if (super.async) {
      const { clearer } = super.configuration;
      if (!clearer) throw new Error('Asynchronous clearing is not supported without a clearer function in settings.');
      return clearer()?.then(() => (this.#value = undefined as unknown as T, this)) as AsyncReturn<R, this>;
    }
    return this.#value = undefined as unknown as T, this as AsyncReturn<R, this>;
  }

  /**
   * @description Destroys the value by setting it to `null`.
   * @public
   * @returns {AsyncReturn<R, this>} The `this` current instance.
   */
  public destroy(): AsyncReturn<R, this> {
    if (super.async) {
      const { destroyer } = super.configuration;
      if (!destroyer) throw new Error('Asynchronous destruction is not supported without a destroyer function in settings.');
      return destroyer()?.then(() => (this.#value = null as unknown as T, this)) as AsyncReturn<R, this>;
    }
    return (this.#value = null as unknown as T), this as AsyncReturn<R, this>;
  }

  /**
   * @description Gets the value either asynchronously or synchronously based on the `R` generic type variable.
   * @public
   * @returns {AsyncReturn<R, T>} 
   */
  public getValue(): AsyncReturn<R, T> {
    if (super.async) {
      const { fetcher } = super.configuration;
      if (!fetcher) throw new Error('Asynchronous value fetching is not supported without a fetcher function in settings.');
      return fetcher() as AsyncReturn<R, T>;
    }
    return this.#value as AsyncReturn<R, T>;
  }

  /**
   * @description Sets the data value.
   * @public
   * @param {T} value The data value of `T` to set.
   * @returns {AsyncReturn<R, this>} The `this` current instance.
   */
  public setValue(value: T): AsyncReturn<R, this> {
    super.validate();
    if (super.async) {
      const { updater } = super.configuration;
      if (!updater) throw new Error('Asynchronous value setting is not supported without an updater function in settings.');
      return updater(value)?.then(() => (this.#value = value, this)) as AsyncReturn<R, this>;
    }
    return (this.#value = value), this as AsyncReturn<R, this>;
  }
}
