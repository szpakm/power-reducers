## power-reducers

- [counter](./counter.md)
- [toggle](./toggle.md)
- value
- [set-simple](./set-simple.md)
- [task-simple](./task-simple.md)
- [list](./list.md)

---

# value

State structure

```ts
type ValueType = any; // prefer serializable types
```

```js
// value example state
"Batman";
```

## createReducer

#### USAGE (example with redux)

```js
// reducers.js
import { combineReducers } from "redux";
import { createReducer } from "power-reducers/value";
import { SET_TOKEN, LOGOUT, INVALIDATE_TOKEN } from "./actions";

const [token] = createReducer({
  initial: '',
  setOn: { type: SET_TOKEN, payload: 'token' } // data from action.token
  resetOn: [LOGOUT, INVALIDATE_TOKEN]
  // other parameters
});

export default combineReducers({
  token
});
```

#### RETURNS

```javascript
[
  reducerFunction, // (state, action) => newState
  {
    getInitialState, // () => initialState
    generateState // (value: any) => valueState
  }
] = createReducer(/* ... */);
```

#### PARAMETERS

#### **`initial`**

> Initial/default value .

type: `any`

default: `''` (empty string)

#### **`setOn`<sup>1</sup>**

> What action(s) will setting value

Handled action(s) example:

```js
{ type: "SET_TOKEN", payload: 'token' }
```

#### **`resetOn`<sup>1</sup>**

> What action(s) will set value that was set as initial

Handled action(s) example:

```js
{ type: 'RESET_TOKEN', ... }
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
| `{ type: "SET_TOKEN", payload: "token" }`            | `{ type: "SET_TOKEN", token: /* some data */ }`    |
| `{ type: "SET_TOKEN", payload: (action) => someData` | `{ type: "SET_TOKEN", /* data to be resolved */ }` |
