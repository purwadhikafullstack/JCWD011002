import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  users: "",
  products: "",
  orders: "",
  invoice: "",
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
    searchInvoice: (state, action) => {
      const keyword = action.payload;
      state.invoice = keyword;
    },
  },
});

export const { searchUser, searchProduct, searchOrder, searchInvoice } =
  SearchReducer.actions;
export default SearchReducer.reducer;
