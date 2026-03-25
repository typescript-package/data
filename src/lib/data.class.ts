// Abstract.
import { AdaptableData } from './adaptable.data.abstract';
// Interface & Type.
import { CacheableDataSettings } from '../type';
import { DataAdapterConstructor, DataAdapterShape } from '@typedly/data-adapter';
import { InferAsync } from '@typedly/data';
/**
 * @description The `Data` class is a concrete class that extends the `AdaptableData` abstract class for instantiate base functionality.
 * @public
 * @export
 * @class Data
 * @template {CacheableDataSettings<T, R>} C The type of data settings.
 * @template T Type of the data value.
 * @template {unknown[]} [G=unknown[]] Arguments passed to the adapter class constructor, after the `value` parameter.
 * @template {boolean} [R=false] Indicates whether the data operations are asynchronous.
 * @template {DataAdapterShape<C, T, R> | undefined} [A=undefined] Adapter type extending `DataAdapter` for handling the data value.
 * @extends {AdaptableData<C, T, G, R, A>}
 */
export class Data<
  const C extends CacheableDataSettings<T, R>,
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
   * @inheritdoc
   * @public
   * @readonly
   * @type {string}
   */
  public override get [Symbol.toStringTag](): string {
    return Data.toStringTag;
  }

  /**
   * Creates an instance of `Data`.
   * @constructor
   * @param {C} settings 
   * @param {?T} [value] 
   * @param {?DataAdapterConstructor<A, C, T, R, G>} [adapter] 
   * @param {...G} args 
   */
  constructor(
    settings: C,
    value?: T,
    adapter?: DataAdapterConstructor<A, C, T, R, G>,
    ...args: G
  ) {
    super(settings, value, adapter, ...args);
  }
}
