// Class.
import { Data } from "../../lib/data.class";
// Type & Interface.
import { InferAsync } from "@typedly/data";
import { DataAdapterConstructor, DataAdapterShape } from "@typedly/data-adapter";
import { AdaptableDataShape } from "@typedly/adaptable-data";

export abstract class AdaptableDataCore<
  A extends DataAdapterShape<T, S> | undefined = undefined,
  T = unknown,
  S extends boolean = InferAsync<A>,
  G extends readonly unknown[] = [],
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  AC extends new (...args: any[]) => A = DataAdapterConstructor<A, T, S, G>
> extends Data<T, S>
  implements AdaptableDataShape<A, T, S> {
  abstract get adapter(): A;
  protected abstract instantiateAdapter(adapter: AC, value?: T, ...args: G): A;
}