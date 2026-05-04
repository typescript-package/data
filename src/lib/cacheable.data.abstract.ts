// Abstract.
import { ConfigurableData } from '../configurable/lib/configurable.data.abstract';
// Interface & Type.
import type { AsyncReturn, CacheableSettings, DataSettings, InferAsync } from '@typedly/data';
/**
 * @description The abstract `CacheableData` class extends `ConfigurableData` adding functionality for managing asynchronous data values.
 * Designed to create data containers of `T` type managed by caching mechanisms that may require constructor arguments.
 * @export
 * @abstract
 * @class CacheableData
 * @template {DataSettings<S> & CacheableSettings<T>} C The type of data settings.
 * @template T The type of data.
 * @template {boolean} [S=InferAsync<C>] Indicates if the adapter operations are asynchronous.
 * @extends {ConfigurableData<C, T, S>}
 */
export abstract class CacheableData<
  const C extends DataSettings<S> & CacheableSettings<T>,
  T,
  S extends boolean = InferAsync<C>,
> extends ConfigurableData<C, T, S> {
  /**
   * @description Returns the `string` tag representation of the `CacheableData` class when used in `Object.prototype.toString.call(instance)`.
   * @public
   * @readonly
   * @type {string}
   */
  public override get [Symbol.toStringTag]() {
    return super.configuration?.tag ? super.configuration.tag : super.tag!;
  }

  /**
   * Creates an instance of `CacheableData`.
   * @constructor
   * @param {?C} [settings] Configurable data settings.
   * @param {?T} [value] Optional initial data value of generic type variable `T`.
   */
  constructor(
    settings?: C,
    value?: T,
  ) {
    super(settings, value);
  }

  /**
   * @description Clears the value to `undefined`.
   * @public
   * @returns {AsyncReturn<S, this>} The `this` current instance.
   */
  public override clear(): AsyncReturn<S, this> {
    if (super.async) {
      const config = this.configuration;
      const clearer = config && 'clearer' in config && typeof (config as { clearer?: () => Promise<void> }).clearer === 'function' ? (config as { clearer?: () => Promise<void> }).clearer : undefined;
      if (!clearer) throw new Error('Asynchronous clearing is not supported without a clearer function in settings.');
      return clearer()?.then(() => (super.clear(), this)) as AsyncReturn<S, this>;
    }
    return super.clear();
  }

  /**
   * @description Destroys the value by setting it to `null`.
   * @public
   * @returns {AsyncReturn<S, this>} The `this` current instance.
   */
  public override destroy(): AsyncReturn<S, this> {
    if (super.async) {
      const config = this.configuration;
      const destroyer = config && 'destroyer' in config && typeof (config as { destroyer?: () => Promise<void> }).destroyer === 'function' ? (config as { destroyer?: () => Promise<void> }).destroyer : undefined;
      if (!destroyer) throw new Error('Asynchronous destruction is not supported without a destroyer function in settings.');
      return destroyer()?.then(() => (super.destroy(), this)) as AsyncReturn<S, this>;
    }
    return super.destroy();
  }

  /**
   * @description Gets the value either asynchronously or synchronously based on the `R` generic type variable.
   * @public
   * @returns {AsyncReturn<S, T>} 
   */
  public override getValue(): AsyncReturn<S, T> {
    if (super.async) {
      const config = this.configuration;
      const fetcher = config && 'fetcher' in config && typeof (config as { fetcher?: () => Promise<T> }).fetcher === 'function' ? (config as { fetcher?: () => Promise<T> }).fetcher : undefined;
      if (!fetcher) throw new Error('Asynchronous value fetching is not supported without a fetcher function in settings.');
      return fetcher() as AsyncReturn<S, T>;
    }
    return super.getValue();
  }

  /**
   * @description Sets the data value.
   * @public
   * @param {T} value The data value of `T` to set.
   * @returns {AsyncReturn<S, this>} The `this` current instance.
   */
  public override setValue(value: T): AsyncReturn<S, this> {
    super.validate();
    if (super.async) {
      const config = this.configuration;
      const updater = config && 'updater' in config && typeof (config as { updater?: (value: T) => Promise<void> }).updater === 'function' ? (config as { updater?: (value: T) => Promise<void> }).updater : undefined;
      if (!updater) throw new Error('Asynchronous value setting is not supported without an updater function in settings.');
      return updater(value)?.then(() => (super.setValue(value), this)) as AsyncReturn<S, this>;
    }
    return super.setValue(value);
  }
}
