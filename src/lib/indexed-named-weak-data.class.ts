// Class.
import { NamedWeakData } from "./named-weak-data.class";
/**
 * @description
 * @export
 * @class IndexedNamedWeakData
 * @template {object} [Obj=object] 
 * @template {keyof Obj} [Key=keyof Obj] 
 * @template {string} [Name='default'] 
 * @extends {NamedWeakData<Obj, Name>}
 */
export class IndexedNamedWeakData<
  Obj extends object = object,
  Key extends keyof Obj = keyof Obj,
  Name extends string = 'default'
> extends NamedWeakData<Obj, Name> {
  /**
   * @description
   * @public
   * @static
   * @template {object} [Obj=object] 
   * @param {number} index 
   * @returns {(Obj | undefined)} 
   */
  public static getByIndex<Obj extends object = object>(index: number): Obj | undefined {
    return IndexedNamedWeakData.#registry.get(index)?.deref()?.value
  }

  /**
   * @description
   * @static
   * @type {Map}
   */
  static #registry = new Map<number, WeakRef<IndexedNamedWeakData<any, any, any>>>();

  /**
   * @description
   * @static
   * @type {FinalizationRegistry}
   */
  static #finalizationRegistry = new FinalizationRegistry((id: number) => IndexedNamedWeakData.#registry.delete(id));

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
   * @param {Name} [name='default' as Name] 
   */
  constructor(object: Obj, key: Key, name: Name = 'default' as Name) {
    super(object, name);
    if (typeof object[key] === 'number') {
      this.#key = key;
      if (this.index) {
        IndexedNamedWeakData.#registry.set(this.index, new WeakRef(this));
        IndexedNamedWeakData.#finalizationRegistry.register(this, this.index);
      }
    }
  }

  /**
   * @inheritdoc
   * @public
   * @returns {this} 
   */
  public override destroy(): this {
    this.index && IndexedNamedWeakData.#registry.delete(this.index);
    return super.destroy();
  }

  /**
   * @description
   * @public
   * @param {number} index 
   * @returns {(Obj | undefined)} 
   */
  public getByIndex(index: number): Obj | undefined {
    return IndexedNamedWeakData.getByIndex<Obj>(index);
  }

  /**
   * @description
   * @public
   * @param {number} index 
   * @param {Obj} object 
   * @returns {this} 
   */
  public update(index: number, object: Obj): this {
    super.set({...this.getByIndex(index) || {}, ...object});
    return this;
  }
}
