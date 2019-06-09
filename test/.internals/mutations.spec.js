import {
  createUpdateById,
  createAddById,
  createRemoveById,
  createAddIds,
  applyAddItems,
  applyRemoveItems
} from "../../src/.internals/mutations";

describe(".internals/mutations/applyAddItems", () => {
  it("adds items to set", () => {
    const source = ["1", "2"];
    const add = ["a", "b", "1"];

    expect(applyAddItems(source, add)).toEqual(["2", "a", "b", "1"]);
  });

  it("adds single item to set", () => {
    const source = ["1", "2"];
    const add = "a";

    expect(applyAddItems(source, add)).toEqual(["1", "2", "a"]);
  });

  it("add ids to empty set", () => {
    const source = [];
    const add = ["a", "b", "1"];

    expect(applyAddItems(source, add)).toEqual(["a", "b", "1"]);
  });
});

describe(".internals/mutations/createUpdateById", () => {
  it("create function that update BYID single item", () => {
    const source = { x: { id: "x", val: "X" } };
    const update = { id: "x", val2: "Y" };

    const updateById = createUpdateById("id");

    expect(updateById(source, update)).toEqual({
      x: { id: "x", val: "X", val2: "Y" }
    });
  });

  it("create function that update BYID multiple items", () => {
    const source = {
      "1": { id: "1", val: "X1" },
      "2": { id: "2", val: "X2"}
    };
    const updates = [
      { id: "1", val2: "Y1" },
      { id: "2", val2: "Y2"}
    ];

    const updateById = createUpdateById("id");

    expect(updateById(source, updates)).toEqual({
      "1": { id: "1", val: "X1", val2: "Y1" },
      "2": { id: "2", val: "X2", val2: "Y2" },
    });
  });

  it("create function that returns BYID unchanged when item to update is not found", () => {
    const source = {
      "1": { id: "1", val: "X1" }
    };
    const updates = [
      { id: "2", val2: "Y2"}
    ];

    const updateById = createUpdateById("id");

    expect(updateById(source, updates)).toEqual({
      "1": { id: "1", val: "X1"}
    });
  });
});

describe(".internals/mutations/applyRemoveItems", () => {
  it("remove multiple items from set", () => {
    const source = ["1", "2"];
    const remove = ["a", "b", "1"];

    expect(applyRemoveItems(source, remove)).toEqual(["2"]);
  });

  it("remove single single item from set", () => {
    const source = ["1", "2"];
    const remove = "1";

    expect(applyRemoveItems(source, remove)).toEqual(["2"]);
  });
});

describe(".internals/mutations/createAddById", () => {
  it("create funct that add BYID single item", () => {
    const source = { x: { uuid: "x" } };
    const update = { uuid: "y" };

    const addById = createAddById("uuid");

    expect(addById(source, update)).toEqual({
      x: { uuid: "x" },
      y: { uuid: "y" }
    });
  });
});

describe(".internals/mutations/createRemoveById", () => {
  it("create funct that removes BYID multiple items", () => {
    const source = {
      x: { uuid: "x" },
      y: { uuid: "y" }
    };
    const removeById = createRemoveById("uuid");

    expect(removeById(source, ["x"])).toEqual({
      y: { uuid: "y" }
    });
  });
});

describe(".internals/mutations/createAddIds", () => {
  it("create funct that add BYID multiple items", () => {
    const source = ["x", "a", "b"];
    const add = [{ uuid: "x" }, { uuid: "y" }];
    const addIds = createAddIds("uuid");

    expect(addIds(source, add)).toEqual(["a", "b", "x", "y"]);
  });
});
