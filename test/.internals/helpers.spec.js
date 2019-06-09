import {
  readAsArray,
  warn,
  createPathReader,
  readCreateReducerParameter,
  createRegisterActionHandler
} from "../../src/.internals/helpers";

describe(".internals/helpers/readAsArray", () => {
  it("reads string as array with string", () => {
    expect(readAsArray("VALUE")).toEqual(["VALUE"]);
  });

  it("reads array without changes", () => {
    expect(readAsArray(["VALUE"])).toEqual(["VALUE"]);
  });
});

describe(".internals/helpers/warn", () => {
  it("calls console.warn with prefix when available", () => {
    const preSpy = console.warn;
    const spy = jest.fn();

    console.warn = spy;
    try {
      warn("Test");
      expect(spy.mock.calls[0][0]).toBe("power-reducers: Test");
    } finally {
      spy.mockClear();
      console.warn = preSpy;
    }
  });

  it("does not throw when console.warn is not available", () => {
    const realConsole = global.console;
    Object.defineProperty(global, "console", { value: {} });
    try {
      expect(() => warn("Test")).not.toThrow();
    } finally {
      Object.defineProperty(global, "console", { value: realConsole });
    }
  });
});

describe(".internals/helpers/createPathReader", () => {
  it("reads from 3 levels deep path", () => {
    const data = { x: { y: { z: "goal!" } } };
    const read = createPathReader("x.y.z");

    expect(read(data)).toEqual("goal!");
  });

  it("returns undefined for non existing field in the middle of path", () => {
    const data = { x: { y: { z: "goal!" } } };
    const read = createPathReader("x.p.z");

    expect(read(data)).toBeUndefined();
  });

  it("returns undefined for non existing field at the beginning of path", () => {
    const data = {};
    const read = createPathReader("x.y.z");
    expect(read(data)).toBeUndefined();
  });

  it("returns undefined for non existing field at the end of path", () => {
    const data = { x: { y: { z: "goal!" } } };
    const read = createPathReader("x.y.p");

    expect(read(data)).toBeUndefined();
  });

  it('returns "payload" for no path provided', () => {
    const data = { payload: "goal!" };
    const read = createPathReader();

    expect(read(data)).toEqual("goal!");
  });

  it("returns valid paylod for payload as a function", () => {
    const data = { s: "goal!" };
    const read = createPathReader(action => action.s);

    expect(read(data)).toEqual("goal!");
  });

  it("works if path is an Array", () => {
    const data = { x: { y: { z: "goal!" } } };
    const read = createPathReader(["x", "y", "z"]);

    expect(read(data)).toEqual("goal!");
  });
});

describe(".internals/helpers/readCreateReducerParameter", () => {
  it("reads single advanced parameter", () => {
    const input = { type: "testType", payload: "testPath" };
    const expectedOutput = [input];

    expect(readCreateReducerParameter(input)).toEqual(expectedOutput);
  });

  it("reads array of advanced parameters", () => {
    const input = [
      { type: "testType1", payload: "testPath1" },
      { type: "testType2", payload: "testPath2" }
    ];
    const expectedOutput = input;

    expect(readCreateReducerParameter(input)).toEqual(expectedOutput);
  });

  it("reads simple parameter", () => {
    const input = "test-action-name";
    const expectedOutput = [{ type: "test-action-name" }];

    expect(readCreateReducerParameter(input)).toEqual(expectedOutput);
  });

  it("reads array of simple parameters", () => {
    const input = ["test-action-name1", "test-action-name2"];
    const expectedOutput = [
      { type: "test-action-name1" },
      { type: "test-action-name2" }
    ];

    expect(readCreateReducerParameter(input)).toEqual(expectedOutput);
  });

  it("reads array of mixed parameters", () => {
    const input = ["test-action-name1", { type: "test-action-name2" }];
    const expectedOutput = [
      { type: "test-action-name1" },
      { type: "test-action-name2" }
    ];

    expect(readCreateReducerParameter(input)).toEqual(expectedOutput);
  });
});

describe(".internals/helpers/createRegisterActionHandler", () => {
  it("registers basic action handlers", () => {
    const container = {};
    const handler1 = () => {};
    const handler2 = () => {};
    const registerActionHandler = createRegisterActionHandler.bind(container);

    registerActionHandler("key1", handler1);
    registerActionHandler("key2", handler2);

    expect(container).toEqual({
      key1: handler1,
      key2: handler2
    });
  });
});

describe(".internals/helpers/createRegisterActionHandler", () => {
  it("warns when assigning multiple handlers to a single action type", () => {
    const container = {};
    const registerActionHandler = createRegisterActionHandler.bind(container);

    const preSpy = console.warn;
    const spy = jest.fn();
    console.warn = spy;
    try {
      registerActionHandler("ACTION_TYPE", () => {});
      registerActionHandler("ACTION_TYPE", () => {});

      expect(spy.mock.calls[0][0]).toBe(
        "power-reducers: multiple handlers for action type ACTION_TYPE"
      );
    } finally {
      spy.mockClear();
      console.warn = preSpy;
    }
  });
});
