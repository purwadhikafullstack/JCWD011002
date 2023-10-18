import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  users: "",
  products: "",
  orders: "",
};

export const SearchReducer = createSlice({
  name: "SearchReducer",
  initialState,
  reducers: {
    searchUser: (state, action) => {
      const keyword = action.payload;
      state.users = keyword;
    },
    searchProduct: (state, action) => {
      const keyword = action.payload;
      state.products = keyword;
    },
    searchOrder: (state, action) => {
      const keyword = action.payload;
      state.orders = keyword;
    },
  },
});

export const { searchUser, searchProduct, searchOrder } = SearchReducer.actions;
export default SearchReducer.reducer;
