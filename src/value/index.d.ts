declare module "power-reducers/value";

import {
  Reducer,
  CreateReducerOption,
  CreateReduerOptionCustom
} from "../models";

export type ValueState<T> = T;

/* create reducer */

export interface ValueOptions<T> {
  initial?: T;
  setOn?: CreateReducerOption;
  resetOn?: CreateReducerOption;
  _customHandlers?: CreateReduerOptionCustom<ValueState<T>>;
}

export type ValueStateGenerator<T> = (data?: ValueState<T>) => ValueState<T>;

export function createReducer<T>(
  opt?: ValueOptions<T>
): [
  Reducer<ValueState<T>>,
  { generateState: ValueStateGenerator<T>; getInitialState(): ValueState<T> }
];
