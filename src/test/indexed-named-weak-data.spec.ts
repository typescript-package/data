import { IndexedNamedWeakData } from "../lib";

export interface Profile {
  id: number,
  age: number;
  score: number;
}

export const profileData = new IndexedNamedWeakData({ a: 1, b: 2 }, 'a');

console.log(`a: `, profileData.getByIndex(1));




