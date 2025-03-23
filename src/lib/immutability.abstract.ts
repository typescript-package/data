/**
 * @description Manages the immutability states of `this` current instance.
 * @export
 * @abstract
 * @class Immutability
 */
export abstract class Immutability {
  /**
   * @description
   * @template Type 
   * @param {Type} object 
   * @returns {Readonly<Type>} 
   */
  public static deepFreeze<Type>(object: Type): Readonly<Type> {
    if (object && typeof object === "object" && !Object.isFrozen(object)) {
      Object.getOwnPropertyNames(object).forEach(prop => Immutability.deepFreeze((object as any)[prop]));
      Object.freeze(object);
    }
    return object;
  }

  /**
   * @description Privately stored locked state as `true` if locked, otherwise `false`.
   * @type {boolean}
   */
  #locked = false;

  /**
   * @description Deeply freezes current `this` instance.
   * @public
   * @returns {this} Returns current instance.
   */
  public deepFreeze(): this {
    if (this.isLocked()) {
      throw new Error('Cannot freeze a locked object.');
    }
    Immutability.deepFreeze(this);
    return this;
  }

  /**
   * @description "Prevents the modification of existing property attributes and values, and prevents the addition of new properties."
   * @public
   * @returns {this} Returns current instance.
   */
  public freeze(): this {
    if (this.isLocked()) {
      throw new Error('Cannot freeze a locked object.');
    }
    Object.freeze(this);
    return this;
  }

  /**
   * @description Checks whether `this` current instance is frozen.
   * @public
   * @returns {boolean}
   */
  public isFrozen(): boolean {
    return Object.isFrozen(this);
  }

  /**
   * @description Checks whether the current instance is locked.
   * @public
   * @returns {boolean} Returns a `boolean` indicating whether current instance is locked.
   */
  public isLocked() {
    return this.#locked === true;
  }

  /**
   * @description Checks whether the object is mutable.
   * @public
   * @returns {boolean} True if the object is mutable, otherwise `false`.
   */
  public isMutable(): boolean {
    return !this.isSealed() && !this.isFrozen() && !this.isLocked();
  }

  /**
   * @description Checks whether `this` current instance is sealed.
   * @public
   * @returns {boolean} Returns a `boolean` indicating whether current instance is sealed.
   */
  public isSealed(): boolean {
    return Object.isSealed(this);
  }

  /**
   * @description Locks the object, means deeply freezes and blocks the `set()`, ensuring deep immutability.
   * It combines the features of `Object.freeze`, but extends immutability to nested structures (deep immutability).
   * @public
   * @returns {this} Returns current instance.
   */
  public lock(): this {
    Immutability.deepFreeze(this);
    this.#locked = true;
    return this;
  }

  /**
   * @description "Prevents the modification of attributes of existing properties, and prevents the addition of new properties."
   * @public
   * @returns {this} Returns current instance.
   */
  public seal(): this {
    if (this.isLocked()) {
      throw new Error('Cannot seal a locked object.');
    }
    Object.seal(this);
    return this;
  }

  /**
   * @description Validates the ability to set the value.
   * @protected
   * @returns {this} Returns current instance.
   */
  protected validate(): this {
    if (this.isLocked()) {
      throw new Error('Cannot set when data is locked.');
    }
    return this;
  }
}
