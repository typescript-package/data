import { Data, DataMap } from "../public-api";

// // Create custom `Map`.
// export class CustomMap<Key, Value> extends Map<Key, Value> {
//   public onSet(callbackFn: (key: Key, value: Value) => void) {
//     this.onSetFn = callbackFn;
//     return this;
//   }
//   public override set(key: Key, value: Value): this {
//     this.onSetFn?.(key, value), super.set(key, value);
//     return this;
//   }
//   private onSetFn?: (key: Key, value: Value) => void;
// }

// // Use the custom `Map` with the `Data`.
// export class CustomMapData<Key, Value> extends Data<CustomMap<Key, Value>> {
//   constructor(value: CustomMap<Key, Value>) {
//     super(value);
//   }
//   public onSet(callbackFn: (key: Key, value: Value) => void) {
//     super.value.onSet(callbackFn);
//     return this;
//   }
// };

// // Create the class with the use of `DataMap` and `CustomMapData` to store the customized `Map`.
// export class CustomDataMap<Key, Value> extends DataMap<Key, Value, CustomMapData<Key, Value>> {
//   constructor(entries?: [Key, Value][]) {
//     super(entries, new CustomMapData(new CustomMap(entries)));
//   }
//   public onSet(callbackFn: (key: Key, value: Value) => void) {
//     this.data.onSet(callbackFn);
//     return this;
//   }
// }

// // Initialize.
// export const customDataMap = new CustomDataMap([['a', 'b']]);

// // Set the callback.
// customDataMap.onSet((key, value) => console.log(`key`, key, `value`, value));

// // Set the value to check the `onSet` callback.
// customDataMap.set('a', 'c');


// // export const dataMap = new DataMap([['a', 'b']]);

// // console.group(`DataMap`);

// // console.debug(`dataMap`, dataMap);
// // console.debug(``, dataMap.);


// // console.groupEnd();






// Define a `DataCore` implementation for holding a data in `DataMap`.
export class CustomMapData<Key, Value> extends Data<Map<Key, Value>> {
  constructor(initialValue?: Map<Key, Value>) {
    super(initialValue ?? new Map());
  }
}

// Create a new `DataMap` instance with predefined entries and customized data holder.
export const dataMap = new DataMap<string, number, CustomMapData<string, number>>(
  [
    ["one", 1],
    ["two", 2],
    ["three", 3],
  ],
  new CustomMapData()
);

console.group(`DataMap`);

// Check the `CustomMapData`.
console.log(`Data holder of \`CustomMapData\`:`, dataMap.data); // Output: CustomMapData {#locked: false, #value: Value}

// Get the `CustomMapData` value.
console.log(`Data holder of \`CustomMapData\` value:`, dataMap.data.value); // Output: Map(3) {'one' => 1, 'two' => 2, 'three' => 3}

// Log the size of the map
console.log("Size:", dataMap.size); // Output: Size: 3

// Get a value from the map
console.log("Value for 'two':", dataMap.get("two")); // Output: Value for 'two': 2

// Check if a key exists
console.log("Has 'three'?", dataMap.has("three")); // Output: Has 'three'? true

// Set a new key-value pair
dataMap.set("four", 4);
console.log("Size after set:", dataMap.size); // Output: Size after set: 4

// Iterate over entries
dataMap.forEach((value, key) => console.log(`${key}: ${value}`));
// Output:
// one: 1
// two: 2
// three: 3
// four: 4

// Delete an entry
dataMap.delete("one");
console.log("Size after delete:", dataMap.size); // Output: Size after delete: 3

// Clear the map
dataMap.clear();
console.log("Size after clear:", dataMap.size); // Output: Size after clear: 0

console.groupEnd();
