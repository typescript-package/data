import { Value } from "../lib";

// Create a Value instance to hold a number
const numValue = new Value<number>(10);

console.group(`Value`);
console.log(numValue.value); // ➝ 10
console.log(numValue.tag);   // ➝ "Value"

// Update the stored number
numValue.set(42);

console.log(numValue.value); // ➝ 42
console.groupEnd();

describe('Value', () => {
  let instance: Value<any>;
  let initialValue: any;

  beforeEach(() => {
    initialValue = { key: 'value' };
    instance = new Value(initialValue);
  });

  it('should have correct toStringTag', () => {
    expect(Object.prototype.toString.call(instance)).toBe('[object Value]');
  });

  it('should return the correct tag', () => {
    expect(instance.tag).toBe('Value');
  });

  it('should return the correct initial value', () => {
    expect(instance.value).toEqual(initialValue);
  });

  it('should allow setting a new value using set()', () => {
    const newValue = { newKey: 'newValue' };
    instance.set(newValue);
    expect(instance.value).toEqual(newValue);
  });

  it('should store and update the value correctly', () => {
    const newValue = { anotherKey: 'newestValue' };
    instance.set(newValue);
    expect(instance.value).toEqual(newValue);
  });
});
