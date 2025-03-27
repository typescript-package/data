// Class.
import { WeakData } from "./weak-data.class";
/**
 * @description
 * @export
 * @class IndexedWeakData
 * @template {object} [Obj=object] 
 * @template {keyof Obj} [Key=keyof Obj] 
 * @extends {WeakData<Obj>}
 */
export class IndexedWeakData<
  Obj extends object = object,
  Key extends keyof Obj = keyof Obj,
> extends WeakData<Obj> {
  /**
   * @description
   * @public
   * @static
   * @template {object} [Obj=object] 
   * @param {number} index 
   * @returns {(Obj | undefined)} 
   */
  public static getByIndex<Obj extends object = object>(index: number): Obj | undefined {
    return IndexedWeakData.#registry.get(index)?.deref()?.value
  }

  /**
   * @description
   * @static
   * @type {Map}
   */
  static #registry = new Map<number, WeakRef<IndexedWeakData<any, any>>>();

  /**
   * @description
   * @static
   * @type {FinalizationRegistry}
   */
  static #finalizationRegistry = new FinalizationRegistry((id: number) => IndexedWeakData.#registry.delete(id));

  /**
   * @description
   * @public
   * @readonly
   * @type {(number | undefined)}
   */
  public get index(): number | undefined {
    return Object.hasOwn(super.value, this.#key) ? super.value[this.#key] as number : undefined;
  }

  /**
   * @description
   * @public
   * @readonly
   * @type {Key}
   */
  public get key() {
    return this.#key;
  }

  /**
   * @description
   * @type {!Key}
   */
  #key!: Key;

  /**
   * Creates an instance of `IndexedWeakData`.
   * @constructor
   * @param {Obj} object 
   * @param {Key} key 
   */
  constructor(object: Obj, key: Key) {
    super(object);
    if (typeof object[key] === 'number') {
      this.#key = key;
      if (this.index) {
        IndexedWeakData.#registry.set(this.index, new WeakRef(this));
        IndexedWeakData.#finalizationRegistry.register(this, this.index);
      }
    } else {
      throw Error(`Key must be associated with \`number\` type value in \`object\`.`);
    }
  }

  /**
   * @inheritdoc
   * @public
   * @returns {this} 
   */
  public override destroy(): this {
    typeof this.index === 'number' && IndexedWeakData.#registry.delete(this.index);
    return super.destroy();
  }

  /**
   * @description
   * @public
   * @param {number} index 
   * @returns {(Obj | undefined)} 
   */
  public getByIndex(index: number): Obj | undefined {
    return IndexedWeakData.getByIndex<Obj>(index);
  }
}
