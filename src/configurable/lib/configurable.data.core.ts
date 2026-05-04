// Abstract.
import { DataCore } from "../../lib/data.core";
// Type & Interface.
import { DataConfig, DataSettings, InferAsync } from "@typedly/data";
import { ConfigurableDataShape } from "@typedly/configurable-data";
/**
 * @description
 * @export
 * @abstract
 * @class ConfigurableDataCore
 * @template {DataSettings<S> | undefined} C 
 * @template T 
 * @template {boolean} [S=InferAsync<C>] 
 * @extends {DataCore<T, S>}
 * @implements {ConfigurableDataShape<C, T, S>}
 */
export abstract class ConfigurableDataCore<
  C extends DataSettings<S> | undefined,
  T,
  S extends boolean = InferAsync<C>,
> extends DataCore<T, S> implements ConfigurableDataShape<C, T, S> {
  abstract get configuration(): DataConfig<C, S> | undefined;
}