import { createReducer } from "../src/value";

describe("value", () => {
  it("returns state when empty action is provided", () => {
    const [reducer] = createReducer();

    expect(reducer("state", {})).toEqual("state");
  });

  it("returns initial state when empty action is provided", () => {
    const [reducer] = createReducer({
      initial: "init"
    });

    expect(reducer(undefined, {})).toEqual("init");
  });

  it('returns default initial = "" when not provided', () => {
    const [reducer] = createReducer();

    expect(reducer(undefined, {})).toEqual("");
  });

  it("sets value", () => {
    const [reducer] = createReducer({
      setOn: { type: "set" }
    });

    expect(reducer("any", { type: "set", payload: ["x"] })).toEqual(["x"]);
  });

  it("resests to initial one of multiple actions", () => {
    const [reducer] = createReducer({
      resetOn: [{ type: "empty" }, { type: "reset" }],
      initial: ""
    });

    expect(reducer(["any"], { type: "reset" })).toEqual("");
  });

  it('returns custom on "_customHanlder"', () => {
    const [reducer] = createReducer({
      _customHandlers: [{ type: "dummy", handler: state => state*2 }]
    });

    expect(reducer(5, { type: "dummy" })).toEqual(10);
  });
});
