/**
 * @description
 * @export
 * @interface WeakMapTypeConstructor
 * @template {object} Key 
 * @template Value 
 * @template {WeakMap<Key, Value>} MapType 
 */
export interface WeakMapTypeConstructor<
  Key extends object,
  Value,
  MapType extends WeakMap<Key, Value>
> {
  new (entries?: [Key, Value][]): MapType;
}
