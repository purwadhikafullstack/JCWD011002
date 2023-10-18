import { createSlice } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";

const initialState = {
  listUser: "",
  orderStatus: "",
};

export const TriggerReducer = createSlice({
  name: "TriggerReducer",
  initialState,
  reducers: {
    setUserTrigger: (state, action) => {
      state.listUser = uuidv4();
    },
    setOrderTrigger: (state, action) => {
      state.orderStatus = uuidv4();
    },
  },
});

export const { setUserTrigger, setOrderTrigger } = TriggerReducer.actions;
export default TriggerReducer.reducer;
