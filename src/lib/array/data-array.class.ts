// Abstract.
import { DataCore } from '../data-core.abstract';
// Class.
import { Data } from '../data.class';
/**
 * @description
 * @export
 * @class DataArray
 * @template Type 
 * @template {DataCore<Array<Type>>} DataType 
 */
export class DataArray<Type, DataType extends DataCore<Array<Type>>> {
  /**
   * @description Returns the `string` tag representation of the `DataArray` class when used in `Object.prototype.toString.call(instance)`.
   * @public
   * @readonly
   */
  public get [Symbol.toStringTag](): string {
    return DataArray.name;
  }

  /**
   * @description
   * @public
   * @readonly
   * @type {DataType}
   */
  public get data() {
    return this.#data;
  }

  /**
   * @description
   * @public
   * @readonly
   * @type {number}
   */
  public get length() {
    return this.#data.value.length;
  }

  /**
   * @description
   * @type {DataType}
   */
  #data: DataType;

  /**
   * Creates an instance of `DataArray`.
   * @constructor
   * @param {?Type[]} [entries] 
   * @param {new (value: Array<Type>) => DataType} [data=Data as any] 
   */
  constructor(
    entries?: Type[],
    data: new (value: Array<Type>) => DataType = Data as any
  ) {
    this.#data = new data(entries || []);
  }

  /**
   * @description Clears all entries in the array.
   * @public
   * @returns {this} The current instance for chaining.
   */
  public clear(): this {
    this.#data.value.length = 0;
    return this;
  }

  /**
   * @description Filters the array based on a callback.
   * @public
   * @param {(value: Type, index: number, array: Type[]) => unknown} predicate The function to check each element.
   * @param {?*} [thisArg] 
   * @returns {Type[]} A new array with only the elements that passed the test.
   */
  public filter(predicate: (value: Type, index: number, array: Type[]) => unknown, thisArg?: any): Type[] {
    return this.#data.value.filter(predicate, thisArg);
  }

  /**
   * @description Finds the first element that matches the callback condition.
   * @public
   * @param {(value: Type, index: number, obj: Type[]) => unknown} predicate The function to test each element.
   * @param {?*} [thisArg] 
   * @returns {(Type | undefined)} The first matching element or `undefined`.
   */
  public find(predicate: (value: Type, index: number, obj: Type[]) => unknown, thisArg?: any): Type | undefined {
    return this.#data.value.find(predicate, thisArg);
  }

  /**
   * @description Executes a provided function once for each array element.
   * @public
   * @param {(value: Type, index: number, array: Type[]) => void} callbackfn The function to apply to each element.
   * @param {?*} [thisArg] Value to use as `this` when executing `callback`.
   * @returns {this} Returns the `this` current instance for chaining.
   */
  public forEach(callbackfn: (value: Type, index: number, array: Type[]) => void, thisArg?: any): this {
    this.#data.value.forEach(callbackfn, thisArg);
    return this;
  }

  /**
   * @description Checks if the array contains a certain value.
   * @public
   * @param {Type} searchElement The value to search for.
   * @param {?number} [fromIndex] 
   * @returns {boolean} `true` if the value is in the array, otherwise `false`.
   */
  public includes(searchElement: Type, fromIndex?: number): boolean {
    return this.#data.value.includes(searchElement, fromIndex);
  }

  /**
   * @description "Adds all the elements of an array into a string, separated by the specified separator string."
   * @public
   * @param {?string} [separator] "A string used to separate one element of the array from the next in the resulting string. If omitted, the array elements are separated with a comma."
   * @returns {string} 
   */
  public join(separator?: string): string {
    return this.#data.value.join(separator);
  }
  
  /**
   * @description Maps over the array and returns a new array based on the callback.
   * @public
   * @template T 
   * @param {(value: Type, index: number, array: Type[]) => T} callbackfn The function to apply to each element.
   * @param {?*} [thisArg] 
   * @returns {T[]} A new array with the results of the callback.
   */
  public map<T>(callbackfn: (value: Type, index: number, array: Type[]) => T, thisArg?: any): T[] {
    return this.#data.value.map(callbackfn, thisArg);
  }

  /**
   * @description Adds a value to the end of the array.
   * @public
   * @param {Type} value The value to add.
   * @returns {this} The current instance for chaining.
   */
  public push(value: Type): this {
    this.#data.value.push(value);
    return this;
  }

  /**
   * @description Removes and returns the last value from the array.
   * @public
   * @returns {Type | undefined} The last value in the array or `undefined` if the array is empty.
   */
  public pop(): Type | undefined {
    return this.#data.value.pop();
  }

  /**
   * @description Reduces the array to a single value using the callback.
   * @public
   * @template T 
   * @param {(previousValue: T, currentValue: Type, currentIndex: number, array: Type[]) => T} callbackfn The function to apply to each element.
   * @param {T} initialValue The initial value to start the accumulation.
   * @returns {T} The final reduced value.
   */
  public reduce<T>(callbackfn: (previousValue: T, currentValue: Type, currentIndex: number, array: Type[]) => T, initialValue: T): T {
    return this.#data.value.reduce(callbackfn, initialValue);
  }

  /**
   * @description Removes and returns the first value from the array.
   * @public
   * @returns {Type | undefined} The first value in the array or `undefined` if the array is empty.
   */
  public shift(): Type | undefined {
    return this.#data.value.shift();
  }

  /**
   * @description Returns a new array with a shallow copy of a portion of the array.
   * @public
   * @param {number} start The index to start copying.
   * @param {number} end The index to stop copying (not inclusive).
   * @returns {Type[]} A new array with the specified range.
   */
  public slice(start?: number, end?: number): Type[] {
    return this.#data.value.slice(start, end);
  }

  /**
   * @description Returns a new array with the values sorted according to the provided comparator function.
   * @public
   * @param {(a: Type, b: Type) => number} compareFn The comparator function to sort the array.
   * @returns {Type[]} The sorted array.
   */
  public sort(compareFn?: (a: Type, b: Type) => number): Type[] {
    return this.#data.value.sort(compareFn);
  }

  /**
   * @description Returns a string representation of the array.
   * @public
   * @returns {string} A string of the array's elements separated by commas.
   */
  public toString(): string {
    return this.#data.value.toString();
  }

  /**
   * @description Adds a value to the beginning of the array.
   * @public
   * @param {...Type[]} items The value to add.
   * @returns {this} The `this` current instance for chaining.
   */
  public unshift(...items: Type[]): this {
    this.#data.value.unshift(...items);
    return this;
  }
}
