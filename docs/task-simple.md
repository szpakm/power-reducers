## power-reducers

- [counter](./counter.md)
- [toggle](./toggle.md)
- [value](./value.md)
- [set-simple](./set-simple.md)
- task-simple
- [list](./list.md)

---

# task-simple

State structure

```ts
interface TaskSimpleState {
  isPending: boolean;
  error: string;
}
```

```js
// task-simple example state
{
  isPending: false,
  error: 'Permission denied'
}
```

## createReducer

#### USAGE (example with redux)

```js
// reducers.js
import { combineReducers } from "redux";
import { createReducer } from "power-reducers/task-simple";
import { FETCHING_STARTED, FETCHING_SUCCESS, FETCHING_ERROR } from "./actions";

const [fetchingProducts] = createReducer({
  startOn: FETCHING_STARTED,
  successOn: FETCHING_SUCCESS,
  errorOn: {
    type: FETCHING_ERROR,
    payload: "message" // read data from action.message
  }
  // other parameters
});

export default combineReducers({
  fetchingProducts
});
```

#### RETURNS

```javascript
[
  reducerFunction,   // (state, action) => newState
  {
    getInitialState, // () => initialState
    generateState    // (value: boolean) => taskSimpleState
  }
] = createReducer(/* ... */);
```

#### PARAMETERS

#### **`initial`**

> Initial/default value for state's `isPending` field.

type: `boolean`

default: `false`

#### **`startOn`**<sup>1</sup>

> What action(s) will trigger start of the task

Handled action(s) example:

```js
{ type: "FETCHING_STARTED", ... }
```

#### **`successOn`**<sup>1</sup>

> What action(s) will trigger completion of the task (without errors)

Handled action(s) example:

```js
{ type: 'FETCHING_SUCCESS', ... }
```

#### **`errorOn`**<sup>1</sup>

> What action(s) will trigger error

Handled action(s) example:

```js
{
  type: "FETCHING_ERROR",
  message: "Permission denied" // "message" is not default payload path
}
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

## selectIsPending
```javascript
import { selectIsPending } from 'power-reducers/task-simple';

/* ... */

const isPending = selectIsPending(taskSimpleState); // boolean
```

## selectIsError
```javascript
import { selectIsError } from 'power-reducers/task-simple';

/* ... */

const isError = selectIsError(taskSimpleState); // boolean
```

## selectIsSuccess
```javascript
import { selectIsSuccess } from 'power-reducers/task-simple';

/* ... */

const isSuccess = selectIsSuccess(taskSimpleState); // boolean
```

___

**<sup>1</sup>** type HandlerOption - single item **or Array** containing the following types (can be mixed):

| Parameter example                                      | Valid action example                                |
| ----------------------------------------------------- | --------------------------------------------------- |
| `"ADD_ITEMS"`                                         | `{ type: "ADD_ITEMS", payload: /* some data */ }`   |
| `{ type: "ADD_ITEMS" }`                               | `{ type: "ADD_ITEMS", payload: /* some data */ }`   |
| `{ type: "REMOVE_IDS", payload: "ids" }`              | `{ type: "REMOVE_IDS", ids: /* some data */ }`      |
| `{ type: "REMOVE_IDS", payload: (action) => someData` | `{ type: "REMOVE_IDS", /* data to be resolved */ }` |
