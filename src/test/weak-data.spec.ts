import { WeakData } from '../lib';

// Example subclass of WeakData
class StringWeakData extends WeakData<string> {
  constructor(value: string) {
    super(value);
  }
}

// Create a new instance of StringWeakData
const data1 = new StringWeakData("Hello, world!");

// Access the current value
console.log(data1.value); // Output: Hello, world!

// Update the value
data1.set("New value");
console.log(data1.value); // Output: New value

// Destroy the value
data1.destroy();