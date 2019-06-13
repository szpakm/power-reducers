- [counter](docs/counter.md)
- [toggle](docs/toggle.md)
- [value](docs/value.md)
- [set-simple](docs/set-simple.md)
- task-simple
- [list](docs/list.md)

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

`createReducer(parameters?): [reducer, { generateState, getInitialState }]`;

### USAGE (example with redux)

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

### **`initial`**

> Initial/default value for state's `isPending` field.

type: `boolean`

default: `false`

### **`startOn`**

> What action(s) will trigger start of the task

Type: `HandlerOption`[_1_]

Required: No

Handled action(s) example:

```js
{ type: "FETCHING_STARTED", ... }
```

Reducer logic:

```js
(state, action) => ({
  isPending: true,
  error: ""
});
```

### **`successOn`**

> What action(s) will trigger completion of the task (without errors)

Type: `HandlerOption`[_1_]

Required: No

Handled action(s) example:

```js
{ type: 'FETCHING_SUCCESS', ... }
```

Reducer logic:

```js
(state, action) => ({
  isPending: false,
  error: ""
});
```
> selectIsPending(taskSimpleState) => boolean;


## selectIsError
```javascript
import { selectIsError } from 'power-reducers/task-simple';
```
> selectIsError(taskSimpleState) => boolean;

## selectIsSuccess
```javascript
import { selectIsSuccess } from 'power-reducers/task-simple';
```
> selectIsSuccess(taskSimpleState) => boolean;


___

**[_1_]** type HandlerOption - single item **or Array** containing the following types (can be mixed):

### **`errorOn`**

> What action(s) will trigger error

Type: `HandlerOption`[_1_]

Required: No

Handled action(s) example:

```js
{
  type: "FETCHING_ERROR",
  message: "Permission denied" // "message" is not default payload path
}
```

reducer logic:

```js
(state, action) => ({
  isPending: false,
  error: ""
});
```

### **`_customHandlers`**

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

**[_1_]** type HandlerOption - single item **or Array** containing the following types (can be mixed):

| Parameter xample                                      | Valid action example                                |
| ----------------------------------------------------- | --------------------------------------------------- |
| `"ADD_ITEMS"`                                         | `{ type: "ADD_ITEMS", payload: /* some data */ }`   |
| `{ type: "ADD_ITEMS" }`                               | `{ type: "ADD_ITEMS", payload: /* some data */ }`   |
| `{ type: "REMOVE_IDS", payload: "ids" }`              | `{ type: "REMOVE_IDS", ids: /* some data */ }`      |
| `{ type: "REMOVE_IDS", payload: (action) => someData` | `{ type: "REMOVE_IDS", /* data to be resolved */ }` |
