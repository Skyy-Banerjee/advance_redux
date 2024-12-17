import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: [],
    totalQuantity: 0,
    changed: false,
  },
  reducers: {
    replaceCart(state, action) {
      state.totalQuantity = action.payload.totalQuantity;
      state.items = action.payload.items;
    },
    addItem(state, action) {
      const item = action.payload;
      const existingItem = state.items.find((i) => i.id === item.id); // Check existing item
      state.totalQuantity++;
      state.changed = true;
      if (!existingItem) {
        state.items.push({
          id: item.id,
          price: item.price,
          quantity: 1,
          totalPrice: item.price,
          name: item.title,
        });
      } else {
        // Increase quantity and update total price
        existingItem.quantity++;
        existingItem.totalPrice += item.price;
      }
    },

    removeItem(state, action) {
      const itemId = action.payload;
      const existingItem = state.items.find((i) => i.id === itemId);
      if (!existingItem) return; // Safety check
      state.totalQuantity--;
      state.changed = true;
      if (existingItem.quantity === 1) {
        state.items = state.items.filter((i) => i.id !== itemId);
      } else {
        existingItem.quantity--;
        existingItem.totalPrice -= existingItem.price;
      }
    },
  },
});

export const cartActions = cartSlice.actions;
export default cartSlice;