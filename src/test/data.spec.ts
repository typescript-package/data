import { Data } from "../lib";

// Example subclass of Data
class StringData extends Data<string> {
  constructor(value: string) {
    super(value);
  }
}

const data = new StringData("Hello, world!");

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

