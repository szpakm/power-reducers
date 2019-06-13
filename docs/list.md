- [counter](docs/counter.md)
- [toggle](docs/toggle.md)
- [value](docs/value.md)
- [set-simple](docs/set-simple.md)
- [task-simple](docs/task-simple.md)
- list

---

## list

### State structure

```ts
interface ListState<ItemType> {
  byId: { [key: string]: ItemType };
  ids: string[];
}
```
Example:

```js
  // list of 
  {
    byId: {
      'i1': { uuid: 'i1', desc: 'item 1', ... },
      'i2': { uuid: 'i2', desc: 'item 2', ... },
      ...
    },
    allIds: ['p1', 'p2', ...]
  }
```

### **createReducer**

Parameters

| Parameter             | Type                     | Description                                                               |
| --------------------- | ------------------------ | ------------------------------------------------------------------------- |
| **`initial`**         | Array\<items\>           | Initial content of the list (default `[]`)                                |
| **`idName`**          | string                   | Name of identifier field for every list item (default `"uuid"`)           |
| **`setOn`**           | HandlerOption[_1_]       | Action(s) for setting list content (replacing existing content)           |
| **`addOn`**           | HandlerOption[_1_]       | Action(s) for adding single item or array of items to the list            |
| **`removeOn`**        | HandlerOption[_1_]       | Action(s) for removing list item(s) by identifier or array of identifiers |
| **`updateOn`**        | HandlerOption[_1_]       | Action(s) for updating (merging) items with provided item(s)              |
| **`emptyOn`**         | HandlerOption[_1_]       | Action(s) for clearing out list content                                   |
| **`resetOn`**         | HandlerOption[_1_]       | Action(s) for bringing back the initial content of the list               |
| **`_customHandlers`** | CustomHandlerOption[_2_] | Action(s) with custom reducer functions - see example below               |

### Example 1 - redux

```js
// contacts/reducers.js
import { combineReducers } from "redux";
import { createReducer } from "power-reducers/list";
import {
  FETCHING_SUCCESS,
  ERROR,
  UPDATE_SINGLE,
  BATCH_UPDATE,
  REMOVE,
  ADD,
  REMOVE_ALL
} from "./actions";

const [contacts] = createReducer({
  idName: "contact_id", // unique field name
  initial: [], // no items at start
  setOn: FETCHING_SUCCESS, // read data from action.payload
  removeOn: { type: REMOVE, payload: "idsToRemove" }, // read data from action.idsToRemove
  emptyOn: [REMOVE_ALL, ERROR] // two action types cause
});

export default combineReducers({
  // ...
  contacts
});
```

### **`createSelectorAll`** parameter

