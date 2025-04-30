/*
 * Public API Surface of data
 */
export {
  // Abstract.
  DataCore,
  Immutability,

  // Class.
  // Base.
  Data,
  Value,

  // `WeakData`.
  NamedWeakData,
  // Indexed.
  IndexedWeakData,
  // Basic.
  WeakData,
} from './lib';

// `Map`.
export {
  // Abstract.
  CoreMap,

  // Class.
  DataMap,
  FactoryMap,
  WeakDataMap,
} from './map';

// `Set`.
export {
  // Abstract.
  CoreSet,

  // Class.
  DataSet,
  ImmutableSet,
} from './set';
