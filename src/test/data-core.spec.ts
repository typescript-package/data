import { DataCore } from "../lib";

// Test class.
class TestDataCore<T> extends DataCore<T> {
  #value: T;

  constructor(value: T) {
    super();
    this.#value = value;
  }

  public override get value(): T {
    return this.#value;
  }

  public override clear(): this {
    this.#value = null as unknown as T;
    return this;
  }

  public override destroy(): this {
    this.clear();
    return this;
  }

  public override set(value: T): this {
    super.validate(); // inherited method from Immutability
    this.#value = value;
    return this;
  }
}

describe('DataCore', () => {
  let instance: TestDataCore<any>;

  beforeEach(() => {
    instance = new TestDataCore({ foo: 'bar' });
  });

  it('should have correct toStringTag', () => {
    expect(Object.prototype.toString.call(instance)).toBe('[object DataCore]');
  });

  it('should return the correct value', () => {
    expect(instance.value).toEqual({ foo: 'bar' });
  });

  it('should set a new value', () => {
    const newValue = { bar: 'baz' };
    instance.set(newValue);
    expect(instance.value).toEqual(newValue);
  });

  it('should clear the value (set to null)', () => {
    instance.clear();
    expect(instance.value).toBeNull();
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
