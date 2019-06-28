## power-reducers

- [counter](./counter.md)
- [toggle](./toggle.md)
- [value](./value.md)
- [set-simple](./set-simple.md)
- [task-simple](./task-simple.md)
- list

---

# list

State structure

```ts
interface ListState<T> {
  byId: { [id: string]: T };
  ids: string[];
}
```

```js
// list state example
{
  byId: {
    'id1': { id: 'id1', name: 'product 1', price: 10 },
    'id2': { id: 'id2', name: 'product 2', price: 20 },
    'id3': { id: 'id3', name: 'product 3', price: 30 },
  },
  ids: [ 'id1', 'id2', 'id3' ]
}
```

## createReducer

> Creates a reducer function to be used in redux or react hooks.

#### USAGE (example with redux)

```js
// products/reducers.js
import { combineReducers } from "redux";
import { createReducer } from "power-reducers/list";
import {
  SET_PRODUCTS,
  ADD_PRODUCTS,
  ADD_PRODUCT,
  REMOVE_PRODUCT,
  REMOVE_PRODUCTS,
  REMOVE_ALL_PRODUCTS
} from "./actions";

const [products] = createReducer({
  idName: "id",
  initial: [],
  setOn: SET_PRODUCTS,
  addOn: [ADD_PRODUCTS, ADD_PRODUCT], // single & multiple
  removeOn: [
    {
      type: REMOVE_PRODUCTS,
      payload: "ids" // read data from action.ids
    },
    REMOVE_PRODUCT // read id from action.payload
  ],
  emptyOn: REMOVE_ALL_PRODUCTS
});

export default combineReducers({
  // ...
  products
});
```

#### RETURNS

```javascript
[
  reducerFunction, // (state, action) => newState
  {
    getInitialState, // () => initialState
    generateState // (value: T[]) => listState
  }
] = createReducer(/* ... */);
```

#### PARAMETERS

#### **`idName`**

> Name of item's identifier field

type: `string`

default: `"uuid"`

#### **`initial`**

> Initial/default list items.

type: `Array<T>`

default: `[]`

#### **`setOn`<sup>1</sup>**

> What action(s) will set list content

```js
// action example - set multiple items:
{
  type: "SET_PRODUCTS",
  payload: [
    { id: "id1", name: "Product 1", price: 10 },
    { id: "id2", name: "Product 2", price: 20 },
  ]
},
// action example - set single item
{
  type: "SET_PRODUCT",
  payload: { id: "id3", name: "Product 3", price: 30 }
},
```

#### **`addOn`<sup>1</sup>**

> What action(s) will add item(s) to the list

```js
// action examples:
{
  type: "ADD_PRODUCTS",
  payload: [
    { id: "id4", name: "Product 4", price: 40 },
    { id: "id5", name: "Product 5", price: 50 },
  ]
},
{
  type: "ADD_PRODUCT",
  payload: { id: "id6", name: "Product 6", price: 60 }
},
```

#### **`updateOn`<sup>1</sup>**

> What action(s) will update list item(s). Payload will be **merged** with the original items immutable way.

```javascript
// action example - update single item
{
  type: "UPDATE_PRODUCT",
  payload: {
    id: "id4", // identifier IS REQUIRED
    name: "Updated product 4", // will replace previous value
    description: "updated element" // field will be added
    // other item fields will remain unchanged
  }
},
// action example - update multiple items
{
  type: "UPDATE_PRODUCTS",
  payload: [
    { id: "id1", name: "Updated product 1" },
    { id: "id2", name: "Updated product 2" }
  ]
}
```

#### **`removeOn`<sup>1</sup>**

> What action(s) will remove (filter out) item(s) from the list

```js
// action examples:
{ type: "REMOVE_PRODUCT", payload: "id1" }, // single
{ type: "REMOVE_PRODUCTS", payload: ["id2", "id3"] } // multi
```

#### **`resetOn`<sup>1</sup>**

> What action(s) will reset list to it's initial items

```js
// action example:
{
  type: "RESET";
}
```

#### **`emptyOn`<sup>1</sup>**

> What action(s) will make list empty

```js
// action example:
{
  type: "REMOVE_ALL_PRODUCTS";
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
      type: "REMOVE_EXPENSIVE",
      handler: (state, action) => {
        // return new state for
        // action.type === "REMOVE_EXPENSIVE"
        // (must be ListState<T> data structure)
      }
    }
  ]
});
```

## createSelectorById

> Creates a selector function that gets item by id (from state).

#### USAGE (example with redux)

```js
// redux/selectors.js
import { createSelectorById } from "power-reducers/list";

export const selectProductById = createSelectorAll({
  // Optional. Usefull when working with redux
  selector: globalState => globalState.productsListState;
});
```

```js
// containers/ProductInfo.js
import { connect } from "react-redux";
import { selectProductById } from "../redux/selectors";

const mapStateToProps = (state, ownProps) => ({
  product: state => selectProductById(state, ownProps.id)
});
```

#### RETURNS

> Function for selecting list item by id.

```ts
selectById(state: any, itemId: string): ListItem
```

#### PARAMETERS

#### **`selector`**

> Gets `ListState` from provided argument. Useful when working with redux, to select proper part of the global state. For react hooks this parameter can be omited for 99% cases because of it's default value which is:

default: `state => state`

## createSelectorAll

> creates a selector function that returns array of all the list items form the state.

#### USAGE (example with react hooks)

```js
// components/ProductList.js
import React, { useReducer } from "react";
import { createReducer, createSelectorAll } from "power-reducers/list";

const [productsReducer, { getInitialState }] = createReducer(/*...*/);
const selectProducts = createSelectorAll(); //

export function ProductList() {
  const [state, dispatch] = useReducer(productsReducer, getInitialState());
  const products = selectProducts(state);

  /*
  return (
    <>
      { products.map(p => ...) }
    </>
  );
  */
}
```

#### RETURNS

> Function for selecting array of all items.

```ts
selectAll(state: any): ListItem[]
```

#### PARAMETERS

#### **`selector`**

> Exactly the same as **createSelectorById** above

---

<sup>1</sup> type HandlerOption - single item **or Array** containing the following types (can be mixed):

| Parameter example                                       | Valid action example                                  |
| ------------------------------------------------------- | ----------------------------------------------------- |
| `"ADD_ITEMS"`                                           | `{ type: "ADD_ITEMS", payload: /* some data */ }`     |
| `{ type: "ADD_ITEMS" }`                                 | `{ type: "ADD_ITEMS", payload: /* some data */ }`     |
| `{ type: "REMOVE_ITEMS", payload: "items" }`            | `{ type: "REMOVE_ITEMS", items: /* some data */ }`    |
| `{ type: "REMOVE_ITEMS", payload: (action) => someData` | `{ type: "REMOVE_ITEMS", /* data to be resolved */ }` |
