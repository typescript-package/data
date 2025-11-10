// Abstract.
import { Immutability } from './immutability.abstract';

/**
 * @description Core hooks system for managing callbacks.
 * @export
 * @abstract
 * @class HooksCore
 * @extends {Immutability}
 */
export abstract class HooksCore extends Immutability {
  /**
   * @description Privately stored onDestroy callback function, defaults `undefined`.
   * @type {?() => void}
   */
  #onDestroyCallback?: () => void;

  /**
   * @description Returns the onDestroy callback function.
   * @protected
   * @readonly
   * @type {(() => void) | undefined}
   */
  protected get onDestroyCallback(): (() => void) | undefined {
    return this.#onDestroyCallback;
  }

  /**
   * @description Sets the callback function to be invoked when destroying the data instance.
   * @public
   * @param {?() => void} callbackfn 
   * @returns {this} 
   */
  public onDestroy(callbackfn?: () => void): this {
    return this.#onDestroyCallback = callbackfn, this;
  }
}
