import { createSlice } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";

const initialState = {
    listUser: "",
};

export const TriggerReducer = createSlice({
    name: "TriggerReducer",
    initialState,
    reducers: {
        setUserTrigger: (state, action) => {
          state.listUser = uuidv4();
        },
    },
});

export const { setUserTrigger } = TriggerReducer.actions;
export default TriggerReducer.reducer;