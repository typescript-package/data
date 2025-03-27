/*
 * Public API Surface of data
 */
export {
  // Abstract.
  DataCore,
  Immutability,

  // Class.
  Data,

  // Set.
  DataSet,

  // Map.
  DataMap,
  WeakDataMap,
  
  // Typed `WeakData`.
  ArrayWeakData,
  MapWeakData,
  ObjectWeakData,

  // Named.
  IndexedNamedWeakData,
  NamedWeakData,

  // `WeakData`.
  IndexedWeakData,
  WeakData,

  Value,
} from './lib';
