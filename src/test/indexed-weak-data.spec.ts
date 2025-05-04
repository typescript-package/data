import { IndexedWeakData } from "../lib";

// Create an interface.
export interface Profile {
  id: number,
  age: number;
  score: number;
}

// Initialize multiple instances of `IndexedWeakData`.
export const profileData1 = new IndexedWeakData({ id: 1, age: 27, score: 1100 } as Profile, 'id');
export const profileData2 = new IndexedWeakData({ id: 2, age: 127, score: 1200 } as Profile, 'id');
export const profileData3 = new IndexedWeakData({ id: 3, age: 227, score: 1300 } as Profile, 'id');
export const profileData4 = new IndexedWeakData({ id: 4, age: 327, score: 1400 } as Profile, 'id');

// Get the value by using index.
console.log(`profileData1: `, profileData1.getByIndex(1)); // Output: {id: 1, age: 27, score: 1100}
console.log(`profileData3: `, profileData3.getByIndex(3)); // Output: {id: 3, age: 227, score: 1300}

describe('IndexedWeakData', () => {
  interface TestObject { myKey: PropertyKey };
  let instance: IndexedWeakData<TestObject, 'myKey'>;
  let obj: TestObject;
  let key: 'myKey';
  let myKey = 42;
  
  beforeEach(() => {
    obj = { myKey };
    key = 'myKey';
    instance = new IndexedWeakData(obj, key);
  });

  it('should have the correct index after initialization', () => {
    expect(instance.index).toBe(myKey);  // Ensure that the index is correctly assigned.
  });

  it('should throw an error if key is not associated with a number', () => {
    const invalidObj = { myKey: 'notANumber' };
    expect(() => new IndexedWeakData(invalidObj, 'myKey')).toThrowError('Key must be associated with `number` type value in `object`.');
  });

  it('should store instance in the static registry on creation', () => {
    expect(IndexedWeakData.getByIndex(myKey)).toBeInstanceOf(Object);
  });

  it('should retrieve the object by index from static registry', () => {
    const retrievedObject = IndexedWeakData.getByIndex(myKey);
    expect(retrievedObject).toBe(obj);
    expect(retrievedObject).toEqual(obj);
  });

  it('should return undefined if index does not exist in registry', () => {
    expect(IndexedWeakData.getByIndex(99)).toBeUndefined();
  });

  it('should clear registry when destroy is called', () => {
    instance.destroy();
    expect(IndexedWeakData.getByIndex(myKey)).toBeUndefined();
  });

  it('should retrieve the object by index from instance method', () => {
    const retrievedObject = instance.getByIndex(myKey);
    expect(retrievedObject).toBe(obj);
    expect(retrievedObject).toEqual(obj);
  });

  // it('should delete instance from registry when it is garbage collected', (done) => {
  //   const index = myKey;
  //   let testInstance: IndexedWeakData<any, string> | null = new IndexedWeakData({ myKey: index }, 'myKey');
  
  //   // Drop strong reference
  //   testInstance = null;
  
  //   // Force GC and wait — not guaranteed in real test, but we'll simulate
  //   setTimeout(() => {
  //     const result = IndexedWeakData.getByIndex(index);
  //     expect(result).toBeUndefined();
  //     done();
  //   }, 300);
  // });  
});
