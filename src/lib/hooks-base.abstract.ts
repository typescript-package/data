// Abstract.
import { HooksCore } from './hooks-core.abstract';

/**
 * @description Enhanced hooks system with property-specific change and set hooks.
 * @export
 * @abstract
 * @class HooksBase
 * @template T Represents the type of data value.
 * @extends {HooksCore}
 */
export abstract class HooksBase<T> extends HooksCore {
  /**
   * @description Privately stored property-specific onChange callback function, defaults `undefined`.
   * @type {?(value: T, oldValue: T) => void}
   */
  #onChangeCallback?: (value: T, oldValue: T) => void;

  /**
   * @description Privately stored property-specific onSet callback function, defaults `undefined`.
   * @type {?(value: T) => void}
   */
  #onSetCallback?: (value: T) => void;

  /**
   * @description Returns the property-specific onChange callback function.
   * @protected
   * @readonly
   * @type {((value: T, oldValue: T) => void) | undefined}
   */
  protected get onChangeCallback(): ((value: T, oldValue: T) => void) | undefined {
    return this.#onChangeCallback;
  }

  /**
   * @description Returns the property-specific onSet callback function.
   * @protected
   * @readonly
   * @type {((value: T) => void) | undefined}
   */
  protected get onSetCallback(): ((value: T) => void) | undefined {
    return this.#onSetCallback;
  }

  /**
   * @description Sets the property-specific callback function invoked when the data value changes.
   * @public
   * @param {?(value: T, oldValue: T) => void} callbackfn The callback function to invoke.
   * @returns {this} The `this` current instance.
   */
  public onChange(callbackfn?: (value: T, oldValue: T) => void): this {
    return this.#onChangeCallback = callbackfn, this;
  }

  /**
   * @description Sets the property-specific callback function to be invoked when setting the data value.
   * @public
   * @param {?(value: T) => void} callbackfn The callback function to invoke.
   * @returns {this} The `this` current instance.
   */
  public onSet(callbackfn?: (value: T) => void): this {
    return this.#onSetCallback = callbackfn, this;
  }
}
