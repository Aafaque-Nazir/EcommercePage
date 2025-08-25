import { createSlice } from "@reduxjs/toolkit";


const productsSlice = createSlice({
name: "products",
initialState: { list: [], filter: "", sort: "" },
reducers: {
setProducts: (state, action) => { state.list = action.payload; },
setFilter: (state, action) => { state.filter = action.payload; },
setSort: (state, action) => { state.sort = action.payload; },
},
});


export const { setProducts, setFilter, setSort } = productsSlice.actions;
export default productsSlice.reducer;