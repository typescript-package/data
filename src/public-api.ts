/*
 * Public API Surface of data
 */
export {
  // Abstract.
  DataCore,
  HooksBase,
  HooksCore,
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
} from './interface';

// Type.
export type {
  DataConstructorInput,
} from './type';