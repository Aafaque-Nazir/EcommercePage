import { createSlice } from "@reduxjs/toolkit";


const wishlistSlice = createSlice({
name: "wishlist",
initialState: { ids: [] },
reducers: {
toggleWishlist: (state, action) => {
const id = action.payload;
if (state.ids.includes(id)) state.ids = state.ids.filter((x) => x !== id);
else state.ids.push(id);
},
hydrateWishlist: (state, action) => {
state.ids = action.payload || [];
},
},
});


export const { toggleWishlist, hydrateWishlist } = wishlistSlice.actions;
export default wishlistSlice.reducer;