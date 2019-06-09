export type OptionSimple = string;

export interface Action<T = any> {
  type: T;
}

export interface AnyAction extends Action {
  [extraProps: string]: any;
}

export interface OptionAdvanced {
  type: string;
  payload?: string | ((action: Action) => string);
}

export type CreateReducerOption =
  | OptionAdvanced
  | OptionSimple
  | Array<OptionAdvanced | OptionSimple>;

export type OptionCustom<S> = {
  type: string;
  handler: Reducer<S>;
};

export type CreateReduerOptionCustom<S = any> =
  | OptionCustom<S>
  | Array<OptionCustom<S>>;

export type Reducer<S = any, A extends Action = AnyAction> = (
  state: S | undefined,
  action: A
) => S;
