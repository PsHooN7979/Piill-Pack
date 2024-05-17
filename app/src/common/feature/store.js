import { configureStore } from "@reduxjs/toolkit";
import nativeSlice from "../../domains/_scanner/features/slices/native.slice";
import authSlice from "./slices/auth.slice";

const store = configureStore({
  reducer: { 
    native: nativeSlice,
    auth: authSlice
  },
});

export default store;
