
<a href="https://www.typescriptlang.org/">
  <img
    src="https://avatars.githubusercontent.com/u/189666396?s=150&u=9d55b1eb4ce258974ead76bf07ccf49ef0eb0ea7&v=4"
    title="The typescript package enhances the development of typescript-based applications by providing well-structured, reusable, easy-to-use packages."
  />
</a>

## @typescript-package/data

<!-- npm badge -->
[![npm version][typescript-package-npm-badge-svg]][typescript-package-npm-badge]
[![GitHub issues][typescript-package-badge-issues]][typescript-package-issues]
[![GitHub license][typescript-package-badge-license]][typescript-package-license]

A lightweight **TypeScript** library for basic data management.

## Features

- **Shape:** The shape of all data objects as `interface`.
- **Immutability:** Instance methods to freeze, seal, and lock to enforce the data immutability, or determine the state.
- **Asynchronous:** Synchronous by default, supports switching to asynchronous via the generic variable `R` switchable by `async` param.
- **Core:** The core abstract implementation build on shape providing standard mutation methods `clear`, `destroy`, and `set`.
- **Adapter:** Extensible adapter abstraction for the pluggable adapters to customize data logic, hooks and side effects.
- **Base:** The base abstraction layer combining adapter with direct value handling.
- **Concrete**: Final concrete implementation to instantiate base functionality.

## Table of contents

- [Installation](#installation)
- [Api](#api)
  - Abstract
    - [`AdapterData`](#adapterdata)
    - [`BaseData`](#basedata)
    - [`DataCore`](#datacore)
    - [`Immutability`](#immutability)
  - Concrete
    - [`Data`](#data)
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

Base.

```typescript
import {
  // Abstract.
  AdapterData,
  BaseData,
  DataCore,
  Immutability,
  // Class.
  Data,
} from '@typescript-package/data';
```

### Abstract

### `AdapterData`

The abstract `AdapterData` class extends `DataCore` adding functionality for managing data value by adapter with arguments. Designed to create data containers of `T` type managed by adapters that require constructor arguments.

```typescript
import { AdapterData } from '@typescript-package/data';
```

### `BaseData`

The `BaseData` class is an abstract class that extends core adding functionality for managing data value, also by adapter.

```typescript
import { BaseData } from '@typescript-package/data';
```

### `DataCore`

The **core** abstraction with immutability for handling data-related classes.

```typescript
import { DataCore } from '@typescript-package/data';
```

### `Immutability`

Manages the immutability states of `this` current instance.

```typescript
import { Immutability } from '@typescript-package/data';
```

### Concrete

### `Data`

The `Data` class is a concrete class that extends the `BaseData` abstract class.

```typescript
import { Data } from '@typescript-package/data';

// Example subclass of Data
class StringData extends Data<string> {
  constructor(value: string) {
    super(false, value);
  }
}

const stringData = new StringData("Hello, world!");

// Access the current value
console.log(stringData.value); // ➝ Hello, world!

// Update the value
stringData.set("New value");
console.log(stringData.value); // ➝ New value

// Destroy the value
stringData.destroy();
console.log(stringData.value); // Throws error or undefined (based on how it's handled)
```

Example with adapter to handle the value with `onSet` hook.

```typescript
import { Data } from '@typescript-package/data';
import { DataAdapter } from '@typedly/data';

// Create the adapter implementation of `DataAdapter` interface.
export class RxDataAdapter<
  T = string,
  G extends unknown[] = unknown[]
> implements DataAdapter<T, false> {
  #onSet: (value: T) => T = (value: T) => value;
  #value: T;
  constructor(value: T, ...args: G) {
    this.#value = value || '' as T;
    console.log(args);
  }
  // New method specific to this reactive adapter.
  onSet(callbackfn: (value: T) => T): this { this.#onSet = callbackfn; return this; }
  clear(): this { return this; }
  destroy(): this { return this; }
  lock(): this { return this; }
  set(value: T): this { this.#value = this.#onSet(value); return this; }
  get value(): T {
    return this.#value;
  }
}

// const data: Data<string, [], false, TestAdapter<string, []>>
const data = new Data(false, 'Initial value' as string, RxDataAdapter);

data.adapter?.onSet(value => `Reactive: ${value}`);
data.set('New value'); // logs: 'Reactive: New value'
```

Example with asynchronous adapter.

```typescript
import { Data } from '@typescript-package/data';
import { DataAdapter } from '@typedly/data';

// Create the Async adapter implementation of `DataAdapter` interface.
export class AsyncAdapter<
  T = string,
  G extends unknown[] = unknown[]
> implements DataAdapter<T, true> {
  #value: T;
  constructor(value: T, ...args: G) {
    this.#value = value || '' as T;
    console.log(args);
  }
  async ready(): Promise<T> { return Promise.resolve(this.#value); }
  async clear(): Promise<this> { return this; }
  async destroy(): Promise<this> { return this; }
  lock(): this { return this; }
  async set(value: T): Promise<this> { this.#value = value; return this; }
  get value(): T {
    return this.#value;
  }
}

// const asyncData: Data<string, [], true, AsyncAdapter<string, []>>
const asyncData = new Data(true, 'Initial async value' as string, AsyncAdapter);

asyncData.adapter?.ready().then(value => {
  console.log('Async value:', value);
});

```

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
- [GitHub](https://github.com/sponsors/angular-package/sponsorships?sponsor=sciborrudnicki&tier_id=83618)
- [DonorBox](https://donorbox.org/become-a-sponsor-to-the-angular-package?default_interval=o)
- [Patreon](https://www.patreon.com/checkout/angularpackage?rid=0&fan_landing=true&view_as=public)

or via Trust Wallet

- [XLM](https://link.trustwallet.com/send?coin=148&address=GAFFFB7H3LG42O6JA63FJDRK4PP4JCNEOPHLGLLFH625X2KFYQ4UYVM4)
- [USDT (BEP20)](https://link.trustwallet.com/send?coin=20000714&address=0xA0c22A2bc7E37C1d5992dFDFFeD5E6f9298E1b94&token_id=0x55d398326f99059fF775485246999027B3197955)
- [ETH](https://link.trustwallet.com/send?coin=60&address=0xA0c22A2bc7E37C1d5992dFDFFeD5E6f9298E1b94)
- [BTC](https://link.trustwallet.com/send?coin=0&address=bc1qnf709336tfl57ta5mfkf4t9fndhx7agxvv9svn)
- [BNB](https://link.trustwallet.com/send?coin=20000714&address=0xA0c22A2bc7E37C1d5992dFDFFeD5E6f9298E1b94)

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

## 📦 Related Packages

| Package                   | Description                                       |
|---------------------------|---------------------------------------------------|
| [`@typescript-package/async-data`](https://github.com/typescript-package/async-data) | A lightweight **TypeScript** library for basic asynchronous data management. |
| [`@typescript-package/collection`](https://github.com/typescript-package/collection) | A lightweight **TypeScript** library for data collection management. |
| [`@typescript-package/map`](https://github.com/typescript-package/map) | A lightweight **TypeScript** library for enhanced `map` management. |
| [`@typescript-package/set`](https://github.com/typescript-package/set) | A lightweight **TypeScript** library for enhanced `set` management. |
| [`@typescript-package/weak-data`](https://github.com/typescript-package/weak-data) | A lightweight **TypeScript** library for basic weakly referenced data management. |

## Packages

- **[@typescript-package/affix](https://github.com/typescript-package/affix)**: A **lightweight TypeScript** library for the affix - prefix and suffix.
- **[@typescript-package/are](https://github.com/typescript-package/are)**: Type-safe `are` checkers for validating value types in TypeScript.
- **[@typescript-package/descriptor](https://github.com/typescript-package/descriptor)**: A **lightweight TypeScript** library for property descriptor.
- **[@typescript-package/guard](https://github.com/typescript-package/guard)**: Type-safe guards for guarding the value types in TypeScript.c
- **[@typescript-package/history](https://github.com/typescript-package/history)**: A **TypeScript** package for tracking history of values.
- **[@typescript-package/is](https://github.com/typescript-package/is)**: Type-safe is checkers for validating value types in TypeScript.
- **[@typescript-package/map](https://github.com/typescript-package/map)**: A lightweight **TypeScript** library for enhanced `map` management.
- **[@typescript-package/name](https://github.com/typescript-package/name)**: A **lightweight TypeScript** library for the name with prefix and suffix.
- **[@typescript-package/property](https://github.com/typescript-package/property)**: A **lightweight TypeScript** package with features to handle object properties.
- **[@typescript-package/queue](https://github.com/typescript-package/queue)**: A **lightweight TypeScript** library for managing various queue and stack structures.
- **[@typescript-package/range](https://github.com/typescript-package/range)**: A **lightweight TypeScript** library for managing various types of ranges.
- **[@typescript-package/regexp](https://github.com/typescript-package/regexp)**: A **lightweight TypeScript** library for **RegExp**.
- **[@typescript-package/set](https://github.com/typescript-package/set)**: A lightweight **TypeScript** library for enhanced `set` management.
- **[@typescript-package/state](https://github.com/typescript-package/state)**: Simple state management for different types in **TypeScript**.
- **[@typescript-package/storage](https://github.com/typescript-package/storage)**: The storage of data under allowed names.
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
