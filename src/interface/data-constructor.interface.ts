import { DataCore } from '../lib';

export interface DataConstructor<
  Value,
  DataType extends DataCore<Value>
>  {
  new (value: Value): DataType;
}
