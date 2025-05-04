import { ImmutableData } from "../lib/immutable-data.class";

const immutableData = new ImmutableData(['a', 1, false]);

console.group(`ImmutableData`);

console.debug(`immutableData: `, immutableData);

console.groupEnd();


describe('ImmutableData', () => {
  let instance: ImmutableData<any>;
  let initialValue: any;

  beforeEach(() => {
    initialValue = { test: 'immutable' };
    instance = new ImmutableData(initialValue);
  });

  it('should have correct toStringTag', () => {
    expect(Object.prototype.toString.call(instance)).toBe('[object ImmutableData]');
  });

  it('should return the correct initial value', () => {
    expect(instance.value).toEqual(initialValue);
  });

  it('should deep freeze the initial value upon creation', () => {
    const frozenValue = instance.value;
    
    // Check that the value is frozen
    expect(Object.isFrozen(frozenValue)).toBe(true);
    // Ensure deeply nested values are also frozen
    expect(Object.isFrozen(frozenValue['test'])).toBe(true);
  });

  it('should not allow modification of the value directly after creation', () => {
    const frozenValue = instance.value;
    
    // Try to modify the value directly
    expect(() => {
      (instance as any).value.test = 'modified'; // TypeScript will throw in strict mode
    }).toThrowError(); // Expect an error for trying to mutate the frozen object
    
    expect(instance.value).toEqual(frozenValue); // Value should remain unchanged
  });

  it('should deep freeze new value when set', () => {
    const newValue = { test: 'new' };
    instance.set(newValue);
    
    const frozenValue = instance.value;
    
    // Check that the new value is deep-frozen
    expect(Object.isFrozen(frozenValue)).toBe(true);
    expect(Object.isFrozen(frozenValue['test'])).toBe(true);
  });

  it('should not allow modification of the value after calling set()', () => {
    const newValue = { test: 'new' };
    instance.set(newValue);
    
    const frozenValue = instance.value;
    
    // Try to modify the frozen value
    expect(() => {
      (instance as any).value.test = 'modified'; // TypeScript will throw in strict mode
    }).toThrowError(); // Expect an error for trying to mutate the frozen object
    
    // Ensure the value remains the same
    expect(instance.value).toEqual(frozenValue);
  });

  it('should clear the value (set to null)', () => {
    instance.clear();
    expect(instance.value).toBeNull();
  });

  it('should destroy the internal value reference', () => {
    instance.destroy();
    // After destroy, the instance's value will likely throw or be undefined.
    expect(() => instance.value).toThrowError();
  });

  it('should return itself after set, clear, destroy', () => {
    const newValue = { x: 1 };
    expect(instance.set(newValue)).toBe(instance);
    expect(instance.clear()).toBe(instance);
    expect(instance.destroy()).toBe(instance);
  });
});
