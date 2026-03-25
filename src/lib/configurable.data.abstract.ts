// Abstract.
import { DataCore } from '.';
// Abstract.
import type { DataConfig, DataSettings } from '@typedly/data';
/**
 * @description The abstract `ConfigurableData` class extends `DataCore` adding functionality for managing value with configuration.
 * @export
 * @abstract
 * @class ConfigurableData
 * @template {DataSettings<R>} C The type of data settings.
 * @template T The type of data.
 * @template {boolean} [R=false] Indicates if the adapter operations are asynchronous.
 * @extends {DataCore<T, R>}
 */
export abstract class ConfigurableData<
  const C extends DataSettings<R>,
  T,
  R extends boolean = false,
> extends DataCore<T, R> {
  /**
   * @description Returns the `string` tag representation of the `ConfigurableData` class when used in `Object.prototype.toString.call(instance)`.
   * @public
   * @readonly
   * @type {string}
   */
  public override get [Symbol.toStringTag](): string {
    return this.#configuration?.tag ?? 'ConfigurableData';
  }

  /**
   * @description Indicates if the adapter operations are asynchronous.
   * @public
   * @readonly
   * @type {R}
   */
  public get async(): R {
    return this.#configuration?.async ?? false as R;
  }

  /**
   * @description Returns the data configuration settings of type `DataConfig<C, R>`, which includes the original settings and any additional configuration derived from them.
   * @public
   * @readonly
   * @type {DataConfig<C, R>}
   */
  public get configuration(): DataConfig<C, R> {
    return this.#configuration;
  }

  /**
   * @description Optional tag for the data instance, which can be used for categorization or debugging.
   * @type {?C}
   */
  #configuration: DataConfig<C, R>;

  /**
   * Creates an instance of parent class.
   * @constructor
   * @param {C} settings Configurable data settings.
   */
  constructor(settings: C) {
    super();
    this.#configuration = settings as DataConfig<C, R>;
  }
}
