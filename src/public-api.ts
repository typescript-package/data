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
  ImmutableData,
  ReadonlyData,
  Value,

  // `WeakData`.
  NamedWeakData,
  // Indexed.
  IndexedWeakData,
  // Basic.
  WeakData,
} from './lib';

// Constant.
export { SymbolValue  } from './lib';

// Interface.
export type {
  DataConstructor,
  MapTypeConstructor,
  SetTypeConstructor,
  WeakMapTypeConstructor
} from './interface';

// Type.
export type {
  DataConstructorInput,
  ImmutableArray,
} from './type';