import { DataAdapter } from "@typedly/data";
import { AdapterData } from "./adapter-data.abstract";

// Create example classes extending AdapterData
export class AnyCollectionData<
  T,
  E = unknown,
  R extends boolean = false,
  A extends DataAdapter<T, R> | undefined = DataAdapter<T, R>,
> extends AdapterData<T, E[], R, A> {
  constructor(async: R, adapter: {new (...args: E[]): A},  ...elements: E[]) {
    super(async, adapter, ...elements);
  }
}

// Create the adapter implementation of `DataAdapter` interface.
export class AnyCollectionAdapter<T> implements DataAdapter<Set<T>> {
  #value: Set<T>;
  constructor(...elements: T[]) {
    this.#value = new Set(elements) as Set<T>;
  }
  clear(): this { return this; }
  destroy(): this { return this; }
  lock(): this { return this; }
  setValue(value: Set<T>): this { this.#value = value; return this; }
  getValue(): Set<T> { return this.#value; }
  get value(): Set<T> {
    return this.#value;
  }
}

// Create an instance of `AnyCollectionData`.
// const anyCollectionData: AnyCollectionData<unknown, number, false, AnyCollectionAdapter<number>>
const anyCollectionData = new AnyCollectionData(false, AnyCollectionAdapter, 1, 2, 3);

anyCollectionData.adapter;

// Another example class extending `AdapterData` but of specific `Set` type.
export class SetCollectionData<
  T,
  G extends T[] = T[],
  R extends boolean = false,
  A extends DataAdapter<Set<T>, R> | undefined = DataAdapter<Set<T>, R>,
> extends AdapterData<Set<T>, G, R, A> {
  constructor(async: R, adapter: {new (...args: G): A},  ...elements: G) {
    super(async, adapter, ...elements);
  }
}

// Create the adapter implementation of `DataAdapter` interface for `Set` type.
export class SetCollectionAdapter<T> implements DataAdapter<Set<T>> {
  #value: Set<T>;
  constructor(...elements: T[]) {
    this.#value = new Set(elements) as Set<T>;
  }
  clear(): this { return this; }
  destroy(): this { return this; }
  lock(): this { return this; }
  setValue(value: Set<T>): this { this.#value = value; return this; }
  getValue(): Set<T> { return this.#value; }
  get value(): Set<T> {
    return this.#value;
  }
}

// Create a new instance of `SetCollectionData`.
// const collectionData: CollectionData<unknown, [number, number, number], false, SetCollectionAdapter<number>>
const setCollectionData = new SetCollectionData(false, SetCollectionAdapter, 1, 2, 3);

// SetCollectionAdapter<number> | undefined
setCollectionData.adapter;
