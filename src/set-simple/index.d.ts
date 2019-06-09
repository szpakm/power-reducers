declare module "power-reducers/set-simple";

import {
  Reducer,
  CreateReducerOption,
  CreateReduerOptionCustom
} from "../models";

export type SetSimpleState<T> = T[];

/* create reducer */

export interface SetSimpleCreateReducerOptions<T> {
  initial?: T[];
  setOn?: CreateReducerOption;
  addOn?: CreateReducerOption;
  removeOn?: CreateReducerOption;
  emptyOn?: CreateReducerOption;
  _customHandlers?: CreateReduerOptionCustom<SetSimpleState<T>>;
}

export type SetSimpleStateGenerator<T> = (data?: T[]) => SetSimpleState<T>;

export function createReducer<T>(
  opt?: SetSimpleCreateReducerOptions<T>
): [Reducer<SetSimpleState<T>>, SetSimpleStateGenerator<T>];
