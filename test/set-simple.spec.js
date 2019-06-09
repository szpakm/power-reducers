import { createReducer } from "../src/set-simple";

describe("set-simple", () => {
  it("returns state when empty action is provided", () => {
    const [reducer] = createReducer();

    expect(reducer(["x"], {})).toEqual(["x"]);
  });

  it("returns initial state when empty action is provided", () => {
    const [reducer] = createReducer({
      initial: ["y"]
    });

    expect(reducer(undefined, {})).toEqual(["y"]);
  });

  it("returns default initial = [] when not provided", () => {
    const [reducer] = createReducer();

    expect(reducer(undefined, {})).toEqual([]);
  });

  it("sets value", () => {
    const [reducer] = createReducer({
      setOn: { type: "set" }
    });

    expect(reducer(["any"], { type: "set", payload: ["x"] })).toEqual(["x"]);
  });

  it("adds value", () => {
    const [reducer] = createReducer({
      addOn: { type: "add" }
    });

    expect(reducer(["any"], { type: "add", payload: ["x"] })).toEqual([
      "any",
      "x"
    ]);
  });

  it("removes value", () => {
    const [reducer] = createReducer({
      removeOn: { type: "remove" }
    });

    expect(reducer(["any", "x"], { type: "remove", payload: ["any"] })).toEqual(
      ["x"]
    );
  });

  it("makes empty", () => {
    const [reducer] = createReducer({
      emptyOn: { type: "empty" },
      initial: ["any"]
    });

    expect(reducer(["any", "x"], { type: "empty" })).toEqual([]);
  });

  it('doubles every values on "_customHanlder"', () => {
    const [reducer] = createReducer({
      _customHandlers: {
        type: "double",
        handler: state => state.map(item => item * 2)
      }
    });

    expect(reducer([10, 5, 4], { type: "double" })).toEqual([20, 10, 8]);
  });
});
