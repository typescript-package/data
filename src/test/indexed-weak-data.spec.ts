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
