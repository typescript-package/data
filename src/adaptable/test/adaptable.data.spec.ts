/* eslint-disable @typescript-eslint/no-explicit-any */
import { AsyncReturn } from "@typedly/data";
import { Data } from "../../lib";
import { AdaptableData } from "../lib/adaptable.data.class";
// Type.
import { DataAdapterShape } from "@typedly/data-adapter";

export class DataAdapter<T = any, S extends boolean = false, V extends string = '1.0.0'>
  extends Data<T, S>
  implements DataAdapterShape<T, S> {
  version: V;
  
  constructor(value?: T, version?: V) {
    super(value);
    this.version = version ?? '1.0.0' as V;
  }

  override clear(): AsyncReturn<S, this> {
    super.setValue(new Set() as unknown as T);
    return this as unknown as AsyncReturn<S, this>;
  }
}

// const adaptableData: AdaptableData<DataAdapter<Set<string>, false, "1.0.0">, Set<string>, false, []>
let adaptableData = new AdaptableData(new Set('a'), DataAdapter);

describe('AdaptableData', () => {
  beforeEach(() => {
    adaptableData = new AdaptableData(new Set('a'), DataAdapter);
  });
  it('should create an instance', () => {
    expect(adaptableData).toBeTruthy();
  });
  it('should have the correct value', () => {
    expect(adaptableData.value).toEqual(new Set('a'));
  });
  it('should have the correct adapter', () => {
    expect(adaptableData.adapter).toBeInstanceOf(DataAdapter);
  });
  it('should have the correct async behavior', () => {
    expect(adaptableData.async).toBe(false);
  });
  it('should have the correct version', () => {
    expect(adaptableData.adapter.version).toBe('1.0.0');
  });
  it('should set a new value', () => {
    adaptableData.setValue(new Set('b'));
    expect(adaptableData.value).toEqual(new Set('b'));
  });
  it('should clear the value', () => {
    adaptableData.clear();
    expect(adaptableData.value).toEqual(new Set());
  });
  it('should destroy the data', () => {
    adaptableData.destroy();
    expect(adaptableData.value).toBeNull();
  });
  it('should lock the data', () => {
    adaptableData.lock();
    expect(adaptableData.isLocked()).toBe(true);
  });
  it('should freeze the data', () => {
    adaptableData.deepFreeze();
    expect(adaptableData.isFrozen()).toBe(true);
  });
  it('should seal the data', () => {
    adaptableData.seal();
    expect(adaptableData.isSealed()).toBe(true);
  });
  // it('should validate the data', () => {
  //   expect(adaptableData.validate()).toBe(adaptableData);
  // });
  it('should have the correct tag', () => {
    expect(adaptableData.tag).toBe('AdaptableData');
  });
  it('should have the correct string representation', () => {
    expect(Object.prototype.toString.call(adaptableData)).toBe('[object AdaptableData]');
  });
  it('should return this from getValue', () => {
    const result = adaptableData.getValue();
    expect(result).toEqual(adaptableData.value);
  });
  it('should return this from setValue', () => {
    const result = adaptableData.setValue(new Set('c'));
    expect(result).toBe(adaptableData);
    expect(adaptableData.value).toEqual(new Set('c'));
  });
});
