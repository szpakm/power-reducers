import { createReducer } from "../src/toggle";

describe("toggle", () => {
  it("returns state when empty action is provided", () => {
    const [reducer] = createReducer();

    expect(reducer(true, {})).toEqual(true);
  });

  it("returns initial state when empty action is provided", () => {
    const [reducer] = createReducer({
      initial: true
    });

    expect(reducer(undefined, {})).toEqual(true);
  });

  it("returns default initial = false when not provided", () => {
    const [reducer] = createReducer();

    expect(reducer(undefined, {})).toEqual(false);
  });

  it("sets value", () => {
    const [reducer] = createReducer({
      setOn: { type: "set" }
    });

    expect(reducer(["any"], { type: "set", payload: true })).toEqual(true);
  });

  it("toggles value", () => {
    const [reducer] = createReducer({
      toggleOn: { type: "toggle" }
    });

    expect(reducer(true, { type: "toggle" })).toEqual(false);
  });

  it("makes true on action", () => {
    const [reducer] = createReducer({
      makeTrueOn: { type: "makeTrue" }
    });

    expect(reducer(true, { type: "makeTrue" })).toEqual(true);
  });

  it("makes false on action", () => {
    const [reducer] = createReducer({
      makeFalseOn: { type: "makeFalse" }
    });

    expect(reducer(true, { type: "makeFalse" })).toEqual(false);
  });

  it("resets to initial on action", () => {
    const [reducer] = createReducer({
      initial: true,
      resetOn: { type: "resetOn" }
    });

    expect(reducer(true, { type: "resetOn" })).toEqual(true);
  });

  it('returns custom on "_customHanlder"', () => {
    const [reducer] = createReducer({
      _customHandlers: [{ type: "dummy", handler: state => !state }]
    });

    expect(reducer(false, { type: "dummy" })).toEqual(true);
  });
});
