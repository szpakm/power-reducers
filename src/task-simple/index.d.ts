declare module "power-reducers/task-simple";

import {
  Reducer,
  CreateReducerOption,
  CreateReduerOptionCustom
} from "../models";

export interface TaskSimpleState {
  isPending: boolean;
  error: string;
}

export type TaskSimpleStateGenerator = (data?: boolean) => TaskSimpleState;

export interface TaskSimpleCreateReducerOptions {
  initial?: boolean;
  startOn?: CreateReducerOption;
  successOn?: CreateReducerOption;
  errorOn?: CreateReducerOption;
  _customHandlers?: CreateReduerOptionCustom<TaskSimpleState>;
}

export function createReducer(
  opt: TaskSimpleCreateReducerOptions
): [
  Reducer<TaskSimpleState>,
  {
    generateState: TaskSimpleStateGenerator;
    getInitialState(): TaskSimpleState;
  }
];

/* create selector */

export function selectIsPending(state: TaskSimpleState): boolean;

export function selectIsSuccess(state: TaskSimpleState): boolean;

export function selectIsError(state: TaskSimpleState): boolean;
