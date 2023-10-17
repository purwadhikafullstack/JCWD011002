import { configureStore } from "@reduxjs/toolkit";
import TriggerReducer from "./TriggerReducer";
import SearchReducer from "./SearchReducer";

const reducer = {
  // Add Reducer Here 
  trigger: TriggerReducer,
  search: SearchReducer
};

const Storage = configureStore({ reducer });

export default Storage;
