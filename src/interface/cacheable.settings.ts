export interface CacheableSettings<T> {
  /**
   * @description Optional function to asynchronously clear the data value.
   * @type {(() => Promise<void>) | undefined}
   */
  clearer?: () => Promise<void> | undefined;

  /**
   * @description Optional function to asynchronously destroy the data value.
   * @type {(() => Promise<void>) | undefined}
   */
  destroyer?: () => Promise<void> | undefined;

  /**
   * @description Optional function to asynchronously fetch the data value.
   * @type {(() => Promise<T>) | undefined}
   */
  fetcher?: () => Promise<T> | undefined;

  /**
   * @description Optional function to asynchronously update the data value.
   * @type {((value: T) => Promise<void>) | undefined}
   */
  updater?: (value: T) => Promise<void> | undefined;
}