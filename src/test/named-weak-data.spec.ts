import { NamedWeakData } from "../lib";

// Define a class that extends NamedWeakData
export class ProfileData extends NamedWeakData<number, 'age' | 'score'> {}

// Create two instances with different names
const ageData = new ProfileData(25, 'age');
const scoreData = new ProfileData(90, 'score');

// Access the values stored in each instance using their respective names
console.log(ageData.value); // Outputs: 25
console.log(scoreData.value); // Outputs: 90

// You can also retrieve the data from another instance using the static method `getFrom`
console.log(NamedWeakData.getFrom(ageData, 'age')); // Outputs: 25
console.log(NamedWeakData.getFrom(scoreData, 'score')); // Outputs: 90

// Setting new values
ageData.set(30);
console.log(ageData.value); // Outputs: 30

// Destroy an instance and clear its stored data
ageData.destroy();
console.log(NamedWeakData.getFrom(ageData, 'age')); // Outputs: undefined

// Clear all stored values from the map
scoreData.clear();
console.log(NamedWeakData.getFrom(scoreData, 'score')); // Outputs: undefined
