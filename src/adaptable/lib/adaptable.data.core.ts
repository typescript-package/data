// Class.
import { Data } from "../../lib/data.class";
// Type & Interface.
import { InferAsync } from "@typedly/data";
import { DataAdapterConstructor, DataAdapterShape } from "@typedly/data-adapter";
import { AdaptableDataShape } from "@typedly/adaptable-data";
/**
 * @description The core abstract implementation of the `AdaptableData` class, providing the basic structure and functionality for managing data with adaptable behavior.
 * @export
 * @abstract
 * @class AdaptableDataCore
 * @template {DataAdapterShape<T, S> | undefined} [A=undefined] 
 * @template [T=unknown] 
 * @template {boolean} [S=InferAsync<A>] 
 * @template {readonly unknown[]} [G=[]] 
 * @template {new (...args: any[]) => A} [AC=DataAdapterConstructor<A, T, S, G>] 
 * @extends {Data<T, S>}
 * @implements {AdaptableDataShape<A, T, S>}
 */
export abstract class AdaptableDataCore<
  A extends DataAdapterShape<T, S> | undefined = undefined,
  T = unknown,
  S extends boolean = InferAsync<A>,
  G extends readonly unknown[] = [],
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  AC extends new (...args: any[]) => A = DataAdapterConstructor<A, T, S, G>
> extends Data<T, S>
  implements AdaptableDataShape<A, T, S> {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  static adapter?: DataAdapterConstructor<any, any, any, any>;
  abstract get adapter(): A;
  protected abstract instantiateAdapter(adapter: AC, value?: T, ...args: G): A;
}