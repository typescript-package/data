// Class.
import { WeakData } from "./weak-data.class";
/**
 * @description
 * @export
 * @class MapWeakData
 * @template Key 
 * @template Value 
 * @extends {WeakData<Map<Key, Value>>}
 */
export class MapWeakData<Key, Value> extends WeakData<Map<Key, Value>> {
  /**
   * @description Returns the `string` tag representation of the `MapWeakData` class when used in `Object.prototype.toString.call(instance)`.
   * @public
   * @readonly
   */
  public override get [Symbol.toStringTag](): string {
    return MapWeakData.name;
  }

  /**
   * Creates an instance of `MapWeakData`.
   * @constructor
   * @param {?[Key, Value][]} [entries] 
   */
  constructor(entries?: [Key, Value][]) {
    super(new Map(entries));
  }
}
