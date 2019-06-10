import {
  createPathReader,
  createAddById,
  createAddIds,
  createUpdateById,
  createRemoveById,
  applyRemoveItems,
  readCreateReducerParameter,
  createRegisterActionHandler
} from "../.internals";

const DEFAULT_INITIAL = [];

export const createReducer = ({
  idName = "uuid",
  initial = DEFAULT_INITIAL,
  setOn,
  addOn,
  updateOn,
  removeOn,
  emptyOn,
  resetOn,
  _customHandlers
} = {}) => {
  const addToById = createAddById(idName);
  const addToIds = createAddIds(idName);
  const updateById = createUpdateById(idName);

  const generateState = (data = initial) => ({
    byId: addToById({}, data),
    ids: addToIds([], data)
  });

  const defaultState = generateState(initial);
  const emptyState = generateState([]);
  const actionHandler = Object.create(null);
  const registerActionHandler = createRegisterActionHandler.bind(actionHandler);

  if (setOn) {
    readCreateReducerParameter(setOn).forEach(opt => {
      const readActionPayload = createPathReader(opt.payload);
      registerActionHandler(opt.type, (state, action) => {
        const items = readActionPayload(action);

        return {
          ...state,
          byId: addToById({}, items),
          ids: addToIds([], items)
        };
      });
    });
  }
  if (addOn) {
    readCreateReducerParameter(addOn).forEach(opt => {
      const readActionPayload = createPathReader(opt.payload);
      registerActionHandler(opt.type, (state, action) => {
        const items = readActionPayload(action);

        return {
          ...state,
          byId: addToById(state.byId, items),
          ids: addToIds(state.ids, items)
        };
      });
    });
  }
  if (updateOn) {
    readCreateReducerParameter(updateOn).forEach(opt => {
      const readActionPayload = createPathReader(opt.payload);
      registerActionHandler(opt.type, (state, action) => {
        const updates = readActionPayload(action);

        return {
          ...state,
          byId: updateById(state.byId, updates)
        };
      });
    });
  }
  if (removeOn) {
    const removeFromById = createRemoveById(idName);
    readCreateReducerParameter(removeOn).forEach(opt => {
      const readActionPayload = createPathReader(opt.payload);
      registerActionHandler(opt.type, (state, action) => {
        const ids = readActionPayload(action);

        return {
          ...state,
          byId: removeFromById(state.byId, ids),
          ids: applyRemoveItems(state.ids, ids)
        };
      });
    });
  }
  if (emptyOn) {
    readCreateReducerParameter(emptyOn).forEach(opt => {
      registerActionHandler(opt.type, state => {
        return {
          ...state,
          byId: emptyState.byId,
          ids: emptyState.ids
        };
      });
    });
  }
  if (resetOn) {
    readCreateReducerParameter(resetOn).forEach(opt => {
      registerActionHandler(opt.type, state => {
        return {
          ...state,
          byId: defaultState.byId,
          ids: defaultState.ids
        };
      });
    });
  }
  if (_customHandlers) {
    readCreateReducerParameter(_customHandlers).forEach(opt => {
      registerActionHandler(opt.type, opt.handler);
    });
  }

  const reducer = function listReducer(state = defaultState, action) {
    return actionHandler[action.type]
      ? actionHandler[action.type](state, action)
      : state;
  };

  return [reducer, generateState];
};

/* selectors */

/**
 * Creates selector for getting all list items as array
 * @param {*} param0
 */
export const createSelectorAll = ({ selector } = {}) => {
  const selectReducerState =
    typeof selector === "function" ? selector : state => state;

  return state => {
    const list = selectReducerState(state);

    return list.ids.map(id => list.byId[id]);
  };
};

/**
 * Creates selector of getting element by id
 * @param {*} param0
 */
export const createSelectorById = ({ selector }) => {
  const selectReducerState =
    typeof selector === "function" ? selector : state => state;

  return (state, id) => {
    const byId = selectReducerState(state).byId;
    if (Array.isArray(id)) {
      return id.map(itemId => byId[itemId]);
    }
    // else id: string
    return byId[id];
  };
};
