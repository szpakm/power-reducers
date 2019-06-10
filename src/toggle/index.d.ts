declare module "power-reducers/toggle";

import {
  Reducer,
  CreateReducerOption,
  CreateReduerOptionCustom
} from "../models";

export type ToggleState = boolean;

/* create reducer */

export interface ToggleOptions {
  initial?: boolean;
  toggleOn?: CreateReducerOption;
  makeTrueOn?: CreateReducerOption;
  makeFalseOn?: CreateReducerOption;
  setOn?: CreateReducerOption;
  resetOn?: CreateReducerOption;
  _customHandlers?: CreateReduerOptionCustom<ToggleState>;
}

export type ToggleStateGenerator = (data?: ToggleState) => ToggleState;

export function createReducer(
  opt?: ToggleOptions
): [
  Reducer<ToggleState>,
  { generateState: ToggleStateGenerator; getInitialState(): ToggleState }
];
