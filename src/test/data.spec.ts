import { ValueShape } from "@typedly/data";
import { Data } from "../lib";

export class ProfileFullName<T extends string> extends String implements ValueShape<T> {
  value: T = 'Mark Twain' as T;
  constructor(value: T) {
    super(value);
  }
  set(value: T): this {
    return this.validate(value) && (this.value = value), this;
  }
  validate(value: T): boolean {
    return typeof value === 'string' && value.length > 0 && value.includes(' ');
  }
}


// Example subclass of Data
export class StringData<Value extends string> extends Data<Value> {
  constructor(value: Value) {
    super(value);
  }
}

export const data = new StringData("Hello, world!" as string);


console.group(`Value`);

// Data
console.debug(`data: `, data);

// Access the current value
console.debug(`data.value: `, data.value); // Output: Hello, world!

// The tag
console.debug(`data.tag:`, data.tag); // Output: Data

// Update the value
data.set("New value");
console.log(data.value); // Output: New value

// Destroy the value
data.destroy();
try {
  console.log(data.value); // Throws error or undefined (based on how it's handled)
} catch(e) {
  console.log(e);
}

console.groupEnd();


describe('Data', () => {
  let instance: Data<object>;

  beforeEach(() => {
    instance = new Data({ test: 'initial' } as object);
  });

  it('should have correct toStringTag', () => {
    expect(Object.prototype.toString.call(instance)).toBe('[object Data]');
  });

  it('should return the correct initial value', () => {
    expect(instance.value).toEqual({ test: 'initial' });
  });

  it('should set a new value', () => {
    const newValue = { updated: true };
    instance.set(newValue);
    expect(instance.value).toEqual(newValue);
  });

  it('should clear the value (set to undefined)', () => {
    instance.clear();
    expect(instance.value).toBeUndefined();
  });

  it('should destroy the internal value reference', () => {
    instance.destroy();
    // After destroy, instance.value will likely throw or be undefined.
    console.log(instance);
    expect(instance.value).toBeNull();
    instance.set({ updated: true });
    console.log(instance.set);
  });

  it('should return itself after set, clear, destroy', () => {
    const newValue = { x: 1 };
    expect(instance.set(newValue)).toBe(instance);
    expect(instance.clear()).toBe(instance);
    expect(instance.destroy()).toBe(instance);
  });
});

// Array.
// const t: readonly [number] = [27];
// new Data([22]).set(t).value; // The `Readonly` in the `set` method param `value` allows to set.

// Readonly<Type> constructor
// new Data([22]) // readonly [number]

// Type constructor
// new Data([22]) // number[]
