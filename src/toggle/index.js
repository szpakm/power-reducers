import {
  warn,
  createPathReader,
  readCreateReducerParameter,
  createRegisterActionHandler
} from "../.internals";

const DEFAULT_INITIAL = false;

export const createReducer = ({
  initial = DEFAULT_INITIAL,
  toggleOn,
  makeTrueOn,
  makeFalseOn,
  setOn,
  resetOn,
  _customHandlers
} = {}) => {
  const generateState = (data = initial) => data;
  const defaultState = generateState(initial);
  const actionHandler = Object.create(null);
  const registerActionHandler = createRegisterActionHandler.bind(actionHandler);

  if (toggleOn) {
    readCreateReducerParameter(toggleOn).forEach(opt => {
      registerActionHandler(opt.type, state => !state);
    });
  }
  if (makeTrueOn) {
    readCreateReducerParameter(makeTrueOn).forEach(opt => {
      registerActionHandler(opt.type, () => true);
    });
  }
  if (makeFalseOn) {
    readCreateReducerParameter(makeFalseOn).forEach(opt => {
      registerActionHandler(opt.type, () => false);
    });
  }
  if (setOn) {
    readCreateReducerParameter(setOn).forEach(opt => {
      const readActionPayload = createPathReader(opt.payload);
      registerActionHandler(opt.type, (state, action) => {
        const value = readActionPayload(action);

        if (typeof value !== "boolean") {
          warn(
            `toggle: setOn: action "${opt.type}" should have property ${
              opt.payload
            }`
          );
        }
        return !!value;
      });
    });
  }
  if (resetOn) {
    readCreateReducerParameter(resetOn).forEach(opt => {
      registerActionHandler(opt.type, () => defaultState);
    });
  }
  if (_customHandlers) {
    readCreateReducerParameter(_customHandlers).forEach(opt => {
      registerActionHandler(opt.type, opt.handler);
    });
  }

  const reducer = function toggleReducer(state = defaultState, action) {
    return actionHandler[action.type]
      ? actionHandler[action.type](state, action)
      : state;
  };

  return [reducer, generateState];
};
