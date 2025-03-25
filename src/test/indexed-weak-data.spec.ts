import { IndexedNamedWeakData } from "../lib";

export interface Profile {
  id: number,
  age: number;
  score: number;
}

export const profileData = new IndexedNamedWeakData({ id: 1, age: 27, score: 1200 } as Profile, 'id');

console.log(`a: `, profileData.getByIndex(1));

