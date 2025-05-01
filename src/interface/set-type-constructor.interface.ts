/**
 * @description
 * @export
 * @interface SetTypeConstructor
 * @template Type 
 * @template {Set<Type>} SetType 
 */
export interface SetTypeConstructor<Type, SetType extends Set<Type>> {
  new (iterable?: Iterable<Type>): SetType,
}
