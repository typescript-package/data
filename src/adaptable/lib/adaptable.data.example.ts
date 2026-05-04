/* eslint-disable @typescript-eslint/no-explicit-any */

import { DataAdapterShape } from "@typedly/data-adapter";
import { Data } from "../../lib";
import { AdaptableData } from "./adaptable.data.class";

export class DataAdapter<T = any, S extends boolean = false, V extends string = '1.0.0'>
  extends Data<T, S>
  implements DataAdapterShape<T, S> {
  version: V;
  
  constructor(value?: T, version?: V) {
    super(value);
    this.version = version ?? '1.0.0' as V;
  }
}


const adaptableData = new AdaptableData(new Set('a'), DataAdapter);
