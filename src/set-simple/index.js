import {
  applyAddItems,
  applyRemoveItems,
  readCreateReducerParameter,
  createPathReader,
  createRegisterActionHandler
} from "../.internals";

const DEFAULT_INITIAL = [];

export const createReducer = ({
  initial = DEFAULT_INITIAL,
  setOn,
  addOn,
  removeOn,
  resetOn,
  emptyOn,
  _customHandlers
} = {}) => {
  const generateState = (data = initial) => data;
  const getInitialState = () => generateState();
  const initialState = getInitialState();
  const emptyState = generateState([]);
  const actionHandler = Object.create(null);
  const registerActionHandler = createRegisterActionHandler.bind(actionHandler);

  if (setOn) {
    readCreateReducerParameter(setOn).forEach(opt => {
      const readActionPayload = createPathReader(opt.payload);
      registerActionHandler(opt.type, (state, action) => {
        return applyAddItems([], readActionPayload(action));
      });
    });
  }
  if (addOn) {
    readCreateReducerParameter(addOn).forEach(opt => {
      const readActionPayload = createPathReader(opt.payload);
      registerActionHandler(opt.type, (state, action) => {
        return applyAddItems(state, readActionPayload(action));
      });
    });
  }
  if (removeOn) {
    readCreateReducerParameter(removeOn).forEach(opt => {
      const readActionPayload = createPathReader(opt.payload);
      registerActionHandler(opt.type, (state, action) => {
        return applyRemoveItems(state, readActionPayload(action));
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

  const reducer = function setSimpleReducer(state = initialState, action) {
    return actionHandler[action.type]
      ? actionHandler[action.type](state, action)
      : state;
  };

  return [reducer, { generateState, getInitialState }];
};
