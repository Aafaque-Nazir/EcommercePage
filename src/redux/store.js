import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import cartReducer from "./slices/cartSlice";
import wishlistReducer from "./slices/wishlistSlice";
import productsReducer from "./slices/productsSlice";
import orderReducer from "./slices/orderSlice"; // This is ordersSlice.reducer

// ✅ Persist cart: items
const cartPersistConfig = {
  key: "cart",
  storage,
  whitelist: ["items"],
};

// ✅ Fix: Persist orderSlice's `list` field, not `orders`
const orderPersistConfig = {
  key: "orders",
  storage,
  whitelist: ["list"], // ✅ This is correct — matches initialState.list
};

// Apply persist
const persistedCartReducer = persistReducer(cartPersistConfig, cartReducer);
const persistedOrderReducer = persistReducer(orderPersistConfig, orderReducer);

export const store = configureStore({
  reducer: {
    cart: persistedCartReducer,
    wishlist: wishlistReducer,
    products: productsReducer,
    orders: persistedOrderReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [
          "persist/PERSIST",
          "persist/FLUSH",
          "persist/REHYDRATE",
          "persist/PAUSE",
          "persist/PURGE",
          "persist/REGISTER",
        ],
      },
    }),
});

export const persistor = persistStore(store);