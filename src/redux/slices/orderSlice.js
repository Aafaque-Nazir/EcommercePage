// orderSlice.js
import { createSlice } from "@reduxjs/toolkit";

const orderSlice = createSlice({
  name: "orders",
  initialState: {
    orders: [],
  },
  reducers: {
    placeOrder: (state, action) => {
      state.orders.push({
        ...action.payload,
        id: Date.now().toString(),
        status: "placed",
      });
    },
    cancelOrder: (state, action) => {
      const orderId = action.payload;
      const order = state.orders.find((o) => o.id === orderId);
      if (order) {
        order.status = "cancelled";
      }
    },
  },
});

export const { placeOrder, cancelOrder } = orderSlice.actions;
export default orderSlice.reducer;
