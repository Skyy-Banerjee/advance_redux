import { configureStore } from "@reduxjs/toolkit";
import cartSlice from "../features/cart/cartSlice";
import uiSlice from "../features/ui/uiSlice";

const store = configureStore({
  reducer: { cart: cartSlice.reducer, ui: uiSlice.reducer },
});

export default store;
