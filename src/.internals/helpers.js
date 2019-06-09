/**
 *
 * @param {*} message
 */
export const warn = message =>
  (console.warn || Function.prototype)("power-reducers: " + message);

/**
 * Converts provided data to array (if it isn't already)
 * @param {*} data
 */
export const readAsArray = data => {
  return Array.isArray(data) ? data : [data];
};

/**
 * Creates action payload selector.
 * @param {string | function} path - path to action payload or payload resolver
 */
const _pathReaderCache = Object.create(null);
export const createPathReader = (path = "payload") => {
  if (typeof path === "function") {
    return path;
  }

  const uuid = String(path);

  if (_pathReaderCache[uuid]) {
    return _pathReaderCache[uuid];
  }

  const parts = Array.isArray(path) ? path : path.split(".");
  if (!parts.length || parts.length > 3) {
    throw new Error("power-reducers: path length must be 1-3 levels deep");
  }

  /*
    Due to performance(size) didn't use lodash/pick or more sophisticated way.
    To be reconsidered.
    Performance of this should be improved anyway...
  */
  if (parts.length === 1) {
    _pathReaderCache[uuid] = data => (data || {})[parts[0]];
  } else if (parts.length === 2) {
    _pathReaderCache[uuid] = data => ((data || {})[parts[0]] || {})[parts[1]];
  } else if (parts.length === 3) {
    _pathReaderCache[uuid] = data =>
      (((data || {})[parts[0]] || {})[parts[1]] || {})[parts[2]];
  }

  return _pathReaderCache[uuid];
};

/**
 * Converts all valid createReducerParameter which are:
 * (string, string[], { type: string }, Array<{type: string})
 * to common format: Array<{ type: string, ... }>
 * @param {*} param
 */
export const readCreateReducerParameter = param => {
  const options = Array.isArray(param) ? param : [param];
  return options.map(opt => {
    if (typeof opt === "string") {
      return { type: opt };
    }
    // else opt should be { type: ..., payload: ..., ... }
    return opt;
  });
};

/**
 * Add handler (function) to provided object in specific field name.
 * Performs necessary validations/warnings.
 *
 * Why is "create.." prefix?
 * Because it is ment to be used with .bind(container)
 *
 * @param {*} actionType
 * @param {*} handler
 */
export function createRegisterActionHandler(actionType, handler) {
  const container = this;
  if (Reflect.has(container, actionType)) {
    warn("multiple handlers for action type " + actionType);
  }

  container[actionType] = handler;
}
