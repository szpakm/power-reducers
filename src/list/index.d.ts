declare module "power-reducers/list";

import {
  CreateReducerOption,
  CreateReduerOptionCustom,
  Reducer
} from "../models";

export interface ListState<T> {
  byId: { [key: string]: T };
  ids: string[];
}

/* create reducer */

export interface ListCreateReducerOptions<T> {
  idName: string;
  initial?: T[];
  setOn?: CreateReducerOption;
  addOn?: CreateReducerOption;
  removeOn?: CreateReducerOption;
  updateOn?: CreateReducerOption;
  emptyOn?: CreateReducerOption;
  resetOn?: CreateReducerOption;
  _customHandlers?: CreateReduerOptionCustom<ListState<T>>;
}

export type ListStateGenerator<T> = (data?: T[]) => ListState<T>;

export function createReducer<T>(
  opt?: ListCreateReducerOptions<T>
): [Reducer<ListState<T>>, ListStateGenerator<T>];

/* create selector */

export interface ListCreateSelectorOptions<T> {
  selector?(state: any): ListState<T>;
}
export function createSelectorAll<T>(
  opt?: ListCreateSelectorOptions<T>
): (state: ListState<T>) => T[];

export function createSelectorById<T>(
  opt?: ListCreateSelectorOptions<T>
): (state: ListState<T>, id: string) => T;
export function createSelectorById<T>(
  opt?: ListCreateSelectorOptions<T>
): (state: ListState<T>, id: string[]) => T[];
