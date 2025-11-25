import { createSlice } from "@reduxjs/toolkit";

const wishlistSlice = createSlice({
    name: "wishlist",
    initialState: {
        items: [], // Store full product objects
    },
    reducers: {
        addToWishlist: (state, action) => {
            const product = action.payload;
            const exists = state.items.find((item) => item.id === product.id);
            if (!exists) {
                state.items.push(product);
            }
        },
        removeFromWishlist: (state, action) => {
            state.items = state.items.filter((item) => item.id !== action.payload);
        },
        toggleWishlist: (state, action) => {
            const product = action.payload;
            const existingIndex = state.items.findIndex((item) => item.id === product.id);

            if (existingIndex >= 0) {
                // Remove from wishlist
                state.items.splice(existingIndex, 1);
            } else {
                // Add to wishlist
                state.items.push(product);
            }
        },
        clearWishlist: (state) => {
            state.items = [];
        },
    },
});

// Selector to check if product is in wishlist
export const selectIsInWishlist = (state, productId) =>
    state.wishlist.items.some((item) => item.id === productId);

// Selector to get wishlist count
export const selectWishlistCount = (state) => state.wishlist.items.length;

export const { addToWishlist, removeFromWishlist, toggleWishlist, clearWishlist } = wishlistSlice.actions;
export default wishlistSlice.reducer;