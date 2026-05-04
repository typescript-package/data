// Abstract.
import { AsyncReturn } from '@typedly/data';
import { DataCore } from './data.core';
/**
 * @description The `Data` class is a concrete class that extends the `AdaptableData` abstract class for instantiate base functionality.
 * @public
 * @export
 * @class Data
 * @template {DataSettings<S> & CacheableSettings<T>} C The type of data settings.
 * @template T Type of the data value.
 * @template {unknown[]} [G=unknown[]] Arguments passed to the adapter class constructor, after the `value` parameter.
 * @template {boolean} [S=false] Indicates whether the data operations are asynchronous.
 * @template {DataAdapterShape<C, T, S> | undefined} [A=undefined] Adapter type extending `DataAdapter` for handling the data value.
 * @extends {AdaptableData<C, T, G, S, A>}
 */
export class Data<
  T,
  S extends boolean = false,
> extends DataCore<T, S> {
  /**
   * @inheritdoc
   * @public
   * @readonly
   * @type {string}
   */
  public static override toStringTag: string = 'Data';

  public get async(): S {
    return false as S;
  }

  public get value(): T {
    return this.#value;
  }

  #value: T;

  constructor(value?: T) {
    super();
    this.#value = value as T;
  }

  clear(): AsyncReturn<S, this> {
    if (this.async === false) {
      this.#value = undefined as T;
    }
    return this as AsyncReturn<S, this>;
  }

  destroy(): AsyncReturn<S, this> {
    if (this.async === false) {
      this.#value = null as T;
    }
    return this as AsyncReturn<S, this>;
  }

  override lock(): this {
    super.lock();
    return this;
  }

  getValue(): AsyncReturn<S, T> {
    return this.#value as AsyncReturn<S, T>;
  }

  setValue(value: T): AsyncReturn<S, this> {
    if (this.async === false) {
      this.#value = value;
    }
    return this as AsyncReturn<S, this>;
  }
}
