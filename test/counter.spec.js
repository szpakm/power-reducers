import { createReducer } from "../src/counter";

describe("counter", () => {
  it("returns state when empty action is provided", () => {
    const [reducer] = createReducer();

    expect(reducer(10, {})).toEqual(10);
  });

  it("sets initial state if none provided", () => {
    const [reducer] = createReducer({
      initial: 10
    });

    expect(reducer(undefined, {})).toEqual(10);
  });

  it("sets default initial state = 0 if none provided", () => {
    const [reducer] = createReducer();

    expect(reducer(undefined, {})).toEqual(0);
  });

  it('increments on "incrementOn" action', () => {
    const [reducer] = createReducer({
      incrementOn: { type: "incrementOn" }
    });

    expect(reducer(10, { type: "incrementOn" })).toEqual(11);
  });

  it('decrements on multiple "decrementOn" actions', () => {
    const [reducer] = createReducer({
      decrementOn: [{ type: "decrementOnFirst" }, { type: "decrementOnSecond" }]
    });
    const step1 = reducer(10, { type: "decrementOnFirst" });

    expect(reducer(step1, { type: "decrementOnSecond" })).toEqual(8);
  });

  it('increments by on "incrementByOn" action', () => {
    const [reducer] = createReducer({
      incrementByOn: { type: "increment", payload: action => action.by }
    });

    expect(reducer(10, { type: "increment", by: 5 })).toEqual(15);
  });

  it('decrements by on "decrementByOn" multiple actions', () => {
    const [reducer] = createReducer({
      decrementByOn: [
        { type: "decrementByOnFirst", payload: "byFirst" },
        { type: "decrementByOnSecond" }
      ]
    });
    const step1 = reducer(10, { type: "decrementByOnFirst", byFirst: 5 });

    expect(reducer(step1, { type: "decrementByOnSecond", payload: 4 })).toEqual(
      1
    );
  });

  it('sets value on "setOn" action', () => {
    const [reducer] = createReducer({
      setOn: { type: "setValue" }
    });

    expect(reducer(10, { type: "setValue", payload: 20 })).toEqual(20);
  });

  it('resets value to initial on "resetOn" action', () => {
    const [reducer] = createReducer({
      initial: 7,
      resetOn: { type: "reset" }
    });

    expect(reducer(10, { type: "reset" })).toEqual(7);
  });

  it('resets value to 0 (not initial) on "emptyOn" action', () => {
    const [reducer] = createReducer({
      initial: 7,
      emptyOn: { type: "empty" }
    });

    expect(reducer(10, { type: "empty" })).toEqual(0);
  });

  it('doubles value on "_customHanlder"', () => {
    const [reducer] = createReducer({
      _customHandlers: [{ type: "double", handler: state => state * 2 }]
    });

    expect(reducer(10, { type: "double" })).toEqual(20);
  });
});
