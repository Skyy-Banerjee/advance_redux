In Redux Toolkit (RTK), **thunks** are a way to handle **asynchronous logic** or **side effects**, such as API calls, in a Redux application. Thunks allows us to write action creators that **return a function instead of an action object**.

This function can perform **async operations** (like fetching data from an API) and then dispatch other actions to update the Redux state based on the result (success, error, etc.).

---

## **What is a thunk in RTK?**

- A **"thunk"** is a middleware in Redux that lets you **delay** the dispatch of an action.
- Normally, action creators return **action objects**.  
  Thunks allow them to return **functions** instead.  
- The function gets access to:
   1. **dispatch** – so you can dispatch multiple actions.  
   2. **getState** – to read the current state if needed.

---

## **Why are thunks needed?**

Redux, by design, **does not handle asynchronous actions** (like API calls). It expects actions to be **synchronous and plain objects**.

Thunks solve this problem by enabling you to:

1. Perform async operations (e.g., fetching/sending data).
2. Dispatch different actions based on the operation's outcome.

For example:
- Dispatch an action to indicate "loading" before the API call.
- Dispatch an action when the API call succeeds or fails.

---

## **How does it work?**

### Without Thunk
Action creators return an action object.

```js
export const addItem = (item) => {
  return { type: "ADD_ITEM", payload: item };
};
```

### With Thunk
Action creators can return a function.

```js
export const fetchItems = () => {
  return async (dispatch) => {
    dispatch({ type: "FETCH_ITEMS_START" });

    try {
      const response = await fetch("https://api.example.com/items");
      const data = await response.json();

      dispatch({ type: "FETCH_ITEMS_SUCCESS", payload: data });
    } catch (error) {
      dispatch({ type: "FETCH_ITEMS_ERROR", payload: error.message });
    }
  };
};
```

---

## **Using Thunks in Redux Toolkit**

RTK makes using thunks even simpler because it **automatically includes the thunk middleware** when you use `configureStore()`.

### Steps to Use Thunks in RTK:

1. Install and configure Redux Toolkit (RTK).

2. Create an **async thunk** using `createAsyncThunk` (a helper provided by RTK) **OR** write a manual thunk.

---

### **Option 1: Using `createAsyncThunk`**

`createAsyncThunk` simplifies async logic and generates action types for you.

#### Syntax:
```js
import { createAsyncThunk } from "@reduxjs/toolkit";

export const fetchItems = createAsyncThunk(
  "items/fetchItems", // Action type
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch("https://api.example.com/items");
      if (!response.ok) throw new Error("Failed to fetch items");
      return await response.json(); // Returns the payload
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
```

#### Handling in a Slice:
```js
import { createSlice } from "@reduxjs/toolkit";
import { fetchItems } from "./itemsActions";

const itemsSlice = createSlice({
  name: "items",
  initialState: { items: [], loading: false, error: null },
  reducers: {},

  // Handle async thunk actions
  extraReducers: (builder) => {
    builder
      .addCase(fetchItems.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchItems.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchItems.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default itemsSlice.reducer;
```

In this example:
1. `fetchItems.pending` handles the "loading" state.
2. `fetchItems.fulfilled` handles the successful API response.
3. `fetchItems.rejected` handles errors.

---

### **Option 2: Manual Thunks**

We can write a manual thunk if you don't want to use `createAsyncThunk`.

Example:

```js
export const fetchItems = () => {
  return async (dispatch) => {
    dispatch({ type: "items/fetchStart" });

    try {
      const response = await fetch("https://api.example.com/items");
      const data = await response.json();

      dispatch({ type: "items/fetchSuccess", payload: data });
    } catch (error) {
      dispatch({ type: "items/fetchError", payload: error.message });
    }
  };
};
```

You can handle these actions (`items/fetchStart`, `items/fetchSuccess`, etc.) inside your slice reducer.

---

## **Benefits of Thunks in RTK**

1. **Asynchronous logic** is cleanly separated from components.
2. Reduces code duplication by reusing async logic across components.
3. Simplifies dispatching multiple actions in sequence (e.g., "loading", "success", "error").
4. Integrates seamlessly with Redux Toolkit and `configureStore()`.

---

## **When to Use Thunks?**

- Whenever we need to **fetch data** from an API.
- When performing operations like:
  - Submitting form data to a server.
  - Delaying or scheduling actions.
  - Executing async tasks like localStorage updates.

---

## **Key Takeaways**

- Thunks allow you to handle **asynchronous logic** in Redux.
- Redux Toolkit automatically includes thunk middleware.
- Use `createAsyncThunk` for a cleaner, more declarative approach.
- Thunks help dispatch multiple actions and make Redux async-friendly.
