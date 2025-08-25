import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./slices/cartSlice";
import wishlistReducer from "./slices/wishlistSlice";
import productsReducer from "./slices/productsSlice";


export const store = configureStore({
reducer: {
cart: cartReducer,
wishlist: wishlistReducer,
products: productsReducer,
},
});