import { WeakData } from '../lib';

// Example subclass of WeakData
export class StringWeakData extends WeakData<string> {
  constructor(value: string) {
    super(value);
  }
}

// Create a new instance of StringWeakData
export const data = new StringWeakData("Hello, world!");

// Access the current value
console.log(data.value); // Output: Hello, world!

// Update the value
data.set("New value");
console.log(data.value); // Output: New value

// Destroy the value
data.destroy();

export class ObjectWeakData<Type> extends WeakData<Type> {
  constructor(value: Type) {
    super(value);
  }
}

export const objectWeakData = new ObjectWeakData({
  name: 'Someone',
  surname: 'Surname'
});


objectWeakData.update((value => value));

describe('WeakData', () => {
  let instance: WeakData<any>;
  let initialValue: any;

  beforeEach(() => {
    initialValue = { key: 'value' };
    instance = new WeakData(initialValue);
  });

  it('should have correct toStringTag', () => {
    expect(Object.prototype.toString.call(instance)).toBe('[object WeakData]');
  });

  it('should return the correct initial value', () => {
    expect(instance.value).toEqual(initialValue);
  });

  it('should store the value in the static WeakMap', () => {
    const storedValue = WeakData.get(instance);  // Access the static WeakMap
    expect(storedValue).toEqual(initialValue);
  });

  it('should allow setting and updating the value', () => {
    const newValue = { newKey: 'newValue' };
    instance.set(newValue);
    expect(instance.value).toEqual(newValue);
    
    // Test the update method
    const updatedValue = { updatedKey: 'updatedValue' };
    instance.update(() => updatedValue);
    expect(instance.value).toEqual(updatedValue);
  });

  it('should clear the value and set it to null', () => {
    instance.clear();
    expect(instance.value).toBeNull();
  });

  it('should delete the value from the WeakMap', () => {
    instance.delete();
    expect(instance.value).toBeUndefined(); // Since it is deleted from WeakMap
  });

  it('should destroy the value', () => {
    instance.destroy();
    expect(instance.value).toBeUndefined();
  });

  it('should create a new instance with a new value using `with`', () => {
    const newValue = { newData: '123' };
    const newInstance = instance.with(newValue);
    expect(newInstance.value).toEqual(newValue);
  });

  it('should throw an error in update if callbackFn is not a function', () => {
    expect(() => instance.update('invalid' as any)).toThrowError("`callbackFn` must a function type.");
  });

  it('should check if the instance exists in the static WeakMap', () => {
    expect(WeakData.has(instance)).toBe(true);
    const newInstance = new WeakData({ someKey: 'someValue' });
    expect(WeakData.has(newInstance)).toBe(true);
  });

  it('should get the value from another instance using static `get`', () => {
    const newInstance = new WeakData({ otherKey: 'otherValue' });
    const fetchedValue = WeakData.get(newInstance);
    expect(fetchedValue).toEqual({ otherKey: 'otherValue' });
  });
});
