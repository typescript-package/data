import { DataCore } from '../lib';
/**
 * @description
 * @export
 * @interface DataConstructor
 * @template Value 
 * @template {DataCore<Value>} DataType 
 * @template {readonly any[]} Args 
 */
export interface DataConstructor<
  Value,
  DataType extends DataCore<Value>,
  Args extends readonly any[] = any[]
>  {
  new (value: Value, ...args: Args): DataType;
}
