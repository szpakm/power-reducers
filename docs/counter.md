## power-reducers

---

- counter
- [toggle](./toggle.md)
- [value](./value.md)
- [set-simple](./set-simple.md)
- [task-simple](./task-simple.md)
- [list](./list.md)

---

# counter

State structure

```ts
type CounterState = number;
```

```js
// counter example state
5; // :-)
```

## createReducer

#### USAGE (example with react-hooks)

```js
import React, { useReducer } from "react";
import { createReducer } from "power-reducers/counter";

const [counterReducer, { getInitialState }] = createReducer({
  initial: 0,
  incrementOn: 'INCREMENT',
  incrementByOn: {
    type: 'INCREMENT_BY',
    payload: 'delta' // read data from action.delta
  },
  decrementOn: 'DECREMENT',
  _customHandlers: [{
    type: 'DOUBLE',
    handler: (state = 0) => state * 2
  }
});

export const Counter: React.SFC<{}> = () => {
  const [counterState, dispatch] = useReducer(
    counterReducer,
    getInitialState() // required for hook
  );

  return (
    <>
      <p>Count: {state}</p>
      <button onClick={() => dispatch({ type: "INCREMENT" })}>+ 1</button>
      <button onClick={() => dispatch({ type: "DECREMENT" })}>- 1</button>
      <button onClick={() => dispatch({ type: "DOUBLE" })}>x 2</button>
      <button onClick={() => dispatch({ type: "INCREMENT", delta: 10 })}>+ 10</button>
    </>
  );
}
```

#### RETURNS

```javascript
[
  reducerFunction, // (state, action) => newState
  {
    getInitialState, // () => initialCounterState
    generateState // (value: number) => counterState
  }
] = createReducer(/* ... */);
```

#### PARAMETERS

#### **`initial`**

> Initial/default state value.

type: `number`

default: `0`

#### **`incrementOn`**

> What action(s) will +1

Type: `HandlerOption`[_1_]

Handled action(s) example:

```js
{ type: "INCREMENT", ... }
```

Reducer logic:

```js
(state, action) => state + 1;
```

#### **`decrementOn`**

> What action(s) will -1

Type: `HandlerOption`[_1_]

Handled action(s) example:

```js
{ type: "DECREMENT", ... }
```

Reducer logic:

```js
(state, action) => state - 1;
```

#### **`incrementByOn`**

> What action(s) will increment by provided value

Type: `HandlerOption`[_1_]

Handled action(s) example:

```js
{ type: "INCREMENT_BY", payload: 5 }
```

Reducer logic:

```js
(state, action) => state + action.payload;
```

#### **`decrementByOn`**

> What action(s) will decrement by provided value

Type: `HandlerOption`[_1_]

Handled action(s) example:

```js
{ type: "DECREMENT_BY", payload: 5 }
```

Reducer logic:

```js
(state, action) => state - action.payload;
```

#### **`setOn`**

> What action(s) will set value

Type: `HandlerOption`[_1_]

Handled action(s) example:

```js
{ type: "SET_COUNTER", payload: 5 }
```

Reducer logic:

```js
(state, action) => action.payload;
```

#### **`resetOn`**

> What action(s) will set value that was set as initial

Type: `HandlerOption`[_1_]

Handled action(s) example:

```js
{ type: "RESET_COUNTER", ... }
```

Reducer logic:

```js
(state, action) => 5; // or any other value that was set as initial
```

#### **`emptyOn`**

> What action(s) will set value to 0 (zero)

Type: `HandlerOption`[_1_]

Handled action(s) example:

```js
{ type: "SET_ZERO", ... }
```

Reducer logic:

```js
(state, action) => 0; // or any other value that was set as initial
```

#### **`_customHandlers`**

> Create own reducers for different action(s) types (try to avoid this).

Example

```javascript
createReducer({
  // ...
  _customHandlers: [
    {
      type: "DOUBLE_COUNT",
      handler: (state, action) => {
        // executet when action.type === "DOUBLE_COUNT"
        return state * 2;
      }
    }
  ]
});
```

---

**[_1_]** type HandlerOption - single item **or Array** containing the following types (can be mixed):

| Parameter xample                                        | Valid action example                                  |
| ------------------------------------------------------- | ----------------------------------------------------- |
| `"SET_VALUE"`                                           | `{ type: "SET_VALUE", payload: /* some data */ }`     |
| `{ type: "SET_VALUE" }`                                 | `{ type: "SET_VALUE", payload: /* some data */ }`     |
| `{ type: "INCREMENT_BY", payload: "ids" }`              | `{ type: "INCREMENT_BY", ids: /* some data */ }`      |
| `{ type: "INCREMENT_BY", payload: (action) => someData` | `{ type: "INCREMENT_BY", /* data to be resolved */ }` |
