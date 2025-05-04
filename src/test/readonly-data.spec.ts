import { ReadonlyData } from "../lib";

describe('ReadonlyData', () => {
  let instance: ReadonlyData<any>;

  beforeEach(() => {
    instance = new ReadonlyData({ test: 'readonly' });
  });

  it('should have correct toStringTag', () => {
    expect(Object.prototype.toString.call(instance)).toBe('[object ReadonlyData]');
  });

  it('should return the correct initial value', () => {
    expect(instance.value).toEqual({ test: 'readonly' });
  });

  it('should not allow modification of the value directly', () => {
    // Check that the value cannot be changed
    const originalValue = instance.value;
    expect(() => {
      (instance as any).value = { test: 'modified' }; // TypeScript will throw in strict mode
    }).toThrowError(); // we expect it to throw an error when trying to modify the value.
    
    // Ensure the value stays the same
    expect(instance.value).toEqual(originalValue);
  });

  it('should allow set but keep it readonly', () => {
    const newValue = { readonly: true };
    instance.set(newValue);
    expect(instance.value).toEqual(newValue);

    // After calling set, the value should be effectively read-only.
    const originalValue = instance.value;
    expect(() => {
      (instance as any).value = { test: 'modified' }; // TypeScript will throw in strict mode
    }).toThrowError();

    // The value should remain the same
    expect(instance.value).toEqual(originalValue);
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
