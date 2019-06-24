## power-reducers

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

  function applyIncrement() {
    dispatch({ type: "INCREMENT" });
  }

  function applyDecrement() {
    dispatch({ type: "DECREMENT" });
  }

  function applyIncrementBy10() {
    dispatch({ type: "INCREMENT_BY", payload: 10 });
  }

  function applyDouble() {
    dispatch({ type: "DOUBLE" });
  }

  return (
    <>
      <p>Count: {state}</p>
      <button onClick={applyIncrement}>+ 1</button>
      <button onClick={applyDecrement}>- 1</button>
      <button onClick={applyDouble}>x 2</button>
      <button onClick={applyIncrementBy10}>+ 10</button>
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

#### **`incrementOn`**<sup>1</sup>

> What action(s) will +1

Handled action(s) example:

```js
{ type: "INCREMENT", ... }
```

#### **`decrementOn`**<sup>1</sup>

> What action(s) will -1

Handled action(s) example:

```js
{ type: "DECREMENT", ... }
```

#### **`incrementByOn`**<sup>1</sup>

> What action(s) will increment by provided value

Handled action(s) example:

```js
{ type: "INCREMENT_BY", payload: 5 }
```

#### **`decrementByOn`**<sup>1</sup>

> What action(s) will decrement by provided value

Handled action(s) example:

```js
{ type: "DECREMENT_BY", payload: 5 }
```

#### **`setOn`**<sup>1</sup>

> What action(s) will set value

Handled action(s) example:

```js
{ type: "SET_COUNTER", payload: 5 }
```

#### **`resetOn`**<sup>1</sup>

> What action(s) will set value that was set as initial

Handled action(s) example:

```js
{ type: "RESET_COUNTER", ... }
```

#### **`emptyOn`**<sup>1</sup>

> What action(s) will set value to 0 (zero)

Handled action(s) example:

```js
{ type: "SET_ZERO", ... }
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
        // executed when action.type === "DOUBLE_COUNT"
        return state * 2;
      }
    }
  ]
});
```

---

**<sup>1</sup>** type HandlerOption - single item **or Array** containing the following types (can be mixed):

| Parameter example                                        | Valid action example                                  |
| ------------------------------------------------------- | ----------------------------------------------------- |
| `"SET_VALUE"`                                           | `{ type: "SET_VALUE", payload: /* some data */ }`     |
| `{ type: "SET_VALUE" }`                                 | `{ type: "SET_VALUE", payload: /* some data */ }`     |
| `{ type: "INCREMENT_BY", payload: "diff" }`              | `{ type: "INCREMENT_BY", diff: /* some data */ }`      |
| `{ type: "INCREMENT_BY", payload: (action) => someData` | `{ type: "INCREMENT_BY", /* data to be resolved */ }` |
