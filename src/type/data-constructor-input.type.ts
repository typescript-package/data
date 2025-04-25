// Abstract,
import { DataCore } from "../lib";
// Interface.
import { DataConstructor } from "../interface";
/**
 * @description
 * @export
 * @template Value 
 * @template {DataCore<Value>} DataType 
 */
export type DataConstructorInput<Value, DataType extends DataCore<Value>> =
  | [DataConstructor<Value, DataType>, ...any[]]
  | DataConstructor<Value, DataType>
;
