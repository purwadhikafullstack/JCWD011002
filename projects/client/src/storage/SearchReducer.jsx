import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  users: "",
  products: "",
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
    }
  },
});

export const { searchUser, searchProduct } = SearchReducer.actions;
export default SearchReducer.reducer;
