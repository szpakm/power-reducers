# power-reducers

> **`power-reducers`** is a set of creators of useful and commonly used reducers. It can work in redux-based application and with react hooks.

It's lightweight, dependency-free, ready for typescript and you can easily integrate it with your existing project as well as get rid of it.

---

## Example 1

#### counter

Define your reducer

```js
// reducers.js
import { combineReducers } from "redux";
import { createReducer } from "power-reducers/counter";

const [counter] = createReducer({
  initial: 0,
  setOn: "SET",
  incrementOn: "INCREMENT",
  incrementByOn: "INCREMENT_BY",
  decrementOn: "DECREMENT"
});

export default combineReducers({
  // ...
  counter
});
```

And dispatch your actions

```js
dispatch({ type: "SET", payload: 10 }); // counter: 10
dispatch({ type: "INCREMENT" }); // counter: 11
dispatch({ type: "INCREMENT_BY", payload: 5 }); // counter: 16
dispatch({ type: "INCREMENT_BY", payload: 20 }); // counter: 36
dispatch({ type: "DECREMENT" }); // counter: 35
```

See more [counter API and examples](docs/counter.md)

## Example 2

#### list

Define your reducer

```js
// products/reducers.js
import { combineReducers } from "redux";
import { createReducer } from "power-reducers/list";

const [products] = createReducer({
  idName: "uuid",
  initial: [],
  setOn: "SET_PRODUCTS",
  removeOn: "REMOVE_PRODUCTS",
  addOn: ["ADD_PRODUCT", "ADD_PRODUCTS"]
});

export default combineReducers({
  // ...
  products
});
```

And dispatch your actions

```js
dispatch({
  type: "SET_PRODUCTS",
  payload: [
    { uuid: 'p1', name: "product 1" },
    { uuid: 'p2', name: "product 2" }
  ]
});
/*
  products: {
    byId: {
      'p1': { uuid: 'p1', name: 'product 1' },
      'p2': { uuid: 'p2', name: 'product 2' }
    },
    allIds: ['p1', 'p2']
  }
*/

dispatch({
  type: "ADD_PRODUCT",
  payload: { uuid: 'p3', name: "product 3" }
});
/*
  products: {
    byId: {
      'p1': { uuid: 'p1', name: 'product 1' },
      'p2': { uuid: 'p2', name: 'product 2' },
      'p3': { uuid: 'p2', name: 'product 2' }
    },
    allIds: ['p1', 'p2', 'p3']
  }
*/
```

You can handle more actions, like _removing_, _updating_, _clearing_ as well as define your own. See more [list API and examples](docs/list.md)

## Documentation

- [counter](docs/counter.md)
- [toggle](docs/toggle.md)
- [value](docs/value.md)
- [set-simple](docs/set-simple.md)
- [task-simple](docs/task-simple.md)
- [list](docs/list.md)

---

## Installation

`npm install --save power-reducers`

**Caution**

By default **`power-reducers`** is written in ECMAScript 2018 language standard and it is recommended that you transpile it inside your project by your own (using ex. [@babel/preset-env](https://babeljs.io/docs/en/babel-preset-env)).

If you need older EcmaScript version, then import it from `es2015` directory:

```js
// import transpiled EcmaScript 2015 version
import { createReducer } from "power-reducers/es2015/list";
```
