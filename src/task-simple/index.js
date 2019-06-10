import {
  warn,
  createPathReader,
  readCreateReducerParameter,
  createRegisterActionHandler
} from "../.internals";

const DEFAULT_INITIAL = false;

export const createReducer = ({
  initial = DEFAULT_INITIAL,
  startOn,
  successOn,
  errorOn,
  _customHandlers
} = {}) => {
  const generateState = (data = initial) => ({
    isPending: data,
    error: ""
  });
  const getInitialState = () => generateState();

  const defaultState = generateState(false);
  const initialState = getInitialState();
  const actionHandler = Object.create(null);
  const registerActionHandler = createRegisterActionHandler.bind(actionHandler);

  if (startOn) {
    readCreateReducerParameter(startOn).forEach(opt => {
      registerActionHandler([opt.type], state => {
        return {
          ...state,
          isPending: true,
          error: defaultState.error
        };
      });
    });
  }
  if (successOn) {
    readCreateReducerParameter(successOn).forEach(opt => {
      registerActionHandler([opt.type], state => {
        return {
          ...state,
          isPending: defaultState.isPending,
          error: defaultState.error
        };
      });
    });
  }
  if (errorOn) {
    readCreateReducerParameter(errorOn).forEach(opt => {
      const readActionPayload = createPathReader(opt.payload);
      registerActionHandler([opt.type], (state, action) => {
        const error =
          readActionPayload(action) ||
          `task-simple: couldn't resolve error message in action.type = ${
            opt.type
          }`;

        return {
          ...state,
          isPending: defaultState.isPending,
          error
        };
      });
    });
  }
  if (_customHandlers) {
    readCreateReducerParameter(_customHandlers).forEach(opt => {
      registerActionHandler(opt.type, opt.handler);
    });
  }

  const reducer = function taskSimpleReducer(state = initialState, action) {
    return actionHandler[action.type]
      ? actionHandler[action.type](state, action)
      : state;
  };

  return [reducer, { generateState, getInitialState }];
};

export const selectIsPending = (state = {}) => state.isPending;

export const selectIsError = (state = {}) => !!state.error;

export const selectIsSuccess = state =>
  !selectIsPending(state) && !selectIsError(state);
