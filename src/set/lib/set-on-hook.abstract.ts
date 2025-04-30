// Abstract.
import { DataCore } from "../../lib";
/**
 * @description
 * @export
 * @abstract
 * @class OnHook
 * @template Value 
 * @template {DataCore<any>} DataType 
 */
export abstract class SetOnHook<
  Value,
  DataType extends DataCore<any>
> {
  /**
   * @description Hook called when a value is added.
   * @protected
   * @param {Value} value The added value.
   * @param {DataType} data The data holder.
   */
  protected onAdd(value: Value, data: DataType): void {}

  /**
   * @description Hook called when the `Set` is cleared.
   * @protected
   * @param {DataType} data The data holder.
   */
  protected onClear(data: DataType): void {}

  /**
   * @description Hook called when a value is deleted.
   * @protected
   * @param {Value} value The deleted value.
   * @param {boolean} success Whether the deletion was successful.
   * @param {DataType} data The data holder.
   */
  protected onDelete(value: Value, success: boolean, data: DataType): void {}
}