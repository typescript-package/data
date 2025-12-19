import { DataAdapter } from '@typedly/data';
import { Data } from './data.class';

// Example subclass of Data
class StringData extends Data<string> {
  constructor(value: string) {
    super(false, value);
  }
}

const stringData = new StringData("Hello, world!");

// Access the current value
console.log(stringData.value); // ➝ Hello, world!

// Update the value
stringData.set("New value");
console.log(stringData.value); // ➝ New value

// Destroy the value
stringData.destroy();
console.log(stringData.value); // Throws error or undefined (based on how it's handled)


// Create the adapter implementation of `DataAdapter` interface.
export class RxDataAdapter<
  T = string,
  G extends unknown[] = unknown[]
> implements DataAdapter<T, false> {
  #onSet: (value: T) => T = (value: T) => value;
  #value: T;
  constructor(value: T, ...args: G) {
    this.#value = value || '' as T;
    console.log(args);
  }
  // New method specific to this reactive adapter.
  onSet(callbackfn: (value: T) => T): this { this.#onSet = callbackfn; return this; }
  clear(): this { return this; }
  destroy(): this { return this; }
  lock(): this { return this; }
  set(value: T): this { this.#value = this.#onSet(value); return this; }
  get value(): T {
    return this.#value;
  }
}

// const data: Data<string, [], false, TestAdapter<string, []>>
const data = new Data(false, 'Initial value' as string, RxDataAdapter);

data.adapter?.onSet(value => `Reactive: ${value}`);
data.set('New value'); // logs: 'Reactive: New value'

export class SetAdapter<
  E = string | number,
  T extends Set<E> = Set<E>,
  G extends unknown[] = unknown[]
> implements DataAdapter<T, false> {
  #value: T;
  constructor(value?: Iterable<E>, ...args: G) {
    this.#value = new Set(value) as T;
    console.log(args);
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

// const setData: Data<Set<string | number>, false, SetAdapter<string | number, Set<string | number>>>
const setData = new Data(false, new Set(['a', 1]), SetAdapter);

setData.adapter

// Create the Async adapter implementation of `DataAdapter` interface.
export class AsyncAdapter<
  T = string,
  G extends unknown[] = unknown[]
> implements DataAdapter<T, true> {
  #value: T;
  constructor(value: T, ...args: G) {
    this.#value = value || '' as T;
    console.log(args);
  }
  async ready(): Promise<T> { return Promise.resolve(this.#value); }
  async clear(): Promise<this> { return this; }
  async destroy(): Promise<this> { return this; }
  lock(): this { return this; }
  async set(value: T): Promise<this> { this.#value = value; return this; }
  get value(): T {
    return this.#value;
  }
}

// const asyncData: Data<string, [], true, AsyncAdapter<string, []>>
const asyncData = new Data(true, 'Initial async value' as string, AsyncAdapter);

asyncData.adapter?.ready().then(value => {
  console.log('Async value:', value);
});
