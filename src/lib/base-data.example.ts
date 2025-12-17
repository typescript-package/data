import { DataAdapter } from "@typedly/data";
import { BaseData } from "./base-data.abstract";

// Create example classes extending `BaseData`.
export class TestBaseData<
  T,
  G extends unknown[] = unknown[],
  R extends boolean = false,
  A extends DataAdapter<T, R> | undefined = undefined,
  // C extends {new (...args: G): DataAdapter<T, R>} = {new (...args: G): DataAdapter<T, R>},
> extends BaseData<
  T,
  G,
  R,
  A
  // InstanceType<C>
> {
  constructor(
    async: R,
    value: T,
    // adapter: C,
    adapter: {new (value: T, ...args: G): A} | undefined,
    ...args: G
  ) {
    super(
      async,
      value,
      // adapter as unknown as new (value: T, ...args: G) => InstanceType<C>,
      adapter,
      ...args
    );
  }
}

// Create the adapter implementation of `DataAdapter` interface.
export class SetAdapter<E, T extends Set<E>> implements DataAdapter<T, false> {
  #value: T;
  constructor(value?: Iterable<E>) {
    this.#value = new Set(value) as T;
  }
  newMethod() {}
  clear(): this { return this; }
  destroy(): this { return this; }
  lock(): this { return this; }
  set(value: T): this { this.#value = value; return this; }
  get value(): T {
    return this.#value;
  }
}

// const setData: TestBaseData<Set<string>, [], false, DataAdapter<Set<string>, false> | undefined>
const setData = new TestBaseData(false, new Set('a'), SetAdapter);

// Call new method.
setData.adapter?.newMethod();

// SetAdapter<unknown, Set<unknown>> | undefined
setData.adapter

// Create another adapter implementation of `DataAdapter` interface.
export class CollectionAdapter<E, T = Set<E>, G extends E[] = E[]> implements DataAdapter<T> {
  #value: T;
  constructor(...elements: G) {
    this.#value = new Set(elements) as T;
  }
  clear(): this { return this; }
  destroy(): this { return this; }
  lock(): this { return this; }
  set(value: T): this { this.#value = value; return this; }
  get value(): T {
    return this.#value;
  }
}

// Create a new instance of `CollectionAdapter`.
const collectionData = new TestBaseData(
  false,
  new Set([1, 2, 3]),
  CollectionAdapter,
  1, 2, 3
);

// DataAdapter<Set<number>, false> | undefined
collectionData.adapter
