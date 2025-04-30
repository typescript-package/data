/**
 * @description The class to manage the value of generic type variable `Type`.
 * @export
 * @class Value
 * @template Type The type of the privately stored `#value`.
 */
export class Value<Type> {
  /**
   * @description Returns the `string` tag representation of the `Value` class when used in `Object.prototype.toString.call(instance)`.
   * The `tag` getter returns the actual class name defined with the `Symbol.toStringTag()` of the child class.
   * @public
   * @readonly
   * @type {string}
   */
  public get [Symbol.toStringTag]() {
    return Value.name;
  }

  /**
   * @description Returns the string tag of the current instance defined by the `Symbol.toStringTag`.
   * @public
   * @returns {string | undefined} The extracted class name, such as `'Value'`, or `undefined` if extraction fails.
   */
  public get tag(): string | undefined {
    const tag = Object.prototype.toString.call(this).slice(8, -1);
    return tag !== 'Object' ? tag : undefined;
  }

  /**
   * @description Returns the privately stored value of generic type variable `Type`.
   * @public
   * @readonly
   * @type {Readonly<Type>} 
   */
  public get value(): Readonly<Type> {
    return this.#value;
  }

  /**
   * @description Privately stored value of generic type variable `Type`.
   * @type {Type}
   */
  #value: Type;

  /**
   * Creates an instance of child class.
   * @constructor
   * @param {Type} value The value of generic type variable `Type`.
   */
  constructor(value: Type) {
    this.#value = value;
  }
  
  /**
   * @description Sets the value of generic type variable `Type`.
   * @public
   * @param {Type} value The value of `Type` to set.
   * @returns {this} The `this` current instance.
   */
  public set(value: Type): this {
    this.#value = value;
    return this;
  }
}
