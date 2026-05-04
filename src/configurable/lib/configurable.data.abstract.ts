// Abstract.
import { Data } from '../../lib/data.class';
// Interface & Type.
import type { ConfigurableDataShape } from '@typedly/configurable-data';
import type { DataConfig, DataSettings, InferAsync } from '@typedly/data';
/**
 * @description The base abstraction `ConfigurableData` class extends `Data` adding functionality for managing value with configuration.
 * @export
 * @abstract
 * @class ConfigurableData
 * @template {DataSettings<S>} C The type of data settings.
 * @template T The type of data.
 * @template {boolean} [S=InferAsync<C>] Indicates if the adapter operations are asynchronous.
 * @extends {Data<T, S>}
 */
export abstract class ConfigurableData<
  const C extends DataSettings<S> | undefined,
  T,
  S extends boolean = InferAsync<C>,
> extends Data<T, S>
  implements ConfigurableDataShape<C, T, S> {
  public static override toStringTag: string = 'ConfigurableData';

  /**
   * @description Returns the `string` tag representation of the `ConfigurableData` class when used in `Object.prototype.toString.call(instance)`.
   * @public
   * @readonly
   * @type {string}
   */
  public override get [Symbol.toStringTag](): string {
    return (this.#configuration && 'tag' in this.#configuration) ? this.#configuration.tag : ConfigurableData.toStringTag;
  }

  /**
   * @description Indicates if the adapter operations are asynchronous.
   * @public
   * @readonly
   * @type {S}
   */
  public override get async(): S {
    return this.#configuration && 'async' in this.#configuration ? this.#configuration.async : super.async;
  }

  /**
   * @description Returns the data configuration settings of type `DataConfig<C, R>`, which includes the original settings and any additional configuration derived from them.
   * @public
   * @readonly
   * @type {DataConfig<C, S>}
   */
  public get configuration(): DataConfig<C, S> | undefined {
    return this.#configuration;
  }

  /**
   * @description Privately stored data configuration of type `DataConfig<C, R>`, which includes the original settings and any additional configuration derived from them.
   * @type {DataConfig<C, S> | undefined}
   */
  #configuration?: DataConfig<C, S>;

  /**
   * Creates an instance of parent class.
   * @constructor
   * @param {C} [settings] Configurable data settings.
   * @param {T} [value] Initial value for the data.
   */
  constructor(settings?: C, value?: T) {
    super(value);
    this.#configuration = settings as DataConfig<C, S>;
  }
}
