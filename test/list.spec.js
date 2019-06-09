import {
  createReducer,
  createSelectorAll,
  createSelectorById
} from "../src/list";

const emptyState = {
  byId: {},
  ids: []
};

describe("list", () => {
  describe("createSelector", () => {
    it("returns state when empty action is provided", () => {
      const [reducer] = createReducer();

      expect(reducer(emptyState, {})).toEqual(emptyState);
    });

    it("returns initial state when empty action is provided", () => {
      const [reducer] = createReducer({
        initial: [{ uuid: "x" }]
      });

      expect(reducer(undefined, {})).toEqual({
        byId: { x: { uuid: "x" } },
        ids: ["x"]
      });
    });

    it("returns default initial = [] -> emptyState when not provided", () => {
      const [reducer] = createReducer();

      expect(reducer(undefined, { type: "whatever" })).toEqual(emptyState);
    });

    it("sets single item on setOn", () => {
      const [reducer] = createReducer({
        setOn: { type: "setOn" }
      });

      expect(
        reducer(emptyState, { type: "setOn", payload: { uuid: "id1" } })
      ).toEqual({
        byId: { id1: { uuid: "id1" } },
        ids: ["id1"]
      });
    });

    it("sets multiple items on setOn", () => {
      const [reducer] = createReducer({
        setOn: { type: "setOn" }
      });

      expect(
        reducer(emptyState, { type: "setOn", payload: [{ uuid: "id1" }] })
      ).toEqual({
        byId: { id1: { uuid: "id1" } },
        ids: ["id1"]
      });
    });

    it("adds single item on addOn", () => {
      const [reducer] = createReducer({
        addOn: { type: "addOn" }
      });

      expect(
        reducer(
          {
            byId: { id0: { uuid: "id0" } },
            ids: ["id0"]
          },
          { type: "addOn", payload: { uuid: "id1" } }
        )
      ).toEqual({
        byId: { id0: { uuid: "id0" }, id1: { uuid: "id1" } },
        ids: ["id0", "id1"]
      });
    });

    it("adds multiple items on addOn", () => {
      const [reducer] = createReducer({
        addOn: { type: "addOn" }
      });

      expect(
        reducer(
          {
            byId: { id0: { uuid: "id0" } },
            ids: ["id0"]
          },
          {
            type: "addOn",
            payload: [{ uuid: "id1" }, { uuid: "id2" }]
          }
        )
      ).toEqual({
        byId: {
          id0: { uuid: "id0" },
          id1: { uuid: "id1" },
          id2: { uuid: "id2" }
        },
        ids: ["id0", "id1", "id2"]
      });
    });

    it("updates single item on updateOn", () => {
      const [reducer] = createReducer({
        idName: "idx",
        updateOn: { type: "updateOn" }
      });

      expect(
        reducer(
          {
            byId: { id0: { idx: "id0", name: "name1" } },
            ids: ["id0"]
          },
          { type: "updateOn", payload: { idx: "id0", updated: true } }
        )
      ).toEqual({
        byId: { id0: { idx: "id0", updated: true, name: "name1" } },
        ids: ["id0"]
      });
    });

    it("updates multiple items on updateOn", () => {
      const [reducer] = createReducer({
        idName: "idx",
        updateOn: { type: "updateOn" }
      });

      expect(
        reducer(
          {
            byId: {
              id0: { idx: "id0", name: "name0" },
              id1: { idx: "id1", name: "name1" }
            },
            ids: ["id0", "id1"]
          },
          {
            type: "updateOn",
            payload: [
              { idx: "id0", updated: true },
              { idx: "id1", updated: true },
              { idx: "id2", updated: true }
            ]
          }
        )
      ).toEqual({
        byId: {
          id0: { idx: "id0", updated: true, name: "name0" },
          id1: { idx: "id1", updated: true, name: "name1" }
        },
        ids: ["id0", "id1"]
      });
    });

    it("removes single items on removeOn", () => {
      const [reducer] = createReducer({
        removeOn: { type: "removeOn", payload: "removeId" }
      });

      expect(
        reducer(
          {
            byId: {
              id0: { uuid: "id0" },
              id1: { uuid: "id1" },
              id2: { uuid: "id2" }
            },
            ids: ["id0", "id1", "id2"]
          },
          {
            type: "removeOn",
            removeId: "id1"
          }
        )
      ).toEqual({
        byId: {
          id0: { uuid: "id0" },
          id2: { uuid: "id2" }
        },
        ids: ["id0", "id2"]
      });
    });

    it("removes multiple items on removeOn", () => {
      const [reducer] = createReducer({
        removeOn: { type: "removeOn", payload: "removeIds" }
      });

      expect(
        reducer(
          {
            byId: {
              id0: { uuid: "id0" },
              id1: { uuid: "id1" },
              id2: { uuid: "id2" }
            },
            ids: ["id0", "id1", "id2"]
          },
          {
            type: "removeOn",
            removeIds: ["id1", "id0"]
          }
        )
      ).toEqual({
        byId: {
          id2: { uuid: "id2" }
        },
        ids: ["id2"]
      });
    });

    it("makes empty on emptyOn", () => {
      const [reducer] = createReducer({
        emptyOn: { type: "emptyOn" }
      });

      expect(
        reducer(
          {
            byId: { id0: { idx: "id0", name: "name1" } },
            ids: ["id0"]
          },
          { type: "emptyOn" }
        )
      ).toEqual(emptyState);
    });

    it('add item "_customHanlder"', () => {
      const itemToAdd = { uuid: "x", name: "Mateusz" };
      const [reducer] = createReducer({
        _customHandlers: {
          type: "double",
          handler: state => ({
            byId: { ...state.byId, [itemToAdd.uuid]: itemToAdd },
            allIds: [...state.allIds, itemToAdd.uuid]
          })
        }
      });

      expect(reducer({ byId: {}, allIds: [] }, { type: "double" })).toEqual({
        byId: { x: { uuid: "x", name: "Mateusz" } },
        allIds: ["x"]
      });
    });
  });

  describe("createSelectorAll", () => {
    it("returns all items as an array", () => {
      const selector = state => state;
      const selectAll = createSelectorAll({ selector });

      expect(
        selectAll({
          byId: {
            id0: { uuid: "id0" },
            id1: { uuid: "id1" },
            id2: { uuid: "id2" }
          },
          ids: ["id0", "id1", "id2"]
        })
      ).toEqual([{ uuid: "id0" }, { uuid: "id1" }, { uuid: "id2" }]);
    });
  });

  describe("createSelectorById", () => {
    it("returns item by provided id", () => {
      const selector = state => state;
      const selectById = createSelectorById({ selector });

      expect(
        selectById(
          {
            byId: {
              id0: { uuid: "id0" },
              id1: { uuid: "id1" },
              id2: { uuid: "id2" }
            },
            ids: ["id0", "id1", "id2"]
          },
          "id1"
        )
      ).toEqual({ uuid: "id1" });
    });

    it("returns items by provided id as an array", () => {
      const selector = state => state;
      const selectById = createSelectorById({ selector });

      expect(
        selectById(
          {
            byId: {
              id0: { uuid: "id0" },
              id1: { uuid: "id1" },
              id2: { uuid: "id2" }
            },
            ids: ["id0", "id1", "id2"]
          },
          ["id1", "id0"]
        )
      ).toEqual([{ uuid: "id1" }, { uuid: "id0" }]);
    });
  });
});
