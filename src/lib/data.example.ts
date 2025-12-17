import { DataAdapter } from '@typedly/data';
import { Data } from './data.class';

export class TestAdapter<
  T = string,
  G extends unknown[] = unknown[]
> implements DataAdapter<T, false> {
  #value: T;
  constructor(value: T, ...args: G) {
    this.#value = value || '' as T;
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

// const data: Data<string, [], false, TestAdapter<string, []>>
const data = new Data(false, 'Initial value' as string, TestAdapter);

data.adapter?.newMethod();


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

setData.clear();
setData.adapter

