import { CacheableSettings, DataSettings, InferAsync } from "@typedly/data";
import { CacheableData as CacheableBase } from "../lib";

export class CacheableData<
  const C extends DataSettings<S> & CacheableSettings<T>,
  T,
  S extends boolean = InferAsync<C>,
> extends CacheableBase<C, T, S> {
  constructor(
    settings?: C,
    value?: T,
  ) {
    super(settings, value);
  }
}

describe('CacheableData', () => {
  it('should create an instance of CacheableData', () => {
    const instance = new CacheableData({}, 'test value');
    expect(instance).toBeInstanceOf(CacheableData);
    expect(instance.getValue()).toBe('test value');
  });

  it('should clear the value', () => {
    const instance = new CacheableData({}, 'test value');
    instance.clear();
    expect(instance.getValue()).toBeUndefined();
  });

  it('should destroy the value', () => {
    const instance = new CacheableData({}, 'test value');
    instance.destroy();
    expect(instance.getValue()).toBeNull();
  });
});