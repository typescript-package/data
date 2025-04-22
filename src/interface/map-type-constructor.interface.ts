export interface MapTypeConstructor<Key, Value, MapType extends Map<Key, Value>> {
  new (entries?: [Key, Value][]): MapType;
}
