## power-reducers

- [counter](./counter.md)
- [toggle](./toggle.md)
- [value](./value.md)
- set-simple
- [task-simple](./task-simple.md)
- [list](./list.md)

---

# set-simple

State structure

```ts
type SetSimpleState<T> = T[];
```

```js
// set-simple example state
[1, "a", 2, true, "Batman"]; // only "simple" vaules
```

## createReducer

#### USAGE (example with redux)

```js
// reducers.js
import { combineReducers } from "redux";
import { createReducer } from "power-reducers/set-simple";
import { ADD_TAG, REMOVE_TAG, EMPTY_TAGS, SET_DEFAULT_TAG } from "./actions";

const [tags] = createReducer({
  initial: ['js'],
  addOn: ADD_TAG,
  removeOn: { type: REMOVE_TAG, payload: 'tag' } // will read from action.tag
  resetOn: SET_DEFAULT_TAG,
  emptyOn: EMPTY_TAGS
  // other parameters
});

export default combineReducers({
  tags
});
```

#### RETURNS

```javascript
[
  reducerFunction, // (state, action) => newState
  {
    getInitialState, // () => initialState
    generateState // (value: boolean) => taskSimpleState
  }
] = createReducer(/* ... */);
```

#### PARAMETERS

#### **`initial`**

> Initial/default values.

type: `Array<T>`

default: `[]`

#### **`setOn`**<sup>1</sup>

> What action(s) will set state content

Handled action(s) example:

```js
{ type: "SET_LANGS", payload: ["js", "ts", "css"] }
```

#### **`addOn`**<sup>1</sup>

> What action(s) will add items to the set

Handled action(s) example:

```js
{ type: "ADD_LANGS", payload: ["js", "ts", "css"] }, // multi
{ type: "ADD_LANG", payload: "c++"] } // single
```

#### **`removeOn`**<sup>1</sup>

> What action(s) will remove (filter out) items from the set

Handled action(s) example:

```js
{ type: "REMOVE_LANGS", payload: ["js", "ts", "css"] }, // multi
{ type: "REMOVE_LANG", payload: "c++"] } // single
```

#### **`resetOn`**<sup>1</sup>

> What action(s) will reset sate to the initial

Handled action(s) example:

```js
{ type: "SET_DEFAULT_LANGS", ... }
```

#### **`emptyOn`**<sup>1</sup>

> What action(s) will make set empty

Handled action(s) example:

```js
{ type: "CLEAR_LANGS", ... }
```

#### **`_customHandlers`**

> Create own reducers for different action(s) types (try to avoid this).

Example

```javascript
createReducer({
  // ...
  _customHandlers: [
    {
      type: "REMOVE_FRONTEND",
      handler: (state, action) => {
        // return new state for action.type === "REMOVE_FRONTEND"
      }
    }
  ]
});
```

---

**<sup>1</sup>** type HandlerOption - single item **or Array** containing the following types (can be mixed):

| Parameter example                                       | Valid action example                                  |
| ------------------------------------------------------- | ----------------------------------------------------- |
| `"ADD_ITEMS"`                                           | `{ type: "ADD_ITEMS", payload: /* some data */ }`     |
| `{ type: "ADD_ITEMS" }`                                 | `{ type: "ADD_ITEMS", payload: /* some data */ }`     |
| `{ type: "REMOVE_ITEMS", payload: "items" }`            | `{ type: "REMOVE_ITEMS", items: /* some data */ }`    |
| `{ type: "REMOVE_ITEMS", payload: (action) => someData` | `{ type: "REMOVE_ITEMS", /* data to be resolved */ }` |
