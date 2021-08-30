import { configureStore } from "@reduxjs/toolkit";
import navReducer from "./slices/navSlice";

export const store = configureStore({
  reducer: {
    //reducer faz setup de toda a store
    nav: navReducer,
  },
});
