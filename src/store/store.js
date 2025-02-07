import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slice/authSlice"; 

export const store = configureStore({
  reducer: {
    auth: authReducer, 
  },
  devTools: true,
});

export default store;
