## power-reducers

- [counter](./counter.md)
- toggle
- [value](./value.md)
- [set-simple](./set-simple.md)
- [task-simple](./task-simple.md)
- [list](./list.md)

---

# toggle

State structure

```ts
type ToggleState = boolean;
```

```js
// toggle example state
false; // :)
```

## createReducer

#### USAGE (example with redux)

```js
// reducers.js
import { combineReducers } from "redux";
import { createReducer } from "power-reducers/toggle";
import { OPEN, CLOSE, SUBMIT, TOGGLE_FULLSCREEN } from "./actions";

const [modalIsVisible] = createReducer({
  makeTrueOn: OPEN,
  makeFalseOn: [CLOSE, SUBMIT]
  // other parameters
});
const [modalIsFullscreen] = createReducer({
  initial: false,
  toggleOn: TOGGLE_FULLSCREEN
});

export default combineReducers({
  modalIsVisible,
  modalIsFullscreen
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

> Initial/default value.

type: `boolean`

default: `false`

#### **`toggleOn`<sup>1</sup>**

> What action(s) toggles the state (true/false)

Handled action(s) example:

```js
{ type: "TOGGLE_FULLSCREEN", ... }
```

#### **`makeTrueOn`<sup>1</sup>**

> What action(s) will make state `true`

Handled action(s) example:

```js
{ type: 'SHOW_MODAL', ... }
```

#### **`makeFalseOn`<sup>1</sup>**

> What action(s) will make state `false`

Handled action(s) example:

```js
{ type: "HIDE_MODAL", ... }
```

#### **`setOn`<sup>1</sup>**

> What action(s) will manually set state

Handled action(s) example:

```js
{
  type: "SET_MODAL_VISIBILITY",
  payload: false // "payload" is default data field name
}
```

#### **`resetOn`<sup>1</sup>**

> What action(s) will reset value to initially set.

Handled action(s) example:

```js
{ type: "RESET_VISIBILITY", ... }
```

#### **`_customHandlers`**

> Create own reducers for different action(s) types (try to avoid this).

Example

```javascript
createReducer({
  // ...
  _customHandlers: [
    {
      type: "SOME_ACTION",
      handler: (state, action) => {
        // return new state for action.type === "SOME_ACTION"
      }
    }
  ]
});
```

---

<sup>1</sup> type HandlerOption - single item **or Array** containing the following types (can be mixed):

| Parameter example                                    | Valid action example                               |
| ---------------------------------------------------- | -------------------------------------------------- |
| `"SET_VALUE"`                                        | `{ type: "SET_VALUE", payload: /* some data */ }`  |
| `{ type: "SET_VALUE" }`                              | `{ type: "SET_VALUE", payload: /* some data */ }`  |
| `{ type: "SET_VALUE", payload: "ids" }`              | `{ type: "SET_VALUE", ids: /* some data */ }`      |
| `{ type: "SET_VALUE", payload: (action) => someData` | `{ type: "SET_VALUE", /* data to be resolved */ }` |
