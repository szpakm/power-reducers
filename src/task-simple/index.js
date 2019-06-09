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

  const defaultState = generateState(initial);
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
          isPending: false,
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
          isPending: false,
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

  const reducer = function taskSimpleReducer(state = defaultState, action) {
    return actionHandler[action.type]
      ? actionHandler[action.type](state, action)
      : state;
  };

  return [reducer, generateState];
};

export const selectIsPending = (state = {}) => state.isPending;

export const selectIsError = (state = {}) => !!state.error;

export const selectIsSuccess = state =>
  !selectIsPending(state) && !selectIsError(state);
