/* eslint-disable @typescript-eslint/no-explicit-any */
import { AsyncReturn, DataSettings } from "@typedly/data";
import { ConfigurableData } from "../../../configurable";
import { AdaptableConfigurableData } from "../lib";
import { ConfigurableDataAdapterShape } from "@typedly/data-adapter";

export class ConfigurableDataAdapter<
  const C extends DataSettings<S> | undefined,
  T = any, S extends boolean = false,
  V extends string = '1.0.0',
  G extends readonly [V, ...any[]] = [V, ...any[]]
> extends ConfigurableData<C, T, S>
  implements ConfigurableDataAdapterShape<C, T, S> {
  version: V;

  args: G;
  
  constructor(settings?: C, value?: T, ...args: G) {
    super(settings, value);
    this.version = args ? args[0] : '1.0.0' as V;
    this.args = args;
  }

  override clear(): AsyncReturn<S, this> {
    super.setValue(new Set() as unknown as T);
    return this as unknown as AsyncReturn<S, this>;
  }
}

// let adaptableConfigurableData: AdaptableConfigurableData<ConfigurableDataAdapter<{}, Set<string>, false, "1.0.0">, {}, Set<string>, boolean, []>
let adaptableConfigurableData = new AdaptableConfigurableData(
  {}, new Set('a'), ConfigurableDataAdapter, '1.0.0', { 'config': true }
);

describe('AdaptableConfigurableData', () => {
  beforeEach(() => {
    adaptableConfigurableData = new AdaptableConfigurableData(
      {}, new Set('a'), ConfigurableDataAdapter, '1.0.0', { 'config': true }
    );
  });
  it('should have adapter properties', () => {
    expect(adaptableConfigurableData.adapter).toBeInstanceOf(ConfigurableDataAdapter);
    expect(adaptableConfigurableData.adapter?.version).toBe('1.0.0');
  });

  it('should use adapter methods', () => {
    adaptableConfigurableData.setValue(new Set('abc'));
    expect(adaptableConfigurableData.value).toEqual(new Set('abc'));

    adaptableConfigurableData.clear();
    expect(adaptableConfigurableData.value).toEqual(new Set());
  });

  it('should have correct async behavior', () => {
    expect(adaptableConfigurableData.async).toBe(false);
  });

  it(`args should be correctly assigned`, () => {
    expect(adaptableConfigurableData.adapter?.args).toEqual(['1.0.0', { 'config': true }]);
  });

  it('should have correct toStringTag', () => {
    expect(Object.prototype.toString.call(adaptableConfigurableData)).toBe('[object ConfigurableData]');
  });

  it('should have correct configuration', () => {
    expect(adaptableConfigurableData.configuration).toEqual({});
  });
});