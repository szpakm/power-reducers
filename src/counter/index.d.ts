declare module "power-reducers/counter";

import {
  CreateReducerOption,
  Reducer,
  CreateReduerOptionCustom,
  Action
} from "../models";

export type CounterState = number;

/* crate reducer */

export interface CounterCreateReducerOptions {
  initial?: CounterState;
  incrementOn?: CreateReducerOption;
  decrementOn?: CreateReducerOption;
  incrementByOn?: CreateReducerOption;
  decrementByOn?: CreateReducerOption;
  setOn?: CreateReducerOption;
  resetOn?: CreateReducerOption;
  emptyOn?: CreateReducerOption;
  _customHandlers?: CreateReduerOptionCustom<CounterState>;
}

export type CounterStateGenerator = (data?: CounterState) => CounterState;

export function createReducer(
  opt?: CounterCreateReducerOptions
): [
  Reducer<CounterState>,
  {
    generateState: CounterStateGenerator;
    getInitialState(): CounterState;
  }
];
