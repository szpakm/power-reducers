import {
  createPathReader,
  readCreateReducerParameter,
  createRegisterActionHandler
} from "../.internals";

/* helper */

const add = (state, delta) => {
  return typeof delta === "number" ? state + delta : state;
};

/* */

const DEFAULT_INITIAL = 0;

export const createReducer = ({
  initial = DEFAULT_INITIAL,
  incrementOn,
  decrementOn,
  incrementByOn,
  decrementByOn,
  setOn,
  resetOn,
  emptyOn,
  _customHandlers
} = {}) => {
  const generateState = (data = initial) => data;
  const getInitialState = () => generateState();
  const initialState = getInitialState();
  const emptyState = generateState(0);
  const actionHandler = Object.create(null);
  const registerActionHandler = createRegisterActionHandler.bind(actionHandler);

  if (incrementOn) {
    readCreateReducerParameter(incrementOn).forEach(opt => {
      registerActionHandler(opt.type, state => add(state, 1));
    });
  }
  if (decrementOn) {
    readCreateReducerParameter(decrementOn).forEach(opt => {
      registerActionHandler(opt.type, state => add(state, -1));
    });
  }
  if (incrementByOn) {
    readCreateReducerParameter(incrementByOn).forEach(opt => {
      const readActionPayload = createPathReader(opt.payload);
      registerActionHandler(opt.type, (state, action) => {
        return add(state, readActionPayload(action));
      });
    });
  }
  if (decrementByOn) {
    readCreateReducerParameter(decrementByOn).forEach(opt => {
      const readActionPayload = createPathReader(opt.payload);
      registerActionHandler(opt.type, (state, action) => {
        return add(state, -readActionPayload(action));
      });
    });
  }
  if (setOn) {
    readCreateReducerParameter(setOn).forEach(opt => {
      const readActionPayload = createPathReader(opt.payload);
      registerActionHandler(opt.type, (state, action) => {
        const val = readActionPayload(action);
        return val;
      });
    });
  }
  if (resetOn) {
    readCreateReducerParameter(resetOn).forEach(opt => {
      registerActionHandler(opt.type, () => initialState);
    });
  }
  if (emptyOn) {
    readCreateReducerParameter(emptyOn).forEach(opt => {
      registerActionHandler(opt.type, () => emptyState);
    });
  }
  if (_customHandlers) {
    readCreateReducerParameter(_customHandlers).forEach(opt => {
      registerActionHandler(opt.type, opt.handler);
    });
  }

  const reducer = function counterReducer(state = initialState, action) {
    return actionHandler[action.type]
      ? actionHandler[action.type](state, action)
      : state;
  };

  return [reducer, { generateState, getInitialState }];
};
