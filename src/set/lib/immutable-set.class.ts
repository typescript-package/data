/**
 * @description Immutable version of `Set`.
 * @export
 * @class ImmutableSet
 * @template Type 
 * @extends {Set<Type>}
 */
export class ImmutableSet<Type> extends Set<Type> {
  constructor(iterable?: Iterable<Type> | null) {
    super(iterable);
    this.add = (value: Type) => this;
  }
  public override delete(value: Type): boolean { return false; }
  public override clear(): this { return this;}
}
