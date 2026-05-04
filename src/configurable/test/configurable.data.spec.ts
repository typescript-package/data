import { DataSettings, InferAsync } from "@typedly/data";
import { ConfigurableData as ConfigurableDataBase } from "../lib";

export class ConfigurableData<
  const C extends DataSettings<S> | undefined,
  T,
  S extends boolean = InferAsync<C>,
> extends ConfigurableDataBase<C, T, S> {
  constructor(settings?: C, value?: T) {
    super(settings, value);
  }
}

// const configurableData = new ConfigurableData({}, 'test value');

describe('ConfigurableData', () => {
  it('should create an instance of ConfigurableData', () => {
    const instance = new ConfigurableData({}, 'test value');
    expect(instance).toBeInstanceOf(ConfigurableData);
    expect(instance.getValue()).toBe('test value');
  });

  it('should have correct toStringTag', () => {
    const instance = new ConfigurableData();
    expect(Object.prototype.toString.call(instance)).toBe('[object ConfigurableData]');
  });

  it('should return the correct configuration', () => {
    const config = { async: true, tag: 'CustomConfig' };
    const instance = new ConfigurableData(config, 'test value');
    expect(instance.configuration).toEqual(config);
    expect(instance.async).toBe(true);
    expect(Object.prototype.toString.call(instance)).toBe('[object CustomConfig]');
  });

  it('should set a new value', () => {
    const instance = new ConfigurableData({}, 'initial value');
    instance.setValue('updated value');
    expect(instance.getValue()).toBe('updated value');
  });

  it('should clear the value', () => {
    const instance = new ConfigurableData({}, 'test value');
    instance.clear();
    expect(instance.getValue()).toBeUndefined();
  });

  it('should destroy the value', () => {
    const instance = new ConfigurableData({}, 'test value');
    instance.destroy();
    expect(instance.getValue()).toBeNull();
  });
});