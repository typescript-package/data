import { Data } from "../lib";

// Example subclass of Data
export class StringData extends Data<string> {
  constructor(value: string) {
    super(value);
  }
}

export const data = new StringData("Hello, world!");

// Access the current value
console.log(data.value); // Output: Hello, world!

// Update the value
data.set("New value");
console.log(data.value); // Output: New value

// Destroy the value
data.destroy();
try {
  data.value; // Throws error or undefined (based on how it's handled)
} catch(e) {
  console.log(e);
}

describe('Data', () => {
  let instance: Data<any>;

  beforeEach(() => {
    instance = new Data({ test: 'initial' });
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

  it('should clear the value (set to null)', () => {
    instance.clear();
    expect(instance.value).toBeNull();
  });

  it('should destroy the internal value reference', () => {
    instance.destroy();
    // After destroy, instance.value will likely throw or be undefined.
    expect(() => instance.value).toThrowError();
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
