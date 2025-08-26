// cartSlice.js (updated)
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [], // {id, name, price, image, qty}
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const i = state.items.find((x) => x.id === action.payload.id);
      if (i) i.qty += action.payload.qty || 1;
      else state.items.push({ ...action.payload, qty: action.payload.qty || 1 });
    },
    removeFromCart: (state, action) => {
      state.items = state.items.filter((x) => x.id !== action.payload);
    },
    setQty: (state, action) => {
      const { id, qty } = action.payload;
      const i = state.items.find((x) => x.id === id);
      if (i) i.qty = qty;
    },
    // Add these new functions
    increaseQty: (state, action) => {
      const i = state.items.find((x) => x.id === action.payload);
      if (i) i.qty += 1;
    },
    decreaseQty: (state, action) => {
      const i = state.items.find((x) => x.id === action.payload);
      if (i && i.qty > 1) i.qty -= 1;
    },
    clearCart: (state) => {
      state.items = [];
    },
    hydrateCart: (state, action) => {
      state.items = action.payload || [];
    },
  },
});

// Export all actions including the new ones
export const { 
  addToCart, 
  removeFromCart, 
  setQty, 
  increaseQty, 
  decreaseQty, 
  clearCart, 
  hydrateCart 
} = cartSlice.actions;

export default cartSlice.reducer;