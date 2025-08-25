import { createSlice } from "@reduxjs/toolkit";


// prices in minor units (paise) for INR
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
clearCart: (state) => {
state.items = [];
},
hydrateCart: (state, action) => {
state.items = action.payload || [];
},
},
});


export const { addToCart, removeFromCart, setQty, clearCart, hydrateCart } = cartSlice.actions;
export default cartSlice.reducer;