
<a href="https://www.typescriptlang.org/">
  <img
    src="https://avatars.githubusercontent.com/u/189666396?s=150&u=9d55b1eb4ce258974ead76bf07ccf49ef0eb0ea7&v=4"
    title="The typescript package enhances the development of typescript-based applications by providing well-structured, reusable, easy-to-use packages."
  />
</a>

## typescript-package/data

<!-- npm badge -->
[![npm version][typescript-package-npm-badge-svg]][typescript-package-npm-badge]
[![GitHub issues][typescript-package-badge-issues]][typescript-package-issues]
[![GitHub license][typescript-package-badge-license]][typescript-package-license]

A **TypeScript** library for simple managing data.

## Table of contents

- [Installation](#installation)
- [Api](#api)
  - [`Data`](#data)
  - [`DataCore`](#datacore)
  - [`Immutability`](#immutability)
  - [`NamedWeakData`](#namedweakdata)
  - [`Value`](#value)
  - [`WeakData`](#weakdata)
- [Immutability](#immutability)
  - [Sealed](#sealed)
  - [Frozen](#frozen)
  - [Locked](#locked)
- [Contributing](#contributing)
- [Support](#support)
- [Code of Conduct](#code-of-conduct)
- [Git](#git)
  - [Commit](#commit)
  - [Versioning](#versioning)
- [License](#license)

## Installation

```bash
npm install @typescript-package/data --save-peer
```

## Api

```typescript
import {
  // Abstract.
  Data,
  DataCore,
  Immutability,
  NamedWeakData,
  WeakData,

  // Class.
  Value
} from '@typescript-package/data';
```

### `Data`

The `Data` class is an abstract base class that wraps a value and provides methods for setting, retrieving, and destroying the value.

```typescript
import { Data } from '@typescript-package/data';

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
console.log(data.value); // Throws error or undefined (based on how it's handled)
```

### `DataCore`

The base abstraction for data-related classes.

### `Immutability`

Manages the immutability states of `this` current instance.

### `NamedWeakData`

```typescript
import { NamedWeakData } from '@typescript-package/data';

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

```

### `WeakData`

The `WeakData` class is an abstract base class that stores data in a static `WeakMap`.

```typescript
import { WeakData } from '@typescript-package/data';

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
```

### `Value`

The class to manage the value of generic type variable `Type`.

## Immutability

### Sealed

Provides structural immutability, but not value immutability. The least strict form of immutability.
Sealing an object prevents adding or removing properties, but it does not restrict modifying the values of existing properties.

### Frozen

Provides structural and shallow immutability. Stricter than seal.
Freezing an object prevents changes to the object’s properties at the top level. This means that you cannot modify, add, or delete properties, but nested objects can still be mutated.

### Locked

Combines the features of `freeze`, but extends immutability to nested structures(deep immutability).
Locking(deep) an object prevents changing any properties at any level, including properties within nested objects.

## Contributing

Your contributions are valued! If you'd like to contribute, please feel free to submit a pull request. Help is always appreciated.

## Support

If you find this package useful and would like to support its and general development, you can contribute through one of the following payment methods. Your support helps maintain the packages and continue adding new.

Support via:

- [Stripe](https://donate.stripe.com/dR614hfDZcJE3wAcMM)
- [Revolut](https://checkout.revolut.com/pay/048b10a3-0e10-42c8-a917-e3e9cb4c8e29)

Thanks for your support!

## Code of Conduct

By participating in this project, you agree to follow **[Code of Conduct](https://www.contributor-covenant.org/version/2/1/code_of_conduct/)**.

## GIT

### Commit

- [AngularJS Git Commit Message Conventions][git-commit-angular]
- [Karma Git Commit Msg][git-commit-karma]
- [Conventional Commits][git-commit-conventional]

### Versioning

[Semantic Versioning 2.0.0][git-semver]

**Given a version number MAJOR.MINOR.PATCH, increment the:**

- MAJOR version when you make incompatible API changes,
- MINOR version when you add functionality in a backwards-compatible manner, and
- PATCH version when you make backwards-compatible bug fixes.

Additional labels for pre-release and build metadata are available as extensions to the MAJOR.MINOR.PATCH format.

**FAQ**
How should I deal with revisions in the 0.y.z initial development phase?

> The simplest thing to do is start your initial development release at 0.1.0 and then increment the minor version for each subsequent release.

How do I know when to release 1.0.0?

> If your software is being used in production, it should probably already be 1.0.0. If you have a stable API on which users have come to depend, you should be 1.0.0. If you’re worrying a lot about backwards compatibility, you should probably already be 1.0.0.

## License

MIT © typescript-package ([license][typescript-package-license])

## Packages

- **[@typescript-package/affix](https://github.com/typescript-package/affix)**: A **lightweight TypeScript** library for the affix - prefix and suffix.
- **[@typescript-package/are](https://github.com/typescript-package/are)**: Type-safe `are` checkers for validating value types in TypeScript.
- **[@typescript-package/descriptor](https://github.com/typescript-package/descriptor)**: A **lightweight TypeScript** library for property descriptor.
- **[@typescript-package/guard](https://github.com/typescript-package/guard)**: Type-safe guards for guarding the value types in TypeScript.c
- **[@typescript-package/history](https://github.com/typescript-package/history)**: A **TypeScript** package for tracking history of values.
- **[@typescript-package/is](https://github.com/typescript-package/is)**: Type-safe is checkers for validating value types in TypeScript.
- **[@typescript-package/name](https://github.com/typescript-package/name)**: A **lightweight TypeScript** library for the name with prefix and suffix.
- **[@typescript-package/property](https://github.com/typescript-package/property)**: A **lightweight TypeScript** package with features to handle object properties.
- **[@typescript-package/queue](https://github.com/typescript-package/queue)**: A **lightweight TypeScript** library for managing various queue and stack structures.
- **[@typescript-package/range](https://github.com/typescript-package/range)**: A **lightweight TypeScript** library for managing various types of ranges.
- **[@typescript-package/regexp](https://github.com/typescript-package/regexp)**: A **lightweight TypeScript** library for **RegExp**.
- **[@typescript-package/state](https://github.com/typescript-package/state)**: Simple state management for different types in **TypeScript**.
- **[@typescript-package/type](https://github.com/typescript-package/type)**: Utility types to enhance and simplify **TypeScript** development.
- **[@typescript-package/wrapper](https://github.com/typescript-package/wrapper)**: A **lightweight TypeScript** library to wrap the text with the opening and closing chars.

<!-- This package: typescript-package  -->
  <!-- GitHub: badges -->
  [typescript-package-badge-issues]: https://img.shields.io/github/issues/typescript-package/data
  [isscript-package-badge-forks]: https://img.shields.io/github/forks/typescript-package/data
  [typescript-package-badge-stars]: https://img.shields.io/github/stars/typescript-package/data
  [typescript-package-badge-license]: https://img.shields.io/github/license/typescript-package/data
  <!-- GitHub: badges links -->
  [typescript-package-issues]: https://github.com/typescript-package/data/issues
  [typescript-package-forks]: https://github.com/typescript-package/data/network
  [typescript-package-license]: https://github.com/typescript-package/data/blob/master/LICENSE
  [typescript-package-stars]: https://github.com/typescript-package/data/stargazers
<!-- This package -->

<!-- Package: typescript-package -->
  <!-- npm -->
  [typescript-package-npm-badge-svg]: https://badge.fury.io/js/@typescript-package%2Fdata.svg
  [typescript-package-npm-badge]: https://badge.fury.io/js/@typescript-package%2Fdata

<!-- GIT -->
[git-semver]: http://semver.org/

<!-- GIT: commit -->
[git-commit-angular]: https://gist.github.com/stephenparish/9941e89d80e2bc58a153
[git-commit-karma]: http://karma-runner.github.io/0.10/dev/git-commit-msg.html
[git-commit-conventional]: https://www.conventionalcommits.org/en/v1.0.0/
