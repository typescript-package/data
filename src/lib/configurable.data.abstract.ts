// Abstract.
import { DataCore } from './data.core';
// Interface & Type.
import type { ConfigurableDataShape } from '@typedly/configurable-data';
import type { DataConfig, DataSettings, InferAsync } from '@typedly/data';
/**
 * @description The abstract `ConfigurableData` class extends `DataCore` adding functionality for managing value with configuration.
 * @export
 * @abstract
 * @class ConfigurableData
 * @template {DataSettings<R>} C The type of data settings.
 * @template T The type of data.
 * @template {boolean} [R=InferAsync<C>] Indicates if the adapter operations are asynchronous.
 * @extends {DataCore<T, R>}
 */
export abstract class ConfigurableData<
  const C extends DataSettings<R>,
  T,
  R extends boolean = InferAsync<C>,
> extends DataCore<T, R>
  implements ConfigurableDataShape<C, T, R> {
  /**
   * @description Returns the `string` tag representation of the `ConfigurableData` class when used in `Object.prototype.toString.call(instance)`.
   * @public
   * @readonly
   * @type {string}
   */
  public override get [Symbol.toStringTag](): string {
    return this.#configuration?.tag ?? ConfigurableData.toStringTag;
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
  public get configuration(): DataConfig<C, R> | undefined {
    return this.#configuration;
  }

  /**
   * @description Privately stored data configuration of type `DataConfig<C, R>`, which includes the original settings and any additional configuration derived from them.
   * @type {DataConfig<C, R> | undefined}
   */
  #configuration?: DataConfig<C, R>;

  /**
   * Creates an instance of parent class.
   * @constructor
   * @param {C} [settings] Configurable data settings.
   */
  constructor(settings?: C) {
    super();
    this.#configuration = settings as DataConfig<C, R>;
  }
}
