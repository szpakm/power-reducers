import { createReducer } from "../src/task-simple";

const defaultState = {
  isPending: false,
  error: ""
};

describe("task-simple", () => {
  it("returns state when empty action is provided", () => {
    const [reducer] = createReducer();

    expect(reducer(defaultState, {})).toEqual(defaultState);
  });

  it("returns initial state when empty action is provided", () => {
    const initial = true;
    const [reducer] = createReducer({
      initial
    });

    expect(reducer(undefined, {})).toEqual({
      isPending: initial,
      error: defaultState.error
    });
  });

  it("starts on action", () => {
    const [reducer] = createReducer({
      startOn: { type: "start" }
    });

    expect(reducer(defaultState, { type: "start" })).toEqual({
      isPending: true,
      error: ""
    });
  });

  it("success on action", () => {
    const [reducer] = createReducer({
      successOn: { type: "success" }
    });

    expect(reducer(defaultState, { type: "success" })).toEqual({
      isPending: false,
      error: ""
    });
  });

  it("error on action", () => {
    const [reducer] = createReducer({
      errorOn: { type: "error", payload: "errorMsg" }
    });

    expect(reducer(defaultState, { type: "error", errorMsg: "uuups" })).toEqual(
      {
        isPending: false,
        error: "uuups"
      }
    );
  });

  it('returns custom data on "_customHanlder"', () => {
    const [reducer] = createReducer({
      _customHandlers: {
        type: "dummy",
        handler: state => ({
          isPending: !state.isPending,
          error: "yyy" + state.error
        })
      }
    });

    expect(
      reducer({ isPending: true, error: "xxx" }, { type: "dummy" })
    ).toEqual({ isPending: false, error: "yyyxxx" });
  });
});
