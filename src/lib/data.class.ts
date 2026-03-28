// Abstract.
import { AdaptableSettingsResolver } from '@typedly/adaptable-data';
import { AdaptableData } from './adaptable.data.abstract';
// Interface & Type.
import { CacheableSettings, DataSettings, InferAsync } from '@typedly/data';
import { DataAdapterConstructor, DataAdapterShape } from '@typedly/data-adapter';
/**
 * @description The `Data` class is a concrete class that extends the `AdaptableData` abstract class for instantiate base functionality.
 * @public
 * @export
 * @class Data
 * @template {DataSettings<R> & CacheableSettings<T>} C The type of data settings.
 * @template T Type of the data value.
 * @template {unknown[]} [G=unknown[]] Arguments passed to the adapter class constructor, after the `value` parameter.
 * @template {boolean} [R=false] Indicates whether the data operations are asynchronous.
 * @template {DataAdapterShape<C, T, R> | undefined} [A=undefined] Adapter type extending `DataAdapter` for handling the data value.
 * @extends {AdaptableData<C, T, G, R, A>}
 */
export class Data<
  const C extends DataSettings<R> & CacheableSettings<T>,
  T,
  G extends unknown[] = unknown[],
  R extends boolean = InferAsync<C>,
  A extends DataAdapterShape<C, T, R> | undefined = undefined,
> extends AdaptableData<C, T, G, R, A> {
  /**
   * @inheritdoc
   * @public
   * @readonly
   * @type {string}
   */
  public static override toStringTag: string = 'Data';

  /**
   * Creates an instance of `Data`.
   * @constructor
   * @param {AdaptableSettingsResolver<C, T, R, A>} settings Data settings.
   * @param {?T} [value] The initial value of the data.
   * @param {?DataAdapterConstructor<A, C, T, R, G>} [adapter] The adapter constructor for handling the data value.
   * @param {...G} args Additional arguments passed to the adapter constructor.
   */
  constructor(
    settings: AdaptableSettingsResolver<C, T, R, A>,
    value?: T,
    adapter?: DataAdapterConstructor<A, C, T, R, G>,
    ...args: G
  ) {
    super(settings, value, adapter, ...args);
  }
}
