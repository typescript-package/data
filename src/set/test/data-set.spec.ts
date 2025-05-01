import { Data, SymbolValue } from '../../lib';
import { DataSet } from "../lib";

// Define a `DataCore` implementation for holding a data in `DataSet`.
export class CustomSetData<Type> extends Data<Set<Type>> {
  constructor(initialValue?: Set<Type>, ...args: any[]) {
    super(initialValue ?? new Set());
    console.log(`...args: any[]`, args);
  }
}

console.group(`DataSet`);

// Create a new `DataSet` instance with predefined entries and customized data holder.
export const dataSet = new DataSet
(
  [0, 27, 37, 47],
  [CustomSetData, 'a', 'b', 1]
);

console.debug(`dataSet`, dataSet);

// Check the `CustomSetData`.
console.log(`Data holder of \`CustomSetData\`:`, dataSet.data); // Output: CustomSetData {#locked: false, #value: Value}

// Log the size of the set
console.log("Size:", dataSet.size); // Output: Size: 4

// Check if a value exists
console.log("Has 27?", dataSet.has(27)); // Output: Has '27'? true

// Add a new value
dataSet.add(57);
console.log("Size after add:", dataSet.size); // Output: Size after add: 5

// Iterate over entries
dataSet.forEach(value => console.log(`${value}`));
// Output:
// 0
// 27
// 37
// 47
// 57

console.debug(`SymbolValue`, dataSet[SymbolValue]());

// Delete an entry
dataSet.delete(0);
console.log("Size after delete:", dataSet.size); // Output: Size after delete: 4

// Clear the set
dataSet.clear();
console.log("Size after clear:", dataSet.size); // Output: Size after clear: 0

console.groupEnd();
