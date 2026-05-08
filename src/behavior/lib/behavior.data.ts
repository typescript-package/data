/* eslint-disable @typescript-eslint/no-explicit-any */
// Abstract.
import { DataBase } from '../../lib/data.base';
// Interface & Type.
import { BehaviorFactory } from '../type/behavior-factory.type';
import { DataBehaviorShape } from '../interface/data.behavior.shape';
// Type.
import { AsyncReturn } from '@typedly/data';
/**
 * @description
 * @export
 * @class BehaviorData
 * @template T 
 * @template {boolean} [S=false] 
 * @extends {DataBase<T, S>}
 */
export class BehaviorData<T, S extends boolean = false>
  extends DataBase<T, S> {
  public static override toStringTag: string = 'Data';
  public override get async(): S {
    return this.#behavior
      ? this.#behavior.async
      : false as S;
  }
  public override get value(): T {
    return this.#store.value;
  }
  override get [Symbol.toStringTag](): string {
    return (this.constructor as typeof BehaviorData).toStringTag;
  }

  /**
   * @description The behavior instance that defines the custom behavior for this data instance. If not provided, the data will use the default behavior defined in `DataBase`.
   * @type {?DataBehaviorShape<T, S>}
   */
  #behavior?: DataBehaviorShape<T, S>;

  /**
   * @description The current value of the data.
   * @type {T}
   */
  #store: {value: T};

  constructor(value?: T, behavior?: DataBehaviorShape<T, S>)
  constructor(value?: T, behaviorFactory?: BehaviorFactory<T, S>)
  constructor(value?: T, behaviorOrFactory?: DataBehaviorShape<T, S> | BehaviorFactory<T, S>) {
    super(value);
    this.#store = this.makeStore();
    this.#behavior = this.isBehaviorFactory(behaviorOrFactory) ? behaviorOrFactory(this.#store) : behaviorOrFactory;
    this.#behavior?.create?.(this.#store);
  }

  override clear(): AsyncReturn<S, this> {
    return this.#behavior
      ? this.returnThis(this.#behavior.clear(this.#store))
      : super.clear();
  }

  override destroy(): AsyncReturn<S, this> {
    return this.#behavior
      ? this.returnThis(this.#behavior.destroy(this.#store))
      : super.destroy();
  }

  override lock(): this {
    super.lock();
    return this;
  }

  override getValue(): AsyncReturn<S, T> {
    return this.#behavior
      ? this.#behavior.getValue(this.#store)
      : super.getValue() as AsyncReturn<S, T>;
  }

  override setValue(value: T): AsyncReturn<S, this> {
    return this.#behavior
      ? this.returnThis(this.#behavior.setValue(this.#store, value))
      : super.setValue(value);
  }

  protected isBehavior(behavior: unknown): behavior is DataBehaviorShape<T, S> {
    return (
      typeof behavior === 'object' &&
      behavior !== null &&
      'async' in behavior &&
      'getValue' in behavior &&
      'setValue' in behavior
    );
  }
  protected isBehaviorFactory(behavior: unknown): behavior is BehaviorFactory<T, S> {
    return typeof behavior === 'function';
  }

  protected makeStore(): { value: T } {
    const store = {} as { value: T };
    Object.defineProperty(store, 'value', {
      get: () => super.value,
      set: (newValue: T) => super.setValue(newValue),
      enumerable: true,
      configurable: false,
    });
    return store;
  }
}
