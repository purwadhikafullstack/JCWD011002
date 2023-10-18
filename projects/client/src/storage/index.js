import { configureStore } from "@reduxjs/toolkit";
import TriggerReducer from "./TriggerReducer";
import SearchReducer from "./SearchReducer";
import userReducer from "./userReducer";
const reducer = {
  // Add Reducer Here 
  trigger: TriggerReducer,
  search: SearchReducer,
  user: userReducer
};

const Storage = configureStore({ reducer });

export default Storage;
