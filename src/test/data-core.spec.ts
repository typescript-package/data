import { DataShape } from "@typedly/data";
import { DataCore } from "../lib";

// Test class.
class TestDataCore<T extends object> extends DataCore<T> implements DataShape<T>  {
  #value: T;

  constructor(value: T) {
    super();
    this.#value = value;
  }

  public override get value(): T {
    return this.#value;
  }

  public override clear(): this {
    this.#value = undefined as unknown as T;
    return this;
  }

  public override destroy(): this {
    this.clear();
    this.#value = null as unknown as T;
    return this;
  }

  public getValue(): T {
    return this.#value;
  }

  public setValue(value: T): this {
    super.validate(); // inherited method from Immutability
    this.#value = value;
    return this;
  }
}

describe('DataCore', () => {
  let instance: TestDataCore<object>;

  beforeEach(() => {
    instance = new TestDataCore({ foo: 'bar' } as object);
  });

  it('should have correct toStringTag', () => {
    expect(Object.prototype.toString.call(instance)).toBe('[object DataCore]');
  });

  it('should return the correct value', () => {
    expect(instance.value).toEqual({ foo: 'bar' });
  });

  it('should set a new value', () => {
    const newValue = { bar: 'baz' };
    instance.setValue(newValue);
    expect(instance.value).toEqual(newValue);
  });

  it('should clear the value (set to undefined)', () => {
    instance.clear();
    expect(instance.value).toBeUndefined();
  });

  it('should destroy the value (clear it)', () => {
    instance.destroy();
    expect(instance.value).toBeNull();
  });

  it('should deeply freeze the value on lock', () => {
    instance.lock();
    expect(Object.isFrozen(instance.value)).toBeTrue();
    expect(Object.isFrozen(instance)).toBeTrue();
  });
});

/*
  Selector.
*/
export class Selector<T> extends DataCore<T> {
  // ... existing code ...

  public get value(): T {
    return this.#value;
  }

  #value: T;

  constructor(...value: T[]) {
    super();
    this.#value = value[0];
  }

  public clear(): this {
    return this;
  }

  public destroy(): this {
    return this;
  }

  public getValue(): T {
    return this.#value;
  }

  // Implement the overload
  public setValue(...value: T[]): this {
    this.#value = value[0];
    return this;

  }
}

const selector = new Selector('1', '2', '3');
selector.setValue('2', '4', '5');

