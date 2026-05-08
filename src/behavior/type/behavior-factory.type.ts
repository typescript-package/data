// Interface.
import { DataBehaviorShape } from "../interface/data.behavior.shape";
/**
 * @description
 * @export
 * @typedef {BehaviorFactory}
 * @template T 
 * @template {boolean} [S=false] 
 */
export type BehaviorFactory<T, S extends boolean = false> = (store?: { value?: T }) => DataBehaviorShape<T, S>;