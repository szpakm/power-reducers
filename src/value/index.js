import {
  createPathReader,
  readCreateReducerParameter,
  createRegisterActionHandler
} from "../.internals";

const DEFAULT_INITIAL = "";

export const createReducer = ({
  initial = DEFAULT_INITIAL,
  setOn,
  resetOn,
  _customHandlers
} = {}) => {
  const generateState = (data = initial) => data;
  const getInitialState = () => generateState();
  const initialState = getInitialState();
  const actionHandler = Object.create(null);
  const registerActionHandler = createRegisterActionHandler.bind(actionHandler);

  if (setOn) {
    readCreateReducerParameter(setOn).forEach(opt => {
      const readActionPayload = createPathReader(opt.payload);
      registerActionHandler(opt.type, (state, action) =>
        readActionPayload(action)
      );
    });
  }
  if (resetOn) {
    readCreateReducerParameter(resetOn).forEach(opt => {
      registerActionHandler(opt.type, () => initialState);
    });
  }
  if (_customHandlers) {
    readCreateReducerParameter(_customHandlers).forEach(opt => {
      registerActionHandler(opt.type, opt.handler);
    });
  }

  const reducer = function valueReducer(state = initialState, action) {
    return actionHandler[action.type]
      ? actionHandler[action.type](state, action)
      : state;
  };

  return [reducer, { generateState, getInitialState }];
};
