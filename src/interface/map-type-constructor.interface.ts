/**
 * @description
 * @export
 * @interface MapTypeConstructor
 * @template Key 
 * @template Value 
 * @template {Map<Key, Value>} MapType 
 */
export interface MapTypeConstructor<Key, Value, MapType extends Map<Key, Value>> {
  new (entries?: [Key, Value][]): MapType;
}
