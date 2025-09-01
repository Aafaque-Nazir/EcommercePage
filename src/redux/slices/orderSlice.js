// slices/orderSlice.js
import { createSlice } from "@reduxjs/toolkit";

const ordersSlice = createSlice({
  name: "orders",
  initialState: {
    list: [],
  },
  reducers: {
    addOrder: (state, action) => {
      state.list.push(action.payload);
    },
    cancelOrder: (state, action) => {
      const order = state.list.find((o) => o.id === action.payload);
      if (order) order.status = "cancelled";
    },
  },
});

export const { addOrder, cancelOrder } = ordersSlice.actions;
export default ordersSlice.reducer;