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


describe(`WeakData`, () => {
  let data = new StringWeakData("Hello, world!");
  beforeEach(() => data = new StringWeakData("Hello, world!"));

  it(`Initial value`, () => expect(data.value).toEqual("Hello, world!"));
});
